export function initServicesAccordion() {
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

        if (hudStatus) hudStatus.innerHTML = `AKTIF // FASE_${idx}`;
        if (hudMaterial) hudMaterial.textContent = material;
        if (hudTolerance) hudTolerance.textContent = tolerance;
        if (hudIntegrity) hudIntegrity.textContent = integrity;
        if (hudProgressBar) hudProgressBar.style.width = `${progress}%`;
        if (hudProgressVal) hudProgressVal.textContent = `${progress}% SIAP`;
    }

    function resetHUDToIdle() {
        if (hudStatus) hudStatus.innerHTML = `STANDBY // MEMANTAU`;
        if (hudMaterial) hudMaterial.textContent = 'TIDAK ADA YANG DIPILIH';
        if (hudTolerance) hudTolerance.textContent = '--';
        if (hudIntegrity) hudIntegrity.textContent = '100% AMAN';
        if (hudProgressBar) hudProgressBar.style.width = '0%';
        if (hudProgressVal) hudProgressVal.textContent = '00% SIAP';
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
