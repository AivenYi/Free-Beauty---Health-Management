// 服务工作者脚本
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('ziyou-store').then((cache) => 
            cache.addAll(['/', '/styles.css', '/scripts.js']))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => 
            response || fetch(e.request))
    );
});