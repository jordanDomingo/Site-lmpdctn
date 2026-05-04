import React, { useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="empty-state animate-fadeInUp">
        <h2 style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '2rem', color: '#fff', textTransform: 'uppercase', marginBottom: '20px' }}>
          Produit introuvable
        </h2>
        <button onClick={() => navigate('/collection')} className="btn-primary">
          Retour à la collection
        </button>
      </div>
    );
  }

  return (
    <div className="page-content-sm animate-fadeInUp">
      {/* Retour */}
      <Link
        to="/collection"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          fontSize: '0.65rem',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '40px',
          transition: 'color 160ms',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
      >
        <ArrowLeft size={14} /> Retour à la collection
      </Link>

      {/* Grille image / info — responsive */}
      <div className="product-detail-grid">
        {/* Image */}
        <div className="reveal-left visible" style={{ background: '#8FAABC', borderRadius: '2px', overflow: 'hidden' }}>
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-img"
          />
        </div>

        {/* Info */}
        <div className="reveal-right visible" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Tag catégorie */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '4px 12px',
              borderRadius: '2px',
              fontWeight: 700,
            }}>
              {product.category}
            </span>
          </div>

          {/* Titre */}
          <h1
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            {product.title}
          </h1>

          {/* Prix */}
          <p
            style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: '#8FAABC',
              margin: '0 0 28px',
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: '1px',
            }}
          >
            {product.price} FCFA
          </p>

          {/* Description */}
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.12)', paddingLeft: '20px', marginBottom: '36px' }}>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '0.85rem' }}>
              {product.description}
            </p>
          </div>

          {/* Ajouter au panier */}
          <button
            onClick={() => addToCart(product)}
            className="btn-primary"
            style={{ justifyContent: 'center', gap: '10px', padding: '14px 28px', fontSize: '0.7rem' }}
          >
            <ShoppingCart size={16} />
            Ajouter au panier
          </button>

          {/* Indicateurs */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['En stock', 'Livraison rapide'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', letterSpacing: '1px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                <span style={{ color: '#8FAABC' }}>✓</span> {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
