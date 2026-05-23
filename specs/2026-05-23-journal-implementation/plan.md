# Plan: Travel Journal Implementation (Phases 2, 3, 4)

This document maps out the implementation steps for the layout, interactivity, and animations of the Interrail Travel Journal.

## Task Group 1: Setup Central Config & Schema
1. Create `config.js` in the root workspace.
2. Structure the data schema:
   - `timelineData`: Arrays of station objects (name, date, hostInfo, description, position: left/right).
   - `packingList`: Checklist groups (Essentials, Tech, Clothing, etc.).
   - `galleryData`: Image paths (initially local placeholder SVGs/blocks) and captions.

## Task Group 2: Static Component Layouts (Phase 2)
1. **Index HTML structure:** Ensure sections exist in `index.html` with correct IDs and class targets.
2. **Design S-Curve Path:** Create an inline SVG in the timeline container containing a serpentine path (descending left, curving at Uppsala, descending right).
3. **Write Component CSS:**
   - **Hero CSS:** Centered typography, dark background with subtle blue gradients.
   - **Timeline CSS:** Serpentine path layout, station cards positioning, train track styling.
   - **Gallery CSS:** Clean CSS Grid with fixed aspect ratio image blocks and elegant caption overlays.
   - **Packing CSS:** Checklist columns, custom checkboxes with cool hover/checked states.
   - **Footer CSS:** Centered, tiny minimal text.

## Task Group 3: Dynamic Binding & Interactivity (Phase 3)
1. **Hydrate Route Timeline:** Loop over `timelineData` and inject `<div class="station-card">` elements into the DOM, applying correct CSS coordinates/flex alignment based on whether it is an outgoing (left) or return (right) stop.
2. **Hydrate Packing List:** Dynamically generate checklist sections from `config.js`.
3. **Local Storage Checklist State:** Add event listeners to checklist items. Store checked states in `localStorage` by item ID/name. Recover checked state on page load.

## Task Group 4: GSAP & ScrollTrigger Animations (Phase 4)
1. **Custom Text Split Reveal:** In `animations/heroAnimations.js`, write a function to split titles into characters (wrapped in span tags) and stagger reveal them (fade-in, slide-up) on load.
2. **Track Drawing Animation:** In `animations/timelineAnimations.js`, measure the SVG path length using JS (`path.getTotalLength()`). Animate `strokeDashoffset` to 0 with ScrollTrigger bound to the page scroll position (`scrub: 1`).
3. **Synchronized Card Reveal:** Hook the station card transitions (opacity: 0, filter: blur -> opacity: 1, filter: none) to ScrollTrigger coordinates as the SVG path draws downwards.
4. **Marquee & Hover Effects:** Add horizontal running marquee of city names in the background.

## Task Group 5: Project Documentation
1. Create root [README.md](file:///Users/vivri161803/Documents/Code/UI_Interrail/README.md) detailing where to place photos in `assets/`, how to update names/dates in `config.js`, and how to run/build the project.
