import type { Lang } from '../../i18n/translations';
import type { ImageCredit } from '../../components/ImgCredit';
import type { Localized } from '../localized';
import type { TraditionKind, TraditionSlug, TraditionsHome, TraditionsPage } from './types';

export type { TraditionSlug, TraditionsHome, TraditionsPage } from './types';

/** Page order. */
export const TRADITION_ORDER: TraditionSlug[] = [
  'bridal-sauna',
  'wedding-crashers',
  'wedding-waltz',
  'bride-kidnapping',
  'maid-of-honour',
  'bridal-crown',
  'sahti',
  'fell-chapels',
];

/** The four shown on the front page: the three most searched in Finnish plus Lapland's own. */
export const HOME_SLUGS: TraditionSlug[] = ['bridal-sauna', 'wedding-crashers', 'wedding-waltz', 'fell-chapels'];

export const TRADITION_KIND: Record<TraditionSlug, TraditionKind> = {
  'bridal-sauna': 'historical',
  'wedding-crashers': 'living',
  'wedding-waltz': 'living',
  'bride-kidnapping': 'living',
  'maid-of-honour': 'living',
  'bridal-crown': 'historical',
  sahti: 'living',
  'fell-chapels': 'lapland',
};

type Source = { label: string; url: string };

/**
 * Every claim on the page comes from one of these (checked 19.10.2026). Labels stay in
 * the source's own language: they name the publication, not a translation of it.
 */
export const TRADITION_SOURCES: Record<TraditionSlug, Source[]> = {
  'bridal-sauna': [
    { label: 'Elävä perintö: Perinnesaunottaminen', url: 'https://wiki.aineetonkulttuuriperinto.fi/wiki/Perinnesaunottaminen' },
    { label: 'Elävä perintö: Saunominen', url: 'https://wiki.aineetonkulttuuriperinto.fi/wiki/Saunominen' },
    { label: 'UNESCO: Sauna culture in Finland', url: 'https://ich.unesco.org/en/RL/sauna-culture-in-finland-01596' },
    { label: 'Yle 9.7.2024', url: 'https://yle.fi/a/74-20098280' },
  ],
  'wedding-crashers': [{ label: 'Kotimaisten kielten keskus: kuokkavieras', url: 'https://kotus.fi/sana/kuokkavieras/' }],
  'wedding-waltz': [
    { label: 'Yle 2013', url: 'https://yle.fi/a/3-6734884' },
    { label: 'Yle 14.6.2013', url: 'https://yle.fi/aihe/artikkeli/2013/06/14/haavalssin-muistaa-lopun-elamaansa' },
  ],
  'bride-kidnapping': [
    { label: 'Yle 2011', url: 'https://yle.fi/aihe/a/20-56351' },
    { label: 'Yle 10.6.2018', url: 'https://yle.fi/a/3-10226901' },
  ],
  'maid-of-honour': [
    { label: 'Kielikello 1/1992', url: 'https://kielikello.fi/kaaso-ja-sikapiikki-yrjanrenki-ja-best-man-morsiusneidon-ja-sulhaspojan-nimitysten-koko-kirjo/' },
  ],
  'bridal-crown': [
    { label: 'Kansallismuseo / Finna: morsiuskruunu 1891', url: 'https://www.finna.fi/Record/museovirasto.D54D86ADDE1BFB125D6327DA45F136A5' },
    { label: 'Yle 2.7.2022', url: 'https://yle.fi/a/3-12514824' },
    { label: 'Yle 2010', url: 'https://yle.fi/a/3-5564805' },
  ],
  sahti: [{ label: 'Elävä perintö: Suomalainen olutkulttuuri', url: 'https://wiki.aineetonkulttuuriperinto.fi/wiki/Suomalainen_olutkulttuuri' }],
  'fell-chapels': [
    { label: 'Kittilän seurakunta: Marian kappeli', url: 'https://www.kittilanseurakunta.fi/kirkko-ja-tilat/marian-kappeli' },
    { label: 'Inarin seurakunta: Pyhän Paavalin kappeli', url: 'https://www.inarinseurakunta.fi/kirkot-ja-tilat/pyhan-paavalin-kappeli' },
    { label: 'Kansan Raamattuseura: Revontulikappeli', url: 'https://kansanraamattuseura.fi/lomakeskukset/kairosmaja/revontulikappeli/' },
    { label: 'Inarin seurakunta: Pielpajärven erämaakirkko', url: 'https://www.inarinseurakunta.fi/kirkot-ja-tilat/pielpajarven-eramaakirkko' },
    { label: 'Inarin seurakunta: häät', url: 'https://www.inarinseurakunta.fi/haat' },
  ],
};

/** Sources for the intro and the Sámi section. */
export const INTRO_SOURCE: Source = { label: 'Yle News 16.1.2024', url: 'https://yle.fi/a/74-20069653' };
export const SAMI_SOURCE: Source = {
  label: 'Saamelaiskäräjät 2018: eettisesti kestävän saamelaismatkailun toimintaperiaatteet (PDF)',
  url: 'https://matkailu.samediggi.fi/wp-content/uploads/2025/05/Vastuullisen-ja-eettisesti-kestavan-saamelaismatkailun-toimintaperiaatteet_hyvaksytty_24092018.pdf',
};

export type TraditionImage = {
  src: string;
  alt: Localized<string>;
  credit?: ImageCredit;
  /** CSS object-position, when the subject is not centred. */
  position?: string;
};

/**
 * Archive photographs from Finna (Finnish Heritage Agency, Kuopio Museum of Cultural History)
 * and Wikimedia Commons, all CC BY 4.0, receipts in public/images/KUVALAHTEET.json.
 * Only photographs taken before 1940 show people: the Heritage Agency's terms forbid using
 * portraits in marketing without the sitter's consent, and nobody pictured before 1940 is
 * still alive to give it. The 1974 church interior shows no one.
 */
export const TRADITION_IMAGES: Partial<Record<TraditionSlug, TraditionImage>> = {
  'bridal-sauna': {
    src: '/images/traditions/bridal-sauna-1894.webp',
    credit: {
      name: 'I. K. Inha / Kuopion kulttuurihistoriallinen museo',
      license: 'CC BY 4.0',
      url: 'https://www.finna.fi/Record/kuhmu.F8735367256F8F9E53EEBE608ECA6910',
    },
    alt: {
      fi: 'Vienankarjalaisissa häissä morsianta saatetaan kylpyyn, 1894',
      en: 'At a White Karelian wedding the bride is led to the bathhouse, 1894',
      de: 'Bei einer Hochzeit in Weißkarelien wird die Braut zur Badestube geleitet, 1894',
      ja: '白カレリアの結婚式で、花嫁が浴舎へ導かれる様子（1894年）',
      es: 'En una boda de Carelia Blanca, la novia es conducida a la sauna, 1894',
      'pt-BR': 'Em um casamento na Carélia Branca, a noiva é levada à sauna, 1894',
      'zh-CN': '白卡累利阿的婚礼上，新娘被引往浴室，1894 年',
      ko: '백카렐리야의 결혼식에서 신부를 목욕간으로 데려가는 모습, 1894년',
      fr: 'Lors d’un mariage en Carélie blanche, la mariée est conduite au sauna, 1894',
      it: 'A un matrimonio nella Carelia Bianca la sposa viene accompagnata alla sauna, 1894',
      nl: 'Op een bruiloft in Wit-Karelië wordt de bruid naar het badhuis gebracht, 1894',
      sv: 'På ett bröllop i Vitkarelen leds bruden till badstugan, 1894',
    },
  },
  'wedding-crashers': {
    src: '/images/traditions/wedding-feast-1900.webp',
    credit: {
      name: 'Ina Roos / Museovirasto',
      license: 'CC BY 4.0',
      url: 'https://www.finna.fi/Record/museovirasto.159B4F2251C39C4CDF731EB65FA8ECA2',
    },
    alt: {
      fi: 'Hääväki pitopöydässä talon pihassa Tiukassa, hääparin paikalla lehvämaja, 1900',
      en: 'Wedding guests at the feast table in a farmyard in Tiukka (Tjöck), a leafy bower over the couple’s seats, 1900',
      de: 'Hochzeitsgäste an der Festtafel auf einem Hof in Tiukka (Tjöck), über dem Platz des Brautpaars eine Laube aus Zweigen, 1900',
      ja: 'ティウッカ（チェック）の農家の庭で祝宴の席につく結婚式の客。新郎新婦の席には枝葉のあずまや（1900年）',
      es: 'Invitados a la mesa del banquete en el patio de una granja en Tiukka (Tjöck), con una enramada sobre el lugar de los novios, 1900',
      'pt-BR': 'Convidados à mesa do banquete no pátio de uma casa em Tiukka (Tjöck), com um caramanchão de ramos sobre o lugar dos noivos, 1900',
      'zh-CN': '蒂乌卡（Tjöck）一户人家院子里的婚宴，新人座位上方搭着枝叶凉棚，1900 年',
      ko: '티우카(Tjöck)의 농가 마당에서 잔칫상에 앉은 하객들, 신랑 신부 자리에는 나뭇가지 정자, 1900년',
      fr: 'Invités au banquet dans la cour d’une ferme à Tiukka (Tjöck), une tonnelle de branchages au-dessus des places des mariés, 1900',
      it: 'Invitati al banchetto nel cortile di una casa a Tiukka (Tjöck), con un pergolato di fronde sopra i posti degli sposi, 1900',
      nl: 'Bruiloftsgasten aan de feesttafel op een erf in Tiukka (Tjöck), met een loofhut boven de plaats van het bruidspaar, 1900',
      sv: 'Bröllopsgäster vid festbordet på en gårdsplan i Tjöck, med en lövhydda över brudparets platser, 1900',
    },
  },
  'wedding-waltz': {
    src: '/images/traditions/wedding-dance-1928.webp',
    credit: {
      name: 'Alfred Niemistö / Museovirasto',
      license: 'CC BY 4.0',
      url: 'https://www.finna.fi/Record/museovirasto.9480D1CCC95EED740308F4549931BBFF',
      cropped: true,
    },
    alt: {
      fi: 'Häätanssit ulkolavalla Kauhajoella, haitarinsoittaja nurkassa, 1928',
      en: 'Dancing on an outdoor platform at a wedding in Kauhajoki, an accordion player in the corner, 1928',
      de: 'Hochzeitstanz auf einer Tanzfläche im Freien in Kauhajoki, in der Ecke ein Akkordeonspieler, 1928',
      ja: 'カウハヨキの結婚式、屋外の踊り場でのダンス。隅にはアコーディオン奏者（1928年）',
      es: 'Baile en una tarima al aire libre en una boda en Kauhajoki, con un acordeonista en la esquina, 1928',
      'pt-BR': 'Dança em um tablado ao ar livre num casamento em Kauhajoki, com um sanfoneiro no canto, 1928',
      'zh-CN': '考哈约基一场婚礼上的户外舞台舞会，角落里有手风琴手，1928 年',
      ko: '카우하요키 결혼식의 야외 무대 춤, 구석에는 아코디언 연주자, 1928년',
      fr: 'Danse sur une estrade en plein air lors d’un mariage à Kauhajoki, un accordéoniste dans le coin, 1928',
      it: 'Ballo su una pedana all’aperto a un matrimonio a Kauhajoki, con un fisarmonicista nell’angolo, 1928',
      nl: 'Dansen op een openluchtvloer tijdens een bruiloft in Kauhajoki, met een accordeonist in de hoek, 1928',
      sv: 'Dans på en dansbana utomhus vid ett bröllop i Kauhajoki, med en dragspelare i hörnet, 1928',
    },
  },
  'bridal-crown': {
    src: '/images/traditions/bridal-crown-1876.webp',
    position: 'center 18%',
    credit: {
      name: 'Johan Björkman / Museovirasto',
      license: 'CC BY 4.0',
      url: 'https://www.finna.fi/Record/museovirasto.B1976663C259845CBE430A837220512F',
    },
    alt: {
      fi: 'Morsian morsiuskruunu päässään, Ylikiiminki 1876',
      en: 'A bride wearing a bridal crown, Ylikiiminki, 1876',
      de: 'Eine Braut mit Brautkrone, Ylikiiminki, 1876',
      ja: '花嫁の冠をかぶった花嫁、ユリキーミンキ（1876年）',
      es: 'Una novia con la corona nupcial, Ylikiiminki, 1876',
      'pt-BR': 'Uma noiva com a coroa nupcial, Ylikiiminki, 1876',
      'zh-CN': '头戴新娘冠的新娘，于利基明基，1876 年',
      ko: '신부 왕관을 쓴 신부, 윌리키밍키, 1876년',
      fr: 'Une mariée portant la couronne nuptiale, Ylikiiminki, 1876',
      it: 'Una sposa con la corona nuziale, Ylikiiminki, 1876',
      nl: 'Een bruid met bruidskroon, Ylikiiminki, 1876',
      sv: 'En brud med brudkrona, Ylikiiminki, 1876',
    },
  },
  'fell-chapels': {
    src: '/images/traditions/pielpajarvi-church-1974.webp',
    credit: {
      name: 'O. Kallionpää / Museovirasto',
      license: 'CC BY 4.0',
      url: 'https://www.finna.fi/Record/museovirasto.29A66F2697402A76676E3F37FFC930EA',
    },
    alt: {
      fi: 'Pielpajärven erämaakirkon alttari ja penkit, Inari 1974',
      en: 'The altar and pews of the Pielpajärvi wilderness church, Inari, 1974',
      de: 'Altar und Bänke der Wildniskirche Pielpajärvi, Inari, 1974',
      ja: 'ピエルパヤルヴィの荒野の教会の祭壇と会衆席、イナリ（1974年）',
      es: 'El altar y los bancos de la iglesia de Pielpajärvi, Inari, 1974',
      'pt-BR': 'O altar e os bancos da igreja de Pielpajärvi, Inari, 1974',
      'zh-CN': '皮耶尔帕耶尔维荒野教堂的祭坛和长椅，伊纳里，1974 年',
      ko: '피엘파야르비 황야 교회의 제단과 신도석, 이나리, 1974년',
      fr: 'L’autel et les bancs de l’église de Pielpajärvi, Inari, 1974',
      it: 'L’altare e i banchi della chiesa di Pielpajärvi, Inari, 1974',
      nl: 'Het altaar en de banken van de wilderniskerk van Pielpajärvi, Inari, 1974',
      sv: 'Altaret och bänkarna i Pielpajärvi ödemarkskyrka, Inari, 1974',
    },
  },
};

export const HERO_IMAGE: TraditionImage | undefined = {
  src: '/images/traditions/rovaniemi-wedding-1930.webp',
  position: 'center 30%',
  credit: {
    name: 'Museovirasto',
    license: 'CC BY 4.0',
    url: 'https://www.finna.fi/Record/museovirasto.AD56EB6D0FBE899F8D5E8DC3037C6826',
  },
  alt: {
    fi: 'Hääpari Rovaniemellä, 1930',
    en: 'A wedding couple in Rovaniemi, 1930',
    de: 'Ein Brautpaar in Rovaniemi, 1930',
    ja: 'ロヴァニエミの新郎新婦（1930年）',
    es: 'Una pareja de novios en Rovaniemi, 1930',
    'pt-BR': 'Um casal de noivos em Rovaniemi, 1930',
    'zh-CN': '罗瓦涅米的一对新人，1930 年',
    ko: '로바니에미의 신랑 신부, 1930년',
    fr: 'Un couple de mariés à Rovaniemi, 1930',
    it: 'Una coppia di sposi a Rovaniemi, 1930',
    nl: 'Een bruidspaar in Rovaniemi, 1930',
    sv: 'Ett brudpar i Rovaniemi, 1930',
  },
};

type TraditionsModule = { home: TraditionsHome; page: TraditionsPage };

/** One chunk per language, loaded only for the reader's language. */
const LOADERS: Record<Lang, () => Promise<TraditionsModule>> = {
  fi: () => import('./fi'),
  en: () => import('./en'),
  de: () => import('./de'),
  ja: () => import('./ja'),
  es: () => import('./es'),
  'pt-BR': () => import('./ptBR'),
  'zh-CN': () => import('./zhCN'),
  ko: () => import('./ko'),
  fr: () => import('./fr'),
  it: () => import('./it'),
  nl: () => import('./nl'),
  sv: () => import('./sv'),
};

const cache = new Map<Lang, Promise<TraditionsModule>>();

/** Stable promise per language, for React's `use()` inside a Suspense boundary. */
export function loadTraditions(lang: Lang): Promise<TraditionsModule> {
  let p = cache.get(lang);
  if (!p) {
    p = LOADERS[lang]();
    cache.set(lang, p);
  }
  return p;
}
