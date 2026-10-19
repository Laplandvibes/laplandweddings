/**
 * Venue pages (/venues/<slug>): meta description per slug and locale. ONE source:
 * scripts/prerender-meta.mjs writes the prerendered HTML from this object and pages/VenuePage.tsx
 * renders the same value in the browser (gate:meta-hydraatio in lv-ops).
 *
 * Until 2026-10-05 the browser built the description from the page prose (description cut at 160 characters, often mid-word),
 * while the prerenderer used the hand-written meta blurb from route-i18n.json, in ja/zh-CN extended with the page prose and a feature list:
 * different text on 194 of 240 pages. The values here are those prerendered (published) texts; where the published one broke
 * off mid-sentence or carried a loose word list after a stray space, it was rewritten from the same facts
 * in the page's own language.
 *
 * Each description is at least 70 characters and at most 160 characters / 200 width units, so neither
 * longDesc() nor clampDescription() in the prerenderer changes it; prerender-meta.mjs fails the build if it
 * would. The page prose (src/data) stays the page's own text and is not a meta source.
 *
 * Plain ESM (.mjs) for Node 20 in CI. Types in the .d.mts next to this file.
 */
export const VENUE_DESCRIPTION = {
  "apukka-resort": {
    "en": "Resort by Lake Olkkajärvi in Rovaniemi: Aurora Cabins, the two-storey Kammi Glass Igloo Suite, four restaurants and huskies on site.",
    "fi": "Lomakylä Olkkajärven rannalla Rovaniemellä: Aurora Cabinit, kaksikerroksinen Kammi Glass Igloo Suite, neljä ravintolaa ja huskyt.",
    "de": "Resort am Olkkajärvi in Rovaniemi: Aurora Cabins, die zweistöckige Kammi Glass Igloo Suite, vier Restaurants und Huskys vor Ort.",
    "ja": "ロヴァニエミのオルッカヤルヴィ湖畔にあるリゾート。Aurora Cabin、二階建てのKammi Glass Igloo Suite、レストラン四軒があり、ハスキーたちもリゾートで暮らしています。",
    "es": "Resort a orillas del lago Olkkajärvi, en Rovaniemi: Aurora Cabins, la Kammi Glass Igloo Suite de dos plantas, cuatro restaurantes y huskies.",
    "pt-BR": "Resort à beira do lago Olkkajärvi, em Rovaniemi: Aurora Cabins, a Kammi Glass Igloo Suite de dois andares, quatro restaurantes e huskies.",
    "zh-CN": "位于罗瓦涅米奥尔卡湖畔的度假村，设有Aurora Cabin、双层Kammi Glass Igloo Suite和四家餐厅，哈士奇也生活在度假村里。",
    "ko": "로바니에미 올카야르비 호숫가의 리조트. Aurora Cabin, 복층 Kammi Glass Igloo Suite, 레스토랑 네 곳이 있고 허스키들이 리조트 안에서 지냅니다.",
    "fr": "Resort au bord du lac Olkkajärvi, à Rovaniemi : Aurora Cabins, Kammi Glass Igloo Suite sur deux niveaux, quatre restaurants et huskies sur place.",
    "it": "Resort sulle rive del lago Olkkajärvi, a Rovaniemi: Aurora Cabin, Kammi Glass Igloo Suite su due piani, quattro ristoranti e husky nel resort.",
    "nl": "Resort aan het Olkkajärvi-meer in Rovaniemi: Aurora Cabins, de tweelaagse Kammi Glass Igloo Suite, vier restaurants en husky’s op het terrein.",
    "sv": "Resort vid sjön Olkkajärvi i Rovaniemi: Aurora Cabins, Kammi Glass Igloo Suite i två våningar, fyra restauranger och huskyhundar på plats."
  },
  "arctic-snowhotel": {
    "en": "Snow hotel 26 km from Rovaniemi, rebuilt every winter: ice chapel for about 30–50 guests, ice restaurant, ice bar and glass igloos.",
    "fi": "Lumihotelli 26 km Rovaniemeltä, rakennetaan joka talvi uudelleen: jääkappeli noin 30–50 hengelle, jääravintola, jääbaari ja lasi-iglut.",
    "de": "Schneehotel 26 km von Rovaniemi, jeden Winter neu gebaut: Eiskapelle für etwa 30–50 Gäste, Eisrestaurant, Eisbar und Glasiglus.",
    "ja": "ロヴァニエミから26kmのスノーホテル。毎冬建て直され、約30〜50名収容のアイスチャペル、アイスレストラン、アイスバーがあります。グラスイグルーは9月〜3月の営業です。",
    "es": "Hotel de nieve a 26 km de Rovaniemi, reconstruido cada invierno: capilla de hielo para unas 30-50 personas, restaurante y bar de hielo e iglús de cristal.",
    "pt-BR": "Hotel de neve a 26 km de Rovaniemi, reconstruído todo inverno: capela de gelo para cerca de 30-50 pessoas, restaurante e bar de gelo e iglus de vidro.",
    "zh-CN": "距罗瓦涅米市中心和圣诞老人村均约26公里的雪屋酒店，每年冬季重建。设有可容纳约30–50人的冰礼拜堂、冰餐厅和冰吧，玻璃冰屋于9月至次年3月开放。",
    "ko": "로바니에미에서 26km 떨어진 스노우 호텔로 매 겨울 다시 짓습니다. 약 30~50명 규모의 아이스 채플, 아이스 레스토랑, 아이스 바가 있고 글래스 이글루는 9월~3월에 운영합니다.",
    "fr": "Hôtel de neige à 26 km de Rovaniemi, reconstruit chaque hiver : chapelle de glace pour 30 à 50 personnes environ, restaurant et bar de glace, igloos de verre.",
    "it": "Hotel di neve a 26 km da Rovaniemi, ricostruito ogni inverno: cappella di ghiaccio per circa 30-50 persone, ristorante e bar di ghiaccio e igloo di vetro.",
    "nl": "Sneeuwhotel op 26 km van Rovaniemi, elke winter opnieuw gebouwd: ijskapel voor zo’n 30-50 gasten, ijsrestaurant, ijsbar en glasiglo’s.",
    "sv": "Snöhotell 26 km från Rovaniemi som byggs upp på nytt varje vinter: iskapell för cirka 30–50 gäster, isrestaurang, isbar och glasigloor."
  },
  "arctic-treehouse": {
    "en": "Glass-walled tree-top cabins in Rovaniemi, next to SantaPark and 2.2 km from Santa Claus Village, with Restaurant Rakas on site.",
    "fi": "Lasiseinäiset puumajat Rovaniemellä, SantaParkin vieressä ja 2,2 km Joulupukin pajakylästä. Ravintola Rakas on samassa paikassa.",
    "de": "Baumwipfel-Cabins mit Glaswänden in Rovaniemi, neben dem SantaPark und 2,2 km vom Weihnachtsmanndorf, mit Restaurant Rakas vor Ort.",
    "ja": "ロヴァニエミにあるガラス張りのツリーハウス。SantaParkのすぐ隣、サンタクロース村から2.2kmで、敷地内にレストランRakasがあります。少人数のエロープメントやハネムーンに。",
    "es": "Cabañas de cristal en las copas de los árboles en Rovaniemi, junto a SantaPark y a 2,2 km del Pueblo de Papá Noel, con el restaurante Rakas.",
    "pt-BR": "Cabanas de vidro no alto das árvores em Rovaniemi, ao lado do SantaPark e a 2,2 km da Vila do Papai Noel, com o restaurante Rakas no local.",
    "zh-CN": "Arctic TreeHouse Hotel是罗瓦涅米的玻璃幕墙树屋木舍，紧邻SantaPark，距圣诞老人村2.2公里，园区内设有Rakas餐厅。适合小型高端私奔婚礼与蜜月旅行。",
    "ko": "로바니에미의 유리 벽 트리하우스 캐빈. SantaPark 바로 옆, 산타클로스 마을에서 2.2km 거리이며 같은 곳에 레스토랑 Rakas가 있습니다. 소규모 엘로프먼트와 허니문에 알맞습니다.",
    "fr": "Cabanes perchées aux parois de verre à Rovaniemi, à côté de SantaPark et à 2,2 km du Village du Père Noël, avec le restaurant Rakas sur place.",
    "it": "Cabine sugli alberi con pareti di vetro a Rovaniemi, accanto a SantaPark e a 2,2 km dal Villaggio di Babbo Natale, con il ristorante Rakas.",
    "nl": "Boomhutten met glazen wanden in Rovaniemi, naast SantaPark en op 2,2 km van het Kerstmandorp, met restaurant Rakas op dezelfde locatie.",
    "sv": "Trädtoppsstugor med glasväggar i Rovaniemi, intill SantaPark och 2,2 km från Jultomtens by, med restaurang Rakas på plats."
  },
  "hotelli-hullu-poro": {
    "en": "Hotel and restaurant complex in central Levi with more than ten restaurants. Areena for 150–350 guests and the Tonttula restaurant for 300.",
    "fi": "Hotelli- ja ravintolakeskus Levin keskustassa, yli kymmenen ravintolaa. Areena 150–350 vieraalle ja Tonttulan ravintola 300 hengelle.",
    "de": "Hotel- und Restaurantkomplex im Zentrum von Levi mit mehr als zehn Restaurants: Areena für 150–350 Gäste, Restaurant Tonttula für 300.",
    "ja": "レヴィ中心部のホテルとレストランの複合施設で、レストランは十軒を超えます。結婚式には150〜350名のAreena、300名のTonttulaレストランなどを利用できます。",
    "es": "Complejo de hotel y restaurantes en el centro de Levi, con más de diez restaurantes: Areena para 150-350 invitados y restaurante Tonttula para 300.",
    "pt-BR": "Complexo de hotel e restaurantes no centro de Levi, com mais de dez restaurantes: Areena para 150-350 convidados e restaurante Tonttula para 300.",
    "zh-CN": "莱维中心的酒店与餐厅综合体，拥有超过十家餐厅。婚礼可使用容纳150–350人的Areena、300人的Tonttula餐厅以及Taivaanvalkeat主厅。",
    "ko": "레비 중심부의 호텔·레스토랑 복합 시설로 레스토랑이 열 곳이 넘습니다. 결혼식에는 150~350명 규모의 Areena, 300명 규모의 Tonttula 레스토랑 등을 이용할 수 있습니다.",
    "fr": "Complexe hôtelier au centre de Levi, avec plus de dix restaurants : Areena pour 150 à 350 invités et restaurant Tonttula pour 300.",
    "it": "Complesso di hotel e ristoranti nel centro di Levi, con più di dieci ristoranti: Areena per 150-350 ospiti e ristorante Tonttula per 300.",
    "nl": "Hotel- en restaurantcomplex in het centrum van Levi met meer dan tien restaurants: Areena voor 150-350 gasten en restaurant Tonttula voor 300.",
    "sv": "Hotell- och restaurangkomplex i centrala Levi med fler än tio restauranger: Areena för 150–350 gäster och restaurangen Tonttula för 300."
  },
  "kakslauttanen": {
    "en": "Glass igloo resort in Saariselkä: 2-person glass igloos, the Glass Teepee glass chapel and the 250-guest Celebration House.",
    "fi": "Lasi-iglu-resortti Saariselällä: 2 hengen lasi-igluja, lasinen Glass Teepee -kappeli ja 250 vieraan Celebration House.",
    "de": "Glasiglu-Resort in Saariselkä: Glasiglus für 2 Personen, die Glaskapelle Glass Teepee und das Celebration House für 250 Gäste.",
    "ja": "サーリセルカのグラスイグルーリゾート。2名用のグラスイグルー、ガラスのチャペルGlass Teepee、250名収容のCelebration Houseが同じ敷地にあります。",
    "es": "Resort de iglús de cristal en Saariselkä: iglús para 2 personas, la capilla de cristal Glass Teepee y la Celebration House para 250 invitados.",
    "pt-BR": "Resort de iglus de vidro em Saariselkä: iglus para 2 pessoas, a capela de vidro Glass Teepee e a Celebration House para 250 convidados.",
    "zh-CN": "萨利色尔卡的玻璃冰屋度假村。同一园区内有2人玻璃冰屋、玻璃礼拜堂Glass Teepee，以及可容纳250位宾客的Celebration House。",
    "ko": "사리셀카의 글래스 이글루 리조트. 같은 부지에 2인용 글래스 이글루, 유리 채플 Glass Teepee, 250명 규모의 Celebration House가 있습니다.",
    "fr": "Resort d’igloos de verre à Saariselkä : igloos pour 2 personnes, chapelle de verre Glass Teepee et Celebration House pour 250 invités.",
    "it": "Resort di igloo di vetro a Saariselkä: igloo per 2 persone, la cappella di vetro Glass Teepee e la Celebration House da 250 ospiti.",
    "nl": "Glasiglo-resort in Saariselkä: glasiglo’s voor 2 personen, de glazen kapel Glass Teepee en het Celebration House voor 250 gasten.",
    "sv": "Glasiglooresort i Saariselkä: glasigloor för 2 personer, glaskapellet Glass Teepee och Celebration House för 250 gäster."
  },
  "lapland-hotels-luostotunturi": {
    "en": "Hotel in the Luosto log village: Amethyst Spa, 500 m to the slopes, next to Pyhä-Luosto National Park.",
    "fi": "Hotelli Luoston hirsikylässä: Amethyst Spa, 500 m rinteille, Pyhä-Luoston kansallispuiston vieressä.",
    "de": "Hotel im Blockhausdorf Luosto: Amethyst Spa, 500 m zu den Pisten, neben dem Nationalpark Pyhä-Luosto.",
    "ja": "ルオストのログハウス村に建つホテル。ゲレンデまで500メートル、ピュハ-ルオスト国立公園に隣接しています。館内のAmethyst Spaのアメジストは、約5キロ離れたランピヴァーラ鉱山から来ています。",
    "es": "Hotel en el pueblo de troncos de Luosto: Amethyst Spa, a 500 m de las pistas, junto al Parque Nacional Pyhä-Luosto.",
    "pt-BR": "Hotel na vila de casas de troncos de Luosto: Amethyst Spa, 500 m das pistas, ao lado do Parque Nacional Pyhä-Luosto.",
    "zh-CN": "坐落于卢奥斯托木屋村的酒店，距雪道500米，紧邻皮哈-卢奥斯托国家公园。酒店自有的Amethyst Spa所用紫水晶来自约5公里外的兰皮瓦拉矿场。",
    "ko": "루오스토 통나무 마을에 자리한 호텔로, 슬로프까지 500미터, 퓌해-루오스토 국립공원 바로 옆입니다. 호텔의 Amethyst Spa 자수정은 약 5km 떨어진 람피바라 광산에서 나옵니다.",
    "fr": "Hôtel dans le village de rondins de Luosto : Amethyst Spa, 500 m des pistes, à côté du parc national de Pyhä-Luosto.",
    "it": "Hotel nel villaggio di case in legno di Luosto: Amethyst Spa, 500 m dalle piste, accanto al Parco Nazionale Pyhä-Luosto.",
    "nl": "Hotel in het blokhutdorp Luosto: Amethyst Spa, 500 m naar de pistes, naast Nationaal Park Pyhä-Luosto.",
    "sv": "Hotell i Luostos timmerby: Amethyst Spa, 500 m till backarna, intill Pyhä-Luosto nationalpark."
  },
  "lapland-hotels-saaga": {
    "en": "Lapland Hotels hotel in Ylläs: three restaurants (Biegga, Bistro and Tsohka) and a spa with a 20-metre pool and hot tubs in a rock cave.",
    "fi": "Lapland Hotelsin hotelli Ylläksellä: kolme ravintolaa (Biegga, Bistro ja Tsohka) ja kylpylä, jossa 20 metrin allas ja kiviluolan porealtaat.",
    "de": "Hotel von Lapland Hotels in Ylläs: drei Restaurants (Biegga, Bistro, Tsohka) und ein Spa mit 20-Meter-Becken und Whirlpools in einer Felsgrotte.",
    "ja": "ユッラスにあるLapland Hotelsのホテル。レストランは三軒（Biegga、Bistro、Tsohka）で、20mプールと岩の洞窟のジャグジーを備えたスパがあります。",
    "es": "Hotel de Lapland Hotels en Ylläs: tres restaurantes (Biegga, Bistro y Tsohka) y spa con piscina de 20 m e hidromasaje en una cueva de roca.",
    "pt-BR": "Hotel da Lapland Hotels em Ylläs: três restaurantes (Biegga, Bistro e Tsohka) e spa com piscina de 20 m e hidromassagens numa gruta de pedra.",
    "zh-CN": "Lapland Hotels旗下位于于拉斯的酒店，设有三家餐厅（Biegga、Bistro和Tsohka），以及带20米泳池和岩洞按摩池的水疗中心。",
    "ko": "윌래스에 있는 Lapland Hotels의 호텔. 레스토랑 세 곳(Biegga, Bistro, Tsohka)과 20m 수영장, 암석 동굴 속 자쿠지를 갖춘 스파가 있습니다.",
    "fr": "Hôtel Lapland Hotels à Ylläs : trois restaurants (Biegga, Bistro et Tsohka) et un spa avec bassin de 20 m et bains à remous dans une grotte.",
    "it": "Hotel Lapland Hotels a Ylläs: tre ristoranti (Biegga, Bistro e Tsohka) e una spa con piscina di 20 m e idromassaggi in una grotta di roccia.",
    "nl": "Hotel van Lapland Hotels in Ylläs: drie restaurants (Biegga, Bistro en Tsohka) en een spa met zwembad van 20 m en hottubs in een rotsgrot.",
    "sv": "Lapland Hotels hotell i Ylläs: tre restauranger (Biegga, Bistro och Tsohka) och ett spa med 20-meterspool och bubbelpooler i en klippgrotta."
  },
  "levi-panorama": {
    "en": "Kassiopeia hotel beside the Levi slopes. Function rooms look over the front slopes to Levi village; event spaces for up to 450 guests.",
    "fi": "Kassiopeian hotelli Levillä rinteiden vieressä. Juhlatiloista näkymä eturinteille ja Levin kylään, tapahtumatiloihin jopa 450 vierasta.",
    "de": "Kassiopeia-Hotel neben den Pisten von Levi. Festräume mit Blick über die vorderen Hänge bis ins Dorf, Veranstaltungsräume für bis zu 450 Gäste.",
    "ja": "レヴィのゲレンデのそばに建つKassiopeiaのホテル。宴会場からは村側のゲレンデとレヴィ村が見渡せ、Express Gondolaが村まで運行。イベントスペースは最大450名です。",
    "es": "Hotel de Kassiopeia junto a las pistas de Levi. Salones con vistas a las pistas y al pueblo, y espacios para eventos de hasta 450 invitados.",
    "pt-BR": "Hotel da Kassiopeia ao lado das pistas de Levi. Salões com vista para as pistas e a vila, e espaços para eventos de até 450 convidados.",
    "zh-CN": "Kassiopeia旗下位于莱维雪道旁的酒店。宴会厅可眺望前山雪道和莱维村，Express Gondola缆车通往村里，活动场地最多可容纳450位宾客。",
    "ko": "레비 슬로프 옆에 있는 Kassiopeia의 호텔. 연회장에서 앞쪽 슬로프와 레비 마을이 내다보이고 Express Gondola가 마을까지 운행하며, 이벤트 공간은 최대 450명을 수용합니다.",
    "fr": "Hôtel Kassiopeia à côté des pistes de Levi. Salles de réception avec vue sur les pistes et le village, espaces événementiels jusqu’à 450 invités.",
    "it": "Hotel Kassiopeia accanto alle piste di Levi. Sale per ricevimenti con vista sulle piste e sul villaggio, spazi per eventi fino a 450 ospiti.",
    "nl": "Kassiopeia-hotel naast de pistes van Levi. Feestzalen met uitzicht op de pistes en het dorp, evenementenruimtes voor maximaal 450 gasten.",
    "sv": "Kassiopeia-hotell intill backarna i Levi. Festlokaler med utsikt över backarna och byn, eventlokaler för upp till 450 gäster."
  },
  "levin-iglut": {
    "en": "Glass igloos on the slope of Utsuvaara in Levi, about 340 m above sea level: Superior 23 m², Suite 53 m², open late August to early April.",
    "fi": "Lasi-iglut Utsuvaaran rinteellä Levillä, noin 340 m mpy: Superior 23 m², Suite 53 m², auki elokuun lopusta huhtikuun alkuun.",
    "de": "Glasiglus am Hang des Utsuvaara in Levi, auf etwa 340 m Höhe: Superior 23 m², Suite 53 m², geöffnet von Ende August bis Anfang April.",
    "ja": "レヴィのウツヴァーラの斜面、標高約340mに建つグラスイグルー。Superior 23m²、Suite 53m²、最大6名のNorthern Lights House。8月下旬から4月上旬まで営業。",
    "es": "Iglús de cristal en la ladera del Utsuvaara, en Levi, a unos 340 m: Superior de 23 m² y Suite de 53 m², abiertos de finales de agosto a principios de abril.",
    "pt-BR": "Iglus de vidro na encosta do Utsuvaara, em Levi, a cerca de 340 m: Superior de 23 m² e Suite de 53 m², abertos do fim de agosto ao início de abril.",
    "zh-CN": "莱维乌茨瓦拉山坡上的玻璃冰屋，海拔约340米。Superior冰屋23平方米，Suite冰屋53平方米，Northern Lights House最多6人。8月下旬至次年4月上旬开放。",
    "ko": "레비 우츠바라 비탈, 해발 약 340m의 글래스 이글루. Superior 23m², Suite 53m², 최대 6명의 Northern Lights House가 있으며 8월 말부터 4월 초까지 운영합니다.",
    "fr": "Igloos de verre sur le versant de l’Utsuvaara, à Levi, vers 340 m d’altitude : Superior 23 m², Suite 53 m², ouverts de fin août à début avril.",
    "it": "Igloo di vetro sul pendio dell’Utsuvaara, a Levi, a circa 340 m: Superior di 23 m², Suite di 53 m², aperti da fine agosto a inizio aprile.",
    "nl": "Glasiglo’s op de helling van de Utsuvaara in Levi, op zo’n 340 m: Superior 23 m², Suite 53 m², open van eind augustus tot begin april.",
    "sv": "Glasigloor på Utsuvaaras sluttning i Levi, cirka 340 m över havet: Superior 23 m², Suite 53 m², öppet från slutet av augusti till början av april."
  },
  "northern-lights-ranch": {
    "en": "Premium resort in Köngäs near Levi with glass-walled cabins and a chapel built of snow and ice.",
    "fi": "Premium-tason resortti Köngäksessä Levin lähellä: lasiseinämökit ja lumesta ja jäästä rakennettu kappeli.",
    "de": "Premium-Resort in Köngäs bei Levi mit verglasten Hütten und einer Kapelle aus Schnee und Eis.",
    "ja": "レヴィ中心部から車で約15分、ケンガスにあるプレミアムリゾート。ガラス張りのキャビンと雪と氷でできたスノーチャペルが同じ敷地内にあり、挙式も披露宴も宿泊もすべて歩いて移動できます。",
    "es": "Resort premium en Köngäs, cerca de Levi, con cabañas de paredes de cristal y una capilla de nieve y hielo.",
    "pt-BR": "Resort premium em Köngäs, perto de Levi, com cabanas de paredes de vidro e uma capela de neve e gelo.",
    "zh-CN": "位于科恩耶斯的高端度假村，距莱维中心约 15 分钟车程。玻璃幕墙木屋与冰雪建成的礼拜堂同在一处园区，仪式、宴会与住宿之间都只需步行即可轻松往来。",
    "ko": "레비 중심가에서 차로 약 15분 거리, 쾽개스에 자리한 프리미엄 리조트입니다. 유리 벽 캐빈과 눈과 얼음으로 지은 스노우 채플이 같은 부지에 있어 예식과 피로연, 숙박이 모두 걸어서 오갈 수 있습니다.",
    "fr": "Resort premium à Köngäs, près de Levi, avec chalets aux parois vitrées et une chapelle de neige et de glace.",
    "it": "Resort premium a Köngäs, vicino a Levi, con chalet dalle pareti di vetro e una cappella di neve e ghiaccio.",
    "nl": "Premium resort in Köngäs bij Levi, met hutten met glazen wanden en een kapel van sneeuw en ijs.",
    "sv": "Premiumresort i Köngäs nära Levi, med stugor med glasväggar och ett kapell av snö och is."
  },
  "northern-lights-village-levi": {
    "en": "Opened in 2019, the Levi sister of Northern Lights Village Saariselkä. Aurora Cabins with glass roofs, 16 km from Levi centre with a daily shuttle.",
    "fi": "Avattu 2019, Saariselän Northern Lights Villagen sisarkohde Levillä. Aurora Cabinit lasikatolla, 16 km Levin keskustaan, päivittäinen kuljetus.",
    "de": "2019 eröffnet, das Levi-Schwesterhaus des Northern Lights Village Saariselkä: Aurora Cabins mit Glasdach, 16 km ins Zentrum, täglicher Shuttle.",
    "ja": "2019年オープン、Northern Lights Village Saariselkäのレヴィの姉妹施設。ガラス屋根のAurora Cabinがあり、レヴィ中心部まで16km、毎日シャトルが運行しています。",
    "es": "Abierto en 2019, hermano en Levi del Northern Lights Village Saariselkä: Aurora Cabins con techo de cristal, a 16 km del centro, traslado diario.",
    "pt-BR": "Inaugurado em 2019, irmão em Levi do Northern Lights Village Saariselkä: Aurora Cabins com teto de vidro, a 16 km do centro, traslado diário.",
    "zh-CN": "2019年开业，是Northern Lights Village Saariselkä在莱维的姊妹酒店。Aurora Cabin配有玻璃屋顶，距莱维中心16公里，每天有班车往返。",
    "ko": "2019년에 문을 연 Northern Lights Village Saariselkä의 레비 자매 시설. 유리 지붕 Aurora Cabin이 있고 레비 중심부까지 16km, 매일 셔틀이 운행합니다.",
    "fr": "Ouvert en 2019, jumeau à Levi du Northern Lights Village Saariselkä : Aurora Cabins à toit de verre, à 16 km du centre, navette quotidienne.",
    "it": "Aperto nel 2019, gemello a Levi del Northern Lights Village Saariselkä: Aurora Cabin con tetto di vetro, a 16 km dal centro, navetta giornaliera.",
    "nl": "Geopend in 2019, de zuster in Levi van Northern Lights Village Saariselkä: Aurora Cabins met glazen dak, 16 km van het centrum, dagelijkse shuttle.",
    "sv": "Öppnade 2019, systeranläggning i Levi till Northern Lights Village Saariselkä: Aurora Cabins med glastak, 16 km till centrum, daglig transfer."
  },
  "northern-lights-village-saariselka": {
    "en": "80 Aurora Cabins and 20 Polar Sky Suites with glass roofs in central Saariselkä.",
    "fi": "80 Aurora-mökkiä ja 20 Polar Sky -sviittiä lasikatolla Saariselän keskustassa.",
    "de": "80 Aurora Cabins und 20 Polar Sky Suites mit Glasdach im Zentrum von Saariselkä.",
    "ja": "2016年オープン。Aurora Cabin 80室とPolar Sky Suite 20室。すべてガラス天井で、サーリセルカの各種サービスへアクセスしやすい中心立地です。",
    "es": "80 Aurora Cabins y 20 Polar Sky Suites con techo de cristal en el centro de Saariselkä.",
    "pt-BR": "80 Aurora Cabins e 20 Polar Sky Suites com teto de vidro no centro de Saariselkä.",
    "zh-CN": "2016年开业。设有80间Aurora Cabin和20间Polar Sky套房，全部配有玻璃顶。酒店地处萨利色尔卡中心，前往当地各项服务都很方便。",
    "ko": "2016년 개장. Aurora Cabin 80개와 Polar Sky Suite 20개. 전 객실 유리 지붕이며 사리셀카 편의시설과 가까운 중심 위치입니다.",
    "fr": "80 Aurora Cabins et 20 Polar Sky Suites à toit vitré dans le centre de Saariselkä.",
    "it": "80 Aurora Cabins e 20 Polar Sky Suites con tetto di vetro nel centro di Saariselkä.",
    "nl": "80 Aurora Cabins en 20 Polar Sky Suites met glazen daken in het centrum van Saariselkä.",
    "sv": "80 Aurora Cabins och 20 Polar Sky Suites med glastak i centrala Saariselkä."
  },
  "nova-skyland": {
    "en": "A compact, modern boutique hotel 300 metres from Santa Claus Village, for small wedding parties who want to stay close to the village.",
    "fi": "Kompakti, moderni boutique-hotelli 300 metrin päässä Joulupukin pajakylästä. Pienille hääseurueille, jotka haluavat majoittua lähellä.",
    "de": "Kompaktes, modernes Boutique-Hotel 300 Meter vom Weihnachtsmanndorf, für kleine Hochzeitsgesellschaften, die nahe am Dorf übernachten möchten.",
    "ja": "サンタクロース村から300メートルのところにある、コンパクトでモダンなブティックホテル。村の近くに泊まりたい少人数の結婚式のゲストに向いています。",
    "es": "Hotel boutique compacto y moderno a 300 metros del Pueblo de Papá Noel, para grupos de boda pequeños que quieren alojarse cerca del pueblo.",
    "pt-BR": "Hotel boutique compacto e moderno a 300 metros da Vila do Papai Noel, para pequenos grupos de casamento que querem ficar perto da vila.",
    "zh-CN": "Nova Skyland Hotel位于罗瓦涅米，距圣诞老人村300米，是一家小巧现代的精品酒店，内部采用现代风格设计。适合想住在圣诞老人村附近的小型婚礼团队。",
    "ko": "Nova Skyland Hotel은 산타클로스 마을에서 300미터 떨어진 아담하고 모던한 부티크 호텔입니다. 마을 가까이에 머물고 싶은 소규모 웨딩 일행에게 알맞습니다.",
    "fr": "Hôtel-boutique compact et moderne à 300 mètres du Village du Père Noël, pour les petits groupes de mariage qui veulent loger près du village.",
    "it": "Boutique hotel compatto e moderno a 300 metri dal Villaggio di Babbo Natale, per piccoli gruppi di nozze che vogliono alloggiare vicino al villaggio.",
    "nl": "Compact, modern boutiquehotel op 300 meter van het Kerstmandorp, voor kleine bruiloftsgezelschappen die dicht bij het dorp willen overnachten.",
    "sv": "Kompakt, modernt boutiquehotell 300 meter från Jultomtens by, för små bröllopssällskap som vill bo nära byn."
  },
  "santas-hotel-aurora": {
    "en": "Boutique hotel in the centre of Luosto: a private sauna in every room, glass igloos, beside Pyhä-Luosto National Park.",
    "fi": "Butiikkihotelli Luoston keskustassa: oma sauna joka huoneessa, lasi-iglut, Pyhä-Luoston kansallispuiston vieressä.",
    "de": "Boutiquehotel im Zentrum von Luosto: eigene Sauna in jedem Zimmer, Glasiglus, direkt am Nationalpark Pyhä-Luosto.",
    "ja": "ピュハ-ルオスト国立公園に隣接する、ルオストの中心部に建つブティックホテル。客室にはそれぞれサウナが備わり、多くの部屋には暖炉もあります。グラスイグルーからは夜空がそのまま見上げられます。",
    "es": "Hotel boutique en el centro de Luosto: sauna privada en cada habitación, iglús de cristal y el Parque Nacional Pyhä-Luosto al lado.",
    "pt-BR": "Hotel boutique no centro de Luosto: sauna privativa em cada quarto, iglus de vidro, ao lado do Parque Nacional Pyhä-Luosto.",
    "zh-CN": "位于卢奥斯托中心的精品酒店，紧邻皮哈-卢奥斯托国家公园。每间客房都配有独立桑拿，许多客房还设有壁炉；在酒店的玻璃冰屋里，你们可以直接仰望夜空。",
    "ko": "퓌해-루오스토 국립공원 옆, 루오스토 중심에 자리한 부티크 호텔. 모든 객실에 전용 사우나가 있고 상당수 객실에는 벽난로도 있으며, 글래스 이글루에서는 밤하늘이 그대로 올려다보입니다.",
    "fr": "Hôtel boutique dans le centre de Luosto : un sauna privé dans chaque chambre, igloos de verre, à côté du parc national de Pyhä-Luosto.",
    "it": "Boutique hotel nel centro di Luosto: sauna privata in ogni camera, igloo di vetro, accanto al Parco Nazionale Pyhä-Luosto.",
    "nl": "Boetiekhotel in het centrum van Luosto: een eigen sauna in elke kamer, glazen iglo's, naast Nationaal Park Pyhä-Luosto.",
    "sv": "Boutiquehotell i Luostos centrum: egen bastu i varje rum, glasigloor, intill Pyhä-Luosto nationalpark."
  },
  "snow-village-lainio": {
    "en": "Lapland Hotels SnowVillage in Lainio, rebuilt every winter: an ice chapel for about 50 guests and a log wilderness chapel for about 20.",
    "fi": "Lapland Hotels SnowVillage Lainiossa rakennetaan joka talvi uudelleen: jääkappeli noin 50 hengelle ja hirsinen erämaakappeli noin 20 hengelle.",
    "de": "Lapland Hotels SnowVillage in Lainio, jeden Winter neu gebaut: Eiskapelle für etwa 50 Gäste und Wildniskapelle in Blockbauweise für etwa 20.",
    "ja": "ユッラスとレヴィの間、ライニオのLapland Hotels SnowVillage。毎冬建て直され、約50名収容のアイスチャペルと約20名収容のログ造りのウィルダネスチャペルがあります。",
    "es": "Lapland Hotels SnowVillage en Lainio, reconstruido cada invierno: capilla de hielo para unas 50 personas y capilla de troncos para unas 20.",
    "pt-BR": "Lapland Hotels SnowVillage em Lainio, reconstruída todo inverno: capela de gelo para cerca de 50 pessoas e capela de troncos para cerca de 20.",
    "zh-CN": "于拉斯与莱维之间莱尼奥的Lapland Hotels SnowVillage，每年冬季重建。设有可容纳约50人的冰礼拜堂，以及约20人的原木荒野礼拜堂。",
    "ko": "윌래스와 레비 사이 라이니오의 Lapland Hotels SnowVillage. 매 겨울 다시 지으며, 약 50명 규모의 아이스 채플과 약 20명 규모의 통나무 황야 채플이 있습니다.",
    "fr": "Lapland Hotels SnowVillage à Lainio, reconstruit chaque hiver : chapelle de glace pour environ 50 personnes et chapelle en rondins pour environ 20.",
    "it": "Lapland Hotels SnowVillage a Lainio, ricostruito ogni inverno: cappella di ghiaccio per circa 50 persone e cappella in tronchi per circa 20.",
    "nl": "Lapland Hotels SnowVillage in Lainio, elke winter opnieuw gebouwd: ijskapel voor zo’n 50 gasten en een blokhutkapel voor zo’n 20.",
    "sv": "Lapland Hotels SnowVillage i Lainio byggs upp på nytt varje vinter: iskapell för cirka 50 gäster och vildmarkskapell i timmer för cirka 20."
  },
  "tundrea-kilpisjarvi": {
    "en": "Three two-storey glass-roofed Igloo Houses on Lake Kilpisjärvi among the fells, about 500 m above sea level, near the Three-Country Cairn.",
    "fi": "Kolme kaksikerroksista lasikattoista Igloo Housea Kilpisjärven rannalla tuntureiden keskellä, noin 500 m mpy, lähellä Kolmen valtakunnan rajapyykkiä.",
    "de": "Drei zweistöckige Igloo Houses mit Glasdach am Kilpisjärvi inmitten der Fjälls, auf etwa 500 m Höhe, nahe dem Dreiländereck.",
    "ja": "フィンランド北西端、標高約500mのフェルに囲まれたキルピスヤルヴィ湖畔に、二階建てでガラス屋根のIgloo Houseが三棟あります。三国国境標も近くです。",
    "es": "Tres Igloo Houses de dos plantas con techo de cristal junto al lago Kilpisjärvi, entre fells, a unos 500 m de altitud, cerca del mojón de tres países.",
    "pt-BR": "Três Igloo Houses de dois andares com teto de vidro no lago Kilpisjärvi, entre montes, a cerca de 500 m de altitude, perto da tríplice fronteira.",
    "zh-CN": "三栋双层玻璃顶Igloo House坐落于基尔皮斯耶尔维湖畔，群山环绕，位于芬兰西北端，海拔约500米，邻近三国交界界碑。适合小型冒险私奔婚礼。",
    "ko": "핀란드 북서쪽 끝 킬피스야르비 호숫가, 펠에 둘러싸인 해발 약 500m 지점에 복층 유리 지붕 Igloo House 세 채가 있습니다. 삼국 국경 표지석이 가깝습니다.",
    "fr": "Trois Igloo Houses à toit de verre sur deux niveaux au bord du lac Kilpisjärvi, parmi les fjälls, vers 500 m d’altitude, près de la borne des trois pays.",
    "it": "Tre Igloo House su due piani con tetto di vetro sul lago Kilpisjärvi, tra i fjäll, a circa 500 m di quota, vicino al cippo dei tre confini.",
    "nl": "Drie tweelaagse Igloo Houses met glazen dak aan het Kilpisjärvi-meer tussen de fjälls, op zo’n 500 m hoogte, vlak bij het drielandenpunt.",
    "sv": "Tre Igloo Houses i två våningar med glastak vid Kilpisjärvi bland fjällen, cirka 500 m över havet, nära Treriksröset."
  },
  "wilderness-hotel-inari": {
    "en": "On the shore of Lake Inari, in the centre of Sámi culture. The aurora cabins on the shore look straight out across the lake.",
    "fi": "Inarijärven rannalla Inarissa, saamelaiskulttuurin keskuksessa. Rannan aurora-mökeistä on suora näkymä järven yli.",
    "de": "Am Ufer des Inarisees, im Zentrum der samischen Kultur. Von den Aurora Cabins am Ufer blickt man direkt über den See.",
    "ja": "イナリ湖のほとり、サーミ文化の中心地にあるWilderness Hotel Inari。湖畔のオーロラキャビンからは、湖をまっすぐ見渡せます。",
    "es": "A orillas del lago Inari, en el centro de la cultura sami. Las cabañas de auroras de la orilla tienen vistas directas sobre el lago.",
    "pt-BR": "Às margens do lago Inari, no centro da cultura sámi. As cabanas de aurora à beira do lago têm vista direta sobre o lago.",
    "zh-CN": "Wilderness Hotel Inari坐落于伊纳里镇的伊纳里湖畔，地处萨米文化的中心。湖岸边的极光木屋正对湖面，从屋内即可直接眺望整片湖面。",
    "ko": "Wilderness Hotel Inari는 이나리 호숫가, 사미 문화의 중심에 자리합니다. 호숫가의 오로라 캐빈에서는 호수 너머가 곧바로 내다보입니다.",
    "fr": "Au bord du lac Inari, au centre de la culture samie. Depuis les cabines aurores au bord de l’eau, la vue porte droit sur le lac.",
    "it": "Sulle rive del lago Inari, nel centro della cultura sami. Dalle cabine aurora sulla riva la vista spazia direttamente sul lago.",
    "nl": "Aan de oever van het Inarimeer, in het centrum van de Sámi-cultuur. De Aurora-hutten aan de oever kijken recht uit over het meer.",
    "sv": "Vid Enare träsks strand, i centrum av den samiska kulturen. Från Aurora-stugorna vid stranden ser du rakt ut över sjön."
  },
  "wilderness-hotel-juutua": {
    "en": "Opened in 2022 on the bank of the Juutua river in central Inari, with the Aanaar restaurant. For couples who want to stay in central Inari.",
    "fi": "Avattu 2022 Juutuanjoen rannalle Inarin keskustaan, ja hotellissa on Aanaar-ravintola. Pareille, jotka haluavat majoittua Inarin keskustassa.",
    "de": "2022 am Fluss Juutuanjoki im Zentrum von Inari eröffnet, mit dem Restaurant Aanaar. Für Paare, die im Zentrum von Inari übernachten möchten.",
    "ja": "2022年、イナリ中心部のユートゥアン川のほとりにオープンしたホテルで、Aanaarレストランを備えています。イナリの中心部に泊まりたいカップルに向いています。",
    "es": "Abierto en 2022 a orillas del río Juutua, en el centro de Inari, con el restaurante Aanaar. Para parejas que quieren alojarse en el centro de Inari.",
    "pt-BR": "Inaugurado em 2022 às margens do rio Juutua, no centro de Inari, com o restaurante Aanaar. Para casais que querem se hospedar no centro de Inari.",
    "zh-CN": "Wilderness Hotel Juutua于2022年在伊纳里中心的尤图阿河畔开业，酒店设有Aanaar餐厅。适合想在伊纳里中心住宿的新人。",
    "ko": "Wilderness Hotel Juutua는 2022년 이나리 중심부 유투아강 기슭에 문을 열었고 Aanaar 레스토랑이 있습니다. 이나리 중심부에 머물고 싶은 커플에게 알맞습니다.",
    "fr": "Ouvert en 2022 au bord de la rivière Juutua, dans le centre d’Inari, avec le restaurant Aanaar. Pour les couples qui veulent loger au centre d’Inari.",
    "it": "Aperto nel 2022 sul fiume Juutua, nel centro di Inari, con il ristorante Aanaar. Per le coppie che vogliono alloggiare nel centro di Inari.",
    "nl": "Geopend in 2022 aan de rivier de Juutua in het centrum van Inari, met restaurant Aanaar. Voor stellen die in het centrum van Inari willen verblijven.",
    "sv": "Öppnade 2022 vid älven Juutua i centrala Inari, med restaurangen Aanaar. För par som vill bo i centrala Inari."
  },
  "wilderness-hotel-muotka": {
    "en": "Wilderness hotel near Saariselkä, beside the national park. Aurora Cabins (30 m², up to 4) for the wedding night; a small venue for small weddings.",
    "fi": "Erämaahotelli Saariselän lähellä, kansallispuiston kupeessa. Aurora Cabin -mökit (30 m², enintään 4) hääyöksi. Pieni paikka pienille häille.",
    "de": "Wildnishotel nahe Saariselkä, am Nationalpark: Aurora Cabins (30 m², bis zu 4 Personen) für die Hochzeitsnacht. Klein, für kleine Hochzeiten.",
    "ja": "サーリセルカ近郊、国立公園のすぐそばのウィルダネスホテル。Aurora Cabin（30m²、最大4名）は初夜の宿に向いています。小さな結婚式のための小さな会場です。",
    "es": "Hotel en plena naturaleza cerca de Saariselkä, junto al parque nacional: Aurora Cabins (30 m², hasta 4 personas) para la noche de bodas.",
    "pt-BR": "Hotel em meio à natureza perto de Saariselkä, ao lado do parque nacional: Aurora Cabins (30 m², até 4 pessoas) para a noite de núpcias.",
    "zh-CN": "萨利色尔卡附近的荒野酒店，紧邻国家公园。Aurora Cabin（30平方米，最多4人）适合作为新婚之夜的住所，是一处适合小型婚礼的小型场地。",
    "ko": "사리셀카 인근, 국립공원 바로 옆의 황야 호텔. Aurora Cabin(30m², 최대 4명)은 첫날밤을 보내기에 알맞으며, 작은 결혼식을 위한 작은 장소입니다.",
    "fr": "Hôtel en pleine nature près de Saariselkä, en bordure du parc national : Aurora Cabins (30 m², jusqu’à 4 personnes) pour la nuit de noces.",
    "it": "Hotel nella natura vicino a Saariselkä, accanto al parco nazionale: Aurora Cabin (30 m², fino a 4 persone) per la prima notte di nozze.",
    "nl": "Wildernishotel bij Saariselkä, naast het nationaal park: Aurora Cabins (30 m², maximaal 4 personen) voor de huwelijksnacht.",
    "sv": "Vildmarkshotell nära Saariselkä, intill nationalparken: Aurora Cabins (30 m², upp till 4 personer) för bröllopsnatten. Litet, för små bröllop."
  }
};
