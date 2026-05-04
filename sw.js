const CACHE_NAME = "cryptomice-v3"; // updated version

const urlsToCache = [
  "/cryptomice/",
  "/cryptomice/index.html",
  "/cryptomice/login.html",
  "/cryptomice/signup.html",
  "/cryptomice/dashboard.html",
  "/cryptomice/payment.html",
  "/cryptomice/guide.html",
  "/cryptomice/manifest.json"
];

// 🔧 INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); // activate new version immediately

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 🔧 ACTIVATE (REMOVE OLD CACHE)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim(); // take control immediately
});

// 🔧 FETCH (SMART NETWORK-FIRST WITH CACHE FALLBACK)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // clone and store fresh response in cache
        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      })
      .catch(() => {
        // fallback to cache if offline
        return caches.match(event.request);
      })
  );
});
