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
  const outer  = document.querySelector('.horizontal-gallery-outer');
  const inner  = document.getElementById('gallery-horizontal-wrapper');
  if (!outer || !inner) return;

  // Total horizontal distance to travel = total inner width minus one viewport width
  const getTravelDistance = () => -(inner.scrollWidth - window.innerWidth);

  const galleryTween = gsap.to(inner, {
    x: getTravelDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: outer,
      pin: true,                // pins the outer section while scrolling
      scrub: 1,
      start: 'top top',
      // end: scroll length proportional to number of panels
      end: () => `+=${inner.scrollWidth - window.innerWidth}`,
      invalidateOnRefresh: true // recalculates on resize
    }
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}
