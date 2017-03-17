export const TheaterList = [
  {
    id: 1,
    name: 'Oberkommando des Herres',
    armyGroupList: [
      1, // Heeresgruppe A
      2, // Heeresgruppe B
    ],
  },
  {
    id: 2,
    name: 'Pazifk',
    armyGroupList: [
      3, // Heeresgruppe C
    ],
  },
];

export const ArmyGroupList = [
  {
    // quelle angabe wenn vorhanden
    id: 1,
    name: 'Heeresgruppe A',
    armyList: [
      1, // AOK 1
      2, // AOK 2
      3, // AOK 3
    ],
  },
  {
    /**
     * mehr zeilige quellen angaben
     * link zu wikipedia
     * oder andere angeben die man unbedinngt benötigt
     */
    id: 2,
    name: 'Heeresgruppe B',
    armyList: [
      3,
    ],
  },
];

export const ArmyList = [
  {
    id: 1,
    name: 'AOK 1',
    general: 'name des generals',
    armyCorpList: [
      1, // Armee Corp 1
      2, // Armee Corp 2
    ],
  },

  {
    id: 2,
    name: 'AOK 2',
    general: 'name des generals',
    armyCorpList: [
      3, // Armee Corp 3
    ],
  },

  {
    id: 3,
    name: 'AOK 3',
    general: 'name des generals',
    armyCorpList: [
      4, // Armee Corp 3
    ],
  },
];


export const ArmyCorpList = [
  {
    id: 1,
    name: 'Armee Corp 1',
    general: 'name des generals',
    divList: [
      1, // Div 1
      2, // Div 2
    ],
  },
  {
    id: 2,
    name: 'Armee Corp 2',
    general: 'name des generals',
    divList: [
      3, // Div 3
    ],
  },
  {
    id: 3,
    name: 'Armee Corp 3',
    general: 'name des generals',
    divList: [
      4, // Div 4
    ],
  },
  {
    id: 4,
    name: 'Armee Corp 3',
    general: 'name des generals',
    divList: [
      5, // Div 4
    ],
  },
];

export const DivList = [
  {
    id: 1,
    name: 'Div 1',
    general: 'name des generals',
  },
  {
    id: 2,
    name: 'Div 2',
    general: 'name des generals',
  },
  {
    id: 3,
    name: 'Div 3',
    general: 'name des generals',
  },
  {
    id: 4,
    name: 'Div 4',
    general: 'name des generals',
  },
  {
    id: 5,
    name: 'Div 5',
    general: 'name des generals',
  },
];
