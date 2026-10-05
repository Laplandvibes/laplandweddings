/**
 * Location pages (/locations/<slug>): meta description per slug and locale. ONE source:
 * scripts/prerender-meta.mjs writes the prerendered HTML from this object and pages/LocationPage.tsx
 * renders the same value in the browser (gate:meta-hydraatio in lv-ops).
 *
 * Until 2026-10-05 the browser built the description from the page prose (intro cut at 160 characters, often mid-word),
 * while the prerenderer used the hand-written meta blurb from route-i18n.json, in ja/zh-CN extended with the page prose and a highlight list:
 * different text on 91 of 96 pages. The values here are those prerendered (published) texts; where the published one broke
 * off mid-sentence or carried a loose word list after a stray space, it was rewritten from the same facts
 * in the page's own language.
 *
 * Each description is at least 70 characters and at most 160 characters / 200 width units, so neither
 * longDesc() nor clampDescription() in the prerenderer changes it; prerender-meta.mjs fails the build if it
 * would. The page prose (src/data) stays the page's own text and is not a meta source.
 *
 * Plain ESM (.mjs) for Node 20 in CI. Types in the .d.mts next to this file.
 */
export const LOCATION_DESCRIPTION = {
  "kemijarvi": {
    "en": "Finland’s northernmost town, in eastern Lapland: a centre wrapped in lake, 7,029 residents, and a direct train from Helsinki.",
    "fi": "Suomen pohjoisin kaupunki Itä-Lapissa: järven ympäröimä keskusta, 7 029 asukasta ja suora junayhteys Helsingistä. Viisi tunturia ajomatkan päässä.",
    "de": "Finnlands nördlichste Stadt, in Ostlappland: ein vom See umschlossenes Zentrum, 7.029 Einwohner und eine direkte Zugverbindung aus Helsinki.",
    "ja": "東ラップランドにあるフィンランド最北の市：湖に囲まれた中心街、7,029人の住民、そしてHelsinkiからの直通列車。車で行ける距離に5つのフェル。",
    "es": "La ciudad más septentrional de Finlandia, en el este de Laponia: un centro rodeado por el lago, 7029 habitantes y un tren directo desde Helsinki.",
    "pt-BR": "A cidade mais setentrional da Finlândia, no leste da Lapônia: um centro cercado pelo lago, 7.029 habitantes e um trem direto de Helsinque.",
    "zh-CN": "芬兰最北的城镇，位于东拉普兰，大部分在北极圈以北。市中心被凯米耶尔维湖环抱，芬兰最大的河流凯米河从旁流过。人口 7,029 人（2023年12月31日），与罗瓦涅米或莱维完全不是一个量级，没有人为了热闹而来这里。",
    "ko": "동부 라플란드에 있는 핀란드 최북단 도시. 호수가 감싸는 도심, 인구 7,029명, Helsinki에서 오는 직통 열차. 차로 갈 수 있는 거리에 펠 다섯 곳이 있습니다.",
    "fr": "La ville la plus septentrionale de Finlande, en Laponie orientale : un centre entouré par le lac, 7 029 habitants et un train direct depuis Helsinki.",
    "it": "La città più settentrionale della Finlandia, nella Lapponia orientale: un centro circondato dal lago, 7.029 abitanti e un treno diretto da Helsinki.",
    "nl": "De noordelijkste stad van Finland, in Oost-Lapland: een centrum omsloten door het meer, 7.029 inwoners en een directe trein vanuit Helsinki.",
    "sv": "Finlands nordligaste stad, i östra Lappland: ett centrum omslutet av sjön, 7 029 invånare och direkttåg från Helsingfors. Fem fjäll inom bilavstånd."
  },
  "kilpisjarvi": {
    "en": "Finland’s highest ground, in its far north-western corner: Tundrea’s glass igloos and the three-country border ceremony.",
    "fi": "Suomen korkeimmat maastot maan luoteiskolkassa: Tundrean lasi-iglut ja kolmen valtakunnan rajavihkiminen.",
    "de": "Finnlands höchstes Gelände in der äußersten Nordwestecke des Landes: die Glasiglus von Tundrea und die Trauung am Dreiländereck.",
    "ja": "国の北西端にあるフィンランド最高地点で、フェルの上に広がるラップランド屈指のオーロラビューを誇ります。Tundrea Igloosは湖畔にガラス屋根のキャビンを提供します。",
    "es": "El terreno más alto de Finlandia, en su extremo noroccidental: los iglús de cristal de Tundrea y la ceremonia en la frontera de los tres países.",
    "pt-BR": "O terreno mais alto da Finlândia, no extremo noroeste do país: os iglus de vidro do Tundrea e a cerimônia no marco das três fronteiras.",
    "zh-CN": "位于芬兰西北角的全国海拔最高之地，可在群山之上饱览拉普兰数一数二的极光景观。Tundrea Igloos在湖畔提供玻璃屋顶木屋。三国交界处的婚礼：宣读誓言的那一刻，你们同时站在芬兰、挪威和瑞典。",
    "ko": "핀란드 북서쪽 끝에 있는 최고 고도 지대로, 펠 위로 펼쳐지는 라플란드 최고 수준의 오로라 전망을 자랑합니다. Tundrea Igloos는 호숫가에 유리 지붕 캐빈을 제공합니다.",
    "fr": "Les plus hautes terres de Finlande, dans l'extrême nord-ouest du pays : les igloos de verre de Tundrea et la cérémonie à la borne des trois pays.",
    "it": "Il terreno più alto della Finlandia, nell’estremo angolo nord-occidentale: gli igloo di vetro di Tundrea e la cerimonia al confine dei tre Paesi.",
    "nl": "De hoogste grond van Finland, in de uiterste noordwesthoek: de glazen iglo’s van Tundrea en de huwelijksceremonie op het drielandenpunt.",
    "sv": "Finlands högsta terräng, i landets nordvästligaste hörn: Tundreas glasigloor och vigsel vid treriksröset."
  },
  "levi": {
    "en": "Finland’s largest fell resort: Lainio Snow Village, Northern Lights Ranch Snow Chapel, direct flights from London.",
    "fi": "Suomen suurin tunturikeskus: Lainion lumikylä, Northern Lights Ranchin lumikappeli, suorat lennot Lontoosta.",
    "de": "Finnlands größtes Fjellresort: Lainio Snow Village, die Snow Chapel der Northern Lights Ranch, Direktflüge aus London.",
    "ja": "フィンランド最大のフェルリゾート：Lainio Snow Village、Northern Lights RanchのSnow Chapel、ロンドンからの直行便。",
    "es": "El mayor centro turístico de montaña de Finlandia: Lainio Snow Village, la Snow Chapel de Northern Lights Ranch y vuelos directos desde Londres.",
    "pt-BR": "O maior centro turístico de monte da Finlândia: Lainio Snow Village, a Snow Chapel do Northern Lights Ranch, voos diretos de Londres.",
    "zh-CN": "芬兰最大的丘陵度假中心：Lainio Snow Village、Northern Lights Ranch 的 Snow Chapel，以及从伦敦出发的直飞航班。",
    "ko": "핀란드 최대의 펠 리조트. Lainio Snow Village, Northern Lights Ranch의 Snow Chapel, 런던 직항편.",
    "fr": "La plus grande station de fjäll de Finlande : Lainio Snow Village, la Snow Chapel du Northern Lights Ranch, vols directs depuis Londres.",
    "it": "Il più grande centro turistico di fjäll della Finlandia: Lainio Snow Village, la Snow Chapel di Northern Lights Ranch, voli diretti da Londra.",
    "nl": "Finlands grootste fjällresort: Lainio Snow Village, de Snow Chapel van Northern Lights Ranch, directe vluchten vanuit Londen.",
    "sv": "Finlands största fjällort: Lainio Snow Village, Northern Lights Ranch Snow Chapel, direktflyg från London."
  },
  "oulu": {
    "en": "The big-city option on the way to Lapland, Finland’s fifth-largest city on the Bothnian Bay coast.",
    "fi": "Kaupunkivaihtoehto matkalla Lappiin, Suomen viidenneksi suurin kaupunki Perämeren rannalla.",
    "de": "Die Großstadt-Option auf dem Weg nach Lappland, Finnlands fünftgrößte Stadt an der Küste der Bottenwiek.",
    "ja": "ラップランドへ向かう途中の都市型の選択肢。Perämeri沿岸にある、フィンランドで5番目に大きい都市です。レストランとナイトライフのある都会的なウェディングの夜、Helsinkiから直行便で約1時間。",
    "es": "La opción de gran ciudad camino de Laponia, la quinta ciudad más grande de Finlandia, en la costa de la bahía de Botnia.",
    "pt-BR": "A opção de cidade grande no caminho para a Lapônia, a quinta maior cidade da Finlândia, no litoral da Baía de Bótnia.",
    "zh-CN": "严格来说，奥卢属于北博滕区而非拉普兰。这座芬兰第五大城市位于波的尼亚湾沿岸，适合想要都市式新婚之夜的新人：餐厅与夜生活一应俱全，从赫尔辛基直飞约一小时。",
    "ko": "라플란드로 가는 길목의 대도시 선택지입니다. Perämeri 연안에 자리한 핀란드에서 다섯 번째로 큰 도시로, 레스토랑과 나이트라이프가 어우러진 도심 결혼식이 가능합니다. Helsinki에서 직항으로 약 1시간.",
    "fr": "L’option grande ville sur la route de la Laponie, cinquième ville de Finlande, au bord de la baie de Botnie.",
    "it": "L’alternativa cittadina sulla strada per la Lapponia, la quinta città più grande della Finlandia sulla costa della Baia di Botnia.",
    "nl": "De grotestadsoptie op weg naar Lapland, de op vier na grootste stad van Finland aan de kust van de Bottenwijk.",
    "sv": "Storstadsalternativet på vägen till Lappland, Finlands femte största stad vid Bottenvikens kust."
  },
  "pyha-luosto": {
    "en": "The quieter side of eastern Lapland: two hotels in the Luosto log village on the edge of Pyhä-Luosto National Park.",
    "fi": "Itä-Lapin hiljaisempi puoli: kaksi hotellia Luoston hirsikylässä Pyhä-Luoston kansallispuiston laidalla.",
    "de": "Die ruhigere Seite Ostlapplands: zwei Hotels im Blockhausdorf Luosto am Rand des Nationalparks Pyhä-Luosto.",
    "ja": "東ラップランドの静かな一角。ルオストのログハウス村には国立公園の縁に2軒のホテルが建ち、その上のフェルにはランピヴァーラのアメジスト鉱山があります。",
    "es": "El lado más tranquilo del este de Laponia: dos hoteles en el pueblo de troncos de Luosto, al borde del Parque Nacional Pyhä-Luosto.",
    "pt-BR": "O lado mais tranquilo do leste da Lapônia: dois hotéis na vila de casas de troncos de Luosto, na borda do Parque Nacional Pyhä-Luosto.",
    "zh-CN": "东拉普兰更为静谧的一隅。卢奥斯托木屋村在皮哈-卢奥斯托国家公园边缘有两家酒店，上方山丘则是兰皮瓦拉紫水晶矿场。这里既适合观星，也适合欣赏极光。",
    "ko": "동부 라플란드의 조용한 쪽. 루오스토 통나무 마을에는 국립공원 가장자리에 호텔 두 곳이 있고, 위쪽 펠에는 람피바라 자수정 광산이 있습니다.",
    "fr": "Le versant plus calme de la Laponie orientale : deux hôtels dans le village de rondins de Luosto, en bordure du parc national de Pyhä-Luosto.",
    "it": "Il lato più tranquillo della Lapponia orientale: due hotel nel villaggio di case in legno di Luosto, ai margini del Parco Nazionale Pyhä-Luosto.",
    "nl": "De rustigere kant van Oost-Lapland: twee hotels in het blokhutdorp Luosto aan de rand van Nationaal Park Pyhä-Luosto.",
    "sv": "Östra Lapplands lugnare sida: två hotell i Luostos timmerby vid kanten av Pyhä-Luosto nationalpark."
  },
  "rovaniemi": {
    "en": "The capital of Lapland, easiest to reach via international flights. Wedding venues from ice chapel to glass igloos near Santa Claus Village.",
    "fi": "Lapin pääkaupunki, helpoin saavuttaa kansainvälisen lennon kautta. Hääpaikkoja jääkappelista lasi-igluihin Joulupukin pajakylän tuntumassa.",
    "de": "Die Hauptstadt Lapplands, am einfachsten über internationale Flüge zu erreichen.",
    "ja": "ラップランドの州都で、国際線でもっとも行きやすい町。Santa Claus Village周辺には、氷のチャペルからグラスイグルーまでの挙式会場があります。",
    "es": "La capital de Laponia, la más fácil de alcanzar con vuelos internacionales.",
    "pt-BR": "A capital da Lapônia, a mais fácil de alcançar com voos internacionais. Locais de casamento da capela de gelo aos iglus de vidro perto da Vila do Papai Noel.",
    "zh-CN": "拉普兰首府，凭借国际机场成为最便捷的门户。圣诞老人村、Arctic SnowHotel的冰礼拜堂以及Apukka Resort的玻璃冰屋，让罗瓦涅米成为拉普兰最多元的婚礼目的地。",
    "ko": "라플란드의 주도이자 국제선으로 가장 쉽게 닿는 도시. 산타클로스 마을 인근에 얼음 예배당부터 글래스 이글루까지 결혼식 장소가 모여 있습니다.",
    "fr": "La capitale de la Laponie, facile d’accès en vol international. Lieux de mariage : de la chapelle de glace aux igloos de verre, près du Village du Père Noël.",
    "it": "La capitale della Lapponia, la più facile da raggiungere con i voli internazionali.",
    "nl": "De hoofdstad van Lapland, het makkelijkst te bereiken met internationale vluchten. Trouwlocaties van ijskapel tot glazen iglo's vlak bij Santa Claus Village.",
    "sv": "Lapplands huvudstad, enklast att nå med internationella flyg. Bröllopsplatser från iskapell till glasigloor nära Jultomtens by."
  },
  "saariselka": {
    "en": "The heart of Northern Lapland: aurora on average every other night (FMI) and Kakslauttanen’s glass teepee chapel.",
    "fi": "Pohjois-Lapin sydän: revontulia keskimäärin joka toisena yönä (Ilmatieteen laitos) ja Kakslauttasen lasi-teepee-kappeli.",
    "de": "Das Herz Nordlapplands: Polarlichter im Schnitt jede zweite Nacht (FMI) und die Glass-Teepee-Kapelle von Kakslauttanen.",
    "ja": "北ラップランドの中心地。フィンランド気象研究所によれば、この緯度では平均して二晩に一度オーロラが観測されます。カクスラウッタネンのグラスイグルーとアイスチャペルは、この地域で最も有名な結婚式会場。",
    "es": "El corazón del norte de Laponia: auroras boreales de media una de cada dos noches (FMI) y la capilla Glass Teepee de Kakslauttanen.",
    "pt-BR": "O coração do norte da Lapônia: aurora em média a cada duas noites (FMI) e a capela Glass Teepee de Kakslauttanen.",
    "zh-CN": "北拉普兰的核心地带。据芬兰气象研究所统计，在这一纬度平均每两晚可见一次极光。卡克斯劳塔宁的玻璃冰屋与冰礼拜堂是该地区最著名的婚礼场地。伊纳里湖为庆典增添了历史与萨米文化。",
    "ko": "북부 라플란드의 중심. 평균 이틀에 하루꼴로 오로라가 나타나며(FMI), Kakslauttanen의 Glass Teepee 예배당이 있습니다.",
    "fr": "Le cœur de la Laponie du Nord : des aurores en moyenne une nuit sur deux (FMI) et la chapelle Glass Teepee de Kakslauttanen.",
    "it": "Il cuore della Lapponia settentrionale: aurora in media una notte su due (FMI) e la cappella Glass Teepee di Kakslauttanen.",
    "nl": "Het hart van Noord-Lapland: gemiddeld om de nacht noorderlicht (FMI) en de Glass Teepee-kapel van Kakslauttanen.",
    "sv": "Norra Lapplands hjärta: norrsken i genomsnitt varannan natt (FMI) och Kakslauttanens Glass Teepee-kapell."
  },
  "yllas": {
    "en": "Quieter than Levi: Lapland’s cleanest air, Saaga’s wedding-friendly spa hotel, easy reach to Lainio Snow Village.",
    "fi": "Levin hiljaisempi naapuri: Lapin puhtainta ilmaa, Saagan häihin sopiva spa-hotelli, lyhyt matka Lainion lumikylään.",
    "de": "Ruhiger als Levi: die sauberste Luft Lapplands, das hochzeitstaugliche Spa-Hotel Saaga, kurzer Weg zum Lainio Snow Village.",
    "ja": "Leviより静かなエリア：ラップランドでもっとも澄んだ空気、挙式に向くSaagaのスパホテル、Lainio Snow Villageまでも近い距離。",
    "es": "Más tranquilo que Levi: el aire más limpio de Laponia, el hotel spa de Saaga apto para bodas y un trayecto corto hasta Lainio Snow Village.",
    "pt-BR": "Mais tranquilo que Levi: o ar mais puro da Lapônia, o spa-hotel do Saaga preparado para casamentos, fácil acesso ao Lainio Snow Village.",
    "zh-CN": "紧邻莱维的更宁静之选。Lapland Hotels Saaga在TripAdvisor上赢得了婚礼美誉，莱尼奥Snow Village则离于拉斯最近。适合向往山间宁静、不愿置身滑雪场喧嚣的新人。",
    "ko": "Levi보다 조용한 곳. 라플란드에서 가장 깨끗한 공기, 결혼식에 어울리는 Saaga의 스파 호텔, Lainio Snow Village까지 짧은 이동.",
    "fr": "Plus calme que Levi : l’air le plus pur de Laponie, l’hôtel spa Saaga adapté aux mariages, Lainio Snow Village à courte distance.",
    "it": "Più tranquilla di Levi: l’aria più pulita della Lapponia, lo spa hotel Saaga adatto ai matrimoni, Lainio Snow Village a breve distanza.",
    "nl": "Rustiger dan Levi: de schoonste lucht van Lapland, het bruiloftsvriendelijke spahotel Saaga, Lainio Snow Village binnen handbereik.",
    "sv": "Lugnare än Levi: Lapplands renaste luft, Saagas bröllopsvänliga spahotell, kort väg till Lainio Snow Village."
  }
};
