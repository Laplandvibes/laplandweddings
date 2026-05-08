import type { PriceTier } from '../data/venues';

const labelFi: Record<PriceTier, string> = {
  '€€': 'Edullinen',
  '€€€': 'Keskihinta',
  '€€€€': 'Premium',
};
const labelEn: Record<PriceTier, string> = {
  '€€': 'Affordable',
  '€€€': 'Mid-range',
  '€€€€': 'Premium',
};

export default function PriceTierBadge({ tier, lang }: { tier: PriceTier; lang: 'fi' | 'en' }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 border border-gold/30 px-2.5 py-1 text-xs font-semibold text-gold">
      <span>{tier}</span>
      <span className="text-gold/70">·</span>
      <span>{lang === 'fi' ? labelFi[tier] : labelEn[tier]}</span>
    </span>
  );
}
