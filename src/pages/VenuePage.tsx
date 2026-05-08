import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import PriceTierBadge from '../components/PriceTierBadge';
import { getVenueBySlug } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import { hotelsLink } from '../lib/affiliate';
import NotFound from './NotFound';

export default function VenuePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, tr } = useLang();
  const v = slug ? getVenueBySlug(slug) : undefined;
  if (!v) return <NotFound />;

  return (
    <>
      <SEO
        title={`${v.name} — ${v.region[lang]} | LaplandWeddings`}
        description={v.description[lang].slice(0, 160)}
        path={`/venues/${v.slug}`}
        image={v.image}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EventVenue',
          name: v.name,
          description: v.description[lang],
          url: v.website,
          address: { '@type': 'PostalAddress', addressLocality: v.region[lang], addressCountry: 'FI' },
          maximumAttendeeCapacity: v.capacity.max,
          telephone: v.contact?.phone,
          email: v.contact?.email,
        }}
      />
      <PageHero
        compact
        eyebrow={v.region[lang]}
        title={v.name}
        subtitle={v.description[lang]}
        image={v.image}
        imageAlt={v.imageAlt[lang]}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.capacity}</p>
            <p className="font-heading text-3xl text-white">{v.capacity.min}–{v.capacity.max}</p>
            <p className="text-sm text-gray-400">{lang === 'fi' ? 'vierasta' : 'guests'}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-wider text-aurora-pink font-semibold mb-2">{tr.sections.priceRange}</p>
            <PriceTierBadge tier={v.priceTier} lang={lang} />
            <p className="text-sm text-gray-400 mt-2">{v.yearRound ? tr.sections.yearRound : tr.sections.seasonalOnly}</p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-2 justify-center">
            <a href={v.website} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center justify-center px-5 py-2.5 bg-rose hover:bg-pink text-white font-semibold rounded-full transition-colors">
              {tr.cta.visitWebsite} →
            </a>
            <a
              href={v.bookingUrl || hotelsLink(v.name)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full transition-colors"
            >
              {tr.cta.bookStay} (Hotels.com) →
            </a>
          </div>
        </div>
      </Section>

      <Section className="bg-night-light/20">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="font-heading text-2xl text-white mb-4 tracking-wide">{tr.sections.features}</h3>
            <ul className="space-y-3">
              {v.features[lang].map((f) => (
                <li key={f} className="flex items-start gap-3 text-gray-300">
                  <span className="text-aurora-green mt-1">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-2xl text-white mb-4 tracking-wide">{tr.sections.weddingSpaces}</h3>
            <ul className="space-y-3">
              {v.weddingSpaces[lang].map((s) => (
                <li key={s} className="flex items-start gap-3 text-gray-300">
                  <span className="text-rose mt-1">◆</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {v.weddingTypeSlugs.map((wt) => (
            <Link key={wt} to={`/wedding-types/${wt}`} className="text-xs px-3 py-1.5 rounded-full bg-night-light border border-white/10 hover:border-rose/40 text-gray-300 hover:text-white transition-colors">
              #{wt}
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/30" title={lang === 'fi' ? `Pyydä tarjous — ${v.name}` : `Request a quote — ${v.name}`} subtitle={tr.contact.formSub}>
        <LeadForm presetVenue={v.name} presetLocation={v.locationSlug} />
      </Section>
    </>
  );
}
