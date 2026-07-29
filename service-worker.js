const CACHE = "typingjobs-v1";

const FILES = [

"./",

"./index.html",

"./manifest.json",

"./app.js"

];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE).then(cache => {

return cache.addAll(FILES);

})

);

self.skipWaiting();

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(keys =>

Promise.all(

keys.map(key => {

if (key !== CACHE)

return caches.delete(key);

})

)

)

);

self.clients.claim();

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request)

.then(network => {

return network;

})

.catch(() => {

return caches.match("./index.html");

});

})

);

});
