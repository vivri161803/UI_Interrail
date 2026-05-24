import * as THREE from 'three';

export function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Mobile fallback (Performance check)
  // Simple check for touch devices or small screens
  const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
  if (isMobile) {
    // Disable 3D on mobile to save battery
    // Fallback is the static radial-gradient already defined in hero.css
    return;
  }

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1'; // Behind the text
  canvas.style.pointerEvents = 'none';
  container.appendChild(canvas);

  // Setup Three.js scene
  const scene = new THREE.Scene();
  // Optional: add a slight fog to blend particles into the distance
  scene.fog = new THREE.FogExp2(0x0b0f19, 0.001);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance

  // Create Particle System
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1200; // Dense enough for "Nordic Night"

  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    // Spread particles over a large area
    posArray[i] = (Math.random() - 0.5) * 500;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Particle Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 2,
    color: 0x60a5fa, // Accent secondary color (light blue)
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Mouse Interactivity (Parallax)
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  };

  document.addEventListener('mousemove', onDocumentMouseMove);

  // Handle Resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', onWindowResize);

  // Animation Loop and Intersection Observer
  let isAnimating = true;
  let animationFrameId = null;

  const clock = new THREE.Clock();

  const tick = () => {
    if (!isAnimating) return;

    const elapsedTime = clock.getElapsedTime();

    // Gentle continuous rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;

    // Parallax easing
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(tick);
  };

  // Start initial loop
  tick();

  // Intersection Observer to pause rendering when scrolled out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hero is visible, resume animation
        if (!isAnimating) {
          isAnimating = true;
          clock.start(); // reset delta calculation
          tick();
        }
      } else {
        // Hero is hidden, pause animation
        isAnimating = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
  }, {
    root: null,
    threshold: 0 // trigger as soon as 1px is visible/hidden
  });

  observer.observe(container);
}
