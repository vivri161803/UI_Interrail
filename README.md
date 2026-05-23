# 🚂 Interrail 2026 — Nord Europe Travel Journal

Benvenuto nel tuo diario di viaggio Interrail! Questo progetto è una landing-page a scorrimento singolo interattiva, minimalista e animata con **GSAP** e **ScrollTrigger**, configurata con **Vite** e **Vanilla JS**.

Questo documento ti spiega come riempire la pagina con le tue foto e personalizzare i testi in pochi secondi.

---

## 🛠️ Come personalizzare la pagina al volo

Tutti i contenuti del sito (città, date, alloggi, diari di bordo, checklist e immagini) sono gestiti in modo centralizzato. Non c'è bisogno di toccare il codice HTML o i fogli di stile!

### 1. Cambiare testi e alloggi
Apri il file **[config.js](file:///Users/vivri161803/Documents/Code/UI_Interrail/config.js)**. Troverai tre oggetti principali:
* `stations`: L'itinerario del viaggio (città, date, alloggio, note). Aggiungendo o modificando le stazioni, queste verranno visualizzate automaticamente lungo la timeline a serpentina.
* `packingList`: Le categorie e gli elementi della checklist.
* `gallery`: I titoli e le didascalie dei tuoi ricordi.

### 2. Aggiungere le tue foto
Per sostituire i blocchi grigi della galleria con le tue foto reali:
1. Salva le tue foto nella cartella **[assets/](file:///Users/vivri161803/Documents/Code/UI_Interrail/assets)**.
2. Rinominale usando lo stesso ID definito in `config.js` (estensione `.jpg` consigliata):
   * `train-view.jpg` (Vista dal finestrino)
   * `gamla-stan.jpg` (Centro di Stoccolma)
   * `nyhavn.jpg` (Canali di Copenhagen)
   * `hamburg-harbor.jpg` (Porto di Amburgo)
   * `hostel-life.jpg` (Serate in ostello)
   * `scandinavian-forests.jpg` (Foreste svedesi)
3. *Opzionale*: Per far sì che le foto appaiano al posto dei blocchi grigi, apri **[styles/components/gallery.css](file:///Users/vivri161803/Documents/Code/UI_Interrail/styles/components/gallery.css)** e aggiungi la proprietà `background-image: url('../../assets/ID.jpg');` oppure modifica `components/GallerySection.js` per inserire tag `<img>` reali (la struttura supporta entrambi!).

---

## 🚀 Esecuzione in Locale

Per avviare l'ambiente di sviluppo e vedere le modifiche in tempo reale:

1. Installa le dipendenze (se clonato da zero):
   ```bash
   npm install
   ```
2. Avvia il server di sviluppo locale:
   ```bash
   npm run dev
   ```
3. Apri l'indirizzo mostrato nel terminale (solitamente `http://localhost:5173`).

---

## 📦 Deploy su Vercel

Il progetto è predisposto per essere distribuito su **Vercel** come sito statico a zero configurazione.

Per effettuare il build manuale e testare la versione di produzione locale:
```bash
npm run build
```
Verrà generata una cartella `dist/` pronta per essere pubblicata.
