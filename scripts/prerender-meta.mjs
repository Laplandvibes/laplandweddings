/**
 * Build-time meta prerender for the Vite SPA.
 *
 * For each route, copies dist/index.html to dist/<route>/index.html and
 * patches the <head> with route-specific title, description, canonical,
 * Open Graph and Twitter tags. Body still loads via JS (the SPA shell),
 * but every URL now serves a unique, crawler-friendly HTML head.
 *
 * This solves:
 *  - Per-URL meta visible to all crawlers (Bing, Yandex, social cards)
 *  - Cloudflare Pages serves correct file per URL — no SPA fallback needed for these routes
 *  - Soft-404 prevention for known routes
 *
 * Body content prerendering (full SSG) is a separate, larger task —
 * see RESEARCH-MARKET.md or migrate to vite-react-ssg.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const SITE = 'https://laplandweddings.online';

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.error('dist/index.html not found — run vite build first');
  process.exit(1);
}

const SHELL = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

// Load data files (TS source) by inline JSON shadow — keep this script in sync
// when slugs change. Generator is intentionally explicit, not generated from TS.

const baseDefaults = {
  '/': {
    title: 'Lapland Weddings — everything in one place | LaplandWeddings',
    description: 'The most complete Lapland wedding planning site. 20+ venues, 7 planners, DVV paperwork, real prices. Get 3 personalised quotes with one form.',
    image: 'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg',
  },
  '/locations': {
    title: 'Lapland Wedding Regions — Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings',
    description: 'Six Lapland wedding regions — Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi. Compare seasons, flights, and venues.',
    image: 'https://www.visitrovaniemi.fi/wp-content/uploads/b3d5b020-7fb8-11ee-9fca-6fdb01d69922.jpeg',
  },
  '/wedding-types': {
    title: 'Lapland Wedding Types — Northern Lights, Snow Chapel, Glass Igloo | LaplandWeddings',
    description: 'Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.',
    image: 'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg',
  },
  '/venues': {
    title: 'Lapland Wedding Venues — 20+ verified venues | LaplandWeddings',
    description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 20+ verified Lapland wedding venues across the regions.',
    image: 'https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg',
  },
  '/planners': {
    title: 'Lapland Wedding Planners — get 3 quotes with one form | LaplandWeddings',
    description: 'The 7 most established Lapland wedding planners. Send one form — we deliver 3 personalised quotes. Free and no commitment.',
    image: 'https://mariahedengren.com/wp-content/uploads/2018/04/51-best-wedding-photographer-Lapland.jpg',
  },
  '/practical-guide': {
    title: 'Getting Married in Lapland — DVV paperwork, officiant, practical guide | LaplandWeddings',
    description: 'Practical guide for foreign couples: DVV paperwork, examination of impediments (3–5 weeks), witnesses, officiant, home-country registration.',
    image: 'https://r.profitroom.pl/wildernesshotelinari/images/202412171316320.Inari_drone4_2_.jpg',
  },
  '/pricing': {
    title: 'Lapland Weddings — Pricing and Packages | LaplandWeddings',
    description: 'How much do Lapland weddings cost? Elopement from €1 600, premium weddings up to €40 000. Verified market prices.',
    image: 'https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg',
  },
  '/contact': {
    title: 'Contact — get 3 quotes | LaplandWeddings',
    description: 'Tell us briefly about your dream. We pass your enquiry to 3 Lapland wedding planners. Response in 1–7 days, free and with no commitment.',
    image: 'https://theranch.fi/wp-content/uploads/2025/02/wedding-oraganizer-bg-theranch.jpg',
  },
  '/privacy': {
    title: 'Privacy | LaplandWeddings',
    description: 'Privacy policy for laplandweddings.online — how we handle enquiry data and analytics.',
    image: 'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg',
  },
  '/terms': {
    title: 'Terms of Use | LaplandWeddings',
    description: 'Terms of use for laplandweddings.online.',
    image: 'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | LaplandWeddings',
    description: 'Cookie policy for laplandweddings.online.',
    image: 'https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg',
  },
};

const locations = [
  { slug: 'rovaniemi', name: 'Rovaniemi', desc: 'The capital of Lapland — easiest to reach via international flights. Wedding venues from ice chapel to glass igloos near Santa Claus Village.', img: 'https://arctictreehousehotel.com/wp-content/uploads/2025/05/Arctic-treehouse-hotel-summer-august-1600x960.jpg' },
  { slug: 'saariselka', name: 'Saariselkä & Inari', desc: 'The heart of Northern Lapland — highest aurora probability and Kakslauttanen’s glass teepee chapel.', img: 'https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg' },
  { slug: 'levi', name: 'Levi & Kittilä', desc: 'Finland’s largest fell resort — Lainio Snow Village, Northern Lights Ranch Snow Chapel, direct flights from London.', img: 'https://theranch.fi/wp-content/uploads/2025/02/hero-private-event-theranch.webp' },
  { slug: 'yllas', name: 'Ylläs', desc: 'Quieter than Levi — Lapland’s cleanest air, Saaga’s wedding-friendly spa hotel, easy reach to Lainio Snow Village.', img: 'https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg' },
  { slug: 'pyha-luosto', name: 'Pyhä-Luosto', desc: 'Lapland’s best-kept secret — UNESCO Starlight Reserve at Hotel Aurora and the amethyst mine ceremony at Lapland Hotels Pyhä.', img: 'https://visitpyha.fi/wp-content/uploads/2025/09/IMG20240120111651-scaled.jpg' },
  { slug: 'kilpisjarvi', name: 'Kilpisjärvi', desc: 'Finland’s northernmost and highest point — Tundrea’s glass igloos and the three-country border ceremony.', img: 'https://tundrea.com/wp-content/uploads/2021/09/IMG_6429-HDR-2-scaled-e1660643559657.jpg' },
];

const types = [
  { slug: 'northern-lights', name: 'Northern Lights Wedding', desc: 'Exchange vows under the aurora borealis — 200 nights per year of Northern Lights in Northern Lapland.', img: 'https://mariahedengren.com/wp-content/uploads/2024/11/YK02-Aurora-Village-Ivalo.jpg' },
  { slug: 'snow-chapel', name: 'Snow Chapel Wedding', desc: 'Marry in a chapel carved from pure snow and ice — Lainio, Northern Lights Ranch, Arctic SnowHotel and Levi Ice Castle.', img: 'https://theranch.fi/wp-content/uploads/2025/02/wedding-gallery-1-theranch.jpg' },
  { slug: 'glass-igloo', name: 'Glass Igloo Wedding', desc: 'Wedding night beneath the Northern Lights in a heated glass dome — Kakslauttanen, Levin Iglut, Apukka.', img: 'https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg' },
  { slug: 'midnight-sun', name: 'Midnight Sun Wedding', desc: 'Marry when the sun never sets — May 23 to July 24, warm weather, no snow gear needed.', img: 'https://mariahedengren.com/wp-content/uploads/2023/09/HG00-Lapland-wedding-photographer.jpg' },
  { slug: 'elopement', name: 'Lapland Elopement', desc: 'Just the two of you, the officiant and a photographer — turnkey packages from €1 600.', img: 'https://mariahedengren.com/wp-content/uploads/2018/04/63-Lapland-winter-elopement.jpg' },
  { slug: 'vow-renewal', name: 'Vow Renewal in Lapland', desc: 'Renew your vows in the Lapland snow — no paperwork, fully bespoke ceremony.', img: 'https://mariahedengren.com/wp-content/uploads/2018/04/51-best-wedding-photographer-Lapland.jpg' },
];

const venues = [
  { slug: 'kakslauttanen', name: 'Kakslauttanen Arctic Resort', region: 'Saariselkä', desc: 'Finland’s most famous glass igloo resort. Glass Teepee chapel, ice chapel, log chapel, and 250-guest Celebration House.', img: 'https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg' },
  { slug: 'arctic-snowhotel', name: 'Arctic SnowHotel & Glass Igloos', region: 'Lehtojärvi · 35 km from Rovaniemi', desc: 'Snow Hotel with ice chapel for 30 guests, ice restaurant, and glass igloos with 360° aurora view.', img: 'https://arcticsnowhotel.fi/wp-content/uploads/2024/11/Winter-wedding-in-Lapland-Ice-chapel-Rovaniemi-Lapland-Arctic-Snowhotel-Glass-igloos-1600x960.jpg' },
  { slug: 'snow-village-lainio', name: 'Lapland Hotels SnowVillage (Lainio)', region: 'Lainio, Kittilä', desc: 'World-famous Snow Village rebuilt every winter with new artistic theme. Ice chapel, wooden chapel, snow suites.', img: 'https://yllas.fi/wp-content/uploads/2023/04/yllas-majoitus-lapland-hotels-snow-village-srgb-16x9-1-scaled.jpg' },
  { slug: 'northern-lights-ranch', name: 'Northern Lights Ranch', region: 'Köngäs · 15 min from Levi', desc: 'Premium luxury resort with glass-walled cabins and a Snow Chapel for 60 guests.', img: 'https://theranch.fi/wp-content/uploads/2025/02/hero-private-event-theranch.webp' },
  { slug: 'levi-ice-castle', name: 'Levi Ice Castle', region: 'Levi · 7 km from centre', desc: 'Levi’s own ice castle with chapel, bar and ice suites — walls and seats from crystal-clear ice.', img: 'https://images.ctfassets.net/sqofpczsslzu/6aAG9Ak9atTwFpPHKOc3ZR/d13f8677f3a06400155701305b9ad2a5/Kumputunturi_pinkki_taivas_Web__1_.jpg?w=1600&fl=progressive&q=80&fm=jpg' },
  { slug: 'levin-iglut', name: 'Levin Iglut · Golden Crown', region: 'Levi · on top of the fell', desc: 'Glass igloos on top of the Levi fell — Lapland’s best aurora viewing angle, Suite igloos for couples.', img: 'https://leviniglut.fi/wp-content/uploads/levin_iglut_og_main.jpg' },
  { slug: 'apukka-resort', name: 'Apukka Resort', region: 'Apukka · 15 min from Santa Claus Village', desc: 'Resort by Lake Apukka with Aurora Cabins, two-storey Kammi igloo, Aitta and Kota restaurants.', img: 'https://www.visitrovaniemi.fi/wp-content/uploads/b3d5b020-7fb8-11ee-9fca-6fdb01d69922.jpeg' },
  { slug: 'arctic-treehouse', name: 'Arctic TreeHouse Hotel', region: 'SantaPark · 2 km from airport', desc: 'Modern tree-top cabins with glass walls — best logistics in Lapland, 2 km from Rovaniemi airport.', img: 'https://arctictreehousehotel.com/wp-content/uploads/2025/05/Arctic-treehouse-hotel-summer-august-1600x960.jpg' },
  { slug: 'wilderness-hotel-muotka', name: 'Wilderness Hotel Muotka', region: 'Muotka · edge of UKK National Park', desc: 'Zero light pollution — one of Lapland’s best aurora locations. Aurora Cabins and Kammi cabin.', img: 'https://r.profitroom.pl/wildernesshotelmuotoka1/images/202104281553440.Muotka_birdview.jpg' },
  { slug: 'wilderness-hotel-inari', name: 'Wilderness Hotel Inari', region: 'On the shore of Lake Inari', desc: 'On Lake Inari shore in the heart of Sámi culture. Aurora cabins with direct lake horizon view.', img: 'https://r.profitroom.pl/wildernesshotelinari/images/202412171316320.Inari_drone4_2_.jpg' },
  { slug: 'wilderness-hotel-juutua', name: 'Wilderness Hotel Juutua', region: 'Inari · in the centre', desc: 'Newest Wilderness Hotels venue (2022). Aanaar Restaurant in central Inari, walking distance to lake.', img: 'https://r.profitroom.pl/wildernesshoteljuutua/images/202412171318090.wilderness_hotel_juutua_winter_cropped.jpg' },
  { slug: 'northern-lights-village-saariselka', name: 'Northern Lights Village Saariselkä', region: 'Central Saariselkä', desc: '80 Aurora Cabins and 20 Polar Sky Suites with glass roofs in central Saariselkä.', img: 'https://r.profitroom.pl/northernlightsvillagesaariselka/images/202008261835140.02.27_Robert_3_of_8_.jpg' },
  { slug: 'northern-lights-village-levi', name: 'Northern Lights Village Levi', region: 'Sirkka, Levi', desc: 'NLV style near Levi services — Aurora Cabins, 5 min to Levi centre.', img: 'https://r.profitroom.pl/northernlightsvillagelevi1/images/38efa85b-6077-43f8-9036-08fd50b61868.jpg' },
  { slug: 'hotelli-hullu-poro', name: 'Hotelli Hullu Poro', region: 'Central Levi', desc: 'Levi’s central hotel and restaurant complex with 200-guest banquet hall and 4 restaurants.', img: 'https://www.hulluporo.fi/wp-content/uploads/2014/10/haakuvaus-areena-1024x683.jpg' },
  { slug: 'levi-panorama', name: 'Hotel Levi Panorama', region: 'On Levi fell summit', desc: 'Lapland Hotels flagship on Levi fell summit. Panorama windows, gondola access.', img: 'https://images.ctfassets.net/sqofpczsslzu/30JSNJpSh3YKSVRlcSY5n1/6c5b5617bcf5e5d611ae77b9ab1678a0/Levi2017_July_H2A5343_FullRes.jpg' },
  { slug: 'lapland-hotels-saaga', name: 'Lapland Hotels Saaga', region: 'Ylläsjärvi', desc: 'TripAdvisor-favourite wedding hotel in Ylläs. Spa, three restaurants, hot tubs.', img: 'https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg' },
  { slug: 'tundrea-kilpisjarvi', name: 'Tundrea Kilpisjärvi', region: 'Kilpisjärvi', desc: 'Finland’s northernmost glass igloo resort, 480 m above sea level — best aurora view in Lapland.', img: 'https://tundrea.com/wp-content/uploads/2021/09/IMG_6429-HDR-2-scaled-e1660643559657.jpg' },
  { slug: 'hotel-aurora-pyha', name: 'Hotel Aurora Pyhä', region: 'Pyhä-Luosto NP', desc: 'World’s northernmost stargazing site — UNESCO Starlight Reserve.', img: 'https://visitpyha.fi/wp-content/uploads/2025/04/20240930_033916.webp' },
  { slug: 'lapland-hotels-pyha', name: 'Lapland Hotels Pyhä', region: 'Pyhä, inside the NP', desc: 'Luxury hotel inside Pyhä National Park — amethyst mine wedding ceremony, the most original Lapland venue.', img: 'https://visitpyha.fi/wp-content/uploads/2025/09/20250808_181448-1-scaled.jpg' },
  { slug: 'santas-hotel-santamus', name: "Santa's Hotel Santamus", region: 'Santa Claus Village', desc: 'The only Santa Claus Village hotel designed for weddings. Reindeer and husky packages included.', img: 'https://santashotels.fi/wp-content/uploads/2019/09/santas-meta.png' },
  { slug: 'nova-skyland', name: 'Nova Skyland Hotel', region: 'Santa Claus Village', desc: 'Compact, modern boutique hotel in Santa Claus Village.', img: 'https://r.profitroom.pl/novaskyland/images/202201261054590.NovaSkyland_0005_ilmakuva.jpg' },
];

function buildHead({ title, description, url, image }) {
  // Replace and inject head tags. Vite leaves a clean head we can rewrite.
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<meta name="robots" content="index,follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${url}" />`,
    `<link rel="alternate" hreflang="fi" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="LaplandWeddings" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:locale:alternate" content="fi_FI" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, '&quot;');
}

function patchHtml(shell, { title, description, url, image }) {
  let out = shell;

  // Replace existing title
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  // Replace existing description
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  );

  // Inject the rest of the head tags before </head>
  const extra = [
    `<meta name="robots" content="index,follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${url}" />`,
    `<link rel="alternate" hreflang="fi" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="LaplandWeddings" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:locale:alternate" content="fi_FI" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].map((l) => '    ' + l).join('\n');

  out = out.replace(/<\/head>/, `${extra}\n  </head>`);

  return out;
}

let count = 0;

function writeRoute(path, meta) {
  const url = SITE + path;
  const html = patchHtml(SHELL, { ...meta, url });
  // Write to dist/<path>/index.html (path without leading /)
  const cleanPath = path === '/' ? '' : path.replace(/^\//, '');
  const dir = cleanPath ? resolve(DIST, cleanPath) : DIST;
  if (cleanPath) mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html);
  count++;
}

// Top-level routes
for (const [path, meta] of Object.entries(baseDefaults)) {
  writeRoute(path, meta);
}

// Locations
for (const l of locations) {
  writeRoute(`/locations/${l.slug}`, {
    title: `${l.name} — Weddings | LaplandWeddings`,
    description: l.desc,
    image: l.img,
  });
}

// Wedding types
for (const t of types) {
  writeRoute(`/wedding-types/${t.slug}`, {
    title: `${t.name} — Lapland Weddings | LaplandWeddings`,
    description: t.desc,
    image: t.img,
  });
}

// Venues
for (const v of venues) {
  writeRoute(`/venues/${v.slug}`, {
    title: `${v.name} — ${v.region} | LaplandWeddings`,
    description: v.desc,
    image: v.img,
  });
}

console.log(`Prerendered ${count} routes with unique meta`);
