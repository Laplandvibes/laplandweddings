/**
 * GoogleRatingRow — the review score of one venue, presented as GOOGLE'S
 * verdict and linked to the source (2026-07-26).
 *
 * Three rules this component exists to enforce:
 *
 * 1. ATTRIBUTION. The number is labelled "Google" in the visible text. It is
 *    not this site's verdict and must never be worded as one.
 * 2. CHECKABILITY. The whole row is a link to Google's public review list for
 *    that exact Place ID, so a reader can verify the claim in one click. It is
 *    rendered on EVERY card of a surface, not only on the one wearing the
 *    editorial chip: "highest rated on this page" is only checkable if the
 *    other cards' numbers are visible too.
 * 3. NO FAKE LIVENESS. The data is a gitted snapshot from
 *    `scripts/sync-venues.mjs`, so the verification date travels with it (in the
 *    tooltip and the accessible name here; printed visibly next to the pick chip).
 *
 * Renders NOTHING when the sync did not produce certain data for the venue —
 * that is the fail-closed path, and it must stay that way. On this site that is
 * the common case: 8 of 21 venues have no rating, because wedding venues so
 * often share a name or an address with a parent business.
 *
 * Not an affiliate link: `rel="nofollow noopener"`, no `sponsored`.
 *
 * LAYOUT NOTE: this renders an <a>, so it must never be placed inside a card's
 * <L> wrapper — nested anchors are invalid HTML and browsers silently break the
 * outer link. Card grids therefore put the card link and this row side by side
 * inside a wrapping <div>.
 */
import { Star } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import { editorialCopy } from '../data/editorialCopy';
import { pickLocalized } from '../data/localized';
import {
  googleReviewsUrl,
  formatRating,
  formatReviewCount,
  formatVerifiedDate,
  type RankableVenue,
} from '../data/googleReviews';

export default function GoogleRatingRow({
  venue,
  tone = 'card',
  className,
}: {
  venue: RankableVenue;
  /** 'card' = ivory card background (dark text). 'dark' = espresso page background. */
  tone?: 'card' | 'dark';
  className?: string;
}) {
  const { lang } = useLang();
  const { rating, reviewCount, googlePlaceId, lastVerified } = venue;

  if (typeof rating !== 'number' || typeof reviewCount !== 'number' || !googlePlaceId) {
    return null;
  }

  const line = pickLocalized(editorialCopy.ratingLine, lang)
    .replace('{r}', formatRating(rating, lang))
    .replace('{n}', formatReviewCount(reviewCount, lang));
  const aria = pickLocalized(editorialCopy.ratingAria, lang);
  const verified = lastVerified
    ? pickLocalized(editorialCopy.verifiedOn, lang).replace(
        '{d}',
        formatVerifiedDate(lastVerified, lang),
      )
    : null;

  return (
    <a
      href={googleReviewsUrl(googlePlaceId)}
      target="_blank"
      rel="nofollow noopener"
      title={verified ? `${line} · ${verified}` : line}
      data-google-rating={formatRating(rating, lang)}
      className={[
        // `relative` anchors the sr-only absolute to this pill instead of a
        // higher positioned ancestor (Lomarengas lesson, 2026-07-25).
        'relative inline-flex items-center gap-1.5 self-start rounded-full no-underline',
        'border px-2.5 py-1 text-[11px] font-semibold transition-colors',
        tone === 'dark'
          ? 'border-gold/40 bg-gold/10 text-cream-text hover:border-gold/70'
          : 'border-gold/50 bg-gold/15 text-charcoal hover:border-gold',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Star className="w-3 h-3 text-gold shrink-0" aria-hidden="true" />
      <span>{line}</span>
      <span className="sr-only">{` (${aria}${verified ? `, ${verified}` : ''})`}</span>
    </a>
  );
}
