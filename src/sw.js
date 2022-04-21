const fileToCaches = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/images/hero/hero-image-large.jpg',
  '/images/manifest-icons/icon-72x72.png',
  '/images/manifest-icons/icon-96x96.png',
  '/images/manifest-icons/icon-144x144.png',
  '/images/manifest-icons/icon-192x192.png',
  '/images/manifest-icons/icon-512x512.png',
  '/scripts/data-source.js',
  '/scripts/dom-manipulation.js',
  '/scripts/index.js',
  '/styles/style.css',
  'https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700&display=swap',
];

const cacheName = 'hunger-app-shell';

self.addEventListener('install', (event) => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(fileToCaches);
  };

  event.waitUntil(preCache());

  // for skip waiting service worker to update
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('SW: Activated');
});

// Cache-first see: https://web.dev/learn/pwa/serving/#cache-first
// self.addEventListener('fetch', (event) => {
//   const preResponse = async (e) => {
//     const cache = await caches.open(cacheName);
//     const cachedResponse = await cache.match(e.request);

//     if (cachedResponse) {
//       return cachedResponse;
//     }

//     return fetch(e.request);
//   };

//   event.respondWith(preResponse(event));
// });

// Network-first see: https://web.dev/learn/pwa/serving/#network-first
// self.addEventListener('fetch', (event) => {
//   const preResponse = async (e) => {
//     try {
//       return fetch(e.request);
//     } catch {
//       const cache = await caches.open(cacheName);
//       return cache.match(e.request);
//     }
//   };

//   event.respondWith(preResponse(event));
// });

// Stale while revalidate see: https://web.dev/learn/pwa/serving/#stale-while-revalidate
self.addEventListener('fetch', (event) => {
  const fetchAndCache = async (e) => {
    const response = await fetch(e.request);

    const cache = await caches.open(cacheName);
    await cache.put(e.request, response.clone());

    return response;
  };

  const fetchWithCache = async (e) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(e.request);

    // return cachedResponse if it exists
    if (cachedResponse) {
      fetchAndCache(e);
      return cachedResponse;
    }

    return fetchAndCache(e);
  }

  event.respondWith(fetchWithCache(event));
});
