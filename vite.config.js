import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // We register from main.jsx via `virtual:pwa-register`.
      injectRegister: false,
      workbox: {
        // The app shell is deliberately NOT precached. A precached
        // index.html kept being served after deploys, pointing at an old
        // bundle that had no idea about newly added routes - the page came
        // up blank until a hard refresh. Navigations go to the network
        // first and only fall back to the cached copy when offline.
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-shell',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 10,
              },
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          }
        ],
        // Precache patterns for the build output (no html - see above)
        globPatterns: [
          '**/*.{js,css,ico,png,jpg,jpeg,svg,gif,webp,pdf}'
        ],
        // Ignore very large files from precaching (they'll still be cached at runtime)
        globIgnores: [
          '**/AboutAA.jpg',
          '**/cardthirdteacherResearch.jpg', 
          '**/connect.jpg',
          '**/Logban.jpg'
        ],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'AINET Web Application',
        short_name: 'AINET',
        description: 'AINET Web Application with Image Caching',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
});
