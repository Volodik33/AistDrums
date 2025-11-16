self.addEventListener('install', e => {
  console.log('Service Worker установлен');
  e.waitUntil(caches.open('aistdrums-v1').then(cache => {
    return cache.addAll([
      '/',
      '/index.html',
      '/manifest.json',
      '/images/icons/icon-192.png',
      '/images/icons/icon-512.png'
    ]);
  }));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('Service Worker активирован');
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
