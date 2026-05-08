import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';
import { useLang, localiseLanguage } from '../i18n/LangContext';
import { locations } from '../data/locations';
import { weddingTypes } from '../data/weddingTypes';
import { planners } from '../data/planners';
import { venues } from '../data/venues';

export default function Home() {
  const { lang, tr } = useLang();

  const seoTitle = lang === 'fi'
    ? 'Häät Lapissa — kaikki yhdellä sivulla | LaplandWeddings'
    : 'Lapland Weddings — everything in one place | LaplandWeddings';
  const seoDesc = lang === 'fi'
    ? 'Lapin kattavin häämatkasivu. Yli 20 hääpaikkaa, 7 hääsuunnittelijaa, DVV-paperit, hinta-arviot. Pyydä 3 räätälöityä tarjousta yhdellä lomakkeella.'
    : 'The most complete Lapland wedding planning site. 20+ venues, 7 planners, DVV paperwork, real prices. Get 3 personalised quotes with one form.';

  const featuredVenues = venues.slice(0, 6);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'LaplandWeddings',
          url: 'https://laplandweddings.online',
          description: seoDesc,
          areaServed: 'Finnish Lapland',
          parentOrganization: {
            '@type': 'Organization',
            name: 'LaplandVibes',
            url: 'https://laplandvibes.com',
          },
        }}
      />

      <PageHero
        title={tr.home.heroTitle}
        subtitle={tr.home.heroSubtitle}
        image="https://mariahedengren.com/wp-content/uploads/2019/12/00-cover-lapland-wedding-kaksalauttanen-resort.jpg"
        imageAlt={lang === 'fi' ? 'Hääpari Kakslauttasella revontulien alla — kuva: Maria Hedengren Photography' : 'Wedding couple at Kakslauttanen under the Northern Lights — photo: Maria Hedengren Photography'}
      >
        <Link
          to="/contact"
          className="inline-flex items-center px-7 py-3.5 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-xl shadow-rose/30 transition-colors"
        >
          {tr.cta.getThreeQuotes}
        </Link>
        <Link
          to="/venues"
          className="inline-flex items-center px-7 py-3.5 border-2 border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-colors"
        >
          {tr.cta.seeVenues}
        </Link>
      </PageHero>

      {/* Why Lapland */}
      <Section title={tr.home.whyTitle}>
        <div className="grid sm:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden max-w-5xl mx-auto">
          {[
            {
              stat: '300+',
              label: lang === 'fi' ? 'häät vuodessa' : 'weddings a year',
              body: lang === 'fi'
                ? 'Lappi on vakiintunut Pohjois-Euroopan suosituin destination wedding -kohde. Sesonki jouluk.–maalisk.'
                : 'Lapland is the most popular destination wedding region in Northern Europe. Season runs December–March.',
            },
            {
              stat: lang === 'fi' ? '€1 600 →' : 'from €1 600',
              label: lang === 'fi' ? 'pienin paketti' : 'smallest package',
              body: lang === 'fi'
                ? 'Kahdestaan vihille 1 600 €:sta, premium-juhlat 50 000 €:on. Luksus jopa 100 000 €.'
                : 'Elope from €1 600, premium celebrations to €50 000, luxury up to €100 000+.',
            },
            {
              stat: lang === 'fi' ? '3–5 viikkoa' : '3–5 weeks',
              label: lang === 'fi' ? 'paperityö valmista' : 'paperwork done',
              body: lang === 'fi'
                ? 'DVV hoitaa avioliittoluvan ulkomaalaisille pareille 3–5 viikossa. Maksuton.'
                : 'The DVV processes the marriage licence for foreign couples in 3–5 weeks. Free of charge.',
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-night-light p-7 sm:p-9 flex flex-col">
              <p className="font-heading text-4xl sm:text-5xl text-rose tracking-wide mb-1">{stat.stat}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-aurora-pink font-semibold mb-4">{stat.label}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{stat.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-10 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">{tr.home.whyP}</p>
      </Section>

      {/* Wedding Types */}
      <Section eyebrow={lang === 'fi' ? 'Häätyypit' : 'Wedding types'} title={tr.home.typesTitle} className="bg-night-light/30">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {weddingTypes.map((wt) => (
            <Link
              key={wt.slug}
              to={`/wedding-types/${wt.slug}`}
              className="group relative aspect-[3/4] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-night-light border border-white/5 hover:border-rose/40 transition-all"
            >
              <img
                src={wt.heroImage}
                alt={wt.name[lang]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6">
                <h3 className="font-heading text-base sm:text-3xl text-white tracking-wide mb-1 sm:mb-1.5 leading-tight">
                  {wt.name[lang]}
                </h3>
                <p className="hidden sm:block text-sm text-gray-200/90 mb-3 line-clamp-2">{wt.tagline[lang]}</p>
                <div className="flex items-center justify-between text-[10px] sm:text-xs gap-2">
                  <span className="text-gold font-semibold whitespace-nowrap">{wt.priceRange}</span>
                  <span className="hidden sm:inline text-gray-300">{wt.capacity}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Locations */}
      <Section eyebrow={lang === 'fi' ? 'Paikkakunnat' : 'Regions'} title={tr.home.locationsTitle}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-night-light border border-white/5 hover:border-aurora-pink/40 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={loc.heroImage}
                  alt={loc.heroAlt[lang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{loc.region[lang]}</p>
                <h3 className="font-heading text-2xl text-white tracking-wide">{loc.name[lang]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured venues */}
      <Section eyebrow={lang === 'fi' ? 'Vahvistettuja hääpaikkoja' : 'Verified venues'} title={lang === 'fi' ? 'Lapin kuuluisimmat hääpaikat' : 'Lapland’s most famous wedding venues'} className="bg-night-light/30">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredVenues.map((v) => (
            <Link
              key={v.slug}
              to={`/venues/${v.slug}`}
              className="group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={v.image} alt={v.imageAlt[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{v.region[lang]}</p>
                <h3 className="font-heading text-lg text-white mb-2 tracking-wide group-hover:text-rose transition-colors">{v.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-3">{v.description[lang]}</p>
                <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                  <span>{v.capacity.min}–{v.capacity.max} {lang === 'fi' ? 'vierasta' : 'guests'}</span>
                  <span className="text-gold">{v.priceTier}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/venues" className="inline-flex items-center px-6 py-3 border border-white/20 hover:bg-white/5 text-white rounded-full transition-colors">
            {tr.cta.seeAllVenues} →
          </Link>
        </div>
      </Section>

      {/* Planners */}
      <Section eyebrow={lang === 'fi' ? 'Hääsuunnittelijat' : 'Wedding planners'} title={tr.home.plannersTitle} subtitle={tr.home.plannersIntro}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {planners.slice(0, 6).map((p) => (
            <div key={p.slug} className="bg-night-light border border-white/5 rounded-2xl p-5">
              <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{p.homeBase[lang]}</p>
              <h3 className="font-heading text-lg text-white mb-2 tracking-wide">{p.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-3 mb-3">{p.description[lang]}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gold">{p.priceTier}</span>
                <span className="text-gray-500">{p.languages.map((l) => localiseLanguage(l, lang)).join(' · ')}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/planners" className="inline-flex items-center px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-lg shadow-rose/30">
            {tr.planners.threeQuotesTitle} →
          </Link>
        </div>
      </Section>

      {/* Newsletter */}
      <Section className="bg-night-light/20">
        <NewsletterSignup />
      </Section>
    </>
  );
}
