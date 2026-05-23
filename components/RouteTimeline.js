// components/RouteTimeline.js
import { config } from '../config.js';

// Vertical pixel positions inside the SVG viewBox (now height 3400)
// Spacing ≥480px between each station so cards never overlap.
// Aligned to path: M 200 80 L 200 1520 C ... 600 2060 L 600 3300
//   Outgoing (left track x=200):  Florence 140, Copenhagen 600, Stockholm 1060, Uppsala 1520
//   Return  (right track x=600):  Hamburg 2060, Munich 2540, Florence-return 3020
const Y_COORDS = [140, 600, 1060, 1520, 2060, 2540, 3020];

export function initRouteTimeline() {
  const container = document.getElementById('timeline-cards');
  if (!container) return;

  config.stations.forEach((station, i) => {
    const y = Y_COORDS[i] ?? (150 + i * 330);

    // X position: outgoing=left of left track (x=200), return=right of right track (x=600)
    const xPercent = station.type === 'return' ? '75%' : station.type === 'u-turn' ? '50%' : '25%';

    // ── Node (dot on track) ────────────────────────────────────────
    const node = document.createElement('div');
    node.className = `station-node station-node-${station.id}`;
    node.style.cssText = `top:${y}px; left:${xPercent};`;
    node.dataset.stationId = station.id;
    container.appendChild(node);

    // ── Card ──────────────────────────────────────────────────────
    const card = document.createElement('div');
    card.className = `station-card ${station.type}`;
    card.id = `card-${station.id}`;
    card.style.top = `${y}px`;
    card.dataset.stationId = station.id;

    // Build the image column — try a real img, fall back to placeholder UI
    const imageColHtml = `
      <div class="station-image-column">
        <div class="station-image-box">
          <span class="station-image-hint">${station.featuredImage}</span>
        </div>
      </div>`;

    card.innerHTML = `
      <div class="station-card-content">
        <div class="station-text-column">
          <span class="station-badge">${badgeLabel(station.type)}</span>
          <h3 class="station-city">${station.cityName}</h3>
          <div class="station-country">${station.country}</div>
          <div class="station-date">${station.date}</div>
          <div class="station-accommodation">🏨 ${station.accommodation}</div>
          <p class="station-notes">${station.description}</p>
        </div>
        ${imageColHtml}
      </div>`;

    container.appendChild(card);
  });
}

function badgeLabel(type) {
  if (type === 'u-turn')   return '↩ U-Turn Station';
  if (type === 'return')   return '← Return Trip';
  return '→ Outgoing Trip';
}
