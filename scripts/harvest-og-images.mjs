/**
 * Fetches the og:image (or hero <img>) URL from each venue's public website
 * and emits a JSON map { slug -> imageUrl } for manual review.
 *
 * Run: node scripts/harvest-og-images.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const targets = [
  ['kakslauttanen', 'https://www.kakslauttanen.fi/wedding-honeymoon/'],
  ['arctic-snowhotel', 'https://arcticsnowhotel.fi/en/events/lapland-wedding/'],
  ['snow-village-lainio', 'https://www.laplandhotels.com/en/hotels-and-destinations/yllas-levi/snowvillage'],
  ['northern-lights-ranch', 'https://theranch.fi/about-us/private-events/'],
  ['levi-ice-castle', 'https://www.levi.fi/en/info/general/groups/weddings/'],
  ['levin-iglut', 'https://leviniglut.fi/'],
  ['apukka-resort', 'https://apukkaresort.fi/'],
  ['arctic-treehouse', 'https://arctictreehousehotel.com/'],
  ['wilderness-hotel-muotka', 'https://wildernesshotels.fi/wilderness-hotel-muotka'],
  ['wilderness-hotel-inari', 'https://wildernesshotels.fi/wilderness-hotel-inari'],
  ['wilderness-hotel-juutua', 'https://wildernesshotels.fi/wilderness-hotel-juutua'],
  ['northern-lights-village-saariselka', 'https://saariselka.northernlightsvillage.com/'],
  ['northern-lights-village-levi', 'https://levi.northernlightsvillage.com/'],
  ['hotelli-hullu-poro', 'https://www.hulluporo.fi/'],
  ['levi-panorama', 'https://www.laplandhotels.com/en/hotels-and-destinations/yllas-levi/levi-panorama'],
  ['lapland-hotels-saaga', 'https://www.laplandhotels.com/en/hotels-and-destinations/yllas/lapland-hotels-saaga'],
  ['tundrea-kilpisjarvi', 'https://tundrea.com/en'],
  ['hotel-aurora-pyha', 'https://www.laplandhotels.com/en/hotels-and-destinations/pyha-luosto/lapland-hotels-pyha'],
  ['lapland-hotels-pyha', 'https://www.laplandhotels.com/en/hotels-and-destinations/pyha-luosto/lapland-hotels-pyha'],
  ['santas-hotel-santamus', 'https://santashotels.fi/'],
  ['nova-skyland', 'https://novaskyland.com/'],
];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

function pickFromHtml(html, baseUrl) {
  const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
    || html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (ogMatch) return resolveUrl(ogMatch[1], baseUrl);

  const linkImg = html.match(/<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i);
  if (linkImg) return resolveUrl(linkImg[1], baseUrl);

  // Fallback: first <img src="..."> in body
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+\.(?:jpe?g|png|webp))(?:\?[^"']*)?["']/i);
  if (imgMatch) return resolveUrl(imgMatch[1], baseUrl);

  return null;
}

function resolveUrl(u, base) {
  try {
    return new URL(u, base).toString();
  } catch {
    return u;
  }
}

async function fetchOne(slug, url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      redirect: 'follow',
    });
    if (!res.ok) return { slug, url, image: null, error: `HTTP ${res.status}` };
    const html = await res.text();
    const image = pickFromHtml(html, url);
    return { slug, url, image, error: image ? null : 'no og:image' };
  } catch (err) {
    return { slug, url, image: null, error: err?.message || String(err) };
  }
}

const results = [];
for (const [slug, url] of targets) {
  const r = await fetchOne(slug, url);
  console.log(`${r.image ? '✓' : '✗'} ${slug}: ${r.image || r.error}`);
  results.push(r);
}

writeFileSync(resolve(__dirname, 'og-images.json'), JSON.stringify(results, null, 2));
console.log(`\nWrote ${results.length} entries to scripts/og-images.json`);
