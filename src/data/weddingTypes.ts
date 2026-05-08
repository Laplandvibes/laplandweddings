export interface WeddingType {
  slug: string;
  name: { fi: string; en: string };
  tagline: { fi: string; en: string };
  description: { fi: string; en: string };
  bestSeason: { fi: string; en: string };
  priceRange: string;
  capacity: string;
  highlights: { fi: string[]; en: string[] };
  considerations: { fi: string[]; en: string[] };
  venueSlugs: string[];
  heroImage: string;
  icon: string;
}

export const weddingTypes: WeddingType[] = [
  {
    slug: 'northern-lights',
    name: { fi: 'Revontulihäät', en: 'Northern Lights Wedding' },
    tagline: {
      fi: 'Vihkiminen aurora borealiksen alla',
      en: 'Exchange vows under the aurora borealis',
    },
    description: {
      fi: 'Revontulet ovat Lapin tunnetuin häätoive — eikä turhaan. Pohjois-Lapin korkeilla leveysasteilla revontulet näkyvät pilvettöminä öinä keskimäärin 200 kertaa vuodessa. Vihkiminen pidetään tyypillisesti varhaisessa illassa lähellä venuea, jotta revontulet ehtivät ilmestyä juhlien aikana. Kakslauttanen, Northern Lights Ranch ja Apukka Resort ovat osaavimpia revontuli-pareiden kanssa.',
      en: 'The Northern Lights are Lapland’s most-requested wedding wish — and for good reason. At Northern Lapland’s high latitudes, the aurora appears on clear nights about 200 times per year. The ceremony is typically held in early evening close to the venue so the lights can emerge during the celebration. Kakslauttanen, Northern Lights Ranch and Apukka Resort are the most experienced with aurora couples.',
    },
    bestSeason: {
      fi: 'Syyskuu–maaliskuu, paras lokakuu–helmikuu',
      en: 'September–March, best October–February',
    },
    priceRange: '€2 500 – €40 000',
    capacity: '2–60 vierasta',
    highlights: {
      fi: ['Aurora-hälytysjärjestelmät yhteistyö-venueilla', 'Lasi-iglu yöksi (revontulet katosta)', 'Valokuvaaja jolla revontulikalibrointi', 'Polttariperinteet revontulien alla'],
      en: ['Aurora alert systems at partner venues', 'Glass igloo for the night (lights through the roof)', 'Photographer with aurora-calibrated equipment', 'After-party traditions under the lights'],
    },
    considerations: {
      fi: ['Revontulet eivät ole taatusti — vaadi venuelta sääbackup', 'Pakkanen voi olla -25 °C — pukukohtainen suunnittelu', 'Pilvinen yö syö revontulet — pidä hääpäivä joustavana ±2 päivää'],
      en: ['Auroras are not guaranteed — require a weather backup from the venue', 'Temperatures can hit -25 °C — plan attire accordingly', 'Cloudy nights hide the lights — keep the wedding date flexible by ±2 days'],
    },
    venueSlugs: ['kakslauttanen', 'northern-lights-ranch', 'apukka-resort', 'arctic-snowhotel', 'northern-lights-village-saariselka'],
    heroImage: 'https://mariahedengren.com/wp-content/uploads/2024/11/YK02-Aurora-Village-Ivalo.jpg',
    icon: '✨',
  },
  {
    slug: 'snow-chapel',
    name: { fi: 'Lumikappelihäät', en: 'Snow Chapel Wedding' },
    tagline: {
      fi: 'Vihille puhtaaksi veistetyssä lumi- tai jääkappelissa',
      en: 'Marry in a chapel carved from pure snow and ice',
    },
    description: {
      fi: 'Lumikappelit rakennetaan joka talvi uudelleen joulukuun alusta huhtikuuhun. Seinät, alttari ja istuimet veistetään kristallinkirkkaasta jäästä. Kappelit ovat kylmempiä kuin ulkona (-3 °C…-7 °C), joten seremoniat ovat lyhyitä (15–30 min) ja vieraat istuvat lampaantaljojen päällä. Kapasiteetit vaihtelevat: Lainion Snow Village 50, Northern Lights Ranch 60, Arctic SnowHotel 30, Levi Ice Castle 50.',
      en: 'Snow chapels are rebuilt every winter from early December to April. Walls, altar and seating are carved from crystal-clear ice. The chapels are colder than outside (-3 °C…-7 °C), so ceremonies are short (15–30 min) and guests sit on sheepskins. Capacities vary: Lainio Snow Village 50, Northern Lights Ranch 60, Arctic SnowHotel 30, Levi Ice Castle 50.',
    },
    bestSeason: {
      fi: 'Joulukuu–huhtikuu (kappelit avoinna)',
      en: 'December–April (chapels open)',
    },
    priceRange: '€1 500 – €15 000',
    capacity: '2–60 vierasta',
    highlights: {
      fi: ['Joka kappeli rakennetaan vuosittain uudelleen — ainutkertainen', 'Vihkiminen + lasinen jäätyikkä-toivotus', 'Vieraat lampaantaljoissa ja viltteihin käärittyinä', 'Useimmilla kappeleilla oma vihkijä-järjestely paikalla'],
      en: ['Each chapel is rebuilt every year — truly unique', 'Ceremony + ice-glass toasts', 'Guests on sheepskins and wrapped in blankets', 'Most chapels include officiant arrangement on site'],
    },
    considerations: {
      fi: ['Kappelit avoinna vain joulukuusta huhtikuuhun — varaus lukitaan jopa vuotta etukäteen', 'Sisälämpötila pakkasella — vihkimekko + lämmin alusasu', 'Sähköttömät kappelit → valaistus on kynttilä + lyhty, valokuvaajan tekninen taito ratkaisee'],
      en: ['Chapels open only December–April — bookings often locked a year ahead', 'Sub-zero indoor temperature — wedding dress with thermal underlayer', 'No electric lighting → candles and lanterns only; photographer’s technical skill is critical'],
    },
    venueSlugs: ['snow-village-lainio', 'northern-lights-ranch', 'arctic-snowhotel', 'levi-ice-castle', 'kakslauttanen'],
    heroImage: 'https://theranch.fi/wp-content/uploads/2025/02/wedding-gallery-1-theranch.jpg',
    icon: '❄',
  },
  {
    slug: 'glass-igloo',
    name: { fi: 'Lasi-iglu-häät', en: 'Glass Igloo Wedding' },
    tagline: {
      fi: 'Hääyö revontulien alla lämpöisessä lasikuvussa',
      en: 'Wedding night beneath the lights in a heated glass dome',
    },
    description: {
      fi: 'Lasi-iglu ei ole varsinaista vihkimistilaa, vaan ainutlaatuinen ensimmäinen yhteinen yö. Useimmat parit yhdistävät vihkimisen jäätai hirsikappelissa lasi-iglu-yhöeen. Iglujen pohjalämmitys ja sähkölämmitetty lasi pitää näkymän kirkkaana -30 °C:ssä. Levin Iglut, Apukka Kammi, Kakslauttanen, Arctic SnowHotel ja NLV Saariselkä ovat top-tier tason vaihtoehtoja.',
      en: 'A glass igloo is not the ceremony space itself but a unique first night together. Most couples combine an ice or log chapel ceremony with a glass igloo overnight. Underfloor heating and electrically heated glass keep the view clear at -30 °C. Levin Iglut, Apukka Kammi, Kakslauttanen, Arctic SnowHotel and NLV Saariselkä are top-tier options.',
    },
    bestSeason: {
      fi: 'Marraskuu–huhtikuu lumelle ja revontulille',
      en: 'November–April for snow and Northern Lights',
    },
    priceRange: '€300 – €1 200 / yö',
    capacity: '2 hengen yöpyminen',
    highlights: {
      fi: ['Aurora-hälytys herättää keskellä yötä jos revontulet ilmestyvät', 'Pohjalämmitys + sähkölämmitetty lasikatto', 'Sauna ja amme yleensä mukana premium-mallissa', 'Aamiainen iglussa tai pääravintolassa'],
      en: ['Aurora alarm wakes you mid-night if the lights appear', 'Underfloor heating + electrically heated glass roof', 'Sauna and tub usually included in premium models', 'Breakfast in the igloo or main restaurant'],
    },
    considerations: {
      fi: ['Iglu on hääyö, ei juhlatila — vihkimisen järjestäjä toinen', 'Yhteen iglun mahtuu vain pari (4 hengen iglutyyppejä rajoitetusti)', 'Lasi peilaa sisävalon → revontulia varten valot pois'],
      en: ['Igloo is for the wedding night, not the ceremony — venue arranged separately', 'Single igloo holds the couple only (4-person igloos limited)', 'Glass mirrors interior light → lights off to see auroras'],
    },
    venueSlugs: ['kakslauttanen', 'levin-iglut', 'apukka-resort', 'arctic-snowhotel', 'northern-lights-village-saariselka', 'tundrea-kilpisjarvi'],
    heroImage: 'https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg',
    icon: '🏔',
  },
  {
    slug: 'midnight-sun',
    name: { fi: 'Keskiyön auringon häät', en: 'Midnight Sun Wedding' },
    tagline: {
      fi: 'Vihille kun aurinko ei laske',
      en: 'Marry when the sun never sets',
    },
    description: {
      fi: 'Pohjois-Lapissa aurinko ei laske horisontin alle 23.5.–24.7. — vihkiminen voidaan pitää keskellä yötä luonnonvalossa. Saariselkä, Inari ja Kilpisjärvi ovat täydellisiä. Sää on lämmin (15–25 °C päivällä), joten ulkohäät metsässä, järvenrannassa tai tunturilla onnistuvat ilman lumipukuja. Kasvavin trendi 2025–2027.',
      en: 'In Northern Lapland the sun does not set below the horizon from 23 May to 24 July — the ceremony can be held at midnight in natural light. Saariselkä, Inari and Kilpisjärvi are perfect. Weather is warm (15–25 °C in daytime), so outdoor weddings in forests, lakeside or on the fells work without snow gear. The fastest-growing trend for 2025–2027.',
    },
    bestSeason: {
      fi: '23. toukokuuta – 24. heinäkuuta',
      en: 'May 23 – July 24',
    },
    priceRange: '€2 000 – €25 000',
    capacity: '2–80 vierasta',
    highlights: {
      fi: ['24h luonnonvalo — kuvaussessio milloin tahansa', 'Lämmin sää — perinteinen morsiuspuku ilman ekstrapakkasta', 'Hyttysmäärä huipussaan kesä–heinäkuussa — torjunta tärkeää', 'Halvempi sesonki kuin talvi — premium-iglut 40–50 % alennuksessa'],
      en: ['24h natural light — photoshoot anytime', 'Warm weather — wear a traditional dress with no thermal layers', 'Mosquito peak in June–July — repellent essential', 'Cheaper season than winter — premium igloos at 40–50 % off'],
    },
    considerations: {
      fi: ['Hyttyset peak — heinäkuu helpoin, elokuussa hyttyset jo vähissä', 'Ei revontulia kesällä — tämä on eri estetiikka', 'Ei lunta tai lumikappelia — wow-tekijä on auringonvalo'],
      en: ['Mosquitos peak — July easiest, fewer mosquitos by August', 'No Northern Lights in summer — different aesthetic', 'No snow or snow chapel — the wow factor is the sunlight'],
    },
    venueSlugs: ['kakslauttanen', 'wilderness-hotel-inari', 'tundrea-kilpisjarvi', 'apukka-resort', 'lapland-hotels-saaga'],
    heroImage: 'https://mariahedengren.com/wp-content/uploads/2023/09/HG00-Lapland-wedding-photographer.jpg',
    icon: '☀',
  },
  {
    slug: 'elopement',
    name: { fi: 'Elopement / Kahdestaan vihille', en: 'Elopement / Two-Person Wedding' },
    tagline: {
      fi: 'Pelkästään te kaksi, vihkijä ja valokuvaaja',
      en: 'Just the two of you, the officiant and a photographer',
    },
    description: {
      fi: 'Suomen helpoin häämuoto: vain hääpari, vihkijä ja kaksi todistajaa. Kaikki paperitehtävät hoituu DVV:n kautta, ja monet plannerit (Lapland Romance, Adventure Wedding) tarjoavat avaimet käteen -elopement -paketteja 1 600 €:sta alkaen. Elopement vie 1–2 päivää ja antaa parille kaksin juhlavuoden hetken Lapin maisemassa.',
      en: 'Finland’s easiest wedding form: just the couple, the officiant and two witnesses. All paperwork goes through DVV, and many planners (Lapland Romance, Adventure Wedding) offer turnkey elopement packages from €1 600. Elopement takes 1–2 days and gives the couple their wedding moment alone in the Lapland landscape.',
    },
    bestSeason: {
      fi: 'Ympäri vuoden — paras joulukuussa, helmikuussa ja kesäkuussa',
      en: 'Year-round — best in December, February and June',
    },
    priceRange: '€1 600 – €5 000',
    capacity: '2 hengen',
    highlights: {
      fi: ['Kustannus 1/10 perinteisistä häistä', 'DVV-paperit hoituu 3–5 viikossa', 'Avaimet käteen -paketit valokuvaaja ja vihkijä mukana', 'Ei painetta vieraille — paras lokaatiovalinta'],
      en: ['Cost 1/10 of a traditional wedding', 'DVV paperwork done in 3–5 weeks', 'Turnkey packages with photographer and officiant', 'No guest pressure — pick the best location'],
    },
    considerations: {
      fi: ['DVV-paperit on aloitettava 2 kuukautta ennen vihkimistä', 'Vain 2 todistajaa pakollinen — haetaan paikan päältä', 'Useimmat venuet ottavat elopement-pareja vain ulkokeskellä viikolla'],
      en: ['DVV paperwork must start 2 months before the ceremony', 'Only 2 witnesses required — found locally', 'Most venues take elopement couples mid-week, off-peak'],
    },
    venueSlugs: ['kakslauttanen', 'apukka-resort', 'tundrea-kilpisjarvi', 'wilderness-hotel-muotka'],
    heroImage: 'https://mariahedengren.com/wp-content/uploads/2018/04/63-Lapland-winter-elopement.jpg',
    icon: '💍',
  },
  {
    slug: 'vow-renewal',
    name: { fi: 'Lupausten uusiminen', en: 'Vow Renewal' },
    tagline: {
      fi: 'Uudistakaa lupauksenne Lapin lumessa',
      en: 'Renew your vows in the Lapland snow',
    },
    description: {
      fi: 'Lupausten uusiminen ei vaadi mitään juridisia papereita — vain seremonia ja hääpari. Useimmat plannerit tarjoavat "renewal"-paketteja 50 % alennuksella verrattuna virallisiin häihin. Sopii hyvin pitkien parisuhteiden virstanpylväiseen tai uusiin perheisiin (uusperheen aloitus). Tällä on merkittävä trendi USA:ssa, eivätkä paperisotalupaukset paina.',
      en: 'Renewing vows requires no legal paperwork — just a ceremony and the couple. Most planners offer "renewal" packages at 50 % off official weddings. Excellent for long-relationship milestones or new families (blended-family launches). Major US trend, with no paperwork pressure.',
    },
    bestSeason: {
      fi: 'Ympäri vuoden, paras 5/10/25/50 vuotta yhdessä',
      en: 'Year-round, best at the 5/10/25/50-year milestone',
    },
    priceRange: '€800 – €3 500',
    capacity: '2–30 vierasta',
    highlights: {
      fi: ['Ei DVV-papereita', 'Vapaa muoto — voitte itse kirjoittaa lupaukset', 'Sopii uusperheille (lapsen siunaus mukana)', 'Halvempi kuin viralliset häät'],
      en: ['No DVV paperwork', 'Free format — you write the vows', 'Works for blended families (child blessing included)', 'Cheaper than an official wedding'],
    },
    considerations: {
      fi: ['Ei juridista vaikutusta — paperi-avioliitto on jo voimassa', 'Tarvitaan vihkijä-tuntuinen henkilö (ei pakko olla virallinen)', 'Valokuvaus-arvo on kuitenkin sama kuin häissä — investoikaa siihen'],
      en: ['No legal effect — paper marriage already in force', 'Need someone with officiant presence (not legally required)', 'Photography value equals a real wedding — invest there'],
    },
    venueSlugs: ['kakslauttanen', 'apukka-resort', 'lapland-hotels-saaga', 'wilderness-hotel-muotka'],
    heroImage: 'https://mariahedengren.com/wp-content/uploads/2018/04/51-best-wedding-photographer-Lapland.jpg',
    icon: '💞',
  },
];
