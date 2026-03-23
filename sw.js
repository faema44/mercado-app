// Service Worker minimalista — sem cache agressivo
// Apenas registra para permitir instalação como PWA

const CACHE_NAME = 'mercado-v100';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Apaga TODOS os caches antigos
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Sempre busca da rede — sem cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Só usa cache como fallback se estiver offline
      return caches.match(event.request);
    })
  );
});
