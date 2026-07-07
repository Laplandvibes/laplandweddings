import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { useTr } from '../../i18n/LangContext';

export default function Privacy() {
  const tr = useTr();
  const { metaTitle, title, controllerLabel, paragraphs } = tr.legal.privacy;
  return (
    <>
      <SEO title={metaTitle} description="Privacy policy" path="/privacy" />
      <Section title={title}>
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          <p>
            {controllerLabel}: <strong>Lapeso Oy</strong>, info@laplandvibes.com.
          </p>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
