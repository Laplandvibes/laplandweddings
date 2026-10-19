import mapsData from './generated/venues-from-maps.json';
import type { Lang } from '../i18n/translations';

/**
 * Real Google review data for the venue registry, and the rules that turn it
 * into an editorial pick (2026-07-26).
 *
 * Two data layers
 * ---------------
 * EDITORIAL (`src/data/venues.ts`, hand-maintained): names, regions,
 * capacities, descriptions, wedding spaces, contacts. Never machine-written.
 *
 * GENERATED (`src/data/generated/venues-from-maps.json`, gitted): rating,
 * review count, Place ID and verification date, produced by
 * `node scripts/sync-venues.mjs` from the Places API (New). Re-running the sync
 * can never clobber editorial work, because the script writes only that one
 * JSON file. The layers are merged by venue slug in `withGoogleReviews` below.
 *
 * The generated layer is a SNAPSHOT, not a live feed. Every surface that prints
 * a rating therefore also prints the verification date and links to Google's own
 * review list, so a reader can check both the number and its age.
 *
 * The sync FAILS CLOSED, and on wedding venues it has to fail closed more often
 * than on a hotel site: these venues frequently trade inside, next door to, or
 * under the same brand as a larger business. 6 of 21 venues currently carry no
 * rating at all — among them one whose only candidate was a sibling property of
 * the same chain (Santa's Hotel Santamus vs Santa's Hotel Santa Claus) and one
 * whose resort Google splits into separate village listings (Kakslauttanen).
 * Every consumer must therefore treat "no rating" as the normal case and render
 * nothing rather than a guess.
 *
 * Two of the eight originally-unmatched venues were unmatchable for a reason
 * the gates could only point at, not fix: "Hotel Aurora Pyhä" and "Lapland
 * Hotels Pyhä" shared one website URL in the registry, and that URL 404s.
 * Neither name exists. They were two real but misnamed properties in Luosto,
 * corrected on 2026-07-26 to Santa's Hotel Aurora and Lapland Hotels
 * Luostotunturi, after which both matched on the first pass with no gate
 * relaxed.
 */

/**
 * Google review data attached to a venue by the sync. Every field is optional
 * on purpose — see the fail-closed note above.
 */
export type GoogleReview = {
  /** Google's star average, 1 decimal as Google publishes it. */
  rating?: number;
  /** Number of Google reviews behind that average. */
  reviewCount?: number;
  /** Places API place ID — the key to the public review list. */
  googlePlaceId?: string;
  /** YYYY-MM-DD the sync last confirmed these numbers. */
  lastVerified?: string;
};

/** Shape every rankable card satisfies. `name` keeps this from being a weak type. */
export type RankableVenue = { name: string } & GoogleReview;

type SyncedVenue = {
  /** Google's own listing name — kept so a reviewer can audit WHAT was matched. */
  matchedName: string;
  rating: number;
  reviewCount: number;
  googlePlaceId: string;
  address: string;
  location: { latitude: number; longitude: number };
  lastVerified: string;
};

const SYNCED = (mapsData as { venues: Record<string, SyncedVenue> }).venues;

/**
 * Merge the generated Google layer onto the hand-written editorial layer,
 * keyed by venue slug. Generic-preserving: callers keep every editorial field
 * and their own element type, and simply gain the optional review fields.
 */
export function withGoogleReviews<T extends { slug: string }>(
  base: readonly T[],
): (T & GoogleReview)[] {
  return base.map((item) => {
    const g = SYNCED[item.slug];
    return g
      ? {
          ...item,
          rating: g.rating,
          reviewCount: g.reviewCount,
          googlePlaceId: g.googlePlaceId,
          lastVerified: g.lastVerified,
        }
      : { ...item };
  });
}

/**
 * Google's public review list for a place. This is the attribution AND the
 * audit trail: the numbers printed are Google's, and this link is how a reader
 * checks them.
 */
export function googleReviewsUrl(placeId: string): string {
  return `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`;
}

/** Site locale → BCP-47 tag, for Intl number/date formatting. */
const BCP47: Record<Lang, string> = {
  en: 'en-GB',
  fi: 'fi-FI',
  de: 'de-DE',
  ja: 'ja-JP',
  es: 'es-ES',
  'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN',
  ko: 'ko-KR',
  fr: 'fr-FR',
  it: 'it-IT',
  nl: 'nl-NL',
  sv: 'sv-SE',
};

/** "4.6" in en, "4,6" in fi/sv/de — always exactly one decimal, as Google shows it. */
export function formatRating(rating: number, lang: Lang): string {
  return new Intl.NumberFormat(BCP47[lang], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rating);
}

/** "1,821" in en, "1 821" in fi/sv — locale thousands grouping. */
export function formatReviewCount(count: number, lang: Lang): string {
  return new Intl.NumberFormat(BCP47[lang]).format(count);
}

/**
 * Format a YYYY-MM-DD verification date for display. Parsed as a LOCAL date so
 * a reader west of UTC is not shown yesterday's date for today's snapshot.
 */
export function formatVerifiedDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat(BCP47[lang], { dateStyle: 'medium' }).format(new Date(y, m - 1, d));
}
