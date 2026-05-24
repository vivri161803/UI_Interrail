# Plan: Hero and Itinerary Animations

1. **Phase 1: Dependencies & Configuration**
   - Install `three` via npm.
   - Update `tech-stack.md` to reflect Three.js.
   - Update `config.js` to include parameters for transitions (Hero-Timeline and Gallery-Timeline).

2. **Phase 2: Hero Section UI & GSAP Animation**
   - Update `index.html` and `styles/components/hero.css` with the sticky curtain layout.
   - Implement `animations/heroAnimations.js` for the staggered text reveal and subtitle fade-up.
   - Create a text-splitting JS utility.

3. **Phase 3: Three.js Particle Background**
   - Create `components/Hero3D.js` to initialize the scene, camera, renderer, and points geometry.
   - Implement parallax mousemove.
   - Add IntersectionObserver to pause the render loop when the Hero is out of view.
   - Add a fallback mechanism to disable Three.js on low-end mobile devices (saving battery).

4. **Phase 4: Itinerary Section Bokeh Effect**
   - Update `styles/components/timeline.css` to add absolute divs representing light sources.
   - Use CSS `@keyframes` to animate opacity, filter blur, and horizontal translation to mimic a moving train window view.
   - Create the dark gallery separator div in `index.html` (30-50vh).
