import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { useLang } from '../../i18n/LangContext';

export default function Terms() {
  const { lang } = useLang();
  return (
    <>
      <SEO title={lang === 'fi' ? 'Käyttöehdot | LaplandWeddings' : 'Terms of Use | LaplandWeddings'} description="Terms of use" path="/terms" />
      <Section title={lang === 'fi' ? 'Käyttöehdot' : 'Terms of Use'}>
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          {lang === 'fi' ? (
            <>
              <p>LaplandWeddings.online on Lapeso Oy:n ylläpitämä infosivusto. Emme ole hääsuunnittelutoimisto — välitämme tiedustelut yhteistyökumppaneillemme.</p>
              <p>Sivuston tiedot kerätty hääsuunnittelijoiden ja venuejen julkisilta sivuilta. Hinnat ja saatavuus vaihtelevat — pyydä aina vahvistus toimittajalta.</p>
              <p>LaplandWeddings ei ole vastuussa kolmansien osapuolten (planneri, venue, valokuvaaja) toiminnasta tai sopimusten täyttymisestä.</p>
            </>
          ) : (
            <>
              <p>LaplandWeddings.online is an information site operated by Lapeso Oy. We are not a wedding planning agency — we route enquiries to partners.</p>
              <p>Information is sourced from public planner and venue pages. Prices and availability change — always confirm with the supplier.</p>
              <p>LaplandWeddings is not responsible for the actions or contractual performance of third parties (planners, venues, photographers).</p>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
