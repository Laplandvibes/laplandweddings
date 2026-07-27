import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import L from '../components/L';

import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { venues, type PriceTier } from '../data/venues';
import { locations } from '../data/locations';
import { weddingTypes } from '../data/weddingTypes';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import GoogleRatingRow from '../components/GoogleRatingRow';
import EditorsPickChip from '../components/EditorsPickChip';
import { bestGoogleRated, editorialPickNote } from '../data/googleReviews';
import { editorialCopy } from '../data/editorialCopy';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt' | 'affordable' | 'midRange' | 'premium', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Venues: 20+ verified venues | LaplandWeddings',
    fi: 'Hääpaikat Lapissa: yli 20 kohdetta | LaplandWeddings',
    de: 'Hochzeitslocations in Lappland | LaplandWeddings',
    ja: 'ラップランドのウェディング会場：検証済み20以上の会場 | LaplandWeddings',
    es: 'Lugares para bodas en Laponia: más de 20 | LaplandWeddings',
    'pt-BR': 'Locais para casamento na Lapônia | LaplandWeddings',
    'zh-CN': '拉普兰婚礼场地：20+ 个经核实的场地 | LaplandWeddings',
    ko: '라플란드 웨딩 장소: 검증된 20곳 이상 | LaplandWeddings',
    fr: 'Lieux de mariage en Laponie | LaplandWeddings',
    it: 'Location per matrimoni in Lapponia | LaplandWeddings',
    nl: 'Trouwlocaties in Lapland: 20+ locaties | LaplandWeddings', sv: 'Bröllopsplatser i Lappland: 20+ verifierade platser | LaplandWeddings',
  },
  seoDesc: {
    en: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 20+ verified Lapland wedding venues across the regions.',
    fi: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. Yli 20 vahvistettua hääpaikkaa Lapin paikkakunnilla.',
    de: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village und mehr. Über 20 geprüfte Hochzeitslocations in ganz Lappland.',
    ja: 'カクスラウッタネン、ノーザンライツ・ランチ、アークティック・スノーホテル、スノービレッジほか。各地域に検証済みのラップランド・ウェディング会場が20以上。',
    es: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village y más. Más de 20 lugares para bodas verificados en toda Laponia.',
    'pt-BR': 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e mais. Mais de 20 locais de casamento verificados em toda a Lapônia.',
    'zh-CN': 'Kakslauttanen、Northern Lights Ranch、Arctic SnowHotel、Snow Village 等。遍布拉普兰各地的 20 多个经核实的婚礼场地。',
    ko: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village 등. 라플란드 전역에 검증된 웨딩 장소 20곳 이상.',
    fr: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village et plus. Plus de 20 lieux de mariage vérifiés dans toute la Laponie.',
    it: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e altri. Oltre 20 location per matrimoni verificate in tutta la Lapponia.',
    nl: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village en meer. 20+ geverifieerde trouwlocaties verspreid over Lapland.', sv: 'Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 20+ verified Lapland wedding venues across the regions.',
  },
  imageAlt: {
    en: 'Glass igloo under the Northern Lights at Kakslauttanen',
    fi: 'Lasi-iglu revontulien alla Kakslauttasella',
    de: 'Glasiglu unter den Polarlichtern in Kakslauttanen',
    ja: 'カクスラウッタネンのオーロラの下のガラスのイグルー',
    es: 'Iglú de cristal bajo la aurora boreal en Kakslauttanen',
    'pt-BR': 'Iglu de vidro sob a aurora boreal em Kakslauttanen',
    'zh-CN': 'Kakslauttanen 北极光下的玻璃冰屋',
    ko: '카크슬라우타넨의 오로라 아래 글라스 이글루',
    fr: 'Igloo de verre sous les aurores boréales à Kakslauttanen',
    it: 'Igloo di vetro sotto l’aurora boreale a Kakslauttanen',
    nl: 'Glazen iglo onder het noorderlicht in Kakslauttanen', sv: 'Glasiglo under norrskenet på Kakslauttanen',
  },
  affordable: {
    en: 'affordable', fi: 'edullinen', de: 'günstig', ja: 'お手頃',
    es: 'económico', 'pt-BR': 'acessível', 'zh-CN': '经济实惠', ko: '합리적',
    fr: 'abordable', it: 'economico', nl: 'betaalbaar', sv: 'prisvärd',
  },
  midRange: {
    en: 'mid-range', fi: 'keskihinta', de: 'Mittelklasse', ja: '中価格帯',
    es: 'gama media', 'pt-BR': 'intermediário', 'zh-CN': '中档', ko: '중급',
    fr: 'milieu de gamme', it: 'fascia media', nl: 'middensegment', sv: 'mellanklass',
  },
  premium: {
    en: 'premium', fi: 'premium', de: 'Premium', ja: 'プレミアム',
    es: 'premium', 'pt-BR': 'premium', 'zh-CN': '高端', ko: '프리미엄',
    fr: 'premium', it: 'premium', nl: 'premium', sv: 'premium',
  },
};

export default function Venues() {
  const { lang, dataLang, tr } = useLang();
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

  // Earned, derived, unpurchasable: the best real Google rating among the
  // venues actually shown. Computed from `filtered`, not from the full
  // registry, so "highest rated on this page" stays true as the reader narrows
  // the filters. Every card below prints its own rating and links to Google's
  // review list, so the claim can be checked on the spot. The sellable surface
  // is the slot above the grid.
  const pick = bestGoogleRated(filtered);
  const pickNote = editorialPickNote(pick, lang, {
    pickReason: pickLocalized(editorialCopy.pickReason, lang),
    verifiedOn: pickLocalized(editorialCopy.verifiedOn, lang),
  });

  return (
    <>
      <SEO
        title={pickLocalized(P.seoTitle, lang)}
        description={pickLocalized(P.seoDesc, lang)}
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
        eyebrow={ui('eyebrowVenues', lang)}
        title={tr.venues.indexTitle}
        subtitle={tr.venues.indexIntro}
        image="/images/heroes/glass-igloo-aurora.jpg"
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />
      <Section>
        <div className="bg-night-light/60 border border-white/5 rounded-2xl p-5 mb-8 grid sm:grid-cols-3 gap-3">
          <div className="relative">
            <select aria-label="Filter by location" value={loc} onChange={(e) => setLoc(e.target.value)} className="w-full rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 pr-9 text-white outline-none appearance-none">
              <option value="">{tr.venues.allLocations}</option>
              {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name[dataLang]}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" aria-hidden="true" />
          </div>
          <div className="relative">
            <select aria-label="Filter by type" value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 pr-9 text-white outline-none appearance-none">
              <option value="">{tr.venues.allTypes}</option>
              {weddingTypes.map((w) => <option key={w.slug} value={w.slug}>{w.name[dataLang]}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" aria-hidden="true" />
          </div>
          <div className="relative">
            <select aria-label="Filter by price" value={tier} onChange={(e) => setTier(e.target.value as PriceTier | '')} className="w-full rounded-lg bg-night-light border border-white/10 focus:border-rose px-3 py-2.5 pr-9 text-white outline-none appearance-none">
              <option value="">{tr.venues.allPrices}</option>
              <option value="€€">€€ {pickLocalized(P.affordable, lang)}</option>
              <option value="€€€">€€€ {pickLocalized(P.midRange, lang)}</option>
              <option value="€€€€">€€€€ {pickLocalized(P.premium, lang)}</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60" aria-hidden="true" />
          </div>
        </div>

        {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
            Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
            renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
        <FeaturedPartnerSlot placement="venues_index" locale={lang} />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-12">{tr.venues.noResults}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v) => (
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
                    <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{v.region[dataLang]}</p>
                    <h3 className="font-heading text-lg text-white mb-1 tracking-wide group-hover:text-rose transition-colors">{v.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3 mt-2">{v.description[dataLang]}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500">{v.capacity.min}–{v.capacity.max} {ui('guests', lang)}</span>
                      <span className="text-gold font-semibold">{v.priceTier}</span>
                    </div>
                  </div>
                </L>
                <div className="px-5 pt-3 pb-5 mt-auto">
                  <GoogleRatingRow venue={v} />
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-center text-xs text-gray-500 mt-6">{filtered.length} / {venues.length} {ui('venuesLower', lang)}</p>
        <div className="mt-10">
          <AffiliateDisclosure />
        </div>
      </Section>
    </>
  );
}
