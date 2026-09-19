import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import SeasonBand from '../components/SeasonBand';
import L from '../components/L';
import { useLang } from '../i18n/LangContext';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

/**
 * /photographers, rewritten 19.9.2026 as an editorial guide.
 *
 * Until today this page was a directory of six named photographers with texts
 * copied from their own sites (awards, magazine features), free outbound links
 * and no agreement with any of them. Vesa, looking at it live: "pitääkö nämä
 * paikkansa ja millä funktiolla me näitä yhteystietoja edes jaamme täällä?"
 * The same class of surface was hidden on 4.7.2026 (planner directory, memory
 * weddings_planners_hidden_no_consent) and the 11.9.2026 rule says no free
 * referrals ("ei me nyt ohjata minnekään ilman että siitä saadaan rahaa").
 *
 * The page now answers what a couple actually searches for (ja: フォトウェディング,
 * fi: hääkuvaaja, de: Hochzeitsfotograf) without naming or linking any business,
 * and ends in our own form. `src/data/photographers.ts` stays in the repo,
 * unrendered, for the day a photographer signs a partnership.
 *
 * The price figures below are the ones already published on /pricing with their
 * source (a Rovaniemi photographer's public price list, laplandphotographer.com);
 * no number here is new to the site.
 */

type Bag = Localized<string>;

const P: Record<
  | 'seoTitle' | 'seoDesc' | 'title' | 'subtitle' | 'imageAlt'
  | 'costTitle' | 'costBody' | 'costLink'
  | 'askTitle' | 'ask1' | 'ask2' | 'ask3' | 'ask4'
  | 'whenTitle' | 'whenBody' | 'whenPeak' | 'whenOff'
  | 'formTitle' | 'formSub' | 'formPreset'
  | 'note',
  Bag
> = {
  seoTitle: {
    en: 'Wedding Photography in Lapland: Costs, Questions, Timing | LaplandWeddings',
    fi: 'Hääkuvaus Lapissa: hinnat, kysymykset ja ajoitus | LaplandWeddings',
    de: 'Hochzeitsfotografie in Lappland: Kosten, Fragen, Zeitplan | LaplandWeddings',
    ja: 'フィンランド・ラップランドでフォトウェディング：費用と準備 | LaplandWeddings',
    es: 'Fotografía de boda en Laponia: costos, preguntas y fechas | LaplandWeddings',
    'pt-BR': 'Fotografia de casamento na Lapônia: custos, perguntas e datas | LaplandWeddings',
    'zh-CN': '拉普兰婚礼摄影：费用、问题与时间 | LaplandWeddings',
    ko: '라플란드 웨딩 촬영: 비용, 질문, 예약 시기 | LaplandWeddings',
    fr: 'Photographe de mariage en Laponie : tarifs, questions, calendrier | LaplandWeddings',
    it: 'Fotografo di matrimonio in Lapponia: costi, domande, tempi | LaplandWeddings',
    nl: 'Trouwfotografie in Lapland: kosten, vragen, timing | LaplandWeddings',
    sv: 'Bröllopsfotograf i Lappland: kostnad, frågor, tidpunkt | LaplandWeddings',
  },
  seoDesc: {
    en: 'What a wedding photographer costs in Lapland, four questions to ask before booking, and when the winter dates fill up. Independent guide, no photographer represented.',
    fi: 'Mitä hääkuvaaja maksaa Lapissa, neljä kysymystä ennen varausta ja milloin talven päivät täyttyvät. Riippumaton opas, emme edusta yhtäkään kuvaajaa.',
    de: 'Was ein Hochzeitsfotograf in Lappland kostet, vier Fragen vor der Buchung und wann die Wintertermine voll sind. Unabhängiger Leitfaden, wir vertreten keinen Fotografen.',
    ja: 'ラップランドの結婚式撮影の費用、予約前に確認したい4つの質問、冬の日程が埋まる時期。独立した立場のガイドで、特定のフォトグラファーを代理していません。',
    es: 'Cuánto cuesta un fotógrafo de boda en Laponia, cuatro preguntas antes de reservar y cuándo se agotan las fechas de invierno. Guía independiente, no representamos a ningún fotógrafo.',
    'pt-BR': 'Quanto custa um fotógrafo de casamento na Lapônia, quatro perguntas antes de reservar e quando as datas de inverno esgotam. Guia independente, não representamos nenhum fotógrafo.',
    'zh-CN': '拉普兰婚礼摄影师的费用、预订前要问的四个问题，以及冬季档期何时订满。独立指南，不代理任何摄影师。',
    ko: '라플란드 웨딩 촬영 비용, 예약 전 확인할 네 가지 질문, 겨울 날짜가 마감되는 시기. 독립적인 안내서이며 어떤 포토그래퍼도 대리하지 않습니다.',
    fr: 'Ce que coûte un photographe de mariage en Laponie, quatre questions à poser avant de réserver et quand les dates d’hiver se remplissent. Guide indépendant, aucun photographe représenté.',
    it: 'Quanto costa un fotografo di matrimonio in Lapponia, quattro domande da fare prima di prenotare e quando si esauriscono le date invernali. Guida indipendente, nessun fotografo rappresentato.',
    nl: 'Wat een trouwfotograaf in Lapland kost, vier vragen om te stellen voor u boekt en wanneer de winterdata vol raken. Onafhankelijke gids, wij vertegenwoordigen geen fotograaf.',
    sv: 'Vad en bröllopsfotograf kostar i Lappland, fyra frågor att ställa innan du bokar och när vinterdatumen tar slut. Oberoende guide, vi företräder ingen fotograf.',
  },
  title: {
    en: 'Wedding photography in Lapland',
    fi: 'Hääkuvaus Lapissa',
    de: 'Hochzeitsfotografie in Lappland',
    ja: 'ラップランドでフォトウェディング',
    es: 'Fotografía de boda en Laponia',
    'pt-BR': 'Fotografia de casamento na Lapônia',
    'zh-CN': '拉普兰婚礼摄影',
    ko: '라플란드 웨딩 촬영',
    fr: 'Photographe de mariage en Laponie',
    it: 'Fotografia di matrimonio in Lapponia',
    nl: 'Trouwfotografie in Lapland',
    sv: 'Bröllopsfotografering i Lappland',
  },
  subtitle: {
    en: 'What it costs, what to ask before you book, and when the winter dates go. Tell us what you have in mind and we pass the request on to wedding businesses in Lapland, free and without commitment.',
    fi: 'Mitä kuvaus maksaa, mitä kysyä ennen varausta ja milloin talven päivät täyttyvät. Kerro toiveesi, niin välitämme pyynnön Lapin hääalan yrityksille maksutta ja sitoumuksetta.',
    de: 'Was die Fotografie kostet, was Sie vor der Buchung fragen sollten und wann die Wintertermine vergeben sind. Schildern Sie uns Ihre Wünsche, wir leiten die Anfrage kostenlos und unverbindlich an Hochzeitsanbieter in Lappland weiter.',
    ja: '撮影にかかる費用、予約前に確認したいこと、冬の日程が埋まる時期。ご希望をお聞かせください。無料・無条件でラップランドのウェディング事業者にお取り次ぎします。',
    es: 'Cuánto cuesta, qué preguntar antes de reservar y cuándo se agotan las fechas de invierno. Cuéntenos su idea y transmitimos la solicitud a empresas de bodas en Laponia, gratis y sin compromiso.',
    'pt-BR': 'Quanto custa, o que perguntar antes de reservar e quando as datas de inverno esgotam. Conte o que você tem em mente e nós encaminhamos o pedido a empresas de casamento na Lapônia, grátis e sem compromisso.',
    'zh-CN': '费用多少、预订前该问什么、冬季档期何时订满。告诉我们您的想法，我们会免费且无义务地把请求转给拉普兰的婚礼服务商。',
    ko: '촬영 비용, 예약 전에 물어볼 것, 겨울 날짜가 마감되는 시기. 원하시는 내용을 알려 주시면 무료로, 아무 조건 없이 라플란드의 웨딩 업체에 전달해 드립니다.',
    fr: 'Ce que cela coûte, quoi demander avant de réserver et quand les dates d’hiver partent. Dites-nous ce que vous envisagez, nous transmettons la demande aux prestataires de mariage en Laponie, gratuitement et sans engagement.',
    it: 'Quanto costa, cosa chiedere prima di prenotare e quando finiscono le date invernali. Ci racconti la Sua idea e trasmettiamo la richiesta alle imprese di matrimonio in Lapponia, gratis e senza impegno.',
    nl: 'Wat het kost, wat u vraagt voor u boekt en wanneer de winterdata weg zijn. Vertel ons wat u voor ogen heeft en wij geven de aanvraag gratis en vrijblijvend door aan trouwbedrijven in Lapland.',
    sv: 'Vad det kostar, vad du bör fråga innan du bokar och när vinterdatumen tar slut. Berätta vad du tänker dig, så för vi förfrågan vidare till bröllopsföretag i Lappland, gratis och utan förbindelse.',
  },
  imageAlt: {
    en: 'People in silhouette on a jetty in the midnight sun at Lake Inari',
    fi: 'Ihmisiä siluetteina laiturilla keskiyön auringossa Inarijärvellä',
    de: 'Menschen als Silhouetten auf einem Steg in der Mitternachtssonne am Inarisee',
    ja: 'イナリ湖の桟橋、真夜中の太陽を背にした人々のシルエット',
    es: 'Siluetas de personas en un embarcadero bajo el sol de medianoche en el lago Inari',
    'pt-BR': 'Silhuetas de pessoas num píer sob o sol da meia-noite no lago Inari',
    'zh-CN': '伊纳里湖码头上午夜太阳下的人物剪影',
    ko: '이나리 호수 선착장, 백야의 태양을 등진 사람들의 실루엣',
    fr: 'Silhouettes de personnes sur un ponton sous le soleil de minuit au lac Inari',
    it: 'Sagome di persone su un pontile nel sole di mezzanotte al lago Inari',
    nl: 'Silhouetten van mensen op een steiger in de middernachtzon bij het Inarimeer',
    sv: 'Människor i siluett på en brygga i midnattssolen vid Enare träsk',
  },
  costTitle: {
    en: 'What wedding photography costs in Lapland',
    fi: 'Mitä hääkuvaus maksaa Lapissa',
    de: 'Was Hochzeitsfotografie in Lappland kostet',
    ja: 'ラップランドの結婚式撮影の費用',
    es: 'Cuánto cuesta la fotografía de boda en Laponia',
    'pt-BR': 'Quanto custa a fotografia de casamento na Lapônia',
    'zh-CN': '拉普兰婚礼摄影的费用',
    ko: '라플란드 웨딩 촬영 비용',
    fr: 'Ce que coûte la photographie de mariage en Laponie',
    it: 'Quanto costa la fotografia di matrimonio in Lapponia',
    nl: 'Wat trouwfotografie in Lapland kost',
    sv: 'Vad bröllopsfotografering kostar i Lappland',
  },
  costBody: {
    en: 'One Rovaniemi photographer’s public price list gives the scale: the ceremony alone around 450 €, a portrait session 680 €, a fully documented day 1 960 to 2 600 €. Christmas weeks carry a surcharge and travel outside Rovaniemi is billed per kilometre. The full breakdown, with its source, is on our price page.',
    fi: 'Yhden rovaniemeläisen kuvaajan julkinen hinnasto antaa mittakaavan: pelkkä seremonia noin 450 €, potrettikuvaus 680 €, koko päivän dokumentointi 1 960–2 600 €. Jouluviikoilla on lisä, ja matka Rovaniemen ulkopuolelle laskutetaan kilometreittäin. Koko erittely lähteineen on hintasivullamme.',
    de: 'Die öffentliche Preisliste eines Fotografen aus Rovaniemi zeigt die Größenordnung: nur die Trauung rund 450 €, ein Porträtshooting 680 €, ein vollständig dokumentierter Tag 1.960 bis 2.600 €. In den Weihnachtswochen gilt ein Zuschlag, Anfahrten außerhalb von Rovaniemi werden pro Kilometer berechnet. Die vollständige Aufstellung mit Quelle finden Sie auf unserer Preisseite.',
    ja: 'ロヴァニエミのあるフォトグラファーの公開料金表が目安になります。挙式のみ約450ユーロ、ポートレート撮影680ユーロ、一日密着1,960〜2,600ユーロ。クリスマス期は割増、ロヴァニエミ外への出張は距離に応じて加算されます。出典付きの内訳は料金ページをご覧ください。',
    es: 'La lista de precios pública de un fotógrafo de Rovaniemi da la escala: solo la ceremonia unos 450 €, una sesión de retratos 680 €, un día completo documentado de 1 960 a 2 600 €. Las semanas de Navidad tienen recargo y los desplazamientos fuera de Rovaniemi se cobran por kilómetro. El desglose completo, con su fuente, está en nuestra página de precios.',
    'pt-BR': 'A tabela pública de um fotógrafo de Rovaniemi dá a escala: só a cerimônia por volta de € 450, uma sessão de retratos € 680, um dia inteiro documentado de € 1.960 a € 2.600. As semanas de Natal têm acréscimo e o deslocamento fora de Rovaniemi é cobrado por quilômetro. O detalhamento completo, com a fonte, está na nossa página de preços.',
    'zh-CN': '罗瓦涅米一位摄影师的公开价目表可作参考：仅仪式约 450 欧元，人像拍摄 680 欧元，全天纪实 1 960 至 2 600 欧元。圣诞周有加价，罗瓦涅米以外按公里计费。带出处的完整明细见我们的价格页。',
    ko: '로바니에미의 한 포토그래퍼가 공개한 요금표가 기준이 됩니다. 예식만 약 450유로, 포트레이트 촬영 680유로, 하루 종일 기록은 1,960~2,600유로. 크리스마스 주간에는 할증이 붙고, 로바니에미 밖으로의 이동은 킬로미터당 청구됩니다. 출처가 있는 전체 내역은 요금 페이지에 있습니다.',
    fr: 'La grille tarifaire publique d’un photographe de Rovaniemi donne l’ordre de grandeur : la cérémonie seule environ 450 €, une séance de portraits 680 €, une journée entièrement couverte de 1 960 à 2 600 €. Les semaines de Noël sont majorées et les déplacements hors de Rovaniemi sont facturés au kilomètre. Le détail complet, avec sa source, se trouve sur notre page des prix.',
    it: 'Il listino pubblico di un fotografo di Rovaniemi dà la scala: la sola cerimonia circa 450 €, una sessione di ritratti 680 €, una giornata interamente documentata da 1.960 a 2.600 €. Le settimane di Natale hanno un supplemento e gli spostamenti fuori Rovaniemi si pagano a chilometro. Il dettaglio completo, con la fonte, è nella nostra pagina dei prezzi.',
    nl: 'De openbare prijslijst van een fotograaf uit Rovaniemi geeft de orde van grootte: alleen de ceremonie ongeveer € 450, een portretsessie € 680, een volledig gedocumenteerde dag € 1.960 tot € 2.600. In de kerstweken geldt een toeslag en reizen buiten Rovaniemi wordt per kilometer berekend. De volledige uitsplitsing, met bron, staat op onze prijzenpagina.',
    sv: 'En Rovaniemifotografs offentliga prislista ger skalan: enbart vigseln omkring 450 €, en porträttfotografering 680 €, en helt dokumenterad dag 1 960 till 2 600 €. Julveckorna har ett tillägg och resor utanför Rovaniemi debiteras per kilometer. Hela uppställningen med källa finns på vår prissida.',
  },
  costLink: {
    en: 'See the price page',
    fi: 'Katso hintasivu',
    de: 'Zur Preisseite',
    ja: '料金ページを見る',
    es: 'Ver la página de precios',
    'pt-BR': 'Ver a página de preços',
    'zh-CN': '查看价格页',
    ko: '요금 페이지 보기',
    fr: 'Voir la page des prix',
    it: 'Vedi la pagina dei prezzi',
    nl: 'Bekijk de prijzenpagina',
    sv: 'Se prissidan',
  },
  askTitle: {
    en: 'Four questions before you book',
    fi: 'Neljä kysymystä ennen varausta',
    de: 'Vier Fragen vor der Buchung',
    ja: '予約前に確認したい4つのこと',
    es: 'Cuatro preguntas antes de reservar',
    'pt-BR': 'Quatro perguntas antes de reservar',
    'zh-CN': '预订前要问的四个问题',
    ko: '예약 전 확인할 네 가지 질문',
    fr: 'Quatre questions avant de réserver',
    it: 'Quattro domande prima di prenotare',
    nl: 'Vier vragen voor u boekt',
    sv: 'Fyra frågor innan du bokar',
  },
  ask1: {
    en: 'Show me aurora photos with people in them. A sky alone is easy; a couple sharp under a moving aurora is the skill you are paying for.',
    fi: 'Näytä revontulikuvia, joissa on ihmisiä. Pelkkä taivas on helppo; terävä pari liikkuvien revontulten alla on se taito, josta maksat.',
    de: 'Zeigen Sie mir Polarlichtfotos mit Menschen darauf. Der Himmel allein ist einfach; ein scharfes Paar unter bewegten Polarlichtern ist das Können, für das Sie bezahlen.',
    ja: '人物が写っているオーロラ写真を見せてもらいましょう。空だけなら簡単ですが、揺れるオーロラの下でふたりをぶれずに写すのが、料金に見合う技術です。',
    es: 'Pida fotos de auroras con personas. El cielo solo es fácil; una pareja nítida bajo una aurora en movimiento es la habilidad que usted paga.',
    'pt-BR': 'Peça fotos de aurora com pessoas. Só o céu é fácil; um casal nítido sob uma aurora em movimento é a habilidade pela qual você paga.',
    'zh-CN': '请对方出示有人物的极光照片。只拍天空很容易；在流动的极光下把新人拍清楚，才是您付费购买的技术。',
    ko: '사람이 함께 나온 오로라 사진을 보여 달라고 하세요. 하늘만 찍는 건 쉽지만, 움직이는 오로라 아래에서 두 사람을 선명하게 담는 것이 돈을 지불할 만한 기술입니다.',
    fr: 'Demandez des photos d’aurores avec des personnes. Le ciel seul est facile ; un couple net sous une aurore en mouvement, c’est la compétence que vous payez.',
    it: 'Si faccia mostrare foto di aurore con persone. Il cielo da solo è facile; una coppia nitida sotto un’aurora in movimento è l’abilità per cui si paga.',
    nl: 'Vraag naar noorderlichtfoto’s met mensen erop. Alleen de lucht is makkelijk; een scherp bruidspaar onder bewegend noorderlicht is het vakmanschap waarvoor u betaalt.',
    sv: 'Be att få se norrskensbilder med människor i. Enbart himlen är enkel; ett skarpt par under ett rörligt norrsken är den skicklighet du betalar för.',
  },
  ask2: {
    en: 'How do the camera, the batteries and you cope with hard frost? Batteries drain fast in the cold and lenses fog when you step inside; an experienced photographer has a routine for both.',
    fi: 'Miten kamera, akut ja kuvaaja itse kestävät kovaa pakkasta? Akut tyhjenevät pakkasessa nopeasti ja linssit huurtuvat sisälle tullessa; kokeneella kuvaajalla on rutiini molempiin.',
    de: 'Wie kommen Kamera, Akkus und Sie selbst mit strengem Frost zurecht? Akkus entladen sich in der Kälte schnell, Objektive beschlagen beim Hineingehen; ein erfahrener Fotograf hat für beides eine Routine.',
    ja: 'カメラ、バッテリー、そして撮影者本人は厳しい寒さにどう対処しますか。バッテリーは寒さで急速に減り、屋内に入るとレンズが曇ります。経験豊富なフォトグラファーにはどちらにも決まった手順があります。',
    es: '¿Cómo aguantan la cámara, las baterías y el propio fotógrafo un frío intenso? Las baterías se agotan rápido con el frío y las lentes se empañan al entrar; un fotógrafo con experiencia tiene una rutina para ambas cosas.',
    'pt-BR': 'Como a câmera, as baterias e o próprio fotógrafo lidam com o frio intenso? As baterias descarregam rápido no frio e as lentes embaçam ao entrar; um fotógrafo experiente tem uma rotina para as duas coisas.',
    'zh-CN': '相机、电池和摄影师本人如何应对严寒？电池在低温下耗电很快，进入室内镜头会起雾；有经验的摄影师对这两点都有固定的应对流程。',
    ko: '카메라와 배터리, 그리고 촬영자 본인은 혹한을 어떻게 견디나요? 배터리는 추위에서 빨리 닳고 실내로 들어오면 렌즈에 김이 서립니다. 경험 있는 포토그래퍼는 두 가지 모두에 대비한 루틴이 있습니다.',
    fr: 'Comment l’appareil, les batteries et vous-même supportez-vous un froid intense ? Les batteries se vident vite au froid et les objectifs s’embuent en rentrant ; un photographe expérimenté a une routine pour les deux.',
    it: 'Come reggono la fotocamera, le batterie e Lei stesso il gelo intenso? Le batterie si scaricano in fretta al freddo e gli obiettivi si appannano entrando al chiuso; un fotografo esperto ha una routine per entrambe le cose.',
    nl: 'Hoe gaan de camera, de accu’s en uzelf om met strenge vorst? Accu’s lopen in de kou snel leeg en lenzen beslaan als u naar binnen gaat; een ervaren fotograaf heeft voor beide een routine.',
    sv: 'Hur klarar kameran, batterierna och du själv sträng kyla? Batterier töms snabbt i kylan och objektiv immar igen när man går in; en erfaren fotograf har en rutin för båda.',
  },
  ask3: {
    en: 'Is travel included? Most photographers are based in Rovaniemi or Levi and bill the drive to Saariselkä, Kilpisjärvi or Inari separately.',
    fi: 'Sisältyykö matka hintaan? Useimmat kuvaajat toimivat Rovaniemeltä tai Leviltä ja laskuttavat ajon Saariselälle, Kilpisjärvelle tai Inariin erikseen.',
    de: 'Ist die Anfahrt enthalten? Die meisten Fotografen sind in Rovaniemi oder Levi ansässig und berechnen die Fahrt nach Saariselkä, Kilpisjärvi oder Inari separat.',
    ja: '出張費は含まれていますか。多くのフォトグラファーはロヴァニエミかレヴィを拠点にしており、サーリセルカ、キルピスヤルヴィ、イナリへの移動は別料金になります。',
    es: '¿Está incluido el desplazamiento? La mayoría de los fotógrafos trabaja desde Rovaniemi o Levi y cobra aparte el viaje a Saariselkä, Kilpisjärvi o Inari.',
    'pt-BR': 'O deslocamento está incluído? A maioria dos fotógrafos trabalha a partir de Rovaniemi ou Levi e cobra separadamente a viagem até Saariselkä, Kilpisjärvi ou Inari.',
    'zh-CN': '路费是否包含在内？大多数摄影师常驻罗瓦涅米或莱维，前往萨里塞尔卡、基尔皮斯耶尔维或伊纳里的车程另行收费。',
    ko: '이동 비용이 포함되어 있나요? 대부분의 포토그래퍼는 로바니에미나 레비를 거점으로 하며, 사리셀카, 킬피스야르비, 이나리까지의 이동은 별도로 청구합니다.',
    fr: 'Le déplacement est-il inclus ? La plupart des photographes sont basés à Rovaniemi ou à Levi et facturent à part le trajet vers Saariselkä, Kilpisjärvi ou Inari.',
    it: 'Il viaggio è incluso? La maggior parte dei fotografi lavora da Rovaniemi o Levi e fattura a parte lo spostamento verso Saariselkä, Kilpisjärvi o Inari.',
    nl: 'Zit reizen in de prijs? De meeste fotografen werken vanuit Rovaniemi of Levi en rekenen de rit naar Saariselkä, Kilpisjärvi of Inari apart.',
    sv: 'Ingår resan? De flesta fotografer utgår från Rovaniemi eller Levi och debiterar körningen till Saariselkä, Kilpisjärvi eller Enare separat.',
  },
  ask4: {
    en: 'When do we get the photos, and may we publish them? Agree the delivery time and the usage rights in writing before the day.',
    fi: 'Milloin saamme kuvat ja saammeko julkaista ne? Sopikaa toimitusaika ja käyttöoikeudet kirjallisesti ennen hääpäivää.',
    de: 'Wann bekommen wir die Fotos, und dürfen wir sie veröffentlichen? Vereinbaren Sie Lieferzeit und Nutzungsrechte vor dem Hochzeitstag schriftlich.',
    ja: '写真はいつ受け取れますか。公開してもよいですか。納期と使用権は当日より前に書面で取り決めておきましょう。',
    es: '¿Cuándo recibimos las fotos y podemos publicarlas? Acuerde por escrito el plazo de entrega y los derechos de uso antes del día de la boda.',
    'pt-BR': 'Quando recebemos as fotos e podemos publicá-las? Combine por escrito o prazo de entrega e os direitos de uso antes do dia do casamento.',
    'zh-CN': '什么时候能拿到照片，我们可以公开发布吗？请在婚礼当天之前以书面形式约定交付时间和使用权。',
    ko: '사진은 언제 받을 수 있고, 공개해도 되나요? 전달 시기와 사용 권한은 결혼식 전에 서면으로 정해 두세요.',
    fr: 'Quand recevons-nous les photos, et pouvons-nous les publier ? Convenez par écrit du délai de livraison et des droits d’utilisation avant le jour J.',
    it: 'Quando riceviamo le foto e possiamo pubblicarle? Concordi per iscritto i tempi di consegna e i diritti d’uso prima del giorno del matrimonio.',
    nl: 'Wanneer krijgen we de foto’s en mogen we ze publiceren? Leg de levertijd en de gebruiksrechten schriftelijk vast voor de trouwdag.',
    sv: 'När får vi bilderna och får vi publicera dem? Kom skriftligt överens om leveranstid och nyttjanderätt före bröllopsdagen.',
  },
  whenTitle: {
    en: 'When to book',
    fi: 'Milloin varata',
    de: 'Wann buchen',
    ja: '予約のタイミング',
    es: 'Cuándo reservar',
    'pt-BR': 'Quando reservar',
    'zh-CN': '何时预订',
    ko: '예약 시기',
    fr: 'Quand réserver',
    it: 'Quando prenotare',
    nl: 'Wanneer boeken',
    sv: 'När du bör boka',
  },
  whenBody: {
    en: 'The photographers who work in Lapland are few, and the weekends between December and March go first. A symbolic ceremony can be timed to the photographer’s calendar and to the weather, which is the practical advantage of not being tied to a registry office slot.',
    fi: 'Lapissa toimivia hääkuvaajia on vähän, ja joulukuun ja maaliskuun väliset viikonloput menevät ensimmäisinä. Symbolisen seremonian voi ajoittaa kuvaajan kalenterin ja sään mukaan; se on käytännön etu siitä, ettei olla sidottuja virkailijan aikaan.',
    de: 'Die in Lappland tätigen Hochzeitsfotografen sind wenige, und die Wochenenden zwischen Dezember und März sind zuerst vergeben. Eine freie Trauung lässt sich nach dem Kalender des Fotografen und nach dem Wetter legen; das ist der praktische Vorteil, wenn man nicht an einen Standesamtstermin gebunden ist.',
    ja: 'ラップランドで活動するウェディングフォトグラファーは多くなく、12月から3月の週末は先に埋まります。シンボリック挙式なら、フォトグラファーの予定と天候に合わせて日程を決められます。役所の枠に縛られないことの実際的な利点です。',
    es: 'Los fotógrafos que trabajan en Laponia son pocos, y los fines de semana entre diciembre y marzo se reservan primero. Una ceremonia simbólica puede ajustarse al calendario del fotógrafo y al tiempo; esa es la ventaja práctica de no depender de una cita en el registro civil.',
    'pt-BR': 'Os fotógrafos que trabalham na Lapônia são poucos, e os fins de semana entre dezembro e março são reservados primeiro. Uma cerimônia simbólica pode se ajustar à agenda do fotógrafo e ao tempo; essa é a vantagem prática de não depender de um horário no cartório.',
    'zh-CN': '在拉普兰工作的婚礼摄影师不多，十二月至三月的周末最先订满。象征性仪式可以按摄影师的日程和天气来安排，这正是不受登记处时段约束的实际好处。',
    ko: '라플란드에서 활동하는 웨딩 포토그래퍼는 많지 않고, 12월부터 3월 사이의 주말이 가장 먼저 마감됩니다. 상징 예식은 포토그래퍼의 일정과 날씨에 맞춰 잡을 수 있습니다. 관공서 예약 시간에 묶이지 않는다는 실질적인 장점입니다.',
    fr: 'Les photographes qui travaillent en Laponie sont peu nombreux, et les week-ends de décembre à mars partent en premier. Une cérémonie symbolique peut se caler sur l’agenda du photographe et sur la météo ; c’est l’avantage pratique de ne pas dépendre d’un créneau en mairie.',
    it: 'I fotografi che lavorano in Lapponia sono pochi, e i fine settimana tra dicembre e marzo si prenotano per primi. Una cerimonia simbolica si può fissare in base all’agenda del fotografo e al meteo; è il vantaggio pratico di non dipendere da un appuntamento al comune.',
    nl: 'De fotografen die in Lapland werken zijn schaars, en de weekenden tussen december en maart gaan het eerst. Een symbolische ceremonie kan worden afgestemd op de agenda van de fotograaf en op het weer; dat is het praktische voordeel van niet vastzitten aan een tijdslot bij de burgerlijke stand.',
    sv: 'Fotograferna som arbetar i Lappland är få, och helgerna mellan december och mars går först. En symbolisk ceremoni kan läggas efter fotografens kalender och efter vädret; det är den praktiska fördelen med att inte vara bunden till en tid hos vigselförrättaren.',
  },
  whenPeak: {
    en: 'The photographers’ most requested weekends',
    fi: 'Kuvaajien kysytyimmät viikonloput',
    de: 'Die gefragtesten Wochenenden der Fotografen',
    ja: 'フォトグラファーの予約が最も集中する週末',
    es: 'Los fines de semana más solicitados a los fotógrafos',
    'pt-BR': 'Os fins de semana mais disputados dos fotógrafos',
    'zh-CN': '摄影师最抢手的周末',
    ko: '사진작가 예약이 가장 몰리는 주말',
    fr: 'Les week-ends les plus demandés aux photographes',
    it: 'I fine settimana più richiesti ai fotografi',
    nl: 'De meest gevraagde weekends van de fotografen',
    sv: 'Fotografernas mest efterfrågade helger',
  },
  whenOff: {
    en: 'More room in the calendar',
    fi: 'Väljempää kalenterissa',
    de: 'Mehr Luft im Kalender',
    ja: 'カレンダーに余裕あり',
    es: 'Más hueco en la agenda',
    'pt-BR': 'Mais folga na agenda',
    'zh-CN': '档期更宽松',
    ko: '일정에 여유 있음',
    fr: 'Plus de place dans l’agenda',
    it: 'Più spazio in agenda',
    nl: 'Meer ruimte in de agenda',
    sv: 'Mer luft i kalendern',
  },
  formTitle: {
    en: 'Request a wedding photography quote',
    fi: 'Pyydä tarjous hääkuvauksesta',
    de: 'Angebot für Hochzeitsfotografie anfragen',
    ja: 'ウェディングフォトの見積もりを依頼',
    es: 'Pida un presupuesto de fotografía de boda',
    'pt-BR': 'Peça um orçamento de fotografia de casamento',
    'zh-CN': '索取婚礼摄影报价',
    ko: '웨딩 촬영 견적 요청',
    fr: 'Demandez un devis pour la photographie de mariage',
    it: 'Richiedete un preventivo per il servizio fotografico',
    nl: 'Vraag een offerte voor bruiloftsfotografie aan',
    sv: 'Begär offert på bröllopsfotografering',
  },
  formSub: {
    en: 'The same form as elsewhere on the site. The photography request is already in the message; add your date and place and it goes to planners and photographers exactly as written.',
    fi: 'Sama lomake kuin muuallakin sivustolla. Kuvaustoive on valmiiksi viestissä; lisätkää päivä ja paikka, niin se kulkee suunnittelijoille ja kuvaajille sellaisenaan.',
    de: 'Dasselbe Formular wie überall auf der Seite. Der Fotowunsch steht bereits in der Nachricht; ergänzen Sie Datum und Ort, und er geht unverändert an Planer und Fotografen.',
    ja: 'サイトの他のページと同じフォームです。撮影のご希望はメッセージ欄にあらかじめ入っています。日付と場所を加えていただければ、そのままプランナーとフォトグラファーに届きます。',
    es: 'El mismo formulario que en el resto del sitio. La petición de fotografía ya está en el mensaje; añada la fecha y el lugar y llegará tal cual a organizadores y fotógrafos.',
    'pt-BR': 'O mesmo formulário do restante do site. O pedido de fotografia já está na mensagem; acrescentem data e local e ele segue como está para organizadores e fotógrafos.',
    'zh-CN': '与网站其他页面相同的表单。摄影需求已预填在留言中；补充日期和地点后，它会原样转达给策划师和摄影师。',
    ko: '사이트의 다른 페이지와 같은 양식입니다. 촬영 요청은 메시지에 미리 적혀 있으니 날짜와 장소만 더해 주시면 플래너와 사진작가에게 그대로 전달됩니다.',
    fr: 'Le même formulaire que sur le reste du site. La demande de photographie figure déjà dans le message ; ajoutez la date et le lieu, et elle part telle quelle aux organisateurs et aux photographes.',
    it: 'Lo stesso modulo del resto del sito. La richiesta fotografica è già nel messaggio; aggiungete data e luogo e arriverà così com’è a planner e fotografi.',
    nl: 'Hetzelfde formulier als elders op de site. De fotografiewens staat al in het bericht; vul datum en plaats aan en hij gaat ongewijzigd naar planners en fotografen.',
    sv: 'Samma formulär som på resten av sajten. Fotoönskemålet finns redan i meddelandet; lägg till datum och plats så går det vidare oförändrat till planerare och fotografer.',
  },
  formPreset: {
    en: 'We would like a quote for wedding photography. Date and place: ',
    fi: 'Haluamme tarjouksen hääkuvauksesta. Päivä ja paikka: ',
    de: 'Wir möchten ein Angebot für Hochzeitsfotografie. Datum und Ort: ',
    ja: 'ウェディングフォトの見積もりを希望します。日付と場所：',
    es: 'Queremos un presupuesto de fotografía de boda. Fecha y lugar: ',
    'pt-BR': 'Queremos um orçamento de fotografia de casamento. Data e local: ',
    'zh-CN': '我们想索取婚礼摄影报价。日期和地点：',
    ko: '웨딩 촬영 견적을 원합니다. 날짜와 장소: ',
    fr: 'Nous souhaitons un devis pour la photographie de mariage. Date et lieu : ',
    it: 'Vorremmo un preventivo per il servizio fotografico di matrimonio. Data e luogo: ',
    nl: 'Wij willen graag een offerte voor bruiloftsfotografie. Datum en plaats: ',
    sv: 'Vi vill ha en offert på bröllopsfotografering. Datum och plats: ',
  },
  note: {
    en: 'We represent no photographer and take no commission from any of them. Your request goes out with your details only when you send the form.',
    fi: 'Emme edusta yhtäkään kuvaajaa emmekä saa heiltä provisiota. Pyyntösi lähtee tietoinesi vain, kun lähetät lomakkeen.',
    de: 'Wir vertreten keinen Fotografen und erhalten von keinem eine Provision. Ihre Anfrage geht mit Ihren Angaben erst hinaus, wenn Sie das Formular absenden.',
    ja: '当サイトは特定のフォトグラファーを代理しておらず、手数料も受け取っていません。ご依頼内容は、フォームを送信されたときにのみお客様の情報とともに送られます。',
    es: 'No representamos a ningún fotógrafo ni cobramos comisión de ninguno. Su solicitud se envía con sus datos solo cuando usted manda el formulario.',
    'pt-BR': 'Não representamos nenhum fotógrafo nem recebemos comissão de nenhum deles. Seu pedido só é enviado com seus dados quando você manda o formulário.',
    'zh-CN': '我们不代理任何摄影师，也不从他们那里收取佣金。只有在您提交表单时，您的请求和资料才会被发送。',
    ko: '저희는 어떤 포토그래퍼도 대리하지 않으며 수수료도 받지 않습니다. 요청은 양식을 보내실 때에만 입력하신 정보와 함께 전달됩니다.',
    fr: 'Nous ne représentons aucun photographe et ne touchons aucune commission. Votre demande ne part avec vos coordonnées que lorsque vous envoyez le formulaire.',
    it: 'Non rappresentiamo nessun fotografo e non riceviamo commissioni da nessuno di loro. La Sua richiesta parte con i Suoi dati solo quando invia il modulo.',
    nl: 'Wij vertegenwoordigen geen fotograaf en ontvangen van geen van hen commissie. Uw aanvraag gaat pas met uw gegevens de deur uit als u het formulier verstuurt.',
    sv: 'Vi företräder ingen fotograf och tar ingen provision från någon av dem. Din förfrågan skickas med dina uppgifter först när du sänder formuläret.',
  },
};

export default function Photographers() {
  const { lang } = useLang();
  const t = (k: keyof typeof P) => pickLocalized(P[k], lang);
  const questions = [t('ask1'), t('ask2'), t('ask3'), t('ask4')];
  return (
    <>
      <SEO
        title={t('seoTitle')}
        description={t('seoDesc')}
        path="/photographers"
        image="/images/heroes/inari-midnight-sun-pier-teker.jpg"
      />
      <PageHero
        compact
        eyebrow={ui('eyebrowPhotographers', lang)}
        title={t('title')}
        subtitle={t('subtitle')}
        image="/images/heroes/inari-midnight-sun-pier-teker.jpg"
        avifSrcSet="/images/heroes/inari-midnight-sun-pier-teker-800.avif 800w, /images/heroes/inari-midnight-sun-pier-teker-1200.avif 1200w"
        webpSrcSet="/images/heroes/inari-midnight-sun-pier-teker-800.webp 800w, /images/heroes/inari-midnight-sun-pier-teker-1200.webp 1200w"
        sizes="100vw"
        objectPosition="50% 55%"
        credit={{ name: 'Tevfik Teker', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Midnight_Sun_in_Inari_-_panoramio_(4).jpg' }}
        lang={lang}
        imageAlt={t('imageAlt')}
      />

      <Section title={t('costTitle')}>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{t('costBody')}</p>
          <p className="mt-6">
            <L
              to="/pricing"
              className="inline-flex items-center px-6 py-3 border border-white/20 hover:bg-white/5 text-white rounded-full transition-colors"
            >
              {t('costLink')}
            </L>
          </p>
        </div>
      </Section>

      <Section title={t('askTitle')} className="bg-night-light/30">
        <ol className="max-w-3xl mx-auto grid gap-4 list-none p-0">
          {questions.map((q, i) => (
            <li key={i} className="flex gap-4 bg-night-light border border-white/5 rounded-2xl p-5 sm:p-6">
              <span className="font-heading text-3xl text-rose tracking-wide leading-none shrink-0" aria-hidden="true">
                {i + 1}
              </span>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{q}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t('whenTitle')}>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{t('whenBody')}</p>
          {/* Vesa 19.9. (ilta): "milloin varata -osio vaatii myös jotain extraa" — the paragraph's
              own claim (December–March weekends go first) as a twelve-month strip. */}
          <SeasonBand
            lang={lang}
            className="mt-8"
            segments={[
              { months: [11, 0, 1, 2], color: '#DD6E86', label: t('whenPeak') },
              { months: [3, 4, 5, 6, 7, 8, 9, 10], color: 'rgba(245,235,224,0.28)', label: t('whenOff') },
            ]}
          />
        </div>
      </Section>

      {/* Vesa 19.9. (ilta): a generic "request 1–3 quotes" block made no sense on a photography
          page. Same form, but framed and pre-filled as a photography request. */}
      <Section className="bg-night-light/30" title={t('formTitle')} subtitle={t('formSub')}>
        <LeadForm presetMessage={t('formPreset')} />
        <p className="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto">{t('note')}</p>
      </Section>
    </>
  );
}
