import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { locations } from '../data/locations';

export default function Locations() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Häät Lapin paikkakunnilla — Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings' : 'Lapland Wedding Regions — Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings'}
        description={lang === 'fi' ? 'Kuusi Lapin häämatkakohdetta — Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi. Vertaile sesonkeja, lentoyhteyksiä ja venueita.' : 'Six Lapland wedding regions — Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi. Compare seasons, flights, and venues.'}
        path="/locations"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: locations.map((l, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://laplandweddings.online/locations/${l.slug}`,
            name: l.name[lang],
          })),
        }}
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Paikkakunnat' : 'Regions'}
        title={tr.locations.indexTitle}
        subtitle={tr.locations.indexIntro}
        image="https://www.visitrovaniemi.fi/wp-content/uploads/b3d5b020-7fb8-11ee-9fca-6fdb01d69922.jpeg"
        imageAlt={lang === 'fi' ? 'Lapin tunturit ilta-auringossa' : 'Lapland fells in evening sun'}
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="group bg-night-light border border-white/5 hover:border-aurora-pink/40 rounded-2xl overflow-hidden transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={loc.heroImage} alt={loc.heroAlt[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{loc.region[lang]}</p>
                <h3 className="font-heading text-2xl text-white mb-2 tracking-wide">{loc.name[lang]}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-3">{loc.intro[lang]}</p>
                <div className="text-xs text-gray-500">
                  ✈ {loc.airport} · {loc.airportDistanceKm} km
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
