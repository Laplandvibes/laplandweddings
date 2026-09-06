/**
 * Localized venue page <title>.
 *
 * [LV-DUP 2026-09-06] "Arctic SnowHotel & Glass Igloos: Lehtojärvi" was the title
 * in eight locales — name and region are proper nouns, the only translated
 * regions are the CJK transliterations. OpenSEO counted 76 duplicate venue
 * titles. The localizable part is the descriptor: what kind of page this is.
 *
 * Candidates, first that fits 60 characters wins (the brand suffix is added
 * only when the whole line still fits):
 *   1. "<Venue>: <Region> – hääpaikka"
 *   2. "<Venue>: <Region up to the first ' · '> – hääpaikka"
 *   3. "<Venue> – hääpaikka"
 *   4. "<Venue>: <Region up to the first ' · '>"   (the 2026-08-23 rule)
 *
 * Plain ESM (.mjs): scripts/prerender-meta.mjs runs under Node 20 in CI, which
 * cannot import .ts; pages/VenuePage.tsx imports this same file through Vite.
 */
const WORD = {
  en: 'wedding venue',
  fi: 'hääpaikka',
  sv: 'bröllopsplats',
  de: 'Hochzeitslocation',
  fr: 'lieu de mariage',
  es: 'lugar de boda',
  it: 'location per matrimoni',
  nl: 'trouwlocatie',
  'pt-BR': 'local de casamento',
  ja: 'ウェディング会場',
  ko: '웨딩 장소',
  'zh-CN': '婚礼场地',
};

export function venueTitleBase(name, region, lang) {
  const word = WORD[lang] ?? WORD.en;
  const sep = lang === 'fr' ? ' : ' : ': ';
  const dash = lang === 'ja' || lang === 'zh-CN' ? '｜' : ' – ';
  const regionFirst = String(region).split(' · ')[0];
  const c1 = `${name}${sep}${region}${dash}${word}`;
  if (c1.length <= 60) return c1;
  const c2 = `${name}${sep}${regionFirst}${dash}${word}`;
  if (c2.length <= 60) return c2;
  const c3 = `${name}${dash}${word}`;
  if (c3.length <= 60) return c3;
  return `${name}${sep}${regionFirst}`;
}

export function venueTitle(name, region, lang, brand = 'LaplandWeddings') {
  const base = venueTitleBase(name, region, lang);
  const full = `${base} | ${brand}`;
  return full.length <= 60 ? full : base;
}
