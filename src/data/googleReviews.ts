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
 * under the same brand as a larger business. 8 of 21 venues currently carry no
 * rating at all — among them one whose only candidate was a sibling property of
 * the same chain (Santa's Hotel Santamus vs Santa's Hotel Santa Claus) and one
 * whose resort Google splits into separate village listings (Kakslauttanen).
 * Every consumer must therefore treat "no rating" as the normal case and render
 * nothing rather than a guess.
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
 * Minimum review count for a venue to be rankable.
 *
 * Why 100: Google publishes its average to one decimal, so a ranking is only
 * honest if the noise in the average is smaller than that. At n = 100 the
 * standard error of a mean on Google's 1–5 scale is ≈ 0.1 star, i.e. at or
 * below the displayed granularity; at n = 30 it is ≈ 0.18, so two venues 0.1
 * apart would be statistically indistinguishable and "highest rated" would be a
 * coin flip dressed as a fact.
 *
 * This floor currently binds NOTHING — the matched field runs 211…1821 reviews,
 * because a Lapland "wedding venue" is in practice a resort or hotel, not the
 * 10–50-review small business one might expect. It is kept anyway, honestly
 * labelled as non-binding: it is the floor at which the arithmetic works, and
 * it is what protects the chip on the day a genuinely small venue (a chapel, a
 * manor) is added to the registry.
 */
export const PICK_MIN_REVIEWS = 100;

/**
 * Minimum rating for a venue to be rankable.
 *
 * Why 4.5, and why not the 4.3 used on laplandhoteldeals: the threshold is
 * derived from THIS site's field, by the same construction. There, 13 hotels
 * spanned 4.1–4.6 with median 4.4, and the floor was set one display step below
 * the median (4.3) so the chip stays a recommendation instead of a mere argmax —
 * something that must be earned against the field, not won by being least bad.
 *
 * Here the 13 venues with verified data are 4.4, 4.4, 4.4, 4.5, 4.5, 4.6, 4.6,
 * 4.6, 4.6, 4.6, 4.7, 4.7, 4.8 — min 4.4, median 4.6, max 4.8. A 4.3 floor
 * copied over from the hotel site would sit below the whole field and do
 * nothing. One display step below this median gives 4.5, which excludes the
 * bottom three and leaves ten venues genuinely competing.
 *
 * Re-derive this whenever the registry or the snapshot changes materially:
 * `node scripts/sync-venues.mjs` prints the min / median / max it just fetched.
 */
export const PICK_MIN_RATING = 4.5;

/**
 * The editorial pick on a surface, DERIVED from real Google review data —
 * never hand-picked and NEVER FOR SALE (2026-07-26).
 *
 * The chip's whole value is that it cannot be bought: if money could win it,
 * the recommendation would mean nothing and the sellable Featured-partner slot
 * beside it would lose the very thing that gives it a price. Paid placement is
 * the `FeaturedPartnerSlot` above the grid, marked as advertising; this is the
 * opposite of that, and the two must never be confused visually or in code.
 *
 * Returns `null` — i.e. no chip at all — when fewer than two venues on the
 * surface clear both thresholds, because then there is no field to be top of.
 *
 * Callers must render, on EVERY card of the surface that has review data, the
 * rating + review count + link to Google's review list. "Highest rated on this
 * page" is only a checkable claim if the reader can see the other cards'
 * numbers too.
 */
export function bestGoogleRated<T extends RankableVenue>(items: readonly T[]): T | null {
  const eligible = items.filter(
    (i): i is T & { rating: number; reviewCount: number; googlePlaceId: string } =>
      typeof i.rating === 'number' &&
      i.rating >= PICK_MIN_RATING &&
      typeof i.reviewCount === 'number' &&
      i.reviewCount >= PICK_MIN_REVIEWS &&
      typeof i.googlePlaceId === 'string',
  );
  if (eligible.length < 2) return null;
  const winner = eligible.reduce((best, i) => {
    if (i.rating > best.rating) return i;
    if (i.rating === best.rating && i.reviewCount > best.reviewCount) return i;
    return best;
  });

  // The chip PRINTS the claim "highest rating on this page". If any card on the
  // surface displays a strictly higher rating — a low-n outlier that the review
  // floor correctly refused to crown — that claim is false on its face, right
  // next to the number that contradicts it. Rather than qualify the wording in
  // twelve locales, drop the chip: no claim beats a claim the reader can see is
  // wrong.
  const highestShown = items.reduce(
    (max, i) => (typeof i.rating === 'number' && i.rating > max ? i.rating : max),
    0,
  );
  if (highestShown > winner.rating) return null;

  return winner;
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

/**
 * The visible justification printed under the pick chip: the derivation in
 * words plus the snapshot date, e.g. "Sivun paras Google-arvio · Tarkistettu
 * 26.7.2026". Built here so every surface phrases it identically.
 */
export function editorialPickNote(
  pick: RankableVenue | null,
  lang: Lang,
  copy: { pickReason: string; verifiedOn: string },
): string | undefined {
  if (!pick) return undefined;
  if (!pick.lastVerified) return copy.pickReason;
  return `${copy.pickReason} · ${copy.verifiedOn.replace('{d}', formatVerifiedDate(pick.lastVerified, lang))}`;
}
