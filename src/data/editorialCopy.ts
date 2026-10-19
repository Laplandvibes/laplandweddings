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
  /** One card's Google score. Must attribute the number to Google. */
  ratingLine: Localized<string>;
  /** Accessible name for the rating link (it opens Google's review list). */
  ratingAria: Localized<string>;
  /** Snapshot date marker. Never worded as "live". */
  verifiedOn: Localized<string>;
};

export const editorialCopy: EditorialCopy = {
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
