// Basic empty service worker to avoid 404
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Real Estate Service Worker Activated');
});
