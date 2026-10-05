/**
 * Build-time meta prerender for the Vite SPA — multilingual edition.
 *
 * For every canonical route, generates pages in 12 locales:
 *   en  → /<path>/
 *   fi  → /fi/<path>/
 *   de  → /de/<path>/
 *   ja  → /ja/<path>/
 *   es  → /es/<path>/
 *   pt-BR → /br/<path>/
 *   zh-CN → /cn/<path>/
 *   ko  → /kr/<path>/
 *   fr  → /fr/<path>/
 *   it  → /it/<path>/
 *   nl  → /nl/<path>/
 *
 * Each with route-specific localised title, description, canonical,
 * full hreflang fan-out, Open Graph and Twitter tags.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { venueTitleBase } from '../src/lib/venueTitle.mjs';
import { LEGAL_META } from '../src/lib/legalMeta.mjs';
// [LV-META-ONE-SOURCE 2026-10-05] Title and description of every indexed page come from the same modules the
// page components import, so the prerendered HTML and the browser show one text (gate:meta-hydraatio in lv-ops).
import { STATIC_META } from '../src/lib/staticMeta.mjs';
import { VENUE_DESCRIPTION } from '../src/lib/venueMeta.mjs';
import { LOCATION_DESCRIPTION } from '../src/lib/locationMeta.mjs';
import { TYPE_DESCRIPTION } from '../src/lib/typeMeta.mjs';
import { locationTitle, typeTitle } from '../src/lib/routeTitle.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');
const SITE = 'https://laplandweddings.online';

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.error('dist/index.html not found — run vite build first');
  process.exit(1);
}

// Vendoroitu kopio ENSIN, monorepon juuri vasta varalle. 23.8.2026 asti tama
// osui vain monorepoon, joten CI-build (plain checkout, `on: push`) sammutti
// crawlable bodyn aanettomasti ja julkaisi 552 reittia joilla oli 8 sanaa
// runkoa. Build vihrea, lokissa yksi NOTE-rivi. Sama muoto kuin laplandgifts f76797a.
let CB = null;
for (const cand of ['./_prerender_crawlable_body.mjs', '../../_prerender_crawlable_body.mjs']) {
  try {
    CB = await import(cand);
    break;
  } catch {
    /* kokeile seuraava kandidaatti */
  }
}
if (!CB) {
  console.warn('[prerender] NOTE: _prerender_crawlable_body.mjs ei loydy — crawlable body pois kaytosta');
}

// __dirname-pohjainen juuri, EI process.cwd(): moduuli osuu weddingsilla vasta
// kolmanteen kandidaattiin (<siteroot>/../shared/Footer.tsx), joten vaarasta
// hakemistosta ajettu build sammuttaisi ominaisuuden aanettomasti.
const SITE_ROOT = resolve(__dirname, '..');
const NETWORK = CB ? CB.readFooterNetwork(SITE_ROOT) : null;
if (!CB || !NETWORK) {
  console.error('');
  console.error('[prerender] CRAWLABLE-BODY -PORTTI: runkoa ei voi rakentaa.');
  if (!CB) console.error('  - _prerender_crawlable_body.mjs ei latautunut (vendoroitu kopio puuttuu?)');
  else console.error('  - shared/Footer.tsx linkkeja/labeleita ei voitu lukea');
  console.error('  23.8.2026 asti tama oli console.warn JA alla oleva savuportti oli kaarittu');
  console.error('  `if (NETWORK)`:iin — eli portti sammui tasan silloin kun sita olisi tarvittu.');
  console.error('  Se paasti CI:n julkaisemaan 552 sivua joilla oli 8 sanaa runkoa: vihrea build,');
  console.error('  yksi rivi lokissa. Moduuli on nyt vendoroitu, joten myos plain checkout loytaa');
  console.error('  sen - jos ei loyda, se on aito vika eika ymparistoero.');
  console.error('');
  process.exit(1);
}

const RAW_SHELL = readFileSync(resolve(DIST, 'index.html'), 'utf-8');
// Riisunta on PAKOLLINEN: tama skripti lukee kuorensa samasta dist/index.html:sta
// jonka se itse ylikirjoittaa EN-etusivulla (pathToFile('/')). Ilman tata
// toinen ajo antaisi jokaiselle 552 reitille ETUSIVUN h1:n, kuvauksen ja navin.
// 🔴 Head-tagit riisutaan samasta syysta kuin crawlable body — ja se puuttui
// 22.8.2026 asti. Riisunta koski vain bodya, joten skriptin ajaminen KAHDESTI
// samaa distia vasten (ilman valissa ajettua `vite build`ia) tuotti jokaiselle
// sivulle KAKSI robots-metaa perakkain seka etusivun canonicalin ja 13
// hreflangia paalle. Se on tasmalleen se sekasignaali jota vastaan alla oleva
// noindex-haara on olemassa, ja se syntyi hiljaa: build ei kaadu, ja vika
// nakyy vain valmiista HTML:sta. Loytyi kattavuusportin itsetestissa.
const HEAD_META_RE = [
  /^[^\S\r\n]*<meta\s+name="robots"[^>]*>\r?\n?/gim,
  /^[^\S\r\n]*<link\s+rel="canonical"[^>]*>\r?\n?/gim,
  /^[^\S\r\n]*<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>\r?\n?/gim,
  /^[^\S\r\n]*<meta\s+property="og:[^"]*"[^>]*>\r?\n?/gim,
  /^[^\S\r\n]*<meta\s+name="twitter:[^"]*"[^>]*>\r?\n?/gim,
];
const stripHeadMeta = (html) => HEAD_META_RE.reduce((acc, re) => acc.replace(re, ''), html);

const SHELL = stripHeadMeta(CB ? CB.stripCrawlableBody(RAW_SHELL) : RAW_SHELL);

// Locations/types/venues-rivien nimet kaikilla 12 kielella, en ja fi mukaan lukien
// (5.10.2026). Muoto:
//   { <lang>: { locations: [{slug,name}], types: [{slug,name}], venues: [{slug,region}] } }
// sync-route-i18n-names.mjs kirjoittaa arvot rekistereista (src/data/*.ts) ennen
// tata skriptia, joten selain ja esirenderointi lukevat saman nimen. Kuvaukset
// ovat src/lib/*Meta.mjs:ssa.
// 🔴 Puuttuva tiedosto tai rivi KAATAA buildin: hiljainen paluu englantiin
// tekisi otsikoista ja nimista englantia 11 kielella ilman punaista.
let ROUTE_I18N;
try {
  ROUTE_I18N = JSON.parse(readFileSync(resolve(__dirname, 'route-i18n.json'), 'utf-8'));
} catch (e) {
  console.error(`[prerender] route-i18n.json ei latautunut (${e.message}) — build pysahtyy.`);
  process.exit(1);
}

// HUOM: venueilla kentta on `region`, ei `name`.
function i18n(group, slug, lang, field) {
  const row = ROUTE_I18N[lang]?.[group]?.find((r) => r.slug === slug);
  if (row && row[field]) return row[field];
  console.error(`[prerender] route-i18n.json: ${lang}.${group}.${slug}.${field} puuttuu — build pysahtyy.`);
  process.exit(1);
}

// Taytetaan esikierroksella ennen ensimmaista kirjoitusta.
const INTERNAL_BY_LANG = {};

// Locale config: lang code, url prefix, og locale, hreflang.
const LOCALES = [
  { lang: 'en', prefix: '',    og: 'en_GB', hreflang: 'en' },
  { lang: 'fi', prefix: '/fi', og: 'fi_FI', hreflang: 'fi' },
  { lang: 'de', prefix: '/de', og: 'de_DE', hreflang: 'de' },
  { lang: 'ja', prefix: '/ja', og: 'ja_JP', hreflang: 'ja' },
  { lang: 'es', prefix: '/es', og: 'es_ES', hreflang: 'es' },
  { lang: 'pt-BR', prefix: '/br', og: 'pt_BR', hreflang: 'pt-BR' },
  { lang: 'zh-CN', prefix: '/cn', og: 'zh_CN', hreflang: 'zh-CN' },
  { lang: 'ko', prefix: '/kr', og: 'ko_KR', hreflang: 'ko' },
  { lang: 'fr', prefix: '/fr', og: 'fr_FR', hreflang: 'fr' },
  { lang: 'it', prefix: '/it', og: 'it_IT', hreflang: 'it' },
  { lang: 'nl', prefix: '/nl', og: 'nl_NL', hreflang: 'nl' },
  { lang: 'sv', prefix: '/sv', og: 'sv_SE', hreflang: 'sv' },
];

// [LV-DESC-MIN 2026-09-07] Static pages: the hand-written ja/zh/ko descriptions in the
// STATIC map are 36–69 characters. Extend them with sentences from the SAME locale's
// translations section that renders that page (src/i18n/translations.<ident>.ts).
const STATIC_SECTION = { '/': 'home', '/venues': 'venues', '/wedding-types': 'types', '/practical-guide': 'practical', '/checklist/dvv-foreign-couples': 'practical', '/locations': 'locations' };
const TRANS_IDENT = { 'pt-BR': 'ptBR', 'zh-CN': 'zhCN' };
const TRANS_CACHE = {};
function sectionStrings(lang, section) {
  const key = lang + ':' + section;
  if (TRANS_CACHE[key]) return TRANS_CACHE[key];
  const file = resolve(__dirname, '..', 'src', 'i18n', `translations.${TRANS_IDENT[lang] || lang}.ts`);
  let out = [];
  if (existsSync(file)) {
    const src = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const i = src.indexOf(`\n  ${section}: {`);
    if (i >= 0) {
      let depth = 0, j = src.indexOf('{', i), k = j;
      for (; k < src.length; k++) { if (src[k] === '{') depth++; else if (src[k] === '}') { depth--; if (depth === 0) break; } }
      const block = src.slice(j, k);
      out = [...block.matchAll(/:\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1].replace(/\\'/g, "'")).filter((t) => t.length >= 12 && !/^[\/#]|https?:/.test(t) && !/·/.test(t) && /[.!?。！？]$/.test(t));
    }
  }
  TRANS_CACHE[key] = out;
  return out;
}
// 🔴🔴 LEVEYS, EI MERKKIMAARA. Googlen snippetin raja on pikseleissa ja CJK-merkki on
// noin kaksi kertaa latinalaisen levyinen, joten 70 merkin alaraja pitaa taysimittaista
// japanin kuvausta liian lyhyena ja liimaa perään sivun leipatekstia. Mitattu 21.9.2026
// livesta: /ja/ 112 merkkia = 217 leveysyksikkoa, lahdeteksti 52 merkkia.
// Latinalaisiin nama eivat kosketa: 70 merkkia = 70 yksikkoa, 160 merkkia = 160.
const LEVEA_DESC = /[ᄀ-ᇿ⺀-꓏ꥠ-꥿가-퟿豈-﫿︰-﹏＀-｠￠-￦]/;
const leveysDesc = (x) => [...String(x)].reduce((n, c) => n + (LEVEA_DESC.test(c) ? 2 : 1), 0);
const riittavaDesc = (x) => String(x).length >= 70 || leveysDesc(x) >= 100;
/** Leikkaa merkkijonon niin etta sen leveys on enintaan w. */
const sliceWDesc = (x, w) => {
  let n = 0, out = '';
  for (const c of String(x)) {
    const step = LEVEA_DESC.test(c) ? 2 : 1;
    if (n + step > w) break;
    n += step; out += c;
  }
  return out;
};

function extendFromTranslations(path, lang, current) {
  let cur = String(current || '').trim();
  const section = STATIC_SECTION[path];
  if (riittavaDesc(cur) || !section) return cur;
  const cjk = isCjk(lang);
  const text = sectionStrings(lang, section).join(cjk ? '' : ' ');
  const sentences = (cjk ? text.split(/(?<=[。！？])/) : text.split(/(?<=[.!?])\s+/)).map((x) => x.trim()).filter((x) => x.length > 3);
  for (const sen of sentences) {
    if (cur.includes(sen) || sen.includes(cur)) continue;
    const joiner = /[.!?。！？]$/.test(cur) ? ' ' : (cjk ? '。' : '. ');
    const next = cur + joiner + sen;
    if (next.length > 160 || leveysDesc(next) > 200) { if (riittavaDesc(cur)) break; continue; }
    cur = next;
    if (riittavaDesc(cur)) break;
  }
  return clampDescription(cur);
}

// Top-level routes — { path: { <lang>: { title, description }, image } }
// Title and description: src/lib/staticMeta.mjs, the same object the pages render in the browser
// (5.10.2026; until then this table was a hand-kept copy that had drifted on 78 of 108 pages).
const top = {
  '/': { ...STATIC_META['/'], image: '/og.jpg?v=d20d8a53' },
  '/locations': { ...STATIC_META['/locations'], image: '/images/heroes/rovaniemi-jatkankynttila-june-andrew.jpg' },
  '/wedding-types': { ...STATIC_META['/wedding-types'], image: '/og.jpg?v=d20d8a53' },
  '/venues': { ...STATIC_META['/venues'], image: '/images/heroes/levi-ice-castle-corridor.jpg' },
  '/photographers': { ...STATIC_META['/photographers'], image: '/images/heroes/inari-midnight-sun-pier-teker.jpg' },
  '/practical-guide': { ...STATIC_META['/practical-guide'], image: '/images/heroes/couple-snow-trail-px19478687.jpg' },
  '/contact': { ...STATIC_META['/contact'], image: '/images/heroes/couple-snow-trail-px19478687.jpg' },
  '/pricing': { ...STATIC_META['/pricing'], image: '/images/venues/lapland-hotels-saaga.jpg' },
  '/checklist/dvv-foreign-couples': { ...STATIC_META['/checklist/dvv-foreign-couples'], image: '/images/venues/wilderness-hotel-inari.jpg' },
  '/privacy': { ...LEGAL_META['/privacy'], image: '/og.jpg?v=d20d8a53' },
  '/terms': { ...LEGAL_META['/terms'], image: '/og.jpg?v=d20d8a53' },
  '/cookie-policy': { ...LEGAL_META['/cookie-policy'], image: '/og.jpg?v=d20d8a53' },
};

// Rekisterisivujen reitit ja kuvat. Nimet (locations.name, types.name, venues.region) tulevat kaikilla 12
// kielella route-i18n.json:sta (synkattu rekistereista) ja kuvaukset src/lib/{location,type,venue}Meta.mjs:sta.
// 5.10.2026 asti en- ja fi-nimet ja kuvaukset olivat tassa kasin kopioituina.
const locations = [
  { slug: 'rovaniemi', img: '/images/own/rovaniemi-santa-claus-village-summer.webp' },
  { slug: 'saariselka', img: '/images/stock/loc-saariselka-ukk-reindeer-lindman.webp' },
  { slug: 'levi', img: '/images/own/levi-slopes-summer.webp' },
  { slug: 'yllas', img: '/images/own/yllas-reindeer-akaslompolo-summer.webp' },
  { slug: 'pyha-luosto', img: '/images/own/pyha-chairlift-panorama-summer.webp' },
  { slug: 'kilpisjarvi', img: '/images/stock/loc-kilpisjarvi-salmivaara-rasanen.webp' },
  { slug: 'oulu', img: '/images/stock/loc-oulu-hupisaaret-estormiz.webp' },
  { slug: 'kemijarvi', img: '/images/own/kemijarvi-mirror-lake-evening.webp' },
];

const types = [
  { slug: 'northern-lights', img: '/images/stock/type-northern-lights-inari-rasanen.webp' },
  { slug: 'snow-chapel', img: '/images/stock/type-snow-chapel-kemi-lumilinna.webp' },
  { slug: 'glass-igloo', img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'midnight-sun', img: '/images/stock/type-midnight-sun-utsjoki-maasaak.webp' },
  { slug: 'elopement', img: '/images/stock/type-elopement-px10757612.webp' },
  { slug: 'vow-renewal', img: '/images/stock/type-vow-renewal-px6462544.webp' },
];

const venues = [
  { slug: 'kakslauttanen', name: 'Kakslauttanen Arctic Resort', img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'arctic-snowhotel', name: 'Arctic SnowHotel & Glass Igloos', img: '/images/venues/arctic-snowhotel.jpg' },
  { slug: 'snow-village-lainio', name: 'Lapland Hotels SnowVillage (Lainio)', img: '/images/venues/snow-village-lainio.jpg' },
  { slug: 'northern-lights-ranch', name: 'Northern Lights Ranch', img: '/images/venues/northern-lights-ranch.webp' },
  { slug: 'levi-ice-castle', name: 'Levi Ice Castle', img: '/images/venues/levi-ice-castle.jpg' },
  { slug: 'levin-iglut', name: 'Levin Iglut · Golden Crown', img: '/images/venues/levin-iglut.jpg' },
  { slug: 'apukka-resort', name: 'Apukka Resort', img: '/images/venues/apukka-resort.jpeg' },
  { slug: 'arctic-treehouse', name: 'Arctic TreeHouse Hotel', img: '/images/venues/arctic-treehouse.jpg' },
  { slug: 'wilderness-hotel-muotka', name: 'Wilderness Hotel Muotka', img: '/images/venues/wilderness-hotel-muotka.jpg' },
  { slug: 'wilderness-hotel-inari', name: 'Wilderness Hotel Inari', img: '/images/venues/wilderness-hotel-inari.jpg' },
  { slug: 'wilderness-hotel-juutua', name: 'Wilderness Hotel Juutua', img: '/images/venues/wilderness-hotel-juutua.jpg' },
  { slug: 'northern-lights-village-saariselka', name: 'Northern Lights Village Saariselkä', img: '/images/venues/northern-lights-village-saariselka.jpg' },
  { slug: 'northern-lights-village-levi', name: 'Northern Lights Village Levi', img: '/images/venues/northern-lights-village-levi.jpg' },
  { slug: 'hotelli-hullu-poro', name: 'Hotelli Hullu Poro', img: '/images/venues/hotelli-hullu-poro.jpg' },
  { slug: 'levi-panorama', name: 'Hotel Levi Panorama', img: '/images/venues/levi-panorama.jpg' },
  { slug: 'lapland-hotels-saaga', name: 'Lapland Hotels Saaga', img: '/images/venues/lapland-hotels-saaga.jpg' },
  { slug: 'tundrea-kilpisjarvi', name: 'Tundrea Kilpisjärvi', img: '/images/venues/tundrea-kilpisjarvi.jpg' },
  { slug: 'santas-hotel-aurora', name: "Santa's Hotel Aurora", img: '/images/venues/santas-hotel-aurora.webp' },
  { slug: 'lapland-hotels-luostotunturi', name: 'Lapland Hotels Luostotunturi', img: '/images/venues/lapland-hotels-luostotunturi.jpg' },
  { slug: 'nova-skyland', name: 'Nova Skyland Hotel', img: '/images/venues/nova-skyland.jpg' },
];

function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

function urlFor(prefix, canonical) {
  // Trailing-slash form: the prerendered file lives at /path/index.html and
  // Cloudflare Pages serves it at /path/ with 200 (the no-slash form 308-redirects).
  if (canonical === '/') return SITE + (prefix || '') + '/';
  return (SITE + prefix + canonical).replace(/\/?$/, '/');
}

function patchHtml({ lang, title, description, image, canonical, ogLocaleStr, noindex, schema }) {
  // Build all alternate URLs
  const alternates = LOCALES.map((L) => ({
    hreflang: L.hreflang,
    url: urlFor(L.prefix, canonical),
  }));
  const enUrl = urlFor('', canonical);
  const currentLoc = LOCALES.find((L) => L.lang === lang);
  const currentUrl = urlFor(currentLoc.prefix, canonical);

  let out = SHELL;

  out = out.replace(/<html\s+lang="[^"]*">/, `<html lang="${lang}">`);
  // [LV-TITLE-LEN 2026-08-21] Google truncates past ~60 characters, and measured
  // that day this site had 169 titles over it — 131 of them venue pages, whose
  // title is `<Venue>: <Region>` where the first half is already
  // two proper nouns. Dropping OUR OWN brand suffix loses nothing (the site name
  // still ships in og:site_name and the breadcrumb), while keeping the venue and
  // region visible in the SERP. Only the suffix goes: a title that is still long
  // without it is content, and content stays. Same rule as the shared
  // _prerender_routes.mjs shortenTitle().
  title = shortenTitle(title);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  // [LV-DESC-CLAMP 2026-09-06] 31 pages shipped over 160 characters (locations, legal); Google
  // cuts the rest. Cut at the last sentence end at or after 90 characters, else at a word.
  description = clampDescription(description);
  out = out.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttr(description)}" />`);

  const og = /^https?:/.test(image) ? image : 'https://laplandweddings.online' + image;
  const altOgLocales = LOCALES
    .filter((L) => L.lang !== lang)
    .map((L) => `<meta property="og:locale:alternate" content="${L.og}" />`);

  const hreflangTags = alternates.map((a) =>
    `<link rel="alternate" hreflang="${a.hreflang}" href="${a.url}" />`
  );
  hreflangTags.push(`<link rel="alternate" hreflang="x-default" href="${enUrl}" />`);

  // 🔴 noindex-sivu EI saa hreflangeja eika self-canonicalia mainostamaan
  // itseaan: ne ovat indeksointisignaaleja, ja pari "noindex + hreflang-joukko"
  // on ristiriitainen. Kumppanisivu on tarkoituksella indeksoimaton (sen oma
  // <SEO noindex>), joten staattisen kuoren on sanottava sama ENNEN JS:aa —
  // muuten Googlebot nakee ensin "index,follow" ja vasta ajon jalkeen noindexin.
  const extra = [
    `<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`,
    ...(noindex ? [] : [`<link rel="canonical" href="${currentUrl}" />`]),
    ...(noindex ? [] : hreflangTags),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="LaplandWeddings" />`,
    `<meta property="og:url" content="${currentUrl}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:secure_url" content="${og}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${ogLocaleStr}" />`,
    ...altOgLocales,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
  ].map((l) => '    ' + l).join('\n');

  // [LV-LD 2026-09-19] Static JSON-LD per route (BreadcrumbList everywhere but home, FAQPage on
  // the practical guide, LodgingBusiness / TouristDestination / Article on the three registries).
  // The React SEO component renders the same kind of schema client-side, but this prerenderer is
  // head-only and AI crawlers do not run JS: measured 19.9.2026, every static page carried only
  // the shell's Organization + WebSite. `</` is escaped so a value can never close the script.
  const ld = (schema || [])
    .filter(Boolean)
    .map((o) => `    <script type="application/ld+json">${JSON.stringify(o).replace(/<\//g, '<\\/')}</script>`)
    .join('\n');
  out = out.replace(/<\/head>/, `${extra}\n${ld ? ld + '\n' : ''}  </head>`);

  // Pre-hydration crawlable body. Koskee VAIN tyhjaa #rootia; React (createRoot,
  // ei hydrateRoot — src/main.tsx:7) korvaa lapset ensirenderissa, joten
  // hydraatiokonfliktia ei voi syntya.
  if (NETWORK) {
    out = CB.injectCrawlableBody(
      out,
      CB.buildCrawlableBody(NETWORK, {
        title,
        description,
        lang,
        siteOrigin: SITE,
        siteName: 'LaplandWeddings',
        internalLinks: INTERNAL_BY_LANG[lang],
        selfUrl: currentUrl,
      })
    );
  }

  return out;
}

function clampDescription(d, max = 160) {
  const s = String(d || '').trim();
  if (s.length <= max && leveysDesc(s) <= 200) return s;
  const head = sliceWDesc(s.slice(0, max), 200);
  const lastEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '), head.lastIndexOf('。'));
  if (lastEnd >= 90 || (lastEnd > 0 && riittavaDesc(head.slice(0, lastEnd + 1)))) return head.slice(0, lastEnd + 1).trim();
  return head.replace(/\s+\S*$/, '').replace(/[,;:\s]+$/, '');
}

function pathToFile(distPath) {
  const cleanPath = distPath === '/' ? '' : distPath.replace(/^\//, '');
  const dir = cleanPath ? resolve(DIST, cleanPath) : DIST;
  if (cleanPath) mkdirSync(dir, { recursive: true });
  return resolve(dir, 'index.html');
}

let count = 0;

// ── JSON-LD builders (19.9.2026) ─────────────────────────────────────────────
const SITE_ORG = { '@type': 'Organization', name: 'LaplandVibes', url: 'https://laplandvibes.com' };
function stripBrand(t) { return String(t || '').split(/\s[|—]\s/)[0].trim(); }
function absImg(img) { return img ? (/^https?:/.test(img) ? img : SITE + String(img).split('?')[0]) : undefined; }
function breadcrumb(L, canonical, pageName) {
  const items = [{ name: 'LaplandWeddings', url: urlFor(L.prefix, '/') }];
  const parent = canonical.split('/').slice(0, -1).join('/');
  if (parent && top[parent]) items.push({ name: stripBrand((top[parent][L.lang] || top[parent].en).title), url: urlFor(L.prefix, parent) });
  items.push({ name: pageName, url: urlFor(L.prefix, canonical) });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}
// Venue websites, read from the registry (website: '…' follows slug: '…' inside each entry).
const VENUE_SITES = (() => {
  const src = readFileSync(resolve(__dirname, '..', 'src', 'data', 'venues.ts'), 'utf8');
  const out = {};
  const re = /slug: '([^']+)'[\s\S]*?website: '([^']+)'/g;
  let m;
  while ((m = re.exec(src))) out[m[1]] = m[2];
  return out;
})();
// FAQ of the practical guide: q/a pairs × 12 locales, parsed from the TSX source the same way
// longDesc() reads the registries (Node in CI cannot import .ts).
const FAQ_ITEMS = (() => {
  const src = readFileSync(resolve(__dirname, '..', 'src', 'pages', 'PracticalGuide.tsx'), 'utf8').replace(/\r\n/g, '\n');
  const start = src.indexOf('const FAQ:');
  const end = src.indexOf('\n];', start);
  if (start < 0 || end < 0) return [];
  const block = src.slice(start, end);
  const pairs = (b) => {
    const o = {};
    const pairRe = /^\s*'?([\w-]+)'?\s*:\s*'((?:[^'\\]|\\.)*)'\s*,?\s*$/gm;
    let p;
    while ((p = pairRe.exec(b))) o[p[1]] = p[2].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    return o;
  };
  const items = [];
  const itemRe = /q:\s*\{([\s\S]*?)\n\s*\},\s*a:\s*\{([\s\S]*?)\n\s*\},/g;
  let m;
  while ((m = itemRe.exec(block))) items.push({ q: pairs(m[1]), a: pairs(m[2]) });
  return items.filter((it) => it.q.en && it.a.en);
})();
console.log(`[prerender] JSON-LD: ${Object.keys(VENUE_SITES).length} venue websites, ${FAQ_ITEMS.length} FAQ items`);
function faqPage(L) {
  if (FAQ_ITEMS.length < 3) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: L.hreflang,
    mainEntity: FAQ_ITEMS.map((it) => ({
      '@type': 'Question',
      name: it.q[L.lang] || it.q.en,
      acceptedAnswer: { '@type': 'Answer', text: it.a[L.lang] || it.a.en },
    })),
  };
}

// [LV-META-ONE-SOURCE 2026-10-05] A route whose meta comes from a shared module (src/lib/*Meta.mjs) must be
// published exactly as written there, because the page component shows the module's text in the browser. If
// extendFromTranslations(), longDesc(), clampDescription() or shortenTitle() would change it, the prerendered
// HTML and the browser disagree again: stop the build instead, and fix the text in the module (70-160
// characters, a CJK character counts two).
const META_DRIFT = [];

function writeAll(canonical, byLang, image, noindex, schemaFor, source) {
  // byLang: { en: {title,desc}, fi:{...}, ... } — EN is required
  const enMeta = byLang.en;
  for (const L of LOCALES) {
    const meta = byLang[L.lang] || enMeta;
    if (source) {
      const want = source[L.lang];
      const got = { title: shortenTitle(meta.title), description: clampDescription(meta.description) };
      if (!want || got.title !== want.title || got.description !== want.description) {
        META_DRIFT.push({ canonical, lang: L.lang, want, got });
      }
    }
    const out = patchHtml({
      lang: L.lang,
      title: meta.title,
      description: meta.description,
      image,
      canonical,
      ogLocaleStr: L.og,
      noindex,
      schema: noindex ? undefined : (schemaFor ? schemaFor(L, meta) : undefined),
    });
    const distPath = canonical === '/' ? (L.prefix || '/') : (L.prefix + canonical);
    writeFileSync(pathToFile(distPath), out);
    count++;
  }
}

const ROUTES = [];

// Top-level: pass per-lang meta map directly
for (const [path, meta] of Object.entries(top)) {
  const byLang = {};
  for (const L of LOCALES) {
    // [LV-DESC-MIN 2026-09-07] only a same-locale entry is extended (never the EN fallback).
    const m = meta[L.lang] || meta.en;
    byLang[L.lang] = meta[L.lang] ? { ...m, description: extendFromTranslations(path, L.lang, m.description) } : m;
  }
  ROUTES.push({
    canonical: path,
    byLang,
    image: meta.image,
    source: STATIC_META[path],
    schemaFor: path === '/' ? undefined : (L, m) => [
      breadcrumb(L, path, stripBrand(m.title)),
      path === '/practical-guide' ? faqPage(L) : null,
    ],
  });
}

const TITLE_SUFFIX_RE = /\s*[|—–·]\s*LaplandWeddings(?:\.online)?\s*$/i;
function shortenTitle(t) {
  if (!t || t.length <= 60) return t;
  const short = String(t).replace(TITLE_SUFFIX_RE, '').trim();
  return short.length >= 25 && short.length < t.length ? short : t;
}

// [LV-DESC-MIN 2026-09-07] OpenSEO flagged 138 descriptions under 70 characters on this
// site — mostly ja/ko/zh venue and type blurbs from route-i18n.json (28–67 chars), plus a
// few fi/en ones. This prerenderer harvests no body text, but the page's own long
// localized copy exists in src/data/*.ts (venues.description, weddingTypes.description,
// locations.intro). Read it with a tolerant regex (Node 20 in CI cannot import .ts) and
// use the SAME-LANGUAGE long text, clamped to 160, whenever the short one is under 70.
const LONG_FIELDS = {
  venues: ['src/data/venues.ts', 'description'],
  types: ['src/data/weddingTypes.ts', 'description'],
  locations: ['src/data/locations.ts', 'intro'],
};
const LONG_CACHE = {};
function parseLocalizedField(rel, field) {
  const file = resolve(__dirname, '..', rel);
  if (!existsSync(file)) return {};
  const src = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const out = {};
  const slugRe = /^\s*slug:\s*'([^']+)'/gm;
  let m;
  while ((m = slugRe.exec(src))) {
    const slug = m[1];
    const fieldIdx = src.indexOf(`${field}: {`, m.index);
    const nextSlug = src.indexOf("slug: '", m.index + m[0].length);
    if (fieldIdx < 0 || (nextSlug > 0 && fieldIdx > nextSlug)) continue;
    const close = src.indexOf('\n    },', fieldIdx);
    const block = src.slice(fieldIdx, close > 0 ? close : fieldIdx + 6000);
    const pairs = {};
    const pairRe = /^\s*'?([\w-]+)'?\s*:\s*'((?:[^'\\]|\\.)*)'\s*,?\s*$/gm;
    let p;
    while ((p = pairRe.exec(block))) pairs[p[1]] = p[2].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    out[slug] = pairs;
  }
  return out;
}
const LIST_FIELDS = {
  venues: ['src/data/venues.ts', ['features', 'weddingSpaces']],
  locations: ['src/data/locations.ts', ['highlight', 'bestFor']],
};
const LIST_CACHE = {};
// Localized ARRAY field: `features: { fi: ['a', 'b'], 'zh-CN': ['c'] }` → slug → lang → string[]
// (a localized STRING field such as `highlight` is returned as a one-item array).
function parseLocalizedList(rel, field) {
  const file = resolve(__dirname, '..', rel);
  if (!existsSync(file)) return {};
  const src = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const out = {};
  const slugRe = /^\s*slug:\s*'([^']+)'/gm;
  let m;
  while ((m = slugRe.exec(src))) {
    const slug = m[1];
    const fieldIdx = src.indexOf(`${field}: {`, m.index);
    const nextSlug = src.indexOf("slug: '", m.index + m[0].length);
    if (fieldIdx < 0 || (nextSlug > 0 && fieldIdx > nextSlug)) continue;
    const close = src.indexOf('\n    },', fieldIdx);
    const block = src.slice(fieldIdx, close > 0 ? close : fieldIdx + 8000);
    const perLang = {};
    const langRe = /^\s*'?([\w-]+)'?\s*:\s*(\[[^\]]*\]|'(?:[^'\\]|\\.)*')\s*,?\s*$/gm;
    let p;
    while ((p = langRe.exec(block))) {
      const val = p[2];
      const items = val.startsWith('[')
        ? [...val.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1])
        : [val.slice(1, -1)];
      perLang[p[1]] = items.map((x) => x.replace(/\\'/g, "'").replace(/\\\\/g, '\\'));
    }
    out[slug] = perLang;
  }
  return out;
}
function isCjk(lang) { return /^(ja|ko|zh)/.test(String(lang || '')); }
function longDesc(group, slug, lang, current) {
  let cur = String(current || '').trim();
  if (cur.length >= 70) return cur;
  if (!LONG_CACHE[group]) { const [rel, field] = LONG_FIELDS[group]; LONG_CACHE[group] = parseLocalizedField(rel, field); }
  const long = LONG_CACHE[group][slug] && LONG_CACHE[group][slug][lang];
  if (long && long.length > cur.length) cur = clampDescription(long);
  if (cur.length >= 70 || !LIST_FIELDS[group]) return cur;
  // Still short: the page's own localized list fields (venue features, location highlight +
  // "best for"), joined as one trailing sentence. Same locale only.
  const [rel, fields] = LIST_FIELDS[group];
  const cjk = isCjk(lang);
  for (const field of fields) {
    const key = group + ':' + field;
    if (!LIST_CACHE[key]) LIST_CACHE[key] = parseLocalizedList(rel, field);
    const items = (LIST_CACHE[key][slug] && LIST_CACHE[key][slug][lang]) || [];
    const fresh = items.map((x) => x.trim()).filter((x) => x && !cur.includes(x));
    if (!fresh.length) continue;
    const sep = cjk ? '、' : ', ';
    const joiner = /[.!?。！？]$/.test(cur) ? ' ' : (cjk ? '。' : '. ');
    let tail = '';
    for (const item of fresh) {
      const next = tail ? tail + sep + item : item;
      if ((cur + joiner + next).length > 158) break;
      tail = next;
      if ((cur + joiner + tail).length >= 70) break;
    }
    if (tail) cur = (cur + joiner + tail + (cjk ? '。' : '.')).replace(/\s+/g, ' ');
    if (cur.length >= 70) break;
  }
  return clampDescription(cur);
}

// The shared description of a registry page, or a build stop: a missing entry would otherwise
// throw a TypeError deep inside a loop, or worse, publish an empty description.
function sharedDesc(table, file, slug, lang) {
  const d = table[slug]?.[lang];
  if (d) return d;
  console.error(`[prerender] ${file}: kuvaus puuttuu (${slug}, ${lang}) — build pysahtyy.`);
  process.exit(1);
}

// Locations: title from src/lib/routeTitle.mjs, description from src/lib/locationMeta.mjs
for (const l of locations) {
  const byLang = {};
  const source = {};
  for (const L of LOCALES) {
    const nameSrc = i18n('locations', l.slug, L.lang, 'name');
    const want = { title: locationTitle(nameSrc, L.lang), description: sharedDesc(LOCATION_DESCRIPTION, 'locationMeta.mjs', l.slug, L.lang) };
    source[L.lang] = want;
    byLang[L.lang] = {
      title: want.title,
      description: longDesc('locations', l.slug, L.lang, want.description),
    };
  }
  ROUTES.push({
    canonical: `/locations/${l.slug}`, byLang, image: l.img, source,
    schemaFor: (L, m) => [
      breadcrumb(L, `/locations/${l.slug}`, i18n('locations', l.slug, L.lang, 'name')),
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: i18n('locations', l.slug, L.lang, 'name'),
        description: m.description,
        url: urlFor(L.prefix, `/locations/${l.slug}`),
        image: absImg(l.img),
        inLanguage: L.hreflang,
        containedInPlace: { '@type': 'Country', name: 'Finland' },
      },
    ],
  });
}

// Wedding types: title from src/lib/routeTitle.mjs, description from src/lib/typeMeta.mjs
for (const t of types) {
  const byLang = {};
  const source = {};
  for (const L of LOCALES) {
    const nameSrc = i18n('types', t.slug, L.lang, 'name');
    const want = { title: typeTitle(t.slug, nameSrc, L.lang), description: sharedDesc(TYPE_DESCRIPTION, 'typeMeta.mjs', t.slug, L.lang) };
    source[L.lang] = want;
    byLang[L.lang] = {
      title: want.title,
      description: longDesc('types', t.slug, L.lang, want.description),
    };
  }
  ROUTES.push({
    canonical: `/wedding-types/${t.slug}`, byLang, image: t.img, source,
    schemaFor: (L, m) => [
      breadcrumb(L, `/wedding-types/${t.slug}`, i18n('types', t.slug, L.lang, 'name')),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: stripBrand(m.title),
        description: m.description,
        image: absImg(t.img),
        inLanguage: L.hreflang,
        mainEntityOfPage: urlFor(L.prefix, `/wedding-types/${t.slug}`),
        author: SITE_ORG,
        publisher: SITE_ORG,
      },
    ],
  });
}

// Venues
for (const v of venues) {
  const byLang = {};
  const source = {};
  for (const L of LOCALES) {
    const region = i18n('venues', v.slug, L.lang, 'region');
    const desc = sharedDesc(VENUE_DESCRIPTION, 'venueMeta.mjs', v.slug, L.lang);
    source[L.lang] = { title: venueTitleBase(v.name, region, L.lang), description: desc };
    byLang[L.lang] = {
      // [LV-TITLE-LEN 2026-08-23] Venue-nimi + koko aluekuvaus ylitti 60 merkkia
      // kahdeksalla lokaalilla ("Lapland Hotels SnowVillage (Lainio): Lainio,
      // Kittila · zwischen Yllas und Levi" = 78) ja katkesi hakutuloksessa.
      // Aluekuvauksen `·`-hanta on suuntatietoa, joka toistaa jo mainitun
      // paikkakunnan — pudotetaan VAIN kun otsikko ei muuten mahdu. Sivun oma
      // sisalto nayttaa aluekuvauksen kokonaisena, tama koskee vain <title>:a.
      // [LV-DUP 2026-09-06] localized descriptor, see src/lib/venueTitle.mjs (shortenTitle
      // below still drops the brand suffix when the line does not fit).
      title: venueTitleBase(v.name, region, L.lang) + '',
      description: longDesc('venues', v.slug, L.lang, desc),
    };
  }
  ROUTES.push({
    canonical: `/venues/${v.slug}`, byLang, image: v.img, source,
    schemaFor: (L, m) => [
      breadcrumb(L, `/venues/${v.slug}`, v.name),
      {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: v.name,
        url: VENUE_SITES[v.slug] || undefined,
        image: absImg(v.img),
        description: m.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: String(i18n('venues', v.slug, L.lang, 'region')).split('·')[0].trim(),
          addressRegion: 'Lapland',
          addressCountry: 'FI',
        },
        mainEntityOfPage: urlFor(L.prefix, `/venues/${v.slug}`),
      },
    ],
  });
}

// Esikierros: sivuston OMAT sivut per lokaali. Jokainen sivu linkittaa kaikkiin
// sisariinsa, joten koko lista on oltava valmis ennen ensimmaista kirjoitusta.
// Ilman naita raakahtml:ssa on 0 SISAISTA linkkia ja jokainen sivu on orpo
// ei-JS-crawlerille, vaikka ulospain menevia olisi 27 (mitattu 8 sivustolla
// 2026-08-13: no-outgoing-links 100 → 0 mutta orphan-page jai 99/100).
if (NETWORK) {
  for (const r of ROUTES) {
    for (const L of LOCALES) {
      const meta = r.byLang[L.lang] || r.byLang.en;
      // Brandihanta pois: sama merkkijono 46 kertaa yhdessa listassa on kohinaa.
      const text = String(meta.title || '').split(/\s[|—]\s/)[0].trim();
      if (!text) continue;
      (INTERNAL_BY_LANG[L.lang] = INTERNAL_BY_LANG[L.lang] || []).push({
        url: urlFor(L.prefix, r.canonical),
        text,
      });
    }
  }
  console.log(
    '[prerender] crawlable internal links per locale — ' +
      Object.entries(INTERNAL_BY_LANG).map(([l, a]) => `${l}:${a.length}`).join(' ')
  );
}

const NLCH = String.fromCharCode(10);
// ── /partner-with-us: OLEMASSA OLEVA sivu jota prerender ei kattanut ────────
// 🔴🔴 Sivu on tarkoituksella `noindex` (src/pages/PartnerWithUs.tsx: <SEO
// noindex …>), joten se ei ole sitemapissa — ja juuri siksi se jai huomaamatta.
// Se oli livena 200:lla VAIN `_redirects`-catch-allin ansiosta. Kun catch-all
// poistettiin 22.8.2026, prerenderoimaton polku alkaa antaa aidon 404:n — ja
// tama on se sivu jolla kumppanit hankitaan.
//
// Metat LUETAAN sivun omasta lahdekoodista eika kirjoiteta tanne kasin: kasin
// kopioitu kaannos ajautuu erilleen ensimmaisessa sisaltomuutoksessa, ja taman
// verkoston kallein virheluokka on kohdekielinen teksti joka lukee aitona mutta
// on vaarin. Jos luku epaonnistuu, build KAATUU — hiljainen paluu englantiin 12
// kielella olisi huonompi kuin punainen build.
const ESC = String.fromCharCode(92);
function lueKumppanisivunMetat() {
  const src = readFileSync(resolve(__dirname, '..', 'src', 'pages', 'PartnerWithUs.tsx'), 'utf-8');
  const poimi = (avain) => {
    const alku = src.indexOf(`${NLCH}  ${avain}: {`);
    if (alku === -1) throw new Error(`PartnerWithUs.tsx: lohkoa "${avain}" ei loytynyt`);
    const loppu = src.indexOf(`${NLCH}  },`, alku);
    if (loppu === -1) throw new Error(`PartnerWithUs.tsx: lohko "${avain}" ei paattynyt`);
    const lohko = src.slice(alku, loppu);
    const ulos = {};
    // Avain voi olla lainausmerkeissa ('pt-BR') tai ilman (en, fi). Arvo luetaan
    // merkki kerrallaan eika regexilla, koska se voi sisaltaa suojatun
    // heittomerkin — regex joka ei sita osaa katkaisisi tekstin puolivalista
    // ILMAN virhetta, ja lopputulos olisi vaarin 12 kielella.
    const avainRe = /(?:^|[\s,{])'?([A-Za-z]{2}(?:-[A-Za-z]{2})?)'?:\s*'/g;
    let m;
    while ((m = avainRe.exec(lohko))) {
      let i = avainRe.lastIndex;
      let arvo = '';
      let suljettu = false;
      while (i < lohko.length) {
        const c = lohko[i];
        if (c === ESC) { arvo += lohko[i + 1]; i += 2; continue; }
        if (c === "'") { suljettu = true; break; }
        arvo += c; i += 1;
      }
      if (!suljettu) throw new Error(`PartnerWithUs.tsx: ${avain}.${m[1]} ei paattynyt heittomerkkiin`);
      ulos[m[1]] = arvo;
      avainRe.lastIndex = i + 1;
    }
    return ulos;
  };
  const title = poimi('seoTitle');
  const description = poimi('seoDesc');
  const puuttuu = LOCALES.map((L) => L.lang).filter((l) => !title[l] || !description[l]);
  if (puuttuu.length) throw new Error(`PartnerWithUs.tsx: seoTitle/seoDesc puuttuu kielilta ${puuttuu.join(', ')}`);
  return { title, description };
}
try {
  const kumppani = lueKumppanisivunMetat();
  const byLang = {};
  for (const L of LOCALES) {
    byLang[L.lang] = { title: kumppani.title[L.lang], description: kumppani.description[L.lang] };
  }
  ROUTES.push({
    canonical: '/partner-with-us',
    byLang,
    image: `${SITE}/images/heroes/saariselka-kaunispaa-hikers-rasanen.jpg`,
    noindex: true,
  });
} catch (e) {
  console.error(`${NLCH}[prerender] /partner-with-us metojen luku EPAONNISTUI: ${e.message}`);
  console.error('Ilman prerenderia sivu antaa aidon 404:n (catch-all poistettu 22.8.). Build pysahtyy.');
  process.exit(1);
}
for (const r of ROUTES) writeAll(r.canonical, r.byLang, r.image, r.noindex, r.schemaFor, r.source);

if (META_DRIFT.length) {
  console.error(`\n[prerender] JAETTU META MUUTTUI ESIRENDEROINNISSA ${META_DRIFT.length} sivulla — selain nayttaisi eri tekstin:`);
  for (const d of META_DRIFT.slice(0, 20)) {
    console.error(`  - ${d.lang} ${d.canonical}`);
    console.error(`      lahde:    ${JSON.stringify(d.want)}`);
    console.error(`      julkaistu: ${JSON.stringify(d.got)}`);
  }
  console.error('Korjaa teksti src/lib/*Meta.mjs:ssa (kuvaus 70-160 merkkia, CJK-merkki = 2 / 100-200 leveysyksikkoa).\n');
  process.exit(1);
}

console.log(`Prerendered ${count} routes across ${LOCALES.length} locales (${count / LOCALES.length} routes × ${LOCALES.length} languages)`);

// ── SMOKE GATE ───────────────────────────────────────────────────────────────
// The crawlable-body feature is deliberately fail-open: a missing
// `_prerender_crawlable_body.mjs` or an unparseable shared Footer only produces
// a console.warn, because a standalone checkout must still be able to build.
//
// 🔴 That means it can also switch itself off in production without anything
// going red — build-all.sh reads exit 0 as success and the warning scrolls past.
// The network has been bitten by exactly this shape before (wrangler pin,
// 2026-08-11: every build green, the failure visible only in the deploy log).
//
// So assert the finished artefact, not the intent: read back what was actually
// written and fail the build if the block is gone. Checks the LAST file written
// rather than a fixed path, so it cannot pass on a stale dist.
{
  const probe = pathToFile('/');
  const html = readFileSync(probe, 'utf-8');
  const problems = [];
  if (!html.includes('id="lv-prerender"')) problems.push('crawlable body block missing');
  if (!/<div id="root"><!--LV-PRE-->/.test(html)) problems.push('block is not inside #root');

  // Mirrors the shared prerenderer's gate (2026-08-23): the block is now hidden
  // from JS browsers, and the two halves fail in OPPOSITE directions — a missing
  // marker script paints the text at every page load, a hide rule that is not
  // gated on that class hides it from the non-JS crawlers too and silently
  // deletes the whole SEO purpose.
  if (!html.includes("classList.add('lv-js')")) problems.push('lv-js marker script missing — the block would be painted');
  if (!html.includes('.lv-js #lv-prerender{display:none}')) problems.push('class-scoped hide rule missing');
  for (const m of html.matchAll(/([^{}]*)#lv-prerender\s*\{\s*display:\s*none/g)) {
    if (!/\.lv-js\s+$/.test(m[1])) problems.push('hide rule is not class-scoped — non-JS crawlers would lose the block');
  }
  if (!html.includes('id="lv-splash"')) problems.push('branded splash missing');
  const networkLinks = (html.match(/<a\s+href="https:\/\/(?!laplandweddings\.)/g) || []).length;
  if (networkLinks < 27) problems.push(`only ${networkLinks} outbound network links, expected >= 27`);

  if (problems.length) {
    console.error(`\n[prerender] SMOKE GATE FAILED on ${probe}:`);
    for (const p of problems) console.error(`  - ${p}`);
    console.error('Refusing to exit 0 — a green build here would ship pages with no crawlable content.\n');
    process.exit(1);
  }
  console.log(`[prerender] smoke gate OK — block present, inside #root, ${networkLinks} network links`);
}

// ── dist/404.html + KATTAVUUSPORTTI ─────────────────────────────────────────
// Molemmat ovat catch-allin poiston (22.8.2026) ehtoja, eivat koristeita.
//
// 404.html: ilman sita Cloudflare Pages tarjoaa kuolleelle polulle oman
// geneerisen sivunsa. Tama on sivuston oma 404, ja se on `noindex` JO
// STAATTISESSA kuoressa — juuri se mita catch-all esti: aiemmin palvelin
// vastasi 200 ja noindex tuli vasta JS:n jalkeen, joten Googlebot kirjasi
// URLin olemassa olevaksi ja palasi crawlaamaan sita.
//
// Kattavuusportti: catch-all on turvallista poistaa VAIN jos jokainen reitti
// jonka appi osaa renderoida on kirjoitettu levylle. Portti lukee reitit
// src/App.tsx:n taulukosta — EI sitemapista, koska /partner-with-us on
// tarkoituksella noindex eika siksi ole sitemapissa. Juuri sen kaltainen sivu
// jai kiinni vain catch-alliin.
{
  const shell404 = patchHtml({
    lang: 'en',
    title: 'Page not found',
    description: 'This page does not exist. Browse Lapland wedding venues, locations and planning guides instead.',
    image: `${SITE}/images/heroes/saariselka-kaunispaa-hikers-rasanen.jpg`,
    canonical: '/',
    ogLocaleStr: 'en_US',
    noindex: true,
  });
  writeFileSync(resolve(DIST, '404.html'), shell404);

  const ongelmat = [];
  if (!/name="robots" content="noindex/.test(shell404)) ongelmat.push('404.html: noindex puuttuu');
  if (/rel="canonical"/.test(shell404)) ongelmat.push('404.html: canonical lasna (ei saa olla)');
  if ((shell404.match(/name="robots"/g) || []).length !== 1) ongelmat.push('404.html: robots-metoja != 1');

  const appSrc = readFileSync(resolve(__dirname, '..', 'src', 'App.tsx'), 'utf-8');
  const taulukkoAlku = appSrc.indexOf('const routes = [');
  const taulukkoLoppu = appSrc.indexOf('\n];', taulukkoAlku);
  if (taulukkoAlku === -1 || taulukkoLoppu === -1) {
    ongelmat.push('App.tsx: reittitaulukkoa ei voitu lukea — porttia ei voi ajaa');
  } else {
    const taulukko = appSrc.slice(taulukkoAlku, taulukkoLoppu);
    const appPolut = [...taulukko.matchAll(/path:\s*'([^']*)'/g)].map((m) => m[1]);
    // Nama EIVAT tarvitse prerenderia: dynaamiset segmentit kirjoitetaan datasta
    // omina reitteinaan, ja kaksi vanhaa polkua ohjataan palvelintasolla
    // 301:lla (public/_redirects), joten React-reitti ei koskaan aktivoidu
    // suoralla osumalla.
    const eiTarvitse = new Set(['planners', 'contact']);
    const puuttuvat = [];
    for (const polku of appPolut) {
      if (polku.includes(':') || eiTarvitse.has(polku)) continue;
      for (const L of LOCALES) {
        const kanoninen = polku === '' ? '/' : `/${polku}`;
        const distPolku = kanoninen === '/' ? (L.prefix || '/') : (L.prefix + kanoninen);
        if (!existsSync(pathToFile(distPolku))) puuttuvat.push(`${L.lang} ${distPolku}`);
      }
    }
    if (puuttuvat.length) {
      ongelmat.push(
        `${puuttuvat.length} reittia joita appi renderoi mutta prerender ei kirjoittanut: ` +
          puuttuvat.slice(0, 8).join(', ') + (puuttuvat.length > 8 ? ' …' : '')
      );
    }
    console.log(`[prerender] kattavuusportti: ${appPolut.length} app-reittia, ${puuttuvat.length} kattamatta`);
  }

  if (ongelmat.length) {
    console.error('\n[prerender] 404/KATTAVUUSPORTTI EPAONNISTUI:');
    for (const o of ongelmat) console.error(`  - ${o}`);
    console.error('public/_redirects ei sisalla catch-allia, joten kattamaton reitti on LIVENA 404.\n');
    process.exit(1);
  }
  console.log('[prerender] wrote dist/404.html — 404 + kattavuusportti OK');
}
