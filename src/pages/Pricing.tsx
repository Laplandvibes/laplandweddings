import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang } from '../i18n/LangContext';
import L from '../components/L';
import { pickLocalized, type Localized } from '../data/localized';

const breakdown: Array<{ title: Localized<string>; range: Localized<string> }> = [
  {
    title: {
      en: 'Wedding planner fee', fi: 'Hääsuunnittelijan palkkio', de: 'Honorar des Hochzeitsplaners',
      ja: 'ウェディングプランナー料金', es: 'Honorarios del organizador', 'pt-BR': 'Honorários do organizador',
      'zh-CN': '婚礼策划师费用', ko: '웨딩 플래너 비용', fr: 'Honoraires du wedding planner',
      it: 'Onorario del wedding planner', nl: 'Honorarium trouwplanner', sv: 'Arvode till bröllopsplanerare',
    },
    range: { en: '€1 600 – €5 000', fi: '1 600 – 5 000 €', de: '1 600 – 5 000 €', ja: '1,600〜5,000ユーロ', es: '1 600 – 5 000 €', 'pt-BR': '€ 1.600 – € 5.000', 'zh-CN': '1,600 – 5,000 欧元', ko: '1,600 – 5,000유로', fr: '1 600 – 5 000 €', it: '1 600 – 5 000 €', nl: '€ 1.600 – € 5.000' , sv: '€1 600 – €5 000'},
  },
  {
    title: {
      en: 'DVV paperwork & officiant', fi: 'DVV-paperit ja vihkijä', de: 'DVV-Unterlagen & Trauredner',
      ja: 'DVV書類＆司式者', es: 'Trámites DVV y oficiante', 'pt-BR': 'Documentação DVV e celebrante',
      'zh-CN': 'DVV 文件与主婚人', ko: 'DVV 서류 & 주례', fr: 'Formalités DVV & officiant',
      it: 'Documenti DVV e celebrante', nl: 'DVV-papierwerk & voltrekker', sv: 'DVV-papper & vigselförrättare',
    },
    range: { en: '€350 – €600', fi: '350 – 600 €', de: '350 – 600 €', ja: '350〜600ユーロ', es: '350 – 600 €', 'pt-BR': '€ 350 – € 600', 'zh-CN': '350 – 600 欧元', ko: '350 – 600유로', fr: '350 – 600 €', it: '350 – 600 €', nl: '€ 350 – € 600' , sv: '€350 – €600'},
  },
  {
    title: {
      en: 'Photography (2h to full day + video)', fi: 'Valokuvaus (2 h – koko päivä + video)', de: 'Fotografie (2 Std. bis ganzer Tag + Video)',
      ja: '写真撮影（2時間〜終日＋動画）', es: 'Fotografía (2 h a día completo + vídeo)', 'pt-BR': 'Fotografia (2 h ao dia inteiro + vídeo)',
      'zh-CN': '摄影（2 小时至全天 + 视频）', ko: '사진 촬영(2시간~종일 + 영상)', fr: 'Photographie (2 h à journée complète + vidéo)',
      it: 'Fotografia (da 2 h all’intera giornata + video)', nl: 'Fotografie (2 u tot hele dag + video)', sv: 'Fotografering (2 h till heldag + video)',
    },
    range: { en: '€590 – €4 200', fi: '590 – 4 200 €', de: '590 – 4 200 €', ja: '590〜4,200ユーロ', es: '590 – 4 200 €', 'pt-BR': '€ 590 – € 4.200', 'zh-CN': '590 – 4,200 欧元', ko: '590 – 4,200유로', fr: '590 – 4 200 €', it: '590 – 4 200 €', nl: '€ 590 – € 4.200' , sv: '€590 – €4 200'},
  },
  {
    title: {
      en: 'Snow / ice / glass chapel ceremony', fi: 'Lumi-/jää-/lasikappelivihkimys', de: 'Schnee-/Eis-/Glaskapellen-Zeremonie',
      ja: 'スノー／アイス／ガラスチャペル挙式', es: 'Ceremonia en capilla de nieve / hielo / cristal', 'pt-BR': 'Cerimônia em capela de neve / gelo / vidro',
      'zh-CN': '雪 / 冰 / 玻璃教堂仪式', ko: '스노우 / 아이스 / 글라스 채플 예식', fr: 'Cérémonie en chapelle de neige / glace / verre',
      it: 'Cerimonia in cappella di neve / ghiaccio / vetro', nl: 'Ceremonie in sneeuw-/ijs-/glaskapel', sv: 'Vigsel i snö-, is- eller glaskapell',
    },
    range: { en: '€800 – €4 000', fi: '800 – 4 000 €', de: '800 – 4 000 €', ja: '800〜4,000ユーロ', es: '800 – 4 000 €', 'pt-BR': '€ 800 – € 4.000', 'zh-CN': '800 – 4,000 欧元', ko: '800 – 4,000유로', fr: '800 – 4 000 €', it: '800 – 4 000 €', nl: '€ 800 – € 4.000' , sv: '€800 – €4 000'},
  },
  {
    title: {
      en: 'Florist + bouquet', fi: 'Kukat + kimppu', de: 'Florist + Brautstrauß',
      ja: 'フローリスト＋ブーケ', es: 'Floristería + ramo', 'pt-BR': 'Floricultura + buquê',
      'zh-CN': '花艺 + 捧花', ko: '플로리스트 + 부케', fr: 'Fleuriste + bouquet',
      it: 'Fiorista + bouquet', nl: 'Bloemist + boeket', sv: 'Florist + brudbukett',
    },
    range: { en: '€240 – €1 800', fi: '240 – 1 800 €', de: '240 – 1 800 €', ja: '240〜1,800ユーロ', es: '240 – 1 800 €', 'pt-BR': '€ 240 – € 1.800', 'zh-CN': '240 – 1,800 欧元', ko: '240 – 1,800유로', fr: '240 – 1 800 €', it: '240 – 1 800 €', nl: '€ 240 – € 1.800' , sv: '€240 – €1 800'},
  },
  {
    title: {
      en: 'Catering (per guest)', fi: 'Catering (per vieras)', de: 'Catering (pro Gast)',
      ja: 'ケータリング（1人あたり）', es: 'Catering (por invitado)', 'pt-BR': 'Buffet (por convidado)',
      'zh-CN': '餐饮（每位宾客）', ko: '케이터링(인당)', fr: 'Traiteur (par invité)',
      it: 'Catering (per ospite)', nl: 'Catering (per gast)', sv: 'Catering (per gäst)',
    },
    range: { en: '€80 – €280', fi: '80 – 280 €', de: '80 – 280 €', ja: '80〜280ユーロ', es: '80 – 280 €', 'pt-BR': '€ 80 – € 280', 'zh-CN': '80 – 280 欧元', ko: '80 – 280유로', fr: '80 – 280 €', it: '80 – 280 €', nl: '€ 80 – € 280' , sv: '€80 – €280'},
  },
  {
    title: {
      en: 'Glass igloo / cabin (per night)', fi: 'Lasi-iglu / cabin (per yö)', de: 'Glasiglu / Hütte (pro Nacht)',
      ja: 'ガラスイグルー／キャビン（1泊）', es: 'Iglú de cristal / cabaña (por noche)', 'pt-BR': 'Iglu de vidro / cabana (por noite)',
      'zh-CN': '玻璃冰屋 / 小屋（每晚）', ko: '글라스 이글루 / 캐빈(1박)', fr: 'Igloo de verre / cabane (par nuit)',
      it: 'Igloo di vetro / cabina (a notte)', nl: 'Glazen iglo / cabin (per nacht)', sv: 'Glasiglo / stuga (per natt)',
    },
    range: { en: '€280 – €1 200', fi: '280 – 1 200 €', de: '280 – 1 200 €', ja: '280〜1,200ユーロ', es: '280 – 1 200 €', 'pt-BR': '€ 280 – € 1.200', 'zh-CN': '280 – 1,200 欧元', ko: '280 – 1,200유로', fr: '280 – 1 200 €', it: '280 – 1 200 €', nl: '€ 280 – € 1.200' , sv: '€280 – €1 200'},
  },
  {
    title: {
      en: 'Husky / reindeer arrival', fi: 'Husky- / poro-saapuminen', de: 'Ankunft per Husky / Rentier',
      ja: 'ハスキー／トナカイでの登場', es: 'Llegada en huskies / renos', 'pt-BR': 'Chegada de huskies / renas',
      'zh-CN': '哈士奇 / 驯鹿登场', ko: '허스키 / 순록 도착', fr: 'Arrivée en husky / renne',
      it: 'Arrivo in husky / renna', nl: 'Aankomst per husky / rendier', sv: 'Ankomst med husky eller ren',
    },
    range: { en: '€600 – €2 400', fi: '600 – 2 400 €', de: '600 – 2 400 €', ja: '600〜2,400ユーロ', es: '600 – 2 400 €', 'pt-BR': '€ 600 – € 2.400', 'zh-CN': '600 – 2,400 欧元', ko: '600 – 2,400유로', fr: '600 – 2 400 €', it: '600 – 2 400 €', nl: '€ 600 – € 2.400' , sv: '€600 – €2 400'},
  },
];

type PKey =
  | 'seoTitle' | 'seoDesc' | 'heroEyebrow' | 'heroTitle' | 'heroSubtitle' | 'heroImageAlt'
  | 's1Eyebrow' | 's1Title' | 'exampleDisclaimer'
  | 'floorNote'
  | 'd1Title' | 'd1Body' | 'd2Title' | 'd2Body' | 'd3Title' | 'd3Body'
  | 'whereMoneyGoes' | 'getQuoteLike'
  | 's2Eyebrow' | 's2Title' | 's2Subtitle'
  | 'ctaEyebrow' | 'ctaTitle' | 'ctaBody' | 'ctaButton'
  | 's4Eyebrow' | 's4Title' | 's4Subtitle';

const P: Record<PKey, Localized<string>> = {
  floorNote: { en: 'What moves the number', fi: 'Mikä summaa liikuttaa', de: 'Was die Summe bewegt', ja: '費用を左右する要素', es: 'Qué mueve la cifra', 'pt-BR': 'O que move o valor', 'zh-CN': '哪些因素影响金额', ko: '금액을 좌우하는 요소', fr: 'Ce qui fait bouger le chiffre', it: 'Cosa muove la cifra', nl: 'Wat het bedrag beweegt', sv: 'Vad som rör summan' },
  d1Title: { en: 'Number of guests', fi: 'Vieraiden määrä', de: 'Zahl der Gäste', ja: 'ゲストの人数', es: 'Número de invitados', 'pt-BR': 'Número de convidados', 'zh-CN': '宾客人数', ko: '하객 수', fr: 'Nombre d’invités', it: 'Numero di ospiti', nl: 'Aantal gasten', sv: 'Antal gäster' },
  d1Body: { en: 'Every guest adds a meal, a transfer and a bed. Going from two to thirty multiplies the total more than any other single choice.', fi: 'Jokainen vieras tuo ruoan, kuljetuksen ja vuoteen. Kahdesta kolmeenkymmeneen siirtyminen moninkertaistaa summan enemmän kuin mikään muu yksittäinen valinta.', de: 'Jeder Gast bedeutet ein Essen, einen Transfer und ein Bett. Der Sprung von zwei auf dreißig vervielfacht die Summe stärker als jede andere einzelne Entscheidung.', ja: 'ゲストが一人増えるごとに、食事、送迎、宿泊が加わります。2名から30名への変化は、ほかのどの選択よりも総額を大きく押し上げます。', es: 'Cada invitado suma una comida, un traslado y una cama. Pasar de dos a treinta multiplica el total más que ninguna otra decisión.', 'pt-BR': 'Cada convidado acrescenta uma refeição, um traslado e uma cama. Passar de dois para trinta multiplica o total mais do que qualquer outra escolha.', 'zh-CN': '每多一位宾客，就多一份餐食、一趟接送和一张床位。从两人增加到三十人，对总额的影响超过任何其他单项选择。', ko: '하객 한 명마다 식사와 이동, 잠자리가 더해집니다. 두 명에서 서른 명으로 늘리는 것이 다른 어떤 선택보다 총액을 크게 올립니다.', fr: 'Chaque invité ajoute un repas, un transfert et un lit. Passer de deux à trente multiplie le total plus que tout autre choix.', it: 'Ogni ospite aggiunge un pasto, un transfer e un letto. Passare da due a trenta moltiplica il totale più di qualsiasi altra scelta.', nl: 'Elke gast betekent een maaltijd, een transfer en een bed. Van twee naar dertig gaan vermenigvuldigt het totaal sterker dan welke andere keuze ook.', sv: 'Varje gäst innebär en måltid, en transfer och en säng. Att gå från två till trettio mångdubblar summan mer än något annat enskilt val.' },
  d2Title: { en: 'Season', fi: 'Sesonki', de: 'Saison', ja: 'シーズン', es: 'Temporada', 'pt-BR': 'Temporada', 'zh-CN': '季节', ko: '시즌', fr: 'Saison', it: 'Stagione', nl: 'Seizoen', sv: 'Säsong' },
  d2Body: { en: 'December to March is the expensive stretch: accommodation and activities are at their peak. Spring and autumn cost clearly less for the same programme.', fi: 'Jouluk.–maalisk. on kallein jakso: majoitus ja ohjelmapalvelut ovat huipussaan. Kevät ja syksy maksavat samasta ohjelmasta selvästi vähemmän.', de: 'Dezember bis März ist der teure Abschnitt: Unterkunft und Programm sind auf dem Höchststand. Frühjahr und Herbst kosten für dasselbe Programm deutlich weniger.', ja: '12月から3月が最も高い時期で、宿泊もアクティビティも価格のピークを迎えます。同じ内容でも春と秋なら明らかに安く収まります。', es: 'De diciembre a marzo es el tramo caro: el alojamiento y las actividades están en su punto más alto. Primavera y otoño cuestan claramente menos por el mismo programa.', 'pt-BR': 'De dezembro a março é o trecho caro: hospedagem e atividades estão no pico. Primavera e outono custam claramente menos pelo mesmo programa.', 'zh-CN': '十二月至三月是最贵的时段，住宿与活动均处于价格高峰。同样的安排，在春秋两季明显更便宜。', ko: '12월부터 3월까지가 가장 비싼 시기로, 숙박과 액티비티 요금이 정점에 이릅니다. 같은 구성이라도 봄과 가을은 확실히 저렴합니다.', fr: 'De décembre à mars, c’est la période chère : hébergement et activités sont au plus haut. Le printemps et l’automne coûtent nettement moins pour le même programme.', it: 'Da dicembre a marzo è il periodo caro: alloggio e attività sono al massimo. Primavera e autunno costano nettamente meno a parità di programma.', nl: 'December tot maart is het dure stuk: overnachtingen en activiteiten staan op hun hoogst. Voorjaar en najaar kosten voor hetzelfde programma duidelijk minder.', sv: 'December till mars är den dyra perioden: boende och aktiviteter ligger på topp. Vår och höst kostar klart mindre för samma program.' },
  d3Title: { en: 'Nights and programme', fi: 'Yöt ja ohjelma', de: 'Nächte und Programm', ja: '宿泊数とプログラム', es: 'Noches y programa', 'pt-BR': 'Noites e programação', 'zh-CN': '住宿天数与活动安排', ko: '숙박과 프로그램', fr: 'Nuits et programme', it: 'Notti e programma', nl: 'Nachten en programma', sv: 'Nätter och program' },
  d3Body: { en: 'A glass igloo for one night and a cabin for the rest is a different figure from three nights under glass. Husky, reindeer and snowmobile outings are priced per person, per trip.', fi: 'Yksi yö lasi-iglussa ja loput mökissä on eri summa kuin kolme yötä lasikaton alla. Husky-, poro- ja kelkkaretket hinnoitellaan per henkilö ja per retki.', de: 'Eine Nacht im Glasiglu und der Rest in einer Hütte ist eine andere Zahl als drei Nächte unter Glas. Husky-, Rentier- und Schneemobiltouren werden pro Person und pro Ausflug berechnet.', ja: 'ガラスイグルーに1泊して残りをコテージで過ごす場合と、3泊すべてをガラス屋根の下で過ごす場合とでは金額が異なります。ハスキー、トナカイ、スノーモービルの各ツアーは一人あたり・一回あたりの料金です。', es: 'Una noche en iglú de cristal y el resto en cabaña es una cifra distinta a tres noches bajo el cristal. Las excursiones de huskies, renos y motos de nieve se cobran por persona y por salida.', 'pt-BR': 'Uma noite em iglu de vidro e o resto em cabana dá um número diferente de três noites sob o vidro. Passeios de husky, rena e moto de neve são cobrados por pessoa e por saída.', 'zh-CN': '在玻璃冰屋住一晚、其余住木屋，与三晚都住在玻璃屋顶下，是两个不同的数字。哈士奇、驯鹿和雪地摩托行程按人次计价。', ko: '유리 이글루에서 하룻밤을 보내고 나머지를 캐빈에서 지내는 것과 사흘 내내 유리 지붕 아래에서 묵는 것은 금액이 다릅니다. 허스키, 순록, 스노모빌 투어는 1인당, 1회당 요금입니다.', fr: 'Une nuit en igloo de verre et le reste en chalet, ce n’est pas le même chiffre que trois nuits sous le verre. Les sorties husky, renne et motoneige se facturent par personne et par excursion.', it: 'Una notte in igloo di vetro e il resto in chalet è una cifra diversa da tre notti sotto il vetro. Le escursioni con husky, renne e motoslitte si pagano a persona e a uscita.', nl: 'Eén nacht in een glazen iglo en de rest in een cabin is een ander bedrag dan drie nachten onder glas. Husky-, rendier- en sneeuwscootertochten rekenen per persoon en per tocht.', sv: 'En natt i glasigloo och resten i stuga är en annan siffra än tre nätter under glas. Husky-, ren- och skoterturer prissätts per person och per tur.' },
  seoTitle: { en: 'Lapland Wedding Costs: from EUR 5,000 | LaplandWeddings', fi: 'Häiden hinta Lapissa: alkaen 5 000 € | LaplandWeddings', de: 'Hochzeitskosten in Lappland: ab 5 000 € | LaplandWeddings', ja: 'ラップランドの結婚式費用：5,000ユーロから | LaplandWeddings', es: 'Coste de una boda en Laponia: desde 5 000 € | LaplandWeddings', 'pt-BR': 'Custo de casamento na Lapônia: a partir de € 5.000 | LaplandWeddings', 'zh-CN': '拉普兰婚礼费用：5,000 欧元起 | LaplandWeddings', ko: '라플란드 결혼식 비용: 5,000유로부터 | LaplandWeddings', fr: 'Coût d’un mariage en Laponie : à partir de 5 000 € | LaplandWeddings', it: 'Costi matrimonio in Lapponia: da 5 000 € | LaplandWeddings', nl: 'Bruiloftskosten in Lapland: vanaf € 5.000 | LaplandWeddings', sv: 'Bröllopskostnader i Lappland: från 5 000 € | LaplandWeddings' },
  seoDesc: { en: 'What does a wedding in Lapland cost? Our smallest budget is EUR 5,000. What that covers, what pushes the number up, and price ranges for each part of the day.', fi: 'Mitä häät Lapissa maksavat? Pienin budjettimme on 5 000 €. Mitä se kattaa, mikä summaa nostaa ja hintahaarukat päivän jokaiselle osalle.', de: 'Was kostet eine Hochzeit in Lappland? Unser kleinstes Budget sind 5 000 €. Was darin enthalten ist, was die Summe erhöht, und Preisspannen für jeden Teil des Tages.', ja: 'ラップランドの結婚式はいくら？当サイトが承る最小のご予算は5,000ユーロです。その内訳、費用が上がる要因、そして各項目の価格帯をご紹介します。', es: '¿Cuánto cuesta una boda en Laponia? Nuestro presupuesto mínimo son 5 000 €. Qué incluye, qué eleva la cifra y rangos de precio para cada parte del día.', 'pt-BR': 'Quanto custa um casamento na Lapônia? Nosso orçamento mínimo é de € 5.000. O que ele cobre, o que aumenta o valor e faixas de preço para cada parte do dia.', 'zh-CN': '在拉普兰办婚礼要花多少钱？我们承接的最低预算为 5,000 欧元。本页说明这笔预算涵盖什么、哪些因素会推高费用，以及当天各项开支的价格区间。', ko: '라플란드 결혼식 비용은 얼마일까요? 저희가 진행하는 최소 예산은 5,000유로입니다. 그 안에 무엇이 포함되는지, 무엇이 금액을 높이는지, 그리고 항목별 가격대를 정리했습니다.', fr: 'Combien coûte un mariage en Laponie ? Notre budget minimum est de 5 000 €. Ce qu’il couvre, ce qui fait grimper le chiffre, et les fourchettes de prix pour chaque poste.', it: 'Quanto costa un matrimonio in Lapponia? Il nostro budget minimo è di 5 000 €. Cosa comprende, cosa fa salire la cifra e le fasce di prezzo per ogni voce.', nl: 'Wat kost een bruiloft in Lapland? Ons kleinste budget is € 5.000. Wat dat dekt, wat het bedrag omhoog duwt en prijsranges voor elk onderdeel van de dag.', sv: 'Vad kostar ett bröllop i Lappland? Vår minsta budget är 5 000 €. Vad den täcker, vad som driver upp summan och prisintervall för varje del av dagen.' },
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
  s2Subtitle: {
    en: 'Market estimates as of early 2026. Individual planners and venues set their own pricing.',
    fi: 'Hinnat ovat markkinaestimaatteja vuoden 2026 alusta. Yksittäiset suunnittelijat ja venuet hinnoittelevat itsenäisesti.',
    de: 'Marktschätzungen Stand Anfang 2026. Einzelne Planer und Locations legen ihre Preise selbst fest.',
    ja: '2026年初頭時点の市場推定。各プランナーや会場が独自に価格を設定します。',
    es: 'Estimaciones de mercado a principios de 2026: cada organizador y lugar fija sus propios precios.',
    'pt-BR': 'Estimativas de mercado no início de 2026. Cada organizador e local define os próprios preços.',
    'zh-CN': '截至 2026 年初的市场估算，各策划师和场地自行定价。',
    ko: '2026년 초 기준 시장 추정치. 개별 플래너와 웨딩 장소가 자체적으로 가격을 책정합니다.',
    fr: 'Estimations du marché début 2026. Chaque planner et lieu fixe ses propres tarifs.',
    it: 'Stime di mercato a inizio 2026. Singoli planner e location fissano i propri prezzi.',
    nl: 'Marktschattingen begin 2026. Afzonderlijke planners en locaties bepalen hun eigen prijzen.', sv: 'Marknadsuppskattningar från början av 2026. Enskilda planerare och platser sätter sina egna priser.',
  },
  ctaEyebrow: {
    en: 'When you know your budget', fi: 'Kun budjetti on selvillä',
    de: 'Wenn Sie Ihr Budget kennen', ja: '予算が決まったら',
    es: 'Cuando conoces tu presupuesto', 'pt-BR': 'Quando você já sabe seu orçamento',
    'zh-CN': '当你确定了预算', ko: '예산이 정해졌다면',
    fr: 'Quand vous connaissez votre budget', it: 'Quando conosci il tuo budget',
    nl: 'Als je je budget kent', sv: 'När du vet din budget',
  },
  ctaTitle: {
    en: 'Get 3 quotes, compare at your own pace',
    fi: 'Pyydä 3 tarjousta, vertaile rauhassa',
    de: 'Holen Sie 3 Angebote ein, vergleichen Sie in Ruhe',
    ja: '3つの見積もりを取得、自分のペースで比較',
    es: 'Recibe 3 presupuestos, compara a tu ritmo',
    'pt-BR': 'Receba 3 orçamentos, compare no seu ritmo',
    'zh-CN': '获取 3 份报价，按自己的节奏比较',
    ko: '견적 3건 받기, 여유롭게 비교하세요',
    fr: 'Obtenez 3 devis, comparez à votre rythme',
    it: 'Ottieni 3 preventivi, confronta con calma',
    nl: 'Ontvang 3 offertes, vergelijk op je eigen tempo', sv: 'Få 3 offerter och jämför i din egen takt',
  },
  ctaBody: {
    en: 'One form, 1–7 days, 3 personalised proposals from Lapland’s most experienced planners. Free, no commitment. You decide who to continue with.',
    fi: 'Yhdellä lomakkeella saat 1–7 päivän sisällä 3 räätälöityä tarjousta Lapin kokeneimmilta hääsuunnittelijoilta. Maksuton, ei sitoumusta. Sinä päätät kenen kanssa jatkat.',
    de: 'Ein Formular, 1–7 Tage, 3 individuelle Angebote von Lapplands erfahrensten Planern. Kostenlos, unverbindlich. Sie entscheiden, mit wem Sie weitermachen.',
    ja: 'フォームを1つ、1〜7日で、ラップランドで最も経験豊富なプランナーから3つのオーダーメイド提案。無料・無拘束。誰と進めるかはあなた次第です。',
    es: 'Un formulario, de 1 a 7 días, 3 propuestas personalizadas de los organizadores más experimentados de Laponia. Gratis, sin compromiso: tú decides con quién seguir.',
    'pt-BR': 'Um formulário, de 1 a 7 dias, 3 propostas personalizadas dos organizadores mais experientes da Lapônia. Grátis, sem compromisso. Você decide com quem continuar.',
    'zh-CN': '一份表单，1–7 天，来自拉普兰最有经验策划师的 3 份个性化方案。免费、无约束，由你决定与谁继续。',
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
            <div
              key={b.title.en}
              className={`flex items-center justify-between px-5 sm:px-7 py-4 ${
                i !== 0 ? 'border-t border-white/5' : ''
              }`}
            >
              <p className="text-[15px] text-gray-200 min-w-0 pr-3">{pickLocalized(b.title, lang)}</p>
              <p className="font-heading tracking-wide text-rose text-base sm:text-lg whitespace-nowrap shrink-0">
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
