import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Finska bröllopstraditioner',
  title: 'Så gifter man sig i Finland',
  intro: 'Brudbastun, de objudna ”hackgästerna” och bröllopsvalsen är finska seder vars historia finns dokumenterad i museer och ordböcker. Det Lappland tillför är platsen: fjällkapell där par vigs.',
  readMore: 'Läs mer',
  allTraditions: 'Alla bröllopstraditioner',
  items: {
    'bridal-sauna': {
      title: 'Brudbastu',
      teaser: 'Före bröllopet badades bruden i en bastu som var smyckad med blommor och lövruskor. Hon hade en egen plats på lavarna och en egen bastukvast av björk. I dag lever seden vidare på möhippor.',
    },
    'wedding-crashers': {
      title: 'Objudna gäster',
      teaser: 'En kuokkavieras, ordagrant ”hackgäst”, kommer objuden till ett bröllop. Ordet går tillbaka på vandrande tiggare som bar en käpp med krok i änden, en så kallad kuokka.',
    },
    'wedding-waltz': {
      title: 'Bröllopsvals',
      teaser: 'Brudparet öppnar dansen med en vals, och många övar in den på en danskurs först. Den mest kända finska bröllopsvalsen är Akseli och Elinas bröllopsvals.',
    },
    'fell-chapels': {
      title: 'Fjällkapell',
      teaser: 'Vigselryan i Mariakapellet i Levi är gjord av benskinn från renkalvar. I Pielpajärvi ödemarkskyrka i Inari, från 1760, vigs par på sommaren.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Bröllop i Finland',
  heroTitle: 'Finska bröllopstraditioner',
  heroSubtitle: 'Brudbastun, objudna gäster, bröllopsvalsen och Lapplands fjällkapell: varifrån sederna kommer och hur de syns på bröllop i dag.',
  intro: [
    'På den här sidan har vi samlat de finska bröllopstraditioner vars bakgrund går att kontrollera. Källorna är museer, Institutet för de inhemska språken, det finländska public service-bolaget Yle och den nationella förteckningen över levande kulturarv, som Museiverket upprätthåller. Varje avsnitt avslutas med en länk till källan.',
    'De flesta av sederna kommer från västra och södra Finland. I Lappland är det platsen som gör bröllopet speciellt: fjällkapell och en gammal ödemarkskyrka. Enligt Yle vigdes 73 utländska par bosatta utomlands i Finland 2022, och ingen ort i landet har så många utländska bröllop som Kittilä.',
  ],
  tocLabel: 'På den här sidan',
  kind: {
    living: 'Lever kvar på dagens bröllop',
    historical: 'Historisk tradition',
    lapland: 'I Lappland',
  },
  inLaplandLabel: 'På ert bröllop i Lappland',
  sourcesLabel: 'Källor',
  items: {
    'bridal-sauna': {
      title: 'Brudbastu',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'Brudbastun hör till den finsk-karelska traditionen med bröllopsbastu. Bastun smyckades med blommor och lövruskor, och bruden fick en egen plats på lavarna och en egen bastukvast av björk. I badet ingick reningsriter, sånger och besvärjelser, och bruden badades också för att bli fruktsam.',
        'Traditionellt bastubad, där brudbastun är det mest kända exemplet, finns med i Finlands nationella förteckning över levande kulturarv. Den finska bastukulturen fördes 2020 in på Unescos representativa lista över mänsklighetens immateriella kulturarv.',
        'I dag hålls brudbastun oftast på möhippan. I Sydösterbotten har seden väckts till liv igen vid ett evenemang med traditionellt kronbröllop i Nurmo.',
      ],
      inLapland: 'Har er bröllopsplats en bastu, kan brudbastun hållas kvällen före bröllopet. Nämn det i er förfrågan, så tar vi hänsyn till det i vårt svar.',
    },
    'wedding-crashers': {
      title: 'Objudna gäster',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'En kuokkavieras är en gäst som kommer objuden till ett bröllop eller en annan fest. Enligt Institutet för de inhemska språken föreslog språkforskaren Valentin Kiparsky 1977 att dessa gäster ursprungligen var vandrande tiggare som bar en käpp med krok i änden, en kuokka.',
        'Lettiskan och litauiskan har ett liknande sammansatt ord, och det finska ordet kan ha bildats efter deras mönster.',
      ],
    },
    'wedding-waltz': {
      title: 'Bröllopsvals',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Brudparet dansar kvällens första dans, och i Finland är det traditionellt en vals. Många par övar in den på en danskurs, och allt fler väljer nu en egen låt.',
        'Den mest kända finska bröllopsvalsen är Akseli och Elinas bröllopsvals av Heikki Aaltoila, ur filmen ”Här under polstjärnan” från 1968.',
        'Den första dansen är inte bara en finsk sed: den hör till bröllop i hela västvärlden.',
      ],
      inLapland: 'Om ni vill att valsen ska spelas live, skriv det i er förfrågan.',
    },
    'bride-kidnapping': {
      title: 'Brudrov',
      teaser: 'Mitt under festen rövar bestman och hans vänner bort bruden, och brudgummen vinner tillbaka henne genom att klara uppgifter.',
      body: [
        'Vid ett brudrov tar bestman och hans hjälpare, eller möhippegänget, med sig bruden under festen. Brudgummen får tillbaka henne genom att klara uppgifter som enligt Yle sätter hans manlighet på prov.',
        'Sedens ursprung har inte spårats. Forskare som Yle har intervjuat har kallat den patriarkal, så det är brudparet som avgör om leken hör hemma på deras bröllop.',
      ],
    },
    'maid-of-honour': {
      title: 'Kaaso och bestman',
      teaser: 'Kaaso kallas brudens hjälpreda, och ordet är gammalt östersjöfinskt. Ordet bestman kom däremot till finskan från engelskan via svenskan.',
      body: [
        'Kaason var från början brudens hjälpreda och påkläderska. I västra Finland var hon ofta halvprofessionell, till exempel en änka, en prästfru eller senare en sömmerska, och oftast inte släkt med bruden. Ordet har motsvarigheter i votiskan och i estniska dialekter. I dag betyder kaaso brudtärna.',
        'Ordet bestman för brudgummens hjälpreda kom till finskan från engelskan via svenskan. Samtidigt kom svensexor, möhippor och andra europeiska bröllopsseder till Finland.',
      ],
      inLapland: 'Finsk lag kräver varken kaaso eller bestman, men vid vigseln måste två vittnen vara med. De behöver inte vara finländare.',
    },
    'bridal-crown': {
      title: 'Brudkrona',
      teaser: 'Vid kronbröllopen i västra Finland bar bruden krona. Bara några få österbottniska släkter håller fortfarande traditionen vid liv.',
      body: [
        'Stora kronbröllop, som kunde pågå i upp till tre dagar, hörde till den västfinska bröllopstraditionen. Bruden bar krona, och inuti den stora kronan kunde en mindre hederskrona vara gömd.',
        'Finlands nationalmuseum har flera brudkronor i sina samlingar, bland dem en myrtenkrona från 1891. Bara några få österbottniska släkter håller fortfarande fast vid kronbröllopen.',
      ],
    },
    sahti: {
      title: 'Sahti',
      teaser: 'Sahti är ett gammalt finskt öl. Särskilt på landsbygden bryggs det fortfarande som festdryck till bröllop.',
      body: [
        'Sahti är ett finskt hembryggt öl. Enligt beskrivningen av den finska ölkulturen i den nationella förteckningen över levande kulturarv bryggs sahti fortfarande, särskilt på landsbygden, som festdryck till bröllop.',
      ],
    },
    'fell-chapels': {
      title: 'Fjällkapell och en ödemarkskyrka',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'Mariakapellet (Marian kappeli) i Levi invigdes 1998, och Kittilä församling kallar det en populär vigselkyrka. Vigselryan har hantverkaren Alli Ohenoja från Muonio gjort av benskinn från kalvarna på sin egen rengård.',
        'S:t Pauls kapell (Pyhän Paavalin kappeli) i Saariselkä invigdes 1996. Det har 125 sittplatser och ungefär 20 till på läktaren, och enligt Inari församling har kapellet framför allt använts för vigslar. Norrskenskapellet (Revontulikappeli) på Pyhätunturi blev färdigt 1986 och hyrs ut för privata tillställningar, också vigslar.',
        'Pielpajärvi ödemarkskyrka i Inari blev färdig 1760. Platsen var vinterby för folket i Inari, som samlades där tre gånger varje vinter och en gång på sommaren för marknader och kyrkliga förrättningar, bland dem vigslar. I dag vigs par där på sommaren.',
      ],
      inLapland: 'För en kyrklig vigsel krävs att en av er är konfirmerad medlem i evangelisk-lutherska kyrkan och att den andra hör till en kristen kyrka. Annars vigs paret borgerligt, och äktenskapet kan sedan välsignas i kyrkan. Hindersprövning krävs alltid.',
    },
  },
  sami: {
    title: 'Ett samiskt bröllop är inget tema',
    body: [
      'Samiska bröllop är den samiska gemenskapens egna fester. Enligt de principer för etiskt hållbar samisk turism som Sametinget i Finland antog 2018 fotograferas samiska bröllop inte utan gemenskapens tillstånd, och samedräkten bärs inte för turisternas skull.',
      'Därför föreslår vi inga samiska temabröllop, inga samedräkter och inget ”Lapplandsdop”, som enligt principerna är en sed som har hittats på för turismen. Vill ni lära känna samisk kultur, börja med tjänster som samer själva driver och med Siida, samemuseet i Inari.',
    ],
  },
  cta: {
    title: 'Bröllop i Lappland med era egna traditioner',
    body: 'Berätta i er förfrågan vilka traditioner ni vill ha med, så svarar vi er personligen.',
    venues: 'Se vigselplatserna',
    enquiry: 'Skicka en bröllopsförfrågan',
  },
};
