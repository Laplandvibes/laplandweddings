import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Suomalaiset hääperinteet',
  title: 'Näin Suomessa mennään naimisiin',
  intro: 'Morsiussauna, kuokkavieraat ja häävalssi ovat suomalaisia tapoja, joiden taustan voi tarkistaa museoista ja sanakirjoista. Lapin oma lisä on paikka: tunturikappelit, joissa pareja vihitään.',
  readMore: 'Lue lisää',
  allTraditions: 'Kaikki hääperinteet',
  items: {
    'bridal-sauna': {
      title: 'Morsiussauna',
      teaser: 'Ennen häitä morsian kylvetettiin saunassa, joka oli koristeltu kukin ja lehvin. Hänellä oli oma paikka lauteilla ja oma vasta. Nykyään tapa elää polttareissa.',
    },
    'wedding-crashers': {
      title: 'Kuokkavieraat',
      teaser: 'Kuokkavieras tulee häihin kutsumatta. Sana on peräisin kiertävistä kerjäläisistä, joilla oli mukanaan koukkupäinen keppi eli kuokka.',
    },
    'wedding-waltz': {
      title: 'Häävalssi',
      teaser: 'Hääpari avaa tanssit valssilla, ja moni harjoittelee sitä tanssikurssilla. Tunnetuin suomalainen häävalssi on Akselin ja Elinan häävalssi.',
    },
    'fell-chapels': {
      title: 'Tunturikappelit',
      teaser: 'Levin Marian kappelin vihkiryijy on tehty poronvasojen koipinahoista. Inarin Pielpajärven erämaakirkossa vuodelta 1760 vihitään pareja kesäisin.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Häät Suomessa',
  heroTitle: 'Suomalaiset hääperinteet',
  heroSubtitle: 'Morsiussauna, kuokkavieraat, häävalssi ja Lapin tunturikappelit: mistä tavat tulevat ja miten ne näkyvät häissä nyt.',
  intro: [
    'Tälle sivulle on koottu suomalaiset hääperinteet, joiden taustan voi tarkistaa. Lähteinä ovat museot, Kotimaisten kielten keskus, Yle ja Museoviraston ylläpitämä Elävän perinnön kansallinen luettelo, ja jokaisen kohdan lopussa on linkki lähteeseen.',
    'Suurin osa tavoista on kotoisin Länsi- ja Etelä-Suomesta. Lapissa häiden oma piirre on paikka: tunturikappelit ja vanha erämaakirkko. Ylen mukaan Suomessa vihittiin vuonna 2022 yhteensä 73 ulkomailla asuvaa ulkomaalaista paria, ja eniten ulkomaalaisten häitä pidetään Kittilässä.',
  ],
  tocLabel: 'Tällä sivulla',
  kind: {
    living: 'Elää nykyhäissä',
    historical: 'Historiallinen perinne',
    lapland: 'Lapissa',
  },
  inLaplandLabel: 'Häissänne Lapissa',
  sourcesLabel: 'Lähteet',
  items: {
    'bridal-sauna': {
      title: 'Morsiussauna',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'Morsiussauna kuuluu suomalais-karjalaiseen hääsaunaperinteeseen. Sauna koristeltiin kukin ja lehvin, ja morsiamelle varattiin oma paikka lauteilla ja oma vasta. Kylvetykseen kuului puhdistautumisriittejä, lauluja ja loitsuja, ja morsianta kylvetettiin myös hedelmälliseksi.',
        'Perinnesaunottaminen, jonka tunnetuin esimerkki morsiussauna on, on mukana Elävän perinnön kansallisessa luettelossa. Suomalainen saunakulttuuri kirjattiin vuonna 2020 UNESCOn ihmiskunnan aineettoman kulttuuriperinnön luetteloon.',
        'Nykyään morsiussauna pidetään useimmiten polttareissa. Etelä-Pohjanmaalla tapa on herätetty henkiin Nurmon kruunuhäätapahtumassa.',
      ],
      inLapland: 'Jos hääpaikassanne on sauna, morsiussaunan voi pitää hääpäivää edeltävänä iltana. Kertokaa toiveesta hääkyselyssä, niin otamme sen vastauksessa huomioon.',
    },
    'wedding-crashers': {
      title: 'Kuokkavieraat',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Kuokkavieras on häihin tai muihin pitoihin kutsumatta tuleva vieras. Kotimaisten kielten keskuksen mukaan kielitieteilijä Valentin Kiparsky esitti vuonna 1977, että kuokkavieraat olivat alun perin kiertäviä kerjäläisiä, joilla oli mukanaan koukkupäinen keppi eli kuokka.',
        'Vastaava yhdyssana on myös latviassa ja liettuassa, ja suomen sana on mahdollisesti otettu niistä mallia.',
      ],
    },
    'wedding-waltz': {
      title: 'Häävalssi',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Hääpari tanssii juhlan ensimmäisen tanssin, ja Suomessa se on perinteisesti valssi. Moni pari harjoittelee sitä tanssikurssilla, ja yhä useampi valitsee oman kappaleensa.',
        'Tunnetuin suomalainen häävalssi on Heikki Aaltoilan säveltämä Akselin ja Elinan häävalssi vuoden 1968 elokuvasta Täällä Pohjantähden alla.',
        'Häävalssi ei ole pelkästään suomalainen tapa: ensimmäinen tanssi kuuluu häihin koko läntisessä maailmassa.',
      ],
      inLapland: 'Jos haluatte valssin elävänä musiikkina, mainitkaa se hääkyselyssä.',
    },
    'bride-kidnapping': {
      title: 'Morsiusryöstö',
      teaser: 'Kesken juhlan bestman ystävineen vie morsiamen, ja sulhanen saa hänet takaisin tehtäviä suorittamalla.',
      body: [
        'Morsiusryöstö on hääleikki, jossa bestman apujoukkoineen tai polttariporukka kaappaa morsiamen kesken juhlan. Sulhanen saa hänet takaisin suorittamalla tehtäviä, joilla Ylen mukaan koetellaan hänen mieskuntoaan.',
        'Tavan alkuperää ei ole jäljitetty. Tutkijat ovat Ylen haastattelussa pitäneet sitä patriarkaalisena, joten hääpari päättää itse, kuuluuko leikki heidän juhlaansa.',
      ],
    },
    'maid-of-honour': {
      title: 'Kaaso ja bestman',
      teaser: 'Kaaso on morsiamen apulainen. Sana on vanha itämerensuomalainen, kun taas bestman tuli suomeen englannista ruotsin kautta.',
      body: [
        'Kaaso oli alun perin morsiamen apulainen ja pukija. Länsi-Suomessa hän oli usein puoliammattilainen, esimerkiksi leski, papinrouva tai myöhemmin ompelija, eikä yleensä morsiamen sukua. Sanalla on vastineita vatjassa ja viron murteissa. Nykyään kaasolla tarkoitetaan morsiusneitoa.',
        'Bestman eli sulhasen apumies on lainattu englannista ruotsin kautta. Samaan aikaan Suomeen tulivat polttarit ja muut eurooppalaiset häätavat.',
      ],
      inLapland: 'Kaasoa ja bestmania laki ei vaadi, mutta vihkimisessä on oltava kaksi todistajaa. Heidän ei tarvitse olla suomalaisia.',
    },
    'bridal-crown': {
      title: 'Morsiuskruunu',
      teaser: 'Länsi-Suomen kruunuhäissä morsiamella oli päässään kruunu. Kruunuhäitä pitää yllä enää muutama pohjalainen suku.',
      body: [
        'Suuret, jopa kolmipäiväiset kruunuhäät kuuluivat läntiseen hääperinteeseen. Morsiamella oli päässään kruunu, ja ison kruunun sisään saatettiin piilottaa pienempi kunniankruunu.',
        'Kansallismuseon kokoelmissa on morsiuskruunuja, esimerkiksi myrttikruunu vuodelta 1891. Kruunuhäitä pitää yllä enää muutama pohjalainen suku.',
      ],
    },
    sahti: {
      title: 'Sahti',
      teaser: 'Sahti on vanha suomalainen olut, jota pannaan yhä erityisesti maaseudulla häiden juhlajuomaksi.',
      body: [
        'Sahti on suomalainen kotona pantu olut. Elävän perinnön kansallisessa luettelossa olevan suomalaisen olutkulttuurin kuvauksen mukaan sahtia pannaan yhä erityisesti maaseudulla häiden juhlajuomaksi.',
      ],
    },
    'fell-chapels': {
      title: 'Tunturikappelit ja erämaakirkko',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'Levin Marian kappeli vihittiin käyttöön vuonna 1998, ja Kittilän seurakunnan mukaan se on suosittu vihkikirkko. Kappelin vihkiryijyn on tehnyt muoniolainen käsityöntaitaja Alli Ohenoja oman porotilansa vasojen koipinahoista.',
        'Saariselän Pyhän Paavalin kappeli vihittiin vuonna 1996. Siinä on 125 istumapaikkaa ja parvella noin 20, ja Inarin seurakunnan mukaan kappelia on käytetty erityisesti vihkiäisiin. Pyhätunturin Revontulikappeli valmistui vuonna 1986, ja sitä vuokrataan yksityistilaisuuksiin, myös vihkimisiin.',
        'Inarin Pielpajärven erämaakirkko valmistui vuonna 1760. Paikka oli inarilaisten talvikylä, jossa kokoonnuttiin kolmesti talvessa ja kerran kesässä markkinoille ja kirkollisiin toimituksiin, myös vihkimisiin. Nykyään kirkossa vihitään pareja kesäisin.',
      ],
      inLapland: 'Kirkollinen vihkiminen edellyttää, että toinen teistä on konfirmoitu evankelis-luterilaisen kirkon jäsen ja toinen kuuluu kristilliseen kirkkoon. Muuten pari vihitään siviilivihkimisellä, ja liitto voidaan sen jälkeen siunata kirkossa. Avioliiton esteiden tutkinta tarvitaan aina.',
    },
  },
  sami: {
    title: 'Saamelaishäät eivät ole teema',
    body: [
      'Saamelaishäät ovat saamelaisyhteisön omia juhlia. Saamelaiskäräjien vuonna 2018 hyväksymien eettisen saamelaismatkailun periaatteiden mukaan saamelaisten häitä ei kuvata ilman yhteisön lupaa, eikä saamenpukua pueta matkailijoita varten.',
      'Siksi emme ehdota saamelaisteemaisia häitä, saamenpukuja emmekä Lapin kastetta, joka on periaatteiden mukaan matkailua varten keksitty tapa. Saamelaiskulttuuriin voi tutustua saamelaisten itse järjestämissä palveluissa ja Inarin saamelaismuseo Siidassa.',
    ],
  },
  cta: {
    title: 'Häät Lapissa, omilla perinteillänne',
    body: 'Kertokaa hääkyselyssä, mitkä perinteet haluatte mukaan, niin vastaamme henkilökohtaisesti.',
    venues: 'Katso hääpaikat',
    enquiry: 'Lähetä hääkysely',
  },
};
