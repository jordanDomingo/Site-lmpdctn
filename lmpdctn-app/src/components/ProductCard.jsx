import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useFavorites();
  const cardRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [btnText, setBtnText] = useState('+ Ajouter');

  const activeFav = isFavorite(product.id);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    
    cardRef.current.style.setProperty('--mouseX', `${xPct}%`);
    cardRef.current.style.setProperty('--mouseY', `${yPct}%`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      setTimeout(() => {
        if (cardRef.current && !isHovered) {
          cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        }
      }, 0);
    }
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
    setIsHovered(true);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (isAdded) return;
    
    addToCart(product);
    
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ink = document.createElement('span');
    ink.className = 'ripple-ink';
    
    const size = Math.max(rect.width, rect.height);
    ink.style.width = ink.style.height = `${size}px`;
    
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ink.style.left = `${x}px`;
    ink.style.top = `${y}px`;
    
    btn.appendChild(ink);
    setTimeout(() => {
      ink.remove();
    }, 520);
    
    setIsAdded(true);
    setTimeout(() => {
      setBtnText('Ajouté ✓');
    }, 150);

    setTimeout(() => {
      setTimeout(() => {
        setBtnText('+ Ajouter');
        setIsAdded(false);
      }, 150);
    }, 2000);
  };

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleFavorite(product.id);
    
    if (!activeFav && !prefersReducedMotion) {
      const newParticles = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 25 + Math.random() * 20;
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance
        };
      });
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 600);
    }
  };

  const delay = index * 60;

  return (
    <div
      ref={cardRef}
      className={`animate-popIn ${!prefersReducedMotion ? 'product-card' : ''}`}
      style={{
        animationDelay: `${delay}ms`,
        background: '#8FAABC',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button 
        className={`favorite-btn ${activeFav ? 'active' : ''}`}
        onClick={handleHeartClick}
        aria-label="Ajouter aux favoris"
      >
        <Heart 
          size={14} 
          fill={activeFav ? "#e52e71" : "none"} 
          stroke={activeFav ? "#e52e71" : "currentColor"} 
        />
        {particles.map(p => (
           <div 
             key={p.id} 
             className="heart-particle"
             style={{ 
               '--tx': `${p.tx}px`, 
               '--ty': `${p.ty}px`,
               left: '14px',
               top: '14px'
             }} 
           />
        ))}
      </button>

      <Link to={`/product/${product.id}`} style={{ display: 'block', overflow: 'hidden' }}>
        <img
          src={product.thumb}
          alt={product.title}
          style={{
            width: '100%',
            height: '260px',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transition: 'transform 400ms ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </Link>

      <div style={{ padding: '14px 16px 16px', position: 'relative', zIndex: 10 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              margin: '0 0 4px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#1E2B35',
            }}
          >
            {product.title}
          </h3>
        </Link>

        <p
          style={{
            margin: '0 0 12px',
            fontSize: '0.62rem',
            color: 'rgba(30,43,53,0.55)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {product.price} FCFA
        </p>

        <button
          onClick={handleAddClick}
          className={`ripple ${isAdded ? 'btn-added' : ''}`}
          style={{
            background: 'transparent',
            border: '1px solid rgba(30,43,53,0.3)',
            borderRadius: '16px',
            padding: '5px 14px',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#1E2B35',
            cursor: 'pointer',
            transition: 'background 180ms ease, color 180ms ease',
            minWidth: '100px'
          }}
          onMouseEnter={e => {
            if (!isAdded) {
              e.currentTarget.style.background = '#1E2B35';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={e => {
            if (!isAdded) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1E2B35';
            }
          }}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
