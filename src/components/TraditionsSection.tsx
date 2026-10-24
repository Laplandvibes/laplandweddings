import { use } from 'react';
import Section from './Section';
import L from './L';
import { CROPPED, licenseHref, licenseLabel } from './ImgCredit';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';
import { HOME_SLUGS, TRADITION_IMAGES, loadTraditions } from '../data/traditions';

/** Label with its own punctuation: full-width colon in ja/zh, a space before it in fr. */
const PHOTOS: Localized<string> = {
  fi: 'Kuvat: ', en: 'Photos: ', de: 'Fotos: ', ja: '写真：', es: 'Fotos: ', 'pt-BR': 'Fotos: ', 'zh-CN': '图片：',
  ko: '사진: ', fr: 'Photos : ', it: 'Foto: ', nl: 'Foto’s: ', sv: 'Foton: ',
};

/**
 * Front-page "Finnish wedding traditions": four real customs, each card read in full
 * and linked to its section on /traditions. Replaced the "wedding moments" cards on
 * 19.10.2026 (husky arrival, frozen lakes, sauna to snow, ice hole), whose claims had
 * no source and whose text stopped at "…" with nowhere to click.
 *
 * Credits: one line under the grid, not on the photos (Vesa 26.9.2026, card grids).
 * Render inside <Suspense>: the copy is loaded for the reader's language only.
 */
export default function TraditionsSection() {
  const { lang, dataLang } = useLang();
  const { home } = use(loadTraditions(lang));
  // Same order as the cards, each credit named after its card (§33: a line over 80
  // characters is body text, 16 px).
  const credited = HOME_SLUGS.flatMap((s) => {
    const c = TRADITION_IMAGES[s]?.credit;
    const title = home.items[s]?.title;
    return c && title ? [{ c, title }] : [];
  });

  return (
    <Section eyebrow={home.eyebrow} title={home.title} subtitle={home.intro} className="bg-night-light/30">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
        {HOME_SLUGS.map((slug) => {
          const item = home.items[slug];
          if (!item) return null;
          const img = TRADITION_IMAGES[slug];
          return (
            <L
              key={slug}
              to={`/traditions#${slug}`}
              data-umami-event="traditions_card"
              data-umami-event-tradition={slug}
              className="group flex flex-col bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-colors"
            >
              {img && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt[dataLang]}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={img.position ? { objectPosition: img.position } : undefined}
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-heading text-2xl text-white tracking-wide leading-tight mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.teaser}</p>
                <span
                  className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:underline underline-offset-4"
                  style={{ color: 'var(--color-rose-ink)' }}
                >
                  {home.readMore} <span aria-hidden="true">→</span>
                </span>
              </div>
            </L>
          );
        })}
      </div>
      {credited.length > 0 && (
        <p className="max-w-4xl mx-auto mt-5 text-center text-base leading-relaxed text-gray-400 [text-wrap:pretty]">
          {pickLocalized(PHOTOS, lang)}
          {credited.map(({ c, title }, i) => {
            const deed = licenseHref(c);
            return (
              <span key={c.url}>
                {i > 0 && ' · '}
                {title} (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  {c.name}
                </a>
                {', '}
                {deed ? (
                  <a href={deed} target="_blank" rel="license noopener noreferrer" className="underline underline-offset-2">
                    {licenseLabel(c.license, lang)}
                  </a>
                ) : (
                  licenseLabel(c.license, lang)
                )}
                {c.cropped ? `, ${pickLocalized(CROPPED, lang)}` : ''})
              </span>
            );
          })}
        </p>
      )}
      <div className="text-center mt-8 sm:mt-10">
        <L
          to="/traditions"
          data-umami-event="cta_traditions_all"
          className="inline-flex items-center px-6 py-3 border border-white/20 hover:bg-white/5 text-white rounded-full transition-colors"
        >
          {home.allTraditions} →
        </L>
      </div>
    </Section>
  );
}
