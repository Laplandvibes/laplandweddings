import { ArrowUpRight } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';
import Section from './Section';

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
 * All 11 locales carry native copy (matches the project's i18n bar).
 */
type Card = { href: string; label: string; body: string };
type Block = { eyebrow: string; title: string; subtitle: string; cards: Card[] };

const COPY: Record<Lang, Block> = {
  en: {
    eyebrow: 'Planning your Lapland wedding',
    title: 'Get everyone there — and somewhere to stay',
    subtitle: 'A Lapland wedding is also a trip for your guests. These sister guides cover the rest of the journey.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Where to stay for the wedding party', body: 'Cabins, glass igloos and hotels with room blocks for your guests across Lapland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Plan your wider Lapland trip', body: 'What to see and do before and after the ceremony — a full Lapland travel guide.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Getting to Lapland', body: 'Flights, trains and airport transfers to Rovaniemi, Kittilä and Ivalo for the whole party.' },
    ],
  },
  fi: {
    eyebrow: 'Lapin-häidesi suunnittelu',
    title: 'Tuo kaikki paikalle — ja järjestä majoitus',
    subtitle: 'Lapin häät ovat myös matka vieraillesi. Nämä sisarsivustot kattavat matkan loput osat.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Hääseurueen majoitus Lapissa', body: 'Mökit, lasi-iglut ja hotellit huonekiintiöineen vieraillesi ympäri Lappia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Suunnittele koko Lapin-matka', body: 'Mitä nähdä ja kokea ennen vihkimistä ja sen jälkeen — kattava Lapin matkaopas.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Näin pääset Lappiin', body: 'Lennot, junat ja lentokenttäkuljetukset Rovaniemelle, Kittilään ja Ivaloon koko seurueelle.' },
    ],
  },
  de: {
    eyebrow: 'Ihre Hochzeit in Lappland planen',
    title: 'Alle hinbringen — und unterbringen',
    subtitle: 'Eine Hochzeit in Lappland ist auch eine Reise für Ihre Gäste. Diese Schwesterseiten decken den Rest der Reise ab.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Unterkunft für die Hochzeitsgesellschaft', body: 'Hütten, Glas-Iglus und Hotels mit Zimmerkontingenten für Ihre Gäste in ganz Lappland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Die ganze Lappland-Reise planen', body: 'Was es vor und nach der Trauung zu sehen und zu erleben gibt — ein vollständiger Reiseführer.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Anreise nach Lappland', body: 'Flüge, Züge und Flughafentransfers nach Rovaniemi, Kittilä und Ivalo für die ganze Gesellschaft.' },
    ],
  },
  ja: {
    eyebrow: 'ラップランドの結婚式を計画する',
    title: '全員を呼び、泊まる場所も用意',
    subtitle: 'ラップランドの結婚式は、ゲストにとっても旅です。姉妹ガイドが旅の残りをカバーします。',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: '参列者の宿泊先を探す', body: 'コテージ、ガラスイグルー、客室を確保できるホテルまで、ラップランド各地のゲスト向け宿。' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'ラップランド旅行全体を計画', body: '挙式の前後に見て・体験したいこと — ラップランドの総合トラベルガイド。' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'ラップランドへの行き方', body: 'ロヴァニエミ、キッティラ、イヴァロへのフライト・列車・空港送迎を一行全員分。' },
    ],
  },
  es: {
    eyebrow: 'Cómo planear tu boda en Laponia',
    title: 'Lleva a todos — y dónde alojarse',
    subtitle: 'Una boda en Laponia también es un viaje para tus invitados. Estas guías hermanas cubren el resto del trayecto.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Dónde se alojará el grupo de la boda', body: 'Cabañas, iglús de cristal y hoteles con bloques de habitaciones para tus invitados por toda Laponia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planea todo tu viaje a Laponia', body: 'Qué ver y hacer antes y después de la ceremonia: una guía de viaje completa de Laponia.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Cómo llegar a Laponia', body: 'Vuelos, trenes y traslados al aeropuerto de Rovaniemi, Kittilä e Ivalo para todo el grupo.' },
    ],
  },
  'pt-BR': {
    eyebrow: 'Planejando seu casamento na Lapônia',
    title: 'Leve todos até lá — e onde se hospedar',
    subtitle: 'Um casamento na Lapônia também é uma viagem para seus convidados. Estes guias irmãos cobrem o resto do trajeto.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Onde hospedar o grupo do casamento', body: 'Cabanas, iglus de vidro e hotéis com blocos de quartos para seus convidados por toda a Lapônia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planeje toda a sua viagem à Lapônia', body: 'O que ver e fazer antes e depois da cerimônia — um guia de viagem completo da Lapônia.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Como chegar à Lapônia', body: 'Voos, trens e traslados de aeroporto para Rovaniemi, Kittilä e Ivalo para todo o grupo.' },
    ],
  },
  'zh-CN': {
    eyebrow: '筹备你的拉普兰婚礼',
    title: '让所有人抵达——并安排住宿',
    subtitle: '拉普兰婚礼对宾客来说也是一次旅行。这些姊妹指南涵盖旅程的其余部分。',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: '婚礼宾客的住宿', body: '遍布拉普兰的木屋、玻璃冰屋和可预留房间的酒店,为你的宾客而备。' },
      { href: 'https://laplandvisit.com/itineraries/', label: '规划你的整段拉普兰之旅', body: '仪式前后值得一看一玩的内容——完整的拉普兰旅行指南。' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: '如何前往拉普兰', body: '飞往罗瓦涅米、基蒂莱和伊瓦洛的航班、火车及机场接送,供全体宾客使用。' },
    ],
  },
  ko: {
    eyebrow: '라플란드 결혼식 준비하기',
    title: '모두를 데려오고 — 머물 곳도 마련하세요',
    subtitle: '라플란드 결혼식은 하객에게도 여행입니다. 자매 가이드가 여정의 나머지를 안내합니다.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: '하객이 머물 숙소', body: '라플란드 전역의 캐빈, 글래스 이글루, 객실을 단체로 잡을 수 있는 호텔까지.' },
      { href: 'https://laplandvisit.com/itineraries/', label: '라플란드 여행 전체 계획', body: '예식 전후로 보고 즐길 거리 — 라플란드 종합 여행 가이드.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: '라플란드 가는 법', body: '로바니에미, 키틸레, 이발로행 항공편·기차·공항 셔틀을 일행 모두를 위해.' },
    ],
  },
  fr: {
    eyebrow: 'Organiser votre mariage en Laponie',
    title: 'Faites venir tout le monde — et où loger',
    subtitle: 'Un mariage en Laponie est aussi un voyage pour vos invités. Ces guides frères couvrent le reste du trajet.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Où loger les invités du mariage', body: 'Chalets, igloos de verre et hôtels avec blocs de chambres pour vos invités dans toute la Laponie.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Planifier tout votre séjour en Laponie', body: 'Que voir et faire avant et après la cérémonie — un guide de voyage complet de la Laponie.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Se rendre en Laponie', body: 'Vols, trains et transferts vers les aéroports de Rovaniemi, Kittilä et Ivalo pour tout le groupe.' },
    ],
  },
  it: {
    eyebrow: 'Organizzare il vostro matrimonio in Lapponia',
    title: 'Portate tutti — e dove alloggiare',
    subtitle: 'Un matrimonio in Lapponia è anche un viaggio per i vostri ospiti. Queste guide sorelle coprono il resto del percorso.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Dove alloggiare gli ospiti del matrimonio', body: 'Baite, igloo di vetro e hotel con blocchi di camere per i vostri ospiti in tutta la Lapponia.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Pianificare l’intero viaggio in Lapponia', body: 'Cosa vedere e fare prima e dopo la cerimonia — una guida di viaggio completa della Lapponia.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Come arrivare in Lapponia', body: 'Voli, treni e transfer aeroportuali per Rovaniemi, Kittilä e Ivalo per tutto il gruppo.' },
    ],
  },
  nl: {
    eyebrow: 'Je bruiloft in Lapland plannen',
    title: 'Breng iedereen erheen — en een plek om te slapen',
    subtitle: 'Een bruiloft in Lapland is ook een reis voor je gasten. Deze zustergidsen dekken de rest van de reis.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Waar het bruiloftsgezelschap verblijft', body: 'Hutten, glazen iglo’s en hotels met kamerblokken voor je gasten in heel Lapland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Plan je hele reis door Lapland', body: 'Wat te zien en te doen voor en na de ceremonie — een complete reisgids voor Lapland.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Naar Lapland reizen', body: 'Vluchten, treinen en luchthaventransfers naar Rovaniemi, Kittilä en Ivalo voor het hele gezelschap.' },
    ],
  }, sv: {
    eyebrow: 'Planning your Lapland wedding',
    title: 'Get everyone there — and somewhere to stay',
    subtitle: 'A Lapland wedding is also a trip for your guests. These sister guides cover the rest of the journey.',
    cards: [
      { href: 'https://laplandstays.com/property-types/', label: 'Where to stay for the wedding party', body: 'Cabins, glass igloos and hotels with room blocks for your guests across Lapland.' },
      { href: 'https://laplandvisit.com/itineraries/', label: 'Plan your wider Lapland trip', body: 'What to see and do before and after the ceremony — a full Lapland travel guide.' },
      { href: 'https://laplandtransport.com/lapland-guide/', label: 'Getting to Lapland', body: 'Flights, trains and airport transfers to Rovaniemi, Kittilä and Ivalo for the whole party.' },
    ],
  },
};

export default function RelatedSites() {
  const { lang } = useLang();
  const t = COPY[lang] ?? COPY.en;

  return (
    <Section eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} className="bg-night-light/30">
      <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {t.cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            target="_blank"
            rel="noopener"
            className="on-card group bg-night-light border border-white/5 hover:border-rose/40 rounded-2xl p-6 flex flex-col transition-all"
          >
            <h3 className="font-heading text-xl text-charcoal tracking-wide leading-snug mb-2 flex items-start gap-1.5 group-hover:text-rose-deep transition-colors">
              {card.label}
              <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-rose-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </h3>
            <p className="text-sm text-stone leading-relaxed">{card.body}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
