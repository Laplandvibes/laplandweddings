import { Suspense } from 'react';
import ProductRail, { type RailLang } from '../shared/ads/ProductRail'
import nordicnestRail from '../shared/ads/rails/nordicnest'
import nordicnestPicks from '../shared/ads/data/nordicnestPicks'
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { STATIC_META } from '../lib/staticMeta.mjs';
import NewsletterSignup from '../components/NewsletterSignup';
import RelatedSites from '../components/RelatedSites';
import { useLang } from '../i18n/LangContext';
import { t as translations, type Lang } from '../i18n/translations';
import { locations, locationImage } from '../data/locations';
import { weddingTypes } from '../data/weddingTypes';
import { venues } from '../data/venues';
import L from '../components/L';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AD_SLOTS } from '../data/adSlots';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import VenueCard from '../components/VenueCard';
import TraditionsSection from '../components/TraditionsSection';
import { pickLocalized } from '../data/localized';
import { AppPromoHero } from '../components/AppPromo';
import { AURORA_VIDEO } from '../data/heroVideo';
import ImgCredit, { type ImageCredit } from '../components/ImgCredit';

// Licensed stills for the seasonal hero (receipts: public/images/KUVALAHTEET.json).
// Talvihero vaihdettu 26.9.2026: Räsäsen Levin revontulikuva oli laplandwellnessillä jo 17.9. Tämä on Pexels-kuva
// (ei CC BY-SA), koska sivuston talvijakokortti (/og-winter.jpg) rakennetaan tästä kuvasta (lv_permanent_rules §34.2).
const WINTER_HERO_CREDIT: ImageCredit = { name: 'Mark Davis', license: 'Pexels', url: 'https://www.pexels.com/photo/aurora-lights-during-night-time-11544401/' };
const SUMMER_HERO_CREDIT: ImageCredit = { name: 'Tevfik Teker', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Midnight_Sun_in_Inari_-_panoramio_(5).jpg', cropped: true };

// Per-locale string picker — every visible string lists fi/en/de/ja/es/ko/fr/it/nl/sv.
// Every locale has native copy here. es was added 2026-09-01, pt-BR 2026-09-19 and
// zh-CN 2026-09-20 — each time the front page had been rendering in English for that
// reader while the rest of the site was translated, and each time a native reviewer
// found it, not a gate.
type Bag = { fi: string; en: string; de: string; ja: string; es: string; 'pt-BR': string; 'zh-CN': string; ko: string; fr: string; it: string; nl: string; sv: string };
const pick = (lang: Lang, b: Bag): string => {
  switch (lang) {
    case 'fi': return b.fi;
    case 'de': return b.de;
    case 'ja': return b.ja;
    case 'es': return b.es;
    case 'pt-BR': return b['pt-BR'];
    case 'zh-CN': return b['zh-CN'];
    case 'ko': return b.ko;
    case 'fr': return b.fr;
    case 'it': return b.it;
    case 'nl': return b.nl;
    case 'sv': return b.sv;
    default:   return b.en;
  }
};

// Automatic seasonal hero: summer image 1 May to 31 Aug, aurora season 1 Sep to 30 Apr (runtime, every year).
// September moved to the aurora side on 19.9.2026: the aurora season in Lapland starts in
// late August, and the winter-wedding planning traffic peaks in autumn.
const isSummerSeason = (): boolean => { const m = new Date().getMonth() + 1; return m >= 5 && m <= 8; };

export default function Home() {
  const { lang, dataLang, tr } = useLang();

  // <title> and meta description: src/lib/staticMeta.mjs, the same object scripts/prerender-meta.mjs writes
  // into the prerendered HTML (one source since 2026-10-05).
  const seo = STATIC_META['/'][lang];

  const featuredVenues = venues.slice(0, 6);


  // Seasonal hero copy flips with the SAME isSummerSeason() that drives the hero
  // image. Summer = midnight-sun / white-night wording (no aurora, no snow).
  // es / pt-BR / zh-CN have no native summer string yet → fall back to the EN
  // summer copy (consistent with how those locales fall back to EN elsewhere),
  // never to the static winter title.
  const summer = isSummerSeason();
  const enHome = translations.en.home as { heroTitleSummer: string; heroSubtitleSummer: string };
  const localeHome = tr.home as Partial<{ heroTitleSummer: string; heroSubtitleSummer: string }>;
  const heroTitle = summer
    ? (localeHome.heroTitleSummer ?? enHome.heroTitleSummer)
    : tr.home.heroTitle;
  const heroSubtitle = summer
    ? (localeHome.heroSubtitleSummer ?? enHome.heroSubtitleSummer)
    : tr.home.heroSubtitle;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'LaplandWeddings',
          url: 'https://laplandweddings.online',
          description: seo.description,
          areaServed: 'Finnish Lapland',
          parentOrganization: {
            '@type': 'Organization',
            name: 'LaplandVibes',
            url: 'https://laplandvibes.com',
          },
        }}
      />

      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        /* Aurora season (Sep–Apr): a real aurora time-lapse frame by a Finnish photographer as
           the still (poster), and the same clip as an ambient loop on wide screens. Replaced the
           AI reindeer-sleigh render on 19.9.2026; receipt in src/data/heroVideo.ts. */
        image={summer ? '/images/heroes/midnight-sun-inari-teker.jpg' : '/images/heroes/aurora-fell-davis.jpg'}
        credit={summer ? SUMMER_HERO_CREDIT : WINTER_HERO_CREDIT}
        lang={lang}
        objectPosition={summer ? '50% 60%' : '50% 40%'}
        video={summer ? undefined : AURORA_VIDEO}
        avifSrcSet={summer ? '/images/heroes/midnight-sun-inari-teker-800.avif 800w, /images/heroes/midnight-sun-inari-teker-1200.avif 1200w' : '/images/heroes/aurora-fell-davis-800.avif 800w, /images/heroes/aurora-fell-davis-1200.avif 1200w'}
        webpSrcSet={summer ? '/images/heroes/midnight-sun-inari-teker-800.webp 800w, /images/heroes/midnight-sun-inari-teker-1200.webp 1200w' : '/images/heroes/aurora-fell-davis-800.webp 800w, /images/heroes/aurora-fell-davis-1200.webp 1200w'}
        sizes="100vw"
        imageAlt={summer ? pick(lang, {
          fi: 'Keskiyön aurinko Inarijärven yllä juhannuksen aikaan',
          en: 'The midnight sun over Lake Inari around midsummer',
          de: 'Die Mitternachtssonne über dem Inarisee um die Mittsommerzeit',
          ja: '夏至の頃、イナリ湖の上に輝く真夜中の太陽',
          es: 'El sol de medianoche sobre el lago Inari en pleno verano',
          'pt-BR': 'O sol da meia-noite sobre o lago Inari no auge do verão',
          'zh-CN': '仲夏时节，伊纳里湖上空的午夜阳光。',
          ko: '한여름 이나리 호수 위의 백야의 태양',
          fr: 'Le soleil de minuit sur le lac Inari autour du solstice d’été',
          it: 'Il sole di mezzanotte sul lago Inari intorno al solstizio d’estate',
          nl: 'De middernachtzon boven het Inarimeer rond midzomer',
          sv: 'Midnattssolen över Enare träsk kring midsommar',
        }) : pick(lang, {
          fi: 'Revontulet tummien, lumisten tunturien yllä talviyönä',
          en: 'Northern lights over dark, snowy fells on a winter night',
          de: 'Polarlichter über dunklen, verschneiten Fjälls in einer Winternacht',
          ja: '冬の夜、雪に覆われた暗いフェルの上に広がるオーロラ',
          es: 'Auroras boreales sobre fells oscuros y nevados en una noche de invierno',
          'pt-BR': 'Aurora boreal sobre montes escuros e nevados numa noite de inverno',
          'zh-CN': '冬夜里，白雪覆盖的幽暗山丘上空的极光。',
          ko: '겨울밤, 눈 덮인 어두운 산 위로 펼쳐진 오로라',
          fr: 'Aurores boréales au-dessus de fjälls sombres et enneigés par une nuit d’hiver',
          it: 'Aurora boreale sopra fjäll scuri e innevati in una notte d’inverno',
          nl: 'Noorderlicht boven donkere, besneeuwde fjälls op een winternacht',
          sv: 'Norrsken över mörka, snötäckta fjäll en vinternatt',
        })}
      >
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <L
              to="/venues"
              className="inline-flex items-center justify-center text-center px-7 py-3.5 bg-rose hover:bg-pink font-semibold rounded-full shadow-xl shadow-rose/30 transition-colors"
              style={{ color: '#FFFFFF', background: '#C9466A' }}
            >
              {tr.cta.seeVenues}
            </L>
          </div>
          <p
            className="text-xs sm:text-sm tracking-wide"
            style={{ color: '#FBF6F0', opacity: 0.82, textShadow: '0 1px 10px rgba(0,0,0,0.55)' }}
          >
            {tr.home.heroReassure}
          </p>
        </div>
      </PageHero>
      {/* Wedding Types: the first thing under the hero (Vesa 19.9.2026, front-page
          rule of 18.9.: what the reader came for, as image cards, before any ad,
          app promo or copy in which the site talks about itself). */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Häätyypit',
          en: 'Wedding types',
          de: 'Hochzeitsarten',
          ja: '結婚式のタイプ',
          es: 'Tipos de boda',
          'pt-BR': 'Tipos de casamento',
          'zh-CN': '婚礼类型',
          ko: '결혼식 유형',
          fr: 'Types de mariage',
          it: 'Tipologie di matrimonio',
          nl: 'Soorten bruiloft',
          sv: 'Bröllopstyper',
        })}
        title={tr.home.typesTitle}
        className="bg-night-light/30"
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {weddingTypes.map((wt) => (
            <L
              key={wt.slug}
              to={`/wedding-types/${wt.slug}`}
              className="on-image group relative aspect-[3/4] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-night-light border border-white/5 hover:border-rose/40 transition-all"
            >
              <img
                src={wt.heroImage}
                alt={wt.name[dataLang]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               decoding="async" width="1920" height="1080" fetchPriority="high"/>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.92) 0%, rgba(15,12,10,0.55) 45%, rgba(15,12,10,0.05) 100%)' }} />
              {/* pb-7 below sm: in the two-up phone grid the photo credit in the bottom-right
                  corner wraps to two lines (~22 px), and the capacity line has to sit above it. */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 pb-7 sm:p-6">
                <h3 className="font-heading text-base sm:text-3xl text-white tracking-wide mb-1 sm:mb-1.5 leading-tight">
                  {wt.name[dataLang]}
                </h3>
                <p className="hidden sm:block text-sm text-gray-200/90 mb-3 line-clamp-2">{wt.tagline[dataLang]}</p>
                {/* Price range removed 2026-07-29 (Vesa). The figures were
                    invented, spanned 16x (€2 500–€40 000), and mixed units: the
                    glass-igloo card quoted a price per night beside cards
                    quoting the cost of a whole wedding. Money now lives only on
                    the pricing page, where a number can be explained. */}
                <div className="text-[10px] sm:text-xs text-gray-300">
                  {pickLocalized(wt.capacity, lang)}
                </div>
              </div>
              <ImgCredit credit={wt.heroCredit} lang={lang} plain />
              <div className="hidden">
              </div>
            </L>
          ))}
        </div>
      </Section>

      {/* Finnish wedding traditions (19.10.2026). Replaced the "wedding moments" cards
          (husky arrival, frozen lakes, sauna to snow, ice hole): Vesa asked whether anyone
          really steps into an ice hole at a wedding, and nobody does. Copy is loaded for
          the reader's language only, below the fold, so the fallback just holds the space. */}
      <Suspense fallback={<div className="min-h-[640px]" aria-hidden="true" />}>
        <TraditionsSection />
      </Suspense>

      {/* Locations */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Paikkakunnat',
          en: 'Regions',
          de: 'Regionen',
          ja: 'エリア',
          es: 'Regiones',
          'pt-BR': 'Regiões',
          'zh-CN': '地区',
          ko: '지역',
          fr: 'Régions',
          it: 'Regioni',
          nl: 'Regio’s',
          sv: 'Regioner',
        })}
        title={tr.home.locationsTitle}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc) => (
            <L
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="on-image group relative overflow-hidden rounded-2xl bg-night-light border border-white/5 hover:border-aurora-pink/40 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={locationImage(loc).src}
                  alt={locationImage(loc).alt[dataLang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                 decoding="async" width="800" height="600"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.85) 0%, rgba(15,12,10,0.35) 50%, rgba(15,12,10,0) 100%)' }} />
              </div>
              {/* Tekstilohkolla oma tummennus, häivytys pt-14:ssä (sama malli kuin activitiesin
                  .lv-scrim-text): talven Ylläs-kuvan lumi paistoi 12 px aluerivin läpi, pahin 3,2:1
                  kaikilla 12 kielellä (raja 4,5:1, korttiteksti 8.10.2026). Kuva tekstin yllä ennallaan. */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 pt-14"
                style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.72) 0%, rgba(15,12,10,0.72) calc(100% - 3.5rem), rgba(15,12,10,0) 100%)' }}
              >
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{loc.region[dataLang]}</p>
                <ImgCredit credit={locationImage(loc).credit} lang={lang} plain />
                <h3 className="font-heading text-2xl text-white tracking-wide">{loc.name[dataLang]}</h3>
              </div>
            </L>
          ))}
        </div>
      </Section>

      {/* ── PÄÄKUMPPANI-banneri. 19.9.2026: kahden sisältölohkon (häätyypit, paikkakunnat) takana,
           koska etusivun kärki kuuluu sille mitä lukija haki (sääntö 18.9.), ei mainospaikan myynnille. ── */}
      {/* Quote band high on the page (Vesa 19.9.2026: the form must be easier to find;
          very few leads). Copy is the existing planners/contact strings. */}
      {/* Vesa 19.9. (ilta): the ivory band drowned between the ivory ad slot and the ivory
          stat cards — "vaatisi jonkinlaisen kolmannen korostusvärin taustalle". The site's third
          colour is the warm gold of the aurora tokens; nothing else on the page uses it as a ground. */}
      <section className="py-10 sm:py-14" style={{ background: 'linear-gradient(135deg, #D4A574 0%, #C99B66 100%)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <p className="uppercase tracking-[0.25em] text-[11px] sm:text-xs font-semibold mb-2" style={{ color: 'rgba(31,22,18,0.72)' }}>{tr.contact.formSub}</p>
              <h2 className="font-heading text-2xl sm:text-3xl tracking-wide mb-2 leading-tight" style={{ color: '#1F1612' }}>{tr.planners.threeQuotesTitle}</h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#2A1F18' }}>{tr.planners.threeQuotesP}</p>
            </div>
            <L
              to="/contact"
              data-umami-event="cta_quote_home"
              className="inline-flex items-center justify-center px-7 py-3.5 font-semibold rounded-full shadow-lg shadow-rose/30 hover:bg-pink transition-colors whitespace-nowrap"
              style={{ color: '#FFFFFF', background: '#C9466A' }}
            >
              {tr.cta.getThreeQuotesShort} →
            </L>
          </div>
        </div>
      </section>

      <MainPartnerBanner config={AD_SLOTS} locale={lang} />

      {/* Why Lapland */}
      <Section title={tr.home.whyTitle}>
        {/* Was `sm:grid-cols-3`, which turned 3 columns on at 640px — the exact
            breakpoint where the stat below jumped to text-5xl. Narrower column +
            bigger type at once wrapped "från 1 600 €" onto two lines across the
            whole 640–1024px band. Hold one column until 768px and grow the type
            back gradually. */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden max-w-5xl mx-auto">
          {[
            /* Vesa 2026-07-28. The previous three stats were "300+ weddings a
               year" (no source anywhere), "from €1 600 — smallest package" (we
               sell no packages and have no agreement with any venue) and "3–5
               weeks — paperwork done" (leads with bureaucracy that most couples
               never need, because a symbolic ceremony requires none). Replaced
               with three claims that are checkable on this site. */
            {
              to: '/venues',
              cta: pick(lang, {
                fi: 'Katso hääpaikat',
                en: 'See the venues',
                de: 'Locations ansehen',
                ja: '会場を見る',
                es: 'Ver los lugares',
                'pt-BR': 'Ver os locais',
                'zh-CN': '查看婚礼场地',
                ko: '예식장 보기',
                fr: 'Voir les lieux',
                it: 'Vedete le location',
                nl: 'Bekijk de locaties',
                sv: 'Se vigselplatserna',
              }),
              stat: String(venues.length),
              label: pick(lang, {
                fi: 'hääpaikkaa kartoitettu',
                en: 'venues surveyed',
                de: 'Orte erfasst',
                ja: '会場を調査',
                es: 'lugares registrados',
                'pt-BR': 'locais mapeados',
                'zh-CN': '家场地已调查',
                ko: '곳을 조사',
                fr: 'lieux recensés',
                it: 'location censite',
                nl: 'locaties bekeken',
                sv: 'platser kartlagda',
              }),
              body: pick(lang, {
                fi: 'Emme edusta yhtäkään niistä emmekä myy niitä. Järjestystä ei voi ostaa.',
                en: 'We represent none of them and sell none of them. The order cannot be bought.',
                de: 'Wir vertreten keinen davon und verkaufen keinen. Die Reihenfolge ist nicht käuflich.',
                ja: 'いずれの代理店でもなく、販売もしていません。掲載順は買えません。',
                es: 'No representamos ni vendemos ninguno de ellos. El orden no se compra.',
                'pt-BR': 'Não representamos nenhum deles nem vendemos nenhum. A ordem não pode ser comprada.',
                'zh-CN': '我们不代理也不出售其中任何一家。排名无法购买。',
                ko: '어느 곳도 대리하거나 판매하지 않습니다. 순서는 살 수 없습니다.',
                fr: 'Nous n’en représentons aucun et n’en vendons aucun. L’ordre ne s’achète pas.',
                it: 'Non ne rappresentiamo e non ne vendiamo nessuna. L’ordine non si compra.',
                nl: 'We vertegenwoordigen er geen en verkopen er geen. De volgorde is niet te koop.',
                sv: 'Vi företräder ingen och säljer ingen. Ordningen går inte att köpa.',
              }),
            },
            {
              to: '/practical-guide',
              cta: pick(lang, {
                fi: 'Symbolinen vai juridinen: lue opas',
                en: 'Symbolic or legal: read the guide',
                de: 'Frei oder standesamtlich: zum Leitfaden',
                ja: 'シンボリックか法的か：ガイドを読む',
                es: 'Simbólica o legal: lea la guía',
                'pt-BR': 'Simbólica ou legal: leia o guia',
                'zh-CN': '象征性婚礼还是法定婚姻：阅读指南',
                ko: '상징 예식 또는 법적 혼인: 안내 보기',
                fr: 'Symbolique ou civil : lire le guide',
                it: 'Simbolico o legale: leggete la guida',
                nl: 'Symbolisch of wettelijk: lees de gids',
                sv: 'Symbolisk eller juridisk: läs guiden',
              }),
              stat: '0',
              label: pick(lang, {
                fi: 'lupaa tai papereita',
                en: 'permits or paperwork',
                de: 'Genehmigungen nötig',
                ja: '許可も書類も不要',
                es: 'permisos o papeleo',
                'pt-BR': 'autorizações ou papelada',
                'zh-CN': '项许可或手续',
                ko: '허가도 서류도 없이',
                fr: 'démarche administrative',
                it: 'permessi o documenti',
                nl: 'vergunningen of papieren',
                sv: 'tillstånd eller papper',
              }),
              body: pick(lang, {
                fi: 'Symbolinen seremonia ei vaadi viranomaisilta mitään. Juridisen avioliiton useimmat solmivat kotimaassaan.',
                en: 'A symbolic ceremony needs nothing from the authorities. Most couples register the marriage legally at home.',
                de: 'Eine freie Trauung braucht keinerlei Behördenpapiere. Die Ehe schließen die meisten rechtlich zu Hause.',
                ja: 'シンボリック挙式に役所の手続きは不要。法的な婚姻は多くが母国で行います。',
                es: 'Una ceremonia simbólica no exige nada a las autoridades. La mayoría de las parejas registra el matrimonio legalmente en su país.',
                'pt-BR': 'Uma cerimônia simbólica não exige nada das autoridades. A maioria dos casais registra o casamento legalmente em seu país de origem.',
                'zh-CN': '象征性仪式无需任何官方手续。法定婚姻，大多数新人会在本国办理。',
                ko: '상징 예식에는 관공서 절차가 필요 없습니다. 법적 혼인은 대부분 본국에서 합니다.',
                fr: 'Une cérémonie symbolique n’exige aucune formalité. Le mariage légal se fait le plus souvent au pays.',
                it: 'Una cerimonia simbolica non richiede nulla alle autorità. Il matrimonio legale si registra a casa.',
                nl: 'Een symbolische ceremonie vraagt niets van de overheid. Het huwelijk legt men meestal thuis vast.',
                sv: 'En symbolisk ceremoni kräver inget av myndigheterna. Äktenskapet ingås oftast hemma.',
              }),
            },
            {
              /* Was "Jouluk.–maalisk." as the display token. It wrapped onto two
                 lines even on desktop, which pushed this card's label and body
                 out of line with the other two (Vesa 2026-07-29). The months
                 moved into the label, where they fit on one line. */
              to: '/wedding-types',
              cta: pick(lang, {
                fi: 'Katso häätyypit ja kaudet',
                en: 'See wedding types and seasons',
                de: 'Hochzeitsarten und Saisons ansehen',
                ja: '結婚式のタイプと季節を見る',
                es: 'Ver tipos de boda y temporadas',
                'pt-BR': 'Ver tipos de casamento e estações',
                'zh-CN': '查看婚礼类型与季节',
                ko: '결혼식 유형과 시즌 보기',
                fr: 'Voir les types de mariage et les saisons',
                it: 'Vedete i tipi di matrimonio e le stagioni',
                nl: 'Bekijk soorten bruiloften en seizoenen',
                sv: 'Se bröllopstyper och säsonger',
              }),
              stat: pick(lang, {
                fi: 'Talvi',
                en: 'Winter',
                de: 'Winter',
                ja: '冬',
                es: 'Invierno',
                'pt-BR': 'Inverno',
                'zh-CN': '冬',
                ko: '겨울',
                fr: 'L’hiver',
                it: 'Inverno',
                nl: 'Winter',
                sv: 'Vintern',
              }),
              label: pick(lang, {
                fi: 'sesonki jouluk.–maalisk.',
                en: 'season runs Dec–Mar',
                de: 'Saison Dez.–März',
                ja: 'シーズンは12〜3月',
                es: 'temporada de dic. a mar.',
                'pt-BR': 'temporada dez.–mar.',
                'zh-CN': '旺季12月–3月',
                ko: '성수기 12~3월',
                fr: 'saison déc.–mars',
                it: 'stagione dic.–mar.',
                nl: 'seizoen dec.–mrt.',
                sv: 'säsong dec.–mars',
              }),
              body: pick(lang, {
                fi: 'Lumi ja revontulet ovat silloin varmimmillaan. Juhannuksen tienoilla aurinko ei laske lainkaan.',
                en: 'Snow and the aurora are at their most reliable then. Around midsummer the sun does not set at all.',
                de: 'Schnee und Polarlichter sind dann am verlässlichsten. Um die Mittsommerzeit geht die Sonne gar nicht unter.',
                ja: '雪とオーロラがもっとも確実な時期です。夏至の頃は太陽が沈みません。',
                es: 'La nieve y la aurora son entonces las más fiables. Alrededor del solsticio de verano el sol no se pone en absoluto.',
                'pt-BR': 'A neve e a aurora boreal estão mais garantidas nessa época. Perto do solstício de verão, o sol não se põe.',
                'zh-CN': '那时积雪与极光最为稳定可靠。仲夏前后，太阳整日不落。',
                ko: '눈과 오로라가 가장 확실한 시기입니다. 한여름 무렵에는 해가 지지 않습니다.',
                fr: 'La neige et les aurores sont alors les plus fiables. Autour du solstice d’été, le soleil ne se couche pas.',
                it: 'Neve e aurora sono allora più affidabili. Intorno al solstizio d’estate il sole non tramonta.',
                nl: 'Sneeuw en noorderlicht zijn dan het betrouwbaarst. Rond midzomer gaat de zon niet onder.',
                sv: 'Snö och norrsken är då som säkrast. Kring midsommar går solen inte ner.',
              }),
            },
          ].map((stat) => (
            /* The display token sits in a fixed-height box so the labels and
               body copy start on the same line in all three cards regardless of
               how tall the token renders in a given language. */
            /* Number and label centred in the tile (lv_permanent_rules §42, Vesa 17.10.2026). */
            <L key={stat.label} to={stat.to} className="group bg-night-light hover:bg-night-light/70 p-7 sm:p-8 lg:p-9 flex flex-col items-center text-center transition-colors">
              <p className="font-heading text-[44px] sm:text-5xl lg:text-[52px] leading-none text-rose tracking-wide min-h-[52px] sm:min-h-[48px] lg:min-h-[52px] flex items-end justify-center">
                {stat.stat}
              </p>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-aurora-pink font-semibold mt-3.5 mb-3 leading-snug [text-wrap:balance]">
                {stat.label}
              </p>
              <p className="text-sm text-gray-300 leading-[1.7] max-w-[34ch] [text-wrap:balance]">{stat.body}</p>
              <p className="mt-auto pt-5 text-sm font-semibold underline underline-offset-4 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-rose-ink)' }}>{stat.cta} →</p>
            </L>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-10 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">{tr.home.whyP}</p>
      </Section>

      {/* ── LV Media: kakkospääkumppani + 6 premium-paikkaa (tyhjät = house-adit).
           Oli ennen Häätyyppien yläpuolella, eli lukija sai yhden sisältölohkon
           ja sitten kuusi mainospaikkaa. Nyt kolmen lohkon takana. ── */}
      <HomeAdSlots config={AD_SLOTS} locale={lang} />
      {/* Oikea tuoterivi tyhjän house-ad-kortin tilalle (Vesa 4.9.). */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <ProductRail partner={nordicnestRail} snapshot={nordicnestPicks} lang={lang as RailLang} sid="home_wedding_gifts" variant="dark" />
      </div>

      {/* Featured venues */}
      {/* "Vahvistettuja hääpaikkoja" implied we had vetted or partnered with
          these venues. We have no agreement with any of them (Vesa 2026-07-28),
          so the eyebrow now says what we actually did: surveyed them. */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Riippumaton kartoitus',
          en: 'Independent survey',
          de: 'Unabhängige Übersicht',
          ja: '独立した調査',
          es: 'Registro independiente',
          'pt-BR': 'Levantamento independente',
          'zh-CN': '独立调查',
          ko: '독립적인 조사',
          fr: 'Recensement indépendant',
          it: 'Ricognizione indipendente',
          nl: 'Onafhankelijke inventarisatie',
          sv: 'Oberoende kartläggning',
        })}
        title={pick(lang, {
          fi: 'Lapin tunnetuimmat hääpaikat',
          en: 'Lapland’s best-known wedding venues',
          de: 'Die bekanntesten Hochzeitsorte Lapplands',
          ja: 'ラップランドでよく知られた結婚式会場',
          es: 'Los lugares de boda más conocidos de Laponia',
          'pt-BR': 'Os locais de casamento mais conhecidos da Lapônia',
          'zh-CN': '拉普兰最知名的婚礼场地',
          ko: '라플란드에서 잘 알려진 결혼식 장소',
          fr: 'Les lieux de mariage les plus connus de Laponie',
          it: 'Le location per matrimoni più note della Lapponia',
          nl: 'De bekendste trouwlocaties van Lapland',
          sv: 'Lapplands mest kända bröllopsplatser',
        })}
        className="bg-night-light/30"
      >
        {/* Says the quiet part out loud, before the grid rather than in a
            footnote: this is a list, not a catalogue, and a couple who already
            has a venue in mind will not be steered somewhere else. */}
        <p className="text-center text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
          {pick(lang, {
            fi: 'Nämä ovat Lapin tunnetuimmat paikat, joissa häitä vietetään. Emme edusta niitä emmekä järjestä häitä. Jos jokin paikka on jo mielessänne, kirjoittakaa se lomakkeeseen, niin otamme sen vastauksessa huomioon sellaisenaan.',
            en: 'These are the best-known places in Lapland where weddings are held. We do not represent them and we do not organise weddings. If you already have a venue in mind, write it in the form and we take it into account in our reply exactly as you gave it.',
            de: 'Das sind die bekanntesten Orte Lapplands, an denen Hochzeiten gefeiert werden. Wir vertreten sie nicht und richten keine Hochzeiten aus. Wenn Sie bereits einen Ort im Sinn haben, tragen Sie ihn ins Formular ein, dann berücksichtigen wir ihn in unserer Antwort genau so, wie Sie ihn angegeben haben.',
            ja: 'ラップランドで結婚式が行われている、よく知られた場所を集めました。当サイトはこれらの会場の代理店ではなく、結婚式の運営も行いません。すでに希望の会場がある場合はフォームにご記入ください。お返事では、ご記入いただいた会場をそのまま前提にご案内します。',
            es: 'Estos son los lugares más conocidos de Laponia donde se celebran bodas. No los representamos y no organizamos bodas. Si ya tiene un lugar en mente, escríbalo en el formulario y lo tendremos en cuenta en nuestra respuesta tal y como usted lo escribió.',
            'pt-BR': 'Estes são os locais mais conhecidos da Lapônia onde se realizam casamentos. Não os representamos nem organizamos casamentos. Se vocês já têm um local em mente, escrevam no formulário e vamos levá-lo em conta na resposta exatamente como foi informado.',
            'zh-CN': '这些是拉普兰最知名的婚礼举办地。我们不代理这些场地，也不承办婚礼。如果您心中已有中意的场地，请填写在表单中，我们回复时会以您写下的场地为准。',
            ko: '라플란드에서 결혼식이 열리는 잘 알려진 장소들입니다. 저희는 이곳들을 대리하지 않으며 결혼식을 직접 주최하지도 않습니다. 이미 마음에 둔 장소가 있다면 양식에 적어 주세요. 적어 주신 장소를 그대로 반영해 답변드립니다.',
            fr: 'Voici les lieux les plus connus de Laponie où l’on célèbre des mariages. Nous ne les représentons pas et nous n’organisons pas de mariages. Si un lieu vous tient déjà à cœur, indiquez-le dans le formulaire : nous en tiendrons compte dans notre réponse, tel que vous l’avez indiqué.',
            it: 'Questi sono i luoghi più noti della Lapponia in cui si celebrano matrimoni. Non li rappresentiamo e non organizziamo matrimoni. Se ha già una location in mente, la scriva nel modulo: ne terremo conto nella nostra risposta esattamente come l’ha indicata.',
            nl: 'Dit zijn de bekendste plekken in Lapland waar bruiloften worden gevierd. Wij vertegenwoordigen ze niet en organiseren geen bruiloften. Heeft u al een locatie op het oog, zet die dan in het formulier: wij houden er in ons antwoord rekening mee, precies zoals u die opgaf.',
            sv: 'Det här är de mest kända platserna i Lappland där bröllop hålls. Vi företräder dem inte och vi arrangerar inga bröllop. Har ni redan en plats i tankarna, skriv in den i formuläret så tar vi hänsyn till den i vårt svar, precis som ni angav den.',
          })}
        </p>

        {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
            Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
            renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
        <FeaturedPartnerSlot placement="home_featured" locale={lang} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredVenues.map((v) => (
            <VenueCard key={v.slug} venue={v} sid="home" />
          ))}
        </div>
        <div className="text-center mt-10">
          <L to="/venues" className="inline-flex items-center px-6 py-3 border border-white/20 hover:bg-white/5 text-white rounded-full transition-colors">
            {tr.cta.seeAllVenues} →
          </L>
        </div>
      </Section>

      {/* App promo. Vesa 19.9.2026 (looking at the live front page): a couple
          hunting for a wedding venue is not, at that moment, interested in an
          app, so the block sits below the venues, after everything the page
          exists for. Same rule as laplandstays 17.9. and stayinlapland 18.9. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppPromoHero />
      </div>

      {/* Complete your trip — contextual sibling links (editorial, not affiliate) */}
      <RelatedSites />

      {/* Newsletter */}
      <Section className="bg-night-light/20">
        <NewsletterSignup />
      </Section>
    </>
  );
}
