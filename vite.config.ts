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
        //   b4  2026-08-02  THIRD occurrence, same signature, this time on the
        //                   venue pages: `Failed to fetch dynamically imported
        //                   module: /assets/VenuePage-b3-9cmIYnTx.js`, #root
        //                   empty, no other console error. Everything server-side
        //                   checked out and was ruled out one at a time — the apex
        //                   and the *.pages.dev URL of the SAME deployment served
        //                   byte-identical HTML (12 254 b) and byte-identical JS
        //                   (24 620 b), `cf-cache-status: HIT` with
        //                   `Content-Type: application/javascript`, all 12 of the
        //                   chunk's imports fetched as valid JS, and the response
        //                   did not change when replayed with the module loader's
        //                   own `Sec-Fetch-Dest: script` + Origin + Referer.
        //                   pages.dev rendered; the apex did not, in TWO separate
        //                   browser profiles. Dropping `immutable` (b3) was not
        //                   enough to heal it: `fetch(url, {cache:'reload'})`
        //                   returned good JS and the very next dynamic import of
        //                   the same URL still failed.
        //   🔴 Lesson worth keeping: the poisoning happens when someone loads a
        //   route inside the ~20-40 s window in which a just-deployed chunk still
        //   answers with the SPA fallback. Verify a deploy on the deployment URL
        //   first and leave the apex alone until it has settled — checking early
        //   is what CREATES this.
        //   b5  2026-08-07  FOURTH occurrence, and this time the whole apex was
        //                   down, not just /venues/: every route rendered an empty
        //                   #root, including the home page. Console gave the one
        //                   honest signal — "Expected a JavaScript-or-Wasm module
        //                   script but the server responded with a MIME type of
        //                   text/html" — while curl returned 200 +
        //                   application/javascript for the same URL, including a
        //                   replay with Sec-Fetch-Dest: script + Origin + Referer.
        //                   Two independent browser engines agreed the page was
        //                   blank, so it was not a probe artefact.
        //   🔴 Why it kept coming back: dropping `immutable` (b3) only lets the
        //   BROWSER heal on reload. Cloudflare's own copy was never given an
        //   expiry, so the edge kept serving fallback HTML under the .js URL with
        //   no way to overwrite it (Pages has no purge). b5 abandons the poisoned
        //   URLs, and _headers now sets `s-maxage=600` so the next accident heals
        //   itself in ~10 minutes instead of persisting. Bumping the generation
        //   alone would only have reset the clock on the same trap.
        entryFileNames: 'assets/[name]-b5-[hash].js',
        chunkFileNames: 'assets/[name]-b5-[hash].js',
        assetFileNames: 'assets/[name]-b5-[hash][extname]',
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
