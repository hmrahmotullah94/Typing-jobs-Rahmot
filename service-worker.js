const CACHE = "typingjobs-v2";

const FILES = [
"/Typing-jobs-Rahmot/",
"/Typing-jobs-Rahmot/index.html",
"/Typing-jobs-Rahmot/manifest.json",
"/Typing-jobs-Rahmot/app.js",
"/Typing-jobs-Rahmot/icon-192.png",
"/Typing-jobs-Rahmot/icon-512.png",
"/Typing-jobs-Rahmot/icon-512-maskable.png"
];


self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE)
        .then(cache => cache.addAll(FILES))
    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE){
                        return caches.delete(key);
                    }

                })

            );

        })

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});
