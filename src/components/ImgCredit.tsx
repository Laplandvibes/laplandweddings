import type { Localized } from '../data/localized';

/**
 * Photo credit for a licensed stock image (Wikimedia Commons CC BY / CC BY-SA, Pexels).
 * Rendered as a very small link on the bottom edge of the image (Vesa 19.9.2026: not big, not
 * floating mid-image), so the attribution
 * travels with the picture on every surface (card, hero, OG preview aside). Own
 * photographs and partner-supplied photos carry no credit object and render nothing.
 * Receipts for every file: public/images/KUVALAHTEET.json.
 */
export interface ImageCredit {
  /** Author exactly as the source names them (username when that is all the source gives). */
  name: string;
  /** Licence short name, e.g. "CC BY-SA 4.0" or "Pexels". */
  license: string;
  /** Source page (Commons file page or Pexels photo page). */
  url: string;
  /** What the picture actually shows when the card names something else, e.g. "Kemi SnowCastle". */
  caption?: Localized<string>;
}

interface Props {
  credit?: ImageCredit;
  lang: keyof Localized<string>;
  /** Corner placement; defaults to bottom-right. */
  className?: string;
  /** Inside a card that is itself a link: an <a> may not nest in an <a> (hydration
      error, measured 19.9.2026), so render the same text as a <span>. The source link
      is shown wherever the image appears outside a link (page heroes). */
  plain?: boolean;
}

export default function ImgCredit({ credit, lang, className, plain }: Props) {
  if (!credit) return null;
  const caption = credit.caption ? credit.caption[lang] || credit.caption.en : '';
  const text = `${caption ? `${caption} · ` : ''}${credit.name} · ${credit.license}`;
  const cls = `absolute z-10 px-1 py-px text-[9px] leading-none text-white/60 bg-black/30 no-underline rounded-sm ${className || 'bottom-0.5 right-0.5'}`;
  if (plain) return <span className={cls}>{text}</span>;
  return (
    <a
      href={credit.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${cls} hover:text-white hover:bg-black/60`}
      aria-label={`${caption ? caption + '. ' : ''}${credit.name}, ${credit.license}`}
    >
      {text}
    </a>
  );
}
