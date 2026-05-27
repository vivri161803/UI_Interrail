// components/HeroSection.js
import { config } from '../config.js';

export function initHeroSection() {
  const heroEl = document.getElementById('hero');
  if (!heroEl) return;

  // ── Hydrate text from config ──────────────────────────────────────
  const titleEl    = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');

  if (titleEl)    { titleEl.textContent = config.meta.title; splitIntoChars(titleEl); }
  if (subtitleEl) { subtitleEl.textContent = config.meta.subtitle; }
}

/**
 * Splits every letter into an animatable .char span,
 * wrapped by an overflow:hidden .char-wrapper to act as a reveal mask.
 * Special case: keeps "2026" as a single block.
 */
export function splitIntoChars(element) {
  const text = element.textContent.trim();
  element.innerHTML = '';

  text.split(' ').forEach((word, wi, arr) => {
    const wordEl = document.createElement('span');
    wordEl.style.cssText = 'white-space:nowrap; display:inline-block;';

    // Split each character into its own animatable span
    for (const ch of word) {
      const wrapper = document.createElement('span');
      wrapper.className = 'char-wrapper';

      const charEl = document.createElement('span');
      charEl.className = 'char';
      charEl.textContent = ch;

      wrapper.appendChild(charEl);
      wordEl.appendChild(wrapper);
    }

    element.appendChild(wordEl);
    if (wi < arr.length - 1) element.appendChild(document.createTextNode(' '));
  });
}

function createScrollIndicator(parent) {
  const el = document.createElement('div');
  el.className = 'scroll-indicator';
  el.innerHTML = `<span>scroll</span><div class="scroll-line"></div>`;
  parent.appendChild(el);
  setTimeout(() => el.classList.add('visible'), 1400);
}
