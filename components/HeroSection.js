// components/HeroSection.js
import { config } from '../config.js';
import { initHero3D } from './Hero3D.js';

export function initHeroSection() {
  const heroEl = document.getElementById('hero');
  if (!heroEl) return;

  // ── Hydrate text from config ──────────────────────────────────────
  const titleEl    = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');

  if (titleEl)    { titleEl.textContent = config.meta.title; splitIntoChars(titleEl); }
  if (subtitleEl) { subtitleEl.textContent = config.meta.subtitle; }

  // ── Scroll indicator ─────────────────────────────────────────────
  createScrollIndicator(heroEl);

  // ── 3D Background ────────────────────────────────────────────────
  initHero3D('hero');
}

// Splits every letter into an animatable .char span,
// wrapped by an overflow:hidden .char-wrapper to act as a reveal mask.
export function splitIntoChars(element) {
  const text = element.textContent.trim();
  element.innerHTML = '';

  text.split(' ').forEach((word, wi, arr) => {
    const wordEl = document.createElement('span');
    wordEl.style.cssText = 'white-space:nowrap; display:inline-block;';

    if (word === "2026") {
      // Keep "2026" as a single block for rotation/dragging
      const wrapper = document.createElement('span');
      wrapper.className = 'char-wrapper';

      const charEl = document.createElement('span');
      charEl.className = 'char';
      charEl.id = 'spin-year';
      charEl.title = 'Spin me!';
      charEl.textContent = word;

      wrapper.appendChild(charEl);
      wordEl.appendChild(wrapper);
    } else {
      // Split each character for the text reveal mask
      for (const ch of word) {
        const wrapper = document.createElement('span');
        wrapper.className = 'char-wrapper';

        const charEl = document.createElement('span');
        charEl.className = 'char';
        charEl.textContent = ch;

        wrapper.appendChild(charEl);
        wordEl.appendChild(wrapper);
      }
    }

    element.appendChild(wordEl);
    if (wi < arr.length - 1) element.appendChild(document.createTextNode(' '));
  });
}

function createScrollIndicator(parent) {
  const el = document.createElement('div');
  el.className = 'scroll-indicator';
  el.innerHTML = `<span>scroll</span><div class="mouse-icon"><div class="mouse-wheel"></div></div>`;
  parent.appendChild(el);
  setTimeout(() => el.classList.add('visible'), 1200);
}
