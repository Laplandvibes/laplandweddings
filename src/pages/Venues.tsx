import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { venues, type PriceTier } from '../data/venues';
import { locations } from '../data/locations';
import { weddingTypes } from '../data/weddingTypes';

export default function Venues() {
  const { lang, tr } = useLang();
  const [loc, setLoc] = useState('');
  const [type, setType] = useState('');
  const [tier, setTier] = useState<PriceTier | ''>('');

  const filtered = useMemo(() => {
    return venues.filter((v) =>
      (!loc || v.locationSlug === loc) &&
      (!type || v.weddingTypeSlugs.includes(type)) &&
      (!tier || v.priceTier === tier),
    );
  }, [loc, type, tier]);

  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Hääpaikat Lapissa — yli 20 vahvistettua kohdetta | LaplandWeddings' : 'Lapland Wedding Venues — 20+ verified venues | LaplandWeddings'}
        description={lang === 'fi' ? 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. Yli 20 vahvistettua hääpaikkaa Lapin paikkakunnilla.' : 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 20+ verified Lapland wedding venues across the regions.'}
        path="/venues"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: venues.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://laplandweddings.online/venues/${v.slug}`,
            name: v.name,
          })),
        }}
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Hääpaikat' : 'Venues'}
        title={tr.venues.indexTitle}
        subtitle={tr.venues.indexIntro}
        image="https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg"
        imageAlt={lang === 'fi' ? 'Lapin lasi-iglut lumessa' : 'Lapland glass igloos in snow'}
      />
      <Section>
        <div className="bg-night-light/60 border border-white/5 rounded-2xl p-5 mb-8 grid sm:grid-cols-3 gap-3">
          <select value={loc} onChange={(e) => setLoc(e.target.value)} className="rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 text-white outline-none">
            <option value="">{tr.venues.allLocations}</option>
            {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name[lang]}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 text-white outline-none">
            <option value="">{tr.venues.allTypes}</option>
            {weddingTypes.map((w) => <option key={w.slug} value={w.slug}>{w.name[lang]}</option>)}
          </select>
          <select value={tier} onChange={(e) => setTier(e.target.value as PriceTier | '')} className="rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 text-white outline-none">
            <option value="">{tr.venues.allPrices}</option>
            <option value="€€">€€ {lang === 'fi' ? 'edullinen' : 'affordable'}</option>
            <option value="€€€">€€€ {lang === 'fi' ? 'keskihinta' : 'mid-range'}</option>
            <option value="€€€€">€€€€ {lang === 'fi' ? 'premium' : 'premium'}</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-12">{tr.venues.noResults}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v) => (
              <Link key={v.slug} to={`/venues/${v.slug}`} className="group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={v.imageAlt[lang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{v.region[lang]}</p>
                  <h3 className="font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors">{v.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mt-2">{v.description[lang]}</p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{v.capacity.min}–{v.capacity.max} {lang === 'fi' ? 'vierasta' : 'guests'}</span>
                    <span className="text-gold font-semibold">{v.priceTier}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <p className="text-center text-xs text-gray-500 mt-6">{filtered.length} / {venues.length} {lang === 'fi' ? 'hääpaikkaa' : 'venues'}</p>
      </Section>
    </>
  );
}
