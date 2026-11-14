/* Makes Streetball Showdown installable and keeps its files cached for faster starts.
   Network first, so a new version always arrives when online; the cache is the offline fallback. */
const C = 'streetball-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(C).then((k) => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
