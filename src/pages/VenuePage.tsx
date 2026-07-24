import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import PriceTierBadge from '../components/PriceTierBadge';
import { getVenueBySlug, venues } from '../data/venues';
import { useLang } from '../i18n/LangContext';
import { hotelsLink, AFFILIATE_REL } from '../lib/affiliate';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import NotFound from './NotFound';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

type VKey =
  | 'getQuoteVenue' | 'checkPrices'
  | 'affordable' | 'midRange' | 'premium'
  | 'open' | 'yearRound' | 'seasonal' | 'open12' | 'winterSeason'
  | 'suitsWeddings' | 'weddingTypesCount' | 'tailoredProposal'
  | 'atAGlance' | 'venueOffers' | 'weddingSpaces'
  | 'weddingTypes' | 'otherVenues' | 'compareNearby'
  | 'freeQuote' | 'leadIntro'
  | 'whatMakesSpecial' | 'stylesItFits' | 'otherRegionVenues' | 'getQuoteFor';

const V: Record<VKey, Localized<string>> = {
  getQuoteVenue: {
    en: 'Get a quote for this venue', fi: 'Pyydä tarjous tähän venueen',
    de: 'Angebot für diese Location anfordern', ja: 'この会場の見積もりを依頼',
    es: 'Solicita un presupuesto para este lugar', 'pt-BR': 'Peça um orçamento para este local',
    'zh-CN': '获取此场地的报价', ko: '이 웨딩 장소 견적 받기',
    fr: 'Demander un devis pour ce lieu', it: 'Richiedi un preventivo per questa location',
    nl: 'Vraag een offerte aan voor deze locatie', sv: 'Get a quote for this venue',
  },
  checkPrices: {
    en: 'Check rates & book', fi: 'Tarkista hinnat & varaa',
    de: 'Preise prüfen & buchen', ja: '料金を確認して予約',
    es: 'Ver precios y reservar', 'pt-BR': 'Ver preços e reservar',
    'zh-CN': '查看价格并预订', ko: '가격 확인 & 예약',
    fr: 'Voir prix & réserver', it: 'Vedi prezzi e prenota',
    nl: 'Bekijk prijzen & boek', sv: 'Check rates & book',
  },
  affordable: {
    en: 'Affordable', fi: 'Edullinen', de: 'Günstig', ja: 'お手頃',
    es: 'Económico', 'pt-BR': 'Acessível', 'zh-CN': '经济实惠', ko: '합리적',
    fr: 'Abordable', it: 'Economico', nl: 'Betaalbaar', sv: 'Affordable',
  },
  midRange: {
    en: 'Mid-range', fi: 'Keskihintainen', de: 'Mittelklasse', ja: '中価格帯',
    es: 'Gama media', 'pt-BR': 'Intermediário', 'zh-CN': '中档', ko: '중급',
    fr: 'Milieu de gamme', it: 'Fascia media', nl: 'Middensegment', sv: 'Mid-range',
  },
  premium: {
    en: 'Premium', fi: 'Premium', de: 'Premium', ja: 'プレミアム',
    es: 'Premium', 'pt-BR': 'Premium', 'zh-CN': '高端', ko: '프리미엄',
    fr: 'Premium', it: 'Premium', nl: 'Premium', sv: 'Premium',
  },
  open: {
    en: 'Open', fi: 'Aukiolo', de: 'Geöffnet', ja: '営業',
    es: 'Apertura', 'pt-BR': 'Funcionamento', 'zh-CN': '开放', ko: '운영',
    fr: 'Ouverture', it: 'Apertura', nl: 'Geopend', sv: 'Open',
  },
  yearRound: {
    en: 'Year-round', fi: 'Ympäri vuoden', de: 'Ganzjährig', ja: '通年',
    es: 'Todo el año', 'pt-BR': 'O ano todo', 'zh-CN': '全年', ko: '연중',
    fr: 'Toute l’année', it: 'Tutto l’anno', nl: 'Het hele jaar', sv: 'Year-round',
  },
  seasonal: {
    en: 'Seasonal', fi: 'Sesonki', de: 'Saisonal', ja: 'シーズン制',
    es: 'Por temporada', 'pt-BR': 'Sazonal', 'zh-CN': '季节性', ko: '시즌제',
    fr: 'Saisonnier', it: 'Stagionale', nl: 'Seizoensgebonden', sv: 'Seasonal',
  },
  open12: {
    en: '12 months/year', fi: 'avoinna 12 kk', de: '12 Monate/Jahr', ja: '年間12か月',
    es: '12 meses al año', 'pt-BR': '12 meses por ano', 'zh-CN': '一年 12 个月', ko: '연 12개월',
    fr: '12 mois/an', it: '12 mesi all’anno', nl: '12 maanden/jaar', sv: '12 months/year',
  },
  winterSeason: {
    en: 'winter season', fi: 'talvikausi', de: 'Wintersaison', ja: '冬季',
    es: 'temporada de invierno', 'pt-BR': 'temporada de inverno', 'zh-CN': '冬季', ko: '겨울 시즌',
    fr: 'saison hivernale', it: 'stagione invernale', nl: 'winterseizoen', sv: 'winter season',
  },
  suitsWeddings: {
    en: 'Suits weddings', fi: 'Sopii häihin', de: 'Für Hochzeiten geeignet', ja: '結婚式向き',
    es: 'Apto para bodas', 'pt-BR': 'Ideal para casamentos', 'zh-CN': '适合婚礼', ko: '웨딩에 적합',
    fr: 'Adapté aux mariages', it: 'Adatto ai matrimoni', nl: 'Geschikt voor bruiloften', sv: 'Suits weddings',
  },
  weddingTypesCount: {
    en: 'wedding types', fi: 'eri häätyyppiä', de: 'Hochzeitsarten', ja: 'タイプの結婚式',
    es: 'tipos de boda', 'pt-BR': 'tipos de casamento', 'zh-CN': '种婚礼类型', ko: '가지 웨딩 유형',
    fr: 'types de mariage', it: 'tipi di matrimonio', nl: 'soorten bruiloften', sv: 'wedding types',
  },
  tailoredProposal: {
    en: 'Get a tailored proposal', fi: 'Pyydä räätälöity ehdotus',
    de: 'Maßgeschneidertes Angebot anfordern', ja: 'オーダーメイドの提案を依頼',
    es: 'Recibe una propuesta a medida', 'pt-BR': 'Receba uma proposta sob medida',
    'zh-CN': '获取量身定制方案', ko: '맞춤 제안 받기',
    fr: 'Recevoir une proposition sur mesure', it: 'Ricevi una proposta su misura',
    nl: 'Ontvang een voorstel op maat', sv: 'Get a tailored proposal',
  },
  atAGlance: {
    en: 'This venue at a glance', fi: 'Tämä venue lyhyesti',
    de: 'Diese Location auf einen Blick', ja: 'この会場をひと目で',
    es: 'Este lugar de un vistazo', 'pt-BR': 'Este local em resumo',
    'zh-CN': '场地速览', ko: '이 웨딩 장소 한눈에',
    fr: 'Ce lieu en un coup d’œil', it: 'Questa location in breve',
    nl: 'Deze locatie in het kort', sv: 'This venue at a glance',
  },
  venueOffers: {
    en: 'What this venue offers', fi: 'Mitä paikka tarjoaa',
    de: 'Was diese Location bietet', ja: 'この会場で提供されるもの',
    es: 'Lo que ofrece este lugar', 'pt-BR': 'O que este local oferece',
    'zh-CN': '此场地提供的服务', ko: '이 웨딩 장소가 제공하는 것',
    fr: 'Ce que ce lieu propose', it: 'Cosa offre questa location',
    nl: 'Wat deze locatie biedt', sv: 'What this venue offers',
  },
  weddingSpaces: {
    en: 'Wedding spaces', fi: 'Tilat häihin',
    de: 'Hochzeitsräume', ja: '結婚式スペース',
    es: 'Espacios para bodas', 'pt-BR': 'Espaços para casamento',
    'zh-CN': '婚礼空间', ko: '웨딩 공간',
    fr: 'Espaces de mariage', it: 'Spazi per matrimoni',
    nl: 'Trouwruimtes', sv: 'Wedding spaces',
  },
  weddingTypes: {
    en: 'Wedding types', fi: 'Häätyypit',
    de: 'Hochzeitsarten', ja: 'ウェディングタイプ',
    es: 'Tipos de boda', 'pt-BR': 'Tipos de casamento',
    'zh-CN': '婚礼类型', ko: '웨딩 유형',
    fr: 'Types de mariage', it: 'Tipi di matrimonio',
    nl: 'Soorten bruiloften', sv: 'Wedding types',
  },
  otherVenues: {
    en: 'Other venues', fi: 'Muita hääpaikkoja',
    de: 'Weitere Locations', ja: 'その他の会場',
    es: 'Otros lugares', 'pt-BR': 'Outros locais',
    'zh-CN': '其他场地', ko: '다른 웨딩 장소',
    fr: 'Autres lieux', it: 'Altre location',
    nl: 'Andere locaties', sv: 'Other venues',
  },
  compareNearby: {
    en: 'Compare nearby alternatives', fi: 'Vertaa lähialueen vaihtoehtoihin',
    de: 'Alternativen in der Nähe vergleichen', ja: '近隣の選択肢を比較',
    es: 'Compara alternativas cercanas', 'pt-BR': 'Compare alternativas próximas',
    'zh-CN': '比较附近的选择', ko: '주변 대안 비교하기',
    fr: 'Comparez les alternatives à proximité', it: 'Confronta le alternative vicine',
    nl: 'Vergelijk alternatieven in de buurt', sv: 'Compare nearby alternatives',
  },
  freeQuote: {
    en: 'Free quote', fi: 'Maksuton tarjous',
    de: 'Kostenloses Angebot', ja: '無料見積もり',
    es: 'Presupuesto gratuito', 'pt-BR': 'Orçamento gratuito',
    'zh-CN': '免费报价', ko: '무료 견적',
    fr: 'Devis gratuit', it: 'Preventivo gratuito',
    nl: 'Gratis offerte', sv: 'Free quote',
  },
  leadIntro: {
    en: 'Fill in the form and the LaplandWeddings team will route your enquiry to this venue’s trusted wedding planners. You get 1–3 tailored quotes within 48 hours.',
    fi: 'Täytä lomake, niin LaplandWeddings-tiimi ohjaa kyselysi tämän venuen luotetuille hääsuunnittelijoille. Saat 1–3 räätälöityä tarjousta 48 tunnissa.',
    de: 'Füllen Sie das Formular aus, und das LaplandWeddings-Team leitet Ihre Anfrage an die vertrauenswürdigen Hochzeitsplaner dieser Location weiter. Sie erhalten innerhalb von 48 Stunden 1–3 maßgeschneiderte Angebote.',
    ja: 'フォームにご記入いただくと、LaplandWeddingsチームがこの会場の信頼できるウェディングプランナーへお問い合わせを取り次ぎます。48時間以内に1〜3件のオーダーメイド見積もりをお届けします。',
    es: 'Rellena el formulario y el equipo de LaplandWeddings dirigirá tu consulta a los organizadores de bodas de confianza de este lugar. Recibirás de 1 a 3 presupuestos a medida en 48 horas.',
    'pt-BR': 'Preencha o formulário e a equipe da LaplandWeddings encaminhará sua solicitação aos organizadores de casamento de confiança deste local. Você recebe de 1 a 3 orçamentos sob medida em 48 horas.',
    'zh-CN': '填写表单，LaplandWeddings 团队会将你的咨询转给此场地信赖的婚礼策划师。你将在 48 小时内获得 1–3 份量身定制的报价。',
    ko: '양식을 작성하시면 LaplandWeddings 팀이 귀하의 문의를 이 웨딩 장소의 신뢰할 수 있는 웨딩 플래너에게 전달합니다. 48시간 이내에 맞춤 견적 1~3건을 받습니다.',
    fr: 'Remplissez le formulaire et l’équipe LaplandWeddings transmettra votre demande aux wedding planners de confiance de ce lieu. Vous recevez 1 à 3 devis sur mesure sous 48 heures.',
    it: 'Compila il modulo e il team LaplandWeddings inoltrerà la tua richiesta ai wedding planner di fiducia di questa location. Ricevi 1–3 preventivi su misura entro 48 ore.',
    nl: 'Vul het formulier in en het LaplandWeddings-team stuurt je aanvraag door naar de vertrouwde trouwplanners van deze locatie. Je ontvangt binnen 48 uur 1–3 offertes op maat.', sv: 'Fill in the form and the LaplandWeddings team will route your enquiry to this venue’s trusted wedding planners. You get 1–3 tailored quotes within 48 hours.',
  },
  // Templates — {name} / {region} are substituted at render time.
  whatMakesSpecial: {
    en: 'What makes {name} special', fi: 'Mikä tekee {name}sta erityisen',
    de: 'Was {name} besonders macht', ja: '{name}が特別な理由',
    es: 'Qué hace especial a {name}', 'pt-BR': 'O que torna {name} especial',
    'zh-CN': '{name} 的特别之处', ko: '{name}이(가) 특별한 이유',
    fr: 'Ce qui rend {name} unique', it: 'Cosa rende speciale {name}',
    nl: 'Wat {name} bijzonder maakt', sv: 'What makes {name} special',
  },
  stylesItFits: {
    en: 'Wedding styles {name} fits', fi: '{name} sopii näihin häihin',
    de: 'Hochzeitsstile, zu denen {name} passt', ja: '{name}に合う結婚式スタイル',
    es: 'Estilos de boda que encajan con {name}', 'pt-BR': 'Estilos de casamento que combinam com {name}',
    'zh-CN': '{name} 适合的婚礼风格', ko: '{name}에 어울리는 웨딩 스타일',
    fr: 'Styles de mariage adaptés à {name}', it: 'Stili di matrimonio adatti a {name}',
    nl: 'Trouwstijlen die bij {name} passen', sv: 'Wedding styles {name} fits',
  },
  otherRegionVenues: {
    en: 'Other {region} venues', fi: 'Muita {region}n hääpaikkoja',
    de: 'Weitere Locations in {region}', ja: '{region}の他の会場',
    es: 'Otros lugares en {region}', 'pt-BR': 'Outros locais em {region}',
    'zh-CN': '{region}的其他场地', ko: '{region}의 다른 웨딩 장소',
    fr: 'Autres lieux à {region}', it: 'Altre location a {region}',
    nl: 'Andere locaties in {region}', sv: 'Other {region} venues',
  },
  getQuoteFor: {
    en: 'Get a quote: {name}', fi: 'Pyydä tarjous: {name}',
    de: 'Angebot anfordern: {name}', ja: '見積もりを依頼：{name}',
    es: 'Solicita un presupuesto: {name}', 'pt-BR': 'Peça um orçamento: {name}',
    'zh-CN': '获取报价：{name}', ko: '견적 받기: {name}',
    fr: 'Demander un devis: {name}', it: 'Richiedi un preventivo: {name}',
    nl: 'Vraag een offerte aan: {name}', sv: 'Get a quote: {name}',
  },
};

export default function VenuePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, dataLang, tr } = useLang();
  const v = slug ? getVenueBySlug(slug) : undefined;
  if (!v) return <NotFound />;
  const vt = (k: VKey) => pickLocalized(V[k], lang);
  const guests = ui('guests', lang);

  // Sibling venues in the same region for cross-linking
  const siblings = venues
    .filter((x) => x.locationSlug === v.locationSlug && x.slug !== v.slug)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${v.name}: ${v.region[dataLang]} | LaplandWeddings`}
        description={v.description[dataLang].slice(0, 160)}
        path={`/venues/${v.slug}`}
        image={v.image}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EventVenue',
          name: v.name,
          description: v.description[dataLang],
          url: `https://laplandweddings.online/venues/${v.slug}`,
          address: { '@type': 'PostalAddress', addressLocality: v.region[dataLang], addressCountry: 'FI' },
          maximumAttendeeCapacity: v.capacity.max,
        }}
      />

      {/* CUSTOM HERO — bottom-aligned editorial layout, avoids face/branding collisions in venue photos */}
      <section className="relative min-h-[72vh] sm:min-h-[82vh] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src={v.image} alt={v.imageAlt[dataLang]} className="w-full h-full object-cover" loading="eager" fetchPriority="high"  decoding="async" width="1920" height="1080"/>
          {/* Strong cinematic gradient — content area always readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(15,12,10,0.35) 0%, rgba(15,12,10,0.20) 35%, rgba(15,12,10,0.55) 65%, rgba(15,12,10,0.95) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-10 sm:pb-16 pt-24 sm:pt-32">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              {v.region[dataLang].split('·').map((part) => (
                <span
                  key={part}
                  className="whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(201,70,106,0.85)', color: '#FFFFFF' }}
                >
                  {part.trim()}
                </span>
              ))}
              <span
                className="whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.55)', color: '#FFFFFF', backdropFilter: 'blur(4px)' }}
              >
                {v.capacity.min}–{v.capacity.max} {guests}
              </span>
              <span
                className="whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.55)', color: '#FFFFFF', backdropFilter: 'blur(4px)' }}
              >
                {v.priceTier}
              </span>
            </div>
            <h1
              className="font-heading text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-5 tracking-wide leading-[1.05]"
              style={{ color: '#FFFFFF', textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)' }}
            >
              {v.name}
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl leading-relaxed mb-6"
              style={{ color: 'rgba(245,235,224,0.95)', textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
            >
              {v.description[dataLang].split('.').slice(0, 2).join('.') + '.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#quote"
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-colors"
                style={{ background: '#C9466A', color: '#FFFFFF', boxShadow: '0 8px 24px -4px rgba(201,70,106,0.5)' }}
              >
                {vt('getQuoteVenue')} →
              </a>
              <a
                href={hotelsLink(v.name, `venue_hero_${v.slug}`)}
                target="_blank"
                rel={AFFILIATE_REL}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-colors"
                style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.10)', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(6px)' }}
              >
                {vt('checkPrices')} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="bg-night-light rounded-2xl p-6 border border-line-light">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: '#C9466A' }}>{tr.sections.capacity}</p>
            <p className="font-heading text-3xl mb-0.5" style={{ color: '#1F1612' }}>{v.capacity.min}–{v.capacity.max}</p>
            <p className="text-sm" style={{ color: '#5A4F48' }}>{guests}</p>
          </div>
          <div className="bg-night-light rounded-2xl p-6 border border-line-light">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: '#C9466A' }}>{tr.sections.priceRange}</p>
            <PriceTierBadge tier={v.priceTier} lang={lang} />
            <p className="text-sm mt-2" style={{ color: '#5A4F48' }}>
              {v.priceTier === '€€' && vt('affordable')}
              {v.priceTier === '€€€' && vt('midRange')}
              {v.priceTier === '€€€€' && vt('premium')}
            </p>
          </div>
          <div className="bg-night-light rounded-2xl p-6 border border-line-light">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: '#C9466A' }}>{vt('open')}</p>
            <p className="font-heading text-2xl mb-0.5" style={{ color: '#1F1612' }}>
              {v.yearRound ? vt('yearRound') : vt('seasonal')}
            </p>
            <p className="text-sm" style={{ color: '#5A4F48' }}>{v.yearRound ? vt('open12') : vt('winterSeason')}</p>
          </div>
          <div className="bg-night-light rounded-2xl p-6 border border-line-light flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: '#C9466A' }}>{vt('suitsWeddings')}</p>
            <p className="text-sm mb-3" style={{ color: '#1F1612', lineHeight: '1.5' }}>{v.weddingTypeSlugs.length} {vt('weddingTypesCount')}</p>
            <a href="#quote" className="text-xs font-semibold inline-flex items-center" style={{ color: '#C9466A' }}>
              {vt('tailoredProposal')} →
            </a>
          </div>
        </div>
      </Section>

      {/* DESCRIPTION + WHY THIS VENUE */}
      <Section className="bg-night-light/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold mb-3" style={{ color: '#C9466A' }}>
              {vt('atAGlance')}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl mb-4 tracking-wide" style={{ color: '#F5EBE0' }}>
              {vt('whatMakesSpecial').replace('{name}', v.name)}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: '#C9B5A4' }}>
              {v.description[dataLang]}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-night-light rounded-2xl p-6 sm:p-8 border border-line-light">
              <h3 className="font-heading text-2xl mb-5 tracking-wide" style={{ color: '#1F1612' }}>
                {vt('venueOffers')}
              </h3>
              <ul className="space-y-3">
                {v.features[dataLang].map((f) => (
                  <li key={f} className="flex items-start gap-3" style={{ color: '#1F1612' }}>
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full inline-flex items-center justify-center text-xs" style={{ background: '#C9466A', color: '#FFFFFF' }}>✓</span>
                    <span className="text-[15px] leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-night-light rounded-2xl p-6 sm:p-8 border border-line-light">
              <h3 className="font-heading text-2xl mb-5 tracking-wide" style={{ color: '#1F1612' }}>
                {vt('weddingSpaces')}
              </h3>
              <ul className="space-y-3">
                {v.weddingSpaces[dataLang].map((s) => (
                  <li key={s} className="flex items-start gap-3" style={{ color: '#1F1612' }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: '#C9466A' }}>◆</span>
                    <span className="text-[15px] leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* WEDDING TYPES */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold mb-3" style={{ color: '#C9466A' }}>
            {vt('weddingTypes')}
          </p>
          <h3 className="font-heading text-2xl sm:text-3xl mb-6 tracking-wide" style={{ color: '#F5EBE0' }}>
            {vt('stylesItFits').replace('{name}', v.name)}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {v.weddingTypeSlugs.map((wt) => (
              <L
                key={wt}
                to={`/wedding-types/${wt}`}
                className="text-sm px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                style={{ background: '#FBF6F0', color: '#1F1612', border: '1px solid #DCCEC0' }}
              >
                {wt.replace(/-/g, ' ')}
              </L>
            ))}
          </div>
        </div>
      </Section>

      {/* SIBLING VENUES IN SAME REGION */}
      {siblings.length > 0 && (
        <Section className="bg-night-light/30" eyebrow={vt('otherRegionVenues').replace('{region}', v.region[dataLang])} title={vt('compareNearby')}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {siblings.map((sib) => (
              <L key={sib.slug} to={`/venues/${sib.slug}`} className="group bg-night-light rounded-2xl overflow-hidden border border-line-light transition-all hover:scale-[1.02]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={sib.image} alt={sib.imageAlt[dataLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  decoding="async" width="800" height="600"/>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: '#C9466A' }}>{sib.region[dataLang]}</p>
                  <h4 className="font-heading text-xl mb-1" style={{ color: '#1F1612' }}>{sib.name}</h4>
                  <p className="text-xs" style={{ color: '#5A4F48' }}>{sib.capacity.min}–{sib.capacity.max} {guests} · {sib.priceTier}</p>
                </div>
              </L>
            ))}
          </div>
        </Section>
      )}

      {/* LEAD FORM */}
      <Section id="quote" eyebrow={vt('freeQuote')} title={vt('getQuoteFor').replace('{name}', v.name)} subtitle={vt('leadIntro')}>
        <LeadForm presetVenue={v.name} presetLocation={v.locationSlug} />
        <div className="mt-8">
          <AffiliateDisclosure />
        </div>
      </Section>
    </>
  );
}
