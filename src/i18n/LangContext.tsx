import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { t, loadLang, subscribeLangLoaded, isLangLoaded, type Lang, type Translation } from './translations';

type Translations = Translation;

/**
 * Data files carry all 11 locales. `dataLang` is the real current locale used
 * to index into localized data objects (Localized<T> = Record<Lang, T>).
 */
export type DataLang = Lang;

interface LangContextValue {
  lang: Lang;
  /** The real current locale, used to index into localized data objects. */
  dataLang: DataLang;
  setLang: (lang: Lang) => void;
  tr: Translations;
  localePath: (path: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const PREFIXES: { lang: Lang; prefix: string }[] = [
  { lang: 'fi', prefix: '/fi' },
  { lang: 'de', prefix: '/de' },
  { lang: 'ja', prefix: '/ja' },
  { lang: 'es', prefix: '/es' },
  { lang: 'pt-BR', prefix: '/br' },
  { lang: 'zh-CN', prefix: '/cn' },
  { lang: 'ko', prefix: '/kr' },
  { lang: 'fr', prefix: '/fr' },
  { lang: 'it', prefix: '/it' },
  { lang: 'nl', prefix: '/nl' },
];

/** Strips a leading locale prefix from a path, returning the canonical (EN) path. */
function stripPrefix(path: string): string {
  for (const { prefix } of PREFIXES) {
    if (path === prefix) return '/';
    if (path.startsWith(prefix + '/')) return path.slice(prefix.length);
  }
  return path;
}

/** Builds a path including the locale prefix when lang !== 'en'. Always starts with /. */
export function buildPath(lang: Lang, path: string): string {
  const clean = stripPrefix(path.startsWith('/') ? path : '/' + path);
  if (lang === 'en') return clean;
  const entry = PREFIXES.find((p) => p.lang === lang);
  if (!entry) return clean;
  return clean === '/' ? entry.prefix : entry.prefix + clean;
}

export function detectLangFromPath(pathname: string): Lang {
  for (const { lang, prefix } of PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) return lang;
  }
  return 'en';
}

const BCP47: Record<Lang, string> = {
  en: 'en-US',
  fi: 'fi-FI',
  de: 'de-DE',
  ja: 'ja-JP',
  es: 'es-ES',
  'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN',
  ko: 'ko-KR',
  fr: 'fr-FR',
  it: 'it-IT',
  nl: 'nl-NL',
};

export function LangProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = detectLangFromPath(location.pathname);

  // Re-render tick that increments when a lazy locale chunk finishes loading.
  const [loadedTick, setLoadedTick] = useState(0);

  // Kick off lazy locale load + subscribe for completion.
  useEffect(() => {
    if (isLangLoaded(lang)) return;
    let cancelled = false;
    const unsub = subscribeLangLoaded(() => {
      if (!cancelled && isLangLoaded(lang)) setLoadedTick((n) => n + 1);
    });
    loadLang(lang).catch(() => {
      /* fallback to EN remains in place */
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [lang]);

  // Sync <html lang> attribute (BCP-47)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = BCP47[lang];
    }
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dataLang: lang,
      setLang: (next) => {
        if (next === lang) return;
        const canonical = stripPrefix(location.pathname);
        const target = buildPath(next, canonical);
        navigate(target + location.search + location.hash, { replace: false });
      },
      tr: t[lang] as Translations,
      localePath: (path) => buildPath(lang, path),
    }),
    // loadedTick intentionally included so consumers refresh once locale arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, location.pathname, location.search, location.hash, navigate, loadedTick],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}

export function useTr() {
  return useContext(LangContext)!.tr;
}

/**
 * Helper for picking a localised value from a fully-populated 11-locale object,
 * with EN fallback for any locale that is somehow missing at runtime.
 * Accepts partially-populated objects too (older shapes), `en` is required.
 */
export function loc<T>(
  value: ({ en: T } & Partial<Record<Lang, T>>) | undefined,
  lang: Lang,
): T | undefined {
  if (!value) return undefined;
  return value[lang] ?? value.en;
}

/** Localise language labels ("Suomi" → "Finnish" in English mode, etc.) */
export function localiseLanguage(label: string, lang: Lang): string {
  if (lang === 'fi') {
    const map: Record<string, string> = {
      English: 'Englanti',
      Deutsch: 'Saksa',
      Français: 'Ranska',
      Español: 'Espanja',
      Suomi: 'Suomi',
    };
    return map[label] || label;
  }
  if (lang === 'de') {
    const map: Record<string, string> = {
      English: 'Englisch',
      Deutsch: 'Deutsch',
      Suomi: 'Finnisch',
      Français: 'Französisch',
      Español: 'Spanisch',
    };
    return map[label] || label;
  }
  const map: Record<string, string> = {
    Suomi: 'Finnish',
    Deutsch: 'German',
    Français: 'French',
    Español: 'Spanish',
    English: 'English',
  };
  return map[label] || label;
}
