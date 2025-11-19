<!-- Instructions concises pour les agents AI travaillant sur ce dépôt -->
# Copilot instructions — LMPDCTN (site vitrine / boutique)

Résumé rapide
- Petit site statique pour une boutique de vêtements (HTML/CSS/JS). Pas de build system ni dépendances externes.
- Fichiers clés : `index.html` (structure, hero, upload, galerie, produits), `style.css` (thème, `.reveal`, `.enlarged`, `bg-overlay`), `script.js` (logique UI, diaporama, parallax).

Architecture & flux de données
- Front-end uniquement : les images ajoutées via `#imageInput` sont lues en base64 et `append` dans `#imageContainer` (voir fonction `afficherImage()` dans `script.js`).
- Un mini-module diaporama est exposé globalement sur `window.__slideshow` (méthodes : `show(i)`, `next()`, `prev()`, `play()`, `pause()`, `updateControls()`).
- Les produits actuels sont codés en dur dans `index.html` (section `.products`). Pour rendre dynamique, fournir un JSON (ex. `data/products.json`) et rendre la grille depuis `script.js`.

Conventions et patterns spécifiques
- Animation progressive : éléments reçoivent la classe `.reveal` puis `.visible` (CSS gère l'animation). Respecter `prefers-reduced-motion` (détecté dans `script.js`).
- Sélecteurs importants : `#imageContainer`, `#imageInput`, `#prevBtn`, `#nextBtn`, `#playPauseBtn`, `#shopBtn`, `.products`.
- Ajout d'images : le code ajoute (append) plutôt que remplacer — prévoir logique pour limiter/vider la galerie si nécessaire.
- Agrandissement : toggle CSS `.enlarged` sur l'élément `<img>` (click-to-enlarge).

Développement local & tests
- Pas de build : ouvrir `index.html` directement dans un navigateur (Chrome/Edge/Firefox). Tester manuellement : upload d'images, play/pause, prev/next, agrandissement.
- Debugging : la console contient objets globaux (ex. `window.__slideshow`). Utiliser `console.log()` dans `script.js` pour diagnostic.

Points d'attention pour les contributeurs
- Accessibilité : ajouter `alt` sur images générées, labels `aria` sur contrôles (déjà présents pour certains boutons).
- Performance : les images sont converties en base64 via FileReader — pour une vraie boutique, stocker des URLs et éviter de garder des images lourdes en mémoire.
- Responsiveness : utiliser les classes existantes (`.container`, responsive CSS) et conserver les media queries déjà définies.

Exemples rapides (références dans le code)
- Appeler le diaporama depuis la console :
  - `window.__slideshow.play()` — démarre la lecture automatique
  - `window.__slideshow.next()` — image suivante
- Ajouter un produit dynamiquement (pseudocode) :
  - fetch `data/products.json` → créer `article.product-card` → `document.querySelector('.products').appendChild(card)`

Workflow PR & style de code
- Garder les changements limités et lisibles : modifications CSS dans `style.css`, logique front dans `script.js`, structure HTML dans `index.html`.
- Pas de tests automatisés présents — valider manuellement les interactions clés avant PR.

Questions à poser avant d'agir
- Voulez-vous persistance côté client (localStorage) pour le panier ?
- Préférez-vous images serveurs (URLs) ou kept-in-memory via FileReader pour la galerie ?

Si une section doit être enrichie (ex. ajout d'un guide pour ajouter des produits dynamiques, conventions Git/commits), dites-le et j'itérerai.
