let cacheName = "worldoftanksonline-1.0"
let cacheAssets = [
    "offline.html",
    "offline/offline.css",
    "offline/offline.js",
    "manifest.json",
    "slides/1.webp",
    "slides/2.webp",
    "slides/3.webp",
    "slides/4.webp",
    "slides/5.webp",
    "slides/6.webp",
    "slides/7.webp",
    "slides/8.webp",
    "slides/9.webp",
    "slides/10.webp",
    "slides/11.webp",
    "slides/12.webp",
    "slides/13.webp",
    "slides/14.webp",
    "slides/15.webp",
    "slides/16.webp",
    "slides/17.webp",
    "slides/18.webp",
    "slides/19.webp",
    "slides/20.webp",
    "slides/21.webp",
    "slides/22.webp",
    "slides/23.webp",
    "slides/24.webp",
    "slides/25.webp",
    "slides/26.webp",
    "slides/27.webp",
    "slides/28.webp",
    "slides/29.webp",
    "slides/30.webp",
    "slides/31.webp",
    "slides/32.webp",
    "slides/33.webp",
    "slides/34.webp",
    "slides/35.webp",
    "slides/36.webp",
    "slides/37.webp",
    "slides/38.webp",
    "slides/39.webp",
    "slides/40.webp",
    "slides/41.webp",
    "slides/42.webp",
    "slides/43.webp",
    "appicons/favicon.ico",
    "fonts/Warhelios-Bold.ttf",
    "fonts/Warhelios-Regular.ttf",
    "icons/24x24/checkYellow.webp",
    "audio/hangar/click2.wav",
    "audio/hangar/click3.wav",
    "audio/hangar/hover2.wav",
    "audio/loading/loginscreen.wav",
    "logos/wargaming.webp",
    "cursors/wot_arrow.cur",
    "cursors/wot_link.cur",
    "icons/128x100/alert.webp",
    "icons/24x24/refresh.webp",
    "icons/24x24/settings.webp",
    "icons/24x24/close.webp",
]

self.addEventListener('install', e => {
    console.log('Service worker installed');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log(`Caching Service worker files: ${cache}`)
            cache.addAll(cacheAssets)
            .then(() => self.skipWaiting())
        })
    )
})

self.addEventListener('activate', e => {
    console.log('Service worker activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all( 
                cacheNames.map( 
                    cache => { 
                        if (cache !== cacheName) { 
                            console.log('Cleaning old service worker cache folder.'); 
                            return caches.delete(cache); 
                        } 
                    } 
                ) 
            )
        })
    )
});

self.addEventListener('fetch', e => {
    console.log('Fetching service worker', e)
    e.respondWith( 
        fetch(e.request) 
        .then(res => {
            const resClone = res.clone()
            caches.open(cacheName) 
                .then(cache => { 
                    cache.put(e.request, resClone);
                }); 
            return res;
        }).catch( 
            err => caches.match(e.request) 
            .then(res => res) 
        ) 
    );
})