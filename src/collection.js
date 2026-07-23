import './style.css';
import { initCustomCursor } from './cursor.js';
import { runPreloader } from './preloader.js';
import { initSmoothScroll } from './scroll.js';
import { setupNavigation } from './navigation.js';
import { initBackgroundParticles } from './particles.js';
import { initGallerySidebar } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALIZE CUSTOM CURSOR PHASING
    initCustomCursor();

    // 2. RUN LAZY EMOTIONAL PRELOADER (1.5 - 2s delay)
    runPreloader(() => {
        // 3. INITIALIZE SMOOTH SCROLL (LENIS ENGINE)
        const lenis = initSmoothScroll();

        // 4. SETUP INTERACTIVE ANCHORS & ACTIVE LINKS
        setupNavigation(lenis);

        // 5. INITIALIZE DYNAMIC BACKGROUND PARTICLES
        initBackgroundParticles();

        // 6. INITIALIZE GALLERY SIDEBAR SPECIFICATIONS FOR ALL 8 ITEMS
        initGallerySidebar();
    });
});
