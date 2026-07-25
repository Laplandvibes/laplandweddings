
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { locations } from '../data/locations';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings',
    fi: 'Häät Lapin paikkakunnilla | LaplandWeddings',
    de: 'Hochzeitsregionen in Lappland | LaplandWeddings',
    ja: 'ラップランドのウェディング地域：ロヴァニエミ、レヴィ、サーリセルカ、ウッラス | LaplandWeddings',
    es: 'Regiones para bodas en Laponia | LaplandWeddings',
    'pt-BR': 'Regiões para casamento na Lapônia | LaplandWeddings',
    'zh-CN': '拉普兰婚礼地区：罗瓦涅米、莱维、萨利色尔卡、于拉斯 | LaplandWeddings',
    ko: '라플란드 웨딩 지역: 로바니에미, 레비, 사리셀캐, 윌래스 | LaplandWeddings',
    fr: 'Régions de mariage en Laponie | LaplandWeddings',
    it: 'Regioni per matrimoni in Lapponia | LaplandWeddings',
    nl: 'Trouwregio’s in Lapland: Rovaniemi & meer | LaplandWeddings', sv: 'Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs | LaplandWeddings',
  },
  seoDesc: {
    en: 'Six Lapland wedding regions plus city-option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Compare seasons, flights, and venues.',
    fi: 'Kuusi Lapin häämatkakohdetta ja kaupunkivaihtoehto Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Vertaile sesonkeja, lentoyhteyksiä ja venueita.',
    de: 'Sechs Hochzeitsregionen in Lappland plus Großstadt-Option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Saisons, Flugverbindungen und Locations im Vergleich.',
    ja: 'ラップランドのウェディング向け6地域＋都市の選択肢オウル：ロヴァニエミ、サーリセルカ、レヴィ、ウッラス、ピュハ＝ルオスト、キルピスヤルヴィ、オウル。シーズン、フライト、会場を比較。',
    es: 'Seis regiones para bodas en Laponia más la opción urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Compara temporadas, vuelos y lugares.',
    'pt-BR': 'Seis regiões para casamento na Lapônia mais a opção urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Compare temporadas, voos e locais.',
    'zh-CN': '拉普兰六大婚礼地区外加城市之选奥卢：罗瓦涅米、萨利色尔卡、莱维、于拉斯、皮哈-卢奥斯托、基尔皮斯耶尔维、奥卢。比较季节、航班与场地。',
    ko: '라플란드의 웨딩 지역 6곳과 도시 옵션 오울루: 로바니에미, 사리셀캐, 레비, 윌래스, 퓌해-루오스토, 킬피스얘르비, 오울루. 시즌, 항공편, 웨딩 장소를 비교하세요.',
    fr: 'Six régions de mariage en Laponie plus Oulu, l’option urbaine: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Comparez saisons, vols et lieux.',
    it: 'Sei regioni per matrimoni in Lapponia più Oulu, l’opzione urbana: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Confronta stagioni, voli e location.',
    nl: 'Zes trouwregio’s in Lapland plus stadsoptie Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Vergelijk seizoenen, vluchten en locaties.', sv: 'Six Lapland wedding regions plus city-option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Oulu. Compare seasons, flights, and venues.',
  },
  imageAlt: {
    en: 'Wedding couple on a frozen lake under the Northern Lights',
    fi: 'Hääpari jäätyneellä järvellä revontulien alla',
    de: 'Hochzeitspaar auf einem zugefrorenen See unter Polarlichtern',
    ja: 'オーロラの下、凍った湖の上に立つ結婚式のカップル',
    es: 'Pareja de novios en un lago helado bajo la aurora boreal',
    'pt-BR': 'Casal de noivos em um lago congelado sob a aurora boreal',
    'zh-CN': '北极光下站在冰封湖面上的新婚夫妇',
    ko: '오로라 아래 얼어붙은 호수 위의 신혼부부',
    fr: 'Couple de mariés sur un lac gelé sous les aurores boréales',
    it: 'Coppia di sposi su un lago ghiacciato sotto l’aurora boreale',
    nl: 'Bruidspaar op een bevroren meer onder het noorderlicht', sv: 'Wedding couple on a frozen lake under the Northern Lights',
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
        image="/images/heroes/aurora-elope-hero.webp"
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
                <img src={loc.heroImage} alt={loc.heroAlt[dataLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  decoding="async" width="800" height="600"/>
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
