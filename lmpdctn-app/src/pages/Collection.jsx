import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useFavorites } from '../context/FavoriteContext';

const Collection = ({ category }) => {
  const { isFavorite } = useFavorites();
  const [filter, setFilter] = useState(category || 'Tous');

  const categories = ['Tous', 'Mes Favoris', ...Array.from(new Set(products.map(p => p.category)))];

  let filteredProducts = products;
  if (filter === 'Mes Favoris') {
    filteredProducts = products.filter(p => isFavorite(p.id));
  } else if (filter !== 'Tous') {
    filteredProducts = products.filter(p => p.category === filter);
  }

  const pageTitle = category ? category.toUpperCase() : 'NOUVELLE COLLECTION';

  return (
    <div style={{ width: '100%' }}>

      {/* Header responsive */}
      <div className="collection-header animate-fadeInUp">
        <h1
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
            letterSpacing: '1px',
            lineHeight: 1,
          }}
        >
          {pageTitle}
        </h1>

        <div className="filter-bar">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setFilter(cat)}
              className="btn-filter"
              style={{
                background: filter === cat ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: filter === cat ? '#fff' : 'rgba(255,255,255,0.4)',
                borderColor: filter === cat ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grille produits */}
      <div className="page-content">
        <ProductGrid products={filteredProducts} />
      </div>

    </div>
  );
};

export default Collection;
