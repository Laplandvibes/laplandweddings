import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://laplandweddings.online';
const today = new Date().toISOString().slice(0, 10);

const locations = ['rovaniemi','saariselka','levi','yllas','pyha-luosto','kilpisjarvi'];
const types = ['northern-lights','snow-chapel','glass-igloo','midnight-sun','elopement','vow-renewal'];
const venues = [
  'kakslauttanen','arctic-snowhotel','snow-village-lainio','northern-lights-ranch','levi-ice-castle',
  'levin-iglut','apukka-resort','arctic-treehouse','wilderness-hotel-muotka','wilderness-hotel-inari',
  'wilderness-hotel-juutua','northern-lights-village-saariselka','northern-lights-village-levi',
  'hotelli-hullu-poro','levi-panorama','lapland-hotels-saaga','tundrea-kilpisjarvi','hotel-aurora-pyha',
  'lapland-hotels-pyha','santas-hotel-santamus','nova-skyland',
];

const urls = [
  '/', '/locations', '/wedding-types', '/venues', '/planners',
  '/practical-guide', '/pricing', '/contact',
  '/privacy', '/terms', '/cookie-policy',
  ...locations.map(s => `/locations/${s}`),
  ...types.map(s => `/wedding-types/${s}`),
  ...venues.map(s => `/venues/${s}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${SITE}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : (u.includes('/venues/') || u.includes('/locations/') || u.includes('/wedding-types/')) ? '0.8' : '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="fi" href="${SITE}${u}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${u}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${u}" />
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(resolve(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log(`Wrote sitemap with ${urls.length} URLs`);
