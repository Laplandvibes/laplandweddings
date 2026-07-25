/**
 * Centralised affiliate link builders for the LaplandVibes ecosystem.
 *
 * Active partners (only these — anything else is a leak):
 *   • Hotels.com via CJ — routed through `go.laplandvibes.com/go/hotels`
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

const TRIP_ALLIANCE_ID = '8175308';
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
 * makes Hotels.com geocode to *Lapland, Indiana, USA* (or a US town) — a real
 * revenue/trust bug (Vesa 2026-07-08). Force ", Finland" onto every hotels
 * query that doesn't already name the country. Callers cannot regress.
 */
function anchorFinland(query: string): string {
  return /finland|suomi/i.test(query)
    ? query
    : `${query.replace(/[\s,]+$/, '')}, Finland`;
}

/** Hotels.com via the LV Worker (CJ tracking handled server-side). */
export function hotelsLink(query: string, sid = 'venue', lang: Lang = 'en'): string {
  const u = new URL('https://go.laplandvibes.com/go/hotels');
  u.searchParams.set('sid', sid);
  u.searchParams.set('ss', anchorFinland(query));
  u.searchParams.set('locale', HOTELS_LOCALE[lang]);
  return u.toString();
}

/** Hotels.com seasonal — for top-pick / featured destinations. */
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
 * Trip.com flights — direct (do NOT route through Worker).
 * @param from IATA origin (lowercase, e.g. lhr, hel, fra)
 * @param to   IATA destination (rvn, ktt, ivl)
 */
export function tripFlightsLink(from: string, to: 'rvn' | 'ktt' | 'ivl', sid = 'flights', lang: Lang = 'en'): string {
  const u = new URL('https://www.trip.com/flights/showfarefirst');
  u.searchParams.set('dcity', from.toLowerCase());
  u.searchParams.set('acity', to.toLowerCase());
  u.searchParams.set('locale', TRIP_LOCALE[lang]);
  u.searchParams.set('Allianceid', TRIP_ALLIANCE_ID);
  u.searchParams.set('SID', TRIP_SID);
  u.searchParams.set('trip_sub1', SITE_TAG);
  u.searchParams.set('trip_sub2', sid);
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
