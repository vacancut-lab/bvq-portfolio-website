function clampDpr() {
  return Math.min(window.devicePixelRatio || 1, 1.5);
}

function isMobile() {
  return window.innerWidth < 640;
}

function makeCanvasEngine(drawFrame) {
  return function createEngine(canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return { start() {}, stop() {} };
    let raf = 0;
    let running = false;

    function resize() {
      const dpr = clampDpr();
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function loop() {
      if (!running) return;
      if (document.hidden) {
        raf = requestAnimationFrame(loop);
        return;
      }
      drawFrame(ctx, canvas);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running) return;
      running = true;
      resize();
      window.addEventListener('resize', resize);
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      window.removeEventListener('resize', resize);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    return { start, stop, resize };
  };
}

function makeParticles(countDesktop, countMobile, factory) {
  let list = [];
  return {
    ensure(w, h) {
      const n = isMobile() ? countMobile : countDesktop;
      if (list.length !== n) list = Array.from({ length: n }, () => factory(w, h, true));
      return list;
    },
    get() { return list; },
    reset() { list = []; },
  };
}

// Wave — pale dots drifting horizontally, gentle vertical bob
const waveStore = makeParticles(28, 16, (w, h, init) => ({
  x: Math.random() * w,
  y: init ? Math.random() * h : h + 10,
  vx: 0.35 + Math.random() * 0.7,
  vy: (Math.random() - 0.5) * 0.18,
  r: 1.2 + Math.random() * 2.2,
  a: 0.25 + Math.random() * 0.38,
  phase: Math.random() * Math.PI * 2,
}));
let waveT = 0;
export const createWaveEngine = makeCanvasEngine((ctx, canvas) => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  waveT += 0.014;
  const pts = waveStore.ensure(w, h);
  for (const p of pts) {
    p.x += p.vx;
    p.y += p.vy + Math.sin(waveT + p.phase) * 0.22;
    if (p.x > w + 10) { p.x = -10; p.y = Math.random() * h; }
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;
    ctx.globalAlpha = p.a;
    ctx.fillStyle = p.r > 1.9 ? 'rgba(210, 230, 255, 0.95)' : 'rgba(255,255,255,0.9)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  // faint horizontal wash
  ctx.strokeStyle = 'rgba(180, 210, 255, 0.07)';
  ctx.lineWidth = 1;
  for (let y = h * 0.3; y < h * 0.9; y += h * 0.18) {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 18) {
      const yy = y + Math.sin(x * 0.015 + waveT * 0.6) * 6;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
});

// Steam — soft rising plumes
const steamStore = makeParticles(18, 11, (w, h) => ({
  x: w * (0.32 + Math.random() * 0.36) + (Math.random() - 0.5) * 40,
  y: h * (0.55 + Math.random() * 0.45),
  vx: (Math.random() - 0.5) * 0.3,
  vy: -(0.35 + Math.random() * 0.65),
  r: 10 + Math.random() * 22,
  a: 0.06 + Math.random() * 0.1,
  drift: Math.random() * Math.PI * 2,
}));
let steamT = 0;
export const createSteamEngine = makeCanvasEngine((ctx, canvas) => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  steamT += 0.012;
  const pts = steamStore.ensure(w, h);
  for (const p of pts) {
    p.y += p.vy;
    p.x += p.vx + Math.sin(steamT + p.drift) * 0.5;
    p.a *= 0.998;
    if (p.y < -40 || p.a < 0.01) {
      p.x = w * (0.32 + Math.random() * 0.36) + (Math.random() - 0.5) * 30;
      p.y = h * (0.72 + Math.random() * 0.28);
      p.a = 0.06 + Math.random() * 0.1;
      p.r = 10 + Math.random() * 22;
    }
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    grad.addColorStop(0, `rgba(255,255,255,${p.a})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
});

// Speed — thin light streaks (motion blur)
const speedStore = makeParticles(22, 14, (w, h) => ({
  x: -20 - Math.random() * w * 0.5,
  y: Math.random() * h,
  vx: 6 + Math.random() * 10,
  len: 28 + Math.random() * 55,
  a: 0.18 + Math.random() * 0.32,
  thick: 1 + Math.random() * 1.2,
}));
export const createSpeedEngine = makeCanvasEngine((ctx, canvas) => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  const pts = speedStore.ensure(w, h);
  for (const p of pts) {
    p.x += p.vx;
    if (p.x - p.len > w + 20) {
      p.x = -20 - Math.random() * 80;
      p.y = Math.random() * h;
      p.vx = 6 + Math.random() * 10;
    }
    const grad = ctx.createLinearGradient(p.x - p.len, p.y, p.x, p.y);
    grad.addColorStop(0, 'rgba(212,169,87,0)');
    grad.addColorStop(0.35, `rgba(212,169,87,${p.a * 0.55})`);
    grad.addColorStop(1, `rgba(255,245,220,${p.a})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = p.thick;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p.x - p.len, p.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
});

// Blueprint — sliding grid + blinking dots
let blueprintT = 0;
const bpDots = Array.from({ length: 14 }, () => ({
  x: Math.random(),
  y: Math.random(),
  phase: Math.random() * Math.PI * 2,
}));
export const createBlueprintEngine = makeCanvasEngine((ctx, canvas) => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  blueprintT += 0.018;
  const off = (blueprintT * 18) % 36;
  ctx.strokeStyle = 'rgba(140, 170, 210, 0.09)';
  ctx.lineWidth = 1;
  for (let x = -36 + off; x < w + 36; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = -36 + off; y < h + 36; y += 36) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (const d of bpDots) {
    const a = 0.35 + Math.sin(blueprintT * 0.9 + d.phase) * 0.3 + 0.25;
    ctx.globalAlpha = Math.max(0, Math.min(1, a));
    ctx.fillStyle = 'rgba(212,169,87,0.95)';
    ctx.beginPath();
    ctx.arc(d.x * w, d.y * h, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,169,87,0.22)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(d.x * w, d.y * h, 7 + Math.sin(blueprintT + d.phase) * 1.5, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
});

// Silk — slow diagonal gold ribbons
let silkT = 0;
export const createSilkEngine = makeCanvasEngine((ctx, canvas) => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  silkT += 0.006;
  const ribbons = 3;
  for (let i = 0; i < ribbons; i++) {
    const baseY = h * (0.28 + i * 0.22);
    const amp = 18 + i * 6;
    const yOff = Math.sin(silkT * 0.7 + i) * 10;
    ctx.strokeStyle = i === 1 ? 'rgba(212,169,87,0.22)' : 'rgba(212,169,87,0.11)';
    ctx.lineWidth = i === 1 ? 1.6 : 1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let x = 0; x <= w; x += 10) {
      const y = baseY + yOff + Math.sin(x * 0.008 + silkT * 2 + i * 1.2) * amp + Math.cos(x * 0.003 - silkT) * 6;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // shimmer head
    const sx = ((silkT * 90 + i * 120) % (w + 80)) - 40;
    const sy = baseY + yOff + Math.sin(sx * 0.008 + silkT * 2 + i * 1.2) * amp;
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 26);
    g.addColorStop(0, 'rgba(255,240,200,0.28)');
    g.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(sx, sy, 26, 0, Math.PI * 2);
    ctx.fill();
  }
});

// Gold — subtle warm bokeh drift
const goldStore = makeParticles(16, 10, (w, h) => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.2,
  r: 18 + Math.random() * 30,
  a: 0.04 + Math.random() * 0.07,
  drift: Math.random() * Math.PI * 2,
}));
let goldT = 0;
export const createGoldEngine = makeCanvasEngine((ctx, canvas) => {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  goldT += 0.01;
  const pts = goldStore.ensure(w, h);
  for (const p of pts) {
    p.x += p.vx + Math.sin(goldT + p.drift) * 0.2;
    p.y += p.vy + Math.cos(goldT + p.drift * 1.3) * 0.15;
    if (p.x < -30) p.x = w + 30;
    if (p.x > w + 30) p.x = -30;
    if (p.y < -30) p.y = h + 30;
    if (p.y > h + 30) p.y = -30;
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    g.addColorStop(0, `rgba(212,169,87,${p.a})`);
    g.addColorStop(1, 'rgba(212,169,87,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
});
