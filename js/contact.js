// menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupContactForm();
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


const setupContactForm = () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (form) {
        // Validation en temps réel
        nameInput.addEventListener('blur', () => validateName());
        emailInput.addEventListener('blur', () => validateEmail());
        messageInput.addEventListener('blur', () => validateMessage());

        // Suppression des erreurs lors de la saisie
        nameInput.addEventListener('input', () => clearError('name'));
        emailInput.addEventListener('input', () => clearError('email'));
        messageInput.addEventListener('input', () => clearError('message'));

        // Soumission du formulaire
        form.addEventListener('submit', handleSubmit);
    }
};

/**
 * Validation du champ nom
 * @returns {boolean} - True si valide
 */
const validateName = () => {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const name = nameInput.value.trim();
    // verification 
    if (name === '') {
        showError('name', 'Le nom est requis');
        return false;
    }

    if (name.length < 2) {
        showError('name', 'Le nom doit contenir au moins 2 caractères');
        return false;
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!nameRegex.test(name)) {
        showError('name', 'Le nom ne doit contenir que des lettres');
        return false;
    }

    clearError('name');
    return true;
};

/**
 * Validation du champ email
 * @returns {boolean} - True si valide
 */
const validateEmail = () => {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();

  
    if (email === '') {
        showError('email', 'L\'email est requis');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Veuillez entrer une adresse email valide');
        return false;
    }

    clearError('email');
    return true;
};

/**
 * Validation du champ message
 * @returns {boolean} - True si valide
 */
const validateMessage = () => {
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    const message = messageInput.value.trim();

    if (message === '') {
        showError('message', 'Le message est requis');
        return false;
    }

    if (message.length < 15) {
        showError('message', 'Le message doit contenir au moins 15 caractères');
        return false;
    }

    clearError('message');
    return true;
};

/**
 * Affichage d'un message d'erreur pour un champ
 * @param {string} fieldName - Nom du champ
 * @param {string} message - Message d'erreur
 */
const showError = (fieldName, message) => {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);

    // Ajout de la classe d'erreur à l'input
    input.classList.remove('border-gray-300', 'focus:ring-primary');
    input.classList.add('border-red-500', 'focus:ring-red-500', 'shake');

    errorElement.textContent = message;
    errorElement.classList.remove('hidden');

    // Suppression de l'animation après qu'elle soit terminée
    setTimeout(() => {
        input.classList.remove('shake');
    }, 500);

    // Attribution du focus au champ en erreur
    input.setAttribute('aria-invalid', 'true');
};

/**
 * Suppression du message d'erreur pour un champ
 * @param {string} fieldName - Nom du champ
 */
const clearError = (fieldName) => {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}Error`);

    input.classList.remove('border-red-500', 'focus:ring-red-500');
    input.classList.add('border-gray-300', 'focus:ring-primary');

    // Masquage du message d'erreur
    errorElement.classList.add('hidden');

    // Attributs ARIA
    input.setAttribute('aria-invalid', 'false');
};

/**
 * Gestion de la soumission du formulaire
 * @param {Event} event - Événement de soumission
 */
const handleSubmit = (event) => {
    event.preventDefault();

    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');

    // Validation de tous les champs
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        formSuccess.classList.remove('hidden');

        // Réinitialisation du formulaire
        document.getElementById('contactForm').reset();

        // Scroll vers le message de succès
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Masquage du message après 5 secondes
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);

    } else {
        formError.classList.remove('hidden');

        // Scroll vers le premier champ en erreur
        const firstError = document.querySelector('[aria-invalid="true"]');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
};
