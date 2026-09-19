
import ProductRail, { type RailLang } from '../shared/ads/ProductRail'
import nordicnestRail from '../shared/ads/rails/nordicnest'
import nordicnestPicks from '../shared/ads/data/nordicnestPicks'
import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import NewsletterSignup from '../components/NewsletterSignup';
import RelatedSites from '../components/RelatedSites';
import { useLang } from '../i18n/LangContext';
import { t as translations, type Lang } from '../i18n/translations';
import { locations } from '../data/locations';
import { weddingTypes } from '../data/weddingTypes';
import { venues } from '../data/venues';
import L from '../components/L';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AD_SLOTS } from '../data/adSlots';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import GoogleRatingRow from '../components/GoogleRatingRow';
import EditorsPickChip from '../components/EditorsPickChip';
import { bestGoogleRated, editorialPickNote, pickFirst } from '../data/googleReviews';
import { editorialCopy } from '../data/editorialCopy';
import { pickLocalized } from '../data/localized';
import { AppPromoHero } from '../components/AppPromo';
import { AURORA_VIDEO } from '../data/heroVideo';
import ImgCredit, { type ImageCredit } from '../components/ImgCredit';

// Licensed stills for the seasonal hero (receipts: public/images/KUVALAHTEET.json).
const WINTER_HERO_CREDIT: ImageCredit = { name: 'Simo Räsänen', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Green_aurora_curtain_over_Levi,_Kittil%C3%A4,_Lapland,_Finland,_2023_September.jpg' };
const SUMMER_HERO_CREDIT: ImageCredit = { name: 'Tevfik Teker', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Midnight_Sun_in_Inari_-_panoramio_(5).jpg' };

// Per-locale string picker — every visible string lists fi/en/de/ja/es/ko/fr/it/nl/sv.
// pt-BR / zh-CN still fall back to en until we add native copy (es was added
// 2026-09-01: the whole front page body rendered in English on /es/).
type Bag = { fi: string; en: string; de: string; ja: string; es: string; 'pt-BR': string; ko: string; fr: string; it: string; nl: string; sv: string };
const pick = (lang: Lang, b: Bag): string => {
  switch (lang) {
    case 'fi': return b.fi;
    case 'de': return b.de;
    case 'ja': return b.ja;
    case 'es': return b.es;
    case 'pt-BR': return b['pt-BR'];
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

  // HOME meta <title> — leads with the "Lapland Weddings" keyword + concrete
  // value (venues + marriage paperwork). All 12 locales native (no EN bleed).
  const SEO_TITLE: Record<Lang, string> = {
    en: 'Lapland Weddings 2026: Arctic Venues & Marriage Paperwork',
    fi: 'Häät Lapissa 2026: hääpaikat ja DVV-paperit',
    de: 'Hochzeit in Lappland 2026: Locations & Heiratspapiere',
    ja: 'ラップランドの結婚式2026：会場と婚姻手続き',
    es: 'Bodas en Laponia 2026: lugares y trámites de boda',
    'pt-BR': 'Casamentos na Lapônia 2026: locais e documentação',
    'zh-CN': '拉普兰婚礼2026：婚礼场地与结婚手续',
    ko: '라플란드 결혼식 2026: 예식장과 혼인 서류',
    fr: 'Mariage en Laponie 2026 : lieux, prix et démarches',
    it: 'Matrimonio in Lapponia 2026: location e pratiche di nozze',
    nl: 'Trouwen in Lapland 2026: locaties en huwelijkspapieren',
    sv: 'Bröllop i Lappland 2026: vigselplatser och äktenskapspapper',
  };
  const seoTitle = SEO_TITLE[lang];
  // Description states only what the site actually contains. The old version
  // promised "7 planners"; the data holds 6 wedding *photographers* and no
  // planner directory at all, so both the number and the profession were wrong
  // (same class of error as the "11 languages" claim, Vesa 2026-07-27).
  const seoDesc = pick(lang, {
    fi: 'Riippumaton opas häihin Lapissa: 20 hääpaikkaa, 8 paikkakuntaa, symbolinen ja juridinen seremonia, todelliset kustannukset. Emme edusta yhtäkään paikkaa.',
    en: 'An independent guide to getting married in Lapland: 20 venues, 8 regions, symbolic and legal ceremonies, real costs. We represent none of the venues.',
    de: 'Unabhängiger Leitfaden zum Heiraten in Lappland: 20 Locations, 8 Regionen, symbolische und rechtsgültige Trauung, echte Kosten. Wir vertreten keine davon.',
    ja: '独立した立場でまとめたラップランド結婚式ガイド。会場20か所、エリア8か所、シンボリック挙式と法的婚姻、実際にかかる費用。当サイトはいずれの会場の代理店でもありません。',
    es: 'Una guía independiente para casarse en Laponia: 20 lugares, 8 regiones, ceremonia simbólica y matrimonio civil, costos reales. No representamos a ninguno de los lugares.',
    'pt-BR': 'Um guia independente para casar na Lapônia: 20 locais, 8 regiões, cerimônias simbólicas e legais, custos reais. Não representamos nenhum dos locais.',
    ko: '라플란드 결혼식을 위한 독립적인 안내서입니다. 결혼식 장소 20곳, 지역 8곳, 상징 예식과 법적 혼인, 실제 비용을 정리했습니다. 저희는 어떤 장소도 대리하지 않습니다.',
    fr: 'Un guide indépendant pour se marier en Laponie : 20 lieux, 8 régions, cérémonie symbolique ou mariage civil, coûts réels. Nous ne représentons aucun de ces lieux.',
    it: 'Una guida indipendente per sposarsi in Lapponia: 20 location, 8 regioni, cerimonia simbolica e matrimonio civile, costi reali. Non rappresentiamo nessuna delle location.',
    nl: 'Een onafhankelijke gids voor trouwen in Lapland: 20 locaties, 8 regio’s, symbolische en wettelijke ceremonie, echte kosten. Wij vertegenwoordigen geen enkele locatie.',
    sv: 'En oberoende guide till att gifta sig i Lappland: 20 platser, 8 regioner, symbolisk och juridisk vigsel, verkliga kostnader. Vi företräder ingen av platserna.',
  });

  const featuredVenues = venues.slice(0, 6);

  // Earned, derived, unpurchasable: the best real Google rating among the six
  // venues shown here (see bestGoogleRated). Every card prints its own rating
  // and links to Google's review list, so the reader can check the claim on the
  // spot. The sellable surface is the slot above the grid.
  const venuePick = bestGoogleRated(featuredVenues);
  const venuePickNote = editorialPickNote(venuePick, lang, {
    pickReason: pickLocalized(editorialCopy.pickReason, lang),
    verifiedOn: pickLocalized(editorialCopy.verifiedOn, lang),
  });

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
        title={seoTitle}
        description={seoDesc}
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'LaplandWeddings',
          url: 'https://laplandweddings.online',
          description: seoDesc,
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
        image={summer ? '/images/heroes/midnight-sun-inari-teker.jpg' : '/images/heroes/aurora-levi-rasanen.jpg'}
        credit={summer ? SUMMER_HERO_CREDIT : WINTER_HERO_CREDIT}
        lang={lang}
        objectPosition={summer ? '50% 60%' : '50% 40%'}
        video={summer ? undefined : AURORA_VIDEO}
        avifSrcSet={summer ? '/images/heroes/midnight-sun-inari-teker-800.avif 800w, /images/heroes/midnight-sun-inari-teker-1200.avif 1200w' : '/images/heroes/aurora-levi-rasanen-800.avif 800w, /images/heroes/aurora-levi-rasanen-1200.avif 1200w'}
        webpSrcSet={summer ? '/images/heroes/midnight-sun-inari-teker-800.webp 800w, /images/heroes/midnight-sun-inari-teker-1200.webp 1200w' : '/images/heroes/aurora-levi-rasanen-800.webp 800w, /images/heroes/aurora-levi-rasanen-1200.webp 1200w'}
        sizes="100vw"
        imageAlt={summer ? pick(lang, {
          fi: 'Keskiyön aurinko Inarijärven yllä juhannuksen aikaan',
          en: 'The midnight sun over Lake Inari around midsummer',
          de: 'Die Mitternachtssonne über dem Inarisee um die Mittsommerzeit',
          ja: '夏至の頃、イナリ湖の上に輝く真夜中の太陽',
          es: 'El sol de medianoche sobre el lago Inari en pleno verano',
          'pt-BR': 'O sol da meia-noite sobre o lago Inari no auge do verão',
          ko: '한여름 이나리 호수 위의 백야의 태양',
          fr: 'Le soleil de minuit sur le lac Inari autour du solstice d’été',
          it: 'Il sole di mezzanotte sul lago Inari intorno al solstizio d’estate',
          nl: 'De middernachtzon boven het Inarimeer rond midzomer',
          sv: 'Midnattssolen över Enare träsk kring midsommar',
        }) : pick(lang, {
          fi: 'Vihreät ja violetit revontulet kuusimetsän yllä Suomen Lapin yötaivaalla',
          en: 'Green and violet northern lights over a spruce forest in the Finnish Lapland night sky',
          de: 'Grüne und violette Polarlichter über einem Fichtenwald am Nachthimmel von Finnisch-Lappland',
          ja: 'フィンランド・ラップランドの夜空、針葉樹林の上に広がる緑と紫のオーロラ',
          es: 'Auroras boreales verdes y violetas sobre un bosque de abetos en el cielo nocturno de la Laponia finlandesa',
          'pt-BR': 'Aurora boreal verde e violeta sobre uma floresta de abetos no céu noturno da Lapônia finlandesa',
          ko: '핀란드 라플란드 밤하늘, 가문비나무 숲 위로 펼쳐진 초록빛과 보랏빛 오로라',
          fr: 'Aurores boréales vertes et violettes au-dessus d’une forêt d’épicéas dans le ciel nocturne de la Laponie finlandaise',
          it: 'Aurora boreale verde e viola sopra un bosco di abeti nel cielo notturno della Lapponia finlandese',
          nl: 'Groen en paars noorderlicht boven een sparrenbos aan de nachthemel van Fins Lapland',
          sv: 'Grönt och violett norrsken över en granskog på finska Lapplands natthimmel',
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
              <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6">
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

      {/* Experiences — visual storytelling */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Lapin häämomentit',
          en: 'Lapland wedding moments',
          de: 'Lappland-Hochzeitsmomente',
          ja: 'ラップランドの結婚式の瞬間',
          es: 'Momentos de boda en Laponia',
          'pt-BR': 'Momentos de casamento na Lapônia',
          ko: '라플란드 결혼식의 순간들',
          fr: 'Instants de mariage en Laponie',
          it: 'Istanti di matrimonio in Lapponia',
          nl: 'Bruiloftsmomenten in Lapland',
          sv: 'Bröllopsstunder i Lappland',
        })}
        title={pick(lang, {
          fi: 'Hetket joista vieraat puhuvat vuosia',
          en: 'The moments your guests will remember for years',
          de: 'Momente, von denen Ihre Gäste noch jahrelang erzählen',
          ja: 'ゲストが何年も語り続ける、忘れられない瞬間',
          es: 'Los momentos de los que sus invitados hablarán durante años',
          'pt-BR': 'Os momentos que os convidados vão lembrar por anos',
          ko: '하객들이 오랜 세월 잊지 못할 순간들',
          fr: 'Les instants dont vos invités parleront pendant des années',
          it: 'I momenti di cui i Suoi ospiti parleranno per anni',
          nl: 'De momenten die uw gasten nog jaren zullen herinneren',
          sv: 'Stunderna som era gäster minns i åratal',
        })}
        className="bg-night-light/30"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {[
            {
              img: '/images/stock/exp-husky-levi-granat.webp',
              credit: { name: 'Евгений Гранат', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Levi_-_Huskies_Safari.JPG' } as ImageCredit,
              title: pick(lang, {
                fi: 'Husky-saapuminen',
                en: 'Husky arrival',
                de: 'Ankunft mit Huskys',
                ja: 'ハスキー犬で登場',
                es: 'Llegada en trineo de huskies',
                'pt-BR': 'Chegada com huskies',
                ko: '허스키 썰매로 입장',
                fr: 'Arrivée en traîneau à huskies',
                it: 'Arrivo con gli husky',
                nl: 'Aankomst per huskyslee',
                sv: 'Ankomst med husky',
              }),
              body: pick(lang, {
                fi: 'Pari saapuu vihkimykseen 8 huskyn vetämällä rekellä. Saapuminen on se hetki, jonka kaikki kuvaavat.',
                en: 'The couple arrives at the ceremony pulled by 8 huskies. The arrival shot everyone photographs.',
                de: 'Das Paar kommt zur Trauung mit einem Schlitten, gezogen von 8 Huskys. Die Ankunft ist der Moment, den alle fotografieren.',
                ja: '新郎新婦が8頭のハスキーが引くそりで挙式会場に到着。到着の瞬間は全員がカメラを向ける場面です。',
                es: 'Los novios llegan a la ceremonia en un trineo tirado por 8 huskies. La llegada es el momento que todo el mundo fotografía.',
                'pt-BR': 'O casal chega à cerimônia puxado por 8 huskies. A chegada é o momento que todo mundo fotografa.',
                ko: '신랑 신부가 허스키 8마리가 끄는 썰매를 타고 예식장에 도착합니다. 도착하는 순간은 모두가 카메라를 드는 장면입니다.',
                fr: 'Les mariés arrivent à la cérémonie en traîneau tiré par 8 huskies. L’arrivée est le moment que tout le monde photographie.',
                it: 'Gli sposi arrivano alla cerimonia su una slitta trainata da 8 husky. L’arrivo è l’istante che tutti fotografano.',
                nl: 'Het bruidspaar arriveert bij de ceremonie achter 8 husky’s. De aankomst is het moment dat iedereen fotografeert.',
                sv: 'Paret anländer till ceremonin draget av 8 huskyer. Ankomsten är ögonblicket alla fotograferar.',
              }),
            },
            {
              img: '/images/stock/exp-frozen-inari-stojanovski.webp',
              credit: { name: 'Martin Stojanovski', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Star_trail_over_frozen_Lake_Inari.jpg' } as ImageCredit,
              title: pick(lang, {
                fi: 'Jäätyneet järvet',
                en: 'Frozen lakes',
                de: 'Gefrorene Seen',
                ja: '凍った湖',
                es: 'Lagos helados',
                'pt-BR': 'Lagos congelados',
                ko: '얼어붙은 호수',
                fr: 'Lacs gelés',
                it: 'Laghi ghiacciati',
                nl: 'Bevroren meren',
                sv: 'Frusna sjöar',
              }),
              body: pick(lang, {
                fi: 'Inarinjärvellä iltahämärässä, koko jäätikkö ulottuu tunturille saakka.',
                en: 'On Lake Inari at dusk, the entire ice sheet stretches to the fells.',
                de: 'Auf dem Inarisee in der Dämmerung, die Eisfläche reicht bis zum Fjäll.',
                ja: '夕暮れのイナリ湖、一面の氷原が山まで広がります。',
                es: 'En el lago Inari al anochecer, la capa de hielo se extiende hasta los fells.',
                'pt-BR': 'No lago Inari ao entardecer, a camada de gelo se estende até os montes.',
                ko: '해 질 녘의 이나리 호수, 광활한 빙판이 산자락까지 펼쳐집니다.',
                fr: 'Sur le lac Inari au crépuscule, la banquise s’étend jusqu’aux fjälls.',
                it: 'Sul lago Inari al tramonto, la distesa di ghiaccio si estende fino ai fjäll.',
                nl: 'Op het Inarimeer in de schemering, het ijsdek strekt zich uit tot aan het fjäll.',
                sv: 'På Enaresjön i skymningen, hela istäcket sträcker sig ut mot fjället.',
              }),
            },
            {
              img: '/images/stock/exp-savusauna-newtonsyms.webp',
              credit: { name: 'Timo Newton-Syms', license: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/wiki/File:Smoke_Sauna_(395139052).jpg' } as ImageCredit,
              title: pick(lang, {
                fi: 'Saunasta lumeen',
                en: 'Sauna to snow',
                de: 'Aus der Sauna in den Schnee',
                ja: 'サウナから雪へ',
                es: 'De la sauna a la nieve',
                'pt-BR': 'Da sauna para a neve',
                ko: '사우나에서 눈밭으로',
                fr: 'Du sauna à la neige',
                it: 'Dalla sauna alla neve',
                nl: 'Van sauna de sneeuw in',
                sv: 'Från bastu till snö',
              }),
              body: pick(lang, {
                fi: 'Hääyön jälkeen saunasta paljain jaloin lumeen. Suomalaisten oma traditio.',
                en: 'Wedding-night sauna, then barefoot into the snow. A uniquely Finnish ritual.',
                de: 'Nach der Hochzeitsnacht aus der Sauna barfuß in den Schnee. Eine urfinnische Tradition.',
                ja: '結婚式の夜のサウナのあと、はだしのまま雪へ。フィンランドならではの伝統です。',
                es: 'Sauna en la noche de bodas y después, descalzos a la nieve. Un ritual genuinamente finlandés.',
                'pt-BR': 'Sauna na noite de núpcias e depois, descalços, direto para a neve. Um ritual genuinamente finlandês.',
                ko: '결혼식 밤의 사우나를 마친 뒤 맨발로 눈밭으로 나서는, 핀란드만의 전통입니다.',
                fr: 'Sauna du soir de noces, puis pieds nus dans la neige. Un rituel typiquement finlandais.',
                it: 'La sauna della notte di nozze e poi a piedi nudi nella neve. Un rito tipicamente finlandese.',
                nl: 'Sauna in de huwelijksnacht en daarna op blote voeten de sneeuw in. Een typisch Fins ritueel.',
                sv: 'Bastu på bröllopsnatten, sedan barfota ut i snön. En helt finsk ritual.',
              }),
            },
            {
              img: '/images/stock/exp-avanto-vesahjr.webp',
              credit: { name: 'Vesahjr', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:K%C3%B6hni%C3%B6nj%C3%A4rvi3.JPG' } as ImageCredit,
              title: pick(lang, {
                fi: 'Avanto + samppanja',
                en: 'Ice bath + champagne',
                de: 'Eisbad mit Champagner',
                ja: '氷の湖 + シャンパン',
                es: 'Baño helado y champán',
                'pt-BR': 'Banho de gelo + espumante',
                ko: '얼음 호수와 샴페인',
                fr: 'Bain glacé et champagne',
                it: 'Bagno nel ghiaccio e champagne',
                nl: 'IJsbad met champagne',
                sv: 'Isbad + champagne',
              }),
              body: pick(lang, {
                fi: 'Hääpuvuissa avantoon, samppanjalasi kädessä. Instagram-hetki.',
                en: 'In wedding attire, champagne in hand, into the ice. Pure Instagram.',
                de: 'Im Hochzeitsoutfit, Champagnerglas in der Hand, ins Eisloch. Instagram pur.',
                ja: 'ウェディング衣装のまま、シャンパン片手にアヴァント（氷の穴）へ。まさにインスタ映え。',
                es: 'En traje de novios, copa de champán en la mano, al agujero abierto en el hielo. Instagram puro.',
                'pt-BR': 'Em trajes de casamento, taça de espumante na mão, direto para o gelo. Puro Instagram.',
                ko: '웨딩 의상을 입은 채 샴페인 잔을 들고 얼음 호수로, 인스타그램에 최적인 순간입니다.',
                fr: 'En tenue de mariage, coupe de champagne à la main, plongée dans l’avanto. L’instant Instagram par excellence.',
                it: 'In abito da sposi, calice di champagne in mano, giù nell’acqua gelata. L’istante perfetto per Instagram.',
                nl: 'In trouwkleding, champagneglas in de hand, het ijsbad in. Pure Instagram.',
                sv: 'I bröllopskläder, champagne i handen, ner i vaken. Ren Instagram.',
              }),
            },
          ].map((exp) => (
            <div key={exp.title} className="on-image group relative aspect-[3/4] overflow-hidden rounded-2xl bg-night-light">
              <ImgCredit credit={exp.credit} lang={lang} />
              <img
                src={exp.img}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               decoding="async" width="800" height="600"/>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.92) 0%, rgba(15,12,10,0.45) 50%, rgba(15,12,10,0.05) 100%)' }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-heading text-xl sm:text-2xl text-white mb-1.5 leading-tight tracking-wide">
                  {exp.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-gray-200 leading-relaxed line-clamp-3">
                  {exp.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Locations */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Paikkakunnat',
          en: 'Regions',
          de: 'Regionen',
          ja: 'エリア',
          es: 'Regiones',
          'pt-BR': 'Regiões',
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
                  src={loc.heroImage}
                  alt={loc.heroAlt[dataLang]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                 decoding="async" width="800" height="600"/>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,12,10,0.85) 0%, rgba(15,12,10,0.35) 50%, rgba(15,12,10,0) 100%)' }} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{loc.region[dataLang]}</p>
                <ImgCredit credit={loc.heroCredit} lang={lang} plain />
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
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-4xl mx-auto bg-night-light/70 border border-rose/30 rounded-3xl p-7 sm:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <p className="uppercase tracking-[0.25em] text-[11px] sm:text-xs text-aurora-pink font-semibold mb-2">{tr.contact.formSub}</p>
              <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-2 leading-tight">{tr.planners.threeQuotesTitle}</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{tr.planners.threeQuotesP}</p>
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
                ko: '예식장 보기',
                fr: 'Voir les lieux',
                it: 'Vedi le location',
                nl: 'Bekijk de locaties',
                sv: 'Se vigselplatserna',
              }),
              stat: '20',
              label: pick(lang, {
                fi: 'hääpaikkaa kartoitettu',
                en: 'venues surveyed',
                de: 'Orte erfasst',
                ja: '会場を調査',
                es: 'lugares registrados',
                'pt-BR': 'locais mapeados',
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
                ko: '상징 예식과 법적 혼인: 안내 보기',
                fr: 'Symbolique ou civil : lire le guide',
                it: 'Simbolico o legale: leggi la guida',
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
                ko: '결혼식 유형과 시즌 보기',
                fr: 'Voir les types de mariage et les saisons',
                it: 'Vedi i tipi di matrimonio e le stagioni',
                nl: 'Bekijk soorten bruiloft en seizoenen',
                sv: 'Se bröllopstyper och säsonger',
              }),
              stat: pick(lang, {
                fi: 'Talvi',
                en: 'Winter',
                de: 'Winter',
                ja: '冬',
                es: 'Invierno',
                'pt-BR': 'Inverno',
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
            <L key={stat.label} to={stat.to} className="group bg-night-light hover:bg-night-light/70 p-7 sm:p-8 lg:p-9 flex flex-col transition-colors">
              <p className="font-heading text-[44px] sm:text-5xl lg:text-[52px] leading-none text-rose tracking-wide min-h-[52px] sm:min-h-[48px] lg:min-h-[52px] flex items-end">
                {stat.stat}
              </p>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-aurora-pink font-semibold mt-3.5 mb-3 leading-snug [text-wrap:balance]">
                {stat.label}
              </p>
              <p className="text-sm text-gray-300 leading-[1.7] max-w-[34ch]">{stat.body}</p>
              <p className="mt-5 text-sm font-semibold underline underline-offset-4 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--color-rose-ink)' }}>{stat.cta} →</p>
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
          ko: '독립적인 조사',
          fr: 'Recensement indépendant',
          it: 'Ricognizione indipendente',
          nl: 'Onafhankelijke inventarisatie',
          sv: 'Oberoende kartläggning',
        })}
        title={pick(lang, {
          fi: 'Lapin suosituimmat hääpaikat',
          en: 'The most popular wedding venues in Lapland',
          de: 'Die beliebtesten Hochzeitsorte Lapplands',
          ja: 'ラップランドで人気の高い結婚式会場',
          es: 'Los lugares de boda más populares de Laponia',
          'pt-BR': 'Os locais de casamento mais populares da Lapônia',
          ko: '라플란드에서 인기 있는 결혼식 장소',
          fr: 'Les lieux de mariage les plus populaires de Laponie',
          it: 'Le location per matrimoni più popolari della Lapponia',
          nl: 'De populairste trouwlocaties van Lapland',
          sv: 'Lapplands populäraste bröllopsplatser',
        })}
        className="bg-night-light/30"
      >
        {/* Says the quiet part out loud, before the grid rather than in a
            footnote: this is a list, not a catalogue, and a couple who already
            has a venue in mind will not be steered somewhere else. */}
        <p className="text-center text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10">
          {pick(lang, {
            fi: 'Nämä ovat Lapin tunnetuimmat paikat, joissa häitä vietetään. Emme edusta niitä emmekä järjestä häitä. Jos jokin paikka on jo mielessänne, kirjoittakaa se lomakkeeseen, niin toive kulkee sellaisenaan eteenpäin.',
            en: 'These are the best-known places in Lapland where weddings are held. We do not represent them and we do not organise weddings. If you already have a venue in mind, write it in the form and your wish is passed on exactly as you gave it.',
            de: 'Das sind die bekanntesten Orte Lapplands, an denen Hochzeiten gefeiert werden. Wir vertreten sie nicht und richten keine Hochzeiten aus. Wenn Sie bereits einen Ort im Sinn haben, tragen Sie ihn ins Formular ein, Ihr Wunsch wird unverändert weitergegeben.',
            ja: 'ラップランドで結婚式が行われている、よく知られた場所を集めました。当サイトはこれらの会場の代理店ではなく、結婚式の運営も行いません。すでに希望の会場がある場合はフォームにご記入ください。ご希望はそのままの形でお伝えします。',
            es: 'Estos son los lugares más conocidos de Laponia donde se celebran bodas. No los representamos y no organizamos bodas. Si ya tiene un lugar en mente, escríbalo en el formulario y su deseo se transmite tal y como usted lo escribió.',
            'pt-BR': 'Estes são os locais mais conhecidos da Lapônia onde se realizam casamentos. Não os representamos nem organizamos casamentos. Se vocês já têm um local em mente, escrevam no formulário e o pedido será repassado exatamente como foi enviado.',
            ko: '라플란드에서 결혼식이 열리는 잘 알려진 장소들입니다. 저희는 이곳들을 대리하지 않으며 결혼식을 직접 주최하지도 않습니다. 이미 마음에 둔 장소가 있다면 양식에 적어 주세요. 그 희망은 그대로 전달됩니다.',
            fr: 'Voici les lieux les plus connus de Laponie où l’on célèbre des mariages. Nous ne les représentons pas et nous n’organisons pas de mariages. Si un lieu vous tient déjà à cœur, indiquez-le dans le formulaire : votre souhait sera transmis tel quel.',
            it: 'Questi sono i luoghi più noti della Lapponia in cui si celebrano matrimoni. Non li rappresentiamo e non organizziamo matrimoni. Se ha già una location in mente, la scriva nel modulo: il Suo desiderio viene trasmesso così com’è.',
            nl: 'Dit zijn de bekendste plekken in Lapland waar bruiloften worden gevierd. Wij vertegenwoordigen ze niet en organiseren geen bruiloften. Heeft u al een locatie op het oog, zet die dan in het formulier: uw wens gaat ongewijzigd door.',
            sv: 'Det här är de mest kända platserna i Lappland där bröllop hålls. Vi företräder dem inte och vi arrangerar inga bröllop. Har ni redan en plats i tankarna, skriv in den i formuläret så förs önskemålet vidare precis som ni angav det.',
          })}
        </p>

        {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
            Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
            renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
        <FeaturedPartnerSlot placement="home_featured" locale={lang} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pickFirst(featuredVenues, venuePick).map((v) => (
            // The rating row is an <a>, so it sits BESIDE the card link, not
            // inside it: nested anchors are invalid HTML.
            <div
              key={v.slug}
              className="group flex flex-col bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden transition-all"
            >
              <L to={`/venues/${v.slug}`} className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={v.imageAlt[dataLang]} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  decoding="async" width="800" height="600"/>
                </div>
                <div className="px-5 pt-5">
                  {venuePick === v && (
                    <EditorsPickChip
                      label={pickLocalized(editorialCopy.pickLabel, lang)}
                      reason={pickLocalized(editorialCopy.pickReason, lang)}
                      note={venuePickNote}
                      className="mb-3"
                    />
                  )}
                  <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{v.region[dataLang]}</p>
                  <h3 className="font-heading text-lg text-white mb-2 tracking-wide group-hover:text-rose transition-colors">{v.name}</h3>
                  {/* Capacity and price-tier chips removed 2026-07-28. Side by
                      side on a card they read as a bookable product with terms
                      we can quote, and we have spoken to none of these venues.
                      Both figures still live on the venue page, where there is
                      room to say where they came from. */}
                  <p className="text-sm text-gray-400 line-clamp-3 mb-1">{v.description[dataLang]}</p>
                </div>
              </L>
              <div className="px-5 pt-3 pb-5 mt-auto">
                <GoogleRatingRow venue={v} />
              </div>
            </div>
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
