import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { locations } from '../data/locations';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import NotFound from './NotFound';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import GoogleRatingRow from '../components/GoogleRatingRow';
import EditorsPickChip from '../components/EditorsPickChip';
import { bestGoogleRated, editorialPickNote } from '../data/googleReviews';
import { editorialCopy } from '../data/editorialCopy';

const P: Record<'weddings' | 'venuesInRegion', Localized<string>> = {
  weddings: {
    en: 'Weddings',
    fi: 'Häät',
    de: 'Hochzeiten',
    ja: '結婚式',
    es: 'Bodas',
    'pt-BR': 'Casamentos',
    'zh-CN': '婚礼',
    ko: '웨딩',
    fr: 'Mariages',
    it: 'Matrimoni',
    nl: 'Bruiloften', sv: 'Bröllop',
  },
  venuesInRegion: {
    en: 'Wedding venues in this region',
    fi: 'Hääpaikat tällä alueella',
    de: 'Hochzeitslocations in dieser Region',
    ja: 'この地域のウェディング会場',
    es: 'Lugares para bodas en esta región',
    'pt-BR': 'Locais para casamento nesta região',
    'zh-CN': '该地区的婚礼场地',
    ko: '이 지역의 웨딩 장소',
    fr: 'Lieux de mariage dans cette région',
    it: 'Location per matrimoni in questa regione',
    nl: 'Trouwlocaties in deze regio', sv: 'Bröllopsplatser i den här regionen',
  },
};

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, dataLang, tr } = useLang();
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return <NotFound />;

  const venues = loc.venueSlugs.map(getVenueBySlug).filter((v): v is NonNullable<ReturnType<typeof getVenueBySlug>> => !!v);

  // Earned, derived, unpurchasable: the best real Google rating among the
  // venues shown on this region page. Every card prints its own rating and
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
        title={`${loc.name[dataLang]}: ${pickLocalized(P.weddings, lang)} | LaplandWeddings`}
        description={loc.intro[dataLang].slice(0, 160)}
        path={`/locations/${loc.slug}`}
        image={loc.heroImage}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: loc.name[dataLang],
          description: loc.intro[dataLang],
          geo: { '@type': 'GeoCoordinates', addressCountry: 'FI' },
        }}
      />

      <PageHero
        compact
        eyebrow={loc.region[dataLang]}
        title={loc.name[dataLang]}
        subtitle={loc.intro[dataLang]}
        image={loc.heroImage}
        imageAlt={loc.heroAlt[dataLang]}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.airport}</p>
            <p className="font-heading text-2xl text-white">{loc.airport}</p>
            <p className="text-sm text-gray-400 mt-1">{loc.airportDistanceKm} km {ui('fromCentre', lang)}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{ui('highlight', lang)}</p>
            <p className="text-base text-white leading-relaxed">{loc.highlight[dataLang]}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.season}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{loc.seasonNote[dataLang]}</p>
          </div>
        </div>
      </Section>

      <Section title={tr.sections.bestFor} className="bg-night-light/20">
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {loc.bestFor[dataLang].map((b) => (
            <div key={b} className="bg-night-light/60 border border-rose/20 rounded-xl p-5 text-center">
              <p className="text-white font-medium">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {venues.length > 0 && (
      <Section title={pickLocalized(P.venuesInRegion, lang)}>
        {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
            Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
            renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
        <FeaturedPartnerSlot placement="location_venues" locale={lang} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((v) => (
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
                  <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                    <span>{v.capacity.min}–{v.capacity.max} {ui('guests', lang)}</span>
                    <span className="text-gold">{v.priceTier}</span>
                  </div>
                </div>
              </L>
              <div className="px-5 pt-3 pb-5 mt-auto">
                <GoogleRatingRow venue={v} />
              </div>
            </div>
          ))}
        </div>
      </Section>
      )}

      <Section className="bg-night-light/30" title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm presetLocation={loc.slug} />
      </Section>
    </>
  );
}
