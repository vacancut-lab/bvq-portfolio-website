import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Menu, Plus, X } from 'lucide-react';
import { assetRegistry } from './content';
import { pricingAssets } from './pricingAssets';
import {
  ADDONS,
  CONSULTATION_BUDGETS,
  CONSULTATION_NEEDS,
  FAQ_ITEMS,
  INDUSTRIES,
  PACKAGES,
  PROCESS_STEPS,
  RECOMMENDATION_OPTIONS,
} from './pricingData';

const formatVND = (value) => `${value.toLocaleString('vi-VN')}đ`;

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function useCountUp(target, duration = 700) {
  const [display, setDisplay] = useState(target);
  const previous = useRef(target);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || previous.current === target) {
      previous.current = target;
      setDisplay(target);
      return undefined;
    }
    const from = previous.current;
    previous.current = target;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return display;
}

function scrollToHash(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function PricingHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Trang chủ', '/'],
    ['Các gói', '#goi'],
    ['Ngành', '#nganh'],
    ['Quy trình', '#quy-trinh-bang-gia'],
    ['FAQ', '#faq'],
  ];
  return (
    <header className="pricing-header">
      <a className="brand" href="/" aria-label="Về trang chủ">
        <span className="brand-name">Bách Vân Quán</span>
      </a>
      <nav className={open ? 'nav is-open' : 'nav'} aria-label="Điều hướng bảng giá">
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={(event) => { setOpen(false); if (href.startsWith('#')) { event.preventDefault(); scrollToHash(href); } }}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#tu-van" onClick={(event) => { event.preventDefault(); setOpen(false); scrollToHash('#tu-van'); }}>
          Tư vấn dự án
        </a>
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function PricingHero() {
  return (
    <section className="pricing-hero" id="top">
      <div className="pricing-hero-copy">
        <p className="section-kicker">BẢNG GIÁ WEBSITE</p>
        <h1>WEBSITE<br /><em>TỪ 999.000đ</em></h1>
        <p className="pricing-hero-sub">Chọn đúng mức đầu tư cho đúng mục tiêu.</p>
        <p className="pricing-hero-body">
          Từ một website giới thiệu đơn giản đến một digital experience
          được thiết kế riêng cho thương hiệu.
        </p>
        <div className="pricing-hero-actions">
          <a className="button button-primary" href="#goi" onClick={(event) => { event.preventDefault(); scrollToHash('#goi'); }}>
            XEM CÁC GÓI <ArrowRight size={15} />
          </a>
          <a className="button button-ghost" href="#tu-van" onClick={(event) => { event.preventDefault(); scrollToHash('#tu-van'); }}>
            TƯ VẤN CHO TÔI
          </a>
        </div>
        <p className="pricing-hero-note">GIÁ RÕ RÀNG — PHẠM VI RÕ RÀNG — KHÔNG ÉP MUA</p>
      </div>
      <div className="pricing-hero-visual">
        <img
          src={pricingAssets.heroStudio}
          alt="Không gian studio thiết kế website cao cấp"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}

function PricingIntroduction() {
  const [ref, inView] = useInView();
  return (
    <section className={`pricing-intro ${inView ? 'is-visible' : ''}`} ref={ref}>
      <h2>KHÔNG PHẢI WEBSITE NÀO<br /><em>CŨNG CẦN GIỐNG NHAU.</em></h2>
      <p>
        Một doanh nghiệp nhỏ có thể chỉ cần một website rõ ràng và chuyên nghiệp.<br />
        Một thương hiệu đang phát triển có thể cần một trải nghiệm được thiết kế riêng.
      </p>
      <p className="pricing-intro-strong">Bạn chỉ trả tiền cho những gì dự án thực sự cần.</p>
    </section>
  );
}

function PricingPhilosophy() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section className={`pricing-philosophy ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="pricing-philosophy-media">
        <img src={pricingAssets.differentLevels} alt="Bốn mức đầu tư website được sắp đặt như một hệ thống" loading="lazy" decoding="async" />
      </div>
      <div className="pricing-philosophy-copy">
        {PACKAGES.map((pkg, index) => (
          <div key={pkg.id}>
            <span>{`0${index + 1}`}</span>
            <strong>{pkg.name}</strong>
          </div>
        ))}
        <p>Từ một trang web đơn giản đến một digital experience hoàn chỉnh.</p>
      </div>
    </section>
  );
}

function PricingCards({ activeId }) {
  return (
    <section className="pricing-packages" id="goi">
      <div className="section-kicker">BẢNG GIÁ</div>
      <h2>CHỌN MỨC ĐẦU TƯ<br /><em>PHÙ HỢP VỚI BẠN.</em></h2>
      <div className="pricing-grid">
        {PACKAGES.map((pkg) => {
          const isActive = activeId === pkg.id;
          const imageSrc = pkg.imageKey ? pricingAssets[pkg.imageKey] : null;
          return (
            <article key={pkg.id} className={`pricing-card ${pkg.highlight ? 'is-highlight' : ''} ${isActive ? 'is-active' : ''}`} id={`card-${pkg.id}`}>
              {imageSrc && (
                <div className="pricing-card-media">
                  <img src={imageSrc} alt={`Minh hoạ gói ${pkg.name.toLowerCase()}`} loading="lazy" decoding="async" />
                </div>
              )}
              {!imageSrc && <div className="pricing-card-spacer" aria-hidden="true" />}
              <div className="pricing-card-head">
                <span className="pricing-card-name">{pkg.name}</span>
                {pkg.badge && <span className="pricing-badge">{pkg.badge}</span>}
                <strong className="pricing-price">{pkg.price}</strong>
                <p className="pricing-tagline">{pkg.tagline}</p>
              </div>
              <p className="pricing-description">{pkg.description}</p>
              <ul className="pricing-features">
                {pkg.features.map((item) => (
                  <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <a
                className={`button ${pkg.highlight ? 'button-primary' : 'button-outline'}`}
                href="#tu-van"
                onClick={(event) => { event.preventDefault(); scrollToHash('#tu-van'); }}
              >
                {pkg.cta}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PricingRecommendation({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option.packageId);
    onSelect(option.packageId);
  };

  return (
    <section className="pricing-recommend">
      <div className="section-kicker">GỢI Ý GÓI</div>
      <h2>BẠN ĐANG CẦN MỨC NÀO?</h2>
      <div className="recommend-options">
        {RECOMMENDATION_OPTIONS.map((option) => (
          <button
            key={option.packageId}
            type="button"
            className={selected === option.packageId ? 'is-selected' : ''}
            onClick={() => handleSelect(option)}
          >
            <span>{option.label}</span>
            <ArrowRight size={14} />
          </button>
        ))}
      </div>
    </section>
  );
}

function IndustryPricing() {
  const [ref, inView] = useInView({ threshold: 0.12 });
  return (
    <section className={`industry-pricing ${inView ? 'is-visible' : ''}`} ref={ref} id="nganh">
      <div className="section-kicker">THEO NGÀNH</div>
      <h2>MỖI NGÀNH<br /><em>CẦN MỘT CÁCH TIẾP CẬN KHÁC NHAU.</em></h2>
      <p className="industry-sub">
        Website tốt không chỉ đẹp. Nó phải hiểu cách khách hàng của ngành đó
        khám phá, tin tưởng và hành động.
      </p>
      <div className="industry-media">
        <img src={pricingAssets.industries} alt="Không gian sáu ngành kinh doanh được chụp theo phong cách editorial" loading="lazy" decoding="async" />
      </div>
      <div className="industry-list">
        {INDUSTRIES.map((industry) => (
          <a key={industry.id} className="industry-item" href={`/san-pham/${industry.slug}`}>
            <span className="industry-name">{industry.name}</span>
            <span className="industry-packages">{industry.packages.join(' / ')}</span>
            <span className="industry-demo">XEM DEMO <ArrowRight size={13} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ValueSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section className={`value-section ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="value-media">
        <img src={pricingAssets.value} alt="Chi tiết bản thiết kế website thể hiện giá trị phía sau sản phẩm" loading="lazy" decoding="async" />
      </div>
      <div className="value-copy">
        <h2>BẠN KHÔNG CHỈ MUA<br /><em>MỘT WEBSITE.</em></h2>
        <p className="value-lede">Website là kết quả cuối cùng.</p>
        <p>
          Phía sau nó là: chiến lược, cấu trúc, UX, visual direction,
          content, technology và execution.
        </p>
      </div>
    </section>
  );
}

function AIHumanSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section className={`ai-human ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="ai-human-media">
        <img src={pricingAssets.aiHuman} alt="Sự kết hợp giữa công nghệ AI và tư duy thiết kế của con người" loading="lazy" decoding="async" />
      </div>
      <div className="ai-human-copy">
        <h2>AI GIÚP CHÚNG TÔI<br /><em>LÀM NHANH HƠN.</em></h2>
        <p className="ai-human-sub">Nhưng không thay thế tư duy.</p>
        <p>
          AI hỗ trợ quá trình tạo hình ảnh, visual direction và production.
          Chiến lược, cấu trúc, UX, art direction và quyết định cuối cùng
          vẫn được thiết kế cho từng dự án.
        </p>
      </div>
    </section>
  );
}

function AddonSection() {
  const [ref, inView] = useInView({ threshold: 0.12 });
  return (
    <section className={`addon-section ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="addon-media">
        <img src={pricingAssets.modularServices} alt="Các dịch vụ bổ sung được thiết kế theo dạng module" loading="lazy" decoding="async" />
      </div>
      <div className="addon-copy">
        <h2>CẦN THÊM?</h2>
        <p>
          Không nhất thiết phải nâng lên một gói lớn hơn.
          Bạn có thể bổ sung đúng thứ mình cần.
        </p>
        <div className="addon-list">
          {ADDONS.map((addon) => (
            <div key={addon.id} className="addon-row">
              <span className="addon-label">{addon.label}</span>
              <span className="addon-price">{addon.priceLabel}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCalculator() {
  const [baseId, setBaseId] = useState('business');
  const [selected, setSelected] = useState([]);
  const base = PACKAGES.find((pkg) => pkg.id === baseId) || PACKAGES[1];
  const total = base.priceValue + selected.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const displayTotal = useCountUp(total);

  const toggleAddon = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  return (
    <section className="calculator-section">
      <div className="section-kicker">TÍNH CHI PHÍ</div>
      <h2>TÍNH THỬ CHI PHÍ<br /><em>DỰ ÁN CỦA BẠN.</em></h2>
      <div className="calculator">
        <div className="calculator-base">
          <label htmlFor="calc-base">Gói nền tảng</label>
          <select id="calc-base" value={baseId} onChange={(event) => setBaseId(event.target.value)}>
            {PACKAGES.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name} — {pkg.price}</option>)}
          </select>
          <span className="calculator-total-label">Tổng dự kiến</span>
          <strong className="calculator-total">{formatVND(displayTotal)}</strong>
          <p>Bạn chỉ trả tiền cho những gì dự án thực sự cần.</p>
        </div>
        <div className="calculator-addons">
          {ADDONS.map((addon) => {
            const active = selected.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                className={`addon-toggle ${active ? 'is-active' : ''}`}
                onClick={() => toggleAddon(addon.id)}
                aria-pressed={active}
              >
                <span className="addon-toggle-label">
                  {active ? <Check size={14} /> : <Plus size={14} />}
                  {addon.label}
                </span>
                <span className="addon-toggle-price">{addon.priceLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <section className={`process-pricing ${inView ? 'is-visible' : ''}`} ref={ref} id="quy-trinh-bang-gia">
      <div className="section-kicker">QUY TRÌNH</div>
      <h2>TỪ Ý TƯỞNG<br /><em>ĐẾN WEBSITE.</em></h2>
      <div className="process-media">
        <img src={pricingAssets.process} alt="Quy trình từ brief đến launch được chụp dưới dạng workspace" loading="lazy" decoding="async" />
      </div>
      <div className="process-track">
        {PROCESS_STEPS.map((step, index) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < PROCESS_STEPS.length - 1 && <ArrowRight className="process-arrow" size={16} />}
          </article>
        ))}
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="timeline-section">
      <div className="section-kicker">THỜI GIAN DỰ KIẾN</div>
      <h2>BAO LÂU ĐỂ CÓ WEBSITE?</h2>
      <div className="timeline-grid">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} className="timeline-item">
            <span>{pkg.name}</span>
            <strong>{pkg.timeline}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function PortfolioProof() {
  return (
    <section className="portfolio-proof">
      <div className="section-kicker">PORTFOLIO</div>
      <h2>XEM NHỮNG TRẢI NGHIỆM<br /><em>CHÚNG TÔI CÓ THỂ TẠO RA.</em></h2>
      <div className="proof-grid">
        {INDUSTRIES.map((industry) => {
          const imageSrc = assetRegistry[industry.id] || assetRegistry.studioHero;
          return (
            <a key={industry.id} className="proof-card" href={`/san-pham/${industry.slug}`}>
              <img src={imageSrc} alt={`Trải nghiệm ${industry.name.toLowerCase()}`} loading="lazy" decoding="async" />
              <span>{industry.name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  return (
    <section className="faq-section" id="faq">
      <div className="section-kicker">FAQ</div>
      <h2>CÂU HỎI THƯỜNG GẶP</h2>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
              <button type="button" onClick={() => toggle(index)} aria-expanded={isOpen}>
                <span><strong>{`0${index + 1}`}</strong>{item.question}</span>
                <Plus size={16} className={`faq-icon ${isOpen ? 'is-rotated' : ''}`} />
              </button>
              <div className="faq-body" aria-hidden={!isOpen}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta-media">
        <img src={pricingAssets.finalCTA} alt="Không gian làm việc thể hiện tinh thần bắt đầu dự án" loading="lazy" decoding="async" />
      </div>
      <div className="final-cta-copy">
        <h2>BẠN ĐANG CẦN<br /><em>WEBSITE NÀO?</em></h2>
        <p>Cho chúng tôi biết bạn đang xây dựng điều gì. Chúng tôi sẽ giúp bạn chọn đúng mức đầu tư.</p>
        <div className="final-actions">
          <a className="button button-primary" href="#tu-van" onClick={(event) => { event.preventDefault(); scrollToHash('#tu-van'); }}>TƯ VẤN DỰ ÁN <ArrowRight size={15} /></a>
          <a className="button button-ghost" href="/#showroom">XEM PORTFOLIO</a>
        </div>
      </div>
    </section>
  );
}

function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [values, setValues] = useState({ name:'', company:'', industry:'', need:'', budget:'', description:'', phone:'', email:'', consent:false, website:'' });
  const setVal = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const validate = () => {
    const e = {};
    const phoneRe = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Vui lòng nhập họ tên.';
    if (!values.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại.';
    else if (!phoneRe.test(values.phone.replace(/[\s.\-()]/g,''))) e.phone = 'SĐT không hợp lệ (VD: 0901234567).';
    if (!values.email.trim()) e.email = 'Vui lòng nhập email.';
    else if (!emailRe.test(values.email.trim())) e.email = 'Email không hợp lệ.';
    if (!values.consent) e.consent = 'Bạn cần đồng ý để chúng tôi liên hệ lại.';
    if (values.description.length > 2000) e.description = 'Mô tả tối đa 2000 ký tự.';
    return e;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true);
    try {
      const res = await fetch('/api/lead', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...values, page: window.location.href }),
      });
      const data = await res.json().catch(()=> ({}));
      if (!res.ok || data.ok === false) {
        if (data.errors) { setErrors(data.errors); setFormError('Vui lòng kiểm tra lại thông tin.'); }
        else setFormError(data.error || data.detail || 'Gửi chưa thành công, vui lòng thử lại.');
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError('Không kết nối được máy chủ, vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="consultation-section" id="tu-van">
      <div className="consultation-inner">
        <div className="consultation-intro">
          <div className="section-kicker">BẮT ĐẦU</div>
          <h2>TƯ VẤN DỰ ÁN</h2>
          <p>Kể cho chúng tôi về doanh nghiệp và mục tiêu của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ. <span style={{color:'#f0c872'}}>Thông tin được bảo mật, chỉ dùng để tư vấn.</span></p>
        </div>
        {submitted ? (
          <div className="consultation-success" role="status">
            <Check size={32} />
            <strong>ĐÃ NHẬN YÊU CẦU.</strong>
            <p>Chúng tôi sẽ liên hệ bạn sớm nhất để trao đổi chi tiết qua SĐT/Email bạn đã để lại.</p>
          </div>
        ) : (
          <form className="consultation-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot — ẩn với người thật, bẫy bot */}
            <input type="text" name="website" value={values.website} onChange={setVal('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:'absolute',left:'-9999px',width:1,height:1,opacity:0}} />

            <label htmlFor="cf-name">HỌ TÊN *</label>
            <input id="cf-name" value={values.name} onChange={setVal('name')} required placeholder="Nguyễn Văn A" autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}

            <label htmlFor="cf-phone">SỐ ĐIỆN THOẠI *</label>
            <input id="cf-phone" value={values.phone} onChange={setVal('phone')} required inputMode="tel" placeholder="0901234567" autoComplete="tel" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}

            <label htmlFor="cf-email">EMAIL *</label>
            <input id="cf-email" value={values.email} onChange={setVal('email')} required type="email" placeholder="ban@congty.com" autoComplete="email" />
            {errors.email && <span className="field-error">{errors.email}</span>}

            <label htmlFor="cf-company">DOANH NGHIỆP</label>
            <input id="cf-company" value={values.company} onChange={setVal('company')} placeholder="Tên công ty / thương hiệu" autoComplete="organization" />

            <label htmlFor="cf-industry">NGÀNH</label>
            <select id="cf-industry" value={values.industry} onChange={setVal('industry')}>
              <option value="">Chọn ngành</option>
              {INDUSTRIES.map((industry) => <option key={industry.id} value={industry.id}>{industry.name}</option>)}
              <option value="khac">Khác</option>
            </select>

            <label htmlFor="cf-need">BẠN ĐANG CẦN</label>
            <select id="cf-need" value={values.need} onChange={setVal('need')}>
              <option value="">Chọn nhu cầu</option>
              {CONSULTATION_NEEDS.map((need) => <option key={need} value={need}>{need}</option>)}
            </select>

            <label htmlFor="cf-budget">NGÂN SÁCH</label>
            <select id="cf-budget" value={values.budget} onChange={setVal('budget')}>
              <option value="">Chọn khoảng ngân sách</option>
              {CONSULTATION_BUDGETS.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
            </select>

            <label htmlFor="cf-desc">MÔ TẢ DỰ ÁN</label>
            <textarea id="cf-desc" rows="4" value={values.description} onChange={setVal('description')} placeholder="Mô tả ngắn về mục tiêu, tính năng hoặc câu hỏi của bạn..." maxLength={2000} />
            {errors.description && <span className="field-error">{errors.description}</span>}

            <label className="consent-row" style={{display:'flex',gap:10,alignItems:'flex-start',fontSize:12,lineHeight:1.6,color:'#c9c4ba',textTransform:'none',letterSpacing:0}}>
              <input type="checkbox" checked={values.consent} onChange={setVal('consent')} style={{marginTop:4,accentColor:'#d4a957'}} />
              <span>Tôi đồng ý cho Bách Vân Quán lưu thông tin này để liên hệ tư vấn và cam kết bảo mật, không chia sẻ cho bên thứ ba. *</span>
            </label>
            {errors.consent && <span className="field-error">{errors.consent}</span>}

            {formError && <div className="form-error" role="alert" style={{padding:'12px 14px',borderRadius:12,background:'rgba(220,60,60,0.12)',border:'1px solid rgba(220,60,60,0.35)',color:'#ffb4b4',fontSize:13}}>{formError}</div>}

            <button className="button button-primary" type="submit" disabled={sending} style={{opacity: sending?0.7:1}}>
              {sending ? 'ĐANG GỬI...' : <>GỬI YÊU CẦU <ArrowRight size={15} /></>}
            </button>
            <p style={{margin:0,color:'#8a857e',fontSize:11,lineHeight:1.6}}>Bảo mật: form gửi qua HTTPS, chống spam & giới hạn tần suất. Dữ liệu chỉ gửi tới email/Telegram của bạn.</p>
          </form>
        )}
      </div>
    </section>
  );
}

function MobileStickyCTA() {
  return (
    <div className="mobile-sticky-cta">
      <a className="button button-primary" href="#tu-van" onClick={(event) => { event.preventDefault(); scrollToHash('#tu-van'); }}>
        TƯ VẤN DỰ ÁN
      </a>
    </div>
  );
}

export function PricingPage() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Bảng Giá Thiết Kế Website | Từ 999.000đ';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', 'Thiết kế website theo ngành từ 999.000đ. Website doanh nghiệp, digital experience, landing page và giải pháp website theo yêu cầu.');
    }
  }, []);

  const handleRecommendation = (packageId) => {
    setActiveId(packageId);
    const card = document.getElementById(`card-${packageId}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="pricing-page">
      <PricingHeader />
      <main>
        <PricingHero />
        <PricingIntroduction />
        <PricingPhilosophy />
        <PricingCards activeId={activeId} />
        <PricingRecommendation onSelect={handleRecommendation} />
        <IndustryPricing />
        <ValueSection />
        <AIHumanSection />
        <AddonSection />
        <PriceCalculator />
        <ProcessSection />
        <TimelineSection />
        <PortfolioProof />
        <FAQSection />
        <FinalCTA />
        <ConsultationForm />
      </main>
      <MobileStickyCTA />
    </div>
  );
}
