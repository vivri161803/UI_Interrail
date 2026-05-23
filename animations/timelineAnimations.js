// animations/timelineAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initTimelineAnimations() {
  const activeTrack = document.getElementById('active-track');
  if (!activeTrack) return;

  // 1. Setup S-Curve SVG Path Drawing
  let pathLength = activeTrack.getTotalLength();
  
  // Initialize stroke styles
  activeTrack.style.strokeDasharray = pathLength;
  activeTrack.style.strokeDashoffset = pathLength;

  // Animate the path drawing linked directly to scroll
  const pathTween = gsap.to(activeTrack, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top 35%',
      end: 'bottom 75%',
      scrub: 0.5,
    }
  });

  // Handle window resizing to recalculate path length dynamically
  window.addEventListener('resize', () => {
    // Kill existing triggers or refresh ScrollTrigger to get correct bounds
    ScrollTrigger.refresh();
    
    // Recalculate path length
    const newLength = activeTrack.getTotalLength();
    activeTrack.style.strokeDasharray = newLength;
    
    // Adjust current offset based on the scroll progress
    const progress = pathTween.scrollTrigger ? pathTween.scrollTrigger.progress : 0;
    activeTrack.style.strokeDashoffset = newLength * (1 - progress);
  });

  // 2. Station Cards Reveal (Blur & Fade) & Node Activation
  const cards = document.querySelectorAll('.station-card');
  cards.forEach(card => {
    const stationId = card.dataset.stationId;
    const node = document.querySelector(`.station-node-${stationId}`);

    // Set initial hidden states (blur and fade-out)
    gsap.set(card, { 
      opacity: 0, 
      filter: 'blur(10px)', 
      y: 40 
    });

    // Create trigger for each station
    gsap.to(card, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 70%', // Triggers reveal when card top enters 70% of viewport
        onEnter: () => {
          card.style.filter = 'none'; // fully remove filter for subpixel text rendering
          if (node) node.classList.add('active');
        },
        onLeaveBack: () => {
          if (node) node.classList.remove('active');
        }
      }
    });
  });
}
