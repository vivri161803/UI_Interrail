// components/ParticleGrid.js
// Interactive dot grid — Nordic palette, more visible on light bg.
// Dots gently shift from mouse with soft spring physics.

export function initParticleGrid() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dots = [];
  let mouseX = -1000, mouseY = -1000;
  let rafId = null;

  // Configuration — visible but elegant on light background
  const SPACING = 34;
  const DOT_RADIUS = 1.4;
  const MOUSE_RADIUS = 100;
  const REPEL_FORCE = 4;
  const BASE_ALPHA = 0.12;       // clearly visible at rest
  const HOVER_ALPHA = 0.40;      // prominent on hover
  const BASE_HUE = 205;          // fjord blue
  const BASE_SAT = 30;
  const BASE_LIGHT = 55;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    buildGrid();
  }

  function buildGrid() {
    dots = [];
    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / SPACING) + 1;
    const offsetX = (width - (cols - 1) * SPACING) / 2;
    const offsetY = (height - (rows - 1) * SPACING) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          homeX: offsetX + c * SPACING,
          homeY: offsetY + r * SPACING,
          x: offsetX + c * SPACING,
          y: offsetY + r * SPACING,
          vx: 0, vy: 0,
        });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const dot of dots) {
      const dx = dot.x - mouseX;
      const dy = dot.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * REPEL_FORCE;
        dot.vx += (dx / dist) * force;
        dot.vy += (dy / dist) * force;
      }

      dot.vx += (dot.homeX - dot.x) * 0.06;
      dot.vy += (dot.homeY - dot.y) * 0.06;
      dot.vx *= 0.72;
      dot.vy *= 0.72;
      dot.x += dot.vx;
      dot.y += dot.vy;

      const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);
      const alpha = BASE_ALPHA + proximity * (HOVER_ALPHA - BASE_ALPHA);
      const hue = BASE_HUE + proximity * 15;
      const sat = BASE_SAT + proximity * 30;
      const light = BASE_LIGHT - proximity * 10;
      const radius = DOT_RADIUS + proximity * 0.8;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`;
      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  }

  function handleMouse(e) { mouseX = e.clientX; mouseY = e.clientY; }
  function handleMouseLeave() { mouseX = -1000; mouseY = -1000; }

  window.addEventListener('mousemove', handleMouse);
  window.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', resize);
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) { mouseX = t.clientX; mouseY = t.clientY; }
  }, { passive: true });
  window.addEventListener('touchend', handleMouseLeave);

  resize();
  draw();

  return {
    destroy() {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    }
  };
}
