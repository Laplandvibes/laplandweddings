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
        // Cache-generation segment. Bump it whenever visitors get stuck on a bad
        // asset: a new URL path is the only way past an immutable-cached one.
        //   b2  2026-07-11  truncated LangContext chunk cached under
        //                   max-age=31536000,immutable → permanent white page.
        //   b3  2026-07-28  same failure mode after a deploy: HTML cached under a
        //                   .js URL, so every dynamic import threw "Failed to fetch
        //                   dynamically imported module" and the page stayed blank
        //                   with no console error. Reproduced by Vesa in incognito,
        //                   while curl and the *.pages.dev preview served correct
        //                   bytes the whole time, so the origin looked healthy.
        //                   `immutable` was dropped from _headers in the same
        //                   change so a reload can heal it instead of the visitor
        //                   being stuck for a year.
        entryFileNames: 'assets/[name]-b3-[hash].js',
        chunkFileNames: 'assets/[name]-b3-[hash].js',
        assetFileNames: 'assets/[name]-b3-[hash][extname]',
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
