import PageHero from '../components/PageHero';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { useLang } from '../i18n/LangContext';

interface Tier {
  title: string;
  range: string;
  size: string;
  includes: string[];
}

export default function Pricing() {
  const { lang, tr } = useLang();

  const tiers: Tier[] = lang === 'fi' ? [
    {
      title: 'Elopement · kahdestaan vihille',
      range: '€1 600 – €5 000',
      size: '2 hengen + 2 todistajaa',
      includes: ['Vihkijä englanniksi/suomeksi', 'Valokuvaaja 2 h', 'Pieni kukkakimppu + napinläpi', 'DVV-paperit (jos suunnittelija)', '1 yö lasi-iglussa'],
    },
    {
      title: 'Pieni häät · 10–25 vierasta',
      range: '€4 500 – €15 000',
      size: '10–25 vierasta',
      includes: ['Lumi-/lasikappeli', 'Vihkijä', 'Valokuvaaja 4–6 h', 'Kukat morsiamelle ja seurueelle', 'Illallinen 3 ruokalajia', '2–3 yötä cabineissa'],
    },
    {
      title: 'Premium häät · 25–60 vierasta',
      range: '€15 000 – €40 000',
      size: '25–60 vierasta',
      includes: ['Eksklusiivinen lumi-/jääkappeli', 'Live-musiikki', 'Valokuvaaja 8–10 h + video', 'Catering + viini', 'Husky/poro-kuljetus', '3–4 yötä premium-cabineissa'],
    },
    {
      title: 'Luksushäät · jopa 100 vierasta',
      range: '€40 000 – €100 000+',
      size: '60–100+ vierasta',
      includes: ['Celebration House (250 hh, Kakslauttanen)', 'Helikopterituki', 'Michelin-tason catering', 'Valokuvaaja + video team', 'Sääkontingenssit + premium-vierashotelli', 'Räätälöity 5–7 päivän ohjelma'],
    },
  ] : [
    {
      title: 'Elopement · just the two of you',
      range: '€1 600 – €5 000',
      size: 'Couple + 2 witnesses',
      includes: ['Officiant in English/Finnish', 'Photographer 2 h', 'Small bouquet + boutonnière', 'DVV paperwork (if planner-arranged)', '1 night in a glass igloo'],
    },
    {
      title: 'Small wedding · 10–25 guests',
      range: '€4 500 – €15 000',
      size: '10–25 guests',
      includes: ['Snow / glass chapel', 'Officiant', 'Photographer 4–6 h', 'Flowers for couple and party', '3-course dinner', '2–3 nights in cabins'],
    },
    {
      title: 'Premium wedding · 25–60 guests',
      range: '€15 000 – €40 000',
      size: '25–60 guests',
      includes: ['Exclusive snow / ice chapel', 'Live music', 'Photographer 8–10 h + video', 'Catering + wine', 'Husky / reindeer transfer', '3–4 nights in premium cabins'],
    },
    {
      title: 'Luxury wedding · up to 100 guests',
      range: '€40 000 – €100 000+',
      size: '60–100+ guests',
      includes: ['Celebration House (250 cap, Kakslauttanen)', 'Helicopter support', 'Michelin-level catering', 'Photographer + video team', 'Weather contingency + premium guest hotel', 'Bespoke 5–7 day programme'],
    },
  ];

  return (
    <>
      <SEO
        title={lang === 'fi' ? 'Häät Lapissa — hinta-arviot ja paketit | LaplandWeddings' : 'Lapland Weddings — Pricing and Packages | LaplandWeddings'}
        description={lang === 'fi' ? 'Mitä häät Lapissa maksaa? Elopement 1 600 €:sta, premium-häät 40 000 €:on. Vahvistetut markkinahinnat.' : 'How much do Lapland weddings cost? Elopement from €1 600, premium weddings up to €40 000. Verified market prices.'}
        path="/pricing"
      />
      <PageHero
        compact
        eyebrow={lang === 'fi' ? 'Hinta-arviot' : 'Pricing'}
        title={tr.pricing.title}
        subtitle={tr.pricing.subtitle}
        image="https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg"
        imageAlt={lang === 'fi' ? 'Lapin lumimaisema illalla' : 'Lapland snow landscape in evening' }
      />
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <article key={t.title} className="bg-night-light border border-white/5 rounded-2xl p-7">
              <h3 className="font-heading text-2xl text-white mb-2 tracking-wide">{t.title}</h3>
              <p className="text-3xl font-heading text-rose mb-1">{t.range}</p>
              <p className="text-sm text-gray-500 mb-5">{t.size}</p>
              <ul className="space-y-2">
                {t.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300"><span className="text-aurora-green mt-0.5">✓</span><span>{i}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-8 max-w-3xl mx-auto">
          {lang === 'fi'
            ? 'Hinnat ovat markkinaestimaatteja vuoden 2026 alusta. Yksittäiset suunnittelijat ja venuet hinnoittelevat itsenäisesti — pyydä konkreettinen tarjous yhteydenottolomakkeella.'
            : 'Prices are market estimates as of early 2026. Individual planners and venues set their own pricing — request an actual quote via the contact form.'}
        </p>
      </Section>
    </>
  );
}
