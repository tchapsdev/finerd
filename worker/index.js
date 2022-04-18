'use strict';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.skipWaiting();
});

self.addEventListener('push', event => {
    const data = JSON.parse(event.data.text());

    event.waitUntil(
        registration.showNotification(data.Title, {
            body: data.Message,
            icon: '/icons/icon-192x192.png'
        })
    );
});
