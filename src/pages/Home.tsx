
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
import HomeAdSlots, { MainPartnerBanner } from '../../../shared/HomeAdSlots';
import { AD_SLOTS } from '../data/adSlots';
import FeaturedPartnerSlot from '../components/FeaturedPartnerSlot';
import GoogleRatingRow from '../components/GoogleRatingRow';
import EditorsPickChip from '../components/EditorsPickChip';
import { bestGoogleRated, editorialPickNote } from '../data/googleReviews';
import { editorialCopy } from '../data/editorialCopy';
import { pickLocalized } from '../data/localized';

// Per-locale string picker — every visible string lists fi/en/de/ja/ko/fr/it/nl.
// es / pt-BR / zh-CN fall back to en until we add native copy.
type Bag = { fi: string; en: string; de: string; ja: string; ko: string; fr: string; it: string; nl: string; sv: string };
const pick = (lang: Lang, b: Bag): string => {
  switch (lang) {
    case 'fi': return b.fi;
    case 'de': return b.de;
    case 'ja': return b.ja;
    case 'ko': return b.ko;
    case 'fr': return b.fr;
    case 'it': return b.it;
    case 'nl': return b.nl;
    case 'sv': return b.sv;
    default:   return b.en;
  }
};

// Automatic seasonal hero — summer image 1 May–30 Sep, winter 1 Oct–30 Apr (runtime, every year).
const isSummerSeason = (): boolean => { const m = new Date().getMonth() + 1; return m >= 5 && m <= 9; };

export default function Home() {
  const { lang, dataLang, tr } = useLang();

  // HOME meta <title> — leads with the "Lapland Weddings" keyword + concrete
  // value (venues + marriage paperwork). All 11 locales native (no EN bleed).
  const SEO_TITLE: Record<Lang, string> = {
    en: 'Lapland Weddings 2026: Arctic Venues & Marriage Paperwork',
    fi: 'Häät Lapissa 2026: hääpaikat ja DVV-paperit',
    de: 'Hochzeit in Lappland 2026: Locations & Heiratspapiere',
    ja: 'ラップランドの結婚式2026：会場と婚姻手続き',
    es: 'Bodas en Laponia 2026: lugares y trámites de boda',
    'pt-BR': 'Casamentos na Lapônia 2026: locais e documentação',
    'zh-CN': '拉普兰婚礼2026：婚礼场地与结婚手续',
    ko: '라플란드 결혼식 2026: 베뉴와 혼인 서류',
    fr: 'Mariage en Laponie 2026: lieux et démarches de mariage',
    it: 'Matrimonio in Lapponia 2026: sedi e pratiche di nozze',
    nl: 'Trouwen in Lapland 2026: locaties en huwelijkspapieren',
    sv: 'Bröllop i Lappland 2026: vigselplatser och äktenskapspapper',
  };
  const seoTitle = SEO_TITLE[lang];
  const seoDesc = pick(lang, {
    fi: 'Lapin kattavin häämatkasivu. Yli 20 hääpaikkaa, 7 hääsuunnittelijaa, DVV-paperit, hinta-arviot. Pyydä 3 räätälöityä tarjousta yhdellä lomakkeella.',
    en: 'The most complete Lapland wedding planning site. 20+ venues, 7 planners, DVV paperwork, real prices. Get 3 personalised quotes with one form.',
    de: 'Die umfassendste Seite für Hochzeiten in Lappland. Über 20 Hochzeitslocations, 7 Hochzeitsplaner, DVV-Unterlagen, echte Preise. 3 maßgeschneiderte Angebote mit einem Formular.',
    ja: 'ラップランドのウェディングを総合的に企画できるサイト。20以上の会場、7名のプランナー、DVV書類手続き、実勢価格を網羅。1つのフォームで3件のオーダーメイド見積もりを取得できます。',
    ko: '라플란드 결혼식을 한 번에 계획할 수 있는 가장 완성도 높은 사이트입니다. 20곳 이상의 결혼식 장소, 7명의 웨딩 플래너, DVV 서류 안내, 실제 견적까지 모두 확인하세요. 하나의 양식으로 3건의 맞춤 견적을 받아보실 수 있습니다.',
    fr: 'Le site le plus complet pour organiser votre mariage en Laponie. Plus de 20 lieux, 7 wedding planners, démarches DVV et prix réels. Recevez 3 devis personnalisés avec un seul formulaire.',
    it: 'Il sito più completo per organizzare il Suo matrimonio in Lapponia. Oltre 20 sedi, 7 wedding planner, pratiche DVV e prezzi reali. Riceva 3 preventivi personalizzati con un unico modulo.',
    nl: 'De meest complete site om uw bruiloft in Lapland te plannen. Meer dan 20 locaties, 7 wedding planners, DVV-papierwerk en echte prijzen. Ontvang met één formulier 3 persoonlijke offertes.',
    sv: 'Lapplands mest kompletta sajt för bröllopsplanering. Över 20 platser, 7 planerare, DVV-papper, verkliga priser. Få 3 personliga offerter med ett enda formulär.',
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
        image={summer ? '/images/heroes/reindeer-sleigh-hero.jpg' : '/images/heroes/reindeer-sleigh-hero-winter.webp'}
        objectPosition="64% 50%"
        avifSrcSet={summer ? '/images/heroes/reindeer-sleigh-hero-800.avif 800w, /images/heroes/reindeer-sleigh-hero-1200.avif 1200w' : '/images/heroes/reindeer-sleigh-hero-winter-800.avif 800w, /images/heroes/reindeer-sleigh-hero-winter-1200.avif 1200w'}
        webpSrcSet={summer ? '/images/heroes/reindeer-sleigh-hero-800.webp 800w, /images/heroes/reindeer-sleigh-hero-1200.webp 1200w' : '/images/heroes/reindeer-sleigh-hero-winter-800.webp 800w, /images/heroes/reindeer-sleigh-hero-winter-1200.webp 1200w'}
        sizes="100vw"
        imageAlt={pick(lang, {
          fi: 'Kesähäiden koristekaari ja kattaus tyynen lappilaisen järven rannalla yöttömän auringon kultaisella hetkellä',
          en: 'Summer wedding setting by a calm Lapland lake at golden midnight-sun hour',
          de: 'Sommerliche Hochzeitskulisse an einem ruhigen lappländischen See zur goldenen Stunde der Mitternachtssonne',
          ja: '白夜の黄金の時間、穏やかなラップランドの湖畔に整えられた夏のウェディング会場',
          ko: '백야의 황금빛 시간, 고요한 라플란드 호숫가에 차려진 여름 결혼식 풍경',
          fr: 'Décor de mariage estival au bord d’un lac paisible de Laponie à l’heure dorée du soleil de minuit',
          it: 'Allestimento di matrimonio estivo in riva a un tranquillo lago della Lapponia nell’ora dorata del sole di mezzanotte',
          nl: 'Zomerse trouwlocatie aan een rustig meer in Lapland tijdens het gouden uur van de middernachtzon',
          sv: 'Sommarbröllopsdukning vid en stilla lappländsk sjö i midnattssolens gyllene timme',
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

      {/* ── PÄÄKUMPPANI-banneri heti heron alle (myyty = banneri, vapaa = house-ad) ── */}
      <MainPartnerBanner config={AD_SLOTS} locale={lang} />

      {/* Why Lapland */}
      <Section title={tr.home.whyTitle}>
        <div className="grid sm:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden max-w-5xl mx-auto">
          {[
            {
              stat: '300+',
              label: pick(lang, {
                fi: 'häät vuodessa',
                en: 'weddings a year',
                de: 'Hochzeiten pro Jahr',
                ja: '年間挙式数',
                ko: '연간 결혼식 건수',
                fr: 'mariages par an',
                it: 'matrimoni all’anno',
                nl: 'bruiloften per jaar',
                sv: 'bröllop per år',
              }),
              body: pick(lang, {
                fi: 'Lappi on vakiintunut Pohjois-Euroopan suosituin destination wedding -kohde. Sesonki jouluk.–maalisk.',
                en: 'Lapland is the most popular destination wedding region in Northern Europe. Season runs December–March.',
                de: 'Lappland ist die beliebteste Destination-Wedding-Region Nordeuropas. Hauptsaison Dezember–März.',
                ja: 'ラップランドは北ヨーロッパで最も人気の高いデスティネーション・ウェディング地域。シーズンは12月から3月までです。',
                ko: '라플란드는 북유럽에서 가장 인기 있는 데스티네이션 웨딩 지역으로 자리매김했습니다. 성수기는 12월부터 3월까지입니다.',
                fr: 'La Laponie s’est imposée comme la première destination de mariage du Nord de l’Europe. La saison s’étend de décembre à mars.',
                it: 'La Lapponia è la destinazione per matrimoni più richiesta del Nord Europa. La stagione va da dicembre a marzo.',
                nl: 'Lapland is uitgegroeid tot de populairste bestemmingsbruiloftregio van Noord-Europa. Het seizoen loopt van december tot maart.',
                sv: 'Lappland är den populäraste regionen för destinationsbröllop i Nordeuropa. Säsongen pågår december–mars.',
              }),
            },
            {
              stat: pick(lang, {
                fi: '€1 600 →',
                en: 'from €1 600',
                de: 'ab 1 600 €',
                ja: '€1,600〜',
                ko: '€1,600부터',
                fr: 'à partir de 1 600 €',
                it: 'da 1 600 €',
                nl: 'vanaf € 1.600',
                sv: 'från 1 600 €',
              }),
              label: pick(lang, {
                fi: 'pienin paketti',
                en: 'smallest package',
                de: 'kleinstes Paket',
                ja: '最小パッケージ',
                ko: '최소 패키지',
                fr: 'plus petite formule',
                it: 'pacchetto base',
                nl: 'kleinste pakket',
                sv: 'minsta paketet',
              }),
              body: pick(lang, {
                fi: 'Kahdestaan vihille 1 600 €:sta, premium-juhlat 50 000 €:on. Luksus jopa 100 000 €.',
                en: 'Elope from €1 600, premium celebrations to €50 000, luxury up to €100 000+.',
                de: 'Heiraten zu zweit ab 1 600 €, Premiumfeiern bis 50 000 €, Luxus bis 100 000 € und mehr.',
                ja: 'お二人だけの挙式は€1,600から、プレミアム挙式は€50,000まで、ラグジュアリー挙式は€100,000以上まで対応します。',
                ko: '두 분만의 엘로프먼트 예식은 €1,600부터, 프리미엄 예식은 €50,000까지, 럭셔리 예식은 €100,000 이상까지 준비해 드립니다.',
                fr: 'Mariage en tête-à-tête à partir de 1 600 €, célébrations premium jusqu’à 50 000 €, prestations de luxe au-delà de 100 000 €.',
                it: 'Matrimonio in due da 1 600 €, celebrazioni premium fino a 50 000 €, allestimenti di lusso oltre i 100 000 €.',
                nl: 'Elopen vanaf € 1.600, premium feesten tot € 50.000 en luxe vieringen tot € 100.000 en meer.',
                sv: 'Rymningsbröllop från 1 600 €, premiumfester upp till 50 000 €, lyx upp till 100 000 €+.',
              }),
            },
            {
              stat: pick(lang, {
                fi: '3–5 viikkoa',
                en: '3–5 weeks',
                de: '3–5 Wochen',
                ja: '3〜5週間',
                ko: '3~5주',
                fr: '3 à 5 semaines',
                it: '3–5 settimane',
                nl: '3–5 weken',
                sv: '3–5 veckor',
              }),
              label: pick(lang, {
                fi: 'paperityö valmista',
                en: 'paperwork done',
                de: 'Formalitäten erledigt',
                ja: '書類手続き完了',
                ko: '서류 절차 완료',
                fr: 'formalités réglées',
                it: 'pratiche completate',
                nl: 'papierwerk geregeld',
                sv: 'pappren klara',
              }),
              body: pick(lang, {
                fi: 'DVV hoitaa avioliittoluvan ulkomaalaisille pareille 3–5 viikossa. Maksuton.',
                en: 'The DVV processes the marriage licence for foreign couples in 3–5 weeks. Free of charge.',
                de: 'Das DVV erteilt die Heiratserlaubnis für ausländische Paare in 3–5 Wochen. Kostenlos.',
                ja: 'フィンランド・デジタル人口データサービス局(DVV)が外国人カップルの婚姻許可を3〜5週間で発行します。手数料は無料です。',
                ko: '핀란드 디지털·인구정보국(DVV)이 외국인 커플의 혼인 허가를 3~5주 안에 처리해 드리며, 비용은 무료입니다.',
                fr: 'Le DVV finlandais délivre l’autorisation de mariage pour les couples étrangers en 3 à 5 semaines, gratuitement.',
                it: 'Il DVV finlandese rilascia il nulla osta al matrimonio per le coppie straniere in 3–5 settimane, gratuitamente.',
                nl: 'De Finse DVV verwerkt de huwelijksvergunning voor buitenlandse paren in 3 tot 5 weken, kosteloos.',
                sv: 'DVV behandlar hindersprövningen för utländska par på 3–5 veckor. Kostnadsfritt.',
              }),
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-night-light p-7 sm:p-9 flex flex-col">
              <p className="font-heading text-4xl sm:text-5xl text-rose tracking-wide mb-1">{stat.stat}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-aurora-pink font-semibold mb-4">{stat.label}</p>
              <p className="text-sm text-gray-300 leading-relaxed">{stat.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-10 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">{tr.home.whyP}</p>
      </Section>

      {/* ── LV Media: kakkospääkumppani + 6 premium-paikkaa (tyhjät = house-adit) ── */}
      <HomeAdSlots config={AD_SLOTS} locale={lang} />

      {/* Wedding Types */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Häätyypit',
          en: 'Wedding types',
          de: 'Hochzeitsarten',
          ja: '結婚式のタイプ',
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
                <div className="flex items-center justify-between text-[10px] sm:text-xs gap-2">
                  <span className="text-gold font-semibold whitespace-nowrap">{wt.priceRange}</span>
                  <span className="hidden sm:inline text-gray-300">{wt.capacity}</span>
                </div>
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
              img: '/images/experiences/husky-couple.jpg',
              title: pick(lang, {
                fi: 'Husky-saapuminen',
                en: 'Husky arrival',
                de: 'Ankunft mit Huskys',
                ja: 'ハスキー犬で登場',
                ko: '허스키 썰매로 입장',
                fr: 'Arrivée en traîneau à huskies',
                it: 'Arrivo con gli husky',
                nl: 'Aankomst per huskyslee',
                sv: 'Ankomst med husky',
              }),
              body: pick(lang, {
                fi: 'Pari saapuu vihkimykseen 8 huskyn vetämällä rekellä. Viraali hetki joka kerta.',
                en: 'The couple arrives at the ceremony pulled by 8 huskies. A viral moment every time.',
                de: 'Das Paar kommt zur Trauung mit einem Schlitten, gezogen von 8 Huskys. Jedes Mal ein viraler Moment.',
                ja: '新郎新婦が8頭のハスキーが引くそりで挙式会場に到着。必ずバズる名場面です。',
                ko: '신랑 신부가 허스키 8마리가 끄는 썰매를 타고 예식장에 등장합니다. 매번 화제가 되는 순간입니다.',
                fr: 'Les mariés arrivent à la cérémonie en traîneau tiré par 8 huskies. Un moment qui devient viral à chaque fois.',
                it: 'Gli sposi arrivano alla cerimonia su una slitta trainata da 8 husky. Un momento virale ogni volta.',
                nl: 'Het bruidspaar arriveert bij de ceremonie achter 8 husky’s. Telkens een viraal moment.',
                sv: 'Paret anländer till ceremonin draget av 8 huskyer. En viral stund varje gång.',
              }),
            },
            {
              img: '/images/experiences/inari-husky-sleigh.jpg',
              title: pick(lang, {
                fi: 'Jäätyneet järvet',
                en: 'Frozen lakes',
                de: 'Gefrorene Seen',
                ja: '凍った湖',
                ko: '얼어붙은 호수',
                fr: 'Lacs gelés',
                it: 'Laghi ghiacciati',
                nl: 'Bevroren meren',
                sv: 'Frusna sjöar',
              }),
              body: pick(lang, {
                fi: 'Inarinjärvellä iltahämärässä, koko jäätikkö ulottuu tunturille saakka.',
                en: 'On Lake Inari at dusk, the entire ice sheet stretches to the fjeld.',
                de: 'Auf dem Inarisee in der Dämmerung, die Eisfläche reicht bis zum Fjäll.',
                ja: '夕暮れのイナリ湖、一面の氷原が山まで広がります。',
                ko: '해 질 녘의 이나리 호수, 광활한 빙판이 산자락까지 펼쳐집니다.',
                fr: 'Sur le lac Inari au crépuscule, la banquise s’étend jusqu’aux fjälls.',
                it: 'Sul lago Inari al tramonto, la distesa di ghiaccio si estende fino ai fjäll.',
                nl: 'Op het Inarimeer in de schemering, het ijsdek strekt zich uit tot aan het fjäll.',
                sv: 'På Enaresjön i skymningen, hela istäcket sträcker sig ut mot fjället.',
              }),
            },
            {
              img: '/images/experiences/sauna-snow-run.jpg',
              title: pick(lang, {
                fi: 'Saunasta lumeen',
                en: 'Sauna to snow',
                de: 'Aus der Sauna in den Schnee',
                ja: 'サウナから雪へ',
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
                ko: '결혼식 밤의 사우나를 마친 뒤 맨발로 눈밭으로 나서는, 핀란드만의 전통입니다.',
                fr: 'Sauna du soir de noces, puis pieds nus dans la neige. Un rituel typiquement finlandais.',
                it: 'La sauna della notte di nozze e poi a piedi nudi nella neve. Un rito tipicamente finlandese.',
                nl: 'Sauna in de huwelijksnacht en daarna op blote voeten de sneeuw in. Een typisch Fins ritueel.',
                sv: 'Bastu på bröllopsnatten, sedan barfota ut i snön. En helt finsk ritual.',
              }),
            },
            {
              img: '/images/experiences/icebath-couple.jpg',
              title: pick(lang, {
                fi: 'Avanto + samppanja',
                en: 'Ice bath + champagne',
                de: 'Eisbad mit Champagner',
                ja: '氷の湖 + シャンパン',
                ko: '얼음 호수와 샴페인',
                fr: 'Bain glacé et champagne',
                it: 'Bagno nel ghiaccio e champagne',
                nl: 'IJsbad met champagne',
                sv: 'Isbad + champagne',
              }),
              body: pick(lang, {
                fi: 'Hääpuvuissa avantoon, samppanjalasi kädessä. Instagram-hetki.',
                en: 'In wedding attire, champagne in hand, into the ice. Pure Instagram.',
                de: 'Im Hochzeitsoutfit, Champagnerglas in der Hand, ins Eisloch. Pure Instagram.',
                ja: 'ウェディング衣装のまま、シャンパン片手にアヴァント(氷の穴)へ。まさにインスタ映え。',
                ko: '웨딩 의상을 입은 채 샴페인 잔을 들고 얼음 호수로, 인스타그램에 최적인 순간입니다.',
                fr: 'En tenue de mariage, coupe de champagne à la main, plongée dans l’avanto. L’instant Instagram par excellence.',
                it: 'In abito da sposi, calice di champagne in mano, dentro l’avanto. L’istante perfetto per Instagram.',
                nl: 'In trouwkleding, champagneglas in de hand, het ijsbad in. Pure Instagram.',
                sv: 'I bröllopskläder, champagne i handen, ner i vaken. Ren Instagram.',
              }),
            },
          ].map((exp) => (
            <div key={exp.title} className="on-image group relative aspect-[3/4] overflow-hidden rounded-2xl bg-night-light">
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
                <h3 className="font-heading text-2xl text-white tracking-wide">{loc.name[dataLang]}</h3>
              </div>
            </L>
          ))}
        </div>
      </Section>

      {/* Featured venues */}
      <Section
        eyebrow={pick(lang, {
          fi: 'Vahvistettuja hääpaikkoja',
          en: 'Verified venues',
          de: 'Verifizierte Hochzeitslocations',
          ja: '認証済み会場',
          ko: '검증된 결혼식 장소',
          fr: 'Lieux de mariage vérifiés',
          it: 'Sedi di matrimonio verificate',
          nl: 'Geverifieerde locaties',
          sv: 'Verifierade platser',
        })}
        title={pick(lang, {
          fi: 'Lapin kuuluisimmat hääpaikat',
          en: 'Lapland’s most famous wedding venues',
          de: 'Die bekanntesten Hochzeitslocations Lapplands',
          ja: 'ラップランドで最も有名な結婚式会場',
          ko: '라플란드에서 가장 유명한 결혼식 장소',
          fr: 'Les lieux de mariage les plus prisés de Laponie',
          it: 'Le sedi di matrimonio più celebri della Lapponia',
          nl: 'De bekendste bruiloftslocaties van Lapland',
          sv: 'Lapplands mest kända bröllopsplatser',
        })}
        className="bg-night-light/30"
      >
        {/* Myytävä Esittelykumppani-paikka (KKV: merkitty mainokseksi).
            Tyhjänä = kanoninen vaalea house-ad. Ei-mainoslokaaleilla ei
            renderöidy mitään, ja venue-kortisto alla säilyy ennallaan. */}
        <FeaturedPartnerSlot placement="home_featured" locale={lang} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredVenues.map((v) => (
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
                  <p className="text-sm text-gray-400 line-clamp-3">{v.description[dataLang]}</p>
                  <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                    <span>
                      {v.capacity.min}–{v.capacity.max}{' '}
                      {pick(lang, {
                        fi: 'vierasta',
                        en: 'guests',
                        de: 'Gäste',
                        ja: '名',
                        ko: '명',
                        fr: 'invités',
                        it: 'ospiti',
                        nl: 'gasten',
                        sv: 'gäster',
                      })}
                    </span>
                    <span className="text-gold">{v.priceTier}</span>
                  </div>
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

      {/* Complete your trip — contextual sibling links (editorial, not affiliate) */}
      <RelatedSites />

      {/* Newsletter */}
      <Section className="bg-night-light/20">
        <NewsletterSignup />
      </Section>
    </>
  );
}
