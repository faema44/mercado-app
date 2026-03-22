// Service Worker — Mercado PWA
// Versão do cache: atualize este número para forçar atualização
const CACHE_NAME = 'mercado-v5';

// Arquivos para cache offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap'
];

// Instalar: cachear os assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(() => {
        // Falha silenciosa se algum recurso externo não carregar (ex: sem internet)
        return cache.addAll(['./index.html', './manifest.json']);
      });
    })
  );
  self.skipWaiting();
});

// Ativar: limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first para o app, network-first para fontes externas
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Sempre da rede para requests não-GET
  if (event.request.method !== 'GET') return;

  // Cache-first para arquivos locais
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }

  // Network-first para recursos externos (fontes do Google, etc.)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
