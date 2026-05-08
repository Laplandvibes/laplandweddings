import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { t, type Lang } from './translations';

type Translation = (typeof t)['fi'];

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: Translation;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = 'laplandweddings_lang';

function detectInitialLang(): Lang {
  // English is the primary language for the international destination wedding market.
  // Finnish is opt-in via the language switcher and stored in localStorage.
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'fi' || stored === 'en') return stored;
  return 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang] as Translation }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}

export function useTr() {
  return useContext(LangContext)!.tr;
}

/** Helper for picking a localised string from {fi,en} objects. */
export function loc<T>(value: { fi: T; en: T } | undefined, lang: Lang): T | undefined {
  if (!value) return undefined;
  return value[lang];
}

/**
 * Map a language label (e.g. "Suomi", "Deutsch") to the user's current UI language
 * so the languages list reads natively for the visitor.
 */
const LANG_LABELS: Record<string, { fi: string; en: string }> = {
  Suomi: { fi: 'Suomi', en: 'Finnish' },
  English: { fi: 'Englanti', en: 'English' },
  Deutsch: { fi: 'Saksa', en: 'German' },
  Français: { fi: 'Ranska', en: 'French' },
  Español: { fi: 'Espanja', en: 'Spanish' },
  Svenska: { fi: 'Ruotsi', en: 'Swedish' },
};

export function localiseLanguage(label: string, lang: Lang): string {
  return LANG_LABELS[label]?.[lang] ?? label;
}
