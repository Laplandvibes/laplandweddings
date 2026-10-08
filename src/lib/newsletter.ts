/**
 * Jaettu uutiskirjeputki: Supabase `send-welcome-email` (+ Resend). Verkostolla on
 * yksi uutiskirjeprojekti, ja tämän sivuston molemmat lomakkeet postaavat tänne:
 * popup (`NewsletterPopup`) ja etusivun lomake (`NewsletterSignup`).
 *
 * 🔴 8.10.2026: etusivun lomake postasi omaan Vercel-osoitteeseen
 * (laplandvibes-newsletter.vercel.app), joka oli poistettu (DEPLOYMENT_NOT_FOUND).
 * Selain hylkäsi pyynnön jo esikyselyssä, eikä sivustolta tullut rekisteriin yhtään
 * riviä. Osoite pidetään siksi tässä yhdessä paikassa, ei lomakekohtaisesti.
 *
 * Julkinen anon-avain (sama kuin selaimen bundlessa), ei salaisuus.
 */
export const NEWSLETTER_SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co';
export const NEWSLETTER_SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';
export const NEWSLETTER_FUNCTION_URL = `${NEWSLETTER_SUPABASE_URL}/functions/v1/send-welcome-email`;
