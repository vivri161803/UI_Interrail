// animations/heroAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export function initHeroAnimations() {
  const title = document.getElementById('hero-title');
  const target = document.getElementById('logo-target');
  const originalContainer = document.querySelector('.hero-title-container');
  const subtitle = document.getElementById('hero-subtitle');

  if (!title) return;

  const chars = title.querySelectorAll('.char');

  // ── 1. Navbar Scroll effect ──
  ScrollTrigger.create({
    trigger: "#itinerary",
    start: "top 90%",
    end: "top 10%",
    scrub: true,
    onUpdate: (self) => {
      const navbar = document.querySelector('.top-navbar');
      if (navbar) {
        if (self.progress > 0.05) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }
  });

  ScrollTrigger.refresh();

  // ── 2. Entrance Animations (staggered left-to-right) ──
  if (chars.length > 0) {
    gsap.set(chars, {
      x: -60,
      opacity: 0
    });

    if (subtitle) gsap.set(subtitle, { y: 22, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(chars, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.06
    });

    if (subtitle) {
      tl.to(subtitle, {
        y: 0,
        opacity: 1,
        duration: 1.0
      }, '-=0.4');
    }

    // ── 3. Initialize Draggable on "#spin-year" ──
    tl.add(() => {
      if (document.getElementById('spin-year')) {
        Draggable.create("#spin-year", {
          type: "rotation",
          inertia: false
        });
      }
    });
  }
}

