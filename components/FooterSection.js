// components/FooterSection.js

export function initFooterSection() {
  const footerElement = document.getElementById('footer');
  if (!footerElement) return;

  footerElement.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <p class="footer-text">© 2026 Interrail Travel Journal. Crafted with digital minimalism & GSAP.</p>
        <a href="#" class="footer-link">Back to top ↑</a>
      </div>
    </div>
  `;
}
