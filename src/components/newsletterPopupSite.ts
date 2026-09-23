import type { NewsletterPopupCopy, NewsletterPopupTheme } from '../shared/NewsletterPopup';

/**
 * laplandweddings.online: uutiskirjepopupin oma väri ja teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Väri = tämän sivuston oma pääväri, mitattu elävältä etusivulta 23.9.2026
 * (ruusu #C9466A ja kulta tummalla ruskealla). Kontrasti tarkistettu: napin teksti ≥ 4,5:1,
 * kuvan rengas ≥ 3:1 korttia vasten.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko tulee jaetusta komponentista.
 */
export const POPUP_THEME: NewsletterPopupTheme = {
  surface: '#1F1612',
  accent: '#E5879C',
  cta: '#B03A5B',
  onCta: '#FFFFFF',
};

export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    description: 'Founder of LaplandVibes. Weddings on the fells, small ceremonies and venues among the fells. I tell you which paperwork to take care of early and which places suit your day.',
  },
  fi: {
    description: 'LaplandVibesin perustaja. Tunturihäät, pienet vihkiseremoniat ja juhlapaikat keskellä tuntureita. Kerron, mitä paperiasioista kannattaa hoitaa ajoissa ja mitkä paikat sopivat juuri teidän päiväänne.',
  },
  de: {
    description: 'Gründer von LaplandVibes. Hochzeiten auf dem Fjäll, kleine Trauungen und Locations mitten in den Fjälls. Ich erkläre Ihnen, welche Formalitäten Sie frühzeitig erledigen sollten und welche Orte genau zu Ihrem Tag passen.',
  },
  ja: {
    description: 'LaplandVibes創業者。フェルでの結婚式、小さな挙式、フェルに囲まれた会場。書類の手続きで早めに済ませておきたいことと、おふたりの日にぴったりの場所をお伝えします。',
  },
  es: {
    description: 'Fundador de LaplandVibes. Bodas en el fell, ceremonias íntimas y espacios para celebrar en plena montaña ártica. Le cuento qué papeleo conviene resolver con tiempo y qué lugares son los indicados para su día.',
  },
  'pt-BR': {
    description: 'Fundador do LaplandVibes. Casamentos, pequenas cerimônias e locais de celebração em meio aos montes. Conto o que vale a pena adiantar na papelada e quais lugares têm tudo a ver com o dia de vocês.',
  },
  'zh-CN': {
    description: 'LaplandVibes创始人。山丘婚礼、小型结婚仪式，还有群山环抱的婚宴场地。我会告诉你们哪些文书手续要提前办，以及哪些场地正适合你们的大日子。',
  },
  ko: {
    description: 'LaplandVibes 창립자. 펠에서 올리는 결혼식, 소규모 예식, 펠로 둘러싸인 웨딩 장소. 서류는 무엇을 미리 챙겨 두면 좋은지, 두 분의 날에 꼭 맞는 곳은 어디인지 알려드립니다.',
  },
  fr: {
    description: 'Fondateur de LaplandVibes. Mariages sur les fjälls, cérémonies intimes et lieux de réception au cœur de la montagne arctique. Je vous indique quelles démarches administratives anticiper et quels endroits sont faits pour votre grand jour.',
  },
  it: {
    description: 'Fondatore di LaplandVibes. Matrimoni sui fjäll, piccole cerimonie e location circondate dai monti artici. Le spiego quali pratiche conviene sbrigare per tempo e quali luoghi sono giusti proprio per il Suo grande giorno.',
  },
  nl: {
    description: 'Oprichter van LaplandVibes. Bruiloften op de fjäll, kleine trouwceremonies en feestlocaties te midden van de fjälls. Ik vertel u welk papierwerk u beter tijdig regelt en welke locaties precies bij uw dag passen.',
  },
  sv: {
    description: 'Grundare av LaplandVibes. Fjällbröllop, små vigslar och festlokaler mitt i fjällvärlden. Jag berättar vilket pappersarbete ni bör sköta i god tid och vilka platser som passar just er dag.',
  },
};
