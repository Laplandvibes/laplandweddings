import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/*
  Pole on LEFT, flag flies RIGHT.
  Grid: 5fr | 3fr | 10fr
    col 1 (5fr):  hoist — narrow white, near pole, empty
    col 2 (3fr):  blue cross (vertical stripe)
    col 3 (10fr): fly side — wide white, holds all content

  Mobile:  pole left:15px (6px wide) → right edge 21px; banner left:27px → gap 6px
  Desktop: pole left:45px (5px wide) → right edge 50px; banner left:56px → gap 6px
  Pole height = bannerBottom + bannerHeight (finial at banner top edge)
*/

interface CookieBannerProps {
  consentKey?: string;
}

export default function CookieBanner({ consentKey = 'laplandweddings_cookie_consent' }: CookieBannerProps) {
  const [visible, setVisible]       = useState(false);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(consentKey)) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, [consentKey]);

  const dismiss = (value: 'accepted' | 'declined') => {
    setDismissing(true);
    setTimeout(() => {
      localStorage.setItem(consentKey, value);
      setVisible(false);
      setDismissing(false);
    }, 850);
  };

  const accept = () => {
    dismiss('accepted');
    (window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };
  const decline = () => dismiss('declined');

  if (!visible) return null;

  return (
    <>
      {/* ── Flagpole — LEFT side ── */}
      <div className="lv-pole fixed bottom-0 z-[9997] pointer-events-none">
        {/* Ball finial */}
        <div
          className="lv-finial absolute rounded-full"
          style={{
            left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 35% 35%, #e2e8f0, #64748b)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.45)',
          }}
        />
        {/* Shaft */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #94a3b8 0%, #64748b 50%, #475569 100%)' }}
        />
      </div>

      {/* ── Outer div: rise / lower (translateY) ── */}
      <div
        className="lv-banner fixed z-[9999]"
        style={{
          animation: dismissing
            ? 'cookieFlagLower 0.8s ease-in forwards'
            : 'cookieFlagRise 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        }}
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="true"
      >
        {/* ── Inner div: flutter (skewY, pivot at hoist/LEFT side) ── */}
        <div style={{ transformOrigin: 'left center', animation: 'cookieFlagFlutter 3.5s ease-in-out 1.6s infinite' }}>

          {/* Rope container */}
          <div className="lv-card" style={{ position: 'relative' }}>

            {/* Top rope — banner top-left corner → pole */}
            <div
              className="lv-rope"
              style={{
                position: 'absolute', top: 6, left: -9,
                transformOrigin: 'left center',
                transform: 'rotate(2deg)',
              }}
            />
            {/* Bottom rope — banner bottom-left corner → pole */}
            <div
              className="lv-rope"
              style={{
                position: 'absolute', bottom: 6, left: -9,
                transformOrigin: 'left center',
                transform: 'rotate(-2deg)',
              }}
            />

            {/*
              Nordic cross — hoist on LEFT (near pole)
              Columns: 5fr | 3fr | 10fr
              Rows:     4fr | 3fr | 4fr
            */}
            <div
              className="overflow-hidden rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-[#002F6C]/40 h-full grid"
              style={{ gridTemplateColumns: '5fr 3fr 10fr', gridTemplateRows: '4fr 3fr 4fr' }}
            >
              {/* Row 1 */}
              <div className="bg-white" />               {/* hoist — empty */}
              <div className="bg-[#002F6C]" />
              <div className="bg-white flex items-center px-3">
                <p className="lv-label text-[#002F6C] font-extrabold tracking-[0.22em] uppercase">Cookies</p>
              </div>

              {/* Row 2 — horizontal stripe */}
              <div className="bg-[#002F6C]" />
              <div className="bg-[#002F6C]" />
              <div className="bg-[#002F6C] flex items-center px-3">
                <p className="lv-body text-white leading-[1.35]">
                  We use cookies to improve your experience.{' '}
                  <Link to="/cookie-policy" className="underline opacity-80 hover:opacity-100 transition-opacity">
                    Cookie Policy
                  </Link>
                </p>
              </div>

              {/* Row 3 */}
              <div className="bg-white" />               {/* hoist — empty */}
              <div className="bg-[#002F6C]" />
              <div className="bg-white flex items-center justify-start gap-2 px-3">
                <button
                  onClick={decline}
                  className="lv-btn text-[#002F6C] font-semibold border border-[#002F6C]/35 rounded-sm hover:bg-[#002F6C]/10 transition-colors cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="lv-btn bg-[#002F6C] text-white font-bold rounded-sm hover:bg-[#001a4a] transition-colors cursor-pointer"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Mobile ── (fixed pixel bottoms so mobile browser chrome resize does not displace the flag) */
        .lv-pole   { width: 4px; left: 14px; height: 274px; }
        .lv-finial { top: -5px; width: 10px; height: 10px; }
        .lv-banner { left: 24px; bottom: 140px; }
        .lv-card   { width: min(220px, 55vw); aspect-ratio: 18/11; }
        .lv-rope   { width: 8px; height: 1.5px; background: #334155; border-radius: 1px; }
        .lv-label  { font-size: 7px; letter-spacing: 0.15em; }
        .lv-body   { font-size: 6.5px; }
        .lv-btn    { font-size: 7.5px; padding: 3px 7px; }

        /* ── Desktop ── */
        @media (min-width: 768px) {
          .lv-pole   { width: 5px; left: 45px; height: 488px; }
          .lv-finial { top: -6px; width: 12px; height: 12px; }
          .lv-banner { left: 56px; bottom: 280px; }
          .lv-card   { width: 340px; }
          .lv-rope   { width: 10px; height: 2px; }
          .lv-label  { font-size: 9.5px; letter-spacing: 0.2em; }
          .lv-body   { font-size: 10px; }
          .lv-btn    { font-size: 10px; padding: 5px 12px; }
        }

        @keyframes cookieFlagRise {
          from { transform: translateY(100vh); }
          to   { transform: translateY(0); }
        }
        @keyframes cookieFlagLower {
          from { transform: translateY(0); }
          to   { transform: translateY(100vh); }
        }
        @keyframes cookieFlagFlutter {
          0%, 100% { transform: skewY(0deg); }
          20%      { transform: skewY(-1.3deg); }
          55%      { transform: skewY(0.7deg); }
          80%      { transform: skewY(-0.5deg); }
        }
      `}</style>
    </>
  );
}
