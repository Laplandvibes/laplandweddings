export interface Photographer {
  slug: string;
  name: string;
  baseLocation: { fi: string; en: string };
  style: { fi: string; en: string };
  description: { fi: string; en: string };
  website: string;
  instagram?: string;
  highlight: { fi: string; en: string };
}

export const photographers: Photographer[] = [
  {
    slug: 'maria-hedengren',
    name: 'Maria Hedengren',
    baseLocation: { fi: 'Lappi · destination', en: 'Lapland · destination' },
    style: { fi: 'Fine Art + dokumentaarinen', en: 'Fine Art + documentary' },
    description: {
      fi: 'Northern Lights Ranchin pääkumppani-valokuvaaja. Erikoisalana revontulet ja lumikappelit. Useat julkaisut destination-hää-medioissa (Junebug, Green Wedding Shoes).',
      en: 'Lead photography partner of Northern Lights Ranch. Specialised in Northern Lights and snow chapels. Multiple destination wedding media features (Junebug, Green Wedding Shoes).',
    },
    website: 'https://mariahedengren.com/lapland-wedding-photographer/',
    instagram: '@mariahedengren',
    highlight: {
      fi: 'NLR Snow Chapel -spesialisti — testattu sub-zero olosuhteissa.',
      en: 'NLR Snow Chapel specialist — proven in sub-zero conditions.',
    },
  },
  {
    slug: 'robin-goodlad',
    name: 'Robin Goodlad',
    baseLocation: { fi: 'UK · destination Lappi', en: 'UK · destination Lapland' },
    style: { fi: 'Palkittu dokumentaarinen', en: 'Award-winning documentary' },
    description: {
      fi: 'UK-pohjainen palkittu hääjvalokuvaaja, joka matkustaa säännöllisesti Lappiin. Sopii UK-pareille jotka haluavat saman valokuvaajan koko matkan ajan.',
      en: 'A UK-based award-winning wedding photographer who travels to Lapland regularly. Best for UK couples wanting the same photographer throughout the journey.',
    },
    website: 'https://www.robingoodlad.com/lapland-wedding-photographer/',
    highlight: {
      fi: 'Palkittu MPA + The Wedding Photographer Awards.',
      en: 'Award winner — MPA + The Wedding Photographer Awards.',
    },
  },
  {
    slug: 'cherelle-blake',
    name: 'Cherelle Blake',
    baseLocation: { fi: 'UK · NLR Snow Chapel', en: 'UK · NLR Snow Chapel' },
    style: { fi: 'Romanttinen, valoisa', en: 'Romantic, light' },
    description: {
      fi: 'Erikoistunut NLR Snow Chapel -elopement-pareihin. Vaalea, ilmava käsittely sopii talvisten lumimaisemien kanssa.',
      en: 'Specialised in NLR Snow Chapel elopement couples. Light, airy treatment that suits winter snowscapes.',
    },
    website: 'https://www.cherrelleblake.com/blog/Lapland-wedding-photographer-snow-chapel-wedding-elopement/',
    highlight: {
      fi: 'NLR Snow Chapel elopement -spesialisti.',
      en: 'NLR Snow Chapel elopement specialist.',
    },
  },
  {
    slug: 'marion-lefevre',
    name: 'Marion Lefevre',
    baseLocation: { fi: 'Lappi paikallinen', en: 'Local in Lapland' },
    style: { fi: 'Filminen, lämmin', en: 'Cinematic, warm' },
    description: {
      fi: 'Paikallinen Lappi-pohjainen valokuvaaja, joka toimii myös konsultointi-plannerina. Sopii pareille jotka haluavat lokaalin hinnoittelun ja ohjeistuksen.',
      en: 'A Lapland-based local photographer who also offers planning consultancy. Best for couples wanting local pricing and guidance.',
    },
    website: 'https://www.lefevremarionphotography.com/laplandwedding',
    instagram: '@marionlefevrephoto',
    highlight: {
      fi: 'Paikallinen + planning-konsultointi.',
      en: 'Local + planning consultancy.',
    },
  },
  {
    slug: 'jaakko-perala',
    name: 'Jaakko Perala',
    baseLocation: { fi: 'Lappi paikallinen', en: 'Local in Lapland' },
    style: { fi: 'Intimate / dokumentaarinen', en: 'Intimate / documentary' },
    description: {
      fi: 'Suomalainen valokuvaaja jonka oma "Lapland Intimate Wedding Guide" rankaa Googlessa. Sopii pareille jotka haluavat mainostekstin lisäksi paikallisia oppaita matkan suunnitteluun.',
      en: 'A Finnish photographer whose own “Lapland Intimate Wedding Guide” ranks on Google. Best for couples who want practical local guides alongside photography.',
    },
    website: 'https://jaakkoperala.com/lapland-intimate-wedding-guide/',
    highlight: {
      fi: 'Tuottaa SEO-content + valokuvaus.',
      en: 'Produces SEO content + photography.',
    },
  },
  {
    slug: 'tina-lapland-photographer',
    name: 'Tina · The Lapland Photographer',
    baseLocation: { fi: 'Lappi paikallinen', en: 'Local in Lapland' },
    style: { fi: 'Lifestyle + adventure', en: 'Lifestyle + adventure' },
    description: {
      fi: 'Adventure-elopement-spesialisti, joka tekee paritöitä myös tunturi- ja erämaapaikoissa.',
      en: 'Adventure elopement specialist, also working in fell and wilderness locations.',
    },
    website: 'https://laplandphotographer.com/blog',
    highlight: {
      fi: 'Tunturi- ja erämaaspesialisti.',
      en: 'Fell and wilderness specialist.',
    },
  },
];
