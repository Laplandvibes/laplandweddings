import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Traditions de mariage finlandaises',
  title: 'Se marier à la finlandaise',
  intro: 'Le sauna de la mariée, les « invités à la houe » venus sans invitation et la valse des mariés sont des coutumes finlandaises dont l’histoire est documentée dans les musées et les dictionnaires. Ce que la Laponie y ajoute, c’est le lieu : des chapelles de fjäll où des couples se marient.',
  readMore: 'Lire la suite',
  allTraditions: 'Toutes les traditions de mariage',
  items: {
    'bridal-sauna': {
      title: 'Le sauna de la mariée',
      teaser: 'Avant le mariage, on baignait la mariée dans un sauna décoré de fleurs et de rameaux feuillus. Elle avait sa propre place sur les bancs et son propre fouet de bouleau. Aujourd’hui, la coutume se perpétue lors des enterrements de vie de jeune fille.',
    },
    'wedding-crashers': {
      title: 'Les invités non conviés',
      teaser: 'Un kuokkavieras, littéralement « invité à la houe », se présente à un mariage sans y avoir été invité. Le mot remonte aux mendiants itinérants qui portaient un bâton à crochet appelé kuokka.',
    },
    'wedding-waltz': {
      title: 'La valse des mariés',
      teaser: 'Les mariés ouvrent le bal par une valse, et beaucoup la répètent d’abord dans un cours de danse. La plus connue des valses de mariage finlandaises est la Valse nuptiale d’Akseli et Elina.',
    },
    'fell-chapels': {
      title: 'Les chapelles de fjäll',
      teaser: 'Dans la chapelle Sainte-Marie de Levi, le tapis de mariage est fait de peaux de pattes de faons de renne. À Inari, l’église de Pielpajärvi, isolée en pleine nature et datant de 1760, accueille des mariages en été.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Se marier en Finlande',
  heroTitle: 'Les traditions de mariage finlandaises',
  heroSubtitle: 'Le sauna de la mariée, les invités non conviés, la valse des mariés et les chapelles de fjäll de Laponie : d’où viennent ces coutumes et quelle place elles tiennent aujourd’hui dans les mariages.',
  intro: [
    'Cette page rassemble les traditions de mariage finlandaises dont l’histoire peut être vérifiée. Les sources sont des musées, l’Institut des langues de Finlande, la radiotélévision finlandaise Yle et l’Inventaire national du patrimoine vivant, tenu par l’Agence finlandaise du patrimoine. Chaque rubrique se termine par un lien vers sa source.',
    'La plupart de ces coutumes viennent de l’ouest et du sud de la Finlande. En Laponie, ce qui distingue un mariage, c’est le lieu : des chapelles de fjäll et une vieille église isolée en pleine nature. Selon Yle, 73 couples étrangers vivant hors de Finlande se sont mariés dans le pays en 2022, et c’est à Kittilä que l’on célèbre le plus de mariages d’étrangers de tout le pays.',
  ],
  tocLabel: 'Sur cette page',
  kind: {
    living: 'Toujours vivante aux mariages',
    historical: 'Tradition historique',
    lapland: 'En Laponie',
  },
  inLaplandLabel: 'À votre mariage en Laponie',
  sourcesLabel: 'Sources',
  items: {
    'bridal-sauna': {
      title: 'Le sauna de la mariée',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'Le sauna de la mariée appartient à la tradition finno-carélienne des saunas de noces. Le sauna était décoré de fleurs et de rameaux feuillus, et l’on réservait à la mariée sa propre place sur les bancs et son propre fouet de bouleau. Le bain comprenait des rites de purification, des chants et des incantations, et l’on baignait aussi la mariée pour la rendre féconde.',
        'La pratique traditionnelle du sauna, dont le sauna de la mariée est l’exemple le plus connu, figure dans l’Inventaire national finlandais du patrimoine vivant. La culture finlandaise du sauna a été inscrite en 2020 sur la Liste représentative du patrimoine culturel immatériel de l’humanité de l’UNESCO.',
        'Aujourd’hui, le sauna de la mariée a lieu le plus souvent lors de l’enterrement de vie de jeune fille. En Ostrobotnie du Sud, la coutume a été remise à l’honneur lors d’une fête traditionnelle de noces à la couronne organisée à Nurmo.',
      ],
      inLapland: 'Si votre lieu de réception dispose d’un sauna, le sauna de la mariée peut avoir lieu le soir précédant le mariage. Mentionnez-le dans votre demande : votre souhait sera transmis à l’organisateur tel que vous l’avez formulé.',
    },
    'wedding-crashers': {
      title: 'Les invités non conviés',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Un kuokkavieras est une personne qui se présente sans invitation à un mariage ou à une autre fête. Selon l’Institut des langues de Finlande, le linguiste Valentin Kiparsky a avancé en 1977 que ces invités étaient à l’origine des mendiants itinérants qui portaient un bâton à crochet, appelé kuokka.',
        'Le letton et le lituanien possèdent un mot composé similaire, et le mot finnois a peut-être été formé sur leur modèle.',
      ],
    },
    'wedding-waltz': {
      title: 'La valse des mariés',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Les jeunes mariés ouvrent le bal de la soirée, et en Finlande, cette première danse est traditionnellement une valse. Beaucoup de couples la répètent dans un cours de danse, et de plus en plus choisissent aujourd’hui leur propre chanson.',
        'La valse de mariage la plus connue de Finlande est la Valse nuptiale d’Akseli et Elina, de Heikki Aaltoila, tirée du film de 1968 Täällä Pohjantähden alla (Ici, sous l’étoile polaire).',
        'La première danse n’est pas une coutume uniquement finlandaise : elle fait partie des mariages dans tout le monde occidental.',
      ],
      inLapland: 'Si vous souhaitez que la valse soit jouée en direct, précisez-le dans votre demande.',
    },
    'bride-kidnapping': {
      title: 'L’enlèvement de la mariée',
      teaser: 'Au milieu de la fête, le témoin du marié et ses amis enlèvent la mariée, et le marié la récupère en relevant des défis.',
      body: [
        'Lors d’un enlèvement de la mariée, le témoin du marié et ses acolytes, ou la bande de l’enterrement de vie de jeune fille, emmènent la mariée pendant la fête. Le marié la récupère en relevant des défis qui, selon les termes de Yle, mettent sa virilité à l’épreuve.',
        'L’origine de cette coutume n’a pas été retracée. Des chercheurs interrogés par Yle l’ont qualifiée de patriarcale : c’est donc au couple de décider si ce jeu a sa place à son mariage.',
      ],
    },
    'maid-of-honour': {
      title: 'La kaaso et le bestman',
      teaser: 'La kaaso est l’assistante de la mariée, et le mot est d’origine fennique ancienne. Le terme bestman, lui, est arrivé en finnois depuis l’anglais, en passant par le suédois.',
      body: [
        'À l’origine, la kaaso aidait la mariée et l’habillait. Dans l’ouest de la Finlande, c’était souvent une semi-professionnelle, par exemple une veuve, une femme de pasteur ou, plus tard, une couturière, et en général elle n’était pas de la famille de la mariée. Le mot a des équivalents en langue vote et dans des dialectes estoniens. Aujourd’hui, kaaso désigne la demoiselle d’honneur.',
        'Bestman, le mot qui désigne l’assistant du marié, a été emprunté à l’anglais par l’intermédiaire du suédois. Les enterrements de vie de garçon et de jeune fille et d’autres coutumes nuptiales européennes sont arrivés en Finlande à la même époque.',
      ],
      inLapland: 'La loi finlandaise n’exige ni kaaso ni bestman, mais un mariage requiert deux témoins. Ceux-ci n’ont pas besoin d’être finlandais.',
    },
    'bridal-crown': {
      title: 'La couronne de mariée',
      teaser: 'Lors des noces à la couronne de l’ouest de la Finlande, la mariée portait une couronne. Seules quelques familles d’Ostrobotnie perpétuent encore cette tradition.',
      body: [
        'Les grandes noces à la couronne, qui pouvaient durer jusqu’à trois jours, appartenaient à la tradition nuptiale de l’ouest de la Finlande. La mariée portait une couronne, et une couronne d’honneur plus petite pouvait être cachée à l’intérieur de la grande.',
        'Le Musée national de Finlande conserve plusieurs couronnes de mariée, dont une couronne de myrte de 1891. Seules quelques familles d’Ostrobotnie perpétuent encore les noces à la couronne.',
      ],
    },
    sahti: {
      title: 'Le sahti',
      teaser: 'Le sahti est une ancienne bière finlandaise que l’on brasse encore, surtout à la campagne, comme boisson de fête pour les mariages.',
      body: [
        'Le sahti est une bière finlandaise brassée à la maison. Selon la description de la culture brassicole finlandaise dans l’Inventaire national du patrimoine vivant, le sahti est encore brassé, surtout à la campagne, comme boisson de fête pour les mariages.',
      ],
    },
    'fell-chapels': {
      title: 'Les chapelles de fjäll et une église en pleine nature',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'La chapelle Sainte-Marie de Levi (Marian kappeli) a été consacrée en 1998, et la paroisse de Kittilä la décrit comme une église prisée pour les mariages. Son tapis de mariage a été réalisé par Alli Ohenoja, artisane de Muonio, avec les peaux de pattes des faons de son propre élevage de rennes.',
        'La chapelle Saint-Paul (Pyhän Paavalin kappeli), à Saariselkä, a été consacrée en 1996. Elle compte 125 places assises, plus environ 20 dans la tribune, et selon la paroisse d’Inari, elle a surtout servi aux mariages. La chapelle des Aurores boréales (Revontulikappeli), sur le Pyhätunturi, a été achevée en 1986 et se loue pour des événements privés, y compris des mariages.',
        'L’église de Pielpajärvi, isolée en pleine nature à Inari, a été achevée en 1760. Le site était le village d’hiver des habitants d’Inari, qui s’y réunissaient trois fois chaque hiver et une fois l’été pour des marchés et des offices religieux, dont des mariages. Aujourd’hui, des couples s’y marient en été.',
      ],
      inLapland: 'Un mariage religieux exige que l’un de vous soit membre confirmé de l’Église évangélique-luthérienne et que l’autre appartienne à une Église chrétienne. Sinon, le couple se marie civilement, et l’union peut ensuite être bénie à l’église. L’examen des empêchements au mariage est toujours obligatoire.',
    },
  },
  sami: {
    title: 'Un mariage sami n’est pas un thème',
    body: [
      'Les mariages samis sont des fêtes de la communauté samie. Selon les principes d’un tourisme sami éthiquement durable, adoptés par le Parlement sami en 2018, on ne photographie pas un mariage sami sans l’autorisation de la communauté, et l’on ne porte pas le costume sami pour les touristes.',
      'C’est pourquoi nous ne proposons ni mariage à thème sami, ni costume sami, ni « baptême de Laponie », une coutume que ces principes décrivent comme inventée pour le tourisme. Pour découvrir la culture samie, commencez par les services proposés par les Samis eux-mêmes et par Siida, le musée sâme d’Inari.',
    ],
  },
  cta: {
    title: 'Un mariage en Laponie, avec vos propres traditions',
    body: 'Indiquez dans votre demande les traditions que vous aimeriez inclure : nous transmettons vos souhaits aux organisateurs de mariage qui travaillent dans la région.',
    venues: 'Voir les lieux',
    enquiry: 'Envoyer une demande',
  },
};
