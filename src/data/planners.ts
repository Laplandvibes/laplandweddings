export interface Planner {
  slug: string;
  name: string;
  homeBase: { fi: string; en: string };
  serviceArea: { fi: string; en: string };
  priceFrom?: string;
  priceTier: '€€' | '€€€' | '€€€€';
  languages: string[];
  description: { fi: string; en: string };
  strengths: { fi: string[]; en: string[] };
  bestFor: { fi: string; en: string };
  publicWebsite: string;
  publicEmail?: string;
  ownProfilePage: boolean;
}

/**
 * Lähde: RESEARCH-MARKET.md (julkisesti vahvistetut toimijat).
 * Kaikki tiedot kerätty yritysten omilta sivuilta — ei sopimusta yhteenkään toistaiseksi.
 * Tarjoukset välitetään plannereille emailitse kunnes B2B-deal allekirjoitetaan.
 */
export const planners: Planner[] = [
  {
    slug: 'lapland-romance',
    name: 'Lapland Romance',
    homeBase: { fi: 'Rovaniemi', en: 'Rovaniemi' },
    serviceArea: { fi: 'Koko Lappi', en: 'All of Lapland' },
    priceFrom: '1 595 €',
    priceTier: '€€',
    languages: ['Suomi', 'English'],
    description: {
      fi: 'Rovaniemen vakiintunein hääsuunnittelija ja Lapin suurin julkinen brändi. Tarjoaa läpinäkyviä paketteja 1 595 €:sta (2 hengen elopement) 3 699 €:oon (40 hengen juhla). Visit Rovaniemi -kumppani ja TripAdvisor-suosikki.',
      en: 'The most established wedding planner in Rovaniemi and Lapland’s biggest public brand. Transparent packages from €1 595 (2-person elopement) to €3 699 (40-guest celebration). Visit Rovaniemi partner and TripAdvisor favourite.',
    },
    strengths: {
      fi: ['Läpinäkyvä hinnoittelu', 'FI + EN palvelu', 'TripAdvisor-arvostelut', 'Vihkijä, valokuvaus, kukat, kakku, hiukset, kuljetus saman katon alla'],
      en: ['Transparent pricing', 'FI + EN service', 'TripAdvisor reviews', 'Officiant, photography, flowers, cake, hair, transport — all under one roof'],
    },
    bestFor: {
      fi: 'Ensimmäisen kerran vihkivät parit jotka haluavat selvät hinnat ja Lapin asiantuntemuksen.',
      en: 'First-time couples who want clear pricing and deep Lapland expertise.',
    },
    publicWebsite: 'https://laplandromance.com/weddings',
    publicEmail: 'hello@laplandromance.com',
    ownProfilePage: false,
  },
  {
    slug: 'arctic-wedding-finland',
    name: 'Arctic Wedding Finland',
    homeBase: { fi: 'Vantaa, Suomi', en: 'Vantaa, Finland' },
    serviceArea: { fi: 'Koko Lappi', en: 'All of Lapland' },
    priceTier: '€€€',
    languages: ['Suomi', 'English'],
    description: {
      fi: 'Vantaalla toimiva, Hanna-Stina Seppäsen perustama hääsuunnittelutoimisto. Erikoistunut kestäviin ja räätälöityihin Lappi-häihin. Hinnoittelu räätälöitynä — ei julkisia paketteja.',
      en: 'A Vantaa-based wedding planner founded by Hanna-Stina Seppänen. Specialised in sustainable, bespoke Lapland weddings. Pricing tailored — no public packages.',
    },
    strengths: {
      fi: ['Kestävyysorientoituminen', 'Korkealuokkainen brändi', 'Etelä-Suomen tukikohta'],
      en: ['Sustainability focus', 'High-end branding', 'Southern Finland base'],
    },
    bestFor: {
      fi: 'Parit jotka haluavat ekologisesti ajatellun, räätälöidyn häähypon Lapissa.',
      en: 'Couples who want an eco-conscious, bespoke wedding experience in Lapland.',
    },
    publicWebsite: 'https://arcticweddingfinland.com/',
    publicEmail: 'contact@arcticweddingfinland.com',
    ownProfilePage: false,
  },
  {
    slug: 'sun-and-snow-weddings',
    name: 'Sun & Snow Weddings',
    homeBase: { fi: 'UK · Lappi-tuotanto', en: 'UK · Lapland production' },
    serviceArea: { fi: 'Lappi · UK-asiakkaille', en: 'Lapland · for UK clients' },
    priceTier: '€€€',
    languages: ['English'],
    description: {
      fi: 'Brittiläinen suunnittelutoimisto joka hoitaa pareille DVV-paperit alusta loppuun. Eksklusiivinen yhteistyö Northern Lights Ranchin Snow Chapel kanssa. Paras valinta UK-pareille jotka pelkäävät paperisotalupoa.',
      en: 'A British planner that handles all DVV paperwork end-to-end. Exclusive partnership with Northern Lights Ranch Snow Chapel. The best choice for UK couples worried about paperwork.',
    },
    strengths: {
      fi: ['DVV-paperit puolesta', 'NLR Snow Chapel -kumppanuus', 'UK-pohjainen tuotanto'],
      en: ['DVV paperwork on your behalf', 'NLR Snow Chapel partnership', 'UK-based production'],
    },
    bestFor: {
      fi: 'UK-parit jotka haluavat täyspaketin Lapin lumikappelihäille.',
      en: 'UK couples wanting a full-package Lapland snow chapel wedding.',
    },
    publicWebsite: 'https://www.sunandsnowweddings.com/index.php/lapland/wedding-packages-lapland',
    ownProfilePage: false,
  },
  {
    slug: 'amulet-events',
    name: 'Amulet Events',
    homeBase: { fi: 'Suomi', en: 'Finland' },
    serviceArea: { fi: 'Lappi', en: 'Lapland' },
    priceTier: '€€€',
    languages: ['English'],
    description: {
      fi: 'Adventure-orientoitunut elopement- ja hääsuunnittelija. Nadia, perustaja, painottaa "personally curated" -palvelua: hair, makeup, valokuvaus, kukat, seikkailut ja yksityisillalliset.',
      en: 'Adventure-focused elopement and wedding planner. Nadia, the founder, emphasises “personally curated” service: hair, makeup, photography, flowers, adventures, and private dinners.',
    },
    strengths: {
      fi: ['Adventure-pohjaiset elopementit', 'Henkilökohtainen palvelu', 'Pienet seurueet'],
      en: ['Adventure-based elopements', 'Personalised service', 'Small parties'],
    },
    bestFor: {
      fi: 'Seikkailuhenkiset parit, ei massamarkkina.',
      en: 'Adventure-spirited couples, not mass-market.',
    },
    publicWebsite: 'https://amuletevents.com/destinations/finland-wedding-planning-packages/',
    ownProfilePage: false,
  },
  {
    slug: 'nordic-mice-xwander',
    name: 'Nordic MICE / Xwander',
    homeBase: { fi: 'Helsinki + Ivalo', en: 'Helsinki + Ivalo' },
    serviceArea: { fi: 'Lappi luksus', en: 'Luxury Lapland' },
    priceTier: '€€€€',
    languages: ['English', 'Suomi', 'Deutsch', 'Français', 'Español'],
    description: {
      fi: 'Suomen kärki-luksushääsuunnittelija. Michelin-tason ravintolat, helikopterit, kahden kuukauden sääbackup, jopa 100 vierasta. Sopii kun haluatte parasta mahdollista — ei hintojen verrottelua.',
      en: 'Finland’s top-tier luxury wedding planner. Michelin-level catering, helicopters, two-month weather contingency, up to 100 guests. The right choice when you want the best possible — pricing on application.',
    },
    strengths: {
      fi: ['Michelin-tason illalliset', 'Helikopterituki', '5 kieltä', 'Yritystapahtuma-tausta tuo kurinalaisuutta'],
      en: ['Michelin-level dinners', 'Helicopter support', '5 languages', 'Corporate-event discipline'],
    },
    bestFor: {
      fi: 'Pareille jotka odottavat pohjoismaista luksusta ja monikielistä palvelua.',
      en: 'Couples expecting Nordic luxury service in multiple languages.',
    },
    publicWebsite: 'https://nordicmice.com/lapland-wedding-planner-luxury/',
    ownProfilePage: false,
  },
  {
    slug: 'weddings-of-wonder',
    name: 'Lapland Weddings · Weddings of Wonder',
    homeBase: { fi: 'Lappi', en: 'Lapland' },
    serviceArea: { fi: 'Levi · Ylläs · Lainio', en: 'Levi · Ylläs · Lainio' },
    priceTier: '€€€',
    languages: ['English'],
    description: {
      fi: 'Yli 10 vuotta toimineet Lapin häät -veteraanit. Erikoispakettit Levi Ice Castle ja Lainion Snow Village -venueille. Pidemmän kokemuksen edut ja vakaiden venue-yhteyksien varma valinta.',
      en: 'Lapland wedding veterans with 10+ years of experience. Specialised packages for Levi Ice Castle and Lainio Snow Village. The safe choice with deep venue relationships.',
    },
    strengths: {
      fi: ['10+ vuoden kokemus', 'Levi Ice Castle ja Snow Village -paketit', 'Vakiintunut maine'],
      en: ['10+ years of experience', 'Levi Ice Castle and Snow Village packages', 'Established reputation'],
    },
    bestFor: {
      fi: 'Parit jotka haluavat varmaa vakaata venue-yhteistyötä Levin alueella.',
      en: 'Couples wanting steady, proven venue relationships in the Levi area.',
    },
    publicWebsite: 'http://www.weddingsofwonder.com/',
    ownProfilePage: false,
  },
  {
    slug: 'adventure-wedding',
    name: 'Adventure Wedding',
    homeBase: { fi: 'Kansainvälinen · Lappi-paikalliset', en: 'International · Lapland-local crew' },
    serviceArea: { fi: 'Riisitunturi, Lappi', en: 'Riisitunturi, Lapland' },
    priceFrom: '€4 600',
    priceTier: '€€€',
    languages: ['English'],
    description: {
      fi: 'Seikkailuhenkisten parien suunnittelija. Riisitunturin paketti alkaa 4 600 €:sta — 8 tunnin vihkiminen tunturilla, korkeintaan 4 vierasta. Sekä valmiita paketteja että räätälöityjä.',
      en: 'A planner for adventure-minded couples. The Riisitunturi fell-top package starts at €4 600 — an 8-hour ceremony, max 4 guests. Both ready-made and bespoke options.',
    },
    strengths: {
      fi: ['Tunturit ja erämaa pääosassa', 'Valmiit paketit nopeaan päätökseen', 'Riisitunturin asiantuntemus'],
      en: ['Fells and wilderness front and centre', 'Ready-made packages for quick decisions', 'Riisitunturi expertise'],
    },
    bestFor: {
      fi: 'Pareille jotka haluavat vihkimisen tunturilla — ei hotellisalissa.',
      en: 'Couples who want to marry on a fell — not in a hotel ballroom.',
    },
    publicWebsite: 'https://www.adventure-wedding.com/en/destination/lapland',
    ownProfilePage: false,
  },
];
