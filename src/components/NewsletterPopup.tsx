import SharedNewsletterPopup from '../shared/NewsletterPopup';
import { POPUP_THEME, POPUP_COPY } from './newsletterPopupSite';
import { useLang } from '../i18n/LangContext';
import { NEWSLETTER_SUPABASE_URL, NEWSLETTER_SUPABASE_PUBLISHABLE_KEY } from '../lib/newsletter';

// Shared network creds (public anon key) — this site has no .env; the values
// live in ../lib/newsletter.ts, shared with the home-page NewsletterSignup.
//
// Note: this popup feeds the SHARED ecosystem list (Supabase `leads` +
// welcome email). It is separate from the wedding ChecklistGate flow, which
// writes straight to its own Resend audience with a DVV-checklist email.

// Founder popup (2026-08-09): first popup on this site — the shared founder
// default (Vesa + spiral avatar + social links) with no copy overrides.
export default function NewsletterPopup() {
  const { lang } = useLang();
  return (
    <SharedNewsletterPopup
      theme={POPUP_THEME}
      copy={POPUP_COPY}
      lang={lang as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv'}
      siteId="laplandweddings"
      brandWord="WEDDINGS"
      supabaseUrl={NEWSLETTER_SUPABASE_URL}
      supabaseAnonKey={NEWSLETTER_SUPABASE_PUBLISHABLE_KEY}
    />
  );
}
