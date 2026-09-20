import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';
import Section from './Section';
import ImgCredit, { type ImageCredit } from './ImgCredit';
import { isWinterSeason } from '../data/season';

/**
 * Contextual sibling links into the LaplandVibes network for couples planning a
 * Lapland wedding. These are editorial cross-links (NOT monetised affiliate
 * CTAs), so they use rel="noopener" only — never the affiliate `sponsored
 * nofollow` rel. Canonical sibling URLs come from the shared Footer / SITE-MAP.md.
 * Anchors use descriptive KEYWORD text, not bare brand names.
 *
 * Each href is a DEEP page that delivers the card's promise, NOT the sibling
 * homepage (Vesa 2026-07-08). Verified live 200 + matching title:
 *  → laplandstays.com/property-types/ — where the couple + guests will stay
 *  → laplandvisit.com/itineraries/    — planning the wider Lapland trip
 *  → laplandtransport.com/lapland-guide/ — getting everyone to Lapland (flights, transfers)
 *
 * All 12 locales carry native copy (matches the project's i18n bar).
 */
type Card = { href: string; label: string; body: string };

/** One own photograph per card (Vesa 19.9.: "jättää tosi kylmäksi … kuvat voisivat nostaa tämän arvoa").
    July 2026 road trip, masters in D:\_puhelin_staging\kuvat; receipts in public/images/KUVALAHTEET.json. */
const IMAGES: Array<{ src: string; alt: Record<Lang, string>; winter: { src: string; alt: Record<Lang, string>; credit: ImageCredit } }> = [
  { src: '/images/own/kemijarvi-lake-terrace-summer.webp', winter: {
    src: '/images/winter/cabin-lakeside-winter.webp',
    credit: { name: 'Tadeáš Gregor', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Ailakkaj%C3%A4rvi_wilderness_hut.jpg' },
    alt: {
      en: 'A small wooden cabin half-buried in snow on open fell tundra at sunset',
      fi: 'Pieni puinen mökki puoliksi lumen peitossa avotunturissa auringonlaskun aikaan',
      de: 'Eine kleine Holzhütte halb im Schnee auf offener Fjälltundra bei Sonnenuntergang',
      ja: '夕暮れの開けた山の雪原で、半ば雪に埋もれた小さな木の小屋',
      es: 'Una pequeña cabaña de madera medio enterrada en la nieve en la tundra abierta al atardecer',
      'pt-BR': 'Uma pequena cabana de madeira meio enterrada na neve na tundra aberta ao pôr do sol',
      'zh-CN': '日落时分，空旷雪原上半埋于积雪中的小木屋',
      ko: '해질 녘, 탁 트인 설원에 눈에 반쯤 묻힌 작은 나무 오두막',
      fr: 'Un petit chalet en bois à demi enseveli sous la neige sur la toundra, au coucher du soleil',
      it: 'Una piccola baita di legno mezza sepolta dalla neve nella tundra aperta al tramonto',
      nl: 'Een klein houten hutje half bedolven onder de sneeuw op open toendra bij zonsondergang',
      sv: 'En liten trästuga halvt begravd i snö på öppen fjällhed i solnedgången',
    },
  }, alt: {
    en: 'A lakeside terrace with a jetty among birches on Lake Kemijärvi in summer',
    fi: 'Järviterassi ja laituri koivujen keskellä Kemijärven rannalla kesällä',
    de: 'Eine Seeterrasse mit Steg zwischen Birken am Kemijärvi im Sommer',
    ja: '夏のケミヤルヴィ湖畔、白樺に囲まれた桟橋付きのテラス',
    es: 'Una terraza con embarcadero entre abedules junto al lago Kemijärvi en verano',
    'pt-BR': 'Um terraço com píer entre bétulas à beira do lago Kemijärvi no verão',
    'zh-CN': '夏日凯米耶尔维湖畔白桦间带码头的湖景露台',
    ko: '여름 케미야르비 호숫가, 자작나무 사이 선착장이 있는 테라스',
    fr: 'Une terrasse au bord du lac avec un ponton parmi les bouleaux, lac Kemijärvi en été',
    it: 'Una terrazza con pontile tra le betulle sul lago Kemijärvi d’estate',
    nl: 'Een terras met een steiger tussen berken aan het Kemijärvi-meer in de zomer',
    sv: 'En sjöterrass med brygga bland björkar vid Kemijärvi på sommaren',
  } },
  { src: '/images/own/road-to-the-fells-kittila-pyha.webp', winter: {
    src: '/images/winter/road-to-the-fells-winter.webp',
    credit: { name: 'Simo Räsänen', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Finnish_national_road_21_%26_Saana,_Ala-Kilpisj%C3%A4rvi.JPG' },
    alt: {
      en: 'A plowed winter road curving through snow towards the snow-capped Saana fell',
      fi: 'Auratun talvitien mutka lumessa kohti lumista Saana-tunturia',
      de: 'Eine geräumte Winterstraße führt durch den Schnee auf den verschneiten Saana zu',
      ja: '雪の中を除雪された冬の道が、雪をかぶったサーナ山へと続く',
      es: 'Una carretera invernal despejada que serpentea por la nieve hacia el nevado fell Saana',
      'pt-BR': 'Uma estrada de inverno limpa de neve que serpenteia rumo ao nevado fell Saana',
      'zh-CN': '清扫过的冬季公路在雪中蜿蜒，通向积雪的萨纳山',
      ko: '눈을 치운 겨울 도로가 눈 덮인 사나 산을 향해 굽이친다',
      fr: 'Une route d’hiver déneigée serpente dans la neige vers le fjäll Saana enneigé',
      it: 'Una strada invernale sgombrata che curva nella neve verso il fjäll Saana innevato',
      nl: 'Een sneeuwvrij gemaakte winterweg buigt door de sneeuw naar de besneeuwde Saana-fjäll',
      sv: 'En plogad vinterväg svänger genom snön mot det snöklädda Saanafjället',
    },
  }, alt: {
    en: 'A straight summer road towards the fells between Kittilä and Pyhä',
    fi: 'Suora kesäinen tie kohti tuntureita Kittilän ja Pyhän välillä',
    de: 'Eine gerade Sommerstraße Richtung Fjälls zwischen Kittilä und Pyhä',
    ja: 'キッティラとピュハの間、フェルへまっすぐ続く夏の道',
    es: 'Una carretera recta de verano hacia los fells entre Kittilä y Pyhä',
    'pt-BR': 'Uma estrada reta de verão rumo às montanhas entre Kittilä e Pyhä',
    'zh-CN': '基蒂莱与皮哈之间笔直通向山丘的夏日公路',
    ko: '키틸래와 퓌해 사이, 산으로 곧게 뻗은 여름 도로',
    fr: 'Une route d’été rectiligne vers les fjälls entre Kittilä et Pyhä',
    it: 'Una strada estiva dritta verso i fjäll tra Kittilä e Pyhä',
    nl: 'Een rechte zomerweg richting de fjälls tussen Kittilä en Pyhä',
    sv: 'En rak sommarväg mot fjällen mellan Kittilä och Pyhä',
  } },
  { src: '/images/own/kittila-airport-terminal-summer.webp', winter: {
    src: '/images/winter/airport-terminal-winter.webp',
    credit: { name: 'flightlog', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:EFRO_terminal_20120209_01.jpg' },
    alt: {
      en: 'The terminal and snow-covered apron of Rovaniemi Airport on a winter day',
      fi: 'Rovaniemen lentoaseman terminaali ja luminen asemataso talvipäivänä',
      de: 'Terminal und schneebedecktes Vorfeld des Flughafens Rovaniemi an einem Wintertag',
      ja: '冬の日、ロヴァニエミ空港のターミナルと雪に覆われたエプロン',
      es: 'La terminal y la plataforma nevada del aeropuerto de Rovaniemi en un día de invierno',
      'pt-BR': 'O terminal e o pátio coberto de neve do aeroporto de Rovaniemi num dia de inverno',
      'zh-CN': '冬日的罗瓦涅米机场航站楼与积雪的停机坪',
      ko: '겨울날 로바니에미 공항의 터미널과 눈 덮인 주기장',
      fr: 'L’aérogare et l’aire de trafic enneigée de l’aéroport de Rovaniemi un jour d’hiver',
      it: 'Il terminal e il piazzale innevato dell’aeroporto di Rovaniemi in una giornata d’inverno',
      nl: 'De terminal en het besneeuwde platform van Rovaniemi Airport op een winterse dag',
      sv: 'Terminalen och den snötäckta plattan vid Rovaniemi flygplats en vinterdag',
    },
  }, alt: {
    en: 'The terminal building and car park of Kittilä Airport on a summer day',
    fi: 'Kittilän lentoaseman terminaali ja pysäköintialue kesäpäivänä',
    de: 'Terminal und Parkplatz des Flughafens Kittilä an einem Sommertag',
    ja: '夏の日のキッティラ空港ターミナルと駐車場',
    es: 'La terminal y el aparcamiento del aeropuerto de Kittilä un día de verano',
    'pt-BR': 'O terminal e o estacionamento do aeroporto de Kittilä em um dia de verão',
    'zh-CN': '夏日的基蒂莱机场航站楼与停车场',
    ko: '여름날 키틸래 공항 터미널과 주차장',
    fr: 'L’aérogare et le parking de l’aéroport de Kittilä par une journée d’été',
    it: 'Il terminal e il parcheggio dell’aeroporto di Kittilä in un giorno d’estate',
    nl: 'Het terminalgebouw en de parkeerplaats van de luchthaven Kittilä op een zomerdag',
    sv: 'Terminalbyggnaden och parkeringen vid Kittilä flygplats en sommardag',
  } },
];
type Block = { eyebrow: string; title: string; subtitle: string; cards: Card[] };

const COPY: Record<Lang, Block> = {
  en: {
    eyebrow: 'Planning your Lapland wedding',
    title: 'Get everyone there, and somewhere to stay',
    subtitle: 'A Lapland wedding is also a trip for your guests. These sister guides cover the rest of the journey.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Where to stay for the wedding party', body: 'Cabins, glass igloos and hotels with room blocks for your guests across Lapland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Plan your wider Lapland trip', body: 'What to see and do before and after the ceremony: a full Lapland travel guide.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Getting to Lapland', body: 'Flights, trains and airport transfers to Rovaniemi, Kittilä and Ivalo for the whole party.' },
    ],
  },
  fi: {
    eyebrow: 'Lapin-häidesi suunnittelu',
    title: 'Tuo kaikki paikalle ja järjestä majoitus',
    subtitle: 'Lapin häät ovat myös matka vieraillesi. Nämä sisarsivustot kattavat matkan loput osat.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Hääseurueen majoitus Lapissa', body: 'Mökit, lasi-iglut ja hotellit huonekiintiöineen vieraillesi ympäri Lappia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Suunnittele koko Lapin-matka', body: 'Mitä nähdä ja kokea ennen vihkimistä ja sen jälkeen: kattava Lapin matkaopas.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Näin pääset Lappiin', body: 'Lennot, junat ja lentokenttäkuljetukset Rovaniemelle, Kittilään ja Ivaloon koko seurueelle.' },
    ],
  },
  de: {
    eyebrow: 'Ihre Hochzeit in Lappland planen',
    title: 'Alle hinbringen und unterbringen',
    subtitle: 'Eine Hochzeit in Lappland ist auch eine Reise für Ihre Gäste. Diese Schwesterseiten decken den Rest der Reise ab.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Unterkunft für die Hochzeitsgesellschaft', body: 'Hütten, Glas-Iglus und Hotels mit Zimmerkontingenten für Ihre Gäste in ganz Lappland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Die ganze Lappland-Reise planen', body: 'Was es vor und nach der Trauung zu sehen und zu erleben gibt: ein vollständiger Reiseführer.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Anreise nach Lappland', body: 'Flüge, Züge und Flughafentransfers nach Rovaniemi, Kittilä und Ivalo für die ganze Gesellschaft.' },
    ],
  },
  ja: {
    eyebrow: 'ラップランドの結婚式を計画する',
    title: '全員を呼び、泊まる場所も用意',
    subtitle: 'ラップランドの結婚式は、ゲストにとっても旅です。姉妹ガイドが旅の残りをカバーします。',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: '参列者の宿泊先を探す', body: 'コテージ、グラスイグルー、客室を確保できるホテルまで、ラップランド各地のゲスト向け宿。' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'ラップランド旅行全体を計画', body: '挙式の前後に見て・体験したいこと：ラップランドの総合トラベルガイド。' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'ラップランドへの行き方', body: 'ロヴァニエミ、キッティラ、イヴァロへのフライト・列車・空港送迎を一行全員分。' },
    ],
  },
  es: {
    eyebrow: 'Cómo planear su boda en Laponia',
    title: 'Lleve a todos, y dónde alojarse',
    subtitle: 'Una boda en Laponia también es un viaje para sus invitados. Estas guías hermanas cubren el resto del trayecto.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Dónde se alojará el grupo de la boda', body: 'Cabañas, iglús de cristal y hoteles con bloques de habitaciones para sus invitados por toda Laponia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planee todo su viaje a Laponia', body: 'Qué ver y hacer antes y después de la ceremonia: una guía de viaje completa de Laponia.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Cómo llegar a Laponia', body: 'Vuelos, trenes y traslados al aeropuerto de Rovaniemi, Kittilä e Ivalo para todo el grupo.' },
    ],
  },
  'pt-BR': {
    eyebrow: 'Planejando seu casamento na Lapônia',
    title: 'Leve todos até lá, e onde se hospedar',
    subtitle: 'Um casamento na Lapônia também é uma viagem para seus convidados. Estes guias irmãos cobrem o resto do trajeto.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Onde hospedar o grupo do casamento', body: 'Cabanas, iglus de vidro e hotéis com blocos de quartos para seus convidados por toda a Lapônia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planeje toda a sua viagem à Lapônia', body: 'O que ver e fazer antes e depois da cerimônia: um guia de viagem completo da Lapônia.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Como chegar à Lapônia', body: 'Voos, trens e traslados de aeroporto para Rovaniemi, Kittilä e Ivalo para todo o grupo.' },
    ],
  },
  'zh-CN': {
    eyebrow: '筹备你的拉普兰婚礼',
    title: '让所有人抵达，并安排住宿',
    subtitle: '拉普兰婚礼对宾客来说也是一次旅行。这些姊妹指南涵盖旅程的其余部分。',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: '婚礼宾客的住宿', body: '遍布拉普兰的木屋、玻璃冰屋和可预留房间的酒店，为你的宾客而备。' },
      { href: 'https://laplandvisit.com/itineraries/', label: '规划你的整段拉普兰之旅', body: '仪式前后值得一看一玩的内容，完整的拉普兰旅行指南。' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: '如何前往拉普兰', body: '飞往罗瓦涅米、基蒂莱和伊瓦洛的航班、火车及机场接送，供全体宾客使用。' },
    ],
  },
  ko: {
    eyebrow: '라플란드 결혼식 준비하기',
    title: '모두를 데려오고, 머물 곳도 마련하세요',
    subtitle: '라플란드 결혼식은 하객에게도 여행입니다. 자매 가이드가 여정의 나머지를 안내합니다.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: '하객이 머물 숙소', body: '라플란드 전역의 캐빈, 글래스 이글루, 객실을 단체로 잡을 수 있는 호텔까지.' },
      { href: 'https://laplandvisit.com/itineraries/', label: '라플란드 여행 전체 계획', body: '예식 전후로 보고 즐길 거리: 라플란드 종합 여행 가이드.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: '라플란드 가는 법', body: '로바니에미, 키틸래, 이발로행 항공편·기차·공항 셔틀을 일행 모두를 위해.' },
    ],
  },
  fr: {
    eyebrow: 'Organiser votre mariage en Laponie',
    title: 'Faites venir tout le monde, et où loger',
    subtitle: 'Un mariage en Laponie est aussi un voyage pour vos invités. Ces guides frères couvrent le reste du trajet.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Où loger les invités du mariage', body: 'Chalets, igloos de verre et hôtels avec blocs de chambres pour vos invités dans toute la Laponie.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planifier tout votre séjour en Laponie', body: 'Que voir et faire avant et après la cérémonie: un guide de voyage complet de la Laponie.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Se rendre en Laponie', body: 'Vols, trains et transferts vers les aéroports de Rovaniemi, Kittilä et Ivalo pour tout le groupe.' },
    ],
  },
  it: {
    eyebrow: 'Organizzare il Suo matrimonio in Lapponia',
    title: 'Porti tutti, e dove alloggiare',
    subtitle: 'Un matrimonio in Lapponia è anche un viaggio per i Suoi ospiti. Queste guide sorelle coprono il resto del percorso.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Dove alloggiare gli ospiti del matrimonio', body: 'Baite, igloo di vetro e hotel con blocchi di camere per i Suoi ospiti in tutta la Lapponia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Pianificare l’intero viaggio in Lapponia', body: 'Cosa vedere e fare prima e dopo la cerimonia: una guida di viaggio completa della Lapponia.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Come arrivare in Lapponia', body: 'Voli, treni e transfer aeroportuali per Rovaniemi, Kittilä e Ivalo per tutto il gruppo.' },
    ],
  },
  nl: {
    eyebrow: 'Uw bruiloft in Lapland plannen',
    title: 'Breng iedereen erheen, en een plek om te slapen',
    subtitle: 'Een bruiloft in Lapland is ook een reis voor uw gasten. Deze zustergidsen dekken de rest van de reis.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Waar het bruiloftsgezelschap verblijft', body: 'Hutten, glazen iglo’s en hotels met kamerblokken voor uw gasten in heel Lapland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Plan uw hele reis door Lapland', body: 'Wat te zien en te doen voor en na de ceremonie: een complete reisgids voor Lapland.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Naar Lapland reizen', body: 'Vluchten, treinen en luchthaventransfers naar Rovaniemi, Kittilä en Ivalo voor het hele gezelschap.' },
    ],
  },
  /* sv was a verbatim copy of the English block until 19.9.2026 — found by the reviewer of
     the new alt texts, not by any gate (a Swedish reader saw English here on every visit). */
  sv: {
    eyebrow: 'Planera ert Lapplandsbröllop',
    title: 'Ta dit alla, och någonstans att bo',
    subtitle: 'Ett bröllop i Lappland är också en resa för era gäster. Dessa systerguider täcker resten av resan.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Var bröllopssällskapet bor', body: 'Stugor, glasigloor och hotell med rumsblock för era gäster runt om i Lappland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planera er Lapplandsresa', body: 'Vad ni ska se och göra före och efter vigseln: en komplett reseguide till Lappland.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Så kommer ni till Lappland', body: 'Flyg, tåg och flygplatstransfer till Rovaniemi, Kittilä och Ivalo för hela sällskapet.' },
    ],
  },
};

export default function RelatedSites() {
  const { lang } = useLang();
  /* Talvikuva 1.10.–30.4. (Vesa 20.9.2026). Omat heinäkuun kuvat eivät kelpaa talveen. */
  const pic = (i: number): { src: string; alt: Record<Lang, string>; credit?: ImageCredit } =>
    isWinterSeason() ? IMAGES[i].winter : IMAGES[i];
  const t = COPY[lang] ?? COPY.en;

  return (
    <Section eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} className="bg-night-light/30">
      <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {t.cards.map((card, i) => (
          <a
            key={card.href}
            href={card.href}
            target="_blank"
            rel="noopener"
            className="on-card group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl overflow-hidden flex flex-col transition-all"
          >
            {IMAGES[i] && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={pic(i).src}
                  srcSet={`${pic(i).src.replace('.webp', '-600.webp')} 600w, ${pic(i).src} 1200w`}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  alt={pic(i).alt[lang] ?? pic(i).alt.en}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="750"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <ImgCredit credit={pic(i).credit} lang={lang} plain />
              </div>
            )}
            <div className="p-6 flex flex-col flex-1">
            <h3 className="font-heading text-xl text-charcoal tracking-wide leading-snug mb-2 flex items-start gap-1.5 group-hover:text-rose-deep transition-colors">
              {card.label}
              <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-rose-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </h3>
            <p className="text-sm text-stone leading-relaxed">{card.body}</p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
