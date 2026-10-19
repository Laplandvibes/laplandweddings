/**
 * Finnish wedding traditions: the /traditions page and the front-page section.
 *
 * Vesa 19.10.2026 on the old front-page "wedding moments" cards (husky arrival,
 * frozen lakes, sauna to snow, ice hole): "meneekö kukaan avantoon häissä? … miksi
 * jutut loppuu kesken vaikka klikkaamalla ei pääse lukemaan enemmän perinteistä kun
 * suomessa mennään naimisiin" and "osio on todella geneerinen". Those cards made
 * claims nobody had checked ("stepping in wearing the dress is the picture that
 * travels"). These are real traditions, each with a source a reader can follow.
 *
 * One file per locale (`fi.ts`, `en.ts`, …) so a translation never touches another
 * language's file. Images, sources and the order of items live in `index.ts`.
 */
export type TraditionSlug =
  | 'bridal-sauna'
  | 'wedding-crashers'
  | 'wedding-waltz'
  | 'bride-kidnapping'
  | 'maid-of-honour'
  | 'bridal-crown'
  | 'sahti'
  | 'fell-chapels';

export type TraditionKind = 'living' | 'historical' | 'lapland';

export type TraditionText = {
  title: string;
  /** Front-page card: two or three whole sentences, read in full on the card. */
  teaser: string;
  /** Page body, one string per paragraph. */
  body: string[];
  /** How a couple marrying in Lapland can take part in it. Optional. */
  inLapland?: string;
};

export type TraditionsHome = {
  eyebrow: string;
  title: string;
  intro: string;
  readMore: string;
  allTraditions: string;
  /** Teaser text per tradition shown on the front page. */
  items: Partial<Record<TraditionSlug, { title: string; teaser: string }>>;
};

export type TraditionsPage = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string[];
  tocLabel: string;
  kind: Record<TraditionKind, string>;
  inLaplandLabel: string;
  sourcesLabel: string;
  items: Record<TraditionSlug, TraditionText>;
  sami: { title: string; body: string[] };
  cta: { title: string; body: string; venues: string; enquiry: string };
};
