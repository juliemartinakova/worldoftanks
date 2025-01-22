import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    manifest: {
      name: 'World of Tanks',
      short_name: 'World of Tanks',
      description: 'Play the famous game World of Tanks from Wargaming.net directly in your browser!',
      theme_color: '#111111',

      icons: [{
        src: 'assets/gui/game/pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      }, {
        src: 'assets/gui/game/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: 'assets/gui/game/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }, {
        src: 'assets/gui/game/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,wasm}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      maximumFileSizeToCacheInBytes: 30000000,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  server: {
    mimeTypes: {
      '.wasm': 'application/wasm',
    },
  },
})