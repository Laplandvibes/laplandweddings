import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Finnische Hochzeitsbräuche',
  title: 'So heiratet man in Finnland',
  intro: 'Brautsauna, ungeladene „Hackengäste“ und Hochzeitswalzer sind finnische Bräuche, deren Geschichte in Museen und Wörterbüchern belegt ist. Lappland steuert den Ort bei: Fjällkapellen, in denen Paare getraut werden.',
  readMore: 'Weiterlesen',
  allTraditions: 'Alle Hochzeitsbräuche',
  items: {
    'bridal-sauna': {
      title: 'Brautsauna',
      teaser: 'Vor der Hochzeit wurde die Braut in einer mit Blumen und Laubzweigen geschmückten Sauna gebadet. Sie hatte ihren eigenen Platz auf der Saunabank und ihren eigenen Birkenquast. Heute lebt der Brauch beim Junggesellinnenabschied weiter.',
    },
    'wedding-crashers': {
      title: 'Ungeladene Gäste',
      teaser: 'Ein Kuokkavieras, wörtlich „Hackengast“, kommt ungeladen zur Hochzeit. Das Wort geht auf umherziehende Bettler zurück, die einen Stock mit hakenförmigem Ende trugen, die sogenannte Kuokka.',
    },
    'wedding-waltz': {
      title: 'Hochzeitswalzer',
      teaser: 'Das Brautpaar eröffnet den Tanz mit einem Walzer, und viele üben ihn vorher in einem Tanzkurs. Der bekannteste finnische Hochzeitswalzer ist Akselis und Elinas Hochzeitswalzer.',
    },
    'fell-chapels': {
      title: 'Fjällkapellen',
      teaser: 'Der Trauteppich der Marienkapelle in Levi ist aus den Beinfellen von Rentierkälbern gefertigt. In der Wildniskirche von Pielpajärvi in Inari aus dem Jahr 1760 werden im Sommer Paare getraut.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Heiraten in Finnland',
  heroTitle: 'Finnische Hochzeitsbräuche',
  heroSubtitle: 'Brautsauna, ungeladene Gäste, Hochzeitswalzer und die Fjällkapellen Lapplands: woher die Bräuche kommen und wie sie sich heute auf Hochzeiten zeigen.',
  intro: [
    'Auf dieser Seite haben wir die finnischen Hochzeitsbräuche zusammengestellt, deren Hintergrund sich überprüfen lässt. Als Quellen dienen Museen, das Institut für die Landessprachen Finnlands, der finnische Rundfunk Yle und das nationale Verzeichnis des lebendigen Kulturerbes, das die finnische Denkmalbehörde führt. Am Ende jedes Abschnitts steht ein Link zur Quelle.',
    'Die meisten dieser Bräuche stammen aus dem Westen und Süden Finnlands. In Lappland macht der Ort die Hochzeit besonders: Fjällkapellen und eine alte Wildniskirche. Laut Yle wurden 2022 in Finnland 73 ausländische Paare mit Wohnsitz im Ausland getraut, und nirgends im Land heiraten so viele Ausländer wie in Kittilä.',
  ],
  tocLabel: 'Auf dieser Seite',
  kind: {
    living: 'Heute auf Hochzeiten lebendig',
    historical: 'Historischer Brauch',
    lapland: 'In Lappland',
  },
  inLaplandLabel: 'Bei Ihrer Hochzeit in Lappland',
  sourcesLabel: 'Quellen',
  items: {
    'bridal-sauna': {
      title: 'Brautsauna',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'Die Brautsauna gehört zur finnisch-karelischen Tradition der Hochzeitssauna. Die Sauna wurde mit Blumen und Laubzweigen geschmückt, und die Braut bekam ihren eigenen Platz auf der Saunabank und ihren eigenen Birkenquast. Zum Baden gehörten Reinigungsriten, Lieder und Zaubersprüche, und die Braut wurde auch gebadet, um sie fruchtbar zu machen.',
        'Das traditionelle Saunabaden, dessen bekanntestes Beispiel die Brautsauna ist, steht im nationalen Verzeichnis des lebendigen Kulturerbes Finnlands. Die finnische Saunakultur wurde 2020 in die Repräsentative Liste des immateriellen Kulturerbes der Menschheit der UNESCO aufgenommen.',
        'Heute findet die Brautsauna meist beim Junggesellinnenabschied statt. In Südösterbotten wurde der Brauch bei einem traditionellen Kronenhochzeitsfest in Nurmo wiederbelebt.',
      ],
      inLapland: 'Hat Ihre Location eine Sauna, kann die Brautsauna am Vorabend der Hochzeit stattfinden. Erwähnen Sie den Wunsch in Ihrer Anfrage, dann berücksichtigen wir ihn in unserer Antwort.',
    },
    'wedding-crashers': {
      title: 'Ungeladene Gäste',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'Ein Kuokkavieras ist ein Gast, der ohne Einladung zu einer Hochzeit oder einem anderen Fest kommt. Laut dem Institut für die Landessprachen Finnlands vermutete der Sprachwissenschaftler Valentin Kiparsky 1977, dass diese Gäste ursprünglich umherziehende Bettler waren, die einen Stock mit hakenförmigem Ende bei sich trugen, eine Kuokka.',
        'Im Lettischen und Litauischen gibt es ein ähnliches zusammengesetztes Wort, und das finnische Wort ist möglicherweise nach ihrem Vorbild entstanden.',
      ],
    },
    'wedding-waltz': {
      title: 'Hochzeitswalzer',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'Das Brautpaar tanzt den ersten Tanz des Abends, und in Finnland ist das traditionell ein Walzer. Viele Paare üben ihn in einem Tanzkurs, und immer mehr wählen inzwischen ein eigenes Lied.',
        'Der bekannteste finnische Hochzeitswalzer ist Akselis und Elinas Hochzeitswalzer aus dem Film „Hier unter dem Polarstern“ von 1968, komponiert von Heikki Aaltoila.',
        'Der erste Tanz ist kein rein finnischer Brauch: Er gehört in der ganzen westlichen Welt zur Hochzeit.',
      ],
      inLapland: 'Wenn der Walzer live gespielt werden soll, schreiben Sie es in Ihre Anfrage.',
    },
    'bride-kidnapping': {
      title: 'Brautentführung',
      teaser: 'Mitten in der Feier entführen der Bestman und seine Freunde die Braut, und der Bräutigam holt sie zurück, indem er Aufgaben löst.',
      body: [
        'Bei der Brautentführung bringen der Bestman und seine Helfer oder die Truppe vom Junggesellinnenabschied die Braut während der Feier fort. Der Bräutigam bekommt sie zurück, indem er Aufgaben löst, die, wie Yle es formuliert, seine Männlichkeit auf die Probe stellen.',
        'Der Ursprung des Brauchs ist nicht geklärt. Forschende, die Yle befragt hat, haben ihn als patriarchalisch bezeichnet. Deshalb entscheidet das Brautpaar selbst, ob das Spiel zu seiner Hochzeit gehört.',
      ],
    },
    'maid-of-honour': {
      title: 'Kaaso und Bestman',
      teaser: 'Die Kaaso ist die Helferin der Braut, das Wort ist alt und ostseefinnisch. Das Wort Bestman kam dagegen über das Schwedische aus dem Englischen ins Finnische.',
      body: [
        'Die Kaaso war ursprünglich die Helferin und Ankleiderin der Braut. Im Westen Finnlands übernahm diese Rolle oft eine halbprofessionelle Helferin, etwa eine Witwe, eine Pfarrersfrau oder später eine Schneiderin, die meist nicht mit der Braut verwandt war. Das Wort hat Entsprechungen im Wotischen und in estnischen Dialekten. Heute bezeichnet Kaaso die Brautjungfer.',
        'Das Wort Bestman für den Helfer des Bräutigams kam über das Schwedische aus dem Englischen ins Finnische. Zur selben Zeit erreichten Junggesellen- und Junggesellinnenabschiede und andere europäische Hochzeitsbräuche Finnland.',
      ],
      inLapland: 'Das finnische Gesetz schreibt weder eine Kaaso noch einen Bestman vor, für die Trauung braucht es aber zwei Zeugen. Sie müssen keine Finnen sein.',
    },
    'bridal-crown': {
      title: 'Brautkrone',
      teaser: 'Bei den Kronenhochzeiten Westfinnlands trug die Braut eine Krone. Nur noch ein paar Familien in Österbotten halten diese Tradition aufrecht.',
      body: [
        'Große Kronenhochzeiten, die bis zu drei Tage dauerten, gehörten zur westfinnischen Hochzeitstradition. Die Braut trug eine Krone, und in der großen Krone konnte eine kleinere Ehrenkrone versteckt sein.',
        'Das Finnische Nationalmuseum besitzt mehrere Brautkronen, darunter eine Myrtenkrone aus dem Jahr 1891. Nur noch ein paar Familien in Österbotten pflegen die Kronenhochzeit.',
      ],
    },
    sahti: {
      title: 'Sahti',
      teaser: 'Sahti ist ein altes finnisches Bier, das vor allem auf dem Land noch heute als Festgetränk für Hochzeiten gebraut wird.',
      body: [
        'Sahti ist ein finnisches Bier, das zu Hause gebraut wird. In der Beschreibung der finnischen Bierkultur im nationalen Verzeichnis des lebendigen Kulturerbes heißt es, dass Sahti vor allem auf dem Land noch immer als Festgetränk für Hochzeiten gebraut wird.',
      ],
    },
    'fell-chapels': {
      title: 'Fjällkapellen und eine Wildniskirche',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'Die Marienkapelle (Marian kappeli) in Levi wurde 1998 geweiht, und die Kirchengemeinde Kittilä nennt sie eine beliebte Hochzeitskirche. Ihren Trauteppich hat die Kunsthandwerkerin Alli Ohenoja aus Muonio aus den Beinfellen der Kälber ihres eigenen Rentierhofs gefertigt.',
        'Die St.-Paulus-Kapelle (Pyhän Paavalin kappeli) in Saariselkä wurde 1996 geweiht. Sie hat 125 Sitzplätze und auf der Empore etwa 20 weitere, und laut der Kirchengemeinde Inari ist sie vor allem für Trauungen genutzt worden. Die Polarlichtkapelle (Revontulikappeli) am Pyhätunturi wurde 1986 fertiggestellt und wird für private Veranstaltungen vermietet, auch für Trauungen.',
        'Die Wildniskirche von Pielpajärvi in Inari wurde 1760 fertiggestellt. Der Ort war das Winterdorf der Bewohner von Inari, die sich dort dreimal im Winter und einmal im Sommer zu Märkten und kirchlichen Handlungen versammelten, darunter auch Trauungen. Heute werden dort im Sommer Paare getraut.',
      ],
      inLapland: 'Für eine kirchliche Trauung muss einer von Ihnen konfirmiertes Mitglied der evangelisch-lutherischen Kirche sein und der andere einer christlichen Kirche angehören. Andernfalls wird das Paar standesamtlich getraut, und die Ehe kann danach in der Kirche gesegnet werden. Die Ehefähigkeitsprüfung ist immer erforderlich.',
    },
  },
  sami: {
    title: 'Eine samische Hochzeit ist kein Motto',
    body: [
      'Samische Hochzeiten sind Feste der samischen Gemeinschaft. Nach den Grundsätzen für ethisch nachhaltigen samischen Tourismus, die das Sámediggi (Sámi-Parlament) 2018 beschlossen hat, werden samische Hochzeiten nicht ohne Erlaubnis der Gemeinschaft fotografiert, und die samische Tracht wird nicht für Touristen getragen.',
      'Deshalb schlagen wir keine Hochzeiten mit samischem Motto, keine samischen Trachten und keine „Lapplandtaufe“ vor, die nach den Grundsätzen ein für den Tourismus erfundener Brauch ist. Wenn Sie die samische Kultur kennenlernen möchten, beginnen Sie mit Angeboten, die Samen selbst betreiben, und mit dem Siida, dem samischen Museum in Inari.',
    ],
  },
  cta: {
    title: 'Hochzeit in Lappland mit Ihren eigenen Bräuchen',
    body: 'Schreiben Sie in Ihrer Anfrage, welche Bräuche Sie einbeziehen möchten, und wir antworten Ihnen persönlich.',
    venues: 'Locations ansehen',
    enquiry: 'Hochzeitsanfrage senden',
  },
};
