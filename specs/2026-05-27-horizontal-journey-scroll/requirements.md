# Requirements: Horizontal Journey Scroll (Z-Pattern)

## Scope

Ristrutturare completamente il layout e l'architettura interattiva del sito, partendo dall'itinerary section verticale esistente e trasformando l'intera pagina in un'unica narrazione visiva percorsa da un **"fil rouge" a pallina su binario SVG continuo** che colleghi tutte le sezioni, dall'Hero alla sezione finale.

La nuova architettura è composta da 4 sezioni principali:

1. **Hero** — invariata nel contenuto, ma con l'inizio del binario SVG globale
2. **Journey** — scroll orizzontale Z-pattern con station cards integrate (sostituisce sia `#itinerary` che `#gallery`)
3. **Useful Links** — nuova sezione finale con placeholder per link da compilare successivamente
4. **Footer** — invariato, fine del binario SVG globale

---

## Cambiamenti Strutturali Rispetto al Precedente

| Sezione precedente | Destino |
|---|---|
| `#hero` | ✅ Mantenuta — aggiunto l'inizio del binario SVG |
| `#itinerary` (verticale) | 🔄 Sostituita da `#journey` (scroll orizzontale Z-pattern) |
| `#gallery` (orizzontale separata) | 🗑️ **Rimossa** — le foto sono integrate direttamente nelle station card dentro `#journey` |
| `components/Hero3D.js` + Three.js | 🗑️ **Rimosso** — sfondo 3D eliminato per favorire minimalismo |
| Footer | ✅ Mantenuto |
| _(nuova)_ `#useful-links` | ✨ Nuova sezione prima del footer |

---

## Il Fil Rouge Globale: Binario SVG Continuo

### Concetto

Un **singolo SVG** in `position: fixed` (o `absolute` sull'intero document) copre tutta l'altezza della pagina. Contiene:
- Un `<path id="global-track">` che percorre verticalmente Hero → Journey → Useful Links → Footer
- All'interno della sezione Journey, il tracciato devia orizzontalmente per seguire lo scroll pinned
- Un `<circle id="train-dot">` (la pallina) animato lungo il tracciato via `MotionPathPlugin` sincronizzato con lo scroll via `ScrollTrigger scrub`

### Comportamento della Pallina

| Sezione | Comportamento del dot |
|---|---|
| Hero | Dot compare e scende lentamente con lo scroll |
| Journey (andata, L→R) | Dot trasla orizzontalmente insieme alle card |
| Journey (U-turn Uppsala) | Dot curva e torna indietro |
| Journey (ritorno, R→L) | Dot risale verso destra nella strip ritorno |
| Useful Links | Dot torna verticale e scende verso il footer |
| Footer | Dot arriva al capolinea |

### Implementazione Tecnica

```javascript
// animations/journeyAnimations.js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Dot segue l'intero path globale sincronizzato con lo scroll della pagina
gsap.to('#train-dot', {
  motionPath: {
    path: '#global-track',
    align: '#global-track',
    alignOrigin: [0.5, 0.5],
    autoRotate: false
  },
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1
  }
});
```

---

## Sezione 1: Hero

**Invariata** nel contenuto (titolo kinetic, subtitle, navbar).

**Aggiunta**: l'SVG globale con `#global-track` e `#train-dot` inizia qui.
Il dot è inizialmente posizionato all'inizio del path (top dell'SVG).

**Rimozione**: `Hero3D.js` e Three.js background particle system eliminati.

---

## Sezione 2: Journey (Scroll Orizzontale Z-Pattern)

### Struttura HTML

```html
<section id="journey" class="journey-section">
  <!-- SVG global track attraversa questa sezione -->
  
  <!-- Strip orizzontale pinnata -->
  <div id="journey-strip" class="journey-strip">
    
    <!-- ANDATA: Firenze → Uppsala (left → right) -->
    <div id="outbound-track" class="journey-track outbound">
      <!-- Station cards per: Firenze, Copenhagen, Stockholm, Uppsala -->
    </div>

    <!-- U-TURN: raccordo verticale visivo a Uppsala -->
    <div class="journey-uturn"></div>

    <!-- RITORNO: Uppsala → Firenze (right → left) -->
    <div id="return-track" class="journey-track return">
      <!-- Station cards per: Hamburg, Munich, Florence -->
    </div>

  </div>
</section>
```

### Percorso Completo (7 stazioni da config.js)

```
ANDATA  (left → right):
  Firenze  →  Copenhagen  →  Stockholm  →  Uppsala
                                              ↓
RITORNO (right → left):
  Florence  ←  Munich  ←  Hamburg  ←  Uppsala
```

> **Nota**: `firenze-return` è lo stesso nodo di `firenze` — visivamente il cerchio si chiude.

### Station Card: Struttura e Dati

Ogni card è **autonoma e unisce** la vecchia experience card e la gallery card.

**Dati visualizzati** (da `config.js`):
- Nome città e paese
- Periodo (date)
- Giorni di permanenza (calcolati da date)
- Costo stimato (nuovo campo in `config.js`: `estimatedCost`)
- Ostello (campo esistente: `accommodation`)
- Descrizione breve

**Interazioni**:
- Click su `[data-action="open-gallery"]` → apre `<dialog id="gallery-{cityId}">` in modal
- Dentro il dialog:
  - Griglia foto (esistenti da `config.albums`)
  - Pulsante **"Carica foto"** → `<input type="file" accept="image/*" multiple>` per upload da UI
  - Upload salva in `localStorage` (base64) — persistenza locale, nessun backend richiesto per ora
  - Foto caricate si aggiungono alla griglia in tempo reale

**Interfaccia `StationCard` (API del componente)**:

```javascript
// components/JourneySection.js
function createStationCard(station, album) {
  /**
   * @param {Object} station - da config.stations[]
   * @param {string} station.id
   * @param {string} station.cityName
   * @param {string} station.country
   * @param {string} station.date
   * @param {string} station.accommodation
   * @param {string} station.description
   * @param {string} station.type       // 'outgoing' | 'u-turn' | 'return'
   * @param {number} station.estimatedCost  // [NUOVO] €/persona/giorno (hardcoded per ora)
   * @param {string} station.featuredImage
   *
   * @param {Object|null} album - da config.albums[], matched per cityName
   * @param {string[]} album.photoPaths
   *
   * @returns {HTMLElement} article.station-card
   */
}
```

### Micro-interazione Termica (Palette dinamica)

La palette del sito varia in continuo in base alla posizione geografica nel percorso:

| Posizione nel viaggio | `--color-accent` | `--color-bg` | Senso geografico |
|---|---|---|---|
| Firenze (partenza) | `#E8A87C` amber | `#12100E` warm dark | Italia, caldo |
| Copenhagen | `#7FAFD5` steel blue | `#0E1318` | Scandinavia, fresco |
| Stockholm/Uppsala | `#5B9BD5` ice blue | `#0A0E14` arctic | Nord Europa, freddo |
| Hamburg (ritorno) | `#7FAFD5` | `#0E1318` | Di nuovo fresco |
| Munich | `#B8A98A` sandy | `#0F0D0B` | Centro Europa, tepido |
| Firenze (arrivo) | `#E8A87C` amber | `#12100E` warm dark | Italia, caldo |

Implementazione: `gsap.to(document.documentElement, { '--color-accent': value, ... })` nell'`onUpdate` dello scrub.

---

## Sezione 3: Useful Links

**Nuova sezione** placeholder, posizionata subito prima del footer.

**Contenuto**:
- Titolo sezione: "Risorse Utili"
- Una griglia di card link (inizialmente vuote/placeholder) con:
  - Icona categoria (SVG inline)
  - Titolo link
  - URL (da compilare in `config.js`)
  - Descrizione breve

**Struttura dati in `config.js`** (nuovo campo):

```javascript
usefulLinks: [
  { label: 'Interrail Pass', url: '#', description: 'Acquisto e gestione del pass', icon: 'train' },
  { label: 'Booking.com', url: '#', description: 'Ostelli e alloggi', icon: 'bed' },
  { label: 'DB Navigator', url: '#', description: 'Orari treni tedeschi', icon: 'clock' },
  { label: 'Maps.me', url: '#', description: 'Mappe offline per il viaggio', icon: 'map' },
]
```

Il binario SVG attraversa anche questa sezione prima di terminare nel footer.

---

## Design System

### Estetica: "Nordic Station Board"

Minimalista, d'impatto, elegante. Ispirato alle tabelle dei treni e alle stazioni nordiche (SJ, DSB, ÖBB). Precisione tipografica, molto spazio negativo, accenti luminosi sparsi.

### Typography

| Ruolo | Font | Note |
|---|---|---|
| Display / Hero title | `DM Serif Display` | Serif nordico raffinato — solo per il titolo principale |
| Body / Labels | `Chivo` | Sans-serif geometrica, peso 300–500 |
| Dati treno / codici | `Chivo Mono` | Per orari, costi, codici stazione — stile departures board |

> Caricati via Google Fonts CDN in `index.html`. **Non usare** Inter, Outfit, Space Grotesk.

### Cold Nordic Color Palette

```css
:root {
  --color-bg:         #0A0E14;   /* Deep arctic night */
  --color-surface:    #111820;   /* Card surface */
  --color-border:     #1E2D3D;   /* Bordi freddi */
  --color-accent:     #5B9BD5;   /* Nordic steel blue — valore base, interpolato via JS */
  --color-accent-alt: #A8D4F5;   /* Ice highlight */
  --color-warm:       #E8A87C;   /* Amber — Firenze / Sud */
  --color-text:       #E8EDF5;   /* Crisp white */
  --color-text-muted: #6B7FA3;   /* Muted gray-blue */
  --color-rail:       rgba(255,255,255,0.12); /* Binario SVG sfondo */
  --color-dot:        #FFFFFF;   /* Pallina treno */
}
```

### Iconography

SVG inline per: `train`, `bed`, `clock`, `coin`, `camera`, `map`, `link`.
Stile: line-icons minimal, `stroke` only, `stroke-width: 1.5`.

---

## Vincoli Tecnici

| Vincolo | Dettaglio |
|---|---|
| Stack | Vanilla JS ES Modules, HTML5, CSS3 — **no framework** |
| Bundler | Vite (già configurato) |
| Animazioni | GSAP core + ScrollTrigger + MotionPathPlugin (tutti inclusi in `gsap` npm) |
| Smooth scroll | `lenis` (già installato `v1.3.23`) |
| Modal | HTML5 `<dialog>` nativo — no librerie |
| Upload foto | `<input type="file">` + `FileReader` API + `localStorage` |
| GSAP plugin premium | ❌ ZERO — nessun plugin a pagamento |
| Three.js / Hero3D | ❌ RIMOSSO — per favorire pulizia e performance |
| Mobile fallback | Layout verticale scrollabile sotto `768px` — no scroll orizzontale |
| Deploy | Vercel static site, `npm run build` → `/dist` |
| Accessibilità | `<dialog>` con focus trap, `aria-label` su bottoni icon-only, contrasto WCAG AA |

---

## Modifiche a `config.js`

Aggiungere ai campi esistenti:

```javascript
// In ogni station object:
estimatedCost: 45,  // € stimati per persona per notte (da rifinire)

// Nuovo campo top-level:
usefulLinks: [ /* vedi Sezione 3 */ ]
```

---

## Out of Scope (per questa feature)

- Backend / storage reale per le foto (tutto in `localStorage`)
- Dati reali e definitivi di costi e orari treni
- Animazioni atmosferiche avanzate (aurora, neve, ecc.)
- Internazionalizzazione (solo italiano/inglese misto come ora)
