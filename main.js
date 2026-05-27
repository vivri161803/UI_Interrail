// main.js — Entry point for UI Interrail Travel Journal
import './styles/main.css';

// Component CSS
import './styles/components/hero.css';
import './styles/components/journey.css';
import './styles/components/useful-links.css';
import './styles/components/footer.css';

// Component Logic
import { initHeroSection }         from './components/HeroSection.js';
import { initJourneySection }      from './components/JourneySection.js';
import { initUsefulLinksSection }  from './components/UsefulLinksSection.js';
import { initFooterSection }       from './components/FooterSection.js';
import { initParticleGrid }        from './components/ParticleGrid.js';

// Animations
import { initGlobalAnimations }    from './animations/mainAnimations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle grid background (canvas)
  initParticleGrid();

  // 2. Hydrate all components
  initHeroSection();
  initJourneySection();
  initUsefulLinksSection();
  initFooterSection();

  // 3. Start all animations (Lenis + GSAP + ScrollTrigger)
  initGlobalAnimations();
});
