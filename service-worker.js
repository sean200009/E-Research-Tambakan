const CACHE_NAME = 'studies-repo-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/admin.html',
    '/manifest.json',
    '/papers.json',
    '/script.js',
    '/style.css.txt'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
