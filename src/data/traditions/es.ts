import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Tradiciones de boda finlandesas',
  title: 'Así se casan los finlandeses',
  intro: 'La sauna de la novia, los «invitados de la azada» que llegan sin invitación y el vals de los novios son costumbres finlandesas cuya historia está documentada en museos y diccionarios. Lo que aporta Laponia es el lugar: capillas en los fells donde se celebran bodas.',
  readMore: 'Leer más',
  allTraditions: 'Todas las tradiciones de boda',
  items: {
    'bridal-sauna': {
      title: 'La sauna de la novia',
      teaser: 'Antes de la boda, se bañaba a la novia en una sauna adornada con flores y ramas frondosas. Ella tenía su propio lugar en los bancos y su propio manojo de ramas de abedul. Hoy la costumbre sigue viva en las despedidas de soltera.',
    },
    'wedding-crashers': {
      title: 'Los colados',
      teaser: 'Un kuokkavieras, literalmente «invitado de la azada», llega a una boda sin invitación. La palabra se remonta a los mendigos ambulantes que llevaban un palo con punta de gancho llamado kuokka.',
    },
    'wedding-waltz': {
      title: 'El vals de los novios',
      teaser: 'Los novios abren el baile con un vals, y muchos lo ensayan antes en clases de baile. El vals nupcial finlandés más conocido es el Vals nupcial de Akseli y Elina.',
    },
    'fell-chapels': {
      title: 'Las capillas en los fells',
      teaser: 'La alfombra nupcial de la capilla de Santa María de Levi está hecha con la piel de las patas de crías de reno. En Inari, la iglesia de Pielpajärvi, que data de 1760 y está aislada en plena naturaleza, acoge bodas en verano.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Bodas en Finlandia',
  heroTitle: 'Tradiciones de boda finlandesas',
  heroSubtitle: 'La sauna de la novia, los colados, el vals de los novios y las capillas en los fells de Laponia: de dónde vienen estas costumbres y cómo están presentes hoy en las bodas.',
  intro: [
    'Esta página reúne las tradiciones de boda finlandesas cuya historia se puede comprobar. Las fuentes son museos, el Instituto de las Lenguas de Finlandia, la radiotelevisión finlandesa Yle y el Inventario Nacional del Patrimonio Vivo que mantiene la Agencia Finlandesa del Patrimonio. Cada apartado termina con un enlace a su fuente.',
    'La mayoría de estas costumbres proceden del oeste y del sur de Finlandia. En Laponia, lo que distingue una boda es el lugar: capillas en los fells y una antigua iglesia aislada en plena naturaleza. Según Yle, en 2022 se casaron en Finlandia 73 parejas extranjeras que viven fuera del país, y Kittilä es el lugar de Finlandia donde más bodas de extranjeros se celebran.',
  ],
  tocLabel: 'En esta página',
  kind: {
    living: 'Viva en las bodas de hoy',
    historical: 'Tradición histórica',
    lapland: 'En Laponia',
  },
  inLaplandLabel: 'En su boda en Laponia',
  sourcesLabel: 'Fuentes',
  items: {
    'bridal-sauna': {
      title: 'La sauna de la novia',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'La sauna de la novia forma parte de la tradición finlandesa y carelia de las saunas de boda. La sauna se adornaba con flores y ramas frondosas, y a la novia se le reservaba un lugar propio en los bancos y su propio manojo de ramas de abedul. El baño incluía ritos de purificación, cantos y conjuros, y también se bañaba a la novia para favorecer su fertilidad.',
        'El baño de sauna tradicional, cuyo ejemplo más conocido es la sauna de la novia, forma parte del Inventario Nacional del Patrimonio Vivo de Finlandia. La cultura finlandesa de la sauna se inscribió en 2020 en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad de la UNESCO.',
        'Hoy, la sauna de la novia se celebra en la mayoría de los casos durante la despedida de soltera. En Ostrobotnia del Sur, la costumbre se ha recuperado en un evento tradicional de bodas con corona en Nurmo.',
      ],
      inLapland: 'Si el lugar de su boda tiene sauna, la sauna de la novia puede celebrarse la noche anterior a la boda. Menciónelo en su consulta y lo tendremos en cuenta en nuestra respuesta.',
    },
    'wedding-crashers': {
      title: 'Los colados',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Un kuokkavieras es quien llega sin invitación a una boda o a otra celebración. Según el Instituto de las Lenguas de Finlandia, el lingüista Valentin Kiparsky propuso en 1977 que estos invitados eran en su origen mendigos ambulantes que llevaban un palo con punta de gancho, llamado kuokka.',
        'El letón y el lituano tienen una palabra compuesta parecida, y es posible que la palabra en finés se formara siguiendo ese modelo.',
      ],
    },
    'wedding-waltz': {
      title: 'El vals de los novios',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Los recién casados abren el baile de la noche, y en Finlandia ese primer baile es tradicionalmente un vals. Muchas parejas lo ensayan en clases de baile, y cada vez más eligen ahora una canción propia.',
        'El vals nupcial finlandés más conocido es el Vals nupcial de Akseli y Elina, obra de Heikki Aaltoila, que suena en la película de 1968 Täällä Pohjantähden alla (Aquí, bajo la Estrella Polar).',
        'El primer baile no es solo una costumbre finlandesa: forma parte de las bodas en todo el mundo occidental.',
      ],
      inLapland: 'Si desea que el vals se toque en vivo, indíquelo en su consulta.',
    },
    'bride-kidnapping': {
      title: 'El rapto de la novia',
      teaser: 'A mitad de la fiesta, el padrino y sus amigos se llevan a la novia, y el novio la recupera superando pruebas.',
      body: [
        'En el rapto de la novia, el padrino y sus ayudantes, o el grupo de la despedida de soltera, se llevan a la novia durante la fiesta. El novio la recupera cumpliendo tareas que, en palabras de Yle, ponen a prueba su hombría.',
        'No se ha podido rastrear el origen de la costumbre. Los investigadores entrevistados por Yle la han calificado de patriarcal, por lo que es la propia pareja quien decide si el juego tiene cabida en su boda.',
      ],
    },
    'maid-of-honour': {
      title: 'La kaaso y el bestman',
      teaser: 'La kaaso es la ayudante de la novia, y la palabra es de origen fínico antiguo. El término bestman, en cambio, llegó al finés desde el inglés a través del sueco.',
      body: [
        'En su origen, la kaaso ayudaba a la novia y la vestía. En el oeste de Finlandia solía ser una semiprofesional, por ejemplo una viuda, la esposa del pastor o, más tarde, una costurera, y por lo general no era pariente de la novia. La palabra tiene equivalentes en vótico y en dialectos del estonio. Hoy, kaaso significa dama de honor.',
        'Bestman, el término para el ayudante del novio, se tomó del inglés a través del sueco. Las despedidas de soltero y de soltera y otras costumbres nupciales europeas llegaron a Finlandia en la misma época.',
      ],
      inLapland: 'La ley finlandesa no exige kaaso ni bestman, pero la boda necesita dos testigos. No es necesario que sean finlandeses.',
    },
    'bridal-crown': {
      title: 'La corona nupcial',
      teaser: 'En las bodas con corona del oeste de Finlandia, la novia llevaba una corona. Solo unas pocas familias de Ostrobotnia mantienen todavía la tradición.',
      body: [
        'Las grandes bodas con corona, que podían durar hasta tres días, pertenecían a la tradición nupcial del oeste de Finlandia. La novia llevaba una corona, y dentro de la grande podía esconderse otra más pequeña, la corona de honor.',
        'El Museo Nacional de Finlandia conserva varias coronas nupciales, entre ellas una corona de mirto de 1891. Solo unas pocas familias de Ostrobotnia mantienen todavía las bodas con corona.',
      ],
    },
    sahti: {
      title: 'El sahti',
      teaser: 'El sahti es una antigua cerveza finlandesa que todavía se elabora, sobre todo en el campo, como bebida festiva para las bodas.',
      body: [
        'El sahti es una cerveza finlandesa de elaboración casera. Según la descripción de la cultura cervecera finlandesa en el Inventario Nacional del Patrimonio Vivo, el sahti todavía se elabora, sobre todo en el campo, como bebida festiva para las bodas.',
      ],
    },
    'fell-chapels': {
      title: 'Las capillas en los fells y una iglesia en plena naturaleza',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'La capilla de Santa María de Levi (Marian kappeli) se consagró en 1998, y la parroquia de Kittilä la describe como una iglesia popular para las bodas. Su alfombra nupcial la hizo Alli Ohenoja, artesana de Muonio, con la piel de las patas de las crías de su propia granja de renos.',
        'La capilla de San Pablo (Pyhän Paavalin kappeli), en Saariselkä, se consagró en 1996. Tiene 125 asientos, más unos 20 en la tribuna, y según la parroquia de Inari se ha usado sobre todo para bodas. La capilla de la Aurora Boreal (Revontulikappeli), en el Pyhätunturi, se terminó en 1986 y se alquila para eventos privados, bodas incluidas.',
        'La iglesia de Pielpajärvi, aislada en plena naturaleza en Inari, se terminó de construir en 1760. El lugar era la aldea de invierno de los habitantes de Inari, que se reunían allí tres veces cada invierno y una vez en verano para los mercados y los oficios religiosos, entre ellos las bodas. Hoy en día, las parejas se casan allí en verano.',
      ],
      inLapland: 'Para casarse por la iglesia, uno de los dos debe ser miembro confirmado de la Iglesia evangélica luterana y el otro debe pertenecer a una iglesia cristiana. De lo contrario, la pareja se casa por lo civil y después el matrimonio puede bendecirse en la iglesia. La investigación de impedimentos matrimoniales se exige siempre.',
    },
  },
  sami: {
    title: 'Una boda sami no es una boda temática',
    body: [
      'Una boda sami es una celebración de la propia comunidad sami. Según los principios para un turismo sami éticamente sostenible, aprobados por el Parlamento sami en 2018, una boda sami no se fotografía sin el permiso de la comunidad, y el traje sami no se viste para los turistas.',
      'Por eso no proponemos bodas de temática sami, el uso del traje sami ni un «bautizo de Laponia», que según esos principios es una costumbre inventada para el turismo. Para conocer la cultura sami, empiece por los servicios que organiza el propio pueblo sami y por Siida, el museo sami de Inari.',
    ],
  },
  cta: {
    title: 'Una boda en Laponia con sus propias tradiciones',
    body: 'Indíquenos en su consulta qué tradiciones desea incluir y le responderemos personalmente.',
    venues: 'Ver los lugares',
    enquiry: 'Enviar una consulta de boda',
  },
};
