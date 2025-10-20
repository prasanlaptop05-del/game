// A simple, no-frills service worker for caching the app shell.

const CACHE_NAME = 'gemini-rps-cache-v1';
// This list of files will be cached upon installation.
const urlsToCache = [
  '/',
  '/index.html',
  // Note: The main JS/TSX files are bundled, so caching index.tsx is a good proxy.
  // In a real build system, you'd cache the actual bundled output file.
  '/index.tsx', 
  '/types.ts',
  '/constants.tsx',
  '/services/geminiService.ts',
  '/components/ChoiceButton.tsx',
  '/components/Scoreboard.tsx',
  '/components/ResultDisplay.tsx',
  '/App.tsx',
  // You can also cache external resources like the React CDN scripts
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/client',
  'https://aistudiocdn.com/@google/genai@^1.25.0'
];

// Install event: opens a cache and adds the app shell files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves cached content when offline.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});

// Activate event: removes old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});