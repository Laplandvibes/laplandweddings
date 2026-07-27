import { useState, type FormEvent } from 'react';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';

/**
 * Partner-network application form. Localized across all 11 site locales (B2B).
 * POSTs JSON to /api/partner, which emails the application to info@laplandvibes.com.
 * Honeypot field "lp_hpot" stays hidden — bots fill it, the server drops those.
 */

const SERVICE_KEYS = [
  'fullPlanning', 'venue', 'ceremony', 'catering',
  'photography', 'accommodation', 'transfers', 'decor',
] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

const SERVICE_LABELS: Record<ServiceKey, Localized<string>> = {
  fullPlanning: {
    en: 'Full planning / coordination',
    fi: 'Kokonaissuunnittelu / koordinointi',
    de: 'Komplettplanung / Koordination',
    ja: 'トータルプランニング／コーディネート',
    es: 'Planificación / coordinación integral',
    'pt-BR': 'Planejamento / coordenação completa',
    'zh-CN': '全程策划 / 协调',
    ko: '종합 기획 / 코디네이션',
    fr: 'Organisation / coordination complète',
    it: 'Pianificazione / coordinamento completo',
    nl: 'Volledige planning / coördinatie', sv: 'Helhetsplanering / koordinering',
  },
  venue: {
    en: 'Venues',
    fi: 'Hääpaikat',
    de: 'Locations',
    ja: '会場',
    es: 'Lugares',
    'pt-BR': 'Locais',
    'zh-CN': '婚礼场地',
    ko: '웨딩 장소',
    fr: 'Lieux',
    it: 'Location',
    nl: 'Locaties', sv: 'Bröllopsplatser',
  },
  ceremony: {
    en: 'Ceremony / officiant',
    fi: 'Vihkiminen / vihkijä',
    de: 'Trauung / Trauredner',
    ja: '挙式／司式者',
    es: 'Ceremonia / oficiante',
    'pt-BR': 'Cerimônia / celebrante',
    'zh-CN': '仪式 / 主婚人',
    ko: '예식 / 주례',
    fr: 'Cérémonie / officiant',
    it: 'Cerimonia / celebrante',
    nl: 'Ceremonie / voltrekker', sv: 'Vigsel / vigselförrättare',
  },
  catering: {
    en: 'Catering & drinks',
    fi: 'Ruoka & juoma',
    de: 'Catering & Getränke',
    ja: 'ケータリング＆ドリンク',
    es: 'Catering y bebidas',
    'pt-BR': 'Buffet e bebidas',
    'zh-CN': '餐饮与饮品',
    ko: '케이터링 & 음료',
    fr: 'Traiteur et boissons',
    it: 'Catering e bevande',
    nl: 'Catering & drankjes', sv: 'Catering & dryck',
  },
  photography: {
    en: 'Photography / video',
    fi: 'Valokuvaus / video',
    de: 'Fotografie / Video',
    ja: '写真／動画',
    es: 'Fotografía / vídeo',
    'pt-BR': 'Fotografia / vídeo',
    'zh-CN': '摄影 / 摄像',
    ko: '사진 / 영상',
    fr: 'Photo / vidéo',
    it: 'Fotografia / video',
    nl: 'Fotografie / video', sv: 'Foto / video',
  },
  accommodation: {
    en: 'Accommodation',
    fi: 'Majoitus',
    de: 'Unterkunft',
    ja: '宿泊',
    es: 'Alojamiento',
    'pt-BR': 'Hospedagem',
    'zh-CN': '住宿',
    ko: '숙박',
    fr: 'Hébergement',
    it: 'Alloggio',
    nl: 'Accommodatie', sv: 'Boende',
  },
  transfers: {
    en: 'Transfers / logistics',
    fi: 'Kuljetukset / logistiikka',
    de: 'Transfers / Logistik',
    ja: '送迎／ロジスティクス',
    es: 'Traslados / logística',
    'pt-BR': 'Transfers / logística',
    'zh-CN': '接送 / 物流',
    ko: '이동 / 물류',
    fr: 'Transferts / logistique',
    it: 'Transfer / logistica',
    nl: 'Transfers / logistiek', sv: 'Transporter / logistik',
  },
  decor: {
    en: 'Décor / florals',
    fi: 'Somistus / kukat',
    de: 'Dekoration / Blumen',
    ja: '装飾／フラワー',
    es: 'Decoración / flores',
    'pt-BR': 'Decoração / flores',
    'zh-CN': '布置 / 花艺',
    ko: '장식 / 플라워',
    fr: 'Décoration / fleurs',
    it: 'Allestimenti / fiori',
    nl: 'Decoratie / bloemen', sv: 'Dekor / blommor',
  },
};

type FormKey =
  | 'businessName' | 'contactName' | 'email' | 'phone' | 'phoneHelp'
  | 'regions' | 'regionsPlaceholder' | 'website'
  | 'years' | 'yearsPlaceholder'
  | 'servicesLabel' | 'servicesHelp'
  | 'message' | 'messagePlaceholder'
  | 'consent' | 'submit' | 'submitting'
  | 'error' | 'successTitle' | 'successBody';

const T: Record<FormKey, Localized<string>> = {
  businessName: {
    en: 'Business name', fi: 'Yrityksen nimi', de: 'Firmenname', ja: '会社名',
    es: 'Nombre de la empresa', 'pt-BR': 'Nome da empresa', 'zh-CN': '公司名称',
    ko: '회사명', fr: 'Nom de l’entreprise', it: 'Nome dell’azienda', nl: 'Bedrijfsnaam', sv: 'Företagsnamn',
  },
  contactName: {
    en: 'Contact name', fi: 'Yhteyshenkilö', de: 'Ansprechpartner', ja: '担当者名',
    es: 'Persona de contacto', 'pt-BR': 'Pessoa de contato', 'zh-CN': '联系人',
    ko: '담당자명', fr: 'Personne de contact', it: 'Referente', nl: 'Contactpersoon', sv: 'Kontaktperson',
  },
  email: {
    en: 'Email', fi: 'Sähköposti', de: 'E-Mail', ja: 'メール',
    es: 'Correo electrónico', 'pt-BR': 'E-mail', 'zh-CN': '电子邮箱',
    ko: '이메일', fr: 'E-mail', it: 'Email', nl: 'E-mail', sv: 'E-post',
  },
  phone: {
    en: 'Phone', fi: 'Puhelin', de: 'Telefon', ja: '電話',
    es: 'Teléfono', 'pt-BR': 'Telefone', 'zh-CN': '电话',
    ko: '전화', fr: 'Téléphone', it: 'Telefono', nl: 'Telefoon', sv: 'Telefon',
  },
  phoneHelp: {
    en: 'WhatsApp works, often the fastest way to reach you.',
    fi: 'WhatsApp käy, usein nopein tapa tavoittaa.',
    de: 'WhatsApp ist möglich, oft der schnellste Weg, Sie zu erreichen.',
    ja: 'WhatsAppも可、最も早く連絡が取れる手段です。',
    es: 'WhatsApp sirve: suele ser la forma más rápida de contactarte.',
    'pt-BR': 'WhatsApp funciona, costuma ser a forma mais rápida de falar com você.',
    'zh-CN': '可用 WhatsApp，通常是联系您最快的方式。',
    ko: 'WhatsApp도 가능합니다. 가장 빠르게 연락할 수 있는 방법입니다.',
    fr: 'WhatsApp convient, souvent le moyen le plus rapide de vous joindre.',
    it: 'Va bene anche WhatsApp: spesso è il modo più rapido per contattarti.',
    nl: 'WhatsApp kan ook, vaak de snelste manier om je te bereiken.', sv: 'WhatsApp fungerar bra, ofta det snabbaste sättet att nå dig.',
  },
  regions: {
    en: 'Regions you serve in Lapland',
    fi: 'Toiminta-alueet Lapissa',
    de: 'Regionen, die Sie in Lappland bedienen',
    ja: 'ラップランドでの対応エリア',
    es: 'Regiones que cubres en Laponia',
    'pt-BR': 'Regiões que você atende na Lapônia',
    'zh-CN': '您在拉普兰服务的地区',
    ko: '라플란드 내 서비스 지역',
    fr: 'Régions desservies en Laponie',
    it: 'Aree in cui operi in Lapponia',
    nl: 'Regio’s die je bedient in Lapland', sv: 'Regioner du verkar i inom Lappland',
  },
  regionsPlaceholder: {
    en: 'e.g. Rovaniemi, Levi, Saariselkä',
    fi: 'esim. Rovaniemi, Levi, Saariselkä',
    de: 'z. B. Rovaniemi, Levi, Saariselkä',
    ja: '例：ロヴァニエミ、レヴィ、サーリセルカ',
    es: 'p. ej. Rovaniemi, Levi, Saariselkä',
    'pt-BR': 'ex.: Rovaniemi, Levi, Saariselkä',
    'zh-CN': '例如：罗瓦涅米、莱维、萨利色尔卡',
    ko: '예: 로바니에미, 레비, 사리셀캐',
    fr: 'p. ex. Rovaniemi, Levi, Saariselkä',
    it: 'es. Rovaniemi, Levi, Saariselkä',
    nl: 'bijv. Rovaniemi, Levi, Saariselkä', sv: 't.ex. Rovaniemi, Levi, Saariselkä',
  },
  website: {
    en: 'Website / Instagram', fi: 'Verkkosivu / Instagram', de: 'Website / Instagram',
    ja: 'ウェブサイト／Instagram', es: 'Sitio web / Instagram', 'pt-BR': 'Site / Instagram',
    'zh-CN': '网站 / Instagram', ko: '웹사이트 / 인스타그램', fr: 'Site web / Instagram',
    it: 'Sito web / Instagram', nl: 'Website / Instagram', sv: 'Webbplats / Instagram',
  },
  years: {
    en: 'How long have you run Lapland weddings?',
    fi: 'Kuinka kauan olette järjestäneet häitä Lapissa?',
    de: 'Wie lange organisieren Sie schon Hochzeiten in Lappland?',
    ja: 'ラップランドでのウェディングは何年されていますか？',
    es: '¿Cuánto tiempo llevas organizando bodas en Laponia?',
    'pt-BR': 'Há quanto tempo você realiza casamentos na Lapônia?',
    'zh-CN': '您在拉普兰举办婚礼多久了？',
    ko: '라플란드 웨딩을 운영하신 지 얼마나 되셨나요?',
    fr: 'Depuis combien de temps organisez-vous des mariages en Laponie ?',
    it: 'Da quanto tempo organizzi matrimoni in Lapponia?',
    nl: 'Hoe lang organiseer je al bruiloften in Lapland?', sv: 'Hur länge har du arrangerat bröllop i Lappland?',
  },
  yearsPlaceholder: {
    en: 'e.g. 6 years, 40+ weddings',
    fi: 'esim. 6 vuotta, 40+ häitä',
    de: 'z. B. 6 Jahre, 40+ Hochzeiten',
    ja: '例：6年、40件以上の挙式',
    es: 'p. ej. 6 años, más de 40 bodas',
    'pt-BR': 'ex.: 6 anos, mais de 40 casamentos',
    'zh-CN': '例如：6 年，40 多场婚礼',
    ko: '예: 6년, 40건 이상의 웨딩',
    fr: 'p. ex. 6 ans, plus de 40 mariages',
    it: 'es. 6 anni, oltre 40 matrimoni',
    nl: 'bijv. 6 jaar, 40+ bruiloften', sv: 't.ex. 6 år, 40+ bröllop',
  },
  servicesLabel: {
    en: 'What do you deliver yourself or through trusted partners?',
    fi: 'Mitä katatte itse tai luotettujen kumppaneiden kautta?',
    de: 'Was bieten Sie selbst oder über vertrauenswürdige Partner an?',
    ja: '自社または信頼できるパートナーを通じて提供できるものは？',
    es: '¿Qué ofreces tú mismo o a través de socios de confianza?',
    'pt-BR': 'O que você oferece por conta própria ou por meio de parceiros de confiança?',
    'zh-CN': '您自身或通过可信合作伙伴能提供哪些服务？',
    ko: '직접 또는 신뢰할 수 있는 파트너를 통해 제공하는 항목은?',
    fr: 'Que proposez-vous vous-même ou via des partenaires de confiance ?',
    it: 'Cosa offri direttamente o tramite partner fidati?',
    nl: 'Wat lever je zelf of via vertrouwde partners?', sv: 'Vad levererar du själv eller via betrodda partner?',
  },
  servicesHelp: {
    en: 'We look for operators who can deliver the whole wedding, in-house or through established relationships.',
    fi: 'Etsimme toimijoita, jotka pystyvät hoitamaan koko häät, joko itse tai vakiintunein kumppanisuhtein.',
    de: 'Wir suchen Anbieter, die die gesamte Hochzeit umsetzen können, selbst oder über etablierte Partnerschaften.',
    ja: '結婚式全体を、自社または確立された提携先を通じて、手配できる事業者を探しています。',
    es: 'Buscamos operadores capaces de cubrir toda la boda, ya sea por sí mismos o a través de relaciones consolidadas.',
    'pt-BR': 'Procuramos operadores capazes de realizar o casamento inteiro, por conta própria ou por meio de parcerias estabelecidas.',
    'zh-CN': '我们寻找能够完成整场婚礼的运营方，可由自身或通过成熟的合作关系实现。',
    ko: '결혼식 전체를, 자체적으로 또는 확립된 협력 관계를 통해, 진행할 수 있는 업체를 찾습니다.',
    fr: 'Nous recherchons des prestataires capables d’assurer tout le mariage, en interne ou via des partenariats établis.',
    it: 'Cerchiamo operatori in grado di gestire l’intero matrimonio, internamente o tramite collaborazioni consolidate.',
    nl: 'We zoeken aanbieders die de hele bruiloft kunnen verzorgen, zelf of via gevestigde samenwerkingen.', sv: 'We look for operators who can deliver the whole wedding, in-house or through established relationships.',
  },
  message: {
    en: 'Tell us briefly about yourselves',
    fi: 'Kertokaa lyhyesti itsestänne',
    de: 'Erzählen Sie kurz von sich',
    ja: '貴社について簡単にご紹介ください',
    es: 'Cuéntanos brevemente sobre vosotros',
    'pt-BR': 'Conte-nos brevemente sobre vocês',
    'zh-CN': '请简要介绍一下你们',
    ko: '간단히 소개해 주세요',
    fr: 'Présentez-vous brièvement',
    it: 'Raccontaci brevemente di voi',
    nl: 'Vertel ons kort over jezelf', sv: 'Berätta kort om er',
  },
  messagePlaceholder: {
    en: 'Style, specialties, example weddings, what makes you a fit…',
    fi: 'Tyyli, erikoisalat, esimerkkihäät, mikä tekee teistä sopivan…',
    de: 'Stil, Spezialitäten, Beispielhochzeiten, warum Sie passen…',
    ja: 'スタイル、得意分野、過去の挙式例、貴社が適している理由など…',
    es: 'Estilo, especialidades, bodas de ejemplo, por qué encajáis…',
    'pt-BR': 'Estilo, especialidades, exemplos de casamentos, por que vocês se encaixam…',
    'zh-CN': '风格、专长、婚礼案例、为何合适……',
    ko: '스타일, 전문 분야, 진행했던 웨딩 사례, 적합한 이유 등…',
    fr: 'Style, spécialités, exemples de mariages, pourquoi vous correspondez…',
    it: 'Stile, specialità, matrimoni d’esempio, perché siete adatti…',
    nl: 'Stijl, specialiteiten, voorbeeldbruiloften, waarom je past…', sv: 'Stil, specialiteter, exempelbröllop, varför ni passar…',
  },
  consent: {
    en: 'I agree that the LaplandVibes team may contact me about partnership. I can withdraw anytime.',
    fi: 'Hyväksyn, että LaplandVibes-tiimi voi olla minuun yhteydessä kumppanuudesta. Voin perua koska tahansa.',
    de: 'Ich bin damit einverstanden, dass das LaplandVibes-Team mich zur Partnerschaft kontaktiert. Ich kann jederzeit widerrufen.',
    ja: 'LaplandVibesチームがパートナーシップについて連絡することに同意します。いつでも撤回できます。',
    es: 'Acepto que el equipo de LaplandVibes me contacte sobre la colaboración. Puedo retirarme en cualquier momento.',
    'pt-BR': 'Concordo que a equipe da LaplandVibes entre em contato sobre a parceria. Posso cancelar a qualquer momento.',
    'zh-CN': '我同意 LaplandVibes 团队就合作事宜与我联系。我可随时撤回。',
    ko: 'LaplandVibes 팀이 파트너십에 관해 연락하는 데 동의합니다. 언제든 철회할 수 있습니다.',
    fr: 'J’accepte que l’équipe LaplandVibes me contacte au sujet du partenariat. Je peux me retirer à tout moment.',
    it: 'Acconsento che il team LaplandVibes mi contatti per la partnership. Posso ritirarmi in qualsiasi momento.',
    nl: 'Ik ga ermee akkoord dat het LaplandVibes-team contact met me opneemt over partnerschap. Ik kan me altijd terugtrekken.', sv: 'I agree that the LaplandVibes team may contact me about partnership. I can withdraw anytime.',
  },
  submit: {
    en: 'Send application', fi: 'Lähetä hakemus', de: 'Bewerbung senden', ja: '申し込みを送信',
    es: 'Enviar solicitud', 'pt-BR': 'Enviar candidatura', 'zh-CN': '提交申请',
    ko: '신청서 보내기', fr: 'Envoyer la candidature', it: 'Invia candidatura', nl: 'Aanmelding versturen', sv: 'Skicka ansökan',
  },
  submitting: {
    en: 'Sending…', fi: 'Lähetetään…', de: 'Wird gesendet…', ja: '送信中…',
    es: 'Enviando…', 'pt-BR': 'Enviando…', 'zh-CN': '发送中…', ko: '전송 중…',
    fr: 'Envoi…', it: 'Invio…', nl: 'Verzenden…', sv: 'Skickar…',
  },
  error: {
    en: 'Submission failed. Try again or email info@laplandvibes.com directly.',
    fi: 'Lähetys epäonnistui. Yritä uudelleen tai kirjoita suoraan info@laplandvibes.com.',
    de: 'Senden fehlgeschlagen. Versuchen Sie es erneut oder schreiben Sie direkt an info@laplandvibes.com.',
    ja: '送信に失敗しました。もう一度お試しいただくか、info@laplandvibes.com まで直接メールしてください。',
    es: 'El envío falló. Inténtalo de nuevo o escribe directamente a info@laplandvibes.com.',
    'pt-BR': 'Falha no envio. Tente novamente ou escreva diretamente para info@laplandvibes.com.',
    'zh-CN': '提交失败。请重试，或直接发送邮件至 info@laplandvibes.com。',
    ko: '전송에 실패했습니다. 다시 시도하거나 info@laplandvibes.com 으로 직접 메일을 보내주세요.',
    fr: 'L’envoi a échoué. Réessayez ou écrivez directement à info@laplandvibes.com.',
    it: 'Invio non riuscito. Riprova o scrivi direttamente a info@laplandvibes.com.',
    nl: 'Verzenden mislukt. Probeer het opnieuw of mail direct naar info@laplandvibes.com.', sv: 'Det gick inte att skicka. Försök igen eller mejla info@laplandvibes.com direkt.',
  },
  successTitle: {
    en: 'Thank you. Your application is in.',
    fi: 'Kiitos. Hakemuksenne on perillä.',
    de: 'Danke. Ihre Bewerbung ist eingegangen.',
    ja: 'ありがとうございます。お申し込みを受け付けました。',
    es: 'Gracias: hemos recibido tu solicitud.',
    'pt-BR': 'Obrigado. Recebemos a sua candidatura.',
    'zh-CN': '谢谢，我们已收到您的申请。',
    ko: '감사합니다. 신청서가 접수되었습니다.',
    fr: 'Merci. Votre candidature est bien arrivée.',
    it: 'Grazie. Abbiamo ricevuto la tua candidatura.',
    nl: 'Bedankt. Je aanmelding is binnen.', sv: 'Tack! Din ansökan är registrerad.',
  },
  successBody: {
    en: 'We will review it and get back to you within a few days. Approved partners receive their first lead free.',
    fi: 'Käymme sen läpi ja palaamme muutaman päivän sisällä. Hyväksytyt kumppanit saavat ensimmäisen liidin maksutta.',
    de: 'Wir prüfen sie und melden uns innerhalb weniger Tage. Angenommene Partner erhalten ihren ersten Lead kostenlos.',
    ja: '内容を確認し、数日以内にご連絡します。承認されたパートナーは最初のリードを無料で受け取れます。',
    es: 'La revisaremos y te responderemos en pocos días. Los socios aprobados reciben su primer lead gratis.',
    'pt-BR': 'Vamos analisá-la e responder em poucos dias. Parceiros aprovados recebem o primeiro lead gratuitamente.',
    'zh-CN': '我们会进行审核并在几天内回复您。通过审核的合作伙伴将免费获得首个客户线索。',
    ko: '검토 후 며칠 내로 연락드리겠습니다. 승인된 파트너는 첫 번째 리드를 무료로 받습니다.',
    fr: 'Nous l’examinerons et reviendrons vers vous sous quelques jours. Les partenaires acceptés reçoivent leur premier lead gratuitement.',
    it: 'La esamineremo e ti risponderemo entro pochi giorni. I partner approvati ricevono il primo lead gratis.',
    nl: 'We bekijken hem en nemen binnen enkele dagen contact op. Goedgekeurde partners ontvangen hun eerste lead gratis.', sv: 'We will review it and get back to you within a few days. Approved partners receive their first lead free.',
  },
};

export default function PartnerForm() {
  const { lang } = useLang();
  const tr = (k: FormKey) => pickLocalized(T[k], lang);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const services = data.getAll('services').map(String);
    const payload = {
      lp_hpot: String(data.get('lp_hpot') || ''), // honeypot — non-autofill name
      businessName: String(data.get('businessName') || ''),
      contactName: String(data.get('contactName') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      website: String(data.get('website') || ''),
      regions: String(data.get('regions') || ''),
      years: String(data.get('years') || ''),
      services,
      message: String(data.get('message') || ''),
      consent: data.get('consent') === 'on',
      lang,
    };

    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || 'failed');
      setSubmitted(true);
      // The form shrinks to the thank-you message; bring it into view so the
      // page doesn't stay scrolled past it (was landing on the footer).
      requestAnimationFrame(() => {
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch {
      setError(tr('error'));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-night-light border border-aurora-green/40 rounded-2xl p-8 text-center">
        <p className="font-heading text-2xl text-white mb-2">
          {tr('successTitle')}
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">
          {tr('successBody')}
        </p>
      </div>
    );
  }

  const lbl = 'block text-sm font-medium text-gray-200 mb-1.5';
  const inp = 'w-full min-h-[48px] rounded-lg bg-night border border-white/10 focus:border-rose focus:ring-1 focus:ring-rose px-3.5 py-2.5 text-base text-white placeholder-gray-500 outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="partner-form bg-night-light border border-white/10 rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5">
      {/* Honeypot — must stay empty. Renamed from "company" because browser /
          password-manager autofill fills "company" even when hidden, which
          silently dropped real human submissions. Non-standard name + ignore
          hints keep autofill away while still catching fill-everything bots. */}
      <input type="text" name="lp_hpot" tabIndex={-1} autoComplete="off" aria-hidden="true"
        data-1p-ignore="true" data-lpignore="true" data-form-type="other"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="businessName" className={lbl}>{tr('businessName')} *</label>
          <input id="businessName" name="businessName" required className={inp} />
        </div>
        <div>
          <label htmlFor="contactName" className={lbl}>{tr('contactName')} *</label>
          <input id="contactName" name="contactName" required className={inp} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={lbl}>{tr('email')} *</label>
          <input id="email" name="email" type="email" required className={inp} />
        </div>
        <div>
          <label htmlFor="phone" className={lbl}>{tr('phone')}</label>
          <input id="phone" name="phone" type="tel" className={inp} />
          <p className="text-xs text-gray-500 mt-1">{tr('phoneHelp')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="regions" className={lbl}>{tr('regions')}</label>
          <input id="regions" name="regions" className={inp} placeholder={tr('regionsPlaceholder')} />
        </div>
        <div>
          <label htmlFor="website" className={lbl}>{tr('website')}</label>
          <input id="website" name="website" className={inp} placeholder="laplandromance.fi · @handle" />
        </div>
      </div>

      <div>
        <label htmlFor="years" className={lbl}>{tr('years')}</label>
        <input id="years" name="years" className={inp} placeholder={tr('yearsPlaceholder')} />
      </div>

      <div>
        <label className={lbl}>{tr('servicesLabel')}</label>
        <p className="text-xs text-gray-400 mb-3">{tr('servicesHelp')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICE_KEYS.map((key) => (
            <label key={key} className="flex items-center gap-2.5 text-sm rounded-lg px-3 py-2.5 cursor-pointer transition-colors"
              style={{ background: '#FFFFFF', border: '1px solid #B0997F', color: '#1F1612' }}>
              <input type="checkbox" name="services" value={key} className="w-4 h-4 rounded shrink-0" style={{ accentColor: '#C9466A' }} />
              <span>{pickLocalized(SERVICE_LABELS[key], lang)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={lbl}>{tr('message')}</label>
        <textarea id="message" name="message" rows={4} className={inp}
          placeholder={tr('messagePlaceholder')} />
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-300">
        <input type="checkbox" name="consent" required className="mt-1 w-4 h-4 rounded shrink-0" style={{ accentColor: '#C9466A' }} />
        <span>{tr('consent')}</span>
      </label>

      {error && <p className="text-rose text-sm">{error}</p>}

      <button type="submit" disabled={submitting}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-rose hover:bg-pink disabled:opacity-60 text-white font-semibold rounded-full transition-colors shadow-lg shadow-rose/30">
        {submitting ? tr('submitting') : tr('submit')}
      </button>
    </form>
  );
}
