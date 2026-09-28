/**
 * Localized venue page <title>.
 *
 * [LV-DUP 2026-09-06] "Arctic SnowHotel & Glass Igloos: Lehtojärvi" was the title
 * in eight locales — name and region are proper nouns, the only translated
 * regions are the CJK transliterations. OpenSEO counted 76 duplicate venue
 * titles. The localizable part is the descriptor: what kind of page this is.
 *
 * [LV-TITLE-DASH 2026-09-28] "<Venue>: <type> (<Region>)", the network's form for an
 * entity page (lv_permanent_rules §31: the registered name first, then its type). The
 * old "<Venue>: <Region> – hääpaikka" joined the type with a spaced en dash, a sentence
 * dash that the network bans in every language (180 places on gate:otsikko-viiva, and
 * German hid 20 more behind its capital noun). A colon in its place would have made
 * two colons in one title. The region goes in brackets because it is sometimes a place
 * ("Saariselkä") and sometimes a phrase ("Levin keskustassa", "On Levi fell summit"),
 * and only brackets read right for both. A region that only repeats the venue's own
 * name ("Apukka" for Apukka Resort) is left out: §31 allows no repetition.
 * ja and zh-CN keep their own "<Venue>: <Region>｜<type>", which never had a dash.
 *
 * Candidates, first that fits wins: at most 60 characters AND at most 75 width units
 * as gate:otsikko measures them (a CJK, kana or hangul character counts two). The
 * character limit alone let ja/ko/zh titles through at 80–86 units. No brand suffix:
 * Google shows the site name above every result (Vesa 22.9.2026), and the prerender
 * uses the same base (scripts/prerender-meta.mjs), so static and client titles match:
 *   1. "<Venue>: hääpaikka (<Region>)"
 *   2. "<Venue>: hääpaikka (<Region up to the first ' · '>)"
 *   3. "<Venue>: hääpaikka"
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
  ja: '結婚式会場',
  ko: '웨딩 장소',
  'zh-CN': '婚礼场地',
};

const WIDE = [
  [0x1100, 0x11ff], [0x2e80, 0xa4cf], [0xa960, 0xa97f], [0xac00, 0xd7ff],
  [0xf900, 0xfaff], [0xfe30, 0xfe4f], [0xff00, 0xff60], [0xffe0, 0xffe6],
];
function width(s) {
  let n = 0;
  for (const c of s) {
    const p = c.codePointAt(0);
    n += WIDE.some(([a, b]) => p >= a && p <= b) ? 2 : 1;
  }
  return n;
}
const fits = (t) => t.length <= 60 && width(t) <= 75;

const words = (s) => String(s).toLowerCase().split(/[\s,()·&]+/).filter(Boolean);
/**
 * A region goes in brackets unless it only repeats words of the venue's own name, or
 * already has brackets of its own: ko "레비 펠(구릉) 정상" would nest them.
 */
function bracketable(name, region) {
  if (/[()（）]/.test(region)) return false;
  const own = new Set(words(name));
  const w = words(region);
  return !(w.length > 0 && w.every((x) => own.has(x)));
}

export function venueTitleBase(name, region, lang) {
  const word = WORD[lang] ?? WORD.en;
  const full = String(region);
  const regionFirst = full.split(' · ')[0];
  let candidates;
  if (lang === 'ja' || lang === 'zh-CN') {
    candidates = [
      `${name}: ${full}｜${word}`,
      `${name}: ${regionFirst}｜${word}`,
      `${name}｜${word}`,
      `${name}: ${regionFirst}`,
    ];
  } else {
    const head = `${name}${lang === 'fr' ? ' : ' : ': '}${word}`;
    candidates = [];
    if (bracketable(name, full)) candidates.push(`${head} (${full})`);
    if (regionFirst !== full && bracketable(name, regionFirst)) candidates.push(`${head} (${regionFirst})`);
    candidates.push(head, `${name}${lang === 'fr' ? ' : ' : ': '}${regionFirst}`);
  }
  return candidates.find(fits) ?? candidates[candidates.length - 1];
}

export function venueTitle(name, region, lang) {
  return venueTitleBase(name, region, lang);
}
