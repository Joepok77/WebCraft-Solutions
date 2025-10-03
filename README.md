# 🚀 WebCraft Solutions - Portfolio Interactif

## 📋 Description du projet

Portfolio interactif pour l'agence **WebCraft Solutions**, créé dans le cadre de l'évaluation E1 du Bloc 1 RNCP39608. Ce site permet de présenter les projets clients de l'agence avec un système de filtrage dynamique et une interface moderne.

## 🎯 Fonctionnalités principales

### ✅ Page d'accueil (index.html)
- **Hero Section** avec animation CSS au chargement
- **Portfolio dynamique** : chargement des projets via AJAX depuis l'API
- **Système de filtrage** : filtrage par technologie sans rechargement de page
- **Modal interactif** : affichage détaillé de chaque projet
- **Design responsive** : adaptation mobile et desktop

### ✅ Page À propos (about.html)
- Présentation de l'agence
- **Statistiques animées** avec compteurs progressifs
- Section équipe
- Valeurs de l'entreprise
- Call to action

### ✅ Page Contact (contact.html)
- **Formulaire de contact** avec validation JavaScript
- Validation en temps réel des champs
- Messages d'erreur personnalisés
- Confirmation de soumission
- Informations de contact détaillées

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **Tailwind CSS** : Framework CSS utility-first (via CDN)
- **JavaScript ES6+** : Manipulation DOM, AJAX, validation
- **API REST** : Consommation de données JSON

## 📁 Structure du projet

```
controle_E1/
├── index.html          # Page d'accueil - Portfolio
├── html/
│   ├── about.html     # Page À propos
│   └── contact.html   # Page Contact
├── css/
│   └── style.css      # CSS personnalisé (animations, effets)
├── js/
│   ├── app.js         # JavaScript principal (AJAX, filtrage, modal)
│   ├── about.js       # Animation des statistiques
│   └── contact.js     # Validation du formulaire
├── images/
│   └── freepik__a-sleek-modern-logo-for-webcraft-solutions-a-digit__14785.png
└── README.md          # Documentation
```

## 🌐 API utilisée

**URL de l'API** : `https://gabistam.github.io/Demo_API/data/projects.json`

L'API retourne un objet JSON contenant :
- `projects` : tableau de tous les projets
- `technologies` : liste des technologies
- `categories` : liste des catégories


## 🎨 Fonctionnalités interactives

### Filtrage des projets
1. Au chargement, tous les projets s'affichent
2. Boutons de filtre générés dynamiquement depuis les technologies de l'API
3. Clic sur un filtre → affichage uniquement des projets correspondants
4. Transition fluide sans rechargement de page

### Modal de détails
1. Clic sur "Voir détails" → ouverture du modal
2. Affichage complet des informations du projet
3. Fermeture par :
   - Bouton de fermeture (×)
   - Clic en dehors du modal
   - Touche Échap du clavier

### Validation du formulaire
1. Validation en temps réel (événement `blur`)
2. Messages d'erreur personnalisés
3. Validation du format email avec regex
4. Animation shake sur les champs en erreur
5. Confirmation visuelle après soumission

## 📱 Responsive Design

Le site est entièrement responsive avec 2 breakpoints principaux :
- **Mobile** : 320px - 767px
- **Desktop** : 768px et plus

Adaptation :
- Menu mobile hamburger
- Grille de projets : 1 colonne (mobile) → 2-3 colonnes (desktop)
- Typographie adaptative
- Espacements responsifs

## 🚀 Installation et utilisation

### Ouverture directe
1. Cloner ou télécharger le repository
2. Ouvrir `index.html` dans un navigateur moderne
3. clique droit sur la souris puis allez dans open with live server



## ✅ Validation W3C

Pour valider le code HTML :
1. Aller sur https://validator.w3.org/
2. Uploader chaque fichier HTML ou coller l'URL
3. Vérifier qu'il n'y a pas d'erreurs

**Note** : Les captures d'écran de validation sont à fournir dans le dossier de rendu.

## 🎯 Points clés de l'évaluation

### Compétences C1 (HTML5)
- Structure sémantique complète
- Accessibilité avec ARIA
- Validation W3C sans erreurs

### Compétences C2 & C3 (CSS)
- Design moderne avec Tailwind CSS
- Responsive parfait
- Animations fluides

### Compétences C4 (JavaScript)
- Code ES6+ propre et commenté
- Manipulation DOM efficace
- Validation robuste

### Compétences C5 (AJAX)
- Intégration API réussie
- Gestion d'erreur complète
- UX optimale (loader, messages)

## 📝 Notes de développement

### Choix techniques
- **Tailwind CSS** : Utilisé pour le design rapide et cohérent 
- **CSS natif (style.css)** : Animations personnalisées @keyframes et effets avancés pour un design personnalisé 
- **Fetch API** : Standard moderne natif au navigateur pour les requêtes AJAX (pas Axios car bibliothèque externe interdite)
- **Async/Await** : Syntaxe claire pour le code asynchrone
- **IntersectionObserver** : API moderne pour des animations performantes au scroll

### Optimisations
- Images en lazy loading
- Animations CSS performantes
- Code JavaScript modulaire
- Commentaires détaillés

## 👨‍💻 Auteur

Projet réalisé dans le cadre de l'évaluation E1 - Bloc 1 RNCP39608

---

## 📄 Licence

Projet éducatif - Tous droits réservés
