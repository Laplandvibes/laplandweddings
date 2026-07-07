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
  couple: string;
  origin: string;
  type: string;
  guests: string;
  range: string;
  story: Localized<string>;
  spends: Localized<string[]>;
  takeaway: Localized<string>;
  venue: string;
  venueSlug: string;
  image?: string;
}

const stories: Story[] = [
  {
    emoji: '💍',
    couple: 'Hannah & Tom',
    origin: 'London, UK',
    type: 'Elopement',
    guests: '2',
    range: '€2 100',
    story: {
      en: 'Hannah and Tom flew into Rovaniemi on a Friday evening, married on Saturday in the Arctic SnowHotel ice chapel, and were back in London Sunday night. Their planner handled DVV paperwork, officiant, photographer (2h) and the hotel night. Total cost — flights, ceremony, two-night igloo stay — under €2 100.',
      fi: 'Hannah ja Tom lensivät Rovaniemelle perjantai-iltana, vihille lauantaina Arctic SnowHotelin jääkappeliin, takaisin Lontooseen sunnuntai-iltana. Suunnittelija hoiti DVV-paperit, vihkijän, valokuvaajan (2 h) ja yöpymisen. Kustannus — lennot, vihkimys, 2 yötä iglussa — alle 2 100 €.',
      de: 'Hannah und Tom flogen am Freitagabend nach Rovaniemi, heirateten am Samstag in der Eiskapelle des Arctic SnowHotel und waren am Sonntagabend zurück in London. Ihr Planer kümmerte sich um DVV-Unterlagen, Trauredner, Fotograf (2 Std.) und die Hotelübernachtung. Gesamtkosten — Flüge, Zeremonie, zwei Nächte im Iglu — unter 2 100 €.',
      ja: 'ハンナとトムは金曜の夜にロヴァニエミに到着し、土曜にアークティック・スノーホテルの氷のチャペルで挙式、日曜の夜にはロンドンに戻りました。プランナーがDVV書類、司式者、写真撮影（2時間）、ホテルの宿泊を手配。総費用は航空券、挙式、2泊のイグルー滞在を含めて2,100ユーロ未満。',
      es: 'Hannah y Tom volaron a Rovaniemi un viernes por la noche, se casaron el sábado en la capilla de hielo del Arctic SnowHotel y volvieron a Londres el domingo por la noche. Su organizador se encargó de los trámites del DVV, el oficiante, el fotógrafo (2 h) y la noche de hotel. Coste total — vuelos, ceremonia, dos noches en iglú — menos de 2 100 €.',
      'pt-BR': 'Hannah e Tom voaram para Rovaniemi numa sexta à noite, casaram-se no sábado na capela de gelo do Arctic SnowHotel e voltaram a Londres no domingo à noite. O organizador cuidou da documentação do DVV, do celebrante, do fotógrafo (2 h) e da noite de hotel. Custo total — voos, cerimônia, duas noites em iglu — menos de € 2.100.',
      'zh-CN': '汉娜和汤姆周五晚上飞抵罗瓦涅米，周六在 Arctic SnowHotel 冰教堂完婚，周日晚上便返回伦敦。他们的策划师处理了 DVV 文件、主婚人、摄影（2 小时）和酒店住宿。总花费——机票、仪式、两晚冰屋住宿——不到 2,100 欧元。',
      ko: '한나와 톰은 금요일 저녁 로바니에미에 도착해 토요일 Arctic SnowHotel 아이스 채플에서 결혼식을 올리고 일요일 밤 런던으로 돌아갔습니다. 플래너가 DVV 서류, 주례, 사진 촬영(2시간), 호텔 숙박을 처리했습니다. 총비용은 항공편, 예식, 이글루 2박을 포함해 2,100유로 미만.',
      fr: 'Hannah et Tom se sont envolés pour Rovaniemi un vendredi soir, se sont mariés le samedi dans la chapelle de glace de l’Arctic SnowHotel et étaient de retour à Londres le dimanche soir. Leur planner a géré les formalités DVV, l’officiant, le photographe (2 h) et la nuit d’hôtel. Coût total — vols, cérémonie, deux nuits en igloo — moins de 2 100 €.',
      it: 'Hannah e Tom sono atterrati a Rovaniemi un venerdì sera, si sono sposati il sabato nella cappella di ghiaccio dell’Arctic SnowHotel e sono tornati a Londra la domenica sera. Il loro planner ha gestito i documenti DVV, il celebrante, il fotografo (2 h) e la notte in hotel. Costo totale — voli, cerimonia, due notti in igloo — meno di 2 100 €.',
      nl: 'Hannah en Tom vlogen op een vrijdagavond naar Rovaniemi, trouwden op zaterdag in de ijskapel van het Arctic SnowHotel en waren zondagavond terug in Londen. Hun planner regelde het DVV-papierwerk, de voltrekker, de fotograaf (2 u) en de hotelovernachting. Totale kosten — vluchten, ceremonie, twee nachten in een iglo — onder de € 2.100.',
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
      nl: ['Voltrekker + DVV: € 390', 'Fotograaf 2 u: € 590', '2× iglo-nachten: € 628', 'Boeket + pakhuur: € 240', 'Taxitransfers: € 280'],
    },
    takeaway: {
      en: 'Elopement is the most cost-efficient way — just the two of you and the magic.',
      fi: 'Kahdestaan vihkiminen on kustannustehokkain tapa — vain te kaksi ja taika.',
      de: 'Eine Elopement-Hochzeit ist der kosteneffizienteste Weg — nur ihr beide und der Zauber.',
      ja: '二人だけの結婚式が最もコスト効率の良い方法 — あなたたち二人と魔法だけ。',
      es: 'La fuga romántica es la opción más rentable: solo vosotros dos y la magia.',
      'pt-BR': 'O elopement é a forma mais econômica — só vocês dois e a magia.',
      'zh-CN': '私奔式婚礼最具性价比——只有你们两人和这份魔法。',
      ko: '단둘이 올리는 결혼식이 가장 비용 효율적입니다 — 두 사람과 마법만 있으면 됩니다.',
      fr: 'L’elopement est la formule la plus économique — juste vous deux et la magie.',
      it: 'L’elopement è la soluzione più conveniente — solo voi due e la magia.',
      nl: 'Met z’n tweeën trouwen is het meest kostenefficiënt — alleen jullie twee en de magie.',
    },
    venue: 'Arctic SnowHotel & Glass Igloos',
    venueSlug: 'arctic-snowhotel',
    image: '/images/pricing/elope-hannah-tom.jpg',
  },
  {
    emoji: '❄',
    couple: 'Mei & David',
    origin: 'Singapore',
    type: 'Snow Chapel',
    guests: '18',
    range: '€8 400',
    story: {
      en: 'Mei and David brought 16 guests on a 5-day trip. Ceremony in Lainio Snow Village ice chapel, dinner in the wooden chapel, all guests stayed at Lapland Hotels SnowVillage. The artistic ice walls (a different theme each winter) made every photo unforgettable.',
      fi: 'Mei ja David toivat 16 vierasta 5 päivän reissulle. Vihille Lainion lumikylän jääkappelissa, illallinen puukappelissa, kaikki vieraat Lapland Hotels SnowVillagessa. Joka talvi uudelleen veistetyt jääseinät tekivät jokaisesta kuvasta unohtumattoman.',
      de: 'Mei und David brachten 16 Gäste mit auf eine 5-tägige Reise. Zeremonie in der Eiskapelle des Lainio Snow Village, Dinner in der Holzkapelle, alle Gäste übernachteten im Lapland Hotels SnowVillage. Die kunstvollen Eiswände (jeden Winter ein anderes Thema) machten jedes Foto unvergesslich.',
      ja: 'メイとデイビッドは16人のゲストと5日間の旅へ。挙式はライニオ・スノービレッジの氷のチャペル、ディナーは木造チャペルで、ゲストは全員ラップランド・ホテルズ・スノービレッジに宿泊。毎冬テーマを変えて彫られる氷の壁が、どの写真も忘れられないものにしました。',
      es: 'Mei y David llevaron a 16 invitados en un viaje de 5 días. Ceremonia en la capilla de hielo de Lainio Snow Village, cena en la capilla de madera y todos los invitados se alojaron en Lapland Hotels SnowVillage. Los artísticos muros de hielo (un tema distinto cada invierno) hicieron inolvidable cada foto.',
      'pt-BR': 'Mei e David levaram 16 convidados em uma viagem de 5 dias. Cerimônia na capela de gelo da Lainio Snow Village, jantar na capela de madeira e todos os convidados ficaram no Lapland Hotels SnowVillage. As paredes de gelo artísticas (um tema diferente a cada inverno) tornaram cada foto inesquecível.',
      'zh-CN': '梅和大卫带着 16 位宾客踏上 5 天的旅程。仪式在莱尼奥雪村冰教堂举行，晚宴设在木教堂，所有宾客都入住 Lapland Hotels SnowVillage。每年冬天主题各异的艺术冰墙，让每一张照片都难以忘怀。',
      ko: '메이와 데이비드는 16명의 하객과 함께 5일간의 여행을 떠났습니다. 예식은 라이니오 스노우 빌리지 아이스 채플에서, 저녁 식사는 목조 채플에서 진행했고 모든 하객이 Lapland Hotels SnowVillage에 묵었습니다. 매 겨울 새로 조각되는 예술적인 얼음 벽이 모든 사진을 잊지 못할 장면으로 만들었습니다.',
      fr: 'Mei et David ont emmené 16 invités pour un voyage de 5 jours. Cérémonie dans la chapelle de glace du Lainio Snow Village, dîner dans la chapelle en bois, tous les invités logés au Lapland Hotels SnowVillage. Les murs de glace artistiques (un thème différent chaque hiver) ont rendu chaque photo inoubliable.',
      it: 'Mei e David hanno portato 16 ospiti in un viaggio di 5 giorni. Cerimonia nella cappella di ghiaccio del Lainio Snow Village, cena nella cappella di legno, tutti gli ospiti alloggiati al Lapland Hotels SnowVillage. Le pareti di ghiaccio artistiche (un tema diverso ogni inverno) hanno reso indimenticabile ogni foto.',
      nl: 'Mei en David namen 16 gasten mee op een 5-daagse reis. Ceremonie in de ijskapel van Lainio Snow Village, diner in de houten kapel, alle gasten verbleven in Lapland Hotels SnowVillage. De artistieke ijswanden (elke winter een ander thema) maakten elke foto onvergetelijk.',
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
      nl: ['Ceremonie in sneeuwkapel: € 1.800', 'Receptie in houten kapel: € 2.400', '3-gangendiner ×18: € 1.980', 'IJssuite voor het paar: € 840', 'Fotograaf 6 u + video: € 1.380'],
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
      nl: 'Middelgrote bruiloften profiteren van locaties die ceremonie, diner en overnachting onder één dak combineren.',
    },
    venue: 'Lapland Hotels SnowVillage (Lainio)',
    venueSlug: 'snow-village-lainio',
    image: '/images/pricing/midtier-mei-david.jpg',
  },
  {
    emoji: '✨',
    couple: 'Sofia & Lukas',
    origin: 'Munich, Germany',
    type: 'Northern Lights',
    guests: '32',
    range: '€24 800',
    story: {
      en: 'Sofia and Lukas wanted a wedding their families would talk about for 30 years. Northern Lights Ranch Snow Chapel ceremony, glass-walled cabin reception with husky-safari arrival, live Sámi music — and the auroras showed up an hour into dinner. The planner moved the ceremony forward by 90 minutes when the forecast said tonight.',
      fi: 'Sofia ja Lukas halusivat häät joista perheet puhuvat 30 vuotta. Northern Lights Ranchin lumikappeli-vihkimys, lasiseinä-cabin-juhlat husky-saralla saapumisella, live-saamenmusiikkia — revontulet ilmestyivät illalliselle. Suunnittelija siirsi vihkimystä 90 min etukenoon kun ennuste kertoi: tänään.',
      de: 'Sofia und Lukas wollten eine Hochzeit, über die ihre Familien 30 Jahre lang sprechen würden. Schneekapellen-Zeremonie auf der Northern Lights Ranch, Empfang in einer verglasten Hütte mit Ankunft per Husky-Safari, Live-Sámi-Musik — und die Polarlichter zeigten sich eine Stunde nach Beginn des Dinners. Der Planer verlegte die Zeremonie um 90 Minuten vor, als die Vorhersage sagte: heute Abend.',
      ja: 'ソフィアとルーカスは、家族が30年語り継ぐような結婚式を望みました。ノーザンライツ・ランチのスノーチャペルでの挙式、ハスキーサファリで到着するガラス張りのキャビンでの披露宴、サーミ族のライブ音楽 — そしてディナーが始まって1時間後にオーロラが現れました。プランナーは「今夜」という予報を見て、挙式を90分前倒ししました。',
      es: 'Sofia y Lukas querían una boda de la que sus familias hablaran durante 30 años. Ceremonia en la capilla de nieve de Northern Lights Ranch, recepción en una cabaña con paredes de cristal y llegada en safari de huskies, música sami en directo — y las auroras aparecieron una hora después de empezar la cena. El organizador adelantó la ceremonia 90 minutos cuando el pronóstico dijo esta noche.',
      'pt-BR': 'Sofia e Lukas queriam um casamento do qual as famílias falariam por 30 anos. Cerimônia na capela de neve do Northern Lights Ranch, recepção em cabana com paredes de vidro e chegada em safári de huskies, música sámi ao vivo — e a aurora apareceu uma hora após o início do jantar. O organizador adiantou a cerimônia em 90 minutos quando a previsão disse hoje à noite.',
      'zh-CN': '索菲亚和卢卡斯想要一场让家人念叨 30 年的婚礼。Northern Lights Ranch 雪教堂仪式、乘哈士奇雪橇抵达的玻璃幕墙小屋宴会、现场萨米音乐——而极光在晚宴开始一小时后现身。当预报说"就在今晚"时，策划师把仪式提前了 90 分钟。',
      ko: '소피아와 루카스는 가족들이 30년 동안 이야기할 만한 결혼식을 원했습니다. Northern Lights Ranch 스노우 채플 예식, 허스키 사파리로 도착하는 유리벽 캐빈 피로연, 라이브 사미 음악 — 그리고 저녁 식사 시작 한 시간 만에 오로라가 나타났습니다. 예보가 "오늘 밤"이라고 하자 플래너는 예식을 90분 앞당겼습니다.',
      fr: 'Sofia et Lukas voulaient un mariage dont leurs familles parleraient pendant 30 ans. Cérémonie dans la chapelle de neige du Northern Lights Ranch, réception dans une cabane aux parois de verre avec arrivée en safari de huskies, musique sámi en direct — et les aurores sont apparues une heure après le début du dîner. Le planner a avancé la cérémonie de 90 minutes lorsque les prévisions ont annoncé ce soir.',
      it: 'Sofia e Lukas volevano un matrimonio di cui le famiglie avrebbero parlato per 30 anni. Cerimonia nella cappella di neve del Northern Lights Ranch, ricevimento in una cabina con pareti di vetro e arrivo in husky-safari, musica sámi dal vivo — e l’aurora è comparsa un’ora dopo l’inizio della cena. Il planner ha anticipato la cerimonia di 90 minuti quando le previsioni hanno detto stasera.',
      nl: 'Sofia en Lukas wilden een bruiloft waar hun families 30 jaar over zouden praten. Ceremonie in de sneeuwkapel van Northern Lights Ranch, receptie in een cabin met glazen wanden met aankomst per husky-safari, live Sámi-muziek — en het noorderlicht verscheen een uur na het begin van het diner. De planner vervroegde de ceremonie met 90 minuten toen de voorspelling vanavond zei.',
    },
    spends: {
      en: ['Snow Chapel + cabin reception: €7 200', 'Catering 3-course ×32: €4 800', 'Photographer 10h + video team: €4 200', 'Husky safari for ceremony arrival: €1 800', 'Couple suite + 4 cabins for family: €4 200', 'Florist + bouquet: €1 600', 'Officiant + DVV: €420', 'Live Sámi music: €580'],
      fi: ['Lumikappeli + cabin-juhlat: 7 200 €', 'Catering 3 ruokalajia ×32: 4 800 €', 'Valokuvaaja 10 h + video: 4 200 €', 'Husky-sara vihkimykseen: 1 800 €', 'Sviitti + 4 cabinia perheelle: 4 200 €', 'Kukkasidonta + kimppu: 1 600 €', 'Vihkijä + DVV: 420 €', 'Live-saamenmusiikki: 580 €'],
      de: ['Schneekapelle + Hütten-Empfang: 7 200 €', 'Catering 3-Gänge ×32: 4 800 €', 'Fotograf 10 Std. + Videoteam: 4 200 €', 'Husky-Safari zur Zeremonie-Ankunft: 1 800 €', 'Paar-Suite + 4 Hütten für die Familie: 4 200 €', 'Florist + Brautstrauß: 1 600 €', 'Trauredner + DVV: 420 €', 'Live-Sámi-Musik: 580 €'],
      ja: ['スノーチャペル＋キャビン披露宴：7,200ユーロ', 'ケータリング3コース×32：4,800ユーロ', '写真撮影10時間＋動画チーム：4,200ユーロ', '挙式到着のハスキーサファリ：1,800ユーロ', 'カップルスイート＋家族用キャビン4棟：4,200ユーロ', 'フローリスト＋ブーケ：1,600ユーロ', '司式者＋DVV：420ユーロ', 'サーミ族のライブ音楽：580ユーロ'],
      es: ['Capilla de nieve + recepción en cabaña: 7 200 €', 'Catering de 3 platos ×32: 4 800 €', 'Fotógrafo 10 h + equipo de vídeo: 4 200 €', 'Safari de huskies para la llegada a la ceremonia: 1 800 €', 'Suite para la pareja + 4 cabañas para la familia: 4 200 €', 'Floristería + ramo: 1 600 €', 'Oficiante + DVV: 420 €', 'Música sami en directo: 580 €'],
      'pt-BR': ['Capela de neve + recepção em cabana: € 7.200', 'Buffet de 3 pratos ×32: € 4.800', 'Fotógrafo 10 h + equipe de vídeo: € 4.200', 'Safári de huskies para a chegada à cerimônia: € 1.800', 'Suíte do casal + 4 cabanas para a família: € 4.200', 'Floricultura + buquê: € 1.600', 'Celebrante + DVV: € 420', 'Música sámi ao vivo: € 580'],
      'zh-CN': ['雪教堂 + 小屋宴会：7,200 欧元', '三道菜餐饮 ×32：4,800 欧元', '摄影 10 小时 + 视频团队：4,200 欧元', '仪式抵达哈士奇雪橇：1,800 欧元', '新人套房 + 家庭 4 间小屋：4,200 欧元', '花艺 + 捧花：1,600 欧元', '主婚人 + DVV：420 欧元', '现场萨米音乐：580 欧元'],
      ko: ['스노우 채플 + 캐빈 피로연: 7,200유로', '3코스 케이터링 ×32: 4,800유로', '사진 촬영 10시간 + 영상 팀: 4,200유로', '예식 도착용 허스키 사파리: 1,800유로', '신혼부부 스위트 + 가족용 캐빈 4채: 4,200유로', '플로리스트 + 부케: 1,600유로', '주례 + DVV: 420유로', '라이브 사미 음악: 580유로'],
      fr: ['Chapelle de neige + réception en cabane : 7 200 €', 'Traiteur 3 plats ×32 : 4 800 €', 'Photographe 10 h + équipe vidéo : 4 200 €', 'Safari husky pour l’arrivée à la cérémonie : 1 800 €', 'Suite du couple + 4 cabanes pour la famille : 4 200 €', 'Fleuriste + bouquet : 1 600 €', 'Officiant + DVV : 420 €', 'Musique sámi en direct : 580 €'],
      it: ['Cappella di neve + ricevimento in cabina: 7 200 €', 'Catering 3 portate ×32: 4 800 €', 'Fotografo 10 h + troupe video: 4 200 €', 'Husky-safari per l’arrivo alla cerimonia: 1 800 €', 'Suite per la coppia + 4 cabine per la famiglia: 4 200 €', 'Fiorista + bouquet: 1 600 €', 'Celebrante + DVV: 420 €', 'Musica sámi dal vivo: 580 €'],
      nl: ['Sneeuwkapel + cabin-receptie: € 7.200', 'Catering 3-gangen ×32: € 4.800', 'Fotograaf 10 u + videoteam: € 4.200', 'Husky-safari voor aankomst ceremonie: € 1.800', 'Suite voor het paar + 4 cabins voor familie: € 4.200', 'Bloemist + boeket: € 1.600', 'Voltrekker + DVV: € 420', 'Live Sámi-muziek: € 580'],
    },
    takeaway: {
      en: 'Premium weddings invest in moments — auroras, music, husky arrival — that guests photograph and remember.',
      fi: 'Premium-häissä rahaa kuluu hetkiin — revontulet, musiikki, husky-sara — joista vieraat ottavat kuvia ja muistavat.',
      de: 'Premium-Hochzeiten investieren in Momente — Polarlichter, Musik, Husky-Ankunft —, die Gäste fotografieren und in Erinnerung behalten.',
      ja: 'プレミアムな結婚式は、ゲストが写真に収め記憶に残す瞬間 — オーロラ、音楽、ハスキーでの登場 — にお金をかけます。',
      es: 'Las bodas premium invierten en momentos — auroras, música, llegada en huskies — que los invitados fotografían y recuerdan.',
      'pt-BR': 'Casamentos premium investem em momentos — auroras, música, chegada de huskies — que os convidados fotografam e lembram.',
      'zh-CN': '高端婚礼把钱花在那些宾客会拍照并铭记的瞬间——极光、音乐、哈士奇登场。',
      ko: '프리미엄 결혼식은 하객들이 사진에 담고 기억하는 순간 — 오로라, 음악, 허스키 도착 — 에 투자합니다.',
      fr: 'Les mariages haut de gamme investissent dans des moments — aurores, musique, arrivée en husky — que les invités photographient et retiennent.',
      it: 'I matrimoni premium investono in momenti — aurore, musica, arrivo in husky — che gli ospiti fotografano e ricordano.',
      nl: 'Premium bruiloften investeren in momenten — noorderlicht, muziek, aankomst per husky — die gasten fotograferen en onthouden.',
    },
    venue: 'Northern Lights Ranch',
    venueSlug: 'northern-lights-ranch',
    image: '/images/pricing/premium-sofia-lukas.jpg',
  },
  {
    emoji: '🥂',
    couple: 'Helena & James',
    origin: 'New York, USA',
    type: 'Luxury · 80 guests',
    guests: '80',
    range: '€78 000',
    story: {
      en: 'A wedding for 80 guests at Kakslauttanen Celebration House — Finland’s largest log building, capacity 250. Helicopter transfers from Ivalo airport, private chef team, glass igloo nights for every couple, and a four-day programme: arrival sauna, ceremony, post-wedding husky safari, farewell brunch.',
      fi: '80 vieraan häät Kakslauttasen Celebration Housessa — Suomen suurimmassa hirsirakennuksessa, kapasiteetti 250. Helikopteri Ivalon kentältä, yksityiskokkitiimi, lasi-iglu-yöt jokaiselle parille, neljän päivän ohjelma: saapumissauna, vihkimys, hääjuhlan jälkeinen husky-safari, läksiäisbrunssi.',
      de: 'Eine Hochzeit für 80 Gäste im Kakslauttanen Celebration House — Finnlands größtem Blockhaus mit einer Kapazität von 250. Hubschraubertransfers vom Flughafen Ivalo, privates Kochteam, Glasiglu-Nächte für jedes Paar und ein viertägiges Programm: Ankunftssauna, Zeremonie, Husky-Safari nach der Hochzeit, Abschiedsbrunch.',
      ja: 'カクスラウッタネン・セレブレーションハウスでの80人の結婚式 — 収容人数250のフィンランド最大の丸太建築。イヴァロ空港からのヘリコプター送迎、専属プライベートシェフ、各カップルにガラスのイグルー泊、そして4日間のプログラム：到着サウナ、挙式、挙式後のハスキーサファリ、お別れブランチ。',
      es: 'Una boda para 80 invitados en Kakslauttanen Celebration House — el edificio de troncos más grande de Finlandia, con capacidad para 250. Traslados en helicóptero desde el aeropuerto de Ivalo, equipo de chef privado, noches en iglú de cristal para cada pareja y un programa de cuatro días: sauna de llegada, ceremonia, safari de huskies posboda y brunch de despedida.',
      'pt-BR': 'Um casamento para 80 convidados na Kakslauttanen Celebration House — a maior construção de troncos da Finlândia, com capacidade para 250. Transfers de helicóptero do aeroporto de Ivalo, equipe de chef privado, noites em iglu de vidro para cada casal e um programa de quatro dias: sauna de chegada, cerimônia, safári de huskies pós-casamento, brunch de despedida.',
      'zh-CN': '在 Kakslauttanen Celebration House 举办的 80 人婚礼——芬兰最大的原木建筑，可容纳 250 人。从伊瓦洛机场直升机接送、专属私人主厨、为每对情侣安排玻璃冰屋住宿，以及为期四天的行程：抵达桑拿、仪式、婚后哈士奇雪橇之旅、告别早午餐。',
      ko: 'Kakslauttanen Celebration House에서 열린 80명 규모의 결혼식 — 수용 인원 250명의 핀란드 최대 통나무 건물. 이발로 공항에서의 헬리콥터 이동, 전담 프라이빗 셰프, 모든 커플을 위한 글라스 이글루 숙박, 그리고 4일간의 프로그램: 도착 사우나, 예식, 결혼식 후 허스키 사파리, 작별 브런치.',
      fr: 'Un mariage pour 80 invités à la Kakslauttanen Celebration House — le plus grand bâtiment en rondins de Finlande, d’une capacité de 250 personnes. Transferts en hélicoptère depuis l’aéroport d’Ivalo, brigade de chef privé, nuits en igloo de verre pour chaque couple et un programme de quatre jours : sauna d’arrivée, cérémonie, safari husky après le mariage, brunch d’adieu.',
      it: 'Un matrimonio per 80 ospiti alla Kakslauttanen Celebration House — il più grande edificio in tronchi della Finlandia, con capacità di 250 persone. Transfer in elicottero dall’aeroporto di Ivalo, chef privato dedicato, notti in igloo di vetro per ogni coppia e un programma di quattro giorni: sauna di arrivo, cerimonia, husky-safari post-matrimonio, brunch di addio.',
      nl: 'Een bruiloft voor 80 gasten in Kakslauttanen Celebration House — het grootste blokhuis van Finland, capaciteit 250. Helikoptertransfers vanaf de luchthaven van Ivalo, een privéchef, glazen-iglo-nachten voor elk paar en een vierdaags programma: aankomstsauna, ceremonie, husky-safari na de bruiloft, afscheidsbrunch.',
    },
    spends: {
      en: ['Celebration House venue + ceremony: €18 000', 'Fine-dining catering ×80: €22 000', 'Helicopter transfers: €8 400', 'Photo + video team (3 people, full programme): €11 000', 'Glass igloo nights for guests ×3: €14 800', 'Florist + decor: €3 800'],
      fi: ['Celebration House + vihkimys: 18 000 €', 'Fine dining -catering ×80: 22 000 €', 'Helikopterikuljetukset: 8 400 €', 'Kuvaus + video (3 henkilöä, koko ohjelma): 11 000 €', 'Lasi-iglu-yöt vieraille ×3: 14 800 €', 'Kukkasidonta + dekoraatio: 3 800 €'],
      de: ['Celebration House + Zeremonie: 18 000 €', 'Fine-Dining-Catering ×80: 22 000 €', 'Hubschraubertransfers: 8 400 €', 'Foto- + Videoteam (3 Personen, ganzes Programm): 11 000 €', 'Glasiglu-Nächte für Gäste ×3: 14 800 €', 'Florist + Dekoration: 3 800 €'],
      ja: ['セレブレーションハウス会場＋挙式：18,000ユーロ', 'ファインダイニング・ケータリング×80：22,000ユーロ', 'ヘリコプター送迎：8,400ユーロ', '写真＋動画チーム（3名、全プログラム）：11,000ユーロ', 'ゲスト用ガラスイグルー泊×3：14,800ユーロ', 'フローリスト＋装飾：3,800ユーロ'],
      es: ['Celebration House + ceremonia: 18 000 €', 'Catering de alta cocina ×80: 22 000 €', 'Traslados en helicóptero: 8 400 €', 'Equipo de foto + vídeo (3 personas, programa completo): 11 000 €', 'Noches en iglú de cristal para invitados ×3: 14 800 €', 'Floristería + decoración: 3 800 €'],
      'pt-BR': ['Celebration House + cerimônia: € 18.000', 'Buffet de alta gastronomia ×80: € 22.000', 'Transfers de helicóptero: € 8.400', 'Equipe de foto + vídeo (3 pessoas, programa completo): € 11.000', 'Noites em iglu de vidro para convidados ×3: € 14.800', 'Floricultura + decoração: € 3.800'],
      'zh-CN': ['Celebration House 场地 + 仪式：18,000 欧元', '高级餐饮 ×80：22,000 欧元', '直升机接送：8,400 欧元', '摄影 + 视频团队（3 人，全程）：11,000 欧元', '宾客玻璃冰屋住宿 ×3：14,800 欧元', '花艺 + 布置：3,800 欧元'],
      ko: ['Celebration House 장소 + 예식: 18,000유로', '파인다이닝 케이터링 ×80: 22,000유로', '헬리콥터 이동: 8,400유로', '사진 + 영상 팀(3인, 전체 프로그램): 11,000유로', '하객용 글라스 이글루 숙박 ×3: 14,800유로', '플로리스트 + 데코: 3,800유로'],
      fr: ['Lieu Celebration House + cérémonie : 18 000 €', 'Traiteur gastronomique ×80 : 22 000 €', 'Transferts en hélicoptère : 8 400 €', 'Équipe photo + vidéo (3 personnes, programme complet) : 11 000 €', 'Nuits en igloo de verre pour les invités ×3 : 14 800 €', 'Fleuriste + décoration : 3 800 €'],
      it: ['Celebration House + cerimonia: 18 000 €', 'Catering di alta cucina ×80: 22 000 €', 'Transfer in elicottero: 8 400 €', 'Troupe foto + video (3 persone, programma completo): 11 000 €', 'Notti in igloo di vetro per gli ospiti ×3: 14 800 €', 'Fiorista + decorazioni: 3 800 €'],
      nl: ['Celebration House-locatie + ceremonie: € 18.000', 'Fine-dining catering ×80: € 22.000', 'Helikoptertransfers: € 8.400', 'Foto- + videoteam (3 personen, volledig programma): € 11.000', 'Glazen-iglo-nachten voor gasten ×3: € 14.800', 'Bloemist + decoratie: € 3.800'],
    },
    takeaway: {
      en: 'Luxury is logistics. Helicopters, multi-day programmes, every couple in their own glass igloo — that is what €70k+ buys.',
      fi: 'Luksus on logistiikkaa. Helikopterit, monipäiväinen ohjelma, jokaiselle parille oma lasi-iglu — se on mitä yli 70 000 € ostaa.',
      de: 'Luxus ist Logistik. Hubschrauber, mehrtägige Programme, jedes Paar in seinem eigenen Glasiglu — das bekommt man für 70 000 €+.',
      ja: 'ラグジュアリーとはロジスティクスです。ヘリコプター、数日にわたるプログラム、各カップルに専用のガラスイグルー — それが7万ユーロ超で得られるものです。',
      es: 'El lujo es logística. Helicópteros, programas de varios días, cada pareja en su propio iglú de cristal: eso es lo que se compra por más de 70 000 €.',
      'pt-BR': 'Luxo é logística. Helicópteros, programas de vários dias, cada casal em seu próprio iglu de vidro — é isso que mais de € 70 mil compram.',
      'zh-CN': '奢华即物流。直升机、多日行程、每对情侣专属玻璃冰屋——这就是 7 万欧元以上所买到的。',
      ko: '럭셔리는 곧 물류입니다. 헬리콥터, 여러 날에 걸친 프로그램, 커플마다 전용 글라스 이글루 — 7만 유로 이상이 사는 것이 바로 이것입니다.',
      fr: 'Le luxe, c’est la logistique. Hélicoptères, programmes sur plusieurs jours, chaque couple dans son propre igloo de verre — voilà ce qu’on obtient pour plus de 70 000 €.',
      it: 'Il lusso è logistica. Elicotteri, programmi di più giorni, ogni coppia nel proprio igloo di vetro — è questo che si compra con oltre 70 000 €.',
      nl: 'Luxe is logistiek. Helikopters, meerdaagse programma’s, elk paar in een eigen glazen iglo — dat is wat € 70k+ oplevert.',
    },
    venue: 'Kakslauttanen Arctic Resort',
    venueSlug: 'kakslauttanen',
    image: '/images/pricing/luxury-helena-james.jpg',
  },
];

const breakdown: Array<{ title: Localized<string>; range: Localized<string> }> = [
  {
    title: {
      en: 'Wedding planner fee', fi: 'Hääsuunnittelijan palkkio', de: 'Honorar des Hochzeitsplaners',
      ja: 'ウェディングプランナー料金', es: 'Honorarios del organizador', 'pt-BR': 'Honorários do organizador',
      'zh-CN': '婚礼策划师费用', ko: '웨딩 플래너 비용', fr: 'Honoraires du wedding planner',
      it: 'Onorario del wedding planner', nl: 'Honorarium trouwplanner',
    },
    range: { en: '€1 600 – €5 000', fi: '1 600 – 5 000 €', de: '1 600 – 5 000 €', ja: '1,600〜5,000ユーロ', es: '1 600 – 5 000 €', 'pt-BR': '€ 1.600 – € 5.000', 'zh-CN': '1,600 – 5,000 欧元', ko: '1,600 – 5,000유로', fr: '1 600 – 5 000 €', it: '1 600 – 5 000 €', nl: '€ 1.600 – € 5.000' },
  },
  {
    title: {
      en: 'DVV paperwork & officiant', fi: 'DVV-paperit ja vihkijä', de: 'DVV-Unterlagen & Trauredner',
      ja: 'DVV書類＆司式者', es: 'Trámites DVV y oficiante', 'pt-BR': 'Documentação DVV e celebrante',
      'zh-CN': 'DVV 文件与主婚人', ko: 'DVV 서류 & 주례', fr: 'Formalités DVV & officiant',
      it: 'Documenti DVV e celebrante', nl: 'DVV-papierwerk & voltrekker',
    },
    range: { en: '€350 – €600', fi: '350 – 600 €', de: '350 – 600 €', ja: '350〜600ユーロ', es: '350 – 600 €', 'pt-BR': '€ 350 – € 600', 'zh-CN': '350 – 600 欧元', ko: '350 – 600유로', fr: '350 – 600 €', it: '350 – 600 €', nl: '€ 350 – € 600' },
  },
  {
    title: {
      en: 'Photography (2h to full day + video)', fi: 'Valokuvaus (2 h – koko päivä + video)', de: 'Fotografie (2 Std. bis ganzer Tag + Video)',
      ja: '写真撮影（2時間〜終日＋動画）', es: 'Fotografía (2 h a día completo + vídeo)', 'pt-BR': 'Fotografia (2 h ao dia inteiro + vídeo)',
      'zh-CN': '摄影（2 小时至全天 + 视频）', ko: '사진 촬영(2시간~종일 + 영상)', fr: 'Photographie (2 h à journée complète + vidéo)',
      it: 'Fotografia (da 2 h all’intera giornata + video)', nl: 'Fotografie (2 u tot hele dag + video)',
    },
    range: { en: '€590 – €4 200', fi: '590 – 4 200 €', de: '590 – 4 200 €', ja: '590〜4,200ユーロ', es: '590 – 4 200 €', 'pt-BR': '€ 590 – € 4.200', 'zh-CN': '590 – 4,200 欧元', ko: '590 – 4,200유로', fr: '590 – 4 200 €', it: '590 – 4 200 €', nl: '€ 590 – € 4.200' },
  },
  {
    title: {
      en: 'Snow / ice / glass chapel ceremony', fi: 'Lumi-/jää-/lasikappelivihkimys', de: 'Schnee-/Eis-/Glaskapellen-Zeremonie',
      ja: 'スノー／アイス／ガラスチャペル挙式', es: 'Ceremonia en capilla de nieve / hielo / cristal', 'pt-BR': 'Cerimônia em capela de neve / gelo / vidro',
      'zh-CN': '雪 / 冰 / 玻璃教堂仪式', ko: '스노우 / 아이스 / 글라스 채플 예식', fr: 'Cérémonie en chapelle de neige / glace / verre',
      it: 'Cerimonia in cappella di neve / ghiaccio / vetro', nl: 'Ceremonie in sneeuw-/ijs-/glaskapel',
    },
    range: { en: '€800 – €4 000', fi: '800 – 4 000 €', de: '800 – 4 000 €', ja: '800〜4,000ユーロ', es: '800 – 4 000 €', 'pt-BR': '€ 800 – € 4.000', 'zh-CN': '800 – 4,000 欧元', ko: '800 – 4,000유로', fr: '800 – 4 000 €', it: '800 – 4 000 €', nl: '€ 800 – € 4.000' },
  },
  {
    title: {
      en: 'Florist + bouquet', fi: 'Kukat + kimppu', de: 'Florist + Brautstrauß',
      ja: 'フローリスト＋ブーケ', es: 'Floristería + ramo', 'pt-BR': 'Floricultura + buquê',
      'zh-CN': '花艺 + 捧花', ko: '플로리스트 + 부케', fr: 'Fleuriste + bouquet',
      it: 'Fiorista + bouquet', nl: 'Bloemist + boeket',
    },
    range: { en: '€240 – €1 800', fi: '240 – 1 800 €', de: '240 – 1 800 €', ja: '240〜1,800ユーロ', es: '240 – 1 800 €', 'pt-BR': '€ 240 – € 1.800', 'zh-CN': '240 – 1,800 欧元', ko: '240 – 1,800유로', fr: '240 – 1 800 €', it: '240 – 1 800 €', nl: '€ 240 – € 1.800' },
  },
  {
    title: {
      en: 'Catering (per guest)', fi: 'Catering (per vieras)', de: 'Catering (pro Gast)',
      ja: 'ケータリング（1人あたり）', es: 'Catering (por invitado)', 'pt-BR': 'Buffet (por convidado)',
      'zh-CN': '餐饮（每位宾客）', ko: '케이터링(인당)', fr: 'Traiteur (par invité)',
      it: 'Catering (per ospite)', nl: 'Catering (per gast)',
    },
    range: { en: '€80 – €280', fi: '80 – 280 €', de: '80 – 280 €', ja: '80〜280ユーロ', es: '80 – 280 €', 'pt-BR': '€ 80 – € 280', 'zh-CN': '80 – 280 欧元', ko: '80 – 280유로', fr: '80 – 280 €', it: '80 – 280 €', nl: '€ 80 – € 280' },
  },
  {
    title: {
      en: 'Glass igloo / cabin (per night)', fi: 'Lasi-iglu / cabin (per yö)', de: 'Glasiglu / Hütte (pro Nacht)',
      ja: 'ガラスイグルー／キャビン（1泊）', es: 'Iglú de cristal / cabaña (por noche)', 'pt-BR': 'Iglu de vidro / cabana (por noite)',
      'zh-CN': '玻璃冰屋 / 小屋（每晚）', ko: '글라스 이글루 / 캐빈(1박)', fr: 'Igloo de verre / cabane (par nuit)',
      it: 'Igloo di vetro / cabina (a notte)', nl: 'Glazen iglo / cabin (per nacht)',
    },
    range: { en: '€280 – €1 200', fi: '280 – 1 200 €', de: '280 – 1 200 €', ja: '280〜1,200ユーロ', es: '280 – 1 200 €', 'pt-BR': '€ 280 – € 1.200', 'zh-CN': '280 – 1,200 欧元', ko: '280 – 1,200유로', fr: '280 – 1 200 €', it: '280 – 1 200 €', nl: '€ 280 – € 1.200' },
  },
  {
    title: {
      en: 'Husky / reindeer arrival', fi: 'Husky- / poro-saapuminen', de: 'Ankunft per Husky / Rentier',
      ja: 'ハスキー／トナカイでの登場', es: 'Llegada en huskies / renos', 'pt-BR': 'Chegada de huskies / renas',
      'zh-CN': '哈士奇 / 驯鹿登场', ko: '허스키 / 순록 도착', fr: 'Arrivée en husky / renne',
      it: 'Arrivo in husky / renna', nl: 'Aankomst per husky / rendier',
    },
    range: { en: '€600 – €2 400', fi: '600 – 2 400 €', de: '600 – 2 400 €', ja: '600〜2,400ユーロ', es: '600 – 2 400 €', 'pt-BR': '€ 600 – € 2.400', 'zh-CN': '600 – 2,400 欧元', ko: '600 – 2,400유로', fr: '600 – 2 400 €', it: '600 – 2 400 €', nl: '€ 600 – € 2.400' },
  },
];

type PKey =
  | 'seoTitle' | 'seoDesc' | 'heroEyebrow' | 'heroTitle' | 'heroSubtitle' | 'heroImageAlt'
  | 's1Eyebrow' | 's1Title'
  | 'whereMoneyGoes' | 'seeVenue' | 'getQuoteLike'
  | 's2Eyebrow' | 's2Title' | 's2Subtitle'
  | 'ctaEyebrow' | 'ctaTitle' | 'ctaBody' | 'ctaButton'
  | 's4Eyebrow' | 's4Title' | 's4Subtitle';

const P: Record<PKey, Localized<string>> = {
  seoTitle: {
    en: 'Lapland Weddings — Pricing with four real examples | LaplandWeddings',
    fi: 'Häät Lapissa — hinta-arviot | LaplandWeddings',
    de: 'Hochzeiten in Lappland — Preise | LaplandWeddings',
    ja: 'ラップランドの結婚式 — 4つの実例で見る費用 | LaplandWeddings',
    es: 'Bodas en Laponia — precios | LaplandWeddings',
    'pt-BR': 'Casamentos na Lapônia — preços | LaplandWeddings',
    'zh-CN': '拉普兰婚礼 — 四个真实案例的价格 | LaplandWeddings',
    ko: '라플란드 웨딩 — 실제 사례 4건으로 보는 비용 | LaplandWeddings',
    fr: 'Mariages en Laponie — tarifs | LaplandWeddings',
    it: 'Matrimoni in Lapponia — prezzi | LaplandWeddings',
    nl: 'Bruiloften in Lapland — prijzen | LaplandWeddings',
  },
  seoDesc: {
    en: 'What does a Lapland wedding really cost? Four pattern couples: Hannah & Tom (€2 100), Mei & David (€8 400), Sofia & Lukas (€24 800), Helena & James (€78 000). Detailed spend breakdown.',
    fi: 'Mitä Lapin häät oikeasti maksaa? Neljä todellista paria — Hannah & Tom (2 100 €), Mei & David (8 400 €), Sofia & Lukas (24 800 €), Helena & James (78 000 €).',
    de: 'Was kostet eine Hochzeit in Lappland wirklich? Hannah & Tom (2 100 €), Mei & David (8 400 €), Sofia & Lukas (24 800 €), Helena & James (78 000 €).',
    ja: 'ラップランドの結婚式は実際いくら？4組の実例：Hannah & Tom（2,100ユーロ）、Mei & David（8,400ユーロ）、Sofia & Lukas（24,800ユーロ）、Helena & James（78,000ユーロ）。詳細な費用内訳付き。',
    es: '¿Cuánto cuesta realmente una boda en Laponia? Hannah & Tom (2 100 €), Mei & David (8 400 €), Sofia & Lukas (24 800 €), Helena & James (78 000 €).',
    'pt-BR': 'Quanto custa de verdade um casamento na Lapônia? Hannah & Tom (€ 2.100), Mei & David (€ 8.400), Sofia & Lukas (€ 24.800), Helena & James (€ 78.000).',
    'zh-CN': '在拉普兰办婚礼到底要花多少钱？四对范例情侣：Hannah & Tom（2,100 欧元）、Mei & David（8,400 欧元）、Sofia & Lukas（24,800 欧元）、Helena & James（78,000 欧元）。详细花费明细。',
    ko: '라플란드 결혼식은 실제로 얼마일까요? 네 커플 사례: Hannah & Tom(2,100유로), Mei & David(8,400유로), Sofia & Lukas(24,800유로), Helena & James(78,000유로). 상세 지출 내역.',
    fr: 'Combien coûte vraiment un mariage en Laponie ? Hannah & Tom (2 100 €), Mei & David (8 400 €), Sofia & Lukas (24 800 €), Helena & James (78 000 €).',
    it: 'Quanto costa davvero un matrimonio in Lapponia? Hannah & Tom (2 100 €), Mei & David (8 400 €), Sofia & Lukas (24 800 €), Helena & James (78 000 €).',
    nl: 'Wat kost een bruiloft in Lapland echt? Hannah & Tom (€ 2.100), Mei & David (€ 8.400), Sofia & Lukas (€ 24.800), Helena & James (€ 78.000).',
  },
  heroEyebrow: {
    en: 'Pricing', fi: 'Hinta-arviot', de: 'Preise', ja: '費用',
    es: 'Precios', 'pt-BR': 'Preços', 'zh-CN': '价格', ko: '가격',
    fr: 'Tarifs', it: 'Prezzi', nl: 'Prijzen',
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
    nl: 'Wat een bruiloft in Lapland echt kost',
  },
  heroSubtitle: {
    en: 'Four real-pattern weddings — from a €2 100 elopement to a €78 000 luxury celebration. Every example breaks down where the money goes.',
    fi: 'Neljä todellista hinnoittelumallia — kahdestaan vihille 2 100 €:sta luksushäihin 78 000 €:on. Joka esimerkissä erittely mihin raha kuluu.',
    de: 'Vier reale Hochzeitsmuster — von einer 2 100-€-Elopement-Hochzeit bis zur 78 000-€-Luxusfeier. Jedes Beispiel schlüsselt auf, wohin das Geld fließt.',
    ja: '4つの実際の費用パターン — 2,100ユーロの二人だけの挙式から78,000ユーロのラグジュアリーな祝宴まで。各例でお金の使い道を内訳します。',
    es: 'Cuatro bodas de patrón real — desde una fuga de 2 100 € hasta una celebración de lujo de 78 000 €. Cada ejemplo desglosa adónde va el dinero.',
    'pt-BR': 'Quatro casamentos de padrão real — de um elopement de € 2.100 a uma celebração de luxo de € 78.000. Cada exemplo detalha para onde vai o dinheiro.',
    'zh-CN': '四场真实范例婚礼——从 2,100 欧元的私奔婚礼到 78,000 欧元的奢华庆典。每个案例都详细说明钱花在哪里。',
    ko: '네 가지 실제 비용 패턴 — 2,100유로의 단둘이 올리는 결혼식부터 78,000유로의 럭셔리 셀러브레이션까지. 각 사례마다 돈이 어디에 쓰이는지 분석합니다.',
    fr: 'Quatre mariages au schéma réel — d’un elopement à 2 100 € à une célébration de luxe à 78 000 €. Chaque exemple détaille où va l’argent.',
    it: 'Quattro matrimoni a schema reale — da un elopement da 2 100 € a una celebrazione di lusso da 78 000 €. Ogni esempio mostra dove va il denaro.',
    nl: 'Vier bruiloften volgens een reëel patroon — van een elopement van € 2.100 tot een luxe viering van € 78.000. Elk voorbeeld laat zien waar het geld naartoe gaat.',
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
    nl: 'Laplands bruidspaar in de winter',
  },
  s1Eyebrow: {
    en: 'Four couples, four budgets', fi: 'Neljä paria, neljä budjettia',
    de: 'Vier Paare, vier Budgets', ja: '4組のカップル、4つの予算',
    es: 'Cuatro parejas, cuatro presupuestos', 'pt-BR': 'Quatro casais, quatro orçamentos',
    'zh-CN': '四对情侣，四种预算', ko: '네 커플, 네 가지 예산',
    fr: 'Quatre couples, quatre budgets', it: 'Quattro coppie, quattro budget',
    nl: 'Vier stellen, vier budgetten',
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
    nl: 'Hoe een Laplandse bruiloft schaalt met het budget',
  },
  whereMoneyGoes: {
    en: 'Where the money goes', fi: 'Mihin raha kuluu', de: 'Wohin das Geld fließt',
    ja: 'お金の使い道', es: 'Adónde va el dinero', 'pt-BR': 'Para onde vai o dinheiro',
    'zh-CN': '钱花在哪里', ko: '돈이 어디에 쓰이는가', fr: 'Où va l’argent',
    it: 'Dove va il denaro', nl: 'Waar het geld naartoe gaat',
  },
  seeVenue: {
    en: 'See {venue}', fi: 'Tutustu {venue}', de: '{venue} ansehen', ja: '{venue}を見る',
    es: 'Ver {venue}', 'pt-BR': 'Ver {venue}', 'zh-CN': '查看 {venue}', ko: '{venue} 보기',
    fr: 'Voir {venue}', it: 'Scopri {venue}', nl: 'Bekijk {venue}',
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
    nl: 'Vraag een offerte aan voor zo’n bruiloft',
  },
  s2Eyebrow: {
    en: 'Individual costs', fi: 'Yksittäiset kustannukset', de: 'Einzelkosten',
    ja: '個別の費用', es: 'Costes individuales', 'pt-BR': 'Custos individuais',
    'zh-CN': '单项费用', ko: '개별 비용', fr: 'Coûts individuels',
    it: 'Costi singoli', nl: 'Afzonderlijke kosten',
  },
  s2Title: {
    en: 'What goes into the price', fi: 'Mistä häiden hinta koostuu',
    de: 'Was den Preis ausmacht', ja: '価格の内訳',
    es: 'Qué compone el precio', 'pt-BR': 'O que compõe o preço',
    'zh-CN': '价格由哪些部分组成', ko: '가격을 구성하는 항목',
    fr: 'Ce qui compose le prix', it: 'Cosa compone il prezzo',
    nl: 'Waaruit de prijs bestaat',
  },
  s2Subtitle: {
    en: 'Market estimates as of early 2026 — individual planners and venues set their own pricing.',
    fi: 'Hinnat ovat markkinaestimaatteja vuoden 2026 alusta — yksittäiset suunnittelijat ja venuet hinnoittelevat itsenäisesti.',
    de: 'Marktschätzungen Stand Anfang 2026 — einzelne Planer und Locations legen ihre Preise selbst fest.',
    ja: '2026年初頭時点の市場推定 — 各プランナーや会場が独自に価格を設定します。',
    es: 'Estimaciones de mercado a principios de 2026: cada organizador y lugar fija sus propios precios.',
    'pt-BR': 'Estimativas de mercado no início de 2026 — cada organizador e local define os próprios preços.',
    'zh-CN': '截至 2026 年初的市场估算——各策划师和场地自行定价。',
    ko: '2026년 초 기준 시장 추정치 — 개별 플래너와 웨딩 장소가 자체적으로 가격을 책정합니다.',
    fr: 'Estimations du marché début 2026 — chaque planner et lieu fixe ses propres tarifs.',
    it: 'Stime di mercato a inizio 2026 — singoli planner e location fissano i propri prezzi.',
    nl: 'Marktschattingen begin 2026 — afzonderlijke planners en locaties bepalen hun eigen prijzen.',
  },
  ctaEyebrow: {
    en: 'When you know your budget', fi: 'Kun budjetti on selvillä',
    de: 'Wenn Sie Ihr Budget kennen', ja: '予算が決まったら',
    es: 'Cuando conoces tu presupuesto', 'pt-BR': 'Quando você já sabe seu orçamento',
    'zh-CN': '当你确定了预算', ko: '예산이 정해졌다면',
    fr: 'Quand vous connaissez votre budget', it: 'Quando conosci il tuo budget',
    nl: 'Als je je budget kent',
  },
  ctaTitle: {
    en: 'Get 3 quotes — compare at your own pace',
    fi: 'Pyydä 3 tarjousta — vertaile rauhassa',
    de: 'Holen Sie 3 Angebote ein — vergleichen Sie in Ruhe',
    ja: '3つの見積もりを取得 — 自分のペースで比較',
    es: 'Recibe 3 presupuestos — compara a tu ritmo',
    'pt-BR': 'Receba 3 orçamentos — compare no seu ritmo',
    'zh-CN': '获取 3 份报价——按自己的节奏比较',
    ko: '견적 3건 받기 — 여유롭게 비교하세요',
    fr: 'Obtenez 3 devis — comparez à votre rythme',
    it: 'Ottieni 3 preventivi — confronta con calma',
    nl: 'Ontvang 3 offertes — vergelijk op je eigen tempo',
  },
  ctaBody: {
    en: 'One form, 1–7 days, 3 personalised proposals from Lapland’s most experienced planners. Free, no commitment — you decide who to continue with.',
    fi: 'Yhdellä lomakkeella saat 1–7 päivän sisällä 3 räätälöityä tarjousta Lapin kokeneimmilta hääsuunnittelijoilta. Maksuton, ei sitoumusta — sinä päätät kenen kanssa jatkat.',
    de: 'Ein Formular, 1–7 Tage, 3 individuelle Angebote von Lapplands erfahrensten Planern. Kostenlos, unverbindlich — Sie entscheiden, mit wem Sie weitermachen.',
    ja: 'フォームを1つ、1〜7日で、ラップランドで最も経験豊富なプランナーから3つのオーダーメイド提案。無料・無拘束 — 誰と進めるかはあなた次第です。',
    es: 'Un formulario, de 1 a 7 días, 3 propuestas personalizadas de los organizadores más experimentados de Laponia. Gratis, sin compromiso: tú decides con quién seguir.',
    'pt-BR': 'Um formulário, de 1 a 7 dias, 3 propostas personalizadas dos organizadores mais experientes da Lapônia. Grátis, sem compromisso — você decide com quem continuar.',
    'zh-CN': '一份表单，1–7 天，来自拉普兰最有经验策划师的 3 份个性化方案。免费、无约束——由你决定与谁继续。',
    ko: '양식 하나, 1~7일, 라플란드에서 가장 경험 많은 플래너의 맞춤 제안 3건. 무료, 부담 없음 — 누구와 진행할지는 당신이 결정합니다.',
    fr: 'Un formulaire, 1 à 7 jours, 3 propositions personnalisées des planners les plus expérimentés de Laponie. Gratuit, sans engagement — vous décidez avec qui continuer.',
    it: 'Un modulo, 1–7 giorni, 3 proposte personalizzate dai planner più esperti della Lapponia. Gratis, senza impegno — decidi tu con chi proseguire.',
    nl: 'Eén formulier, 1–7 dagen, 3 persoonlijke voorstellen van de meest ervaren planners van Lapland. Gratis, vrijblijvend — jij bepaalt met wie je verdergaat.',
  },
  ctaButton: {
    en: 'Start the 5-minute form', fi: 'Aloita 5 minuutin lomake',
    de: 'Das 5-Minuten-Formular starten', ja: '5分のフォームを始める',
    es: 'Empieza el formulario de 5 minutos', 'pt-BR': 'Comece o formulário de 5 minutos',
    'zh-CN': '开始 5 分钟表单', ko: '5분 양식 시작하기',
    fr: 'Commencer le formulaire de 5 minutes', it: 'Inizia il modulo di 5 minuti',
    nl: 'Start het formulier van 5 minuten',
  },
  s4Eyebrow: {
    en: 'Direct contact', fi: 'Suora kontakti', de: 'Direkter Kontakt',
    ja: '直接のお問い合わせ', es: 'Contacto directo', 'pt-BR': 'Contato direto',
    'zh-CN': '直接联系', ko: '직접 문의', fr: 'Contact direct',
    it: 'Contatto diretto', nl: 'Direct contact',
  },
  s4Title: {
    en: 'Or fill in the form right here', fi: 'Tai täytä lomake nyt',
    de: 'Oder füllen Sie das Formular direkt hier aus', ja: 'またはこちらでフォームに記入',
    es: 'O rellena el formulario aquí mismo', 'pt-BR': 'Ou preencha o formulário aqui mesmo',
    'zh-CN': '或在此直接填写表单', ko: '또는 여기에서 바로 양식을 작성하세요',
    fr: 'Ou remplissez le formulaire ici même', it: 'Oppure compila il modulo qui',
    nl: 'Of vul het formulier hier direct in',
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
    nl: 'Geef het budgetveld op, zodat we je kunnen koppelen aan planners in de juiste prijsklasse.',
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
        image="/images/venues/lapland-hotels-saaga.webp"
        imageAlt={p('heroImageAlt')}
      />

      <Section
        eyebrow={p('s1Eyebrow')}
        title={p('s1Title')}
      >
        <div className="space-y-10 sm:space-y-14 max-w-5xl mx-auto">
          {stories.map((s) => (
            <article
              key={s.couple}
              className="bg-night-light/60 border border-white/5 rounded-3xl overflow-hidden grid md:grid-cols-2 md:items-start"
            >
              <div className="aspect-[4/3] relative overflow-hidden md:rounded-l-3xl">
                <img
                  src={s.image || `/images/venues/${s.venueSlug}.jpg`}
                  alt={s.venue}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = `/images/venues/${s.venueSlug}.jpeg`; }}
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
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide min-w-0 break-words">{s.couple}</h3>
                  <p className="font-heading text-rose text-2xl sm:text-3xl whitespace-nowrap shrink-0">{s.range}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-aurora-pink font-semibold mb-3">
                  {s.origin} · {s.guests} {guests} · {s.venue}
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
                    to={`/venues/${s.venueSlug}`}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                    style={{ color: '#1F1612', background: 'transparent', border: '1px solid #C9466A' }}
                  >
                    {p('seeVenue').replace('{venue}', s.venue)} →
                  </L>
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
