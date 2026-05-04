# 🚀 Guide de Démarrage Rapide - Dashboard Admin

Bienvenue ! Votre **dashboard administrateur professionnel** est prêt à l'emploi. Voici comment commencer.

## 📍 Accès en 30 secondes

1. **Démarrez votre serveur Vite :**
   ```bash
   npm run dev
   ```

2. **Ouvrez le navigateur :**
   ```
   http://localhost:5173/admin/login
   ```

3. **Connectez-vous avec :**
   - Email: `admin@example.com`
   - Mot de passe: `SecureAdmin@2024`

4. **Vous êtes dans le dashboard !** ✅

---

## 📚 Les 5 Points Clés

### 1️⃣ **Vue d'ensemble (Dashboard)**
- Votre premier arrêt après connexion
- Voir les statistiques clés
- Accès rapide aux actions principales
- **URL:** `/admin/dashboard`

### 2️⃣ **Gérer les Produits**
- Voir tous vos produits
- **Ajouter** un nouveau produit
- **Modifier** les informations
- **Supprimer** un produit
- **Chercher** par titre
- **Filtrer** par catégorie
- **URL:** `/admin/products`

### 3️⃣ **Gérer les Utilisateurs**
- Liste complète des utilisateurs du dashboard
- **Ajouter** un nouvel utilisateur
- **Assigner** un rôle (Admin, Éditeur, Lecteur)
- **Modifier** ou **supprimer** un utilisateur
- **Filtrer** par rôle ou statut
- **URL:** `/admin/users`

### 4️⃣ **Paramètres**
- Notifications
- Sécurité du compte
- Sauvegarde/Export des données
- **URL:** `/admin/settings`

### 5️⃣ **Profil & Déconnexion**
- Cliquez sur votre avatar (en haut à droite)
- Gérez votre profil
- Déconnexion sécurisée

---

## 🎯 Cas d'usage courants

### Je veux ajouter un produit

```
Sidebar → Produits → "+ Ajouter un produit"
→ Remplir le formulaire
→ Cliquer "Créer le produit"
```

**Champs à remplir :**
- ✏️ Titre (obligatoire)
- ✏️ Description
- ✏️ Prix en € (obligatoire)
- ✏️ Catégorie
- ✏️ URL image principale
- ✏️ URL miniature

### Je veux ajouter un utilisateur admin

```
Sidebar → Utilisateurs → "+ Ajouter un utilisateur"
→ Nom, Email, Rôle = "Administrateur"
→ Cliquer "Créer"
```

### Je veux modifier un produit

```
Produits → Tableau → Cliquer l'icône ✏️
→ Modifier les champs
→ Cliquer "Modifier le produit"
```

### Je veux supprimer quelque chose

```
Tableau → Cliquer l'icône 🗑️
→ Confirmer la suppression
```

---

## 👥 Les Rôles Expliqués

| Rôle | Peut faire | Idéal pour |
|------|-----------|-----------|
| 🔴 **Super Admin** | ✅ TOUT | Le propriétaire |
| 🟣 **Admin** | ✅ Gérer le contenu | Manager d'équipe |
| 🔵 **Éditeur** | ✅ Créer/modifier contenu | Community manager |
| ⚪ **Lecteur** | ⭕ Seulement voir | Consultant |

---

## 🔑 Autres Comptes de Test

Pour tester les permissions :

**Éditeur :**
- Email: `editor@example.com`
- Mot de passe: `Editor@2024Pass`

---

## 🎨 Quelques Astuces d'Interface

### Sidebar sur mobile
- Cliquez le bouton **☰** (menu) en haut à gauche
- Il se ferme tout seul après une action

### Recherche
- Utilisez la barre de recherche 🔍 pour filtrer rapidement
- Fonctionne sur produits, utilisateurs, etc.

### Notifications
- Cliquez la cloche 🔔 en haut pour voir les alertes

### Actions rapides
- Dans le Dashboard, les boutons bleus sont les actions principales

---

## ❌ Si quelque chose ne marche pas

### Le dashboard ne charge pas
```
→ Vérifiez que vous êtes connecté
→ Essayez de rafraîchir (F5)
→ Vérifiez la console (F12) pour les erreurs
```

### Les données disparaissent après rafraîchissement
```
→ C'est normal, les données sont temporaires (MVP)
→ Elles se réinitialisent à chaque session
→ C'est prévu d'être connecté à une vraie BD prochainement
```

### Je me suis déconnecté
```
→ Allez à /admin/login
→ Reconnectez-vous avec vos identifiants
```

---

## 📖 Besoin de plus d'infos ?

Consultez le fichier complet : **[ADMIN_DASHBOARD.md](./ADMIN_DASHBOARD.md)**

---

## ✨ Ce qui vient bientôt

- 📊 Graphiques et analytics avancées
- 📦 Gestion des commandes
- 💌 Gestion des messages/contact
- 📝 Blog/Articles
- 🔍 Logs d'activité complète
- 🌐 Support multi-langue
- 🗄️ Vrai base de données
- 🔒 Authentification ultra-sécurisée

---

**Vous êtes prêt ! Bonne gestion ! 🎉**

> Besoin d'aide ? Consultez la documentation ou contactez support.
