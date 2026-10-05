/**
 * Wedding type pages (/wedding-types/<slug>): meta description per slug and locale. ONE source:
 * scripts/prerender-meta.mjs writes the prerendered HTML from this object and pages/WeddingTypePage.tsx
 * renders the same value in the browser (gate:meta-hydraatio in lv-ops).
 *
 * Until 2026-10-05 the browser built the description from the page prose (tagline and description cut at 140 characters),
 * while the prerenderer used the hand-written meta blurb from route-i18n.json, in ja/zh-CN/ko replaced by the page prose when shorter than 70 characters:
 * different text on 72 of 72 pages. The values here are those prerendered (published) texts; where the published one broke
 * off mid-sentence or carried a loose word list after a stray space, it was rewritten from the same facts
 * in the page's own language.
 *
 * Each description is at least 70 characters and at most 160 characters / 200 width units, so neither
 * longDesc() nor clampDescription() in the prerenderer changes it; prerender-meta.mjs fails the build if it
 * would. The page prose (src/data) stays the page's own text and is not a meta source.
 *
 * Plain ESM (.mjs) for Node 20 in CI. Types in the .d.mts next to this file.
 */
export const TYPE_DESCRIPTION = {
  "elopement": {
    "en": "Just the two of you, the officiant and a photographer. Turnkey packages from €1 600.",
    "fi": "Pelkästään te kaksi, vihkijä ja valokuvaaja. Avaimet käteen -paketit alkaen 1 600 €.",
    "de": "Nur Sie beide, der Trauredner und ein Fotograf. Schlüsselfertige Pakete ab 1 600 €.",
    "ja": "フィンランドで最も手軽な結婚式の形：カップル、婚姻執行者、立会人2名のみ。手続きはすべてDVV（人口情報局）経由で行い、全体で1〜2日です。",
    "es": "Solo los dos, el oficiante y un fotógrafo. Paquetes llave en mano desde 1 600 €.",
    "pt-BR": "Só vocês dois, o celebrante e um fotógrafo. Pacotes prontos a partir de € 1 600.",
    "zh-CN": "芬兰最简便的婚礼形式：只需新人、主婚人和两名证婚人，再请一位摄影师记录下来。手续通过DVV办理，拉普兰的一站式私奔婚礼套餐 1,600 欧元起。",
    "ko": "핀란드에서 가장 간편한 결혼 방식: 신랑신부, 주례, 증인 2명만 있으면 됩니다. 모든 서류는 DVV(인구정보청)를 통해 처리되며 전체 일정은 1~2일입니다.",
    "fr": "Rien que vous deux, l’officiant et un photographe. Formules clés en main à partir de 1 600 €.",
    "it": "Solo gli sposi, il celebrante e un fotografo. Pacchetti chiavi in mano da 1 600 €.",
    "nl": "Alleen u beiden, de huwelijksvoltrekker en een fotograaf. Kant-en-klare pakketten vanaf € 1.600.",
    "sv": "Bara ni två, vigselförrättaren och en fotograf. Nyckelfärdiga paket från 1 600 €."
  },
  "glass-igloo": {
    "en": "Wedding night beneath the Northern Lights in a heated glass dome: Kakslauttanen, Levin Iglut, Apukka.",
    "fi": "Hääyö revontulien alla lämpimässä lasikuvussa: Kakslauttanen, Levin Iglut, Apukka.",
    "de": "Hochzeitsnacht unter den Polarlichtern in einer beheizten Glaskuppel: Kakslauttanen, Levin Iglut, Apukka.",
    "ja": "グラスイグルーは挙式そのものの場ではなく、二人の特別な初夜のための空間です。多くのカップルは、氷または木造チャペルでの挙式とグラスイグルーでの宿泊を組み合わせます。",
    "es": "Noche de bodas bajo la aurora boreal en una cúpula de cristal climatizada: Kakslauttanen, Levin Iglut, Apukka.",
    "pt-BR": "Noite de núpcias sob a aurora boreal em uma cúpula de vidro aquecida: Kakslauttanen, Levin Iglut, Apukka.",
    "zh-CN": "玻璃冰屋并非仪式场地本身，而是两人独一无二的新婚之夜。多数新人将冰礼拜堂或木礼拜堂的仪式与玻璃冰屋过夜相结合。地暖与电热玻璃即使在-30°C也能保持视野清晰。",
    "ko": "글래스 이글루는 예식 공간 자체가 아니라 두 사람만의 특별한 첫날밤을 위한 곳입니다. 대부분의 커플은 아이스 또는 통나무 채플 예식과 글래스 이글루 숙박을 결합합니다.",
    "fr": "Nuit de noces sous les aurores boréales dans un dôme de verre chauffé : Kakslauttanen, Levin Iglut, Apukka.",
    "it": "Prima notte di nozze sotto l’aurora boreale in una cupola di vetro riscaldata: Kakslauttanen, Levin Iglut, Apukka.",
    "nl": "Huwelijksnacht onder het noorderlicht in een verwarmde glazen koepel: Kakslauttanen, Levin Iglut, Apukka.",
    "sv": "Bröllopsnatt under norrskenet i en uppvärmd glaskupol: Kakslauttanen, Levin Iglut, Apukka."
  },
  "midnight-sun": {
    "en": "Marry when the sun never sets: May 23 to July 24, warm weather, no snow gear needed.",
    "fi": "Pohjois-Lapissa aurinko ei laske horisontin alle 23.5.–24.7. vihkiminen voidaan pitää keskellä yötä luonnonvalossa.",
    "de": "Trauung, wenn die Sonne nicht untergeht: 23. Mai bis 24. Juli, warmes Wetter, keine Schneekleidung nötig.",
    "ja": "北ラップランドでは5月23日〜7月24日、太陽が地平線の下に沈みません。自然光のもと真夜中に挙式が可能です。サーリセルカ、イナリ、キルピスヤルヴィが最適。",
    "es": "Casarse cuando el sol no se pone: del 23 de mayo al 24 de julio, tiempo cálido, sin necesidad de equipo de nieve.",
    "pt-BR": "Casem-se quando o sol não se põe: de 23 de maio a 24 de julho, clima ameno, sem roupas de neve.",
    "zh-CN": "在北拉普兰，5月23日至7月24日期间太阳不落于地平线之下，仪式可在午夜借自然光举行。萨利色尔卡、伊纳里和基尔皮斯耶尔维堪称完美。气候温暖（白天15–25°C），因此在森林、湖畔或山丘举办户外婚礼无需冰雪装备。",
    "ko": "북부 라플란드에서는 5월 23일부터 7월 24일까지 해가 지평선 아래로 지지 않습니다. 자연광 속에서 한밤중에 예식을 올릴 수 있습니다. 사리셀카, 이나리, 킬피스야르비가 안성맞춤입니다.",
    "fr": "Mariez-vous quand le soleil ne se couche jamais : du 23 mai au 24 juillet, temps doux, sans tenue de neige.",
    "it": "Si sposi quando il sole non tramonta: dal 23 maggio al 24 luglio, clima mite, senza abbigliamento da neve.",
    "nl": "Trouwen wanneer de zon niet ondergaat: 23 mei tot 24 juli, warm weer, geen sneeuwkleding nodig.",
    "sv": "Gift er när solen aldrig går ner: 23 maj–24 juli, varmt väder, inga snökläder behövs."
  },
  "northern-lights": {
    "en": "Exchange vows under the aurora borealis: Northern Lapland sees aurora on average every other night (FMI).",
    "fi": "Vihkiminen revontulien alla: Pohjois-Lapissa revontulia nähdään keskimäärin joka toisena yönä (Ilmatieteen laitos).",
    "de": "Das Jawort unter den Polarlichtern: In Nordlappland sind Polarlichter im Schnitt jede zweite Nacht zu sehen (FMI).",
    "ja": "オーロラはラップランドで最も多くリクエストされる結婚式の願い、それも当然です。北ラップランドの高緯度では、フィンランド気象研究所によれば平均して二晩に一度オーロラが観測されます。",
    "es": "Dar el sí bajo la aurora boreal: en el norte de Laponia se ven auroras de media una de cada dos noches (FMI).",
    "pt-BR": "Troquem os votos sob a aurora boreal: no norte da Lapônia a aurora aparece em média a cada duas noites (FMI).",
    "zh-CN": "极光是拉普兰最受新人青睐的婚礼心愿，而且理由充分。在北拉普兰的高纬度地区，据芬兰气象研究所统计平均每两晚可见一次极光；至于同时天空晴朗的频率，并未按目的地公布。",
    "ko": "오로라는 라플란드에서 가장 많이 요청되는 결혼식 소망입니다. 그럴 만한 이유가 있습니다. 북부 라플란드의 고위도 지역에서는 핀란드 기상청 기준 평균 이틀에 한 번 오로라가 관측됩니다.",
    "fr": "Échangez vos vœux sous les aurores boréales : en Laponie du Nord, on en observe en moyenne une nuit sur deux (FMI).",
    "it": "Pronunci le promesse sotto l’aurora boreale: nella Lapponia settentrionale l’aurora si vede in media una notte su due (FMI).",
    "nl": "Uw ja-woord onder het noorderlicht: in Noord-Lapland is het noorderlicht gemiddeld om de nacht te zien (FMI).",
    "sv": "Vigsel under norrskenet: i norra Lappland syns norrsken i genomsnitt varannan natt (FMI)."
  },
  "snow-chapel": {
    "en": "Marry in a chapel carved from pure snow and ice: Lainio, Northern Lights Ranch, Arctic SnowHotel and Levi Ice Castle.",
    "fi": "Vihille puhtaaksi veistetyssä lumi- tai jääkappelissa: Lainio, Northern Lights Ranch, Arctic SnowHotel ja Levin jäälinna.",
    "de": "Trauung in einer aus reinem Schnee und Eis gemeißelten Kapelle: Lainio, Northern Lights Ranch, Arctic SnowHotel und Levi Ice Castle.",
    "ja": "純粋な雪と氷から削り出したチャペルで挙式：Lainio、Northern Lights Ranch、Arctic SnowHotel、Levi Ice Castle。",
    "es": "Casarse en una capilla tallada en nieve y hielo puros: Lainio, Northern Lights Ranch, Arctic SnowHotel y Levi Ice Castle.",
    "pt-BR": "Casem-se em uma capela esculpida em neve e gelo puros: Lainio, Northern Lights Ranch, Arctic SnowHotel e Levi Ice Castle.",
    "zh-CN": "在由纯净冰雪雕成的教堂里结婚：Lainio、Northern Lights Ranch、Arctic SnowHotel 和 Levi Ice Castle。",
    "ko": "순수한 눈과 얼음을 깎아 만든 예배당에서 올리는 결혼식. Lainio, Northern Lights Ranch, Arctic SnowHotel, Levi Ice Castle.",
    "fr": "Mariez-vous dans une chapelle sculptée dans la neige et la glace pures : Lainio, Northern Lights Ranch, Arctic SnowHotel et Levi Ice Castle.",
    "it": "Si sposi in una cappella scolpita nella neve e nel ghiaccio puri: Lainio, Northern Lights Ranch, Arctic SnowHotel e Levi Ice Castle.",
    "nl": "Trouwen in een kapel uitgehouwen uit puur sneeuw en ijs: Lainio, Northern Lights Ranch, Arctic SnowHotel en Levi Ice Castle.",
    "sv": "Gift er i ett kapell format av ren snö och is: Lainio, Northern Lights Ranch, Arctic SnowHotel och Levi Ice Castle."
  },
  "vow-renewal": {
    "en": "Renew your vows in the Lapland snow: no paperwork, fully bespoke ceremony.",
    "fi": "Uudistakaa lupauksenne Lapin lumessa: ei papereita, täysin räätälöity seremonia.",
    "de": "Erneuern Sie Ihr Eheversprechen im Schnee Lapplands: keine Formalitäten, vollständig individuelle Zeremonie.",
    "ja": "誓いの更新には法的な書類は一切不要：セレモニーとカップルだけです。プランナーは通常、正式な結婚式より低い料金で更新式を扱います。長い夫婦生活の節目や、ステップファミリーの出発点にふさわしい形です。",
    "es": "Renovar los votos en la nieve de Laponia: sin trámites, ceremonia totalmente a medida.",
    "pt-BR": "Renovem seus votos na neve da Lapônia: sem papelada, cerimônia totalmente sob medida.",
    "zh-CN": "重申誓言无需任何法律文书，只需一场仪式和这对新人。策划方为重申仪式定的价格通常低于正式婚礼。它既适合长久关系的里程碑，也适合重组家庭的开端。",
    "ko": "서약 갱신에는 어떤 법적 서류도 필요 없습니다: 예식과 부부만 있으면 됩니다. 플래너는 보통 갱신 예식을 공식 결혼식보다 낮은 가격으로 책정합니다. 오랜 관계의 기념일이나 재혼 가정의 출발점에 어울립니다.",
    "fr": "Renouvelez vos vœux dans la neige de Laponie : aucune formalité administrative, cérémonie entièrement sur mesure.",
    "it": "Rinnovi le Sue promesse nella neve della Lapponia: nessuna pratica burocratica, cerimonia completamente su misura.",
    "nl": "Vernieuw uw geloften in de sneeuw van Lapland: geen papierwerk, volledig op maat gemaakte ceremonie.",
    "sv": "Förnya era löften i Lapplands snö: inga papper, en helt skräddarsydd ceremoni."
  }
};
