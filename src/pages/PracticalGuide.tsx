import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';
import { tripToLapland, carRentalLink, AFFILIATE_REL } from '../lib/affiliate';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import L from '../components/L';
import { Download, Package, Users, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Localized } from '../data/localized';
import { pickLocalized } from '../data/localized';

interface Step {
  n: number;
  t: Localized<string>;
  p: Localized<string>;
  link?: { url: string; label: string };
}

/** Six-step marriage-licence process, fully localised across all 12 locales. */
const STEPS: Step[] = [
  {
    n: 1,
    t: {
      fi: 'Pyydä esteiden tutkinta DVV:ltä',
      en: 'Request the Examination of Impediments from DVV',
      de: 'Beantragen Sie die Ehefähigkeitsprüfung beim DVV',
      ja: 'DVVに婚姻障害の調査を申請する',
      es: 'Solicita el Examen de Impedimentos al DVV',
      'pt-BR': 'Solicite o Exame de Impedimentos ao DVV',
      'zh-CN': '向DVV申请婚姻障碍审查',
      ko: 'DVV에 혼인 장애 조사를 신청하세요',
      fr: 'Demandez l’examen des empêchements au DVV',
      it: 'Richiedi al DVV l’esame degli impedimenti',
      nl: 'Vraag het onderzoek naar huwelijksbeletselen aan bij het DVV', sv: 'Request the Examination of Impediments from DVV',
    },
    p: {
      fi: 'Suomalaisille 1–2 viikkoa, ulkomaalaisille 3–5 viikkoa. Maksuton (paitsi 15 € EU-käännös tarvittaessa). Hae 2 kuukautta ennen vihkimistä.',
      en: 'Finnish couples: 1–2 weeks. Foreign couples: 3–5 weeks. Free (except €15 EU translation if needed). Submit 2 months before the wedding.',
      de: 'Finnische Paare: 1–2 Wochen. Ausländische Paare: 3–5 Wochen. Kostenlos (außer 15 € EU-Übersetzung bei Bedarf). 2 Monate vor der Trauung einreichen.',
      ja: 'フィンランド人カップルは1〜2週間、外国人カップルは3〜5週間。無料（必要に応じてEU翻訳15ユーロ）。挙式の2か月前に申請を。',
      es: 'Parejas finlandesas: 1-2 semanas. Parejas extranjeras: 3-5 semanas. Gratis (salvo 15 € de traducción UE si hace falta). Presentadlo 2 meses antes de la boda.',
      'pt-BR': 'Casais finlandeses: 1-2 semanas. Casais estrangeiros: 3-5 semanas. Gratuito (exceto € 15 de tradução da UE, se necessário). Envie 2 meses antes do casamento.',
      'zh-CN': '芬兰新人需1–2周，外籍新人需3–5周。免费（如需欧盟翻译则另收15欧元）。请在婚礼前2个月提交。',
      ko: '핀란드 커플은 1~2주, 외국인 커플은 3~5주. 무료(필요 시 EU 번역 15유로 별도). 결혼식 2개월 전에 신청하세요.',
      fr: 'Couples finlandais : 1-2 semaines. Couples étrangers : 3-5 semaines. Gratuit (sauf 15 € de traduction UE si nécessaire). À déposer 2 mois avant le mariage.',
      it: 'Coppie finlandesi: 1-2 settimane. Coppie straniere: 3-5 settimane. Gratuito (tranne 15 € di traduzione UE se necessaria). Presentate 2 mesi prima delle nozze.',
      nl: 'Finse stellen: 1-2 weken. Buitenlandse stellen: 3-5 weken. Gratis (behalve € 15 EU-vertaling indien nodig). Dien 2 maanden voor de bruiloft in.', sv: 'Finnish couples: 1–2 weeks. Foreign couples: 3–5 weeks. Free (except €15 EU translation if needed). Submit 2 months before the wedding.',
    },
    link: { url: 'https://dvv.fi/en/examination-of-impediments-to-marriage', label: 'DVV: Examination of impediments' },
  },
  {
    n: 2,
    t: {
      fi: 'Hanki Certificate of No Impediment kotimaastasi',
      en: 'Get a Certificate of No Impediment from your home country',
      de: 'Besorgen Sie ein Ehefähigkeitszeugnis aus Ihrem Heimatland',
      ja: '母国から婚姻要件具備証明書を取得する',
      es: 'Obtén un Certificado de No Impedimento en tu país de origen',
      'pt-BR': 'Obtenha um Certificado de Inexistência de Impedimentos no seu país',
      'zh-CN': '从你的祖国获取无婚姻障碍证明',
      ko: '본국에서 혼인 무장애 증명서를 발급받으세요',
      fr: 'Obtenez un certificat de non-empêchement de votre pays d’origine',
      it: 'Procurati un certificato di assenza di impedimenti dal tuo Paese',
      nl: 'Haal een verklaring van geen huwelijksbeletsel uit je thuisland', sv: 'Get a Certificate of No Impediment from your home country',
    },
    p: {
      fi: 'Pyydä se omasta maistraatistasi tai ulkoasiainministeriöstä ennen Suomeen tuloa. Useimmissa maissa apostille-leima ja valallinen käännös tarvitaan.',
      en: 'Request from your home registrar or foreign ministry before arriving in Finland. Most countries require an apostille stamp and a sworn translation.',
      de: 'Beantragen Sie es vor Ihrer Ankunft in Finnland bei Ihrem Standesamt oder Außenministerium. In den meisten Ländern sind eine Apostille und eine beglaubigte Übersetzung erforderlich.',
      ja: 'フィンランド到着前に、母国の戸籍当局または外務省に申請してください。多くの国でアポスティーユと宣誓翻訳が必要です。',
      es: 'Solicítalo a tu registro civil o ministerio de exteriores antes de llegar a Finlandia. La mayoría de los países exigen apostilla y traducción jurada.',
      'pt-BR': 'Solicite ao seu cartório de registro civil ou ao ministério das relações exteriores antes de chegar à Finlândia. A maioria dos países exige apostila e tradução juramentada.',
      'zh-CN': '请在抵达芬兰前向本国的户籍登记机关或外交部申请。多数国家要求附加海牙认证（Apostille）及宣誓翻译。',
      ko: '핀란드 도착 전에 본국의 등록 기관이나 외교부에 신청하세요. 대부분의 국가에서 아포스티유와 선서 번역이 필요합니다.',
      fr: 'Demandez-le auprès de votre état civil ou de votre ministère des Affaires étrangères avant d’arriver en Finlande. La plupart des pays exigent une apostille et une traduction assermentée.',
      it: 'Richiedilo all’ufficio di stato civile o al ministero degli esteri del tuo Paese prima di arrivare in Finlandia. La maggior parte dei Paesi richiede apostille e traduzione giurata.',
      nl: 'Vraag het aan bij je burgerlijke stand of ministerie van Buitenlandse Zaken voordat je in Finland aankomt. De meeste landen vereisen een apostille en een beëdigde vertaling.', sv: 'Request from your home registrar or foreign ministry before arriving in Finland. Most countries require an apostille stamp and a sworn translation.',
    },
    link: { url: 'https://dvv.fi/en/a-certificate-of-the-right-granted-by-the-finnish-legislation-to-enter-a-marriage-in-a-foreign-country', label: 'DVV: Certificate of right to marry' },
  },
  {
    n: 3,
    t: {
      fi: 'Valitse vihkijä',
      en: 'Choose your officiant',
      de: 'Wählen Sie Ihren Trauredner',
      ja: '婚姻執行者を選ぶ',
      es: 'Elige a tu oficiante',
      'pt-BR': 'Escolha o seu celebrante',
      'zh-CN': '选择你的主婚人',
      ko: '주례를 선택하세요',
      fr: 'Choisissez votre officiant',
      it: 'Scegli il tuo celebrante',
      nl: 'Kies je voltrekker', sv: 'Choose your officiant',
    },
    p: {
      fi: 'Siviilivihkimys on yleisin: kunnan vihkijä Rovaniemellä, Inarissa, Kittilässä tai Sodankylässä. Englanninkielinen vihkijä järjestyy yleensä suunnittelijan kautta. Kirkollinen vihkimys vain ev.lut. kirkkoon kuuluville.',
      en: 'Civil ceremony is most common: a municipal officiant in Rovaniemi, Inari, Kittilä or Sodankylä. An English-speaking officiant is usually arranged by your planner. Religious ceremony only for members of the Lutheran Church.',
      de: 'Die standesamtliche Trauung ist am häufigsten: ein kommunaler Trauredner in Rovaniemi, Inari, Kittilä oder Sodankylä. Einen englischsprachigen Trauredner organisiert meist Ihr Planer. Eine kirchliche Trauung nur für Mitglieder der evangelisch-lutherischen Kirche.',
      ja: '最も一般的なのは民事婚です。ロヴァニエミ、イナリ、キッティラ、ソダンキュラの自治体婚姻執行者が担当します。英語を話す執行者は通常プランナーが手配します。教会婚は福音ルーテル教会の信者のみ。',
      es: 'La ceremonia civil es la más habitual: un oficiante municipal en Rovaniemi, Inari, Kittilä o Sodankylä. El oficiante anglófono suele gestionarlo tu organizador. La ceremonia religiosa solo para miembros de la Iglesia luterana.',
      'pt-BR': 'A cerimônia civil é a mais comum: um celebrante municipal em Rovaniemi, Inari, Kittilä ou Sodankylä. O celebrante que fala inglês costuma ser providenciado pelo seu planejador. Cerimônia religiosa apenas para membros da Igreja Luterana.',
      'zh-CN': '世俗仪式最为常见：由罗瓦涅米、伊纳里、基蒂莱或索丹屈莱的市政主婚人主持。讲英语的主婚人通常由策划师安排。宗教仪式仅限信义会（路德宗）成员。',
      ko: '민사 예식이 가장 일반적입니다: 로바니에미, 이나리, 키틸레, 소단퀼래의 지자체 주례가 진행합니다. 영어가 가능한 주례는 보통 플래너가 섭외합니다. 종교 예식은 루터교회 신자만 가능합니다.',
      fr: 'La cérémonie civile est la plus courante : un officiant municipal à Rovaniemi, Inari, Kittilä ou Sodankylä. L’officiant anglophone est généralement organisé par votre organisateur. Cérémonie religieuse réservée aux membres de l’Église luthérienne.',
      it: 'La cerimonia civile è la più comune: un celebrante comunale a Rovaniemi, Inari, Kittilä o Sodankylä. Il celebrante anglofono è di solito organizzato dal tuo planner. Cerimonia religiosa solo per i membri della Chiesa luterana.',
      nl: 'De burgerlijke ceremonie is het meest gangbaar: een gemeentelijke voltrekker in Rovaniemi, Inari, Kittilä of Sodankylä. Een Engelstalige voltrekker wordt meestal door je planner geregeld. Een kerkelijke ceremonie alleen voor leden van de Lutherse Kerk.', sv: 'Civil ceremony is most common: a municipal officiant in Rovaniemi, Inari, Kittilä or Sodankylä. An English-speaking officiant is usually arranged by your planner. Religious ceremony only for members of the Lutheran Church.',
    },
  },
  {
    n: 4,
    t: {
      fi: 'Hae 2 todistajaa',
      en: 'Get 2 witnesses',
      de: 'Besorgen Sie 2 Trauzeugen',
      ja: '証人を2名手配する',
      es: 'Consigue 2 testigos',
      'pt-BR': 'Providencie 2 testemunhas',
      'zh-CN': '安排2名证婚人',
      ko: '증인 2명을 준비하세요',
      fr: 'Trouvez 2 témoins',
      it: 'Procurati 2 testimoni',
      nl: 'Regel 2 getuigen', sv: 'Get 2 witnesses',
    },
    p: {
      fi: 'Suomen laki vaatii kaksi todistajaa. Useimmat venuet ja suunnittelijat järjestävät heidät paikan päältä. Ei vaadi suomalaisia.',
      en: 'Finnish law requires two witnesses. Most venues and planners arrange them on site. They do not need to be Finnish.',
      de: 'Das finnische Recht verlangt zwei Trauzeugen. Die meisten Locations und Planer stellen sie vor Ort. Sie müssen keine Finnen sein.',
      ja: 'フィンランドの法律では証人が2名必要です。ほとんどの会場やプランナーが現地で手配します。国籍がフィンランドである必要はありません。',
      es: 'La ley finlandesa exige dos testigos. La mayoría de los espacios y organizadores los proporcionan in situ; no es necesario que sean finlandeses.',
      'pt-BR': 'A lei finlandesa exige duas testemunhas. A maioria dos locais e planejadores as providencia no local. Não precisam ser finlandesas.',
      'zh-CN': '芬兰法律要求两名证婚人。多数场地和策划师可在现场安排，无需是芬兰人。',
      ko: '핀란드 법은 증인 2명을 요구합니다. 대부분의 베뉴와 플래너가 현장에서 마련하며, 핀란드인일 필요는 없습니다.',
      fr: 'La loi finlandaise exige deux témoins. La plupart des lieux et organisateurs les fournissent sur place. Ils n’ont pas besoin d’être finlandais.',
      it: 'La legge finlandese richiede due testimoni. La maggior parte delle location e dei planner li fornisce in loco. Non devono essere finlandesi.',
      nl: 'De Finse wet vereist twee getuigen. De meeste locaties en planners regelen ze ter plaatse. Ze hoeven niet Fins te zijn.', sv: 'Finnish law requires two witnesses. Most venues and planners arrange them on site. They do not need to be Finnish.',
    },
  },
  {
    n: 5,
    t: {
      fi: 'Vihkiminen + 2 todistuskappaletta',
      en: 'Wedding day + 2 marriage certificates',
      de: 'Hochzeitstag + 2 Eheurkunden',
      ja: '挙式＋婚姻証明書2通',
      es: 'Día de la boda + 2 certificados de matrimonio',
      'pt-BR': 'Dia do casamento + 2 certidões de casamento',
      'zh-CN': '婚礼当天+2份结婚证书',
      ko: '결혼식 당일 + 혼인 증명서 2부',
      fr: 'Jour du mariage + 2 actes de mariage',
      it: 'Giorno delle nozze + 2 certificati di matrimonio',
      nl: 'Trouwdag + 2 huwelijksakten', sv: 'Wedding day + 2 marriage certificates',
    },
    p: {
      fi: 'Saat 2 virallista vihkimistodistusta englanniksi. Apostille-leima nopeasti DVV:n kautta, kotimaata varten useimmissa tapauksissa.',
      en: 'You receive 2 official marriage certificates in English. Apostille via DVV is fast, required by most home countries.',
      de: 'Sie erhalten 2 offizielle Eheurkunden auf Englisch. Die Apostille über das DVV geht schnell, in den meisten Heimatländern erforderlich.',
      ja: '英語の公式な婚姻証明書を2通受け取ります。DVV経由のアポスティーユは迅速で、多くの母国で必要とされます。',
      es: 'Recibes 2 certificados de matrimonio oficiales en inglés. La apostilla a través del DVV es rápida y la exigen la mayoría de los países de origen.',
      'pt-BR': 'Você recebe 2 certidões de casamento oficiais em inglês. A apostila pelo DVV é rápida, exigida pela maioria dos países de origem.',
      'zh-CN': '你将获得2份英文正式结婚证书。通过DVV办理海牙认证（Apostille）快速便捷，多数原籍国均要求此项认证。',
      ko: '영어로 된 공식 혼인 증명서 2부를 받습니다. DVV를 통한 아포스티유는 신속하며, 대부분의 본국에서 요구됩니다.',
      fr: 'Vous recevez 2 actes de mariage officiels en anglais. L’apostille via le DVV est rapide, exigée par la plupart des pays d’origine.',
      it: 'Ricevi 2 certificati di matrimonio ufficiali in inglese. L’apostille tramite il DVV è rapida, richiesta dalla maggior parte dei Paesi d’origine.',
      nl: 'Je ontvangt 2 officiële huwelijksakten in het Engels. De apostille via het DVV gaat snel, vereist door de meeste thuislanden.', sv: 'You receive 2 official marriage certificates in English. Apostille via DVV is fast, required by most home countries.',
    },
    link: { url: 'https://um.fi/registration-of-marriage-in-the-population-information-system', label: 'Finnish MFA: Marriage registration' },
  },
  {
    n: 6,
    t: {
      fi: 'Rekisteröi avioliitto kotimaassasi',
      en: 'Register the marriage in your home country',
      de: 'Registrieren Sie die Ehe in Ihrem Heimatland',
      ja: '母国で婚姻を登録する',
      es: 'Registra el matrimonio en tu país de origen',
      'pt-BR': 'Registre o casamento no seu país de origem',
      'zh-CN': '在你的祖国登记婚姻',
      ko: '본국에서 혼인을 등록하세요',
      fr: 'Enregistrez le mariage dans votre pays d’origine',
      it: 'Registra il matrimonio nel tuo Paese d’origine',
      nl: 'Registreer het huwelijk in je thuisland', sv: 'Register the marriage in your home country',
    },
    p: {
      fi: 'Vie todistus apostille-leimalla kotimaasi rekisteriin. EU-maissa yleensä kuukauden sisällä. Tämän jälkeen avioliitto on pätevä globaalisti.',
      en: 'Take the apostilled certificate to your home country’s registry. In EU countries this is usually within a month. The marriage is then globally valid.',
      de: 'Bringen Sie die mit Apostille versehene Urkunde zum Standesamt Ihres Heimatlandes. In EU-Ländern meist innerhalb eines Monats. Danach ist die Ehe weltweit gültig.',
      ja: 'アポスティーユ付きの証明書を母国の登録機関に提出します。EU諸国では通常1か月以内。これにより婚姻は世界的に有効となります。',
      es: 'Lleva el certificado apostillado al registro de tu país de origen. En países de la UE suele ser en un mes. Tras ello, el matrimonio es válido en todo el mundo.',
      'pt-BR': 'Leve a certidão apostilada ao cartório do seu país de origem. Em países da UE costuma levar até um mês. Depois disso, o casamento é válido mundialmente.',
      'zh-CN': '将带海牙认证的证书提交至本国登记机关。欧盟国家通常一个月内完成。此后，该婚姻在全球范围内有效。',
      ko: '아포스티유가 부착된 증명서를 본국 등록 기관에 제출하세요. EU 국가에서는 보통 한 달 이내에 처리됩니다. 이후 혼인은 전 세계적으로 유효합니다.',
      fr: 'Présentez l’acte apostillé au registre de votre pays d’origine. Dans les pays de l’UE, cela prend généralement moins d’un mois. Le mariage est alors valable dans le monde entier.',
      it: 'Porta il certificato con apostille all’anagrafe del tuo Paese d’origine. Nei Paesi UE di solito entro un mese. Dopodiché il matrimonio è valido a livello mondiale.',
      nl: 'Lever de geapostilleerde akte in bij het register van je thuisland. In EU-landen meestal binnen een maand. Daarna is het huwelijk wereldwijd geldig.', sv: 'Take the apostilled certificate to your home country’s registry. In EU countries this is usually within a month. The marriage is then globally valid.',
    },
  },
];

const UI: Record<string, Localized<string>> = {
  seoTitle: {
    fi: 'Häät Lapissa: DVV-paperit ja vihkijä | LaplandWeddings',
    en: 'Getting Married in Lapland: DVV paperwork, officiant, practical guide | LaplandWeddings',
    de: 'Heiraten in Lappland: DVV & Trauredner | LaplandWeddings',
    ja: 'ラップランドで結婚：DVV書類、婚姻執行者、実践ガイド | LaplandWeddings',
    es: 'Casarse en Laponia: trámites DVV | LaplandWeddings',
    'pt-BR': 'Casar na Lapônia: documentação do DVV | LaplandWeddings',
    'zh-CN': '在拉普兰结婚，DVV文书、主婚人、实用指南 | LaplandWeddings',
    ko: '라플란드에서 결혼하기: DVV 서류, 주례, 실용 가이드 | LaplandWeddings',
    fr: 'Se marier en Laponie: démarches DVV | LaplandWeddings',
    it: 'Sposarsi in Lapponia: pratiche DVV | LaplandWeddings',
    nl: 'Trouwen in Lapland: DVV-papierwerk | LaplandWeddings', sv: 'Getting Married in Lapland: DVV paperwork, officiant, practical guide | LaplandWeddings',
  },
  seoDescription: {
    fi: 'Käytännön opas ulkomaalaisille pareille: DVV-paperit, esteiden tutkinta (3–5 vk), todistajat, vihkijä, kotimaan rekisteröinti.',
    en: 'Practical guide for foreign couples: DVV paperwork, examination of impediments (3–5 weeks), witnesses, officiant, home-country registration.',
    de: 'Praktischer Leitfaden für ausländische Paare: DVV-Papiere, Ehefähigkeitsprüfung (3–5 Wochen), Trauzeugen, Trauredner, Registrierung im Heimatland.',
    ja: '外国人カップルのための実践ガイド：DVV書類、婚姻障害の調査（3〜5週間）、証人、婚姻執行者、母国での登録。',
    es: 'Guía práctica para parejas extranjeras: trámites del DVV, examen de impedimentos (3-5 semanas), testigos, oficiante y registro en el país de origen.',
    'pt-BR': 'Guia prático para casais estrangeiros: documentação do DVV, exame de impedimentos (3-5 semanas), testemunhas, celebrante e registro no país de origem.',
    'zh-CN': '面向外籍新人的实用指南：DVV文书、婚姻障碍审查（3–5周）、证婚人、主婚人、原籍国登记。',
    ko: '외국인 커플을 위한 실용 가이드: DVV 서류, 혼인 장애 조사(3~5주), 증인, 주례, 본국 등록.',
    fr: 'Guide pratique pour les couples étrangers : démarches DVV, examen des empêchements (3-5 semaines), témoins, officiant, enregistrement dans le pays d’origine.',
    it: 'Guida pratica per coppie straniere: pratiche DVV, esame degli impedimenti (3-5 settimane), testimoni, celebrante, registrazione nel Paese d’origine.',
    nl: 'Praktische gids voor buitenlandse stellen: DVV-papierwerk, onderzoek naar huwelijksbeletselen (3-5 weken), getuigen, voltrekker, registratie in het thuisland.', sv: 'Practical guide for foreign couples: DVV paperwork, examination of impediments (3–5 weeks), witnesses, officiant, home-country registration.',
  },
  howToName: {
    fi: 'Häät Lapissa: DVV-prosessi',
    en: 'Getting married in Lapland: DVV process',
    de: 'Heiraten in Lappland: DVV-Prozess',
    ja: 'ラップランドで結婚：DVVプロセス',
    es: 'Casarse en Laponia: proceso del DVV',
    'pt-BR': 'Casar na Lapônia: processo do DVV',
    'zh-CN': '在拉普兰结婚，DVV流程',
    ko: '라플란드에서 결혼하기: DVV 절차',
    fr: 'Se marier en Laponie: démarche DVV',
    it: 'Sposarsi in Lapponia: iter DVV',
    nl: 'Trouwen in Lapland: DVV-proces', sv: 'Getting married in Lapland: DVV process',
  },
  eyebrow: {
    fi: 'Teidän häänne Lapissa: käytännön opas',
    en: 'Your wedding in Lapland: practical guide',
    de: 'Ihre Hochzeit in Lappland: praktischer Leitfaden',
    ja: 'ラップランドでの結婚式：実践ガイド',
    es: 'Vuestra boda en Laponia: guía práctica',
    'pt-BR': 'O casamento de vocês na Lapônia: guia prático',
    'zh-CN': '你们的拉普兰婚礼，实用指南',
    ko: '라플란드에서의 두 분의 결혼식: 실용 가이드',
    fr: 'Votre mariage en Laponie: guide pratique',
    it: 'Il vostro matrimonio in Lapponia: guida pratica',
    nl: 'Jullie bruiloft in Lapland: praktische gids', sv: 'Your wedding in Lapland: practical guide',
  },
  heroImageAlt: {
    fi: 'Vihkimisseremonia talvisessa metsässä',
    en: 'Wedding ceremony in winter forest',
    de: 'Trauzeremonie im winterlichen Wald',
    ja: '冬の森でのウェディングセレモニー',
    es: 'Ceremonia nupcial en un bosque invernal',
    'pt-BR': 'Cerimônia de casamento em floresta de inverno',
    'zh-CN': '冬日森林中的婚礼仪式',
    ko: '겨울 숲에서의 결혼식',
    fr: 'Cérémonie de mariage dans une forêt hivernale',
    it: 'Cerimonia nuziale in un bosco invernale',
    nl: 'Huwelijksceremonie in een winters bos', sv: 'Wedding ceremony in winter forest',
  },
  downloadEyebrow: {
    fi: 'Lataa tarkistuslista',
    en: 'Download the checklist',
    de: 'Checkliste herunterladen',
    ja: 'チェックリストをダウンロード',
    es: 'Descarga la lista de verificación',
    'pt-BR': 'Baixe a lista de verificação',
    'zh-CN': '下载清单',
    ko: '체크리스트 다운로드',
    fr: 'Télécharger la check-list',
    it: 'Scarica la checklist',
    nl: 'Download de checklist', sv: 'Download the checklist',
  },
  downloadTitle: {
    fi: 'Yksisivuinen DVV-tarkistuslista PDF:nä',
    en: 'One-page DVV checklist as PDF',
    de: 'Einseitige DVV-Checkliste als PDF',
    ja: '1ページのDVVチェックリスト（PDF）',
    es: 'Lista DVV de una página en PDF',
    'pt-BR': 'Lista de verificação do DVV de uma página em PDF',
    'zh-CN': '一页式DVV清单（PDF）',
    ko: 'PDF로 된 한 장짜리 DVV 체크리스트',
    fr: 'Check-list DVV d’une page en PDF',
    it: 'Checklist DVV di una pagina in PDF',
    nl: 'DVV-checklist van één pagina als pdf', sv: 'One-page DVV checklist as PDF',
  },
  downloadDesc: {
    fi: 'Printtaa tai tallenna matkalle: kaikki vaiheet 8 viikkoa ennen häitä jälkeen vihkimisen.',
    en: 'Print or save for your travel folder: every step from 8 weeks before to after the wedding.',
    de: 'Ausdrucken oder für die Reisemappe speichern: alle Schritte von 8 Wochen vorher bis nach der Hochzeit.',
    ja: '印刷するか旅行用フォルダに保存を：挙式の8週間前から式後までの全ステップ。',
    es: 'Imprímela o guárdala para tu carpeta de viaje: todos los pasos desde 8 semanas antes hasta después de la boda.',
    'pt-BR': 'Imprima ou salve na sua pasta de viagem: todas as etapas, de 8 semanas antes até depois do casamento.',
    'zh-CN': '可打印或保存至出行文件夹，涵盖婚礼前8周直至婚后的每个步骤。',
    ko: '인쇄하거나 여행 폴더에 저장하세요: 결혼식 8주 전부터 식 이후까지 모든 단계.',
    fr: 'Imprimez-la ou enregistrez-la pour votre dossier de voyage: toutes les étapes, de 8 semaines avant jusqu’après le mariage.',
    it: 'Stampala o salvala nella cartella di viaggio: tutti i passaggi, da 8 settimane prima fino a dopo le nozze.',
    nl: 'Print of bewaar voor je reismap: elke stap, van 8 weken vooraf tot na de bruiloft.', sv: 'Print or save for your travel folder: every step from 8 weeks before to after the wedding.',
  },
  downloadOpen: {
    fi: 'Avaa lista',
    en: 'Open the checklist',
    de: 'Checkliste öffnen',
    ja: 'チェックリストを開く',
    es: 'Abrir la lista',
    'pt-BR': 'Abrir a lista',
    'zh-CN': '打开清单',
    ko: '체크리스트 열기',
    fr: 'Ouvrir la check-list',
    it: 'Apri la checklist',
    nl: 'Open de checklist', sv: 'Open the checklist',
  },
  stepsTitle: {
    fi: 'Avioliittolupa Suomessa: 6 vaihetta',
    en: 'Marriage license in Finland: 6 steps',
    de: 'Heiratserlaubnis in Finnland: 6 Schritte',
    ja: 'フィンランドの婚姻許可：6つのステップ',
    es: 'Licencia matrimonial en Finlandia: 6 pasos',
    'pt-BR': 'Licença de casamento na Finlândia: 6 etapas',
    'zh-CN': '芬兰结婚许可，6个步骤',
    ko: '핀란드 혼인 허가: 6단계',
    fr: 'Autorisation de mariage en Finlande: 6 étapes',
    it: 'Licenza di matrimonio in Finlandia: 6 passaggi',
    nl: 'Huwelijksvergunning in Finland: 6 stappen', sv: 'Marriage license in Finland: 6 steps',
  },
  stepsIntro: {
    fi: 'Teidän ja kaikkialla maailmassa pätevän avioliiton välissä on kuusi paperivaihetta; useimmat parit hoitavat ne 4–8 viikossa kaiken muun ohessa.',
    en: 'Six steps of paperwork stand between you and a marriage that is legally valid worldwide; most couples clear them in 4–8 weeks alongside everything else.',
    de: 'Zwischen Ihnen und einer weltweit rechtsgültigen Ehe stehen sechs Schritte Papierkram; die meisten Paare erledigen sie in 4–8 Wochen, neben allem anderen.',
    ja: '世界中で法的に有効な結婚まで、あとは6つの書類手続きだけ。ほとんどのカップルは他の準備と並行して4〜8週間で終えています。',
    es: 'Entre vosotros y un matrimonio con validez legal en todo el mundo hay seis pasos de papeleo; la mayoría de las parejas los resuelve en 4-8 semanas junto con todo lo demás.',
    'pt-BR': 'Entre vocês e um casamento legalmente válido no mundo inteiro há seis etapas de papelada; a maioria dos casais as resolve em 4-8 semanas, junto com todo o resto.',
    'zh-CN': '在你们与一段全球法律有效的婚姻之间，只隔着六步文书手续，大多数新人在4–8周内就能办完，同时兼顾其他筹备。',
    ko: '전 세계에서 법적으로 유효한 결혼까지 남은 것은 여섯 단계의 서류 절차뿐, 대부분의 커플이 다른 준비와 병행해 4~8주 안에 마칩니다.',
    fr: 'Entre vous et un mariage juridiquement valable dans le monde entier, il n’y a que six étapes administratives; la plupart des couples les bouclent en 4 à 8 semaines, en parallèle de tout le reste.',
    it: 'Tra voi e un matrimonio legalmente valido in tutto il mondo ci sono sei passaggi burocratici; la maggior parte delle coppie li completa in 4-8 settimane, insieme a tutto il resto.',
    nl: 'Tussen jullie en een huwelijk dat wereldwijd rechtsgeldig is staan zes stappen papierwerk; de meeste stellen ronden ze in 4-8 weken af, naast al het andere.', sv: 'Six steps of paperwork stand between you and a marriage that is legally valid worldwide; most couples clear them in 4–8 weeks alongside everything else.',
  },
  guestsTitle: {
    fi: 'Vieraat, lennot ja kuka maksaa',
    en: 'Guests, flights and who pays',
    de: 'Gäste, Flüge und wer was bezahlt',
    ja: 'ゲスト、フライト、費用の分担',
    es: 'Invitados, vuelos y quién paga',
    'pt-BR': 'Convidados, voos e quem paga',
    'zh-CN': '宾客、航班与费用分担',
    ko: '하객, 항공편, 비용 부담',
    fr: 'Invités, vols et qui paie quoi',
    it: 'Invitati, voli e chi paga',
    nl: 'Gasten, vluchten en wie wat betaalt', sv: 'Guests, flights and who pays',
  },
  guestsIntro: {
    fi: 'Kolme asiaa, jotka kannattaa päättää ajoissa, ennen kuin kutsut lähtevät.',
    en: 'Three decisions to make early, before the invitations go out.',
    de: 'Drei Entscheidungen, die Sie früh treffen sollten, bevor die Einladungen verschickt werden.',
    ja: '招待状を送る前に、早めに決めておきたい3つのこと。',
    es: 'Tres decisiones que conviene tomar pronto, antes de enviar las invitaciones.',
    'pt-BR': 'Três decisões para tomar cedo, antes de enviar os convites.',
    'zh-CN': '在发出请柬之前，最好尽早做出的三个决定。',
    ko: '청첩장을 보내기 전에 미리 정해 두면 좋은 세 가지.',
    fr: 'Trois décisions à prendre tôt, avant d’envoyer les invitations.',
    it: 'Tre decisioni da prendere presto, prima di spedire gli inviti.',
    nl: 'Drie beslissingen om vroeg te nemen, nog voordat de uitnodigingen de deur uit gaan.', sv: 'Three decisions to make early, before the invitations go out.',
  },
  seasonsTitle: {
    fi: 'Sesongit ja sää',
    en: 'Seasons and weather',
    de: 'Jahreszeiten und Wetter',
    ja: 'シーズンと天候',
    es: 'Temporadas y clima',
    'pt-BR': 'Estações e clima',
    'zh-CN': '季节与天气',
    ko: '시즌과 날씨',
    fr: 'Saisons et météo',
    it: 'Stagioni e clima',
    nl: 'Seizoenen en weer', sv: 'Seasons and weather',
  },
  flightsTitle: {
    fi: 'Lentoyhteydet ja saavutettavuus',
    en: 'Flights and accessibility',
    de: 'Flugverbindungen und Erreichbarkeit',
    ja: 'フライトとアクセス',
    es: 'Vuelos y accesibilidad',
    'pt-BR': 'Voos e acessibilidade',
    'zh-CN': '航班与可达性',
    ko: '항공편과 접근성',
    fr: 'Vols et accessibilité',
    it: 'Voli e accessibilità',
    nl: 'Vluchten en bereikbaarheid', sv: 'Flights and accessibility',
  },
  carTitle: {
    fi: 'Autovuokraus ja kuljetukset',
    en: 'Car rental and transfers',
    de: 'Mietwagen und Transfers',
    ja: 'レンタカーと送迎',
    es: 'Alquiler de coches y traslados',
    'pt-BR': 'Aluguel de carro e traslados',
    'zh-CN': '租车与接送',
    ko: '렌터카 및 이동 서비스',
    fr: 'Location de voiture et transferts',
    it: 'Noleggio auto e transfer',
    nl: 'Autohuur en transfers', sv: 'Car rental and transfers',
  },
  carBody: {
    fi: 'Vuokraa auto suoraan Rovaniemen, Kittilän tai Ivalon lentokentältä. Verkostomme oma laplandcarrental.com tarjoaa hinnat ja varaukset suomeksi ja englanniksi.',
    en: 'Rent a car directly from Rovaniemi, Kittilä or Ivalo airport. Our network site laplandcarrental.com offers pricing and reservations in Finnish and English.',
    de: 'Mieten Sie ein Auto direkt am Flughafen Rovaniemi, Kittilä oder Ivalo. Unsere Netzwerkseite laplandcarrental.com bietet Preise und Buchungen auf Finnisch und Englisch.',
    ja: 'ロヴァニエミ、キッティラ、イヴァロの各空港で直接レンタカーを。ネットワークサイトlaplandcarrental.comが、フィンランド語と英語で料金と予約を提供します。',
    es: 'Alquila un coche directamente en el aeropuerto de Rovaniemi, Kittilä o Ivalo: nuestro sitio de la red, laplandcarrental.com, ofrece precios y reservas en finés e inglés.',
    'pt-BR': 'Alugue um carro diretamente no aeroporto de Rovaniemi, Kittilä ou Ivalo. O site da nossa rede, laplandcarrental.com, oferece preços e reservas em finlandês e inglês.',
    'zh-CN': '可直接在罗瓦涅米、基蒂莱或伊瓦洛机场租车，我们旗下网站laplandcarrental.com提供芬兰语和英语的报价与预订。',
    ko: '로바니에미, 키틸레, 이발로 공항에서 바로 차를 빌리세요. 네트워크 사이트 laplandcarrental.com에서 핀란드어와 영어로 요금과 예약을 제공합니다.',
    fr: 'Louez une voiture directement à l’aéroport de Rovaniemi, Kittilä ou Ivalo. Notre site du réseau laplandcarrental.com propose tarifs et réservations en finnois et en anglais.',
    it: 'Noleggia un’auto direttamente dall’aeroporto di Rovaniemi, Kittilä o Ivalo. Il sito della nostra rete laplandcarrental.com offre prezzi e prenotazioni in finlandese e inglese.',
    nl: 'Huur een auto direct op de luchthaven van Rovaniemi, Kittilä of Ivalo. Onze netwerksite laplandcarrental.com biedt prijzen en reserveringen in het Fins en Engels.', sv: 'Rent a car directly from Rovaniemi, Kittilä or Ivalo airport. Our network site laplandcarrental.com offers pricing and reservations in Finnish and English.',
  },
  flightsFromLondon: {
    fi: 'Etsi lentoja Lontoosta (Trip.com)',
    en: 'Find flights from London (Trip.com)',
    de: 'Flüge ab London suchen (Trip.com)',
    ja: 'ロンドン発の航空券を探す（Trip.com）',
    es: 'Buscar vuelos desde Londres (Trip.com)',
    'pt-BR': 'Buscar voos de Londres (Trip.com)',
    'zh-CN': '查找从伦敦出发的航班（Trip.com）',
    ko: '런던발 항공편 찾기(Trip.com)',
    fr: 'Trouver des vols depuis Londres (Trip.com)',
    it: 'Cerca voli da Londra (Trip.com)',
    nl: 'Zoek vluchten vanuit Londen (Trip.com)', sv: 'Find flights from London (Trip.com)',
  },
  flightsFromHelsinki: {
    fi: 'Etsi lentoja Helsingistä (Trip.com)',
    en: 'Find flights from Helsinki (Trip.com)',
    de: 'Flüge ab Helsinki suchen (Trip.com)',
    ja: 'ヘルシンキ発の航空券を探す（Trip.com）',
    es: 'Buscar vuelos desde Helsinki (Trip.com)',
    'pt-BR': 'Buscar voos de Helsinque (Trip.com)',
    'zh-CN': '查找从赫尔辛基出发的航班（Trip.com）',
    ko: '헬싱키발 항공편 찾기(Trip.com)',
    fr: 'Trouver des vols depuis Helsinki (Trip.com)',
    it: 'Cerca voli da Helsinki (Trip.com)',
    nl: 'Zoek vluchten vanuit Helsinki (Trip.com)', sv: 'Find flights from Helsinki (Trip.com)',
  },
};

interface GuestCard {
  icon: LucideIcon;
  t: Localized<string>;
  p: Localized<string>;
}

/** "Guests, flights and who pays" — clarifies the service split: the wedding
    is our package, flights/hotels are booked separately (we don't sell
    flights), and couples decide early who pays for what. Localised ×11. */
const GUEST_CARDS: GuestCard[] = [
  {
    icon: Package,
    t: {
      fi: 'Häät ovat oma pakettinsa',
      en: 'The wedding is its own package',
      de: 'Die Hochzeit ist ein eigenes Paket',
      ja: '結婚式はそれ自体がひとつのパッケージ',
      es: 'La boda es un paquete aparte',
      'pt-BR': 'O casamento é um pacote à parte',
      'zh-CN': '婚礼是独立打包的服务',
      ko: '웨딩은 하나의 독립된 패키지입니다',
      fr: 'Le mariage est un forfait à part',
      it: 'Il matrimonio è un pacchetto a sé',
      nl: 'De bruiloft is een eigen pakket', sv: 'The wedding is its own package',
    },
    p: {
      fi: 'Me suunnittelemme ja hinnoittelemme itse häät: vihkimisen, paikan, ohjelman ja toimittajat. Lennot ja hotellihuoneet varataan erikseen, yleensä jo ennen kuin hääsuunnittelu alkaa. Emme myy lentoja; kerromme, mitä varata ja milloin.',
      en: 'We plan and price the wedding itself: ceremony, venue, programme, vendors. Flights and hotel rooms are booked separately, usually before the wedding planning even starts. We don’t sell flights; we tell you what to book and when.',
      de: 'Wir planen und kalkulieren die Hochzeit selbst: Trauung, Location, Programm, Dienstleister. Flüge und Hotelzimmer werden separat gebucht, meist noch bevor die Hochzeitsplanung überhaupt beginnt. Wir verkaufen keine Flüge; wir sagen Ihnen, was Sie wann buchen sollten.',
      ja: '私たちが企画し、料金を提示するのは結婚式そのもの：セレモニー、会場、プログラム、各業者の手配です。フライトとホテルは別途予約で、通常はウェディングの計画が始まる前に手配します。私たちは航空券を販売しません。何をいつ予約すべきかをお伝えします。',
      es: 'Nosotros planificamos y presupuestamos la boda en sí: ceremonia, espacio, programa y proveedores. Los vuelos y las habitaciones de hotel se reservan aparte, normalmente antes incluso de empezar a planificar la boda. No vendemos vuelos; os decimos qué reservar y cuándo.',
      'pt-BR': 'Nós planejamos e orçamos o casamento em si: cerimônia, local, programação e fornecedores. Voos e quartos de hotel são reservados à parte, geralmente antes mesmo de o planejamento do casamento começar. Não vendemos passagens aéreas; dizemos o que reservar e quando.',
      'zh-CN': '我们负责策划并报价婚礼本身，仪式、场地、流程和供应商。机票和酒店客房需另行预订，通常在婚礼策划开始之前就要订好。我们不出售机票，但会告诉你该订什么、何时订。',
      ko: '저희가 기획하고 견적을 내는 것은 결혼식 그 자체입니다: 예식, 베뉴, 프로그램, 업체 섭외. 항공편과 호텔 객실은 별도로 예약하며, 보통 웨딩 플래닝이 시작되기 전에 이루어집니다. 저희는 항공권을 판매하지 않습니다. 무엇을 언제 예약해야 하는지 알려드립니다.',
      fr: 'Nous planifions et chiffrons le mariage lui-même: cérémonie, lieu, programme, prestataires. Les vols et les chambres d’hôtel se réservent à part, souvent avant même le début de l’organisation du mariage. Nous ne vendons pas de vols ; nous vous disons quoi réserver et quand.',
      it: 'Noi progettiamo e quotiamo il matrimonio in sé: cerimonia, location, programma, fornitori. Voli e camere d’albergo si prenotano a parte, di solito ancora prima che inizi l’organizzazione delle nozze. Non vendiamo voli; vi diciamo cosa prenotare e quando.',
      nl: 'Wij plannen en begroten de bruiloft zelf: ceremonie, locatie, programma, leveranciers. Vluchten en hotelkamers boek je apart, meestal nog voordat de bruiloftsplanning begint. Wij verkopen geen vluchten; we vertellen je wat je wanneer moet boeken.', sv: 'We plan and price the wedding itself: ceremony, venue, programme, vendors. Flights and hotel rooms are booked separately, usually before the wedding planning even starts. We don’t sell flights; we tell you what to book and when.',
    },
  },
  {
    icon: Users,
    t: {
      fi: 'Vieraat maksavat yleensä omat matkansa',
      en: 'Guests usually pay their own way',
      de: 'Gäste zahlen ihre Reise meist selbst',
      ja: 'ゲストの旅費は通常自己負担',
      es: 'Los invitados suelen pagar su propio viaje',
      'pt-BR': 'Os convidados costumam pagar a própria viagem',
      'zh-CN': '宾客通常自理旅费',
      ko: '하객은 보통 각자 비용을 부담합니다',
      fr: 'Les invités paient généralement leur voyage',
      it: 'Gli invitati di solito pagano il proprio viaggio',
      nl: 'Gasten betalen meestal hun eigen reis', sv: 'Guests usually pay their own way',
    },
    p: {
      fi: 'Destinaatiohäissä vieraat maksavat tavallisesti omat lentonsa ja majoituksensa. Sano tämä selvästi jo kutsussa. Jos haluatte tarjota osan (vaikkapa hääillallisen ja yhden aktiviteetin), viemme sen budjettiin ensimmäisestä päivästä alkaen.',
      en: 'In destination weddings, guests normally cover their own flights and accommodation. Say this clearly on the invitation. If you want to host some of it (say, the wedding-night dinner and one activity), we put it in the budget from day one.',
      de: 'Bei Hochzeiten im Ausland zahlen die Gäste Flüge und Unterkunft in der Regel selbst. Sagen Sie das klar in der Einladung. Wenn Sie einen Teil übernehmen möchten (etwa das Hochzeitsdinner und eine Aktivität), nehmen wir das von Anfang an ins Budget auf.',
      ja: '海外ウェディングでは、フライトと宿泊は通常ゲストの自己負担です。招待状にはっきり書きましょう。一部をおふたりが負担したい場合（例えば結婚式当日のディナーとアクティビティ1つ）は、初日から予算に組み込みます。',
      es: 'En las bodas de destino, los invitados suelen pagar sus vuelos y su alojamiento: decidlo con claridad en la invitación. Si queréis invitar a una parte (por ejemplo, la cena nupcial y una actividad), lo incluimos en el presupuesto desde el primer día.',
      'pt-BR': 'Em destination weddings, os convidados normalmente pagam os próprios voos e a hospedagem. Deixe isso claro no convite. Se quiserem oferecer uma parte (digamos, o jantar da noite do casamento e uma atividade), colocamos isso no orçamento desde o primeiro dia.',
      'zh-CN': '在目的地婚礼中，宾客一般自付机票和住宿，请在请柬上写清楚这一点。如果你们想承担其中一部分（比如婚礼当晚的晚宴和一项活动），我们会从第一天起就把它列入预算。',
      ko: '데스티네이션 웨딩에서는 하객이 항공편과 숙박을 직접 부담하는 것이 일반적입니다. 청첩장에 이를 분명히 알리세요. 일부를 두 분이 부담하고 싶다면(예: 결혼식 당일 저녁 만찬과 액티비티 하나), 처음부터 예산에 반영해 드립니다.',
      fr: 'Dans un mariage à l’étranger, les invités prennent normalement en charge leurs vols et leur hébergement. Dites-le clairement sur l’invitation. Si vous souhaitez en offrir une partie (par exemple le dîner du soir des noces et une activité), nous l’intégrons au budget dès le premier jour.',
      it: 'Nei matrimoni all’estero gli invitati coprono di norma voli e alloggio. Ditelo chiaramente già nell’invito. Se volete offrirne una parte (ad esempio la cena di nozze e un’attività), la inseriamo nel budget fin dal primo giorno.',
      nl: 'Bij een bruiloft in het buitenland betalen gasten normaal gesproken hun eigen vluchten en verblijf. Zeg dat duidelijk in de uitnodiging. Wil je een deel aanbieden (bijvoorbeeld het bruiloftsdiner en één activiteit), dan zetten we dat vanaf dag één in het budget.', sv: 'In destination weddings, guests normally cover their own flights and accommodation. Say this clearly on the invitation. If you want to host some of it (say, the wedding-night dinner and one activity), we put it in the budget from day one.',
    },
  },
  {
    icon: Palette,
    t: {
      fi: 'Teema ja ilme, jos haluatte',
      en: 'Theme and look, if you want',
      de: 'Thema und Look, wenn Sie möchten',
      ja: 'ご希望ならテーマと装飾も',
      es: 'Tema y estética, si queréis',
      'pt-BR': 'Tema e estilo, se vocês quiserem',
      'zh-CN': '主题与整体风格（如你们需要）',
      ko: '원하시면 테마와 연출까지',
      fr: 'Thème et ambiance, si vous le souhaitez',
      it: 'Tema e stile, se lo desiderate',
      nl: 'Thema en stijl, als je dat wilt', sv: 'Theme and look, if you want',
    },
    p: {
      fi: 'Halutessanne suunnittelemme kanssanne myös teeman, värit, kukat, kattauksen ja ohjelman kaaren, niin että koko viikonloppu tuntuu yhdeltä tarinalta eikä varauslistalta.',
      en: 'If you want, we also design the theme with you, colours, flowers, table setting, programme arc, so the whole weekend feels like one story instead of a list of bookings.',
      de: 'Auf Wunsch gestalten wir mit Ihnen auch das Thema, Farben, Blumen, Tischdekoration, den Bogen des Programms, damit sich das ganze Wochenende wie eine Geschichte anfühlt und nicht wie eine Buchungsliste.',
      ja: 'ご希望であれば、テーマづくりもご一緒します：色、花、テーブルコーディネート、プログラムの流れまで。週末全体が予約の羅列ではなく、ひとつの物語のように感じられます。',
      es: 'Si queréis, también diseñamos el tema con vosotros: colores, flores, montaje de mesa, hilo del programa; para que todo el fin de semana se sienta como una sola historia y no como una lista de reservas.',
      'pt-BR': 'Se quiserem, também criamos o tema com vocês, cores, flores, decoração da mesa, o arco da programação, para que o fim de semana inteiro pareça uma história só, e não uma lista de reservas.',
      'zh-CN': '如果你们愿意，我们还可以一起设计婚礼主题，配色、花艺、餐桌布置、流程节奏，让整个周末像一个完整的故事，而不是一串预订清单。',
      ko: '원하신다면 테마 디자인도 함께합니다, 색감, 꽃, 테이블 세팅, 프로그램의 흐름까지, 주말 전체가 예약 목록이 아니라 하나의 이야기처럼 느껴지도록.',
      fr: 'Si vous le souhaitez, nous concevons aussi le thème avec vous, couleurs, fleurs, art de la table, fil du programme, pour que tout le week-end ressemble à une seule histoire plutôt qu’à une liste de réservations.',
      it: 'Se volete, disegniamo con voi anche il tema, colori, fiori, mise en place, arco del programma, così l’intero weekend sembra un’unica storia e non un elenco di prenotazioni.',
      nl: 'Als je wilt, ontwerpen we samen ook het thema, kleuren, bloemen, tafelstyling, de opbouw van het programma, zodat het hele weekend als één verhaal voelt in plaats van een lijst boekingen.', sv: 'If you want, we also design the theme with you, colours, flowers, table setting, programme arc, so the whole weekend feels like one story instead of a list of bookings.',
    },
  },
];

interface SeasonCard {
  colorClass: string;
  period: Localized<string>;
  body: Localized<string>;
}

/* colorClass is a bg-* class for the small season indicator dot. The old
   text-aurora-* heading colours (gold/caramel on ivory cards) failed WCAG
   contrast (2.2–2.7:1) — accent colour lives in the dot now, heading is ink. */
const SEASONS: SeasonCard[] = [
  {
    colorClass: 'bg-aurora-purple',
    period: {
      fi: 'Joulukuu, maaliskuu',
      en: 'December – March',
      de: 'Dezember – März',
      ja: '12月〜3月',
      es: 'De diciembre a marzo',
      'pt-BR': 'De dezembro a março',
      'zh-CN': '12月–3月',
      ko: '12월 – 3월',
      fr: 'De décembre à mars',
      it: 'Da dicembre a marzo',
      nl: 'December – maart', sv: 'December – March',
    },
    body: {
      fi: 'Peak-sesonki (95 % kysynnästä). Lumi, jää, revontulet. Kaamos joulu–tammikuussa, sininen tunti maaliskuussa.',
      en: 'Peak season (95 % of demand). Snow, ice, Northern Lights. Polar night December–January, blue hour in March.',
      de: 'Hauptsaison (95 % der Nachfrage). Schnee, Eis, Polarlichter. Polarnacht von Dezember bis Januar, blaue Stunde im März.',
      ja: 'ピークシーズン（需要の95%）。雪、氷、オーロラ。極夜は12〜1月、ブルーアワーは3月。',
      es: 'Temporada alta (95 % de la demanda). Nieve, hielo, auroras. Noche polar en diciembre-enero, hora azul en marzo.',
      'pt-BR': 'Alta temporada (95 % da procura). Neve, gelo, auroras. Noite polar em dezembro-janeiro, hora azul em março.',
      'zh-CN': '旺季（占需求的95%）。冰雪与极光。12月至1月为极夜，3月有蓝色时刻。',
      ko: '성수기(수요의 95%). 눈, 얼음, 오로라. 12~1월 극야, 3월 블루아워.',
      fr: 'Haute saison (95 % de la demande). Neige, glace, aurores. Nuit polaire de décembre à janvier, heure bleue en mars.',
      it: 'Alta stagione (95 % della domanda). Neve, ghiaccio, aurore. Notte polare a dicembre-gennaio, ora blu a marzo.',
      nl: 'Hoogseizoen (95 % van de vraag). Sneeuw, ijs, noorderlicht. Poolnacht in december–januari, blauwe uur in maart.', sv: 'Peak season (95 % of demand). Snow, ice, Northern Lights. Polar night December–January, blue hour in March.',
    },
  },
  {
    colorClass: 'bg-aurora-green',
    period: {
      fi: 'Toukokuu, heinäkuu',
      en: 'May – July',
      de: 'Mai – Juli',
      ja: '5月〜7月',
      es: 'De mayo a julio',
      'pt-BR': 'De maio a julho',
      'zh-CN': '5月–7月',
      ko: '5월 – 7월',
      fr: 'De mai à juillet',
      it: 'Da maggio a luglio',
      nl: 'Mei – juli', sv: 'May – July',
    },
    body: {
      fi: 'Keskiyön aurinko 23.5.–24.7. Lämmin (15–25 °C), ei lunta. Hyttyset huipussaan kesäkuussa.',
      en: 'Midnight Sun 23 May – 24 July. Warm (15–25 °C), no snow. Mosquitoes peak in June.',
      de: 'Mitternachtssonne vom 23. Mai bis 24. Juli. Mild (15–25 °C), kein Schnee. Mückenhochsaison im Juni.',
      ja: '白夜は5月23日〜7月24日。温暖（15〜25℃）で雪はなし。蚊は6月がピーク。',
      es: 'Sol de medianoche del 23 de mayo al 24 de julio. Cálido (15-25 °C), sin nieve. Pico de mosquitos en junio.',
      'pt-BR': 'Sol da meia-noite de 23 de maio a 24 de julho. Ameno (15-25 °C), sem neve. Pico de mosquitos em junho.',
      'zh-CN': '午夜阳光为5月23日至7月24日。气候温暖（15–25°C），无积雪。蚊虫在6月达到高峰。',
      ko: '백야는 5월 23일~7월 24일. 온화함(15~25°C), 눈 없음. 모기는 6월에 절정.',
      fr: 'Soleil de minuit du 23 mai au 24 juillet. Doux (15-25 °C), sans neige. Pic de moustiques en juin.',
      it: 'Sole di mezzanotte dal 23 maggio al 24 luglio. Mite (15-25 °C), niente neve. Picco di zanzare a giugno.',
      nl: 'Middernachtzon van 23 mei tot 24 juli. Mild (15-25 °C), geen sneeuw. Muggenpiek in juni.', sv: 'Midnight Sun 23 May – 24 July. Warm (15–25 °C), no snow. Mosquitoes peak in June.',
    },
  },
  {
    colorClass: 'bg-aurora-pink',
    period: {
      fi: 'Syyskuu, lokakuu',
      en: 'September – October',
      de: 'September – Oktober',
      ja: '9月〜10月',
      es: 'De septiembre a octubre',
      'pt-BR': 'De setembro a outubro',
      'zh-CN': '9月–10月',
      ko: '9월 – 10월',
      fr: 'De septembre à octobre',
      it: 'Da settembre a ottobre',
      nl: 'September – oktober', sv: 'September – October',
    },
    body: {
      fi: 'Ruskakausi syyskuun puolivälissä, Lapin värikkäin aika. Revontulet alkavat näkyä lokakuussa.',
      en: 'Ruska (autumn colours) in mid-September, Lapland’s most colourful time. Northern Lights start showing in October.',
      de: 'Ruska (Herbstfarben) Mitte September, die farbenfrohste Zeit Lapplands. Polarlichter erscheinen ab Oktober.',
      ja: '9月中旬の紅葉（ルスカ）、ラップランドで最も色彩豊かな時期。オーロラは10月から見え始めます。',
      es: 'La ruska (colores otoñales) a mediados de septiembre: la época más colorida de Laponia. Las auroras empiezan a verse en octubre.',
      'pt-BR': 'A ruska (cores de outono) em meados de setembro, a época mais colorida da Lapônia. As auroras começam a aparecer em outubro.',
      'zh-CN': '九月中旬的秋叶季（ruska），拉普兰色彩最绚烂的时节。极光自10月起开始显现。',
      ko: '9월 중순의 가을 단풍(루스카), 라플란드에서 가장 다채로운 시기. 오로라는 10월부터 보이기 시작합니다.',
      fr: 'La ruska (couleurs d’automne) à la mi-septembre, la période la plus colorée de Laponie. Les aurores commencent à apparaître en octobre.',
      it: 'La ruska (colori autunnali) a metà settembre, il periodo più colorato della Lapponia. Le aurore iniziano a comparire a ottobre.',
      nl: 'De ruska (herfstkleuren) medio september, de kleurrijkste tijd van Lapland. Het noorderlicht verschijnt vanaf oktober.', sv: 'Ruska (autumn colours) in mid-September, Lapland’s most colourful time. Northern Lights start showing in October.',
    },
  },
];

interface AirportCard {
  code: 'RVN' | 'KTT' | 'IVL';
  name: string;
  body: Localized<string>;
}

const AIRPORTS: AirportCard[] = [
  {
    code: 'RVN',
    name: 'Rovaniemi',
    body: {
      fi: 'Suorat lennot Helsingistä, Lontoosta, Frankfurtista, Pariisista. 10 km keskustaan.',
      en: 'Direct flights from Helsinki, London, Frankfurt, Paris. 10 km to the centre.',
      de: 'Direktflüge aus Helsinki, London, Frankfurt, Paris. 10 km zum Zentrum.',
      ja: 'ヘルシンキ、ロンドン、フランクフルト、パリからの直行便。中心部まで10km。',
      es: 'Vuelos directos desde Helsinki, Londres, Fráncfort y París. A 10 km del centro.',
      'pt-BR': 'Voos diretos de Helsinque, Londres, Frankfurt e Paris. A 10 km do centro.',
      'zh-CN': '从赫尔辛基、伦敦、法兰克福、巴黎直飞。距市中心10公里。',
      ko: '헬싱키, 런던, 프랑크푸르트, 파리에서 직항. 중심부까지 10km.',
      fr: 'Vols directs depuis Helsinki, Londres, Francfort, Paris. À 10 km du centre.',
      it: 'Voli diretti da Helsinki, Londra, Francoforte, Parigi. A 10 km dal centro.',
      nl: 'Rechtstreekse vluchten vanuit Helsinki, Londen, Frankfurt, Parijs. 10 km tot het centrum.', sv: 'Direct flights from Helsinki, London, Frankfurt, Paris. 10 km to the centre.',
    },
  },
  {
    code: 'KTT',
    name: 'Kittilä',
    body: {
      fi: 'Suorat lennot Helsingistä, Lontoosta, Manchesterista, Birminghamista. 14 km Leville.',
      en: 'Direct flights from Helsinki, London, Manchester, Birmingham. 14 km to Levi.',
      de: 'Direktflüge aus Helsinki, London, Manchester, Birmingham. 14 km nach Levi.',
      ja: 'ヘルシンキ、ロンドン、マンチェスター、バーミンガムからの直行便。レヴィまで14km。',
      es: 'Vuelos directos desde Helsinki, Londres, Mánchester y Birmingham. A 14 km de Levi.',
      'pt-BR': 'Voos diretos de Helsinque, Londres, Manchester e Birmingham. A 14 km de Levi.',
      'zh-CN': '从赫尔辛基、伦敦、曼彻斯特、伯明翰直飞。距莱维14公里。',
      ko: '헬싱키, 런던, 맨체스터, 버밍엄에서 직항. 레비까지 14km.',
      fr: 'Vols directs depuis Helsinki, Londres, Manchester, Birmingham. À 14 km de Levi.',
      it: 'Voli diretti da Helsinki, Londra, Manchester, Birmingham. A 14 km da Levi.',
      nl: 'Rechtstreekse vluchten vanuit Helsinki, Londen, Manchester, Birmingham. 14 km tot Levi.', sv: 'Direct flights from Helsinki, London, Manchester, Birmingham. 14 km to Levi.',
    },
  },
  {
    code: 'IVL',
    name: 'Ivalo',
    body: {
      fi: 'Suorat lennot Helsingistä. Suomen pohjoisin lentokenttä, 30 km Saariselälle.',
      en: 'Direct flights from Helsinki. Finland’s northernmost airport, 30 km to Saariselkä.',
      de: 'Direktflüge aus Helsinki. Finnlands nördlichster Flughafen, 30 km nach Saariselkä.',
      ja: 'ヘルシンキからの直行便。フィンランド最北の空港で、サーリセルカまで30km。',
      es: 'Vuelos directos desde Helsinki. El aeropuerto más septentrional de Finlandia, a 30 km de Saariselkä.',
      'pt-BR': 'Voos diretos de Helsinque. O aeroporto mais ao norte da Finlândia, a 30 km de Saariselkä.',
      'zh-CN': '从赫尔辛基直飞。芬兰最北的机场，距萨利色尔卡30公里。',
      ko: '헬싱키에서 직항. 핀란드 최북단 공항이며 사리셀카까지 30km.',
      fr: 'Vols directs depuis Helsinki. L’aéroport le plus septentrional de Finlande, à 30 km de Saariselkä.',
      it: 'Voli diretti da Helsinki. L’aeroporto più a nord della Finlandia, a 30 km da Saariselkä.',
      nl: 'Rechtstreekse vluchten vanuit Helsinki. De noordelijkste luchthaven van Finland, 30 km tot Saariselkä.', sv: 'Direct flights from Helsinki. Finland’s northernmost airport, 30 km to Saariselkä.',
    },
  },
];

const FAQ: { q: Localized<string>; a: Localized<string> }[] = [
  {
    q: {
      fi: 'Kuinka kauan DVV:n paperit kestävät ulkomaalaiselle parille?',
      en: 'How long does the DVV paperwork take for a foreign couple?',
      de: 'Wie lange dauert der DVV-Papierkram für ein ausländisches Paar?',
      ja: '外国人カップルの場合、DVVの手続きはどれくらいかかりますか？',
      es: '¿Cuánto tardan los trámites del DVV para una pareja extranjera?',
      'pt-BR': 'Quanto tempo leva a documentação do DVV para um casal estrangeiro?',
      'zh-CN': '外籍新人办理DVV手续需要多久？',
      ko: '외국인 커플의 경우 DVV 서류는 얼마나 걸리나요?',
      fr: 'Combien de temps prennent les démarches DVV pour un couple étranger ?',
      it: 'Quanto tempo richiedono le pratiche DVV per una coppia straniera?',
      nl: 'Hoe lang duurt het DVV-papierwerk voor een buitenlands stel?', sv: 'How long does the DVV paperwork take for a foreign couple?',
    },
    a: {
      fi: '3–5 viikkoa. Suomen kansalaisille 1–2 viikkoa. Aloita prosessi vähintään 2 kuukautta ennen vihkimistä.',
      en: '3–5 weeks. For Finnish citizens, 1–2 weeks. Begin the process at least 2 months before the wedding.',
      de: '3–5 Wochen. Für finnische Staatsbürger 1–2 Wochen. Beginnen Sie den Prozess mindestens 2 Monate vor der Trauung.',
      ja: '3〜5週間。フィンランド国民は1〜2週間。挙式の少なくとも2か月前に手続きを始めてください。',
      es: '3-5 semanas. Para ciudadanos finlandeses, 1-2 semanas. Empezad el proceso al menos 2 meses antes de la boda.',
      'pt-BR': '3-5 semanas. Para cidadãos finlandeses, 1-2 semanas. Comece o processo pelo menos 2 meses antes do casamento.',
      'zh-CN': '3–5周。芬兰公民为1–2周。请至少在婚礼前2个月开始办理。',
      ko: '3~5주. 핀란드 국민은 1~2주. 결혼식 최소 2개월 전에 절차를 시작하세요.',
      fr: '3-5 semaines. Pour les citoyens finlandais, 1-2 semaines. Commencez la démarche au moins 2 mois avant le mariage.',
      it: '3-5 settimane. Per i cittadini finlandesi, 1-2 settimane. Avviate la pratica almeno 2 mesi prima delle nozze.',
      nl: '3-5 weken. Voor Finse staatsburgers 1-2 weken. Begin het proces minstens 2 maanden voor de bruiloft.', sv: '3–5 weeks. For Finnish citizens, 1–2 weeks. Begin the process at least 2 months before the wedding.',
    },
  },
  {
    q: {
      fi: 'Kuinka monta todistajaa Suomen lain mukaan tarvitaan?',
      en: 'How many witnesses does Finnish law require?',
      de: 'Wie viele Trauzeugen verlangt das finnische Recht?',
      ja: 'フィンランドの法律では証人は何名必要ですか？',
      es: '¿Cuántos testigos exige la ley finlandesa?',
      'pt-BR': 'Quantas testemunhas a lei finlandesa exige?',
      'zh-CN': '芬兰法律要求多少名证婚人？',
      ko: '핀란드 법은 증인을 몇 명 요구하나요?',
      fr: 'Combien de témoins la loi finlandaise exige-t-elle ?',
      it: 'Quanti testimoni richiede la legge finlandese?',
      nl: 'Hoeveel getuigen vereist de Finse wet?', sv: 'How many witnesses does Finnish law require?',
    },
    a: {
      fi: 'Tasan kaksi. Useimmat venuet ja suunnittelijat järjestävät heidät paikan päältä. Heidän ei tarvitse olla suomalaisia.',
      en: 'Exactly two. Most venues and planners arrange them on site. They do not need to be Finnish.',
      de: 'Genau zwei. Die meisten Locations und Planer stellen sie vor Ort. Sie müssen keine Finnen sein.',
      ja: 'ちょうど2名です。ほとんどの会場やプランナーが現地で手配します。フィンランド人である必要はありません。',
      es: 'Exactamente dos. La mayoría de los espacios y organizadores los proporcionan in situ; no es necesario que sean finlandeses.',
      'pt-BR': 'Exatamente duas. A maioria dos locais e planejadores as providencia no local. Não precisam ser finlandesas.',
      'zh-CN': '正好两名。多数场地和策划师可在现场安排，无需是芬兰人。',
      ko: '정확히 두 명입니다. 대부분의 베뉴와 플래너가 현장에서 마련하며, 핀란드인일 필요는 없습니다.',
      fr: 'Exactement deux. La plupart des lieux et organisateurs les fournissent sur place. Ils n’ont pas besoin d’être finlandais.',
      it: 'Esattamente due. La maggior parte delle location e dei planner li fornisce in loco. Non devono essere finlandesi.',
      nl: 'Precies twee. De meeste locaties en planners regelen ze ter plaatse. Ze hoeven niet Fins te zijn.', sv: 'Exactly two. Most venues and planners arrange them on site. They do not need to be Finnish.',
    },
  },
  {
    q: {
      fi: 'Onko Suomessa solmittu avioliitto pätevä kotimaassani?',
      en: 'Is a marriage celebrated in Finland valid in my home country?',
      de: 'Ist eine in Finnland geschlossene Ehe in meinem Heimatland gültig?',
      ja: 'フィンランドで挙げた結婚は母国でも有効ですか？',
      es: '¿Es válido en mi país de origen un matrimonio celebrado en Finlandia?',
      'pt-BR': 'Um casamento celebrado na Finlândia é válido no meu país de origem?',
      'zh-CN': '在芬兰缔结的婚姻在我的祖国有效吗？',
      ko: '핀란드에서 한 결혼이 본국에서도 유효한가요?',
      fr: 'Un mariage célébré en Finlande est-il valable dans mon pays d’origine ?',
      it: 'Un matrimonio celebrato in Finlandia è valido nel mio Paese d’origine?',
      nl: 'Is een in Finland voltrokken huwelijk geldig in mijn thuisland?', sv: 'Is a marriage celebrated in Finland valid in my home country?',
    },
    a: {
      fi: 'Kyllä. Saat 2 virallista todistusta englanniksi. Apostille-leima DVV:ltä kotimaata varten useimmissa tapauksissa.',
      en: 'Yes. You receive 2 official certificates in English. Apostille via DVV is required by most home countries, fast to obtain.',
      de: 'Ja. Sie erhalten 2 offizielle Urkunden auf Englisch. Die Apostille über das DVV ist in den meisten Heimatländern erforderlich, schnell zu bekommen.',
      ja: 'はい。英語の公式証明書を2通受け取ります。多くの母国でDVVのアポスティーユが必要で、取得は迅速です。',
      es: 'Sí. Recibes 2 certificados oficiales en inglés. La mayoría de los países de origen exigen la apostilla del DVV, que se obtiene rápido.',
      'pt-BR': 'Sim. Você recebe 2 certidões oficiais em inglês. A maioria dos países de origem exige a apostila do DVV, rápida de obter.',
      'zh-CN': '有效。你将获得2份英文正式证书。多数原籍国要求DVV的海牙认证（Apostille），办理快捷。',
      ko: '네. 영어로 된 공식 증명서 2부를 받습니다. 대부분의 본국에서 DVV 아포스티유를 요구하며, 발급은 빠릅니다.',
      fr: 'Oui. Vous recevez 2 actes officiels en anglais. L’apostille via le DVV est exigée par la plupart des pays d’origine, rapide à obtenir.',
      it: 'Sì. Ricevi 2 certificati ufficiali in inglese. La maggior parte dei Paesi d’origine richiede l’apostille del DVV, veloce da ottenere.',
      nl: 'Ja. Je ontvangt 2 officiële akten in het Engels. De meeste thuislanden vereisen een apostille via het DVV, snel te verkrijgen.', sv: 'Yes. You receive 2 official certificates in English. Apostille via DVV is required by most home countries, fast to obtain.',
    },
  },
  {
    q: {
      fi: 'Mikä on häiden kustannus Lapissa?',
      en: 'How much do Lapland weddings cost?',
      de: 'Wie viel kosten Hochzeiten in Lappland?',
      ja: 'ラップランドの結婚式の費用はどれくらいですか？',
      es: '¿Cuánto cuesta una boda en Laponia?',
      'pt-BR': 'Quanto custa um casamento na Lapônia?',
      'zh-CN': '在拉普兰举办婚礼要花多少钱？',
      ko: '라플란드 결혼식 비용은 얼마인가요?',
      fr: 'Combien coûte un mariage en Laponie ?',
      it: 'Quanto costa un matrimonio in Lapponia?',
      nl: 'Hoeveel kost een bruiloft in Lapland?', sv: 'How much do Lapland weddings cost?',
    },
    a: {
      fi: 'Elopement 1 600–5 000 €, pieni häät 4 500–15 000 €, premium 15 000–40 000 €, luksus jopa 100 000 €.',
      en: 'Elopement €1 600–5 000, small wedding €4 500–15 000, premium €15 000–40 000, luxury up to €100 000.',
      de: 'Elopement 1 600–5 000 €, kleine Hochzeit 4 500–15 000 €, Premium 15 000–40 000 €, Luxus bis zu 100 000 €.',
      ja: 'エロープメント1,600〜5,000ユーロ、小規模な結婚式4,500〜15,000ユーロ、プレミアム15,000〜40,000ユーロ、ラグジュアリーは最大10万ユーロ。',
      es: 'Elopement 1 600-5 000 €, boda pequeña 4 500-15 000 €, premium 15 000-40 000 €, lujo hasta 100 000 €.',
      'pt-BR': 'Elopement € 1 600-5 000, casamento pequeno € 4 500-15 000, premium € 15 000-40 000, luxo até € 100 000.',
      'zh-CN': '私奔婚礼1,600–5,000欧元，小型婚礼4,500–15,000欧元，高端15,000–40,000欧元，奢华可达10万欧元。',
      ko: '엘로프먼트 1,600~5,000유로, 소규모 결혼식 4,500~15,000유로, 프리미엄 15,000~40,000유로, 럭셔리 최대 10만 유로.',
      fr: 'Elopement 1 600-5 000 €, petit mariage 4 500-15 000 €, premium 15 000-40 000 €, luxe jusqu’à 100 000 €.',
      it: 'Elopement 1 600-5 000 €, matrimonio piccolo 4 500-15 000 €, premium 15 000-40 000 €, lusso fino a 100 000 €.',
      nl: 'Elopement € 1 600-5 000, kleine bruiloft € 4 500-15 000, premium € 15 000-40 000, luxe tot € 100 000.', sv: 'Elopement €1 600–5 000, small wedding €4 500–15 000, premium €15 000–40 000, luxury up to €100 000.',
    },
  },
  {
    q: {
      fi: 'Mikä on paras kuukausi Lapin häille?',
      en: 'When is the best month for a Lapland wedding?',
      de: 'Welcher ist der beste Monat für eine Hochzeit in Lappland?',
      ja: 'ラップランドの結婚式に最適な月はいつですか？',
      es: '¿Cuál es el mejor mes para una boda en Laponia?',
      'pt-BR': 'Qual é o melhor mês para um casamento na Lapônia?',
      'zh-CN': '在拉普兰举办婚礼最佳的月份是？',
      ko: '라플란드 결혼식에 가장 좋은 달은 언제인가요?',
      fr: 'Quel est le meilleur mois pour un mariage en Laponie ?',
      it: 'Qual è il mese migliore per un matrimonio in Lapponia?',
      nl: 'Wat is de beste maand voor een bruiloft in Lapland?', sv: 'When is the best month for a Lapland wedding?',
    },
    a: {
      fi: 'Helmikuu–maaliskuu antaa pisimmät päivät, varmimman lumen ja revontulet. Joulukuu on tunnelmallisin.',
      en: 'February–March offer the longest daylight, the most reliable snow, and the Northern Lights. December is the most atmospheric.',
      de: 'Februar–März bieten die längsten Tage, den zuverlässigsten Schnee und Polarlichter. Der Dezember ist am stimmungsvollsten.',
      ja: '2月〜3月は日照が最も長く、雪が最も確実で、オーロラも見られます。12月は最も情緒があります。',
      es: 'Febrero-marzo ofrecen los días más largos, la nieve más fiable y las auroras. Diciembre es el más atmosférico.',
      'pt-BR': 'Fevereiro-março oferecem os dias mais longos, a neve mais garantida e as auroras. Dezembro é o mais atmosférico.',
      'zh-CN': '2月至3月白昼最长、积雪最可靠，且可见极光。12月最具氛围感。',
      ko: '2월~3월은 낮이 가장 길고 눈이 가장 확실하며 오로라를 볼 수 있습니다. 12월은 가장 분위기 있는 달입니다.',
      fr: 'Février-mars offrent les journées les plus longues, la neige la plus fiable et les aurores. Décembre est le plus féerique.',
      it: 'Febbraio-marzo offrono le giornate più lunghe, la neve più affidabile e le aurore. Dicembre è il più suggestivo.',
      nl: 'Februari-maart bieden de langste daglichturen, de betrouwbaarste sneeuw en het noorderlicht. December is het sfeervolst.', sv: 'February–March offer the longest daylight, the most reliable snow, and the Northern Lights. December is the most atmospheric.',
    },
  },
];

export default function PracticalGuide() {
  const { lang, tr } = useLang();
  const pl = (m: Localized<string>) => pickLocalized(m, lang as Lang);

  return (
    <>
      <SEO
        title={pl(UI.seoTitle)}
        description={pl(UI.seoDescription)}
        path="/practical-guide"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'HowTo',
              name: pl(UI.howToName),
              step: STEPS.map((s) => ({ '@type': 'HowToStep', name: pl(s.t), text: pl(s.p) })),
            },
            {
              '@type': 'FAQPage',
              mainEntity: FAQ.map((f) => ({
                '@type': 'Question',
                name: pl(f.q),
                acceptedAnswer: { '@type': 'Answer', text: pl(f.a) },
              })),
            },
          ],
        }}
      />
      <PageHero
        compact
        eyebrow={pl(UI.eyebrow)}
        title={tr.practical.title}
        subtitle={tr.practical.subtitle}
        image="/images/heroes/practical-guide-hero.webp"
        imageAlt={pl(UI.heroImageAlt)}
      />

      <Section className="bg-gradient-to-br from-aurora-purple/10 via-rose/10 to-aurora-pink/10">
        <div className="max-w-3xl mx-auto bg-night-light/60 border border-rose/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
          <Download className="w-10 h-10 text-rose flex-shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-aurora-pink font-semibold mb-1">{pl(UI.downloadEyebrow)}</p>
            <p className="text-white font-semibold text-lg mb-1">{pl(UI.downloadTitle)}</p>
            {/* gray-300 (stone #5A4F48) not gray-400 (#8B7E73, 3.7:1) on ivory — AA */}
            <p className="text-sm text-gray-300">{pl(UI.downloadDesc)}</p>
          </div>
          <L
            to="/checklist/dvv-foreign-couples"
            className="inline-flex items-center gap-2 bg-rose hover:bg-pink text-white font-semibold px-5 py-3 rounded-full whitespace-nowrap shadow-lg shadow-rose/30"
          >
            {pl(UI.downloadOpen)} →
          </L>
        </div>
      </Section>

      <Section title={pl(UI.stepsTitle)} subtitle={pl(UI.stepsIntro)}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-night-light/60 border border-white/5 rounded-2xl p-6 flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose/20 border border-rose/40 text-rose font-heading text-xl flex items-center justify-center">{s.n}</div>
              <div>
                <h3 className="font-heading text-xl text-white mb-2 tracking-wide">{pl(s.t)}</h3>
                <p className="text-gray-300 leading-relaxed mb-2">{pl(s.p)}</p>
                {s.link && (
                  <a href={s.link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-aurora-pink hover:underline">
                    {s.link.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Guests, flights and who pays — the wedding is our package; flights
          and hotels are booked separately (we don't sell flights). */}
      <Section
        className="bg-gradient-to-br from-aurora-purple/10 via-rose/10 to-aurora-pink/10"
        title={pl(UI.guestsTitle)}
        subtitle={pl(UI.guestsIntro)}
      >
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {GUEST_CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-full bg-rose/20 border border-rose/40 text-aurora-pink flex items-center justify-center mb-4" aria-hidden="true">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-xl text-white mb-2 tracking-wide">{pl(c.t)}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{pl(c.p)}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-night-light/20" title={pl(UI.seasonsTitle)}>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {SEASONS.map((s) => (
            <div key={s.colorClass} className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
              {/* Heading in dark ink for contrast; season accent lives in the dot. */}
              <p className="font-heading text-xl mb-2 text-night flex items-center gap-2.5">
                <span aria-hidden="true" className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.colorClass}`} />
                {pl(s.period)}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">{pl(s.body)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={pl(UI.flightsTitle)}>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {AIRPORTS.map((ap) => (
            <div key={ap.code} className="bg-night-light/60 border border-white/5 rounded-2xl p-6 flex flex-col">
              <p className="font-heading text-xl text-white mb-2">{ap.name} ({ap.code})</p>
              <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-1">{pl(ap.body)}</p>
              <div className="flex flex-col gap-2">
                <a href={tripToLapland('LHR', ap.code)} target="_blank" rel={AFFILIATE_REL} className="text-xs text-aurora-pink hover:underline">
                  {pl(UI.flightsFromLondon)} →
                </a>
                <a href={tripToLapland('HEL', ap.code)} target="_blank" rel={AFFILIATE_REL} className="text-xs text-aurora-pink hover:underline">
                  {pl(UI.flightsFromHelsinki)} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Visible FAQ — mirrors the FAQPage JSON-LD above (schema must not
          exist without matching on-page content). Per-answer links point to
          the pages that back each answer (Vesa 2026-07-07); labels reuse
          existing translated copy. "FAQ" is used as a literal across the
          network's locales. */}
      <Section title="FAQ">
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ.map((f, faqIndex) => (
            <details
              key={faqIndex}
              className="group bg-night-light/60 border border-white/5 rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 text-white font-semibold text-base sm:text-lg [&::-webkit-details-marker]:hidden">
                {pl(f.q)}
                <span aria-hidden="true" className="shrink-0 text-rose transition-transform duration-200 group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 -mt-1">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{pl(f.a)}</p>
                {faqIndex === 0 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                    <L to="/checklist/dvv-foreign-couples" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-aurora-pink hover:text-white transition-colors">
                      {pl(UI.downloadTitle)} →
                    </L>
                  </div>
                )}
                {faqIndex === 3 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                    <L to="/pricing" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-aurora-pink hover:text-white transition-colors">
                      {tr.nav.pricing} →
                    </L>
                  </div>
                )}
                {faqIndex === 4 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                    <L to="/wedding-types" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-aurora-pink hover:text-white transition-colors">
                      {tr.nav.types} →
                    </L>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/20" title={pl(UI.carTitle)}>
        <div className="max-w-3xl mx-auto bg-night-light/60 border border-white/5 rounded-2xl p-7 text-center">
          <p className="text-gray-300 leading-relaxed mb-5">{pl(UI.carBody)}</p>
          <a
            href={carRentalLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-lg shadow-rose/30 transition-colors"
          >
            laplandcarrental.com →
          </a>
        </div>
        <div className="mt-10">
          <AffiliateDisclosure />
        </div>
      </Section>
    </>
  );
}
