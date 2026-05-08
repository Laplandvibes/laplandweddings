import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { useLang } from '../../i18n/LangContext';

export default function Privacy() {
  const { lang } = useLang();
  return (
    <>
      <SEO title={lang === 'fi' ? 'Tietosuoja | LaplandWeddings' : 'Privacy | LaplandWeddings'} description="Privacy policy" path="/privacy" />
      <Section title={lang === 'fi' ? 'Tietosuojaseloste' : 'Privacy Policy'}>
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          {lang === 'fi' ? (
            <>
              <p>Rekisterinpitäjä: <strong>Lapeso Oy</strong>, info@laplandvibes.com.</p>
              <p>Käytämme yhteydenottolomakkeen tietoja vain sinun tiedustelusi käsittelyyn ja sen välittämiseen yhteistyökumppaneillemme (hääsuunnittelijoille).</p>
              <p>Säilytämme tietoja enintään 24 kuukautta. Voit pyytää tietojesi poistamista kirjoittamalla osoitteeseen info@laplandvibes.com.</p>
              <p>Käytämme Google Analytics 4:ää anonymisoituna kävijämääräarvioille.</p>
            </>
          ) : (
            <>
              <p>Controller: <strong>Lapeso Oy</strong>, info@laplandvibes.com.</p>
              <p>We use the contact form data only to process your enquiry and forward it to our partners (wedding planners).</p>
              <p>We retain data for up to 24 months. You may request deletion of your data by writing to info@laplandvibes.com.</p>
              <p>We use Google Analytics 4 anonymised for visitor estimates.</p>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
