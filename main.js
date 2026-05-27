// main.js — Entry point for UI Interrail Travel Journal
import './styles/main.css';

// Component CSS
import './styles/components/hero.css';
import './styles/components/journey.css';
import './styles/components/useful-links.css';
import './styles/components/footer.css';
import './styles/components/login.css';

// Component Logic
import { initHeroSection }         from './components/HeroSection.js';
import { initJourneySection }      from './components/JourneySection.js';
import { initUsefulLinksSection }  from './components/UsefulLinksSection.js';
import { initFooterSection }       from './components/FooterSection.js';
import { initParticleGrid }        from './components/ParticleGrid.js';
import { initLoginSection }        from './components/LoginSection.js';

// Animations
import { initGlobalAnimations }    from './animations/mainAnimations.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Lock app by default until auth check completes
  document.body.classList.add('auth-locked');

  // 1. Initialize Auth State
  await initLoginSection();

  // 2. Particle grid background (canvas)
  initParticleGrid();

  // 3. Hydrate all components
  initHeroSection();
  initJourneySection();
  initUsefulLinksSection();
  initFooterSection();

  // 4. Start all animations (Lenis + GSAP + ScrollTrigger)
  initGlobalAnimations();
});
