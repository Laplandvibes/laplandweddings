import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://laplandweddings.online';
const today = new Date().toISOString().slice(0, 10);

const locations = ['rovaniemi', 'saariselka', 'levi', 'yllas', 'pyha-luosto', 'kilpisjarvi'];
const types = ['northern-lights', 'snow-chapel', 'glass-igloo', 'midnight-sun', 'elopement', 'vow-renewal'];
const venues = [
  'kakslauttanen', 'arctic-snowhotel', 'snow-village-lainio', 'northern-lights-ranch', 'levi-ice-castle',
  'levin-iglut', 'apukka-resort', 'arctic-treehouse', 'wilderness-hotel-muotka', 'wilderness-hotel-inari',
  'wilderness-hotel-juutua', 'northern-lights-village-saariselka', 'northern-lights-village-levi',
  'hotelli-hullu-poro', 'levi-panorama', 'lapland-hotels-saaga', 'tundrea-kilpisjarvi', 'hotel-aurora-pyha',
  'lapland-hotels-pyha', 'santas-hotel-santamus', 'nova-skyland',
];

const enPaths = [
  '/', '/locations', '/wedding-types', '/venues', '/photographers',
  '/practical-guide', '/pricing',
  '/checklist/dvv-foreign-couples',
  '/privacy', '/terms', '/cookie-policy',
  ...locations.map((s) => `/locations/${s}`),
  ...types.map((s) => `/wedding-types/${s}`),
  ...venues.map((s) => `/venues/${s}`),
];

const LOCALES = [
  { prefix: '',    hreflang: 'en' },
  { prefix: '/fi', hreflang: 'fi' },
  { prefix: '/de', hreflang: 'de' },
  { prefix: '/ja', hreflang: 'ja' },
  { prefix: '/es', hreflang: 'es' },
  { prefix: '/br', hreflang: 'pt-BR' },
  { prefix: '/cn', hreflang: 'zh-CN' },
  { prefix: '/kr', hreflang: 'ko' },
  { prefix: '/fr', hreflang: 'fr' },
  { prefix: '/it', hreflang: 'it' },
  { prefix: '/nl', hreflang: 'nl' },
];

const priorityFor = (p) => {
  if (p === '/') return '1.0';
  if (p.startsWith('/venues/') || p.startsWith('/locations/') || p.startsWith('/wedding-types/')) return '0.8';
  if (p === '/privacy' || p === '/terms' || p === '/cookie-policy') return '0.3';
  return '0.7';
};

const hrefFor = (prefix, p) => {
  // Every URL uses the trailing-slash form — Cloudflare Pages serves
  // /path/index.html at /path/ with 200; the no-slash form 308-redirects,
  // which Google reports as a redirect error in sitemaps.
  if (p === '/') return SITE + (prefix === '' ? '' : prefix) + '/';
  return (SITE + prefix + p).replace(/\/?$/, '/');
};

const url = (p) => {
  const enHref = hrefFor('', p);
  const alts = LOCALES.map((L) =>
    `    <xhtml:link rel="alternate" hreflang="${L.hreflang}" href="${hrefFor(L.prefix, p)}" />`
  ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}" />`;

  return LOCALES.map((L) => {
    const href = hrefFor(L.prefix, p);
    return `  <url>
    <loc>${href}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorityFor(p)}</priority>
${alts}
  </url>`;
  }).join('\n');
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${enPaths.map(url).join('\n')}
</urlset>
`;

writeFileSync(resolve(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log(`Wrote sitemap with ${enPaths.length * LOCALES.length} URLs (${enPaths.length} routes × ${LOCALES.length} locales)`);
