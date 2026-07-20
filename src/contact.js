export function initContactForm() {
    const form = document.getElementById('acquisition-form');
    const statusMsg = document.getElementById('form-status-msg');
    if (!form || !statusMsg) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show submitting state
        statusMsg.className = 'form-status';
        statusMsg.style.display = 'block';
        statusMsg.textContent = 'MENGIRIM DIREKTIF DATA PERTANYAAN...';

        setTimeout(() => {
            // Simulate successful validation encryption transmit
            statusMsg.classList.add('success');
            statusMsg.textContent = 'TRANSMISI DITERIMA. PROTOKOL DIMULAI.';
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
