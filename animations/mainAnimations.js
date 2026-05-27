// animations/mainAnimations.js — Animation orchestrator
// Order matters: Lenis must be running before any ScrollTrigger is created.
import { gsap }                from 'gsap';
import { ScrollTrigger }       from 'gsap/ScrollTrigger';
import { initHeroAnimations }   from './heroAnimations.js';
import { initJourneyAnimations } from './journeyAnimations.js';

gsap.registerPlugin(ScrollTrigger);

export function initGlobalAnimations() {
  // 1. Journey animations init Lenis + ScrollTrigger sync — must be first
  initJourneyAnimations();

  // 2. Hero entrance animations
  initHeroAnimations();
}
