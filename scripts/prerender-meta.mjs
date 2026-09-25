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

// Kaannokset locations/types/venues-riveille kielille joita EI ole taulukoissa
// inline (nailla on vain en ja fi). Muoto:
//   { <lang>: { locations: [{slug,name,desc}], types: [...],
//               venues: [{slug,region,desc}] } }
// Puuttuva tiedosto EI kaada buildia — silloin kaikki muut kielet putoavat
// englantiin kuten ennenkin.
let ROUTE_I18N = {};
try {
  ROUTE_I18N = JSON.parse(readFileSync(resolve(__dirname, 'route-i18n.json'), 'utf-8'));
} catch (e) {
  ROUTE_I18N = {};
  console.warn(`[prerender] WARN: route-i18n.json ei latautunut (${e.message}) — locations/types/venues jaavat englanniksi kaikilla ei-fi-kielilla`);
}

// Kaannos jos on, muuten fi jos lokaali on fi, muuten en.
// `entry` on taulukon oma rivi, jolla on aina .en ja .fi.
// HUOM: venueilla kentta on `region`, ei `name`.
function i18n(group, slug, lang, field, entry) {
  const row = ROUTE_I18N[lang]?.[group]?.find((r) => r.slug === slug);
  if (row && row[field]) return row[field];
  return (lang === 'fi') ? entry.fi[field] : entry.en[field];
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
const top = {
  '/': {
    en: { title: 'Lapland Weddings: 20 Arctic Venues and What They Cost',
          description: 'An independent guide to getting married in Lapland: 20 venues, 8 regions, symbolic and legal ceremonies, real costs. We represent none of the venues.' },
    fi: { title: 'Häät Lapissa: 20 hääpaikkaa jääkappelista lasi-igluun',
          description: '20 hääpaikkaa Lapissa: jääkappelit, lasi-iglut ja tunturihotellit. Hinnat, varausajat ja se, miten avioliiton esteiden tutkinta hoituu ulkomailta.' },
    de: { title: 'Hochzeit in Lappland: Locations & Heiratspapiere',
          description: 'Unabhängiger Leitfaden zum Heiraten in Lappland. 20 Hochzeitslocations, die nötigen Papiere, echte Preise und praktische Leitfäden.' },
    ja: { title: 'ラップランドの結婚式：会場と婚姻手続き',
          description: 'ラップランドでの結婚式を独立した立場でまとめたガイド。20か所の会場、婚姻手続き、実際の価格、実用的なガイド。' },
    es: { title: 'Bodas en Laponia: lugares y trámites de boda',
          description: 'Una guía independiente para casarse en Laponia. 20 lugares, los trámites, precios reales y guías prácticas.' },
    'pt-BR': { title: 'Casamentos na Lapônia: locais e documentação',
          description: 'Um guia independente para casar na Lapônia. 20 locais, a documentação, preços reais e guias práticos.' },
    'zh-CN': { title: '拉普兰婚礼：婚礼场地与结婚手续',
          description: '一份独立的拉普兰婚礼指南。20 个场地、结婚手续、真实价格和实用指南。' },
    ko: { title: '라플란드 결혼식: 예식장과 혼인 서류',
          description: '라플란드 결혼식을 위한 독립적인 안내서입니다. 20곳의 예식장, 혼인 서류, 실제 가격과 실용적인 가이드.' },
    fr: { title: 'Mariage en Laponie : lieux, prix et démarches',
          description: 'Un guide indépendant pour se marier en Laponie. 20 lieux, les démarches, prix réels et guides pratiques.' },
    it: { title: 'Matrimonio in Lapponia: location e pratiche di nozze',
          description: 'Una guida indipendente per sposarsi in Lapponia. 20 location, le pratiche, prezzi reali e guide pratiche.' },
    nl: { title: 'Trouwen in Lapland: locaties en huwelijkspapieren',
          description: 'Een onafhankelijke gids voor trouwen in Lapland. 20 locaties, het papierwerk, echte prijzen en praktische gidsen.' },
    sv: { title: 'Bröllop i Lappland: vigselplatser och äktenskapspapper',
          description: 'En oberoende guide till att gifta sig i Lappland. 20 vigselplatser, vigselpapperen, verkliga priser och praktiska guider för ditt bröllop i Arktis.' },
    image: '/og.jpg?v=20260921',
  },
  '/locations': {
    en: { title: 'Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs',
          description: 'Seven Lapland wedding regions plus city-option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare seasons, flights, and venues.' },
    fi: { title: 'Häät Lapin paikkakunnilla',
          description: 'Seitsemän Lapin häämatkakohdetta ja kaupunkivaihtoehto Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Vertaile sesonkeja, lentoyhteyksiä ja hääpaikkoja.' },
    de: { title: 'Hochzeitsregionen in Lappland',
          description: 'Sieben Hochzeitsregionen in Lappland plus die Stadt Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Saisons im Vergleich.' },
    ja: { title: 'ラップランドの結婚式地域：ロヴァニエミ、レヴィ、サーリセルカ、ユッラス',
          description: 'ラップランドの7つの結婚式地域＋都市の選択肢オウル：ロヴァニエミ、サーリセルカ、レヴィ、ユッラス、ピュハ・ルオスト、キルピスヤルヴィ、ケミヤルヴィ、オウル。季節、フライト、会場を比較。' },
    es: { title: 'Regiones de boda en Laponia',
          description: 'Siete regiones de boda en Laponia más la opción urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare temporadas, vuelos y lugares.' },
    'pt-BR': { title: 'Regiões de casamento na Lapônia',
          description: 'Sete regiões de casamento na Lapônia mais a opção urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare estações, voos e locais.' },
    'zh-CN': { title: '拉普兰婚礼地区：罗瓦涅米、莱维、萨利色尔卡、于拉斯',
          description: '拉普兰七大婚礼地区外加城市之选奥卢：罗瓦涅米、萨利色尔卡、莱维、于拉斯、皮哈-卢奥斯托、基尔皮斯耶尔维、凯米耶尔维、奥卢。比较季节、航班和场地。' },
    ko: { title: '라플란드 결혼식 지역: 로바니에미, 레비, 사리셀카, 윌래스',
          description: '라플란드의 웨딩 지역 7곳과 도시 옵션 오울루: 로바니에미, 사리셀카, 레비, 윌래스, 퓌해-루오스토, 킬피스야르비, 케미야르비, 오울루. 시즌, 항공편, 웨딩 장소를 비교하세요.' },
    fr: { title: 'Régions de mariage en Laponie',
          description: 'Sept régions de mariage en Laponie plus Oulu, l’option urbaine : Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Comparez les saisons, vols et lieux.' },
    it: { title: 'Regioni per matrimoni in Lapponia',
          description: 'Sette regioni per matrimoni in Lapponia più Oulu, l’opzione urbana: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Confronti stagioni, voli e location.' },
    nl: { title: 'Bruiloftsregio’s in Lapland',
          description: 'Zeven bruiloftsregio’s in Lapland plus stadsoptie Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Vergelijk seizoenen, vluchten en locaties.' },
    sv: { title: 'Bröllopsregioner i Lappland',
          description: 'Sju bröllopsregioner i Lappland plus stadsalternativet Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Jämför säsonger, flyg och vigselplatser.' },
    image: '/images/heroes/rovaniemi-jatkankynttila-midnight-sun-xepheid.jpg',
  },
  '/wedding-types': {
    en: { title: 'Lapland Wedding Types: Aurora, Snow Chapel, Glass Igloo',
          description: 'Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.' },
    fi: { title: 'Häätyypit Lapissa',
          description: 'Kuusi häätyyppiä Lapissa: revontuli, lumikappeli, lasi-iglu, keskiyön aurinko, elopement ja lupausten uusiminen.' },
    de: { title: 'Hochzeitsarten in Lappland',
          description: 'Sechs Hochzeitsarten in Lappland: Polarlicht-Hochzeit, Schneekapelle, Glasiglu, Mitternachtssonne, Elopement und Erneuerung des Eheversprechens.' },
    ja: { title: 'ラップランドの結婚式タイプ：オーロラ、雪の礼拝堂、グラスイグルー',
          description: 'ラップランドの6つの結婚式タイプ：オーロラ、雪の礼拝堂、グラスイグルー、白夜、エロープメント、誓いの更新。' },
    es: { title: 'Tipos de boda en Laponia',
          description: 'Seis tipos de boda en Laponia: auroras boreales, capilla de nieve, iglú de cristal, sol de medianoche, fuga y renovación de votos.' },
    'pt-BR': { title: 'Tipos de casamento na Lapônia',
          description: 'Seis tipos de casamento na Lapônia: aurora boreal, capela de neve, iglu de vidro, sol da meia-noite, elopement e renovação de votos.' },
    'zh-CN': { title: '拉普兰婚礼类型：北极光、雪教堂、玻璃冰屋',
          description: '拉普兰六种婚礼类型:北极光婚礼、雪教堂、玻璃冰屋、午夜阳光、私奔婚礼及婚誓更新。' },
    ko: { title: '라플란드 결혼식 유형: 오로라, 스노우 채플, 글래스 이글루',
          description: '라플란드의 결혼식 유형 6가지: 오로라, 스노우 채플, 글래스 이글루, 백야, 엘로프먼트(단둘만의 결혼식), 서약 갱신.' },
    fr: { title: 'Types de mariage en Laponie',
          description: 'Six types de mariage en Laponie : aurores boréales, chapelle de neige, igloo de verre, soleil de minuit, mariage à deux et renouvellement de vœux.' },
    it: { title: 'Tipi di matrimonio in Lapponia',
          description: 'Sei tipi di matrimonio in Lapponia: aurora boreale, cappella di neve, igloo di vetro, sole di mezzanotte, elopement e rinnovo delle promesse.' },
    nl: { title: 'Bruiloftstypes in Lapland',
          description: 'Zeven bruiloftstypes in Lapland: noorderlicht, sneeuwkapel, glaziglo, middernachtszon, eloperen en geloftehernieuwing.' },
    sv: { title: 'Bröllopstyper i Lappland',
          description: 'Sex bröllopstyper i Lappland: norrsken, snökapell, glasigloo, midnattssol, elopement och förnyade löften.' },
    image: '/og.jpg?v=20260921',
  },
  '/venues': {
    en: { title: 'Lapland Wedding Venues: 20 venues',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 21 Lapland wedding venues across the regions.' },
    fi: { title: 'Hääpaikat Lapissa',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. 20 hääpaikkaa Lapin paikkakunnilla.' },
    de: { title: 'Hochzeitslocations in Lappland',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village und viele mehr. 20 Hochzeitslocations in Lappland.' },
    ja: { title: 'ラップランドの結婚式会場：20か所',
          description: 'Kakslauttanen、Northern Lights Ranch、Arctic SnowHotel、Snow Villageなど。地域を横断する20か所の結婚式会場。' },
    es: { title: 'Lugares para bodas en Laponia',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village y muchos más. 20 lugares de boda en las regiones de Laponia.' },
    'pt-BR': { title: 'Locais para casamento na Lapônia',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e muitos outros. 20 locais de casamento nas regiões da Lapônia.' },
    'zh-CN': { title: '拉普兰婚礼场地：20 个场地',
          description: '卡克斯劳塔宁、北极光牧场、北极雪酒店、雪村等。覆盖各地区的21 个拉普兰婚礼场地。' },
    ko: { title: '라플란드 예식장 20곳',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village 외. 라플란드 전역에 걸친 20곳의 예식장입니다.' },
    fr: { title: 'Lieux de mariage en Laponie',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village et bien d’autres. 20 lieux de mariage dans toute la Laponie.' },
    it: { title: 'Location di matrimonio in Lapponia',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e molte altre. 20 location di matrimonio nelle regioni della Lapponia.' },
    nl: { title: 'Bruiloftslocaties in Lapland',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village en meer. 21 bruiloftslocaties in heel Lapland.' },
    sv: { title: 'Bröllopsplatser i Lappland',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village med flera. 21 bröllopsplatser i hela Lappland.' },
    image: '/images/heroes/levi-ice-castle-corridor.jpg',
  },
  '/photographers': {
    // 19.9.2026: the named-photographer directory was retired (no agreements, free referrals);
    // the page is now a guide. Same strings as src/pages/Photographers.tsx P.seoTitle/seoDesc.
    en: { title: 'Wedding Photography in Lapland: Costs, Questions, Timing',
          description: 'What a wedding photographer costs in Lapland, four questions to ask before booking, and when the winter dates fill up. Independent guide, no photographer represented.' },
    fi: { title: 'Hääkuvaus Lapissa: hinnat, kysymykset ja ajoitus',
          description: 'Mitä hääkuvaaja maksaa Lapissa, neljä kysymystä ennen varausta ja milloin talven päivät täyttyvät. Riippumaton opas, emme edusta yhtäkään kuvaajaa.' },
    de: { title: 'Hochzeitsfotografie in Lappland: Kosten, Fragen, Zeitplan',
          description: 'Was ein Hochzeitsfotograf in Lappland kostet, vier Fragen vor der Buchung und wann die Wintertermine voll sind. Unabhängiger Leitfaden, wir vertreten keinen Fotografen.' },
    ja: { title: 'フィンランド・ラップランドでフォトウェディング：費用と準備',
          description: 'ラップランドの結婚式撮影の費用、予約前に確認したい4つの質問、冬の日程が埋まる時期。独立した立場のガイドで、特定のフォトグラファーを代理していません。' },
    es: { title: 'Fotografía de boda en Laponia: costos, preguntas y fechas',
          description: 'Cuánto cuesta un fotógrafo de boda en Laponia, cuatro preguntas antes de reservar y cuándo se agotan las fechas de invierno. Guía independiente, no representamos a ningún fotógrafo.' },
    'pt-BR': { title: 'Fotografia de casamento na Lapônia: custos, perguntas e datas',
          description: 'Quanto custa um fotógrafo de casamento na Lapônia, quatro perguntas antes de reservar e quando as datas de inverno esgotam. Guia independente, não representamos nenhum fotógrafo.' },
    'zh-CN': { title: '拉普兰婚礼摄影：费用、问题与时间',
          description: '拉普兰婚礼摄影师的费用、预订前要问的四个问题，以及冬季档期何时订满。独立指南，不代理任何摄影师。' },
    ko: { title: '라플란드 웨딩 촬영: 비용, 질문, 예약 시기',
          description: '라플란드 웨딩 촬영 비용, 예약 전 확인할 네 가지 질문, 겨울 날짜가 마감되는 시기. 독립적인 안내서이며 어떤 포토그래퍼도 대리하지 않습니다.' },
    fr: { title: 'Photographe de mariage en Laponie : tarifs, questions, calendrier',
          description: 'Ce que coûte un photographe de mariage en Laponie, quatre questions à poser avant de réserver et quand les dates d’hiver se remplissent. Guide indépendant, aucun photographe représenté.' },
    it: { title: 'Fotografo di matrimonio in Lapponia: costi, domande, tempi',
          description: 'Quanto costa un fotografo di matrimonio in Lapponia, quattro domande da fare prima di prenotare e quando si esauriscono le date invernali. Guida indipendente, nessun fotografo rappresentato.' },
    nl: { title: 'Trouwfotografie in Lapland: kosten, vragen, timing',
          description: 'Wat een trouwfotograaf in Lapland kost, vier vragen om te stellen voor u boekt en wanneer de winterdata vol raken. Onafhankelijke gids, wij vertegenwoordigen geen fotograaf.' },
    sv: { title: 'Bröllopsfotograf i Lappland: kostnad, frågor, tidpunkt',
          description: 'Vad en bröllopsfotograf kostar i Lappland, fyra frågor att ställa innan du bokar och när vinterdatumen tar slut. Oberoende guide, vi företräder ingen fotograf.' },
    image: '/images/heroes/inari-midnight-sun-pier-teker.jpg',
  },
  '/practical-guide': {
    fi: { title: 'Avioliiton esteiden tutkinta ja vihkiminen Lapissa',
          description: 'Esteiden tutkinta (suomalaisille 1–2 viikkoa), DVV:n vihkijä Rovaniemellä, Inarissa, Kittilässä tai Sodankylässä, todistajat ja symbolinen vaihtoehto.' },
    en: { title: 'Getting Married in Lapland: Paperwork, Officiant, Witnesses',
          description: 'Practical guide for foreign couples: the examination of impediments (3–5 weeks), a civil officiant, two witnesses and registering the marriage at home.' },
    de: { title: 'Heiraten in Lappland: Unterlagen & Trauredner',
          description: 'Praktischer Leitfaden für ausländische Paare: die Unterlagen, Ehefähigkeitsprüfung (3–5 Wochen), Trauzeugen, Trauredner, Registrierung im Heimatland.' },
    ja: { title: 'ラップランドで結婚：書類、婚姻執行者、実践ガイド',
          description: '外国人カップルのための実践ガイド：必要書類、婚姻障害の調査（3〜5週間）、証人、婚姻執行者、母国での登録。' },
    es: { title: 'Casarse en Laponia: los trámites',
          description: 'Guía práctica para parejas extranjeras: los trámites, examen de impedimentos (3-5 semanas), testigos, oficiante y registro en el país de origen.' },
    'pt-BR': { title: 'Casar na Lapônia: a documentação',
          description: 'Guia prático para casais estrangeiros: a documentação, exame de impedimentos (3-5 semanas), testemunhas, celebrante e registro no país de origem.' },
    'zh-CN': { title: '在拉普兰结婚，文书、主婚人、实用指南',
          description: '面向外籍新人的实用指南：所需文书、婚姻障碍审查（3–5周）、证婚人、主婚人、原籍国登记。' },
    ko: { title: '라플란드에서 결혼하기: 서류, 주례, 실용 가이드',
          description: '외국인 커플을 위한 실용 가이드: 필요 서류, 혼인 요건 심사(3~5주), 증인, 주례, 본국 등록.' },
    fr: { title: 'Se marier en Laponie : les démarches',
          description: 'Guide pratique pour les couples étrangers : les démarches, examen des empêchements (3-5 semaines), témoins, officiant, enregistrement dans le pays d’origine.' },
    it: { title: 'Sposarsi in Lapponia: le pratiche',
          description: 'Guida pratica per coppie straniere: le pratiche, esame degli impedimenti (3-5 settimane), testimoni, celebrante, registrazione nel Paese d’origine.' },
    nl: { title: 'Trouwen in Lapland: het papierwerk',
          description: 'Praktische gids voor buitenlandse stellen: het papierwerk, onderzoek naar huwelijksbeletselen (3-5 weken), getuigen, voltrekker, registratie in het thuisland.' },
    sv: { title: 'Gifta sig i Lappland: papper, vigselförrättare, praktisk guide',
          description: 'Praktisk guide för utländska par: pappren, hindersprövning (3–5 veckor), vittnen, vigselförrättare och registrering i hemlandet.' },
    image: '/images/heroes/couple-snow-trail-px19478687.jpg',
  },
  '/contact': {
    en: { title: 'Request 1–3 Lapland wedding quotes',
          description: 'Free and with no commitment. Reply within 1–7 days. We respond within 1–2 business days. Tell us briefly about your dream and we route it to the right planners.' },
    fi: { title: 'Pyydä 1–3 tarjousta Lapin häihin',
          description: 'Maksuton ja sitoumukseton. Vastaus 1–7 päivän sisällä. Vastaamme 1–2 työpäivän sisällä. Kuvaa lyhyesti unelmasi, välitämme sen sopiville suunnittelijoille.' },
    de: { title: 'Fordern Sie 1–3 Angebote für Ihre Hochzeit in Lappland an',
          description: 'Kostenfrei und unverbindlich. Antwort innerhalb von 1–7 Tagen. Wir antworten innerhalb von 1–2 Werktagen. Beschreiben Sie kurz Ihren Traum, wir leiten ihn an die passenden Hochzeitsplaner weiter.' },
    ja: { title: 'ラップランド挙式の見積もりを1〜3件依頼',
          description: '無料で契約義務なし。1〜7日以内にご返信します。 1〜2営業日以内にご返信します。あなたの理想を簡単にお聞かせください、適切なプランナーへお繋ぎします。' },
    es: { title: 'Pida 1–3 presupuestos para su boda en Laponia',
          description: 'Gratis y sin compromiso. Respuesta en 1 a 7 días. Respondemos en 1 a 2 días laborables. Cuéntenos brevemente su sueño, lo enviamos a los organizadores adecuados.' },
    'pt-BR': { title: 'Peça 1–3 orçamentos para seu casamento na Lapônia',
          description: 'Grátis e sem compromisso. Resposta em 1 a 7 dias. Respondemos em 1 a 2 dias úteis. Conte-nos brevemente seu sonho, encaminhamos aos organizadores certos.' },
    'zh-CN': { title: '索取 1–3 份拉普兰婚礼报价',
          description: '免费且无承诺。1–7 天内回复。 我们将在 1–2 个工作日内回复。简单告诉我们您的梦想，我们会转发给合适的策划师。' },
    ko: { title: '라플란드 결혼식 견적 1~3건 요청',
          description: '무료, 부담 없음. 1~7일 내 답변. 1~2 영업일 내에 답변드립니다. 꿈에 대해 간단히 알려주시면 적합한 플래너에게 연결해 드립니다.' },
    fr: { title: 'Demandez 1 à 3 devis pour votre mariage en Laponie',
          description: 'Gratuit, sans engagement. Réponse sous 1–7 jours. Nous répondons sous 1 à 2 jours ouvrés. Décrivez-nous brièvement votre rêve, nous l’orientons vers les bons organisateurs.' },
    it: { title: 'Richiedete 1–3 preventivi per il matrimonio in Lapponia',
          description: 'Gratis e senza impegno. Risposta entro 1–7 giorni. Rispondiamo entro 1–2 giorni lavorativi. Ci racconti brevemente il Suo sogno e lo indirizziamo ai planner giusti.' },
    nl: { title: 'Vraag 1–3 offertes aan voor uw bruiloft in Lapland',
          description: 'Gratis en vrijblijvend. Reactie binnen 1–7 dagen. We reageren binnen 1–2 werkdagen. Vertel kort over uw droom, wij sturen het door naar de juiste planners.' },
    sv: { title: 'Begär 1–3 offerter för ert bröllop i Lappland',
          description: 'Gratis och utan förbindelse. Svar inom 1–7 dagar. Vi svarar inom 1–2 arbetsdagar. Berätta kort om er dröm, så skickar vi den vidare till rätt planerare.' },
    image: '/images/heroes/couple-snow-trail-px19478687.jpg',
  },
  '/pricing': {
    en: { title: 'Lapland Wedding Costs: from EUR 5,000',
          description: 'What does a wedding in Lapland cost? Our smallest budget is EUR 5,000. What that covers, what pushes the number up, and price ranges for each part of the day.' },
    fi: { title: 'Häiden hinta Lapissa: alkaen 5 000 €',
          description: 'Mitä häät Lapissa maksavat? Pienin realistinen budjetti on 5 000 €. Mitä se kattaa, mikä summaa nostaa ja hintahaarukat päivän jokaiselle osalle.' },
    de: { title: 'Hochzeitskosten in Lappland: ab 5.000 €',
          description: 'Was kostet eine Hochzeit in Lappland? Unser kleinstes Budget sind 5.000 €. Was darin enthalten ist, was die Summe erhöht, und Preisspannen pro Posten.' },
    ja: { title: 'ラップランドの結婚式費用：5,000ユーロから',
          description: 'ラップランドの結婚式はいくら？当サイトが承る最小のご予算は5,000ユーロです。その内訳、費用が上がる要因、そして各項目の価格帯をご紹介します。' },
    es: { title: 'Costo de una boda en Laponia: desde 5 000 €',
          description: '¿Cuánto cuesta una boda en Laponia? Nuestro presupuesto mínimo son 5 000 €. Qué incluye, qué eleva la cifra y rangos de precio para cada parte del día.' },
    'pt-BR': { title: 'Custo de casamento na Lapônia: a partir de € 5.000',
          description: 'Quanto custa um casamento na Lapônia? Nosso orçamento mínimo é de € 5.000. O que ele cobre, o que aumenta o valor e faixas de preço para cada parte do dia.' },
    'zh-CN': { title: '拉普兰婚礼费用：5,000 欧元起',
          description: '在拉普兰办婚礼要花多少钱？我们承接的最低预算为 5,000 欧元。本页说明这笔预算涵盖什么、哪些因素会推高费用，以及当天各项开支的价格区间。' },
    ko: { title: '라플란드 결혼식 비용: 5,000유로부터',
          description: '라플란드 결혼식 비용은 얼마일까요? 저희가 확인한 현실적인 최소 예산은 5,000유로입니다. 그 안에 무엇이 포함되는지, 무엇이 금액을 높이는지, 그리고 항목별 가격대를 정리했습니다.' },
    fr: { title: 'Coût d’un mariage en Laponie : à partir de 5 000 €',
          description: 'Combien coûte un mariage en Laponie ? Budget minimum : 5 000 €. Ce qui est inclus, ce qui fait grimper le prix, et les fourchettes par poste.' },
    it: { title: 'Costi matrimonio in Lapponia: da 5.000 €',
          description: 'Quanto costa un matrimonio in Lapponia? Il nostro budget minimo è di 5.000 €. Cosa comprende, cosa fa salire la cifra e le fasce di prezzo per ogni voce.' },
    nl: { title: 'Bruiloftskosten in Lapland: vanaf € 5.000',
          description: 'Wat kost een bruiloft in Lapland? Ons kleinste budget is € 5.000. Wat dat dekt, wat het bedrag omhoog duwt en prijsranges voor elk onderdeel van de dag.' },
    sv: { title: 'Bröllopskostnader i Lappland: från 5 000 €',
          description: 'Vad kostar ett bröllop i Lappland? Vår minsta budget är 5 000 €. Vad den täcker, vad som driver upp summan och prisintervall för varje del av dagen.' },
   image: '/images/venues/lapland-hotels-saaga.jpg',
  },
  '/checklist/dvv-foreign-couples': {
    en: { title: 'DVV Wedding Checklist for Foreign Couples (printable PDF)',
          description: 'A one-page DVV marriage-licence checklist for foreign couples planning a wedding in Finnish Lapland. Print or save as PDF.' },
    fi: { title: 'DVV-tarkistuslista: vihille Lapissa',
          description: 'Yksisivuinen DVV-tarkistuslista ulkomaalaisille pareille, jotka aikovat vihille Suomen Lapissa. Printtaa tai tallenna PDF:nä.' },
    de: { title: 'DVV-Checkliste für ausländische Paare',
          description: 'Einseitige DVV-Checkliste zur Heiratserlaubnis für ausländische Paare, die in Finnisch-Lappland heiraten. Drucken oder als PDF speichern.' },
    ja: { title: '外国人カップル向けDVV結婚式チェックリスト（印刷可PDF）',
          description: 'フィンランドのラップランドで結婚を計画する外国人カップルのための1ページDVV婚姻許可チェックリスト。印刷またはPDF保存。' },
    es: { title: 'Lista DVV para parejas extranjeras',
          description: 'Lista de comprobación DVV de una página para parejas extranjeras que planifican su boda en la Laponia finlandesa. Imprima o guarde en PDF.' },
    'pt-BR': { title: 'Checklist DVV para casais estrangeiros',
          description: 'Checklist DVV de uma página para casais estrangeiros que planejam o casamento na Lapônia finlandesa. Imprima ou salve em PDF.' },
    'zh-CN': { title: '外国情侣DVV婚礼清单(可打印PDF)',
          description: '为计划在芬兰拉普兰举行婚礼的外国情侣准备的一页式DVV结婚证清单。可打印或另存为PDF。' },
    ko: { title: '외국인 커플을 위한 DVV 결혼식 체크리스트(인쇄용 PDF)',
          description: '핀란드 라플란드에서 결혼식을 계획하는 외국인 커플을 위한 한 페이지 분량의 DVV 혼인 허가 체크리스트. 인쇄하거나 PDF으로 저장하실 수 있습니다.' },
    fr: { title: 'Liste DVV pour couples étrangers',
          description: 'Liste de contrôle DVV d’une page pour les couples étrangers qui planifient un mariage en Laponie finlandaise. Imprimez ou enregistrez en PDF.' },
    it: { title: 'Checklist DVV per coppie straniere',
          description: 'Checklist DVV di una pagina per coppie straniere che pianificano il matrimonio nella Lapponia finlandese. Stampi o salvi in PDF.' },
    nl: { title: 'DVV-checklist voor buitenlandse paren',
          description: 'Eenzijdige DVV-checklist voor het huwelijksvergunning voor buitenlandse paren die in Fins Lapland willen trouwen. Print of bewaar als PDF.' },
    sv: { title: 'DVV-checklista för utländska par',
          description: 'En ensidig DVV-checklista för hindersprövning för utländska par som planerar bröllop i finska Lappland. Skriv ut eller spara som PDF.' },
    image: '/images/venues/wilderness-hotel-inari.jpg',
  },
  '/privacy': {
    en: { title: 'Privacy', description: 'Privacy policy for laplandweddings.online: how we handle enquiry data and analytics.' },
    fi: { title: 'Tietosuoja', description: 'Tietosuojaseloste laplandweddings.online: miten käsittelemme tiedustelutietoja ja analytiikkaa.' },
    de: { title: 'Datenschutz', description: 'Datenschutzerklärung für laplandweddings.online: wie wir Anfragedaten und Analytik handhaben.' },
    ja: { title: 'プライバシー', description: 'laplandweddings.online のプライバシーポリシー：お問い合わせデータとアクセス解析の扱い、保存期間、そしてお客様の権利について説明します。' },
    es: { title: 'Privacidad', description: 'Política de privacidad de laplandweddings.online: cómo tratamos los datos de consulta y la analítica.' },
    'pt-BR': { title: 'Privacidade', description: 'Política de privacidade de laplandweddings.online: como tratamos os dados de consulta e a analítica.' },
    'zh-CN': { title: '隐私政策', description: 'laplandweddings.online 隐私政策：我们如何处理您的询价数据与网站分析信息、这些数据会保存多长时间，以及您享有哪些权利。' },
    ko: { title: '개인정보 처리방침', description: 'laplandweddings.online 개인정보 처리방침: 문의 데이터와 분석 정보의 처리 방식, 보관 기간, 그리고 이용자의 권리를 설명합니다.' },
    fr: { title: 'Confidentialité', description: 'Politique de confidentialité de laplandweddings.online : comment nous traitons les données de demande et l’analytique.' },
    it: { title: 'Informativa sulla privacy', description: 'Informativa sulla privacy di laplandweddings.online: come trattiamo i dati delle richieste e l’analitica.' },
    nl: { title: 'Privacyverklaring', description: 'Privacybeleid voor laplandweddings.online: hoe wij omgaan met aanvraaggegevens en analyses.' },
    sv: { title: 'Integritetspolicy', description: 'Integritetspolicy för laplandweddings.online: hur vi hanterar förfrågningsdata och analys.' },
    image: '/og.jpg?v=20260921',
  },
  '/terms': {
    en: { title: 'Terms of Use', description: 'Terms of use for laplandweddings.online: what the guide is, how venue and price information is sourced, affiliate links, and the limits of our liability.' },
    fi: { title: 'Käyttöehdot', description: 'Käyttöehdot: mitä laplandweddings.online on, miten hääpaikka- ja hintatiedot on koottu, mitä kumppanilinkit ovat ja miten vastuu on rajattu.' },
    de: { title: 'Nutzungsbedingungen', description: 'Nutzungsbedingungen für laplandweddings.online: was der Guide ist, woher Location- und Preisangaben stammen, Affiliate-Links und Haftungsgrenzen.' },
    ja: { title: '利用規約', description: 'laplandweddings.online の利用規約：本ガイドの内容、会場・料金情報の出典、アフィリエイトリンク、および責任の範囲について説明します。' },
    es: { title: 'Términos de uso', description: 'Términos de uso de laplandweddings.online: qué es la guía, de dónde salen los datos de lugares y precios, enlaces de afiliados y límites de responsabilidad.' },
    'pt-BR': { title: 'Termos de uso', description: 'Termos de uso de laplandweddings.online: o que é o guia, de onde vêm os dados de locais e preços, links de afiliados e limites de responsabilidade.' },
    'zh-CN': { title: '使用条款', description: 'laplandweddings.online 使用条款：本指南的性质、场地与价格信息的来源、联盟链接的说明，以及我们承担责任的范围与相关限制。' },
    ko: { title: '이용약관', description: 'laplandweddings.online 이용약관: 가이드의 성격, 웨딩 장소 및 가격 정보의 출처, 제휴 링크, 그리고 책임의 범위를 설명합니다.' },
    fr: { title: 'Conditions d’utilisation', description: 'Conditions d’utilisation : nature du guide laplandweddings.online, origine des données sur les lieux et les prix, liens affiliés et limites de responsabilité.' },
    it: { title: 'Condizioni d’uso', description: 'Condizioni d’uso di laplandweddings.online: cos’è la guida, da dove provengono i dati su location e prezzi, link di affiliazione e limiti di responsabilità.' },
    nl: { title: 'Gebruiksvoorwaarden', description: 'Gebruiksvoorwaarden van laplandweddings.online: wat de gids is, herkomst van locatie- en prijsinformatie, affiliate-links en onze aansprakelijkheidsgrenzen.' },
    sv: { title: 'Användarvillkor', description: 'Användarvillkor för laplandweddings.online: vad guiden är, varifrån uppgifter om vigselplatser och priser kommer, affiliatelänkar och ansvarsbegränsningar.' },
    image: '/og.jpg?v=20260921',
  },
  '/cookie-policy': {
    en: { title: 'Cookie Policy', description: 'Which cookies laplandweddings.online sets, what they are for, how long they last and how to change or withdraw your consent at any time.' },
    fi: { title: 'Evästekäytäntö', description: 'Mitä evästeitä laplandweddings.online käyttää, mihin ne on tarkoitettu, kuinka kauan ne säilyvät ja miten suostumuksen voi muuttaa tai perua milloin tahansa.' },
    de: { title: 'Cookie-Richtlinie', description: 'Welche Cookies laplandweddings.online setzt, wozu sie dienen, wie lange sie gespeichert bleiben und wie Sie Ihre Einwilligung jederzeit ändern oder widerrufen.' },
    ja: { title: 'クッキーポリシー', description: 'laplandweddings.online が使用するクッキーの種類、その目的、保存期間、そして同意をいつでも変更・撤回する方法を説明します。' },
    es: { title: 'Política de cookies y consentimiento', description: 'Qué cookies utiliza laplandweddings.online, para qué sirven, cuánto duran y cómo gestionar o retirar su consentimiento en cualquier momento.' },
    'pt-BR': { title: 'Política de cookies', description: 'Quais cookies o laplandweddings.online usa, para que servem, por quanto tempo ficam e como gerenciar ou retirar seu consentimento a qualquer momento.' },
    'zh-CN': { title: 'Cookie 政策', description: 'laplandweddings.online 使用哪些 Cookie、各自的用途是什么、会保存多长时间，以及您如何随时更改或撤回自己的同意。' },
    ko: { title: '쿠키 정책', description: 'laplandweddings.online이 사용하는 쿠키의 종류와 목적, 보관 기간, 그리고 언제든지 동의를 변경하거나 철회하는 방법을 안내합니다.' },
    fr: { title: 'Politique relative aux cookies', description: 'Quels cookies laplandweddings.online utilise, à quoi ils servent, combien de temps ils sont conservés et comment modifier ou retirer votre consentement.' },
    it: { title: 'Informativa sui cookie', description: 'Quali cookie utilizza laplandweddings.online, a cosa servono, quanto durano e come modificare o revocare il consenso in qualsiasi momento.' },
    nl: { title: 'Cookiebeleid', description: 'Welke cookies laplandweddings.online plaatst, waarvoor ze dienen, hoe lang ze bewaard blijven en hoe u uw toestemming op elk moment kunt wijzigen of intrekken.' },
    sv: { title: 'Cookiepolicy', description: 'Vilka cookies laplandweddings.online använder, vad de är till för, hur länge de sparas och hur du när som helst ändrar eller återkallar ditt samtycke.' },
    image: '/og.jpg?v=20260921',
  },
};

const locations = [
  { slug: 'rovaniemi', en: { name: 'Rovaniemi', desc: 'The capital of Lapland, easiest to reach via international flights. Wedding venues from ice chapel to glass igloos near Santa Claus Village.' }, fi: { name: 'Rovaniemi', desc: 'Lapin pääkaupunki, helpoin saavuttaa kansainvälisen lennon kautta. Hääpaikkoja jääkappelista lasi-igluihin Joulupukin pajakylän tuntumassa.' }, img: '/images/own/rovaniemi-santa-claus-village-summer.webp' },
  { slug: 'saariselka', en: { name: 'Saariselkä & Inari', desc: 'The heart of Northern Lapland: aurora on average every other night (FMI) and Kakslauttanen’s glass teepee chapel.' }, fi: { name: 'Saariselkä & Inari', desc: 'Pohjois-Lapin sydän: revontulia keskimäärin joka toisena yönä (Ilmatieteen laitos) ja Kakslauttasen lasi-teepee-kappeli.' }, img: '/images/stock/loc-saariselka-kaunispaa-rasanen.webp' },
  { slug: 'levi', en: { name: 'Levi & Kittilä', desc: 'Finland’s largest fell resort: Lainio Snow Village, Northern Lights Ranch Snow Chapel, direct flights from London.' }, fi: { name: 'Levi & Kittilä', desc: 'Suomen suurin tunturikeskus: Lainion lumikylä, Northern Lights Ranchin lumikappeli, suorat lennot Lontoosta.' }, img: '/images/own/levi-slopes-summer.webp' },
  { slug: 'yllas', en: { name: 'Ylläs', desc: 'Quieter than Levi: Lapland’s cleanest air, Saaga’s wedding-friendly spa hotel, easy reach to Lainio Snow Village.' }, fi: { name: 'Ylläs', desc: 'Levin hiljaisempi naapuri: Lapin puhtainta ilmaa, Saagan häihin sopiva spa-hotelli, lyhyt matka Lainion lumikylään.' }, img: '/images/own/yllas-reindeer-akaslompolo-summer.webp' },
  { slug: 'pyha-luosto', en: { name: 'Pyhä-Luosto', desc: 'The quieter side of eastern Lapland: two hotels in the Luosto log village on the edge of Pyhä-Luosto National Park.' }, fi: { name: 'Pyhä-Luosto', desc: 'Itä-Lapin hiljaisempi puoli: kaksi hotellia Luoston hirsikylässä Pyhä-Luoston kansallispuiston laidalla.' }, img: '/images/own/pyha-chairlift-panorama-summer.webp' },
  { slug: 'kilpisjarvi', en: { name: 'Kilpisjärvi', desc: 'Finland’s highest ground, in its far north-western corner: Tundrea’s glass igloos and the three-country border ceremony.' }, fi: { name: 'Kilpisjärvi', desc: 'Suomen korkeimmat maastot maan luoteiskolkassa: Tundrean lasi-iglut ja kolmen valtakunnan rajavihkiminen.' }, img: '/images/stock/loc-kilpisjarvi-salmivaara-rasanen.webp' },
  { slug: 'oulu', en: { name: 'Oulu', desc: 'The big-city option on the way to Lapland, Finland’s fifth-largest city on the Bothnian Bay coast. City wedding nights with restaurants and nightlife, direct flights from Helsinki in about an hour.' }, fi: { name: 'Oulu', desc: 'Kaupunkivaihtoehto matkalla Lappiin, Suomen viidenneksi suurin kaupunki Perämeren rannalla. Kaupunkimainen hääilta ravintoloineen ja yöelämineen, suorat lennot Helsingistä noin tunnissa.' }, img: '/images/stock/loc-oulu-hupisaaret-estormiz.webp' },
  { slug: 'kemijarvi', en: { name: 'Kemijärvi', desc: 'Finland’s northernmost town, in eastern Lapland: a centre wrapped in lake, 7,029 residents, and a direct train from Helsinki. Five fells within driving distance.' }, fi: { name: 'Kemijärvi', desc: 'Suomen pohjoisin kaupunki Itä-Lapissa: järven ympäröimä keskusta, 7 029 asukasta ja suora junayhteys Helsingistä. Viisi tunturia ajomatkan päässä.' }, img: '/images/own/kemijarvi-mirror-lake-evening.webp' },
];

const types = [
  { slug: 'northern-lights', en: { name: 'Northern Lights Wedding', desc: 'Exchange vows under the aurora borealis: Northern Lapland sees aurora on average every other night (FMI).' }, fi: { name: 'Revontulihäät', desc: 'Vihkiminen revontulien alla: Pohjois-Lapissa revontulia nähdään keskimäärin joka toisena yönä (Ilmatieteen laitos).' }, img: '/images/stock/type-northern-lights-inari-rasanen.webp' },
  { slug: 'snow-chapel', en: { name: 'Snow Chapel Wedding', desc: 'Marry in a chapel carved from pure snow and ice: Lainio, Northern Lights Ranch, Arctic SnowHotel and Levi Ice Castle.' }, fi: { name: 'Lumikappelihäät', desc: 'Vihille puhtaaksi veistetyssä lumi- tai jääkappelissa: Lainio, Northern Lights Ranch, Arctic SnowHotel ja Levin jäälinna.' }, img: '/images/stock/type-snow-chapel-kemi-lumilinna.webp' },
  { slug: 'glass-igloo', en: { name: 'Glass Igloo Wedding', desc: 'Wedding night beneath the Northern Lights in a heated glass dome: Kakslauttanen, Levin Iglut, Apukka.' }, fi: { name: 'Lasi-iglu-häät', desc: 'Hääyö revontulien alla lämpimässä lasikuvussa: Kakslauttanen, Levin Iglut, Apukka.' }, img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'midnight-sun', en: { name: 'Midnight Sun Wedding', desc: 'Marry when the sun never sets: May 23 to July 24, warm weather, no snow gear needed.' }, fi: { name: 'Keskiyön auringon häät', desc: 'Vihille kun aurinko ei laske: 23.5.–24.7., lämmin sää, ei lumipukuja.' }, img: '/images/stock/type-midnight-sun-utsjoki-maasaak.webp' },
  { slug: 'elopement', en: { name: 'Lapland Elopement', desc: 'Just the two of you, the officiant and a photographer. Turnkey packages from €1 600.' }, fi: { name: 'Elopement Lapissa: kahdestaan vihille', desc: 'Pelkästään te kaksi, vihkijä ja valokuvaaja. Avaimet käteen -paketit alkaen 1 600 €.' }, img: '/images/stock/type-elopement-px10757612.webp' },
  { slug: 'vow-renewal', en: { name: 'Vow Renewal in Lapland', desc: 'Renew your vows in the Lapland snow: no paperwork, fully bespoke ceremony.' }, fi: { name: 'Lupausten uusiminen Lapissa', desc: 'Uudistakaa lupauksenne Lapin lumessa: ei papereita, täysin räätälöity seremonia.' }, img: '/images/stock/type-vow-renewal-px6462544.webp' },
];

const venues = [
  { slug: 'kakslauttanen', name: 'Kakslauttanen Arctic Resort', en: { region: 'Saariselkä', desc: 'Finland’s most famous glass igloo resort. Glass Teepee chapel, ice chapel, log chapel, and 250-guest Celebration House.' }, fi: { region: 'Saariselkä', desc: 'Suomen kuuluisin lasi-iglu-resortti. Glass Teepee -kappeli, jääkappeli, hirsikappeli ja 250 hengen Celebration House.' }, img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'arctic-snowhotel', name: 'Arctic SnowHotel & Glass Igloos', en: { region: 'Lehtojärvi · 35 km from Rovaniemi', desc: 'Snow Hotel with ice chapel for 30 guests, ice restaurant, and glass igloos with 360° aurora view.' }, fi: { region: 'Lehtojärvi · 35 km Rovaniemestä', desc: 'Snow Hotel jossa jääkappeli 30 vieraalle, jääravintola ja lasi-iglut 360°-revontulinäkymällä.' }, img: '/images/venues/arctic-snowhotel.jpg' },
  { slug: 'snow-village-lainio', name: 'Lapland Hotels SnowVillage (Lainio)', en: { region: 'Lainio, Kittilä', desc: 'An internationally known Snow Village, rebuilt every winter with a new artistic theme. Ice chapel, wooden chapel, snow suites.' }, fi: { region: 'Lainio, Kittilä', desc: 'Maailmankuulu Snow Village, uusi taideteema joka talvi. Jääkappeli, puukappeli, lumisviittejä.' }, img: '/images/venues/snow-village-lainio.jpg' },
  { slug: 'northern-lights-ranch', name: 'Northern Lights Ranch', en: { region: 'Köngäs · 15 min from Levi', desc: 'Premium luxury resort with glass-walled cabins and a Snow Chapel for 60 guests.' }, fi: { region: 'Köngäs · 15 min Levistä', desc: 'Premium-tason resortti Köngäksessä: lasiseinämökit ja 60 hengen lumikappeli.' }, img: '/images/venues/northern-lights-ranch.webp' },
  { slug: 'levi-ice-castle', name: 'Levi Ice Castle', en: { region: 'Levi · 7 km from centre', desc: 'Levi’s own ice castle with chapel, bar and ice suites. Walls and seats from crystal-clear ice.' }, fi: { region: 'Levi · 7 km keskustasta', desc: 'Levin oma jäälinna kappelin, baarin ja jääsviittien kanssa. Seinät ja istuimet kristallinkirkkaasta jäästä.' }, img: '/images/venues/levi-ice-castle.jpg' },
  { slug: 'levin-iglut', name: 'Levin Iglut · Golden Crown', en: { region: 'Levi · on top of the fell', desc: 'Glass igloos on top of the Levi fell: an unobstructed aurora viewing angle, Suite igloos for couples.' }, fi: { region: 'Levi · tunturin huipulla', desc: 'Lasi-iglut Levitunturin huipulla: Lapin paras revontulinkulma, Suite-iglut pareille.' }, img: '/images/venues/levin-iglut.jpg' },
  { slug: 'apukka-resort', name: 'Apukka Resort', en: { region: 'Apukka · 15 min from Santa Claus Village', desc: 'Resort by Lake Apukka with Aurora Cabins, two-storey Kammi igloo, Aitta and Kota restaurants.' }, fi: { region: 'Apukka · 15 min Joulupukin pajakylästä', desc: 'Resort Apukkajärven rannalla: Aurora Cabins, kaksikerroksinen Kammi-iglu, Aitta- ja Kota-ravintolat.' }, img: '/images/venues/apukka-resort.jpeg' },
  { slug: 'arctic-treehouse', name: 'Arctic TreeHouse Hotel', en: { region: 'SantaPark · 2 km from airport', desc: 'Modern tree-top cabins with glass walls: one of the easiest venues in Lapland to reach, 2 km from Rovaniemi airport.' }, fi: { region: 'SantaPark · 2 km lentokentältä', desc: 'Modernit puumajat lasiseinin: Lapin paras logistiikka, 2 km Rovaniemen lentokentältä.' }, img: '/images/venues/arctic-treehouse.jpg' },
  { slug: 'wilderness-hotel-muotka', name: 'Wilderness Hotel Muotka', en: { region: 'Muotka · edge of UKK National Park', desc: 'Zero light pollution: one of Lapland’s best aurora locations. Aurora Cabins and Kammi cabin.' }, fi: { region: 'Muotka · UKK-puiston laidalla', desc: 'Ei valosaastetta: Lapin parhaita revontulipaikkoja. Aurora Cabins ja Kammi-mökki.' }, img: '/images/venues/wilderness-hotel-muotka.jpg' },
  { slug: 'wilderness-hotel-inari', name: 'Wilderness Hotel Inari', en: { region: 'On the shore of Lake Inari', desc: 'On Lake Inari shore in the heart of Sámi culture. Aurora cabins with direct lake horizon view.' }, fi: { region: 'Inarinjärven rannalla', desc: 'Inarinjärven rannalla, saamelaiskulttuurin sydämessä. Aurora-mökit suoraan järven horisonttiin.' }, img: '/images/venues/wilderness-hotel-inari.jpg' },
  { slug: 'wilderness-hotel-juutua', name: 'Wilderness Hotel Juutua', en: { region: 'Inari · in the centre', desc: 'Newest Wilderness Hotels venue (2022). Aanaar Restaurant in central Inari, walking distance to lake.' }, fi: { region: 'Inarin keskustassa', desc: 'Uusin Wilderness Hotels -kohde (2022). Aanaar-ravintola Inarin keskustassa, kävelymatka järvelle.' }, img: '/images/venues/wilderness-hotel-juutua.jpg' },
  { slug: 'northern-lights-village-saariselka', name: 'Northern Lights Village Saariselkä', en: { region: 'Central Saariselkä', desc: '80 Aurora Cabins and 20 Polar Sky Suites with glass roofs in central Saariselkä.' }, fi: { region: 'Saariselän keskustassa', desc: '80 Aurora-mökkiä ja 20 Polar Sky -sviittiä lasikatolla Saariselän keskustassa.' }, img: '/images/venues/northern-lights-village-saariselka.jpg' },
  { slug: 'northern-lights-village-levi', name: 'Northern Lights Village Levi', en: { region: 'Sirkka, Levi', desc: 'NLV style near Levi services: Aurora Cabins, 5 min to Levi centre.' }, fi: { region: 'Sirkka, Levi', desc: 'NLV-tyyli Levin palveluiden lähellä: Aurora-mökit, 5 min Levin keskustaan.' }, img: '/images/venues/northern-lights-village-levi.jpg' },
  { slug: 'hotelli-hullu-poro', name: 'Hotelli Hullu Poro', en: { region: 'Central Levi', desc: 'Levi’s central hotel and restaurant complex with 200-guest banquet hall and 4 restaurants.' }, fi: { region: 'Levin keskustassa', desc: 'Levin keskeinen hotelli- ja ravintolakompleksi: 200 hengen juhlasali ja 4 ravintolaa.' }, img: '/images/venues/hotelli-hullu-poro.jpg' },
  { slug: 'levi-panorama', name: 'Hotel Levi Panorama', en: { region: 'On Levi fell summit', desc: 'Lapland Hotels flagship on Levi fell summit. Panorama windows, gondola access.' }, fi: { region: 'Levitunturin huipulla', desc: 'Lapland Hotels -lippulaiva Levitunturin huipulla. Panoraamaikkunat, gondolihissi.' }, img: '/images/venues/levi-panorama.jpg' },
  { slug: 'lapland-hotels-saaga', name: 'Lapland Hotels Saaga', en: { region: 'Ylläsjärvi', desc: 'TripAdvisor-favourite wedding hotel in Ylläs. Spa, three restaurants, hot tubs.' }, fi: { region: 'Ylläsjärvi', desc: 'TripAdvisorin suosima häähotelli Ylläksellä. Spa, kolme ravintolaa, hot tubit.' }, img: '/images/venues/lapland-hotels-saaga.jpg' },
  { slug: 'tundrea-kilpisjarvi', name: 'Tundrea Kilpisjärvi', en: { region: 'Kilpisjärvi', desc: 'Glass-roof igloos on a lakeshore in Finland’s far north-western corner, 480 m above sea level: one of the best aurora views in Lapland.' }, fi: { region: 'Kilpisjärvi', desc: 'Lasikattoiset iglut järvenrannalla Suomen luoteisimmassa kolkassa, 480 m mpy: yksi Lapin parhaista revontulinäkymistä.' }, img: '/images/venues/tundrea-kilpisjarvi.jpg' },
  { slug: 'santas-hotel-aurora', name: "Santa's Hotel Aurora", en: { region: 'Luosto, Sodankylä', desc: 'Boutique hotel in the centre of Luosto: a private sauna in every room, glass igloos, beside Pyhä-Luosto National Park.' }, fi: { region: 'Luosto, Sodankylä', desc: 'Butiikkihotelli Luoston keskustassa: oma sauna joka huoneessa, lasi-iglut, Pyhä-Luoston kansallispuiston vieressä.' }, img: '/images/venues/santas-hotel-aurora.webp' },
  { slug: 'lapland-hotels-luostotunturi', name: 'Lapland Hotels Luostotunturi', en: { region: 'Luosto, Sodankylä', desc: 'Hotel in the Luosto log village: Amethyst Spa, 500 m to the slopes, next to Pyhä-Luosto National Park.' }, fi: { region: 'Luosto, Sodankylä', desc: 'Hotelli Luoston hirsikylässä: Amethyst Spa, 500 m rinteille, Pyhä-Luoston kansallispuiston vieressä.' }, img: '/images/venues/lapland-hotels-luostotunturi.jpg' },
  { slug: 'nova-skyland', name: 'Nova Skyland Hotel', en: { region: 'Santa Claus Village', desc: 'Compact, modern boutique hotel in Santa Claus Village.' }, fi: { region: 'Joulupukin pajakylä', desc: 'Kompakti, moderni boutique-hotelli Joulupukin pajakylässä.' }, img: '/images/venues/nova-skyland.jpg' },
];

// Per-locale "X: Weddings" title pattern for locations.
//
// 🔴 The suffix carries its OWN leading separator and is concatenated with no
// space (`${name}${suffix}`). It used to be joined with a space, which produced
// "Rovaniemi : Hochzeit" — a spaced colon in the <title>, i.e.
// in the line Google prints in the result. Live 2026-08-14 on every locations
// and wedding-types route × 12 languages.
//
// Three different typographic rules live in this one table — do NOT normalise it:
//   • fr  — French puts a space BEFORE a colon. " : Mariages" is correct and must stay.
//   • ja / zh-CN — full-width "：" already contains its own spacing, so a preceding
//     space is wrong. These use the full-width character and no space.
//   • everything else — plain ": " with no space before.
const LOC_TITLE_SUFFIX = {
  en: ': Weddings',
  fi: ': Häät',
  de: ': Hochzeiten',
  ja: '：結婚式',
  es: ': Bodas',
  'pt-BR': ': Casamentos',
  'zh-CN': '：婚礼',
  ko: ': 결혼식',
  fr: ' : Mariages',
  it: ': Matrimoni',
  nl: ': Bruiloften',
  sv: ': Bröllop',
};

// Per-locale "X: Lapland Weddings" pattern for types.
// Same separator contract as LOC_TITLE_SUFFIX above — read that comment first.
const TYPE_TITLE_SUFFIX = {
  en: ': Lapland Weddings',
  fi: ': Häät Lapissa',
  de: ': Hochzeiten in Lappland',
  ja: '：ラップランドの結婚式',
  es: ': Bodas en Laponia',
  'pt-BR': ': Casamentos na Lapônia',
  'zh-CN': '：拉普兰婚礼',
  ko: ': 라플란드 결혼식',
  fr: ' : Mariages en Laponie',
  it: ': Matrimoni in Lapponia',
  nl: ': Bruiloften in Lapland',
  sv: ': Bröllop i Lappland',
};

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

function writeAll(canonical, byLang, image, noindex, schemaFor) {
  // byLang: { en: {title,desc}, fi:{...}, ... } — EN is required
  const enMeta = byLang.en;
  for (const L of LOCALES) {
    const meta = byLang[L.lang] || enMeta;
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
    schemaFor: path === '/' ? undefined : (L, m) => [
      breadcrumb(L, path, stripBrand(m.title)),
      path === '/practical-guide' ? faqPage(L) : null,
    ],
  });
}

/**
 * Join a route name to its section suffix.
 *
 * The suffix carries its own leading separator (": Weddings",
 * fr " : Mariages …", ja/zh full-width "：…"), so the default is a bare
 * concatenation.
 *
 * 🔴 Exception: some names already contain a colon of their own. `elopement` is
 * written as a name+subtitle pair in 7 locales — fi "Elopement Lapissa:
 * kahdestaan vihille", de "Elopement in Lappland: zu zweit zur Trauung", fr
 * "Elopement en Laponie : se marier à deux". Appending the section suffix to
 * those produced a THREE-part search-result line with two colons:
 *   "Elopement en Laponie : se marier à deux : Mariages en Laponie"
 * A name that already carries its own subtitle does not need the section word —
 * it is more specific than the section. So drop the suffix and keep only the
 * brand. Detects the full-width "：" too, or ja/zh would keep the double.
 */
const TITLE_SUFFIX_RE = /\s*[|—–·]\s*LaplandWeddings(?:\.online)?\s*$/i;
function shortenTitle(t) {
  if (!t || t.length <= 60) return t;
  const short = String(t).replace(TITLE_SUFFIX_RE, '').trim();
  return short.length >= 25 && short.length < t.length ? short : t;
}

function joinTitle(name, suffix) {
  if (/[:：]/.test(name)) return `${name}`;
  return `${name}${suffix}`;
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

// Locations: generate per-locale title from suffix table, desc falls back to EN
for (const l of locations) {
  const byLang = {};
  for (const L of LOCALES) {
    const nameSrc = i18n('locations', l.slug, L.lang, 'name', l);
    const descSrc = i18n('locations', l.slug, L.lang, 'desc', l);
    byLang[L.lang] = {
      title: joinTitle(nameSrc, LOC_TITLE_SUFFIX[L.lang]),
      description: longDesc('locations', l.slug, L.lang, descSrc),
    };
  }
  ROUTES.push({
    canonical: `/locations/${l.slug}`, byLang, image: l.img,
    schemaFor: (L, m) => [
      breadcrumb(L, `/locations/${l.slug}`, i18n('locations', l.slug, L.lang, 'name', l)),
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: i18n('locations', l.slug, L.lang, 'name', l),
        description: m.description,
        url: urlFor(L.prefix, `/locations/${l.slug}`),
        image: absImg(l.img),
        inLanguage: L.hreflang,
        containedInPlace: { '@type': 'Country', name: 'Finland' },
      },
    ],
  });
}

// Wedding types
for (const t of types) {
  const byLang = {};
  for (const L of LOCALES) {
    const nameSrc = i18n('types', t.slug, L.lang, 'name', t);
    const descSrc = i18n('types', t.slug, L.lang, 'desc', t);
    byLang[L.lang] = {
      title: joinTitle(nameSrc, TYPE_TITLE_SUFFIX[L.lang]),
      description: longDesc('types', t.slug, L.lang, descSrc),
    };
  }
  ROUTES.push({
    canonical: `/wedding-types/${t.slug}`, byLang, image: t.img,
    schemaFor: (L, m) => [
      breadcrumb(L, `/wedding-types/${t.slug}`, i18n('types', t.slug, L.lang, 'name', t)),
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
  for (const L of LOCALES) {
    const region = i18n('venues', v.slug, L.lang, 'region', v);
    const desc = i18n('venues', v.slug, L.lang, 'desc', v);
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
    canonical: `/venues/${v.slug}`, byLang, image: v.img,
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
          addressLocality: String(i18n('venues', v.slug, L.lang, 'region', v)).split('·')[0].trim(),
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
for (const r of ROUTES) writeAll(r.canonical, r.byLang, r.image, r.noindex, r.schemaFor);

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
