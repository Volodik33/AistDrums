self.addEventListener('install', e=>{
  e.waitUntil(caches.open('aistdrums-v1').then(cache=>cache.addAll([
    '/',
    '/index.html',
    '/product.html',
    '/products.json',
    '/css/styles.css',
    '/js/main.js',
    '/js/product.js'
  ])));
  self.skipWaiting();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
