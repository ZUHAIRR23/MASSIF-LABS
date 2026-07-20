export function initHeroGlow() {
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

export function initDynamicHUD() {
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
