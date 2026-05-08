import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { useLang } from '../../i18n/LangContext';

export default function CookiePolicy() {
  const { lang } = useLang();
  return (
    <>
      <SEO title={lang === 'fi' ? 'Evästeseloste | LaplandWeddings' : 'Cookie Policy | LaplandWeddings'} description="Cookie policy" path="/cookie-policy" />
      <Section title={lang === 'fi' ? 'Evästeseloste' : 'Cookie Policy'}>
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          {lang === 'fi' ? (
            <>
              <p>Käytämme välttämättömiä evästeitä sivuston toiminnan vuoksi (kielivalinta, suostumukset).</p>
              <p>Suostumuksella käytämme Google Analytics 4 -palvelua kävijämäärien analysointiin.</p>
              <p>Et tarvitse suostumustasi mainonnan kohdistamiseen — emme käytä mainosseurantaa.</p>
            </>
          ) : (
            <>
              <p>We use strictly necessary cookies for site function (language preference, consent).</p>
              <p>With your consent we use Google Analytics 4 for visitor analytics.</p>
              <p>We do not use advertising tracking — your consent is not required for ad targeting.</p>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
