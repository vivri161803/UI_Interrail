# Validation: Hero and Itinerary Animations

## Acceptance Criteria
- [ ] Running `npm install three` completes successfully and `three` is in `package.json`.
- [ ] `tech-stack.md` mentions Three.js installed via npm.
- [ ] The Hero Section title ("INTERRAIL 2026") animates with a staggered reveal from bottom to top using GSAP.
- [ ] The Hero Section subtitle fades in only after the title animation finishes.
- [ ] The Hero background contains a Three.js particle system mimicking a nordic night, reacting to mouse movement.
- [ ] The Three.js animation pauses when scrolling past the Hero Section (IntersectionObserver).
- [ ] On mobile devices, the Three.js canvas is replaced or disabled in favor of a static background.
- [ ] The Itinerary Timeline features horizontal moving, blurred CSS lights (Bokeh effect).
- [ ] The Transition from Hero to Timeline uses a Curtain Reveal (Timeline sliding over sticky Hero).
- [ ] The Transition from Gallery to Timeline features a Dark Separator div.
- [ ] `config.js` is updated with transition parameters.
