import type { Localized } from './localized';

/**
 * Short labels for the explanatory diagrams (Vesa 19.9.2026, looking at /pricing:
 * "eikö tähän voisi tehdä ihan havainnekuvia, jotain mikä selkeyttäisi?").
 *
 * Every diagram draws only what the page's own copy already states: the price
 * rows and their sources, the three seasons of the practical guide, the
 * "one glass-igloo night, the rest in a cabin" sentence. No new figures live
 * here; when a number appears in a diagram it is read from the same data the
 * text uses. Labels below are the only new strings, kept short on purpose.
 */
export const DIAG = {
  /* Season band, price reading (/pricing) */
  peak: {
    fi: 'Pääsesonki, kallein', en: 'Peak season, most expensive', de: 'Hauptsaison, am teuersten',
    ja: 'ピークシーズン、最も高い', es: 'Temporada alta, la más cara', 'pt-BR': 'Alta temporada, a mais cara',
    'zh-CN': '旺季，价格最高', ko: '성수기, 가장 비쌈', fr: 'Haute saison, la plus chère',
    it: 'Alta stagione, la più cara', nl: 'Hoogseizoen, het duurst', sv: 'Högsäsong, dyrast',
  },
  shoulder: {
    fi: 'Kevät ja syksy, edullisempi', en: 'Spring and autumn, cheaper', de: 'Frühling und Herbst, günstiger',
    ja: '春と秋、より手頃', es: 'Primavera y otoño, más barato', 'pt-BR': 'Primavera e outono, mais barato',
    'zh-CN': '春秋两季，价格更低', ko: '봄과 가을, 더 저렴함', fr: 'Printemps et automne, moins cher',
    it: 'Primavera e autunno, più economica', nl: 'Lente en herfst, goedkoper', sv: 'Vår och höst, billigare',
  },
  summer: {
    fi: 'Keskiyön aurinko 23.5.–24.7.', en: 'Midnight sun 23 May – 24 Jul', de: 'Mitternachtssonne 23.5.–24.7.',
    ja: '白夜 5月23日〜7月24日', es: 'Sol de medianoche 23 may – 24 jul', 'pt-BR': 'Sol da meia-noite 23/5 – 24/7',
    'zh-CN': '午夜阳光 5月23日–7月24日', ko: '백야 5월 23일–7월 24일', fr: 'Soleil de minuit 23 mai – 24 juil.',
    it: 'Sole di mezzanotte 23 mag – 24 lug', nl: 'Middernachtzon 23 mei – 24 jul', sv: 'Midnattssol 23.5–24.7',
  },

  /* Guests pictogram (/pricing) */
  perGuest: {
    fi: 'Jokainen vieras: ruoka, kuljetus, vuode', en: 'Every guest: food, transport, a bed',
    de: 'Jeder Gast: Essen, Transport, Bett', ja: 'ゲスト1人ごとに：食事、送迎、宿泊',
    es: 'Cada invitado: comida, transporte, cama', 'pt-BR': 'Cada convidado: comida, transporte, cama',
    'zh-CN': '每位宾客：餐饮、交通、住宿', ko: '하객 1명마다: 식사, 이동, 숙박',
    fr: 'Chaque invité : repas, transport, lit', it: 'Ogni ospite: cibo, trasporto, letto',
    nl: 'Elke gast: eten, vervoer, bed', sv: 'Varje gäst: mat, transport, säng',
  },
  guestsWord: {
    fi: 'vierasta', en: 'guests', de: 'Gäste', ja: '名', es: 'invitados', 'pt-BR': 'convidados',
    'zh-CN': '位宾客', ko: '명', fr: 'invités', it: 'ospiti', nl: 'gasten', sv: 'gäster',
  },

  /* Nights split (/pricing) */
  glassNight: {
    fi: 'lasi-iglu', en: 'glass igloo', de: 'Glasiglu', ja: 'ガラスイグルー', es: 'iglú de cristal',
    'pt-BR': 'iglu de vidro', 'zh-CN': '玻璃冰屋', ko: '유리 이글루', fr: 'igloo de verre',
    it: 'igloo di vetro', nl: 'glazen iglo', sv: 'glasigloo',
  },
  cabinNight: {
    fi: 'mökki', en: 'cabin', de: 'Hütte', ja: 'コテージ', es: 'cabaña', 'pt-BR': 'cabana',
    'zh-CN': '木屋', ko: '오두막', fr: 'chalet', it: 'baita', nl: 'blokhut', sv: 'stuga',
  },
  cheaper: {
    fi: 'edullisempi', en: 'cheaper', de: 'günstiger', ja: 'より手頃', es: 'más barato', 'pt-BR': 'mais barato',
    'zh-CN': '更便宜', ko: '더 저렴함', fr: 'moins cher', it: 'più economico', nl: 'goedkoper', sv: 'billigare',
  },
  dearer: {
    fi: 'kalliimpi', en: 'more expensive', de: 'teurer', ja: 'より高い', es: 'más caro', 'pt-BR': 'mais caro',
    'zh-CN': '更贵', ko: '더 비쌈', fr: 'plus cher', it: 'più caro', nl: 'duurder', sv: 'dyrare',
  },

  /* Cost range chart (/pricing) */
  rangeTitle: {
    fi: 'Hintahaarukat samalla asteikolla', en: 'Price ranges on one scale', de: 'Preisspannen auf einer Skala',
    ja: '同じ目盛りで見る価格帯', es: 'Rangos de precio en una misma escala', 'pt-BR': 'Faixas de preço na mesma escala',
    'zh-CN': '同一刻度下的价格区间', ko: '동일한 척도의 가격대', fr: 'Fourchettes de prix sur une même échelle',
    it: 'Fasce di prezzo sulla stessa scala', nl: 'Prijsranges op één schaal', sv: 'Prisintervall på samma skala',
  },

  /* Two-routes fork (/practical-guide) */
  forkQuestion: {
    fi: 'Pitääkö avioliiton olla juridisesti pätevä Suomessa?', en: 'Does the marriage need to be legally valid in Finland?',
    de: 'Muss die Ehe in Finnland rechtsgültig sein?', ja: 'フィンランドで法的に有効な婚姻にする必要がありますか？',
    es: '¿Debe el matrimonio ser legalmente válido en Finlandia?', 'pt-BR': 'O casamento precisa ter validade legal na Finlândia?',
    'zh-CN': '婚姻需要在芬兰具有法律效力吗？', ko: '핀란드에서 법적 효력이 있는 혼인이어야 하나요?',
    fr: 'Le mariage doit-il être juridiquement valide en Finlande ?', it: 'Il matrimonio deve essere legalmente valido in Finlandia?',
    nl: 'Moet het huwelijk in Finland rechtsgeldig zijn?', sv: 'Måste äktenskapet vara juridiskt giltigt i Finland?',
  },
  no: { fi: 'Ei', en: 'No', de: 'Nein', ja: 'いいえ', es: 'No', 'pt-BR': 'Não', 'zh-CN': '否', ko: '아니요', fr: 'Non', it: 'No', nl: 'Nee', sv: 'Nej' },
  yes: { fi: 'Kyllä', en: 'Yes', de: 'Ja', ja: 'はい', es: 'Sí', 'pt-BR': 'Sim', 'zh-CN': '是', ko: '예', fr: 'Oui', it: 'Sì', nl: 'Ja', sv: 'Ja' },
  mostCouples: {
    fi: 'Useimmat parit', en: 'Most couples', de: 'Die meisten Paare', ja: 'ほとんどのカップル', es: 'La mayoría de las parejas',
    'pt-BR': 'A maioria dos casais', 'zh-CN': '大多数新人', ko: '대부분의 커플', fr: 'La plupart des couples',
    it: 'La maggior parte delle coppie', nl: 'De meeste stellen', sv: 'De flesta par',
  },
  symNoPapers: {
    fi: 'Ei lupia, ei DVV:tä', en: 'No permits, no DVV', de: 'Keine Genehmigungen, kein DVV', ja: '許可もDVVも不要',
    es: 'Sin permisos, sin DVV', 'pt-BR': 'Sem licenças, sem DVV', 'zh-CN': '无需许可，无需 DVV', ko: '허가도 DVV도 필요 없음',
    fr: 'Ni permis ni DVV', it: 'Niente permessi, niente DVV', nl: 'Geen vergunningen, geen DVV', sv: 'Inga tillstånd, ingen DVV',
  },
  symDate: {
    fi: 'Päivä vapaasti valittavissa', en: 'Any date you like', de: 'Datum frei wählbar', ja: '日付は自由に選べる',
    es: 'Cualquier fecha', 'pt-BR': 'Qualquer data', 'zh-CN': '日期任选', ko: '원하는 날짜 자유롭게 선택',
    fr: 'La date de votre choix', it: 'Data a piacere', nl: 'Elke datum die u wilt', sv: 'Valfritt datum',
  },
  symHome: {
    fi: 'Avioliitto rekisteröidään kotimaassa', en: 'Marriage registered at home', de: 'Ehe wird zu Hause registriert',
    ja: '婚姻は母国で登録', es: 'El matrimonio se registra en su país', 'pt-BR': 'O casamento é registrado no país de origem',
    'zh-CN': '在本国登记结婚', ko: '혼인은 본국에서 등록', fr: 'Mariage enregistré dans votre pays',
    it: 'Matrimonio registrato nel vostro Paese', nl: 'Huwelijk thuis geregistreerd', sv: 'Äktenskapet registreras hemma',
  },
  legExam: {
    fi: 'Avioliiton esteiden tutkinta', en: 'Examination of impediments', de: 'Ehefähigkeitsprüfung', ja: '婚姻障害の審査',
    es: 'Examen de impedimentos', 'pt-BR': 'Exame de impedimentos', 'zh-CN': '婚姻障碍审查', ko: '혼인 장애 심사',
    fr: 'Examen des empêchements', it: 'Esame degli impedimenti', nl: 'Onderzoek naar huwelijksbeletselen', sv: 'Hindersprövning',
  },
  legCert: {
    fi: 'Todistus kotimaasta + apostille', en: 'Certificate from home + apostille', de: 'Bescheinigung aus dem Heimatland + Apostille',
    ja: '母国の証明書＋アポスティーユ', es: 'Certificado de su país + apostilla', 'pt-BR': 'Certidão do país de origem + apostila',
    'zh-CN': '本国证明 + 海牙认证', ko: '본국 증명서 + 아포스티유', fr: 'Certificat du pays + apostille',
    it: 'Certificato dal Paese d’origine + apostille', nl: 'Verklaring uit thuisland + apostille', sv: 'Intyg hemifrån + apostille',
  },
  legWeeks: {
    fi: 'Varaa 4–8 viikkoa', en: 'Allow 4–8 weeks', de: '4–8 Wochen einplanen', ja: '4〜8週間を見込む',
    es: 'Cuente con 4–8 semanas', 'pt-BR': 'Reserve 4–8 semanas', 'zh-CN': '预留 4–8 周', ko: '4~8주 여유 두기',
    fr: 'Comptez 4 à 8 semaines', it: 'Calcolate 4–8 settimane', nl: 'Reken op 4–8 weken', sv: 'Räkna med 4–8 veckor',
  },
  legSteps: {
    fi: '6 vaihetta alla', en: '6 steps below', de: '6 Schritte unten', ja: '以下の6ステップ', es: '6 pasos a continuación',
    'pt-BR': '6 etapas abaixo', 'zh-CN': '下方 6 个步骤', ko: '아래 6단계', fr: '6 étapes ci-dessous',
    it: '6 passaggi qui sotto', nl: '6 stappen hieronder', sv: '6 steg nedan',
  },

  /* /contact page */
  contactSeoTitle: {
    fi: 'Pyydä 1–3 tarjousta Lapin häihin', en: 'Request 1–3 Lapland wedding quotes',
    de: 'Fordern Sie 1–3 Angebote für Ihre Hochzeit in Lappland an', ja: 'ラップランド挙式の見積もりを1〜3件依頼',
    es: 'Pida 1–3 presupuestos para su boda en Laponia', 'pt-BR': 'Peça 1–3 orçamentos para seu casamento na Lapônia',
    'zh-CN': '索取 1–3 份拉普兰婚礼报价', ko: '라플란드 결혼식 견적 1~3건 요청',
    fr: 'Demandez 1 à 3 devis pour votre mariage en Laponie', it: 'Richiedete 1–3 preventivi per il matrimonio in Lapponia',
    nl: 'Vraag 1–3 offertes aan voor uw bruiloft in Lapland', sv: 'Begär 1–3 offerter för ert bröllop i Lappland',
  },
} satisfies Record<string, Localized<string>>;

export type DiagKey = keyof typeof DIAG;
