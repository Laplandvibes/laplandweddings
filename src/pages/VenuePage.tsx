import { useParams } from 'react-router-dom';
import { venueTitle } from '../lib/venueTitle.mjs';
import { VENUE_DESCRIPTION } from '../lib/venueMeta.mjs';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import PriceTierBadge from '../components/PriceTierBadge';
import { getVenueBySlug, venues } from '../data/venues';
import { weddingTypes } from '../data/weddingTypes';
import { useLang } from '../i18n/LangContext';
import { venueLodgingLink, AFFILIATE_REL } from '../lib/affiliate';
import { VENUE_BOOKING, venueIsBookable, venueTown } from '../data/venueBooking';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import NotFound from './NotFound';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import GoogleRatingRow from '../components/GoogleRatingRow';
import VenueCard from '../components/VenueCard';
import { cardBlurb } from '../lib/cardBlurb';

type VKey =
  | 'checkPrices' | 'seeStaysIn'
  | 'affordable' | 'midRange' | 'premium'
  | 'open' | 'yearRound' | 'seasonal' | 'open12' | 'winterSeason'
  | 'suitsWeddings' | 'weddingTypesCount' | 'tailoredProposal'
  | 'atAGlance' | 'venueOffers' | 'weddingSpaces'
  | 'weddingTypes' | 'otherVenues' | 'compareNearby'
  | 'freeQuote' | 'leadIntro'
  | 'whatMakesSpecial' | 'stylesItFits' | 'otherRegionVenues' | 'getQuoteFor';

const V: Record<VKey, Localized<string>> = {
  checkPrices: {
    en: 'Check rates & book', fi: 'Tarkista hinnat & varaa',
    de: 'Preise prüfen & buchen', ja: '料金を確認して予約',
    es: 'Ver precios y reservar', 'pt-BR': 'Ver preços e reservar',
    'zh-CN': '查看价格并预订', ko: '가격 확인 & 예약',
    fr: 'Voir prix & réserver', it: 'Controlli i prezzi e prenoti',
    nl: 'Bekijk prijzen & boek', sv: 'Se priser & boka',
  },
  /**
   * Degraded label for a venue no partner sells. None is listed since 19.10.2026
   * (Levi Ice Castle and Santa's Hotel Santamus were the two, both removed), but a
   * new venue without a property id lands here. "Check rates & book" would promise this venue's own
   * booking page; the link can only offer the town. 🔴 The place name is a
   * separate {town} slot and never baked into the sentence — Finnish needs
   * "Levillä / Rovaniemellä", German "in Levi". Same apposition trap Vesa
   * flagged in the destination copy.
   */
  seeStaysIn: {
    en: 'See stays in {town}', fi: 'Katso majoitus: {town}',
    de: 'Unterkünfte ansehen: {town}', ja: '{town}の宿泊先を見る',
    es: 'Ver alojamientos: {town}', 'pt-BR': 'Ver hospedagens: {town}',
    'zh-CN': '查看住宿：{town}', ko: '숙소 보기: {town}',
    fr: 'Voir les hébergements : {town}', it: 'Veda gli alloggi: {town}',
    nl: 'Bekijk overnachtingen: {town}', sv: 'Se boenden: {town}',
  },
  affordable: {
    en: 'Affordable', fi: 'Edullinen', de: 'Günstig', ja: 'お手頃',
    es: 'Económico', 'pt-BR': 'Acessível', 'zh-CN': '经济实惠', ko: '합리적',
    fr: 'Abordable', it: 'Economico', nl: 'Betaalbaar', sv: 'Prisvärd',
  },
  midRange: {
    en: 'Mid-range', fi: 'Keskihintainen', de: 'Mittelklasse', ja: '中価格帯',
    es: 'Gama media', 'pt-BR': 'Intermediário', 'zh-CN': '中档', ko: '중급',
    fr: 'Milieu de gamme', it: 'Fascia media', nl: 'Middensegment', sv: 'Mellanklass',
  },
  premium: {
    en: 'Premium', fi: 'Premium', de: 'Premium', ja: 'プレミアム',
    es: 'Premium', 'pt-BR': 'Premium', 'zh-CN': '高端', ko: '프리미엄',
    fr: 'Premium', it: 'Premium', nl: 'Premium', sv: 'Premium',
  },
  open: {
    en: 'Open', fi: 'Aukiolo', de: 'Geöffnet', ja: '営業',
    es: 'Apertura', 'pt-BR': 'Funcionamento', 'zh-CN': '开放', ko: '운영',
    fr: 'Ouverture', it: 'Apertura', nl: 'Geopend', sv: 'Öppet',
  },
  yearRound: {
    en: 'Year-round', fi: 'Ympäri vuoden', de: 'Ganzjährig', ja: '通年',
    es: 'Todo el año', 'pt-BR': 'O ano todo', 'zh-CN': '全年', ko: '연중',
    fr: 'Toute l’année', it: 'Tutto l’anno', nl: 'Het hele jaar', sv: 'Året runt',
  },
  seasonal: {
    en: 'Seasonal', fi: 'Sesonki', de: 'Saisonal', ja: 'シーズン制',
    es: 'Por temporada', 'pt-BR': 'Sazonal', 'zh-CN': '季节性', ko: '시즌제',
    fr: 'Saisonnier', it: 'Stagionale', nl: 'Seizoensgebonden', sv: 'Säsong',
  },
  open12: {
    en: '12 months/year', fi: 'avoinna 12 kk', de: '12 Monate/Jahr', ja: '年間12か月',
    es: '12 meses al año', 'pt-BR': '12 meses por ano', 'zh-CN': '一年 12 个月', ko: '연 12개월',
    fr: '12 mois/an', it: '12 mesi all’anno', nl: '12 maanden/jaar', sv: '12 månader/år',
  },
  winterSeason: {
    en: 'winter season', fi: 'talvikausi', de: 'Wintersaison', ja: '冬季',
    es: 'temporada de invierno', 'pt-BR': 'temporada de inverno', 'zh-CN': '冬季', ko: '겨울 시즌',
    fr: 'saison hivernale', it: 'stagione invernale', nl: 'winterseizoen', sv: 'vintersäsong',
  },
  suitsWeddings: {
    en: 'Suits weddings', fi: 'Sopii häihin', de: 'Für Hochzeiten geeignet', ja: '結婚式向き',
    es: 'Apto para bodas', 'pt-BR': 'Ideal para casamentos', 'zh-CN': '适合婚礼', ko: '웨딩에 적합',
    fr: 'Adapté aux mariages', it: 'Adatto ai matrimoni', nl: 'Geschikt voor bruiloften', sv: 'Passar för bröllop',
  },
  weddingTypesCount: {
    en: 'wedding types', fi: 'eri häätyyppiä', de: 'Hochzeitsarten', ja: 'タイプの結婚式',
    es: 'tipos de boda', 'pt-BR': 'tipos de casamento', 'zh-CN': '种婚礼类型', ko: '가지 웨딩 유형',
    fr: 'types de mariage', it: 'tipi di matrimonio', nl: 'soorten bruiloften', sv: 'bröllopstyper',
  },
  tailoredProposal: {
    en: 'Send a wedding enquiry', fi: 'Lähetä hääkysely',
    de: 'Hochzeitsanfrage senden', ja: '結婚式について問い合わせる',
    es: 'Enviar una consulta de boda', 'pt-BR': 'Enviar uma consulta',
    'zh-CN': '发送婚礼咨询', ko: '결혼식 문의 보내기',
    fr: 'Envoyer une demande', it: 'Invia una richiesta',
    nl: 'Trouwaanvraag versturen', sv: 'Skicka en bröllopsförfrågan',
  },
  atAGlance: {
    en: 'This venue at a glance', fi: 'Tämä venue lyhyesti',
    de: 'Diese Location auf einen Blick', ja: 'この会場をひと目で',
    es: 'Este lugar de un vistazo', 'pt-BR': 'Este local em resumo',
    'zh-CN': '场地速览', ko: '이 웨딩 장소 한눈에',
    fr: 'Ce lieu en un coup d’œil', it: 'Questa location in breve',
    nl: 'Deze locatie in het kort', sv: 'Platsen i korthet',
  },
  venueOffers: {
    en: 'What this venue offers', fi: 'Mitä paikka tarjoaa',
    de: 'Was diese Location bietet', ja: 'この会場で提供されるもの',
    es: 'Lo que ofrece este lugar', 'pt-BR': 'O que este local oferece',
    'zh-CN': '此场地提供的服务', ko: '이 웨딩 장소가 제공하는 것',
    fr: 'Ce que ce lieu propose', it: 'Cosa offre questa location',
    nl: 'Wat deze locatie biedt', sv: 'Vad platsen erbjuder',
  },
  weddingSpaces: {
    en: 'Wedding spaces', fi: 'Tilat häihin',
    de: 'Hochzeitsräume', ja: '結婚式スペース',
    es: 'Espacios para bodas', 'pt-BR': 'Espaços para casamento',
    'zh-CN': '婚礼空间', ko: '웨딩 공간',
    fr: 'Espaces de mariage', it: 'Spazi per matrimoni',
    nl: 'Trouwruimtes', sv: 'Bröllopslokaler',
  },
  weddingTypes: {
    en: 'Wedding types', fi: 'Häätyypit',
    de: 'Hochzeitsarten', ja: 'ウェディングタイプ',
    es: 'Tipos de boda', 'pt-BR': 'Tipos de casamento',
    'zh-CN': '婚礼类型', ko: '웨딩 유형',
    fr: 'Types de mariage', it: 'Tipi di matrimonio',
    nl: 'Soorten bruiloften', sv: 'Bröllopstyper',
  },
  otherVenues: {
    en: 'Other venues', fi: 'Muita hääpaikkoja',
    de: 'Weitere Locations', ja: 'その他の会場',
    es: 'Otros lugares', 'pt-BR': 'Outros locais',
    'zh-CN': '其他场地', ko: '다른 웨딩 장소',
    fr: 'Autres lieux', it: 'Altre location',
    nl: 'Andere locaties', sv: 'Andra bröllopsplatser',
  },
  compareNearby: {
    en: 'Compare nearby alternatives', fi: 'Vertaa lähialueen vaihtoehtoihin',
    de: 'Alternativen in der Nähe vergleichen', ja: '近隣の選択肢を比較',
    es: 'Compare alternativas cercanas', 'pt-BR': 'Compare alternativas próximas',
    'zh-CN': '比较附近的选择', ko: '주변 대안 비교하기',
    fr: 'Comparez les alternatives à proximité', it: 'Confronti le alternative vicine',
    nl: 'Vergelijk alternatieven in de buurt', sv: 'Jämför alternativ i närheten',
  },
  freeQuote: {
    en: 'Free enquiry', fi: 'Maksuton kysely',
    de: 'Kostenlose Anfrage', ja: '無料のお問い合わせ',
    es: 'Consulta gratuita', 'pt-BR': 'Consulta gratuita',
    'zh-CN': '免费咨询', ko: '무료 문의',
    fr: 'Demande gratuite', it: 'Richiesta gratuita',
    nl: 'Gratis aanvraag', sv: 'Kostnadsfri förfrågan',
  },
  // Vesa 19.10.2026: "ei ole vielä sopimuksia kenenkään kanssa" (no venue, no planner).
  // The enquiry comes to us and we reply; nothing here may promise a planner, a quote count
  // or a turnaround.
  // Vesa 19.10.2026: "Pyydä tarjous: Kakslauttanen" read as if we had a contract with
  // the venue. We have none with any venue, so the form says so before anything else.
  leadIntro: {
    en: 'We do not represent this venue and cannot book it for you. Your enquiry comes straight to us and we reply personally.',
    fi: 'Emme edusta tätä paikkaa emmekä tee varauksia sen puolesta. Kysely tulee suoraan meille, ja vastaamme henkilökohtaisesti.',
    de: 'Wir vertreten diese Location nicht und können sie nicht für Sie buchen. Ihre Anfrage geht direkt an uns, und wir antworten Ihnen persönlich.',
    ja: '当サイトはこの会場の代理店ではなく、予約の代行も行っていません。お問い合わせは当サイトに直接届き、私たちが個別にお返事します。',
    es: 'No representamos este lugar ni podemos reservarlo por usted. Su consulta nos llega directamente y le respondemos personalmente.',
    'pt-BR': 'Não representamos este local nem podemos reservá-lo por vocês. O pedido de vocês chega diretamente a nós, e respondemos pessoalmente.',
    'zh-CN': '我们不代理该场地，也无法代为预订。您的咨询会直接发送给我们，由我们亲自回复。',
    ko: '저희는 이 장소를 대리하지 않으며 대신 예약해 드릴 수도 없습니다. 문의는 저희에게 바로 전달되며, 저희가 직접 답변드립니다.',
    fr: 'Nous ne représentons pas ce lieu et ne pouvons pas le réserver pour vous. Votre demande nous parvient directement et nous vous répondons personnellement.',
    it: 'Non rappresentiamo questa location e non possiamo prenotarla per Lei. La Sua richiesta arriva direttamente a noi e Le rispondiamo personalmente.',
    nl: 'Wij vertegenwoordigen deze locatie niet en kunnen haar niet voor u boeken. Uw aanvraag komt rechtstreeks bij ons binnen en u krijgt persoonlijk antwoord van ons.',
    sv: 'Vi företräder inte den här platsen och kan inte boka den åt er. Er förfrågan kommer direkt till oss, och vi svarar er personligen.',
  },
  // Templates — {name} / {region} are substituted at render time.
  whatMakesSpecial: {
    en: 'What makes {name} special', fi: 'Mikä tekee {name}sta erityisen',
    de: 'Was {name} besonders macht', ja: '{name}が特別な理由',
    es: 'Qué hace especial a {name}', 'pt-BR': 'O que torna {name} especial',
    'zh-CN': '{name} 的特别之处', ko: '{name}이(가) 특별한 이유',
    fr: 'Ce qui rend {name} unique', it: 'Cosa rende speciale {name}',
    nl: 'Wat {name} bijzonder maakt', sv: 'Det här gör {name} speciellt',
  },
  stylesItFits: {
    en: 'Wedding styles {name} fits', fi: '{name} sopii näihin häihin',
    de: 'Hochzeitsstile, zu denen {name} passt', ja: '{name}に合う結婚式スタイル',
    es: 'Estilos de boda que encajan con {name}', 'pt-BR': 'Estilos de casamento que combinam com {name}',
    'zh-CN': '{name} 适合的婚礼风格', ko: '{name}에 어울리는 웨딩 스타일',
    fr: 'Styles de mariage adaptés à {name}', it: 'Stili di matrimonio adatti a {name}',
    nl: 'Trouwstijlen die bij {name} passen', sv: 'Bröllopsstilar som passar {name}',
  },
  otherRegionVenues: {
    en: 'Other {region} venues', fi: 'Muita {region}n hääpaikkoja',
    de: 'Weitere Locations in {region}', ja: '{region}の他の会場',
    es: 'Otros lugares en {region}', 'pt-BR': 'Outros locais em {region}',
    'zh-CN': '{region}的其他场地', ko: '{region}의 다른 웨딩 장소',
    fr: 'Autres lieux à {region}', it: 'Altre location a {region}',
    nl: 'Andere locaties in {region}', sv: 'Andra platser i {region}',
  },
  getQuoteFor: {
    en: 'A wedding at this venue?', fi: 'Häät tässä paikassa?',
    de: 'Hochzeit an diesem Ort?', ja: 'この会場での結婚式をお考えですか？',
    es: '¿Una boda en este lugar?', 'pt-BR': 'Um casamento neste local?',
    'zh-CN': '想在这里举办婚礼？', ko: '이곳에서 결혼식을 계획하시나요?',
    fr: 'Un mariage dans ce lieu ?', it: 'Un matrimonio in questa location?',
    nl: 'Trouwen op deze locatie?', sv: 'Bröllop på den här platsen?',
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
        title={venueTitle(v.name, v.region[dataLang], dataLang)}
        description={VENUE_DESCRIPTION[v.slug]?.[dataLang] ?? ''}
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

      {/* HERO, model C (Vesa 2026-09-28): the photo is shown whole and clean, and the
          chips, name, lead and buttons sit below it on the page's own background, as
          on laplandtransport. On a phone the old text-over-photo block covered most of
          the picture (the couple's faces on Arctic SnowHotel) and fell under AA on
          bright snow at a real phone height (375×812: h1 2.0:1, lead 2.7:1). */}
      <section>
        <div className="relative h-[42svh] min-h-[240px] sm:h-[380px] md:h-[440px] lg:h-[500px] xl:h-[560px] 2xl:h-[600px] overflow-hidden">
          <img src={v.image} alt={v.imageAlt[dataLang]} className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" width="1920" height="1080" />
        </div>
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8 pb-2 sm:pb-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              {v.region[dataLang].split('·').map((part) => (
                <span
                  key={part}
                  className="whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: '#C9466A', color: '#FFFFFF' }}
                >
                  {part.trim()}
                </span>
              ))}
              <span
                className="whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.22)', color: '#FFFFFF' }}
              >
                {v.capacity.min}–{v.capacity.max} {guests}
              </span>
            </div>
            <h1
              className="font-heading text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-5 tracking-wide leading-[1.05]"
              style={{ color: '#FFFFFF' }}
            >
              {v.name}
            </h1>
            <p
              className="text-base sm:text-lg max-w-2xl leading-relaxed mb-6"
              style={{ color: '#FFFFFF' }}
            >
              {cardBlurb(v.description[dataLang], 220)}
            </p>
            {/* One line each, in every language (Vesa 2026-09-28): the long per-venue
                sentences wrapped in de/it/es. The quote button uses the venue cards'
                own short label, so the card and the page say the same thing. */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#quote"
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full whitespace-nowrap transition-colors"
                style={{ background: '#C9466A', color: '#FFFFFF', boxShadow: '0 8px 24px -4px rgba(201,70,106,0.5)' }}
              >
                {vt('tailoredProposal')} →
              </a>
              {/* Property-level deep link. Before 2026-08-02 this passed the
                  venue NAME as ?ss= and reached a property page 0 times out of
                  38; ", Finland" on a hotel name empties Sembo's autosuggest and
                  drops the visitor on the partner front page. Now the town goes
                  in ?ss= and the venue is addressed by its verified partner id.
                  Where no partner sells the venue we do NOT invent an id — the
                  label degrades so the button never promises more than it has. */}
              <a
                href={venueLodgingLink({ slug: v.slug, ...VENUE_BOOKING[v.slug], town: venueTown(v.slug) }, lang)}
                target="_blank"
                rel={AFFILIATE_REL}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full whitespace-nowrap transition-colors"
                style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.4)' }}
              >
                {venueIsBookable(v.slug, lang)
                  ? vt('checkPrices')
                  : vt('seeStaysIn').replace('{town}', venueTown(v.slug))} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <Section>
        {/* Google's verdict on this venue, on the page that is entirely about
            it. Renders nothing when the sync produced no certain match — the
            common case here (8 of 21 venues), and the fail-closed path. */}
        <div className="max-w-6xl mx-auto mb-5">
          <GoogleRatingRow venue={v} tone="dark" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div className="bg-night-light rounded-2xl p-6 border border-line-light">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: 'var(--color-rose-ink)' }}>{tr.sections.capacity}</p>
            <p className="font-heading tracking-wide text-3xl mb-0.5" style={{ color: '#1F1612' }}>{v.capacity.min}–{v.capacity.max}</p>
            <p className="text-sm" style={{ color: '#5A4F48' }}>{guests}</p>
          </div>
          <div className="bg-night-light rounded-2xl p-6 border border-line-light">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: 'var(--color-rose-ink)' }}>{tr.sections.priceRange}</p>
            {/* The price level as a word only; the €€€ marks are not shown. */}
            <PriceTierBadge tier={v.priceTier} lang={lang} />
          </div>
          <div className="bg-night-light rounded-2xl p-6 border border-line-light">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: 'var(--color-rose-ink)' }}>{vt('open')}</p>
            <p className="font-heading tracking-wide text-2xl mb-0.5" style={{ color: '#1F1612' }}>
              {v.yearRound ? vt('yearRound') : vt('seasonal')}
            </p>
            {/* Year-round venues said it three times ("OPEN / Year-round / 12 months/year").
                Seasonal ones genuinely gain from the second line, so keep it only there. */}
            {!v.yearRound && (
              <p className="text-sm" style={{ color: '#5A4F48' }}>{vt('winterSeason')}</p>
            )}
          </div>
          <div className="bg-night-light rounded-2xl p-6 border border-line-light flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: 'var(--color-rose-ink)' }}>{vt('suitsWeddings')}</p>
            <p className="text-sm mb-3" style={{ color: '#1F1612', lineHeight: '1.5' }}>{v.weddingTypeSlugs.length} {vt('weddingTypesCount')}</p>
            {/* Was a small text link. The form itself sits at the very bottom of
                a long page, so this is the only entry point most readers see
                above the fold (Vesa 2026-07-29: "lomake on jotenkin tosi oudosti
                sivun lopussa, moni edes nää sitä"). Made it a real button. */}
            <a
              href="#quote"
              className="inline-flex items-center justify-center text-center text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
              style={{ background: '#C9466A', color: '#FFFFFF' }}
            >
              {vt('tailoredProposal')} →
            </a>
          </div>
        </div>
      </Section>

      {/* DESCRIPTION + WHY THIS VENUE */}
      <Section className="bg-night-light/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold mb-3" style={{ color: 'var(--color-rose-glow)' }}>
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
                    <span className="mt-1 flex-shrink-0" style={{ color: 'var(--color-rose-ink)' }}>◆</span>
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
          <p className="uppercase tracking-[0.3em] text-xs font-semibold mb-3" style={{ color: 'var(--color-rose-glow)' }}>
            {vt('weddingTypes')}
          </p>
          <h3 className="font-heading text-2xl sm:text-3xl mb-6 tracking-wide" style={{ color: '#F5EBE0' }}>
            {vt('stylesItFits').replace('{name}', v.name)}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {v.weddingTypeSlugs.map((wt) => {
              const type = weddingTypes.find((w) => w.slug === wt);
              return (
                <L
                  key={wt}
                  to={`/wedding-types/${wt}`}
                  className="text-sm px-4 py-2 rounded-full font-medium transition-all hover:scale-105"
                  style={{ background: '#FBF6F0', color: '#1F1612', border: '1px solid #DCCEC0' }}
                >
                  {type ? type.name[dataLang] : wt.replace(/-/g, ' ')}
                </L>
              );
            })}
          </div>
        </div>
      </Section>

      {/* SIBLING VENUES IN SAME REGION */}
      {siblings.length > 0 && (
        <Section className="bg-night-light/30" eyebrow={vt('otherRegionVenues').replace('{region}', v.region[dataLang])} title={vt('compareNearby')}>
          {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
              Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
              renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
          <div className="max-w-5xl mx-auto">
            <FeaturedPartnerSlot placement="venue_related" locale={lang} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {siblings.map((sib) => (
              <VenueCard key={sib.slug} venue={sib} sid="venue_related" />
            ))}
          </div>
        </Section>
      )}

      {/* LEAD FORM */}
      <Section id="quote" eyebrow={vt('freeQuote')} title={vt('getQuoteFor')} subtitle={vt('leadIntro')}>
        <LeadForm presetVenue={v.name} presetLocation={v.locationSlug} />
        <div className="mt-8">
          <AffiliateDisclosure />
        </div>
      </Section>
    </>
  );
}
