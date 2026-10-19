import { useMemo, useState } from 'react';
import { priceTierLabel } from '../components/PriceTierBadge';
import { ChevronDown } from 'lucide-react';

import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { STATIC_META } from '../lib/staticMeta.mjs';
import { useLang } from '../i18n/LangContext';
import { venues, type PriceTier } from '../data/venues';
import { locations } from '../data/locations';
import { weddingTypes } from '../data/weddingTypes';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import VenueCard from '../components/VenueCard';

const P: Record<'imageAlt' | 'independence', Localized<string>> = {
  independence: {
    fi: 'Nämä ovat Lapin tunnetuimmat paikat, joissa häitä vietetään. Emme edusta niitä emmekä järjestä häitä. Jos jokin paikka on jo mielessänne, kirjoittakaa se lomakkeeseen, niin toive kulkee sellaisenaan eteenpäin.',
    en: 'These are the best-known places in Lapland where weddings are held. We do not represent them and we do not organise weddings. If you already have a venue in mind, write it in the form and your wish is passed on exactly as you gave it.',
    de: 'Das sind die bekanntesten Orte Lapplands, an denen Hochzeiten gefeiert werden. Wir vertreten sie nicht und richten keine Hochzeiten aus. Wenn Sie bereits einen Ort im Sinn haben, tragen Sie ihn ins Formular ein, Ihr Wunsch wird unverändert weitergegeben.',
    ja: 'ラップランドで結婚式が行われている、よく知られた場所を集めました。当サイトはこれらの会場の代理店ではなく、結婚式の運営も行いません。すでに希望の会場がある場合はフォームにご記入ください。ご希望はそのままの形でお伝えします。',
    es: 'Estos son los lugares más conocidos de Laponia donde se celebran bodas. No los representamos ni organizamos bodas. Si ya tiene un lugar en mente, escríbalo en el formulario y su deseo se transmite tal cual.',
    'pt-BR': 'Estes são os lugares mais conhecidos da Lapônia onde se realizam casamentos. Não os representamos e não organizamos casamentos. Se vocês já têm um local em mente, escrevam no formulário e o pedido segue exatamente como foi informado.',
    'zh-CN': '这些是拉普兰最为人熟知的婚礼举办地。我们不代理这些场地，也不承办婚礼。如果您心中已有中意的场地，请写在表单里，您的意愿会原样转达。',
    ko: '라플란드에서 결혼식이 열리는 잘 알려진 장소들입니다. 저희는 이곳들을 대리하지 않으며 결혼식을 직접 주최하지도 않습니다. 이미 마음에 둔 장소가 있다면 양식에 적어 주세요. 그 희망은 그대로 전달됩니다.',
    fr: 'Voici les lieux les plus connus de Laponie où l’on célèbre des mariages. Nous ne les représentons pas et nous n’organisons pas de mariages. Si un lieu vous tient déjà à cœur, indiquez-le dans le formulaire : votre souhait sera transmis tel quel.',
    it: 'Questi sono i luoghi più noti della Lapponia in cui si celebrano matrimoni. Non li rappresentiamo e non organizziamo matrimoni. Se ha già una location in mente, la scriva nel modulo: il Suo desiderio viene trasmesso così com’è.',
    nl: 'Dit zijn de bekendste plekken in Lapland waar bruiloften worden gevierd. Wij vertegenwoordigen ze niet en organiseren geen bruiloften. Heeft u al een locatie op het oog, zet die dan in het formulier: uw wens gaat ongewijzigd door.',
    sv: 'Det här är de mest kända platserna i Lappland där bröllop hålls. Vi företräder dem inte och vi arrangerar inga bröllop. Har ni redan en plats i tankarna, skriv in den i formuläret så förs önskemålet vidare precis som ni angav det.',
  },
  // The photo is levi.fi's own picture of the Luvattumaa ice castle near Levi (2018). Until
  // 19.10.2026 it was captioned as a venue called "Levi Ice Castle", which no longer exists as
  // a wedding venue; the venue was removed and the caption now says what the picture shows.
  imageAlt: {
    en: 'The purple-lit snow corridor and ice stairs of the Luvattumaa ice castle near Levi, 2018',
    fi: 'Luvattumaan jäälinnan violetiksi valaistu lumikäytävä ja jääportaat Levin lähellä, 2018',
    de: 'Der violett beleuchtete Schneegang und die Eistreppe im Eisschloss Luvattumaa bei Levi, 2018',
    ja: 'レヴィ近郊、ルヴァットゥマーの氷の城の紫色にライトアップされた雪の回廊と氷の階段（2018年）',
    es: 'El pasillo de nieve iluminado en violeta y la escalera de hielo del castillo de hielo de Luvattumaa, cerca de Levi, 2018',
    'pt-BR': 'O corredor de neve iluminado em violeta e a escada de gelo do castelo de gelo de Luvattumaa, perto de Levi, 2018',
    'zh-CN': '莱维附近 Luvattumaa 冰堡内紫色灯光下的雪廊与冰阶，2018 年',
    ko: '레비 근처 루밧투마 얼음성의 보랏빛 조명 눈 복도와 얼음 계단, 2018년',
    fr: 'Le couloir de neige éclairé en violet et l’escalier de glace du château de glace de Luvattumaa, près de Levi, 2018',
    it: 'Il corridoio di neve illuminato di viola e la scala di ghiaccio del castello di ghiaccio di Luvattumaa, vicino a Levi, 2018',
    nl: 'De paars verlichte sneeuwgang en ijstrap van het ijskasteel Luvattumaa bij Levi, 2018',
    sv: 'Den violettbelysta snögången och istrappan i isslottet Luvattumaa nära Levi, 2018',
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

  return (
    <>
      <SEO
        title={STATIC_META['/venues'][lang].title}
        description={STATIC_META['/venues'][lang].description}
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
        image="/images/heroes/levi-ice-castle-corridor.jpg"
        avifSrcSet="/images/heroes/levi-ice-castle-corridor-800.avif 800w, /images/heroes/levi-ice-castle-corridor-1200.avif 1200w"
        webpSrcSet="/images/heroes/levi-ice-castle-corridor-800.webp 800w, /images/heroes/levi-ice-castle-corridor-1200.webp 1200w"
        sizes="100vw"
        credit={{ name: 'Levi', license: '', url: 'https://www.levi.fi/en/activities/places-to-visit/snow-castles/', caption: {
        en: 'Pictured: the Luvattumaa ice castle near Levi, 2018',
        fi: 'Kuvassa Luvattumaan jäälinna Levin lähellä, 2018',
        de: 'Im Bild: das Eisschloss Luvattumaa bei Levi, 2018',
        ja: '写真：レヴィ近郊のルヴァットゥマーの氷の城（2018年）',
        es: 'En la imagen: el castillo de hielo de Luvattumaa, cerca de Levi, 2018',
        'pt-BR': 'Na foto: o castelo de gelo de Luvattumaa, perto de Levi, 2018',
        'zh-CN': '图为莱维附近的 Luvattumaa 冰堡，2018 年',
        ko: '사진: 레비 근처 루밧투마 얼음성, 2018년',
        fr: 'Sur la photo : le château de glace de Luvattumaa, près de Levi, 2018',
        it: 'Nella foto: il castello di ghiaccio di Luvattumaa, vicino a Levi, 2018',
        nl: 'Op de foto: het ijskasteel Luvattumaa bij Levi, 2018',
        sv: 'På bilden: isslottet Luvattumaa nära Levi, 2018',
      } }}
        lang={lang}
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />
      <Section>
        {/* Same statement as the home page carries, placed above the filters so
            it is read before the grid rather than after it. */}
        <p className="text-center text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
          {pickLocalized(P.independence, lang)}
        </p>

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
              <option value="€€">{priceTierLabel('€€', lang)}</option>
              <option value="€€€">{priceTierLabel('€€€', lang)}</option>
              <option value="€€€€">{priceTierLabel('€€€€', lang)}</option>
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
              <VenueCard key={v.slug} venue={v} sid="venues" />
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
