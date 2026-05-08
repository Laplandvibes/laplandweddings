import { Link } from 'react-router-dom';
import { AlertCircle, Briefcase, Newspaper } from 'lucide-react';

// Finnish flag colors — match CookieBanner
const BLUE = '#002F6C';
const WHITE = '#F8FAFC';
const PINK = '#EC4899';

const defaultPillarLinks = [
  { name: 'Northern Lights', href: 'https://laplandnorthernlights.com' },
  { name: 'Husky Safaris', href: 'https://laplandhuskysafaris.com' },
  { name: 'Ski Resorts', href: 'https://laplandskiresorts.com' },
  { name: 'Where to Stay', href: 'https://laplandstays.com' },
  { name: 'Things to Do', href: 'https://laplandactivities.online' },
  { name: 'Nature & Parks', href: 'https://laplandnature.com' },
];

const siteGroups = [
  {
    title: 'Stay',
    links: [
      { name: 'Hotel Deals', url: 'https://laplandhoteldeals.com' },
      { name: 'Stays & Cabins', url: 'https://laplandstays.com' },
      { name: 'Where to Stay', url: 'https://stayinlapland.com' },
      { name: 'Family Friendly', url: 'https://laplandkids.com' },
    ],
  },
  {
    title: 'Eat & Drink',
    links: [
      { name: 'Local Food', url: 'https://laplandfood.com' },
      { name: 'Fine Dining', url: 'https://laplanddining.com' },
      { name: 'Bars & Pubs', url: 'https://laplandbars.com' },
    ],
  },
  {
    title: 'Do',
    links: [
      { name: 'Activities', url: 'https://laplandactivities.online' },
      { name: 'Husky Safaris', url: 'https://laplandhuskysafaris.com' },
      { name: 'Ski Resorts', url: 'https://laplandskiresorts.com' },
      { name: 'Snowmobile Tours', url: 'https://laplandsnowmobile.com' },
      { name: 'Spa & Wellness', url: 'https://laplandwellness.com' },
      { name: 'Nightlife', url: 'https://laplandnightlife.com' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { name: 'Nature & Parks', url: 'https://laplandnature.com' },
      { name: 'Travel Guide', url: 'https://laplandvisit.com' },
      { name: 'Christmas in Lapland', url: 'https://laplandchristmas.com' },
      { name: 'Gifts & Souvenirs', url: 'https://laplandgifts.com' },
      { name: 'Travel Blog', url: 'https://lapland.blog' },
    ],
  },
  {
    title: 'Essentials',
    links: [
      { name: 'Deals & Offers', url: 'https://laplanddeals.com' },
      { name: 'Transport', url: 'https://laplandtransport.com' },
      { name: 'Car Rental', url: 'https://laplandcarrental.com' },
      { name: 'Work in Lapland', url: 'https://laplandwork.fi' },
    ],
  },
];

const socials = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" opacity="0.9" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/laplandvibesofficial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@laplandvibesofficial',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

interface SharedFooterProps {
  pillarLinks?: { name: string; href: string }[];
  onPillarClick?: (name: string) => void;
}

export default function SharedFooter({ pillarLinks = defaultPillarLinks, onPillarClick }: SharedFooterProps) {
  return (
    <footer>

      {/* ═══ GRADIENT TRANSITION — blends page content above into the footer's first blue band ═══ */}
      <div
        aria-hidden="true"
        style={{
          height: '100px',
          background: `linear-gradient(to bottom, transparent, ${BLUE})`,
        }}
      />

      {/* ═══ BAND 1: BLUE — Logo, badge, socials ═══ */}
      <div style={{ background: BLUE }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-12">

          {/* Finnish Lapland Network badge */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="flex-1 h-px" style={{ background: 'rgba(248,250,252,0.25)' }} />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-normal tracking-wide"
              style={{ background: 'rgba(248,250,252,0.08)', border: '1px solid rgba(248,250,252,0.3)', color: WHITE }}>
              <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 20, height: 13, borderRadius: 2, background: WHITE, border: '1px solid rgba(0,47,108,0.5)' }}>
                <div className="absolute left-0 right-0" style={{ top: 4, height: 4, background: BLUE }} />
                <div className="absolute top-0 bottom-0" style={{ left: 5, width: 4, background: BLUE }} />
              </div>
              Finnish Lapland Network
            </div>
            <div className="flex-1 h-px" style={{ background: 'rgba(248,250,252,0.25)' }} />
          </div>

          {/* Logo + tagline + socials */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
            <div>
              <span className="font-heading tracking-wide text-3xl md:text-5xl">
                <span className="text-vibe-pink">#</span>
                <span style={{ color: WHITE }}>LAPLAND</span>
                <span className="text-vibe-pink">VIBES</span>
              </span>
              <p className="text-[13px] sm:text-sm font-normal mt-2 tracking-wide" style={{ color: 'rgba(248,250,252,0.75)' }}>
                The definitive digital home for Finnish Lapland travel.
              </p>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ background: 'rgba(248,250,252,0.12)', border: '1px solid rgba(248,250,252,0.3)', color: WHITE }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#EC4899';
                    (e.currentTarget as HTMLElement).style.borderColor = '#EC4899';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(248,250,252,0.12)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,250,252,0.3)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BAND 2: WHITE — Travel Guide pillars ═══ */}
      <div style={{ background: WHITE }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-9 sm:py-10">
          <p className="text-[10px] font-normal uppercase tracking-[0.25em] mb-4 sm:mb-5" style={{ color: BLUE }}>
            Lapland Travel Guide
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2">
            {pillarLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onPillarClick?.(link.name)}
                className="text-[13px] sm:text-sm font-semibold px-3 sm:px-4 py-2.5 sm:py-2 rounded-full transition-all duration-200 hover:scale-105 whitespace-nowrap inline-flex items-center justify-center min-h-[44px] sm:min-h-0 shadow-sm"
                style={{ background: PINK, border: `1.5px solid ${PINK}`, color: '#FFFFFF' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = '#DB2777';
                  (e.currentTarget as HTMLElement).style.borderColor = '#DB2777';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = PINK;
                  (e.currentTarget as HTMLElement).style.borderColor = PINK;
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BAND 3: BLUE — Site network (5 columns) ═══ */}
      <div style={{ background: BLUE }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12">
            {siteGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-[10px] font-semibold mb-4 sm:mb-5 pb-2.5 sm:pb-3 uppercase tracking-[0.2em] border-b"
                  style={{ color: WHITE, borderColor: 'rgba(248,250,252,0.25)' }}>
                  {group.title}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] sm:text-sm font-normal leading-snug transition-colors duration-200"
                        style={{ color: 'rgba(248,250,252,0.85)' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EC4899'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(248,250,252,0.85)'}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BAND 4: WHITE — About + CTA cards ═══ */}
      <div style={{ background: WHITE }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

            <div className="lg:col-span-2">
              <p className="text-[10px] font-normal uppercase tracking-[0.25em] mb-5 pb-3 border-b"
                style={{ color: BLUE, borderColor: 'rgba(0,47,108,0.2)' }}>
                About LaplandVibes
              </p>
              <p className="text-sm font-normal leading-relaxed mb-5" style={{ color: '#374151' }}>
                The definitive guide to Finnish Lapland — from the auroras to the midnight sun.
                Curated experiences, insider tips, and everything you need to plan your Arctic adventure,
                built by people who know Lapland deeply.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-normal px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#10b981' }} />
                Content reviewed by local Lapland experts
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Spotted an Error */}
              <div className="rounded-xl flex flex-col transition-all duration-200 overflow-hidden"
                style={{ background: WHITE, border: `2px solid ${BLUE}` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BLUE}>
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
                <div className="p-5 flex flex-col flex-1">
                  <AlertCircle className="w-5 h-5 mb-3 shrink-0" style={{ color: '#EC4899' }} />
                  <p className="font-heading text-lg mb-2 tracking-wide" style={{ color: BLUE }}>Spotted an Error?</p>
                  <p className="text-sm font-normal leading-relaxed mb-5 flex-1" style={{ color: '#374151' }}>
                    See something that needs fixing? Tell us — we'll correct it immediately.
                  </p>
                  <a href="mailto:info@laplandvibes.com"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm"
                    style={{ background: '#EC4899', border: '2px solid #EC4899', color: '#FFFFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DB2777'; (e.currentTarget as HTMLElement).style.borderColor = '#DB2777'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EC4899'; (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'; }}>
                    Report an Error →
                  </a>
                </div>
              </div>

              {/* Partner With Us */}
              <div className="rounded-xl flex flex-col transition-all duration-200 overflow-hidden"
                style={{ background: WHITE, border: `2px solid ${BLUE}` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BLUE}>
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
                <div className="p-5 flex flex-col flex-1">
                  <Briefcase className="w-5 h-5 mb-3 shrink-0" style={{ color: '#EC4899' }} />
                  <p className="font-heading text-lg mb-2 tracking-wide" style={{ color: BLUE }}>Partner With Us</p>
                  <p className="text-sm font-normal leading-relaxed mb-5 flex-1" style={{ color: '#374151' }}>
                    Advertise or collaborate across 21+ Lapland sites.
                  </p>
                  <a href="mailto:info@laplandvibes.com"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm"
                    style={{ background: '#EC4899', border: '2px solid #EC4899', color: '#FFFFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DB2777'; (e.currentTarget as HTMLElement).style.borderColor = '#DB2777'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EC4899'; (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'; }}>
                    Get in Touch →
                  </a>
                </div>
              </div>

              {/* Press & Media */}
              <div className="rounded-xl flex flex-col transition-all duration-200 overflow-hidden"
                style={{ background: WHITE, border: `2px solid ${BLUE}` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BLUE}>
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
                <div className="p-5 flex flex-col flex-1">
                  <Newspaper className="w-5 h-5 mb-3 shrink-0" style={{ color: '#EC4899' }} />
                  <p className="font-heading text-lg mb-2 tracking-wide" style={{ color: BLUE }}>Press & Media</p>
                  <p className="text-sm font-normal leading-relaxed mb-5 flex-1" style={{ color: '#374151' }}>
                    Editorial partnerships and press kits.
                  </p>
                  <a href="mailto:info@laplandvibes.com"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm"
                    style={{ background: '#EC4899', border: '2px solid #EC4899', color: '#FFFFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DB2777'; (e.currentTarget as HTMLElement).style.borderColor = '#DB2777'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EC4899'; (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'; }}>
                    Press Enquiries →
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ═══ BAND 5: BLUE — Copyright + legal ═══ */}
      <div style={{ background: BLUE, borderTop: '1px solid rgba(248,250,252,0.15)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-5 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs font-normal" style={{ color: WHITE }}>
              &copy; {new Date().getFullYear()} #LaplandVibes — Part of the #LaplandVibes Network
            </p>
            <a
              href="https://yrityspaketit.fi"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-xs font-normal transition-colors duration-200"
              style={{ color: WHITE }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EC4899'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = WHITE}
            >
              Website by Yrityspaketit.fi
            </a>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs font-normal">
              {[
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/cookie-policy', label: 'Cookie Policy' },
                { to: '/terms', label: 'Terms of Use' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="transition-colors duration-200 inline-flex items-center min-h-[44px] px-1"
                  style={{ color: WHITE }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EC4899'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = WHITE}
                >
                  {label}
                </Link>
              ))}
              <a
                href="mailto:info@laplandvibes.com"
                className="transition-colors duration-200 inline-flex items-center min-h-[44px] px-1"
                style={{ color: WHITE }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#EC4899'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = WHITE}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
