// Страница работает без интернета: модель — из кэша, остальное — сначала из сети, при неудаче из кэша
const C='sufler-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET'||!q.url.startsWith(self.location.origin))return;
 const big=q.url.includes('/vosk/');
 e.respondWith((async()=>{const c=await caches.open(C);
  if(big){const m=await c.match(q);if(m)return m;const r=await fetch(q);if(r.ok)c.put(q,r.clone());return r}
  try{const r=await fetch(q);if(r.ok)c.put(q,r.clone());return r}catch(x){const m=await c.match(q);if(m)return m;throw x}})())});
