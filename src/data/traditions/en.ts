import type { TraditionsHome, TraditionsPage } from './types';

export const home: TraditionsHome = {
  eyebrow: 'Finnish wedding traditions',
  title: 'How Finns get married',
  intro: 'The bridal sauna, the uninvited “hoe guests” and the wedding waltz are Finnish customs with a documented history in museums and dictionaries. What Lapland adds is the place: fell chapels where couples are married.',
  readMore: 'Read more',
  allTraditions: 'All wedding traditions',
  items: {
    'bridal-sauna': {
      title: 'Bridal sauna',
      teaser: 'Before the wedding, the bride was bathed in a sauna decorated with flowers and leafy branches. She had her own place on the benches and her own birch whisk. Today the custom lives on at hen parties.',
    },
    'wedding-crashers': {
      title: 'Uninvited guests',
      teaser: 'A kuokkavieras, literally a “hoe guest”, comes to a wedding uninvited. The word goes back to wandering beggars who carried a hook-ended stick called a kuokka.',
    },
    'wedding-waltz': {
      title: 'Wedding waltz',
      teaser: 'The couple open the dancing with a waltz, and many practise it at a dance class first. The best-known Finnish wedding waltz is Akseli and Elina’s Wedding Waltz.',
    },
    'fell-chapels': {
      title: 'Fell chapels',
      teaser: 'The wedding rug in Levi’s Chapel of St Mary is made from the leg skins of reindeer calves. In Inari, the Pielpajärvi wilderness church from 1760 holds weddings in summer.',
    },
  },
};

export const page: TraditionsPage = {
  heroEyebrow: 'Weddings in Finland',
  heroTitle: 'Finnish wedding traditions',
  heroSubtitle: 'The bridal sauna, uninvited guests, the wedding waltz and Lapland’s fell chapels: where the customs come from and how they show up at weddings today.',
  intro: [
    'This page collects the Finnish wedding traditions whose background can be checked. The sources are museums, the Institute for the Languages of Finland, the Finnish broadcaster Yle and the National Inventory of Living Heritage kept by the Finnish Heritage Agency. Each entry ends with a link to its source.',
    'Most of these customs come from western and southern Finland. In Lapland, what sets a wedding apart is the place: fell chapels and an old wilderness church. According to Yle, 73 foreign couples living abroad were married in Finland in 2022, and Kittilä hosts more foreign weddings than anywhere else in the country.',
  ],
  tocLabel: 'On this page',
  kind: {
    living: 'Alive at weddings today',
    historical: 'Historical tradition',
    lapland: 'In Lapland',
  },
  inLaplandLabel: 'At your wedding in Lapland',
  sourcesLabel: 'Sources',
  items: {
    'bridal-sauna': {
      title: 'Bridal sauna',
      teaser: home.items['bridal-sauna']!.teaser,
      body: [
        'The bridal sauna belongs to the Finnish-Karelian tradition of wedding saunas. The sauna was decorated with flowers and leafy branches, and the bride was given her own place on the benches and her own birch whisk. The bathing included purification rites, songs and spells, and the bride was also bathed for fertility.',
        'Traditional sauna bathing, of which the bridal sauna is the best-known example, is part of Finland’s National Inventory of Living Heritage. Finnish sauna culture was added to UNESCO’s Representative List of the Intangible Cultural Heritage of Humanity in 2020.',
        'Today the bridal sauna is most often held at a hen party. In South Ostrobothnia the custom has been revived at a traditional crown-wedding event in Nurmo.',
      ],
      inLapland: 'If your venue has a sauna, the bridal sauna can be held on the evening before the wedding. Mention it in your enquiry and the wish is passed to the planner as you wrote it.',
    },
    'wedding-crashers': {
      title: 'Uninvited guests',
      teaser: home.items['wedding-crashers']!.teaser,
      body: [
        'A kuokkavieras is a guest who comes to a wedding or another feast without an invitation. According to the Institute for the Languages of Finland, the linguist Valentin Kiparsky suggested in 1977 that these guests were originally wandering beggars who carried a hook-ended stick, a kuokka.',
        'Latvian and Lithuanian have a similar compound word, and the Finnish word may have been modelled on them.',
      ],
    },
    'wedding-waltz': {
      title: 'Wedding waltz',
      teaser: home.items['wedding-waltz']!.teaser,
      body: [
        'The newlyweds dance the first dance of the evening, and in Finland it is traditionally a waltz. Many couples practise it at a dance class, and more and more now choose a song of their own.',
        'The best-known Finnish wedding waltz is Akseli and Elina’s Wedding Waltz by Heikki Aaltoila, from the 1968 film Here Beneath the North Star.',
        'The first dance is not only a Finnish custom: it belongs to weddings across the Western world.',
      ],
      inLapland: 'If you would like the waltz played live, say so in your enquiry.',
    },
    'bride-kidnapping': {
      title: 'Bride kidnapping',
      teaser: 'Halfway through the party the best man and his friends carry off the bride, and the groom wins her back by completing tasks.',
      body: [
        'In a bride kidnapping, the best man and his helpers, or the hen-party crew, take the bride away during the party. The groom gets her back by completing tasks which, as Yle puts it, test his manliness.',
        'The origin of the custom has not been traced. Researchers interviewed by Yle have called it patriarchal, so the couple decide for themselves whether the game belongs at their wedding.',
      ],
    },
    'maid-of-honour': {
      title: 'Kaaso and best man',
      teaser: 'The kaaso is the bride’s helper, and the word is an old Finnic one. The best man came into Finnish from English, by way of Swedish.',
      body: [
        'The kaaso was originally the bride’s helper and dresser. In western Finland she was often a semi-professional, such as a widow, a vicar’s wife or later a seamstress, and usually not related to the bride. The word has counterparts in Votic and in Estonian dialects. Today kaaso means the maid of honour.',
        'Bestman, the groom’s helper, was borrowed from English by way of Swedish. Stag and hen parties and other European wedding customs reached Finland at the same time.',
      ],
      inLapland: 'Finnish law does not require a maid of honour or a best man, but a wedding needs two witnesses. They do not have to be Finnish.',
    },
    'bridal-crown': {
      title: 'Bridal crown',
      teaser: 'At the crown weddings of western Finland the bride wore a crown. Only a few families in Ostrobothnia still keep the tradition.',
      body: [
        'Large crown weddings, lasting up to three days, belonged to the western Finnish wedding tradition. The bride wore a crown, and a smaller crown of honour could be hidden inside the large one.',
        'The National Museum of Finland holds several bridal crowns, among them a myrtle crown from 1891. Only a few Ostrobothnian families still keep up crown weddings.',
      ],
    },
    sahti: {
      title: 'Sahti',
      teaser: 'Sahti is an old Finnish beer that is still brewed, especially in the countryside, as the festive drink for weddings.',
      body: [
        'Sahti is a Finnish beer brewed at home. The description of Finnish beer culture in the National Inventory of Living Heritage notes that sahti is still brewed, especially in the countryside, as the festive drink for weddings.',
      ],
    },
    'fell-chapels': {
      title: 'Fell chapels and a wilderness church',
      teaser: home.items['fell-chapels']!.teaser,
      body: [
        'Levi’s Chapel of St Mary (Marian kappeli) was consecrated in 1998, and the parish of Kittilä calls it a popular church for weddings. Its wedding rug was made by Alli Ohenoja, a craftswoman from Muonio, from the leg skins of calves on her own reindeer farm.',
        'The Chapel of St Paul (Pyhän Paavalin kappeli) in Saariselkä was consecrated in 1996. It seats 125, with about 20 more in the gallery, and the parish of Inari says it has been used above all for weddings. The Aurora Chapel (Revontulikappeli) on Pyhätunturi was completed in 1986 and is rented for private events, weddings included.',
        'The Pielpajärvi wilderness church in Inari was completed in 1760. The site was the winter village of the people of Inari, who gathered there three times each winter and once in summer for markets and church services, weddings among them. Today couples are married there in summer.',
      ],
      inLapland: 'A church wedding requires one of you to be a confirmed member of the Evangelical Lutheran Church and the other to belong to a Christian church. Otherwise the couple is married in a civil ceremony, and the marriage can then be blessed in church. The examination of impediments to marriage is always required.',
    },
  },
  sami: {
    title: 'A Sámi wedding is not a theme',
    body: [
      'Sámi weddings are celebrations of the Sámi community. Under the principles for ethically sustainable Sámi tourism adopted by the Sámi Parliament in 2018, Sámi weddings are not photographed without the community’s permission, and the Sámi dress is not worn for tourists.',
      'That is why we do not suggest Sámi-themed weddings, Sámi costumes or a “Lapland baptism”, which the principles describe as a custom invented for tourism. To learn about Sámi culture, start with services run by Sámi people themselves and with Siida, the Sámi museum in Inari.',
    ],
  },
  cta: {
    title: 'A Lapland wedding with your own traditions',
    body: 'Tell us in your enquiry which traditions you would like to include, and we pass your wishes on to wedding planners who work in the region.',
    venues: 'See the venues',
    enquiry: 'Send a wedding enquiry',
  },
};
