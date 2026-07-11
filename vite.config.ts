import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

import compression from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), compression({ algorithms: ['brotliCompress'], threshold: 1024 })],
  resolve: {
    // Prevent duplicate React when importing from ../../shared (which has its own node_modules).
    // Without this, shared/CookieBanner + shared/Footer resolve React via shared/node_modules,
    // loading a second React instance and breaking useContext (e.useContext where e is null).
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // "b2" cache-generation segment: 2026-07-11 a truncated LangContext chunk got
        // stuck in visitor browser caches under max-age=31536000,immutable → permanent
        // white page. A new URL path is the only way past an immutable-cached asset.
        entryFileNames: 'assets/[name]-b2-[hash].js',
        chunkFileNames: 'assets/[name]-b2-[hash].js',
        assetFileNames: 'assets/[name]-b2-[hash][extname]',
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
            if (/[\\/]node_modules[\\/]lucide-react/.test(id)) return 'ui-vendor'
          }
          return undefined
        },
      },
    },
  },
})
