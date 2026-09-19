import { CalendarCheck, FileCheck, FileX, Landmark, Stamp, Clock, ListChecks } from 'lucide-react';
import L from './L';
import type { Localized } from '../data/localized';
import { pickLocalized } from '../data/localized';
import { DIAG } from '../data/diagramText';

/**
 * The practical guide's first question as a fork: one question, two answers,
 * and what each answer commits the couple to. Draws only what the two cards
 * below it say in prose (Vesa 19.9.2026: a diagram that clarifies, not a
 * picture that decorates).
 */
export default function RouteFork({ lang, symbolicTitle, legalTitle, seeVenues }: {
  lang: keyof Localized<string>;
  symbolicTitle: string;
  legalTitle: string;
  seeVenues: string;
}) {
  const p = (k: keyof typeof DIAG) => pickLocalized(DIAG[k], lang);
  const chip = 'flex items-center gap-2 text-sm text-gray-200';
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <p className="mx-auto max-w-xl text-center font-heading text-xl sm:text-2xl tracking-wide text-white bg-night-light/20 border border-white/10 rounded-2xl px-5 py-4">
        {p('forkQuestion')}
      </p>
      {/* fork lines, decorative */}
      <svg className="hidden md:block w-full h-10 text-white/35" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 0 V14 Q50 20 44 20 H31 Q25 20 25 26 V40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M50 0 V14 Q50 20 56 20 H69 Q75 20 75 26 V40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="grid md:grid-cols-2 gap-5 mt-3 md:mt-0">
        <div className="rounded-2xl border border-rose/40 bg-night-light/20 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-heading tracking-wide text-2xl text-rose">{p('no')}</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-aurora-pink font-semibold">{p('mostCouples')}</span>
          </div>
          <p className="text-white font-semibold mb-3">{symbolicTitle}</p>
          <ul className="space-y-2">
            <li className={chip}><FileX className="w-4 h-4 text-rose shrink-0" aria-hidden="true" />{p('symNoPapers')}</li>
            <li className={chip}><CalendarCheck className="w-4 h-4 text-rose shrink-0" aria-hidden="true" />{p('symDate')}</li>
            <li className={chip}><Landmark className="w-4 h-4 text-rose shrink-0" aria-hidden="true" />{p('symHome')}</li>
          </ul>
          <L to="/venues" className="mt-4 inline-flex items-center text-sm font-semibold text-aurora-pink hover:text-white transition-colors">
            {seeVenues} →
          </L>
        </div>
        <div className="rounded-2xl border border-white/15 bg-night-light/20 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-heading tracking-wide text-2xl text-gray-200">{p('yes')}</span>
          </div>
          <p className="text-white font-semibold mb-3">{legalTitle}</p>
          <ul className="space-y-2">
            <li className={chip}><FileCheck className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />{p('legExam')}</li>
            <li className={chip}><Stamp className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />{p('legCert')}</li>
            <li className={chip}><Clock className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />{p('legWeeks')}</li>
          </ul>
          <a href="#steps" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-aurora-pink hover:text-white transition-colors">
            <ListChecks className="w-4 h-4" aria-hidden="true" />{p('legSteps')} ↓
          </a>
        </div>
      </div>
    </div>
  );
}
