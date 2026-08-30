import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { photographers } from '../data/photographers';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import { withReferral } from '../lib/affiliate';

const P: Record<'seoTitle' | 'seoDesc' | 'title' | 'subtitle' | 'imageAlt' | 'sourceNote', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Photographers: Maria Hedengren, Robin Goodlad et al. | LaplandWeddings',
    fi: 'Lapin häävalokuvaajat | LaplandWeddings',
    de: 'Hochzeitsfotografen in Lappland | LaplandWeddings',
    ja: 'ラップランドの写真家：Maria Hedengren、Robin Goodlad | LaplandWeddings',
    es: 'Fotógrafos de bodas en Laponia | LaplandWeddings',
    'pt-BR': 'Fotógrafos de casamento na Lapônia | LaplandWeddings',
    'zh-CN': '拉普兰婚礼摄影师：Maria Hedengren、Robin Goodlad 等 | LaplandWeddings',
    ko: '라플란드 사진가: Maria Hedengren, Robin Goodlad | LaplandWeddings',
    fr: 'Photographes de mariage en Laponie | LaplandWeddings',
    it: 'Fotografi di matrimonio in Lapponia | LaplandWeddings',
    nl: 'Trouwfotografen in Lapland | LaplandWeddings', sv: 'Bröllopsfotografer i Lappland: Maria Hedengren, Robin Goodlad m.fl. | LaplandWeddings',
  },
  seoDesc: {
    en: 'Six of the best Lapland wedding photographers. Northern Lights, snow chapels, glass igloos. Proven in the cold.',
    fi: 'Kuusi Lapin parasta hääjvalokuvaajaa. Revontulet, lumikappelit, lasi-iglut. Testattu pakkasessa.',
    de: 'Sechs der besten Hochzeitsfotografen Lapplands. Polarlichter, Schneekapellen, Glasiglus. Im Frost erprobt.',
    ja: 'ラップランド屈指のウェディングフォトグラファー6人。オーロラ、スノーチャペル、ガラスのイグルー。極寒で実証済み。',
    es: 'Seis de los mejores fotógrafos de bodas de Laponia. Auroras boreales, capillas de nieve, iglús de cristal: probados en el frío.',
    'pt-BR': 'Seis dos melhores fotógrafos de casamento da Lapônia. Aurora boreal, capelas de neve, iglus de vidro. Testados no frio.',
    'zh-CN': '拉普兰最出色的六位婚礼摄影师。北极光、雪教堂、玻璃冰屋，在严寒中久经考验。',
    ko: '라플란드 최고의 웨딩 포토그래퍼 6인. 오로라, 스노우 채플, 글라스 이글루. 혹한 속에서 검증됨.',
    fr: 'Six des meilleurs photographes de mariage de Laponie. Aurores boréales, chapelles de neige, igloos de verre. Éprouvés dans le froid.',
    it: 'Sei fotografi di matrimonio tra i migliori della Lapponia. Aurora boreale, cappelle di neve, igloo di vetro. Collaudati nel gelo.',
    nl: 'Zes van de beste trouwfotografen van Lapland. Noorderlicht, sneeuwkapellen, glazen iglo’s. Bewezen in de kou.', sv: 'Six of the best Lapland wedding photographers. Northern Lights, snow chapels, glass igloos. Proven in the cold.',
  },
  title: {
    en: 'Lapland wedding photographers',
    fi: 'Lapin häävalokuvaajat',
    de: 'Hochzeitsfotografen in Lappland',
    ja: 'ラップランドのウェディングフォトグラファー',
    es: 'Fotógrafos de bodas en Laponia',
    'pt-BR': 'Fotógrafos de casamento na Lapônia',
    'zh-CN': '拉普兰婚礼摄影师',
    ko: '라플란드 웨딩 포토그래퍼',
    fr: 'Photographes de mariage en Laponie',
    it: 'Fotografi di matrimonio in Lapponia',
    nl: 'Trouwfotografen in Lapland', sv: 'Bröllopsfotografer i Lappland',
  },
  subtitle: {
    en: 'Six of the most experienced wedding photographers in Lapland. Aurora-calibrated, snow-chapel lighting, glass-igloo composition. All proven in sub-zero conditions.',
    fi: 'Tähän on koottu kuusi Lapin kokeneinta hääjvalokuvaajaa. Revontulikalibrointi, lumikappelivalaistus, lasi-iglu-kuvaus. Kaikki testattuja pakkasessa.',
    de: 'Sechs der erfahrensten Hochzeitsfotografen Lapplands. Auf Polarlichter kalibriert, Schneekapellen-Beleuchtung, Glasiglu-Komposition. Alles bei Minusgraden erprobt.',
    ja: 'ラップランドで最も経験豊富なウェディングフォトグラファー6人。オーロラに最適化した設定、スノーチャペルのライティング、ガラスイグルーの構図。すべて氷点下で実証済み。',
    es: 'Seis de los fotógrafos de bodas con más experiencia de Laponia. Calibrados para auroras, iluminación de capillas de nieve, composición en iglús de cristal: todo probado bajo cero.',
    'pt-BR': 'Seis dos fotógrafos de casamento mais experientes da Lapônia. Calibrados para a aurora, iluminação de capelas de neve, composição em iglus de vidro. Tudo testado abaixo de zero.',
    'zh-CN': '拉普兰最具经验的六位婚礼摄影师。专为极光校准、雪教堂布光、玻璃冰屋构图，全部在零下环境中久经验证。',
    ko: '라플란드에서 가장 노련한 웨딩 포토그래퍼 6인. 오로라 맞춤 세팅, 스노우 채플 조명, 글라스 이글루 구도. 모두 영하의 환경에서 검증되었습니다.',
    fr: 'Six des photographes de mariage les plus expérimentés de Laponie. Réglages calibrés pour les aurores, éclairage en chapelle de neige, composition en igloo de verre. Le tout éprouvé par grand froid.',
    it: 'Sei fotografi di matrimonio tra i più esperti della Lapponia. Tarati sull’aurora, illuminazione per cappelle di neve, composizione negli igloo di vetro. Tutto collaudato sotto zero.',
    nl: 'Zes van de meest ervaren trouwfotografen van Lapland. Gekalibreerd op het noorderlicht, belichting in sneeuwkapellen, compositie in glazen iglo’s. Alles bewezen bij temperaturen onder nul.', sv: 'Six of the most experienced wedding photographers in Lapland. Aurora-calibrated, snow-chapel lighting, glass-igloo composition. All proven in sub-zero conditions.',
  },
  imageAlt: {
    en: 'Wedding couple in winter Lapland',
    fi: 'Hääpari talvisessa Lapissa',
    de: 'Hochzeitspaar im winterlichen Lappland',
    ja: '冬のラップランドの結婚式カップル',
    es: 'Pareja de novios en la Laponia invernal',
    'pt-BR': 'Casal de noivos na Lapônia no inverno',
    'zh-CN': '冬季拉普兰的新婚夫妇',
    ko: '겨울 라플란드의 신혼부부',
    fr: 'Couple de mariés en Laponie hivernale',
    it: 'Coppia di sposi nella Lapponia invernale',
    nl: 'Bruidspaar in winters Lapland', sv: 'Brudpar i vinterns Lappland',
  },
  sourceNote: {
    en: 'Information sourced from public photographer websites. LaplandWeddings does not have a contractual relationship with every photographer listed. Contact directly via their own sites.',
    fi: 'Tiedot kerätty valokuvaajien omilta julkisilta sivuilta. LaplandWeddings ei ole sopimussuhteessa kaikkiin listattuihin. Yhteyshenkilöt heidän omista sivustaan.',
    de: 'Angaben aus den öffentlichen Websites der Fotografen. LaplandWeddings steht nicht mit allen Gelisteten in einem Vertragsverhältnis. Wenden Sie sich direkt über deren eigene Seiten an sie.',
    ja: '情報は各フォトグラファーの公開ウェブサイトから収集しています。LaplandWeddingsは掲載者全員と契約関係にあるわけではありません。各自の公式サイトから直接ご連絡ください。',
    es: 'Información obtenida de los sitios web públicos de los fotógrafos. LaplandWeddings no mantiene una relación contractual con todos los listados: contacta directamente a través de sus propios sitios.',
    'pt-BR': 'Informações obtidas dos sites públicos dos fotógrafos. A LaplandWeddings não tem relação contratual com todos os listados. Entre em contato diretamente pelos sites de cada um.',
    'zh-CN': '信息来源于摄影师的公开网站。LaplandWeddings 并未与所有列出的摄影师建立合同关系，请通过他们各自的网站直接联系。',
    ko: '정보는 각 포토그래퍼의 공개 웹사이트에서 수집했습니다. LaplandWeddings는 게재된 모든 분과 계약 관계에 있지 않습니다. 각자의 사이트를 통해 직접 연락하세요.',
    fr: 'Informations issues des sites web publics des photographes. LaplandWeddings n’est pas lié par contrat à tous les photographes répertoriés. Contactez-les directement via leurs propres sites.',
    it: 'Informazioni tratte dai siti web pubblici dei fotografi. LaplandWeddings non ha un rapporto contrattuale con tutti gli elencati. Li contatti direttamente tramite i loro siti.',
    nl: 'Informatie afkomstig van de openbare websites van de fotografen. LaplandWeddings heeft geen contractuele relatie met alle vermelde fotografen. Neem rechtstreeks contact op via hun eigen sites.', sv: 'Information sourced from public photographer websites. LaplandWeddings does not have a contractual relationship with every photographer listed. Contact directly via their own sites.',
  },
};

export default function Photographers() {
  const { lang, dataLang } = useLang();
  return (
    <>
      <SEO
        title={pickLocalized(P.seoTitle, lang)}
        description={pickLocalized(P.seoDesc, lang)}
        path="/photographers"
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowPhotographers', lang)}
        title={pickLocalized(P.title, lang)}
        subtitle={pickLocalized(P.subtitle, lang)}
        image="/images/types/elopement.webp"
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {photographers.map((p) => (
            <article
              key={p.slug}
              className="bg-night-light border border-white/5 rounded-2xl p-6 flex flex-col"
            >
              <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">
                {p.baseLocation[dataLang]}
              </p>
              <h3 className="font-heading text-xl text-white tracking-wide mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{p.style[dataLang]}</p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-1">{p.description[dataLang]}</p>
              <p className="text-xs text-aurora-green italic mb-4">★ {p.highlight[dataLang]}</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-white/5">
                <a
                  href={withReferral(p.website, 'photographers')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-aurora-pink hover:text-rose transition-colors font-semibold"
                >
                  {ui('website', lang)}
                </a>
                {p.instagram && (
                  <span className="text-gray-500">{p.instagram}</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-10 max-w-2xl mx-auto">
          {pickLocalized(P.sourceNote, lang)}
        </p>
      </Section>
    </>
  );
}
