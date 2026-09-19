import type { Localized } from '../data/localized';

/**
 * Photo credit for a licensed stock image (Wikimedia Commons CC BY / CC BY-SA, Pexels).
 * Rendered as a small link in the corner of the image it belongs to, so the attribution
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
}

export default function ImgCredit({ credit, lang, className }: Props) {
  if (!credit) return null;
  const caption = credit.caption ? credit.caption[lang] || credit.caption.en : '';
  return (
    <a
      href={credit.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-10 rounded px-1.5 py-0.5 text-[10px] leading-tight text-white/85 bg-black/45 hover:bg-black/65 hover:text-white no-underline ${className || 'bottom-2 right-2'}`}
      aria-label={`${caption ? caption + '. ' : ''}${credit.name}, ${credit.license}`}
    >
      {caption ? `${caption} · ` : ''}{credit.name} · {credit.license}
    </a>
  );
}
