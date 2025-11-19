/* Small JS interactions: CTA pulse and accessible keyboard activation */
(function(){
	const cta = document.getElementById('ctaBtn');
	if (!cta) return;

	function triggerPulse() {
		cta.classList.remove('pulse');
		// restart animation
		void cta.offsetWidth;
		cta.classList.add('pulse');
	}

	cta.addEventListener('click', (e) => {
		const href = cta.getAttribute('href') || 'collection.html';
		e.preventDefault();
		triggerPulse();
		incrementAnalytics('cta_click');
		// give pulse a moment before navigating
		setTimeout(() => { window.location.href = href; }, 260);
	});

	// keyboard: Enter or Space
	cta.addEventListener('keydown', (e) => {
		if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
			e.preventDefault();
			triggerPulse();
		}
	});
})();

// rotating words for subtitle
(function(){
	const rot = document.getElementById('rotating');
	if (!rot) return;
	const words = ['confort','style','qualité','liberté'];
	let i = 0;
	setInterval(() => {
	    i = (i + 1) % words.length;
	    // fade out/in faster
	    rot.style.transition = 'opacity 180ms ease';
	    rot.style.opacity = '0';
	    setTimeout(() => {
	        rot.textContent = words[i];
	        rot.style.opacity = '1';
	    }, 160);
	}, 1600);
})();

/* Modal helper functions */
function openModal(modal) {
	modal.setAttribute('aria-hidden','false');
	const dialog = modal.querySelector('.modal-dialog');
	const close = modal.querySelector('.modal-close');
	const firstFocusable = close || modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	// remember previously focused
	modal.__previouslyFocused = document.activeElement;
	if (firstFocusable) firstFocusable.focus();

	function onKey(e) {
		if (e.key === 'Escape') { closeModal(modal); }
	}

	function onClickOutside(e) {
		if (!dialog.contains(e.target)) closeModal(modal);
	}

	modal.__onKey = onKey;
	modal.__onClickOutside = onClickOutside;
	document.addEventListener('keydown', onKey);
	modal.addEventListener('click', onClickOutside);

	// trap focus inside modal
	trapFocus(modal);
}

function closeModal(modal) {
	modal.setAttribute('aria-hidden','true');
	if (modal.__onKey) document.removeEventListener('keydown', modal.__onKey);
	if (modal.__onClickOutside) modal.removeEventListener('click', modal.__onClickOutside);
	// release focus trap and restore focus
	releaseTrap(modal);
	try { if (modal.__previouslyFocused) modal.__previouslyFocused.focus(); } catch (e) {}
}

// wire modal buttons (close handlers)
document.addEventListener('DOMContentLoaded', () => {
	const modal = document.getElementById('aboutModal');
	if (!modal) return;
	const closeBtns = modal.querySelectorAll('.modal-close, .modal-cta');
	closeBtns.forEach(b => b.addEventListener('click', () => closeModal(modal)));
});

/* Focus trap helpers for accessibility */
function trapFocus(container) {
	if (!container) return;
	const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
	const nodes = Array.from(container.querySelectorAll(focusableSelector)).filter(n => n.offsetParent !== null || n === document.activeElement);
	if (!nodes.length) return;
	const first = nodes[0];
	const last = nodes[nodes.length - 1];

	function handleTab(e) {
		if (e.key !== 'Tab') return;
		if (e.shiftKey) {
			if (document.activeElement === first) { e.preventDefault(); last.focus(); }
		} else {
			if (document.activeElement === last) { e.preventDefault(); first.focus(); }
		}
	}

	container.__focusTrapHandler = handleTab;
	document.addEventListener('keydown', handleTab);
}

function releaseTrap(container) {
	if (!container || !container.__focusTrapHandler) return;
	document.removeEventListener('keydown', container.__focusTrapHandler);
	delete container.__focusTrapHandler;
}

/* -------------------------
   Product list, mini-cart
   ------------------------- */

// Lightweight analytics counter stored in localStorage
function incrementAnalytics(key) {
	try {
		const raw = localStorage.getItem('lmpdctn_analytics');
		const obj = raw ? JSON.parse(raw) : {};
		obj[key] = (obj[key] || 0) + 1;
		localStorage.setItem('lmpdctn_analytics', JSON.stringify(obj));
		console.log('Analytics:', key, obj[key]);
	} catch (e) { console.warn('Analytics failed', e); }
}

// Cart helpers
function loadCart() {
	try { return JSON.parse(localStorage.getItem('lmpdctn_cart') || '{}'); } catch(e){ return {}; }
}
function saveCart(cart) { localStorage.setItem('lmpdctn_cart', JSON.stringify(cart)); }

function updateCartCount() {
	const cart = loadCart();
	const count = Object.values(cart).reduce((s, it) => s + it.qty, 0);
	const badge = document.getElementById('cartCount'); if (badge) badge.textContent = String(count);
}

// Render cart into drawer
function renderCart() {
	const cart = loadCart();
	const cont = document.getElementById('cartContents');
	if (!cont) return;
	const keys = Object.keys(cart);
	if (!keys.length) { cont.innerHTML = 'Votre panier est vide.'; return; }
	cont.innerHTML = '';
	keys.forEach(id => {
		const it = cart[id];
		const row = document.createElement('div'); row.className = 'cart-row';
		const img = document.createElement('img'); img.src = it.thumb || it.image; img.alt = it.title;
		const info = document.createElement('div'); info.className = 'cart-info';
		info.innerHTML = `<div style="font-weight:700">${it.title}</div><div style="opacity:0.9">${it.qty} × ${it.price}€</div>`;
		const rem = document.createElement('button'); rem.textContent = '−'; rem.setAttribute('aria-label','Retirer'); rem.style.marginLeft='8px';
		rem.addEventListener('click', ()=>{ removeFromCart(id); renderCart(); updateCartCount(); });
		row.appendChild(img); row.appendChild(info); row.appendChild(rem);
		cont.appendChild(row);
	});
}

function addToCart(product) {
	const cart = loadCart();
	if (!cart[product.id]) cart[product.id] = { ...product, qty: 0 };
	cart[product.id].qty += 1;
	saveCart(cart);
	renderCart();
	updateCartCount();
	incrementAnalytics('add_to_cart');
}

function removeFromCart(id) {
	const cart = loadCart();
	if (!cart[id]) return;
	cart[id].qty -= 1;
	if (cart[id].qty <= 0) delete cart[id];
	saveCart(cart);
}

// Fetch and render products
async function fetchAndRenderProducts() {
	try {
		const resp = await fetch('data/products.json');
		const products = await resp.json();
		renderProducts(products);
	} catch (e) { console.warn('Could not load products', e); }
}

function renderProducts(products) {
	const list = document.getElementById('productsList'); if (!list) return;
	list.innerHTML = '';
	products.forEach((p, idx) => {
	    const card = document.createElement('article'); card.className = 'product-card';
	    const img = document.createElement('img'); img.className='product-image'; img.src = p.thumb; img.alt = p.alt || p.title; img.loading = 'lazy'; img.tabIndex = 0;
	    img.addEventListener('click', ()=> openProductModal(p));
	    img.addEventListener('keydown', (e)=>{ if (e.key==='Enter') openProductModal(p); });

	    const h3 = document.createElement('h3'); h3.textContent = p.title;
	    const price = document.createElement('div'); price.className='price'; price.textContent = p.price + ' €';
	    const btn = document.createElement('button'); btn.className='add-to-cart ripple'; btn.textContent = 'Ajouter';
	    btn.addEventListener('click', (e)=>{ createRipple(e); addToCart(p); });

	    card.appendChild(img); card.appendChild(h3); card.appendChild(price); card.appendChild(btn);
	    // staggered pop-in
	    card.style.animationDelay = (idx * 80) + 'ms';
	    list.appendChild(card);
	});
}

// Cart drawer toggle
document.addEventListener('DOMContentLoaded', ()=>{
	updateCartCount(); renderCart(); fetchAndRenderProducts();
	const cartToggle = document.getElementById('cartToggle');
	const cartDrawer = document.getElementById('cartDrawer');
	const closeCart = document.getElementById('closeCart');
	if (cartToggle && cartDrawer) {
		cartToggle.addEventListener('click', ()=>{ 
			const opening = !cartDrawer.classList.contains('open');
			cartDrawer.classList.toggle('open'); 
			cartDrawer.setAttribute('aria-hidden', cartDrawer.classList.contains('open') ? 'false' : 'true'); 
			if (opening) { trapFocus(cartDrawer); } else { releaseTrap(cartDrawer); }
		});
	}
	if (closeCart && cartDrawer) closeCart.addEventListener('click', ()=>{ cartDrawer.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); });

	// checkout stub
	const checkout = document.getElementById('checkoutBtn'); if (checkout) checkout.addEventListener('click', ()=>{ alert('Procéder au paiement — fonctionnalité démo.'); });
});

// Product modal open/close
function openProductModal(product) {
	const modal = document.getElementById('productModal'); if (!modal) return;
	modal.setAttribute('aria-hidden','false');
	const title = document.getElementById('prodTitle'); const desc = document.getElementById('prodDescription'); const price = document.getElementById('prodPrice'); const gallery = document.getElementById('prodGallery');
	title.textContent = product.title; desc.textContent = product.description; price.textContent = product.price + ' €';
	gallery.innerHTML = '';
	// main + thumb
	const main = document.createElement('img'); main.src = product.image; main.alt = product.alt || product.title; main.style.width = '100%'; main.style.maxHeight='420px'; main.style.objectFit='cover'; main.className='rPicture';
	main.addEventListener('click', ()=> toggleFullscreen(main));
	gallery.appendChild(main);
	// small thumbs
	if (product.thumb) { const t = document.createElement('img'); t.src = product.thumb; t.alt = product.alt || product.title; t.addEventListener('click', ()=>{ main.src = product.thumb; }); gallery.appendChild(t); }

	// wire add button
	const addBtn = document.getElementById('prodAdd'); if (addBtn) {
		addBtn.onclick = () => { addToCart(product); closeModal(modal); };
	}

	const closeBtns = modal.querySelectorAll('.modal-close'); closeBtns.forEach(b => b.addEventListener('click', ()=> closeModal(modal)));
}

// Fullscreen toggle
function toggleFullscreen(el) {
	try {
	function toggleFullscreen(el) {
	    try {
	        if (!document.fullscreenElement) {
			el.requestFullscreen?.(); el.classList.add('is-fullscreen');
		} else {
			document.exitFullscreen?.(); el.classList.remove('is-fullscreen');
		}
	} catch(e){ console.warn('Fullscreen not supported', e); }
}

// Simple ripple effect creator
function createRipple(e) {
	function createRipple(e) {
	    const btn = e.currentTarget;
	    const ink = document.createElement('span'); ink.className = 'ripple-ink';
	    const rect = btn.getBoundingClientRect();
	    const size = Math.max(rect.width, rect.height) * 1.4;
	    ink.style.width = ink.style.height = size + 'px';
	    ink.style.left = (e.clientX - rect.left - size/2) + 'px';
	    ink.style.top = (e.clientY - rect.top - size/2) + 'px';
	    btn.appendChild(ink);
	    setTimeout(()=> ink.remove(), 640);
	}

	// gentle parallax on desktop for background image
	document.addEventListener('mousemove', (e) => {
	    try {
	        const w = window.innerWidth, h = window.innerHeight;
	        const x = (e.clientX / w - 0.5) * 6; // scale movement
	        const y = (e.clientY / h - 0.5) * 4;
	        document.body.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
	    } catch (err) {}
	});

	// deviceorientation / gyroscope parallax for mobile (request permission where required)
	function enableDeviceParallax() {
		if (!('DeviceOrientationEvent' in window)) return;
		function handler(e) {
			// gamma: left/right, beta: front/back
			const g = e.gamma || 0; const b = e.beta || 0;
			// scale and clamp
			const x = Math.max(-20, Math.min(20, g)) / 3; 
			const y = Math.max(-20, Math.min(20, b - 30)) / 4; 
			document.body.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
		}

		// On iOS 13+ permission API
		if (typeof DeviceOrientationEvent.requestPermission === 'function') {
			DeviceOrientationEvent.requestPermission().then(permissionState => {
				if (permissionState === 'granted') window.addEventListener('deviceorientation', handler);
			}).catch(() => {});
		} else {
			window.addEventListener('deviceorientation', handler);
		}

		// also add simple touchmove fallback for devices without orientation
		window.addEventListener('touchmove', (ev) => {
			try {
				const t = ev.touches[0]; if (!t) return;
				const w = window.innerWidth, h = window.innerHeight;
				const nx = (t.clientX / w - 0.5) * 8; const ny = (t.clientY / h - 0.5) * 6;
				document.body.style.backgroundPosition = `calc(50% + ${nx}px) calc(50% + ${ny}px)`;
			} catch(err){}
		}, { passive: true });
	}

	// activate device parallax on load (non-intrusive)
	document.addEventListener('DOMContentLoaded', ()=>{ enableDeviceParallax(); });
}


