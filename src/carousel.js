export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container-outer');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    const cursorDot = document.querySelector('.custom-cursor');

    if (!track || !container) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let currentX = 0;
    let targetX = 0;
    let lastX = 0;
    let lastTime = 0;

    // Custom Cursor Interaction for Carousel
    container.addEventListener('mouseenter', () => {
        cursorDot.classList.add('drag');
        cursorFollower.classList.add('expand');
    });

    container.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('drag');
        cursorFollower.classList.remove('expand');
        isDown = false;
        track.classList.remove('velocity-blur');
    });

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        currentX = targetX;
        lastTime = performance.now();
        lastX = e.pageX;
        velX = 0;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('velocity-blur');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX;
        const now = performance.now();
        const dT = now - lastTime;
        const dX = x - lastX;

        // Calculate instantaneous velocity
        if (dT > 0) {
            velX = dX / dT * 15; // scalar factor
        }

        targetX += dX;

        lastX = x;
        lastTime = now;
    });

    // Inertia and boundary ticks loop
    function update() {
        // Damping / Friction
        if (!isDown) {
            targetX += velX;
            velX *= 0.92; // decay inertia

            // Remove blur if velocity is low
            if (Math.abs(velX) < 1) {
                track.classList.remove('velocity-blur');
            }
        } else {
            // Add blur if dragging fast
            if (Math.abs(velX) > 4) {
                track.classList.add('velocity-blur');
            } else {
                track.classList.remove('velocity-blur');
            }
        }

        // Lerp from current space to target
        currentX += (targetX - currentX) * 0.1;

        // Boundaries
        const containerWidth = container.offsetWidth;
        const trackWidth = track.scrollWidth;
        const minX = -(trackWidth - containerWidth + 80);
        const maxX = 0;

        if (targetX > maxX) {
            targetX = maxX;
        } else if (targetX < minX) {
            targetX = minX;
        }

        // Apply transform
        track.style.transform = `translate3d(${currentX}px, 0, 0)`;

        requestAnimationFrame(update);
    }

    update();
}
