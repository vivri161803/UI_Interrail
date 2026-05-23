// animations/heroAnimations.js
import { gsap } from "gsap";

export function initHeroAnimations() {
  const chars = document.querySelectorAll('#hero-title .char');
  const subtitle = document.getElementById('hero-subtitle');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (chars.length === 0) return;

  // Set initial states (if not fully set in CSS)
  gsap.set(chars, { y: '100%', opacity: 0 });
  if (subtitle) gsap.set(subtitle, { y: 20, opacity: 0 });
  if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 0 });

  const tl = gsap.timeline();

  // 1. Reveal "Interrail 2026" character-by-character
  tl.to(chars, {
    y: '0%',
    opacity: 1,
    duration: 1.2,
    stagger: 0.04,
    ease: 'expo.out'
  });

  // 2. Reveal subtitle
  if (subtitle) {
    tl.to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: 'power3.out'
    }, '-=0.8'); // start slightly before characters finish
  }

  // 3. Fade in mouse scroll indicator
  if (scrollIndicator) {
    tl.to(scrollIndicator, {
      opacity: 0.5,
      duration: 0.8
    }, '-=0.6');
  }
}
