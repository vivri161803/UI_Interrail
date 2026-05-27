// animations/heroAnimations.js
import { gsap }        from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations() {
  const title    = document.getElementById('hero-title');
  const subtitle = document.getElementById('hero-subtitle');
  const eyebrow  = document.querySelector('.hero-eyebrow');
  const meta     = document.querySelector('.hero-meta');

  if (!title) return;

  const chars = title.querySelectorAll('.char');

  // ── 1. Initial states ───────────────────────────────────────────
  if (chars.length > 0) {
    gsap.set(chars, { y: '110%', opacity: 0 });
  }
  if (subtitle) gsap.set(subtitle, { y: 16, opacity: 0 });

  // ── 2. Entrance timeline ────────────────────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Eyebrow fades in first
  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, duration: 0.6 }, 0.2);
  }

  // Title chars reveal from bottom (masked by char-wrapper overflow:hidden)
  if (chars.length > 0) {
    tl.to(chars, {
      y: '0%',
      opacity: 1,
      duration: 1.1,
      stagger: { amount: 0.5, ease: 'power2.out' }
    }, 0.5);
  }

  // Subtitle rises in
  if (subtitle) {
    tl.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.9
    }, '-=0.5');
  }

  // Meta row fades in
  if (meta) {
    tl.to(meta, { opacity: 1, duration: 0.7 }, '-=0.4');
  }
}
