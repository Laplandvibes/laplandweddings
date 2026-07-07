import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang, localiseLanguage } from '../i18n/LangContext';
import { planners } from '../data/planners';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

const P: Record<'seoTitle' | 'seoDesc' | 'imageAlt' | 'sourceNote', Localized<string>> = {
  seoTitle: {
    en: 'Lapland Wedding Planners — get 3 quotes with one form | LaplandWeddings',
    fi: 'Lapin hääsuunnittelijat — 3 tarjousta | LaplandWeddings',
    de: 'Hochzeitsplaner in Lappland — 3 Angebote | LaplandWeddings',
    ja: 'ラップランドのウェディングプランナー — 1つのフォームで3つの見積もり | LaplandWeddings',
    es: 'Organizadores de bodas en Laponia | LaplandWeddings',
    'pt-BR': 'Organizadores de casamento na Lapônia | LaplandWeddings',
    'zh-CN': '拉普兰婚礼策划师 — 一份表单获取 3 份报价 | LaplandWeddings',
    ko: '라플란드 웨딩 플래너 — 한 번의 양식으로 견적 3건 받기 | LaplandWeddings',
    fr: 'Wedding planners en Laponie — 3 devis | LaplandWeddings',
    it: 'Wedding planner in Lapponia — 3 preventivi | LaplandWeddings',
    nl: 'Trouwplanners in Lapland — 3 offertes | LaplandWeddings',
  },
  seoDesc: {
    en: 'The 7 most established Lapland wedding planners. Send one form — we deliver 3 personalised quotes. Free and no commitment.',
    fi: 'Lapin 7 vakiintuneinta hääsuunnittelijaa. Lähetä yksi lomake — toimitamme 3 räätälöityä tarjousta. Maksuton ja sitoumukseton.',
    de: 'Die 7 etabliertesten Hochzeitsplaner Lapplands. Senden Sie ein Formular — wir liefern 3 individuelle Angebote. Kostenlos und unverbindlich.',
    ja: 'ラップランドで最も実績のあるウェディングプランナー7社。フォームを1つ送るだけで、3つのオーダーメイド見積もりをお届け。無料・無拘束。',
    es: 'Los 7 organizadores de bodas más consolidados de Laponia. Envía un formulario y te entregamos 3 presupuestos personalizados. Gratis y sin compromiso.',
    'pt-BR': 'Os 7 organizadores de casamento mais consolidados da Lapônia. Envie um formulário — entregamos 3 orçamentos personalizados. Grátis e sem compromisso.',
    'zh-CN': '拉普兰最具口碑的 7 位婚礼策划师。提交一份表单——我们为您提供 3 份个性化报价。免费且无约束。',
    ko: '라플란드에서 가장 자리 잡은 웨딩 플래너 7곳. 양식 하나만 보내면 맞춤 견적 3건을 드립니다. 무료이며 부담 없음.',
    fr: 'Les 7 wedding planners les plus établis de Laponie. Envoyez un formulaire — nous vous fournissons 3 devis personnalisés. Gratuit et sans engagement.',
    it: 'I 7 wedding planner più affermati della Lapponia. Invia un modulo — ti consegniamo 3 preventivi personalizzati. Gratis e senza impegno.',
    nl: 'De 7 meest gevestigde trouwplanners van Lapland. Stuur één formulier — wij leveren 3 persoonlijke offertes. Gratis en vrijblijvend.',
  },
  imageAlt: {
    en: 'Couple eloping in Lapland landscape',
    fi: 'Hääpari vihille kahdestaan Lapin maisemassa',
    de: 'Paar bei einer Elopement-Hochzeit in der Landschaft Lapplands',
    ja: 'ラップランドの風景で二人だけの結婚式を挙げるカップル',
    es: 'Pareja fugándose para casarse en el paisaje de Laponia',
    'pt-BR': 'Casal em elopement na paisagem da Lapônia',
    'zh-CN': '在拉普兰风光中私奔成婚的情侣',
    ko: '라플란드 풍경 속에서 단둘이 결혼식을 올리는 커플',
    fr: 'Couple en elopement dans les paysages de Laponie',
    it: 'Coppia in elopement nel paesaggio della Lapponia',
    nl: 'Stel dat trouwt met z’n tweeën in het Laplandse landschap',
  },
  sourceNote: {
    en: 'Information sourced from public planner websites. LaplandWeddings is not in a contractual relationship with all listed providers — we route your enquiry to those who best match your needs.',
    fi: 'Tiedot kerätty hääsuunnittelijoiden omilta julkisilta sivuilta. LaplandWeddings ei ole sopimussuhteessa kaikkiin listattuihin toimijoihin — välitämme tiedustelusi niille, jotka parhaiten vastaavat toiveitanne.',
    de: 'Angaben aus den öffentlichen Websites der Planer. LaplandWeddings steht nicht mit allen gelisteten Anbietern in einem Vertragsverhältnis — wir leiten Ihre Anfrage an diejenigen weiter, die am besten zu Ihren Wünschen passen.',
    ja: '情報は各プランナーの公開ウェブサイトから収集しています。LaplandWeddingsは掲載事業者全員と契約関係にあるわけではありません — ご要望に最も合う事業者へお問い合わせを取り次ぎます。',
    es: 'Información obtenida de los sitios web públicos de los organizadores. LaplandWeddings no mantiene una relación contractual con todos los proveedores listados: dirigimos tu consulta a quienes mejor se ajustan a tus necesidades.',
    'pt-BR': 'Informações obtidas dos sites públicos dos organizadores. A LaplandWeddings não tem relação contratual com todos os fornecedores listados — encaminhamos sua solicitação aos que melhor atendem às suas necessidades.',
    'zh-CN': '信息来源于策划师的公开网站。LaplandWeddings 并未与所有列出的服务商建立合同关系——我们会将您的咨询转给最符合您需求的服务商。',
    ko: '정보는 각 플래너의 공개 웹사이트에서 수집했습니다. LaplandWeddings는 게재된 모든 업체와 계약 관계에 있지 않습니다 — 귀하의 요구에 가장 잘 맞는 업체로 문의를 전달합니다.',
    fr: 'Informations issues des sites web publics des planners. LaplandWeddings n’est pas lié par contrat à tous les prestataires répertoriés — nous transmettons votre demande à ceux qui correspondent le mieux à vos besoins.',
    it: 'Informazioni tratte dai siti web pubblici dei planner. LaplandWeddings non ha un rapporto contrattuale con tutti i fornitori elencati — inoltriamo la tua richiesta a quelli più adatti alle tue esigenze.',
    nl: 'Informatie afkomstig van de openbare websites van de planners. LaplandWeddings heeft geen contractuele relatie met alle vermelde aanbieders — we sturen je aanvraag door naar degenen die het best bij je wensen passen.',
  },
};

export default function Planners() {
  const { lang, dataLang, tr } = useLang();
  return (
    <>
      <SEO
        title={pickLocalized(P.seoTitle, lang)}
        description={pickLocalized(P.seoDesc, lang)}
        path="/planners"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: planners.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'LocalBusiness',
              name: p.name,
              url: p.publicWebsite,
              areaServed: 'Finnish Lapland',
              priceRange: p.priceTier,
            },
          })),
        }}
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowPlanners', lang)}
        title={tr.planners.indexTitle}
        subtitle={tr.planners.indexIntro}
        image="/images/types/vow-renewal.webp"
        imageAlt={pickLocalized(P.imageAlt, lang)}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {planners.map((p) => (
            <article key={p.slug} className="bg-night-light border border-white/5 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{p.homeBase[dataLang]}</p>
                  <h3 className="font-heading text-xl text-white tracking-wide break-words">{p.name}</h3>
                </div>
                <span className="text-gold font-semibold whitespace-nowrap shrink-0">{p.priceTier}{p.priceFrom ? ` · ${ui('from', lang)} ${p.priceFrom}` : ''}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{p.description[dataLang]}</p>

              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{tr.sections.strengths}</p>
              <ul className="text-sm text-gray-300 space-y-1.5 mb-4">
                {p.strengths[dataLang].map((s) => (
                  <li key={s} className="flex gap-2"><span className="text-aurora-green">✓</span><span>{s}</span></li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                <span>{p.languages.map((l) => localiseLanguage(l, lang)).join(' · ')}</span>
                <span className="italic">{p.bestFor[dataLang]}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto">
          {pickLocalized(P.sourceNote, lang)}
        </p>
      </Section>

      <Section className="bg-night-light/30" title={tr.planners.threeQuotesTitle} subtitle={tr.planners.threeQuotesP}>
        <LeadForm />
      </Section>
    </>
  );
}
