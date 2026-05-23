// animations/heroAnimations.js
// Train-themed kinetic typography — letters slide in from right like arriving train cars
import { gsap } from "gsap";

export function initHeroAnimations() {
  const chars    = document.querySelectorAll('#hero-title .char');
  const subtitle = document.getElementById('hero-subtitle');

  if (chars.length === 0) return;

  // ── Set initial "train approaching" state ─────────────────────────
  // Letters start far off-screen to the right, tilted forward (skewX negative),
  // and invisible — as if the train is still moving at speed.
  gsap.set(chars, {
    x: 160,          // off to the right
    skewX: -30,      // tilt: forward momentum
    opacity: 0
  });

  if (subtitle) gsap.set(subtitle, { y: 22, opacity: 0 });

  // ── Timeline: train brakes into station ───────────────────────────
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.to(chars, {
    x: 0,            // slides into position
    skewX: 0,        // straightens out as it brakes
    opacity: 1,
    duration: 1.1,
    stagger: 0.05,   // each "car" couples in slightly after the previous
  });

  // Subtitle fades up once the title has landed
  if (subtitle) {
    tl.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.6');
  }
}
