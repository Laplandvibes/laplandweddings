/**
 * Suostumuksen peruminen tai muuttaminen evästekäytännön napista (8.10.2026).
 *
 * Kopio verkoston kanonisesta shared/Legal/CookieContent.tsx:n funktiosta withdrawConsent()
 * (lv-ops 2cf493c). Valinta on localStoragessa eikä evästeessä, joten aiempi ohje ("tyhjennä
 * localStorage kehittäjätyökaluista") oli ainoa tapa saada banneri takaisin. Poistetaan valinta,
 * portitettujen palveluiden omat tallenteet (GetYourGuide) ja sivuston omaan domainiin asetetut
 * seurantaevästeet (GA4, GetYourGuiden session_id), suljetaan Google Consent Mode ja ladataan
 * sivu uudelleen: kerran ladattua kolmannen osapuolen skriptiä ei voi pysäyttää, joten vain uusi
 * lataus palauttaa sivun tilaan ilman niitä, ja banneri näkyy taas. Kolmansien osapuolten
 * domainien evästeitä (getyourguide.com) selain ei anna poistaa täältä. Funktio on kanonisen
 * kopio sellaisenaan, joten se poistaa myös lentohaun (Travelpayouts) ja Clarityn nimet, joita
 * tällä sivustolla ei synny: poisto ei tee mitään, kun nimeä ei ole.
 */
export function withdrawConsent(siteId: string): void {
  for (const k of [`${siteId}_cookie_consent`, 'partner_id', 'snowplowOutQueue_sp', '__wlcc']) {
    try { window.localStorage.removeItem(k); } catch { /* estetty tallennus */ }
  }
  for (const k of ['gyg_visitor_id', '__wlft', '__wlrt']) {
    try { window.sessionStorage.removeItem(k); } catch { /* estetty tallennus */ }
  }
  const fixed = ['_ga', '_gid', '_clck', '_clsk', 'session_id', 'tpwl_locale', 'tpwl_currency'];
  const names = new Set(fixed);
  try {
    for (const part of document.cookie.split(';')) {
      const n = part.split('=')[0].trim();
      if (n.startsWith('_ga_') || n.startsWith('_sp_id.') || n.startsWith('_sp_ses.')) names.add(n);
    }
  } catch { /* evasteet estetty */ }
  const host = window.location.hostname;
  const domains = ['', `; domain=.${host}`];
  if (host.startsWith('www.')) domains.push(`; domain=.${host.slice(4)}`);
  for (const n of names) {
    for (const d of domains) {
      try { document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`; } catch { /* ohitetaan */ }
    }
  }
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  } catch { /* gtag ei ladattu */ }
  window.location.reload();
}
