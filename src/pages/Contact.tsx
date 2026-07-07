import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt', Localized<string>> = {
  seoTitle: {
    en: 'Contact — get 3 quotes | LaplandWeddings',
    fi: 'Ota yhteyttä — pyydä 3 tarjousta | LaplandWeddings',
    de: 'Kontakt — 3 Angebote anfordern | LaplandWeddings',
    ja: 'お問い合わせ — 3つの見積もりを依頼 | LaplandWeddings',
    es: 'Contacto — solicita 3 presupuestos | LaplandWeddings',
    'pt-BR': 'Contato — peça 3 orçamentos | LaplandWeddings',
    'zh-CN': '联系我们 — 获取 3 份报价 | LaplandWeddings',
    ko: '문의 — 견적 3건 받기 | LaplandWeddings',
    fr: 'Contact — demandez 3 devis | LaplandWeddings',
    it: 'Contatti — richiedi 3 preventivi | LaplandWeddings',
    nl: 'Contact — vraag 3 offertes aan | LaplandWeddings',
  },
  seoDesc: {
    en: 'Tell us briefly about your dream. We pass your enquiry to 3 Lapland wedding planners. Response in 1–7 days, free and with no commitment.',
    fi: 'Kerro lyhyesti unelmasi. Välitämme tiedustelusi 3:lle Lapin hääsuunnittelijalle. Vastaus 1–7 päivän sisällä, maksuton ja sitoumukseton.',
    de: 'Erzählen Sie uns kurz von Ihrem Traum. Wir leiten Ihre Anfrage an 3 Hochzeitsplaner in Lappland weiter. Antwort in 1–7 Tagen, kostenlos und unverbindlich.',
    ja: '理想の結婚式を簡単にお聞かせください。ラップランドのウェディングプランナー3社へお問い合わせを取り次ぎます。1〜7日以内に返信、無料・無拘束。',
    es: 'Cuéntanos brevemente tu sueño. Pasamos tu consulta a 3 organizadores de bodas de Laponia. Respuesta en 1–7 días, gratis y sin compromiso.',
    'pt-BR': 'Conte-nos brevemente o seu sonho. Encaminhamos sua solicitação a 3 organizadores de casamento da Lapônia. Resposta em 1–7 dias, grátis e sem compromisso.',
    'zh-CN': '简单告诉我们你的梦想。我们会把你的咨询转给 3 位拉普兰婚礼策划师。1–7 天内回复，免费且无约束。',
    ko: '꿈꾸는 결혼식을 간단히 알려주세요. 귀하의 문의를 라플란드 웨딩 플래너 3곳에 전달합니다. 1~7일 내 회신, 무료이며 부담 없음.',
    fr: 'Parlez-nous brièvement de votre rêve. Nous transmettons votre demande à 3 wedding planners de Laponie. Réponse sous 1 à 7 jours, gratuit et sans engagement.',
    it: 'Raccontaci brevemente il tuo sogno. Inoltriamo la tua richiesta a 3 wedding planner della Lapponia. Risposta in 1–7 giorni, gratis e senza impegno.',
    nl: 'Vertel ons kort over je droom. We sturen je aanvraag door naar 3 trouwplanners in Lapland. Reactie binnen 1–7 dagen, gratis en vrijblijvend.',
  },
  imageAlt: {
    en: 'Wedding ceremony lit by candles',
    fi: 'Vihkitilanne kynttilän valossa',
    de: 'Hochzeitszeremonie im Kerzenschein',
    ja: 'キャンドルに照らされた結婚式',
    es: 'Ceremonia de boda iluminada por velas',
    'pt-BR': 'Cerimônia de casamento iluminada por velas',
    'zh-CN': '烛光照亮的婚礼仪式',
    ko: '촛불로 밝힌 결혼식',
    fr: 'Cérémonie de mariage éclairée aux bougies',
    it: 'Cerimonia di matrimonio illuminata dalle candele',
    nl: 'Huwelijksceremonie verlicht door kaarsen',
  },
};

export default function Contact() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO
        title={pickLocalized(P.seoTitle, lang)}
        description={pickLocalized(P.seoDesc, lang)}
        path="/contact"
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowContact', lang)}
        title={tr.contact.title}
        subtitle={tr.contact.subtitle}
        image="/images/heroes/contact-bg.webp"
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />
      <Section title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm />
      </Section>
    </>
  );
}
