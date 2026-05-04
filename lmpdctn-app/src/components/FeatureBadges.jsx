import React from 'react';

const FeatureBadges = () => {
  const badges = [
    'Livraison rapide',
    'Retours faciles',
    'Nouveautés hebdo',
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {badges.map((badge, i) => (
        <span
          key={i}
          className="glass-badge"
        >
          {badge}
        </span>
      ))}
    </div>
  );
};

export default FeatureBadges;
