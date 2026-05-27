// animations/journeyAnimations.js
// Handles: Lenis smooth scroll, journey horizontal pin+scrub,
// station card reveals. No rail system.
import { gsap }          from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis             from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

/* ─── JOURNEY HORIZONTAL SCROLL ───────────────────────── */
function initJourneyScroll() {
  const viewport = document.getElementById('journey-viewport');
  const strip    = document.getElementById('journey-strip');
  if (!viewport || !strip) return;

  const isMobile = () => window.innerWidth <= 768;
  if (isMobile()) return;

  const getScrollDist = () => strip.scrollWidth - window.innerWidth;

  gsap.to(strip, {
    x: () => -getScrollDist(),
    ease: 'none',
    scrollTrigger: {
      trigger: viewport,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      start: 'top top',
      end: () => `+=${getScrollDist()}`,
      invalidateOnRefresh: true,
    }
  });

  // Card reveals
  const cards = [...document.querySelectorAll('.station-card')];
  cards.forEach(card => {
    gsap.set(card, { opacity: 0, y: 20, scale: 0.97 });
  });

  ScrollTrigger.create({
    trigger: viewport,
    start: 'top top',
    end: () => `+=${getScrollDist()}`,
    scrub: false,
    onUpdate() {
      const stripX = -(gsap.getProperty(strip, 'x') || 0);
      const viewCenter = window.innerWidth / 2;

      cards.forEach(card => {
        if (card.dataset.revealed === '1') return;
        const cardMid = card.offsetLeft + card.offsetWidth / 2;
        const cardInView = cardMid - stripX;
        const tolerance = window.innerWidth * 0.65;

        if (Math.abs(cardInView - viewCenter) < tolerance) {
          card.dataset.revealed = '1';
          gsap.to(card, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    }
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh());
}

/* ─── NAVBAR ──────────────────────────────────────────── */
function initNavbarScroll() {
  ScrollTrigger.create({
    trigger: '#journey',
    start: 'top 90%',
    onEnter:     () => document.querySelector('.top-navbar')?.classList.add('scrolled'),
    onLeaveBack: () => document.querySelector('.top-navbar')?.classList.remove('scrolled'),
  });
}

/* ─── ENTRY POINT ─────────────────────────────────────── */
export function initJourneyAnimations() {
  initLenis();
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    initJourneyScroll();
    initNavbarScroll();
    window.addEventListener('resize', () => ScrollTrigger.refresh());
  });
}

export function setParticleGrid() {}
export function getLenis() { return lenis; }
