> **Ruolo:** Sei un Expert Frontend Developer specializzato in animazioni web performanti (Awwwards style) e architettura Vanilla JS.
> **Contesto del Progetto:** leggi @specs
> **Stack Tecnologico Effettivo:**
>  * Build Tool: Vite
>  * Core: HTML5, Vanilla JavaScript
>  * Styling: Puro CSS
>  * Animazioni UI/Testo: GSAP + ScrollTrigger (già in uso)
>  * Animazioni 3D: Three.js in Vanilla JS (npm install three). **Attenzione: NON usare React Three Fiber, non siamo in ambiente React.**
>  * Deploy: Statico su Vercel (comando npm run build che compila nella cartella dist).
> **Obiettivo:** Aggiornare la Hero Section e il background della sezione Itinerario, creando file modulari da importare poi nel main.js.
> **Requisiti della Hero Section:**
>  1. **Layout (index.html e /styles):** Assicurati che la Hero (100vh) abbia un background base scuro (tema notte nordica). Il titolo "INTERRAIL 2026" e il sottotitolo devono essere centrati. I testi possono essere letti dinamicamente dal config.js oppure inseriti nell'HTML, rispettando la logica già presente nel file main.js.
>  2. **Animazione Testo (GSAP - crea un modulo in /animations):** Applica al titolo principale un effetto *staggered reveal* (riferimento: https://gsap.com/resources/getting-started/Staggers/). Con un piccolo script Vanilla JS, dividi il titolo lettera per lettera (o parola per parola) avvolgendole in tag <span>. Usa una maschera overflow: hidden nel CSS e GSAP per animarle dal basso verso l'alto con un easing morbido (es. power3.out).
>  3. **Animazione Sottotitolo:** Deve apparire in fade-in e muoversi leggermente verso l'alto **soltanto dopo** che l'animazione staggered del titolo ha completato il suo ciclo.
>  4. **Background 3D (Three.js - crea un modulo in /components):** Inserisci un tag <canvas> in posizione fixed o absolute dietro il testo della Hero (z-index negativo). Crea una scena Three.js in puro Vanilla JS: un sistema particellare che simula la notte/freddo nordico. Lega il movimento del mouse (mousemove) per ruotare o spostare leggermente la telecamera o le particelle (effetto parallasse).
> **Requisiti della Sezione Itinerario (Subito sotto la Hero):**
>  1. **Background "Bokeh" (Puro CSS - in /styles):** Per la sezione della timeline dell'itinerario, crea un effetto che simuli lo scorrere di luci calde fuori dal finestrino di un treno notturno. Usa elementi div decorativi in posizione assoluta sullo sfondo. Animali **esclusivamente con puro CSS** (filter: blur(px), opacity, e @keyframes per una lenta traslazione orizzontale). Colori caldi per staccare dal blu scuro. **Tassativo: Nessun Canvas o Three.js in questa sezione** per non uccidere il framerate.
> **Requisiti Critici di Performance:**
>  * L'uso di requestAnimationFrame con Three.js drena batteria sui dispositivi mobili. **Devi implementare l'Intersection Observer API in Vanilla JS**. Monitora la visibilità del nodo DOM della Hero Section: se l'utente ha scrollato in basso e la Hero esce dallo schermo, metti in pausa il rendering loop di Three.js. Fallo ripartire solo quando la Hero rientra nella viewport.
> Forniscimi il codice necessario step-by-step, dicendomi esattamente in quali file delle rispettive cartelle inserire i vari snippet di HTML, JS e CSS.
> Infine fai in modo di aggiugnere a @config.js le variabili relative alla transizione tra la hero section e la Route Timeline e la transizione tra la GallerySection e RouteTimeline.

Nota: per la transizione fra la herso section e la Route Timeline implementa una Curtain Reveal:
Come funziona: Imposti la Hero Section come position: sticky; top: 0; (o la fissi con ScrollTrigger). Mentre l'utente scrolla, la Hero rimane ferma e il blocco dell'itinerario (che avrà uno z-index maggiore e un background solido, ad esempio blu scurissimo) sale dal basso coprendola gradualmente.

Nota: Fai anche attenzione alla transzione fra GallerySection e e RouteTimeline. Quella transizione implementiamolo come un effetto Galleria Oscura: 
Inserisci un piccolo div divisore tra la Hero e l'Itinerario, alto magari 30vh o 50vh, con un background completamente nero o una sfumatura molto scura.
Tecnicamente è il più semplice da implementare (solo CSS) e stacca nettamente i due contesti.