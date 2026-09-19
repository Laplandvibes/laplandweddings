import { BedDouble, Bus, Home, Sparkles, Users, Utensils } from 'lucide-react';
import type { Localized } from '../data/localized';
import { pickLocalized } from '../data/localized';
import { DIAG } from '../data/diagramText';
import SeasonBand from './SeasonBand';

type Lang = keyof Localized<string>;

/* All three live INSIDE the ivory driver cards of /pricing, so the inks are the
   card inks: rose-ink for the accent (5.4:1 on ivory), espresso for text, and a
   faint espresso track. text-gray-* classes remap themselves inside a card. */
const INK = 'var(--color-rose-ink)';
const TRACK = 'rgba(31,22,18,0.08)';

/** Three guest counts and the same three per-guest costs beside each. The bar
    is proportional to the head count, which is exactly the sentence it
    illustrates ("every guest brings food, transport and a bed"). */
export function GuestScale({ lang }: { lang: Lang }) {
  const p = (k: keyof typeof DIAG) => pickLocalized(DIAG[k], lang);
  const counts = [2, 10, 30];
  return (
    <figure>
      <div className="grid grid-cols-3 gap-3">
        {counts.map((n) => (
          <div key={n} className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-night">
              <Users className="w-4 h-4" style={{ color: INK }} aria-hidden="true" />
              <span className="font-heading text-2xl sm:text-3xl tracking-wide leading-none">{n}</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">{p('guestsWord')}</p>
            <div className="mt-2.5 h-2.5 rounded-full overflow-hidden" style={{ background: TRACK }} aria-hidden="true">
              <div className="h-full rounded-full" style={{ width: `${(n / counts[counts.length - 1]) * 100}%`, background: INK }} />
            </div>
            <div className="mt-2.5 flex items-center justify-center gap-1" style={{ color: INK }} aria-hidden="true">
              <Utensils className="w-3.5 h-3.5" />
              <Bus className="w-3.5 h-3.5" />
              <BedDouble className="w-3.5 h-3.5" />
              <span className="text-xs text-gray-300 ml-0.5">× {n}</span>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="text-[13px] text-gray-300 mt-3.5">{p('perGuest')}</figcaption>
    </figure>
  );
}

/** Dec–Mar dearest, spring and autumn cheaper, summer = midnight sun. Read
    straight from the "Season" card it sits in. */
export function PriceSeasonBand({ lang }: { lang: Lang }) {
  const p = (k: keyof typeof DIAG) => pickLocalized(DIAG[k], lang);
  return (
    <SeasonBand
      lang={lang}
      emptyColor={TRACK}
      segments={[
        { months: [11, 0, 1, 2], color: '#B03A5B', label: p('peak') },
        { months: [3, 4, 8, 9, 10], color: '#C9B5A4', label: p('shoulder') },
        { months: [5, 6, 7], color: '#B8915C', label: p('summer') },
      ]}
    />
  );
}

/** "One night in a glass igloo and the rest in a cabin costs less than three
    nights in glass" as two rows of three beds. */
export function NightsSplit({ lang }: { lang: Lang }) {
  const p = (k: keyof typeof DIAG) => pickLocalized(DIAG[k], lang);
  const Night = ({ glass }: { glass: boolean }) => (
    <span
      className="flex-1 h-10 rounded-lg flex items-center justify-center"
      style={glass ? { background: INK, color: '#FFFFFF' } : { border: '1px solid rgba(31,22,18,0.25)', color: '#5A4F48' }}
      aria-hidden="true"
    >
      {glass ? <Sparkles className="w-4 h-4" /> : <Home className="w-4 h-4" />}
    </span>
  );
  const Row = ({ pattern, verdict }: { pattern: boolean[]; verdict: string }) => (
    <div className="flex items-center gap-2">
      <div className="flex gap-1.5 flex-1">{pattern.map((g, i) => <Night key={i} glass={g} />)}</div>
      <span className="text-[13px] font-semibold text-night w-24 sm:w-28 text-right shrink-0">{verdict}</span>
    </div>
  );
  return (
    <figure className="space-y-2.5">
      <Row pattern={[true, false, false]} verdict={p('cheaper')} />
      <Row pattern={[true, true, true]} verdict={p('dearer')} />
      <figcaption className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-300 pt-1">
        <span className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: INK }} />{p('glassNight')}</span>
        <span className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ border: '1px solid rgba(31,22,18,0.35)' }} />{p('cabinNight')}</span>
      </figcaption>
    </figure>
  );
}
