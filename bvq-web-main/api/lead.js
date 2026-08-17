/** Vercel Serverless: POST /api/lead
 *  Bảo mật: honeypot + rate limit IP + validate + sanitise + HTTPS only
 *  Gửi: Telegram (bắt buộc) + Email qua Resend (nếu có RESEND_API_KEY)
 */
const RATE = new Map(); // ip -> timestamp ms
const WINDOW_MS = 60 * 1000;

function getIP(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function isValidPhone(v) {
  const d = String(v).replace(/[\s.\-()]/g,'');
  return /^(0|\+84)(3|5|7|8|9)\d{8}$/.test(d);
}
function isValidEmail(v) {
  if (!v) return true; // optional, but if present must be valid
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
}

export default async function handler(req, res) {
  // CORS + security headers
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });

  // HTTPS enforcement (Vercel always https, but keep check)
  const proto = req.headers['x-forwarded-proto'];
  if (proto && proto !== 'https') {
    // allow http on localhost dev
    const host = req.headers.host || '';
    if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
      return res.status(403).json({ ok:false, error:'HTTPS required' });
    }
  }

  // Rate limit per IP
  const ip = getIP(req);
  const now = Date.now();
  const last = RATE.get(ip) || 0;
  if (now - last < WINDOW_MS) {
    const retry = Math.ceil((WINDOW_MS - (now - last))/1000);
    res.setHeader('Retry-After', String(retry));
    return res.status(429).json({ ok:false, error:`Bạn thao tác quá nhanh. Thử lại sau ${retry}s.` });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  const {
    name = '', company = '', industry = '', need = '', budget = '',
    description = '', phone = '', email = '',
    consent = false, website = '', // honeypot
    page = '',
  } = body;

  // Honeypot: bot điền field ẩn
  if (String(website).trim() !== '') {
    // giả vờ success để bot không retry
    return res.status(200).json({ ok:true });
  }

  // Validate
  const errors = {};
  const n = String(name).trim();
  if (!n || n.length < 2) errors.name = 'Vui lòng nhập họ tên.';
  if (n.length > 100) errors.name = 'Họ tên quá dài.';
  const ph = String(phone).trim();
  // yêu cầu SĐT bắt buộc
  if (!ph) errors.phone = 'Vui lòng nhập số điện thoại.';
  else if (!isValidPhone(ph)) errors.phone = 'Số điện thoại không hợp lệ (VD: 0901234567).';
  const em = String(email).trim();
  // email bắt buộc theo yêu cầu bảo mật (để liên hệ lại)
  if (!em) errors.email = 'Vui lòng nhập email.';
  else if (!isValidEmail(em)) errors.email = 'Email không hợp lệ.';
  if (!consent) errors.consent = 'Bạn cần đồng ý cho phép liên hệ lại.';
  if (String(description).length > 2000) errors.description = 'Mô tả quá dài (tối đa 2000 ký tự).';
  if (Object.keys(errors).length) return res.status(400).json({ ok:false, errors });

  // Sanitise lengths
  const payload = {
    name: n.slice(0,100),
    company: String(company).trim().slice(0,100),
    industry: String(industry).trim().slice(0,50),
    need: String(need).trim().slice(0,50),
    budget: String(budget).trim().slice(0,30),
    description: String(description).trim().slice(0,2000),
    phone: ph.slice(0,20),
    email: em.slice(0,120),
    page: String(page).trim().slice(0,200) || req.headers.referer || '',
    ip,
    ua: String(req.headers['user-agent']||'').slice(0,300),
    at: new Date().toISOString(),
  };

  RATE.set(ip, now);
  // cleanup old entries occasionally
  if (RATE.size > 500) {
    for (const [k,v] of RATE) if (now - v > WINDOW_MS*10) RATE.delete(k);
  }

  // Build messages
  const line = (k,v) => v ? `${k}: ${v}` : null;
  const tgText =
`🔔 *Lead mới — Bách Vân Quán*
`+
[
  line('👤 Họ tên', payload.name),
  line('🏢 Doanh nghiệp', payload.company),
  line('📞 SĐT', payload.phone),
  line('✉️ Email', payload.email),
  line('🏷️ Ngành', payload.industry),
  line('🎯 Nhu cầu', payload.need),
  line('💰 Ngân sách', payload.budget),
  line('📝 Mô tả', payload.description ? `\n${payload.description}` : ''),
  line('🔗 Trang', payload.page),
  `🕐 ${new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'})} — IP ${payload.ip}`,
].filter(Boolean).join('\n');

  // HTML for Telegram
  const tgHtml =
`<b>🔔 Lead mới — Bách Vân Quán</b>
`+
[
  `<b>Họ tên:</b> ${escHtml(payload.name)}`,
  payload.company ? `<b>Doanh nghiệp:</b> ${escHtml(payload.company)}` : null,
  `<b>SĐT:</b> ${escHtml(payload.phone)}`,
  `<b>Email:</b> ${escHtml(payload.email)}`,
  payload.industry ? `<b>Ngành:</b> ${escHtml(payload.industry)}` : null,
  payload.need ? `<b>Nhu cầu:</b> ${escHtml(payload.need)}` : null,
  payload.budget ? `<b>Ngân sách:</b> ${escHtml(payload.budget)}` : null,
  payload.description ? `<b>Mô tả:</b> ${escHtml(payload.description)}` : null,
  payload.page ? `<b>Trang:</b> ${escHtml(payload.page)}` : null,
  `<i>${escHtml(new Date().toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}))} — IP ${escHtml(payload.ip)}</i>`,
].filter(Boolean).join('\n');

  const results = { telegram:false, email:false };
  const errs = [];

  // Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (botToken && chatId) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: chatId, text: tgHtml, parse_mode:'HTML', disable_web_page_preview:true }),
      });
      const j = await r.json().catch(()=>null);
      if (r.ok && j?.ok) results.telegram = true;
      else errs.push(`telegram: ${j?.description || r.status}`);
    } catch (e) { errs.push(`telegram: ${e.message}`); }
  } else {
    errs.push('telegram: chưa cấu hình TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID');
  }

  // Email via Resend (nếu có)
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || 'vacancut@gmail.com';
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'BVQ Lead <onboarding@resend.dev>';
  if (resendKey) {
    try {
      const html = `
        <div style="font-family:system-ui,sans-serif;max-width:600px">
          <h2 style="margin:0 0 8px">Lead mới — Bách Vân Quán</h2>
          <p style="color:#666;margin:0 0 16px">${escHtml(payload.at)} — IP ${escHtml(payload.ip)}</p>
          <table style="width:100%;border-collapse:collapse">
            ${[
              ['Họ tên', payload.name],
              ['Doanh nghiệp', payload.company],
              ['SĐT', payload.phone],
              ['Email', payload.email],
              ['Ngành', payload.industry],
              ['Nhu cầu', payload.need],
              ['Ngân sách', payload.budget],
              ['Trang', payload.page],
            ].filter(([,v])=>v).map(([k,v])=>`<tr><td style="padding:8px 12px;border:1px solid #eee;color:#666;width:140px">${escHtml(k)}</td><td style="padding:8px 12px;border:1px solid #eee"><b>${escHtml(v)}</b></td></tr>`).join('')}
          </table>
          ${payload.description ? `<div style="margin-top:16px;padding:12px;border:1px solid #eee;border-radius:8px;white-space:pre-wrap">${escHtml(payload.description)}</div>` : ''}
          <p style="color:#888;font-size:12px;margin-top:16px">UA: ${escHtml(payload.ua)}</p>
        </div>`;
      const r = await fetch('https://api.resend.com/emails', {
        method:'POST',
        headers:{ 'Authorization':`Bearer ${resendKey}`, 'Content-Type':'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [toEmail], subject: `Lead mới: ${payload.name} — ${payload.phone}`, html, reply_to: payload.email || undefined }),
      });
      const j = await r.json().catch(()=>null);
      if (r.ok) results.email = true;
      else errs.push(`email: ${j?.message || JSON.stringify(j) || r.status}`);
    } catch (e) { errs.push(`email: ${e.message}`); }
  } else {
    errs.push('email: chưa cấu hình RESEND_API_KEY (sẽ chỉ gửi Telegram)');
  }

  // Thành công nếu ít nhất 1 kênh gửi được
  if (results.telegram || results.email) {
    return res.status(200).json({ ok:true, sent: results, note: errs.length? errs.join(' | ') : undefined });
  }
  // Không gửi được kênh nào -> báo lỗi
  return res.status(500).json({ ok:false, error:'Không gửi được lead. Vui lòng thử lại.', detail: errs.join(' | '), sent: results });
}
