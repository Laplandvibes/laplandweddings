import { use } from 'react';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import L from '../components/L';
import { STATIC_META } from '../lib/staticMeta.mjs';
import { useLang } from '../i18n/LangContext';
import {
  HERO_IMAGE,
  INTRO_SOURCE,
  SAMI_SOURCE,
  TRADITION_IMAGES,
  TRADITION_KIND,
  TRADITION_ORDER,
  TRADITION_SOURCES,
  loadTraditions,
} from '../data/traditions';
import ImgCredit from '../components/ImgCredit';

/**
 * Below 1024 px the headings, labels and chips are centred, body text stays left
 * (Vesa 18.10.2026, feedback_keskitys_tabletti_puhelin).
 *
 * /traditions — Finnish wedding traditions with a source under every entry.
 * Built 19.10.2026 to replace the unsourced "wedding moments" cards on the front
 * page (see src/data/traditions/types.ts). Copy: src/data/traditions/<lang>.ts.
 */
function SourceLine({ label, sources }: { label: string; sources: { label: string; url: string }[] }) {
  return (
    <p className="mt-5 text-base leading-relaxed text-gray-400">
      {label}:{' '}
      {sources.map((s, i) => (
        <span key={s.url}>
          {i > 0 && ' · '}
          <a href={s.url} target="_blank" rel="noopener" className="underline underline-offset-2">
            {s.label}
          </a>
        </span>
      ))}
    </p>
  );
}

export default function Traditions() {
  const { lang, dataLang } = useLang();
  const { page } = use(loadTraditions(lang));
  const meta = STATIC_META['/traditions'][lang];

  return (
    <>
      <SEO title={meta.title} description={meta.description} path="/traditions" image="/images/traditions/traditions-og.jpg" />
      <PageHero
        compact
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
        image={HERO_IMAGE?.src ?? '/images/heroes/couple-snow-trail-px19478687.jpg'}
        objectPosition={HERO_IMAGE?.position}
        credit={HERO_IMAGE?.credit}
        lang={lang}
        imageAlt={HERO_IMAGE ? HERO_IMAGE.alt[dataLang] : page.heroTitle}
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          {page.intro.map((p) => (
            <p key={p.slice(0, 24)} className="text-base sm:text-lg text-gray-300 leading-[1.75] mb-4">
              {p}
            </p>
          ))}
          <SourceLine label={page.sourcesLabel} sources={[INTRO_SOURCE]} />

          <nav aria-label={page.tocLabel} className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-aurora-pink mb-3 text-center lg:text-left">{page.tocLabel}</p>
            <ul className="flex flex-wrap justify-center lg:justify-start gap-2">
              {TRADITION_ORDER.map((slug) => (
                <li key={slug}>
                  <a
                    href={`#${slug}`}
                    className="inline-flex items-center min-h-11 px-4 rounded-full border border-white/15 text-sm text-gray-200 hover:border-rose/50 transition-colors"
                  >
                    {page.items[slug].title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      {TRADITION_ORDER.map((slug, i) => {
        const item = page.items[slug];
        const img = TRADITION_IMAGES[slug];
        const flip = i % 2 === 1;
        return (
          <section
            key={slug}
            id={slug}
            className={`scroll-mt-24 py-10 sm:py-16 ${i % 2 === 0 ? 'bg-night-light/30' : ''}`}
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
              <div className={`grid gap-8 lg:gap-12 items-start ${img ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
                {img && (
                  <figure className={`relative overflow-hidden rounded-2xl ${flip ? 'lg:order-2' : ''}`}>
                    <img
                      src={img.src}
                      alt={img.alt[dataLang]}
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="900"
                      className="w-full aspect-[4/3] object-cover"
                      style={img.position ? { objectPosition: img.position } : undefined}
                    />
                    <ImgCredit credit={img.credit} lang={lang} />
                  </figure>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-aurora-pink mb-2 text-center lg:text-left">
                    {page.kind[TRADITION_KIND[slug]]}
                  </p>
                  <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide leading-tight mb-4 text-center lg:text-left [text-wrap:balance]">
                    {item.title}
                  </h2>
                  {item.body.map((p) => (
                    <p key={p.slice(0, 24)} className="text-base text-gray-300 leading-[1.75] mb-4">
                      {p}
                    </p>
                  ))}
                  {item.inLapland && (
                    <div className="mt-5 rounded-2xl bg-night-light border border-line-light p-5">
                      <p
                        className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                        style={{ color: 'var(--color-rose-ink)' }}
                      >
                        {page.inLaplandLabel}
                      </p>
                      <p className="text-base leading-relaxed" style={{ color: '#1F1612' }}>
                        {item.inLapland}
                      </p>
                    </div>
                  )}
                  <SourceLine label={page.sourcesLabel} sources={TRADITION_SOURCES[slug]} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <Section title={page.sami.title}>
        <div className="max-w-3xl mx-auto">
          {page.sami.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-base sm:text-lg text-gray-300 leading-[1.75] mb-4">
              {p}
            </p>
          ))}
          <SourceLine label={page.sourcesLabel} sources={[SAMI_SOURCE]} />
        </div>
      </Section>

      <Section className="bg-night-light/30">
        <div className="max-w-3xl mx-auto bg-night-light border border-line-light rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl tracking-wide leading-tight mb-3" style={{ color: '#1F1612' }}>
            {page.cta.title}
          </h2>
          <p className="text-base leading-relaxed mb-6 max-w-xl mx-auto [text-wrap:pretty]" style={{ color: '#5A4F48' }}>
            {page.cta.body}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <L
              to="/contact#quote"
              data-umami-event="cta_traditions_enquiry"
              className="inline-flex items-center px-6 py-3 rounded-full font-semibold whitespace-nowrap"
              style={{ color: '#FFFFFF', background: '#C9466A' }}
            >
              {page.cta.enquiry} →
            </L>
            <L
              to="/venues"
              data-umami-event="cta_traditions_venues"
              className="inline-flex items-center px-6 py-3 rounded-full font-semibold whitespace-nowrap border-2"
              style={{ color: '#1F1612', borderColor: 'rgba(31,22,18,0.25)' }}
            >
              {page.cta.venues} →
            </L>
          </div>
        </div>
      </Section>
    </>
  );
}
