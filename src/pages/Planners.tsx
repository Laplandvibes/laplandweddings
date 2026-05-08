import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang, localiseLanguage } from '../i18n/LangContext';
import { planners } from '../data/planners';

export default function Planners() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Lapin hääsuunnittelijat — pyydä 3 tarjousta yhdellä lomakkeella | LaplandWeddings' : 'Lapland Wedding Planners — get 3 quotes with one form | LaplandWeddings'}
        description={lang === 'fi' ? 'Lapin 7 vakiintuneinta hääsuunnittelijaa. Lähetä yksi lomake — toimitamme 3 räätälöityä tarjousta. Maksuton ja sitoumukseton.' : 'The 7 most established Lapland wedding planners. Send one form — we deliver 3 personalised quotes. Free and no commitment.'}
        path="/planners"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: planners.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'LocalBusiness',
              name: p.name,
              url: p.publicWebsite,
              areaServed: 'Finnish Lapland',
              priceRange: p.priceTier,
            },
          })),
        }}
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Hääsuunnittelijat' : 'Wedding planners'}
        title={tr.planners.indexTitle}
        subtitle={tr.planners.indexIntro}
        image="https://mariahedengren.com/wp-content/uploads/2018/04/51-best-wedding-photographer-Lapland.jpg"
        imageAlt={lang === 'fi' ? 'Hääpari vihille kahdestaan Lapin maisemassa' : 'Couple eloping in Lapland landscape'}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {planners.map((p) => (
            <article key={p.slug} className="bg-night-light border border-white/5 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs text-aurora-pink uppercase tracking-wider font-semibold mb-1">{p.homeBase[lang]}</p>
                  <h3 className="font-heading text-xl text-white tracking-wide">{p.name}</h3>
                </div>
                <span className="text-gold font-semibold whitespace-nowrap">{p.priceTier}{p.priceFrom ? ` · ${lang === 'fi' ? 'alk' : 'from'} ${p.priceFrom}` : ''}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{p.description[lang]}</p>

              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">{tr.sections.strengths}</p>
              <ul className="text-sm text-gray-300 space-y-1.5 mb-4">
                {p.strengths[lang].map((s) => (
                  <li key={s} className="flex gap-2"><span className="text-aurora-green">✓</span><span>{s}</span></li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                <span>{p.languages.map((l) => localiseLanguage(l, lang)).join(' · ')}</span>
                <span className="italic">{p.bestFor[lang]}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8 max-w-2xl mx-auto">
          {lang === 'fi'
            ? 'Tiedot kerätty hääsuunnittelijoiden omilta julkisilta sivuilta. LaplandWeddings ei ole sopimussuhteessa kaikkiin listattuihin toimijoihin — välitämme tiedustelusi niille, jotka parhaiten vastaavat toiveitanne.'
            : 'Information sourced from public planner websites. LaplandWeddings is not in a contractual relationship with all listed providers — we route your enquiry to those who best match your needs.'}
        </p>
      </Section>

      <Section className="bg-night-light/30" title={tr.planners.threeQuotesTitle} subtitle={tr.planners.threeQuotesP}>
        <LeadForm />
      </Section>
    </>
  );
}
