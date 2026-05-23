// components/GallerySection.js
import { travelData } from '../config.js';

export function initGallerySection() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  travelData.gallery.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.id = `gallery-${item.id}`;

    card.innerHTML = `
      <div class="gallery-image-placeholder">
        <span class="gallery-upload-tip">assets/${item.id}.jpg</span>
      </div>
      <div class="gallery-info">
        <h3 class="gallery-item-title">${item.title}</h3>
        <p class="gallery-item-description">${item.description}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}
