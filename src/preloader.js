export function runPreloader(onCompleteCallback) {
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
