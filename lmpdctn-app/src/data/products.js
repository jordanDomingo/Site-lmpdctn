const defaultProducts = [
  {
    id: 'p1',
    title: 'Produit 1',
    description: 'Description du produit 1, parfait pour toutes occasions.',
    price: 3500,
    category: 'Vêtements',
    image: 'https://i.pinimg.com/1200x/8c/24/e0/8c24e0696c8a34c9d202d6b7f04d0d37.jpg',
    thumb: 'https://i.pinimg.com/1200x/8c/24/e0/8c24e0696c8a34c9d202d6b7f04d0d37.jpg'
  },
  {
    id: 'p2',
    title: 'Produit 2',
    description: 'Style unique, confort garanti.',
    price: 3500,
    category: 'Accessoires',
    image: 'https://i.pinimg.com/1200x/87/67/1c/87671cdf8b99321980cf2565db8bb3f2.jpg',
    thumb: 'https://i.pinimg.com/1200x/87/67/1c/87671cdf8b99321980cf2565db8bb3f2.jpg'
  },
  {
    id: 'p3',
    title: 'Produit 3',
    description: 'Restez au chaud avec style.',
    price: 3500,
    category: 'Vêtements',
    image: 'https://i.pinimg.com/736x/aa/c3/4c/aac34c11a905976f927ed283164e60f4.jpg',
    thumb: 'https://i.pinimg.com/736x/aa/c3/4c/aac34c11a905976f927ed283164e60f4.jpg'
  },
  {
    id: 'p4',
    title: 'Produit 4',
    description: 'Un classique revisité.',
    price: 3500,
    category: 'Vêtements',
    image: 'https://i.pinimg.com/1200x/c9/18/2c/c9182c69dddc56ac6aac2cfebd010b31.jpg',
    thumb: 'https://i.pinimg.com/1200x/c9/18/2c/c9182c69dddc56ac6aac2cfebd010b31.jpg'
  },
  {
    id: 'p5',
    title: 'Produit 5',
    description: 'Qualité supérieure.',
    price: 3500,
    category: 'Accessoires',
    image: 'https://i.pinimg.com/1200x/f3/f4/18/f3f41870848b547e045f31d042dea95f.jpg',
    thumb: 'https://i.pinimg.com/1200x/f3/f4/18/f3f41870848b547e045f31d042dea95f.jpg'
  },
  {
    id: 'p6',
    title: 'Produit 6',
    description: 'Pour un look streetwear.',
    price: 3500,
    category: 'Vêtements',
    image: 'https://i.pinimg.com/736x/41/a8/bf/41a8bf9fece6461c6636f3b0abe9e7c8.jpg',
    thumb: 'https://i.pinimg.com/736x/41/a8/bf/41a8bf9fece6461c6636f3b0abe9e7c8.jpg'
  },
  {
    id: 'p7',
    title: 'Produit 7',
    description: 'Indispensable de la collection.',
    price: 3500,
    category: 'Vêtements',
    image: 'https://i.pinimg.com/1200x/c9/18/2c/c9182c69dddc56ac6aac2cfebd010b31.jpg',
    thumb: 'https://i.pinimg.com/1200x/c9/18/2c/c9182c69dddc56ac6aac2cfebd010b31.jpg'
  },
  {
    id: 'p8',
    title: 'Jogging Wide Leg Gris',
    description: 'Jogging oversize coupe wide leg, taille élastiquée avec cordon, tissu molleton épais — confort ultime au quotidien.',
    price: 3500,
    category: 'Vêtements',
    image: '/3a8a4ae55711345418097d6d51a90cf3.jpg',
    thumb: '/10fbacfb5c05b59502d614b58d419223.jpg'
  }
];

export const products = (() => {
  const stored = localStorage.getItem('lmpdctn_products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Erreur lecture localStorage', e);
    }
  }
  localStorage.setItem('lmpdctn_products', JSON.stringify(defaultProducts));
  return defaultProducts;
})();
