import L from './L';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';
import { cardBlurb } from '../lib/cardBlurb';
import type { Venue } from '../data/venues';

/**
 * One venue card, the same on every surface (front page, /venues, region,
 * wedding type, "other venues" on a venue page).
 *
 * Vesa 19.10.2026: "mitä ihmettä näissä lukee? sivun paras google arvio jne.
 * aika todella kamalan näköistä" — and on the venue form: "kun meillä ei ole
 * vielä sopimusta esim Kakslauttasen kautta … ihan kuin olisi jo sopimus?"
 * So the card carries no badge, no rating pill and no "Request a quote"
 * button: the whole card is one link to the venue page, where the Google
 * rating (with its date) and the enquiry form live. The text is whole
 * sentences (cardBlurb), never a line cut off at "…".
 */
const VIEW: Localized<string> = {
  fi: 'Tutustu hääpaikkaan',
  en: 'View the venue',
  de: 'Zur Location',
  ja: '会場を見る',
  es: 'Ver el lugar',
  'pt-BR': 'Ver o local',
  'zh-CN': '查看场地',
  ko: '웨딩 장소 보기',
  fr: 'Voir le lieu',
  it: 'Scopri la location',
  nl: 'Bekijk de locatie',
  sv: 'Se platsen',
};

export default function VenueCard({ venue: v, sid }: { venue: Venue; sid: string }) {
  const { lang, dataLang } = useLang();
  return (
    <L
      to={`/venues/${v.slug}`}
      data-umami-event="venue_card"
      data-umami-event-surface={sid}
      className="group flex flex-col bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-colors"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={v.image}
          alt={v.imageAlt[dataLang]}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 px-5 pt-5 pb-5">
        <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--color-rose-ink)' }}>
          {v.region[dataLang]}
        </p>
        <h3 className="font-heading text-xl text-white mb-2 tracking-wide leading-tight">{v.name}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{cardBlurb(v.description[dataLang])}</p>
        <span
          className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:underline underline-offset-4"
          style={{ color: 'var(--color-rose-ink)' }}
        >
          {pickLocalized(VIEW, lang)} <span aria-hidden="true">→</span>
        </span>
      </div>
    </L>
  );
}
