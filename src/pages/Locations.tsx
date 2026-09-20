
import PageHero from '../components/PageHero';
import ImgCredit from '../components/ImgCredit';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { locations, locationImage } from '../data/locations';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings',
    fi: 'Häät Lapin paikkakunnilla | LaplandWeddings',
    de: 'Hochzeitsregionen in Lappland | LaplandWeddings',
    ja: 'ラップランドの結婚式地域：ロヴァニエミ、レヴィ、サーリセルカ、ユッラス | LaplandWeddings',
    es: 'Regiones para bodas en Laponia | LaplandWeddings',
    'pt-BR': 'Regiões para casamento na Lapônia | LaplandWeddings',
    'zh-CN': '拉普兰婚礼地区：罗瓦涅米、莱维、萨利色尔卡、于拉斯 | LaplandWeddings',
    ko: '라플란드 웨딩 지역: 로바니에미, 레비, 사리셀카, 윌래스 | LaplandWeddings',
    fr: 'Régions de mariage en Laponie | LaplandWeddings',
    it: 'Regioni per matrimoni in Lapponia | LaplandWeddings',
    nl: 'Trouwregio’s in Lapland: Rovaniemi & meer | LaplandWeddings', sv: 'Bröllopsregioner i Lappland: Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings',
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
    en: 'The Jätkänkynttilä bridge and the midnight sun over the Kemijoki river in Rovaniemi',
    fi: 'Jätkänkynttilä-silta ja keskiyön aurinko Kemijoella Rovaniemellä',
    de: 'Die Jätkänkynttilä-Brücke und die Mitternachtssonne über dem Kemijoki in Rovaniemi',
    ja: 'ロヴァニエミ、ケミ川にかかるヤトカンキュンッティラ橋と真夜中の太陽',
    es: 'El puente Jätkänkynttilä y el sol de medianoche sobre el río Kemijoki en Rovaniemi',
    'pt-BR': 'A ponte Jätkänkynttilä e o sol da meia-noite sobre o rio Kemijoki em Rovaniemi',
    'zh-CN': '罗瓦涅米凯米河上的耶特坎金蒂莱桥与午夜太阳',
    ko: '로바니에미 케미강 위의 얘트캉퀸틸래 다리와 백야의 태양',
    fr: 'Le pont Jätkänkynttilä et le soleil de minuit sur le fleuve Kemijoki à Rovaniemi',
    it: 'Il ponte Jätkänkynttilä e il sole di mezzanotte sul fiume Kemijoki a Rovaniemi',
    nl: 'De Jätkänkynttilä-brug en de middernachtzon boven de rivier Kemijoki in Rovaniemi',
    sv: 'Bron Jätkänkynttilä och midnattssolen över Kemi älv i Rovaniemi',
  },
};

export default function Locations() {
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
        image="/images/heroes/rovaniemi-jatkankynttila-midnight-sun-xepheid.jpg"
        credit={{ name: 'Xepheid', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Midnight_sun_and_Jatkankynttila_bridge_2020.jpg' }}
        lang={lang}
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <L
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="group bg-night-light border border-white/5 hover:border-aurora-pink/40 rounded-2xl overflow-hidden transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {/* A region can exist before it has its own photo — stock imagery is
                    banned and reusing another region's picture would misrepresent
                    the place, so fall back to the house gradient rather than
                    shipping a broken <img>. */}
                {locationImage(loc).src ? (
                  <img src={locationImage(loc).src} alt={locationImage(loc).alt[dataLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  decoding="async" width="800" height="600"/>
                ) : (
                  <div role="img" aria-label={locationImage(loc).alt[dataLang]} className="w-full h-full bg-gradient-to-br from-[#3A2A24] via-[#1F1612] to-[#2A1F18]" />
                )}
              </div>
              <div className="p-6">
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{loc.region[dataLang]}</p>
                <ImgCredit credit={locationImage(loc).credit} lang={lang} plain />
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
