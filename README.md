# LMPDCTN — Site statique

Ce dépôt contient une landing page et une page de collection simple en HTML/CSS/JS.

Fichiers principaux:
- `index.html` — page d'accueil
- `collection.html` — liste des produits (générée dynamiquement depuis `data/products.json`)
- `style.css` — styles
- `script.js` — interactions (chargement produits, mini-panier, modal, analytics)
- `data/products.json` — exemples de produits

Essai local:
Ouvrez `index.html` dans votre navigateur (double‑clic ou via le script PowerShell fourni).

Remarques:
- Les images dans `data/products.json` utilisent des images publiques (picsum). Fournissez vos propres images et mettez à jour `data/products.json` si nécessaire.
- Le paiement/checkout n'est qu'un placeholder.
- Analytics et panier sont stockés localement dans `localStorage`.
