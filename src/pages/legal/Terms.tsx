import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { LEGAL_META } from '../../lib/legalMeta.mjs';
import { useTr, useLang } from '../../i18n/LangContext';

export default function Terms() {
  const tr = useTr();
  const { dataLang } = useLang();
  const { title, paragraphs } = tr.legal.terms;
  return (
    <>
      <SEO title={LEGAL_META['/terms'][dataLang].title} description={LEGAL_META['/terms'][dataLang].description} path="/terms" />
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
