import type { MouseEvent } from 'react';
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
  /** Licence deed; derived from `license` when omitted (see licenseHref). */
  licenseUrl?: string;
  /** The file is cropped from the original (receipt: "cover-centre"). Shown as "cropped" in the reader's
   *  language, because the licence asks us to say we changed the work (CC BY 4.0 §3(a)(1)(B)). Only ever on
   *  CC BY / CC0 / PD photos: a CC BY-SA file is never cropped (26.9.2026). */
  cropped?: boolean;
}

const CROPPED: Localized<string> = {
  en: 'cropped', fi: 'rajattu', de: 'zugeschnitten', ja: 'トリミング', es: 'recortada', 'pt-BR': 'recortada',
  'zh-CN': '已裁剪', ko: '자른 이미지', fr: 'recadrée', it: 'ritagliata', nl: 'bijgesneden', sv: 'beskuren',
};

/**
 * The licence itself must be one click away, not only the file page: CC BY-SA 4.0
 * §3(a)(1)(C), CC BY 2.0/2.5 §4(a). Added 2026-09-25; until then the hero credit linked
 * to the Commons file page only. "Public domain" has no deed and stays plain text.
 */
export function licenseHref(credit: ImageCredit): string | undefined {
  if (credit.licenseUrl) return credit.licenseUrl;
  const cc = /^CC (BY(?:-SA)?) (\d\.\d)$/.exec(credit.license.trim());
  if (cc) return `https://creativecommons.org/licenses/${cc[1].toLowerCase()}/${cc[2]}/`;
  if (/^CC0\b/.test(credit.license)) return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (credit.license === 'Pexels') return 'https://www.pexels.com/license/';
  return undefined;
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
  const cropped = credit.cropped ? CROPPED[lang] || CROPPED.en : '';
  const text = [caption, credit.name, credit.license, cropped].filter(Boolean).join(' · ');
  const cls = `absolute z-10 px-1 py-px text-[9px] leading-none text-white/60 bg-black/30 no-underline rounded-sm ${className || 'bottom-0.5 right-0.5'}`;
  if (plain) return <span className={cls}>{text}</span>;
  const deed = licenseHref(credit);
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <span className={`${cls} hover:bg-black/60`}>
      <a
        href={credit.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        className="text-inherit no-underline hover:text-white"
        aria-label={[caption, credit.name].filter(Boolean).join(', ')}
      >
        {[caption, credit.name].filter(Boolean).join(' · ')}
      </a>
      {' · '}
      {deed ? (
        <a
          href={deed}
          target="_blank"
          rel="license noopener noreferrer"
          onClick={stop}
          className="text-inherit no-underline whitespace-nowrap hover:text-white"
        >
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
      {cropped ? <span className="whitespace-nowrap">{' · '}{cropped}</span> : null}
    </span>
  );
}
