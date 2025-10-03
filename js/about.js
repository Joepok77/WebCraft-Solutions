// menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    animateStats();
});

const setupMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        });
    }
};

// Animation des compteurs de statistiques

const animateStats = () => {
    const stats = [
        { id: 'projectsCount', target: 150, duration: 2000 },
        { id: 'yearsCount', target: 5, duration: 1500 },
        { id: 'clientsCount', target: 85, duration: 2000 },
        { id: 'teamCount', target: 12, duration: 1500 }
    ];

    // détectE quand la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => animateCounter(stat));
                observer.disconnect(); // Arrête d'observer après la première animation
            }
        });
    }, { threshold: 0.5 });

    const firstStatCard = document.querySelector('.stat-card');
    if (firstStatCard) {
        observer.observe(firstStatCard);
    }
};

/**
 * Animation d'un compteur
 * @param {Object} stat 
 */
const animateCounter = (stat) => {
    const element = document.getElementById(stat.id);
    if (!element) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / stat.duration, 1);

        // Fonction d'easing pour une animation plus naturelle
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (stat.target - startValue) * easeOutQuart);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = stat.target;
        }
    };

    requestAnimationFrame(updateCounter);
};
