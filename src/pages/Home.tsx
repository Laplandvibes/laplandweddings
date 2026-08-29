
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
  // value (venues + marriage paperwork). All 12 locales native (no EN bleed).
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
  // Description states only what the site actually contains. The old version
  // promised "7 planners"; the data holds 6 wedding *photographers* and no
  // planner directory at all, so both the number and the profession were wrong
  // (same class of error as the "11 languages" claim, Vesa 2026-07-27).
  const seoDesc = pick(lang, {
    fi: 'Riippumaton opas häihin Lapissa: 21 hääpaikkaa, 8 paikkakuntaa, symbolinen ja juridinen seremonia, todelliset kustannukset. Emme edusta yhtäkään paikkaa.',
    en: 'An independent guide to getting married in Lapland: 21 venues, 8 regions, symbolic and legal ceremonies, real costs. We represent none of the venues.',
    de: 'Ein unabhängiger Leitfaden zum Heiraten in Lappland: 21 Locations, 8 Regionen, symbolische und rechtsgültige Trauung, echte Kosten. Wir vertreten keine der Locations.',
    ja: 'ラップランドでの結婚式を中立の立場でまとめたガイド。会場21か所、エリア8か所、シンボリック挙式と法的婚姻、実際にかかる費用。当サイトはいずれの会場の代理店でもありません。',
    ko: '라플란드 결혼식을 위한 독립적인 안내서입니다. 결혼식 장소 21곳, 지역 8곳, 상징 예식과 법적 혼인, 실제 비용을 정리했습니다. 저희는 어떤 장소도 대리하지 않습니다.',
    fr: 'Un guide indépendant pour se marier en Laponie : 21 lieux, 8 régions, cérémonie symbolique ou mariage civil, coûts réels. Nous ne représentons aucun de ces lieux.',
    it: 'Una guida indipendente per sposarsi in Lapponia: 21 location, 8 regioni, cerimonia simbolica e matrimonio civile, costi reali. Non rappresentiamo nessuna delle location.',
    nl: 'Een onafhankelijke gids voor trouwen in Lapland: 21 locaties, 8 regio’s, symbolische en wettelijke ceremonie, echte kosten. Wij vertegenwoordigen geen enkele locatie.',
    sv: 'En oberoende guide till att gifta sig i Lappland: 21 platser, 8 regioner, symbolisk och juridisk vigsel, verkliga kostnader. Vi företräder ingen av platserna.',
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
      {/* App launch block, directly under the site's own opening. At the foot
          of the page it measured 81 % down a 33 000 px front page, and an
          announcement nobody scrolls to is not an announcement. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppPromoHero />
      </div>

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
              stat: '21',
              label: pick(lang, {
                fi: 'hääpaikkaa kartoitettu',
                en: 'venues surveyed',
                de: 'Orte erfasst',
                ja: '会場を調査',
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
                ko: '어느 곳도 대리하거나 판매하지 않습니다. 순서는 살 수 없습니다.',
                fr: 'Nous n’en représentons aucun et n’en vendons aucun. L’ordre ne s’achète pas.',
                it: 'Non ne rappresentiamo e non ne vendiamo nessuna. L’ordine non si compra.',
                nl: 'We vertegenwoordigen er geen en verkopen er geen. De volgorde is niet te koop.',
                sv: 'Vi företräder ingen och säljer ingen. Ordningen går inte att köpa.',
              }),
            },
            {
              stat: '0',
              label: pick(lang, {
                fi: 'lupaa tai papereita',
                en: 'permits or paperwork',
                de: 'Genehmigungen nötig',
                ja: '許可も書類も不要',
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
              stat: pick(lang, {
                fi: 'Talvi',
                en: 'Winter',
                de: 'Winter',
                ja: '冬',
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
                ko: '성수기 12~3월',
                fr: 'saison déc.–mars',
                it: 'stagione dic.–mar.',
                nl: 'seizoen dec.–mrt.',
                sv: 'säsong dec.–mars',
              }),
              body: pick(lang, {
                fi: 'Lumi ja revontulet ovat silloin varmimmillaan. Kesällä aurinko ei laske lainkaan.',
                en: 'Snow and the aurora are at their most reliable then. Around midsummer the sun does not set at all.',
                de: 'Schnee und Polarlichter sind dann am verlässlichsten. Im Sommer geht die Sonne nie unter.',
                ja: '雪とオーロラがもっとも確実な時期です。夏は太陽が沈みません。',
                ko: '눈과 오로라가 가장 확실한 시기입니다. 여름에는 해가 지지 않습니다.',
                fr: 'La neige et les aurores sont alors les plus fiables. En été, le soleil ne se couche pas.',
                it: 'Neve e aurora sono allora più affidabili. D’estate il sole non tramonta mai.',
                nl: 'Sneeuw en noorderlicht zijn dan het betrouwbaarst. In de zomer gaat de zon nooit onder.',
                sv: 'Snö och norrsken är då som säkrast. På sommaren går solen aldrig ner.',
              }),
            },
          ].map((stat) => (
            /* The display token sits in a fixed-height box so the labels and
               body copy start on the same line in all three cards regardless of
               how tall the token renders in a given language. */
            <div key={stat.label} className="bg-night-light p-7 sm:p-8 lg:p-9 flex flex-col">
              <p className="font-heading text-[44px] sm:text-5xl lg:text-[52px] leading-none text-rose tracking-wide min-h-[52px] sm:min-h-[48px] lg:min-h-[52px] flex items-end">
                {stat.stat}
              </p>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-aurora-pink font-semibold mt-3.5 mb-3 leading-snug [text-wrap:balance]">
                {stat.label}
              </p>
              <p className="text-sm text-gray-300 leading-[1.7] max-w-[34ch]">{stat.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-10 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">{tr.home.whyP}</p>
      </Section>

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
                {/* Price range removed 2026-07-29 (Vesa). The figures were
                    invented, spanned 16x (€2 500–€40 000), and mixed units: the
                    glass-igloo card quoted a price per night beside cards
                    quoting the cost of a whole wedding. Money now lives only on
                    the pricing page, where a number can be explained. */}
                <div className="text-[10px] sm:text-xs text-gray-300">
                  {wt.capacity}
                </div>
              </div>
            </L>
          ))}
        </div>
      </Section>

      {/* ── PÄÄKUMPPANI-banneri. Oli aiemmin heti heron alla, jolloin ensimmäinen
           asia sivulla oli mainospaikan myynti-ilmoitus (Vesa 2026-07-28:
           "tämä alku on aivan paska"). Nyt kahden sisältölohkon takana, yhä
           sivun yläkolmanneksessa. ── */}
      <MainPartnerBanner config={AD_SLOTS} locale={lang} />

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
                en: 'The couple arrives at the ceremony pulled by 8 huskies. The arrival shot everyone photographs.',
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
                en: 'On Lake Inari at dusk, the entire ice sheet stretches to the fells.',
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

      {/* ── LV Media: kakkospääkumppani + 6 premium-paikkaa (tyhjät = house-adit).
           Oli ennen Häätyyppien yläpuolella, eli lukija sai yhden sisältölohkon
           ja sitten kuusi mainospaikkaa. Nyt kolmen lohkon takana. ── */}
      <HomeAdSlots config={AD_SLOTS} locale={lang} />

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
            ko: '라플란드에서 결혼식이 열리는 잘 알려진 장소들입니다. 저희는 이곳들을 대리하지 않으며 결혼식을 직접 주최하지도 않습니다. 이미 마음에 둔 장소가 있다면 양식에 적어 주세요. 그 희망은 그대로 전달됩니다.',
            fr: 'Voici les lieux les plus connus de Laponie où l’on célèbre des mariages. Nous ne les représentons pas et nous n’organisons pas de mariages. Si un lieu vous tient déjà à cœur, indiquez-le dans le formulaire : votre souhait sera transmis tel quel.',
            it: 'Questi sono i luoghi più noti della Lapponia in cui si celebrano matrimoni. Non li rappresentiamo e non organizziamo matrimoni. Se avete già una location in mente, scrivetela nel modulo: il vostro desiderio viene trasmesso così com’è.',
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

      {/* Complete your trip — contextual sibling links (editorial, not affiliate) */}
      <RelatedSites />

      {/* Newsletter */}
      <Section className="bg-night-light/20">
        <NewsletterSignup />
      </Section>
    </>
  );
}
