function clampDpr() {
  return Math.min(window.devicePixelRatio || 1, 1.5);
}

function isMobile() {
  return window.innerWidth < 640;
}

export function createSakuraEngine(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return { start() {}, stop() {} };

  let petals = [];
  let raf = 0;
  let running = false;

  const count = () => (isMobile() ? 22 : 34);

  function makePetal(w, h, yBias = -1) {
    return {
      x: Math.random() * w,
      y: yBias < 0 ? Math.random() * h : -18 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.55 + Math.random() * 0.75,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.025,
      scale: 0.7 + Math.random() * 0.7,
      opacity: 0.55 + Math.random() * 0.35,
      wobble: Math.random() * Math.PI * 2,
      wobbleV: 0.012 + Math.random() * 0.02,
      size: 7 + Math.random() * 6,
    };
  }

  function resize() {
    const dpr = clampDpr();
    const { clientWidth: w, clientHeight: h } = canvas;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!petals.length) {
      petals = Array.from({ length: count() }, () => makePetal(w, h, -1));
    }
  }

  function frame() {
    if (!running) return;
    if (document.hidden) {
      raf = requestAnimationFrame(frame);
      return;
    }
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const t = performance.now();
    const wind = Math.sin(t * 0.00038) * 0.45;

    for (const p of petals) {
      p.x += p.vx + Math.sin(p.wobble) * 0.35 + wind;
      p.y += p.vy;
      p.wobble += p.wobbleV;
      p.rot += p.rotV;

      if (p.y > h + 30) {
        Object.assign(p, makePetal(w, h, 1));
        p.y = -16;
      }
      if (p.x < -40) p.x = w + 20;
      if (p.x > w + 40) p.x = -20;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(p.scale, p.scale);
      ctx.fillStyle = 'rgba(255, 214, 224, 0.92)';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.62, p.size * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 245, 248, 0.95)';
      ctx.beginPath();
      ctx.ellipse(p.size * 0.12, -p.size * 0.06, p.size * 0.22, p.size * 0.14, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 169, 87, 0.18)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.22);
      ctx.lineTo(0, p.size * 0.2);
      ctx.stroke();
      ctx.restore();
    }

    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    window.removeEventListener('resize', resize);
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    petals = [];
  }

  resize();
  return { start, stop, resize };
}
