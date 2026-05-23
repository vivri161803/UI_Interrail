// components/PackingList.js
import { travelData } from '../config.js';

export function initPackingList() {
  const container = document.getElementById('packing-list-root');
  if (!container) return;

  travelData.packingList.forEach((group) => {
    const card = document.createElement('div');
    card.className = 'packing-category-card';
    card.id = `packing-cat-${group.category.toLowerCase().replace(/[^a-z]/g, '')}`;

    const titleEl = document.createElement('h3');
    titleEl.className = 'packing-category-title';
    
    const countSpan = document.createElement('span');
    countSpan.className = 'packing-category-count';
    countSpan.id = `count-${group.category.toLowerCase().replace(/[^a-z]/g, '')}`;
    
    titleEl.textContent = group.category;
    titleEl.appendChild(countSpan);
    card.appendChild(titleEl);

    const list = document.createElement('ul');
    list.className = 'packing-list';

    group.items.forEach((item) => {
      // Check if checked state is stored in localStorage
      const isChecked = localStorage.getItem(`interrail_pack_${item.id}`) === 'true';
      
      const listItem = document.createElement('li');
      
      const label = document.createElement('label');
      label.className = 'packing-item';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'packing-checkbox-wrapper';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'packing-checkbox-input';
      checkbox.id = `pack-item-${item.id}`;
      checkbox.checked = isChecked;
      
      const customCheckbox = document.createElement('span');
      customCheckbox.className = 'packing-checkbox-custom';
      
      const textSpan = document.createElement('span');
      textSpan.className = 'packing-item-text';
      textSpan.textContent = item.name;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(customCheckbox);
      
      label.appendChild(wrapper);
      label.appendChild(textSpan);
      listItem.appendChild(label);
      list.appendChild(listItem);

      // Event listener to save state to localStorage and update count badge
      checkbox.addEventListener('change', () => {
        localStorage.setItem(`interrail_pack_${item.id}`, checkbox.checked);
        updateCategoryCount(group, list, countSpan);
      });
    });

    card.appendChild(list);
    container.appendChild(card);

    // Initial count update
    updateCategoryCount(group, list, countSpan);
  });
}

function updateCategoryCount(group, listElement, badgeElement) {
  const checkboxes = listElement.querySelectorAll('.packing-checkbox-input');
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
  badgeElement.textContent = `${checked}/${total}`;
}
