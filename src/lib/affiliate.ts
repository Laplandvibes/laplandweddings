/**
 * Centralised affiliate link builders for the LaplandVibes stack:
 *  - Hotels.com (lodging)
 *  - Trip.com (flights)
 *  - laplandcarrental.com (own internal site, no external affiliate)
 *
 * Affiliate IDs are read from Vite env at build time so they can be set per
 * environment without code changes.
 */

const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;

const HOTELS_AFFID = env.VITE_HOTELS_AFFID || '';
const HOTELS_PARTNER_ID = env.VITE_HOTELS_PARTNER_ID || '';
const TRIP_ALLIANCE_ID = env.VITE_TRIP_ALLIANCE_ID || '';
const TRIP_SID = env.VITE_TRIP_SID || '';

/** Build a Hotels.com search link for a venue or destination. */
export function hotelsLink(query: string): string {
  const u = new URL('https://www.hotels.com/Hotel-Search');
  u.searchParams.set('destination', query);
  if (HOTELS_AFFID) u.searchParams.set('affid', HOTELS_AFFID);
  if (HOTELS_PARTNER_ID) u.searchParams.set('PARTNERID', HOTELS_PARTNER_ID);
  return u.toString();
}

/**
 * Build a Trip.com flights search link.
 * @param from IATA origin (e.g. LHR, HEL)
 * @param to IATA destination (RVN, KTT, IVL)
 */
export function tripFlightsLink(from: string, to: string, opts?: { source?: string }): string {
  const u = new URL('https://www.trip.com/flights/showfaresearch');
  u.searchParams.set('dcity', from.toLowerCase());
  u.searchParams.set('acity', to.toLowerCase());
  if (TRIP_ALLIANCE_ID) u.searchParams.set('Allianceid', TRIP_ALLIANCE_ID);
  if (TRIP_SID) u.searchParams.set('SID', TRIP_SID);
  if (opts?.source) u.searchParams.set('trip_sub1', opts.source);
  return u.toString();
}

/** Generic Trip.com flights search to Lapland from a given origin. */
export function tripToLapland(from: string, airport: 'RVN' | 'KTT' | 'IVL'): string {
  return tripFlightsLink(from, airport, { source: 'laplandweddings' });
}

/** Internal car rental — own site within LaplandVibes. */
export function carRentalLink(airport?: 'RVN' | 'KTT' | 'IVL'): string {
  const u = new URL('https://laplandcarrental.com/');
  u.searchParams.set('utm_source', 'laplandweddings');
  u.searchParams.set('utm_medium', 'cross-link');
  if (airport) u.searchParams.set('pickup', airport);
  return u.toString();
}
