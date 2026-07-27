import type { Lang } from '../i18n/translations';

/**
 * A localized value carrying every supported locale.
 *
 * Data files (venues, locations, weddingTypes, planners, photographers) fill
 * all 12 locales so consumers can index directly with `value[dataLang]`.
 * For robustness, `pickLocalized` is provided with an English fallback in case
 * a key is ever missing at runtime.
 */
export type Localized<T> = Record<Lang, T>;

/** Reads a localized value for `lang`, falling back to English if absent. */
export function pickLocalized<T>(value: Localized<T>, lang: Lang): T {
  const v = value[lang];
  return v !== undefined ? v : value.en;
}
