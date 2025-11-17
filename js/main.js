async function loadCatalog(){
  const res = await fetch('products.json');
  const products = await res.json();
  const catalog = document.getElementById('catalog');
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">${p.price} ₽</p>
      <p class="short">${p.description.substring(0,120)}...</p>
      <div class="actions">
        <a class="btn" href="product.html?id=${p.id}">Подробнее</a>
        <button class="btn add" onclick='addToCart("${p.id}")'>В корзину</button>
      </div>
    `;
    catalog.appendChild(card);
  });
}

let cart = [];

function addToCart(id){
  fetch('products.json').then(r=>r.json()).then(products=>{
    const p = products.find(x=>x.id===id);
    if(p){ cart.push(p); alert('Добавлено в корзину: ' + p.name); }
  });
}

loadCatalog();
