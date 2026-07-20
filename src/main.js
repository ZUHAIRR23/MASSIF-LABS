import './style.css';
import { initCustomCursor } from './cursor.js';
import { runPreloader } from './preloader.js';
import { initSmoothScroll, initScrollAnimations } from './scroll.js';
import { initThreeScene } from './three-scene.js';
import { initCarousel } from './carousel.js';
import { initBlueprintSpecs } from './blueprint.js';
import { setupNavigation } from './navigation.js';
import { initHeroGlow, initDynamicHUD } from './hero-hud.js';
import { initBackgroundParticles } from './particles.js';
import { initServicesAccordion } from './services.js';
import { initContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. INITIALIZE CUSTOM CURSOR PHASING
  initCustomCursor();

  // 2. RUN LAZY EMOTIONAL PRELOADER (1.5 - 2s delay)
  runPreloader(() => {
    // This callback is executed once counts reach 100
    // 3. INITIALIZE SMOOTH SCROLL (LENIS ENGINE)
    const lenis = initSmoothScroll();

    // 4. INITIALIZE 3D PROCEDURAL EXPERIENCES
    initThreeScene();

    // 5. INITIALIZE CAROUSEL MODULES
    initCarousel();

    // 6. INITIALIZE LAB CARD DETAILS
    initBlueprintSpecs();

    // 7. SCROLL-LINK TRIMS & REVEALS (GSAP INTERACTION OVERLAYS)
    initScrollAnimations();

    // 8. SETUP INTERACTIVE ANCHORS & ACTIVE LINKS
    setupNavigation(lenis);

    // 9. INITIALIZE DYNAMIC BACKGROUND GLOW & HUD DATA
    initHeroGlow();
    initDynamicHUD();
    initBackgroundParticles();

    // 10. INITIALIZE REDESIGNED SERVICES ACCORDION
    initServicesAccordion();

    // 11. INITIALIZE CONTACT FORM
    initContactForm();
  });
});
