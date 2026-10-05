/**
 * Section and guide pages: <title> and meta description per locale. ONE source: scripts/prerender-meta.mjs
 * writes the prerendered HTML from this object and the pages (Home, Locations, WeddingTypesIndex, Venues,
 * Photographers, PracticalGuide, Contact, Pricing, Checklist) render the same values in the browser, so
 * Google, social cards and the browser tab show one text (gate:meta-hydraatio in lv-ops). Same pattern as
 * legalMeta.mjs.
 *
 * Until 2026-10-05 each page carried its own seoTitle/seoDesc and the prerenderer a hand-copied table: the
 * two disagreed on 78 of these 108 pages (title or description). The values here are the prerendered (published)
 * texts, except where the published one was wrong: /pricing kept the "from EUR 5,000" claim that the page
 * itself corrected on 2026-08-31 (a wedding with guests; an elopement for two starts at about EUR 1,600),
 * /venues said 21 venues in four languages (there are 20) and nl /wedding-types said seven types (there are six).
 *
 * Every description is 70-160 characters (a CJK character counts two: 100-200 width units), so the
 * prerenderer neither extends nor clamps it; prerender-meta.mjs fails the build if it would.
 *
 * Plain ESM (.mjs): scripts/prerender-meta.mjs runs under Node 20 in CI. Types: staticMeta.d.mts.
 */
export const STATIC_META = {
  "/": {
    "en": {
      "title": "Lapland Weddings: 20 Arctic Venues and What They Cost",
      "description": "An independent guide to getting married in Lapland: 20 venues, 8 regions, symbolic and legal ceremonies, real costs. We represent none of the venues."
    },
    "fi": {
      "title": "Häät Lapissa: 20 hääpaikkaa jääkappelista lasi-igluun",
      "description": "20 hääpaikkaa Lapissa: jääkappelit, lasi-iglut ja tunturihotellit. Hinnat, varausajat ja se, miten avioliiton esteiden tutkinta hoituu ulkomailta."
    },
    "de": {
      "title": "Hochzeit in Lappland: Locations & Heiratspapiere",
      "description": "Unabhängiger Leitfaden zum Heiraten in Lappland. 20 Hochzeitslocations, die nötigen Papiere, echte Preise und praktische Leitfäden."
    },
    "ja": {
      "title": "ラップランドの結婚式：会場と婚姻手続き",
      "description": "ラップランドでの結婚式を独立した立場でまとめたガイド。20か所の会場、婚姻手続き、実際の価格、実用的なガイド。"
    },
    "es": {
      "title": "Bodas en Laponia: lugares y trámites de boda",
      "description": "Una guía independiente para casarse en Laponia. 20 lugares, los trámites, precios reales y guías prácticas."
    },
    "pt-BR": {
      "title": "Casamentos na Lapônia: locais e documentação",
      "description": "Um guia independente para casar na Lapônia. 20 locais, a documentação, preços reais e guias práticos."
    },
    "zh-CN": {
      "title": "拉普兰婚礼：婚礼场地与结婚手续",
      "description": "一份独立的拉普兰婚礼指南。20 个场地、结婚手续、真实价格和实用指南。玻璃屋顶上方是极光，雪教堂里点着烛光，院子里有驯鹿在等候。"
    },
    "ko": {
      "title": "라플란드 결혼식: 예식장과 혼인 서류",
      "description": "라플란드 결혼식을 위한 독립적인 안내서입니다. 20곳의 예식장, 혼인 서류, 실제 가격과 실용적인 가이드."
    },
    "fr": {
      "title": "Mariage en Laponie : lieux, prix et démarches",
      "description": "Un guide indépendant pour se marier en Laponie. 20 lieux, les démarches, prix réels et guides pratiques."
    },
    "it": {
      "title": "Matrimonio in Lapponia: location e pratiche di nozze",
      "description": "Una guida indipendente per sposarsi in Lapponia. 20 location, le pratiche, prezzi reali e guide pratiche."
    },
    "nl": {
      "title": "Trouwen in Lapland: locaties en huwelijkspapieren",
      "description": "Een onafhankelijke gids voor trouwen in Lapland. 20 locaties, het papierwerk, echte prijzen en praktische gidsen."
    },
    "sv": {
      "title": "Bröllop i Lappland: vigselplatser och äktenskapspapper",
      "description": "En oberoende guide till att gifta sig i Lappland. 20 vigselplatser, vigselpapperen, verkliga priser och praktiska guider för ditt bröllop i Arktis."
    }
  },
  "/locations": {
    "en": {
      "title": "Lapland Wedding Regions: Rovaniemi, Levi, Saariselkä, Ylläs",
      "description": "Seven Lapland wedding regions plus city-option Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "fi": {
      "title": "Häät Lapin paikkakunnilla",
      "description": "Seitsemän Lapin häämatkakohdetta ja kaupunkivaihtoehto Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "de": {
      "title": "Hochzeitsregionen in Lappland",
      "description": "Sieben Hochzeitsregionen in Lappland plus die Stadt Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu. Saisons im Vergleich."
    },
    "ja": {
      "title": "ラップランドの結婚式地域：ロヴァニエミ、レヴィ、サーリセルカ、ユッラス",
      "description": "ラップランドの7つの結婚式地域＋都市の選択肢オウル：ロヴァニエミ、サーリセルカ、レヴィ、ユッラス、ピュハ・ルオスト、キルピスヤルヴィ、ケミヤルヴィ、オウル。季節、フライト、会場を比較。"
    },
    "es": {
      "title": "Regiones de boda en Laponia",
      "description": "Siete regiones de boda en Laponia más la opción urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "pt-BR": {
      "title": "Regiões de casamento na Lapônia",
      "description": "Sete regiões de casamento na Lapônia mais a opção urbana de Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "zh-CN": {
      "title": "拉普兰婚礼地区：罗瓦涅米、莱维、萨利色尔卡、于拉斯",
      "description": "拉普兰七大婚礼地区外加城市之选奥卢：罗瓦涅米、萨利色尔卡、莱维、于拉斯、皮哈-卢奥斯托、基尔皮斯耶尔维、凯米耶尔维、奥卢。比较季节、航班和场地。"
    },
    "ko": {
      "title": "라플란드 결혼식 지역: 로바니에미, 레비, 사리셀카, 윌래스",
      "description": "라플란드의 웨딩 지역 7곳과 도시 옵션 오울루: 로바니에미, 사리셀카, 레비, 윌래스, 퓌해-루오스토, 킬피스야르비, 케미야르비, 오울루. 시즌, 항공편, 웨딩 장소를 비교하세요."
    },
    "fr": {
      "title": "Régions de mariage en Laponie",
      "description": "Sept régions de mariage en Laponie plus Oulu, l’option urbaine : Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "it": {
      "title": "Regioni per matrimoni in Lapponia",
      "description": "Sette regioni per matrimoni in Lapponia più Oulu, l’opzione urbana: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "nl": {
      "title": "Bruiloftsregio’s in Lapland",
      "description": "Zeven bruiloftsregio’s in Lapland plus stadsoptie Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    },
    "sv": {
      "title": "Bröllopsregioner i Lappland",
      "description": "Sju bröllopsregioner i Lappland plus stadsalternativet Oulu: Rovaniemi, Saariselkä, Levi, Ylläs, Pyhä-Luosto, Kilpisjärvi, Kemijärvi, Oulu."
    }
  },
  "/wedding-types": {
    "en": {
      "title": "Lapland Wedding Types: Aurora, Snow Chapel, Glass Igloo",
      "description": "Six Lapland wedding types: Northern Lights, snow chapel, glass igloo, midnight sun, elopement, and vow renewal."
    },
    "fi": {
      "title": "Häätyypit Lapissa",
      "description": "Kuusi häätyyppiä Lapissa: revontuli, lumikappeli, lasi-iglu, keskiyön aurinko, elopement ja lupausten uusiminen."
    },
    "de": {
      "title": "Hochzeitsarten in Lappland",
      "description": "Sechs Hochzeitsarten in Lappland: Polarlicht-Hochzeit, Schneekapelle, Glasiglu, Mitternachtssonne, Elopement und Erneuerung des Eheversprechens."
    },
    "ja": {
      "title": "ラップランドの結婚式タイプ：オーロラ、雪の礼拝堂、グラスイグルー",
      "description": "ラップランドの6つの結婚式タイプ：オーロラ、雪の礼拝堂、グラスイグルー、白夜、エロープメント、誓いの更新。"
    },
    "es": {
      "title": "Tipos de boda en Laponia",
      "description": "Seis tipos de boda en Laponia: auroras boreales, capilla de nieve, iglú de cristal, sol de medianoche, fuga y renovación de votos."
    },
    "pt-BR": {
      "title": "Tipos de casamento na Lapônia",
      "description": "Seis tipos de casamento na Lapônia: aurora boreal, capela de neve, iglu de vidro, sol da meia-noite, elopement e renovação de votos."
    },
    "zh-CN": {
      "title": "拉普兰婚礼类型：北极光、雪教堂、玻璃冰屋",
      "description": "拉普兰六种婚礼类型：极光婚礼、雪礼拜堂婚礼、玻璃冰屋婚礼、午夜阳光婚礼、私奔婚礼和重申誓言。每种类型的页面都列出最佳季节、可容纳人数和适合的场地。"
    },
    "ko": {
      "title": "라플란드 결혼식 유형: 오로라, 스노우 채플, 글래스 이글루",
      "description": "라플란드의 결혼식 유형 6가지: 오로라, 스노우 채플, 글래스 이글루, 백야, 엘로프먼트(단둘만의 결혼식), 서약 갱신."
    },
    "fr": {
      "title": "Types de mariage en Laponie",
      "description": "Six types de mariage en Laponie : aurores boréales, chapelle de neige, igloo de verre, soleil de minuit, mariage à deux et renouvellement de vœux."
    },
    "it": {
      "title": "Tipi di matrimonio in Lapponia",
      "description": "Sei tipi di matrimonio in Lapponia: aurora boreale, cappella di neve, igloo di vetro, sole di mezzanotte, elopement e rinnovo delle promesse."
    },
    "nl": {
      "title": "Bruiloftstypes in Lapland",
      "description": "Zes bruiloftstypes in Lapland: noorderlicht, sneeuwkapel, glasiglo, middernachtzon, elopement en hernieuwing van de geloften."
    },
    "sv": {
      "title": "Bröllopstyper i Lappland",
      "description": "Sex bröllopstyper i Lappland: norrsken, snökapell, glasigloo, midnattssol, elopement och förnyade löften."
    }
  },
  "/venues": {
    "en": {
      "title": "Lapland Wedding Venues: 20 venues",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 20 Lapland wedding venues across the regions."
    },
    "fi": {
      "title": "Hääpaikat Lapissa",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. 20 hääpaikkaa Lapin paikkakunnilla."
    },
    "de": {
      "title": "Hochzeitslocations in Lappland",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village und viele mehr. 20 Hochzeitslocations in Lappland."
    },
    "ja": {
      "title": "ラップランドの結婚式会場：20か所",
      "description": "Kakslauttanen、Northern Lights Ranch、Arctic SnowHotel、Snow Villageなど。地域を横断する20か所の結婚式会場。"
    },
    "es": {
      "title": "Lugares para bodas en Laponia",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village y muchos más. 20 lugares de boda en las regiones de Laponia."
    },
    "pt-BR": {
      "title": "Locais para casamento na Lapônia",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e muitos outros. 20 locais de casamento nas regiões da Lapônia."
    },
    "zh-CN": {
      "title": "拉普兰婚礼场地：20 个场地",
      "description": "卡克斯劳塔宁、北极光牧场、北极雪酒店、雪村等。覆盖拉普兰各地区的 20 个婚礼场地，我们不代理其中任何一家。"
    },
    "ko": {
      "title": "라플란드 예식장 20곳",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village 외. 라플란드 전역에 걸친 20곳의 예식장입니다."
    },
    "fr": {
      "title": "Lieux de mariage en Laponie",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village et bien d’autres. 20 lieux de mariage dans toute la Laponie."
    },
    "it": {
      "title": "Location di matrimonio in Lapponia",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e molte altre. 20 location di matrimonio nelle regioni della Lapponia."
    },
    "nl": {
      "title": "Bruiloftslocaties in Lapland",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village en meer. 20 bruiloftslocaties in heel Lapland."
    },
    "sv": {
      "title": "Bröllopsplatser i Lappland",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village med flera. 20 bröllopsplatser i hela Lappland."
    }
  },
  "/photographers": {
    "en": {
      "title": "Wedding Photography in Lapland: Costs, Questions, Timing",
      "description": "What a wedding photographer costs in Lapland, four questions to ask before booking, and when the winter dates fill up."
    },
    "fi": {
      "title": "Hääkuvaus Lapissa: hinnat, kysymykset ja ajoitus",
      "description": "Mitä hääkuvaaja maksaa Lapissa, neljä kysymystä ennen varausta ja milloin talven päivät täyttyvät. Riippumaton opas, emme edusta yhtäkään kuvaajaa."
    },
    "de": {
      "title": "Hochzeitsfotografie in Lappland: Kosten, Fragen, Zeitplan",
      "description": "Was ein Hochzeitsfotograf in Lappland kostet, vier Fragen vor der Buchung und wann die Wintertermine voll sind."
    },
    "ja": {
      "title": "フィンランド・ラップランドでフォトウェディング：費用と準備",
      "description": "ラップランドの結婚式撮影の費用、予約前に確認したい4つの質問、冬の日程が埋まる時期。独立した立場のガイドで、特定のフォトグラファーを代理していません。"
    },
    "es": {
      "title": "Fotografía de boda en Laponia: costos, preguntas y fechas",
      "description": "Cuánto cuesta un fotógrafo de boda en Laponia, cuatro preguntas antes de reservar y cuándo se agotan las fechas de invierno."
    },
    "pt-BR": {
      "title": "Fotografia de casamento na Lapônia: custos, perguntas e datas",
      "description": "Quanto custa um fotógrafo de casamento na Lapônia, quatro perguntas antes de reservar e quando as datas de inverno esgotam."
    },
    "zh-CN": {
      "title": "拉普兰婚礼摄影：费用、问题与时间",
      "description": "拉普兰婚礼摄影师的费用、预订前要问的四个问题，以及冬季档期何时订满。这是一份独立指南，我们不代理任何一位摄影师。"
    },
    "ko": {
      "title": "라플란드 웨딩 촬영: 비용, 질문, 예약 시기",
      "description": "라플란드 웨딩 촬영 비용, 예약 전 확인할 네 가지 질문, 겨울 날짜가 마감되는 시기. 독립적인 안내서이며 어떤 포토그래퍼도 대리하지 않습니다."
    },
    "fr": {
      "title": "Photographe de mariage en Laponie : tarifs, questions, calendrier",
      "description": "Ce que coûte un photographe de mariage en Laponie, quatre questions à poser avant de réserver et quand les dates d’hiver se remplissent."
    },
    "it": {
      "title": "Fotografo di matrimonio in Lapponia: costi, domande, tempi",
      "description": "Quanto costa un fotografo di matrimonio in Lapponia, quattro domande da fare prima di prenotare e quando si esauriscono le date invernali."
    },
    "nl": {
      "title": "Trouwfotografie in Lapland: kosten, vragen, timing",
      "description": "Wat een trouwfotograaf in Lapland kost, vier vragen om te stellen voor u boekt en wanneer de winterdata vol raken."
    },
    "sv": {
      "title": "Bröllopsfotograf i Lappland: kostnad, frågor, tidpunkt",
      "description": "Vad en bröllopsfotograf kostar i Lappland, fyra frågor att ställa innan du bokar och när vinterdatumen tar slut. Oberoende guide, vi företräder ingen fotograf."
    }
  },
  "/practical-guide": {
    "en": {
      "title": "Getting Married in Lapland: Paperwork, Officiant, Witnesses",
      "description": "Practical guide for foreign couples: the examination of impediments (3–5 weeks), a civil officiant, two witnesses and registering the marriage at home."
    },
    "fi": {
      "title": "Avioliiton esteiden tutkinta ja vihkiminen Lapissa",
      "description": "Esteiden tutkinta (suomalaisille 1–2 viikkoa), DVV:n vihkijä Rovaniemellä, Inarissa, Kittilässä tai Sodankylässä, todistajat ja symbolinen vaihtoehto."
    },
    "de": {
      "title": "Heiraten in Lappland: Unterlagen & Trauredner",
      "description": "Praktischer Leitfaden für ausländische Paare: die Unterlagen, Ehefähigkeitsprüfung (3–5 Wochen), Trauzeugen, Trauredner, Registrierung im Heimatland."
    },
    "ja": {
      "title": "ラップランドで結婚：書類、婚姻執行者、実践ガイド",
      "description": "外国人カップルのための実践ガイド：必要書類、婚姻障害の調査（3〜5週間）、証人、婚姻執行者、母国での登録。"
    },
    "es": {
      "title": "Casarse en Laponia: los trámites",
      "description": "Guía práctica para parejas extranjeras: los trámites, examen de impedimentos (3-5 semanas), testigos, oficiante y registro en el país de origen."
    },
    "pt-BR": {
      "title": "Casar na Lapônia: a documentação",
      "description": "Guia prático para casais estrangeiros: a documentação, exame de impedimentos (3-5 semanas), testemunhas, celebrante e registro no país de origem."
    },
    "zh-CN": {
      "title": "在拉普兰结婚，文书、主婚人、实用指南",
      "description": "面向外籍新人的实用指南：所需文书、婚姻障碍审查（3–5周）、证婚人、主婚人、原籍国登记。结婚许可、文件、季节、航班以及客人住宿。"
    },
    "ko": {
      "title": "라플란드에서 결혼하기: 서류, 주례, 실용 가이드",
      "description": "외국인 커플을 위한 실용 가이드: 필요 서류, 혼인 요건 심사(3~5주), 증인, 주례, 본국 등록. 결혼 허가증, 서류, 시즌, 항공편, 하객 숙박."
    },
    "fr": {
      "title": "Se marier en Laponie : les démarches",
      "description": "Guide pratique pour les couples étrangers : les démarches, examen des empêchements (3-5 semaines), témoins, officiant, enregistrement dans le pays d’origine."
    },
    "it": {
      "title": "Sposarsi in Lapponia: le pratiche",
      "description": "Guida pratica per coppie straniere: le pratiche, esame degli impedimenti (3-5 settimane), testimoni, celebrante, registrazione nel Paese d’origine."
    },
    "nl": {
      "title": "Trouwen in Lapland: het papierwerk",
      "description": "Praktische gids voor buitenlandse stellen: het papierwerk, onderzoek naar huwelijksbeletselen (3-5 weken), getuigen, voltrekker, registratie in het thuisland."
    },
    "sv": {
      "title": "Gifta sig i Lappland: papper, vigselförrättare, praktisk guide",
      "description": "Praktisk guide för utländska par: pappren, hindersprövning (3–5 veckor), vittnen, vigselförrättare och registrering i hemlandet."
    }
  },
  "/contact": {
    "en": {
      "title": "Request 1–3 Lapland wedding quotes",
      "description": "Free and with no commitment. Reply within 1–7 days. We respond within 1–2 business days. Tell us briefly about your dream and we route it to the right planners."
    },
    "fi": {
      "title": "Pyydä 1–3 tarjousta Lapin häihin",
      "description": "Maksuton ja sitoumukseton. Vastaus 1–7 päivän sisällä. Vastaamme 1–2 työpäivän sisällä. Kuvaa lyhyesti unelmasi, välitämme sen sopiville suunnittelijoille."
    },
    "de": {
      "title": "Fordern Sie 1–3 Angebote für Ihre Hochzeit in Lappland an",
      "description": "Kostenfrei und unverbindlich. Antwort innerhalb von 1–7 Tagen. Wir antworten innerhalb von 1–2 Werktagen."
    },
    "ja": {
      "title": "ラップランド挙式の見積もりを1〜3件依頼",
      "description": "無料で契約義務なし。1〜7日以内にご返信します。1〜2営業日以内にご返信します。あなたの理想を簡単にお聞かせください、適切なプランナーへお繋ぎします。"
    },
    "es": {
      "title": "Pida 1–3 presupuestos para su boda en Laponia",
      "description": "Gratis y sin compromiso. Respuesta en 1 a 7 días. Respondemos en 1 a 2 días laborables."
    },
    "pt-BR": {
      "title": "Peça 1–3 orçamentos para seu casamento na Lapônia",
      "description": "Grátis e sem compromisso. Resposta em 1 a 7 dias. Respondemos em 1 a 2 dias úteis. Conte-nos brevemente seu sonho, encaminhamos aos organizadores certos."
    },
    "zh-CN": {
      "title": "索取 1–3 份拉普兰婚礼报价",
      "description": "免费且无承诺。1–7 天内回复。我们将在 1–2 个工作日内回复。简单告诉我们您的梦想，我们会转发给合适的策划师。"
    },
    "ko": {
      "title": "라플란드 결혼식 견적 1~3건 요청",
      "description": "무료, 부담 없음. 1~7일 내 답변. 1~2 영업일 내에 답변드립니다. 꿈에 대해 간단히 알려주시면 적합한 플래너에게 연결해 드립니다."
    },
    "fr": {
      "title": "Demandez 1 à 3 devis pour votre mariage en Laponie",
      "description": "Gratuit, sans engagement. Réponse sous 1–7 jours. Nous répondons sous 1 à 2 jours ouvrés."
    },
    "it": {
      "title": "Richiedete 1–3 preventivi per il matrimonio in Lapponia",
      "description": "Gratis e senza impegno. Risposta entro 1–7 giorni. Rispondiamo entro 1–2 giorni lavorativi."
    },
    "nl": {
      "title": "Vraag 1–3 offertes aan voor uw bruiloft in Lapland",
      "description": "Gratis en vrijblijvend. Reactie binnen 1–7 dagen. We reageren binnen 1–2 werkdagen. Vertel kort over uw droom, wij sturen het door naar de juiste planners."
    },
    "sv": {
      "title": "Begär 1–3 offerter för ert bröllop i Lappland",
      "description": "Gratis och utan förbindelse. Svar inom 1–7 dagar. Vi svarar inom 1–2 arbetsdagar. Berätta kort om er dröm, så skickar vi den vidare till rätt planerare."
    }
  },
  "/pricing": {
    "en": {
      "title": "Lapland wedding with guests: our EUR 5,000 minimum",
      "description": "What does a wedding in Lapland cost? EUR 5,000 is our minimum budget for a wedding with guests; an elopement for two starts at about EUR 1,600."
    },
    "fi": {
      "title": "Häät vieraiden kanssa: pienin budjetti 5 000 €",
      "description": "Mitä häät Lapissa maksavat? 5 000 € on pienin budjetti häille, joissa on vieraita. Kahden hengen elopement-paketti alkaa noin 1 600 eurosta."
    },
    "de": {
      "title": "Hochzeit mit Gästen in Lappland: Mindestbudget 5.000 €",
      "description": "Was kostet eine Hochzeit in Lappland? 5.000 € ist das kleinste Budget für eine Hochzeit mit Gästen. Ein Elopement-Paket zu zweit beginnt bei rund 1.600 €."
    },
    "ja": {
      "title": "ゲストを招く結婚式：最小のご予算5,000ユーロ",
      "description": "ラップランドの結婚式はいくら？ゲストを招く結婚式の最小のご予算は5,000ユーロです。二人だけのエロープメントの公表パッケージは約1,600ユーロから。項目ごとの価格帯もご紹介します。"
    },
    "es": {
      "title": "Boda con invitados en Laponia: presupuesto mínimo 5 000 €",
      "description": "¿Cuánto cuesta una boda en Laponia? 5 000 € es el presupuesto mínimo para una boda con invitados; un paquete de elopement para dos parte de unos 1 600 €."
    },
    "pt-BR": {
      "title": "Casamento com convidados na Lapônia: orçamento mínimo € 5.000",
      "description": "Quanto custa um casamento na Lapônia? € 5.000 é o orçamento mínimo para um casamento com convidados; um pacote de elopement a dois parte de cerca de € 1.600."
    },
    "zh-CN": {
      "title": "有宾客的拉普兰婚礼：最低预算 5,000 欧元",
      "description": "在拉普兰办婚礼要花多少钱？有宾客的婚礼，我们承接的最低预算为 5,000 欧元；两人私奔婚礼的公开套餐约 1,600 欧元起。本页列出各项开支的价格区间。"
    },
    "ko": {
      "title": "하객이 있는 라플란드 결혼식: 최소 예산 5,000유로",
      "description": "라플란드 결혼식 비용은 얼마일까요? 하객이 있는 결혼식의 최소 예산은 5,000유로이며, 두 사람만의 엘로프먼트 공개 패키지는 약 1,600유로부터입니다."
    },
    "fr": {
      "title": "Mariage avec invités en Laponie : budget minimum 5 000 €",
      "description": "Combien coûte un mariage en Laponie ? 5 000 € est le budget minimum pour un mariage avec invités ; un forfait elopement à deux démarre autour de 1 600 €."
    },
    "it": {
      "title": "Matrimonio con ospiti in Lapponia: budget minimo 5.000 €",
      "description": "Quanto costa un matrimonio in Lapponia? 5.000 € è il budget minimo per un matrimonio con ospiti; un pacchetto elopement per due parte da circa 1.600 €."
    },
    "nl": {
      "title": "Bruiloft met gasten in Lapland: minimumbudget € 5.000",
      "description": "Wat kost een bruiloft in Lapland? € 5.000 is het kleinste budget voor een bruiloft met gasten; een elopementpakket voor twee begint rond € 1.600."
    },
    "sv": {
      "title": "Bröllop med gäster i Lappland: minsta budget 5 000 €",
      "description": "Vad kostar ett bröllop i Lappland? 5 000 € är den minsta budgeten för ett bröllop med gäster; ett rymningspaket för två börjar kring 1 600 €."
    }
  },
  "/checklist/dvv-foreign-couples": {
    "en": {
      "title": "DVV Wedding Checklist for Foreign Couples (printable PDF)",
      "description": "A one-page DVV marriage-licence checklist for foreign couples planning a wedding in Finnish Lapland. Print or save as PDF."
    },
    "fi": {
      "title": "DVV-tarkistuslista: vihille Lapissa",
      "description": "Yksisivuinen DVV-tarkistuslista ulkomaalaisille pareille, jotka aikovat vihille Suomen Lapissa. Printtaa tai tallenna PDF:nä."
    },
    "de": {
      "title": "DVV-Checkliste für ausländische Paare",
      "description": "Einseitige DVV-Checkliste zur Heiratserlaubnis für ausländische Paare, die in Finnisch-Lappland heiraten. Drucken oder als PDF speichern."
    },
    "ja": {
      "title": "外国人カップル向けDVV結婚式チェックリスト（印刷可PDF）",
      "description": "フィンランドのラップランドで結婚を計画する外国人カップルのための1ページDVV婚姻許可チェックリスト。印刷またはPDF保存。"
    },
    "es": {
      "title": "Lista DVV para parejas extranjeras",
      "description": "Lista de comprobación DVV de una página para parejas extranjeras que planifican su boda en la Laponia finlandesa. Imprima o guarde en PDF."
    },
    "pt-BR": {
      "title": "Checklist DVV para casais estrangeiros",
      "description": "Checklist DVV de uma página para casais estrangeiros que planejam o casamento na Lapônia finlandesa. Imprima ou salve em PDF."
    },
    "zh-CN": {
      "title": "外国情侣DVV婚礼清单(可打印PDF)",
      "description": "为计划在芬兰拉普兰举行婚礼的外国情侣准备的一页式DVV结婚证清单。可打印或另存为PDF。结婚许可、文件、季节、航班以及客人住宿。"
    },
    "ko": {
      "title": "외국인 커플을 위한 DVV 결혼식 체크리스트(인쇄용 PDF)",
      "description": "핀란드 라플란드에서 결혼식을 계획하는 외국인 커플을 위한 한 페이지 분량의 DVV 혼인 허가 체크리스트. 인쇄하거나 PDF으로 저장하실 수 있습니다."
    },
    "fr": {
      "title": "Liste DVV pour couples étrangers",
      "description": "Liste de contrôle DVV d’une page pour les couples étrangers qui planifient un mariage en Laponie finlandaise. Imprimez ou enregistrez en PDF."
    },
    "it": {
      "title": "Checklist DVV per coppie straniere",
      "description": "Checklist DVV di una pagina per coppie straniere che pianificano il matrimonio nella Lapponia finlandese. Stampi o salvi in PDF."
    },
    "nl": {
      "title": "DVV-checklist voor buitenlandse paren",
      "description": "Een checklist van één pagina voor buitenlandse stellen die in Fins Lapland willen trouwen. DVV-papierwerk, getuigen, voltrekker. Print als pdf."
    },
    "sv": {
      "title": "DVV-checklista för utländska par",
      "description": "En ensidig DVV-checklista för hindersprövning för utländska par som planerar bröllop i finska Lappland. Skriv ut eller spara som PDF."
    }
  }
};
