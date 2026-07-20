import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCarousel } from './carousel.js';
import { initBlueprintSpecs } from './blueprint.js';
import { initThreeScene } from './three-scene.js';

gsap.registerPlugin(ScrollTrigger);

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

function initCustomCursor() {
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');
  if (!cursorDot || !cursorFollower) return;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    // Smooth trailing follow
    cursorFollower.animate({
      left: `${x}px`,
      top: `${y}px`
    }, { duration: 300, fill: 'forwards' });
  });

  // Attach hover expand states
  const interactibles = document.querySelectorAll('a, button, .header-action, .carousel-item, .blueprint-card, .srv-row, .gallery-img-wrapper, input, select, textarea, .cta-btn');
  interactibles.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('expand');
      cursorFollower.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('expand');
      cursorFollower.classList.remove('expand');
    });
  });
}

function runPreloader(onCompleteCallback) {
  const counterVal = document.getElementById('preloader-counter');
  const preloader = document.getElementById('preloader');
  const wireframe = document.querySelector('.preloader-wireframe');

  if (!counterVal || !preloader) {
    onCompleteCallback();
    return;
  }

  let count = 0;

  // Custom increment rates to mimic complex geometry computation
  const interval = setInterval(() => {
    // Staggered speed increments
    if (count < 30) count += Math.floor(Math.random() * 3) + 1;
    else if (count < 75) count += Math.floor(Math.random() * 5) + 2;
    else if (count < 99) count += Math.floor(Math.random() * 2) + 1;
    else count = 100;

    if (count > 100) count = 100;

    // Pad counter with leading zeroes
    counterVal.textContent = count.toString().padStart(2, '0');

    // Scale and opacity pulsing for the background wireframe chair
    if (wireframe) {
      const scaleVal = 1 + (count / 100) * 0.15;
      const opacityVal = 0.15 + (count / 100) * 0.35;
      wireframe.style.transform = `scale(${scaleVal})`;
      wireframe.style.opacity = opacityVal;
    }

    if (count === 100) {
      clearInterval(interval);
      setTimeout(() => {
        // Trigger reveal window masking out
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        // Boot modules trigger
        onCompleteCallback();
      }, 600);
    }
  }, 35);
}

function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Sync scroll triggers
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

function initScrollAnimations() {
  // massive text scale distortion parallax on Hero
  gsap.to('#hero-title-bg', {
    scrollTrigger: {
      trigger: '#hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8
    },
    y: '-12%',
    scale: 1.06,
    filter: 'blur(2px)',
    ease: 'none'
  });

  // Staggered reveal for Hero blocks
  gsap.from('.info-block', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#hero-section',
      start: '30% center',
      toggleActions: 'play none none none'
    }
  });

  // Scale / distort massive collections title
  gsap.from('.carousel-title-bg', {
    opacity: 0,
    x: -120,
    scrollTrigger: {
      trigger: '#carousel-section',
      start: 'top 80%',
      end: 'center 40%',
      scrub: 0.8
    }
  });

  // About Section reveals
  gsap.from('#about-section .about-huge-title', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#about-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('#about-section .about-lead, #about-section .tech-spec-item', {
    opacity: 0,
    y: 35,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#about-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Gallery items stagger
  gsap.from('.gallery-item-card', {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#gallery-section',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // Services rows stagger reveal
  gsap.from('.srv-row', {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#services-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });


  // Contact form panel reveal
  gsap.from('.contact-info-panel, .contact-form-panel', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

function setupNavigation(lenis) {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .section-product-experience');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // lenis scrolls smoothly to target coordinates
        lenis.scrollTo(targetSection, {
          offset: 0,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

  // Update active links styling based on scroll sections
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  });
}

function initHeroGlow() {
  const hero = document.getElementById('hero-section');
  const glow = document.getElementById('hero-interactive-glow');
  if (!hero || !glow) return;

  // Track coordinates continuously
  document.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  });
}

function initDynamicHUD() {
  const topRight = document.querySelector('.coordinate-label.top-right');
  const topLeft = document.querySelector('.coordinate-label.top-left');

  if (topRight) {
    setInterval(() => {
      const fps = 58 + Math.floor(Math.random() * 3);
      const latDrift = (89.040 + Math.random() * 0.020).toFixed(3);
      topRight.textContent = `LAT_${latDrift} // FPS_${fps}`;
    }, 1000);
  }

  if (topLeft) {
    let xBase = 901;
    setInterval(() => {
      const xDrift = (xBase + (Math.random() - 0.5) * 4).toFixed(0);
      const yDrift = (Math.random() * 9).toFixed(0);
      topLeft.textContent = `SYS_REF // X-${xDrift}-Y0${yDrift}`;
    }, 1500);
  }
}

function initBackgroundParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  // Small number of elegant drifts
  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.4,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.35 - 0.05,
      alpha: Math.random() * 0.22 + 0.08
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(26, 25, 23, 0.5)'; // Dark sand particle shade

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.globalAlpha = p.alpha;
      ctx.fill();

      // move particles
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap-around bounds
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10 || p.x > width + 10) {
        p.speedX = -p.speedX;
      }
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();
}


function initContactForm() {
  const form = document.getElementById('acquisition-form');
  const statusMsg = document.getElementById('form-status-msg');
  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show submitting state
    statusMsg.className = 'form-status';
    statusMsg.style.display = 'block';
    statusMsg.textContent = 'TRANSMITTING ENQUIRY DATA DIRECTIVE...';

    setTimeout(() => {
      // Simulate successful validation encryption transmit
      statusMsg.classList.add('success');
      statusMsg.textContent = 'TRANSMISSION RECEIVED. PROTOCOL ENGAGED.';
      form.reset();

      // Reset selection label
      const select = document.getElementById('form-objective');
      if (select) select.selectedIndex = -1;

      // Hide message after 5 seconds
      setTimeout(() => {
        statusMsg.style.display = 'none';
        statusMsg.className = 'form-status';
      }, 5000);
    }, 1500);
  });
}

function initServicesAccordion() {
  const rows = document.querySelectorAll('.srv-row');
  const hudStatus = document.getElementById('hud-status');
  const hudMaterial = document.getElementById('hud-material');
  const hudTolerance = document.getElementById('hud-tolerance');
  const hudIntegrity = document.getElementById('hud-integrity');
  const hudProgressBar = document.getElementById('hud-progress-bar');
  const hudProgressVal = document.getElementById('hud-progress-val');

  if (rows.length === 0) return;

  // Track active row to open by default
  let activeRow = null;

  function setHUDActiveState(row) {
    const idx = row.getAttribute('data-index');
    const material = row.getAttribute('data-material');
    const tolerance = row.getAttribute('data-tolerance');
    const integrity = row.getAttribute('data-integrity');
    const progress = row.getAttribute('data-progress');

    if (hudStatus) hudStatus.innerHTML = `ACTIVE // PHASE_${idx}`;
    if (hudMaterial) hudMaterial.textContent = material;
    if (hudTolerance) hudTolerance.textContent = tolerance;
    if (hudIntegrity) hudIntegrity.textContent = integrity;
    if (hudProgressBar) hudProgressBar.style.width = `${progress}%`;
    if (hudProgressVal) hudProgressVal.textContent = `${progress}% READY`;
  }

  function resetHUDToIdle() {
    if (hudStatus) hudStatus.innerHTML = `IDLE // WATCHING`;
    if (hudMaterial) hudMaterial.textContent = 'NONE SELECTED';
    if (hudTolerance) hudTolerance.textContent = '--';
    if (hudIntegrity) hudIntegrity.textContent = '100% SECURE';
    if (hudProgressBar) hudProgressBar.style.width = '0%';
    if (hudProgressVal) hudProgressVal.textContent = '00% READY';
  }

  rows.forEach(row => {
    // Click behavior to toggle open/close accordion
    row.addEventListener('click', () => {
      const isActive = row.classList.contains('active-row');

      // Close all rows
      rows.forEach(r => {
        r.classList.remove('active-row');
        const bodyDom = r.querySelector('.srv-row-body');
        if (bodyDom) bodyDom.style.height = '0';
      });

      if (!isActive) {
        row.classList.add('active-row');
        const inner = row.querySelector('.srv-row-body-inner');
        const bodyDom = row.querySelector('.srv-row-body');
        if (bodyDom && inner) {
          bodyDom.style.height = `${inner.scrollHeight}px`;
        }
        setHUDActiveState(row);
        activeRow = row;
      } else {
        resetHUDToIdle();
        activeRow = null;
      }
    });

    // Hover mouseover behavior to preview on HUD
    row.addEventListener('mouseenter', () => {
      setHUDActiveState(row);
    });

    // Mouseleave to restore active clicked row values or idle values
    row.addEventListener('mouseleave', () => {
      if (activeRow) {
        setHUDActiveState(activeRow);
      } else {
        resetHUDToIdle();
      }
    });
  });

  // Open first row by default
  const firstRow = rows[0];
  if (firstRow) {
    firstRow.classList.add('active-row');
    const inner = firstRow.querySelector('.srv-row-body-inner');
    const bodyDom = firstRow.querySelector('.srv-row-body');
    if (bodyDom && inner) {
      bodyDom.style.height = `${inner.scrollHeight}px`;
    }
    setHUDActiveState(firstRow);
    activeRow = firstRow;
  }

  // Handle responsive resize updates for the active accordion height
  window.addEventListener('resize', () => {
    rows.forEach(r => {
      if (r.classList.contains('active-row')) {
        const inner = r.querySelector('.srv-row-body-inner');
        const bodyDom = r.querySelector('.srv-row-body');
        if (bodyDom && inner) {
          bodyDom.style.height = `${inner.scrollHeight}px`;
        }
      }
    });
  });
}
