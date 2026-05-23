// components/RouteTimeline.js
import { travelData } from '../config.js';

export function initRouteTimeline() {
  const container = document.getElementById('timeline-cards');
  if (!container) return;

  // Map each station index to its vertical pixel coordinate along the S-Curve SVG (viewBox 0 0 800 2500)
  const yCoordinates = [150, 480, 810, 1220, 1550, 1880, 2210];

  travelData.stations.forEach((station, index) => {
    const yVal = yCoordinates[index];
    
    // Determine horizontal alignment based on station type
    let alignmentClass = 'outgoing';
    let xPercent = '25%'; // x=200 on viewBox 800
    
    if (station.type === 'return') {
      alignmentClass = 'return';
      xPercent = '75%'; // x=600 on viewBox 800
    } else if (station.type === 'u-turn') {
      alignmentClass = 'u-turn';
      xPercent = '50%'; // x=400 on viewBox 800
    }

    // 1. Create Station Node (the small marker dot along the tracks)
    const node = document.createElement('div');
    node.className = `station-node station-node-${station.id}`;
    node.style.top = `${yVal}px`;
    node.style.left = xPercent;
    node.dataset.stationId = station.id;
    container.appendChild(node);

    // 2. Create Station Card
    const card = document.createElement('div');
    card.className = `station-card ${alignmentClass}`;
    card.id = `card-${station.id}`;
    card.style.top = `${yVal}px`;
    card.dataset.stationId = station.id;

    // Build internal markup
    card.innerHTML = `
      <span class="station-badge">${station.type === 'u-turn' ? 'U-Turn Station' : station.type}</span>
      <h3 class="station-city">${station.city}</h3>
      <div class="station-country">${station.country}</div>
      <div class="station-date">${station.date}</div>
      <div class="station-accommodation">🏨 ${station.accommodation}</div>
      <p class="station-notes">${station.notes}</p>
    `;

    container.appendChild(card);
  });
}
