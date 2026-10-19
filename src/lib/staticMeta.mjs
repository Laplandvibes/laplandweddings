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
      "title": "Lapland Weddings: 19 Arctic Venues and What They Cost",
      "description": "An independent guide to getting married in Lapland: 19 venues, 8 regions, symbolic and legal ceremonies, real costs. We represent none of the venues."
    },
    "fi": {
      "title": "Häät Lapissa: 19 hääpaikkaa jääkappelista lasi-igluun",
      "description": "19 hääpaikkaa Lapissa: jääkappelit, lasi-iglut ja tunturihotellit. Hinnat, varausajat ja se, miten avioliiton esteiden tutkinta hoituu ulkomailta."
    },
    "de": {
      "title": "Hochzeit in Lappland: Locations & Heiratspapiere",
      "description": "Unabhängiger Leitfaden zum Heiraten in Lappland. 19 Hochzeitslocations, die nötigen Papiere, echte Preise und praktische Leitfäden."
    },
    "ja": {
      "title": "ラップランドの結婚式：会場と婚姻手続き",
      "description": "ラップランドでの結婚式を独立した立場でまとめたガイド。19か所の会場、婚姻手続き、実際の価格、実用的なガイド。"
    },
    "es": {
      "title": "Bodas en Laponia: lugares y trámites de boda",
      "description": "Una guía independiente para casarse en Laponia. 19 lugares, los trámites, precios reales y guías prácticas."
    },
    "pt-BR": {
      "title": "Casamentos na Lapônia: locais e documentação",
      "description": "Um guia independente para casar na Lapônia. 19 locais, a documentação, preços reais e guias práticos."
    },
    "zh-CN": {
      "title": "拉普兰婚礼：婚礼场地与结婚手续",
      "description": "一份独立的拉普兰婚礼指南。19 个场地、结婚手续、真实价格和实用指南。玻璃屋顶上方是极光，雪教堂里点着烛光，院子里有驯鹿在等候。"
    },
    "ko": {
      "title": "라플란드 결혼식: 예식장과 혼인 서류",
      "description": "라플란드 결혼식을 위한 독립적인 안내서입니다. 19곳의 예식장, 혼인 서류, 실제 가격과 실용적인 가이드."
    },
    "fr": {
      "title": "Mariage en Laponie : lieux, prix et démarches",
      "description": "Un guide indépendant pour se marier en Laponie. 19 lieux, les démarches, prix réels et guides pratiques."
    },
    "it": {
      "title": "Matrimonio in Lapponia: location e pratiche di nozze",
      "description": "Una guida indipendente per sposarsi in Lapponia. 19 location, le pratiche, prezzi reali e guide pratiche."
    },
    "nl": {
      "title": "Trouwen in Lapland: locaties en huwelijkspapieren",
      "description": "Een onafhankelijke gids voor trouwen in Lapland. 19 locaties, het papierwerk, echte prijzen en praktische gidsen."
    },
    "sv": {
      "title": "Bröllop i Lappland: vigselplatser och äktenskapspapper",
      "description": "En oberoende guide till att gifta sig i Lappland. 19 vigselplatser, vigselpapperen, verkliga priser och praktiska guider för ditt bröllop i Arktis."
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
      "title": "Lapland Wedding Venues: 19 venues",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village and more. 19 Lapland wedding venues across the regions."
    },
    "fi": {
      "title": "Hääpaikat Lapissa",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village ja muita. 19 hääpaikkaa Lapin paikkakunnilla."
    },
    "de": {
      "title": "Hochzeitslocations in Lappland",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village und viele mehr. 19 Hochzeitslocations in Lappland."
    },
    "ja": {
      "title": "ラップランドの結婚式会場：19か所",
      "description": "Kakslauttanen、Northern Lights Ranch、Arctic SnowHotel、Snow Villageなど。地域を横断する19か所の結婚式会場。"
    },
    "es": {
      "title": "Lugares para bodas en Laponia",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village y muchos más. 19 lugares de boda en las regiones de Laponia."
    },
    "pt-BR": {
      "title": "Locais para casamento na Lapônia",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e muitos outros. 19 locais de casamento nas regiões da Lapônia."
    },
    "zh-CN": {
      "title": "拉普兰婚礼场地：19 个场地",
      "description": "卡克斯劳塔宁、北极光牧场、北极雪酒店、雪村等。覆盖拉普兰各地区的 19 个婚礼场地，我们不代理其中任何一家。"
    },
    "ko": {
      "title": "라플란드 예식장 19곳",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village 외. 라플란드 전역에 걸친 19곳의 예식장입니다."
    },
    "fr": {
      "title": "Lieux de mariage en Laponie",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village et bien d’autres. 19 lieux de mariage dans toute la Laponie."
    },
    "it": {
      "title": "Location di matrimonio in Lapponia",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village e molte altre. 19 location di matrimonio nelle regioni della Lapponia."
    },
    "nl": {
      "title": "Bruiloftslocaties in Lapland",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village en meer. 19 bruiloftslocaties in heel Lapland."
    },
    "sv": {
      "title": "Bröllopsplatser i Lappland",
      "description": "Kakslauttanen, Northern Lights Ranch, Arctic SnowHotel, Snow Village med flera. 19 bröllopsplatser i hela Lappland."
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
      "title": "Lapland Wedding Enquiry: We Reply Personally",
      "description": "Tell us briefly about your Lapland wedding plans. Your enquiry comes straight to us and we reply personally. Free and without commitment."
    },
    "fi": {
      "title": "Häät Lapissa: lähetä hääkysely",
      "description": "Kuvatkaa lyhyesti toiveenne häistä Lapissa. Kysely tulee suoraan meille, ja vastaamme henkilökohtaisesti. Maksuton ja sitoumukseton."
    },
    "de": {
      "title": "Hochzeitsanfrage für Lappland: Wir antworten persönlich",
      "description": "Erzählen Sie uns kurz von Ihren Hochzeitsplänen in Lappland. Ihre Anfrage geht direkt an uns, und wir antworten persönlich. Kostenlos und unverbindlich."
    },
    "ja": {
      "title": "ラップランド挙式のお問い合わせ：個別にお返事します",
      "description": "ラップランドでの結婚式のご計画を簡単にお聞かせください。お問い合わせは当サイトに直接届き、私たちが個別にお返事します。無料で、契約の義務はありません。"
    },
    "es": {
      "title": "Consulta de boda en Laponia: le respondemos personalmente",
      "description": "Cuéntenos brevemente sus planes de boda en Laponia. Su consulta nos llega directamente y le respondemos personalmente. Gratis y sin compromiso."
    },
    "pt-BR": {
      "title": "Consulta de casamento na Lapônia: respondemos pessoalmente",
      "description": "Conte brevemente seus planos de casamento na Lapônia. O pedido chega diretamente a nós, e respondemos pessoalmente. Grátis e sem compromisso."
    },
    "zh-CN": {
      "title": "拉普兰婚礼咨询：由我们亲自回复",
      "description": "请简单介绍您在拉普兰举办婚礼的计划和心愿。您的咨询会直接发送给我们，由我们亲自回复。完全免费，也没有任何义务。"
    },
    "ko": {
      "title": "라플란드 결혼식 문의: 저희가 직접 답변드립니다",
      "description": "라플란드 결혼식 계획을 간단히 알려 주세요. 문의는 저희에게 바로 전달되며, 저희가 직접 답변드립니다. 무료이며 부담 없이 문의하실 수 있습니다."
    },
    "fr": {
      "title": "Mariage en Laponie : nous vous répondons personnellement",
      "description": "Parlez-nous de votre projet de mariage en Laponie. Votre demande nous parvient directement et nous vous répondons personnellement. Gratuit et sans engagement."
    },
    "it": {
      "title": "Matrimonio in Lapponia: Le rispondiamo personalmente",
      "description": "Ci racconti in breve i Suoi progetti di matrimonio in Lapponia. La richiesta arriva direttamente a noi e Le rispondiamo personalmente. Gratis e senza impegno."
    },
    "nl": {
      "title": "Trouwaanvraag voor Lapland: wij antwoorden persoonlijk",
      "description": "Vertel ons kort over uw trouwplannen in Lapland. Uw aanvraag komt rechtstreeks bij ons binnen en u krijgt persoonlijk antwoord. Gratis en vrijblijvend."
    },
    "sv": {
      "title": "Bröllopsförfrågan i Lappland: vi svarar personligen",
      "description": "Berätta kort om era bröllopsplaner i Lappland. Förfrågan kommer direkt till oss, och vi svarar personligen. Gratis och utan förbindelse."
    }
  },
  "/pricing": {
    "en": {
      "title": "What a Lapland Wedding Costs: Published Prices",
      "description": "Prices Lapland businesses publish for weddings: officiant, photography, glass igloo and guest activities. What makes up the total and what pushes it up."
    },
    "fi": {
      "title": "Mitä häät Lapissa maksavat: hinnat lähteineen",
      "description": "Lappilaisten yritysten julkaisemat hinnat häihin: vihkijä, valokuvaus, lasi-iglu ja vieraiden ohjelma. Mistä summa koostuu ja mikä sitä nostaa."
    },
    "de": {
      "title": "Was eine Hochzeit in Lappland kostet: Preise mit Quellen",
      "description": "Was Anbieter in Lappland für Hochzeiten veröffentlichen: Trauredner, Fotografie, Glasiglu und Gästeprogramm. Woraus sich die Summe ergibt und was sie erhöht."
    },
    "ja": {
      "title": "ラップランドの結婚式の費用：事業者の公開価格",
      "description": "ラップランドの事業者が公開している結婚式関連の価格：司式者、写真撮影、グラスイグルー、ゲスト向けアクティビティ。総額の内訳と、費用を押し上げる要因をご紹介します。"
    },
    "es": {
      "title": "Cuánto cuesta una boda en Laponia: precios publicados",
      "description": "Precios que publican proveedores de Laponia para bodas: oficiante, fotografía, iglú de cristal, actividades para invitados. Qué compone el total y qué lo eleva."
    },
    "pt-BR": {
      "title": "Quanto custa um casamento na Lapônia: preços publicados",
      "description": "Preços que operadores da Lapônia publicam para casamentos: celebrante, fotografia, iglu de vidro e atividades para convidados. Do que se compõe o total."
    },
    "zh-CN": {
      "title": "在拉普兰办婚礼要花多少钱：经营者公开价格",
      "description": "拉普兰经营者公开的婚礼相关价格：主婚人、摄影、玻璃冰屋和宾客活动。本页说明婚礼总额由哪些部分构成，以及哪些因素会推高费用。"
    },
    "ko": {
      "title": "라플란드 결혼식 비용: 업체들이 공개한 가격",
      "description": "라플란드 업체들이 공개한 결혼식 관련 가격: 주례, 사진 촬영, 글래스 이글루, 하객 액티비티. 총액의 구성과 비용을 높이는 요인을 정리했습니다."
    },
    "fr": {
      "title": "Ce que coûte un mariage en Laponie : les prix publiés",
      "description": "Prix publiés par les prestataires de Laponie : officiant, photographie, igloo de verre et activités des invités. Ce qui compose le total et le fait grimper."
    },
    "it": {
      "title": "Quanto costa un matrimonio in Lapponia: prezzi pubblicati",
      "description": "Prezzi pubblicati dagli operatori della Lapponia: celebrante, fotografia, igloo di vetro e attività per gli ospiti. Come si forma il totale e cosa lo fa salire."
    },
    "nl": {
      "title": "Wat een bruiloft in Lapland kost: gepubliceerde prijzen",
      "description": "Prijzen die Laplandse aanbieders publiceren voor bruiloften: voltrekker, fotografie, glazen iglo en activiteiten voor gasten. Waaruit het totaal bestaat."
    },
    "sv": {
      "title": "Vad ett bröllop i Lappland kostar: publicerade priser",
      "description": "Priser som lappländska aktörer publicerar för bröllop: vigselförrättare, foto, glasigloo och gästaktiviteter. Vad summan består av och vad som höjer den."
    }
  },
  "/traditions": {
    "en": {
      "title": "Finnish Wedding Traditions: Bridal Sauna, Waltz and Crown",
      "description": "The bridal sauna, uninvited guests, the wedding waltz, bride kidnapping and Lapland’s fell chapels: Finnish wedding traditions, each with its source."
    },
    "fi": {
      "title": "Hääperinteet: morsiussauna, häävalssi ja kuokkavieraat",
      "description": "Morsiussauna, kuokkavieraat, häävalssi, morsiusryöstö ja Lapin tunturikappelit: suomalaiset hääperinteet lähteineen ja miten ne näkyvät häissä nyt."
    },
    "de": {
      "title": "Finnische Hochzeitsbräuche: Brautsauna, Walzer und Krone",
      "description": "Brautsauna, ungeladene Gäste, Hochzeitswalzer, Brautentführung und Lapplands Fjällkapellen: finnische Hochzeitsbräuche, jeweils mit Quelle."
    },
    "ja": {
      "title": "フィンランドの結婚式の伝統：花嫁サウナ、ワルツ、花嫁の冠",
      "description": "花嫁サウナ、招かれざる客、ウェディングワルツ、花嫁の連れ去り、ラップランドのフェルの礼拝堂。フィンランドの結婚式の伝統を出典とともに紹介します。"
    },
    "es": {
      "title": "Tradiciones de boda finlandesas: sauna, vals y corona",
      "description": "La sauna de la novia, los invitados sin invitación, el vals, el rapto de la novia y las capillas de Laponia: tradiciones finlandesas con sus fuentes."
    },
    "pt-BR": {
      "title": "Tradições de casamento finlandesas: sauna, valsa e coroa",
      "description": "A sauna da noiva, os convidados sem convite, a valsa, o rapto da noiva e as capelas da Lapônia: tradições finlandesas de casamento com as fontes."
    },
    "zh-CN": {
      "title": "芬兰婚礼传统：新娘桑拿、婚礼华尔兹与新娘冠",
      "description": "新娘桑拿、不请自来的客人、婚礼华尔兹、“抢新娘”游戏以及拉普兰的山间小教堂：附出处介绍芬兰的婚礼传统，以及它们在今天婚礼上的样子。"
    },
    "ko": {
      "title": "핀란드 결혼 전통: 신부 사우나, 웨딩 왈츠, 신부 왕관",
      "description": "신부 사우나, 초대받지 않은 손님, 웨딩 왈츠, 신부 납치 놀이, 라플란드의 펠 예배당까지. 출처와 함께 소개하는 핀란드의 결혼 전통입니다."
    },
    "fr": {
      "title": "Traditions de mariage finlandaises : sauna, valse, couronne",
      "description": "Le sauna de la mariée, les invités non conviés, la valse, l’enlèvement de la mariée et les chapelles de Laponie : traditions finlandaises et sources."
    },
    "it": {
      "title": "Tradizioni nuziali finlandesi: sauna, valzer e corona",
      "description": "La sauna della sposa, gli ospiti non invitati, il valzer, il rapimento della sposa e le cappelle della Lapponia: tradizioni finlandesi con le fonti."
    },
    "nl": {
      "title": "Finse bruiloftstradities: bruidssauna, wals en bruidskroon",
      "description": "Bruidssauna, ongenode gasten, de bruiloftswals, bruidsroof en de fjellkapellen van Lapland: Finse bruiloftstradities, elk met de bron erbij."
    },
    "sv": {
      "title": "Finska bröllopstraditioner: brudbastu, vals och brudkrona",
      "description": "Brudbastu, objudna gäster, bröllopsvalsen, brudrov och Lapplands fjällkapell: finska bröllopstraditioner med källor och hur de lever i dag."
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
