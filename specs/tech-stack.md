# Project Tech Stack: UI Interrail Travel Journal

## Core Stack
- **Structure:** Semantic HTML5.
- **Styling:** Vanilla CSS3. Responsive design using Grid, Flexbox, and CSS Custom Properties (Variables) for a unified design system.
- **Logic:** Vanilla JavaScript (ES6 Modules) to enforce component-driven structures.

## Libraries & Integration
- **GreenSock Animation Platform (GSAP):**
  - Loaded via official CDN links (`gsap.min.js`).
  - **GSAP ScrollTrigger:** For scroll-bound timeline animations (`ScrollTrigger.min.js`).
  - **Text Reveal:** Custom vanilla JS logic to split text into `span` elements (letters/words) to achieve staggered letter reveals, bypassing the premium GSAP SplitText plugin.
- **Three.js:**
  - Installed via `npm install three`.
  - Used for 3D background effects (particle systems) with performance optimisations (IntersectionObserver and mobile fallbacks).
- **Typography:**
  - Google Fonts: `Inter` or `Outfit` loaded via CDN `<link>` tags.
- **Iconography:**
  - Sleek SVG icons embedded inline or dynamically loaded to ensure high performance and easy styling.

## Directory Structure
To maintain a clean and maintainable codebase, we follow a Component-Driven architecture:
```text
/
├── index.html                # Main entry point
├── styles/
│   ├── main.css              # Global styles, variables, reset
│   └── components/           # Component-specific styles
│       ├── hero.css
│       ├── timeline.css
│       ├── gallery.css
│       ├── packing.css
│       └── footer.css
├── components/
│   ├── HeroSection.js        # Hero component setup
│   ├── RouteTimeline.js      # Timeline component setup
│   ├── GallerySection.js     # Gallery grid setup
│   ├── PackingList.js        # Interactive packing checklist
│   └── FooterSection.js      # Footer component setup
├── animations/
│   ├── mainAnimations.js     # Main orchestrator for animations
│   ├── heroAnimations.js     # GSAP logic for hero intro
│   └── timelineAnimations.js # ScrollTrigger logic for timeline
└── assets/                   # Images, local icons, and audio/video files
```

## Deployment
- **Platform:** Vercel (Static Site deployment).
- **Build Step:** None (Zero-configuration vanilla static site).
