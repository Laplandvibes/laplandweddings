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
if (CB && !NETWORK) {
  console.warn('[prerender] WARN: shared/Footer.tsx linkkeja/labeleita ei voitu lukea — body-injektio ohitetaan');
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

// Top-level routes — { path: { <lang>: { title, description }, image } }
const top = {
  '/': {
    en: { title: 'Lapland Weddings 2026: Arctic Venues & Marriage Paperwork',
          description: 'The most complete Lapland wedding planning site. 21 venues, DVV marriage paperwork, real prices and practical guides for your Arctic wedding.' },
    fi: { title: 'Häät Lapissa 2026: hääpaikat ja DVV-paperit',
          description: 'Lapin kattavin häämatkasivu. 21 hääpaikkaa, DVV-paperit, oikeat hinnat ja käytännön oppaat Lapin häihisi.' },
    de: { title: 'Hochzeit in Lappland 2026: Locations & Heiratspapiere',
          description: 'Die umfassendste Seite für Hochzeiten in Lappland. 21 Hochzeitslocations, DVV-Unterlagen, echte Preise und praktische Leitfäden.' },
    ja: { title: 'ラップランドの結婚式2026：会場と婚姻手続き',
          description: 'ラップランドで最も充実した結婚式プランニングサイト。21か所の会場、DVV書類、実際の価格、実用的なガイド。' },
    es: { title: 'Bodas en Laponia 2026: lugares y trámites de boda',
          description: 'El sitio más completo de planificación de bodas en Laponia. 21 lugares, trámites DVV, precios reales y guías prácticas.' },
    'pt-BR': { title: 'Casamentos na Lapônia 2026: locais e documentação',
          description: 'O site mais completo de planejamento de casamentos na Lapônia. 21 locais, documentação DVV, preços reais e guias práticos.' },
    'zh-CN': { title: '拉普兰婚礼2026：婚礼场地与结婚手续',
          description: '最完整的拉普兰婚礼策划网站。21 个场地、DVV文件、真实价格和实用指南。' },
    ko: { title: '라플란드 결혼식 2026: 베뉴와 혼인 서류',
          description: '가장 충실한 라플란드 결혼식 기획 사이트입니다. 21곳의 예식장, DVV 서류, 실제 가격과 실용적인 가이드.' },
    fr: { title: 'Mariage en Laponie 2026: lieux et démarches de mariage',
          description: 'Le site le plus complet pour planifier un mariage en Laponie. 21 lieux, démarches DVV, prix réels et guides pratiques.' },
    it: { title: 'Matrimonio in Lapponia 2026: sedi e pratiche di nozze',
          description: 'Il sito più completo per pianificare il Vostro matrimonio in Lapponia. 21 location, pratiche DVV, prezzi reali e guide pratiche.' },
    nl: { title: 'Trouwen in Lapland 2026: locaties en huwelijkspapieren',
          description: 'De meest complete website voor het plannen van een bruiloft in Lapland. 21 locaties, DVV-papierwerk, echte prijzen en praktische gidsen.' },
    sv: { title: 'Bröllop i Lappland 2026: vigselplatser och äktenskapspapper',
          description: 'Lapplands mest kompletta sajt för bröllopsplanering. 21 vigselplatser, DVV-papper, verkliga priser och praktiska guider för ditt bröllop i Arktis.' },
    image: '/images/heroes/home-cover.jpg',
  },
  '/locations': {
    en: { title: 'Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings',
          description: 'Seven Lapland wedding regions plus city-option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare seasons, flights, and venues.' },
    fi: { title: 'Häät Lapin paikkakunnilla | LaplandWeddings',
          description: 'Seitsemän Lapin häämatkakohdetta ja kaupunkivaihtoehto Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Vertaile sesonkeja, lentoyhteyksiä ja venueita.' },
    de: { title: 'Hochzeitsregionen in Lappland | LaplandWeddings',
          description: 'Sieben Hochzeitsregionen in Lappland plus Großstadt-Option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Saisons, Flugverbindungen und Locations im Vergleich.' },
    ja: { title: 'ラップランドの結婚式地域：ロヴァニエミ、レヴィ、サーリセルカ、ウッラス | LaplandWeddings',
          description: 'ラップランドの7つの結婚式地域＋都市の選択肢オウル：ロヴァニエミ、サーリセルカ、レヴィ、ウッラス、ピュハ・ルオスト、キルピスヤルヴィ、ケミヤルヴィ、オウル。季節、フライト、会場を比較。' },
    es: { title: 'Regiones de boda en Laponia | LaplandWeddings',
          description: 'Siete regiones de boda en Laponia más la opción urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare temporadas, vuelos y lugares.' },
    'pt-BR': { title: 'Regiões de casamento na Lapônia | LaplandWeddings',
          description: 'Sete regiões de casamento na Lapônia mais a opção urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare estações, voos e locais.' },
    'zh-CN': { title: '拉普兰婚礼地区：罗瓦涅米、莱维、萨里塞尔卡、于拉斯 | LaplandWeddings',
          description: '拉普兰七大婚礼地区外加城市之选奥卢：罗瓦涅米、萨里塞尔卡、莱维、于拉斯、皮哈-卢奥斯托、基尔皮斯耶尔维、凯米耶尔维、奥卢。比较季节、航班和场地。' },
    ko: { title: '라플란드 결혼식 지역: 로바니에미, 레비, 사리셀카, 윌래스 | LaplandWeddings',
          description: '라플란드 결혼식 지역 7곳과 도시 옵션 오울루: 로바니에미, 사리셀카, 레비, 윌래스, 퓌해-루오스토, 킬피스얘르비, 오울루. 시즌, 항공편, 예식장을 비교합니다.' },
    fr: { title: 'Régions de mariage en Laponie | LaplandWeddings',
          description: 'Sept régions de mariage en Laponie plus Oulu, l’option urbaine : Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Comparez les saisons, vols et lieux.' },
    it: { title: 'Regioni per matrimoni in Lapponia | LaplandWeddings',
          description: 'Sette regioni per matrimoni in Lapponia più Oulu, l’opzione urbana: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Confronti stagioni, voli e location.' },
    nl: { title: 'Bruiloftsregio’s in Lapland | LaplandWeddings',
          description: 'Zeven bruiloftsregio’s in Lapland plus stadsoptie Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Vergelijk seizoenen, vluchten en locaties.' },
    sv: { title: 'Bröllopsregioner i Lappland | LaplandWeddings',
          description: 'Sju bröllopsregioner i Lappland plus stadsalternativet Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Jämför säsonger, flyg och vigselplatser.' },
    image: '/images/venues/apukka-resort.jpeg',
  },
  '/wedding-types': {
    en: { title: 'Lapland Wedding Types: Northern Lights, Snow Chapel, Glass Igloo | LaplandWeddings',
          description: 'Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.' },
    fi: { title: 'Häätyypit Lapissa | LaplandWeddings',
          description: 'Kuusi häätyyppiä Lapissa: revontuli, lumikappeli, lasi-iglu, keskiyön aurinko, elopement ja lupausten uusiminen.' },
    de: { title: 'Hochzeitsarten in Lappland | LaplandWeddings',
          description: 'Sechs Hochzeitsarten in Lappland: Polarlicht-Hochzeit, Schneekapelle, Glasiglu, Mitternachtssonne, Elopement und Erneuerung des Eheversprechens.' },
    ja: { title: 'ラップランドの結婚式タイプ：オーロラ、雪の礼拝堂、ガラスイグルー | LaplandWeddings',
          description: 'ラップランドの6つの結婚式タイプ:オーロラ、雪の礼拝堂、ガラスイグルー、白夜、エロープメント、誓いの更新。' },
    es: { title: 'Tipos de boda en Laponia | LaplandWeddings',
          description: 'Seis tipos de boda en Laponia: auroras boreales, capilla de nieve, iglú de cristal, sol de medianoche, fuga y renovación de votos.' },
    'pt-BR': { title: 'Tipos de casamento na Lapônia | LaplandWeddings',
          description: 'Seis tipos de casamento na Lapônia: aurora boreal, capela de neve, iglu de vidro, sol da meia-noite, elopement e renovação de votos.' },
    'zh-CN': { title: '拉普兰婚礼类型：北极光、雪教堂、玻璃冰屋 | LaplandWeddings',
          description: '拉普兰六种婚礼类型:北极光婚礼、雪教堂、玻璃冰屋、午夜阳光、私奔婚礼及婚誓更新。' },
    ko: { title: '라플란드 결혼식 유형: 오로라, 눈의 예배당, 글래스 이글루 | LaplandWeddings',
          description: '라플란드의 결혼식 유형 6가지: 오로라, 눈의 예배당, 글래스 이글루, 백야, 단출한 결혼, 서약 갱신.' },
    fr: { title: 'Types de mariage en Laponie | LaplandWeddings',
          description: 'Six types de mariage en Laponie : aurores boréales, chapelle de neige, igloo de verre, soleil de minuit, mariage à deux et renouvellement de vœux.' },
    it: { title: 'Tipi di matrimonio in Lapponia | LaplandWeddings',
          description: 'Sei tipi di matrimonio in Lapponia: aurora boreale, cappella di neve, igloo di vetro, sole di mezzanotte, fuga d’amore e rinnovo delle promesse.' },
    nl: { title: 'Bruiloftstypes in Lapland | LaplandWeddings',
          description: 'Zeven bruiloftstypes in Lapland: noorderlicht, sneeuwkapel, glaziglo, middernachtszon, eloperen en geloftehernieuwing.' },
    sv: { title: 'Bröllopstyper i Lappland | LaplandWeddings',
          description: 'Sex bröllopstyper i Lappland: norrsken, snökapell, glasigloo, midnattssol, rymningsbröllop och förnyade löften.' },
    image: '/images/heroes/home-cover.jpg',
  },
  '/venues': {
    en: { title: 'Lapland Wedding Venues: 21 venues | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 21 Lapland wedding venues across the regions.' },
    fi: { title: 'Hääpaikat Lapissa | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. 21 hääpaikkaa Lapin paikkakunnilla.' },
    de: { title: 'Hochzeitslocations in Lappland | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village und viele mehr. 21 Hochzeitslocations in Lappland.' },
    ja: { title: 'ラップランドの結婚式会場：21か所 | LaplandWeddings',
          description: 'カクスラウッタネン、ノーザンライツランチ、アークティックスノーホテル、スノービレッジなど。地域を横断する21か所の結婚式会場。' },
    es: { title: 'Lugares para bodas en Laponia | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village y muchos más. 21 lugares de boda en las regiones de Laponia.' },
    'pt-BR': { title: 'Locais para casamento na Lapônia | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e muitos outros. 21 locais de casamento nas regiões da Lapônia.' },
    'zh-CN': { title: '拉普兰婚礼场地：21 个场地 | LaplandWeddings',
          description: '卡克斯劳塔宁、北极光牧场、北极雪酒店、雪村等。覆盖各地区的21 个拉普兰婚礼场地。' },
    ko: { title: '라플란드 예식장: 21곳의 장소 | LaplandWeddings',
          description: '카크슬라우타넨, 노던 라이츠 랜치, 아크틱 스노우호텔, 스노우 빌리지 외. 라플란드 전역에 걸친 21곳의 예식장입니다.' },
    fr: { title: 'Lieux de mariage en Laponie | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village et bien d’autres. 21 lieux de mariage dans toute la Laponie.' },
    it: { title: 'Location di matrimonio in Lapponia | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e molte altre. 21 location di matrimonio nelle regioni della Lapponia.' },
    nl: { title: 'Bruiloftslocaties in Lapland | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village en meer. 21 bruiloftslocaties in heel Lapland.' },
    sv: { title: 'Bröllopsplatser i Lappland | LaplandWeddings',
          description: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village med flera. 21 bröllopsplatser i hela Lappland.' },
    image: '/images/venues/kakslauttanen.jpg',
  },
  '/photographers': {
    en: { title: 'Lapland Wedding Photographers: Maria Hedengren, Robin Goodlad et al. | LaplandWeddings',
          description: 'Six of the best Lapland wedding photographers. Northern Lights, snow chapels, glass igloos. Proven in the cold.' },
    fi: { title: 'Lapin hääjvalokuvaajat | LaplandWeddings',
          description: 'Kuusi Lapin parasta häävalokuvaajaa. Revontulet, lumikappelit, lasi-iglut. Testattu pakkasessa.' },
    de: { title: 'Hochzeitsfotografen in Lappland | LaplandWeddings',
          description: 'Sechs der besten Hochzeitsfotografen Lapplands. Polarlichter, Schneekapellen, Glasiglus. Erprobt in der Kälte.' },
    ja: { title: 'ラップランドの写真家：Maria Hedengren、Robin Goodlad | LaplandWeddings',
          description: 'ラップランドで活躍する6名のウェディングフォトグラファー。オーロラ、雪の礼拝堂、ガラスイグルー。極寒の地で実績あり。' },
    es: { title: 'Fotógrafos de bodas en Laponia | LaplandWeddings',
          description: 'Seis de los mejores fotógrafos de bodas en Laponia. Auroras boreales, capillas de nieve, iglús de cristal. Probados en el frío.' },
    'pt-BR': { title: 'Fotógrafos de casamento na Lapônia | LaplandWeddings',
          description: 'Seis dos melhores fotógrafos de casamento da Lapônia. Aurora boreal, capelas de neve, iglus de vidro. Testados no frio.' },
    'zh-CN': { title: '拉普兰婚礼摄影师：Maria Hedengren、Robin Goodlad 等 | LaplandWeddings',
          description: '拉普兰最佳婚礼摄影师中的六位。北极光、雪教堂、玻璃冰屋。在严寒中久经考验。' },
    ko: { title: '라플란드 사진작가: Maria Hedengren, Robin Goodlad | LaplandWeddings',
          description: '라플란드 최고의 웨딩 사진작가 6인. 오로라, 눈의 예배당, 글래스 이글루. 혹한 속에서 검증되었습니다.' },
    fr: { title: 'Photographes de mariage en Laponie | LaplandWeddings',
          description: 'Six des meilleurs photographes de mariage en Laponie. Aurores boréales, chapelles de neige, igloos de verre. Éprouvés par le froid.' },
    it: { title: 'Fotografi di matrimonio in Lapponia | LaplandWeddings',
          description: 'Sei dei migliori fotografi di matrimonio della Lapponia. Aurora boreale, cappelle di neve, igloo di vetro. Collaudati nel freddo.' },
    nl: { title: 'Bruiloftsfotografen in Lapland | LaplandWeddings',
          description: 'Zes van de beste bruiloftsfotografen in Lapland. Noorderlicht, sneeuwkapellen, glaziglo’s. Beproefd in de kou.' },
    sv: { title: 'Bröllopsfotografer i Lappland | LaplandWeddings',
          description: 'Sex av de bästa bröllopsfotograferna i Lappland. Norrsken, snökapell, glasigloor. Beprövade i kylan.' },
    image: '/images/types/elopement.jpg',
  },
  '/practical-guide': {
    en: { title: 'Getting Married in Lapland: DVV paperwork, officiant, practical guide | LaplandWeddings',
          description: 'Practical guide for foreign couples: DVV paperwork, examination of impediments (3–5 weeks), witnesses, officiant, home-country registration.' },
    fi: { title: 'Häät Lapissa | LaplandWeddings',
          description: 'Käytännön opas ulkomaalaisille pareille: DVV-paperit, esteiden tutkinta (3–5 vk), todistajat, vihkijä, kotimaan rekisteröinti.' },
    de: { title: 'Heiraten in Lappland | LaplandWeddings',
          description: 'Praktischer Leitfaden für ausländische Paare: DVV-Unterlagen, Ehefähigkeitsprüfung (3–5 Wochen), Trauzeugen, Trauredner, Registrierung im Heimatland.' },
    ja: { title: 'ラップランドで結婚：DVV書類、立会人、実用ガイド | LaplandWeddings',
          description: '外国人カップル向け実用ガイド:DVV書類、婚姻障害審査(3〜5週間)、証人、立会人、母国での登録。' },
    es: { title: 'Casarse en Laponia | LaplandWeddings',
          description: 'Guía práctica para parejas extranjeras: trámites DVV, examen de impedimentos (3–5 semanas), testigos, oficiante, registro en el país de origen.' },
    'pt-BR': { title: 'Casamento na Lapônia | LaplandWeddings',
          description: 'Guia prático para casais estrangeiros: documentação DVV, exame de impedimentos (3–5 semanas), testemunhas, celebrante, registro no país de origem.' },
    'zh-CN': { title: '在拉普兰结婚：DVV文件、主持人、实用指南 | LaplandWeddings',
          description: '为外国情侣编写的实用指南:DVV文件、婚姻障碍审查(3–5周)、证婚人、主持人、回国登记。' },
    ko: { title: '라플란드에서 결혼하기: DVV 서류, 주례, 실용 가이드 | LaplandWeddings',
          description: '외국인 커플을 위한 실용 가이드입니다: DVV 서류, 혼인 장애 조사(3~5주), 증인, 주례, 본국 등록.' },
    fr: { title: 'Se marier en Laponie | LaplandWeddings',
          description: 'Guide pratique pour les couples étrangers : démarches DVV, examen des empêchements (3 à 5 semaines), témoins, officiant, enregistrement dans le pays d’origine.' },
    it: { title: 'Sposarsi in Lapponia | LaplandWeddings',
          description: 'Guida pratica per coppie straniere: pratiche DVV, esame degli impedimenti (3–5 settimane), testimoni, celebrante, registrazione nel Paese di origine.' },
    nl: { title: 'Trouwen in Lapland | LaplandWeddings',
          description: 'Praktische gids voor buitenlandse paren: DVV-papierwerk, onderzoek naar huwelijksbeletselen (3–5 weken), getuigen, ambtenaar, registratie in het thuisland.' },
    sv: { title: 'Gifta sig i Lappland | LaplandWeddings',
          description: 'Praktisk guide för utländska par: DVV-papper, hindersprövning (3–5 veckor), vittnen, vigselförrättare och registrering i hemlandet.' },
    image: '/images/venues/wilderness-hotel-inari.jpg',
  },
  '/pricing': {
    en: { title: 'Lapland Wedding Costs: from EUR 5,000 | LaplandWeddings',
          description: 'What does a wedding in Lapland cost? Our smallest budget is EUR 5,000. What that covers, what pushes the number up, and price ranges for each part of the day.' },
    fi: { title: 'Häiden hinta Lapissa: alkaen 5 000 € | LaplandWeddings',
          description: 'Mitä häät Lapissa maksavat? Pienin budjettimme on 5 000 €. Mitä se kattaa, mikä summaa nostaa ja hintahaarukat päivän jokaiselle osalle.' },
    de: { title: 'Hochzeitskosten in Lappland: ab 5 000 € | LaplandWeddings',
          description: 'Was kostet eine Hochzeit in Lappland? Unser kleinstes Budget sind 5 000 €. Was darin enthalten ist, was die Summe erhöht, und Preisspannen für jeden Teil des Tages.' },
    ja: { title: 'ラップランドの結婚式費用：5,000ユーロから | LaplandWeddings',
          description: 'ラップランドの結婚式はいくら？当サイトが承る最小のご予算は5,000ユーロです。その内訳、費用が上がる要因、そして各項目の価格帯をご紹介します。' },
    es: { title: 'Coste de una boda en Laponia: desde 5 000 € | LaplandWeddings',
          description: '¿Cuánto cuesta una boda en Laponia? Nuestro presupuesto mínimo son 5 000 €. Qué incluye, qué eleva la cifra y rangos de precio para cada parte del día.' },
    'pt-BR': { title: 'Custo de casamento na Lapônia: a partir de € 5.000 | LaplandWeddings',
          description: 'Quanto custa um casamento na Lapônia? Nosso orçamento mínimo é de € 5.000. O que ele cobre, o que aumenta o valor e faixas de preço para cada parte do dia.' },
    'zh-CN': { title: '拉普兰婚礼费用：5,000 欧元起 | LaplandWeddings',
          description: '在拉普兰办婚礼要花多少钱？我们承接的最低预算为 5,000 欧元。本页说明这笔预算涵盖什么、哪些因素会推高费用，以及当天各项开支的价格区间。' },
    ko: { title: '라플란드 결혼식 비용: 5,000유로부터 | LaplandWeddings',
          description: '라플란드 결혼식 비용은 얼마일까요? 저희가 진행하는 최소 예산은 5,000유로입니다. 그 안에 무엇이 포함되는지, 무엇이 금액을 높이는지, 그리고 항목별 가격대를 정리했습니다.' },
    fr: { title: 'Coût d’un mariage en Laponie : à partir de 5 000 € | LaplandWeddings',
          description: 'Combien coûte un mariage en Laponie ? Notre budget minimum est de 5 000 €. Ce qu’il couvre, ce qui fait grimper le chiffre, et les fourchettes de prix pour chaque poste.' },
    it: { title: 'Costi matrimonio in Lapponia: da 5 000 € | LaplandWeddings',
          description: 'Quanto costa un matrimonio in Lapponia? Il nostro budget minimo è di 5 000 €. Cosa comprende, cosa fa salire la cifra e le fasce di prezzo per ogni voce.' },
    nl: { title: 'Bruiloftskosten in Lapland: vanaf € 5.000 | LaplandWeddings',
          description: 'Wat kost een bruiloft in Lapland? Ons kleinste budget is € 5.000. Wat dat dekt, wat het bedrag omhoog duwt en prijsranges voor elk onderdeel van de dag.' },
    sv: { title: 'Bröllopskostnader i Lappland: från 5 000 € | LaplandWeddings',
          description: 'Vad kostar ett bröllop i Lappland? Vår minsta budget är 5 000 €. Vad den täcker, vad som driver upp summan och prisintervall för varje del av dagen.' },
   image: '/images/venues/lapland-hotels-saaga.jpg',
  },
  '/checklist/dvv-foreign-couples': {
    en: { title: 'DVV Wedding Checklist for Foreign Couples (printable PDF) | LaplandWeddings',
          description: 'A one-page DVV marriage-licence checklist for foreign couples planning a wedding in Finnish Lapland. Print or save as PDF.' },
    fi: { title: 'DVV-tarkistuslista: vihille Lapissa | LaplandWeddings',
          description: 'Yksisivuinen DVV-tarkistuslista ulkomaalaiselle pareille jotka aikovat vihille Suomen Lapissa. Printtaa tai tallenna PDF:nä.' },
    de: { title: 'DVV-Checkliste für ausländische Paare | LaplandWeddings',
          description: 'Einseitige DVV-Checkliste zur Heiratserlaubnis für ausländische Paare, die in Finnisch-Lappland heiraten. Drucken oder als PDF speichern.' },
    ja: { title: '外国人カップル向けDVV結婚式チェックリスト(印刷可PDF) | LaplandWeddings',
          description: 'フィンランドのラップランドで結婚を計画する外国人カップルのための1ページDVV婚姻許可チェックリスト。印刷またはPDF保存。' },
    es: { title: 'Lista DVV para parejas extranjeras | LaplandWeddings',
          description: 'Lista de comprobación DVV de una página para parejas extranjeras que planifican su boda en la Laponia finlandesa. Imprima o guarde en PDF.' },
    'pt-BR': { title: 'Checklist DVV para casais estrangeiros | LaplandWeddings',
          description: 'Checklist DVV de uma página para casais estrangeiros que planejam o casamento na Lapônia finlandesa. Imprima ou salve em PDF.' },
    'zh-CN': { title: '外国情侣DVV婚礼清单(可打印PDF) | LaplandWeddings',
          description: '为计划在芬兰拉普兰举行婚礼的外国情侣准备的一页式DVV结婚证清单。可打印或另存为PDF。' },
    ko: { title: '외국인 커플을 위한 DVV 결혼식 체크리스트 (인쇄용 PDF) | LaplandWeddings',
          description: '핀란드 라플란드에서 결혼식을 계획하는 외국인 커플을 위한 한 페이지 분량의 DVV 혼인 허가 체크리스트. 인쇄하거나 PDF로 저장하실 수 있습니다.' },
    fr: { title: 'Liste DVV pour couples étrangers | LaplandWeddings',
          description: 'Liste de contrôle DVV d’une page pour les couples étrangers qui planifient un mariage en Laponie finlandaise. Imprimez ou enregistrez en PDF.' },
    it: { title: 'Checklist DVV per coppie straniere | LaplandWeddings',
          description: 'Checklist DVV di una pagina per coppie straniere che pianificano il matrimonio nella Lapponia finlandese. Stampi o salvi in PDF.' },
    nl: { title: 'DVV-checklist voor buitenlandse paren | LaplandWeddings',
          description: 'Eenzijdige DVV-checklist voor het huwelijksvergunning voor buitenlandse paren die in Fins Lapland willen trouwen. Print of bewaar als PDF.' },
    sv: { title: 'DVV-checklista för utländska par | LaplandWeddings',
          description: 'En ensidig DVV-checklista för hindersprövning för utländska par som planerar bröllop i finska Lappland. Skriv ut eller spara som PDF.' },
    image: '/images/venues/wilderness-hotel-inari.jpg',
  },
  '/privacy': {
    en: { title: 'Privacy | LaplandWeddings', description: 'Privacy policy for laplandweddings.online: how we handle enquiry data and analytics.' },
    fi: { title: 'Tietosuoja | LaplandWeddings', description: 'Tietosuojaseloste laplandweddings.online: miten käsittelemme tiedustelutietoja ja analytiikkaa.' },
    de: { title: 'Datenschutz | LaplandWeddings', description: 'Datenschutzerklärung für laplandweddings.online: wie wir Anfragedaten und Analytik handhaben.' },
    ja: { title: 'プライバシー | LaplandWeddings', description: 'laplandweddings.online のプライバシーポリシー：お問い合わせデータと分析の取り扱いについて。' },
    es: { title: 'Privacidad | LaplandWeddings', description: 'Política de privacidad de laplandweddings.online: cómo tratamos los datos de consulta y la analítica.' },
    'pt-BR': { title: 'Privacidade | LaplandWeddings', description: 'Política de privacidade de laplandweddings.online: como tratamos os dados de consulta e a analítica.' },
    'zh-CN': { title: '隐私政策 | LaplandWeddings', description: 'laplandweddings.online 的隐私政策：我们如何处理咨询数据和分析。' },
    ko: { title: '개인정보 처리방침 | LaplandWeddings', description: 'laplandweddings.online 개인정보 처리방침: 문의 데이터와 분석을 어떻게 다루는지 설명합니다.' },
    fr: { title: 'Confidentialité | LaplandWeddings', description: 'Politique de confidentialité de laplandweddings.online: comment nous traitons les données de demande et l’analytique.' },
    it: { title: 'Privacy | LaplandWeddings', description: 'Informativa sulla privacy di laplandweddings.online: come trattiamo i dati delle richieste e l’analitica.' },
    nl: { title: 'Privacy | LaplandWeddings', description: 'Privacybeleid voor laplandweddings.online: hoe wij omgaan met aanvraaggegevens en analyses.' },
    sv: { title: 'Integritetspolicy | LaplandWeddings', description: 'Integritetspolicy för laplandweddings.online: hur vi hanterar förfrågningsdata och analys.' },
    image: '/images/heroes/home-cover.jpg',
  },
  '/terms': {
    en: { title: 'Terms of Use | LaplandWeddings', description: 'Terms of use for laplandweddings.online.' },
    fi: { title: 'Käyttöehdot | LaplandWeddings', description: 'Käyttöehdot: laplandweddings.online.' },
    de: { title: 'Nutzungsbedingungen | LaplandWeddings', description: 'Nutzungsbedingungen für laplandweddings.online.' },
    ja: { title: '利用規約 | LaplandWeddings', description: 'laplandweddings.online の利用規約。' },
    es: { title: 'Términos de uso | LaplandWeddings', description: 'Términos de uso de laplandweddings.online.' },
    'pt-BR': { title: 'Termos de uso | LaplandWeddings', description: 'Termos de uso de laplandweddings.online.' },
    'zh-CN': { title: '使用条款 | LaplandWeddings', description: 'laplandweddings.online 的使用条款。' },
    ko: { title: '이용약관 | LaplandWeddings', description: 'laplandweddings.online 이용약관입니다.' },
    fr: { title: 'Conditions d’utilisation | LaplandWeddings', description: 'Conditions d’utilisation de laplandweddings.online.' },
    it: { title: 'Condizioni d’uso | LaplandWeddings', description: 'Condizioni d’uso di laplandweddings.online.' },
    nl: { title: 'Gebruiksvoorwaarden | LaplandWeddings', description: 'Gebruiksvoorwaarden van laplandweddings.online.' },
    sv: { title: 'Användarvillkor | LaplandWeddings', description: 'Användarvillkor för laplandweddings.online.' },
    image: '/images/heroes/home-cover.jpg',
  },
  '/cookie-policy': {
    en: { title: 'Cookie Policy | LaplandWeddings', description: 'Cookie policy for laplandweddings.online.' },
    fi: { title: 'Evästekäytäntö | LaplandWeddings', description: 'Evästekäytäntö: laplandweddings.online.' },
    de: { title: 'Cookie-Richtlinie | LaplandWeddings', description: 'Cookie-Richtlinie für laplandweddings.online.' },
    ja: { title: 'クッキーポリシー | LaplandWeddings', description: 'laplandweddings.online のクッキーポリシー。' },
    es: { title: 'Política de cookies | LaplandWeddings', description: 'Política de cookies de laplandweddings.online.' },
    'pt-BR': { title: 'Política de cookies | LaplandWeddings', description: 'Política de cookies de laplandweddings.online.' },
    'zh-CN': { title: 'Cookie 政策 | LaplandWeddings', description: 'laplandweddings.online 的 Cookie 政策。' },
    ko: { title: '쿠키 정책 | LaplandWeddings', description: 'laplandweddings.online 쿠키 정책입니다.' },
    fr: { title: 'Politique relative aux cookies | LaplandWeddings', description: 'Politique relative aux cookies de laplandweddings.online.' },
    it: { title: 'Politica sui cookie | LaplandWeddings', description: 'Politica sui cookie di laplandweddings.online.' },
    nl: { title: 'Cookiebeleid | LaplandWeddings', description: 'Cookiebeleid van laplandweddings.online.' },
    sv: { title: 'Cookiepolicy | LaplandWeddings', description: 'Cookiepolicy för laplandweddings.online.' },
    image: '/images/heroes/home-cover.jpg',
  },
};

const locations = [
  { slug: 'rovaniemi', en: { name: 'Rovaniemi', desc: 'The capital of Lapland, easiest to reach via international flights. Wedding venues from ice chapel to glass igloos near Santa Claus Village.' }, fi: { name: 'Rovaniemi', desc: 'Lapin pääkaupunki, helpoin saavuttaa kansainvälisen lennon kautta. Hääpaikkoja jääkappelista lasi-igluihin Joulupukin pajakylän tuntumassa.' }, img: '/images/venues/arctic-treehouse.jpg' },
  { slug: 'saariselka', en: { name: 'Saariselkä & Inari', desc: 'The heart of Northern Lapland: aurora on average every other night (FMI) and Kakslauttanen’s glass teepee chapel.' }, fi: { name: 'Saariselkä & Inari', desc: 'Pohjois-Lapin sydän: revontulia keskimäärin joka toisena yönä (IL) ja Kakslauttasen lasi-teepee-kappeli.' }, img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'levi', en: { name: 'Levi & Kittilä', desc: 'Finland’s largest fell resort: Lainio Snow Village, Northern Lights Ranch Snow Chapel, direct flights from London.' }, fi: { name: 'Levi & Kittilä', desc: 'Suomen suurin tunturikeskus: Lainion lumikylä, Northern Lights Ranchin lumikappeli, suorat lennot Lontoosta.' }, img: '/images/venues/northern-lights-ranch.webp' },
  { slug: 'yllas', en: { name: 'Ylläs', desc: 'Quieter than Levi: Lapland’s cleanest air, Saaga’s wedding-friendly spa hotel, easy reach to Lainio Snow Village.' }, fi: { name: 'Ylläs', desc: 'Levin hiljaisempi naapuri: Lapin puhtainta ilmaa, Saagan häihin sopiva spa-hotelli, lyhyt matka Lainion lumikylään.' }, img: '/images/venues/lapland-hotels-saaga.jpg' },
  { slug: 'pyha-luosto', en: { name: 'Pyhä-Luosto', desc: 'The quieter side of eastern Lapland: two hotels in the Luosto log village on the edge of Pyhä-Luosto National Park.' }, fi: { name: 'Pyhä-Luosto', desc: 'Itä-Lapin hiljaisempi puoli: kaksi hotellia Luoston hirsikylässä Pyhä-Luoston kansallispuiston laidalla.' }, img: '/images/locations/pyha-luosto.jpg' },
  { slug: 'kilpisjarvi', en: { name: 'Kilpisjärvi', desc: 'Finland’s northernmost and highest point: Tundrea’s glass igloos and the three-country border ceremony.' }, fi: { name: 'Kilpisjärvi', desc: 'Suomen pohjoisin ja korkein paikka: Tundrean lasi-iglut ja kolmen valtakunnan rajavihkiminen.' }, img: '/images/venues/tundrea-kilpisjarvi.jpg' },
  { slug: 'oulu', en: { name: 'Oulu', desc: 'The big-city option on the way to Lapland, Finland’s fifth-largest city on the Bothnian Bay coast. City wedding nights with restaurants and nightlife, direct flights from Helsinki in about an hour.' }, fi: { name: 'Oulu', desc: 'Kaupunkivaihtoehto matkalla Lappiin, Suomen viidenneksi suurin kaupunki Perämeren rannalla. Kaupunkimainen hääilta ravintoloineen ja yöelämineen, suorat lennot Helsingistä noin tunnissa.' }, img: '/images/locations/oulu.jpg' },
  // No `img`: Kemijärvi has no photo of its own yet, and the site falls back to
  // the default OG image rather than borrowing another region's picture.
  { slug: 'kemijarvi', en: { name: 'Kemijärvi', desc: 'Finland’s northernmost town, in eastern Lapland: a centre wrapped in lake, 7,029 residents, and a direct train from Helsinki. Five fells within driving distance.' }, fi: { name: 'Kemijärvi', desc: 'Suomen pohjoisin kaupunki Itä-Lapissa: järven ympäröimä keskusta, 7 029 asukasta ja suora junayhteys Helsingistä. Viisi tunturia ajomatkan päässä.' } },
];

const types = [
  { slug: 'northern-lights', en: { name: 'Northern Lights Wedding', desc: 'Exchange vows under the aurora borealis: Northern Lapland sees aurora on average every other night (FMI).' }, fi: { name: 'Revontulihäät', desc: 'Vihkiminen revontulien alla: Pohjois-Lapissa revontulia nähdään keskimäärin joka toisena yönä (IL).' }, img: '/images/types/northern-lights.jpg' },
  { slug: 'snow-chapel', en: { name: 'Snow Chapel Wedding', desc: 'Marry in a chapel carved from pure snow and ice: Lainio, Northern Lights Ranch, Arctic SnowHotel and Levi Ice Castle.' }, fi: { name: 'Lumikappelihäät', desc: 'Vihille puhtaaksi veistetyssä lumi- tai jääkappelissa: Lainio, Northern Lights Ranch, Arctic SnowHotel ja Levin jäälinna.' }, img: '/images/types/snow-chapel.jpg' },
  { slug: 'glass-igloo', en: { name: 'Glass Igloo Wedding', desc: 'Wedding night beneath the Northern Lights in a heated glass dome: Kakslauttanen, Levin Iglut, Apukka.' }, fi: { name: 'Lasi-iglu-häät', desc: 'Hääyö revontulien alla lämpöisessä lasikuvussa: Kakslauttanen, Levin Iglut, Apukka.' }, img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'midnight-sun', en: { name: 'Midnight Sun Wedding', desc: 'Marry when the sun never sets: May 23 to July 24, warm weather, no snow gear needed.' }, fi: { name: 'Keskiyön auringon häät', desc: 'Vihille kun aurinko ei laske: 23.5.–24.7., lämmin sää, ei lumipukuja.' }, img: '/images/types/midnight-sun.jpg' },
  { slug: 'elopement', en: { name: 'Lapland Elopement', desc: 'Just the two of you, the officiant and a photographer. Turnkey packages from €1 600.' }, fi: { name: 'Elopement Lapissa: kahdestaan vihille', desc: 'Pelkästään te kaksi, vihkijä ja valokuvaaja. Avaimet käteen -paketit 1 600 €:sta.' }, img: '/images/types/elopement.jpg' },
  { slug: 'vow-renewal', en: { name: 'Vow Renewal in Lapland', desc: 'Renew your vows in the Lapland snow: no paperwork, fully bespoke ceremony.' }, fi: { name: 'Lupausten uusiminen Lapissa', desc: 'Uudistakaa lupauksenne Lapin lumessa: ei papereita, täysin räätälöity seremonia.' }, img: '/images/types/vow-renewal.jpg' },
];

const venues = [
  { slug: 'kakslauttanen', name: 'Kakslauttanen Arctic Resort', en: { region: 'Saariselkä', desc: 'Finland’s most famous glass igloo resort. Glass Teepee chapel, ice chapel, log chapel, and 250-guest Celebration House.' }, fi: { region: 'Saariselkä', desc: 'Suomen kuuluisin lasi-iglu-resortti. Glass Teepee -kappeli, jääkappeli, hirsikappeli ja 250 hengen Celebration House.' }, img: '/images/venues/kakslauttanen.jpg' },
  { slug: 'arctic-snowhotel', name: 'Arctic SnowHotel & Glass Igloos', en: { region: 'Lehtojärvi · 35 km from Rovaniemi', desc: 'Snow Hotel with ice chapel for 30 guests, ice restaurant, and glass igloos with 360° aurora view.' }, fi: { region: 'Lehtojärvi · 35 km Rovaniemestä', desc: 'Snow Hotel jossa jääkappeli 30 vieraalle, jääravintola ja lasi-iglut 360°-revontulinäkymällä.' }, img: '/images/venues/arctic-snowhotel.jpg' },
  { slug: 'snow-village-lainio', name: 'Lapland Hotels SnowVillage (Lainio)', en: { region: 'Lainio, Kittilä', desc: 'World-famous Snow Village rebuilt every winter with new artistic theme. Ice chapel, wooden chapel, snow suites.' }, fi: { region: 'Lainio, Kittilä', desc: 'Maailmankuulu Snow Village, uusi taideteema joka talvi. Jääkappeli, puukappeli, snow suiteja.' }, img: '/images/venues/snow-village-lainio.jpg' },
  { slug: 'northern-lights-ranch', name: 'Northern Lights Ranch', en: { region: 'Köngäs · 15 min from Levi', desc: 'Premium luxury resort with glass-walled cabins and a Snow Chapel for 60 guests.' }, fi: { region: 'Köngäs · 15 min Levistä', desc: 'Premium-luksusresortti lasiseinämökeillä ja 60 hengen lumikappelilla.' }, img: '/images/venues/northern-lights-ranch.webp' },
  { slug: 'levi-ice-castle', name: 'Levi Ice Castle', en: { region: 'Levi · 7 km from centre', desc: 'Levi’s own ice castle with chapel, bar and ice suites. Walls and seats from crystal-clear ice.' }, fi: { region: 'Levi · 7 km keskustasta', desc: 'Levin oma jäälinna kappelin, baarin ja jääsviittien kanssa. Seinät ja istuimet kristallinkirkkaasta jäästä.' }, img: '/images/venues/levi-ice-castle.jpg' },
  { slug: 'levin-iglut', name: 'Levin Iglut · Golden Crown', en: { region: 'Levi · on top of the fell', desc: 'Glass igloos on top of the Levi fell: Lapland’s best aurora viewing angle, Suite igloos for couples.' }, fi: { region: 'Levi · tunturin huipulla', desc: 'Lasi-iglut Levitunturin huipulla: Lapin paras revontulinkulma, Suite-iglut pareille.' }, img: '/images/venues/levin-iglut.jpg' },
  { slug: 'apukka-resort', name: 'Apukka Resort', en: { region: 'Apukka · 15 min from Santa Claus Village', desc: 'Resort by Lake Apukka with Aurora Cabins, two-storey Kammi igloo, Aitta and Kota restaurants.' }, fi: { region: 'Apukka · 15 min Joulupukin pajakylästä', desc: 'Resort Apukka-järven rannalla: Aurora Cabins, kaksikerroksinen Kammi-iglu, Aitta- ja Kota-ravintolat.' }, img: '/images/venues/apukka-resort.jpeg' },
  { slug: 'arctic-treehouse', name: 'Arctic TreeHouse Hotel', en: { region: 'SantaPark · 2 km from airport', desc: 'Modern tree-top cabins with glass walls: best logistics in Lapland, 2 km from Rovaniemi airport.' }, fi: { region: 'SantaPark · 2 km lentokentältä', desc: 'Modernit puumajat lasiseinin: Lapin paras logistiikka, 2 km Rovaniemen lentokentältä.' }, img: '/images/venues/arctic-treehouse.jpg' },
  { slug: 'wilderness-hotel-muotka', name: 'Wilderness Hotel Muotka', en: { region: 'Muotka · edge of UKK National Park', desc: 'Zero light pollution: one of Lapland’s best aurora locations. Aurora Cabins and Kammi cabin.' }, fi: { region: 'Muotka · UKK-puiston laidalla', desc: 'Ei valosaastetta: Lapin parhaita revontulipaikkoja. Aurora Cabins ja Kammi-mökki.' }, img: '/images/venues/wilderness-hotel-muotka.jpg' },
  { slug: 'wilderness-hotel-inari', name: 'Wilderness Hotel Inari', en: { region: 'On the shore of Lake Inari', desc: 'On Lake Inari shore in the heart of Sámi culture. Aurora cabins with direct lake horizon view.' }, fi: { region: 'Inarinjärven rannalla', desc: 'Inarinjärven rannalla, saamelaiskulttuurin sydämessä. Aurora-mökit suoraan järven horisonttiin.' }, img: '/images/venues/wilderness-hotel-inari.jpg' },
  { slug: 'wilderness-hotel-juutua', name: 'Wilderness Hotel Juutua', en: { region: 'Inari · in the centre', desc: 'Newest Wilderness Hotels venue (2022). Aanaar Restaurant in central Inari, walking distance to lake.' }, fi: { region: 'Inarin keskustassa', desc: 'Uusin Wilderness Hotels -kohde (2022). Aanaar-ravintola Inarin keskustassa, käveletellen järvelle.' }, img: '/images/venues/wilderness-hotel-juutua.jpg' },
  { slug: 'northern-lights-village-saariselka', name: 'Northern Lights Village Saariselkä', en: { region: 'Central Saariselkä', desc: '80 Aurora Cabins and 20 Polar Sky Suites with glass roofs in central Saariselkä.' }, fi: { region: 'Saariselän keskustassa', desc: '80 Aurora-mökkiä ja 20 Polar Sky -sviittiä lasikatolla Saariselän keskustassa.' }, img: '/images/venues/northern-lights-village-saariselka.jpg' },
  { slug: 'northern-lights-village-levi', name: 'Northern Lights Village Levi', en: { region: 'Sirkka, Levi', desc: 'NLV style near Levi services: Aurora Cabins, 5 min to Levi centre.' }, fi: { region: 'Sirkka, Levi', desc: 'NLV-tyyli Levin palveluiden lähellä: Aurora-mökit, 5 min Levin keskustaan.' }, img: '/images/venues/northern-lights-village-levi.jpg' },
  { slug: 'hotelli-hullu-poro', name: 'Hotelli Hullu Poro', en: { region: 'Central Levi', desc: 'Levi’s central hotel and restaurant complex with 200-guest banquet hall and 4 restaurants.' }, fi: { region: 'Levin keskustassa', desc: 'Levin keskeinen hotelli- ja ravintolakompleksi: 200 hengen juhlasali ja 4 ravintolaa.' }, img: '/images/venues/hotelli-hullu-poro.jpg' },
  { slug: 'levi-panorama', name: 'Hotel Levi Panorama', en: { region: 'On Levi fell summit', desc: 'Lapland Hotels flagship on Levi fell summit. Panorama windows, gondola access.' }, fi: { region: 'Levitunturin huipulla', desc: 'Lapland Hotels -lippulaiva Levitunturin huipulla. Panoraamaikkunat, gondolihissi.' }, img: '/images/venues/levi-panorama.jpg' },
  { slug: 'lapland-hotels-saaga', name: 'Lapland Hotels Saaga', en: { region: 'Ylläsjärvi', desc: 'TripAdvisor-favourite wedding hotel in Ylläs. Spa, three restaurants, hot tubs.' }, fi: { region: 'Ylläsjärvi', desc: 'TripAdvisorin suosima häähotelli Ylläksellä. Spa, kolme ravintolaa, hot tubit.' }, img: '/images/venues/lapland-hotels-saaga.jpg' },
  { slug: 'tundrea-kilpisjarvi', name: 'Tundrea Kilpisjärvi', en: { region: 'Kilpisjärvi', desc: 'Finland’s northernmost glass igloo resort, 480 m above sea level: best aurora view in Lapland.' }, fi: { region: 'Kilpisjärvi', desc: 'Suomen pohjoisin lasi-iglu-resortti, 480 m mpy: Lapin paras revontulinäkymä.' }, img: '/images/venues/tundrea-kilpisjarvi.jpg' },
  { slug: 'santas-hotel-aurora', name: "Santa's Hotel Aurora", en: { region: 'Luosto, Sodankylä', desc: 'Boutique hotel in the centre of Luosto: a private sauna in every room, glass igloos, beside Pyhä-Luosto National Park.' }, fi: { region: 'Luosto, Sodankylä', desc: 'Butiikkihotelli Luoston keskustassa: oma sauna joka huoneessa, lasi-iglut, Pyhä-Luoston kansallispuiston vieressä.' }, img: '/images/venues/santas-hotel-aurora.webp' },
  { slug: 'lapland-hotels-luostotunturi', name: 'Lapland Hotels Luostotunturi', en: { region: 'Luosto, Sodankylä', desc: 'Hotel in the Luosto log village: Amethyst Spa, 500 m to the slopes, next to Pyhä-Luosto National Park.' }, fi: { region: 'Luosto, Sodankylä', desc: 'Hotelli Luoston hirsikylässä: Amethyst Spa, 500 m rinteille, Pyhä-Luoston kansallispuiston vieressä.' }, img: '/images/venues/lapland-hotels-luostotunturi.jpg' },
  { slug: 'santas-hotel-santamus', name: "Santa's Hotel Santamus", en: { region: 'Santa Claus Village', desc: 'The only Santa Claus Village hotel designed for weddings. Reindeer and husky packages included.' }, fi: { region: 'Joulupukin pajakylä', desc: 'Joulupukin pajakylän ainoa häihin suunniteltu hotelli. Poro- ja husky-paketit mukana.' }, img: '/images/venues/santas-hotel-santamus.png' },
  { slug: 'nova-skyland', name: 'Nova Skyland Hotel', en: { region: 'Santa Claus Village', desc: 'Compact, modern boutique hotel in Santa Claus Village.' }, fi: { region: 'Joulupukin pajakylä', desc: 'Kompakti, moderni boutique-hotelli Joulupukin pajakylässä.' }, img: '/images/venues/nova-skyland.jpg' },
];

// Per-locale "X: Weddings | LaplandWeddings" title pattern for locations.
//
// 🔴 The suffix carries its OWN leading separator and is concatenated with no
// space (`${name}${suffix}`). It used to be joined with a space, which produced
// "Rovaniemi : Hochzeit | LaplandWeddings" — a spaced colon in the <title>, i.e.
// in the line Google prints in the result. Live 2026-08-14 on every locations
// and wedding-types route × 12 languages.
//
// Three different typographic rules live in this one table — do NOT normalise it:
//   • fr  — French puts a space BEFORE a colon. " : Mariages" is correct and must stay.
//   • ja / zh-CN — full-width "：" already contains its own spacing, so a preceding
//     space is wrong. These use the full-width character and no space.
//   • everything else — plain ": " with no space before.
const LOC_TITLE_SUFFIX = {
  en: ': Weddings | LaplandWeddings',
  fi: ': Häät | LaplandWeddings',
  de: ': Hochzeit | LaplandWeddings',
  ja: '：結婚式 | LaplandWeddings',
  es: ': Bodas | LaplandWeddings',
  'pt-BR': ': Casamentos | LaplandWeddings',
  'zh-CN': '：婚礼 | LaplandWeddings',
  ko: ': 결혼식 | LaplandWeddings',
  fr: ' : Mariages | LaplandWeddings',
  it: ': Matrimoni | LaplandWeddings',
  nl: ': Bruiloften | LaplandWeddings',
  sv: ': Bröllop | LaplandWeddings',
};

// Per-locale "X: Lapland Weddings | LaplandWeddings" pattern for types.
// Same separator contract as LOC_TITLE_SUFFIX above — read that comment first.
const TYPE_TITLE_SUFFIX = {
  en: ': Lapland Weddings | LaplandWeddings',
  fi: ': Häät Lapissa | LaplandWeddings',
  de: ': Hochzeit in Lappland | LaplandWeddings',
  ja: '：ラップランドの結婚式 | LaplandWeddings',
  es: ': Bodas en Laponia | LaplandWeddings',
  'pt-BR': ': Casamentos na Lapônia | LaplandWeddings',
  'zh-CN': '：拉普兰婚礼 | LaplandWeddings',
  ko: ': 라플란드 결혼식 | LaplandWeddings',
  fr: ' : Mariages en Laponie | LaplandWeddings',
  it: ': Matrimoni in Lapponia | LaplandWeddings',
  nl: ': Bruiloften in Lapland | LaplandWeddings',
  sv: ': Bröllop i Lappland | LaplandWeddings',
};

function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

function urlFor(prefix, canonical) {
  // Trailing-slash form: the prerendered file lives at /path/index.html and
  // Cloudflare Pages serves it at /path/ with 200 (the no-slash form 308-redirects).
  if (canonical === '/') return SITE + (prefix || '') + '/';
  return (SITE + prefix + canonical).replace(/\/?$/, '/');
}

function patchHtml({ lang, title, description, image, canonical, ogLocaleStr, noindex }) {
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
  // title is `<Venue>: <Region> | LaplandWeddings` where the first half is already
  // two proper nouns. Dropping OUR OWN brand suffix loses nothing (the site name
  // still ships in og:site_name and the breadcrumb), while keeping the venue and
  // region visible in the SERP. Only the suffix goes: a title that is still long
  // without it is content, and content stays. Same rule as the shared
  // _prerender_routes.mjs shortenTitle().
  title = shortenTitle(title);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  out = out.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttr(description)}" />`);

  const og = image;
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
    `<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}" />`,
    ...(noindex ? [] : [`<link rel="canonical" href="${currentUrl}" />`]),
    ...(noindex ? [] : hreflangTags),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="LaplandWeddings" />`,
    `<meta property="og:url" content="${currentUrl}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:locale" content="${ogLocaleStr}" />`,
    ...altOgLocales,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
  ].map((l) => '    ' + l).join('\n');

  out = out.replace(/<\/head>/, `${extra}\n  </head>`);

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

function pathToFile(distPath) {
  const cleanPath = distPath === '/' ? '' : distPath.replace(/^\//, '');
  const dir = cleanPath ? resolve(DIST, cleanPath) : DIST;
  if (cleanPath) mkdirSync(dir, { recursive: true });
  return resolve(dir, 'index.html');
}

let count = 0;

function writeAll(canonical, byLang, image, noindex) {
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
    byLang[L.lang] = meta[L.lang] || meta.en;
  }
  ROUTES.push({ canonical: path, byLang, image: meta.image });
}

/**
 * Join a route name to its section suffix.
 *
 * The suffix carries its own leading separator (": Weddings | LaplandWeddings",
 * fr " : Mariages …", ja/zh full-width "：…"), so the default is a bare
 * concatenation.
 *
 * 🔴 Exception: some names already contain a colon of their own. `elopement` is
 * written as a name+subtitle pair in 7 locales — fi "Elopement Lapissa:
 * kahdestaan vihille", de "Elopement in Lappland: zu zweit zur Trauung", fr
 * "Elopement en Laponie : se marier à deux". Appending the section suffix to
 * those produced a THREE-part search-result line with two colons:
 *   "Elopement en Laponie : se marier à deux : Mariages en Laponie | LaplandWeddings"
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
  if (/[:：]/.test(name)) return `${name} | LaplandWeddings`;
  return `${name}${suffix}`;
}

// Locations: generate per-locale title from suffix table, desc falls back to EN
for (const l of locations) {
  const byLang = {};
  for (const L of LOCALES) {
    const nameSrc = i18n('locations', l.slug, L.lang, 'name', l);
    const descSrc = i18n('locations', l.slug, L.lang, 'desc', l);
    byLang[L.lang] = {
      title: joinTitle(nameSrc, LOC_TITLE_SUFFIX[L.lang]),
      description: descSrc,
    };
  }
  ROUTES.push({ canonical: `/locations/${l.slug}`, byLang, image: l.img });
}

// Wedding types
for (const t of types) {
  const byLang = {};
  for (const L of LOCALES) {
    const nameSrc = i18n('types', t.slug, L.lang, 'name', t);
    const descSrc = i18n('types', t.slug, L.lang, 'desc', t);
    byLang[L.lang] = {
      title: joinTitle(nameSrc, TYPE_TITLE_SUFFIX[L.lang]),
      description: descSrc,
    };
  }
  ROUTES.push({ canonical: `/wedding-types/${t.slug}`, byLang, image: t.img });
}

// Venues
for (const v of venues) {
  const byLang = {};
  for (const L of LOCALES) {
    const region = i18n('venues', v.slug, L.lang, 'region', v);
    const desc = i18n('venues', v.slug, L.lang, 'desc', v);
    byLang[L.lang] = {
      title: `${v.name}: ${region} | LaplandWeddings`,
      description: desc,
    };
  }
  ROUTES.push({ canonical: `/venues/${v.slug}`, byLang, image: v.img });
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
    image: `${SITE}/images/heroes/aurora-elope-hero.webp`,
    noindex: true,
  });
} catch (e) {
  console.error(`${NLCH}[prerender] /partner-with-us metojen luku EPAONNISTUI: ${e.message}`);
  console.error('Ilman prerenderia sivu antaa aidon 404:n (catch-all poistettu 22.8.). Build pysahtyy.');
  process.exit(1);
}
for (const r of ROUTES) writeAll(r.canonical, r.byLang, r.image, r.noindex);

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
if (NETWORK) {
  const probe = pathToFile('/');
  const html = readFileSync(probe, 'utf-8');
  const problems = [];
  if (!html.includes('id="lv-prerender"')) problems.push('crawlable body block missing');
  if (!/<div id="root"><div/.test(html)) problems.push('block is not inside #root');
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
    title: 'Page not found | LaplandWeddings',
    description: 'This page does not exist. Browse Lapland wedding venues, locations and planning guides instead.',
    image: `${SITE}/images/heroes/aurora-elope-hero.webp`,
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
