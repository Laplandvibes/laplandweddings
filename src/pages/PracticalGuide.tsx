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
      de: 'Beantragen Sie die Ehefähigkeitsprüfung bei der DVV',
      ja: 'DVVに婚姻障害の調査を申請する',
      es: 'Solicita el Examen de Impedimentos al DVV',
      'pt-BR': 'Solicite o Exame de Impedimentos ao DVV',
      'zh-CN': '向DVV申请婚姻障碍审查',
      ko: 'DVV에 혼인 장애 조사를 신청하세요',
      fr: 'Demandez l’examen des empêchements au DVV',
      it: 'Richieda al DVV l’esame degli impedimenti',
      nl: 'Vraag het onderzoek naar huwelijksbeletselen aan bij het DVV', sv: 'Begär hindersprövning från DVV',
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
      it: 'Coppie finlandesi: 1-2 settimane. Coppie straniere: 3-5 settimane. Gratuito (tranne 15 € di traduzione UE se necessaria). La presenti 2 mesi prima delle nozze.',
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
      it: 'Si procuri un certificato di assenza di impedimenti dal Suo Paese',
      nl: 'Haal een verklaring van geen huwelijksbeletsel uit uw thuisland', sv: 'Skaffa ett intyg om att hinder saknas från ditt hemland',
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
      it: 'Lo richieda all’ufficio di stato civile o al ministero degli esteri del Suo Paese prima di arrivare in Finlandia. La maggior parte dei Paesi richiede apostille e traduzione giurata.',
      nl: 'Vraag het aan bij uw burgerlijke stand of ministerie van Buitenlandse Zaken voordat u in Finland aankomt. De meeste landen vereisen een apostille en een beëdigde vertaling.', sv: 'Request from your home registrar or foreign ministry before arriving in Finland. Most countries require an apostille stamp and a sworn translation.',
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
      it: 'Scelga il Suo celebrante',
      nl: 'Kies uw voltrekker', sv: 'Välj vigselförrättare',
    },
    p: {
      fi: 'Siviilivihkimys on yleisin: DVV:n vihkijä Rovaniemellä, Inarissa, Kittilässä tai Sodankylässä. Englanninkielinen vihkijä järjestyy yleensä suunnittelijan kautta. Kirkollinen vihkimys vain rekisteröityyn uskonnolliseen yhdyskuntaan, kuten ev.lut. kirkkoon, kuuluville.',
      en: 'A civil ceremony is the most common: a DVV registrar in Rovaniemi, Inari, Kittilä or Sodankylä. An English-speaking officiant is usually arranged by your planner. A religious ceremony is open only to members of a registered religious community, such as the Lutheran Church.',
      de: 'Die standesamtliche Trauung ist am häufigsten: ein Standesbeamter der DVV in Rovaniemi, Inari, Kittilä oder Sodankylä. Einen englischsprachigen Trauredner organisiert meist Ihr Planer. Eine kirchliche Trauung nur für Mitglieder einer registrierten Religionsgemeinschaft, etwa der evangelisch-lutherischen Kirche.',
      ja: '最も一般的なのは民事婚です。ロヴァニエミ、イナリ、キッティラ、ソダンキュラのDVV(デジタル・人口情報サービス庁)の婚姻執行者が担当します。英語を話す執行者は通常プランナーが手配します。宗教婚は福音ルーテル教会など、登録された宗教団体の信者のみ。',
      es: 'La ceremonia civil es la más habitual: un oficiante del DVV en Rovaniemi, Inari, Kittilä o Sodankylä. El oficiante anglófono suele gestionarlo tu organizador. La ceremonia religiosa solo para miembros de una comunidad religiosa registrada, como la Iglesia luterana.',
      'pt-BR': 'A cerimônia civil é a mais comum: um celebrante do DVV em Rovaniemi, Inari, Kittilä ou Sodankylä. O celebrante que fala inglês costuma ser providenciado pelo seu planejador. Cerimônia religiosa apenas para membros de uma comunidade religiosa registrada, como a Igreja Luterana.',
      'zh-CN': '世俗仪式最为常见：由罗瓦涅米、伊纳里、基蒂莱或索丹屈莱的 DVV 登记官主持。讲英语的主婚人通常由策划师安排。宗教仪式仅限已登记宗教团体（如信义会）的成员。',
      ko: '민사 예식이 가장 일반적입니다: 로바니에미, 이나리, 키틸레, 소단퀼래의 DVV 등록관이 진행합니다. 영어가 가능한 주례는 보통 플래너가 섭외합니다. 종교 예식은 루터교회 등 등록된 종교 단체의 신자만 가능합니다.',
      fr: 'La cérémonie civile est la plus courante : un officier d’état civil du DVV à Rovaniemi, Inari, Kittilä ou Sodankylä. L’officiant anglophone est généralement organisé par votre organisateur. Cérémonie religieuse réservée aux membres d’une communauté religieuse enregistrée, comme l’Église luthérienne.',
      it: 'La cerimonia civile è la più comune: un ufficiale del DVV a Rovaniemi, Inari, Kittilä o Sodankylä. Il celebrante anglofono è di solito organizzato dal Suo planner. Cerimonia religiosa solo per i membri di una comunità religiosa registrata, come la Chiesa luterana.',
      nl: 'De burgerlijke ceremonie is het meest gangbaar: een ambtenaar van de DVV in Rovaniemi, Inari, Kittilä of Sodankylä. Een Engelstalige voltrekker wordt meestal door uw planner geregeld. Een kerkelijke ceremonie alleen voor leden van een geregistreerd kerkgenootschap, zoals de Lutherse Kerk.', sv: 'A civil ceremony is the most common: a DVV registrar in Rovaniemi, Inari, Kittilä or Sodankylä. An English-speaking officiant is usually arranged by your planner. A religious ceremony is open only to members of a registered religious community, such as the Lutheran Church.',
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
      it: 'Si procuri 2 testimoni',
      nl: 'Regel 2 getuigen', sv: 'Ordna 2 vittnen',
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
      nl: 'Trouwdag + 2 huwelijksakten', sv: 'Bröllopsdagen + 2 vigselbevis',
    },
    p: {
      fi: 'Saat 2 virallista vihkimistodistusta englanniksi. Apostille-leima nopeasti DVV:n kautta, kotimaata varten useimmissa tapauksissa.',
      en: 'You receive 2 official marriage certificates in English. An apostille from the DVV is quick to obtain and is required by most home countries.',
      de: 'Sie erhalten 2 offizielle Eheurkunden auf Englisch. Die Apostille über die DVV geht schnell, in den meisten Heimatländern erforderlich.',
      ja: '英語の公式な婚姻証明書を2通受け取ります。DVV経由のアポスティーユは迅速で、多くの母国で必要とされます。',
      es: 'Recibes 2 certificados de matrimonio oficiales en inglés. La apostilla a través del DVV es rápida y la exigen la mayoría de los países de origen.',
      'pt-BR': 'Você recebe 2 certidões de casamento oficiais em inglês. A apostila pelo DVV é rápida, exigida pela maioria dos países de origem.',
      'zh-CN': '你将获得2份英文正式结婚证书。通过DVV办理海牙认证（Apostille）快速便捷，多数原籍国均要求此项认证。',
      ko: '영어로 된 공식 혼인 증명서 2부를 받습니다. DVV를 통한 아포스티유는 신속하며, 대부분의 본국에서 요구됩니다.',
      fr: 'Vous recevez 2 actes de mariage officiels en anglais. L’apostille via le DVV est rapide, exigée par la plupart des pays d’origine.',
      it: 'Riceve 2 certificati di matrimonio ufficiali in inglese. L’apostille tramite il DVV è rapida ed è richiesta dalla maggior parte dei Paesi d’origine.',
      nl: 'U ontvangt 2 officiële huwelijksakten in het Engels. De apostille via het DVV gaat snel, vereist door de meeste thuislanden.', sv: 'You receive 2 official marriage certificates in English. An apostille from the DVV is quick to obtain and is required by most home countries.',
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
      it: 'Registri il matrimonio nel Suo Paese d’origine',
      nl: 'Registreer het huwelijk in uw thuisland', sv: 'Registrera vigseln i ditt hemland',
    },
    p: {
      fi: 'Vie todistus apostille-leimalla kotimaasi rekisteriin. EU-maissa yleensä kuukauden sisällä. Tämän jälkeen avioliitto on kirjattu sekä kotimaassasi että Suomessa.',
      en: 'Take the apostilled certificate to your home country’s registry. In EU countries this is usually within a month. Your marriage is then on record at home as well as in Finland.',
      de: 'Bringen Sie die mit Apostille versehene Urkunde zum Standesamt Ihres Heimatlandes. In EU-Ländern meist innerhalb eines Monats. Danach ist die Ehe sowohl in Ihrem Heimatland als auch in Finnland eingetragen.',
      ja: 'アポスティーユ付きの証明書を母国の登録機関に提出します。EU諸国では通常1か月以内。これで婚姻は母国とフィンランドの双方に記録されます。',
      es: 'Lleva el certificado apostillado al registro de tu país de origen. En países de la UE suele ser en un mes. Tras ello, el matrimonio queda inscrito tanto en tu país como en Finlandia.',
      'pt-BR': 'Leve a certidão apostilada ao cartório do seu país de origem. Em países da UE costuma levar até um mês. Depois disso, o casamento fica registrado tanto no seu país quanto na Finlândia.',
      'zh-CN': '将带海牙认证的证书提交至本国登记机关。欧盟国家通常一个月内完成。此后，该婚姻在本国与芬兰均有登记。',
      ko: '아포스티유가 부착된 증명서를 본국 등록 기관에 제출하세요. EU 국가에서는 보통 한 달 이내에 처리됩니다. 이후 혼인은 본국과 핀란드 양쪽에 기록됩니다.',
      fr: 'Présentez l’acte apostillé au registre de votre pays d’origine. Dans les pays de l’UE, cela prend généralement moins d’un mois. Le mariage est alors enregistré dans votre pays comme en Finlande.',
      it: 'Porti il certificato con apostille all’anagrafe del Suo Paese d’origine. Nei Paesi UE di solito entro un mese. Da quel momento il matrimonio è registrato sia nel Suo Paese sia in Finlandia.',
      nl: 'Lever de geapostilleerde akte in bij het register van uw thuisland. In EU-landen meestal binnen een maand. Daarna is het huwelijk zowel in uw eigen land als in Finland geregistreerd.', sv: 'Take the apostilled certificate to your home country’s registry. In EU countries this is usually within a month. Your marriage is then on record at home as well as in Finland.',
    },
  },
];

const UI: Record<string, Localized<string>> = {
  /* Two-routes block, added 2026-07-28 (Vesa). This page used to open straight
     into the DVV sequence, which told every reader that marrying in Lapland
     means weeks of Finnish paperwork. For most destination couples it does not:
     they hold a symbolic ceremony here and the marriage is legally registered
     at home. The legal route is the premium add-on, not the default. */
  routesTitle: {
    fi: 'Kaksi tapaa mennä naimisiin Lapissa',
    en: 'Two ways to get married in Lapland',
    de: 'Zwei Wege, in Lappland zu heiraten',
    ja: 'ラップランドで結婚する二つの方法',
    es: 'Dos formas de casarse en Laponia',
    'pt-BR': 'Duas formas de se casar na Lapônia',
    'zh-CN': '在拉普兰结婚的两种方式',
    ko: '라플란드에서 결혼하는 두 가지 방법',
    fr: 'Deux façons de se marier en Laponie',
    it: 'Due modi per sposarsi in Lapponia',
    nl: 'Twee manieren om in Lapland te trouwen',
    sv: 'Två sätt att gifta sig i Lappland',
  },
  routesIntro: {
    fi: 'Valinta kannattaa tehdä ensin, koska se ratkaisee tarvitsetteko viranomaispapereita lainkaan.',
    en: 'Make this choice first, because it decides whether you need any official paperwork at all.',
    de: 'Treffen Sie diese Entscheidung zuerst, denn sie bestimmt, ob Sie überhaupt Behördenpapiere brauchen.',
    ja: 'まずこの選択をしてください。役所の手続きが必要かどうかが、ここで決まります。',
    es: 'Tomad primero esta decisión, porque determina si necesitáis algún trámite oficial.',
    'pt-BR': 'Façam essa escolha primeiro, porque ela define se vocês precisam de alguma documentação oficial.',
    'zh-CN': '请先做这个选择，它决定了你们是否需要办理任何官方手续。',
    ko: '이 선택을 먼저 하세요. 관공서 서류가 필요한지 아닌지가 여기서 결정됩니다.',
    fr: 'Faites ce choix en premier : il détermine si vous avez besoin de la moindre formalité officielle.',
    it: 'Faccia prima questa scelta, perché decide se Le serve o meno qualche documento ufficiale.',
    nl: 'Maak deze keuze eerst, want die bepaalt of u überhaupt officieel papierwerk nodig heeft.',
    sv: 'Gör det här valet först, för det avgör om ni behöver några myndighetspapper alls.',
  },
  symbolicTitle: {
    fi: 'Symbolinen seremonia',
    en: 'A symbolic ceremony',
    de: 'Eine freie Trauung',
    ja: 'シンボリック挙式',
    es: 'Ceremonia simbólica',
    'pt-BR': 'Cerimônia simbólica',
    'zh-CN': '象征性仪式',
    ko: '상징 예식',
    fr: 'Une cérémonie symbolique',
    it: 'Una cerimonia simbolica',
    nl: 'Een symbolische ceremonie',
    sv: 'En symbolisk ceremoni',
  },
  symbolicBody: {
    fi: 'Näin tekee suurin osa Lappiin tulevista pareista. Seremonia pidetään jäällä, lumikappelissa tai tunturin laella, ja juridinen avioliitto solmitaan kotimaassa joko ennen matkaa tai sen jälkeen. Lupia, esteiden tutkintaa tai DVV:tä ei tarvita, ja päivämäärän voi lyödä lukkoon milloin vain. Alla oleva vaiheistus ei koske teitä.',
    en: 'This is what most couples coming to Lapland do. The ceremony is held on the ice, in a snow chapel or on a fell top, and the marriage is registered legally at home either before or after the trip. No permits, no examination of impediments, no DVV, and you can fix the date whenever you like. The steps below do not apply to you.',
    de: 'So machen es die meisten Paare, die nach Lappland kommen. Die Zeremonie findet auf dem Eis, in einer Schneekapelle oder auf einem Fjellgipfel statt, die Ehe wird vor oder nach der Reise in der Heimat rechtsgültig geschlossen. Keine Genehmigungen, keine Ehefähigkeitsprüfung, kein DVV, und das Datum können Sie frei festlegen. Die Schritte unten betreffen Sie nicht.',
    ja: 'ラップランドを訪れるカップルの多くがこの形を選びます。式は氷の上、スノーチャペル、あるいは山の頂で行い、法的な婚姻は渡航の前後に母国で成立させます。許可も婚姻障害の調査もDVVも不要で、日程は自由に決められます。以下の手順は該当しません。',
    es: 'Es lo que hace la mayoría de las parejas que vienen a Laponia. La ceremonia se celebra sobre el hielo, en una capilla de nieve o en lo alto de un fell, y el matrimonio se registra legalmente en casa antes o después del viaje. Sin permisos, sin examen de impedimentos, sin DVV, y podéis fijar la fecha cuando queráis. Los pasos de abajo no os afectan.',
    'pt-BR': 'É o que faz a maioria dos casais que vem à Lapônia. A cerimônia acontece no gelo, em uma capela de neve ou no alto de um fell, e o casamento é registrado legalmente em casa antes ou depois da viagem. Sem licenças, sem exame de impedimentos, sem DVV, e vocês marcam a data quando quiserem. Os passos abaixo não se aplicam a vocês.',
    'zh-CN': '来拉普兰的大多数情侣都这样做。仪式在冰面上、雪教堂或山顶举行，法律意义上的结婚则在出行前后于本国登记。无需许可、无需婚姻障碍审查、无需 DVV，日期也可以随意确定。下面的步骤与你们无关。',
    ko: '라플란드를 찾는 대부분의 커플이 택하는 방식입니다. 예식은 얼음 위나 스노우 채플, 또는 펠 정상에서 올리고, 법적 혼인은 여행 전후에 본국에서 신고합니다. 허가도, 혼인 장애 조사도, DVV도 필요 없으며 날짜도 원하는 대로 정할 수 있습니다. 아래 절차는 해당되지 않습니다.',
    fr: 'C’est ce que font la plupart des couples qui viennent en Laponie. La cérémonie a lieu sur la glace, dans une chapelle de neige ou au sommet d’un fell, et le mariage est enregistré légalement dans votre pays avant ou après le voyage. Aucune autorisation, aucun examen des empêchements, aucun DVV, et vous fixez la date quand vous voulez. Les étapes ci-dessous ne vous concernent pas.',
    it: 'È quello che fa la maggior parte delle coppie che viene in Lapponia. La cerimonia si tiene sul ghiaccio, in una cappella di neve o in cima a un fjäll, e il matrimonio viene registrato legalmente a casa prima o dopo il viaggio. Nessun permesso, nessun esame degli impedimenti, nessun DVV, e la data la fissa quando vuole. I passaggi qui sotto non La riguardano.',
    nl: 'Dit doen de meeste paren die naar Lapland komen. De ceremonie is op het ijs, in een sneeuwkapel of op een fjelltop, en het huwelijk wordt voor of na de reis thuis juridisch vastgelegd. Geen vergunningen, geen onderzoek naar huwelijksbeletselen, geen DVV, en de datum kiest u vrij. De stappen hieronder gelden niet voor u.',
    sv: 'Så gör de flesta par som kommer till Lappland. Ceremonin hålls på isen, i ett snökapell eller på en fjälltopp, och äktenskapet registreras juridiskt hemma före eller efter resan. Inga tillstånd, ingen hindersprövning, ingen DVV, och datumet bestämmer ni fritt. Stegen nedan gäller inte er.',
  },
  legalTitle: {
    fi: 'Juridinen avioliitto Suomessa',
    en: 'A legally Finnish marriage',
    de: 'Eine rechtsgültige Ehe in Finnland',
    ja: 'フィンランドでの法的な婚姻',
    es: 'Matrimonio legal en Finlandia',
    'pt-BR': 'Casamento legal na Finlândia',
    'zh-CN': '在芬兰缔结具法律效力的婚姻',
    ko: '핀란드에서의 법적 혼인',
    fr: 'Un mariage légal en Finlande',
    it: 'Un matrimonio legale in Finlandia',
    nl: 'Een wettelijk Fins huwelijk',
    sv: 'Ett juridiskt giltigt äktenskap i Finland',
  },
  legalBody: {
    fi: 'Tämä on mahdollista myös ulkomaalaiselle parille, mutta se on lisä eikä perusratkaisu. Vihkiä saavat vain DVV, käräjäoikeus ja rekisteröidyt uskonnolliset yhdyskunnat, emme me. Ennen vihkimistä tarvitaan avioliiton esteiden tutkinta, ja siihen kuluu viikkoja: kotimaan esteettömyystodistus, usein apostille ja auktorisoitu käännös. Aikatauluttakaa se ennen kuin lyötte päivämäärän lukkoon. Alla oleva vaiheistus koskee tätä reittiä.',
    en: 'This is possible for foreign couples too, but it is an addition rather than the default. Only the DVV, a district court and registered religious communities may perform the marriage; we cannot. Before the ceremony an examination of impediments to marriage is required, and it takes weeks: a certificate of no impediment from your own country, often an apostille and an authorised translation. Schedule that before you fix the date. The steps below describe this route.',
    de: 'Auch für ausländische Paare ist das möglich, aber es ist eine Ergänzung und nicht der Normalfall. Trauen dürfen nur die DVV, ein Amtsgericht und eingetragene Religionsgemeinschaften, wir nicht. Vor der Trauung ist eine Ehefähigkeitsprüfung nötig, und die dauert Wochen: ein Ehefähigkeitszeugnis aus Ihrem Heimatland, oft mit Apostille und beglaubigter Übersetzung. Planen Sie das ein, bevor Sie das Datum festlegen. Die Schritte unten beschreiben diesen Weg.',
    ja: '外国人カップルでも可能ですが、これは基本形ではなく追加の選択肢です。婚姻を執り行えるのはDVV、地方裁判所、登録された宗教団体のみで、当サイトにその権限はありません。挙式の前に婚姻障害の調査が必要で、これには数週間かかります。母国の婚姻要件具備証明書、多くの場合アポスティーユと公認翻訳も必要です。日程を確定する前に、この期間を見込んでください。以下の手順はこの経路についてのものです。',
    es: 'También es posible para parejas extranjeras, pero es un añadido, no la opción por defecto. Solo el DVV, un juzgado y las comunidades religiosas registradas pueden oficiar el matrimonio; nosotros no. Antes de la ceremonia se exige el examen de impedimentos, y lleva semanas: certificado de capacidad matrimonial de vuestro país, a menudo apostilla y traducción jurada. Planificadlo antes de fijar la fecha. Los pasos de abajo describen esta vía.',
    'pt-BR': 'Também é possível para casais estrangeiros, mas é um acréscimo, não o padrão. Somente o DVV, um tribunal distrital e comunidades religiosas registradas podem celebrar o casamento; nós não. Antes da cerimônia é exigido o exame de impedimentos, e ele leva semanas: certidão de nada consta do seu país, muitas vezes apostila e tradução juramentada. Planejem isso antes de fixar a data. Os passos abaixo descrevem este caminho.',
    'zh-CN': '外国情侣同样可以选择，但这是附加选项而非默认方式。只有 DVV、地方法院和登记在册的宗教团体可以主持婚姻登记，我们不能。仪式前须进行婚姻障碍审查，需要数周：本国出具的无婚姻障碍证明，通常还需海牙认证和有资质的翻译。请在确定日期之前预留这段时间。下面的步骤描述的正是这条路径。',
    ko: '외국인 커플에게도 가능하지만, 기본이 아니라 추가 선택지입니다. 혼인을 집전할 수 있는 곳은 DVV와 지방법원, 등록된 종교 단체뿐이며 저희에게는 그 권한이 없습니다. 예식 전에 혼인 장애 조사가 필요하고 여기에 몇 주가 걸립니다. 본국의 혼인요건증명서, 많은 경우 아포스티유와 공인 번역도 필요합니다. 날짜를 확정하기 전에 이 기간을 계산해 두세요. 아래 절차는 이 경로에 관한 것입니다.',
    fr: 'C’est possible aussi pour les couples étrangers, mais c’est un complément et non la solution par défaut. Seuls le DVV, un tribunal de district et les communautés religieuses enregistrées peuvent célébrer le mariage ; nous, non. Avant la cérémonie, un examen des empêchements est exigé, et il prend des semaines : certificat de capacité matrimoniale de votre pays, souvent apostille et traduction assermentée. Prévoyez ce délai avant de fixer la date. Les étapes ci-dessous décrivent cette voie.',
    it: 'È possibile anche per le coppie straniere, ma è un’aggiunta e non la soluzione di base. Possono celebrare il matrimonio solo il DVV, un tribunale distrettuale e le comunità religiose registrate; noi no. Prima della cerimonia serve l’esame degli impedimenti, e richiede settimane: nulla osta dal Suo Paese, spesso apostille e traduzione asseverata. Lo metta in calendario prima di fissare la data. I passaggi qui sotto descrivono questa via.',
    nl: 'Ook voor buitenlandse paren kan dit, maar het is een aanvulling en niet de standaard. Alleen het DVV, een rechtbank en geregistreerde religieuze gemeenschappen mogen het huwelijk voltrekken; wij niet. Voor de ceremonie is een onderzoek naar huwelijksbeletselen vereist, en dat duurt weken: een verklaring van geen bezwaar uit uw eigen land, vaak met apostille en beëdigde vertaling. Plan dat in voordat u de datum vastlegt. De stappen hieronder beschrijven deze route.',
    sv: 'Det går även för utländska par, men det är ett tillägg och inte grundlösningen. Endast DVV, en tingsrätt och registrerade religiösa samfund får viga, inte vi. Före vigseln krävs en hindersprövning, och den tar veckor: intyg om äktenskapshinder från ert eget land, ofta apostille och auktoriserad översättning. Planera in det innan ni spikar datumet. Stegen nedan beskriver den här vägen.',
  },
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
    nl: 'Trouwen in Lapland: DVV-papierwerk | LaplandWeddings', sv: 'Gifta sig i Lappland: DVV-papper, vigselförrättare, praktisk guide | LaplandWeddings',
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
    nl: 'Trouwen in Lapland: DVV-proces', sv: 'Gifta sig i Lappland: DVV-processen',
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
    it: 'Il Suo matrimonio in Lapponia: guida pratica',
    nl: 'Uw bruiloft in Lapland: praktische gids', sv: 'Ert bröllop i Lappland: praktisk guide',
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
    nl: 'Huwelijksceremonie in een winters bos', sv: 'Vigsel i vinterskogen',
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
    it: 'Scarichi la checklist',
    nl: 'Download de checklist', sv: 'Ladda ner checklistan',
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
    nl: 'DVV-checklist van één pagina als pdf', sv: 'DVV-checklista på en sida som PDF',
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
    it: 'La stampi o la salvi nella cartella di viaggio: tutti i passaggi, da 8 settimane prima fino a dopo le nozze.',
    nl: 'Print of bewaar voor uw reismap: elke stap, van 8 weken vooraf tot na de bruiloft.', sv: 'Skriv ut eller spara i resepärmen: varje steg från 8 veckor före till efter bröllopet.',
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
    it: 'Apra la checklist',
    nl: 'Open de checklist', sv: 'Öppna checklistan',
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
    nl: 'Huwelijksvergunning in Finland: 6 stappen', sv: 'Vigseltillstånd i Finland: 6 steg',
  },
  stepsIntro: {
    fi: 'Teidän ja sekä kotimaassanne että Suomessa tunnustetun avioliiton välissä on kuusi paperivaihetta; useimmat parit hoitavat ne 4–8 viikossa kaiken muun ohessa.',
    en: 'Six steps of paperwork stand between you and a marriage recognised at home as well as in Finland; most couples clear them in 4–8 weeks alongside everything else.',
    de: 'Zwischen Ihnen und einer sowohl zu Hause als auch in Finnland anerkannten Ehe stehen sechs Schritte Papierkram; die meisten Paare erledigen sie in 4–8 Wochen, neben allem anderen.',
    ja: '母国とフィンランドの双方で認められる結婚まで、あとは6つの書類手続きだけ。ほとんどのカップルは他の準備と並行して4〜8週間で終えています。',
    es: 'Entre vosotros y un matrimonio reconocido tanto en vuestro país como en Finlandia hay seis pasos de papeleo; la mayoría de las parejas los resuelve en 4-8 semanas junto con todo lo demás.',
    'pt-BR': 'Entre vocês e um casamento reconhecido tanto no seu país quanto na Finlândia há seis etapas de papelada; a maioria dos casais as resolve em 4-8 semanas, junto com todo o resto.',
    'zh-CN': '在你们与一段在本国与芬兰均获承认的婚姻之间，只隔着六步文书手续，大多数新人在4–8周内就能办完，同时兼顾其他筹备。',
    ko: '본국과 핀란드 양쪽에서 인정받는 결혼까지 남은 것은 여섯 단계의 서류 절차뿐, 대부분의 커플이 다른 준비와 병행해 4~8주 안에 마칩니다.',
    fr: 'Entre vous et un mariage reconnu chez vous comme en Finlande, il n’y a que six étapes administratives; la plupart des couples les bouclent en 4 à 8 semaines, en parallèle de tout le reste.',
    it: 'Tra Lei e un matrimonio riconosciuto sia nel Suo Paese sia in Finlandia ci sono sei passaggi burocratici; la maggior parte delle coppie li completa in 4-8 settimane, insieme a tutto il resto.',
    nl: 'Tussen u en een huwelijk dat zowel thuis als in Finland erkend is staan zes stappen papierwerk; de meeste stellen ronden ze in 4-8 weken af, naast al het andere.', sv: 'Six steps of paperwork stand between you and a marriage recognised at home as well as in Finland; most couples clear them in 4–8 weeks alongside everything else.',
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
    nl: 'Gasten, vluchten en wie wat betaalt', sv: 'Gäster, flyg och vem som betalar',
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
    nl: 'Drie beslissingen om vroeg te nemen, nog voordat de uitnodigingen de deur uit gaan.', sv: 'Tre beslut att fatta tidigt, innan inbjudningarna skickas.',
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
    nl: 'Seizoenen en weer', sv: 'Årstider och väder',
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
    nl: 'Vluchten en bereikbaarheid', sv: 'Flyg och tillgänglighet',
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
    nl: 'Autohuur en transfers', sv: 'Hyrbil och transporter',
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
    it: 'Noleggi un’auto direttamente dall’aeroporto di Rovaniemi, Kittilä o Ivalo. Il sito della nostra rete laplandcarrental.com offre prezzi e prenotazioni in finlandese e inglese.',
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
    it: 'Cerchi voli da Londra (Trip.com)',
    nl: 'Zoek vluchten vanuit Londen (Trip.com)', sv: 'Hitta flyg från London (Trip.com)',
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
    it: 'Cerchi voli da Helsinki (Trip.com)',
    nl: 'Zoek vluchten vanuit Helsinki (Trip.com)', sv: 'Hitta flyg från Helsingfors (Trip.com)',
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
      nl: 'De bruiloft is een eigen pakket', sv: 'Bröllopet är ett eget paket',
    },
    p: {
      fi: 'Planneri hinnoittelee itse häät: vihkimisen, paikan, ohjelman ja toimittajat. Lennot ja hotellihuoneet varataan erikseen, yleensä jo ennen kuin hääsuunnittelu alkaa. Täällä kukaan ei myy lentoja; tämä opas kertoo, mitä varata ja milloin.',
      en: 'The planner prices the wedding itself: ceremony, venue, programme, vendors. Flights and hotel rooms are booked separately, usually before wedding planning even starts. Nobody here sells flights; this guide tells you what to book and when.',
      de: 'Der Planer kalkuliert die Hochzeit selbst: Trauung, Location, Programm, Dienstleister. Flüge und Hotelzimmer werden separat gebucht, meist noch bevor die Hochzeitsplanung überhaupt beginnt. Hier verkauft niemand Flüge; dieser Leitfaden sagt Ihnen, was Sie wann buchen sollten.',
      ja: 'プランナーが料金を出すのは結婚式そのものです：セレモニー、会場、プログラム、各業者の手配。フライトとホテルは別途予約で、通常はウェディングの計画が始まる前に手配します。ここでは航空券は販売していません。何をいつ予約すべきかは、このガイドがお伝えします。',
      es: 'El organizador presupuesta la boda en sí: ceremonia, espacio, programa y proveedores. Los vuelos y las habitaciones de hotel se reservan aparte, normalmente antes incluso de empezar a planificar la boda. Aquí nadie vende vuelos; esta guía os dice qué reservar y cuándo.',
      'pt-BR': 'O planejador orça o casamento em si: cerimônia, local, programação e fornecedores. Voos e quartos de hotel são reservados à parte, geralmente antes mesmo de o planejamento do casamento começar. Aqui ninguém vende passagens aéreas; este guia diz o que reservar e quando.',
      'zh-CN': '策划方报价的是婚礼本身：仪式、场地、流程和供应商。机票和酒店客房需另行预订，通常在婚礼策划开始之前就要订好。这里没有人出售机票，本指南只告诉你该订什么、何时订。',
      ko: '플래너가 견적을 내는 것은 결혼식 그 자체입니다: 예식, 베뉴, 프로그램, 업체 섭외. 항공편과 호텔 객실은 별도로 예약하며, 보통 웨딩 플래닝이 시작되기 전에 이루어집니다. 이곳에서는 항공권을 판매하지 않습니다. 무엇을 언제 예약해야 하는지는 이 가이드가 알려드립니다.',
      fr: 'L’organisateur chiffre le mariage lui-même: cérémonie, lieu, programme, prestataires. Les vols et les chambres d’hôtel se réservent à part, souvent avant même le début de l’organisation du mariage. Personne ici ne vend de vols ; ce guide vous dit quoi réserver et quand.',
      it: 'Il planner quota il matrimonio in sé: cerimonia, location, programma, fornitori. Voli e camere d’albergo si prenotano a parte, di solito ancora prima che inizi l’organizzazione delle nozze. Qui nessuno vende voli: questa guida dice che cosa prenotare e quando.',
      nl: 'De planner begroot de bruiloft zelf: ceremonie, locatie, programma, leveranciers. Vluchten en hotelkamers boekt u apart, meestal nog voordat de bruiloftsplanning begint. Hier verkoopt niemand vluchten; deze gids vertelt u wat u wanneer moet boeken.', sv: 'The planner prices the wedding itself: ceremony, venue, programme, vendors. Flights and hotel rooms are booked separately, usually before wedding planning even starts. Nobody here sells flights; this guide tells you what to book and when.',
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
      nl: 'Gasten betalen meestal hun eigen reis', sv: 'Gästerna betalar oftast själva',
    },
    p: {
      fi: 'Destinaatiohäissä vieraat maksavat tavallisesti omat lentonsa ja majoituksensa. Sano tämä selvästi jo kutsussa. Jos haluatte tarjota osan (vaikkapa hääillallisen ja yhden aktiviteetin), kertokaa se yhteydenotossa, niin plannerit hinnoittelevat sen mukaan ensimmäisestä päivästä alkaen.',
      en: 'In destination weddings, guests normally cover their own flights and accommodation. Say this clearly on the invitation. If you want to host some of it (say, the wedding-night dinner and one activity), say so in the enquiry and the planners will price it in from day one.',
      de: 'Bei Hochzeiten im Ausland zahlen die Gäste Flüge und Unterkunft in der Regel selbst. Sagen Sie das klar in der Einladung. Wenn Sie einen Teil übernehmen möchten (etwa das Hochzeitsdinner und eine Aktivität), schreiben Sie es in die Anfrage, dann kalkulieren die Planer es von Anfang an ein.',
      ja: '海外ウェディングでは、フライトと宿泊は通常ゲストの自己負担です。招待状にはっきり書きましょう。一部をおふたりが負担したい場合（例えば結婚式当日のディナーとアクティビティ1つ）は、お問い合わせでお知らせください。プランナーが初日から予算に組み込みます。',
      es: 'En las bodas de destino, los invitados suelen pagar sus vuelos y su alojamiento: decidlo con claridad en la invitación. Si queréis invitar a una parte (por ejemplo, la cena nupcial y una actividad), indicadlo en la solicitud y los organizadores lo incluirán en el presupuesto desde el primer día.',
      'pt-BR': 'Em destination weddings, os convidados normalmente pagam os próprios voos e a hospedagem. Deixe isso claro no convite. Se quiserem oferecer uma parte (digamos, o jantar da noite do casamento e uma atividade), diga isso no contato e os planejadores colocarão isso no orçamento desde o primeiro dia.',
      'zh-CN': '在目的地婚礼中，宾客一般自付机票和住宿，请在请柬上写清楚这一点。如果你们想承担其中一部分（比如婚礼当晚的晚宴和一项活动），请在咨询时说明，策划方会从第一天起就把它列入预算。',
      ko: '데스티네이션 웨딩에서는 하객이 항공편과 숙박을 직접 부담하는 것이 일반적입니다. 청첩장에 이를 분명히 알리세요. 일부를 두 분이 부담하고 싶다면(예: 결혼식 당일 저녁 만찬과 액티비티 하나) 문의 시 알려 주시면, 플래너가 처음부터 예산에 반영합니다.',
      fr: 'Dans un mariage à l’étranger, les invités prennent normalement en charge leurs vols et leur hébergement. Dites-le clairement sur l’invitation. Si vous souhaitez en offrir une partie (par exemple le dîner du soir des noces et une activité), précisez-le dans votre demande et les organisateurs l’intégreront au budget dès le premier jour.',
      it: 'Nei matrimoni all’estero gli invitati coprono di norma voli e alloggio. Lo dica chiaramente già nell’invito. Se vuole offrirne una parte (ad esempio la cena di nozze e un’attività), lo indichi nella richiesta: i planner la inseriranno nel budget fin dal primo giorno.',
      nl: 'Bij een bruiloft in het buitenland betalen gasten normaal gesproken hun eigen vluchten en verblijf. Zeg dat duidelijk in de uitnodiging. Wilt u een deel aanbieden (bijvoorbeeld het bruiloftsdiner en één activiteit), vermeld dat dan in uw aanvraag; de planners zetten het vanaf dag één in het budget.', sv: 'In destination weddings, guests normally cover their own flights and accommodation. Say this clearly on the invitation. If you want to host some of it (say, the wedding-night dinner and one activity), say so in the enquiry and the planners will price it in from day one.',
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
      it: 'Tema e stile, se lo desidera',
      nl: 'Thema en stijl, als u dat wilt', sv: 'Tema och stil, om ni vill',
    },
    p: {
      fi: 'Planneri voi suunnitella kanssanne myös teeman: värit, kukat, kattauksen ja ohjelman kaaren, niin että koko viikonloppu tuntuu yhdeltä tarinalta eikä varauslistalta.',
      en: 'A planner can also design the theme with you: colours, flowers, table setting and the arc of the programme, so the whole weekend feels like one story instead of a list of bookings.',
      de: 'Ein Planer kann mit Ihnen auch das Thema gestalten: Farben, Blumen, Tischdekoration und den Bogen des Programms, damit sich das ganze Wochenende wie eine Geschichte anfühlt und nicht wie eine Buchungsliste.',
      ja: 'プランナーはテーマづくりも一緒に進められます：色、花、テーブルコーディネート、プログラムの流れまで。週末全体が予約の羅列ではなく、ひとつの物語のように感じられます。',
      es: 'Un organizador también puede diseñar el tema con vosotros: colores, flores, montaje de mesa e hilo del programa; para que todo el fin de semana se sienta como una sola historia y no como una lista de reservas.',
      'pt-BR': 'Um planejador também pode criar o tema com vocês: cores, flores, decoração da mesa e o arco da programação, para que o fim de semana inteiro pareça uma história só, e não uma lista de reservas.',
      'zh-CN': '策划方也可以和你们一起设计婚礼主题：配色、花艺、餐桌布置和流程节奏，让整个周末像一个完整的故事，而不是一串预订清单。',
      ko: '플래너가 테마 디자인도 함께할 수 있습니다: 색감, 꽃, 테이블 세팅, 프로그램의 흐름까지, 주말 전체가 예약 목록이 아니라 하나의 이야기처럼 느껴지도록.',
      fr: 'Un organisateur peut aussi concevoir le thème avec vous: couleurs, fleurs, art de la table et fil du programme, pour que tout le week-end ressemble à une seule histoire plutôt qu’à une liste de réservations.',
      it: 'Un planner può anche disegnare con Lei il tema: colori, fiori, mise en place e arco del programma, così l’intero weekend sembra un’unica storia e non un elenco di prenotazioni.',
      nl: 'Een planner kan ook samen met u het thema ontwerpen: kleuren, bloemen, tafelstyling en de opbouw van het programma, zodat het hele weekend als één verhaal voelt in plaats van een lijst boekingen.', sv: 'A planner can also design the theme with you: colours, flowers, table setting and the arc of the programme, so the whole weekend feels like one story instead of a list of bookings.',
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
      de: 'Dezember–März',
      ja: '12月〜3月',
      es: 'De diciembre a marzo',
      'pt-BR': 'De dezembro a março',
      'zh-CN': '12月–3月',
      ko: '12월 – 3월',
      fr: 'De décembre à mars',
      it: 'Da dicembre a marzo',
      nl: 'December – maart', sv: 'December – mars',
    },
    body: {
      fi: 'Selvä pääsesonki. Lumi, jää, revontulet. Kaamos pohjoisimmassa Lapissa joulu–tammikuussa, sininen tunti maaliskuussa.',
      en: 'Peak season by a wide margin. Snow, ice, Northern Lights. Polar night in the far north from December to January, blue hour in March.',
      de: 'Die klare Hauptsaison. Schnee, Eis, Polarlichter. Polarnacht im hohen Norden von Dezember bis Januar, blaue Stunde im März.',
      ja: '圧倒的なピークシーズン。雪、氷、オーロラ。極夜は最北部で12〜1月、ブルーアワーは3月。',
      es: 'Temporada alta con diferencia. Nieve, hielo, auroras. Noche polar en el extremo norte en diciembre-enero, hora azul en marzo.',
      'pt-BR': 'Alta temporada com folga. Neve, gelo, auroras. Noite polar no extremo norte em dezembro-janeiro, hora azul em março.',
      'zh-CN': '毫无疑问的旺季。冰雪与极光。最北部12月至1月为极夜，3月有蓝色时刻。',
      ko: '압도적인 성수기. 눈, 얼음, 오로라. 최북단은 12~1월 극야, 3월 블루아워.',
      fr: 'La haute saison, sans comparaison. Neige, glace, aurores. Nuit polaire dans le grand nord de décembre à janvier, heure bleue en mars.',
      it: 'L’alta stagione, senza paragoni. Neve, ghiaccio, aurore. Notte polare nell’estremo nord a dicembre-gennaio, ora blu a marzo.',
      nl: 'Met afstand het hoogseizoen. Sneeuw, ijs, noorderlicht. Poolnacht in het hoge noorden in december–januari, blauwe uur in maart.', sv: 'Högsäsong med bred marginal. Snö, is, norrsken. Polarnatt i nordligaste Lappland december–januari, blå timme i mars.',
    },
  },
  {
    colorClass: 'bg-aurora-green',
    period: {
      fi: 'Toukokuu, heinäkuu',
      en: 'May – July',
      de: 'Mai–Juli',
      ja: '5月〜7月',
      es: 'De mayo a julio',
      'pt-BR': 'De maio a julho',
      'zh-CN': '5月–7月',
      ko: '5월 – 7월',
      fr: 'De mai à juillet',
      it: 'Da maggio a luglio',
      nl: 'Mei – juli', sv: 'Maj – juli',
    },
    body: {
      fi: 'Keskiyön aurinko 23.5.–24.7. Lämmin (15–25 °C), ei lunta. Hyttyset huipussaan kesäkuussa.',
      en: 'Midnight Sun 23 May – 24 July. Warm (15–25 °C), no snow. Mosquitoes peak from late June into July.',
      de: 'Mitternachtssonne vom 23. Mai bis 24. Juli. Mild (15–25 °C), kein Schnee. Mückenhochsaison im Juni.',
      ja: '白夜は5月23日〜7月24日。温暖（15〜25℃）で雪はなし。蚊は6月がピーク。',
      es: 'Sol de medianoche del 23 de mayo al 24 de julio. Cálido (15-25 °C), sin nieve. Pico de mosquitos en junio.',
      'pt-BR': 'Sol da meia-noite de 23 de maio a 24 de julho. Ameno (15-25 °C), sem neve. Pico de mosquitos em junho.',
      'zh-CN': '午夜阳光为5月23日至7月24日。气候温暖（15–25°C），无积雪。蚊虫在6月达到高峰。',
      ko: '백야는 5월 23일~7월 24일. 온화함(15~25°C), 눈 없음. 모기는 6월에 절정.',
      fr: 'Soleil de minuit du 23 mai au 24 juillet. Doux (15-25 °C), sans neige. Pic de moustiques en juin.',
      it: 'Sole di mezzanotte dal 23 maggio al 24 luglio. Mite (15-25 °C), niente neve. Picco di zanzare a giugno.',
      nl: 'Middernachtzon van 23 mei tot 24 juli. Mild (15-25 °C), geen sneeuw. Muggenpiek in juni.', sv: 'Midnattssol 23 maj – 24 juli. Varmt (15–25 °C), ingen snö. Myggen är som värst i juni.',
    },
  },
  {
    colorClass: 'bg-aurora-pink',
    period: {
      fi: 'Syyskuu, lokakuu',
      en: 'September – October',
      de: 'September–Oktober',
      ja: '9月〜10月',
      es: 'De septiembre a octubre',
      'pt-BR': 'De setembro a outubro',
      'zh-CN': '9月–10月',
      ko: '9월 – 10월',
      fr: 'De septembre à octobre',
      it: 'Da settembre a ottobre',
      nl: 'September – oktober', sv: 'September – oktober',
    },
    body: {
      fi: 'Ruskakausi syyskuun puolivälissä, Lapin värikkäin aika. Revontulia näkyy jo selkeinä syyskuun öinä.',
      en: 'Ruska (autumn colours) in mid-September, Lapland’s most colourful time. The Northern Lights are already out on clear September nights.',
      de: 'Ruska (Herbstfarben) Mitte September, die farbenfrohste Zeit Lapplands. Polarlichter zeigen sich bereits in klaren Septembernächten.',
      ja: '9月中旬の紅葉（ルスカ）、ラップランドで最も色彩豊かな時期。オーロラは9月の晴れた夜にはすでに見られます。',
      es: 'La ruska (colores otoñales) a mediados de septiembre: la época más colorida de Laponia. Las auroras ya se ven en las noches despejadas de septiembre.',
      'pt-BR': 'A ruska (cores de outono) em meados de setembro, a época mais colorida da Lapônia. As auroras já aparecem nas noites claras de setembro.',
      'zh-CN': '九月中旬的秋叶季（ruska），拉普兰色彩最绚烂的时节。9月晴朗的夜晚已可见到极光。',
      ko: '9월 중순의 가을 단풍(루스카), 라플란드에서 가장 다채로운 시기. 오로라는 9월 맑은 밤이면 이미 보입니다.',
      fr: 'La ruska (couleurs d’automne) à la mi-septembre, la période la plus colorée de Laponie. Les aurores sont déjà visibles par nuits claires en septembre.',
      it: 'La ruska (colori autunnali) a metà settembre, il periodo più colorato della Lapponia. Le aurore sono già visibili nelle notti serene di settembre.',
      nl: 'De ruska (herfstkleuren) medio september, de kleurrijkste tijd van Lapland. Het noorderlicht is al te zien op heldere septembernachten.', sv: 'Ruska (autumn colours) in mid-September, Lapland’s most colourful time. The Northern Lights are already out on clear September nights.',
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
      nl: 'Rechtstreekse vluchten vanuit Helsinki, Londen, Frankfurt, Parijs. 10 km tot het centrum.', sv: 'Direktflyg från Helsingfors, London, Frankfurt och Paris. 10 km till centrum.',
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
      nl: 'Rechtstreekse vluchten vanuit Helsinki, Londen, Manchester, Birmingham. 14 km tot Levi.', sv: 'Direktflyg från Helsingfors, London, Manchester och Birmingham. 14 km till Levi.',
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
      nl: 'Rechtstreekse vluchten vanuit Helsinki. De noordelijkste luchthaven van Finland, 30 km tot Saariselkä.', sv: 'Direktflyg från Helsingfors. Finlands nordligaste flygplats, 30 km till Saariselkä.',
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
      nl: 'Hoe lang duurt het DVV-papierwerk voor een buitenlands stel?', sv: 'Hur lång tid tar DVV-pappren för ett utländskt par?',
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
      it: '3-5 settimane. Per i cittadini finlandesi, 1-2 settimane. Avvii la pratica almeno 2 mesi prima delle nozze.',
      nl: '3-5 weken. Voor Finse staatsburgers 1-2 weken. Begin het proces minstens 2 maanden voor de bruiloft.', sv: '3–5 veckor. För finska medborgare 1–2 veckor. Påbörja processen minst 2 månader före bröllopet.',
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
      nl: 'Hoeveel getuigen vereist de Finse wet?', sv: 'Hur många vittnen kräver finsk lag?',
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
      nl: 'Precies twee. De meeste locaties en planners regelen ze ter plaatse. Ze hoeven niet Fins te zijn.', sv: 'Exakt två. De flesta platser och planerare ordnar dem på plats. De behöver inte vara finska medborgare.',
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
      nl: 'Is een in Finland voltrokken huwelijk geldig in mijn thuisland?', sv: 'Är en vigsel i Finland giltig i mitt hemland?',
    },
    a: {
      fi: 'Kyllä. Saat 2 virallista todistusta englanniksi. Apostille-leima DVV:ltä kotimaata varten useimmissa tapauksissa.',
      en: 'Yes. You receive 2 official certificates in English. An apostille from the DVV is required by most home countries and is quick to obtain.',
      de: 'Ja. Sie erhalten 2 offizielle Urkunden auf Englisch. Die Apostille über die DVV ist in den meisten Heimatländern erforderlich und schnell zu bekommen.',
      ja: 'はい。英語の公式証明書を2通受け取ります。多くの母国でDVVのアポスティーユが必要で、取得は迅速です。',
      es: 'Sí. Recibes 2 certificados oficiales en inglés. La mayoría de los países de origen exigen la apostilla del DVV, que se obtiene rápido.',
      'pt-BR': 'Sim. Você recebe 2 certidões oficiais em inglês. A maioria dos países de origem exige a apostila do DVV, rápida de obter.',
      'zh-CN': '有效。你将获得2份英文正式证书。多数原籍国要求DVV的海牙认证（Apostille），办理快捷。',
      ko: '네. 영어로 된 공식 증명서 2부를 받습니다. 대부분의 본국에서 DVV 아포스티유를 요구하며, 발급은 빠릅니다.',
      fr: 'Oui. Vous recevez 2 actes officiels en anglais. L’apostille via le DVV est exigée par la plupart des pays d’origine, rapide à obtenir.',
      it: 'Sì. Riceve 2 certificati ufficiali in inglese. La maggior parte dei Paesi d’origine richiede l’apostille del DVV, veloce da ottenere.',
      nl: 'Ja. U ontvangt 2 officiële akten in het Engels. De meeste thuislanden vereisen een apostille via het DVV, snel te verkrijgen.', sv: 'Yes. You receive 2 official certificates in English. An apostille from the DVV is required by most home countries and is quick to obtain.',
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
      nl: 'Hoeveel kost een bruiloft in Lapland?', sv: 'Vad kostar ett bröllop i Lappland?',
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
      de: 'Welcher Monat ist der beste für eine Hochzeit in Lappland?',
      ja: 'ラップランドの結婚式に最適な月はいつですか？',
      es: '¿Cuál es el mejor mes para una boda en Laponia?',
      'pt-BR': 'Qual é o melhor mês para um casamento na Lapônia?',
      'zh-CN': '在拉普兰举办婚礼最佳的月份是？',
      ko: '라플란드 결혼식에 가장 좋은 달은 언제인가요?',
      fr: 'Quel est le meilleur mois pour un mariage en Laponie ?',
      it: 'Qual è il mese migliore per un matrimonio in Lapponia?',
      nl: 'Wat is de beste maand voor een bruiloft in Lapland?', sv: 'Vilken månad är bäst för ett bröllop i Lappland?',
    },
    a: {
      fi: 'Helmikuu–maaliskuu on paras tasapaino valon, varman lumen ja revontulien välillä. Joulukuu on tunnelmallisin.',
      en: 'February and March are the best balance of daylight, reliable snow and Northern Lights. December is the most atmospheric.',
      de: 'Februar und März sind die beste Mischung aus Tageslicht, verlässlichem Schnee und Polarlichtern. Der Dezember ist am stimmungsvollsten.',
      ja: '2月〜3月は日照、雪の確実さ、オーロラのバランスが最も良い時期です。12月は最も情緒があります。',
      es: 'Febrero y marzo son el mejor equilibrio entre luz, nieve fiable y auroras. Diciembre es el más atmosférico.',
      'pt-BR': 'Fevereiro e março são o melhor equilíbrio entre luz, neve garantida e auroras. Dezembro é o mais atmosférico.',
      'zh-CN': '2月至3月在光照、可靠积雪与极光之间最为均衡。12月最具氛围感。',
      ko: '2월~3월은 햇빛, 확실한 눈, 오로라의 균형이 가장 좋습니다. 12월은 가장 분위기 있는 달입니다.',
      fr: 'Février et mars offrent le meilleur équilibre entre lumière, neige fiable et aurores. Décembre est le plus féerique.',
      it: 'Febbraio e marzo offrono il miglior equilibrio tra luce, neve affidabile e aurore. Dicembre è il più suggestivo.',
      nl: 'Februari en maart bieden de beste balans tussen daglicht, betrouwbare sneeuw en noorderlicht. December is het sfeervolst.', sv: 'February and March are the best balance of daylight, reliable snow and Northern Lights. December is the most atmospheric.',
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

      {/* Symbolic vs legal, before anything else. Without this the page reads as
          "marrying in Lapland means weeks of Finnish paperwork", which is only
          true for the minority who want the marriage to be legally Finnish. */}
      <Section title={pl(UI.routesTitle)} subtitle={pl(UI.routesIntro)}>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="bg-night-light/60 border border-rose/30 rounded-2xl p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-aurora-pink font-semibold mb-2">
              {pl(UI.symbolicTitle)}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{pl(UI.symbolicBody)}</p>
          </div>
          <div className="bg-night-light/60 border border-white/10 rounded-2xl p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold mb-2">
              {pl(UI.legalTitle)}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{pl(UI.legalBody)}</p>
          </div>
        </div>
      </Section>

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
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose/20 border border-rose/40 text-rose font-heading tracking-wide text-xl flex items-center justify-center">{s.n}</div>
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
              <p className="font-heading tracking-wide text-xl mb-2 text-night flex items-center gap-2.5">
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
              <p className="font-heading tracking-wide text-xl text-white mb-2">{ap.name} ({ap.code})</p>
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
