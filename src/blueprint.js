export function initBlueprintSpecs() {
    const cards = document.querySelectorAll('.blueprint-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Deactivate all cards
            cards.forEach(c => c.classList.remove('active-card'));

            // Activate clicked card
            card.classList.add('active-card');

            // Staggered flash reveal layout effect for list items
            const items = card.querySelectorAll('.tech-item');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translate3d(0, 5px, 0)';

                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translate3d(0, 0, 0)';
                }, index * 60);
            });
        });

        // Add custom cursor styling support for hover
        card.addEventListener('mouseenter', () => {
            const cursorDot = document.querySelector('.custom-cursor');
            const cursorFollower = document.querySelector('.custom-cursor-follower');
            if (cursorDot && cursorFollower) {
                cursorFollower.style.backgroundColor = 'rgba(26, 25, 23, 0.05)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const cursorFollower = document.querySelector('.custom-cursor-follower');
            if (cursorFollower) {
                cursorFollower.style.backgroundColor = '';
            }
        });
    });
}
