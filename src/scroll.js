import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
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

export function initScrollAnimations() {
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
