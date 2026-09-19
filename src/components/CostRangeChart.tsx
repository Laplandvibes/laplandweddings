/**
 * The itemised price rows of /pricing drawn on one horizontal scale, so the
 * reader sees at a glance which line dominates (photography) and which are
 * small fixed fees. Every bar is the row's own published range; an open-ended
 * "from €239" row is a short bar with an arrow. Nothing is estimated here.
 *
 * Sits on the same ivory as the price list above it, with a euro scale and
 * gridlines (Vesa 19.9. ilta: the first, dark version was "epäselvä").
 */
export interface CostRangeRow {
  label: string;
  min: number;
  /** null = open-ended ("from"). */
  max: number | null;
  /** The row's own localised range text, printed as-is. */
  rangeText: string;
}

const INK = 'var(--color-rose-ink)';
const LINE = 'rgba(31,22,18,0.12)';
const TRACK = 'rgba(31,22,18,0.08)';

export default function CostRangeChart({ rows, title }: { rows: CostRangeRow[]; title: string }) {
  const scale = Math.max(...rows.map((r) => r.max ?? r.min)) || 1;
  const step = scale > 3000 ? 1000 : 500;
  const ticks: number[] = [];
  for (let t = 0; t <= scale; t += step) ticks.push(t);
  const fmt = (n: number) => `${n.toLocaleString('fi-FI')} €`;
  const pct = (n: number) => `${(n / scale) * 100}%`;
  return (
    <figure className="max-w-3xl mx-auto mt-6 bg-night-light/60 border border-white/5 rounded-2xl p-5 sm:p-7">
      <figcaption className="text-xs uppercase tracking-[0.2em] text-aurora-pink font-semibold mb-5">{title}</figcaption>
      <div className="flex gap-3 sm:gap-5">
        <div className="w-[40%] sm:w-[34%] shrink-0">
          {rows.map((r) => (
            <div key={r.label} className="h-14 flex items-center">
              <span className="text-[13px] sm:text-[15px] leading-tight text-night line-clamp-2">{r.label}</span>
            </div>
          ))}
        </div>
        <div className="relative flex-1 min-w-0">
          {ticks.map((t) => (
            <div key={t} aria-hidden="true" className="absolute top-0 bottom-6 w-px" style={{ left: pct(t), background: LINE }} />
          ))}
          {rows.map((r) => {
            const left = (r.min / scale) * 100;
            const width = r.max == null ? 5 : Math.max(1.5, ((r.max - r.min) / scale) * 100);
            return (
              <div key={r.label} className="h-14 relative flex flex-col justify-center gap-1.5">
                <span className="text-xs sm:text-[13px] font-semibold text-right" style={{ color: INK }}>{r.rangeText}</span>
                <div className="relative h-3 rounded-full" style={{ background: TRACK }} aria-hidden="true">
                  <div className="absolute top-0 h-3 rounded-full" style={{ left: `${left}%`, width: `${width}%`, background: INK }} />
                  {r.max == null && (
                    <span className="absolute -top-[6px] text-[15px] leading-none" style={{ left: `calc(${left + width}% + 4px)`, color: INK }}>
                      →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <div className="relative h-6" aria-hidden="true">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute top-1.5 text-[10px] sm:text-[11px] text-gray-400 whitespace-nowrap"
                style={{ left: pct(t), transform: t === 0 ? 'none' : 'translateX(-50%)' }}
              >
                {t === 0 ? '0' : fmt(t)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
