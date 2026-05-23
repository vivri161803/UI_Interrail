# Requirements: Travel Journal Implementation (Phases 2, 3, 4)

## Context
Having configured the Vite environment and GSAP installation in Phase 0-1, we now implement the full visual and interactive travel journal. This covers static layout styling, interactive features (stateful packing checklist, dynamic route injection), and GSAP ScrollTrigger animations.

## Scope
1. **Configurable Data Schema:** Create a root `config.js` containing:
   - Station list (name, dates, host/hotel information, travel notes, photo path).
   - Packing list items (category, items).
   - Gallery configuration (title, image path, description).
2. **Static Layouts (Phase 2):**
   - **Hero:** Text, title wrapper with mask-reveal structure.
   - **Route Timeline:** Serpentine (S-Curve) vertical SVG layout with station cards positioned next to path coordinates. Outgoing stops on the left, return stops on the right, connected via a smooth curve.
   - **Gallery/Moodboard:** CSS Grid layout with image placeholders and text overlays.
   - **Attractions:** Checklist items with clean grid layout.
   - **Footer:** Minimal credits block.
3. **Interactive JavaScript Logic (Phase 3):**
   - packing checklist interactivity (marking items checked/unchecked, stored in `localStorage`).
   - Dynamically load stations and packing list from `config.js`.
4. **GSAP ScrollTrigger & Effects (Phase 4):**
   - **Hero Intro:** Staggered letter-reveal on page load.
   - **Timeline Track Drawing:** Animate SVG S-Curve path stroke-dashoffset to draw as user scrolls.
   - **Station Reveals:** Trigger opacity/blur reveals on each Station Card exactly when the SVG drawing line tip passes the card.
   - **Gallery hover scaling & scroll marquee effects.**
5. **Aesthetic Guide & Customization:**
   - Create a project `README.md` at the root explaining how to replace placeholders in `assets/` and customize content in `config.js`.

## Technical & Design Decisions
- **S-Curve Drawing (Stroke Dash Trick):** The serpentine path is an SVG with `stroke-dasharray` and `stroke-dashoffset` animated using GSAP ScrollTrigger with `scrub: 1` to draw it as you scroll.
- **GSAP SplitText Fallback:** Use a custom JS helper to wrap letters of "Interrail 2026" in `span` tags dynamically to avoid premium plugin dependency, animating `y` translate and opacity.
- **Vercel Readiness:** Build outputs to standard `dist` folder. All resources are loaded relatively.
