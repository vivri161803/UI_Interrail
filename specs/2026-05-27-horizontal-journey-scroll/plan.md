# Plan: Horizontal Journey Scroll (Z-Pattern)

Approccio: **layout-first, animations-last**. Ogni gruppo produce output verificabile prima di passare al successivo.

---

## Gruppo 1 — Pulizia & Config

**Obiettivo**: rimuovere il codice obsoleto e aggiornare la configurazione dati.

- [ ] **1.1** Rimuovere `components/Hero3D.js` e tutte le sue invocazioni da `main.js`
- [ ] **1.2** Rimuovere `three` dalle dipendenze (`npm uninstall three`) se non più usato
- [ ] **1.3** Aggiornare `config.js`:
  - Aggiungere `estimatedCost` (€/notte) a ogni station object
  - Aggiungere campo top-level `usefulLinks: []` con 4 placeholder link
  - Rimuovere `transitions` (non più necessario)
- [ ] **1.4** Rimuovere `components/GallerySection.js` e il suo CSS `styles/components/gallery.css`
- [ ] **1.5** Rimuovere `components/RouteTimeline.js` e il suo CSS `styles/components/timeline.css`
- [ ] **1.6** Aggiornare `animations/mainAnimations.js`: rimuovere import di `initTimelineAnimations`, rimpiazzare con `initJourneyAnimations`

---

## Gruppo 2 — Design System (CSS Foundations)

**Obiettivo**: aggiornare il design system prima di toccare l'HTML.

- [ ] **2.1** Aggiornare `index.html` — Google Fonts:
  - Rimuovere `Outfit`
  - Aggiungere `DM Serif Display`, `Chivo`, `Chivo Mono`
- [ ] **2.2** Aggiornare `styles/main.css`:
  - Nuove CSS custom properties (Cold Nordic palette)
  - Nuovi font stack (`--font-display`, `--font-body`, `--font-mono`)
  - Rimuovere variabili obsolete (`--accent-primary`, ecc.)
  - Reset e base typography aggiornati
- [ ] **2.3** Creare `styles/components/journey.css` (da zero):
  - `.journey-section` — macro-container alto e pinnabile
  - `.journey-strip` — wrapper flex orizzontale
  - `.journey-track` — container orizzontale per le card
  - `.station-card` — card dual-column (info + featured image)
  - `.station-card__meta` — riga metadati con icone (clock, bed, coin)
  - `.station-card__gallery-btn` — ghost button per aprire dialog
  - `.journey-uturn` — spacer visivo del raccordo Uppsala
  - `.train-pill` — tooltip pill tra le stazioni (dati connessione)
  - Media query `@media (max-width: 768px)` — fallback verticale
- [ ] **2.4** Creare `styles/components/useful-links.css`:
  - `.useful-links-section` — layout griglia
  - `.link-card` — card con icona + titolo + descrizione + url
- [ ] **2.5** Aggiornare `styles/components/hero.css` — rimuovere stili bokeh, Three.js canvas
- [ ] **2.6** Aggiornare `styles/main.css` — rimuovere `.dark-separator` e stili gallery separata

---

## Gruppo 3 — SVG Globale del Binario

**Obiettivo**: costruire il percorso SVG continuo che attraversa tutta la pagina.

- [ ] **3.1** Aggiungere in `index.html` l'SVG globale in `position: fixed` (o `absolute`):
  ```html
  <svg id="global-rail" aria-hidden="true">
    <path id="global-track" class="track-bg" d="..." />
    <path id="global-track-active" d="..." />
    <circle id="train-dot" r="6" />
  </svg>
  ```
- [ ] **3.2** Il path SVG è composto da:
  - **Tratto Hero** — verticale, top → bottom della hero section
  - **Tratto Journey andata** — curva in orizzontale per la strip L→R
  - **U-turn Uppsala** — semicerchio raccordo
  - **Tratto Journey ritorno** — curva orizzontale R→L
  - **Tratto Useful Links** — verticale di discesa
  - **Footer capolinea** — terminazione con simbolo ●
- [ ] **3.3** CSS per il rail SVG:
  - `track-bg`: `stroke: var(--color-rail)`, `stroke-width: 2px`, `fill: none`
  - `track-active`: `stroke: var(--color-accent)`, `stroke-dasharray` / `stroke-dashoffset` per effetto draw-in
  - `#train-dot`: `fill: var(--color-dot)`, box-shadow glow

> **Nota tecnica**: il `viewBox` e il `d` del path saranno calcolati in coordinate viewport-relative. Usare `MotionPathPlugin.convertCoordinates()` se necessario per allineare dot agli elementi DOM.

---

## Gruppo 4 — HTML & Struttura Pagina

**Obiettivo**: costruire il nuovo markup delle sezioni.

- [ ] **4.1** Aggiornare `index.html` — rimuovere:
  - `<section id="itinerary">` (tutto il contenuto interno)
  - `<div class="dark-separator">`
  - `<section id="gallery">`
- [ ] **4.2** Aggiornare `index.html` — aggiungere:
  ```html
  <!-- Journey Section (orizzontale) -->
  <section id="journey" class="journey-section">
    <div id="journey-strip" class="journey-strip">
      <div id="outbound-track" class="journey-track outbound"></div>
      <div class="journey-uturn"></div>
      <div id="return-track" class="journey-track return"></div>
    </div>
  </section>

  <!-- Useful Links Section -->
  <section id="useful-links" class="useful-links-section">
    <div class="container">
      <h2 class="section-title">Risorse Utili</h2>
      <div id="links-grid" class="links-grid"></div>
    </div>
  </section>
  ```
- [ ] **4.3** Aggiungere `<dialog>` template per ogni stazione (generato da JS — vedi Gruppo 5)
- [ ] **4.4** Aggiornare la sezione Hero: rimuovere canvas Three.js

---

## Gruppo 5 — Componenti JavaScript

**Obiettivo**: implementare la logica dei componenti.

- [ ] **5.1** Creare `components/JourneySection.js`:
  - `initJourneySection()` — entry point
  - `buildJourneyStrip(stations, albums)` — costruisce le due track e inietta le card
  - `createStationCard(station, album)` → `HTMLElement` (article.station-card)
    - Card mostra: città, date, `estimatedCost`, `accommodation`, description
    - Ghost button `[data-action="open-gallery"]` → apre il dialog relativo
  - `createConnectionPill(fromStation, toStation)` → `HTMLElement` (div.train-pill) con icona treno + durata connessione
  - `buildGalleryDialog(station, album)` → `HTMLElement` (`<dialog>`)
    - Griglia foto da `album.photoPaths`
    - Foto caricate dall'utente (da `localStorage`)
    - `<input type="file" multiple accept="image/*">` per upload
    - Bottone chiusura (click backdrop o Escape)
  - `handlePhotoUpload(cityId, files)` — salva in `localStorage` come base64
  - `loadStoredPhotos(cityId)` → `string[]` — carica da `localStorage`
- [ ] **5.2** Creare `components/UsefulLinksSection.js`:
  - `initUsefulLinksSection(links)` — inietta le card da `config.usefulLinks`
  - `createLinkCard(link)` → `HTMLElement`
- [ ] **5.3** Aggiornare `main.js`:
  - Rimuovere import `Hero3D`, `GallerySection`, `RouteTimeline`
  - Aggiungere import `JourneySection`, `UsefulLinksSection`
  - Rimuovere init Three.js
  - Inizializzare Lenis prima di qualsiasi ScrollTrigger

---

## Gruppo 6 — Animazioni

**Obiettivo**: collegare il dot all'SVG e implementare tutte le animazioni scroll-driven.

- [ ] **6.1** Creare `animations/journeyAnimations.js`:
  - `initJourneyAnimations()` — entry point
  - **Lenis init + GSAP sync**:
    ```javascript
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    ```
  - **Dot globale** — `MotionPathPlugin` su `#global-track`, scrub sull'intera pagina
  - **Journey pin** — `ScrollTrigger` con `pin: true` su `#journey`, `scrub: 1`
  - **Outbound translateX** — tween su `#outbound-track` sincronizzato con pin scrub
  - **Return translateX** — tween su `#return-track` nel secondo blocco pin
  - **Station card reveal** — ogni `.station-card`: `opacity: 0, filter: blur(8px)` → reveal quando il dot raggiunge la card
  - **Track draw-in** — `stroke-dashoffset` del `#global-track-active` animato con scrub
  - **Thermal palette interpolation** — `onUpdate` del main scrub: interpola `--color-accent` e `--color-bg` in base al progresso del percorso (vedi lookup table in requirements.md)
- [ ] **6.2** Aggiornare `animations/heroAnimations.js`:
  - Rimuovere import e uso di `Draggable` se non più necessario (spin-year element rimosso?)
  - Mantenere entrance kinetic typography
- [ ] **6.3** Aggiornare `animations/mainAnimations.js`:
  - Import e chiamata a `initJourneyAnimations()` al posto di `initTimelineAnimations()`
  - Rimuovere `initHero3D()`

---

## Gruppo 7 — Verifica & Deploy

- [ ] **7.1** `npm run dev` — verifica tutto il flusso su localhost
- [ ] **7.2** Test scroll orizzontale in Chrome, Safari, Firefox
- [ ] **7.3** Test mobile (< 768px): verifica layout verticale fallback, nessun overflow
- [ ] **7.4** Test `<dialog>` photo upload: apri modal, carica foto, ricarica pagina → le foto persistono
- [ ] **7.5** Test thermal palette: verifica transizione colori durante scroll Journey
- [ ] **7.6** Test accessibilità: tab navigation, focus trap nei dialog, ARIA labels
- [ ] **7.7** `npm run build` — verifica che `/dist` sia corretto e senza errori
- [ ] **7.8** Deploy su Vercel e smoke test in produzione
