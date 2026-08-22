import { useState, useEffect, useRef } from 'react';
import L, { NL } from './L';

import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';
import EcosystemMenu from '../shared/EcosystemMenu';

const ALL_LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'fi', label: 'FI', native: 'Suomi' },
  { code: 'de', label: 'DE', native: 'Deutsch' },
  { code: 'ja', label: 'JA', native: '日本語' },
  { code: 'es', label: 'ES', native: 'Español' },
  { code: 'pt-BR', label: 'BR', native: 'Português' },
  { code: 'zh-CN', label: 'CN', native: '简体中文' },
  { code: 'ko', label: 'KR', native: '한국어' },
  { code: 'fr', label: 'FR', native: 'Français' },
  { code: 'it', label: 'IT', native: 'Italiano' },
  { code: 'nl', label: 'NL', native: 'Nederlands' },
  { code: 'sv', label: 'SV', native: 'Svenska' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, tr } = useLang();

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!langWrapRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  const setLangAndStore = (code: Lang) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try { window.localStorage.setItem('lv_locale_choice', code); } catch { /* noop */ }
    }
    setLang(code);
  };

  const currentLangLabel = ALL_LANGS.find((l) => l.code === lang)?.label ?? 'EN';

  // Accessibility aria translations (KO/FR/IT/NL screen-reader leaks fix).
  const ARIA: Record<Lang, { switchLang: string; language: string; menu: string }> = {
    en:      { switchLang: 'Switch language',     language: 'Language', menu: 'Menu' },
    fi:      { switchLang: 'Vaihda kieli',        language: 'Kieli',    menu: 'Valikko' },
    de:      { switchLang: 'Sprache wechseln',    language: 'Sprache',  menu: 'Menü' },
    ja:      { switchLang: '言語を切り替える',     language: '言語',     menu: 'メニュー' },
    es:      { switchLang: 'Cambiar idioma',      language: 'Idioma',   menu: 'Menú' },
    'pt-BR': { switchLang: 'Mudar idioma',        language: 'Idioma',   menu: 'Menu' },
    'zh-CN': { switchLang: '切换语言',             language: '语言',     menu: '菜单' },
    ko:      { switchLang: '언어 변경',            language: '언어',     menu: '메뉴' },
    fr:      { switchLang: 'Changer de langue',   language: 'Langue',   menu: 'Menu' },
    it:      { switchLang: 'Cambia lingua',       language: 'Lingua',   menu: 'Menu' },
    nl:      { switchLang: 'Taal wijzigen',       language: 'Taal',     menu: 'Menu' },
    sv:      { switchLang: 'Byt språk',           language: 'Språk',    menu: 'Meny' },
  };
  const aria = ARIA[lang] ?? ARIA.en;

  const items = [
    { to: '/locations', label: tr.nav.locations },
    { to: '/wedding-types', label: tr.nav.types },
    { to: '/venues', label: tr.nav.venues },
    // /photographers was in the sitemap in 9 locales with ZERO internal links
    // anywhere on the site (measured 2026-08-02) — a real page listing six named
    // photographers that no visitor could reach by navigating.
    { to: '/photographers', label: tr.nav.photographers },
    { to: '/practical-guide', label: tr.nav.practical },
    { to: '/pricing', label: tr.nav.pricing },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: 'rgba(31, 22, 18, 0.92)', borderBottom: '1px solid rgba(245,235,224,0.10)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={lang} currentDomain="laplandweddings.online" />
          <L to="/" className="font-logo text-2xl sm:text-3xl tracking-wide whitespace-nowrap" onClick={() => setOpen(false)}>
            <span style={{ color: '#F472B6' }}>#</span>
            <span style={{ color: '#FFFFFF' }}>LAPLAND</span>
            <span style={{ color: '#F472B6' }}>WEDDINGS</span>
          </L>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((it) => (
            <NL
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive ? 'bg-rose/20 text-rose' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {it.label}
            </NL>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop dropdown */}
          <div className="hidden lg:block relative" ref={langWrapRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={aria.switchLang}
              className="bg-slate-900/85 backdrop-blur-sm flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/40 text-white/90 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {currentLangLabel}
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <ul
                role="listbox"
                aria-label={aria.language}
                className="absolute right-0 top-full mt-2 min-w-[180px] py-1 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto border border-white/15"
                style={{ background: 'rgba(31,22,18,0.97)', backdropFilter: 'blur(12px)' }}
              >
                {ALL_LANGS.map((item) => {
                  const isActive = item.code === lang;
                  return (
                    <li key={item.code} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => { setLangAndStore(item.code); setLangOpen(false); }}
                        aria-current={isActive ? 'page' : undefined}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                          isActive
                            ? 'bg-rose/20 text-rose font-semibold'
                            : 'text-white/85 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="w-8 font-semibold text-xs tracking-wider">{item.label}</span>
                        <span>{item.native}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Mobile language switcher, next to the hamburger — the network pattern
              (cf. laplandskiresorts Header.tsx). It had been dropped here to stop the
              375px header overflowing, which left the only mobile control buried at
              the bottom of the drawer. Restored as the compact ISO-code select: the
              wordmark + ecosystem button already crowd this bar, so it shows `label`
              (FR) rather than `native` (Français) and is width-capped. Verified: no
              horizontal overflow at 375px. */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            <div className="relative inline-block">
              <select
                value={lang}
                onChange={(e) => setLangAndStore(e.target.value as Lang)}
                aria-label={aria.language}
                className="appearance-none max-w-[5.5rem] bg-transparent border border-white/40 rounded pl-2 pr-5 py-1 text-xs font-semibold text-white/90"
              >
                {ALL_LANGS.map((l) => (
                  <option key={l.code} value={l.code} className="bg-night text-white">
                    {l.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-white/80" />
            </div>

            <button
              className="p-2.5 -mr-2 text-white/80 hover:text-white"
              onClick={() => setOpen(!open)}
              aria-label={aria.menu}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-night-light">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {items.map((it) => (
              <NL
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-rose/20 text-rose' : 'text-gray-300 hover:bg-white/5'
                  }`
                }
              >
                {it.label}
              </NL>
            ))}
            {/* The 12-language pill grid that used to sit here is gone: the switcher
                now lives in the top bar next to the hamburger, as on the rest of the
                network. Keeping both duplicated the control and was what made this
                drawer feel unlike the other sites. */}
          </nav>
        </div>
      )}
    </header>
  );
}
