import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { locations } from '../data/locations';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import NotFound from './NotFound';

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, tr } = useLang();
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return <NotFound />;

  const venues = loc.venueSlugs.map(getVenueBySlug).filter((v): v is NonNullable<ReturnType<typeof getVenueBySlug>> => !!v);

  return (
    <>
      <SEO
        title={`${loc.name[lang]} — ${lang === 'fi' ? 'Häät' : 'Weddings'} | LaplandWeddings`}
        description={loc.intro[lang].slice(0, 160)}
        path={`/locations/${loc.slug}`}
        image={loc.heroImage}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: loc.name[lang],
          description: loc.intro[lang],
          geo: { '@type': 'GeoCoordinates', addressCountry: 'FI' },
        }}
      />

      <PageHero
        compact
        eyebrow={loc.region[lang]}
        title={loc.name[lang]}
        subtitle={loc.intro[lang]}
        image={loc.heroImage}
        imageAlt={loc.heroAlt[lang]}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.airport}</p>
            <p className="font-heading text-2xl text-white">{loc.airport}</p>
            <p className="text-sm text-gray-400 mt-1">{loc.airportDistanceKm} km {lang === 'fi' ? 'keskustasta' : 'from centre'}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{lang === 'fi' ? 'Erityispiirre' : 'Highlight'}</p>
            <p className="text-base text-white leading-relaxed">{loc.highlight[lang]}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.season}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{loc.seasonNote[lang]}</p>
          </div>
        </div>
      </Section>

      <Section title={tr.sections.bestFor} className="bg-night-light/20">
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {loc.bestFor[lang].map((b) => (
            <div key={b} className="bg-night-light/60 border border-rose/20 rounded-xl p-5 text-center">
              <p className="text-white font-medium">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={lang === 'fi' ? 'Hääpaikat tällä alueella' : 'Wedding venues in this region'}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((v) => (
            <Link key={v.slug} to={`/venues/${v.slug}`} className="group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={v.image} alt={v.imageAlt[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors">{v.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{v.region[lang]}</p>
                <p className="text-sm text-gray-400 line-clamp-2">{v.description[lang]}</p>
                <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                  <span>{v.capacity.min}–{v.capacity.max} {lang === 'fi' ? 'vierasta' : 'guests'}</span>
                  <span className="text-gold">{v.priceTier}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/30" title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm presetLocation={loc.slug} />
      </Section>
    </>
  );
}
