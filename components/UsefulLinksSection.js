// components/UsefulLinksSection.js
import { config } from '../config.js';
import { iconSvg } from './JourneySection.js';

export function initUsefulLinksSection() {
  const grid = document.getElementById('links-grid');
  if (!grid) return;

  const { usefulLinks } = config;
  if (!usefulLinks?.length) return;

  usefulLinks.forEach(link => {
    const card = createLinkCard(link);
    grid.appendChild(card);
  });
}

/**
 * @param {Object} link — from config.usefulLinks[]
 * @param {string} link.id
 * @param {string} link.label
 * @param {string} link.url
 * @param {string} link.description
 * @param {string} link.icon
 * @returns {HTMLElement} a.link-card
 */
function createLinkCard(link) {
  const isPlaceholder = !link.url || link.url === '#';

  const el = document.createElement('a');
  el.className = `link-card${isPlaceholder ? ' is-placeholder' : ''}`;
  el.href = link.url || '#';
  el.id = `link-${link.id}`;
  el.setAttribute('role', 'listitem');
  el.setAttribute('aria-label', `${link.label}: ${link.description}`);

  if (!isPlaceholder) {
    el.target = '_blank';
    el.rel    = 'noopener noreferrer';
  } else {
    el.setAttribute('aria-disabled', 'true');
    el.addEventListener('click', (e) => e.preventDefault());
  }

  el.innerHTML = `
    <div class="link-card-icon" aria-hidden="true">
      ${iconSvg(link.icon)}
    </div>
    <div class="link-card-label">${link.label}</div>
    <p class="link-card-description">${link.description}</p>
    <div class="link-card-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <line x1="7" y1="17" x2="17" y2="7"/>
        <polyline points="7 7 17 7 17 17"/>
      </svg>
    </div>
  `;

  return el;
}
