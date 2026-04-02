(function(){
    const cta = document.getElementById('ctaBtn');
    if (!cta) return;
    function triggerPulse(){ cta.classList.remove('pulse'); void cta.offsetWidth; cta.classList.add('pulse'); }
    cta.addEventListener('click', e => { e.preventDefault(); triggerPulse(); const href = cta.getAttribute('href')||'collection.html'; setTimeout(()=> window.location.href = href,260); });
})();

(function(){
    const rot = document.getElementById('rotating');
    if (!rot) return;
    const words = ['confort','style','qualité','liberté'];
    let i=0;
    setInterval(()=>{
        i = (i+1)%words.length;
        rot.style.opacity = '0';
        setTimeout(()=>{ rot.textContent = words[i]; rot.style.opacity = '1'; },160);
    },1600);
})();

function loadCart(){ try{ return JSON.parse(localStorage.getItem('lmpdctn_cart')||'{}'); }catch{ return {}; } }
function saveCart(c){ localStorage.setItem('lmpdctn_cart',JSON.stringify(c)); }
function updateCartCount(){ const cart = loadCart(); const count = Object.values(cart).reduce((s,i)=>s+i.qty,0); const badge = document.getElementById('cartCount'); if(badge) badge.textContent = count; }
function addToCart(p){ const cart = loadCart(); if(!cart[p.id]) cart[p.id] = {...p, qty:0}; cart[p.id].qty += 1; saveCart(cart); updateCartCount(); }

function renderProducts(products){
    const list = document.getElementById('productsList');
    if(!list) return;
    list.innerHTML = '';
    products.forEach((p, idx) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.style.animationDelay = (idx * 80) + 'ms';

        const img = document.createElement('img');
        img.src = p.thumb;
        img.alt = p.title;
        img.className = 'product-image';
        img.tabIndex = 0;
        img.addEventListener('click', ()=> openProductModal(p));
        img.addEventListener('keydown', e => { if(e.key === 'Enter') openProductModal(p); });

        const h3 = document.createElement('h3');
        h3.textContent = p.title;

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = p.price + ' €';

        const btn = document.createElement('button');
        btn.className = 'add-to-cart ripple';
        btn.textContent = 'Ajouter';
        btn.addEventListener('click', ()=> addToCart(p));

        card.append(img, h3, price, btn);
        list.appendChild(card);
    });
}

function openProductModal(product){
    const modal = document.getElementById('productModal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','false');

    const title = document.getElementById('prodTitle');
    const desc = document.getElementById('prodDescription');
    const price = document.getElementById('prodPrice');
    const gallery = document.getElementById('prodGallery');

    title.textContent = product.title;
    desc.textContent = product.description;
    price.textContent = product.price + ' €';
    gallery.innerHTML = '';

    const mainImg = document.createElement('img');
    mainImg.src = product.image;
    mainImg.alt = product.title;
    mainImg.style.width = '100%';
    mainImg.style.maxHeight = '420px';
    mainImg.style.objectFit = 'cover';
    gallery.appendChild(mainImg);

    const addBtn = document.getElementById('prodAdd');
    if(addBtn) addBtn.onclick = () => { addToCart(product); closeModal(modal); };

    modal.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', ()=> closeModal(modal)));
    document.getElementById("prodGallery").innerHTML = `
    <img src="${product.image}"
         style="width:100%; border-radius:12px; cursor:pointer;"
         onclick="openFullScreen('${product.image}')">
`;
}

function closeModal(modal){
    modal.setAttribute('aria-hidden','true');
}
