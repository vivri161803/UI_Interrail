// main.js — Entry point for UI Interrail Travel Journal
import './styles/main.css';

// Component CSS
import './styles/components/hero.css';
import './styles/components/timeline.css';
import './styles/components/gallery.css';
import './styles/components/footer.css';

// Component Logic
import { initHeroSection }    from './components/HeroSection.js';
import { initRouteTimeline }  from './components/RouteTimeline.js';
import { initGallerySection } from './components/GallerySection.js';
import { initFooterSection }  from './components/FooterSection.js';

// Animations
import { initGlobalAnimations } from './animations/mainAnimations.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroSection();
  initRouteTimeline();
  initGallerySection();
  initFooterSection();

  // Animations always last — DOM must be fully hydrated first
  initGlobalAnimations();
});
