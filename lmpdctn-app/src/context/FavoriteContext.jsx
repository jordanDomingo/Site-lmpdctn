import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoriteContext = createContext();

const VALID_PRODUCT_IDS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('lmpdctn_favorites');
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      
      return parsed
        .filter(id => typeof id === 'string' && VALID_PRODUCT_IDS.includes(id))
        .map(String);
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lmpdctn_favorites', JSON.stringify(favorites));
    } catch (e) {
    }
  }, [favorites]);

  const toggleFavorite = (productId) => {
    if (!VALID_PRODUCT_IDS.includes(productId)) return;
    
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const favoriteCount = favorites.length;

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoriteCount }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
