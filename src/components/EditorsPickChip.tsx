/**
 * EditorsPickChip — the EARNED editorial mark. NOT FOR SALE.
 *
 * This is the second half of the 2026-07-26 productisation. The first half made
 * every venue-listing surface start with a sellable "Featured partner" slot
 * (`FeaturedPartnerSlot`); this half shrinks the editorial favourite down to a
 * small chip on an ordinary card. The chip's entire value is that money cannot
 * buy it — if it could, the site's recommendation would mean nothing, and the
 * sellable slot next to it would lose the very thing that gives it a price.
 *
 * The choice is derived from data: `bestGoogleRated` (src/data/googleReviews.ts)
 * returns the surface's highest real Google rating, ties broken by the larger
 * review count. No chip is rendered when fewer than two venues on the surface
 * have usable review data — there is no field to be top of.
 *
 * `note` prints the justification VISIBLY ("Sivun paras Google-arvio ·
 * Tarkistettu 26.7.2026"), because the claim is only checkable if the reader can
 * see both the other cards' ratings (`GoogleRatingRow`) and when the numbers
 * were fetched.
 *
 * The visual difference from a paid slot is deliberate: paid = pink "Mainos"
 * pill, earned = charcoal + gold, never pink.
 */
import { Award } from 'lucide-react';

export default function EditorsPickChip({
  label,
  reason,
  note,
  className,
}: {
  label: string;
  reason: string;
  /** Visible justification line, e.g. "Sivun paras Google-arvio · Tarkistettu 26.7.2026". */
  note?: string;
  className?: string;
}) {
  return (
    <div className={['flex flex-col gap-1 items-start', className].filter(Boolean).join(' ')}>
      <span
        title={reason}
        data-editors-pick="earned"
        className={[
          // `relative` anchors the sr-only absolute to this pill: without it the
          // absolute would attach to a higher positioned ancestor
          // (Lomarengas lesson, 2026-07-25).
          'relative inline-flex items-center gap-1.5 self-start rounded-full',
          'bg-charcoal text-ivory px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
          'ring-1 ring-gold/60 shadow-sm',
        ].join(' ')}
      >
        <Award className="w-3 h-3 text-gold" aria-hidden="true" />
        {label}
        <span className="sr-only"> ({reason})</span>
      </span>
      {note && (
        <span data-editors-pick-note="" className="text-[11px] leading-snug text-stone">
          {note}
        </span>
      )}
    </div>
  );
}
