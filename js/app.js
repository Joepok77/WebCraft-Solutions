const API_URL = 'https://gabistam.github.io/Demo_API/data/projects.json';

let allProjects = [];
let allTechnologies = [];
let currentFilter = 'all';
// menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', () => {
    
    loadProjects();

    setupMobileMenu();

    setupModal();
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

const loadProjects = async () => {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');
    const projectsGrid = document.getElementById('projectsGrid');

    try {
        loader.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        projectsGrid.innerHTML = '';

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const { projects, technologies } = data;
        allProjects = projects;
        allTechnologies = technologies;

        createFilterButtons();

        displayProjects(allProjects);

        loader.classList.add('hidden');

    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);

        loader.classList.add('hidden');
        errorMessage.classList.remove('hidden');

        console.error('Détails de l\'erreur:', {
            message: error.message,
            url: API_URL
        });
    }
};

const createFilterButtons = () => {
    const filterContainer = document.getElementById('filterContainer');

    // Ajouter événement au bouton "Tous les projets"
    const allButton = filterContainer.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.addEventListener('click', () => filterProjects('all'));
    }

    allTechnologies.forEach(tech => {
        const button = document.createElement('button');
        button.className = 'filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md hover:shadow-lg transform hover:scale-105';
        button.textContent = tech;
        button.setAttribute('data-filter', tech);

        button.addEventListener('click', () => filterProjects(tech));

        filterContainer.appendChild(button);
    });
};

/**
 * Filtrage des projets par technologie
 * @param {string} technology 
 */
const filterProjects = (technology) => {
    currentFilter = technology;

    // Mise à jour des boutons actifs
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === technology) {
            btn.className = 'filter-btn active px-6 py-2 rounded-full font-medium transition-all duration-300 bg-primary text-white shadow-md hover:shadow-lg transform hover:scale-105';
        } else {
            btn.className = 'filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md hover:shadow-lg transform hover:scale-105';
        }
    });

    const filteredProjects = technology === 'all'
        ? allProjects
        : allProjects.filter(project => project.technologies.includes(technology));

    displayProjects(filteredProjects);
};

/**
 * Affichage des projets dans la grille
 * @param {Array} projects 
 */
const displayProjects = (projects) => {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500 text-xl">Aucun projet trouvé pour ce filtre.</p>
            </div>
        `;
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl';

        const img = document.createElement('img');
        img.src = project.image;
        img.alt = `Capture d'écran du projet ${project.title}`;
        img.className = 'w-full h-48 object-cover';
        img.loading = 'lazy';

        const content = document.createElement('div');
        content.className = 'p-6';

        const titleElement = document.createElement('h3');
        titleElement.className = 'text-xl font-bold text-gray-800 mb-2';
        titleElement.textContent = project.title;

        const clientElement = document.createElement('p');
        clientElement.className = 'text-gray-600 mb-4';
        clientElement.innerHTML = `<span class="font-semibold">Client:</span> ${project.client}`;

        const techContainer = document.createElement('div');
        techContainer.className = 'flex flex-wrap gap-2 mb-4';

        project.technologies.forEach(tech => {
            const badge = document.createElement('span');
            badge.className = 'tech-badge text-xs font-semibold px-3 py-1 rounded-full';
            badge.textContent = tech;
            techContainer.appendChild(badge);
        });

        const button = document.createElement('button');
        button.className = 'w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300';
        button.textContent = 'Voir détails';
        button.setAttribute('aria-label', `Voir les détails du projet ${project.title}`);
        button.addEventListener('click', () => openModal(project));

        content.appendChild(titleElement);
        content.appendChild(clientElement);
        content.appendChild(techContainer);
        content.appendChild(button);

        card.appendChild(img);
        card.appendChild(content);

        projectsGrid.appendChild(card);
    });
};

//  Configuration du modal
 
const setupModal = () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');

    // Fermeture au clic sur le bouton
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Fermeture au clic en dehors du modal
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
};

/**
 * Ouverture du modal avec les données du projet
 * @param {Object} project - Données du projet
 */
const openModal = ({ title, image, client, category, year, duration, description, technologies, features, url }) => {
    const modal = document.getElementById('projectModal');

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').src = image;
    document.getElementById('modalImage').alt = `Capture d'écran du projet ${title}`;
    document.getElementById('modalClient').textContent = client;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalYear').textContent = year;
    document.getElementById('modalDuration').textContent = duration;
    document.getElementById('modalDescription').textContent = description;

    const techContainer = document.getElementById('modalTechnologies');
    techContainer.innerHTML = '';
    technologies.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge text-sm font-semibold px-4 py-2 rounded-full';
        badge.textContent = tech;
        techContainer.appendChild(badge);
    });

    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    document.getElementById('modalLink').href = url;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modal.focus();
};

// Fermeture du modal

const closeModal = () => {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Réactivation du scroll
};
