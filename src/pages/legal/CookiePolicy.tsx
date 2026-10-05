import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { LEGAL_META } from '../../lib/legalMeta.mjs';
import { useTr, useLang } from '../../i18n/LangContext';

export default function CookiePolicy() {
  const tr = useTr();
  const { dataLang } = useLang();
  const { title, paragraphs } = tr.legal.cookies;
  return (
    <>
      <SEO title={LEGAL_META['/cookie-policy'][dataLang].title} description={LEGAL_META['/cookie-policy'][dataLang].description} path="/cookie-policy" />
      <Section title={title} titleAs="h1">
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
