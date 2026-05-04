import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, cartTotal, cartItemsCount, clearCart } = useContext(CartContext);
  const cartItems = Object.values(cart);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formatWhatsAppMessage = () => {
    let message = `🛒 Nouvelle commande LMPDCTN\n\n`;
    message += `👤 Client : ${customer.name}\n`;
    message += `📞 Contact : ${customer.phone}\n`;
    message += `📍 Adresse : ${customer.address}\n\n`;
    message += `📦 Articles :\n`;
    cartItems.forEach(item => {
      message += `- ${item.title} x${item.qty} — ${item.price * item.qty} FCFA\n`;
    });
    message += `\n💰 Total : ${cartTotal} FCFA`;
    return encodeURIComponent(message);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setError('');
    
    // Save order to localStorage for admin dashboard sync
    const newOrder = {
      id: `CMD-${Math.floor(Math.random() * 10000)}`,
      customer: customer.name,
      contact: customer.phone,
      address: customer.address,
      items: cartItems.map(item => `${item.qty}x ${item.title}`).join(', '),
      total: cartTotal,
      time: 'À l\'instant',
      status: 'pending'
    };
    
    try {
      const storedOrders = JSON.parse(localStorage.getItem('lmpdctn_orders') || '[]');
      localStorage.setItem('lmpdctn_orders', JSON.stringify([newOrder, ...storedOrders]));
      // Déclenche l'événement pour la mise à jour en direct côté admin
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }

    setSuccess(true);

    setTimeout(() => {
      const phoneNumber = "22961781792";
      window.open(`https://wa.me/${phoneNumber}?text=${formatWhatsAppMessage()}`, '_blank');
      clearCart();
      setIsCheckingOut(false);
      setSuccess(false);
      setCustomer({ name: '', phone: '', address: '' });
    }, 2000);
  };

  if (cartItems.length === 0 && !success) {
    return (
      <div className="empty-state animate-fadeInUp">
        <div style={{ width: '72px', height: '72px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
          <ShoppingBag size={28} style={{ color: 'rgba(255,255,255,0.25)' }} />
        </div>
        <h2 style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", fontSize: '2rem', textTransform: 'uppercase', color: '#fff', margin: '0 0 16px' }}>
          Votre panier est vide
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px', fontSize: '0.85rem', maxWidth: '360px', lineHeight: 1.6 }}>
          Découvrez notre nouvelle collection urbaine et trouvez les pièces qui correspondent à votre style.
        </p>
        <Link to="/collection" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          Voir la collection <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="page-content-sm animate-fadeInUp">
      <h1
        style={{
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          textTransform: 'uppercase',
          color: '#fff',
          margin: '0 0 40px',
        }}
      >
        Mon Panier ({cartItemsCount})
      </h1>

      <div className="cart-grid">
        {/* Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          {!success && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
              <button
                onClick={clearCart}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', fontSize: '0.65rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 160ms' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,80,80,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
              >
                Vider le panier
              </button>
            </div>
          )}
        </div>

        {/* Résumé / Checkout */}
        <div
          style={{
            background: 'rgba(46,63,79,0.5)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '2px',
            padding: '28px',
            height: 'fit-content',
          }}
        >
          {success ? (
            <div className="text-center py-6 animate-fadeInUp">
              <div style={{ width: '48px', height: '48px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <MessageCircle color="#fff" size={24} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: "'Impact', sans-serif", marginBottom: '12px', textTransform: 'uppercase' }}>Commande préparée !</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                Redirection vers WhatsApp en cours...
              </p>
            </div>
          ) : isCheckingOut ? (
            <form onSubmit={handleConfirmOrder} className="animate-fadeInUp">
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, margin: '0 0 20px' }}>
                Détails de livraison
              </h2>

              {error && (
                <div style={{ padding: '10px', background: 'rgba(229,46,113,0.1)', border: '1px solid rgba(229,46,113,0.2)', color: '#e52e71', fontSize: '0.7rem', marginBottom: '16px', borderRadius: '2px', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Nom complet *</label>
                  <input type="text" value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', borderRadius: '2px', outline: 'none' }} placeholder="Ex: Jean Dupont" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Numéro WhatsApp *</label>
                  <input type="tel" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', borderRadius: '2px', outline: 'none' }} placeholder="+229..." required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Adresse de livraison *</label>
                  <textarea value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} style={{ width: '100%', padding: '10px 12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', borderRadius: '2px', outline: 'none', resize: 'none', minHeight: '60px' }} placeholder="Quartier, rue, repères..." required />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '14px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                  transition: 'background 160ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#128C7E'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                <MessageCircle size={16} />
                Confirmer & Envoyer
              </button>
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '10px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', borderRadius: '2px' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                Retour au panier
              </button>
            </form>
          ) : (
            <>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 700, margin: '0 0 20px' }}>
                Résumé
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Sous-total</span><span>{cartTotal} FCFA</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
                  <span>Livraison</span><span>Via WhatsApp</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 900, color: '#fff' }}>
                  <span>Total</span>
                  <span style={{ color: '#8FAABC' }}>{cartTotal} FCFA</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                style={{
                  width: '100%',
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '14px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                  transition: 'background 160ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e5e5e5'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                Passer à la caisse
              </button>

              <p style={{ fontSize: '0.58rem', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6 }}>
                Paiement à la livraison ou via les services de transfert d'argent mobile.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
