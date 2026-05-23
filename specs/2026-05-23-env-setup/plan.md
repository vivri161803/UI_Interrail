# Feature Plan: Phase 0 Environment Setup

This plan details the numbered task groups to set up the development environment.

## Task Group 1: Vite Project Initialization
1. Execute Vite scaffolding command to set up the Vanilla JS skeleton in the current folder.
2. Clean up any default boilerplate files created by Vite that do not match our architecture (like default `counter.js`, `javascript.svg`, etc.).
3. Update `package.json` with the project name `"interrail-landing"`.

## Task Group 2: Install Dependencies
1. Run npm install command for `gsap` library.
2. Verify dependencies are successfully recorded in `package.json` and resolved in `node_modules`.

## Task Group 3: Scaffolding Directory Structure
1. Create the directories:
   - `styles/components`
   - `components`
   - `animations`
   - `assets`
2. Set up initial blank files for later phases:
   - `styles/main.css`
   - `styles/components/hero.css`
   - `styles/components/timeline.css`
   - `styles/components/gallery.css`
   - `styles/components/packing.css`
   - `styles/components/footer.css`
   - `components/HeroSection.js`
   - `components/RouteTimeline.js`
   - `components/GallerySection.js`
   - `components/PackingList.js`
   - `components/FooterSection.js`
   - `animations/mainAnimations.js`
   - `animations/heroAnimations.js`
   - `animations/timelineAnimations.js`

## Task Group 4: Verify Local Environment
1. Ensure the dev server starts correctly via `npm run dev`.
2. Confirm the static build runs successfully via `npm run build`.
