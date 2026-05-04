import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '48px 60px',
        boxSizing: 'border-box',
        position: 'relative',
        background: 'rgba(21,31,40,0.8)',
      }}
    >
      <div className="footer-inner">
        {/* Marque */}
        <div>
          <div
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: '1.6rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: '10px',
            }}
          >
            LMPDCTN
          </div>
          <p
            style={{
              fontSize: '0.62rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              margin: 0,
              maxWidth: '240px',
              lineHeight: 1.7,
            }}
          >
            Votre style, votre confiance — confort, qualité, liberté.
          </p>
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'rgba(255,255,255,0.2)',
              lineHeight: 1.2,
            }}
          >
            BUILT FOR COLD
            <br />
            MADE FOR HEIGHT
            <br />
            FORGED TO LAST
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="footer-bottom">
        <p
          style={{
            fontSize: '0.58rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} LMPDCTN. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
