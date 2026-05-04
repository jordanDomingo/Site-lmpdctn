import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 0',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '0.75rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
        className="animate-fadeInUp"
      >
        Aucun produit trouvé dans cette catégorie.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px',
        width: '100%',
      }}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
