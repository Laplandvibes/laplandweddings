/**
 * Centralised affiliate link builders for the LaplandVibes ecosystem.
 *
 * Active partners (only these — anything else is a leak):
 *   • lodging via CJ — routed through `go.laplandvibes.com/go/hotels`
 *   • EconomyBookings via CJ — routed through `go.laplandvibes.com/go/cars`
 *   • Trip.com (direct) — Allianceid 8175308, SID 309472136
 *   • laplandcarrental.com — internal LV site, not external affiliate
 *
 * SID convention: lowercase a-z 0-9 _, max 50 chars, no domain prefix.
 * Example placements: `hero_cta`, `venue_kakslauttanen`, `practical_guide`.
 *
 * Every affiliate <a> needs: target="_blank" rel="sponsored nofollow noopener"
 * (NEVER add noreferrer — it kills CJ attribution).
 */

const TRIP_SID = '309472136';
const SITE_TAG = 'laplandweddings.online';

// LOCALE: 2026-05-16 — partner-specific locale params so DE/FI users land on
// the German / Finnish partner pages instead of EN.
export type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';
const HOTELS_LOCALE: Record<Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP',
  es: 'es_ES', 'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN',
  ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};
const CARS_LANG: Record<Lang, string> = {
  en: 'en', fi: 'fi', de: 'de', ja: 'ja',
  es: 'es', 'pt-BR': 'pt', 'zh-CN': 'zh',
  ko: 'ko', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
};
const TRIP_LOCALE: Record<Lang, string> = {
  en: 'en-XX', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP',
  es: 'es-ES', 'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN',
  ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};

/**
 * Anchor any hotels search to Finnish Lapland. A bare "Lapland"/venue name
 * makes the lodging partner geocode to *Lapland, Indiana, USA* (or a US town) — a real
 * revenue/trust bug (Vesa 2026-07-08). Force ", Finland" onto every hotels
 * query that doesn't already name the country. Callers cannot regress.
 */
function anchorFinland(query: string): string {
  return /finland|suomi/i.test(query)
    ? query
    : `${query.replace(/[\s,]+$/, '')}, Finland`;
}

/** lodging via the LV Worker (CJ tracking handled server-side). */
export function hotelsLink(query: string, sid = 'venue', lang: Lang = 'en'): string {
  const u = new URL('https://go.laplandvibes.com/go/hotels');
  u.searchParams.set('sid', sid);
  u.searchParams.set('ss', anchorFinland(query));
  u.searchParams.set('locale', HOTELS_LOCALE[lang]);
  return u.toString();
}

/**
 * Lodging link for a NAMED venue — resolves to that property's own booking page.
 *
 * 🔴 `?ss=` is the TOWN, never the venue name. `anchorFinland()` is correct for a
 * town and breaks a hotel name: Sembo's autosuggest returns [] for multi-word
 * hotel terms, so the Worker gets no destination and serves the partner's FRONT
 * PAGE. Measured 2026-08-02 — 18 of 38 venue CTAs landed there. The property is
 * addressed by id instead (`sembo_hotel`+`sembo_poly` for fi, `trip_hotel`+
 * `trip_city` otherwise), which the Worker has accepted since 2026-07-27.
 *
 * 🔴 Keep `sid` short. The Worker truncates `<domain>_<sid>` at 50 chars and
 * `laplandweddings_online_` is already 23, leaving 27. The old `venue_hero_`
 * prefix clipped 13 of 21 slugs — and, worse, clipped the three Wilderness
 * hotels into one identical sub-id and the three Northern Lights properties
 * into another, so their reporting was merged rather than merely shortened.
 *
 * `v_` leaves 25 characters. Measured, not assumed: three slugs are still
 * longer than that (northern-lights-village-saariselka, -levi and
 * lapland-hotels-luostotunturi) and still arrive truncated — but all 21
 * truncated sub-ids remain DISTINCT, which is the property that actually
 * matters for attribution. Re-check that uniqueness before adding a venue whose
 * slug shares its first 25 characters with an existing one.
 */
export function venueLodgingLink(
  opts: { slug: string; town: string; semboHotel?: string; semboPoly?: string; tripHotel?: string; tripCity?: string },
  lang: Lang = 'en',
): string {
  const u = new URL('https://go.laplandvibes.com/go/hotels');
  u.searchParams.set('sid', `v_${opts.slug}`);
  u.searchParams.set('ss', anchorFinland(opts.town));
  u.searchParams.set('locale', HOTELS_LOCALE[lang]);
  if (opts.semboHotel && opts.semboPoly) {
    u.searchParams.set('sembo_hotel', opts.semboHotel);
    u.searchParams.set('sembo_poly', opts.semboPoly);
  }
  if (opts.tripHotel) {
    u.searchParams.set('trip_hotel', opts.tripHotel);
    if (opts.tripCity) u.searchParams.set('trip_city', opts.tripCity);
  }
  return u.toString();
}

/** Lodging seasonal — for top-pick / featured destinations. */
export function hotelsSeasonalLink(query: string, sid = 'seasonal', lang: Lang = 'en'): string {
  const u = new URL('https://go.laplandvibes.com/go/hotels-seasonal');
  u.searchParams.set('sid', sid);
  u.searchParams.set('ss', anchorFinland(query));
  u.searchParams.set('locale', HOTELS_LOCALE[lang]);
  return u.toString();
}

/** EconomyBookings via Worker — wedding-guest car rentals from airports. */
export function carsLink(pickup: 'RVN' | 'KTT' | 'IVL' = 'RVN', sid = 'cars', lang: Lang = 'en'): string {
  const u = new URL('https://go.laplandvibes.com/go/cars');
  u.searchParams.set('sid', sid);
  u.searchParams.set('pickup_location', pickup);
  u.searchParams.set('lang', CARS_LANG[lang]);
  return u.toString();
}

/**
 * Trip.com flights — go.laplandvibes.com-Workerin kautta (muutos 2026-08-22,
 * Vesan paatos). Tassa luki aiemmin "direct (do NOT route through Worker)":
 * se piti paikkansa vain niin kauan kuin Worker osasi pelkkaa CJ:ta, ja jai
 * ohjeeksi joka esti klikkien kirjautumisen D1-lokiin.
 *
 * Kohde-URL on sama kuin ennen; Worker asettaa Allianceidin, SIDin ja
 * trip_sub-kentat, joten ne eivat voi pudota linkista huomaamatta.
 * @param from IATA origin (lowercase, e.g. lhr, hel, fra)
 * @param to   IATA destination (rvn, ktt, ivl)
 */
export function tripFlightsLink(from: string, to: 'rvn' | 'ktt' | 'ivl', sid = 'flights', lang: Lang = 'en'): string {
  const u = new URL('https://go.laplandvibes.com/go/flights');
  u.searchParams.set('dcity', from.toLowerCase());
  u.searchParams.set('acity', to.toLowerCase());
  u.searchParams.set('locale', TRIP_LOCALE[lang]);
  u.searchParams.set('sid', sid);
  u.searchParams.set('w', SITE_TAG);
  u.searchParams.set('trip_sid', TRIP_SID);
  return u.toString();
}


/** Convenience wrapper — flights to a Lapland airport from a known UK/EU origin. */
export function tripToLapland(from: string, airport: 'RVN' | 'KTT' | 'IVL', sid = 'flights', lang: Lang = 'en'): string {
  return tripFlightsLink(from, airport.toLowerCase() as 'rvn' | 'ktt' | 'ivl', sid, lang);
}

/** Internal LV car rental — not external affiliate. */
export function carRentalLink(airport?: 'RVN' | 'KTT' | 'IVL'): string {
  const u = new URL('https://laplandcarrental.com/');
  u.searchParams.set('utm_source', 'laplandweddings');
  u.searchParams.set('utm_medium', 'cross-link');
  if (airport) u.searchParams.set('pickup', airport);
  return u.toString();
}

/** Standard rel attribute for every affiliate link. */
export const AFFILIATE_REL = 'sponsored nofollow noopener';

/**
 * Editorial referral tag for outbound links to a vendor's OWN website (e.g. a
 * listed photographer's portfolio). This is NOT a monetised/affiliate link — it
 * carries an editorial `utm_medium=referral` so the partner can see we sent the
 * traffic. Do NOT use for affiliate / Trip.com / Maps / internal links, and do
 * NOT change the anchor's `rel` (stays editorial `noopener noreferrer`).
 * @param url     the vendor's own-website URL
 * @param context short campaign context → utm_campaign=weddings_<context>
 */
export function withReferral(url: string, context: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'laplandvibes');
    u.searchParams.set('utm_medium', 'referral');
    u.searchParams.set('utm_campaign', `weddings_${context}`);
    return u.toString();
  } catch {
    return url;
  }
}
