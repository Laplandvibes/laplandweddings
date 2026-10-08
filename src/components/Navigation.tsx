import { useState, useEffect } from 'react';
import L, { NL } from './L';

import { Menu, X} from 'lucide-react';
import { useLang } from '../i18n/LangContext';
import type { Lang } from '../i18n/translations';
import EcosystemMenu from '../shared/EcosystemMenu';
import LanguageSwitcher from '../i18n/LanguageSwitcher';
import type { CSSProperties } from 'react';

// Sanamerkin leveys 1 px:n fontilla (Bebas Neue + tracking-wide). Puhelin- ja tablettinavissa koko lasketaan
// tästä ja vapaasta tilasta (index.css LV-NAV-SANAMERKKI): 24 px (tabletilla 30 px), pienempi vain kun ei mahdu.
const WM_STYLE = { '--lv-wm-k': 6.65, '--lv-wm-max-md': '30px' } as CSSProperties;


export default function Navigation() {
  const [open, setOpen] = useState(false);
  // LV-VALIKKO-VAAKA (8.10.2026): Escape sulkee mobiilivalikon.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const { lang, tr } = useLang();
  // fi/ja 1280–1439 px: standardinavissa (reunat 32 px) kielivalitsin työntyi 9–10 px
  // oikeaan reunatilaan (mitattu 2.10.2026), joten linkkien sivutila 12 → 10 px vain niille.
  const linkPad = lang === 'fi' || lang === 'ja' ? 'px-2.5 min-[90rem]:px-3' : 'px-3';




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
      <div className="lv-navrivi max-w-screen-2xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3 px-2 sm:px-6 py-2.5 sm:py-3 xl:h-16 xl:px-8 xl:py-0">
        <div className="lv-navvasen flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={lang} currentDomain="laplandweddings.online" />
          <div className="lv-wm-paikka">
            <L to="/" className="lv-wm font-logo text-2xl sm:text-3xl tracking-wide whitespace-nowrap inline-flex items-center min-h-11" data-lv-sanamerkki="" style={WM_STYLE} onClick={() => setOpen(false)}>
              <span style={{ color: '#F472B6' }}>#</span>
              <span style={{ color: '#FFFFFF' }}>LAPLAND</span>
              <span style={{ color: '#F472B6' }}>WEDDINGS</span>
            </L>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-1">
          {items.map((it) => (
            <NL
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `${linkPad} py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
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
              (FR) rather than `native` (Français) and is width-capped. At 360px the bar is
              8 + 228.5 (ecosystem 57 + 12 + wordmark 159.5) + 6 + 108 (switcher 68 + 4 +
              button 44 − 8) + 8 = 358.5px, so the two gaps here are 6 and 4px: at 8 and 6
              it came to 362.5px and every page scrolled sideways by 2px. */}
          <div className="xl:hidden flex items-center gap-1 shrink-0">
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

      {/* LV-VALIKKO-VAAKA (8.10.2026): laatikko oli navin sisällä ilman korkeusrajaa, joten vaakapuhelimessa
          alimmat linkit jäivät ruudun ulkopuolelle. Nyt enintään näkyvän ruudun korkuinen ja vierittyvä,
          ≥ 640 px palstoina; z-[45] verkostovalikon vihjeen (z 40) yli. */}
      {open && (
        <div className="xl:hidden border-t border-white/10 bg-night-light max-h-[calc(100vh_-_4.5rem)] supports-[height:100dvh]:max-h-[calc(100dvh_-_4.5rem)] overflow-y-auto overscroll-contain relative z-[45]">
          <nav className="px-4 py-3 flex flex-col gap-1 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-x-4 sm:content-start">
            <L
              to="/contact"
              onClick={() => setOpen(false)}
              data-umami-event="cta_quote_nav"
              className="mb-1 inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold sm:col-span-full"
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
