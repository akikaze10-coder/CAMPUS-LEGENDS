const ROOT=new URL('./',self.registration.scope).href;
const PREFIX='campus-legends:'+ROOT+':';
const CACHE=PREFIX+'0.49.0-pwa-cinematic-akari';
const HOME=new URL('index.html',ROOT).href;
const FILES=['index.html','manifest.webmanifest','akari-icon-192.png','akari-icon-512.png','akari-maskable-512.png','akari-apple-180.png'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(FILES.map(p=>new Request(p,{cache:'reload'})));})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);}await self.clients.claim();})()));
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||!req.url.startsWith(ROOT))return;
 if(req.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CACHE);try{const res=await fetch(req,{cache:'no-cache'});if(res.ok){try{await c.put(HOME,res.clone());}catch(_){}return res;}return (await c.match(HOME))||res;}catch(_){return (await c.match(HOME))||Response.error();}})());}
 else if(FILES.includes(req.url)){e.respondWith((async()=>{const c=await caches.open(CACHE);try{const res=await fetch(req,{cache:'no-cache'});if(res.ok)return res;return (await c.match(req))||res;}catch(_){return (await c.match(req))||Response.error();}})());}
});
