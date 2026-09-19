import type { Localized } from '../data/localized';

/**
 * Twelve-month strip. Month names come from Intl for the reader's locale, so
 * the component carries no month strings of its own; the coloured segments and
 * their legend are passed in by the page from the copy it already shows.
 */
export interface SeasonSegment {
  /** 0-based months (0 = January). */
  months: number[];
  color: string;
  label: string;
}

const INTL: Record<string, string> = {
  fi: 'fi-FI', en: 'en-GB', de: 'de-DE', ja: 'ja-JP', es: 'es-ES', 'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};

export default function SeasonBand({ lang, segments, className = '' }: { lang: keyof Localized<string>; segments: SeasonSegment[]; className?: string }) {
  const numeric = Array.from({ length: 12 }, (_, i) => String(i + 1));
  let months = numeric;
  try {
    const fmt = new Intl.DateTimeFormat(INTL[lang] || 'en', { month: 'short' });
    const short = Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2026, i, 15)).replace(/\.$/, ''));
    // Finnish "tammik." does not fit a twelfth of a card; numbers do, in every language.
    if (short.every((m) => m.length <= 4)) months = short;
  } catch {
    /* numeric fallback */
  }
  const colorOf = (m: number) => segments.find((s) => s.months.includes(m))?.color;
  return (
    <figure className={className}>
      <div className="grid grid-cols-12 gap-0.5" role="img" aria-label={segments.map((s) => s.label).join('; ')}>
        {months.map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-0">
            <div className="h-3 w-full rounded-sm" style={{ background: colorOf(i) || 'rgba(245,235,224,0.12)' }} />
            <span className="text-[10px] sm:text-[11px] text-gray-400 leading-none truncate max-w-full">{name}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-300">
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
