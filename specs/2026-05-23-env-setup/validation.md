# Feature Validation: Phase 0 Environment Setup

Use this checklist to verify that the environment has been successfully configured.

## Verification Checklist

### 1. File Structure Validation
Confirm the existence of the following directories and files:
- [ ] `package.json`
- [ ] `node_modules/gsap`
- [ ] `styles/main.css`
- [ ] `styles/components/`
- [ ] `components/`
- [ ] `animations/`
- [ ] `assets/`

### 2. Package Configuration
- [ ] `package.json` has `"name": "interrail-landing"`.
- [ ] `package.json` lists `gsap` as a dependency.
- [ ] `package.json` contains scripts for `dev`, `build`, and `preview`.

### 3. Server & Build Testing
- [ ] Running `npm run dev` starts the Vite local development server on port 5173 (or next available).
- [ ] Opening the development page in a browser displays no console errors related to module imports or file paths.
- [ ] Running `npm run build` completes successfully with no warnings/errors and creates a `dist/` directory with static assets.
