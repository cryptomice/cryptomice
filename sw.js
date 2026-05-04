const CACHE_NAME = "cryptomice-v2"; // 🔥 change version to force update

const urlsToCache = [
  "/cryptomice/",
  "/cryptomice/index.html",
  "/cryptomice/login.html",
  "/cryptomice/signup.html",
  "/cryptomice/dashboard.html",
  "/cryptomice/payment.html",
  "/cryptomice/guide.html"
];

// 🔧 INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 force new version immediately

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 🔧 ACTIVATE (DELETE OLD CACHE)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔥 delete old cache
          }
        })
      );
    })
  );

  self.clients.claim(); // 🔥 take control immediately
});

// 🔧 FETCH (NETWORK FIRST — VERY IMPORTANT)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response; // always use fresh version
      })
      .catch(() => {
        return caches.match(event.request); // fallback if offline
      })
  );
});
