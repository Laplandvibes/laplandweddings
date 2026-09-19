/**
 * The itemised price rows of /pricing drawn on one horizontal scale, so the
 * reader sees at a glance which line dominates (photography) and which are
 * small fixed fees. Every bar is the row's own published range; an open-ended
 * "from €239" row is a short bar with an arrow. Nothing is estimated here.
 */
export interface CostRangeRow {
  label: string;
  min: number;
  /** null = open-ended ("from"). */
  max: number | null;
  /** The row's own localised range text, printed as-is. */
  rangeText: string;
}

export default function CostRangeChart({ rows, title }: { rows: CostRangeRow[]; title: string }) {
  const scale = Math.max(...rows.map((r) => r.max ?? r.min)) || 1;
  const fmt = (n: number) => `${n.toLocaleString('fi-FI')} €`;
  return (
    <figure className="max-w-3xl mx-auto mt-6 bg-night-light/20 border border-white/5 rounded-2xl p-5 sm:p-6">
      <figcaption className="text-xs uppercase tracking-[0.2em] text-aurora-pink font-semibold mb-4">{title}</figcaption>
      <div className="space-y-3.5">
        {rows.map((r) => {
          const left = (r.min / scale) * 100;
          const width = r.max == null ? 5 : Math.max(1.5, ((r.max - r.min) / scale) * 100);
          return (
            <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 items-center">
              <p className="text-sm text-gray-200 truncate">{r.label}</p>
              <p className="text-xs font-semibold text-rose whitespace-nowrap">{r.rangeText}</p>
              <div className="col-span-2 relative h-2 rounded-full bg-white/10" aria-hidden="true">
                <div className="absolute top-0 h-2 rounded-full bg-rose" style={{ left: `${left}%`, width: `${width}%` }} />
                {r.max == null && (
                  <span className="absolute -top-[5px] text-rose text-[13px] leading-none" style={{ left: `calc(${left + width}% + 3px)` }}>
                    →
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-2" aria-hidden="true">
        <span>0 €</span>
        <span>{fmt(scale)}</span>
      </div>
    </figure>
  );
}
