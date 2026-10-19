import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { AURORA_VIDEO } from '../data/heroVideo';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { typeTitle } from '../lib/routeTitle.mjs';
import { TYPE_DESCRIPTION } from '../lib/typeMeta.mjs';
import LeadForm from '../components/LeadForm';
import { weddingTypes } from '../data/weddingTypes';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import NotFound from './NotFound';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import VenueCard from '../components/VenueCard';

const P: Record<'suitableVenues', Localized<string>> = {
  suitableVenues: {
    en: 'Suitable venues',
    fi: 'Sopivat hääpaikat',
    de: 'Passende Locations',
    ja: '適した会場',
    es: 'Lugares adecuados',
    'pt-BR': 'Locais adequados',
    'zh-CN': '合适的场地',
    ko: '어울리는 웨딩 장소',
    fr: 'Lieux adaptés',
    it: 'Location adatte',
    nl: 'Geschikte locaties', sv: 'Lämpliga platser',
  },
};

export default function WeddingTypePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, dataLang, tr } = useLang();
  const wt = weddingTypes.find((w) => w.slug === slug);
  if (!wt) return <NotFound />;

  const venues = wt.venueSlugs.map(getVenueBySlug).filter((v): v is NonNullable<ReturnType<typeof getVenueBySlug>> => !!v);

  return (
    <>
      <SEO
        title={typeTitle(wt.slug, wt.name[dataLang], dataLang)}
        description={TYPE_DESCRIPTION[wt.slug]?.[dataLang] ?? ''}
        path={`/wedding-types/${wt.slug}`}
        image={wt.heroImage}
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowWeddingType', lang)}
        title={wt.name[dataLang]}
        subtitle={wt.tagline[dataLang]}
        image={wt.heroImage}
        imageAlt={wt.name[dataLang]}
        video={wt.slug === 'northern-lights' ? AURORA_VIDEO : undefined}
        credit={wt.heroCredit}
        lang={lang}
      />

      <Section>
        {/* The price-range box is gone (Vesa 2026-07-29): the figure was invented
            and said nothing useful at a 16x span. Money lives on the pricing
            page only, and this card now points there instead of quoting one. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1">{tr.sections.season}</p>
            <p className="text-base text-white">{wt.bestSeason[dataLang]}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1">{tr.sections.capacity}</p>
            <p className="text-base text-white">{pickLocalized(wt.capacity, lang)}</p>
          </div>
          <L to="/pricing" className="bg-night-light/60 border border-white/5 hover:border-rose/40 rounded-2xl p-6 transition-colors">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1">{tr.sections.priceRange}</p>
            <p className="text-base text-rose">{tr.cta.learnMore} →</p>
          </L>
        </div>
        <p className="text-gray-300 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">{wt.description[dataLang]}</p>
      </Section>

      <Section className="bg-night-light/20">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="font-heading text-2xl text-white mb-4 tracking-wide">{tr.sections.features}</h3>
            <ul className="space-y-3">
              {wt.highlights[dataLang].map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-300">
                  <span className="text-aurora-green mt-1">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-2xl text-white mb-4 tracking-wide">{tr.sections.considerations}</h3>
            <ul className="space-y-3">
              {wt.considerations[dataLang].map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-300">
                  <span className="text-aurora-pink mt-1">!</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title={pickLocalized(P.suitableVenues, lang)}>
        {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
            Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
            renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
        <FeaturedPartnerSlot placement="wedding_type_venues" locale={lang} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((v) => (
            <VenueCard key={v.slug} venue={v} sid="wedding_type" />
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/30" title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm presetWeddingType={wt.slug} />
      </Section>
    </>
  );
}
