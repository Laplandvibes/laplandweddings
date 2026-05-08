export interface Location {
  slug: string;
  name: { fi: string; en: string };
  region: { fi: string; en: string };
  airport: string;
  airportDistanceKm: number;
  intro: { fi: string; en: string };
  highlight: { fi: string; en: string };
  bestFor: { fi: string[]; en: string[] };
  venueSlugs: string[];
  heroImage: string;
  heroAlt: { fi: string; en: string };
  seasonNote: { fi: string; en: string };
}

export const locations: Location[] = [
  {
    slug: 'rovaniemi',
    name: { fi: 'Rovaniemi', en: 'Rovaniemi' },
    region: { fi: 'Lappi · Joulupukin kotikaupunki', en: 'Lapland · Home of Santa Claus' },
    airport: 'RVN',
    airportDistanceKm: 10,
    intro: {
      fi: 'Lapin pääkaupunki ja kansainvälisen lentokentän ansiosta helpoin saapua. Joulupukin Pajakylä, Arctic SnowHotel jääkappeleineen sekä Apukka Resortin lasi-iglut tekevät Rovaniemestä Lapin monipuolisimman häämatkakohteen.',
      en: 'The capital of Lapland and the easiest gateway thanks to its international airport. Santa Claus Village, the Arctic SnowHotel ice chapel, and the glass igloos at Apukka Resort make Rovaniemi the most versatile Lapland wedding destination.',
    },
    highlight: {
      fi: 'Suorat lennot Helsingistä, Lontoosta, Frankfurtista ja Pariisista — vieraat saapuvat vaivatta.',
      en: 'Direct flights from Helsinki, London, Frankfurt and Paris — guests arrive effortlessly.',
    },
    bestFor: {
      fi: ['Talvihäät jääkappelissa', 'Häät joulupukin pajakylän tuntumassa', 'Helppo saavutettavuus kansainvälisille vieraille'],
      en: ['Winter weddings in an ice chapel', 'Weddings near Santa Claus Village', 'Easy access for international guests'],
    },
    venueSlugs: ['arctic-snowhotel', 'apukka-resort', 'arctic-treehouse', 'santas-hotel-santamus', 'nova-skyland'],
    heroImage: 'https://arctictreehousehotel.com/wp-content/uploads/2025/05/Arctic-treehouse-hotel-summer-august-1600x960.jpg',
    heroAlt: { fi: 'Rovaniemen lumiset metsät iltahämärässä', en: 'Snowy forests of Rovaniemi at twilight' },
    seasonNote: {
      fi: 'Lumi maassa marraskuusta huhtikuuhun. Revontulia odotettavissa syyskuusta maaliskuuhun pilvettöminä öinä.',
      en: 'Snow on the ground from November to April. Northern Lights expected from September to March on clear nights.',
    },
  },
  {
    slug: 'saariselka',
    name: { fi: 'Saariselkä & Inari', en: 'Saariselkä & Inari' },
    region: { fi: 'Pohjois-Lappi · Urho Kekkosen kansallispuiston laidalla', en: 'Northern Lapland · Edge of Urho Kekkonen National Park' },
    airport: 'IVL',
    airportDistanceKm: 30,
    intro: {
      fi: 'Pohjois-Lapin sydän, jossa revontulet näkyvät tilastollisesti useammin kuin millään muulla matkailualueella. Kakslauttasen lasi-iglut ja jääkappeli ovat alueen tunnetuimmat häätilat. Inarinjärvi tuo historiaa ja saamelaiskulttuuria juhliin.',
      en: 'The heart of Northern Lapland, where the Northern Lights statistically appear more often than anywhere else in the tourism area. Kakslauttanen’s glass igloos and ice chapel are the area’s most famous wedding venues. Lake Inari adds history and Sámi culture to your celebration.',
    },
    highlight: {
      fi: 'Korkein revontulitodennäköisyys koko Lapissa — keskimäärin 200 yötä vuodessa.',
      en: 'Highest Northern Lights probability in all of Lapland — about 200 nights per year.',
    },
    bestFor: {
      fi: ['Revontulihäät', 'Lasi-iglu-hääyö', 'Saamelaiskulttuuri ja Inarinjärvi'],
      en: ['Northern Lights weddings', 'Glass igloo wedding nights', 'Sámi culture and Lake Inari'],
    },
    venueSlugs: ['kakslauttanen', 'northern-lights-village-saariselka', 'wilderness-hotel-muotka', 'wilderness-hotel-inari', 'wilderness-hotel-juutua'],
    heroImage: 'https://wa-uploads.profitroom.com/kakslauttanenarcticresort/1600x1000/17624930105363_kakslauttanenarcticresortem16glassteepee.jpg',
    heroAlt: { fi: 'Lasi-iglu revontulien alla Saariselällä', en: 'Glass igloo under Northern Lights in Saariselkä' },
    seasonNote: {
      fi: 'Kaamos kestää joulukuusta tammikuuhun, mutta revontulet näkyvät päivänvalossakin pimeimpinä viikkoina. Keskiyön aurinko 23.5.–24.7.',
      en: 'Polar night lasts from December to January, but Northern Lights appear even during daytime in the darkest weeks. Midnight Sun May 23 – July 24.',
    },
  },
  {
    slug: 'levi',
    name: { fi: 'Levi & Kittilä', en: 'Levi & Kittilä' },
    region: { fi: 'Tunturi-Lappi · Suomen suurin hiihtokeskus', en: 'Fell Lapland · Finland’s largest ski resort' },
    airport: 'KTT',
    airportDistanceKm: 14,
    intro: {
      fi: 'Levin alueella yhdistyvät hiihtokeskuksen palvelut, Lainion lumikylä ja Northern Lights Ranchin lasiseinämökit, joista revontulet näkee suoraan vuoteesta. Kittilän lentokentälle suorat lennot Lontoosta — siksi brittien suosikki.',
      en: 'Levi brings together a full ski-resort infrastructure, the Lainio Snow Village, and Northern Lights Ranch where the auroras are visible straight through your cabin’s glass wall. Kittilä Airport has direct flights from London, which is why Levi is the British favourite.',
    },
    highlight: {
      fi: 'Suorat lennot Lontoosta, Manchesterista ja Birminghamista koko sesongin.',
      en: 'Direct flights from London, Manchester and Birmingham throughout the season.',
    },
    bestFor: {
      fi: ['Lumikappelihäät Lainiossa', 'Northern Lights Ranchin Snow Chapel', 'Hiihto- ja laskettelumatkailijoiden häät'],
      en: ['Snow chapel weddings at Lainio', 'Snow Chapel at Northern Lights Ranch', 'Weddings combined with skiing'],
    },
    venueSlugs: ['snow-village-lainio', 'levi-ice-castle', 'northern-lights-ranch', 'levin-iglut', 'northern-lights-village-levi', 'hotelli-hullu-poro', 'levi-panorama'],
    heroImage: 'https://theranch.fi/wp-content/uploads/2025/02/hero-private-event-theranch.webp',
    heroAlt: { fi: 'Levin tunturit auringonlaskussa', en: 'Levi fells at sunset' },
    seasonNote: {
      fi: 'Lumikappelit ovat avoinna joulukuusta huhtikuuhun. Pisin sesonki Suomessa.',
      en: 'Snow chapels open from December to April. The longest season in Finland.',
    },
  },
  {
    slug: 'yllas',
    name: { fi: 'Ylläs', en: 'Ylläs' },
    region: { fi: 'Tunturi-Lappi · Pallas-Yllästunturin kansallispuisto', en: 'Fell Lapland · Pallas-Yllästunturi National Park' },
    airport: 'KTT',
    airportDistanceKm: 50,
    intro: {
      fi: 'Hiljaisempi vaihtoehto Levin viereen. Ylläsjärven Saaga on saanut wedding-mainetta TripAdvisorissa, ja Lainion lumikylä sijaitsee Yllästä lähinnä. Sopii pareille jotka haluavat tunturi-rauhaa ilman hiihtokeskuksen vilskettä.',
      en: 'A quieter alternative next to Levi. Lapland Hotels Saaga has earned wedding fame on TripAdvisor, and the Lainio Snow Village sits closest to Ylläs. Best for couples wanting fell tranquility without ski resort bustle.',
    },
    highlight: {
      fi: 'Suomen puhtainta ilmaa, hiljaisin tunturikohde häille.',
      en: 'Finland’s cleanest air, the quietest fell destination for weddings.',
    },
    bestFor: {
      fi: ['Pieni ja intiimi häät', 'Tunturikylpyläjuhlat', 'Luonnonrauha vieraille'],
      en: ['Small and intimate weddings', 'Fell-top spa celebrations', 'Wilderness peace for guests'],
    },
    venueSlugs: ['lapland-hotels-saaga', 'snow-village-lainio'],
    heroImage: 'https://a.storyblok.com/f/279002/7158x4092/e8a48b24e7/lapland-hotels-saaga-outdoor-winter.jpg',
    heroAlt: { fi: 'Ylläksen tunturin lumihuiput', en: 'Snow-covered Ylläs fell peaks' },
    seasonNote: {
      fi: 'Ruskakausi syyskuun puolivälissä on Ylläksen kauneinta aikaa kesähäille.',
      en: 'The autumn ruska in mid-September is Ylläs’ most beautiful time for autumn weddings.',
    },
  },
  {
    slug: 'pyha-luosto',
    name: { fi: 'Pyhä-Luosto', en: 'Pyhä-Luosto' },
    region: { fi: 'Itä-Lappi · Pyhä-Luoston kansallispuisto', en: 'Eastern Lapland · Pyhä-Luosto National Park' },
    airport: 'RVN',
    airportDistanceKm: 110,
    intro: {
      fi: 'Lapin parhaiten varjeltu salaisuus. Hotel Aurora Pyhä on pohjoisin tähtibongauspaikka maailmassa, ja Lapland Hotels Pyhä tarjoaa amethystikaivoksen jonka hääpari voi varata yksityiskäyttöön.',
      en: 'Lapland’s best-kept secret. Hotel Aurora Pyhä is the northernmost stargazing site in the world, and Lapland Hotels Pyhä offers an amethyst mine couples can book privately.',
    },
    highlight: {
      fi: 'Ainutlaatuinen amethyst-kaivosvihkiminen.',
      en: 'A one-of-a-kind amethyst mine wedding ceremony.',
    },
    bestFor: {
      fi: ['Tähtibongaus + revontulet', 'Amethystikaivos-vihkiminen', 'Etäinen, vähän vieraita'],
      en: ['Stargazing + Northern Lights', 'Amethyst mine ceremonies', 'Remote, intimate ceremonies'],
    },
    venueSlugs: ['hotel-aurora-pyha', 'lapland-hotels-pyha'],
    heroImage: 'https://visitpyha.fi/wp-content/uploads/2025/09/IMG20240120111651-scaled.jpg',
    heroAlt: { fi: 'Pyhän tunturin metsät', en: 'Forests of Pyhä fell' },
    seasonNote: {
      fi: 'Joulukuu–maaliskuu on parasta revontuliaikaa. Kesäkuu–elokuu vaellushäille.',
      en: 'December–March for the best Northern Lights. June–August for hiking weddings.',
    },
  },
  {
    slug: 'kilpisjarvi',
    name: { fi: 'Kilpisjärvi', en: 'Kilpisjärvi' },
    region: { fi: 'Käsivarsi · Norjan ja Ruotsin rajalla', en: 'The Arm of Finland · At the Norwegian and Swedish borders' },
    airport: 'KTT',
    airportDistanceKm: 220,
    intro: {
      fi: 'Suomen pohjoisin ja korkein paikka, jossa on Lapin parhaat revontulinäkymät tunturiston yllä. Tundrea Igloos tarjoaa lasikatollisia mökkejä järvenrannassa.',
      en: 'Finland’s northernmost and highest point, with Lapland’s best Northern Lights views above the fells. Tundrea Igloos offers glass-roof cabins on the lake shore.',
    },
    highlight: {
      fi: 'Kolmen valtakunnan rajapyykkivihkiminen Suomessa, Norjassa ja Ruotsissa samaan aikaan.',
      en: 'Three-country border ceremony — be married in Finland, Norway and Sweden at the same point.',
    },
    bestFor: {
      fi: ['Adventure-elopement', 'Kolmen maan rajavihkiminen', 'Eksklusiivinen pieni häät'],
      en: ['Adventure elopements', 'Three-country border ceremonies', 'Exclusive small weddings'],
    },
    venueSlugs: ['tundrea-kilpisjarvi'],
    heroImage: 'https://tundrea.com/wp-content/uploads/2021/09/IMG_6429-HDR-2-scaled-e1660643559657.jpg',
    heroAlt: { fi: 'Kilpisjärven tunturit kesällä', en: 'Kilpisjärvi fells in summer' },
    seasonNote: {
      fi: 'Tunturikesä on kompakti — kesäkuun loppu elokuun alkuun. Talvella tie auki Kilpisjärvelle ympäri vuoden.',
      en: 'The fell summer is compact — late June to early August. Road open to Kilpisjärvi year-round in winter.',
    },
  },
];
