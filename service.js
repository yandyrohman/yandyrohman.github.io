const staticCache = 'static-cache';
const assets = [
    '/',
    '/index.html',
    '/css/',
    '/js/',
    '/css/index.css',
    '/js/app.js',
    '/manifest.json'
];

// install service worker
self.addEventListener('install', event => {
    // console.log('service worker has installed!');
    event.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets);
        })
    );
});

// activate service worker
self.addEventListener('activate', event => {
    console.log('service worker has activated!');
});

// fetch 
self.addEventListener('fetch', event => {
    // console.log('fetch : ', event);
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request);
        })
    );
});