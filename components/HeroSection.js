// components/HeroSection.js
import { travelData } from '../config.js';

export function initHeroSection() {
  const heroElement = document.getElementById('hero');
  if (!heroElement) return;

  // Hydrate content from config
  const titleEl = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');

  if (titleEl && travelData.meta.title) {
    titleEl.textContent = travelData.meta.title;
    splitTextIntoCharacters(titleEl);
  }

  if (subtitleEl && travelData.meta.subtitle) {
    subtitleEl.textContent = travelData.meta.subtitle;
  }

  // Create Background Running Marquee
  createBackgroundMarquee(heroElement);

  // Create Mouse Scroll Indicator
  createScrollIndicator(heroElement);
}

// Custom split-text utility to wrap letters without external paid plugins
function splitTextIntoCharacters(element) {
  const text = element.textContent.trim();
  element.innerHTML = '';
  
  // Split words first
  const words = text.split(' ');
  
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.whiteSpace = 'nowrap';
    wordSpan.style.display = 'inline-block';
    
    // Split letters inside words
    for (let char of word) {
      const wrapperSpan = document.createElement('span');
      wrapperSpan.className = 'char-wrapper';
      
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char;
      
      wrapperSpan.appendChild(charSpan);
      wordSpan.appendChild(wrapperSpan);
    }
    
    element.appendChild(wordSpan);
    
    // Add space after word (except the last word)
    if (wordIndex < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });
}

function createBackgroundMarquee(parent) {
  const marquee = document.createElement('div');
  marquee.className = 'bg-marquee';
  
  const inner = document.createElement('div');
  inner.className = 'marquee-inner';
  
  // Combine all destination cities for marquee text
  const cities = travelData.stations.map(s => s.city).join(' • ');
  inner.textContent = ` ${cities} • ${cities} `;
  
  marquee.appendChild(inner);
  parent.appendChild(marquee);
}

function createScrollIndicator(parent) {
  const container = document.createElement('div');
  container.className = 'scroll-indicator';
  
  const text = document.createElement('span');
  text.textContent = 'scroll';
  
  const mouse = document.createElement('div');
  mouse.className = 'mouse-icon';
  
  const wheel = document.createElement('div');
  wheel.className = 'mouse-wheel';
  
  mouse.appendChild(wheel);
  container.appendChild(text);
  container.appendChild(mouse);
  
  parent.appendChild(container);
  
  // Show scroll indicator slightly after page load
  setTimeout(() => {
    container.classList.add('visible');
  }, 1000);
}
