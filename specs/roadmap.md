# Project Roadmap: UI Interrail Travel Journal

This roadmap divides the development into five distinct phases, following a strict "layout first, animations second" layered building approach.

---

## Phase: Core Modules & State Management Refinement
- [x] **config.js schema redesign:** `maxPhotosPerAlbum`, `stations` (cityName, featuredImage), `albums` array.
- [x] **Packing List removed** from index.html, main.js, components/, and styles/.
- [x] **Hero kinetic typography:** Train-braking letter reveal — `x: 160 → 0`, `skewX: -30 → 0`, `power4.out`, stagger `0.05s`.
- [x] **Background marquee removed** from Hero section.
- [x] **Serpentine station cards upgraded:** dual-column layout (text + featured image box).
- [x] **Timeline animations:** text blur/fade + image scale-up trigger simultaneously.
- [x] **Horizontal pinned gallery:** 6 album panels, vertical scroll → `translateX`, respects `maxPhotosPerAlbum`.

## Phase 0: setting up the enviroment for Vercel Deployment
- [x] Initialize the project by calling it `interrail-landing` using the vanilla JS template.
- [x] Install base dependencies via npm and explicitly add the gsap library.

## Phase 1: Foundations & Design System
- [x] Initialize the directory structure outlined in `specs/tech-stack.md`.
- [x] Create `index.html` referencing GSAP, ScrollTrigger, Google Fonts, and the base stylesheets.
- [x] Set up global CSS variables in `styles/main.css` for the design system (dark mode palette, fonts, spacing, reset).
- [x] Implement component scaffolding (create JS placeholder modules and CSS files).

## Phase 2: Static Component Layouts (Layering)
- [x] **Hero Section:** Title layout, subheadings, and layout background.
- [x] **Itinerario (Timeline):** Vertical train track line design and stop blocks (Oslo, Stoccolma, Copenhagen, etc.).
- [x] **Galleria/Moodboard:** Beautiful CSS Grid/Flexbox photogallery with hover scales and descriptions.
- [x] **Packing List:** Clean layout with checklist items categorized (Essentials, Tech, Clothing).
- [x] **Footer:** Clean minimalism, credits, and links.

## Phase 3: Interactive JS Logic
- [x] Implement local state for the Packing List (checking/unchecking items with persistent state via localStorage).
- [x] Inject route timeline data dynamically using JS config parameters to make the components easily editable.

## Phase 4: GSAP Animation & Wow Factor
- [x] **Hero Reveal:** Custom JS letter-splitting utility + GSAP timeline for a staggered masked reveal of "Interrail 2026".
- [x] **Timeline ScrollTrigger:** 
- [x] **Gallery Hover/Parallax:** Add smooth, micro-animated image movements and hover animations.
- [x] **Marquee Parallax:** Horizontal running marquee of train numbers/schedules in the background, accelerating with page scroll speed.

### 1. Technical Stack Constraints
- **Environment:** Vite + Vanilla JS (ES Modules).
- **Styling:** Vanilla CSS (use CSS variables for the design system).
- **Animation Engine:** GSAP (GreenSock) core + ScrollTrigger plugin ONLY. Do NOT use DrawSVGPlugin or any other paid plugins.

### 2. Layout & UI Architecture (Chronological Serpentine)
- Create an itinerary section where all stations are listed chronologically downwards. 
- The journey must be represented visually as a continuous "S-Curve" line.
- The path descends on the left side for the outgoing trip: Florence -> Copenhagen -> Stockholm -> Uppsala.
- At Uppsala, the line curves horizontally (U-turn) to the right side of the screen and continues downwards for the return trip: Hamburg -> Munich -> Florence.
- Create a reusable `<StationCard>` component (HTML/JS function) for each stop.

### 3. The Animation "Trick" (Strict Requirements)
Implement the drawing effect without paid plugins using the SVG Stroke Dash trick.

1. **The Track (SVG Path):** 
   - Draw the entire S-Curve using a single `<svg>` `<path>` element that spans the whole height of the section.
   - Use CSS properties `stroke-dasharray` and `stroke-dashoffset` initialized to the exact total length of the SVG path so that the line is initially hidden.

2. **The GSAP ScrollTrigger Logic:**
   - Bind the animation to the scroll position using `ScrollTrigger` with `scrub: 1` (no pinning).
   - As the user scrolls down, animate the `stroke-dashoffset` to `0` to simulate the line being drawn in real-time tracking the scroll progress.

3. **The Station Reveal (Blur & Fade):**
   - Each station's text/card must be initially hidden (opacity: 0, filter: blur(10px)).
   - Sync the timeline so that exactly when the tip of the drawing SVG line reaches a station's vertical coordinate, that specific station card triggers its reveal animation: animating to `opacity: 1` and `filter: blur(0px)` with a smooth ease (e.g., `power2.out`).

## Phase 5: Testing, Polish & Deployment
Using Safari as a browser:
- [ ] Perform cross-browser verification (Chrome, Safari, Firefox).
- [ ] Verify mobile responsiveness (touch targets, smaller viewports).
- [ ] Clean up CSS and JS comments.
- [ ] Confirm configuration for Vercel deployment.