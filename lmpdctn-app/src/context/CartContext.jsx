import React, { createContext, useState, useEffect } from 'react';
import { products } from '../data/products';

export const CartContext = createContext();

const isValidCartItem = (item) => {
  return (
    item &&
    typeof item.id === 'string' &&
    products.some(p => p.id === item.id) &&
    typeof item.title === 'string' &&
    item.title.length > 0 &&
    typeof item.price === 'number' &&
    item.price > 0 &&
    typeof item.qty === 'number' &&
    Number.isInteger(item.qty) &&
    item.qty > 0 &&
    item.qty <= 99 &&
    typeof item.thumb === 'string'
  );
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lmpdctn_cart');
      if (!saved) return {};
      
      const parsed = JSON.parse(saved);
      if (typeof parsed !== 'object' || parsed === null) return {};
      
      const sanitized = {};
      Object.keys(parsed).forEach(id => {
        const item = parsed[id];
        if (isValidCartItem(item)) {
          sanitized[id] = {
            id: item.id,
            title: item.title,
            price: item.price,
            qty: item.qty,
            thumb: item.thumb
          };
        }
      });
      return sanitized;
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lmpdctn_cart', JSON.stringify(cart));
    } catch (e) {
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const current = prev[product.id] || { ...product, qty: 0 };
      return {
        ...prev,
        [product.id]: { ...current, qty: current.qty + 1 }
      };
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      const current = prev[productId];
      if (!current) return prev;
      
      const newQty = current.qty + delta;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prev,
        [productId]: { ...current, qty: newQty }
      };
    });
  };

  const clearCart = () => setCart({});

  const cartItemsCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartItemsCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
