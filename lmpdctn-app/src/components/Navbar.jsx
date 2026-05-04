import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useFavorites } from '../context/FavoriteContext';

const Navbar = () => {
  const { cartItemsCount } = useContext(CartContext);
  const { favoriteCount } = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-white'
      : 'text-white/50 hover:text-white';

  const navLinks = [
    { to: '/',           label: 'Accueil'     },
    { to: '/collection', label: 'Catalogue'   },
    { to: '/favoris',    label: 'Mes Favoris' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(30,43,53,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">

          <Link
            to="/"
            style={{
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: '1.4rem',
              letterSpacing: '3px',
              color: '#fff',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            LMPDCTN
          </Link>

          <div className="hidden sm:flex gap-10 items-center">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                className={`${isActive(to)} relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 hover:after:scale-x-100 after:transition-transform after:duration-300`}
              >
                {label}
                {to === '/favoris' && favoriteCount > 0 && (
                   <span style={{ 
                     background: '#e52e71', 
                     color: '#fff', 
                     fontSize: '0.55rem', 
                     padding: '1px 5px', 
                     borderRadius: '10px',
                     marginLeft: '2px'
                   }}>
                     {favoriteCount}
                   </span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#8FAABC',
                    color: '#1E2B35',
                    fontSize: '0.6rem',
                    fontWeight: 900,
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              className="sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(30,43,53,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '16px 24px 24px',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '10px 0',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: location.pathname === to ? '#fff' : 'rgba(255,255,255,0.5)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
