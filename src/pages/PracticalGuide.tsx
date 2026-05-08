import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';
import { tripToLapland, carRentalLink } from '../lib/affiliate';

export default function PracticalGuide() {
  const { lang, tr } = useLang();

  const steps = lang === 'fi' ? [
    {
      n: 1,
      t: 'Pyydä esteiden tutkinta DVV:ltä',
      p: 'Suomalaisille 1–2 viikkoa, ulkomaalaisille 3–5 viikkoa. Maksuton (paitsi 15 € EU-käännös tarvittaessa). Hae 2 kuukautta ennen vihkimistä.',
      link: { url: 'https://dvv.fi/en/examination-of-impediments-to-marriage', label: 'DVV — Examination of impediments' },
    },
    {
      n: 2,
      t: 'Hanki Certificate of No Impediment kotimaastasi',
      p: 'Pyydä se omasta maistraatistasi tai ulkoasiainministeriöstä ennen Suomeen tuloa. Useimmissa maissa apostille-leima ja valallinen käännös tarvitaan.',
      link: { url: 'https://dvv.fi/en/a-certificate-of-the-right-granted-by-the-finnish-legislation-to-enter-a-marriage-in-a-foreign-country', label: 'DVV — Certificate of right to marry' },
    },
    {
      n: 3,
      t: 'Valitse vihkijä',
      p: 'Siviilivihkimys on yleisin: kunnan vihkijä Rovaniemellä, Inarissa, Kittilässä tai Sodankylässä. Englanninkielinen vihkijä järjestyy yleensä suunnittelijan kautta. Kirkollinen vihkimys vain ev.lut. kirkkoon kuuluville.',
    },
    {
      n: 4,
      t: 'Hae 2 todistajaa',
      p: 'Suomen laki vaatii kaksi todistajaa. Useimmat venuet ja suunnittelijat järjestävät heidät paikan päältä — ei vaadi suomalaisia.',
    },
    {
      n: 5,
      t: 'Vihkiminen + 2 todistuskappaletta',
      p: 'Saat 2 virallista vihkimistodistusta englanniksi. Apostille-leima nopeasti DVV:n kautta — kotimaata varten useimmissa tapauksissa.',
      link: { url: 'https://um.fi/registration-of-marriage-in-the-population-information-system', label: 'Suomen UM — Avioliiton rekisteröinti' },
    },
    {
      n: 6,
      t: 'Rekisteröi avioliitto kotimaassasi',
      p: 'Vie todistus apostille-leimalla kotimaasi rekisteriin. EU-maissa yleensä kuukauden sisällä. Tämän jälkeen avioliitto on pätevä globaalisti.',
    },
  ] : [
    {
      n: 1,
      t: 'Request the Examination of Impediments from DVV',
      p: 'Finnish couples: 1–2 weeks. Foreign couples: 3–5 weeks. Free (except €15 EU translation if needed). Submit 2 months before the wedding.',
      link: { url: 'https://dvv.fi/en/examination-of-impediments-to-marriage', label: 'DVV — Examination of impediments' },
    },
    {
      n: 2,
      t: 'Get a Certificate of No Impediment from your home country',
      p: 'Request from your home registrar or foreign ministry before arriving in Finland. Most countries require an apostille stamp and a sworn translation.',
      link: { url: 'https://dvv.fi/en/a-certificate-of-the-right-granted-by-the-finnish-legislation-to-enter-a-marriage-in-a-foreign-country', label: 'DVV — Certificate of right to marry' },
    },
    {
      n: 3,
      t: 'Choose your officiant',
      p: 'Civil ceremony is most common: a municipal officiant in Rovaniemi, Inari, Kittilä or Sodankylä. An English-speaking officiant is usually arranged by your planner. Religious ceremony only for members of the Lutheran Church.',
    },
    {
      n: 4,
      t: 'Get 2 witnesses',
      p: 'Finnish law requires two witnesses. Most venues and planners arrange them on site — they do not need to be Finnish.',
    },
    {
      n: 5,
      t: 'Wedding day + 2 marriage certificates',
      p: 'You receive 2 official marriage certificates in English. Apostille via DVV is fast — required by most home countries.',
      link: { url: 'https://um.fi/registration-of-marriage-in-the-population-information-system', label: 'Finnish MFA — Marriage registration' },
    },
    {
      n: 6,
      t: 'Register the marriage in your home country',
      p: 'Take the apostilled certificate to your home country’s registry. In EU countries this is usually within a month. The marriage is then globally valid.',
    },
  ];

  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Häät Lapissa — DVV-paperit, vihkijä, käytännön opas | LaplandWeddings' : 'Getting Married in Lapland — DVV paperwork, officiant, practical guide | LaplandWeddings'}
        description={lang === 'fi' ? 'Käytännön opas ulkomaalaisille pareille: DVV-paperit, esteiden tutkinta (3–5 vk), todistajat, vihkijä, kotimaan rekisteröinti.' : 'Practical guide for foreign couples: DVV paperwork, examination of impediments (3–5 weeks), witnesses, officiant, home-country registration.'}
        path="/practical-guide"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'HowTo',
              name: lang === 'fi' ? 'Häät Lapissa — DVV-prosessi' : 'Getting married in Lapland — DVV process',
              step: steps.map((s) => ({ '@type': 'HowToStep', name: s.t, text: s.p })),
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: lang === 'fi' ? 'Kuinka kauan DVV:n paperit kestävät ulkomaalaiselle parille?' : 'How long does the DVV paperwork take for a foreign couple?',
                  acceptedAnswer: { '@type': 'Answer', text: lang === 'fi' ? '3–5 viikkoa. Suomen kansalaisille 1–2 viikkoa. Aloita prosessi vähintään 2 kuukautta ennen vihkimistä.' : '3–5 weeks. For Finnish citizens, 1–2 weeks. Begin the process at least 2 months before the wedding.' },
                },
                {
                  '@type': 'Question',
                  name: lang === 'fi' ? 'Kuinka monta todistajaa Suomen lain mukaan tarvitaan?' : 'How many witnesses does Finnish law require?',
                  acceptedAnswer: { '@type': 'Answer', text: lang === 'fi' ? 'Tasan kaksi. Useimmat venuet ja suunnittelijat järjestävät heidät paikan päältä — heidän ei tarvitse olla suomalaisia.' : 'Exactly two. Most venues and planners arrange them on site — they do not need to be Finnish.' },
                },
                {
                  '@type': 'Question',
                  name: lang === 'fi' ? 'Onko Suomessa solmittu avioliitto pätevä kotimaassani?' : 'Is a marriage celebrated in Finland valid in my home country?',
                  acceptedAnswer: { '@type': 'Answer', text: lang === 'fi' ? 'Kyllä. Saat 2 virallista todistusta englanniksi. Apostille-leima DVV:ltä kotimaata varten useimmissa tapauksissa.' : 'Yes. You receive 2 official certificates in English. Apostille via DVV is required by most home countries — fast to obtain.' },
                },
                {
                  '@type': 'Question',
                  name: lang === 'fi' ? 'Mikä on häiden kustannus Lapissa?' : 'How much do Lapland weddings cost?',
                  acceptedAnswer: { '@type': 'Answer', text: lang === 'fi' ? 'Elopement 1 600–5 000 €, pieni häät 4 500–15 000 €, premium 15 000–40 000 €, luksus jopa 100 000 €.' : 'Elopement €1 600–5 000, small wedding €4 500–15 000, premium €15 000–40 000, luxury up to €100 000.' },
                },
                {
                  '@type': 'Question',
                  name: lang === 'fi' ? 'Mikä on paras kuukausi Lapin häille?' : 'When is the best month for a Lapland wedding?',
                  acceptedAnswer: { '@type': 'Answer', text: lang === 'fi' ? 'Helmikuu–maaliskuu antaa pisimmät päivät, varmimman lumen ja revontulet. Joulukuu on tunnelmallisin.' : 'February–March offer the longest daylight, the most reliable snow, and the Northern Lights. December is the most atmospheric.' },
                },
              ],
            },
          ],
        }}
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Käytännön opas' : 'Practical guide'}
        title={tr.practical.title}
        subtitle={tr.practical.subtitle}
        image="https://r.profitroom.pl/wildernesshotelinari/images/202412171316320.Inari_drone4_2_.jpg"
        imageAlt={lang === 'fi' ? 'Vihkimisseremonia talvisessa metsässä' : 'Wedding ceremony in winter forest'}
      />

      <Section title={lang === 'fi' ? 'Avioliittolupa Suomessa — 6 vaihetta' : 'Marriage license in Finland — 6 steps'}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.n} className="bg-night-light/60 border border-white/5 rounded-2xl p-6 flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose/20 border border-rose/40 text-rose font-heading text-xl flex items-center justify-center">{s.n}</div>
              <div>
                <h3 className="font-heading text-xl text-white mb-2 tracking-wide">{s.t}</h3>
                <p className="text-gray-300 leading-relaxed mb-2">{s.p}</p>
                {s.link && (
                  <a href={s.link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-aurora-pink hover:underline">
                    {s.link.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/20" title={lang === 'fi' ? 'Sesongit ja sää' : 'Seasons and weather'}>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-aurora-purple font-heading text-xl mb-2">{lang === 'fi' ? 'Joulukuu — maaliskuu' : 'December – March'}</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {lang === 'fi'
                ? 'Peak-sesonki (95 % kysynnästä). Lumi, jää, revontulet. Kaamos joulu–tammikuussa, sininen tunti maaliskuussa.'
                : 'Peak season (95 % of demand). Snow, ice, Northern Lights. Polar night December–January, blue hour in March.'}
            </p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-aurora-green font-heading text-xl mb-2">{lang === 'fi' ? 'Toukokuu — heinäkuu' : 'May – July'}</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {lang === 'fi'
                ? 'Keskiyön aurinko 23.5.–24.7. Lämmin (15–25 °C), ei lunta. Hyttyset huipussaan kesäkuussa.'
                : 'Midnight Sun 23 May – 24 July. Warm (15–25 °C), no snow. Mosquitoes peak in June.'}
            </p>
          </div>
          <div className="bg-night-light/60 border border-white/5 rounded-2xl p-6">
            <p className="text-aurora-pink font-heading text-xl mb-2">{lang === 'fi' ? 'Syyskuu — lokakuu' : 'September – October'}</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {lang === 'fi'
                ? 'Ruskakausi syyskuun puolivälissä — Lapin värikkäin aika. Revontulet alkavat näkyä lokakuussa.'
                : 'Ruska (autumn colours) in mid-September — Lapland’s most colourful time. Northern Lights start showing in October.'}
            </p>
          </div>
        </div>
      </Section>

      <Section title={lang === 'fi' ? 'Lentoyhteydet ja saavutettavuus' : 'Flights and accessibility'}>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { code: 'RVN' as const, name: 'Rovaniemi', fi: 'Suorat lennot Helsingistä, Lontoosta, Frankfurtista, Pariisista. 10 km keskustaan.', en: 'Direct flights from Helsinki, London, Frankfurt, Paris. 10 km to the centre.' },
            { code: 'KTT' as const, name: 'Kittilä', fi: 'Suorat lennot Helsingistä, Lontoosta, Manchesterista, Birminghamista. 14 km Leville.', en: 'Direct flights from Helsinki, London, Manchester, Birmingham. 14 km to Levi.' },
            { code: 'IVL' as const, name: 'Ivalo', fi: 'Suorat lennot Helsingistä. Suomen pohjoisin lentokenttä, 30 km Saariselälle.', en: 'Direct flights from Helsinki. Finland’s northernmost airport, 30 km to Saariselkä.' },
          ].map((ap) => (
            <div key={ap.code} className="bg-night-light/60 border border-white/5 rounded-2xl p-6 flex flex-col">
              <p className="font-heading text-xl text-white mb-2">{ap.name} ({ap.code})</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">{lang === 'fi' ? ap.fi : ap.en}</p>
              <div className="flex flex-col gap-2">
                <a href={tripToLapland('LHR', ap.code)} target="_blank" rel="noopener noreferrer sponsored" className="text-xs text-aurora-pink hover:underline">
                  {lang === 'fi' ? 'Etsi lennot Lontoosta (Trip.com)' : 'Find flights from London (Trip.com)'} →
                </a>
                <a href={tripToLapland('HEL', ap.code)} target="_blank" rel="noopener noreferrer sponsored" className="text-xs text-aurora-pink hover:underline">
                  {lang === 'fi' ? 'Etsi lennot Helsingistä (Trip.com)' : 'Find flights from Helsinki (Trip.com)'} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-night-light/20" title={lang === 'fi' ? 'Autovuokraus ja kuljetukset' : 'Car rental and transfers'}>
        <div className="max-w-3xl mx-auto bg-night-light/60 border border-white/5 rounded-2xl p-7 text-center">
          <p className="text-gray-300 leading-relaxed mb-5">
            {lang === 'fi'
              ? 'Vuokraa auto suoraan Rovaniemen, Kittilän tai Ivalon lentokentältä — verkostomme oma laplandcarrental.com tarjoaa hinnat ja varaukset suomeksi ja englanniksi.'
              : 'Rent a car directly from Rovaniemi, Kittilä or Ivalo airport — our network site laplandcarrental.com offers pricing and reservations in Finnish and English.'}
          </p>
          <a
            href={carRentalLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-rose hover:bg-pink text-white font-semibold rounded-full shadow-lg shadow-rose/30 transition-colors"
          >
            laplandcarrental.com →
          </a>
        </div>
      </Section>
    </>
  );
}
