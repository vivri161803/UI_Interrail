// components/JourneySection.js
// Builds the horizontal Z-pattern journey: outbound + return tracks,
// station cards with photo dialog + upload, and connection pills.
import { config } from '../config.js';
import { supabase } from '../utils/supabase.js';

const STORAGE_KEY = 'interrail_photos_';
const BUCKET_NAME = 'photos';

/* ─── ENTRY POINT ─────────────────────────────────────────────────────────── */
export function initJourneySection() {
  const outbound = document.getElementById('outbound-track');
  const returnEl = document.getElementById('return-track');
  if (!outbound || !returnEl) return;

  const { stations, albums, connections, maxPhotosPerAlbum } = config;

  // Build album lookup by cityId for O(1) access
  const albumMap = Object.fromEntries(albums.map(a => [a.cityId, a]));

  // Build connection lookup: from → connection object
  const connMap = Object.fromEntries(connections.map(c => [c.from, c]));

  // Split stations into outbound and return
  const outboundStations = stations.filter(s => s.type === 'outgoing' || s.type === 'u-turn');
  const returnStations   = stations.filter(s => s.type === 'return');

  // Build outbound track
  outboundStations.forEach((station, i) => {
    const card = createStationCard(station, albumMap[station.id], maxPhotosPerAlbum);
    outbound.appendChild(card);

    // Connection pill between stations (not after last outbound)
    if (i < outboundStations.length - 1) {
      const conn = connMap[station.id];
      if (conn) outbound.appendChild(createConnectionPill(conn));
    }
  });

  // Build return track
  returnStations.forEach((station, i) => {
    // Connection pill before each return station (from prev)
    const prevId = i === 0 ? 'uppsala' : returnStations[i - 1].id;
    const conn   = connMap[prevId];
    if (conn) returnEl.appendChild(createConnectionPill(conn));

    const card = createStationCard(station, albumMap[station.id], maxPhotosPerAlbum);
    returnEl.appendChild(card);
  });

  // Inject all dialogs into body (outside scroll container to avoid clipping)
  stations.forEach(station => {
    const album = albumMap[station.id];
    const dialog = createGalleryDialog(station, album, maxPhotosPerAlbum);
    document.body.appendChild(dialog);
  });

  // Wire gallery button clicks (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="open-gallery"]');
    if (!btn) return;
    const cityId = btn.dataset.cityId;
    const dialog = document.getElementById(`dialog-${cityId}`);
    if (dialog) dialog.showModal();
  });
}

/* ─── STATION CARD ────────────────────────────────────────────────────────── */
/**
 * @param {Object} station  — from config.stations[]
 * @param {Object|null} album — from config.albums[], matched by cityId
 * @param {number} maxPhotos
 * @returns {HTMLElement} article.station-card
 */
function createStationCard(station, album, maxPhotos) {
  const article = document.createElement('article');
  article.className = `station-card ${station.type}`;
  article.id = `card-${station.id}`;
  article.dataset.stationId = station.id;
  article.setAttribute('role', 'listitem');
  article.setAttribute('aria-label', `${station.cityName}, ${station.country}`);

  const badgeText = {
    'outgoing': '→ Outbound',
    'u-turn':   '↩ U-Turn',
    'return':   '← Return'
  }[station.type] ?? '';

  const daysLabel = station.days === 1 ? '1 night' : `${station.days} nights`;
  const costLabel = station.estimatedCost > 0
    ? `~€${station.estimatedCost}/night`
    : 'Home';

  article.innerHTML = `
    <div class="card-image">
      <img
        src="${station.featuredImage}"
        alt="${station.cityName} — ${station.country}"
        loading="lazy"
        onload="this.nextElementSibling.style.display='none'"
        onerror="this.style.display='none'"
      />
      <div class="card-image-placeholder" aria-hidden="true">
        ${iconSvg('image')} ${station.cityName}
      </div>
    </div>

    <div class="card-body">
      <div class="station-badge" aria-label="Trip direction: ${badgeText}">
        <span class="badge-dot" aria-hidden="true"></span>
        ${badgeText}
      </div>

      <div>
        <h3 class="card-city">${station.cityName}</h3>
        <p class="card-country">${station.country}</p>
      </div>

      <p class="card-description">${station.description}</p>

      <div class="card-meta" role="list">
        <div class="meta-item" role="listitem" aria-label="Dates: ${station.date}">
          ${iconSvg('calendar')}
          <span>${station.date}</span>
        </div>
        <div class="meta-item" role="listitem" aria-label="Stay: ${daysLabel}">
          ${iconSvg('moon')}
          <span>${daysLabel}</span>
        </div>
        <div class="meta-item" role="listitem" aria-label="Cost: ${costLabel}">
          ${iconSvg('coin')}
          <span>${costLabel}</span>
        </div>
        <div class="meta-item" role="listitem" aria-label="Accommodation: ${station.accommodation}">
          ${iconSvg('bed')}
          <span>${station.accommodation}</span>
        </div>
      </div>

      <div class="card-actions">
        <button
          class="btn-gallery"
          data-action="open-gallery"
          data-city-id="${station.id}"
          aria-label="Open photo gallery for ${station.cityName}"
          aria-haspopup="dialog"
        >
          ${iconSvg('camera')}
          Vedi Ricordi
        </button>
      </div>
    </div>
  `;

  return article;
}

/* ─── CONNECTION PILL ─────────────────────────────────────────────────────── */
/**
 * @param {Object} conn — from config.connections[]
 * @returns {HTMLElement} div.connection-pill
 */
function createConnectionPill(conn) {
  const pill = document.createElement('div');
  pill.className = 'connection-pill';
  pill.setAttribute('aria-label', `Train connection: ${conn.duration}, ${conn.type}`);
  pill.innerHTML = `
    <div class="pill-line" aria-hidden="true"></div>
    <div class="pill-badge" role="img" aria-label="${conn.type}, ${conn.duration}">
      ${iconSvg('train')}
      <span class="pill-duration">${conn.duration}</span>
      <span>${conn.type}</span>
    </div>
    <div class="pill-line" aria-hidden="true"></div>
  `;
  return pill;
}

/* ─── GALLERY DIALOG ──────────────────────────────────────────────────────── */
/**
 * @param {Object} station
 * @param {Object|null} album
 * @param {number} maxPhotos
 * @returns {HTMLDialogElement}
 */
function createGalleryDialog(station, album, maxPhotos) {
  const dialog = document.createElement('dialog');
  dialog.id = `dialog-${station.id}`;
  dialog.className = 'gallery-dialog';
  dialog.setAttribute('aria-labelledby', `dialog-title-${station.id}`);
  dialog.setAttribute('aria-modal', 'true');

  const configPhotos = album ? album.photoPaths.slice(0, maxPhotos) : [];

  dialog.innerHTML = `
    <div class="dialog-inner" role="document">
      <div class="dialog-header">
        <h2 class="dialog-title" id="dialog-title-${station.id}">
          ${station.cityName} — Ricordi
        </h2>
        <button
          class="dialog-close"
          data-action="close-dialog"
          data-dialog-id="dialog-${station.id}"
          aria-label="Close gallery"
        >×</button>
      </div>

      <div class="dialog-body">
        <!-- Photo grid -->
        <div class="photo-grid" id="photo-grid-${station.id}" role="list" aria-label="Photos from ${station.cityName}">
          ${configPhotos.map(path => `
            <div class="photo-item" role="listitem">
              <img src="${path}" alt="${station.cityName}" loading="lazy" onerror="this.parentElement.style.display='none'" />
            </div>
          `).join('')}
        </div>

        <!-- User-uploaded photos (from Supabase/localStorage) will be injected here by JS -->
        <div id="uploaded-grid-${station.id}"></div>

        <!-- Upload zone -->
        <div class="upload-zone" id="upload-zone-${station.id}">
          <label class="upload-label" for="upload-input-${station.id}" aria-label="Upload photos from ${station.cityName}">
            <svg class="upload-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
            </svg>
            <span class="upload-text">Carica le tue foto</span>
            <span class="upload-sub">JPG, PNG, WEBP — max 10 per volta</span>
          </label>
          <input
            type="file"
            id="upload-input-${station.id}"
            accept="image/*"
            multiple
            tabindex="0"
            aria-label="Select photos to upload for ${station.cityName}"
          />
        </div>
      </div>
    </div>
  `;

  // ── Wire close button ──────────────────────────────────────────
  dialog.querySelector('[data-action="close-dialog"]').addEventListener('click', () => {
    dialog.close();
  });

  // ── Close on backdrop click ────────────────────────────────────
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // ── Trap focus inside dialog ───────────────────────────────────
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // ── Load stored photos on open ─────────────────────────────────
  dialog.addEventListener('open', () => loadStoredPhotos(station.id, dialog));

  // HTMLDialogElement fires no 'open' event — use MutationObserver instead
  new MutationObserver(() => {
    if (dialog.hasAttribute('open')) {
      loadStoredPhotos(station.id, dialog);
      // Return focus to close btn when opened
      const closeBtn = dialog.querySelector('[data-action="close-dialog"]');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
    }
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });

  // ── Wire photo upload ──────────────────────────────────────────
  const input = dialog.querySelector(`#upload-input-${station.id}`);
  const zone  = dialog.querySelector(`#upload-zone-${station.id}`);

  input.addEventListener('change', () => {
    if (input.files.length) handlePhotoUpload(station.id, input.files, dialog);
  });

  // Drag & drop support
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length) handlePhotoUpload(station.id, files, dialog);
  });

  return dialog;
}

/* ─── PHOTO PERSISTENCE (Supabase + localStorage fallback) ───────────────── */

/**
 * Helper to check if Supabase is available.
 */
function isSupabaseAvailable() {
  return !!supabase;
}

/**
 * Converts files and uploads them. Uses Supabase if available, otherwise falls back to localStorage.
 */
async function handlePhotoUpload(cityId, files, dialog) {
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
  if (imageFiles.length === 0) return;

  if (isSupabaseAvailable()) {
    let hasUploadErrors = false;
    for (const file of imageFiles) {
      const extension = file.name.split('.').pop();
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${extension}`;
      const filePath = `${cityId}/${uniqueName}`;

      try {
        const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

        if (error) {
          console.warn('[JourneySection] Supabase upload error:', error);
          hasUploadErrors = true;
        }
      } catch (err) {
        console.warn('[JourneySection] Supabase upload failed:', err);
        hasUploadErrors = true;
      }
    }

    if (!hasUploadErrors) {
      await loadStoredPhotos(cityId, dialog);
      return;
    }
    console.log('[JourneySection] Falling back to localStorage upload due to Supabase errors');
  }

  // Fallback to localStorage
  const stored = getStoredPhotos(cityId);
  let filesProcessed = 0;

  imageFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      stored.push(base64);
      try {
        localStorage.setItem(STORAGE_KEY + cityId, JSON.stringify(stored));
      } catch (err) {
        console.warn('[JourneySection] localStorage quota exceeded:', err);
      }
      
      filesProcessed++;
      if (filesProcessed === imageFiles.length) {
        loadStoredPhotos(cityId, dialog);
      }
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Loads user-uploaded photos from Supabase (or localStorage fallback) and renders them.
 */
async function loadStoredPhotos(cityId, dialog) {
  const uploadedGrid = dialog.querySelector(`#uploaded-grid-${cityId}`);
  if (!uploadedGrid) return;
  uploadedGrid.innerHTML = ''; // clear before reload

  let photos = [];
  let isUsingSupabase = false;

  if (isSupabaseAvailable()) {
    try {
      const { data, error } = await supabase.storage.from(BUCKET_NAME).list(cityId, {
        sortBy: { column: 'created_at', order: 'desc' }
      });

      if (error) {
        console.warn('[JourneySection] Supabase list error, falling back to localStorage:', error);
      } else if (data) {
        isUsingSupabase = true;
        photos = data.map(file => {
          const filePath = `${cityId}/${file.name}`;
          const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
          return {
            src: urlData.publicUrl,
            storagePath: filePath
          };
        });
      }
    } catch (err) {
      console.warn('[JourneySection] Supabase list failed, falling back to localStorage:', err);
    }
  }

  // Fallback if Supabase list failed or is unavailable
  if (!isUsingSupabase) {
    const localPhotos = getStoredPhotos(cityId);
    photos = localPhotos.map(base64 => ({
      src: base64,
      storagePath: null
    }));
  }

  // Manage header/clear button
  let headerEl = dialog.querySelector(`#uploaded-header-${cityId}`);
  if (photos.length > 0) {
    if (!headerEl) {
      headerEl = document.createElement('div');
      headerEl.id = `uploaded-header-${cityId}`;
      headerEl.className = 'uploaded-header';
      headerEl.innerHTML = `
        <h4 class="uploaded-title">I tuoi caricamenti</h4>
        <button class="btn-clear-all" data-action="clear-all" data-city-id="${cityId}">
          Rimuovi tutte
        </button>
      `;
      uploadedGrid.parentNode.insertBefore(headerEl, uploadedGrid);

      // Wire clear all button
      headerEl.querySelector('[data-action="clear-all"]').addEventListener('click', async () => {
        if (confirm('Sei sicuro di voler rimuovere tutte le foto caricate per questa città?')) {
          await clearAllUploadedPhotos(cityId, dialog, photos);
        }
      });
    }
  } else {
    if (headerEl) {
      headerEl.remove();
    }
  }

  photos.forEach(photo => appendPhotoToGrid(cityId, photo.src, photo.storagePath, dialog));
}

/**
 * Returns stored photos array for a city.
 */
function getStoredPhotos(cityId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY + cityId);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

/**
 * Appends a single photo (base64) to the uploaded grid.
 */
function appendPhotoToGrid(cityId, src, storagePath, dialog) {
  const grid = dialog.querySelector(`#uploaded-grid-${cityId}`);
  if (!grid) return;

  // Ensure uploaded grid uses photo-grid class
  if (!grid.classList.contains('photo-grid')) {
    grid.className = 'photo-grid';
    grid.setAttribute('role', 'list');
  }

  const item = document.createElement('div');
  item.className = 'photo-item';
  item.setAttribute('role', 'listitem');
  item.innerHTML = `
    <img src="${src}" alt="Uploaded photo" loading="lazy" />
    <button class="delete-photo-btn" aria-label="Rimuovi foto" title="Rimuovi foto">
      &times;
    </button>
  `;

  // Wire delete button
  const deleteBtn = item.querySelector('.delete-photo-btn');
  deleteBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    await removeSinglePhoto(cityId, src, storagePath, item, dialog);
  });

  grid.appendChild(item);
}

/**
 * Removes a single photo from localStorage and the UI.
 */
async function removeSinglePhoto(cityId, src, storagePath, itemElement, dialog) {
  if (storagePath && isSupabaseAvailable()) {
    try {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
      if (error) {
        console.warn('[JourneySection] Supabase delete error:', error);
      } else {
        await loadStoredPhotos(cityId, dialog);
        return;
      }
    } catch (err) {
      console.warn('[JourneySection] Supabase delete failed:', err);
    }
  }

  const stored = getStoredPhotos(cityId);
  const index = stored.indexOf(src);
  if (index > -1) {
    stored.splice(index, 1);
    try {
      if (stored.length === 0) {
        localStorage.removeItem(STORAGE_KEY + cityId);
      } else {
        localStorage.setItem(STORAGE_KEY + cityId, JSON.stringify(stored));
      }
    } catch (err) {
      console.warn('[JourneySection] Error updating localStorage:', err);
    }
  }
  await loadStoredPhotos(cityId, dialog);
}

/**
 * Clears all uploaded photos for a city from localStorage and the UI.
 */
async function clearAllUploadedPhotos(cityId, dialog, photos) {
  if (isSupabaseAvailable()) {
    const pathsToDelete = photos
      .map(p => p.storagePath)
      .filter(path => !!path);

    if (pathsToDelete.length > 0) {
      try {
        const { error } = await supabase.storage.from(BUCKET_NAME).remove(pathsToDelete);
        if (error) {
          console.warn('[JourneySection] Supabase clear errors:', error);
        } else {
          await loadStoredPhotos(cityId, dialog);
          return;
        }
      } catch (err) {
        console.warn('[JourneySection] Supabase clear failed:', err);
      }
    }
  }

  try {
    localStorage.removeItem(STORAGE_KEY + cityId);
  } catch (err) {
    console.warn('[JourneySection] Error clearing localStorage:', err);
  }
  await loadStoredPhotos(cityId, dialog);
}

/* ─── SVG ICON FACTORY ────────────────────────────────────────────────────── */
/**
 * Returns SVG icon HTML string for a given icon name.
 * All icons use stroke only (line-icons style).
 */
function iconSvg(name) {
  const icons = {
    camera:   '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    moon:     '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
    coin:     '<circle cx="12" cy="12" r="9"/><path d="M12 6v2m0 8v2m-4-6h8"/>',
    bed:      '<path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M2 14h20M7 14V8m10 6V8"/>',
    train:    '<rect x="4" y="2" width="16" height="14" rx="2"/><path d="M4 10h16M12 2v8M8 16l-2 4m12-4l2 4M8 16h8"/>',
    map:      '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>',
    ticket:   '<path d="M2 9a3 3 0 010-6h20a3 3 0 010 6v6a3 3 0 010 6H2a3 3 0 010-6V9z"/><line x1="12" y1="3" x2="12" y2="21"/>',
    link:     '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
    image:    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  };

  const paths = icons[name] ?? icons.image;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

// Export iconSvg for use in other components
export { iconSvg };
