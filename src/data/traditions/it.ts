import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Tradizioni nuziali finlandesi',
  title: 'Come ci si sposa in Finlandia',
  intro: 'La sauna della sposa, gli «ospiti della zappa» che arrivano senza invito e il valzer degli sposi sono usanze finlandesi la cui storia è documentata da musei e dizionari. Ciò che la Lapponia aggiunge è il luogo: cappelle sui fjäll dove si celebrano matrimoni.',
  readMore: 'Per saperne di più',
  allTraditions: 'Tutte le tradizioni nuziali',
  items: {
    'bridal-sauna': {
      title: 'La sauna della sposa',
      teaser: 'Prima delle nozze, la sposa veniva lavata in una sauna decorata con fiori e fronde. Aveva un posto tutto suo sulle panche e il suo mazzo di rami di betulla. Oggi l’usanza sopravvive negli addii al nubilato.',
    },
    'wedding-crashers': {
      title: 'Gli imbucati',
      teaser: 'Un kuokkavieras, letteralmente «ospite della zappa», arriva a un matrimonio senza invito. La parola risale ai mendicanti girovaghi che portavano un bastone uncinato chiamato kuokka.',
    },
    'wedding-waltz': {
      title: 'Il valzer degli sposi',
      teaser: 'Gli sposi aprono le danze con un valzer, e molti lo provano prima a un corso di ballo. Il valzer nuziale finlandese più noto è il Valzer nuziale di Akseli ed Elina.',
    },
    'fell-chapels': {
      title: 'Le cappelle sui fjäll',
      teaser: 'Il tappeto nuziale della cappella di Santa Maria a Levi è fatto con le pelli delle zampe dei piccoli di renna. A Inari, la chiesa di Pielpajärvi, del 1760 e isolata nella natura selvaggia, ospita matrimoni d’estate.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Matrimoni in Finlandia',
  heroTitle: 'Tradizioni nuziali finlandesi',
  heroSubtitle: 'La sauna della sposa, gli imbucati, il valzer degli sposi e le cappelle sui fjäll della Lapponia: da dove vengono queste usanze e come si ritrovano oggi nei matrimoni.',
  intro: [
    'Questa pagina raccoglie le tradizioni nuziali finlandesi di cui si può verificare la storia. Le fonti sono musei, l’Istituto per le lingue della Finlandia, l’emittente finlandese Yle e l’Inventario nazionale del patrimonio vivente tenuto dall’Agenzia finlandese per il patrimonio culturale. Ogni voce si chiude con un link alla sua fonte.',
    'La maggior parte di queste usanze viene dalla Finlandia occidentale e meridionale. In Lapponia, ciò che distingue un matrimonio è il luogo: cappelle sui fjäll e un’antica chiesa isolata nella natura selvaggia. Secondo Yle, nel 2022 si sono sposate in Finlandia 73 coppie straniere residenti all’estero, e Kittilä è il luogo del Paese dove si celebrano più matrimoni di stranieri.',
  ],
  tocLabel: 'In questa pagina',
  kind: {
    living: 'Ancora viva nei matrimoni',
    historical: 'Tradizione storica',
    lapland: 'In Lapponia',
  },
  inLaplandLabel: 'Per il Suo matrimonio in Lapponia',
  sourcesLabel: 'Fonti',
  items: {
    'bridal-sauna': {
      title: 'La sauna della sposa',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'La sauna della sposa appartiene alla tradizione finlandese e careliana delle saune nuziali. La sauna veniva decorata con fiori e fronde, e alla sposa erano riservati un posto tutto suo sulle panche e il suo mazzo di rami di betulla. Il bagno comprendeva riti di purificazione, canti e formule magiche, e la sposa veniva lavata anche per propiziarne la fertilità.',
        'La sauna tradizionale, di cui la sauna della sposa è l’esempio più noto, fa parte dell’Inventario nazionale del patrimonio vivente della Finlandia. Nel 2020 la cultura finlandese della sauna è stata iscritta nella Lista rappresentativa del patrimonio culturale immateriale dell’umanità dell’UNESCO.',
        'Oggi la sauna della sposa si fa per lo più durante l’addio al nubilato. Nell’Ostrobotnia meridionale l’usanza è stata riportata in vita in un evento tradizionale di nozze con la corona a Nurmo.',
      ],
      inLapland: 'Se la Sua location dispone di una sauna, la sauna della sposa si può fare la sera prima del matrimonio. Lo indichi nella Sua richiesta: il desiderio arriverà al wedding planner esattamente come Lei l’ha scritto.',
    },
    'wedding-crashers': {
      title: 'Gli imbucati',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Un kuokkavieras è chi si presenta senza invito a un matrimonio o a un’altra festa. Secondo l’Istituto per le lingue della Finlandia, nel 1977 il linguista Valentin Kiparsky ipotizzò che questi ospiti fossero in origine mendicanti girovaghi che portavano un bastone uncinato, chiamato kuokka.',
        'Il lettone e il lituano hanno una parola composta simile, e la parola finlandese potrebbe essere stata formata sul loro modello.',
      ],
    },
    'wedding-waltz': {
      title: 'Il valzer degli sposi',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Gli sposi aprono la serata con il primo ballo, che in Finlandia è tradizionalmente un valzer. Molte coppie lo provano a un corso di ballo, e sempre più spesso oggi scelgono una canzone tutta loro.',
        'Il valzer nuziale finlandese più noto è il Valzer nuziale di Akseli ed Elina di Heikki Aaltoila, tratto dal film del 1968 Täällä Pohjantähden alla (Qui, sotto la Stella Polare).',
        'Il primo ballo non è un’usanza solo finlandese: fa parte dei matrimoni in tutto il mondo occidentale.',
      ],
      inLapland: 'Se desidera che il valzer venga suonato dal vivo, lo indichi nella Sua richiesta.',
    },
    'bride-kidnapping': {
      title: 'Il rapimento della sposa',
      teaser: 'A metà festa il testimone dello sposo e i suoi amici portano via la sposa, e lo sposo la riconquista superando delle prove.',
      body: [
        'Nel rapimento della sposa, il testimone dello sposo con i suoi aiutanti, oppure il gruppo dell’addio al nubilato, porta via la sposa durante la festa. Lo sposo la riconquista svolgendo dei compiti che, come scrive Yle, mettono alla prova la sua virilità.',
        'L’origine dell’usanza non è stata ricostruita. I ricercatori intervistati da Yle l’hanno definita patriarcale: sono quindi gli sposi a decidere se il gioco ha posto nella loro festa.',
      ],
    },
    'maid-of-honour': {
      title: 'La kaaso e il bestman',
      teaser: 'La kaaso è l’aiutante della sposa, e la parola è di antica origine finnica. Il termine bestman, invece, è arrivato in finlandese dall’inglese passando per lo svedese.',
      body: [
        'In origine la kaaso aiutava la sposa e la vestiva. Nella Finlandia occidentale era spesso una semiprofessionista, per esempio una vedova, la moglie del pastore o, più tardi, una sarta, e di solito non era parente della sposa. La parola ha corrispondenti in votico e nei dialetti estoni. Oggi kaaso indica la damigella d’onore.',
        'Bestman, il termine per l’aiutante dello sposo, è stato preso in prestito dall’inglese tramite lo svedese. Nello stesso periodo arrivarono in Finlandia gli addii al celibato e al nubilato e altre usanze nuziali europee.',
      ],
      inLapland: 'La legge finlandese non richiede né la kaaso né il bestman, ma al matrimonio servono due testimoni. Non è necessario che siano finlandesi.',
    },
    'bridal-crown': {
      title: 'La corona nuziale',
      teaser: 'Nelle nozze con la corona della Finlandia occidentale la sposa portava una corona. Solo poche famiglie dell’Ostrobotnia portano ancora avanti la tradizione.',
      body: [
        'Le grandi nozze con la corona, che potevano durare fino a tre giorni, appartenevano alla tradizione nuziale della Finlandia occidentale. La sposa portava una corona, e dentro quella grande poteva esserne nascosta una più piccola, la corona d’onore.',
        'Il Museo nazionale di Finlandia conserva diverse corone nuziali, tra cui una corona di mirto del 1891. Solo poche famiglie dell’Ostrobotnia portano ancora avanti le nozze con la corona.',
      ],
    },
    sahti: {
      title: 'Il sahti',
      teaser: 'Il sahti è un’antica birra finlandese che si produce ancora, soprattutto nelle campagne, come bevanda di festa per i matrimoni.',
      body: [
        'Il sahti è una birra finlandese fatta in casa. Secondo la descrizione della cultura birraria finlandese nell’Inventario nazionale del patrimonio vivente, il sahti si produce ancora, soprattutto nelle campagne, come bevanda di festa per i matrimoni.',
      ],
    },
    'fell-chapels': {
      title: 'Le cappelle sui fjäll e una chiesa nella natura selvaggia',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'La cappella di Santa Maria a Levi (Marian kappeli) è stata consacrata nel 1998, e la parrocchia di Kittilä la definisce una chiesa scelta da molte coppie per sposarsi. Il suo tappeto nuziale è opera di Alli Ohenoja, artigiana di Muonio, che lo ha realizzato con le pelli delle zampe dei piccoli del suo allevamento di renne.',
        'La cappella di San Paolo (Pyhän Paavalin kappeli) a Saariselkä è stata consacrata nel 1996. Ha 125 posti a sedere, più circa 20 in galleria, e secondo la parrocchia di Inari è stata usata soprattutto per i matrimoni. La cappella dell’Aurora boreale (Revontulikappeli) sul Pyhätunturi è stata completata nel 1986 e si affitta per eventi privati, matrimoni compresi.',
        'La chiesa di Pielpajärvi, isolata nella natura selvaggia di Inari, fu completata nel 1760. Il luogo era il villaggio invernale degli abitanti di Inari, che vi si riunivano tre volte ogni inverno e una volta d’estate per i mercati e le funzioni religiose, tra cui i matrimoni. Oggi vi si celebrano matrimoni d’estate.',
      ],
      inLapland: 'Per il matrimonio religioso, uno dei due sposi deve essere membro della Chiesa evangelica luterana e aver ricevuto la confermazione, e l’altro deve appartenere a una Chiesa cristiana. In caso contrario la coppia si sposa con rito civile, e l’unione può poi essere benedetta in chiesa. L’accertamento degli impedimenti al matrimonio è sempre obbligatorio.',
    },
  },
  sami: {
    title: 'Un matrimonio sami non è un matrimonio a tema',
    body: [
      'Un matrimonio sami è una festa della comunità sami. Secondo i principi per un turismo sami eticamente sostenibile, adottati dal Parlamento sami nel 2018, i matrimoni sami non si fotografano senza il permesso della comunità e l’abito tradizionale sami non si indossa per i turisti.',
      'Per questo non proponiamo matrimoni a tema sami, abiti tradizionali sami né un «battesimo della Lapponia», che i principi descrivono come un’usanza inventata per il turismo. Per conoscere la cultura sami, cominci dai servizi gestiti dai Sami stessi e da Siida, il museo sami di Inari.',
    ],
  },
  cta: {
    title: 'Un matrimonio in Lapponia con le Sue tradizioni',
    body: 'Ci indichi nella Sua richiesta quali tradizioni desidera includere: inoltreremo i Suoi desideri ai wedding planner che lavorano nella regione.',
    venues: 'Scopra le location',
    enquiry: 'Invia una richiesta',
  },
};
