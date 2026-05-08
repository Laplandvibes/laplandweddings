import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, tr } = useLang();

  const items = [
    { to: '/locations', label: tr.nav.locations },
    { to: '/wedding-types', label: tr.nav.types },
    { to: '/venues', label: tr.nav.venues },
    { to: '/planners', label: tr.nav.planners },
    { to: '/practical-guide', label: tr.nav.practical },
    { to: '/pricing', label: tr.nav.pricing },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-night/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3">
        <Link to="/" className="font-heading text-lg sm:text-2xl tracking-wider whitespace-nowrap" onClick={() => setOpen(false)}>
          <span className="text-pink">#</span>
          <span className="text-gray-200">LAPLAND</span>
          <span className="text-rose">WEDDINGS</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive ? 'bg-rose/20 text-rose' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-0.5">
            {(['fi', 'en'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2.5 sm:px-3 min-h-[36px] sm:min-h-0 py-1 text-[11px] sm:text-xs font-semibold rounded-full transition-colors ${
                  lang === code ? 'bg-rose text-white' : 'text-gray-400 hover:text-white'
                }`}
                aria-pressed={lang === code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 bg-rose hover:bg-pink text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-rose/30"
          >
            {tr.cta.getThreeQuotes}
          </Link>

          <button
            className="lg:hidden p-2.5 -mr-2 text-white/80 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-night-light">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {items.map((it) => (
              <NavLink
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
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-3 bg-rose text-white font-semibold rounded-full"
            >
              {tr.cta.getThreeQuotes}
            </Link>
            <div className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-0.5 mt-2 self-start">
              {(['fi', 'en'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    lang === code ? 'bg-rose text-white' : 'text-gray-400'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
