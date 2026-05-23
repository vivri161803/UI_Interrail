# Validation: Travel Journal Features (Phases 2, 3, 4)

Use this guide to verify the implementation of the Travel Journal layout, scripting, and animations.

## Verification Checklist

### 1. Functional Configuration & Customization
- [ ] `config.js` is present in the root folder, containing active config objects.
- [ ] `README.md` is present in the root folder, detailing customization instructions for text and assets.

### 2. Static Layout & Hydration (Phase 2 & 3)
- [ ] Timeline section displays a serpentine path representing the journey.
- [ ] Station cards display correct city names, dates, accommodation, and descriptions dynamically rendered from `config.js`.
- [ ] Gallery shows structured photo cards with caption overlays.
- [ ] Packing checklist shows categorized items.
- [ ] Clicking packing checkboxes updates the item's checked state, which persists on page reload (localStorage verification).

### 3. GSAP Animations & Wow Effects (Phase 4)
- [ ] On initial page load, the Hero title "Interrail 2026" animates using a staggered letter-by-letter slide-up reveal.
- [ ] As the user scrolls, the S-Curve SVG path draws itself dynamically, tracking the scrollbar.
- [ ] When the scroll progress reaches each station card, the card triggers a smooth fade-in and unblurs (`filter: blur(0)`).
- [ ] Background text (e.g., city names, train codes) moves in a horizontal marquee speed-controlled by scroll.

### 4. Build & Console Check
- [ ] Run `npm run build` to verify standard production bundle succeeds with zero errors.
- [ ] Open the site in Safari or Chrome, open Developer Tools Console, and confirm there are no warnings, exceptions, or missing asset errors.
