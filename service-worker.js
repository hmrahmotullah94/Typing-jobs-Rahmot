
/* ==========================================
   Typing Jobs PWA Service Worker
   Version 11.7
========================================== */

const CACHE_NAME = "typingjobs-v11.7";

const APP_ROOT = self.registration.scope;

const OFFLINE_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./app.js",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
].map(path => new URL(path, APP_ROOT).href);


/* INSTALL */

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_FILES))
      .then(() => self.skipWaiting())
  );

});


/* ACTIVATE */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )

    ).then(() => self.clients.claim())

  );

});


/* FETCH */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {

    event.respondWith(

      fetch(event.request)

        .then(response => {

          if (response.ok) {

            const copy = response.clone();

            event.waitUntil(
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, copy))
            );

          }

          return response;

        })

        .catch(async () => {

          return await caches.match(event.request) ||
                 await caches.match(
                   new URL("./index.html", APP_ROOT).href
                 );

        })

    );

    return;
  }


  event.respondWith(

    caches.match(event.request).then(cached => {

      if (cached) return cached;

      return fetch(event.request).then(response => {

        if (response.ok) {

          const copy = response.clone();

          event.waitUntil(
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, copy))
          );

        }

        return response;

      });

    })

  );

});
