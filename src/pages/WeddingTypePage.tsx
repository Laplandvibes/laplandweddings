import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { weddingTypes } from '../data/weddingTypes';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import NotFound from './NotFound';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import GoogleRatingRow from '../components/GoogleRatingRow';
import EditorsPickChip from '../components/EditorsPickChip';
import { bestGoogleRated, editorialPickNote, pickFirst } from '../data/googleReviews';
import { editorialCopy } from '../data/editorialCopy';

const P: Record<'titleSuffix' | 'suitableVenues', Localized<string>> = {
  titleSuffix: {
    en: 'Lapland Weddings',
    fi: 'Häät Lapissa',
    de: 'Hochzeiten in Lappland',
    ja: 'ラップランドの結婚式',
    es: 'Bodas en Laponia',
    'pt-BR': 'Casamentos na Lapônia',
    'zh-CN': '拉普兰婚礼',
    ko: '라플란드 웨딩',
    fr: 'Mariages en Laponie',
    it: 'Matrimoni in Lapponia',
    nl: 'Bruiloften in Lapland', sv: 'Bröllop i Lappland',
  },
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

  // Earned, derived, unpurchasable: the best real Google rating among the
  // venues shown for this wedding type. Every card prints its own rating and
  // links to Google's review list, so the claim is checkable. The sellable
  // surface is the slot above the grid.
  const pick = bestGoogleRated(venues);
  const pickNote = editorialPickNote(pick, lang, {
    pickReason: pickLocalized(editorialCopy.pickReason, lang),
    verifiedOn: pickLocalized(editorialCopy.verifiedOn, lang),
  });

  return (
    <>
      <SEO
        title={`${wt.name[dataLang]}: ${pickLocalized(P.titleSuffix, lang)} | LaplandWeddings`}
        description={wt.tagline[dataLang] + ': ' + wt.description[dataLang].slice(0, 140)}
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
            <p className="text-base text-white">{wt.capacity}</p>
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
          {pickFirst(venues, pick).map((v) => (
            // The rating row is an <a>, so it sits BESIDE the card link, not
            // inside it: nested anchors are invalid HTML.
            <div key={v.slug} className="group flex flex-col bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all">
              <L to={`/venues/${v.slug}`} className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={v.imageAlt[dataLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  decoding="async" width="800" height="600"/>
                </div>
                <div className="px-5 pt-5">
                  {pick === v && (
                    <EditorsPickChip
                      label={pickLocalized(editorialCopy.pickLabel, lang)}
                      reason={pickLocalized(editorialCopy.pickReason, lang)}
                      note={pickNote}
                      className="mb-3"
                    />
                  )}
                  <h3 className="font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors">{v.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{v.region[dataLang]}</p>
                  <p className="text-sm text-gray-400 line-clamp-2">{v.description[dataLang]}</p>
                </div>
              </L>
              <div className="px-5 pt-3 pb-5 mt-auto">
                <GoogleRatingRow venue={v} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/30" title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm presetWeddingType={wt.slug} />
      </Section>
    </>
  );
}
