import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang } from '../i18n/LangContext';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
/**
 * What the parts cost, 2026-07-29.
 *
 * Every figure below is read off the operator's OWN published price page, and
 * every row carries the link so a reader can check it. Prices were verified on
 * 2026-07-29; operators change them, so re-check before quoting them elsewhere.
 *
 * The previous version of this table was eight invented ranges. They were
 * removed rather than adjusted, because a plausible-looking invented price is
 * indistinguishable from a real one and there is no way for a reader to tell.
 *
 * Note what is NOT here: the wedding-planner fee, the venue's own ceremony fee,
 * flowers and catering. Nobody in Lapland publishes those. Arctic SnowHotel,
 * for example, answers "we will be happy to give you a quotation for your
 * wedding" and prints no number at all. Those four are listed separately below
 * as quotation-only, which is itself useful: it tells a couple which parts they
 * have to ask about instead of budgeting from a web page.
 */
const PRICE_VERIFIED = '2026-07-29';

type CostRow = {
  title: Localized<string>;
  range: Localized<string>;
  note?: Localized<string>;
  source: { name: string; url: string };
};

const breakdown: CostRow[] = [
  {
    title: {
      en: 'Officiant, civil ceremony', fi: 'Vihkijä, siviilivihkiminen', de: 'Trauredner, standesamtlich',
      ja: '司式者（民事婚）', es: 'Oficiante, ceremonia civil', 'pt-BR': 'Celebrante, cerimônia civil',
      'zh-CN': '主婚人（民事仪式）', ko: '주례, 민사 예식', fr: 'Officiant, mariage civil',
      it: 'Celebrante, rito civile', nl: 'Voltrekker, burgerlijke ceremonie', sv: 'Vigselförrättare, borgerlig vigsel',
    },
    range: {
      en: '€0 – €250', fi: '0 – 250 €', de: '0 – 250 €', ja: '0〜250ユーロ', es: '0 – 250 €',
      'pt-BR': '€ 0 – € 250', 'zh-CN': '0 – 250 欧元', ko: '0 – 250유로', fr: '0 – 250 €',
      it: '0 – 250 €', nl: '€ 0 – € 250', sv: '0 – 250 €',
    },
    note: {
      en: 'Free at a DVV office on weekdays 9.00–16.15. Outside those hours it is €250 plus the officiant’s travel to the venue.',
      fi: 'Maksuton DVV:n toimipisteessä arkisin klo 9.00–16.15. Sen ulkopuolella 250 € ja lisäksi vihkijän matkakulut vihkipaikalle.',
      de: 'Kostenlos in einer DVV-Geschäftsstelle werktags 9.00–16.15 Uhr. Außerhalb dieser Zeiten 250 € zuzüglich der Anfahrt des Trauredners.',
      ja: 'DVVの窓口で平日9:00〜16:15は無料。時間外は250ユーロに加え、司式者の会場までの交通費が必要です。',
      es: 'Gratis en una oficina del DVV de lunes a viernes de 9.00 a 16.15. Fuera de ese horario son 250 € más el desplazamiento del oficiante.',
      'pt-BR': 'Gratuito em um posto do DVV nos dias úteis das 9h às 16h15. Fora desse horário são € 250 mais o deslocamento do celebrante.',
      'zh-CN': '工作日 9:00–16:15 在 DVV 办事处办理免费。此时间之外为 250 欧元，另需支付主婚人前往场地的交通费。',
      ko: '평일 9:00~16:15에 DVV 사무소에서 진행하면 무료입니다. 그 외 시간에는 250유로와 주례의 이동 비용이 추가됩니다.',
      fr: 'Gratuit dans un bureau du DVV en semaine de 9h00 à 16h15. En dehors de ces heures, 250 € plus le déplacement de l’officiant.',
      it: 'Gratuito presso un ufficio DVV nei giorni feriali dalle 9.00 alle 16.15. Fuori da quell’orario 250 € più la trasferta del celebrante.',
      nl: 'Gratis op een DVV-kantoor op werkdagen van 9.00 tot 16.15 uur. Daarbuiten € 250 plus de reiskosten van de voltrekker.',
      sv: 'Gratis på ett DVV-kontor vardagar 9.00–16.15. Utanför den tiden 250 € plus vigselförrättarens resa till platsen.',
    },
    source: { name: 'dvv.fi', url: 'https://dvv.fi/vihkiminen' },
  },
  {
    title: {
      en: 'Photography', fi: 'Valokuvaus', de: 'Fotografie', ja: '写真撮影', es: 'Fotografía',
      'pt-BR': 'Fotografia', 'zh-CN': '摄影', ko: '사진 촬영', fr: 'Photographie',
      it: 'Fotografia', nl: 'Fotografie', sv: 'Fotografering',
    },
    range: {
      en: '€450 – €2 600', fi: '450 – 2 600 €', de: '450 – 2 600 €', ja: '450〜2,600ユーロ',
      es: '450 – 2 600 €', 'pt-BR': '€ 450 – € 2.600', 'zh-CN': '450 – 2,600 欧元',
      ko: '450 – 2,600유로', fr: '450 – 2 600 €', it: '450 – 2 600 €',
      nl: '€ 450 – € 2.600', sv: '450 – 2 600 €',
    },
    note: {
      en: 'Ceremony only €450, portraits €680, a documented full day €1 960–€2 600. Add 20% over Christmas and €0.60/km outside Rovaniemi.',
      fi: 'Pelkkä vihkimys 450 €, muotokuvat 680 €, dokumentoitu koko päivä 1 960–2 600 €. Jouluun +20 % ja 0,60 €/km Rovaniemen ulkopuolella.',
      de: 'Nur die Trauung 450 €, Porträts 680 €, ein dokumentierter ganzer Tag 1 960–2 600 €. Zu Weihnachten +20 % und 0,60 €/km außerhalb Rovaniemis.',
      ja: '挙式のみ450ユーロ、ポートレート680ユーロ、一日密着1,960〜2,600ユーロ。クリスマス期は+20%、ロヴァニエミ外は1kmあたり0.60ユーロ。',
      es: 'Solo la ceremonia 450 €, retratos 680 €, un día completo documentado 1 960–2 600 €. +20 % en Navidad y 0,60 €/km fuera de Rovaniemi.',
      'pt-BR': 'Só a cerimônia € 450, retratos € 680, um dia inteiro documentado € 1.960–€ 2.600. +20% no Natal e € 0,60/km fora de Rovaniemi.',
      'zh-CN': '仅仪式 450 欧元，人像 680 欧元，全天纪实 1,960–2,600 欧元。圣诞season加收 20%，罗瓦涅米以外每公里 0.60 欧元。',
      ko: '예식만 450유로, 포트레이트 680유로, 하루 종일 다큐멘터리 1,960~2,600유로. 크리스마스 시즌 +20%, 로바니에미 외 지역은 km당 0.60유로.',
      fr: 'Cérémonie seule 450 €, portraits 680 €, journée complète documentée 1 960–2 600 €. +20 % à Noël et 0,60 €/km hors de Rovaniemi.',
      it: 'Solo cerimonia 450 €, ritratti 680 €, intera giornata documentata 1 960–2 600 €. +20% a Natale e 0,60 €/km fuori Rovaniemi.',
      nl: 'Alleen de ceremonie € 450, portretten € 680, een volledig gedocumenteerde dag € 1.960–€ 2.600. +20% rond kerst en € 0,60/km buiten Rovaniemi.',
      sv: 'Enbart vigseln 450 €, porträtt 680 €, en dokumenterad heldag 1 960–2 600 €. +20 % vid jul och 0,60 €/km utanför Rovaniemi.',
    },
    source: { name: 'laplandphotographer.com', url: 'https://laplandphotographer.com/photo-shoot-prices' },
  },
  {
    title: {
      en: 'Glass igloo / cabin (per night)', fi: 'Lasi-iglu / cabin (per yö)',
      de: 'Glasiglu / Cabin (pro Nacht)', ja: 'ガラスイグルー／キャビン（1泊）',
      es: 'Iglú de cristal / cabaña (por noche)', 'pt-BR': 'Iglu de vidro / cabana (por noite)',
      'zh-CN': '玻璃冰屋／木屋（每晚）', ko: '글라스 이글루 / 캐빈 (1박)',
      fr: 'Igloo de verre / cabine (par nuit)', it: 'Igloo di vetro / cabina (a notte)',
      nl: 'Glazen iglo / cabin (per nacht)', sv: 'Glasigloo / stuga (per natt)',
    },
    range: {
      en: 'from €239', fi: 'alkaen 239 €', de: 'ab 239 €', ja: '239ユーロ〜', es: 'desde 239 €',
      'pt-BR': 'a partir de € 239', 'zh-CN': '239 欧元起', ko: '239유로부터',
      fr: 'à partir de 239 €', it: 'da 239 €', nl: 'vanaf € 239', sv: 'från 239 €',
    },
    note: {
      en: 'An Aurora Cabin at Northern Lights Village Levi. Rates climb steeply over Christmas and New Year.',
      fi: 'Aurora Cabin Northern Lights Village Levillä. Hinnat nousevat jyrkästi jouluksi ja uudeksivuodeksi.',
      de: 'Eine Aurora Cabin im Northern Lights Village Levi. Über Weihnachten und Neujahr steigen die Preise stark.',
      ja: 'ノーザンライツ・ヴィレッジ・レヴィのオーロラキャビン。クリスマスと年末年始は料金が大きく上がります。',
      es: 'Una Aurora Cabin en Northern Lights Village Levi. Las tarifas suben mucho en Navidad y Año Nuevo.',
      'pt-BR': 'Uma Aurora Cabin no Northern Lights Village Levi. As tarifas sobem bastante no Natal e no Ano-Novo.',
      'zh-CN': '莱维 Northern Lights Village 的 Aurora Cabin。圣诞与新年期间价格大幅上涨。',
      ko: 'Northern Lights Village Levi의 오로라 캐빈 기준. 크리스마스와 연말연시에는 요금이 크게 오릅니다.',
      fr: 'Une Aurora Cabin au Northern Lights Village Levi. Les tarifs grimpent fortement à Noël et au Nouvel An.',
      it: 'Una Aurora Cabin al Northern Lights Village Levi. Le tariffe salgono molto a Natale e Capodanno.',
      nl: 'Een Aurora Cabin in Northern Lights Village Levi. Rond kerst en oud en nieuw lopen de tarieven flink op.',
      sv: 'En Aurora Cabin på Northern Lights Village Levi. Priserna stiger kraftigt kring jul och nyår.',
    },
    source: { name: 'levi.northernlightsvillage.com', url: 'https://levi.northernlightsvillage.com/cabins-and-suites/aurora-cabin' },
  },
  {
    title: {
      en: 'Husky arrival (per person)', fi: 'Husky-saapuminen (per hlö)',
      de: 'Ankunft mit Huskys (pro Person)', ja: 'ハスキーで登場（1名あたり）',
      es: 'Llegada en trineo de huskies (por persona)', 'pt-BR': 'Chegada de trenó de huskies (por pessoa)',
      'zh-CN': '哈士奇雪橇登场（每人）', ko: '허스키 썰매 입장 (1인)',
      fr: 'Arrivée en traîneau à huskies (par personne)', it: 'Arrivo con gli husky (a persona)',
      nl: 'Aankomst per huskyslee (per persoon)', sv: 'Ankomst med husky (per person)',
    },
    range: {
      en: '€196 – €201', fi: '196 – 201 €', de: '196 – 201 €', ja: '196〜201ユーロ',
      es: '196 – 201 €', 'pt-BR': '€ 196 – € 201', 'zh-CN': '196 – 201 欧元',
      ko: '196 – 201유로', fr: '196 – 201 €', it: '196 – 201 €',
      nl: '€ 196 – € 201', sv: '196 – 201 €',
    },
    note: {
      en: 'A 2.5-hour tour with 45 minutes driving your own sled, adult rate. Children pay less.',
      fi: '2,5 tunnin retki, josta 45 min omaa rekeä ajaen, aikuisen hinta. Lapsilta vähemmän.',
      de: 'Eine 2,5-stündige Tour, davon 45 Minuten selbst am Schlitten, Erwachsenenpreis. Kinder zahlen weniger.',
      ja: '2.5時間のツアーで、うち45分は自分でそりを操作します。大人料金で、子どもは割安です。',
      es: 'Una excursión de 2,5 horas, con 45 minutos conduciendo tu propio trineo, precio de adulto. Los niños pagan menos.',
      'pt-BR': 'Um passeio de 2,5 horas, com 45 minutos conduzindo o próprio trenó, preço de adulto. Crianças pagam menos.',
      'zh-CN': '2.5 小时行程，其中 45 分钟自行驾驶雪橇，为成人价格。儿童价格更低。',
      ko: '2.5시간 투어로 그중 45분은 직접 썰매를 몹니다. 성인 요금이며 어린이는 더 저렴합니다.',
      fr: 'Une sortie de 2h30, dont 45 minutes à conduire son propre traîneau, tarif adulte. Les enfants paient moins.',
      it: 'Un’escursione di 2,5 ore, di cui 45 minuti alla guida della propria slitta, tariffa adulti. I bambini pagano meno.',
      nl: 'Een tocht van 2,5 uur, waarvan 45 minuten je eigen slee besturen, volwassenentarief. Kinderen betalen minder.',
      sv: 'En 2,5 timmars tur, varav 45 minuter med egen släde, vuxenpris. Barn betalar mindre.',
    },
    source: { name: 'bearhillhusky.com', url: 'https://bearhillhusky.com/winter-tours/the-happy-trail-tour/' },
  },
  {
    title: {
      en: 'Reindeer arrival (per person)', fi: 'Poro-saapuminen (per hlö)',
      de: 'Ankunft mit Rentieren (pro Person)', ja: 'トナカイで登場（1名あたり）',
      es: 'Llegada en trineo de renos (por persona)', 'pt-BR': 'Chegada de trenó de renas (por pessoa)',
      'zh-CN': '驯鹿雪橇登场（每人）', ko: '순록 썰매 입장 (1인)',
      fr: 'Arrivée en traîneau à rennes (par personne)', it: 'Arrivo con le renne (a persona)',
      nl: 'Aankomst per rendierslee (per persoon)', sv: 'Ankomst med ren (per person)',
    },
    range: {
      en: '€105 – €129', fi: '105 – 129 €', de: '105 – 129 €', ja: '105〜129ユーロ',
      es: '105 – 129 €', 'pt-BR': '€ 105 – € 129', 'zh-CN': '105 – 129 欧元',
      ko: '105 – 129유로', fr: '105 – 129 €', it: '105 – 129 €',
      nl: '€ 105 – € 129', sv: '105 – 129 €',
    },
    note: {
      en: 'A reindeer farm visit with a sled ride, adult rate; children €99.',
      fi: 'Porotilavierailu ja rekiajelu, aikuisen hinta; lapset 99 €.',
      de: 'Besuch einer Rentierfarm mit Schlittenfahrt, Erwachsenenpreis; Kinder 99 €.',
      ja: 'トナカイ牧場の見学とそり体験、大人料金。子どもは99ユーロ。',
      es: 'Visita a una granja de renos con paseo en trineo, precio de adulto; niños 99 €.',
      'pt-BR': 'Visita a uma fazenda de renas com passeio de trenó, preço de adulto; crianças € 99.',
      'zh-CN': '驯鹿农场参观加雪橇体验，为成人价格；儿童 99 欧元。',
      ko: '순록 농장 방문과 썰매 체험, 성인 요금이며 어린이는 99유로입니다.',
      fr: 'Visite d’une ferme de rennes avec balade en traîneau, tarif adulte ; enfants 99 €.',
      it: 'Visita a una fattoria di renne con giro in slitta, tariffa adulti; bambini 99 €.',
      nl: 'Bezoek aan een rendierboerderij met sleerit, volwassenentarief; kinderen € 99.',
      sv: 'Besök på en rengård med slädtur, vuxenpris; barn 99 €.',
    },
    source: { name: 'wildaboutlapland.com', url: 'https://wildaboutlapland.com/authentic-reindeer-farm-visit/' },
  },
];

/**
 * The parts nobody in Lapland puts a number on. Kept visible on purpose: a
 * couple budgeting from this page needs to know which lines they cannot look up
 * and have to request. Checked 2026-07-29 — Arctic SnowHotel's wedding page,
 * for instance, states only "We will be happy to give you a quotation for your
 * wedding".
 */
const quotationOnly: Array<Localized<string>> = [
  {
    en: 'Wedding planner fee', fi: 'Hääsuunnittelijan palkkio', de: 'Honorar des Hochzeitsplaners',
    ja: 'ウェディングプランナー費用', es: 'Honorarios del organizador', 'pt-BR': 'Honorários do organizador',
    'zh-CN': '婚礼策划费用', ko: '웨딩 플래너 비용', fr: 'Honoraires du wedding planner',
    it: 'Onorario del wedding planner', nl: 'Honorarium weddingplanner', sv: 'Bröllopsplanerarens arvode',
  },
  {
    en: 'The venue’s own ceremony fee', fi: 'Hääpaikan oma vihkitilamaksu',
    de: 'Raumgebühr der Location', ja: '会場の挙式使用料', es: 'Tarifa de la ceremonia del lugar',
    'pt-BR': 'Taxa de cerimônia do local', 'zh-CN': '场地的仪式使用费',
    ko: '장소의 예식 이용료', fr: 'Frais de cérémonie du lieu',
    it: 'Costo della cerimonia della location', nl: 'Ceremoniekosten van de locatie',
    sv: 'Platsens egen vigselavgift',
  },
  {
    en: 'Flowers and bouquet', fi: 'Kukat ja kimppu', de: 'Blumen und Brautstrauß',
    ja: '装花とブーケ', es: 'Flores y ramo', 'pt-BR': 'Flores e buquê',
    'zh-CN': '花艺与捧花', ko: '꽃 장식과 부케', fr: 'Fleurs et bouquet',
    it: 'Fiori e bouquet', nl: 'Bloemen en boeket', sv: 'Blommor och brudbukett',
  },
  {
    en: 'Catering per guest', fi: 'Catering per vieras', de: 'Catering pro Gast',
    ja: 'ゲスト1名あたりのケータリング', es: 'Catering por invitado', 'pt-BR': 'Buffet por convidado',
    'zh-CN': '每位宾客的餐饮', ko: '하객 1인당 케이터링', fr: 'Traiteur par invité',
    it: 'Catering per ospite', nl: 'Catering per gast', sv: 'Catering per gäst',
  },
];

type PKey =
  | 'seoTitle' | 'seoDesc' | 'heroEyebrow' | 'heroTitle' | 'heroSubtitle' | 'heroImageAlt'
  | 's1Eyebrow' | 's1Title' | 'exampleDisclaimer'
  | 'floorNote'
  | 'd1Title' | 'd1Body' | 'd2Title' | 'd2Body' | 'd3Title' | 'd3Body'
  | 'pricesChecked' | 'quoteOnlyTitle' | 'quoteOnlyBody'
  | 'whereMoneyGoes' | 'getQuoteLike'
  | 's2Eyebrow' | 's2Title' | 's2Subtitle'
  | 'ctaEyebrow' | 'ctaTitle' | 'ctaBody' | 'ctaButton'
  | 's4Eyebrow' | 's4Title' | 's4Subtitle';

const P: Record<PKey, Localized<string>> = {
  pricesChecked: { en: 'Every price above is read from the operator’s own page, checked {d}. Operators change them, so check the link before you budget on it.', fi: 'Jokainen yllä oleva hinta on luettu toimijan omalta sivulta, tarkistettu {d}. Toimijat muuttavat hintojaan, joten tarkista linkki ennen kuin laskette sen varaan.', de: 'Jeder Preis oben stammt von der eigenen Seite des Anbieters, geprüft am {d}. Anbieter ändern ihre Preise, prüfen Sie also den Link, bevor Sie damit kalkulieren.', ja: '上記の価格はいずれも事業者自身のページから確認したもので、確認日は{d}です。価格は変更されるため、予算に組み込む前にリンク先をご確認ください。', es: 'Cada precio de arriba está tomado de la propia página del proveedor, comprobado el {d}. Los proveedores los cambian, así que revisad el enlace antes de contar con él.', 'pt-BR': 'Cada preço acima foi lido na própria página do operador, verificado em {d}. Os operadores mudam os valores, então confiram o link antes de contar com ele.', 'zh-CN': '以上每个价格均取自经营者自己的页面，核对日期为 {d}。价格会变动，请在据此做预算前先点开链接确认。', ko: '위의 모든 가격은 사업자의 자체 페이지에서 확인한 것이며 확인일은 {d}입니다. 가격은 바뀌므로 예산에 반영하기 전에 링크를 확인해 주세요.', fr: 'Chaque prix ci-dessus est relevé sur la page de l’opérateur lui-même, vérifié le {d}. Les tarifs changent : vérifiez le lien avant de bâtir un budget dessus.', it: 'Ogni prezzo qui sopra è letto dalla pagina dell’operatore stesso, verificato il {d}. Gli operatori li cambiano, quindi controllate il link prima di farci un budget.', nl: 'Elke prijs hierboven komt van de eigen pagina van de aanbieder, gecontroleerd op {d}. Aanbieders wijzigen ze, dus check de link voordat u erop begroot.', sv: 'Varje pris ovan är hämtat från operatörens egen sida, kontrollerat {d}. Operatörer ändrar dem, så kolla länken innan ni budgeterar utifrån det.' },
  quoteOnlyTitle: { en: 'Nobody publishes these', fi: 'Näistä ei löydy julkista hintaa', de: 'Dafür veröffentlicht niemand Preise', ja: 'これらは価格が公開されていません', es: 'Nadie publica estos precios', 'pt-BR': 'Ninguém publica estes preços', 'zh-CN': '这些没有公开价格', ko: '이 항목들은 공개 가격이 없습니다', fr: 'Personne ne publie ces prix', it: 'Per questi nessuno pubblica un prezzo', nl: 'Hiervoor publiceert niemand prijzen', sv: 'Dessa publicerar ingen' },
  quoteOnlyBody: { en: 'We looked. In Lapland these four are quoted on request only, so we would rather leave them blank than invent a figure. Ask for them by name when you contact a planner.', fi: 'Etsimme. Lapissa nämä neljä annetaan vain tarjouksena, joten jätämme ne mieluummin tyhjiksi kuin keksimme luvun. Kysykää ne nimeltä kun otatte yhteyttä suunnittelijaan.', de: 'Wir haben gesucht. In Lappland gibt es diese vier nur auf Anfrage, deshalb lassen wir sie lieber leer, als eine Zahl zu erfinden. Fragen Sie beim Planer ausdrücklich danach.', ja: '調べましたが、ラップランドではこの4項目は見積もりでのみ提示されます。数字を作るより空欄のままにしておきます。プランナーに問い合わせる際は、この4つを名指しでお尋ねください。', es: 'Lo buscamos. En Laponia estos cuatro se dan solo por presupuesto, así que preferimos dejarlos en blanco antes que inventar una cifra. Preguntadlos por su nombre al contactar con un organizador.', 'pt-BR': 'Procuramos. Na Lapônia esses quatro só saem por orçamento, então preferimos deixá-los em branco a inventar um número. Perguntem por eles nominalmente ao falar com um organizador.', 'zh-CN': '我们查过了。在拉普兰，这四项只按需报价，因此我们宁可留空也不编造数字。联系策划师时，请逐项点名询问。', ko: '찾아보았습니다. 라플란드에서 이 네 가지는 견적으로만 제시되므로, 숫자를 지어내기보다 비워 둡니다. 플래너에게 연락하실 때 이 항목들을 콕 집어 물어보세요.', fr: 'Nous avons cherché. En Laponie, ces quatre postes ne sont donnés que sur devis ; nous préférons les laisser vides plutôt qu’inventer un chiffre. Demandez-les nommément au wedding planner.', it: 'Abbiamo cercato. In Lapponia queste quattro voci si danno solo su preventivo, quindi preferiamo lasciarle vuote piuttosto che inventare una cifra. Chiedetele per nome quando contattate un planner.', nl: 'We hebben gezocht. In Lapland komen deze vier alleen op aanvraag, dus laten we ze liever leeg dan een bedrag te verzinnen. Vraag er expliciet naar bij een weddingplanner.', sv: 'Vi letade. I Lappland lämnas de här fyra bara som offert, så vi låter dem hellre vara tomma än hittar på en siffra. Fråga efter dem vid namn när ni kontaktar en planerare.' },

  floorNote: { en: 'What moves the number', fi: 'Mikä summaa liikuttaa', de: 'Was die Summe bewegt', ja: '費用を左右する要素', es: 'Qué mueve la cifra', 'pt-BR': 'O que move o valor', 'zh-CN': '哪些因素影响金额', ko: '금액을 좌우하는 요소', fr: 'Ce qui fait bouger le chiffre', it: 'Cosa muove la cifra', nl: 'Wat het bedrag beweegt', sv: 'Vad som rör summan' },
  d1Title: { en: 'Number of guests', fi: 'Vieraiden määrä', de: 'Zahl der Gäste', ja: 'ゲストの人数', es: 'Número de invitados', 'pt-BR': 'Número de convidados', 'zh-CN': '宾客人数', ko: '하객 수', fr: 'Nombre d’invités', it: 'Numero di ospiti', nl: 'Aantal gasten', sv: 'Antal gäster' },
  d1Body: { en: 'Every guest adds a meal, a transfer and a bed. Going from two to thirty multiplies the total more than any other single choice.', fi: 'Jokainen vieras tuo ruoan, kuljetuksen ja vuoteen. Kahdesta kolmeenkymmeneen siirtyminen moninkertaistaa summan enemmän kuin mikään muu yksittäinen valinta.', de: 'Jeder Gast bedeutet ein Essen, einen Transfer und ein Bett. Der Sprung von zwei auf dreißig vervielfacht die Summe stärker als jede andere einzelne Entscheidung.', ja: 'ゲストが一人増えるごとに、食事、送迎、宿泊が加わります。2名から30名への変化は、ほかのどの選択よりも総額を大きく押し上げます。', es: 'Cada invitado suma una comida, un traslado y una cama. Pasar de dos a treinta multiplica el total más que ninguna otra decisión.', 'pt-BR': 'Cada convidado acrescenta uma refeição, um traslado e uma cama. Passar de dois para trinta multiplica o total mais do que qualquer outra escolha.', 'zh-CN': '每多一位宾客，就多一份餐食、一趟接送和一张床位。从两人增加到三十人，对总额的影响超过任何其他单项选择。', ko: '하객 한 명마다 식사와 이동, 잠자리가 더해집니다. 두 명에서 서른 명으로 늘리는 것이 다른 어떤 선택보다 총액을 크게 올립니다.', fr: 'Chaque invité ajoute un repas, un transfert et un lit. Passer de deux à trente multiplie le total plus que tout autre choix.', it: 'Ogni ospite aggiunge un pasto, un transfer e un letto. Passare da due a trenta moltiplica il totale più di qualsiasi altra scelta.', nl: 'Elke gast betekent een maaltijd, een transfer en een bed. Van twee naar dertig gaan vermenigvuldigt het totaal sterker dan welke andere keuze ook.', sv: 'Varje gäst innebär en måltid, en transfer och en säng. Att gå från två till trettio mångdubblar summan mer än något annat enskilt val.' },
  d2Title: { en: 'Season', fi: 'Sesonki', de: 'Saison', ja: 'シーズン', es: 'Temporada', 'pt-BR': 'Temporada', 'zh-CN': '季节', ko: '시즌', fr: 'Saison', it: 'Stagione', nl: 'Seizoen', sv: 'Säsong' },
  d2Body: { en: 'December to March is the expensive stretch: accommodation and activities are at their peak. Spring and autumn cost clearly less for the same programme.', fi: 'Jouluk.–maalisk. on kallein jakso: majoitus ja ohjelmapalvelut ovat huipussaan. Kevät ja syksy maksavat samasta ohjelmasta selvästi vähemmän.', de: 'Dezember bis März ist der teure Abschnitt: Unterkunft und Programm sind auf dem Höchststand. Frühjahr und Herbst kosten für dasselbe Programm deutlich weniger.', ja: '12月から3月が最も高い時期で、宿泊もアクティビティも価格のピークを迎えます。同じ内容でも春と秋なら明らかに安く収まります。', es: 'De diciembre a marzo es el tramo caro: el alojamiento y las actividades están en su punto más alto. Primavera y otoño cuestan claramente menos por el mismo programa.', 'pt-BR': 'De dezembro a março é o trecho caro: hospedagem e atividades estão no pico. Primavera e outono custam claramente menos pelo mesmo programa.', 'zh-CN': '十二月至三月是最贵的时段，住宿与活动均处于价格高峰。同样的安排，在春秋两季明显更便宜。', ko: '12월부터 3월까지가 가장 비싼 시기로, 숙박과 액티비티 요금이 정점에 이릅니다. 같은 구성이라도 봄과 가을은 확실히 저렴합니다.', fr: 'De décembre à mars, c’est la période chère : hébergement et activités sont au plus haut. Le printemps et l’automne coûtent nettement moins pour le même programme.', it: 'Da dicembre a marzo è il periodo caro: alloggio e attività sono al massimo. Primavera e autunno costano nettamente meno a parità di programma.', nl: 'December tot maart is het dure stuk: overnachtingen en activiteiten staan op hun hoogst. Voorjaar en najaar kosten voor hetzelfde programma duidelijk minder.', sv: 'December till mars är den dyra perioden: boende och aktiviteter ligger på topp. Vår och höst kostar klart mindre för samma program.' },
  d3Title: { en: 'Nights and programme', fi: 'Yöt ja ohjelma', de: 'Nächte und Programm', ja: '宿泊数とプログラム', es: 'Noches y programa', 'pt-BR': 'Noites e programação', 'zh-CN': '住宿天数与活动安排', ko: '숙박과 프로그램', fr: 'Nuits et programme', it: 'Notti e programma', nl: 'Nachten en programma', sv: 'Nätter och program' },
  d3Body: { en: 'A glass igloo for one night and a cabin for the rest is a different figure from three nights under glass. Husky, reindeer and snowmobile outings are priced per person, per trip.', fi: 'Yksi yö lasi-iglussa ja loput mökissä on eri summa kuin kolme yötä lasikaton alla. Husky-, poro- ja kelkkaretket hinnoitellaan per henkilö ja per retki.', de: 'Eine Nacht im Glasiglu und der Rest in einer Hütte ist eine andere Zahl als drei Nächte unter Glas. Husky-, Rentier- und Schneemobiltouren werden pro Person und pro Ausflug berechnet.', ja: 'ガラスイグルーに1泊して残りをコテージで過ごす場合と、3泊すべてをガラス屋根の下で過ごす場合とでは金額が異なります。ハスキー、トナカイ、スノーモービルの各ツアーは一人あたり・一回あたりの料金です。', es: 'Una noche en iglú de cristal y el resto en cabaña es una cifra distinta a tres noches bajo el cristal. Las excursiones de huskies, renos y motos de nieve se cobran por persona y por salida.', 'pt-BR': 'Uma noite em iglu de vidro e o resto em cabana dá um número diferente de três noites sob o vidro. Passeios de husky, rena e moto de neve são cobrados por pessoa e por saída.', 'zh-CN': '在玻璃冰屋住一晚、其余住木屋，与三晚都住在玻璃屋顶下，是两个不同的数字。哈士奇、驯鹿和雪地摩托行程按人次计价。', ko: '유리 이글루에서 하룻밤을 보내고 나머지를 캐빈에서 지내는 것과 사흘 내내 유리 지붕 아래에서 묵는 것은 금액이 다릅니다. 허스키, 순록, 스노모빌 투어는 1인당, 1회당 요금입니다.', fr: 'Une nuit en igloo de verre et le reste en chalet, ce n’est pas le même chiffre que trois nuits sous le verre. Les sorties husky, renne et motoneige se facturent par personne et par excursion.', it: 'Una notte in igloo di vetro e il resto in chalet è una cifra diversa da tre notti sotto il vetro. Le escursioni con husky, renne e motoslitte si pagano a persona e a uscita.', nl: 'Eén nacht in een glazen iglo en de rest in een cabin is een ander bedrag dan drie nachten onder glas. Husky-, rendier- en sneeuwscootertochten rekenen per persoon en per tocht.', sv: 'En natt i glasigloo och resten i stuga är en annan siffra än tre nätter under glas. Husky-, ren- och skoterturer prissätts per person och per tur.' },
  seoTitle: { en: 'Lapland Wedding Costs: from EUR 5,000 | LaplandWeddings', fi: 'Häiden hinta Lapissa: alkaen 5 000 € | LaplandWeddings', de: 'Hochzeitskosten in Lappland: ab 5 000 € | LaplandWeddings', ja: 'ラップランドの結婚式費用：5,000ユーロから | LaplandWeddings', es: 'Coste de una boda en Laponia: desde 5 000 € | LaplandWeddings', 'pt-BR': 'Custo de casamento na Lapônia: a partir de € 5.000 | LaplandWeddings', 'zh-CN': '拉普兰婚礼费用：5,000 欧元起 | LaplandWeddings', ko: '라플란드 결혼식 비용: 5,000유로부터 | LaplandWeddings', fr: 'Coût d’un mariage en Laponie : à partir de 5 000 € | LaplandWeddings', it: 'Costi matrimonio in Lapponia: da 5 000 € | LaplandWeddings', nl: 'Bruiloftskosten in Lapland: vanaf € 5.000 | LaplandWeddings', sv: 'Bröllopskostnader i Lappland: från 5 000 € | LaplandWeddings' },
  seoDesc: { en: 'What does a wedding in Lapland cost? Our smallest budget is EUR 5,000. What that covers, what pushes the number up, and price ranges for each part of the day.', fi: 'Mitä häät Lapissa maksavat? Pienin realistinen budjetti on 5 000 €. Mitä se kattaa, mikä summaa nostaa ja hintahaarukat päivän jokaiselle osalle.', de: 'Was kostet eine Hochzeit in Lappland? Unser kleinstes Budget sind 5 000 €. Was darin enthalten ist, was die Summe erhöht, und Preisspannen für jeden Teil des Tages.', ja: 'ラップランドの結婚式はいくら？当サイトが承る最小のご予算は5,000ユーロです。その内訳、費用が上がる要因、そして各項目の価格帯をご紹介します。', es: '¿Cuánto cuesta una boda en Laponia? Nuestro presupuesto mínimo son 5 000 €. Qué incluye, qué eleva la cifra y rangos de precio para cada parte del día.', 'pt-BR': 'Quanto custa um casamento na Lapônia? Nosso orçamento mínimo é de € 5.000. O que ele cobre, o que aumenta o valor e faixas de preço para cada parte do dia.', 'zh-CN': '在拉普兰办婚礼要花多少钱？我们承接的最低预算为 5,000 欧元。本页说明这笔预算涵盖什么、哪些因素会推高费用，以及当天各项开支的价格区间。', ko: '라플란드 결혼식 비용은 얼마일까요? 저희가 진행하는 최소 예산은 5,000유로입니다. 그 안에 무엇이 포함되는지, 무엇이 금액을 높이는지, 그리고 항목별 가격대를 정리했습니다.', fr: 'Combien coûte un mariage en Laponie ? Notre budget minimum est de 5 000 €. Ce qu’il couvre, ce qui fait grimper le chiffre, et les fourchettes de prix pour chaque poste.', it: 'Quanto costa un matrimonio in Lapponia? Il nostro budget minimo è di 5 000 €. Cosa comprende, cosa fa salire la cifra e le fasce di prezzo per ogni voce.', nl: 'Wat kost een bruiloft in Lapland? Ons kleinste budget is € 5.000. Wat dat dekt, wat het bedrag omhoog duwt en prijsranges voor elk onderdeel van de dag.', sv: 'Vad kostar ett bröllop i Lappland? Vår minsta budget är 5 000 €. Vad den täcker, vad som driver upp summan och prisintervall för varje del av dagen.' },
  heroEyebrow: {
    en: 'Pricing', fi: 'Hinta-arviot', de: 'Preise', ja: '費用',
    es: 'Precios', 'pt-BR': 'Preços', 'zh-CN': '价格', ko: '가격',
    fr: 'Tarifs', it: 'Prezzi', nl: 'Prijzen', sv: 'Priser',
  },
  heroTitle: {
    en: 'What a Lapland wedding really costs',
    fi: 'Mitä häät Lapissa oikeasti maksaa',
    de: 'Was eine Hochzeit in Lappland wirklich kostet',
    ja: 'ラップランドの結婚式の本当の費用',
    es: 'Lo que cuesta de verdad una boda en Laponia',
    'pt-BR': 'Quanto custa de verdade um casamento na Lapônia',
    'zh-CN': '在拉普兰办婚礼到底要花多少钱',
    ko: '라플란드 결혼식의 실제 비용',
    fr: 'Ce que coûte vraiment un mariage en Laponie',
    it: 'Quanto costa davvero un matrimonio in Lapponia',
    nl: 'Wat een bruiloft in Lapland echt kost', sv: 'Vad ett bröllop i Lappland faktiskt kostar',
  },
  heroSubtitle: { en: 'The smallest budget we take on is EUR 5,000. Below: what makes up that sum, and what pushes it higher.', fi: 'Pienin budjetti jolla lähdemme liikkeelle on 5 000 €. Alla mistä summa muodostuu ja mikä sitä nostaa.', de: 'Das kleinste Budget, mit dem wir arbeiten, sind 5 000 €. Unten: woraus sich die Summe zusammensetzt und was sie erhöht.', ja: 'お受けする最小のご予算は5,000ユーロです。以下では、その金額の内訳と、費用が上がる要因をご説明します。', es: 'El presupuesto mínimo con el que trabajamos son 5 000 €. Abajo: de qué se compone esa cifra y qué la eleva.', 'pt-BR': 'O menor orçamento com que trabalhamos é de € 5.000. Abaixo: do que se compõe essa quantia e o que a aumenta.', 'zh-CN': '我们承接的最低预算为 5,000 欧元。以下说明这笔预算的构成，以及哪些因素会推高费用。', ko: '저희가 진행하는 최소 예산은 5,000유로입니다. 아래에서 그 금액의 구성과 비용을 높이는 요인을 설명합니다.', fr: 'Le budget minimum que nous prenons en charge est de 5 000 €. Ci-dessous : ce qui compose cette somme et ce qui la fait grimper.', it: 'Il budget minimo con cui lavoriamo è di 5 000 €. Qui sotto: da cosa è composta quella cifra e cosa la fa salire.', nl: 'Het kleinste budget waarmee wij werken is € 5.000. Hieronder: waaruit dat bedrag bestaat en wat het omhoog duwt.', sv: 'Den minsta budget vi åtar oss är 5 000 €. Nedan: vad summan består av och vad som driver upp den.' },
  heroImageAlt: {
    en: 'Lapland wedding couple in winter',
    fi: 'Lapin hääpari talvisessa maisemassa',
    de: 'Lappländisches Hochzeitspaar im Winter',
    ja: '冬のラップランドの結婚式カップル',
    es: 'Pareja de novios de Laponia en invierno',
    'pt-BR': 'Casal de noivos da Lapônia no inverno',
    'zh-CN': '冬季拉普兰的新婚夫妇',
    ko: '겨울 라플란드의 신혼부부',
    fr: 'Couple de mariés en Laponie en hiver',
    it: 'Coppia di sposi in Lapponia d’inverno',
    nl: 'Laplands bruidspaar in de winter', sv: 'Brudpar i Lappland på vintern',
  },
  s1Eyebrow: { en: 'Starting point', fi: 'Lähtötaso', de: 'Ausgangspunkt', ja: 'スタートライン', es: 'Punto de partida', 'pt-BR': 'Ponto de partida', 'zh-CN': '起点', ko: '시작 기준', fr: 'Point de départ', it: 'Punto di partenza', nl: 'Startpunt', sv: 'Utgångsläge' },
  s1Title: { en: 'The smallest budget is EUR 5,000', fi: 'Pienin budjetti on 5 000 €', de: 'Das kleinste Budget sind 5 000 €', ja: '最小のご予算は5,000ユーロ', es: 'El presupuesto mínimo son 5 000 €', 'pt-BR': 'O orçamento mínimo é de € 5.000', 'zh-CN': '最低预算为 5,000 欧元', ko: '최소 예산은 5,000유로입니다', fr: 'Le budget minimum est de 5 000 €', it: 'Il budget minimo è di 5 000 €', nl: 'Het kleinste budget is € 5.000', sv: 'Den minsta budgeten är 5 000 €' },
  whereMoneyGoes: {
    en: 'Where the money goes', fi: 'Mihin raha kuluu', de: 'Wohin das Geld fließt',
    ja: 'お金の使い道', es: 'Adónde va el dinero', 'pt-BR': 'Para onde vai o dinheiro',
    'zh-CN': '钱花在哪里', ko: '돈이 어디에 쓰이는가', fr: 'Où va l’argent',
    it: 'Dove va il denaro', nl: 'Waar het geld naartoe gaat', sv: 'Vart pengarna går',
  },
  exampleDisclaimer: { en: 'This is the smallest budget at which we pass an enquiry on to the planners. It is not the cheapest wedding possible in Lapland: below it, a planner cannot put together something worth travelling here for, so we would rather say so now than waste your time.', fi: 'Tämä on pienin budjetti, jolla välitämme toimeksiannon suunnittelijoille. Se ei ole halvin mahdollinen tapa mennä naimisiin Lapissa: sen alle jäävällä summalla suunnittelija ei saa kokoon kokonaisuutta, jonka vuoksi kannattaa matkustaa tänne. Sanomme sen mieluummin heti kuin tuhlaamme aikaanne.', de: 'Das ist das kleinste Budget, mit dem wir eine Anfrage an die Hochzeitsplaner weitergeben. Es ist nicht die günstigste Hochzeit, die in Lappland möglich wäre: darunter bekommt ein Planer nichts zusammen, wofür sich die Reise lohnt. Das sagen wir lieber jetzt, als Ihre Zeit zu verschwenden.', ja: 'これは、私たちがプランナーにお問い合わせをお繋ぎする最小のご予算です。ラップランドで挙式できる最安の金額という意味ではありません。これを下回ると、はるばるお越しいただく価値のある内容をプランナーが組めないため、お時間を無駄にする前に正直にお伝えしています。', es: 'Este es el presupuesto mínimo con el que trasladamos una consulta a los organizadores. No es la boda más barata posible en Laponia: por debajo, un organizador no puede montar algo por lo que merezca la pena viajar hasta aquí, y preferimos decirlo ahora antes que haceros perder el tiempo.', 'pt-BR': 'Este é o menor orçamento com que encaminhamos um pedido aos organizadores. Não é o casamento mais barato possível na Lapônia: abaixo disso, um organizador não consegue montar algo que justifique a viagem até aqui, e preferimos dizer isso agora a fazer vocês perderem tempo.', 'zh-CN': '这是我们将咨询转交给策划师的最低预算。它并不代表在拉普兰结婚的最低花费：低于这个数额，策划师无法安排出值得你们专程前来的内容，我们宁愿现在就说清楚，也不愿浪费你们的时间。', ko: '이것은 저희가 문의를 플래너에게 전달하는 최소 예산입니다. 라플란드에서 결혼할 수 있는 가장 저렴한 금액이라는 뜻은 아닙니다. 이보다 낮으면 플래너가 먼 길을 오실 만한 구성을 만들 수 없기에, 시간을 낭비하시기 전에 미리 말씀드립니다.', fr: 'C’est le budget minimum à partir duquel nous transmettons une demande aux wedding planners. Ce n’est pas le mariage le moins cher possible en Laponie : en dessous, un planner ne peut pas monter quelque chose qui justifie le voyage jusqu’ici, et nous préférons le dire tout de suite plutôt que de vous faire perdre du temps.', it: 'Questo è il budget minimo con cui trasmettiamo una richiesta ai wedding planner. Non è il matrimonio più economico possibile in Lapponia: al di sotto, un planner non riesce a costruire qualcosa per cui valga la pena viaggiare fin qui, e preferiamo dirlo subito piuttosto che farvi perdere tempo.', nl: 'Dit is het kleinste budget waarmee wij een aanvraag doorgeven aan de weddingplanners. Het is niet de goedkoopste bruiloft die in Lapland mogelijk is: daaronder krijgt een planner niets samengesteld waarvoor de reis hierheen de moeite waard is, en dat zeggen we liever nu dan dat we uw tijd verspillen.', sv: 'Det här är den minsta budget som vi för en förfrågan vidare till planerarna med. Det är inte det billigaste bröllop som går att ordna i Lappland: under den nivån får en planerare inte ihop något som är värt resan hit, och det säger vi hellre nu än slösar er tid.' },
  getQuoteLike: {
    en: 'Get a quote for a wedding like this',
    fi: 'Pyydä tarjous tällaisille häille',
    de: 'Angebot für eine solche Hochzeit anfordern',
    ja: 'このような結婚式の見積もりを依頼',
    es: 'Solicita un presupuesto para una boda así',
    'pt-BR': 'Peça um orçamento para um casamento como este',
    'zh-CN': '获取类似婚礼的报价',
    ko: '이런 결혼식 견적 받기',
    fr: 'Demander un devis pour un mariage comme celui-ci',
    it: 'Richiedi un preventivo per un matrimonio come questo',
    nl: 'Vraag een offerte aan voor zo’n bruiloft', sv: 'Begär offert för ett bröllop som detta',
  },
  s2Eyebrow: {
    en: 'Individual costs', fi: 'Yksittäiset kustannukset', de: 'Einzelkosten',
    ja: '個別の費用', es: 'Costes individuales', 'pt-BR': 'Custos individuais',
    'zh-CN': '单项费用', ko: '개별 비용', fr: 'Coûts individuels',
    it: 'Costi singoli', nl: 'Afzonderlijke kosten', sv: 'Enskilda kostnader',
  },
  s2Title: {
    en: 'What goes into the price', fi: 'Mistä häiden hinta koostuu',
    de: 'Was den Preis ausmacht', ja: '価格の内訳',
    es: 'Qué compone el precio', 'pt-BR': 'O que compõe o preço',
    'zh-CN': '价格由哪些部分组成', ko: '가격을 구성하는 항목',
    fr: 'Ce qui compose le prix', it: 'Cosa compone il prezzo',
    nl: 'Waaruit de prijs bestaat', sv: 'Vad som ingår i priset',
  },
  s2Subtitle: { en: 'Each line below is a real published price from a Lapland operator, with the link to the page it came from. Prices are per the operator, not per us.', fi: 'Jokainen alla oleva rivi on lappilaisen toimijan oikea julkaistu hinta, ja mukana on linkki sivulle josta se on luettu. Hinnat ovat toimijan, eivät meidän.', de: 'Jede Zeile unten ist ein tatsächlich veröffentlichter Preis eines lappländischen Anbieters, mit Link auf die Seite, von der er stammt. Die Preise sind die des Anbieters, nicht unsere.', ja: '以下の各項目は、ラップランドの事業者が実際に公開している価格で、出典ページへのリンクを添えています。価格は各事業者のものであり、当サイトのものではありません。', es: 'Cada línea de abajo es un precio realmente publicado por un proveedor de Laponia, con el enlace a la página de la que procede. Los precios son del proveedor, no nuestros.', 'pt-BR': 'Cada linha abaixo é um preço realmente publicado por um operador da Lapônia, com o link para a página de onde veio. Os preços são do operador, não nossos.', 'zh-CN': '下面每一行都是拉普兰经营者实际公开的价格，并附有来源页面链接。价格属于各经营者，而非本站。', ko: '아래 각 항목은 라플란드 사업자가 실제로 공개한 가격이며, 출처 페이지 링크를 함께 표시했습니다. 가격은 해당 사업자의 것이며 저희의 가격이 아닙니다.', fr: 'Chaque ligne ci-dessous est un prix réellement publié par un prestataire lapon, avec le lien vers la page dont il provient. Les prix sont ceux du prestataire, pas les nôtres.', it: 'Ogni riga qui sotto è un prezzo davvero pubblicato da un operatore della Lapponia, con il link alla pagina da cui proviene. I prezzi sono dell’operatore, non nostri.', nl: 'Elke regel hieronder is een echt gepubliceerde prijs van een Laplandse aanbieder, met de link naar de pagina waar hij vandaan komt. De prijzen zijn van de aanbieder, niet van ons.', sv: 'Varje rad nedan är ett faktiskt publicerat pris från en lappländsk aktör, med länk till sidan det kommer från. Priserna är aktörens, inte våra.' },
  ctaEyebrow: {
    en: 'When you know your budget', fi: 'Kun budjetti on selvillä',
    de: 'Wenn Sie Ihr Budget kennen', ja: '予算が決まったら',
    es: 'Cuando conoces tu presupuesto', 'pt-BR': 'Quando você já sabe seu orçamento',
    'zh-CN': '当你确定了预算', ko: '예산이 정해졌다면',
    fr: 'Quand vous connaissez votre budget', it: 'Quando conosci il tuo budget',
    nl: 'Als je je budget kent', sv: 'När du vet din budget',
  },
  ctaTitle: {
    en: 'Get 1–3 quotes, compare at your own pace',
    fi: 'Pyydä 1–3 tarjousta, vertaile rauhassa',
    de: 'Holen Sie 1–3 Angebote ein, vergleichen Sie in Ruhe',
    ja: '1〜3つの見積もりを取得、自分のペースで比較',
    es: 'Recibe 1–3 presupuestos, compara a tu ritmo',
    'pt-BR': 'Receba 1–3 orçamentos, compare no seu ritmo',
    'zh-CN': '获取 1–3 份报价，按自己的节奏比较',
    ko: '견적 1–3건 받기, 여유롭게 비교하세요',
    fr: 'Obtenez 1 à 3 devis, comparez à votre rythme',
    it: 'Ottieni 1–3 preventivi, confronta con calma',
    nl: 'Ontvang 1–3 offertes, vergelijk op je eigen tempo', sv: 'Få 1–3 offerter och jämför i din egen takt',
  },
  ctaBody: {
    en: 'One form, 1–7 days, 1–3 personalised proposals from Lapland’s most experienced planners. Free, no commitment. You decide who to continue with.',
    fi: 'Yhdellä lomakkeella saat 1–7 päivän sisällä 1–3 räätälöityä tarjousta Lapin kokeneimmilta hääsuunnittelijoilta. Maksuton, ei sitoumusta. Sinä päätät kenen kanssa jatkat.',
    de: 'Ein Formular, 1–7 Tage, 1–3 individuelle Angebote von Lapplands erfahrensten Planern. Kostenlos, unverbindlich. Sie entscheiden, mit wem Sie weitermachen.',
    ja: 'フォームを1つ、1〜7日で、ラップランドで最も経験豊富なプランナーから1〜3つのオーダーメイド提案。無料・無拘束。誰と進めるかはあなた次第です。',
    es: 'Un formulario, de 1 a 7 días, 1–3 propuestas personalizadas de los organizadores más experimentados de Laponia. Gratis, sin compromiso: tú decides con quién seguir.',
    'pt-BR': 'Um formulário, de 1 a 7 dias, 1–3 propostas personalizadas dos organizadores mais experientes da Lapônia. Grátis, sem compromisso. Você decide com quem continuar.',
    'zh-CN': '一份表单，1–7 天，来自拉普兰最有经验策划师的 1–3 份个性化方案。免费、无约束，由你决定与谁继续。',
    ko: '양식 하나, 1~7일, 라플란드에서 가장 경험 많은 플래너의 맞춤 제안 1–3건. 무료, 부담 없음. 누구와 진행할지는 당신이 결정합니다.',
    fr: 'Un formulaire, 1 à 7 jours, 1 à 3 propositions personnalisées des planners les plus expérimentés de Laponie. Gratuit, sans engagement. Vous décidez avec qui continuer.',
    it: 'Un modulo, 1–7 giorni, 1–3 proposte personalizzate dai planner più esperti della Lapponia. Gratis, senza impegno. Decidi tu con chi proseguire.',
    nl: 'Eén formulier, 1–7 dagen, 1–3 persoonlijke voorstellen van de meest ervaren planners van Lapland. Gratis, vrijblijvend. Jij bepaalt met wie je verdergaat.', sv: 'Ett formulär, 1–7 dagar, 1–3 personliga offerter från Lapplands mest erfarna bröllopsplanerare. Gratis och utan förbindelse. Du bestämmer vem du går vidare med.',
  },
  ctaButton: {
    en: 'Start the 5-minute form', fi: 'Aloita 5 minuutin lomake',
    de: 'Das 5-Minuten-Formular starten', ja: '5分のフォームを始める',
    es: 'Empieza el formulario de 5 minutos', 'pt-BR': 'Comece o formulário de 5 minutos',
    'zh-CN': '开始 5 分钟表单', ko: '5분 양식 시작하기',
    fr: 'Commencer le formulaire de 5 minutes', it: 'Inizia il modulo di 5 minuti',
    nl: 'Start het formulier van 5 minuten', sv: 'Starta formuläret – 5 minuter',
  },
  s4Eyebrow: {
    en: 'Direct contact', fi: 'Suora kontakti', de: 'Direkter Kontakt',
    ja: '直接のお問い合わせ', es: 'Contacto directo', 'pt-BR': 'Contato direto',
    'zh-CN': '直接联系', ko: '직접 문의', fr: 'Contact direct',
    it: 'Contatto diretto', nl: 'Direct contact', sv: 'Direktkontakt',
  },
  s4Title: {
    en: 'Or fill in the form right here', fi: 'Tai täytä lomake nyt',
    de: 'Oder füllen Sie das Formular direkt hier aus', ja: 'またはこちらでフォームに記入',
    es: 'O rellena el formulario aquí mismo', 'pt-BR': 'Ou preencha o formulário aqui mesmo',
    'zh-CN': '或在此直接填写表单', ko: '또는 여기에서 바로 양식을 작성하세요',
    fr: 'Ou remplissez le formulaire ici même', it: 'Oppure compila il modulo qui',
    nl: 'Of vul het formulier hier direct in', sv: 'Eller fyll i formuläret här',
  },
  s4Subtitle: {
    en: 'Specify the budget field so we can match you with planners at the right price level.',
    fi: 'Mainitse kenttä "Budjetti" niin osaamme valita oikealla hintatasolla suunnittelevia kumppaneita.',
    de: 'Geben Sie das Budgetfeld an, damit wir Sie mit Planern auf dem richtigen Preisniveau zusammenbringen können.',
    ja: '「予算」欄をご記入いただくと、適切な価格帯のプランナーをご紹介できます。',
    es: 'Indica el campo de presupuesto para que podamos emparejarte con organizadores del nivel de precio adecuado.',
    'pt-BR': 'Informe o campo de orçamento para que possamos conectar você a organizadores do nível de preço certo.',
    'zh-CN': '请填写"预算"一栏，以便我们为你匹配价格档位合适的策划师。',
    ko: '"예산" 항목을 입력하시면 적절한 가격대의 플래너와 연결해 드립니다.',
    fr: 'Renseignez le champ budget pour que nous puissions vous orienter vers des planners au bon niveau de prix.',
    it: 'Indica il campo budget così possiamo abbinarti a planner del giusto livello di prezzo.',
    nl: 'Geef het budgetveld op, zodat we je kunnen koppelen aan planners in de juiste prijsklasse.', sv: 'Ange budgetfältet så kan vi matcha dig med planerare i rätt prisklass.',
  },
};

export default function Pricing() {
  const { lang } = useLang();
  const p = (k: PKey) => pickLocalized(P[k], lang);

  return (
    <>
      <SEO
        title={p('seoTitle')}
        description={p('seoDesc')}
        path="/pricing"
      />
      <PageHero
        compact
        eyebrow={p('heroEyebrow')}
        title={p('heroTitle')}
        subtitle={p('heroSubtitle')}
        image="/images/heroes/pricing-hero.webp"
        imageAlt={p('heroImageAlt')}
      />

      <Section
        eyebrow={p('s1Eyebrow')}
        title={p('s1Title')}
        subtitle={p('exampleDisclaimer')}
      >
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {([['d1Title', 'd1Body'], ['d2Title', 'd2Body'], ['d3Title', 'd3Body']] as const).map(
            ([tk, bk]) => (
              <div key={tk} className="bg-night-light/60 border border-white/5 rounded-2xl p-6 sm:p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-aurora-pink font-semibold mb-2.5">
                  {p(tk)}
                </p>
                <p className="text-sm text-gray-300 leading-[1.7]">{p(bk)}</p>
              </div>
            ),
          )}
        </div>
      </Section>

      <Section
        className="bg-night-light/30"
        eyebrow={p('s2Eyebrow')}
        title={p('s2Title')}
        subtitle={p('s2Subtitle')}
      >
        <div className="max-w-3xl mx-auto bg-night-light/60 border border-white/5 rounded-2xl overflow-hidden">
          {breakdown.map((b, i) => (
            <div key={b.title.en} className={`px-5 sm:px-7 py-5 ${i !== 0 ? 'border-t border-white/5' : ''}`}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[15px] font-semibold text-gray-200 min-w-0">{pickLocalized(b.title, lang)}</p>
                <p className="font-heading tracking-wide text-rose text-base sm:text-lg whitespace-nowrap shrink-0">
                  {pickLocalized(b.range, lang)}
                </p>
              </div>
              {b.note && (
                <p className="text-[13px] text-gray-300 leading-[1.65] mt-1.5">{pickLocalized(b.note, lang)}</p>
              )}
              {/* The source is the point. A price with no link back to the page
                  it came from is indistinguishable from one we made up, which is
                  exactly what this table used to be. */}
              <a
                href={b.source.url}
                target="_blank"
                rel="noopener"
                className="inline-block text-[12px] mt-2 underline underline-offset-2"
                style={{ color: 'var(--color-rose-ink)' }}
              >
                {b.source.name} ↗
              </a>
            </div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto text-center text-xs text-gray-400 mt-4">
          {p('pricesChecked').replace('{d}', PRICE_VERIFIED)}
        </p>

        {/* Deliberately visible: which lines a couple cannot look up anywhere. */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-aurora-pink font-semibold mb-3 text-center">
            {p('quoteOnlyTitle')}
          </p>
          <p className="text-sm text-gray-300 leading-[1.7] text-center mb-5">{p('quoteOnlyBody')}</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {quotationOnly.map((q) => (
              <li
                key={q.en}
                className="text-[13px] px-3.5 py-1.5 rounded-full bg-night-light/60 border border-white/10 text-gray-200"
              >
                {pickLocalized(q, lang)}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-aurora-purple/15 via-rose/15 to-aurora-pink/15">
        <div className="max-w-3xl mx-auto bg-night-light/70 border border-rose/30 rounded-3xl p-8 sm:p-10 text-center">
          <p className="uppercase tracking-[0.25em] text-[11px] sm:text-xs text-aurora-pink font-semibold mb-3">
            {p('ctaEyebrow')}
          </p>
          <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide mb-3 leading-tight">
            {p('ctaTitle')}
          </h3>
          <p className="text-base text-gray-300 leading-relaxed mb-6 max-w-xl mx-auto">
            {p('ctaBody')}
          </p>
          <L
            to="/contact"
            className="inline-flex items-center px-7 py-3.5 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-lg shadow-rose/30 transition-colors"
          >
            {p('ctaButton')} →
          </L>
        </div>
      </Section>

      <Section
        eyebrow={p('s4Eyebrow')}
        title={p('s4Title')}
        subtitle={p('s4Subtitle')}
      >
        <LeadForm />
      </Section>
    </>
  );
}
