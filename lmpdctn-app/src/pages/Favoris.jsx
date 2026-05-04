import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useFavorites } from '../context/FavoriteContext';

const Favoris = () => {
  const { isFavorite } = useFavorites();
  const favoriteProducts = products.filter(p => isFavorite(p.id));

  return (
    <div style={{ width: '100%', minHeight: '80vh' }}>

      {/* Header */}
      <div className="page-header animate-fadeInUp">
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
          MES FAVORIS ({favoriteProducts.length})
        </h1>
      </div>

      {/* Contenu */}
      <div className="page-content">
        {favoriteProducts.length > 0 ? (
          <ProductGrid products={favoriteProducts} />
        ) : (
          <div className="empty-state animate-fadeInUp" style={{ minHeight: 'auto', padding: '80px 0' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '28px',
              }}
            >
              <Heart size={28} style={{ color: 'rgba(255,255,255,0.25)' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px', fontSize: '0.85rem', maxWidth: '360px', lineHeight: 1.6 }}>
              Vous n'avez pas encore d'articles en favoris. Parcourez le catalogue pour en ajouter !
            </p>
            <Link to="/collection" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Voir le catalogue <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoris;
