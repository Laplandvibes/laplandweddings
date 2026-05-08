import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { weddingTypes } from '../data/weddingTypes';

export default function WeddingTypesIndex() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Häätyypit Lapissa — Revontulet, Lumikappeli, Lasi-iglu | LaplandWeddings' : 'Lapland Wedding Types — Northern Lights, Snow Chapel, Glass Igloo | LaplandWeddings'}
        description={lang === 'fi' ? 'Kuusi häätyyppiä Lapissa: revontuli, lumikappeli, lasi-iglu, keskiyön aurinko, elopement ja lupausten uusiminen.' : 'Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.'}
        path="/wedding-types"
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Häätyypit' : 'Types'}
        title={tr.types.indexTitle}
        subtitle={tr.types.indexIntro}
        image="https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg"
        imageAlt={lang === 'fi' ? 'Hääpari Lapin lumimaisemassa' : 'Wedding couple in Lapland snowscape'}
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {weddingTypes.map((wt) => (
            <Link
              key={wt.slug}
              to={`/wedding-types/${wt.slug}`}
              className="group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={wt.heroImage}
                  alt={wt.name[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-heading text-2xl text-white tracking-wide group-hover:text-rose transition-colors">{wt.name[lang]}</h3>
                  <span className="text-xs text-gold font-semibold whitespace-nowrap">{wt.priceRange}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{wt.tagline[lang]}</p>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{wt.description[lang]}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                  <span>{wt.bestSeason[lang]}</span>
                  <span>{wt.capacity}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
