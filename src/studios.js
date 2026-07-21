/**
 * Studio Location Clocks Module
 * Updates timezone clocks for representative offices (Jakarta, Milan, Tokyo) in real-time.
 */
export function initStudioClocks() {
    const clocks = document.querySelectorAll('.studio-clock');
    if (clocks.length === 0) return;

    function updateClocks() {
        clocks.forEach(clock => {
            const timezone = clock.getAttribute('data-timezone');
            if (!timezone) return;

            try {
                const timeString = new Date().toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                clock.textContent = timeString;
            } catch (err) {
                // Fallback to UTC time/local formatting if timezone is unsupported
                const now = new Date();
                clock.textContent = now.toTimeString().split(' ')[0];
            }
        });
    }

    // Initial call, then interval
    updateClocks();
    setInterval(updateClocks, 1000);
}
