import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { useTr } from '../../i18n/LangContext';

export default function CookiePolicy() {
  const tr = useTr();
  const { metaTitle, title, paragraphs } = tr.legal.cookies;
  return (
    <>
      <SEO title={metaTitle} description="Cookie policy" path="/cookie-policy" />
      <Section title={title}>
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
