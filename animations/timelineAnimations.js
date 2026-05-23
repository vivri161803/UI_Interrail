// animations/timelineAnimations.js
import { gsap }          from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initTimelineAnimations() {
  const activeTrack = document.getElementById('active-track');
  if (!activeTrack) return;

  // ── 1. SVG Path drawing via strokeDashoffset ───────────────────────
  const pathLength = activeTrack.getTotalLength();
  activeTrack.style.strokeDasharray  = pathLength;
  activeTrack.style.strokeDashoffset = pathLength;

  gsap.to(activeTrack, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top 35%',
      end:   'bottom 75%',
      scrub: 0.6
    }
  });

  // Refresh on resize so bounds stay accurate
  window.addEventListener('resize', () => ScrollTrigger.refresh());

  // ── 2. Station cards + image box simultaneous reveal ──────────────
  const cards = document.querySelectorAll('.station-card');

  cards.forEach(card => {
    const stationId = card.dataset.stationId;
    const node      = document.querySelector(`.station-node-${stationId}`);
    const imageBox  = card.querySelector('.station-image-box');
    const textCol   = card.querySelector('.station-text-column');

    // Initial hidden states
    gsap.set(card,     { opacity: 0 });
    gsap.set(textCol,  { opacity: 0, filter: 'blur(10px)', y: 16 });
    if (imageBox) gsap.set(imageBox, { opacity: 0, scale: 0.88 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 72%',
      onEnter: () => {
        // Reveal the card wrapper itself
        gsap.to(card, { opacity: 1, duration: 0.01 });

        // Text: blur → sharp + slide up
        gsap.to(textCol, {
          opacity: 1, filter: 'blur(0px)', y: 0,
          duration: 0.75, ease: 'power2.out'
        });

        // Image box: scale up simultaneously
        if (imageBox) {
          gsap.to(imageBox, {
            opacity: 1, scale: 1,
            duration: 0.75, ease: 'power2.out',
            delay: 0.06   // very slight offset for depth feel
          });
        }

        // Light up the track node
        if (node) node.classList.add('active');
      },
      onLeaveBack: () => {
        gsap.set(card,    { opacity: 0 });
        gsap.set(textCol, { opacity: 0, filter: 'blur(10px)', y: 16 });
        if (imageBox) gsap.set(imageBox, { opacity: 0, scale: 0.88 });
        if (node) node.classList.remove('active');
      }
    });
  });
}
