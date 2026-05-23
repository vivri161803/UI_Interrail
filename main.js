// main.js - Entry point for UI Interrail Travel Journal
import './styles/main.css';

// Import Component CSS Files
import './styles/components/hero.css';
import './styles/components/timeline.css';
import './styles/components/gallery.css';
import './styles/components/packing.css';
import './styles/components/footer.css';

// Import Component Init Functions
import { initHeroSection } from './components/HeroSection.js';
import { initRouteTimeline } from './components/RouteTimeline.js';
import { initGallerySection } from './components/GallerySection.js';
import { initPackingList } from './components/PackingList.js';
import { initFooterSection } from './components/FooterSection.js';

// Import Animations
import { initGlobalAnimations } from './animations/mainAnimations.js';

// Initialize Everything Once DOM is Loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("Initializing Interrail Travel Journal...");
  
  // Scaffolding base layouts
  initHeroSection();
  initRouteTimeline();
  initGallerySection();
  initPackingList();
  initFooterSection();
  
  // Launch GSAP scroll-triggered & intro animations
  initGlobalAnimations();
});
