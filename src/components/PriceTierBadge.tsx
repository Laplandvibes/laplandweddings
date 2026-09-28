import type { PriceTier } from '../data/venues';
import type { Lang } from '../i18n/translations';
import { pickLocalized, type Localized } from '../data/localized';

const labels: Record<PriceTier, Localized<string>> = {
  '€€': {
    en: 'Affordable',
    fi: 'Edullinen',
    de: 'Günstig',
    ja: '手頃',
    es: 'Económico',
    'pt-BR': 'Acessível',
    'zh-CN': '经济实惠',
    ko: '합리적',
    fr: 'Abordable',
    it: 'Economico',
    nl: 'Betaalbaar',
    sv: 'Prisvärt',
  },
  '€€€': {
    en: 'Mid-range',
    fi: 'Keskihinta',
    de: 'Mittelklasse',
    ja: '中価格帯',
    es: 'Gama media',
    'pt-BR': 'Intermediário',
    'zh-CN': '中档',
    ko: '중급',
    fr: 'Milieu de gamme',
    it: 'Fascia media',
    nl: 'Middensegment',
    sv: 'Mellanklass',
  },
  '€€€€': {
    en: 'Premium',
    fi: 'Premium',
    de: 'Premium',
    ja: 'プレミアム',
    es: 'Premium',
    'pt-BR': 'Premium',
    'zh-CN': '高端',
    ko: '프리미엄',
    fr: 'Premium',
    it: 'Premium',
    nl: 'Premium',
    sv: 'Premium',
  },
};

/** The price level as a word. The €€ / €€€ / €€€€ marks are not shown anywhere
    (Vesa 2026-09-28: "näyttää tyhmältä"); the tier stays only as data and filter value. */
export function priceTierLabel(tier: PriceTier, lang: Lang): string {
  return pickLocalized(labels[tier], lang);
}

export default function PriceTierBadge({ tier, lang }: { tier: PriceTier; lang: Lang }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gold/10 border border-gold/30 px-2.5 py-1 text-xs font-semibold text-gold">
      {priceTierLabel(tier, lang)}
    </span>
  );
}
