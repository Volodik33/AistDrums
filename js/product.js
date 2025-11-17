async function loadProduct(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const res = await fetch('products.json');
  const products = await res.json();
  const p = products.find(x=>x.id===id);
  if(!p){ document.body.innerHTML = '<h1>Товар не найден</h1>'; return; }
  document.getElementById('product-name').textContent = p.name;
  document.getElementById('product-name-2').textContent = p.name;
  document.getElementById('product-description').textContent = p.description;
  document.getElementById('product-price').textContent = p.price + ' ₽';

  const gallery = document.getElementById('gallery');
  p.images.forEach(src=>{
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });

  const specs = document.getElementById('product-specs');
  for(const k in p.specs){
    const li = document.createElement('li');
    li.textContent = k + ': ' + p.specs[k];
    specs.appendChild(li);
  }

  document.getElementById('buy-btn').addEventListener('click', ()=>{
    fetch('products.json').then(r=>r.json()).then(products=>{
      const prod = products.find(x=>x.id===id);
      alert('Добавлено в корзину: ' + prod.name);
    });
  });
}

loadProduct();
