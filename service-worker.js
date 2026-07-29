/* ==========================================
   Typing Jobs PWA Service Worker
   Version 11
   Made by Rahmotullah
========================================== */

const CACHE_NAME = "typingjobs-v11";

const OFFLINE_FILES = [

  "/Typing-jobs-Rahmot/",
  "/Typing-jobs-Rahmot/index.html",
  "/Typing-jobs-Rahmot/manifest.json",
  "/Typing-jobs-Rahmot/app.js",

  "/Typing-jobs-Rahmot/icon-192.png",
  "/Typing-jobs-Rahmot/icon-512.png",
  "/Typing-jobs-Rahmot/icon-512-maskable.png"

];


/* ==========================
   INSTALL
========================== */

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(OFFLINE_FILES))

    );

});


/* ==========================
   ACTIVATE
========================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


/* ==========================
   FETCH
========================== */

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET") return;

    /* HTML সবসময় Network First */
    if(event.request.mode === "navigate"){

        event.respondWith(

            fetch(event.request)

            .then(response => {

                const copy = response.clone();

                caches.open(CACHE_NAME)

                .then(cache => {

                    cache.put(event.request, copy);

                });

                return response;

            })

            .catch(() => {

                return caches.match(event.request)

                .then(r => r || caches.match("/Typing-jobs-Rahmot/index.html"));

            })

        );

        return;

    }


    /* CSS / JS / Images */

    event.respondWith(

        caches.match(event.request)

        .then(cacheResponse => {

            return cacheResponse ||

            fetch(event.request)

            .then(networkResponse => {

                if(networkResponse.status === 200){

                    const copy = networkResponse.clone();

                    caches.open(CACHE_NAME)

                    .then(cache => {

                        cache.put(event.request, copy);

                    });

                }

                return networkResponse;

            });

        })

    );

});
