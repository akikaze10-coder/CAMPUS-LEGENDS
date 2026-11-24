const ROOT=new URL('./',self.registration.scope).href;
const PREFIX='campus-legends:'+ROOT+':';
const CACHE=PREFIX+'0.51.0-battle-card';
const MEDIA=PREFIX+'immutable-media-v1';
const HOME=new URL('index.html',ROOT).href;
const CORE=["index.html", "manifest.webmanifest", "akari-icon-192.png", "akari-icon-512.png", "akari-maskable-512.png", "akari-apple-180.png", "art-01/i000-6379bca7d7e2.webp", "art-01/i001-06d50c9caaaf.webp"].map(p=>new URL(p,ROOT).href);
const isMedia=url=>/^(art-\d+\/i\d+-[a-f0-9]{12}\.(webp|svg)|sfx\/[a-z0-9-]+-[a-f0-9]{12}\.pcm)$/.test(url.slice(ROOT.length));
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE.map(p=>new Request(p,{cache:'reload'})));})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith(PREFIX)&&key!==CACHE&&key!==MEDIA)await caches.delete(key)}await self.clients.claim()})()));
async function media(req){const c=await caches.open(MEDIA);const hit=await c.match(req);if(hit)return hit;const core=await caches.open(CACHE);const pinned=await core.match(req);if(pinned)return pinned;const res=await fetch(req);if(res.ok&&res.status===200){try{await c.put(req,res.clone())}catch(_){}}return res}
self.addEventListener('message',e=>{if(e.data?.type==='CL_ACTIVATE'){e.waitUntil(self.skipWaiting());return}if(e.data?.type==='CL_PREPARE'){const port=e.ports[0];const list=[...new Set((e.data.paths||[]).filter(p=>typeof p==='string'&&isMedia(new URL(p,ROOT).href)))];e.waitUntil((async()=>{let pos=0,count=0,failed=0;async function run(){while(pos<list.length){const path=list[pos++];try{const r=await media(new Request(new URL(path,ROOT)));if(!r.ok)throw Error('asset')}catch(_){failed++}count++;if(count%5===0)port?.postMessage({count,total:list.length,failed})}}await Promise.all([run(),run(),run(),run()]);port?.postMessage({done:true,count,total:list.length,failed})})())}});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||!req.url.startsWith(ROOT))return;
 if(req.mode==='navigate'&&[ROOT,HOME].includes(req.url.split(/[?#]/)[0])){e.respondWith((async()=>{const c=await caches.open(CACHE);return (await c.match(HOME))||fetch(req)})());return}
 if(isMedia(req.url)){e.respondWith((async()=>{try{const res=await media(req);if(res.ok||req.destination!=='image')return res}catch(_){if(req.destination!=='image')return Response.error()}return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="320" viewBox="0 0 240 320"><rect width="240" height="320" fill="#1c304a"/><path d="M50 88h140v145H50z" fill="none" stroke="#7892ad" stroke-width="2"/><text x="120" y="161" fill="#d0dcec" font-size="15" text-anchor="middle">OFFLINE</text></svg>',{headers:{'Content-Type':'image/svg+xml','Cache-Control':'no-store'}})})());return}
 if(CORE.includes(req.url)){e.respondWith((async()=>{const c=await caches.open(CACHE);return (await c.match(req))||fetch(req)})());}
});
