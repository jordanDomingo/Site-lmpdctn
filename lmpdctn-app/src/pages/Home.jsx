import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeatureBadges from '../components/FeatureBadges';
import AboutModal from '../components/AboutModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const badgesRef = useScrollReveal(0.2);

  return (
    <div style={{ width: '100%' }}>
      <Hero />

      {/* Section badges */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        className="page-content"
      >
        <div ref={badgesRef} className="reveal">
          <FeatureBadges />
        </div>

        <div style={{ marginTop: '32px' }}>
          <button
            onClick={() => setIsAboutOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.65rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
              transition: 'color 160ms',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            En savoir plus sur LMPDCTN
          </button>
        </div>
      </div>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default Home;
