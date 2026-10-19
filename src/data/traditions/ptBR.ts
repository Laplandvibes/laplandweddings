import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Tradições de casamento finlandesas',
  title: 'Como os finlandeses se casam',
  intro: 'A sauna da noiva, os “convidados da enxada”, que chegam sem convite, e a valsa dos noivos são costumes finlandeses com história documentada em museus e dicionários. O que a Lapônia acrescenta é o lugar: capelas nos montes onde se celebram casamentos.',
  readMore: 'Ler mais',
  allTraditions: 'Todas as tradições de casamento',
  items: {
    'bridal-sauna': {
      title: 'A sauna da noiva',
      teaser: 'Antes do casamento, a noiva era banhada numa sauna enfeitada com flores e galhos com folhas. Ela tinha o seu lugar nos bancos e o seu próprio feixe de galhos de bétula. Hoje o costume continua vivo nas despedidas de solteira.',
    },
    'wedding-crashers': {
      title: 'Os penetras',
      teaser: 'Um kuokkavieras, literalmente “convidado da enxada”, chega a um casamento sem ter sido convidado. A palavra vem dos mendigos andarilhos que levavam um cajado com ponta em gancho chamado kuokka.',
    },
    'wedding-waltz': {
      title: 'A valsa dos noivos',
      teaser: 'Os noivos abrem a pista com uma valsa, e muitos a ensaiam antes numa aula de dança. A valsa de casamento finlandesa mais conhecida é a Valsa de Casamento de Akseli e Elina.',
    },
    'fell-chapels': {
      title: 'As capelas nos montes',
      teaser: 'O tapete nupcial da capela de Santa Maria, em Levi, é feito com o couro das patas de filhotes de rena. Em Inari, a igreja de Pielpajärvi, de 1760 e isolada em plena natureza, recebe casamentos no verão.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Casamentos na Finlândia',
  heroTitle: 'Tradições de casamento finlandesas',
  heroSubtitle: 'A sauna da noiva, os penetras, a valsa dos noivos e as capelas nos montes da Lapônia: de onde vêm esses costumes e como eles aparecem nos casamentos de hoje.',
  intro: [
    'Esta página reúne as tradições de casamento finlandesas cuja história pode ser verificada. As fontes são museus, o Instituto das Línguas da Finlândia, a emissora finlandesa Yle e o Inventário Nacional do Patrimônio Vivo, mantido pela Agência Finlandesa do Patrimônio. Cada item termina com um link para a sua fonte.',
    'A maioria desses costumes vem do oeste e do sul da Finlândia. Na Lapônia, o que diferencia um casamento é o lugar: capelas nos montes e uma antiga igreja isolada em plena natureza. Segundo a Yle, 73 casais estrangeiros que moram fora da Finlândia se casaram no país em 2022, e Kittilä é o lugar do país que mais recebe casamentos de estrangeiros.',
  ],
  tocLabel: 'Nesta página',
  kind: {
    living: 'Viva nos casamentos de hoje',
    historical: 'Tradição histórica',
    lapland: 'Na Lapônia',
  },
  inLaplandLabel: 'No casamento de vocês na Lapônia',
  sourcesLabel: 'Fontes',
  items: {
    'bridal-sauna': {
      title: 'A sauna da noiva',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'A sauna da noiva pertence à tradição finlandesa e careliana das saunas de casamento. A sauna era enfeitada com flores e galhos com folhas, e a noiva tinha o seu lugar reservado nos bancos e o seu próprio feixe de galhos de bétula. O banho incluía ritos de purificação, cantos e encantamentos, e a noiva também era banhada para favorecer a fertilidade.',
        'O banho de sauna tradicional, cujo exemplo mais conhecido é a sauna da noiva, faz parte do Inventário Nacional do Patrimônio Vivo da Finlândia. A cultura finlandesa da sauna foi incluída em 2020 na Lista Representativa do Patrimônio Cultural Imaterial da Humanidade da UNESCO.',
        'Hoje, a sauna da noiva acontece na maioria das vezes na despedida de solteira. Na Ostrobótnia do Sul, o costume foi revivido num evento tradicional de casamento com coroa em Nurmo.',
      ],
      inLapland: 'Se o local do casamento de vocês tiver sauna, a sauna da noiva pode acontecer na noite anterior ao casamento. Mencionem isso no pedido, e vamos levar o desejo em conta na nossa resposta.',
    },
    'wedding-crashers': {
      title: 'Os penetras',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Um kuokkavieras é quem aparece sem convite num casamento ou em outra festa. Segundo o Instituto das Línguas da Finlândia, o linguista Valentin Kiparsky sugeriu em 1977 que esses convidados eram, na origem, mendigos andarilhos que levavam um cajado com ponta em gancho, chamado kuokka.',
        'O letão e o lituano têm uma palavra composta parecida, e é possível que a palavra finlandesa tenha seguido esse modelo.',
      ],
    },
    'wedding-waltz': {
      title: 'A valsa dos noivos',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Os recém-casados abrem a festa com a primeira dança da noite, que na Finlândia é tradicionalmente uma valsa. Muitos casais a ensaiam em aulas de dança, e cada vez mais escolhem hoje uma música própria.',
        'A valsa de casamento finlandesa mais conhecida é a Valsa de Casamento de Akseli e Elina, de Heikki Aaltoila, do filme de 1968 Täällä Pohjantähden alla (Aqui, sob a Estrela Polar).',
        'A primeira dança não é um costume só finlandês: ela faz parte dos casamentos em todo o mundo ocidental.',
      ],
      inLapland: 'Se vocês quiserem a valsa tocada ao vivo, digam isso no pedido.',
    },
    'bride-kidnapping': {
      title: 'O rapto da noiva',
      teaser: 'No meio da festa, o padrinho do noivo e os amigos dele levam a noiva embora, e o noivo a recupera cumprindo tarefas.',
      body: [
        'No rapto da noiva, o padrinho do noivo e seus ajudantes, ou a turma da despedida de solteira, levam a noiva embora durante a festa. O noivo a recupera cumprindo tarefas que, nas palavras da Yle, testam a sua masculinidade.',
        'A origem do costume não foi rastreada. Os pesquisadores entrevistados pela Yle o classificaram como patriarcal: por isso, é o próprio casal que decide se a brincadeira tem lugar no seu casamento.',
      ],
    },
    'maid-of-honour': {
      title: 'A kaaso e o bestman',
      teaser: 'A kaaso é a ajudante da noiva, e a palavra é de origem fínica antiga. Já o termo bestman chegou ao finlandês vindo do inglês, por meio do sueco.',
      body: [
        'Na origem, a kaaso ajudava a noiva e a vestia. No oeste da Finlândia, costumava ser uma semiprofissional, como uma viúva, a esposa do pastor ou, mais tarde, uma costureira, e em geral não era parente da noiva. A palavra tem equivalentes em vótico e em dialetos do estoniano. Hoje, kaaso significa a madrinha da noiva.',
        'Bestman, o termo para o ajudante do noivo, foi emprestado do inglês por meio do sueco. As despedidas de solteiro e de solteira e outros costumes de casamento europeus chegaram à Finlândia na mesma época.',
      ],
      inLapland: 'A lei finlandesa não exige kaaso nem bestman, mas o casamento precisa de duas testemunhas. Elas não precisam ser finlandesas.',
    },
    'bridal-crown': {
      title: 'A coroa da noiva',
      teaser: 'Nos casamentos com coroa do oeste da Finlândia, a noiva usava uma coroa. Apenas algumas famílias da Ostrobótnia ainda mantêm a tradição.',
      body: [
        'Os grandes casamentos com coroa, que podiam durar até três dias, faziam parte da tradição de casamento do oeste da Finlândia. A noiva usava uma coroa, e dentro da coroa grande podia ser escondida uma menor, a coroa de honra.',
        'O Museu Nacional da Finlândia guarda várias coroas de noiva, entre elas uma coroa de murta de 1891. Apenas algumas famílias da Ostrobótnia ainda mantêm os casamentos com coroa.',
      ],
    },
    sahti: {
      title: 'O sahti',
      teaser: 'O sahti é uma cerveja finlandesa antiga que ainda é feita, sobretudo no interior, como bebida festiva dos casamentos.',
      body: [
        'O sahti é uma cerveja finlandesa feita em casa. Segundo a descrição da cultura cervejeira finlandesa no Inventário Nacional do Patrimônio Vivo, o sahti ainda é feito, sobretudo no interior, como bebida festiva dos casamentos.',
      ],
    },
    'fell-chapels': {
      title: 'As capelas nos montes e uma igreja em plena natureza',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'A capela de Santa Maria de Levi (Marian kappeli) foi consagrada em 1998, e a paróquia de Kittilä a descreve como uma igreja procurada para casamentos. O tapete nupcial foi feito por Alli Ohenoja, artesã de Muonio, com o couro das patas dos filhotes da sua própria criação de renas.',
        'A capela de São Paulo (Pyhän Paavalin kappeli), em Saariselkä, foi consagrada em 1996. Tem 125 lugares, mais cerca de 20 na galeria, e segundo a paróquia de Inari tem sido usada sobretudo para casamentos. A capela da Aurora Boreal (Revontulikappeli), no Pyhätunturi, foi concluída em 1986 e é alugada para eventos particulares, inclusive casamentos.',
        'A igreja de Pielpajärvi, isolada em plena natureza em Inari, foi concluída em 1760. O lugar era a aldeia de inverno dos moradores de Inari, que se reuniam ali três vezes por inverno e uma vez no verão para feiras e cerimônias religiosas, entre elas casamentos. Hoje, casais se casam ali no verão.',
      ],
      inLapland: 'O casamento religioso exige que um de vocês seja membro confirmado da Igreja Evangélica Luterana e que o outro pertença a uma igreja cristã. Caso contrário, o casal se casa no civil, e a união pode depois ser abençoada na igreja. A verificação de impedimentos ao casamento é sempre obrigatória.',
    },
  },
  sami: {
    title: 'Um casamento sámi não é um casamento temático',
    body: [
      'Um casamento sámi é uma festa da própria comunidade sámi. Segundo os princípios para um turismo sámi eticamente sustentável, adotados pelo Parlamento Sámi em 2018, um casamento sámi não é fotografado sem a permissão da comunidade, e o traje sámi não é vestido para turistas.',
      'Por isso não sugerimos casamentos com tema sámi, o uso do traje sámi nem um “batismo da Lapônia”, que os princípios descrevem como um costume inventado para o turismo. Para conhecer a cultura sámi, comecem pelos serviços oferecidos pelo próprio povo sámi e pelo Siida, o museu sámi de Inari.',
    ],
  },
  cta: {
    title: 'Um casamento na Lapônia com as tradições de vocês',
    body: 'Digam no pedido quais tradições vocês querem incluir, e nós respondemos pessoalmente.',
    venues: 'Ver os locais',
    enquiry: 'Enviar uma consulta',
  },
};
