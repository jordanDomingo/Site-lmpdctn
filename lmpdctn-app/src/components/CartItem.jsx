import React, { useContext } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'rgba(46,63,79,0.4)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '2px',
        padding: '16px',
      }}
      className="animate-popIn"
    >
      {/* Image */}
      <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
        <img
          src={item.thumb}
          alt={item.title}
          style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '2px', background: '#8FAABC' }}
        />
      </Link>

      {/* Info */}
      <div style={{ flexGrow: 1 }}>
        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff' }}>
            {item.title}
          </h3>
        </Link>
        <p style={{ margin: 0, fontSize: '0.65rem', color: '#8FAABC', fontWeight: 700, letterSpacing: '0.5px' }}>
          {item.price} FCFA
        </p>
      </div>

      {/* Qty controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', padding: '4px 10px' }}>
        <button
          onClick={() => updateQuantity(item.id, -1)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
        >
          <Minus size={12} />
        </button>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', minWidth: '16px', textAlign: 'center' }}>
          {item.qty}
        </span>
        <button
          onClick={() => updateQuantity(item.id, 1)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Total */}
      <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#fff', minWidth: '80px', textAlign: 'right' }}>
        {item.price * item.qty} FCFA
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        title="Supprimer"
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 160ms' }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,80,80,0.7)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
};

export default CartItem;
