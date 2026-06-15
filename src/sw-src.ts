/// <reference lib="webworker" />
import { handleApiRequest } from './api/handler';

// Type assertion for service worker self context
const swSelf = (self as unknown) as ServiceWorkerGlobalScope;

swSelf.addEventListener('install', () => {
  // Force the waiting service worker to become the active service worker
  swSelf.skipWaiting();
});

swSelf.addEventListener('activate', (event) => {
  // Claim any clients immediately so they are controlled by the Service Worker without page reload
  event.waitUntil(swSelf.clients.claim());
});

swSelf.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept only requests starting with /api
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      (async () => {
        try {
          // Parse query params
          const queryParams: Record<string, string> = {};
          url.searchParams.forEach((value, key) => {
            queryParams[key] = value;
          });

          // Call the centralized handler
          const { status, body } = handleApiRequest(url.pathname, queryParams);

          // Add a minor simulated network delay to show the Response Time Badge activity
          const simulatedLatency = Math.floor(20 + Math.random() * 80); // 20ms - 100ms
          await new Promise(resolve => setTimeout(resolve, simulatedLatency));

          return new Response(JSON.stringify(body), {
            status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: 'Failed to process API request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })()
    );
  }
});
