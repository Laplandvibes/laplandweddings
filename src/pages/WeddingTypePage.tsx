import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { weddingTypes } from '../data/weddingTypes';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import NotFound from './NotFound';

export default function WeddingTypePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, tr } = useLang();
  const wt = weddingTypes.find((w) => w.slug === slug);
  if (!wt) return <NotFound />;

  const venues = wt.venueSlugs.map(getVenueBySlug).filter((v): v is NonNullable<ReturnType<typeof getVenueBySlug>> => !!v);

  return (
    <>
      <SEO
        title={`${wt.name[lang]} — ${lang === 'fi' ? 'Häät Lapissa' : 'Lapland Weddings'} | LaplandWeddings`}
        description={wt.tagline[lang] + ' — ' + wt.description[lang].slice(0, 140)}
        path={`/wedding-types/${wt.slug}`}
        image={wt.heroImage}
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Häätyyppi' : 'Wedding type'}
        title={wt.name[lang]}
        subtitle={wt.tagline[lang]}
        image={wt.heroImage}
        imageAlt={wt.name[lang]}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1">{tr.sections.season}</p>
            <p className="text-base text-white">{wt.bestSeason[lang]}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1">{tr.sections.priceRange}</p>
            <p className="text-base text-white">{wt.priceRange}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-1">{tr.sections.capacity}</p>
            <p className="text-base text-white">{wt.capacity}</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto">{wt.description[lang]}</p>
      </Section>

      <Section className="bg-night-light/20">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="font-heading text-2xl text-white mb-4 tracking-wide">{tr.sections.features}</h3>
            <ul className="space-y-3">
              {wt.highlights[lang].map((h) => (
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
              {wt.considerations[lang].map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-300">
                  <span className="text-aurora-pink mt-1">!</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title={lang === 'fi' ? 'Sopivat hääpaikat' : 'Suitable venues'}>
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
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/30" title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm presetWeddingType={wt.slug} />
      </Section>
    </>
  );
}
