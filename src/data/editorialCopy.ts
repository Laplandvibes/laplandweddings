import type { Localized } from './localized';

/**
 * Copy for the EARNED editorial pick chip and the Google rating row.
 *
 * All twelve locales, in one file rather than spread across the twelve
 * `src/i18n/translations.*.ts` files, because these five strings are one
 * feature and belong together. Note that this is EDITORIAL copy, not ad copy:
 * it must render in every locale. The advertising markers (`Mainos` /
 * `Esittelykumppani`) live in `FeaturedPartnerSlot` and are deliberately fi/en/sv
 * only, because that inventory is `adLocaleEnabled`-gated.
 *
 * `{r}` = rating, `{n}` = review count, `{d}` = date. All three are substituted
 * pre-formatted for the locale via `Intl` (see `googleReviews.ts`), so no locale
 * string may hard-code a decimal separator, a thousands separator or a date
 * format.
 */
export type EditorialCopy = {
  /** Chip label, e.g. "Toimituksen valinta". */
  pickLabel: Localized<string>;
  /** Why this card has the chip — the derivation stated in words. */
  pickReason: Localized<string>;
  /** One card's Google score. Must attribute the number to Google. */
  ratingLine: Localized<string>;
  /** Accessible name for the rating link (it opens Google's review list). */
  ratingAria: Localized<string>;
  /** Snapshot date marker. Never worded as "live". */
  verifiedOn: Localized<string>;
};

export const editorialCopy: EditorialCopy = {
  pickLabel: {
    fi: 'Toimituksen valinta',
    en: 'Editor’s pick',
    de: 'Redaktionsempfehlung',
    ja: '編集部の選定',
    es: 'Selección editorial',
    'pt-BR': 'Escolha da redação',
    'zh-CN': '编辑之选',
    ko: '편집부 추천',
    fr: 'Choix de la rédaction',
    it: 'Scelta della redazione',
    nl: 'Keuze van de redactie',
    sv: 'Redaktionens val',
  },
  pickReason: {
    fi: 'Sivun paras Google-arvio',
    en: 'Highest Google rating on this page',
    de: 'Beste Google-Bewertung auf dieser Seite',
    ja: 'このページで最も高いGoogle評価',
    es: 'La mejor valoración de Google de esta página',
    'pt-BR': 'A melhor avaliação do Google desta página',
    'zh-CN': '本页最高的Google评分',
    ko: '이 페이지에서 가장 높은 Google 평점',
    fr: 'Meilleure note Google de cette page',
    it: 'Miglior valutazione Google di questa pagina',
    nl: 'Hoogste Google-beoordeling op deze pagina',
    sv: 'Sidans högsta Google-betyg',
  },
  ratingLine: {
    fi: 'Google {r} · {n} arvostelua',
    en: 'Google {r} · {n} reviews',
    de: 'Google {r} · {n} Bewertungen',
    ja: 'Google {r}・口コミ{n}件',
    es: 'Google {r} · {n} reseñas',
    'pt-BR': 'Google {r} · {n} avaliações',
    'zh-CN': 'Google {r}·{n}条评价',
    ko: 'Google {r} · 리뷰 {n}개',
    fr: 'Google {r} · {n} avis',
    it: 'Google {r} · {n} recensioni',
    nl: 'Google {r} · {n} beoordelingen',
    sv: 'Google {r} · {n} omdömen',
  },
  ratingAria: {
    fi: 'Avaa Google-arvostelut uudessa välilehdessä',
    en: 'Open the Google reviews in a new tab',
    de: 'Google-Bewertungen in einem neuen Tab öffnen',
    ja: 'Googleの口コミを新しいタブで開く',
    es: 'Abrir las reseñas de Google en una pestaña nueva',
    'pt-BR': 'Abrir as avaliações do Google em uma nova aba',
    'zh-CN': '在新标签页中打开Google评价',
    ko: 'Google 리뷰를 새 탭에서 열기',
    fr: 'Ouvrir les avis Google dans un nouvel onglet',
    it: 'Aprire le recensioni Google in una nuova scheda',
    nl: 'De Google-beoordelingen in een nieuw tabblad openen',
    sv: 'Öppna Google-omdömena i en ny flik',
  },
  verifiedOn: {
    fi: 'Tarkistettu {d}',
    en: 'Checked {d}',
    de: 'Geprüft am {d}',
    ja: '{d}時点',
    es: 'Verificado el {d}',
    'pt-BR': 'Verificado em {d}',
    'zh-CN': '{d}核实',
    ko: '{d} 기준',
    fr: 'Vérifié le {d}',
    it: 'Verificato il {d}',
    nl: 'Gecontroleerd op {d}',
    sv: 'Kontrollerat {d}',
  },
};
