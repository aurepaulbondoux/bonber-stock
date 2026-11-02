// BonBër Stock v5 — Service Worker
// Cache strategy: Cache First para assets estáticos, Network First para API calls

const CACHE_NAME = 'bonber-v5-cache-v2';
const OFFLINE_URL = './index.html';

// Archivos a cachear en la instalación
// Rutas RELATIVAS: la app vive en https://usuario.github.io/repo/ (no en la raíz del dominio)
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Google Fonts — se cachean en runtime
];

// ── INSTALL: precachear app shell ─────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      // Activar inmediatamente sin esperar que cierren otras tabs
      return self.skipWaiting();
    })
  );
});

// ── ACTIVATE: limpiar caches viejos ──────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      // Tomar control de todas las tabs inmediatamente
      return self.clients.claim();
    })
  );
});

// ── FETCH: estrategia de cache ────────────────────────────────────────
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // API de Anthropic — siempre network, nunca cachear
  if (url.hostname === 'api.anthropic.com') {
    event.respondWith(fetch(event.request));
    return;
  }

  // Google Fonts CSS — Network First con fallback a cache
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Google Fonts archivos (woff2) — Cache First
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        });
      })
    );
    return;
  }

  // App shell y assets propios — Cache First, Network fallback
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) {
        // Revalidar en background (stale-while-revalidate)
        fetch(event.request)
          .then(function(response) {
            if (response && response.status === 200) {
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, response);
              });
            }
          })
          .catch(function() {}); // silenciar error offline
        return cached;
      }
      // No en cache — intentar network
      return fetch(event.request)
        .then(function(response) {
          if (!response || response.status !== 200) return response;
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function() {
          // Offline y no en cache — servir index.html para navegación
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});

// ── SYNC: mensaje de actualización de cache ───────────────────────────
self.addEventListener('message', function(event) {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
