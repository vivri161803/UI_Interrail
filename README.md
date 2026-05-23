# 🚂 Interrail 2026 — Nord Europa Travel Journal

Diario di viaggio interattivo a scorrimento singolo, animato con **GSAP + ScrollTrigger** e distribuito su **Vercel** come sito statico. Costruito con Vite + Vanilla JS/CSS.

---

## 🛠️ Personalizzare il sito: tutto passa da `config.js`

Apri **[config.js](./config.js)** nella root del progetto. Troverai un unico oggetto `config` con quattro sezioni. Non devi toccare altro per aggiornare tutti i contenuti visibili sul sito.

---

### 1. Testo dell'Hero (titolo e sottotitolo)

```js
meta: {
  title: "Interrail 2026",           // ← modifica il titolo principale
  subtitle: "Exploring the cold..."   // ← modifica il sottotitolo
},
```

---

### 2. Stazioni lungo la timeline a S (itinerario)

Ogni oggetto nell'array `stations` genera una **scheda stazione** sulla serpentina, con testo a sinistra e immagine a destra (o sotto, per la stazione di svolta Uppsala).

```js
stations: [
  {
    id: "firenze",          // ID univoco — NON modificare
    cityName: "Florence",   // ← Nome della città visualizzato sulla scheda
    country: "Italy",       // ← Paese visualizzato sotto il nome
    date: "August 1–2, 2026",              // ← Date del soggiorno
    accommodation: "Ostello Bello Firenze", // ← Nome dell'ostello/hotel
    description: "...",     // ← Diario di bordo: cosa hai visto e vissuto
    type: "outgoing",       // NON modificare: "outgoing" | "u-turn" | "return"
    featuredImage: "assets/Firenze1.png"   // ← vedi sezione 4 ↓
  },
  // ... altre stazioni
]
```

**Cosa puoi modificare liberamente:**
- `cityName`, `country`, `date`, `accommodation`, `description` → aggiorna con i tuoi dati reali
- `featuredImage` → percorso della foto da mostrare nella scheda (vedi sezione 4)

**Non modificare:**
- `id` e `type` — determinano la posizione sulla curva a S

---

### 3. Album fotografici della galleria orizzontale

La galleria mostra **6 album città** in scorrimento orizzontale. Ogni album può contenere al massimo `maxPhotosPerAlbum` foto (default: 8).

```js
maxPhotosPerAlbum: 8,  // ← cambia qui per aumentare o ridurre il limite globale

albums: [
  {
    cityName: "Florence",   // ← Nome visualizzato come titolo dell'album
    photoPaths: [           // ← Lista dei percorsi delle foto
      "assets/florence-01.jpg",
      "assets/florence-02.jpg",
      // aggiungi fino a maxPhotosPerAlbum elementi
    ]
  },
  // ... altri 5 album
]
```

---

### 4. Come aggiungere le tue foto

> ⚠️ **Tutte le foto devono stare in `public/assets/`** (non nella cartella `assets/` alla root).
> Questa è la cartella che Vite include nel build di produzione e che Vercel pubblica online.

**Foto accanto alle stazioni (timeline):**
1. Copia la foto in **`public/assets/`** (es. `public/assets/firenze-hero.jpg`)
2. In `config.js`, aggiorna il campo `featuredImage` della stazione corrispondente:
   ```js
   featuredImage: "assets/firenze-hero.jpg"
   ```
   *(il prefisso `assets/` è sufficiente — Vite risolve il percorso da `public/` automaticamente)*

**Foto degli album (galleria orizzontale):**
1. Copia le foto in **`public/assets/`** con nomi descrittivi (es. `florence-01.jpg`, `stockholm-03.jpg`)
2. In `config.js`, aggiorna l'array `photoPaths` dell'album corrispondente:
   ```js
   photoPaths: [
     "assets/florence-01.jpg",
     "assets/florence-02.jpg",
   ]
   ```
3. Il sito le carica e le visualizza automaticamente, uniformemente ridimensionate — nessun altro file da modificare

---

## 🚀 Avviare in locale

```bash
npm install       # solo la prima volta
npm run dev       # server locale su http://localhost:5173
npm run preview   # anteprima della versione di produzione (usa i file in dist/)
```

---

## 📦 Deploy su Vercel

Il progetto è configurato per il deploy statico automatico. Ogni push su `main` aggiorna il sito.

```bash
# Aggiungi le foto in public/assets/, aggiorna config.js, poi:
git add .
git commit -m "update: nuove foto e testi"
git push origin main
```

Vercel rileva il push e pubblica automaticamente la nuova versione in ~30 secondi.

**Build command:** `npm run build` | **Output dir:** `dist` (rilevati automaticamente da Vercel)
