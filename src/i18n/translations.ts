/**
 * Static per-locale translations. All 11 locales bundled into the main chunk.
 * Lazy-loading was attempted (Faasi 9) but caused React useContext=null in
 * production, reverted to static imports 2026-05-22.
 *
 * Lang is exported here as the canonical type. Components that only need the
 * Lang type should `import type { Lang } from './translations'`, that import
 * is erased at build time and adds no bytes.
 */
import enSync from './translations.en';
import fiSync from './translations.fi';
import deSync from './translations.de';
import jaSync from './translations.ja';
import esSync from './translations.es';
import ptBRSync from './translations.ptBR';
import zhCNSync from './translations.zhCN';
import koSync from './translations.ko';
import frSync from './translations.fr';
import itSync from './translations.it';
import nlSync from './translations.nl';

export type Lang = 'fi' | 'en' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';

// Use the EN block as the canonical shape, all other locales share the same keys.
export type Translation = typeof enSync;

// The runtime `t` map. All locales preloaded synchronously.
export const t: Record<Lang, Translation> = {
  en: enSync,
  fi: fiSync as unknown as Translation,
  de: deSync as unknown as Translation,
  ja: jaSync as unknown as Translation,
  es: esSync as unknown as Translation,
  'pt-BR': ptBRSync as unknown as Translation,
  'zh-CN': zhCNSync as unknown as Translation,
  ko: koSync as unknown as Translation,
  fr: frSync as unknown as Translation,
  it: itSync as unknown as Translation,
  nl: nlSync as unknown as Translation,
};

/** No-op kept for API compatibility with LangContext (used to be async loader). */
export function loadLang(_lang: Lang): Promise<void> {
  return Promise.resolve();
}

/** No-op subscribe kept for API compatibility. Returns no-op unsubscribe. */
export function subscribeLangLoaded(_fn: () => void): () => void {
  return () => {};
}

/** Always true, all locales are loaded statically. */
export function isLangLoaded(_lang: Lang): boolean {
  return true;
}

// Back-compat: keep the named type used by other modules.
export type Translations = typeof t;
