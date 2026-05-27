# Project Tech Stack: UI Interrail Travel Journal

## Core Stack
- **Structure:** Semantic HTML5 (incluso `<dialog>` nativo per le gallerie fotografiche).
- **Styling:** Vanilla CSS3. Responsive design usando Grid, Flexbox e CSS Custom Properties (Variables) per un design system centralizzato.
- **Logic:** Vanilla JavaScript (ES6 Modules) con architettura component-driven.
- **Bundler:** Vite (vanilla JS template, deploy statico su Vercel).

---

## Libraries & Integration

### Animation

- **GreenSock Animation Platform (GSAP):**
  - Installato via `npm install gsap`.
  - **GSAP ScrollTrigger:** Per animazioni scroll-bound con `scrub` e `pin`.
  - **GSAP MotionPathPlugin:** Incluso nel pacchetto npm `gsap` (gratuito). Usato per agganciare il dot-treno all'SVG path Z-pattern durante lo scroll.
  - **GSAP Draggable:** Incluso nel pacchetto npm `gsap`. Usato per interazioni drag (es. spin-year nel Hero).
  - **Text Reveal:** Custom vanilla JS per splittare il testo in `span` (letters/words) per staggered reveals — non usa SplitText (plugin premium).

### Smooth Scroll

- **Lenis** (`lenis`):
  - Installato via `npm install lenis`.
  - Smooth scrolling vanilla leggero. Si integra con ScrollTrigger via:
    ```javascript
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    ```
  - Indispensabile per il layout orizzontale "finto" (scroll verticale → translateX) senza jank.

### 3D / Visual

- **Three.js:**
  - Installato via `npm install three`.
  - Usato per background 3D (particle systems) nella Hero section con ottimizzazioni performance (IntersectionObserver, mobile fallback).

---

## Typography

### Font Stack (Cold Nordic)
Caricati via Google Fonts CDN `<link>` tags in `index.html`:

| Ruolo | Font | Carattere |
|---|---|---|
| Display / Hero | **DM Serif Display** | Serif nordico raffinato, editoriale |
| Body | **Chivo** | Sans-serif geometrica moderna, leggibile |
| Monospace (dati treno) | **Chivo Mono** | Per orari, prezzi, codici treno |

> ⚠️ **Evitare** Inter, Outfit, Roboto, Space Grotesk — troppo generici per l'estetica di questo progetto.

---

## Design System: Cold Nordic Palette

Definito come CSS Custom Properties in `styles/main.css`:

```css
:root {
  /* Background */
  --color-bg:         #0A0E14;   /* Deep arctic night */
  --color-surface:    #111820;   /* Surface elevata */
  --color-border:     #1E2D3D;   /* Bordi freddi */

  /* Accents */
  --color-accent:     #5B9BD5;   /* Nordic steel blue */
  --color-accent-alt: #A8D4F5;   /* Ice highlight */
  --color-warm:       #E8A87C;   /* Amber (Sud — Firenze) */

  /* Typography */
  --color-text:       #E8EDF5;   /* Crisp white */
  --color-text-muted: #6B7FA3;   /* Muted gray-blue */

  /* Font Stacks */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'Chivo', system-ui, sans-serif;
  --font-mono:    'Chivo Mono', 'Courier New', monospace;
}
```

### Micro-interazione Termica
Durante lo scroll della sezione Journey (oltre Uppsala, nel ritorno verso Sud), le CSS variables `--color-accent` e `--color-bg` interpolano via GSAP verso tonalità più calde (amber/ocra), rispecchiando il riscaldarsi del clima verso la fine del viaggio.

---

## Iconography

- SVG icons embeddati inline o caricati dinamicamente.
- Icone usate: orologio (durata), letto (ostello), moneta (costo), macchina fotografica (galleria).

---

## Directory Structure

Architettura Component-Driven:

```text
/
├── index.html                  # Entry point — Google Fonts, meta tags
├── main.js                     # Bootstrap: init Lenis + tutti i componenti
├── config.js                   # Dati viaggio: stazioni, album, settings
├── styles/
│   ├── main.css                # CSS vars, reset, global typography
│   └── components/
│       ├── hero.css
│       ├── journey.css         # Sostituisce timeline.css — layout orizzontale
│       ├── gallery.css
│       └── footer.css
├── components/
│   ├── HeroSection.js          # Hero con kinetic typography
│   ├── JourneySection.js       # Z-pattern scroll + station cards + dialog
│   ├── GallerySection.js       # Galleria pinned orizzontale
│   └── FooterSection.js        # Footer minimalista
├── animations/
│   ├── mainAnimations.js       # Orchestratore: Lenis init + tutti gli init
│   ├── heroAnimations.js       # GSAP entrance + Draggable spin-year
│   └── journeyAnimations.js    # MotionPathPlugin + ScrollTrigger pin/scrub
└── assets/                     # Immagini, icone SVG, audio/video
```

---

## Deployment

- **Platform:** Vercel (Static Site deployment).
- **Build Step:** `npm run build` (Vite bundla in `/dist`).
- **Dev Server:** `npm run dev`.
