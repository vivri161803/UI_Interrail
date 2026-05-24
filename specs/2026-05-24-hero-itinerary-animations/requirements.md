# Requirements: Hero and Itinerary Animations

## Scope
- Overhaul the Hero section to include GSAP text animations and a 3D Three.js particle background.
- Overhaul the Route Timeline (Itinerary) section's background to feature a CSS-only Bokeh effect.
- Implement specific transitions between scroll states (Curtain Reveal and Dark Gallery Separator).

## Context & Mission
The journal is for family and friends. The "Nordic Night" theme has been approved as visually fitting the tone. 
The current tech stack focuses on Vanilla JS, HTML, CSS, and GSAP.

## Decisions
1. **Three.js Installation:** The user approved installing Three.js via `npm` rather than a CDN. The `tech-stack.md` should be updated to reflect this.
2. **Performance Fallbacks:** We will use `IntersectionObserver` to pause the 3D loop when scrolled out of view. Additionally, we will detect low-end mobile devices (or use a media query for mobile/touch devices) to disable the 3D canvas entirely and show a static background instead, preserving battery life.
3. **No Canvas in Timeline:** The timeline's background animation will remain strictly CSS to preserve the frame rate and not overload the browser with multiple webgl contexts.
