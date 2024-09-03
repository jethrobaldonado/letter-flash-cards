import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'abc.webp'], // Add other assets if needed
      manifest: {
        name: 'My React PWA',
        short_name: 'ReactPWA',
        description: 'My Progressive Web App using Vite and React',
        theme_color: '#ffffff',
        icons: [
          {
            "src": "abc.webp",
            "sizes": "100x100",
            "type": "image/webp"
          },
          {
            "src": "vite.svg",
            "sizes": "100x100",
            "type": "image/svg+xml"
          }
        ],
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
      }
    }),
  ],
})
