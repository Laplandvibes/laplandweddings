import SharedNewsletterPopup from '../../../shared/NewsletterPopup';
import { useLang } from '../i18n/LangContext';

// Shared network creds (public anon key) — this site has no .env, same
// hardcoded pattern as laplandwellness/laplandfood wrappers.
//
// Note: this popup feeds the SHARED ecosystem list (Supabase `leads` +
// welcome email). It is separate from the wedding ChecklistGate flow, which
// writes straight to its own Resend audience with a DVV-checklist email.
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

// Founder popup (2026-08-09): first popup on this site — the shared founder
// default (Vesa + spiral avatar + social links) with no copy overrides.
export default function NewsletterPopup() {
  const { lang } = useLang();
  return (
    <SharedNewsletterPopup
      lang={lang as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv'}
      siteId="laplandweddings"
      brandWord="WEDDINGS"
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_PUBLISHABLE_KEY}
    />
  );
}
