import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { LEGAL_META } from '../../lib/legalMeta.mjs';
import { withdrawConsent } from '../../lib/withdrawConsent';
import { useTr, useLang } from '../../i18n/LangContext';

/**
 * 8.10.2026: valinta localStoragessa (ei evästeessä), GetYourGuiden kumppaniskripti vasta
 * suostumuksesta ja peruutusnappi. Tekstit verkoston kanonisesta CookieContentista (lv-ops 2cf493c).
 */
export default function CookiePolicy() {
  const tr = useTr();
  const { dataLang } = useLang();
  const c = tr.legal.cookies;
  const sep = dataLang === 'ja' || dataLang === 'zh-CN' ? '：' : dataLang === 'fr' ? '\u00a0: ' : ': ';
  return (
    <>
      <SEO title={LEGAL_META['/cookie-policy'][dataLang].title} description={LEGAL_META['/cookie-policy'][dataLang].description} path="/cookie-policy" />
      <Section title={c.title} titleAs="h1">
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          <p className="text-sm text-gray-400">{c.updated}</p>
          {c.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>{c.storageIntro}</p>
          <ul>
            <li>
              <code>laplandweddings_cookie_consent</code>
              {sep}
              {c.storageConsent}
            </li>
            <li>{c.storageLang}</li>
          </ul>
          <h2>{c.gygTitle}</h2>
          <p>{c.gygBody}</p>
          <h2>{c.managingTitle}</h2>
          <p>{c.managing}</p>
          <p>
            <button
              type="button"
              onClick={() => withdrawConsent('laplandweddings')}
              className="inline-flex min-h-11 items-center rounded-full border border-vibe-pink/60 px-5 py-2.5 text-sm font-medium text-vibe-pink transition-colors hover:bg-vibe-pink/10 hover:text-pink-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vibe-pink"
            >
              {c.withdrawButton}
            </button>
          </p>
        </div>
      </Section>
    </>
  );
}
