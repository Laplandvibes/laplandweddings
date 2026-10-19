import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Finse huwelijkstradities',
  title: 'Zo trouwen Finnen',
  intro: 'De bruidssauna, de ongenode “schoffelgasten” en de bruiloftswals zijn Finse gebruiken waarvan de geschiedenis in musea en woordenboeken is vastgelegd. Lapland voegt daar de plek aan toe: fjällkapellen waar paren trouwen.',
  readMore: 'Lees meer',
  allTraditions: 'Alle huwelijkstradities',
  items: {
    'bridal-sauna': {
      title: 'Bruidssauna',
      teaser: 'Voor de bruiloft werd de bruid gebaad in een sauna die met bloemen en bladertakken was versierd. Ze had haar eigen plek op de saunabank en haar eigen bundel berkentwijgen. Tegenwoordig leeft het gebruik voort op vrijgezellenfeesten.',
    },
    'wedding-crashers': {
      title: 'Ongenode gasten',
      teaser: 'Een kuokkavieras, letterlijk een “schoffelgast”, komt ongenood naar een bruiloft. Het woord gaat terug op rondtrekkende bedelaars die een stok met een haak aan het uiteinde droegen, een kuokka.',
    },
    'wedding-waltz': {
      title: 'Bruiloftswals',
      teaser: 'Het bruidspaar opent het dansen met een wals, en velen oefenen die eerst op dansles. De bekendste Finse bruiloftswals is de Bruiloftswals van Akseli en Elina.',
    },
    'fell-chapels': {
      title: 'Fjällkapellen',
      teaser: 'Het trouwtapijt in de Mariakapel in Levi is gemaakt van de pootvellen van rendierkalveren. In de wilderniskerk van Pielpajärvi in Inari, uit 1760, trouwen in de zomer paren.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Trouwen in Finland',
  heroTitle: 'Finse huwelijkstradities',
  heroSubtitle: 'De bruidssauna, ongenode gasten, de bruiloftswals en de fjällkapellen van Lapland: waar de gebruiken vandaan komen en hoe ze vandaag op bruiloften terugkomen.',
  intro: [
    'Op deze pagina hebben we de Finse huwelijkstradities verzameld waarvan de achtergrond te controleren is. De bronnen zijn musea, het Instituut voor de Talen van Finland, de Finse publieke omroep Yle en de nationale inventaris van levend erfgoed die het Finse Erfgoedagentschap bijhoudt. Elk onderdeel eindigt met een link naar de bron.',
    'De meeste van deze gebruiken komen uit West- en Zuid-Finland. In Lapland maakt de plek het verschil: fjällkapellen en een oude wilderniskerk. Volgens Yle trouwden in 2022 in Finland 73 buitenlandse paren die in het buitenland wonen, en nergens in het land trouwen zoveel buitenlanders als in Kittilä.',
  ],
  tocLabel: 'Op deze pagina',
  kind: {
    living: 'Leeft voort op bruiloften',
    historical: 'Historische traditie',
    lapland: 'In Lapland',
  },
  inLaplandLabel: 'Op uw bruiloft in Lapland',
  sourcesLabel: 'Bronnen',
  items: {
    'bridal-sauna': {
      title: 'Bruidssauna',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'De bruidssauna hoort bij de Fins-Karelische traditie van de huwelijkssauna. De sauna werd versierd met bloemen en bladertakken, en de bruid kreeg haar eigen plek op de saunabank en haar eigen bundel berkentwijgen. Bij het baden hoorden reinigingsrituelen, liederen en bezweringen, en de bruid werd ook gebaad om haar vruchtbaar te maken.',
        'Traditioneel saunabaden, waarvan de bruidssauna het bekendste voorbeeld is, staat in de Finse nationale inventaris van levend erfgoed. De Finse saunacultuur werd in 2020 opgenomen in de Representatieve Lijst van het Immaterieel Cultureel Erfgoed van de Mensheid van UNESCO.',
        'Tegenwoordig wordt de bruidssauna meestal tijdens het vrijgezellenfeest gehouden. In Zuid-Österbotten is het gebruik nieuw leven ingeblazen tijdens een evenement met een traditionele kroonbruiloft in Nurmo.',
      ],
      inLapland: 'Heeft uw locatie een sauna, dan kan de bruidssauna op de avond voor de bruiloft plaatsvinden. Vermeld het in uw aanvraag, dan gaat de wens precies zoals u hem schreef naar de planner.',
    },
    'wedding-crashers': {
      title: 'Ongenode gasten',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Een kuokkavieras is een gast die zonder uitnodiging naar een bruiloft of een ander feest komt. Volgens het Instituut voor de Talen van Finland opperde de taalkundige Valentin Kiparsky in 1977 dat deze gasten oorspronkelijk rondtrekkende bedelaars waren die een stok met een haak aan het uiteinde bij zich droegen, een kuokka.',
        'Het Lets en het Litouws hebben een vergelijkbaar samengesteld woord, en het Finse woord is mogelijk naar dat voorbeeld gevormd.',
      ],
    },
    'wedding-waltz': {
      title: 'Bruiloftswals',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Het bruidspaar danst de eerste dans van de avond, en in Finland is dat traditioneel een wals. Veel paren oefenen hem op dansles, en steeds meer kiezen tegenwoordig een eigen nummer.',
        'De bekendste Finse bruiloftswals is de Bruiloftswals van Akseli en Elina. Hij is van Heikki Aaltoila en komt uit de film “Täällä Pohjantähden alla” uit 1968.',
        'De openingsdans is niet alleen een Finse gewoonte: hij hoort bij bruiloften in de hele westerse wereld.',
      ],
      inLapland: 'Wilt u de wals live laten spelen, vermeld dat dan in uw aanvraag.',
    },
    'bride-kidnapping': {
      title: 'Bruidsontvoering',
      teaser: 'Halverwege het feest ontvoeren de bestman en zijn vrienden de bruid, en de bruidegom wint haar terug door opdrachten te volbrengen.',
      body: [
        'Bij een bruidsontvoering nemen de bestman en zijn helpers, of de vriendinnen van het vrijgezellenfeest, de bruid tijdens het feest mee. De bruidegom krijgt haar terug door opdrachten te volbrengen die, zoals Yle het zegt, zijn mannelijkheid op de proef stellen.',
        'Waar het gebruik vandaan komt, is niet achterhaald. Onderzoekers die Yle heeft geïnterviewd, noemden het patriarchaal. Daarom beslist het bruidspaar zelf of het spel op hun bruiloft thuishoort.',
      ],
    },
    'maid-of-honour': {
      title: 'Kaaso en bestman',
      teaser: 'De kaaso is de helpster van de bruid, en het woord is oud Baltisch-Fins. Het woord bestman kwam daarentegen via het Zweeds uit het Engels in het Fins terecht.',
      body: [
        'De kaaso was oorspronkelijk de helpster en aankleedster van de bruid. In West-Finland was zij vaak een semiprofessional, zoals een weduwe, een domineesvrouw of later een naaister, en meestal geen familie van de bruid. Het woord heeft tegenhangers in het Votisch en in Estische dialecten. Tegenwoordig betekent kaaso bruidsmeisje.',
        'Het woord bestman, voor de helper van de bruidegom, is via het Zweeds uit het Engels geleend. In dezelfde tijd kwamen ook vrijgezellenfeesten en andere Europese huwelijksgebruiken naar Finland.',
      ],
      inLapland: 'De Finse wet vereist geen kaaso of bestman, maar bij het huwelijk moeten twee getuigen zijn. Zij hoeven geen Finnen te zijn.',
    },
    'bridal-crown': {
      title: 'Bruidskroon',
      teaser: 'Op de kroonbruiloften in West-Finland droeg de bruid een kroon. Nog maar een paar families in Österbotten houden de traditie in stand.',
      body: [
        'Grote kroonbruiloften, die tot drie dagen konden duren, hoorden bij de West-Finse huwelijkstraditie. De bruid droeg een kroon, en in de grote kroon kon een kleinere erekroon verborgen zitten.',
        'Het Nationaal Museum van Finland bezit meerdere bruidskronen, waaronder een kroon van mirte uit 1891. Nog maar een paar families in Österbotten houden kroonbruiloften in ere.',
      ],
    },
    sahti: {
      title: 'Sahti',
      teaser: 'Sahti is een oud Fins bier dat vooral op het platteland nog altijd als feestdrank voor bruiloften wordt gebrouwen.',
      body: [
        'Sahti is een Fins bier dat thuis wordt gebrouwen. In de beschrijving van de Finse biercultuur in de nationale inventaris van levend erfgoed staat dat sahti vooral op het platteland nog altijd als feestdrank voor bruiloften wordt gebrouwen.',
      ],
    },
    'fell-chapels': {
      title: 'Fjällkapellen en een wilderniskerk',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'De Mariakapel (Marian kappeli) in Levi werd in 1998 ingewijd, en de kerkelijke gemeente van Kittilä noemt haar een populaire trouwkerk. Het trouwtapijt maakte Alli Ohenoja, een ambachtsvrouw uit Muonio, van de pootvellen van kalveren van haar eigen rendierboerderij.',
        'De Sint-Pauluskapel (Pyhän Paavalin kappeli) in Saariselkä werd in 1996 ingewijd. Ze heeft 125 zitplaatsen en op de galerij nog zo’n 20, en volgens de kerkelijke gemeente van Inari is ze vooral voor huwelijken gebruikt. De Noorderlichtkapel (Revontulikappeli) op Pyhätunturi werd in 1986 voltooid en wordt verhuurd voor besloten evenementen, ook huwelijken.',
        'De wilderniskerk van Pielpajärvi in Inari werd in 1760 voltooid. De plek was het winterdorp van de bewoners van Inari, die er elke winter drie keer en in de zomer één keer samenkwamen voor markten en kerkelijke plechtigheden, waaronder huwelijken. Tegenwoordig trouwen er in de zomer paren.',
      ],
      inLapland: 'Voor een kerkelijk huwelijk moet een van u geconfirmeerd lid zijn van de Evangelisch-Lutherse Kerk en de ander tot een christelijke kerk behoren. Anders trouwt het paar via een burgerlijke ceremonie, en het huwelijk kan daarna in de kerk worden ingezegend. Een onderzoek naar huwelijksbeletselen is altijd nodig.',
    },
  },
  sami: {
    title: 'Een Sámi-bruiloft is geen thema',
    body: [
      'Sámi-bruiloften zijn feesten van de Sámi-gemeenschap zelf. Volgens de principes voor ethisch duurzaam Sámi-toerisme die het Sámi-parlement in 2018 heeft aangenomen, worden Sámi-bruiloften niet gefotografeerd zonder toestemming van de gemeenschap en wordt de Sámi-klederdracht niet voor toeristen gedragen.',
      'Daarom stellen wij geen bruiloften met een Sámi-thema voor, geen Sámi-klederdracht en geen “Laplanddoop”, die volgens de principes een voor het toerisme bedachte gewoonte is. Wilt u de Sámi-cultuur leren kennen, begin dan bij diensten die Samen zelf aanbieden en bij Siida, het Sámi-museum in Inari.',
    ],
  },
  cta: {
    title: 'Trouwen in Lapland met uw eigen tradities',
    body: 'Vertel ons in uw aanvraag welke tradities u erbij wilt hebben, dan geven wij uw wensen door aan weddingplanners die in de regio werken.',
    venues: 'Bekijk de locaties',
    enquiry: 'Trouwaanvraag versturen',
  },
};
