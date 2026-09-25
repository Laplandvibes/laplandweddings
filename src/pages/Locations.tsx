
import PageHero from '../components/PageHero';
import ImgCredit from '../components/ImgCredit';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { locations, locationImage } from '../data/locations';
import { seasonal, type SeasonalImage } from '../data/season';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs',
    fi: 'Häät Lapin paikkakunnilla',
    de: 'Hochzeitsregionen in Lappland',
    ja: 'ラップランドの結婚式地域：ロヴァニエミ、レヴィ、サーリセルカ、ユッラス',
    es: 'Regiones para bodas en Laponia',
    'pt-BR': 'Regiões para casamento na Lapônia',
    'zh-CN': '拉普兰婚礼地区：罗瓦涅米、莱维、萨利色尔卡、于拉斯',
    ko: '라플란드 웨딩 지역: 로바니에미, 레비, 사리셀카, 윌래스',
    fr: 'Régions de mariage en Laponie',
    it: 'Regioni per matrimoni in Lapponia',
    nl: 'Trouwregio’s in Lapland: Rovaniemi & meer', sv: 'Bröllopsregioner i Lappland: Rovaniemi, Levi, Saariselkä, Ylläs',
  },
  seoDesc: {
    en: 'Seven Lapland wedding regions plus city-option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare seasons, flights, and venues.',
    fi: 'Seitsemän Lapin häämatkakohdetta ja kaupunkivaihtoehto Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Vertaile sesonkeja, lentoyhteyksiä ja hääpaikkoja.',
    de: 'Sieben Hochzeitsregionen in Lappland plus die Stadt Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Saisons im Vergleich.',
    ja: 'ラップランドの7つの結婚式地域＋都市の選択肢オウル：ロヴァニエミ、サーリセルカ、レヴィ、ユッラス、ピュハ・ルオスト、キルピスヤルヴィ、ケミヤルヴィ、オウル。季節、フライト、会場を比較。',
    es: 'Siete regiones para bodas en Laponia más la opción urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare temporadas, vuelos y lugares.',
    'pt-BR': 'Sete regiões para casamento na Lapônia mais a opção urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Compare temporadas, voos e locais.',
    'zh-CN': '拉普兰七大婚礼地区外加城市之选奥卢：罗瓦涅米、萨利色尔卡、莱维、于拉斯、皮哈-卢奥斯托、基尔皮斯耶尔维、凯米耶尔维、奥卢。比较季节、航班与场地。',
    ko: '라플란드의 웨딩 지역 7곳과 도시 옵션 오울루: 로바니에미, 사리셀카, 레비, 윌래스, 퓌해-루오스토, 킬피스야르비, 케미야르비, 오울루. 시즌, 항공편, 웨딩 장소를 비교하세요.',
    fr: 'Sept régions de mariage en Laponie plus Oulu, l’option urbaine : Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Comparez saisons, vols et lieux.',
    it: 'Sette regioni per matrimoni in Lapponia più Oulu, l’opzione urbana: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Confronti stagioni, voli e location.',
    nl: 'Zeven trouwregio’s in Lapland plus stadsoptie Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Vergelijk seizoenen, vluchten en locaties.', sv: 'Sju bröllopsregioner i Lappland plus stadsalternativet Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Jämför säsonger, flyg och vigselplatser.',
  },
  imageAlt: {
    en: 'The Jätkänkynttilä bridge over the Kemijoki river in Rovaniemi on a June morning',
    fi: 'Jätkänkynttilä-silta Kemijoen yllä Rovaniemellä kesäkuun aamuna',
    de: 'Die Jätkänkynttilä-Brücke über den Kemijoki in Rovaniemi an einem Junimorgen',
    ja: '6月の朝、ロヴァニエミのケミ川に架かるヤトカンキュンッティラ橋',
    es: 'El puente Jätkänkynttilä sobre el río Kemijoki en Rovaniemi una mañana de junio',
    'pt-BR': 'A ponte Jätkänkynttilä sobre o rio Kemijoki em Rovaniemi numa manhã de junho',
    'zh-CN': '六月清晨，罗瓦涅米横跨凯米河的耶特坎金蒂莱桥',
    ko: '6월 아침, 로바니에미 케미강 위의 얘트캉퀸틸래 다리',
    fr: 'Le pont Jätkänkynttilä au-dessus du fleuve Kemijoki à Rovaniemi, un matin de juin',
    it: 'Il ponte Jätkänkynttilä sul fiume Kemijoki a Rovaniemi in una mattina di giugno',
    nl: 'De Jätkänkynttilä-brug over de rivier Kemijoki in Rovaniemi op een junimorgen',
    sv: 'Bron Jätkänkynttilä över Kemi älv i Rovaniemi en junimorgon',
  },
};

/* Hero vaihtuu kauden mukaan 1.10. (Vesa 20.9.2026). Sama silta molemmissa kausissa, jotta lukija
   näkee saman paikan kahtena vuodenaikana: kesällä kesäkuun aamu, talvikaudella huhtikuun rantajää.
   Vaihdettu 26.9.2026: edelliset kuvat (Xepheid 2020, Card 2010) olivat jo laplandwellnessillä (17.9.)
   ja laplandactivitiesilla (19.9.). Lumista, käyttämätöntä ja muusta kuin sisarruudusta otettua kuvaa
   sillasta ei löytynyt Commonsista eikä Pexelsistä, joten talvikuva on huhtikuulta. */
const HERO_SUMMER: SeasonalImage = {
  src: '/images/heroes/rovaniemi-jatkankynttila-june-andrew.jpg',
  avifSrcSet: '/images/heroes/rovaniemi-jatkankynttila-june-andrew-800.avif 800w, /images/heroes/rovaniemi-jatkankynttila-june-andrew-1200.avif 1200w',
  webpSrcSet: '/images/heroes/rovaniemi-jatkankynttila-june-andrew-800.webp 800w, /images/heroes/rovaniemi-jatkankynttila-june-andrew-1200.webp 1200w',
  credit: { name: 'Andrew 鐘', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:J%C3%A4tk%C3%A4nkynttil%C3%A4_Bridge.jpg' },
  alt: P.imageAlt,
};
const HERO_WINTER: SeasonalImage = {
  src: '/images/heroes/rovaniemi-jatkankynttila-april-liu.jpg',
  avifSrcSet: '/images/heroes/rovaniemi-jatkankynttila-april-liu-800.avif 800w, /images/heroes/rovaniemi-jatkankynttila-april-liu-1200.avif 1200w',
  webpSrcSet: '/images/heroes/rovaniemi-jatkankynttila-april-liu-800.webp 800w, /images/heroes/rovaniemi-jatkankynttila-april-liu-1200.webp 1200w',
  credit: { name: 'Mingyang LIU', license: 'Pexels', url: 'https://www.pexels.com/photo/modern-cable-stayed-bridge-in-winter-landscape-37143145/' },
  alt: {
    en: 'The Jätkänkynttilä bridge over the Kemijoki river in Rovaniemi in April, with shore ice along the bank',
    fi: 'Jätkänkynttilä-silta Kemijoen yllä Rovaniemellä huhtikuussa, rannassa vielä jäätä',
    de: 'Die Jätkänkynttilä-Brücke über den Kemijoki in Rovaniemi im April, mit Eis am Ufer',
    ja: '4月、岸辺に氷が残るロヴァニエミのケミ川とヤトカンキュンッティラ橋',
    es: 'El puente Jätkänkynttilä sobre el río Kemijoki en Rovaniemi en abril, con hielo en la orilla',
    'pt-BR': 'A ponte Jätkänkynttilä sobre o rio Kemijoki em Rovaniemi em abril, com gelo na margem',
    'zh-CN': '四月，罗瓦涅米凯米河岸边残冰与耶特坎金蒂莱桥',
    ko: '4월, 강가에 얼음이 남은 로바니에미 케미강과 얘트캉퀸틸래 다리',
    fr: 'Le pont Jätkänkynttilä au-dessus du fleuve Kemijoki à Rovaniemi en avril, avec de la glace sur la rive',
    it: 'Il ponte Jätkänkynttilä sul fiume Kemijoki a Rovaniemi ad aprile, con il ghiaccio lungo la riva',
    nl: 'De Jätkänkynttilä-brug over de rivier Kemijoki in Rovaniemi in april, met ijs langs de oever',
    sv: 'Bron Jätkänkynttilä över Kemi älv i Rovaniemi i april, med is längs stranden',
  },
};

export default function Locations() {
  const hero = seasonal(HERO_WINTER, HERO_SUMMER);
  const { lang, dataLang, tr } = useLang();
  return (
    <>
      <SEO
        title={pickLocalized(P.seoTitle, lang)}
        description={pickLocalized(P.seoDesc, lang)}
        path="/locations"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: locations.map((l, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://laplandweddings.online/locations/${l.slug}`,
            name: l.name[dataLang],
          })),
        }}
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowRegions', lang)}
        title={tr.locations.indexTitle}
        subtitle={tr.locations.indexIntro}
        image={hero.src}
        avifSrcSet={hero.avifSrcSet}
        webpSrcSet={hero.webpSrcSet}
        sizes={hero.sizes ?? '100vw'}
        objectPosition={hero.objectPosition}
        credit={hero.credit}
        lang={lang}
        imageAlt={pickLocalized(hero.alt, lang)}
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <L
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="group bg-night-light border border-white/5 hover:border-aurora-pink/40 rounded-2xl overflow-hidden transition-all"
            >
              {/* `relative` keeps the credit on this card's own photo. Without a positioned
                  ancestor inside the card, every card's credit resolved to the same outer
                  corner and the credits stacked on top of each other. */}
              <div className="aspect-[16/10] overflow-hidden relative">
                {/* A region can exist before it has its own photo — stock imagery is
                    banned and reusing another region's picture would misrepresent
                    the place, so fall back to the house gradient rather than
                    shipping a broken <img>. */}
                {locationImage(loc).src ? (
                  <img src={locationImage(loc).src} alt={locationImage(loc).alt[dataLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  decoding="async" width="800" height="600"/>
                ) : (
                  <div role="img" aria-label={locationImage(loc).alt[dataLang]} className="w-full h-full bg-gradient-to-br from-[#3A2A24] via-[#1F1612] to-[#2A1F18]" />
                )}
                <ImgCredit credit={locationImage(loc).credit} lang={lang} plain />
              </div>
              <div className="p-6">
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{loc.region[dataLang]}</p>
                <h3 className="font-heading text-2xl text-white mb-2 tracking-wide">{loc.name[dataLang]}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-3">{loc.intro[dataLang]}</p>
                <div className="text-xs text-gray-500">
                  ✈ {loc.airport} · {loc.airportDistanceKm} km
                </div>
              </div>
            </L>
          ))}
        </div>
      </Section>
    </>
  );
}
