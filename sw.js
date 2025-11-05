const CACHE_NAME = 'fixa-v1';
const urlsToCache = ['./', './index.html', './manifest.json', './icon-192x192.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
