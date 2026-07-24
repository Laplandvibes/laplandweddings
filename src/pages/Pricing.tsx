import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang } from '../i18n/LangContext';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';
import { ui } from '../data/uiStrings';

interface Story {
  emoji: string;
  label: Localized<string>;
  type: string;
  guests: string;
  range: string;
  story: Localized<string>;
  spends: Localized<string[]>;
  takeaway: Localized<string>;
  image: string;
}

const stories: Story[] = [
  {
    emoji: '💍',
    label: {
      en: 'Elopement for two',
      fi: 'Elopement kahdelle',
      de: 'Elopement zu zweit',
      ja: 'ふたりだけの挙式',
      es: 'Fuga romántica para dos',
      'pt-BR': 'Elopement para dois',
      'zh-CN': '两人私奔婚礼',
      ko: '단둘이 올리는 결혼식',
      fr: 'Elopement à deux',
      it: 'Elopement per due',
      nl: 'Elopement voor twee', sv: 'Elopement for two',
    },
    type: 'Elopement',
    guests: '2',
    range: '€2 100',
    story: {
      en: 'Fly into Rovaniemi on a Friday evening, marry on Saturday in an ice chapel, and be home Sunday night. A planner handles the DVV paperwork, officiant, a two-hour photographer and the hotel nights. A weekend like this, ceremony, two nights in an igloo, transfers, lands under €2 100.',
      fi: 'Lennätte Rovaniemelle perjantai-iltana, vihille lauantaina jääkappelissa, kotona sunnuntai-iltana. Suunnittelija hoitaa DVV-paperit, vihkijän, kahden tunnin valokuvauksen ja yöpymiset. Tällainen viikonloppu, vihkimys, kaksi yötä iglussa, kuljetukset, jää alle 2 100 euron.',
      de: 'Sie fliegen am Freitagabend nach Rovaniemi, heiraten am Samstag in einer Eiskapelle und sind am Sonntagabend wieder zu Hause. Ein Planer kümmert sich um die DVV-Unterlagen, den Trauredner, zwei Stunden Fotograf und die Übernachtungen. So ein Wochenende, Zeremonie, zwei Nächte im Iglu, Transfers, bleibt unter 2 100 €.',
      ja: '金曜の夜にロヴァニエミに到着し、土曜に氷のチャペルで挙式、日曜の夜には帰宅。プランナーがDVV書類、司式者、2時間の写真撮影、宿泊を手配します。こうした週末の費用は、挙式、イグルー2泊、送迎を含めて、2,100ユーロ未満に収まります。',
      es: 'Voláis a Rovaniemi un viernes por la noche, os casáis el sábado en una capilla de hielo y estáis de vuelta en casa el domingo por la noche. Un organizador se encarga de los trámites del DVV, el oficiante, dos horas de fotógrafo y las noches de hotel. Un fin de semana así, ceremonia, dos noches en iglú, traslados, queda por debajo de 2 100 €.',
      'pt-BR': 'Vocês voam para Rovaniemi numa sexta à noite, casam-se no sábado em uma capela de gelo e voltam para casa no domingo à noite. Um organizador cuida da documentação do DVV, do celebrante, de duas horas de fotógrafo e das noites de hotel. Um fim de semana assim, cerimônia, duas noites em iglu, transfers, fica abaixo de € 2.100.',
      'zh-CN': '周五晚上飞抵罗瓦涅米，周六在冰教堂完婚，周日晚上就能回到家。策划师负责 DVV 文件、主婚人、两小时摄影和住宿。这样一个周末——仪式、两晚冰屋住宿、接送——花费不到 2,100 欧元。',
      ko: '금요일 저녁 로바니에미에 도착해 토요일 아이스 채플에서 결혼식을 올리고 일요일 밤이면 집에 돌아갑니다. 플래너가 DVV 서류, 주례, 2시간의 사진 촬영, 숙박을 처리합니다. 이런 주말은, 예식, 이글루 2박, 이동 포함, 2,100유로 미만입니다.',
      fr: 'Vous atterrissez à Rovaniemi un vendredi soir, vous vous mariez le samedi dans une chapelle de glace et vous êtes de retour chez vous le dimanche soir. Un planner gère les formalités DVV, l’officiant, deux heures de photographe et les nuits d’hôtel. Un week-end comme celui-ci, cérémonie, deux nuits en igloo, transferts, reste sous les 2 100 €.',
      it: 'Atterrate a Rovaniemi un venerdì sera, vi sposate il sabato in una cappella di ghiaccio e siete a casa la domenica sera. Un planner gestisce i documenti DVV, il celebrante, due ore di fotografo e i pernottamenti. Un weekend così, cerimonia, due notti in igloo, transfer, resta sotto i 2 100 €.',
      nl: 'Jullie vliegen op vrijdagavond naar Rovaniemi, trouwen op zaterdag in een ijskapel en zijn zondagavond weer thuis. Een planner regelt het DVV-papierwerk, de voltrekker, twee uur fotografie en de overnachtingen. Zo’n weekend, ceremonie, twee nachten in een iglo, transfers, blijft onder de € 2.100.', sv: 'Fly into Rovaniemi on a Friday evening, marry on Saturday in an ice chapel, and be home Sunday night. A planner handles the DVV paperwork, officiant, a two-hour photographer and the hotel nights. A weekend like this, ceremony, two nights in an igloo, transfers, lands under €2 100.',
    },
    spends: {
      en: ['Officiant + DVV: €390', 'Photographer 2h: €590', '2× igloo nights: €628', 'Bouquet + suit hire: €240', 'Cab transfers: €280'],
      fi: ['Vihkijä + DVV: 390 €', 'Valokuvaaja 2 h: 590 €', '2× iglu-yötä: 628 €', 'Kimppu + puku: 240 €', 'Taksit: 280 €'],
      de: ['Trauredner + DVV: 390 €', 'Fotograf 2 Std.: 590 €', '2× Iglu-Nächte: 628 €', 'Brautstrauß + Anzugverleih: 240 €', 'Taxitransfers: 280 €'],
      ja: ['司式者＋DVV：390ユーロ', '写真撮影2時間：590ユーロ', 'イグルー2泊：628ユーロ', 'ブーケ＋スーツレンタル：240ユーロ', 'タクシー送迎：280ユーロ'],
      es: ['Oficiante + DVV: 390 €', 'Fotógrafo 2 h: 590 €', '2 noches en iglú: 628 €', 'Ramo + alquiler de traje: 240 €', 'Traslados en taxi: 280 €'],
      'pt-BR': ['Celebrante + DVV: € 390', 'Fotógrafo 2 h: € 590', '2 noites em iglu: € 628', 'Buquê + aluguel de terno: € 240', 'Transfers de táxi: € 280'],
      'zh-CN': ['主婚人 + DVV：390 欧元', '摄影 2 小时：590 欧元', '冰屋 2 晚：628 欧元', '捧花 + 西装租赁：240 欧元', '出租车接送：280 欧元'],
      ko: ['주례 + DVV: 390유로', '사진 촬영 2시간: 590유로', '이글루 2박: 628유로', '부케 + 정장 대여: 240유로', '택시 이동: 280유로'],
      fr: ['Officiant + DVV : 390 €', 'Photographe 2 h : 590 €', '2 nuits en igloo : 628 €', 'Bouquet + location de costume : 240 €', 'Transferts en taxi : 280 €'],
      it: ['Celebrante + DVV: 390 €', 'Fotografo 2 h: 590 €', '2 notti in igloo: 628 €', 'Bouquet + noleggio abito: 240 €', 'Transfer in taxi: 280 €'],
      nl: ['Voltrekker + DVV: € 390', 'Fotograaf 2 u: € 590', '2× iglo-nachten: € 628', 'Boeket + pakhuur: € 240', 'Taxitransfers: € 280'], sv: ['Officiant + DVV: €390', 'Photographer 2h: €590', '2× igloo nights: €628', 'Bouquet + suit hire: €240', 'Cab transfers: €280'],
    },
    takeaway: {
      en: 'Elopement is the most cost-efficient way: just the two of you and the magic.',
      fi: 'Kahdestaan vihkiminen on kustannustehokkain tapa: vain te kaksi ja taika.',
      de: 'Eine Elopement-Hochzeit ist der kosteneffizienteste Weg: nur ihr beide und der Zauber.',
      ja: '二人だけの結婚式が最もコスト効率の良い方法：あなたたち二人と魔法だけ。',
      es: 'La fuga romántica es la opción más rentable: solo vosotros dos y la magia.',
      'pt-BR': 'O elopement é a forma mais econômica: só vocês dois e a magia.',
      'zh-CN': '私奔式婚礼最具性价比——只有你们两人和这份魔法。',
      ko: '단둘이 올리는 결혼식이 가장 비용 효율적입니다. 두 사람과 마법만 있으면 됩니다.',
      fr: 'L’elopement est la formule la plus économique: juste vous deux et la magie.',
      it: 'L’elopement è la soluzione più conveniente: solo voi due e la magia.',
      nl: 'Met z’n tweeën trouwen is het meest kostenefficiënt, alleen jullie twee en de magie.', sv: 'Elopement is the most cost-efficient way: just the two of you and the magic.',
    },
    image: '/images/pricing/elope-hannah-tom.jpg',
  },
  {
    emoji: '❄',
    label: {
      en: 'Snow-chapel wedding · 18 guests',
      fi: 'Lumikappelihäät · 18 vierasta',
      de: 'Schneekapellen-Hochzeit · 18 Gäste',
      ja: 'スノーチャペル挙式 · ゲスト18人',
      es: 'Boda en capilla de nieve · 18 invitados',
      'pt-BR': 'Casamento em capela de neve · 18 convidados',
      'zh-CN': '雪教堂婚礼 · 18 位宾客',
      ko: '스노우 채플 웨딩 · 하객 18명',
      fr: 'Mariage en chapelle de neige · 18 invités',
      it: 'Matrimonio in cappella di neve · 18 ospiti',
      nl: 'Sneeuwkapelbruiloft · 18 gasten', sv: 'Snow-chapel wedding · 18 guests',
    },
    type: 'Snow Chapel',
    guests: '18',
    range: '€8 400',
    story: {
      en: 'Bring 16 guests on a five-day trip: ceremony in a carved snow chapel, dinner in a warm timber hall next door, everyone sleeping on the same grounds. Venues like this re-sculpt their ice halls every winter, so no two years look alike.',
      fi: 'Tuokaa 16 vierasta viiden päivän matkalle: vihkimys veistetyssä lumikappelissa, illallinen viereisessä lämpimässä hirsisalissa, kaikki yöpyvät samalla alueella. Tällaiset paikat veistävät jääsalinsa joka talvi uudelleen, joten kahta samanlaista vuotta ei ole.',
      de: 'Nehmen Sie 16 Gäste mit auf eine fünftägige Reise: Zeremonie in einer geschnitzten Schneekapelle, Dinner in einem warmen Holzsaal nebenan, alle übernachten auf demselben Gelände. Solche Locations gestalten ihre Eissäle jeden Winter neu. Kein Jahr gleicht dem anderen.',
      ja: '16人のゲストと5日間の旅へ：彫刻が施されたスノーチャペルでの挙式、隣接する暖かな木造ホールでのディナー、全員が同じ敷地内に宿泊します。こうした会場は毎年冬に氷のホールを彫り直すため、同じ姿の年は二度とありません。',
      es: 'Llevad a 16 invitados a un viaje de cinco días: ceremonia en una capilla de nieve esculpida, cena en un cálido salón de madera contiguo y todos alojados en el mismo recinto. Lugares así vuelven a esculpir sus salas de hielo cada invierno, así que no hay dos años iguales.',
      'pt-BR': 'Levem 16 convidados em uma viagem de cinco dias: cerimônia em uma capela de neve esculpida, jantar em um acolhedor salão de madeira ao lado e todos hospedados no mesmo terreno. Locais assim reesculpem seus salões de gelo a cada inverno. Não há dois anos iguais.',
      'zh-CN': '带上 16 位宾客开启五天的旅程：在雕刻而成的雪教堂举行仪式，在隔壁温暖的木屋大厅共进晚宴，所有人都住在同一园区。这类场地每年冬天都会重新雕刻冰厅，因此没有两年是相同的。',
      ko: '16명의 하객과 함께 5일간의 여행을 떠나 보세요: 조각된 스노우 채플에서의 예식, 바로 옆 따뜻한 목조 홀에서의 저녁 식사, 모두가 같은 단지 안에서 숙박합니다. 이런 장소들은 매 겨울 얼음 홀을 새로 조각하기 때문에 같은 모습의 해가 없습니다.',
      fr: 'Emmenez 16 invités pour un voyage de cinq jours : cérémonie dans une chapelle de neige sculptée, dîner dans une chaleureuse salle en bois juste à côté, tout le monde logé sur le même domaine. Ces lieux resculptent leurs salles de glace chaque hiver. Aucune année ne ressemble à la précédente.',
      it: 'Portate 16 ospiti in un viaggio di cinque giorni: cerimonia in una cappella di neve scolpita, cena in un caldo salone di legno accanto, tutti alloggiati nella stessa area. Location come queste riscolpiscono le loro sale di ghiaccio ogni inverno. Non esistono due anni uguali.',
      nl: 'Neem 16 gasten mee op een vijfdaagse reis: ceremonie in een uitgehouwen sneeuwkapel, diner in een warme houten zaal ernaast, iedereen slaapt op hetzelfde terrein. Zulke locaties bouwen hun ijszalen elke winter opnieuw. Geen twee jaren zien er hetzelfde uit.', sv: 'Bring 16 guests on a five-day trip: ceremony in a carved snow chapel, dinner in a warm timber hall next door, everyone sleeping on the same grounds. Venues like this re-sculpt their ice halls every winter, so no two years look alike.',
    },
    spends: {
      en: ['Snow chapel ceremony: €1 800', 'Wooden chapel reception: €2 400', '3-course dinner ×18: €1 980', 'Ice suite for couple: €840', 'Photographer 6h + video: €1 380'],
      fi: ['Lumikappeli-vihkimys: 1 800 €', 'Puukappeli-juhlat: 2 400 €', '3 ruokalajia ×18: 1 980 €', 'Jäiglu pariskunnalle: 840 €', 'Valokuvaaja 6 h + video: 1 380 €'],
      de: ['Schneekapellen-Zeremonie: 1 800 €', 'Holzkapellen-Empfang: 2 400 €', '3-Gänge-Menü ×18: 1 980 €', 'Eis-Suite für das Paar: 840 €', 'Fotograf 6 Std. + Video: 1 380 €'],
      ja: ['スノーチャペル挙式：1,800ユーロ', '木造チャペル披露宴：2,400ユーロ', '3コースディナー×18：1,980ユーロ', 'カップル用アイススイート：840ユーロ', '写真撮影6時間＋動画：1,380ユーロ'],
      es: ['Ceremonia en capilla de nieve: 1 800 €', 'Recepción en capilla de madera: 2 400 €', 'Cena de 3 platos ×18: 1 980 €', 'Suite de hielo para la pareja: 840 €', 'Fotógrafo 6 h + vídeo: 1 380 €'],
      'pt-BR': ['Cerimônia na capela de neve: € 1.800', 'Recepção na capela de madeira: € 2.400', 'Jantar de 3 pratos ×18: € 1.980', 'Suíte de gelo para o casal: € 840', 'Fotógrafo 6 h + vídeo: € 1.380'],
      'zh-CN': ['雪教堂仪式：1,800 欧元', '木教堂宴会：2,400 欧元', '三道菜晚宴 ×18：1,980 欧元', '新人冰套房：840 欧元', '摄影 6 小时 + 视频：1,380 欧元'],
      ko: ['스노우 채플 예식: 1,800유로', '목조 채플 피로연: 2,400유로', '3코스 디너 ×18: 1,980유로', '신혼부부 아이스 스위트: 840유로', '사진 촬영 6시간 + 영상: 1,380유로'],
      fr: ['Cérémonie en chapelle de neige : 1 800 €', 'Réception en chapelle de bois : 2 400 €', 'Dîner 3 plats ×18 : 1 980 €', 'Suite de glace pour le couple : 840 €', 'Photographe 6 h + vidéo : 1 380 €'],
      it: ['Cerimonia in cappella di neve: 1 800 €', 'Ricevimento in cappella di legno: 2 400 €', 'Cena 3 portate ×18: 1 980 €', 'Suite di ghiaccio per la coppia: 840 €', 'Fotografo 6 h + video: 1 380 €'],
      nl: ['Ceremonie in sneeuwkapel: € 1.800', 'Receptie in houten kapel: € 2.400', '3-gangendiner ×18: € 1.980', 'IJssuite voor het paar: € 840', 'Fotograaf 6 u + video: € 1.380'], sv: ['Snow chapel ceremony: €1 800', 'Wooden chapel reception: €2 400', '3-course dinner ×18: €1 980', 'Ice suite for couple: €840', 'Photographer 6h + video: €1 380'],
    },
    takeaway: {
      en: 'Mid-size weddings benefit from venues that combine ceremony, dinner and accommodation under one roof.',
      fi: 'Keskikokoiset häät hyötyvät kohteista joissa vihkimys, illallinen ja majoitus yhdellä alueella.',
      de: 'Mittelgroße Hochzeiten profitieren von Locations, die Zeremonie, Dinner und Unterkunft unter einem Dach vereinen.',
      ja: '中規模の結婚式は、挙式・ディナー・宿泊を一か所にまとめられる会場が有利です。',
      es: 'Las bodas de tamaño medio se benefician de lugares que combinan ceremonia, cena y alojamiento bajo un mismo techo.',
      'pt-BR': 'Casamentos de porte médio se beneficiam de locais que reúnem cerimônia, jantar e hospedagem sob o mesmo teto.',
      'zh-CN': '中等规模的婚礼受益于将仪式、晚宴和住宿集于一处的场地。',
      ko: '중간 규모 결혼식은 예식, 저녁 식사, 숙박을 한곳에서 해결할 수 있는 장소에서 유리합니다.',
      fr: 'Les mariages de taille moyenne profitent des lieux qui réunissent cérémonie, dîner et hébergement sous un même toit.',
      it: 'I matrimoni di medie dimensioni traggono vantaggio da location che uniscono cerimonia, cena e alloggio sotto lo stesso tetto.',
      nl: 'Middelgrote bruiloften profiteren van locaties die ceremonie, diner en overnachting onder één dak combineren.', sv: 'Mid-size weddings benefit from venues that combine ceremony, dinner and accommodation under one roof.',
    },
    image: '/images/pricing/midtier-mei-david.jpg',
  },
  {
    emoji: '✨',
    label: {
      en: 'Northern-lights wedding · 32 guests',
      fi: 'Revontulihäät · 32 vierasta',
      de: 'Polarlicht-Hochzeit · 32 Gäste',
      ja: 'オーロラ挙式 · ゲスト32人',
      es: 'Boda bajo auroras · 32 invitados',
      'pt-BR': 'Casamento sob a aurora · 32 convidados',
      'zh-CN': '极光婚礼 · 32 位宾客',
      ko: '오로라 웨딩 · 하객 32명',
      fr: 'Mariage sous les aurores · 32 invités',
      it: 'Matrimonio sotto l’aurora · 32 ospiti',
      nl: 'Noorderlichtbruiloft · 32 gasten', sv: 'Northern-lights wedding · 32 guests',
    },
    type: 'Northern Lights',
    guests: '32',
    range: '€24 800',
    story: {
      en: 'A wedding your families will talk about for 30 years: snow-chapel ceremony in the fells, a glass-walled reception cabin, arrival by husky sled, live music, and a planner who watches the aurora forecast and is ready to move the ceremony earlier the moment it says tonight.',
      fi: 'Häät joista perheet puhuvat 30 vuotta: lumikappelivihkimys tunturissa, lasiseinäinen juhlacabin, saapuminen huskyvaljakolla, live-musiikkia ja suunnittelija, joka seuraa revontuliennustetta ja on valmis aikaistamaan vihkimystä heti kun se sanoo: tänä iltana.',
      de: 'Eine Hochzeit, über die Ihre Familien 30 Jahre lang sprechen werden: Schneekapellen-Zeremonie in den Fjälls, eine verglaste Feier-Hütte, Ankunft per Husky-Schlitten, Live-Musik und ein Planer, der die Polarlicht-Vorhersage im Blick behält und bereit ist, die Zeremonie vorzuziehen, sobald sie sagt: heute Abend.',
      ja: '家族が30年語り継ぐような結婚式：山地のスノーチャペルでの挙式、ガラス張りの披露宴キャビン、ハスキーそりでの登場、生演奏、そしてオーロラ予報を見守り、「今夜」と出た瞬間に挙式を前倒しできるプランナー。',
      es: 'Una boda de la que vuestras familias hablarán durante 30 años: ceremonia en una capilla de nieve en las colinas árticas, una cabaña de recepción con paredes de cristal, llegada en trineo de huskies, música en directo y un organizador que vigila el pronóstico de auroras y está listo para adelantar la ceremonia en cuanto diga: esta noche.',
      'pt-BR': 'Um casamento do qual as famílias falarão por 30 anos: cerimônia em capela de neve nas colinas árticas, uma cabana de recepção com paredes de vidro, chegada em trenó de huskies, música ao vivo e um organizador que acompanha a previsão da aurora e está pronto para adiantar a cerimônia assim que ela disser: hoje à noite.',
      'zh-CN': '一场让家人念叨 30 年的婚礼：在山地雪教堂举行仪式、玻璃幕墙的宴会小屋、乘哈士奇雪橇抵达、现场音乐——还有一位随时关注极光预报的策划师，一旦预报说"就在今晚"，便立刻把仪式提前。',
      ko: '가족들이 30년 동안 이야기할 결혼식: 설원 언덕의 스노우 채플 예식, 유리벽 피로연 캐빈, 허스키 썰매로 도착, 라이브 음악, 그리고 오로라 예보를 지켜보다가 "오늘 밤"이라는 예보가 뜨는 순간 예식을 앞당길 준비가 된 플래너.',
      fr: 'Un mariage dont vos familles parleront pendant 30 ans : cérémonie en chapelle de neige dans les collines lapones, une cabane de réception aux parois de verre, arrivée en traîneau de huskies, musique en direct et un planner qui surveille les prévisions d’aurores et se tient prêt à avancer la cérémonie dès qu’elles annoncent : ce soir.',
      it: 'Un matrimonio di cui le vostre famiglie parleranno per 30 anni: cerimonia in una cappella di neve tra le alture lapponi, una cabina di ricevimento con pareti di vetro, arrivo in slitta trainata da husky, musica dal vivo e un planner che tiene d’occhio le previsioni dell’aurora ed è pronto ad anticipare la cerimonia non appena dicono: stasera.',
      nl: 'Een bruiloft waar jullie families 30 jaar over zullen praten: ceremonie in een sneeuwkapel in de fjells, een receptiecabin met glazen wanden, aankomst per huskyslee, livemuziek en een planner die de noorderlichtvoorspelling in de gaten houdt en klaarstaat om de ceremonie te vervroegen zodra die zegt: vanavond.', sv: 'A wedding your families will talk about for 30 years: snow-chapel ceremony in the fells, a glass-walled reception cabin, arrival by husky sled, live music, and a planner who watches the aurora forecast and is ready to move the ceremony earlier the moment it says tonight.',
    },
    spends: {
      en: ['Snow chapel + cabin reception: €7 200', 'Catering 3-course ×32: €4 800', 'Photographer 10h + video team: €4 200', 'Husky safari for ceremony arrival: €1 800', 'Couple suite + 4 cabins for family: €4 200', 'Florist + bouquet: €1 600', 'Officiant + DVV: €420', 'Live Sámi music: €580'],
      fi: ['Lumikappeli + cabin-juhlat: 7 200 €', 'Catering 3 ruokalajia ×32: 4 800 €', 'Valokuvaaja 10 h + video: 4 200 €', 'Husky-sara vihkimykseen: 1 800 €', 'Sviitti + 4 cabinia perheelle: 4 200 €', 'Kukkasidonta + kimppu: 1 600 €', 'Vihkijä + DVV: 420 €', 'Live-saamenmusiikki: 580 €'],
      de: ['Schneekapelle + Hütten-Empfang: 7 200 €', 'Catering 3-Gänge ×32: 4 800 €', 'Fotograf 10 Std. + Videoteam: 4 200 €', 'Husky-Safari zur Zeremonie-Ankunft: 1 800 €', 'Paar-Suite + 4 Hütten für die Familie: 4 200 €', 'Florist + Brautstrauß: 1 600 €', 'Trauredner + DVV: 420 €', 'Live-Sámi-Musik: 580 €'],
      ja: ['スノーチャペル＋キャビン披露宴：7,200ユーロ', 'ケータリング3コース×32：4,800ユーロ', '写真撮影10時間＋動画チーム：4,200ユーロ', '挙式到着のハスキーサファリ：1,800ユーロ', 'カップルスイート＋家族用キャビン4棟：4,200ユーロ', 'フローリスト＋ブーケ：1,600ユーロ', '司式者＋DVV：420ユーロ', 'サーミ族のライブ音楽：580ユーロ'],
      es: ['Capilla de nieve + recepción en cabaña: 7 200 €', 'Catering de 3 platos ×32: 4 800 €', 'Fotógrafo 10 h + equipo de vídeo: 4 200 €', 'Safari de huskies para la llegada a la ceremonia: 1 800 €', 'Suite para la pareja + 4 cabañas para la familia: 4 200 €', 'Floristería + ramo: 1 600 €', 'Oficiante + DVV: 420 €', 'Música sami en directo: 580 €'],
      'pt-BR': ['Capela de neve + recepção em cabana: € 7.200', 'Buffet de 3 pratos ×32: € 4.800', 'Fotógrafo 10 h + equipe de vídeo: € 4.200', 'Safári de huskies para a chegada à cerimônia: € 1.800', 'Suíte do casal + 4 cabanas para a família: € 4.200', 'Floricultura + buquê: € 1.600', 'Celebrante + DVV: € 420', 'Música sámi ao vivo: € 580'],
      'zh-CN': ['雪教堂 + 小屋宴会：7,200 欧元', '三道菜餐饮 ×32：4,800 欧元', '摄影 10 小时 + 视频团队：4,200 欧元', '仪式抵达哈士奇雪橇：1,800 欧元', '新人套房 + 家庭 4 间小屋：4,200 欧元', '花艺 + 捧花：1,600 欧元', '主婚人 + DVV：420 欧元', '现场萨米音乐：580 欧元'],
      ko: ['스노우 채플 + 캐빈 피로연: 7,200유로', '3코스 케이터링 ×32: 4,800유로', '사진 촬영 10시간 + 영상 팀: 4,200유로', '예식 도착용 허스키 사파리: 1,800유로', '신혼부부 스위트 + 가족용 캐빈 4채: 4,200유로', '플로리스트 + 부케: 1,600유로', '주례 + DVV: 420유로', '라이브 사미 음악: 580유로'],
      fr: ['Chapelle de neige + réception en cabane : 7 200 €', 'Traiteur 3 plats ×32 : 4 800 €', 'Photographe 10 h + équipe vidéo : 4 200 €', 'Safari husky pour l’arrivée à la cérémonie : 1 800 €', 'Suite du couple + 4 cabanes pour la famille : 4 200 €', 'Fleuriste + bouquet : 1 600 €', 'Officiant + DVV : 420 €', 'Musique sámi en direct : 580 €'],
      it: ['Cappella di neve + ricevimento in cabina: 7 200 €', 'Catering 3 portate ×32: 4 800 €', 'Fotografo 10 h + troupe video: 4 200 €', 'Husky-safari per l’arrivo alla cerimonia: 1 800 €', 'Suite per la coppia + 4 cabine per la famiglia: 4 200 €', 'Fiorista + bouquet: 1 600 €', 'Celebrante + DVV: 420 €', 'Musica sámi dal vivo: 580 €'],
      nl: ['Sneeuwkapel + cabin-receptie: € 7.200', 'Catering 3-gangen ×32: € 4.800', 'Fotograaf 10 u + videoteam: € 4.200', 'Husky-safari voor aankomst ceremonie: € 1.800', 'Suite voor het paar + 4 cabins voor familie: € 4.200', 'Bloemist + boeket: € 1.600', 'Voltrekker + DVV: € 420', 'Live Sámi-muziek: € 580'], sv: ['Snow chapel + cabin reception: €7 200', 'Catering 3-course ×32: €4 800', 'Photographer 10h + video team: €4 200', 'Husky safari for ceremony arrival: €1 800', 'Couple suite + 4 cabins for family: €4 200', 'Florist + bouquet: €1 600', 'Officiant + DVV: €420', 'Live Sámi music: €580'],
    },
    takeaway: {
      en: 'Premium weddings invest in moments, auroras, music, husky arrival, that guests photograph and remember.',
      fi: 'Premium-häissä rahaa kuluu hetkiin, revontulet, musiikki, husky-sara, joista vieraat ottavat kuvia ja muistavat.',
      de: 'Premium-Hochzeiten investieren in Momente, Polarlichter, Musik, Husky-Ankunft, die Gäste fotografieren und in Erinnerung behalten.',
      ja: 'プレミアムな結婚式は、ゲストが写真に収め記憶に残す瞬間、オーロラ、音楽、ハスキーでの登場にお金をかけます。',
      es: 'Las bodas premium invierten en momentos, auroras, música, llegada en huskies, que los invitados fotografían y recuerdan.',
      'pt-BR': 'Casamentos premium investem em momentos, auroras, música, chegada de huskies, que os convidados fotografam e lembram.',
      'zh-CN': '高端婚礼把钱花在那些宾客会拍照并铭记的瞬间——极光、音乐、哈士奇登场。',
      ko: '프리미엄 결혼식은 하객들이 사진에 담고 기억하는 순간, 오로라, 음악, 허스키 도착 에 투자합니다.',
      fr: 'Les mariages haut de gamme investissent dans des moments, aurores, musique, arrivée en husky, que les invités photographient et retiennent.',
      it: 'I matrimoni premium investono in momenti, aurore, musica, arrivo in husky, che gli ospiti fotografano e ricordano.',
      nl: 'Premium bruiloften investeren in momenten, noorderlicht, muziek, aankomst per husky, die gasten fotograferen en onthouden.', sv: 'Premium weddings invest in moments, auroras, music, husky arrival, that guests photograph and remember.',
    },
    image: '/images/pricing/premium-sofia-lukas.jpg',
  },
  {
    emoji: '🥂',
    label: {
      en: 'Luxury celebration · 80 guests',
      fi: 'Luksusjuhla · 80 vierasta',
      de: 'Luxusfeier · 80 Gäste',
      ja: 'ラグジュアリーな祝宴 · ゲスト80人',
      es: 'Celebración de lujo · 80 invitados',
      'pt-BR': 'Celebração de luxo · 80 convidados',
      'zh-CN': '奢华庆典 · 80 位宾客',
      ko: '럭셔리 셀러브레이션 · 하객 80명',
      fr: 'Célébration de luxe · 80 invités',
      it: 'Celebrazione di lusso · 80 ospiti',
      nl: 'Luxe viering · 80 gasten', sv: 'Luxury celebration · 80 guests',
    },
    type: 'Luxury · 80 guests',
    guests: '80',
    range: '€78 000',
    story: {
      en: 'Eighty guests, four days, one large log hall in northern Lapland. Helicopter transfers from the airport, a private chef team, glass-igloo nights for every couple, and a full programme: arrival sauna, ceremony, post-wedding husky safari, farewell brunch.',
      fi: 'Kahdeksankymmentä vierasta, neljä päivää, yksi suuri hirsisali Pohjois-Lapissa. Helikopterikuljetukset kentältä, yksityinen kokkitiimi, lasi-iglu-yöt jokaiselle parille ja koko ohjelma: saapumissauna, vihkimys, hääjuhlan jälkeinen huskysafari, läksiäisbrunssi.',
      de: 'Achtzig Gäste, vier Tage, ein großer Blockhaussaal im Norden Lapplands. Hubschraubertransfers vom Flughafen, ein privates Kochteam, Glasiglu-Nächte für jedes Paar und ein volles Programm: Ankunftssauna, Zeremonie, Husky-Safari nach der Hochzeit, Abschiedsbrunch.',
      ja: 'ゲスト80人、4日間、北ラップランドの大きなログホールがひとつ。空港からのヘリコプター送迎、専属のプライベートシェフチーム、各カップルにガラスイグルー泊、そしてフルプログラム：到着サウナ、挙式、挙式後のハスキーサファリ、お別れブランチ。',
      es: 'Ochenta invitados, cuatro días, un gran salón de troncos en el norte de Laponia. Traslados en helicóptero desde el aeropuerto, un equipo de chef privado, noches en iglú de cristal para cada pareja y un programa completo: sauna de llegada, ceremonia, safari de huskies posboda y brunch de despedida.',
      'pt-BR': 'Oitenta convidados, quatro dias, um grande salão de troncos no norte da Lapônia. Transfers de helicóptero do aeroporto, uma equipe de chef privado, noites em iglu de vidro para cada casal e um programa completo: sauna de chegada, cerimônia, safári de huskies pós-casamento, brunch de despedida.',
      'zh-CN': '八十位宾客，四天行程，拉普兰北部的一座大型原木大厅。直升机机场接送、私人主厨团队、每对情侣的玻璃冰屋之夜，以及完整安排：抵达桑拿、仪式、婚后哈士奇雪橇之旅、告别早午餐。',
      ko: '하객 80명, 4일, 라플란드 북부의 커다란 통나무 홀 하나. 공항에서의 헬리콥터 이동, 전담 프라이빗 셰프 팀, 모든 커플을 위한 글라스 이글루 숙박, 그리고 풀 프로그램: 도착 사우나, 예식, 결혼식 후 허스키 사파리, 작별 브런치.',
      fr: 'Quatre-vingts invités, quatre jours, une grande salle en rondins dans le nord de la Laponie. Transferts en hélicoptère depuis l’aéroport, une brigade de chef privé, des nuits en igloo de verre pour chaque couple et un programme complet : sauna d’arrivée, cérémonie, safari husky après le mariage, brunch d’adieu.',
      it: 'Ottanta ospiti, quattro giorni, un grande salone in tronchi nel nord della Lapponia. Transfer in elicottero dall’aeroporto, un team di chef privato, notti in igloo di vetro per ogni coppia e un programma completo: sauna di arrivo, cerimonia, husky-safari post-matrimonio, brunch di addio.',
      nl: 'Tachtig gasten, vier dagen, één grote blokhuiszaal in het noorden van Lapland. Helikoptertransfers vanaf de luchthaven, een privéchef-team, glazen-iglo-nachten voor elk paar en een volledig programma: aankomstsauna, ceremonie, husky-safari na de bruiloft, afscheidsbrunch.', sv: 'Eighty guests, four days, one large log hall in northern Lapland. Helicopter transfers from the airport, a private chef team, glass-igloo nights for every couple, and a full programme: arrival sauna, ceremony, post-wedding husky safari, farewell brunch.',
    },
    spends: {
      en: ['Log-hall venue + ceremony: €18 000', 'Fine-dining catering ×80: €22 000', 'Helicopter transfers: €8 400', 'Photo + video team (3 people, full programme): €11 000', 'Glass igloo nights for guests ×3: €14 800', 'Florist + decor: €3 800'],
      fi: ['Hirsisali + vihkimys: 18 000 €', 'Fine dining -catering ×80: 22 000 €', 'Helikopterikuljetukset: 8 400 €', 'Kuvaus + video (3 henkilöä, koko ohjelma): 11 000 €', 'Lasi-iglu-yöt vieraille ×3: 14 800 €', 'Kukkasidonta + dekoraatio: 3 800 €'],
      de: ['Blockhaussaal + Zeremonie: 18 000 €', 'Fine-Dining-Catering ×80: 22 000 €', 'Hubschraubertransfers: 8 400 €', 'Foto- + Videoteam (3 Personen, ganzes Programm): 11 000 €', 'Glasiglu-Nächte für Gäste ×3: 14 800 €', 'Florist + Dekoration: 3 800 €'],
      ja: ['ログホール会場＋挙式：18,000ユーロ', 'ファインダイニング・ケータリング×80：22,000ユーロ', 'ヘリコプター送迎：8,400ユーロ', '写真＋動画チーム（3名、全プログラム）：11,000ユーロ', 'ゲスト用ガラスイグルー泊×3：14,800ユーロ', 'フローリスト＋装飾：3,800ユーロ'],
      es: ['Salón de troncos + ceremonia: 18 000 €', 'Catering de alta cocina ×80: 22 000 €', 'Traslados en helicóptero: 8 400 €', 'Equipo de foto + vídeo (3 personas, programa completo): 11 000 €', 'Noches en iglú de cristal para invitados ×3: 14 800 €', 'Floristería + decoración: 3 800 €'],
      'pt-BR': ['Salão de troncos + cerimônia: € 18.000', 'Buffet de alta gastronomia ×80: € 22.000', 'Transfers de helicóptero: € 8.400', 'Equipe de foto + vídeo (3 pessoas, programa completo): € 11.000', 'Noites em iglu de vidro para convidados ×3: € 14.800', 'Floricultura + decoração: € 3.800'],
      'zh-CN': ['原木大厅场地 + 仪式：18,000 欧元', '高级餐饮 ×80：22,000 欧元', '直升机接送：8,400 欧元', '摄影 + 视频团队（3 人，全程）：11,000 欧元', '宾客玻璃冰屋住宿 ×3：14,800 欧元', '花艺 + 布置：3,800 欧元'],
      ko: ['통나무 홀 장소 + 예식: 18,000유로', '파인다이닝 케이터링 ×80: 22,000유로', '헬리콥터 이동: 8,400유로', '사진 + 영상 팀(3인, 전체 프로그램): 11,000유로', '하객용 글라스 이글루 숙박 ×3: 14,800유로', '플로리스트 + 데코: 3,800유로'],
      fr: ['Salle en rondins + cérémonie : 18 000 €', 'Traiteur gastronomique ×80 : 22 000 €', 'Transferts en hélicoptère : 8 400 €', 'Équipe photo + vidéo (3 personnes, programme complet) : 11 000 €', 'Nuits en igloo de verre pour les invités ×3 : 14 800 €', 'Fleuriste + décoration : 3 800 €'],
      it: ['Salone in tronchi + cerimonia: 18 000 €', 'Catering di alta cucina ×80: 22 000 €', 'Transfer in elicottero: 8 400 €', 'Troupe foto + video (3 persone, programma completo): 11 000 €', 'Notti in igloo di vetro per gli ospiti ×3: 14 800 €', 'Fiorista + decorazioni: 3 800 €'],
      nl: ['Blokhuiszaal-locatie + ceremonie: € 18.000', 'Fine-dining catering ×80: € 22.000', 'Helikoptertransfers: € 8.400', 'Foto- + videoteam (3 personen, volledig programma): € 11.000', 'Glazen-iglo-nachten voor gasten ×3: € 14.800', 'Bloemist + decoratie: € 3.800'], sv: ['Log-hall venue + ceremony: €18 000', 'Fine-dining catering ×80: €22 000', 'Helicopter transfers: €8 400', 'Photo + video team (3 people, full programme): €11 000', 'Glass igloo nights for guests ×3: €14 800', 'Florist + decor: €3 800'],
    },
    takeaway: {
      en: 'Luxury is logistics. Helicopters, multi-day programmes, every couple in their own glass igloo. That is what €70k+ buys.',
      fi: 'Luksus on logistiikkaa. Helikopterit, monipäiväinen ohjelma, jokaiselle parille oma lasi-iglu. Se on mitä yli 70 000 € ostaa.',
      de: 'Luxus ist Logistik. Hubschrauber, mehrtägige Programme, jedes Paar in seinem eigenen Glasiglu. Das bekommt man für 70 000 €+.',
      ja: 'ラグジュアリーとはロジスティクスです。ヘリコプター、数日にわたるプログラム、各カップルに専用のガラスイグルー。それが7万ユーロ超で得られるものです。',
      es: 'El lujo es logística. Helicópteros, programas de varios días, cada pareja en su propio iglú de cristal: eso es lo que se compra por más de 70 000 €.',
      'pt-BR': 'Luxo é logística. Helicópteros, programas de vários dias, cada casal em seu próprio iglu de vidro. É isso que mais de € 70 mil compram.',
      'zh-CN': '奢华即物流。直升机、多日行程、每对情侣专属玻璃冰屋——这就是 7 万欧元以上所买到的。',
      ko: '럭셔리는 곧 물류입니다. 헬리콥터, 여러 날에 걸친 프로그램, 커플마다 전용 글라스 이글루. 7만 유로 이상이 사는 것이 바로 이것입니다.',
      fr: 'Le luxe, c’est la logistique. Hélicoptères, programmes sur plusieurs jours, chaque couple dans son propre igloo de verre. Voilà ce qu’on obtient pour plus de 70 000 €.',
      it: 'Il lusso è logistica. Elicotteri, programmi di più giorni, ogni coppia nel proprio igloo di vetro. È questo che si compra con oltre 70 000 €.',
      nl: 'Luxe is logistiek. Helikopters, meerdaagse programma’s, elk paar in een eigen glazen iglo. Dat is wat € 70k+ oplevert.', sv: 'Luxury is logistics. Helicopters, multi-day programmes, every couple in their own glass igloo. That is what €70k+ buys.',
    },
    image: '/images/pricing/luxury-helena-james.jpg',
  },
];

const breakdown: Array<{ title: Localized<string>; range: Localized<string> }> = [
  {
    title: {
      en: 'Wedding planner fee', fi: 'Hääsuunnittelijan palkkio', de: 'Honorar des Hochzeitsplaners',
      ja: 'ウェディングプランナー料金', es: 'Honorarios del organizador', 'pt-BR': 'Honorários do organizador',
      'zh-CN': '婚礼策划师费用', ko: '웨딩 플래너 비용', fr: 'Honoraires du wedding planner',
      it: 'Onorario del wedding planner', nl: 'Honorarium trouwplanner', sv: 'Wedding planner fee',
    },
    range: { en: '€1 600 – €5 000', fi: '1 600 – 5 000 €', de: '1 600 – 5 000 €', ja: '1,600〜5,000ユーロ', es: '1 600 – 5 000 €', 'pt-BR': '€ 1.600 – € 5.000', 'zh-CN': '1,600 – 5,000 欧元', ko: '1,600 – 5,000유로', fr: '1 600 – 5 000 €', it: '1 600 – 5 000 €', nl: '€ 1.600 – € 5.000' , sv: '€1 600 – €5 000'},
  },
  {
    title: {
      en: 'DVV paperwork & officiant', fi: 'DVV-paperit ja vihkijä', de: 'DVV-Unterlagen & Trauredner',
      ja: 'DVV書類＆司式者', es: 'Trámites DVV y oficiante', 'pt-BR': 'Documentação DVV e celebrante',
      'zh-CN': 'DVV 文件与主婚人', ko: 'DVV 서류 & 주례', fr: 'Formalités DVV & officiant',
      it: 'Documenti DVV e celebrante', nl: 'DVV-papierwerk & voltrekker', sv: 'DVV paperwork & officiant',
    },
    range: { en: '€350 – €600', fi: '350 – 600 €', de: '350 – 600 €', ja: '350〜600ユーロ', es: '350 – 600 €', 'pt-BR': '€ 350 – € 600', 'zh-CN': '350 – 600 欧元', ko: '350 – 600유로', fr: '350 – 600 €', it: '350 – 600 €', nl: '€ 350 – € 600' , sv: '€350 – €600'},
  },
  {
    title: {
      en: 'Photography (2h to full day + video)', fi: 'Valokuvaus (2 h – koko päivä + video)', de: 'Fotografie (2 Std. bis ganzer Tag + Video)',
      ja: '写真撮影（2時間〜終日＋動画）', es: 'Fotografía (2 h a día completo + vídeo)', 'pt-BR': 'Fotografia (2 h ao dia inteiro + vídeo)',
      'zh-CN': '摄影（2 小时至全天 + 视频）', ko: '사진 촬영(2시간~종일 + 영상)', fr: 'Photographie (2 h à journée complète + vidéo)',
      it: 'Fotografia (da 2 h all’intera giornata + video)', nl: 'Fotografie (2 u tot hele dag + video)', sv: 'Photography (2h to full day + video)',
    },
    range: { en: '€590 – €4 200', fi: '590 – 4 200 €', de: '590 – 4 200 €', ja: '590〜4,200ユーロ', es: '590 – 4 200 €', 'pt-BR': '€ 590 – € 4.200', 'zh-CN': '590 – 4,200 欧元', ko: '590 – 4,200유로', fr: '590 – 4 200 €', it: '590 – 4 200 €', nl: '€ 590 – € 4.200' , sv: '€590 – €4 200'},
  },
  {
    title: {
      en: 'Snow / ice / glass chapel ceremony', fi: 'Lumi-/jää-/lasikappelivihkimys', de: 'Schnee-/Eis-/Glaskapellen-Zeremonie',
      ja: 'スノー／アイス／ガラスチャペル挙式', es: 'Ceremonia en capilla de nieve / hielo / cristal', 'pt-BR': 'Cerimônia em capela de neve / gelo / vidro',
      'zh-CN': '雪 / 冰 / 玻璃教堂仪式', ko: '스노우 / 아이스 / 글라스 채플 예식', fr: 'Cérémonie en chapelle de neige / glace / verre',
      it: 'Cerimonia in cappella di neve / ghiaccio / vetro', nl: 'Ceremonie in sneeuw-/ijs-/glaskapel', sv: 'Snow / ice / glass chapel ceremony',
    },
    range: { en: '€800 – €4 000', fi: '800 – 4 000 €', de: '800 – 4 000 €', ja: '800〜4,000ユーロ', es: '800 – 4 000 €', 'pt-BR': '€ 800 – € 4.000', 'zh-CN': '800 – 4,000 欧元', ko: '800 – 4,000유로', fr: '800 – 4 000 €', it: '800 – 4 000 €', nl: '€ 800 – € 4.000' , sv: '€800 – €4 000'},
  },
  {
    title: {
      en: 'Florist + bouquet', fi: 'Kukat + kimppu', de: 'Florist + Brautstrauß',
      ja: 'フローリスト＋ブーケ', es: 'Floristería + ramo', 'pt-BR': 'Floricultura + buquê',
      'zh-CN': '花艺 + 捧花', ko: '플로리스트 + 부케', fr: 'Fleuriste + bouquet',
      it: 'Fiorista + bouquet', nl: 'Bloemist + boeket', sv: 'Florist + bouquet',
    },
    range: { en: '€240 – €1 800', fi: '240 – 1 800 €', de: '240 – 1 800 €', ja: '240〜1,800ユーロ', es: '240 – 1 800 €', 'pt-BR': '€ 240 – € 1.800', 'zh-CN': '240 – 1,800 欧元', ko: '240 – 1,800유로', fr: '240 – 1 800 €', it: '240 – 1 800 €', nl: '€ 240 – € 1.800' , sv: '€240 – €1 800'},
  },
  {
    title: {
      en: 'Catering (per guest)', fi: 'Catering (per vieras)', de: 'Catering (pro Gast)',
      ja: 'ケータリング（1人あたり）', es: 'Catering (por invitado)', 'pt-BR': 'Buffet (por convidado)',
      'zh-CN': '餐饮（每位宾客）', ko: '케이터링(인당)', fr: 'Traiteur (par invité)',
      it: 'Catering (per ospite)', nl: 'Catering (per gast)', sv: 'Catering (per guest)',
    },
    range: { en: '€80 – €280', fi: '80 – 280 €', de: '80 – 280 €', ja: '80〜280ユーロ', es: '80 – 280 €', 'pt-BR': '€ 80 – € 280', 'zh-CN': '80 – 280 欧元', ko: '80 – 280유로', fr: '80 – 280 €', it: '80 – 280 €', nl: '€ 80 – € 280' , sv: '€80 – €280'},
  },
  {
    title: {
      en: 'Glass igloo / cabin (per night)', fi: 'Lasi-iglu / cabin (per yö)', de: 'Glasiglu / Hütte (pro Nacht)',
      ja: 'ガラスイグルー／キャビン（1泊）', es: 'Iglú de cristal / cabaña (por noche)', 'pt-BR': 'Iglu de vidro / cabana (por noite)',
      'zh-CN': '玻璃冰屋 / 小屋（每晚）', ko: '글라스 이글루 / 캐빈(1박)', fr: 'Igloo de verre / cabane (par nuit)',
      it: 'Igloo di vetro / cabina (a notte)', nl: 'Glazen iglo / cabin (per nacht)', sv: 'Glass igloo / cabin (per night)',
    },
    range: { en: '€280 – €1 200', fi: '280 – 1 200 €', de: '280 – 1 200 €', ja: '280〜1,200ユーロ', es: '280 – 1 200 €', 'pt-BR': '€ 280 – € 1.200', 'zh-CN': '280 – 1,200 欧元', ko: '280 – 1,200유로', fr: '280 – 1 200 €', it: '280 – 1 200 €', nl: '€ 280 – € 1.200' , sv: '€280 – €1 200'},
  },
  {
    title: {
      en: 'Husky / reindeer arrival', fi: 'Husky- / poro-saapuminen', de: 'Ankunft per Husky / Rentier',
      ja: 'ハスキー／トナカイでの登場', es: 'Llegada en huskies / renos', 'pt-BR': 'Chegada de huskies / renas',
      'zh-CN': '哈士奇 / 驯鹿登场', ko: '허스키 / 순록 도착', fr: 'Arrivée en husky / renne',
      it: 'Arrivo in husky / renna', nl: 'Aankomst per husky / rendier', sv: 'Husky / reindeer arrival',
    },
    range: { en: '€600 – €2 400', fi: '600 – 2 400 €', de: '600 – 2 400 €', ja: '600〜2,400ユーロ', es: '600 – 2 400 €', 'pt-BR': '€ 600 – € 2.400', 'zh-CN': '600 – 2,400 欧元', ko: '600 – 2,400유로', fr: '600 – 2 400 €', it: '600 – 2 400 €', nl: '€ 600 – € 2.400' , sv: '€600 – €2 400'},
  },
];

type PKey =
  | 'seoTitle' | 'seoDesc' | 'heroEyebrow' | 'heroTitle' | 'heroSubtitle' | 'heroImageAlt'
  | 's1Eyebrow' | 's1Title' | 'exampleDisclaimer'
  | 'whereMoneyGoes' | 'getQuoteLike'
  | 's2Eyebrow' | 's2Title' | 's2Subtitle'
  | 'ctaEyebrow' | 'ctaTitle' | 'ctaBody' | 'ctaButton'
  | 's4Eyebrow' | 's4Title' | 's4Subtitle';

const P: Record<PKey, Localized<string>> = {
  seoTitle: {
    en: 'Lapland Weddings: pricing with four example budgets | LaplandWeddings',
    fi: 'Häät Lapissa: hinta-arviot ja neljä esimerkkibudjettia | LaplandWeddings',
    de: 'Hochzeiten in Lappland: Preise mit vier Beispielbudgets | LaplandWeddings',
    ja: 'ラップランドの結婚式：4つの予算例で見る費用 | LaplandWeddings',
    es: 'Bodas en Laponia: precios con cuatro presupuestos de ejemplo | LaplandWeddings',
    'pt-BR': 'Casamentos na Lapônia: preços com quatro orçamentos de exemplo | LaplandWeddings',
    'zh-CN': '拉普兰婚礼：四个示例预算的价格 | LaplandWeddings',
    ko: '라플란드 웨딩: 예산 예시 4건으로 보는 비용 | LaplandWeddings',
    fr: 'Mariages en Laponie: tarifs et quatre budgets d’exemple | LaplandWeddings',
    it: 'Matrimoni in Lapponia: prezzi con quattro budget di esempio | LaplandWeddings',
    nl: 'Bruiloften in Lapland: prijzen met vier voorbeeldbudgetten | LaplandWeddings', sv: 'Lapland Weddings: pricing with four example budgets | LaplandWeddings',
  },
  seoDesc: {
    en: 'What does a Lapland wedding cost? Four example budgets: elopement (€2 100), snow chapel for 18 (€8 400), northern-lights wedding for 32 (€24 800), luxury for 80 (€78 000). Detailed breakdowns.',
    fi: 'Mitä Lapin häät maksavat? Neljä esimerkkibudjettia: elopement (2 100 €), lumikappelihäät 18 vieraalle (8 400 €), revontulihäät 32 vieraalle (24 800 €), luksusjuhla 80 vieraalle (78 000 €). Tarkat erittelyt.',
    de: 'Was kostet eine Hochzeit in Lappland? Vier Beispielbudgets: Elopement (2 100 €), Schneekapelle für 18 (8 400 €), Polarlicht-Hochzeit für 32 (24 800 €), Luxusfeier für 80 (78 000 €). Detaillierte Aufschlüsselungen.',
    ja: 'ラップランドの結婚式はいくら？4つの予算例：ふたりだけの挙式（2,100ユーロ）、18人のスノーチャペル（8,400ユーロ）、32人のオーロラ挙式（24,800ユーロ）、80人のラグジュアリーな祝宴（78,000ユーロ）。詳細な内訳付き。',
    es: '¿Cuánto cuesta una boda en Laponia? Cuatro presupuestos de ejemplo: fuga romántica (2 100 €), capilla de nieve para 18 (8 400 €), boda bajo auroras para 32 (24 800 €), celebración de lujo para 80 (78 000 €). Desgloses detallados.',
    'pt-BR': 'Quanto custa um casamento na Lapônia? Quatro orçamentos de exemplo: elopement (€ 2.100), capela de neve para 18 (€ 8.400), casamento sob a aurora para 32 (€ 24.800), celebração de luxo para 80 (€ 78.000). Detalhamentos completos.',
    'zh-CN': '在拉普兰办婚礼要花多少钱？四个示例预算：私奔婚礼（2,100 欧元）、18 人雪教堂婚礼（8,400 欧元）、32 人极光婚礼（24,800 欧元）、80 人奢华庆典（78,000 欧元）。附详细明细。',
    ko: '라플란드 결혼식 비용은 얼마일까요? 네 가지 예산 예시: 단둘이 올리는 결혼식(2,100유로), 하객 18명 스노우 채플(8,400유로), 하객 32명 오로라 웨딩(24,800유로), 하객 80명 럭셔리 셀러브레이션(78,000유로). 상세 내역 포함.',
    fr: 'Combien coûte un mariage en Laponie ? Quatre budgets d’exemple : elopement (2 100 €), chapelle de neige pour 18 (8 400 €), mariage sous les aurores pour 32 (24 800 €), célébration de luxe pour 80 (78 000 €). Détails complets.',
    it: 'Quanto costa un matrimonio in Lapponia? Quattro budget di esempio: elopement (2 100 €), cappella di neve per 18 (8 400 €), matrimonio sotto l’aurora per 32 (24 800 €), celebrazione di lusso per 80 (78 000 €). Ripartizioni dettagliate.',
    nl: 'Wat kost een bruiloft in Lapland? Vier voorbeeldbudgetten: elopement (€ 2.100), sneeuwkapel voor 18 (€ 8.400), noorderlichtbruiloft voor 32 (€ 24.800), luxe viering voor 80 (€ 78.000). Gedetailleerde uitsplitsingen.', sv: 'What does a Lapland wedding cost? Four example budgets: elopement (€2 100), snow chapel for 18 (€8 400), northern-lights wedding for 32 (€24 800), luxury for 80 (€78 000). Detailed breakdowns.',
  },
  heroEyebrow: {
    en: 'Pricing', fi: 'Hinta-arviot', de: 'Preise', ja: '費用',
    es: 'Precios', 'pt-BR': 'Preços', 'zh-CN': '价格', ko: '가격',
    fr: 'Tarifs', it: 'Prezzi', nl: 'Prijzen', sv: 'Pricing',
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
    nl: 'Wat een bruiloft in Lapland echt kost', sv: 'What a Lapland wedding really costs',
  },
  heroSubtitle: {
    en: 'Four example budgets: from a €2 100 elopement to a €78 000 luxury celebration. Every example breaks down where the money goes. Prices are indicative estimates.',
    fi: 'Neljä esimerkkibudjettia: 2 100 euron elopementista 78 000 euron luksusjuhlaan. Joka esimerkissä erittely, mihin raha kuluu. Hinnat ovat suuntaa-antavia arvioita.',
    de: 'Vier Beispielbudgets: von einem 2 100-€-Elopement bis zur 78 000-€-Luxusfeier. Jedes Beispiel schlüsselt auf, wohin das Geld fließt. Die Preise sind unverbindliche Richtwerte.',
    ja: '4つの予算例：2,100ユーロのふたりだけの挙式から78,000ユーロのラグジュアリーな祝宴まで。各例でお金の使い道を内訳します。価格は目安の概算です。',
    es: 'Cuatro presupuestos de ejemplo: desde una fuga romántica de 2 100 € hasta una celebración de lujo de 78 000 €. Cada ejemplo desglosa adónde va el dinero. Los precios son estimaciones orientativas.',
    'pt-BR': 'Quatro orçamentos de exemplo: de um elopement de € 2.100 a uma celebração de luxo de € 78.000. Cada exemplo detalha para onde vai o dinheiro. Os preços são estimativas indicativas.',
    'zh-CN': '四个示例预算——从 2,100 欧元的私奔婚礼到 78,000 欧元的奢华庆典。每个示例都详细说明钱花在哪里。价格为参考估算。',
    ko: '네 가지 예산 예시: 2,100유로의 단둘이 올리는 결혼식부터 78,000유로의 럭셔리 셀러브레이션까지. 각 예시마다 돈이 어디에 쓰이는지 분석합니다. 가격은 참고용 추정치입니다.',
    fr: 'Quatre budgets d’exemple: d’un elopement à 2 100 € à une célébration de luxe à 78 000 €. Chaque exemple détaille où va l’argent. Les prix sont des estimations indicatives.',
    it: 'Quattro budget di esempio: da un elopement da 2 100 € a una celebrazione di lusso da 78 000 €. Ogni esempio mostra dove va il denaro. I prezzi sono stime indicative.',
    nl: 'Vier voorbeeldbudgetten: van een elopement van € 2.100 tot een luxe viering van € 78.000. Elk voorbeeld laat zien waar het geld naartoe gaat. Prijzen zijn indicatieve schattingen.', sv: 'Four example budgets: from a €2 100 elopement to a €78 000 luxury celebration. Every example breaks down where the money goes. Prices are indicative estimates.',
  },
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
    nl: 'Laplands bruidspaar in de winter', sv: 'Lapland wedding couple in winter',
  },
  s1Eyebrow: {
    en: 'Four budgets', fi: 'Neljä budjettia',
    de: 'Vier Budgets', ja: '4つの予算',
    es: 'Cuatro presupuestos', 'pt-BR': 'Quatro orçamentos',
    'zh-CN': '四种预算', ko: '네 가지 예산',
    fr: 'Quatre budgets', it: 'Quattro budget',
    nl: 'Vier budgetten', sv: 'Four budgets',
  },
  s1Title: {
    en: 'How a Lapland wedding scales by budget',
    fi: 'Miltä Lapin häät näyttävät rahasummasta riippuen',
    de: 'Wie eine Hochzeit in Lappland mit dem Budget skaliert',
    ja: '予算によってラップランドの結婚式はどう変わるか',
    es: 'Cómo escala una boda en Laponia según el presupuesto',
    'pt-BR': 'Como um casamento na Lapônia varia conforme o orçamento',
    'zh-CN': '拉普兰婚礼如何随预算变化',
    ko: '예산에 따라 라플란드 결혼식은 어떻게 달라지는가',
    fr: 'Comment un mariage en Laponie évolue selon le budget',
    it: 'Come un matrimonio in Lapponia cambia in base al budget',
    nl: 'Hoe een Laplandse bruiloft schaalt met het budget', sv: 'How a Lapland wedding scales by budget',
  },
  whereMoneyGoes: {
    en: 'Where the money goes', fi: 'Mihin raha kuluu', de: 'Wohin das Geld fließt',
    ja: 'お金の使い道', es: 'Adónde va el dinero', 'pt-BR': 'Para onde vai o dinheiro',
    'zh-CN': '钱花在哪里', ko: '돈이 어디에 쓰이는가', fr: 'Où va l’argent',
    it: 'Dove va il denaro', nl: 'Waar het geld naartoe gaat', sv: 'Where the money goes',
  },
  exampleDisclaimer: {
    en: 'These are example calculations at indicative price levels, not past client weddings. We plan yours from scratch and gather real quotes from venues and vendors.',
    fi: 'Nämä ovat esimerkkilaskelmia suuntaa-antavilla hintatasoilla, eivät toteutuneita asiakashäitä. Suunnittelemme teidän häänne alusta asti ja pyydämme todelliset tarjoukset paikoilta ja palveluilta.',
    de: 'Dies sind Beispielrechnungen auf Basis unverbindlicher Preisniveaus, keine tatsächlich durchgeführten Kundenhochzeiten. Ihre Hochzeit planen wir von Grund auf und holen echte Angebote von Locations und Dienstleistern ein.',
    ja: 'これらは目安の価格水準に基づく試算例であり、実際に行われたお客様の結婚式ではありません。お二人の結婚式は一から企画し、会場や各サービスから実際の見積もりを取得します。',
    es: 'Estos son cálculos de ejemplo con niveles de precio orientativos, no bodas reales de clientes. Planificamos vuestra boda desde cero y solicitamos presupuestos reales a lugares y proveedores.',
    'pt-BR': 'Estes são cálculos de exemplo com níveis de preço indicativos, não casamentos reais de clientes. Planejamos o casamento de vocês do zero e buscamos orçamentos reais com locais e fornecedores.',
    'zh-CN': '这些是基于参考价格水平的示例计算——并非过往客户的真实婚礼。我们会为你们从零开始策划，并向场地和服务商索取真实报价。',
    ko: '이는 참고용 가격 수준으로 작성한 예시 계산이며, 실제 진행된 고객 결혼식이 아닙니다. 두 분의 결혼식은 처음부터 새로 기획하고, 장소와 업체로부터 실제 견적을 받아 드립니다.',
    fr: 'Il s’agit de calculs d’exemple à des niveaux de prix indicatifs, pas de mariages de clients réalisés. Nous planifions le vôtre à partir de zéro et recueillons de vrais devis auprès des lieux et prestataires.',
    it: 'Si tratta di calcoli di esempio a livelli di prezzo indicativi, non di matrimoni di clienti realmente svolti. Il vostro matrimonio lo progettiamo da zero e raccogliamo preventivi reali da location e fornitori.',
    nl: 'Dit zijn voorbeeldberekeningen op indicatieve prijsniveaus, geen daadwerkelijk uitgevoerde klantbruiloften. Jullie bruiloft plannen we vanaf nul en we vragen echte offertes op bij locaties en leveranciers.', sv: 'These are example calculations at indicative price levels, not past client weddings. We plan yours from scratch and gather real quotes from venues and vendors.',
  },
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
    nl: 'Vraag een offerte aan voor zo’n bruiloft', sv: 'Get a quote for a wedding like this',
  },
  s2Eyebrow: {
    en: 'Individual costs', fi: 'Yksittäiset kustannukset', de: 'Einzelkosten',
    ja: '個別の費用', es: 'Costes individuales', 'pt-BR': 'Custos individuais',
    'zh-CN': '单项费用', ko: '개별 비용', fr: 'Coûts individuels',
    it: 'Costi singoli', nl: 'Afzonderlijke kosten', sv: 'Individual costs',
  },
  s2Title: {
    en: 'What goes into the price', fi: 'Mistä häiden hinta koostuu',
    de: 'Was den Preis ausmacht', ja: '価格の内訳',
    es: 'Qué compone el precio', 'pt-BR': 'O que compõe o preço',
    'zh-CN': '价格由哪些部分组成', ko: '가격을 구성하는 항목',
    fr: 'Ce qui compose le prix', it: 'Cosa compone il prezzo',
    nl: 'Waaruit de prijs bestaat', sv: 'What goes into the price',
  },
  s2Subtitle: {
    en: 'Market estimates as of early 2026. Individual planners and venues set their own pricing.',
    fi: 'Hinnat ovat markkinaestimaatteja vuoden 2026 alusta. Yksittäiset suunnittelijat ja venuet hinnoittelevat itsenäisesti.',
    de: 'Marktschätzungen Stand Anfang 2026. Einzelne Planer und Locations legen ihre Preise selbst fest.',
    ja: '2026年初頭時点の市場推定。各プランナーや会場が独自に価格を設定します。',
    es: 'Estimaciones de mercado a principios de 2026: cada organizador y lugar fija sus propios precios.',
    'pt-BR': 'Estimativas de mercado no início de 2026. Cada organizador e local define os próprios preços.',
    'zh-CN': '截至 2026 年初的市场估算——各策划师和场地自行定价。',
    ko: '2026년 초 기준 시장 추정치. 개별 플래너와 웨딩 장소가 자체적으로 가격을 책정합니다.',
    fr: 'Estimations du marché début 2026. Chaque planner et lieu fixe ses propres tarifs.',
    it: 'Stime di mercato a inizio 2026. Singoli planner e location fissano i propri prezzi.',
    nl: 'Marktschattingen begin 2026. Afzonderlijke planners en locaties bepalen hun eigen prijzen.', sv: 'Market estimates as of early 2026. Individual planners and venues set their own pricing.',
  },
  ctaEyebrow: {
    en: 'When you know your budget', fi: 'Kun budjetti on selvillä',
    de: 'Wenn Sie Ihr Budget kennen', ja: '予算が決まったら',
    es: 'Cuando conoces tu presupuesto', 'pt-BR': 'Quando você já sabe seu orçamento',
    'zh-CN': '当你确定了预算', ko: '예산이 정해졌다면',
    fr: 'Quand vous connaissez votre budget', it: 'Quando conosci il tuo budget',
    nl: 'Als je je budget kent', sv: 'When you know your budget',
  },
  ctaTitle: {
    en: 'Get 3 quotes, compare at your own pace',
    fi: 'Pyydä 3 tarjousta, vertaile rauhassa',
    de: 'Holen Sie 3 Angebote ein, vergleichen Sie in Ruhe',
    ja: '3つの見積もりを取得、自分のペースで比較',
    es: 'Recibe 3 presupuestos, compara a tu ritmo',
    'pt-BR': 'Receba 3 orçamentos, compare no seu ritmo',
    'zh-CN': '获取 3 份报价——按自己的节奏比较',
    ko: '견적 3건 받기, 여유롭게 비교하세요',
    fr: 'Obtenez 3 devis, comparez à votre rythme',
    it: 'Ottieni 3 preventivi, confronta con calma',
    nl: 'Ontvang 3 offertes, vergelijk op je eigen tempo', sv: 'Get 3 quotes, compare at your own pace',
  },
  ctaBody: {
    en: 'One form, 1–7 days, 3 personalised proposals from Lapland’s most experienced planners. Free, no commitment. You decide who to continue with.',
    fi: 'Yhdellä lomakkeella saat 1–7 päivän sisällä 3 räätälöityä tarjousta Lapin kokeneimmilta hääsuunnittelijoilta. Maksuton, ei sitoumusta. Sinä päätät kenen kanssa jatkat.',
    de: 'Ein Formular, 1–7 Tage, 3 individuelle Angebote von Lapplands erfahrensten Planern. Kostenlos, unverbindlich. Sie entscheiden, mit wem Sie weitermachen.',
    ja: 'フォームを1つ、1〜7日で、ラップランドで最も経験豊富なプランナーから3つのオーダーメイド提案。無料・無拘束。誰と進めるかはあなた次第です。',
    es: 'Un formulario, de 1 a 7 días, 3 propuestas personalizadas de los organizadores más experimentados de Laponia. Gratis, sin compromiso: tú decides con quién seguir.',
    'pt-BR': 'Um formulário, de 1 a 7 dias, 3 propostas personalizadas dos organizadores mais experientes da Lapônia. Grátis, sem compromisso. Você decide com quem continuar.',
    'zh-CN': '一份表单，1–7 天，来自拉普兰最有经验策划师的 3 份个性化方案。免费、无约束——由你决定与谁继续。',
    ko: '양식 하나, 1~7일, 라플란드에서 가장 경험 많은 플래너의 맞춤 제안 3건. 무료, 부담 없음. 누구와 진행할지는 당신이 결정합니다.',
    fr: 'Un formulaire, 1 à 7 jours, 3 propositions personnalisées des planners les plus expérimentés de Laponie. Gratuit, sans engagement. Vous décidez avec qui continuer.',
    it: 'Un modulo, 1–7 giorni, 3 proposte personalizzate dai planner più esperti della Lapponia. Gratis, senza impegno. Decidi tu con chi proseguire.',
    nl: 'Eén formulier, 1–7 dagen, 3 persoonlijke voorstellen van de meest ervaren planners van Lapland. Gratis, vrijblijvend. Jij bepaalt met wie je verdergaat.', sv: 'One form, 1–7 days, 3 personalised proposals from Lapland’s most experienced planners. Free, no commitment. You decide who to continue with.',
  },
  ctaButton: {
    en: 'Start the 5-minute form', fi: 'Aloita 5 minuutin lomake',
    de: 'Das 5-Minuten-Formular starten', ja: '5分のフォームを始める',
    es: 'Empieza el formulario de 5 minutos', 'pt-BR': 'Comece o formulário de 5 minutos',
    'zh-CN': '开始 5 分钟表单', ko: '5분 양식 시작하기',
    fr: 'Commencer le formulaire de 5 minutes', it: 'Inizia il modulo di 5 minuti',
    nl: 'Start het formulier van 5 minuten', sv: 'Start the 5-minute form',
  },
  s4Eyebrow: {
    en: 'Direct contact', fi: 'Suora kontakti', de: 'Direkter Kontakt',
    ja: '直接のお問い合わせ', es: 'Contacto directo', 'pt-BR': 'Contato direto',
    'zh-CN': '直接联系', ko: '직접 문의', fr: 'Contact direct',
    it: 'Contatto diretto', nl: 'Direct contact', sv: 'Direct contact',
  },
  s4Title: {
    en: 'Or fill in the form right here', fi: 'Tai täytä lomake nyt',
    de: 'Oder füllen Sie das Formular direkt hier aus', ja: 'またはこちらでフォームに記入',
    es: 'O rellena el formulario aquí mismo', 'pt-BR': 'Ou preencha o formulário aqui mesmo',
    'zh-CN': '或在此直接填写表单', ko: '또는 여기에서 바로 양식을 작성하세요',
    fr: 'Ou remplissez le formulaire ici même', it: 'Oppure compila il modulo qui',
    nl: 'Of vul het formulier hier direct in', sv: 'Or fill in the form right here',
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
    nl: 'Geef het budgetveld op, zodat we je kunnen koppelen aan planners in de juiste prijsklasse.', sv: 'Specify the budget field so we can match you with planners at the right price level.',
  },
};

export default function Pricing() {
  const { lang } = useLang();
  const p = (k: PKey) => pickLocalized(P[k], lang);
  const guests = ui('guests', lang);

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
        <div className="space-y-10 sm:space-y-14 max-w-5xl mx-auto">
          {stories.map((s) => (
            <article
              key={s.image}
              className="bg-night-light/60 border border-white/5 rounded-3xl overflow-hidden grid md:grid-cols-2 md:items-start"
            >
              <div className="aspect-[4/3] relative overflow-hidden md:rounded-l-3xl">
                <img
                  src={s.image}
                  alt={pickLocalized(s.label, lang)}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/55 backdrop-blur rounded-full text-[11px] font-semibold text-white tracking-wider uppercase">
                  {s.emoji} {s.type}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide min-w-0 break-words">{pickLocalized(s.label, lang)}</h3>
                  <p className="font-heading text-rose text-2xl sm:text-3xl whitespace-nowrap shrink-0">{s.range}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-aurora-pink font-semibold mb-3">
                  {s.guests} {guests}
                </p>
                <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed mb-5">
                  {pickLocalized(s.story, lang)}
                </p>

                <div className="border border-line rounded-xl p-4 mb-5" style={{ background: 'rgba(252, 232, 225, 0.45)' }}>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold mb-2">
                    {p('whereMoneyGoes')}
                  </p>
                  <ul className="space-y-1.5">
                    {pickLocalized(s.spends, lang).map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[13px] text-gray-300">
                        <span className="text-aurora-green mt-0.5">·</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[13px] italic text-aurora-pink leading-relaxed mb-5 border-l-2 border-aurora-pink pl-3">
                  {pickLocalized(s.takeaway, lang)}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  <L
                    to="/contact"
                    className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors"
                    style={{ color: '#FFFFFF', background: '#C9466A' }}
                  >
                    {p('getQuoteLike')} →
                  </L>
                </div>
              </div>
            </article>
          ))}
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
            <div
              key={b.title.en}
              className={`flex items-center justify-between px-5 sm:px-7 py-4 ${
                i !== 0 ? 'border-t border-white/5' : ''
              }`}
            >
              <p className="text-[15px] text-gray-200 min-w-0 pr-3">{pickLocalized(b.title, lang)}</p>
              <p className="font-heading text-rose text-base sm:text-lg whitespace-nowrap shrink-0">
                {pickLocalized(b.range, lang)}
              </p>
            </div>
          ))}
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
