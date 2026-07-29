/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  Serwist,
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
  ExpirationPlugin,
} from "serwist";

declare global {
  interface ServiceWorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const OFFLINE_URL = "/offline.html";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  runtimeCaching: [
    // 1. Pages — NetworkFirst, fallback to offline.html
    {
      matcher: ({ request }: { request: Request }) => request.mode === "navigate",
      handler: new NetworkFirst({
        cacheName: "dwsa-pages",
        networkTimeoutSeconds: 10,
        plugins: [
          new ExpirationPlugin({ maxEntries: 40, maxAgeSeconds: 7 * 24 * 60 * 60 }),
          {
            handlerDidError: async () => {
              const cache = await caches.open("dwsa-offline");
              return (await cache.match(OFFLINE_URL)) ?? Response.error();
            },
          },
        ],
      }),
    },

    // 2. API routes — NetworkFirst, 24-hr cache
    {
      matcher: ({ url }: { url: URL }) => url.pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: "dwsa-api",
        networkTimeoutSeconds: 8,
        plugins: [
          new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 }),
        ],
      }),
    },

    // 3. Google Fonts — CacheFirst, 1 year
    {
      matcher: ({ url }: { url: URL }) =>
        url.origin === "https://fonts.googleapis.com" ||
        url.origin === "https://fonts.gstatic.com",
      handler: new CacheFirst({
        cacheName: "dwsa-fonts",
        plugins: [
          new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 }),
        ],
      }),
    },

    // 4. Next.js static assets — CacheFirst, 1 year
    {
      matcher: ({ url }: { url: URL }) => url.pathname.startsWith("/_next/static/"),
      handler: new CacheFirst({
        cacheName: "dwsa-static",
        plugins: [
          new ExpirationPlugin({ maxEntries: 256, maxAgeSeconds: 365 * 24 * 60 * 60 }),
        ],
      }),
    },

    // 5. Images — StaleWhileRevalidate, 30 days
    {
      matcher: ({ request }: { request: Request }) => request.destination === "image",
      handler: new StaleWhileRevalidate({
        cacheName: "dwsa-images",
        plugins: [
          new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }),
        ],
      }),
    },

    // Serwist defaults for everything else
    ...defaultCache,
  ],
});

serwist.addEventListeners();

// Pre-cache the branded offline page during SW install
self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open("dwsa-offline").then((cache) => cache.add(OFFLINE_URL))
  );
});
