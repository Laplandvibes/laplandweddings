import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang } from '../i18n/LangContext';

export default function Contact() {
  const { lang, tr } = useLang();
  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Ota yhteyttä — pyydä 3 tarjousta | LaplandWeddings' : 'Contact — get 3 quotes | LaplandWeddings'}
        description={lang === 'fi' ? 'Kerro lyhyesti unelmasi. Välitämme tiedustelusi 3:lle Lapin hääsuunnittelijalle. Vastaus 1–7 päivän sisällä, maksuton ja sitoumukseton.' : 'Tell us briefly about your dream. We pass your enquiry to 3 Lapland wedding planners. Response in 1–7 days, free and with no commitment.'}
        path="/contact"
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Yhteydenotto' : 'Contact'}
        title={tr.contact.title}
        subtitle={tr.contact.subtitle}
        image="https://theranch.fi/wp-content/uploads/2025/02/wedding-oraganizer-bg-theranch.jpg"
        imageAlt={lang === 'fi' ? 'Vihkitilanne kynttilän valossa' : 'Wedding ceremony lit by candles'}
      />
      <Section title={tr.contact.formTitle} subtitle={tr.contact.formSub}>
        <LeadForm />
      </Section>
    </>
  );
}
