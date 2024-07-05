import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'offline.html'),
      },
    },
  },
  plugins: [VitePWA({
    strategies: 'injectManifest',
    srcDir: 'service-worker',
    filename: 'sw.js',
    registerType: 'autoUpdate',

    injectRegister: 'auto',

    pwaAssets: {
      disabled: false,
      config: true,
    },

    includeAssets: ['appicons/favicon.ico', 'appicons/icon180_rounded.png', 'appicons/icon192_maskable.png'],

    manifest: {
      name: 'World of Tanks',
      short_name: 'World of Tanks',
      background_color:"#111111",
      orientation:"landscape",
      display_override: ["fullscreen"],
      start_url:"https://worldoftanksonline.netlify.app/",
      display:"minimal-ui",
      dir:"auto",
      description: 'Webová verze hry World of Tanks ve vývoji. World of Tanks je týmová tanková MMO hra od společnosti Wargaming. Hrajte na PC nebo na mobilu a staňte se tankovým mistrem s více než 600 vozidly z poloviny 20. století.',
      theme_color: '#111111',
      icons: [
        {
          purpose:"maskable",
          sizes:"512x512",
          src:"appicons/icon512_maskable.png",
          type:"image/png"
        },
        {
          purpose:"any",
          sizes:"512x512",
          src:"appicons/icon512_rounded.png",
          type:"image/png"
        },
        {
          purpose:"maskable",
          sizes:"192x192",
          src:"appicons/icon192_maskable.png",
          type:"image/png"
        },
        {
          purpose:"any",
          sizes:"192x192",
          src:"appicons/icon192_rounded.png",
          type:"image/png"
        },
        {
          purpose:"maskable",
          sizes:"64x64",
          src:"appicons/icon64_maskable.png",
          type:"image/png"
        },
        {
          purpose:"any",
          sizes:"64x64",
          src:"appicons/icon64_rounded.png",
          type:"image/png"
        }
      ],
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,webp,mp4,wav,cur,json,mp3,ttf,mtl,glb,obj,dds}'],
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})