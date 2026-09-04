import { Lamp } from 'lucide-react'
import type { RailPartner } from '../ProductRail'

// Nordic Nest — Adtraction. Copy follows the COPY RULES in ProductRail.tsx:
// one-clause headline, one-sentence sub, and nothing claimed that the feed
// or the advertiser's own page does not support. Finnish and English only —
// the rail renders nothing in a locale it has no copy for, which is the
// honest outcome for a Finland-market shop.
const nordicnest: RailPartner = {
  key: 'nordicnest',
  categoryUrl: "https://www.nordicnest.fi/",
  accent: '#7A5C3E',
  accentDark: '#D0B18C',
  icon: Lamp,
  copy: {
    fi: {
      eyebrow: "Nordic Nest",
      headline: "Pohjoismaista designia kotiin",
      sub: "Iittalaa, Marimekkoa ja Kosta Bodaa samasta kaupasta.",
      from: 'alk.',
      ctaAll: "Katso koko valikoima",
      note: "Hinnat tarkistettu {date}. Ajantasainen hinta ja koot näkyvät Nordic Nestin sivulla.",
    },
    en: {
      eyebrow: "Nordic Nest",
      headline: "Nordic design for the home",
      sub: "Iittala, Marimekko and Kosta Boda in one shop.",
      from: 'from',
      ctaAll: "See the full range",
      note: "Prices checked {date}. Current price and sizes are shown on Nordic Nest’s own page.",
    },
  },
}

export default nordicnest
