import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { locationTitle } from '../lib/routeTitle.mjs';
import { LOCATION_DESCRIPTION } from '../lib/locationMeta.mjs';
import LeadForm from '../components/LeadForm';
import { locations, locationImage } from '../data/locations';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import NotFound from './NotFound';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import VenueCard from '../components/VenueCard';

const P: Record<'venuesInRegion', Localized<string>> = {
  venuesInRegion: {
    en: 'Wedding venues in this region',
    fi: 'Hääpaikat tällä alueella',
    de: 'Hochzeitslocations in dieser Region',
    ja: 'この地域の結婚式会場',
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

  return (
    <>
      <SEO
        title={locationTitle(loc.name[dataLang], dataLang)}
        description={LOCATION_DESCRIPTION[loc.slug]?.[dataLang] ?? ''}
        path={`/locations/${loc.slug}`}
        image={locationImage(loc).src}
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
        image={locationImage(loc).src}
        imageAlt={locationImage(loc).alt[dataLang]}
        credit={locationImage(loc).credit}
        lang={lang}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.airport}</p>
            <p className="font-heading tracking-wide text-2xl text-white">{loc.airport}</p>
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
            <VenueCard key={v.slug} venue={v} sid="location" />
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
