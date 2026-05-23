// components/GallerySection.js
import { config } from '../config.js';

export function initGallerySection() {
  const wrapper = document.getElementById('gallery-horizontal-wrapper');
  if (!wrapper) return;

  const { albums, maxPhotosPerAlbum } = config;

  // ── Navigation hint ────────────────────────────────────────────
  const navHint = document.createElement('div');
  navHint.className = 'gallery-nav-hint';
  navHint.textContent = '← scroll to explore albums →';
  document.body.appendChild(navHint);
  setTimeout(() => navHint.classList.add('visible'), 200);

  // ── Build one panel per city album ───────────────────────────
  albums.forEach((album, index) => {
    // Slice strictly to maxPhotosPerAlbum
    const photos = album.photoPaths.slice(0, maxPhotosPerAlbum);

    const panel = document.createElement('div');
    panel.className = 'gallery-album';
    panel.id = `album-${album.cityName.toLowerCase().replace(/\s+/g, '-')}`;

    // Index indicator (e.g. "01 / 06")
    const indexStr = String(index + 1).padStart(2, '0');
    const totalStr = String(albums.length).padStart(2, '0');

    // Build photo grid HTML
    const gridItems = photos.map(path => {
      // Try to detect if file likely exists (we can't do I/O in browser, so always render placeholder markup)
      return `
        <div class="album-photo-item">
          <div class="album-photo-placeholder">
            <span class="album-photo-filename">${path}</span>
          </div>
        </div>`;
    }).join('');

    panel.innerHTML = `
      <div class="gallery-album-index">${indexStr} / ${totalStr}</div>
      <h2 class="gallery-album-city">${album.cityName}</h2>
      <p class="gallery-album-count">${photos.length} photo${photos.length !== 1 ? 's' : ''}</p>
      <div class="album-photo-grid">${gridItems}</div>`;

    wrapper.appendChild(panel);
  });
}
