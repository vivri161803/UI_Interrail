# Feature Scope & Requirements: Phase 0 Environment Setup

## Context
We are setting up the development environment for a single-page interactive travel journal (`interrail-landing`). The project is built using Vite and Vanilla JS, following a component-driven structure with styling in vanilla CSS and animations powered strictly by GSAP (including ScrollTrigger).

## Scope
1. **Initialize Vite Project:** Setup Vite with the Vanilla JS template directly in the root workspace.
2. **Configure Package Metadata:** Adjust `package.json` to name the project `interrail-landing`.
3. **Install Dependencies:** Install `gsap` (which includes ScrollTrigger) via npm.
4. **Scaffold Folder Structure:** Create the project directories as defined in `specs/tech-stack.md`:
   - `styles/` (global CSS and component CSS subfolders)
   - `components/` (JS component files)
   - `animations/` (GSAP animation modules)
   - `assets/` (placeholder folder for images/icons)

## Decisions
- **Vite Vanilla Template:** Chosen for zero-config speed, native ES modules support, and easy static deployment to Vercel.
- **Root Level Setup:** The project files will live directly in the workspace root `/Users/vivri161803/Documents/Code/UI_Interrail` as per user instructions.
- **GSAP via npm:** Installing `gsap` package via npm to support ES Module imports (`import { gsap } from 'gsap'`) inside Vite, which is cleaner and safer than raw CDN `<script>` tags for compilation/bundling.
