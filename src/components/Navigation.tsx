import { useState} from 'react';
import L, { NL } from './L';

import { Menu, X} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';
import EcosystemMenu from '../shared/EcosystemMenu';
import LanguageSwitcher from '../i18n/LanguageSwitcher';


export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { lang, tr } = useLang();




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
    it:      { switchLang: 'Cambia lingua',         language: 'Lingua',   menu: 'Menu' },
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
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={lang} currentDomain="laplandweddings.online" />
          <L to="/" className="font-logo text-2xl sm:text-3xl tracking-wide whitespace-nowrap inline-flex items-center min-h-11" onClick={() => setOpen(false)}>
            <span style={{ color: '#F472B6' }}>#</span>
            <span style={{ color: '#FFFFFF' }}>LAPLAND</span>
            <span style={{ color: '#F472B6' }}>WEDDINGS</span>
          </L>
        </div>

        <nav className="hidden xl:flex items-center gap-1">
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
          {/* Vesa 19.9.2026: "lomake pitäisi olla paremmin löydettävissä, liidejä tullut
              tosi vähän" — the quote form gets a button in the bar on every page. */}
          <L
            to="/contact"
            data-umami-event="cta_quote_nav"
            className="ml-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-md shadow-rose/30 hover:bg-pink transition-colors"
            style={{ color: '#FFFFFF', background: '#C9466A' }}
          >
            {tr.cta.getThreeQuotesShort}
          </L>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop dropdown */}
          <div className="hidden xl:block relative">
            <LanguageSwitcher tone={'dark'} />
          </div>

          {/* Mobile language switcher, next to the hamburger — the network pattern
              (cf. laplandskiresorts Header.tsx). It had been dropped here to stop the
              375px header overflowing, which left the only mobile control buried at
              the bottom of the drawer. Restored as the compact ISO-code select: the
              wordmark + ecosystem button already crowd this bar, so it shows `label`
              (FR) rather than `native` (Français) and is width-capped. Verified: no
              horizontal overflow at 375px. */}
          <div className="xl:hidden flex items-center gap-1.5 shrink-0">
            <div className="relative inline-block">
              <LanguageSwitcher tone={'dark'} />
            </div>

            <button
              className="p-2 -mr-2 text-white/80 hover:text-white inline-flex items-center justify-center min-h-11 min-w-11"
              onClick={() => setOpen(!open)}
              aria-label={aria.menu}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-white/10 bg-night-light">
          <nav className="px-4 py-3 flex flex-col gap-1">
            <L
              to="/contact"
              onClick={() => setOpen(false)}
              data-umami-event="cta_quote_nav"
              className="mb-1 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold"
              style={{ color: '#FFFFFF', background: '#C9466A' }}
            >
              {tr.cta.getThreeQuotes}
            </L>
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
