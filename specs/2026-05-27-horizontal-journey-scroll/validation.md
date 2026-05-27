# Validation: Horizontal Journey Scroll (Z-Pattern)

## Come Testare

```bash
# Dev server locale
npm run dev

# Build produzione
npm run build
npm run preview
```

**Browser target**: Safari (primario), Chrome, Firefox  
**Viewport test**: 1440px desktop · 1024px laptop · 768px tablet · 390px iPhone 14

---

## Gruppo 1 — Pulizia & Config

- [ ] `Hero3D.js` non esiste più in `components/` e non è importato da `main.js`
- [ ] Console non mostra errori legati a Three.js
- [ ] `config.js` ha il campo `estimatedCost` in ogni station object
- [ ] `config.js` ha il campo top-level `usefulLinks` con almeno 4 placeholder
- [ ] `GallerySection.js` e `RouteTimeline.js` non esistono più in `components/`
- [ ] `timeline.css` e `gallery.css` non esistono più in `styles/components/`

---

## Gruppo 2 — Design System

- [ ] In `index.html`, i Google Fonts caricati sono **DM Serif Display**, **Chivo**, **Chivo Mono** (Outfit rimosso)
- [ ] In Network tab del browser: i 3 font vengono scaricati correttamente
- [ ] Il titolo Hero usa `DM Serif Display` (verificare in DevTools → Computed → font-family)
- [ ] I metadati delle station card usano `Chivo Mono` (orari, costi)
- [ ] Il body usa `Chivo` come font base
- [ ] Le CSS variables Cold Nordic sono definite in `:root` in `styles/main.css`:
  - `--color-bg: #0A0E14`
  - `--color-accent: #5B9BD5`
  - `--color-warm: #E8A87C`
  - `--color-text: #E8EDF5`
- [ ] Nessun overflow orizzontale involontario (`body` non ha `overflow-x: visible` senza controllo)

---

## Gruppo 3 — SVG Globale Binario

- [ ] L'elemento `<svg id="global-rail">` esiste nel DOM
- [ ] `#global-track` e `#global-track-active` e `#train-dot` esistono nell'SVG
- [ ] Il binario è visibile (traccia leggera) dall'alto dell'Hero fino al Footer
- [ ] Il binario non blocca i click sugli elementi sottostanti (`pointer-events: none` sull'SVG)
- [ ] La pallina `#train-dot` è visibile e ben proporzionata (cerchio bianco con glow sottile)

---

## Gruppo 4 — HTML & Struttura

- [ ] La sezione `#itinerary` non esiste più nel DOM
- [ ] La sezione `#gallery` separata non esiste più nel DOM
- [ ] Il `dark-separator` div non esiste più nel DOM
- [ ] La sezione `#journey` esiste con la struttura:
  ```
  #journey > #journey-strip > (#outbound-track + .journey-uturn + #return-track)
  ```
- [ ] La sezione `#useful-links` esiste prima del `<footer>`
- [ ] Dentro `#journey`, ci sono 7 `.station-card` in totale (4 andata + 3 ritorno)
- [ ] Ogni card ha: titolo città, date, costo, ostello, descrizione, bottone galleria
- [ ] Ogni stazione ha il suo `<dialog id="gallery-{cityId}">` nel DOM

---

## Gruppo 5 — Componenti JS

### Station Card

- [ ] Tutte le 7 stazioni sono renderizzate nell'ordine corretto (Firenze → Uppsala / Hamburg → Florence)
- [ ] `estimatedCost` viene letto da `config.js` e visualizzato nella card
- [ ] Il ghost button "Vedi Ricordi" (o icona macchina fotografica) è presente su ogni card
- [ ] Le connection pill tra le stazioni mostrano almeno un dato (es. "≈ 5h treno")

### Photo Dialog

- [ ] Click su "Vedi Ricordi" → `dialog.showModal()` si apre
- [ ] Il backdrop del dialog è scuro e semi-trasparente
- [ ] Click sul backdrop → dialog si chiude (`dialog.close()`)
- [ ] Pressione `Escape` → dialog si chiude
- [ ] Il focus viene intrappolato dentro il dialog (tab non va fuori)
- [ ] L'input file per upload è presente e funzionante
- [ ] Selezionando 1+ immagini dall'input file, le thumbnail appaiono nella griglia in tempo reale
- [ ] Ricaricando la pagina (F5), le foto caricate dall'utente **persistono** (localStorage)
- [ ] Le foto da `config.albums.photoPaths` vengono mostrate (come placeholder broken-image è ok se il file non esiste, ma la struttura HTML è corretta)

### Useful Links Section

- [ ] I 4 placeholder link di `config.usefulLinks` vengono renderizzati come card
- [ ] Ogni card mostra: icona, titolo, descrizione
- [ ] Il link è cliccabile (anche se punta a `#` per ora)

---

## Gruppo 6 — Animazioni

### Dot Motion

- [ ] All'inizio dello scroll (pagina top), il dot è nella posizione iniziale (top del path)
- [ ] Scrollando, il dot si muove lungo il path in modo fluido (scrub: no jank)
- [ ] Al termine dello scroll (footer), il dot è alla fine del path
- [ ] Il dot non "salta" in posizioni errate durante lo scroll veloce

### Journey Scroll Orizzontale

- [ ] La sezione `#journey` si pinna (blocca) sullo schermo durante lo scroll verticale
- [ ] Le station card dell'andata traslano da sinistra verso destra in modo fluido
- [ ] Raggiunta Uppsala, c'è un raccordo visivo (U-turn)
- [ ] Le station card del ritorno traslano da destra verso sinistra
- [ ] Dopo le ultime card del ritorno, la sezione si sblocca e lo scroll verticale riprende
- [ ] Lo scroll è fluido senza jank (Lenis integrato con ScrollTrigger)

### Station Card Reveal

- [ ] Ogni station card inizia invisible (`opacity: 0, blur`)
- [ ] Quando il dot "raggiunge" quella card durante lo scroll, la card fa il reveal blur→fade
- [ ] Le card non appaiono tutte insieme all'inizio della sezione

### Thermal Palette

- [ ] All'inizio (Hero/Firenze), `--color-accent` è vicino ad amber (`#E8A87C`)
- [ ] A metà viaggio (Stockholm/Uppsala), `--color-accent` è ice blue (`#5B9BD5`)
- [ ] La transizione di colore è continua e smooth (non un cambio brusco)
- [ ] Il background `--color-bg` cambia leggermente in tonalità durante il percorso

### Track Draw-In

- [ ] Il `#global-track-active` (SVG tratto colorato) si "disegna" progressivamente durante lo scroll
- [ ] La parte di track già percorsa è visibile in `--color-accent`, la parte non ancora percorsa è in `--color-rail` (semi-trasparente)

---

## Gruppo 7 — Mobile & Accessibilità

- [ ] Su viewport `≤ 768px`: nessuno scroll orizzontale pinned — le station card sono in layout verticale
- [ ] Su mobile: nessun overflow orizzontale involontario
- [ ] Su mobile: i dialog si aprono a schermo intero (o in stile bottom-sheet)
- [ ] Tutti i bottoni icon-only hanno `aria-label` descrittivo
- [ ] Il contrasto testo/sfondo è ≥ 4.5:1 (WCAG AA) sui testi principali
- [ ] La navigazione da tastiera funziona: Tab attraverso le sezioni, Enter apre i dialog
- [ ] `npm run build` termina senza errori o warning critici
- [ ] `/dist` deployato su Vercel: smoke test → pagina carica, scroll funziona, dialog funziona
