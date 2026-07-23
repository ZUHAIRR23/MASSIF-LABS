/**
 * Controller module for the right-side Gallery Specifications Sidebar.
 * Displays detailed information about each specimen archived in the gallery.
 */

export const galleryData = {
    'EXH_A.01': {
        title: 'MEJA KONSOL BRUTALIST',
        desc: 'Sebuah karya pajangan monumental yang memadukan keindahan material mentah dengan struktur geometris yang presisi. Ideal untuk ruang tamu modern, credenza lobi, atau galeri kurasi.',
        img: '/src/assets/gallery_item1.png',
        specs: [
            { label: 'KATEGORI', value: 'MEJA & CREDENZA' },
            { label: 'DIMENSI', value: '1400w × 450d × 720h (mm)' },
            { label: 'MATERIAL', value: 'Kayu Oak Solid & Baja Karbon Patina' },
            { label: 'PROSES', value: 'Stabilisator logam manual, sambungan dovetail pasak, finishing charcoal hand-rubbed.' },
            { label: 'BERAT TOTAL', value: '42 kg // DESAIN BALAST' },
            { label: 'ASAL', value: 'Studio Desain Brutalist Berlin' },
            { label: 'STATUS', value: 'SELESAI VERIFIKASI // EDISI 1/10' }
        ]
    },
    'EXH_B.02': {
        title: 'KURSI KROM OBLIQUE',
        desc: 'Kursi santai berprofil rendah dengan perpaduan dinamis estetika baja tubular kokoh dan pelana sabuk kulit alami terdekonstruksi.',
        img: '/src/assets/gallery_item2.png',
        specs: [
            { label: 'KATEGORI', value: 'TEMPAT DUDUK // LOUNGE' },
            { label: 'DIMENSI', value: '880w × 920d × 680h (mm)' },
            { label: 'MATERIAL', value: 'Baja Krom Tubular & Sabuk Kulit Pelana Terracotta' },
            { label: 'PROSES', value: 'Tegangan baja melengkung robotik, sudut ergonomis rendah, sambungan baut rata dipoles cermin.' },
            { label: 'BERAT TOTAL', value: '18 kg' },
            { label: 'ASAL', value: 'Bengkel Rekayasa Logam Milan' },
            { label: 'STATUS', value: 'TERVERIFIKASI // PRODUKSI SESUAI PESANAN' }
        ]
    },
    'EXH_C.03': {
        title: 'LAMPU GANTUNG VAPOR',
        desc: 'Eksplorasi refraksi cahaya melalui media kaca berkabut krom teruap. Menyebarkan pencahayaan hangat dengan pola bayangan geometris terdekonstruksi.',
        img: '/src/assets/gallery_item3.png',
        specs: [
            { label: 'KATEGORI', value: 'PENCAHAYAAN' },
            { label: 'DIMENSI', value: '450w × 450d × 1200h (mm)' },
            { label: 'MATERIAL', value: 'Kaca Tiup Krom Teruap & Dudukan Kuningan Mentah' },
            { label: 'PROSES', value: 'Pembuatan kaca manual tiup tangan, fitting LED 2700K hangat terintegrasi, kabel suspensi berspindel rajutan.' },
            { label: 'DAYA LISTRIK', value: '12W // INPUT 220V AC' },
            { label: 'BERAT TOTAL', value: '6.5 kg' },
            { label: 'ASAL', value: 'Studio Seni Kaca Murano Venesia' },
            { label: 'STATUS', value: 'TERSEDIA (4 UNIT) // SERI AC-04' }
        ]
    },
    'EXH_D.04': {
        title: 'PEDESTAL BALOK TRAVERTINE',
        desc: 'Struktur silinder monumental dari batu travertine madu asli Italia yang dibiarkan tanpa diisi (unfilled) untuk menonjolkan pori-pori permukaan alaminya.',
        img: '/src/assets/gallery_item4.png',
        specs: [
            { label: 'KATEGORI', value: 'PATUNG / INTEGRASI SPASIAL' },
            { label: 'DIMENSI', value: '350w × 350d × 900h (mm)' },
            { label: 'MATERIAL', value: 'Batu Travertine Madu Italia Diasah' },
            { label: 'PROSES', value: 'Pahat balok masif dari tambang Tuscany, pelapisan matte hidrofobik mentah, kaki anti-poros pelindung tersembunyi.' },
            { label: 'BERAT TOTAL', value: '56.5 kg' },
            { label: 'ASAL', value: 'Tambang Batu Alam Tuscany Italia' },
            { label: 'STATUS', value: 'BAHAN TERSEDIA // PENGERJAAN ESTIMASI 4 MINGGU' }
        ]
    },
    'EXH_E.05': {
        title: 'SOFA MINI TERDEKONSTRUKSI',
        desc: 'Eksplorasi struktural sofa yang menonjolkan rangka baja eksternal kasar and bantalan wol bouclé empuk. Mengaburkan batas antara seni industri dan kenyamanan domestik.',
        img: '/src/assets/item1.png',
        specs: [
            { label: 'KATEGORI', value: 'TEMPAT DUDUK // SOFA' },
            { label: 'DIMENSI', value: '1200w × 850d × 700h (mm)' },
            { label: 'MATERIAL', value: 'Wol Bouclé Tekstur & Baja Karbon Las Mentah' },
            { label: 'PROSES', value: 'Pengelasan TIG ekspresif, jahitan ganda tak terlihat, stabilisasi busa memori kepadatan ganda.' },
            { label: 'BERAT TOTAL', value: '34 kg' },
            { label: 'ASAL', value: 'Studio Konstruksi Brutalist Paris' },
            { label: 'STATUS', value: 'TERSEDIA UNTUK DIPESAN' }
        ]
    },
    'EXH_F.06': {
        title: 'RAK BUKU INTEGRASI BAJA',
        desc: 'Sistem rak vertikal monolitik dari baja karbon hitam teroksidasi dengan sambungan pasak kuningan kontras.',
        img: '/src/assets/item2.png',
        specs: [
            { label: 'KATEGORI', value: 'PENYIMPANAN // RAK BUKU' },
            { label: 'DIMENSI', value: '900w × 350d × 2000h (mm)' },
            { label: 'MATERIAL', value: 'Pelat Baja Karbon Hitam & Pin Kuningan Patina' },
            { label: 'PROSES', value: 'Pemotongan laser serat CNC, oksidasi belerang manual untuk warna hitam arang, pemasangan pin pasak.' },
            { label: 'BERAT TOTAL', value: '65 kg // JANGKAR DINDING WAJIB' },
            { label: 'ASAL', value: 'Bengkel Metalurgi Stockholm' },
            { label: 'STATUS', value: 'TERSEDIA UNTUK DIPESAN' }
        ]
    },
    'EXH_G.07': {
        title: 'KURSI CANTILEVER SATIN',
        desc: 'Desain cantilever klasik yang direkayasa ulang dengan pelat baja tahan karat tebal yang disikat searah demi ketahanan struktural maksimal tanpa kaki belakang.',
        img: '/src/assets/item3.png',
        specs: [
            { label: 'KATEGORI', value: 'TEMPAT DUDUK' },
            { label: 'DIMENSI', value: '550w × 600d × 800h (mm)' },
            { label: 'MATERIAL', value: 'Baja Tahan Karat Kelas 316' },
            { label: 'PROSES', value: 'Pemberian lekuk hidrolik presisi tinggi, finishing sikat satin searah, dudukan terintegrasi tersembunyi.' },
            { label: 'BERAT TOTAL', value: '24.5 kg' },
            { label: 'ASAL', value: 'Bengkel Baja Presisi Hamburg' },
            { label: 'STATUS', value: 'BAHAN BAKU TERSEDIA' }
        ]
    },
    'EXH_H.08': {
        title: 'MEJA SISI TRAVERTINE MONOLIT',
        desc: 'Meja kubik solid dari batu travertine kelas-A tidak terisi, menonjolkan bobot spasial visual dan kejujuran material.',
        img: '/src/assets/item4.png',
        specs: [
            { label: 'KATEGORI', value: 'MEJA SISI' },
            { label: 'DIMENSI', value: '400w × 400d × 450h (mm)' },
            { label: 'MATERIAL', value: 'Travertine Honey Italia Unfilled' },
            { label: 'PROSES', value: 'Pemotongan blok monolitik, pengasahan permukaan presisi, impregnasi lilin lebah pelindung alami.' },
            { label: 'BERAT TOTAL', value: '48 kg' },
            { label: 'ASAL', value: 'Studio Pengrajin Batu Roma' },
            { label: 'STATUS', value: 'TERSEDIA (2 UNIT)' }
        ]
    }
};

export function initGallerySidebar(customData = galleryData) {
    const triggers = document.querySelectorAll('.gallery-img-wrapper');
    const overlay = document.getElementById('spec-sidebar-overlay');
    const sidebar = document.getElementById('spec-sidebar');
    const closeBtn = document.getElementById('spec-sidebar-close');

    if (!sidebar || !overlay || !closeBtn) return;

    function openSidebar(id) {
        const item = customData[id];
        if (!item) return;

        // Fill content
        document.getElementById('spec-sidebar-ref').textContent = id;
        document.getElementById('spec-sidebar-title').textContent = item.title;
        document.getElementById('spec-sidebar-desc').textContent = item.desc;
        document.getElementById('spec-sidebar-img').src = item.img;
        document.getElementById('spec-sidebar-img').alt = item.title;

        const table = document.getElementById('spec-sidebar-table');
        table.innerHTML = '';

        item.specs.forEach(spec => {
            const row = document.createElement('div');
            row.className = 'spec-sidebar-row';
            row.innerHTML = `
        <span class="spec-row-lbl">${spec.label}</span>
        <span class="spec-row-val">${spec.value}</span>
      `;
            table.appendChild(row);
        });

        // Activating Sidebar
        overlay.classList.add('active');
        sidebar.classList.add('active');

        // Disable main body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        overlay.classList.remove('active');
        sidebar.classList.remove('active');

        // Restore main body scroll
        document.body.style.overflow = '';
    }

    triggers.forEach(trigger => {
        // Read the exh ID from the adjacent meta ref text Content
        const card = trigger.closest('.gallery-item-card');
        if (!card) return;
        const refEl = card.querySelector('.item-ref');
        if (!refEl) return;
        const id = refEl.textContent.trim();

        trigger.addEventListener('click', () => {
            openSidebar(id);
        });
    });

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Esc key closes the sidebar
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
}
