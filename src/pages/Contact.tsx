import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { useLang } from '../i18n/LangContext';
import { pickLocalized } from '../data/localized';
import { DIAG } from '../data/diagramText';

/**
 * /contact — the quote form on its own page, form first.
 *
 * Until 19.9.2026 this route redirected to the front page, which has no form,
 * while the pricing page's main button ("Start the 5-minute form") and the
 * breadcrumb both pointed here. Vesa, reading the lead count: "lomake pitäisi
 * olla paremmin löydettävissä, liidejä tullut tosi vähän." The navigation
 * button and the front-page band now land here as well.
 */
export default function Contact() {
  const { lang, tr } = useLang();
  const description = `${tr.contact.formSub} ${tr.contact.subtitle}`;
  return (
    <>
      <SEO title={pickLocalized(DIAG.contactSeoTitle, lang)} description={description} path="/contact" />
      <section id="quote" className="pt-10 sm:pt-16 pb-10 sm:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-8 sm:mb-14 max-w-3xl mx-auto">
            <p className="uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs text-aurora-pink font-semibold mb-2.5 sm:mb-3">
              {tr.contact.title}
            </p>
            <h1 className="font-heading text-[26px] leading-tight sm:text-4xl text-white mb-3 sm:mb-4 tracking-wide [text-wrap:balance]">
              {tr.contact.formTitle}
            </h1>
            <p className="text-[15px] sm:text-lg text-gray-400 leading-relaxed [text-wrap:pretty]">{description}</p>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
