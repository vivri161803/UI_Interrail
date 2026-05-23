// animations/mainAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHeroAnimations } from "./heroAnimations.js";
import { initTimelineAnimations } from "./timelineAnimations.js";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function initGlobalAnimations() {
  console.log("Initializing GSAP animations...");
  
  // Initialize section animations
  initHeroAnimations();
  initTimelineAnimations();
  
  // Initialize dynamic marquee acceleration effect
  initMarqueeParallax();
}

function initMarqueeParallax() {
  const marqueeInner = document.querySelector('.marquee-inner');
  if (!marqueeInner) return;

  // Duplicate the text content once to allow continuous horizontal loop
  marqueeInner.innerHTML = marqueeInner.innerHTML + marqueeInner.innerHTML;

  // 1. Continuous slow marquee animation loop
  const marqueeTween = gsap.to(marqueeInner, {
    xPercent: -50,
    ease: "none",
    duration: 35,
    repeat: -1
  });

  // 2. Accelerate speed based on scroll velocity
  let delayTimeout;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const scrollVelocity = Math.abs(self.getVelocity());
      
      // Calculate speed scale (1 = normal, up to 7x for fast scrolls)
      const scaleValue = 1 + (scrollVelocity / 300);
      const cappedScale = Math.min(scaleValue, 7);

      // Smoothly animate timeScale of marquee tween to new value
      gsap.to(marqueeTween, { 
        timeScale: cappedScale, 
        duration: 0.3,
        overwrite: "auto"
      });

      // Clear previous timeout and schedule decelerating return to normal speed (timeScale = 1)
      clearTimeout(delayTimeout);
      delayTimeout = setTimeout(() => {
        gsap.to(marqueeTween, { 
          timeScale: 1, 
          duration: 1.5, 
          ease: "power2.out" 
        });
      }, 100);
    }
  });
}
