# Dashboard Administrateur - LMPDCTN

## Vue d'ensemble

Bienvenue sur le **Dashboard Administrateur professionnel** de votre site e-commerce. Cette interface vous permet de gérer facilement votre boutique, vos produits, et vos utilisateurs sans toucher au code.

## 🚀 Accès au Dashboard

- **URL de connexion:** `http://localhost:5173/admin/login`
- **Email de test:** `admin@example.com`
- **Mot de passe de test:** `SecureAdmin@2024`

### Autres comptes de test:
- **Éditeur:** `editor@example.com` / `Editor@2024Pass`

## 📋 Fonctionnalités Disponibles

### 1. **Authentification Admin Sécurisée**
- Page de connexion moderne et intuitive
- Gestion des rôles (Super Admin, Admin, Éditeur, Lecteur)
- Protection des routes : accès refusé si non connecté
- Déconnexion sécurisée

### 2. **Tableau de Bord (Dashboard)**
- **Statistiques clés :**
  - Nombre de produits
  - Nombre d'utilisateurs
  - Commandes ce mois
  - Revenu mensuel
- **Activité récente** : suivi des actions
- **Actions rapides** : accès direct aux fonctions principales

### 3. **Gestion des Produits**
- ✅ **Créer** des produits (titre, description, prix, catégorie, images)
- ✅ **Modifier** les informations des produits
- ✅ **Supprimer** un produit
- ✅ **Rechercher** par titre
- ✅ **Filtrer** par catégorie
- ✅ **Affichage en tableau** avec images de prévisualisation

**Champs disponibles :**
- Titre
- Description
- Prix (en €)
- Catégorie
- Image principale (URL)
- Miniature (URL)

### 4. **Gestion des Utilisateurs**
- ✅ **Créer** un nouvel utilisateur
- ✅ **Modifier** les informations d'un utilisateur
- ✅ **Supprimer** un utilisateur
- ✅ **Assigner des rôles** (Super Admin, Admin, Éditeur, Lecteur)
- ✅ **Gérer le statut** (Actif/Inactif)
- ✅ **Rechercher** et **filtrer** par rôle

**Champs disponibles :**
- Nom
- Email
- Rôle
- Statut
- Date d'inscription

### 5. **Paramètres**
- Paramètres généraux du dashboard
- Gestion des notifications
- Options de sécurité
- Sauvegarde/Export des données

## 🎨 Design & Interface

### Caractéristiques visuelles :
- **Thème sombre professionnel** inspiré des dashboards modernes (Notion, Shopify, Stripe)
- **Interface responsive** : desktop, tablette, mobile
- **Sidebar navigable** avec menu principal
- **Header fluide** avec recherche et notifications
- **Animations douces** pour une meilleure UX
- **Accessibilité** : contraste, navigation au clavier

### Couleurs principales :
- Fond: Slate (#1E293B)
- Accent: Blue (#2563EB)
- Succès: Green (#16A34A)
- Danger: Red (#DC2626)

## 📂 Structure des Fichiers

```
src/admin/
├── components/
│   ├── AdminLayout.jsx          # Layout principal du dashboard
│   ├── Header.jsx               # Header avec notifications et profil
│   ├── Sidebar.jsx              # Menu de navigation
│   └── ProtectedAdminRoute.jsx  # Protection des routes
├── context/
│   ├── AdminAuthContext.jsx     # Gestion de l'authentification
│   └── AdminDataContext.jsx     # Gestion des données (CRUD)
├── pages/
│   ├── Login.jsx                # Page de connexion
│   ├── Dashboard.jsx            # Tableau de bord
│   ├── Products.jsx             # Gestion des produits
│   ├── ProductForm.jsx          # Formulaire de produit
│   ├── Users.jsx                # Gestion des utilisateurs
│   └── Settings.jsx             # Paramètres
└── utils/
    └── adminAuth.js             # Utilitaires d'authentification
```

## 🔐 Système d'Authentification

### Hiérarchie des rôles :

| Rôle | Permissions | Couleur |
|------|-------------|---------|
| **Super Admin** | Accès total au dashboard | 🔴 Rouge |
| **Admin** | Gestion complète du contenu | 🟣 Violet |
| **Éditeur** | Créer et modifier contenu | 🔵 Bleu |
| **Lecteur** | Consultation uniquement | ⚪ Gris |

### Protection des données :
- Les mots de passe sont hashés (simple pour le MVP, à améliorer en production)
- Les tokens sont stockés dans localStorage (à améliorer avec HttpOnly cookies)
- Déconnexion automatique après inactivité possible

## 🔧 Comment Utiliser

### Ajouter un produit :
1. Allez à **Produits** dans la sidebar
2. Cliquez sur **"+ Ajouter un produit"**
3. Remplissez les champs du formulaire
4. Cliquez sur **"Créer le produit"**

### Ajouter un utilisateur :
1. Allez à **Utilisateurs** dans la sidebar
2. Cliquez sur **"+ Ajouter un utilisateur"**
3. Remplissez nom, email, rôle
4. Cliquez sur **"Créer"**

### Modifier/Supprimer :
- Cliquez sur l'icône ✏️ pour modifier
- Cliquez sur l'icône 🗑️ pour supprimer (confirmation requise)

### Recherche et Filtrage :
- Utilisez la **barre de recherche** pour trouver rapidement
- Utilisez les **filtres** pour afficher par catégorie ou rôle

## 📊 Statistiques

Le tableau de bord affiche :
- **Total produits** : nombre total de produits
- **Total utilisateurs** : nombre total d'utilisateurs
- **Commandes ce mois** : nombre de commandes (simulation)
- **Revenu mensuel** : revenu généré (simulation)

Les données affichent des variations en pourcentage (vs mois dernier).

## 🚀 Améliorations Futures

### MVP 2 (À venir):
- ✨ Gestion des catégories complète
- ✨ Analytics avancées (graphiques, statistiques)
- ✨ Gestion des commandes
- ✨ Historique des actions (logs)
- ✨ Notifications en temps réel

### MVP 3 (À venir):
- ✨ Gestion des messages/contact
- ✨ Gestion du blog/articles
- ✨ Paramètres SEO complets
- ✨ Gestion des rôles personnalisés
- ✨ Export/Import CSV

### Production:
- 🔒 Authentification sécurisée (Clerk, NextAuth)
- 💾 Base de données réelle (PostgreSQL)
- 📧 Notifications email
- 🌐 Multi-langue
- 📱 Progressive Web App (PWA)

## ⚙️ Configuration

### Technologies utilisées :
- **React** 19.2.4
- **React Router** 7.13.2
- **Tailwind CSS** 4.2.2
- **Lucide React** 1.7.0 (icônes)

### À installer si nécessaire :
```bash
npm install react react-dom react-router-dom tailwindcss lucide-react
```

## 🐛 Dépannage

### Je ne peux pas accéder au dashboard
- Vérifiez que vous êtes connecté : allez à `/admin/login`
- Identifiants par défaut : `admin@example.com` / `admin123`

### Les produits ne s'affichent pas
- Les données sont stockées en localStorage pour le MVP
- Rafraîchissez la page (F5)

### Le sidebar ne s'affiche pas sur mobile
- Cliquez sur le bouton menu (≡) en haut à gauche

## 📞 Support

Pour toute question ou amélioration, veuillez consulter la documentation du projet ou contacter l'équipe de développement.

---

**Version:** 1.0.0 MVP  
**Dernière mise à jour:** Avril 2024  
**Statut:** ✅ Production-Ready (MVP)
