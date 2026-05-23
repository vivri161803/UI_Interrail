// animations/mainAnimations.js
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHeroAnimations }     from "./heroAnimations.js";
import { initTimelineAnimations } from "./timelineAnimations.js";

gsap.registerPlugin(ScrollTrigger);

export function initGlobalAnimations() {
  initHeroAnimations();
  initTimelineAnimations();
  initHorizontalGallery();
}

// ── Horizontal Gallery: vertical scroll → horizontal translate ────────────
function initHorizontalGallery() {
  const outer   = document.querySelector('.horizontal-gallery-outer');
  const inner   = document.getElementById('gallery-horizontal-wrapper');
  const navHint = document.querySelector('.gallery-nav-hint');
  if (!outer || !inner) return;

  gsap.to(inner, {
    x: () => -(inner.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: outer,
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${inner.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true,

      // Show hint only while gallery is active (pinned)
      onEnter:     () => navHint?.classList.add('visible'),
      onLeave:     () => navHint?.classList.remove('visible'),
      onEnterBack: () => navHint?.classList.add('visible'),
      onLeaveBack: () => navHint?.classList.remove('visible'),
    }
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh());
}
