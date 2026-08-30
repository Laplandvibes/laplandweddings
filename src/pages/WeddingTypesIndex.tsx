
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { weddingTypes } from '../data/weddingTypes';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Types: Northern Lights, Snow Chapel, Glass Igloo | LaplandWeddings',
    fi: 'Häätyypit Lapissa: revontulet | LaplandWeddings',
    de: 'Hochzeitsarten in Lappland | LaplandWeddings',
    ja: 'ラップランドのウェディングタイプ：オーロラ、スノーチャペル、ガラスのイグルー | LaplandWeddings',
    es: 'Tipos de boda en Laponia | LaplandWeddings',
    'pt-BR': 'Tipos de casamento na Lapônia | LaplandWeddings',
    'zh-CN': '拉普兰婚礼类型：北极光、雪教堂、玻璃冰屋 | LaplandWeddings',
    ko: '라플란드 웨딩 유형: 오로라, 스노우 채플, 글라스 이글루 | LaplandWeddings',
    fr: 'Types de mariage en Laponie | LaplandWeddings',
    it: 'Tipi di matrimonio in Lapponia | LaplandWeddings',
    nl: 'Soorten bruiloften in Lapland | LaplandWeddings', sv: 'Bröllopstyper i Lappland: norrsken, snökapell, glasiglo | LaplandWeddings',
  },
  seoDesc: {
    en: 'Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.',
    fi: 'Kuusi häätyyppiä Lapissa: revontuli, lumikappeli, lasi-iglu, keskiyön aurinko, elopement ja lupausten uusiminen.',
    de: 'Sechs Hochzeitsarten in Lappland: Polarlichter, Schneekapelle, Glasiglu, Mitternachtssonne, Elopement und Erneuerung des Eheversprechens.',
    ja: 'ラップランドの6つのウェディングタイプ：オーロラ、スノーチャペル、ガラスのイグルー、白夜、エロープメント、誓いの更新。',
    es: 'Seis tipos de boda en Laponia: auroras boreales, capilla de nieve, iglú de cristal, sol de medianoche, elopement y renovación de votos.',
    'pt-BR': 'Seis tipos de casamento na Lapônia: aurora boreal, capela de neve, iglu de vidro, sol da meia-noite, elopement e renovação de votos.',
    'zh-CN': '拉普兰六种婚礼类型：北极光、雪教堂、玻璃冰屋、午夜阳光、私奔婚礼和重申誓言。',
    ko: '라플란드의 여섯 가지 웨딩 유형: 오로라, 스노우 채플, 글라스 이글루, 백야, 엘로프먼트, 서약 갱신.',
    fr: 'Six types de mariage en Laponie : aurores boréales, chapelle de neige, igloo de verre, soleil de minuit, elopement et renouvellement des vœux.',
    it: 'Sei tipi di matrimonio in Lapponia: aurora boreale, cappella di neve, igloo di vetro, sole di mezzanotte, elopement e rinnovo delle promesse.',
    nl: 'Zes soorten bruiloften in Lapland: noorderlicht, sneeuwkapel, glazen iglo, middernachtzon, elopement en hernieuwing van geloften.', sv: 'Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal.',
  },
  imageAlt: {
    en: 'Wedding couple in a snow chapel by candlelight',
    fi: 'Hääpari lumikappelissa kynttilänvalossa',
    de: 'Hochzeitspaar in einer Schneekapelle bei Kerzenschein',
    ja: 'キャンドルの灯るスノーチャペルの中の結婚式のカップル',
    es: 'Pareja de novios en una capilla de nieve a la luz de las velas',
    'pt-BR': 'Casal de noivos em uma capela de neve à luz de velas',
    'zh-CN': '烛光中雪教堂内的新婚夫妇',
    ko: '촛불이 켜진 스노우 채플 안의 신혼부부',
    fr: 'Couple de mariés dans une chapelle de neige à la lueur des bougies',
    it: 'Coppia di sposi in una cappella di neve a lume di candela',
    nl: 'Bruidspaar in een sneeuwkapel bij kaarslicht', sv: 'Brudpar i ett snökapell i levande ljus',
  },
};

export default function WeddingTypesIndex() {
  const { lang, dataLang, tr } = useLang();
  return (
    <>
      <SEO
        title={pickLocalized(P.seoTitle, lang)}
        description={pickLocalized(P.seoDesc, lang)}
        path="/wedding-types"
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowTypes', lang)}
        title={tr.types.indexTitle}
        subtitle={tr.types.indexIntro}
        image="/images/heroes/ice-chapel-interior.jpg"
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {weddingTypes.map((wt) => (
            <L
              key={wt.slug}
              to={`/wedding-types/${wt.slug}`}
              className="group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={wt.heroImage}
                  alt={wt.name[dataLang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 decoding="async" width="800" height="600"/>
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Price range removed 2026-07-29 (Vesa): the figures were
                    invented and the units were inconsistent between cards. */}
                <div className="mb-2">
                  <h3 className="font-heading text-2xl text-white tracking-wide group-hover:text-rose transition-colors min-w-0 break-words">{wt.name[dataLang]}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{wt.tagline[dataLang]}</p>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">{wt.description[dataLang]}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                  <span>{wt.bestSeason[dataLang]}</span>
                  <span>{pickLocalized(wt.capacity, lang)}</span>
                </div>
              </div>
            </L>
          ))}
        </div>
      </Section>
    </>
  );
}
