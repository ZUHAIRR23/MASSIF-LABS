export function initCustomCursor() {
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
