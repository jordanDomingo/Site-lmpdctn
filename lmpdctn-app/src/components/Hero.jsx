import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const bgRef = useRef(null);

  /* Parallaxe subtile au scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.25}px) scale(1.08)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hero-wrapper">
      {/* Image de fond avec parallaxe */}
      <div
        ref={bgRef}
        className="hero-bg-zoom"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/lmpdctn.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.28,
          zIndex: 0,
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      />
      {/* Dégradé sombre en bas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(30,43,53,0.85) 80%, #1E2B35 100%)',
          zIndex: 1,
        }}
      />

      {/* Contenu — stagger animé */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
        <div
          className="animate-fadeInUp"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '20px',
            fontWeight: 600,
            animationDelay: '0ms',
          }}
        >
          ACCUEIL / BOUTIQUE
        </div>

        <h1
          className="animate-fadeInUp"
          style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
            lineHeight: 0.92,
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: '0 0 28px',
            letterSpacing: '1px',
            animationDelay: '100ms',
          }}
        >
          Collection
          <br />
          LMPDCTN
        </h1>

        <p
          className="animate-fadeInUp"
          style={{
            fontSize: '0.8rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '36px',
            fontWeight: 500,
            animationDelay: '200ms',
          }}
        >
          Le plug qui te met bien — collections urbaines, qualité fiable à prix accessibles.
          <br />
          Votre style, votre confiance.
        </p>

        <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <Link to="/collection" className="btn-primary">
            ↗ Découvrir la collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
