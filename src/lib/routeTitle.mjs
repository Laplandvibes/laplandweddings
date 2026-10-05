/**
 * Location and wedding-type page <title>: ONE composer for both sides. scripts/prerender-meta.mjs writes the
 * prerendered HTML with these functions and pages/LocationPage.tsx + pages/WeddingTypePage.tsx call the same
 * ones in the browser (gate:meta-hydraatio in lv-ops). The name comes from the registry on both sides:
 * src/data/locations.ts and src/data/weddingTypes.ts in the browser, and the same values synced into
 * scripts/route-i18n.json by scripts/sync-route-i18n-names.mjs for the prerenderer.
 *
 * Until 2026-10-05 the two sides had their own suffix tables and name sources: Korean had drifted
 * ("로바니에미: 결혼식" in the prerendered HTML, "로바니에미: 웨딩" after the page loaded, 14 pages), and the
 * English and Finnish elopement and vow-renewal titles swapped to the heading name in the browser (4 pages).
 *
 * The suffix carries its OWN leading separator and is concatenated with no space. Three typographic rules
 * live in these tables, do NOT normalise them:
 *   - fr: French puts a space BEFORE a colon. " : Mariages" is correct and must stay.
 *   - ja / zh-CN: the full-width "：" already contains its own spacing, so no space before it.
 *   - everything else: plain ": " with no space before.
 *
 * Plain ESM (.mjs) for Node 20 in CI. Types: routeTitle.d.mts.
 */
const LOCATION_SUFFIX = {
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

const TYPE_SUFFIX = {
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

/**
 * The search-result name of two wedding types in English and Finnish. These are the published titles, and
 * they differ from the page heading (the registry name "Elopement / Two-Person Wedding" and so on), so the
 * heading keeps its own text and only the <title> uses these.
 */
const TYPE_TITLE_NAME = {
  elopement: { en: 'Lapland Elopement', fi: 'Elopement Lapissa: kahdestaan vihille' },
  'vow-renewal': { en: 'Vow Renewal in Lapland', fi: 'Lupausten uusiminen Lapissa' },
};

/**
 * A name that already carries its own subtitle ("Elopement Lapissa: kahdestaan vihille", de "Elopement in
 * Lappland: zu zweit zur Trauung") gets no section suffix: appending one made a three-part line with two
 * colons. Detects the full-width "：" too.
 */
function joinTitle(name, suffix) {
  if (/[:：]/.test(name)) return `${name}`;
  return `${name}${suffix}`;
}

/** "<Location>: Weddings" in the page's language. */
export function locationTitle(name, lang) {
  return joinTitle(name, LOCATION_SUFFIX[lang] ?? LOCATION_SUFFIX.en);
}

/** "<Wedding type>: Lapland Weddings" in the page's language. */
export function typeTitle(slug, name, lang) {
  return joinTitle(TYPE_TITLE_NAME[slug]?.[lang] ?? name, TYPE_SUFFIX[lang] ?? TYPE_SUFFIX.en);
}
