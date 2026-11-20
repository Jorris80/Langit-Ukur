/* LangitUkur service worker — mode offline. Versi cache berubah otomatis tiap build. */
const V = 'lu-1.2.1-e39b1e5a', SHELL = ['./', './index.html', './manifest.json', './icon.png'];
const RUNTIME = 'lu-rt', TILES = 'lu-tiles', MAX_TILES = 1500;
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('lu-') && ![V, RUNTIME, TILES].includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
async function trim(name, max) { const c = await caches.open(name), k = await c.keys(); for (let i = 0; i < k.length - max; i++) await c.delete(k[i]); }
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;                                   // API (POST) selalu ke jaringan
  if (u.hostname.endsWith('script.google.com') || u.hostname.endsWith('googleusercontent.com')) return;
  if (r.mode === 'navigate') { e.respondWith(fetch(r).then(res => { caches.open(V).then(c => c.put('./index.html', res.clone())); return res; }).catch(() => caches.match('./index.html'))); return; }
  const tile = /tile\.openstreetmap\.org|arcgisonline\.com/.test(u.hostname);
  if (tile) { e.respondWith(caches.open(TILES).then(c => c.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok || res.type === 'opaque') { c.put(r, res.clone()); trim(TILES, MAX_TILES); } return res; })))); return; }
  if (/unpkg\.com|fonts\.(googleapis|gstatic)\.com/.test(u.hostname) || u.origin === location.origin) {
    e.respondWith(caches.match(r).then(hit => { const net = fetch(r).then(res => { if (res.ok || res.type === 'opaque') caches.open(u.origin === location.origin ? V : RUNTIME).then(c => c.put(r, res.clone())); return res; }).catch(() => hit); return hit || net; }));
  }
});
