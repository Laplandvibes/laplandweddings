import Section from '../../components/Section';
import SEO from '../../components/SEO';
import { useTr, useLang } from '../../i18n/LangContext';

export default function Privacy() {
  const tr = useTr();
  // useLang palauttaa koko kontekstin, ei kielikoodia — vrt. LangContextValue.
  const { dataLang } = useLang();
  const { metaTitle, title, controllerLabel, paragraphs, newsletterBefore, unsubLabel, newsletterAfter } =
    tr.legal.privacy;

  /**
   * Peruutussivu on koko verkostossa vain hubilla, koska uutiskirjelista on
   * yksi. Osoite rakennetaan tässä samasta lokaalikartasta kuin hubin omat
   * polut (pt-BR -> br, zh-CN -> cn, ko -> kr) ja loppukauttaviivan kanssa:
   * ilman sitä Cloudflare vastaa 308:lla ja linkki kulkee turhan hypyn kautta.
   */
  const HUB_SEGMENTTI: Record<string, string> = {
    en: '', fi: 'fi', de: 'de', ja: 'ja', es: 'es', 'pt-BR': 'br',
    'zh-CN': 'cn', ko: 'kr', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
  };
  const seg = HUB_SEGMENTTI[dataLang] ?? '';
  const unsubHref = `https://laplandvibes.com/${seg ? `${seg}/` : ''}unsubscribe/`;
  return (
    <>
      <SEO title={metaTitle} description="Privacy policy" path="/privacy" />
      <Section title={title}>
        <div className="prose prose-invert max-w-3xl mx-auto text-gray-300 space-y-4">
          <p>
            {controllerLabel}: <strong>LaPeso Oy</strong>, info@laplandvibes.com.
          </p>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {/* 🔴 Uutiskirje. Sivustolla on NewsletterPopup, joka kerää osoitteita
              verkoston yhteiselle listalle — tämä seloste kuvasi 22.8.2026 asti
              vain yhteydenottolomakkeen, eikä peruutustapaa mainittu missään.
              Linkki on aito <a>, ei pelkkä osoite tekstissä: linkkivahti näkee
              vain linkkejä, ja lukija tarvitsee klikattavan. */}
          <p>
            {newsletterBefore}
            <a
              href={unsubHref}
              target="_blank"
              rel="noopener"
              className="text-vibe-pink underline hover:text-pink-300"
            >
              {unsubLabel}
            </a>
            {newsletterAfter}
          </p>
        </div>
      </Section>
    </>
  );
}
