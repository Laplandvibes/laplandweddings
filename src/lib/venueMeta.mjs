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
    "en": "Resort by Lake Apukka with Aurora Cabins, two-storey Kammi igloo, Aitta and Kota restaurants.",
    "fi": "Resort Apukkajärven rannalla: Aurora Cabins, kaksikerroksinen Kammi-iglu, Aitta- ja Kota-ravintolat.",
    "de": "Resort am Apukka-See mit Aurora Cabins, zweistöckigem Kammi-Iglu und den Restaurants Aitta und Kota.",
    "ja": "アプッカ湖畔のリゾートで、Aurora Cabin、2階建てのKammi Glass Igloo Suite、Lakeview Suiteを備えています。レストランはAittaとKotaの2軒。サンタクロースの近さと自然の静けさの両方を求めるカップルに最適。",
    "es": "Resort a orillas del lago Apukka con Aurora Cabins, iglú Kammi de dos plantas y los restaurantes Aitta y Kota.",
    "pt-BR": "Resort à beira do lago Apukka com Aurora Cabins, iglu Kammi de dois andares e os restaurantes Aitta e Kota.",
    "zh-CN": "坐落于阿普卡湖畔的度假村，设有Aurora Cabin、双层Kammi Glass Igloo Suite及Lakeview套房。两家餐厅：Aitta与Kota。适合既想靠近圣诞老人又向往自然宁静的新人。",
    "ko": "아푸카 호숫가에 자리한 리조트로 Aurora Cabin, 복층 Kammi Glass Igloo Suite, Lakeview Suite를 갖추고 있습니다. 두 곳의 레스토랑: Aitta + Kota.",
    "fr": "Resort au bord du lac Apukka avec les Aurora Cabins, l’igloo Kammi à deux étages et les restaurants Aitta et Kota.",
    "it": "Resort sulle rive del lago Apukka con Aurora Cabins, igloo Kammi a due piani e i ristoranti Aitta e Kota.",
    "nl": "Resort aan het Apukkameer met Aurora Cabins, een Kammi-iglo van twee verdiepingen en de restaurants Aitta en Kota.",
    "sv": "Resort vid sjön Apukka med Aurora Cabins, Kammi-iglo i två våningar samt restaurangerna Aitta och Kota."
  },
  "arctic-snowhotel": {
    "en": "Snow Hotel with ice chapel for 30 guests, ice restaurant, and glass igloos with 360° aurora view.",
    "fi": "Snow Hotel jossa jääkappeli 30 vieraalle, jääravintola ja lasi-iglut 360°-revontulinäkymällä.",
    "de": "Snow Hotel mit Eiskapelle für 30 Gäste, Eisrestaurant und Glasiglus mit 360°-Blick auf die Polarlichter.",
    "ja": "ロヴァニエミ近郊のスノーホテルで、毎年12月15日に新しく建て直されます。アイスチャペル（30名収容）、アイスレストラン、アイスバーを併設しています。",
    "es": "Snow Hotel con capilla de hielo para 30 invitados, restaurante de hielo e iglús de cristal con vistas de 360° a la aurora boreal.",
    "pt-BR": "Snow Hotel com capela de gelo para 30 convidados, restaurante de gelo e iglus de vidro com vista de 360° para a aurora.",
    "zh-CN": "邻近罗瓦涅米的雪屋酒店，每年12月15日重建。设有冰礼拜堂（可容纳30位宾客）、冰餐厅和冰吧。玻璃冰屋全年开放，每晚314欧元起，配有360°玻璃顶和极光警报。",
    "ko": "로바니에미 인근의 스노우 호텔로 매년 12월 15일에 다시 짓습니다. 아이스 채플(30명 수용), 아이스 레스토랑, 아이스 바를 갖추고 있습니다.",
    "fr": "Snow Hotel avec chapelle de glace pour 30 personnes, restaurant de glace et igloos de verre avec vue à 360° sur les aurores.",
    "it": "Snow Hotel con cappella di ghiaccio per 30 ospiti, ristorante di ghiaccio e igloo di vetro con vista a 360° sull’aurora.",
    "nl": "Snow Hotel met ijskapel voor 30 gasten, ijsrestaurant en glazen iglo's met 360°-zicht op het noorderlicht.",
    "sv": "Snow Hotel med iskapell för 30 gäster, isrestaurang och glasigloor med 360° norrskensvy."
  },
  "arctic-treehouse": {
    "en": "Modern tree-top cabins with glass walls: one of the easiest venues in Lapland to reach, 2 km from Rovaniemi airport.",
    "fi": "Modernit puumajat lasiseinin: Lapin paras logistiikka, 2 km Rovaniemen lentokentältä.",
    "de": "Moderne Baumwipfelhütten mit Glaswänden: die beste Logistik Lapplands, 2 km vom Flughafen Rovaniemi.",
    "ja": "ガラス張りでアークティックなデザインのモダンなツリーハウス。空港から2kmと、ラップランドで最も便利なロケーション。スピーディーでハイエンドなエロープメントやウェディングトリップに最適です。",
    "es": "Cabañas modernas en las copas de los árboles con paredes de cristal: la mejor logística de Laponia, a 2 km del aeropuerto de Rovaniemi.",
    "pt-BR": "Cabanas modernas no alto das árvores, com paredes de vidro: a melhor logística da Lapônia, a 2 km do aeroporto de Rovaniemi.",
    "zh-CN": "现代树屋木舍，玻璃幕墙，北极风设计。距罗瓦涅米机场仅2公里，是拉普兰交通最便利的位置。冬季可赏极光，夏季可见午夜阳光，最适合快捷高端的私奔婚礼与婚礼之旅。",
    "ko": "유리 벽과 북극풍 디자인의 모던한 트리하우스 캐빈. 공항에서 2km로 라플란드에서 가장 편리한 위치입니다. 신속하고 고급스러운 엘로프먼트와 웨딩 여행에 가장 적합합니다.",
    "fr": "Cabanes perchées modernes aux parois vitrées : la meilleure logistique de Laponie, à 2 km de l’aéroport de Rovaniemi.",
    "it": "Moderne casette sugli alberi con pareti di vetro: la logistica migliore della Lapponia, a 2 km dall’aeroporto di Rovaniemi.",
    "nl": "Moderne boomhutten met glazen wanden: de beste logistiek van Lapland, 2 km van de luchthaven van Rovaniemi.",
    "sv": "Moderna trädtoppsstugor med glasväggar: bästa logistiken i Lappland, 2 km från Rovaniemi flygplats."
  },
  "hotelli-hullu-poro": {
    "en": "Levi’s central hotel and restaurant complex with 200-guest banquet hall and 4 restaurants.",
    "fi": "Levin keskeinen hotelli- ja ravintolakompleksi: 200 hengen juhlasali ja 4 ravintolaa.",
    "de": "Zentraler Hotel- und Restaurantkomplex in Levi mit Festsaal für 200 Gäste und 4 Restaurants.",
    "ja": "レヴィ中心部のホテル＆レストラン複合施設。宴会場が2つ（200名・60名）あり、大人数の結婚式に対応します。ゲストが多く、ショッピングやスキーリゾートの近さを求める方に好適です。",
    "es": "El complejo hotelero y de restaurantes céntrico de Levi, con salón de banquetes para 200 invitados y 4 restaurantes.",
    "pt-BR": "O complexo central de hotel e restaurantes de Levi, com salão de festas para 200 convidados e 4 restaurantes.",
    "zh-CN": "位于莱维中心的酒店与餐厅综合体，设有4家餐厅和两个宴会厅（200人和60人），适合较大规模婚礼。宾客众多、想就近购物及前往滑雪场的新人之佳选。",
    "ko": "레비 중심부의 호텔·레스토랑 복합 시설. 두 개의 연회장(200명, 60명)으로 대규모 결혼식에 적합합니다. 하객이 많고 쇼핑과 스키 리조트 접근성을 원하는 분께 좋은 선택입니다.",
    "fr": "Le complexe hôtelier et gastronomique central de Levi : salle de banquet pour 200 personnes et 4 restaurants.",
    "it": "Il complesso di hotel e ristoranti nel cuore di Levi: sala per banchetti da 200 ospiti e 4 ristoranti.",
    "nl": "Het centrale hotel- en restaurantcomplex van Levi met een feestzaal voor 200 gasten en 4 restaurants.",
    "sv": "Levis centrala hotell- och restaurangkomplex med festsal för 200 gäster och 4 restauranger."
  },
  "kakslauttanen": {
    "en": "Finland’s most famous glass igloo resort. Glass Teepee chapel, ice chapel, log chapel, and 250-guest Celebration House.",
    "fi": "Suomen kuuluisin lasi-iglu-resortti. Glass Teepee -kappeli, jääkappeli, hirsikappeli ja 250 hengen Celebration House.",
    "de": "Finnlands bekanntestes Glasiglu-Resort. Glass-Teepee-Kapelle, Eiskapelle, Blockhauskapelle und das Celebration House für 250 Gäste.",
    "ja": "フィンランドでもっとも有名なグラスイグルーリゾート。Glass Teepeeチャペル、氷のチャペル、ログハウスのチャペル、250名収容のCelebration House。",
    "es": "El resort de iglús de cristal más famoso de Finlandia. Capilla Glass Teepee, capilla de hielo, capilla de troncos y la Celebration House para 250 invitados.",
    "pt-BR": "O resort de iglus de vidro mais conhecido da Finlândia. Capela Glass Teepee, capela de gelo, capela de troncos e a Celebration House para 250 convidados.",
    "zh-CN": "芬兰最著名的玻璃冰屋度假村。Glass Teepee 教堂、冰教堂、木屋教堂，以及可容纳 250 位宾客的 Celebration House。",
    "ko": "핀란드에서 가장 유명한 글래스 이글루 리조트. Glass Teepee 예배당, 얼음 예배당, 통나무 예배당, 그리고 250명 규모의 Celebration House.",
    "fr": "Le resort d’igloos de verre le plus connu de Finlande. Chapelle Glass Teepee, chapelle de glace, chapelle en rondins et Celebration House pour 250 personnes.",
    "it": "Il resort di igloo di vetro più famoso della Finlandia. Cappella Glass Teepee, cappella di ghiaccio, cappella in legno e Celebration House da 250 ospiti.",
    "nl": "Het beroemdste resort met glazen iglo's van Finland. Glass Teepee-kapel, ijskapel, blokhutkapel en Celebration House voor 250 gasten.",
    "sv": "Finlands mest kända glasiglooresort. Glass Teepee-kapell, iskapell, timmerkapell och Celebration House för 250 gäster."
  },
  "lapland-hotels-luostotunturi": {
    "en": "Hotel in the Luosto log village: Amethyst Spa, 500 m to the slopes, next to Pyhä-Luosto National Park.",
    "fi": "Hotelli Luoston hirsikylässä: Amethyst Spa, 500 m rinteille, Pyhä-Luoston kansallispuiston vieressä.",
    "de": "Hotel im Blockhausdorf Luosto: Amethyst Spa, 500 m zu den Pisten, neben dem Nationalpark Pyhä-Luosto.",
    "ja": "ルオストのログハウス村に建つホテル。ゲレンデまで500メートル、ピュハ-ルオスト国立公園に隣接しています。館内にはAmethyst Spaがあり、村の上手のフェルにはランピヴァーラのアメジスト鉱山があります。",
    "es": "Hotel en el pueblo de troncos de Luosto: Amethyst Spa, a 500 m de las pistas, junto al Parque Nacional Pyhä-Luosto.",
    "pt-BR": "Hotel na vila de casas de troncos de Luosto: Amethyst Spa, 500 m das pistas, ao lado do Parque Nacional Pyhä-Luosto.",
    "zh-CN": "坐落于卢奥斯托木屋村的酒店，距雪道500米，紧邻皮哈-卢奥斯托国家公园。酒店设有自己的Amethyst Spa，兰皮瓦拉紫水晶矿场就在村庄上方的山丘上。",
    "ko": "루오스토 통나무 마을에 자리한 호텔로, 슬로프까지 500미터, 퓌해-루오스토 국립공원 바로 옆입니다. 호텔 안에 Amethyst Spa가 있고, 람피바라 자수정 광산은 마을 위쪽 펠에 있습니다.",
    "fr": "Hôtel dans le village de rondins de Luosto : Amethyst Spa, 500 m des pistes, à côté du parc national de Pyhä-Luosto.",
    "it": "Hotel nel villaggio di case in legno di Luosto: Amethyst Spa, 500 m dalle piste, accanto al Parco Nazionale Pyhä-Luosto.",
    "nl": "Hotel in het blokhutdorp Luosto: Amethyst Spa, 500 m naar de pistes, naast Nationaal Park Pyhä-Luosto.",
    "sv": "Hotell i Luostos timmerby: Amethyst Spa, 500 m till backarna, intill Pyhä-Luosto nationalpark."
  },
  "lapland-hotels-saaga": {
    "en": "TripAdvisor-favourite wedding hotel in Ylläs. Spa, three restaurants, hot tubs.",
    "fi": "TripAdvisorin suosima häähotelli Ylläksellä. Spa, kolme ravintolaa, hot tubit.",
    "de": "Auf TripAdvisor beliebtes Hochzeitshotel in Ylläs. Spa, drei Restaurants, Hot Tubs.",
    "ja": "ユッラスでTripAdvisorの評価が高いウェディングホテル。スパ、レストラン3軒、プール、ホットタブを備え、小規模な家族の結婚式に最適です（TripAdvisor：17名のグループがここで結婚式を成功させました）。",
    "es": "Hotel de bodas favorito en TripAdvisor en Ylläs. Spa, tres restaurantes y bañeras de hidromasaje.",
    "pt-BR": "Hotel de casamentos favorito do TripAdvisor em Ylläs. Spa, três restaurantes, ofurôs ao ar livre.",
    "zh-CN": "于拉斯地区TripAdvisor上备受推崇的婚礼酒店。设有水疗、三家餐厅、泳池和按摩浴缸，适合小型家庭婚礼（TripAdvisor：一支17人的队伍在此成功举办了婚礼）。",
    "ko": "윌래스에서 TripAdvisor 평점이 높은 웨딩 호텔. 스파, 레스토랑 3곳, 수영장, 핫텁을 갖춰 소규모 가족 결혼식에 안성맞춤입니다(TripAdvisor: 17명 일행이 이곳에서 성공적으로 결혼식을 올렸습니다).",
    "fr": "L’hôtel de mariage plébiscité sur TripAdvisor à Ylläs. Spa, trois restaurants, bains nordiques.",
    "it": "L’hotel per matrimoni preferito su TripAdvisor a Ylläs. Spa, tre ristoranti, vasche idromassaggio.",
    "nl": "Op TripAdvisor geliefd bruiloftshotel in Ylläs. Spa, drie restaurants, hottubs.",
    "sv": "TripAdvisor-favorit bland bröllopshotell i Ylläs. Spa, tre restauranger, bubbelbad."
  },
  "levi-ice-castle": {
    "en": "Levi’s own ice castle with chapel, bar and ice suites. Walls and seats from crystal-clear ice.",
    "fi": "Levin oma jäälinna kappelin, baarin ja jääsviittien kanssa. Seinät ja istuimet kristallinkirkkaasta jäästä.",
    "de": "Levis eigenes Eisschloss mit Kapelle, Bar und Eissuiten. Wände und Sitze aus kristallklarem Eis.",
    "ja": "レヴィ中心部から7kmのアイスキャッスル。アイスチャペル、アイスバー、アイススイートがひとつの敷地に。壁も席も透き通った氷でできており、祭壇は青く照らされます。",
    "es": "El castillo de hielo propio de Levi, con capilla, bar y suites de hielo. Paredes y asientos de hielo cristalino.",
    "pt-BR": "O castelo de gelo de Levi, com capela, bar e suítes de gelo. Paredes e assentos de gelo cristalino.",
    "zh-CN": "莱维自有的冰雪城堡，距莱维中心7公里。可容纳50人的冰礼拜堂、冰吧和可过夜的冰套房都集于一处。墙壁与座椅由晶莹剔透的冰打造，祭坛以蓝光点亮。",
    "ko": "레비 중심부에서 7km 떨어진 자체 아이스 캐슬. 아이스 채플, 아이스 바, 아이스 스위트가 한곳에 모여 있습니다. 벽과 좌석은 투명한 얼음으로 만들어졌고 제단은 파란빛으로 밝힙니다.",
    "fr": "Le château de glace de Levi, avec chapelle, bar et suites de glace. Murs et sièges taillés dans une glace cristalline.",
    "it": "Il castello di ghiaccio di Levi con cappella, bar e suite di ghiaccio. Pareti e sedute in ghiaccio cristallino.",
    "nl": "Levi's eigen ijskasteel met kapel, bar en ijssuites. Wanden en zitplaatsen van kristalhelder ijs.",
    "sv": "Levis eget isslott med kapell, bar och issviter. Väggar och sittplatser av kristallklar is."
  },
  "levi-panorama": {
    "en": "Lapland Hotels flagship on Levi fell summit. Panorama windows, gondola access.",
    "fi": "Lapland Hotels -lippulaiva Levitunturin huipulla. Panoraamaikkunat, gondolihissi.",
    "de": "Flaggschiff von Lapland Hotels auf dem Gipfel des Levi-Fjells. Panoramafenster, Zugang mit der Gondelbahn.",
    "ja": "フェルの頂上にあるLapland Hotelsのレヴィ・フラッグシップ。宴会場のパノラマ窓からレヴィの山並みとライニオのSnow Villageを360°見渡せます。ゴンドラでアクセスします。",
    "es": "Buque insignia de Lapland Hotels en la cima del fell de Levi. Ventanales panorámicos, acceso en góndola.",
    "pt-BR": "O carro-chefe da Lapland Hotels no cume do monte Levi. Janelas panorâmicas, acesso por gôndola.",
    "zh-CN": "Lapland Hotels在莱维的旗舰酒店，坐落山丘之巅。宴会厅的全景落地窗可360°饱览莱维山峦与莱尼奥Snow Village。乘缆车抵达。",
    "ko": "펠 정상에 자리한 Lapland Hotels의 레비 플래그십. 연회장의 파노라마 창에서 레비 펠과 라이니오 Snow Village를 360° 조망할 수 있습니다. 곤돌라로 이동합니다.",
    "fr": "Le navire amiral de Lapland Hotels au sommet du fjäll de Levi. Fenêtres panoramiques, accès par télécabine.",
    "it": "L’ammiraglia di Lapland Hotels sulla cima del fjäll di Levi. Vetrate panoramiche, accesso in cabinovia.",
    "nl": "Het vlaggenschip van Lapland Hotels op de top van de Levi-fjäll. Panoramaramen, bereikbaar met de gondelbaan.",
    "sv": "Lapland Hotels flaggskepp på Levifjällets topp. Panoramafönster, gondolförbindelse."
  },
  "levin-iglut": {
    "en": "Glass igloos on top of the Levi fell: an unobstructed aurora viewing angle, Suite igloos for couples.",
    "fi": "Lasi-iglut Levitunturin huipulla: Lapin paras revontulinkulma, Suite-iglut pareille.",
    "de": "Glasiglus auf dem Gipfel des Levi-Fjells: der beste Blickwinkel auf die Polarlichter in Lappland, Suite-Iglus für Paare.",
    "ja": "レヴィのフェルの頂上に建つグラスイグルーは、ラップランド屈指のオーロラビューを誇ります。Superior 23m²、Suite 53m²、Northern Lights House（最大6名）。挙式後のハネムーン・イグルー宿泊に最適です。",
    "es": "Iglús de cristal en la cima del fell de Levi: el mejor ángulo de Laponia para ver la aurora boreal, iglús Suite para parejas.",
    "pt-BR": "Iglus de vidro no alto do monte Levi: o melhor ângulo para ver a aurora na Lapônia, iglus Suite para casais.",
    "zh-CN": "坐落于莱维山丘之巅的玻璃冰屋，拥有拉普兰最佳极光视野之一。Superior 23平方米、Suite 53平方米及Northern Lights House（最多6人）。最适合婚礼后入住的蜜月穹顶之夜。",
    "ko": "레비 펠(구릉) 정상에 자리한 글래스 이글루는 라플란드 최고의 오로라 전망을 자랑합니다. Superior 23m², Suite 53m², Northern Lights House(최대 6명). 예식 후 허니문 이글루 숙박에 안성맞춤입니다.",
    "fr": "Igloos de verre au sommet du fjäll de Levi : le meilleur angle d’observation des aurores en Laponie, igloos Suite pour les couples.",
    "it": "Igloo di vetro in cima al fjäll di Levi: la migliore angolazione della Lapponia per osservare l’aurora, igloo Suite per le coppie.",
    "nl": "Glazen iglo's op de top van de Levi-fjäll: de beste kijkhoek op het noorderlicht in Lapland, Suite-iglo's voor stellen.",
    "sv": "Glasigloor på toppen av Levifjället: Lapplands bästa vinkel för norrsken, Suite-iglor för par."
  },
  "northern-lights-ranch": {
    "en": "Premium luxury resort with glass-walled cabins and a Snow Chapel for 60 guests.",
    "fi": "Premium-tason resortti Köngäksessä: lasiseinämökit ja 60 hengen lumikappeli.",
    "de": "Premium-Luxusresort mit verglasten Hütten und einer Snow Chapel für 60 Gäste.",
    "ja": "レヴィ中心部から車で約15分、ケンガスにあるプレミアムリゾート。ガラス張りのキャビンと60名収容のスノーチャペルが同じ敷地内にあり、挙式も披露宴も宿泊もすべて歩いて移動できます。",
    "es": "Resort de lujo premium con cabañas de paredes de cristal y una Snow Chapel para 60 invitados.",
    "pt-BR": "Resort de luxo premium com cabanas de paredes de vidro e uma Snow Chapel para 60 convidados.",
    "zh-CN": "位于科恩耶斯的高端度假村，距莱维中心约 15 分钟车程。玻璃幕墙木屋与可容纳 60 人的雪教堂同在一处园区，仪式、宴会与住宿之间步行即可往来。",
    "ko": "레비 중심가에서 차로 약 15분 거리, 쾽개스에 자리한 프리미엄 리조트입니다. 유리 벽 캐빈과 60명 규모의 스노우 채플이 같은 부지에 있어 예식과 피로연, 숙박이 모두 걸어서 오갈 수 있는 거리에 있습니다.",
    "fr": "Resort de luxe premium avec chalets aux parois vitrées et une Snow Chapel pour 60 personnes.",
    "it": "Resort di lusso premium con chalet dalle pareti di vetro e una Snow Chapel per 60 ospiti.",
    "nl": "Premium luxeresort met hutten met glazen wanden en een Snow Chapel voor 60 gasten.",
    "sv": "Premiumresort i lyxklass med stugor med glasväggar och ett Snow Chapel för 60 gäster."
  },
  "northern-lights-village-levi": {
    "en": "Opened 2019: the Levi sister property of the Saariselkä village. For couples who want the NLV style close to Levi services.",
    "fi": "NLV-tyyli Levin palveluiden lähellä: Aurora-mökit, 5 min Levin keskustaan.",
    "de": "NLV-Stil nahe den Services von Levi: Aurora Cabins, 5 min bis ins Zentrum von Levi.",
    "ja": "2019年オープン、サーリセルカ姉妹施設のレヴィ拠点。客室はAurora Cabinで、レヴィ中心部まで5分。レヴィのサービスの近くでNLVスタイルを楽しみたいカップルに最適です。",
    "es": "El estilo NLV cerca de los servicios de Levi: Aurora Cabins, a 5 min del centro de Levi.",
    "pt-BR": "O estilo NLV perto dos serviços de Levi: Aurora Cabins, 5 min do centro de Levi.",
    "zh-CN": "2019年开业，是萨利色尔卡同名度假村在莱维的姊妹酒店。住宿为Aurora Cabin极光木屋，距莱维中心5分钟，适合想在莱维各项服务附近体验NLV风格的新人。",
    "ko": "Levi의 편의시설 가까이에서 누리는 Northern Lights Village 특유의 분위기. Aurora Cabins, Levi 중심가까지 5분.",
    "fr": "Le style NLV près des services de Levi : Aurora Cabins, 5 min du centre de Levi.",
    "it": "Lo stile NLV vicino ai servizi di Levi: Aurora Cabins, 5 min dal centro di Levi.",
    "nl": "NLV-stijl vlak bij de voorzieningen van Levi: Aurora Cabins, 5 min naar het centrum van Levi.",
    "sv": "Öppnade 2019 och är systeranläggningen till Saariselkä, här i Levi. För par som vill ha NLV-stilen nära Levis service."
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
    "en": "A compact, modern boutique hotel in Santa Claus Village. Best for small wedding parties wanting central location and contemporary design.",
    "fi": "Joulupukin pajakylän kompakti, moderni boutique-hotelli. Sopii pienille hääseurueille, jotka haluavat keskeisen sijainnin ja modernin sisustuksen.",
    "de": "Ein kompaktes, modernes Boutique-Hotel im Weihnachtsmanndorf. Ideal für kleine Hochzeitsgesellschaften, die zentrale Lage und zeitgemäßes Design wünschen.",
    "ja": "サンタクロース村にあるコンパクトでモダンなブティックホテル。挙式はロビーレストランやスイートのテラスで行えます。中心立地とモダンな内装を求める少人数の結婚式に最適です。",
    "es": "Un hotel boutique compacto y moderno en el Pueblo de Papá Noel. Ideal para pequeños grupos de boda que buscan una ubicación céntrica y un diseño contemporáneo.",
    "pt-BR": "Um hotel boutique compacto e moderno na Vila do Papai Noel. Ideal para pequenos grupos de casamento que buscam localização central e design contemporâneo.",
    "zh-CN": "罗瓦涅米圣诞老人村内一家小巧现代的精品酒店，全年开放，可接待2至30位宾客。婚礼可在大堂餐厅或套房露台举行，适合追求中心地段与现代设计的小型婚礼团队。",
    "ko": "산타클로스 마을에 자리한 아담하고 모던한 부티크 호텔. 중심 위치와 현대적 디자인을 원하는 소규모 웨딩 일행에게 가장 적합합니다.",
    "fr": "Un hôtel-boutique compact et moderne dans le Village du Père Noël. Idéal pour les petits groupes cherchant un emplacement central et un design contemporain.",
    "it": "Un boutique hotel compatto e moderno nel Villaggio di Babbo Natale, ideale per piccoli gruppi di nozze che cercano una posizione centrale e un design attuale.",
    "nl": "Een compact, modern boutiquehotel in het Kerstmandorp. Ideaal voor kleine bruiloftsgezelschappen die een centrale ligging en eigentijds design willen.",
    "sv": "Ett kompakt, modernt boutiquehotell i Jultomtens by. Bäst för små bröllopssällskap som vill ha centralt läge och modern design."
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
    "en": "An internationally known Snow Village, rebuilt every winter with a new artistic theme. Ice chapel, wooden chapel, snow suites.",
    "fi": "Maailmankuulu Snow Village, uusi taideteema joka talvi. Jääkappeli, puukappeli, lumisviittejä.",
    "de": "International bekanntes Snow Village, jeden Winter mit neuem Kunstthema neu gebaut. Eiskapelle, Holzkapelle, Snow Suites.",
    "ja": "国際的に知られるSnow Villageは毎年11月から4月にかけて建設されます。アイスチャペルは毎冬異なる芸術的テーマで造られ、氷で彫られたバージンロードを歩み、花嫁はトナカイのソリで到着します。",
    "es": "El Snow Village, conocido internacionalmente, reconstruido cada invierno con un nuevo tema artístico. Capilla de hielo, capilla de madera y snow suites.",
    "pt-BR": "A Snow Village, conhecida internacionalmente, reconstruída a cada inverno com um novo tema artístico. Capela de gelo, capela de madeira, suítes de neve.",
    "zh-CN": "国际知名的Snow Village每年11月至次年4月重建。冰礼拜堂每年冬季以全新的艺术主题打造，沿着冰雕走道前行，新娘乘驯鹿雪橇登场。冰礼拜堂与木礼拜堂仪式皆可举办。",
    "ko": "겨울마다 새로운 예술 테마로 다시 짓는 국제적으로 알려진 Snow Village. 얼음 예배당, 목조 예배당, 스노우 스위트.",
    "fr": "Snow Village de renommée internationale, reconstruit chaque hiver sur un nouveau thème artistique. Chapelle de glace, chapelle en bois, suites de neige.",
    "it": "Snow Village di fama internazionale, ricostruito ogni inverno con un nuovo tema artistico. Cappella di ghiaccio, cappella in legno, snow suite.",
    "nl": "Internationaal bekend Snow Village dat elke winter opnieuw wordt gebouwd met een nieuw kunstthema. IJskapel, houten kapel, snowsuites.",
    "sv": "Internationellt kända Snow Village byggs om varje vinter med ett nytt konstnärligt tema. Iskapell, träkapell, snösviter."
  },
  "tundrea-kilpisjarvi": {
    "en": "Glass-roof igloos on a lakeshore in Finland’s far north-western corner, 480 m above sea level: one of the best aurora views in Lapland.",
    "fi": "Lasikattoiset iglut järvenrannalla Suomen luoteisimmassa kolkassa, 480 m mpy: yksi Lapin parhaista revontulinäkymistä.",
    "de": "Iglus mit Glasdach am Seeufer im äußersten Nordwesten Finnlands, 480 m über dem Meer: einer der besten Polarlichtblicke Lapplands.",
    "ja": "フェルに囲まれた湖畔に建つ、ガラス屋根のイグルー。フィンランド北西端に位置します。標高480mのキルピスヤルヴィは、ラップランドでも有数のオーロラビューを誇ります。",
    "es": "Iglús con techo de cristal a orillas de un lago, en el extremo noroeste de Finlandia y a 480 m de altitud: una de las mejores vistas de auroras de Laponia.",
    "pt-BR": "Iglus com teto de vidro à beira de um lago no extremo noroeste da Finlândia, a 480 m acima do nível do mar: uma das melhores vistas de aurora da Lapônia.",
    "zh-CN": "群山环抱的湖畔玻璃冰屋，位于芬兰西北端。基尔皮斯耶尔维海拔480米，是拉普兰观赏极光最好的地点之一。最适合追求冒险私奔婚礼的新人。邻近三国交界界碑。",
    "ko": "펠로 둘러싸인 호숫가에 자리한 유리 지붕 이글루로, 핀란드 북서쪽 끝에 있습니다. 해발 480m의 킬피스야르비는 라플란드에서 손꼽히는 오로라 전망을 자랑합니다. 어드벤처 엘로프먼트 커플에게 가장 적합합니다.",
    "fr": "Des igloos à toit de verre au bord d’un lac à l’extrême nord-ouest de la Finlande, à 480 m d’altitude : l’une des plus belles vues sur les aurores de Laponie.",
    "it": "Igloo con tetto in vetro in riva a un lago, all’estremo nord-ovest della Finlandia e a 480 m di quota: una delle migliori viste sull’aurora della Lapponia.",
    "nl": "Iglo's met glazen dak aan een meer in het uiterste noordwesten van Finland, 480 m boven zeeniveau: een van de beste noorderlichtzichten van Lapland.",
    "sv": "Iglor med glastak vid en sjöstrand i Finlands nordvästligaste hörn, 480 m över havet: en av Lapplands bästa norrskensvyer."
  },
  "wilderness-hotel-inari": {
    "en": "On Lake Inari shore in the heart of Sámi culture. Aurora cabins with direct lake horizon view.",
    "fi": "Inarinjärven rannalla, saamelaiskulttuurin sydämessä. Aurora-mökit suoraan järven horisonttiin.",
    "de": "Am Ufer des Inarisees, im Herzen der samischen Kultur. Aurora-Hütten mit direktem Blick auf den Seehorizont.",
    "ja": "イナリ湖のほとり、サーミ文化の中心地に位置します。湖畔のオーロラキャビンからは、湖の向こうの地平線まで見渡せます。デスティネーションウェディングを望むカップルにとって唯一無二のロケーションです。",
    "es": "A orillas del lago Inari, en el corazón de la cultura sami. Cabañas Aurora con vistas directas al horizonte del lago.",
    "pt-BR": "À beira do lago Inari, no coração da cultura sámi. Cabanas Aurora com vista direta para o horizonte do lago.",
    "zh-CN": "坐落于伊纳里湖畔，萨米文化的中心地带。湖畔的极光木屋可直接眺望湖面直至天际，婚礼可在主楼餐厅或湖畔平台举行。是目的地婚礼新人独一无二的选择。",
    "ko": "이나리 호숫가, 사미 문화의 중심에 자리합니다. 호숫가의 오로라 캐빈에서는 호수 너머 지평선까지 한눈에 들어옵니다. 데스티네이션 웨딩 커플에게 더없이 특별한 장소입니다.",
    "fr": "Au bord du lac Inari, au cœur de la culture sami. Chalets Aurora avec vue directe sur l’horizon du lac.",
    "it": "Sulle rive del lago Inari, nel cuore della cultura sámi. Cabine Aurora con vista diretta sull’orizzonte del lago.",
    "nl": "Aan het Inarimeer, in het hart van de Samische cultuur. Aurora-hutten met direct zicht op de horizon van het meer.",
    "sv": "Vid Enaresjöns strand, mitt i den samiska kulturen. Aurora-stugor med fri sikt mot sjöhorisonten."
  },
  "wilderness-hotel-juutua": {
    "en": "Newest Wilderness Hotels venue (2022). Aanaar Restaurant in central Inari, walking distance to lake.",
    "fi": "Uusin Wilderness Hotels -kohde (2022). Aanaar-ravintola Inarin keskustassa, kävelymatka järvelle.",
    "de": "Das neueste Haus von Wilderness Hotels (2022). Restaurant Aanaar im Zentrum von Inari, zu Fuß zum See.",
    "ja": "2022年オープン、Wilderness Hotelsの最新拠点。イナリ中心部にAanaarレストランがあります。サーミ文化が身近で、コンパクトな立地を望むカップルに最適です。",
    "es": "El establecimiento más nuevo de Wilderness Hotels (2022). Restaurante Aanaar en el centro de Inari, a poca distancia a pie del lago.",
    "pt-BR": "O endereço mais novo da Wilderness Hotels (2022). Restaurante Aanaar no centro de Inari, a poucos passos do lago.",
    "zh-CN": "2022年开业，是Wilderness Hotels旗下最新的场地。Aanaar餐厅位于伊纳里中心，步行即可到湖边。适合希望靠近萨米文化、地点集中的新人。",
    "ko": "Wilderness Hotels의 가장 새로운 곳(2022년). Inari 중심가의 Aanaar 레스토랑, 호수까지 걸어갈 수 있는 거리.",
    "fr": "Le plus récent établissement Wilderness Hotels (2022). Restaurant Aanaar dans le centre d’Inari, lac accessible à pied.",
    "it": "La struttura più recente di Wilderness Hotels (2022). Ristorante Aanaar nel centro di Inari, lago raggiungibile a piedi.",
    "nl": "De nieuwste locatie van Wilderness Hotels (2022). Restaurant Aanaar in het centrum van Inari, op loopafstand van het meer.",
    "sv": "Wilderness Hotels nyaste anläggning (2022). Restaurang Aanaar i centrala Inari, gångavstånd till sjön."
  },
  "wilderness-hotel-muotka": {
    "en": "Zero light pollution: one of Lapland’s best aurora locations. Aurora Cabins and Kammi cabin.",
    "fi": "Ei valosaastetta: Lapin parhaita revontulipaikkoja. Aurora Cabins ja Kammi-mökki.",
    "de": "Keine Lichtverschmutzung: einer der besten Polarlichtorte Lapplands. Aurora Cabins und Kammi-Hütte.",
    "ja": "ウルホ・ケッコネン国立公園の端に位置し、光害がない、ラップランド屈指のオーロラスポット。Aurora CabinとKammiキャビンは初夜に最適です。小規模ながら上質な、親密な結婚式向けの会場です。",
    "es": "Cero contaminación lumínica: uno de los mejores lugares de Laponia para ver la aurora boreal. Aurora Cabins y cabaña Kammi.",
    "pt-BR": "Zero poluição luminosa: um dos melhores lugares para ver a aurora na Lapônia. Aurora Cabins e cabana Kammi.",
    "zh-CN": "位于乌尔霍·凯科宁国家公园边缘，毫无光污染，拉普兰最佳极光地点之一。Aurora Cabin与Kammi木屋是新婚之夜的理想之选。这是一处小巧而高品质的亲密婚礼场地。",
    "ko": "우르호 케코넨 국립공원 경계에 위치해 빛 공해가 없는, 라플란드 최고의 오로라 명소 중 하나입니다. Aurora Cabin과 Kammi 캐빈은 첫날밤에 안성맞춤입니다. 작지만 품격 있는 프라이빗 웨딩 예식장입니다.",
    "fr": "Aucune pollution lumineuse : l’un des meilleurs sites à aurores de Laponie. Aurora Cabins et chalet Kammi.",
    "it": "Zero inquinamento luminoso: uno dei luoghi migliori della Lapponia per l’aurora. Aurora Cabins e capanna Kammi.",
    "nl": "Geen lichtvervuiling: een van de beste noorderlichtplekken van Lapland. Aurora Cabins en de Kammi-hut.",
    "sv": "Noll ljusföroreningar: en av Lapplands bästa norrskensplatser. Aurora Cabins och Kammi-stuga."
  }
};
