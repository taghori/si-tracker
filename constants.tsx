import { Phase, PhaseCategory, Spirit, ExpansionId, Adversary, Scenario } from './types';
import {
  Sprout,
  Zap,
  Skull,
  Flame,
  Construction,
  Map,
  ArrowRightCircle,
  Hourglass,
  Ghost,
  ShieldAlert,
  Ship,
  Tent,
  Waves,
  Sun,
  Wind,
  Mountain,
  Leaf
} from 'lucide-react';
import React from 'react';

export const EXPANSIONS = [
  { id: ExpansionId.BASE },
  { id: ExpansionId.BRANCH_AND_CLAW },
  { id: ExpansionId.JAGGED_EARTH },
  { id: ExpansionId.NATURE_INCARNATE },
  { id: ExpansionId.HORIZONS },
  { id: ExpansionId.FEATHER_AND_FLAME },
];

export const SPIRITS: Spirit[] = [
  // Base
  { id: 'river', expansionId: ExpansionId.BASE },
  { id: 'lightning', expansionId: ExpansionId.BASE },
  { id: 'shadows', expansionId: ExpansionId.BASE },
  { id: 'earth', expansionId: ExpansionId.BASE },
  { id: 'thunderspeaker', expansionId: ExpansionId.BASE },
  { id: 'green', expansionId: ExpansionId.BASE },
  { id: 'ocean', expansionId: ExpansionId.BASE },
  { id: 'bringer', expansionId: ExpansionId.BASE },
  // B&C
  { id: 'keeper', expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'fangs', expansionId: ExpansionId.BRANCH_AND_CLAW },
  // Jagged Earth
  { id: 'volcano', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'mist', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'vengeance', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'stone', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'many-minds', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'lure', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'starlight', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'fractured', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'trickster', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'memory', expansionId: ExpansionId.JAGGED_EARTH },
  // Feather and Flame
  { id: 'wildfire', expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'serpent', expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'downpour', expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'finder', expansionId: ExpansionId.FEATHER_AND_FLAME },
  // Horizons
  { id: 'eyes', expansionId: ExpansionId.HORIZONS },
  { id: 'mud', expansionId: ExpansionId.HORIZONS },
  { id: 'heat', expansionId: ExpansionId.HORIZONS },
  { id: 'whirlwind', expansionId: ExpansionId.HORIZONS },
  { id: 'teeth', expansionId: ExpansionId.HORIZONS },
  // Nature Incarnate
  { id: 'behemoth', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'hearth', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'roots', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'darkness', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'sun-gaze', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'voice', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'wounded', expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'earthquake', expansionId: ExpansionId.NATURE_INCARNATE },
];

export const ADVERSARIES: Adversary[] = [
  {
    id: 'prussia',
    expansionId: ExpansionId.BASE,
    escalation: {
      name: "",
      description: ""
    },
    phaseHints: {
      "invader-explore": [{ id: "escalation", level: 0, hint: "" }]
    },
    levels: [
      { level: 0, difficulty: 1 },
      {
        level: 1, difficulty: 2, name: "", isSetup: true,
        effect: "",
        fearCards: "3/3/3"
      },
      {
        level: 2, difficulty: 4, name: "", isSetup: true,
        effect: "",
        fearCards: "3/3/3", invaderDeck: "111-3-2222-3333"
      },
      {
        level: 3, difficulty: 6, name: "", isSetup: true,
        effect: "",
        fearCards: "3/4/3", invaderDeck: "11-3-2222-3333"
      },
      {
        level: 4, difficulty: 7, name: "", isSetup: true,
        effect: "",
        fearCards: "4/4/3", invaderDeck: "11-3-222-3333"
      },
      {
        level: 5, difficulty: 9, name: "", isSetup: true,
        effect: "",
        fearCards: "4/4/3", invaderDeck: "1-3-222-3333"
      },
      {
        level: 6, difficulty: 10, name: "", isSetup: true,
        effect: "",
        fearCards: "4/4/4", invaderDeck: "3-222-3333"
      },
    ]
  },
  {
    id: 'england',
    name: 'Kingdom of England',
    expansionId: ExpansionId.BASE,
    escalation: {
      name: "",
      description: ""
    },
    lossCondition: {
      name: "",
      description: ""
    },
    phaseHints: {
      "invader-build": [
        { id: "indentured_servants", level: 1, hint: "" },
        { id: "high_immigration", level: 3, hint: "" },
      ],
      "invader-ravage": [
        { id: "local_autonomy", level: 5, hint: "" }
      ],
      "fast-power": [
        { id: "local_autonomy", level: 5, hint: "" }
      ],
      "slow-power": [
        { id: "local_autonomy", level: 5, hint: "" }
      ]
    },
    levels: [
      { level: 0, difficulty: 1 },
      {
        level: 1, difficulty: 3, name: "",
        effect: "",
        fearCards: "3/4/3"
      },
      {
        level: 2, difficulty: 4, name: "", isSetup: true,
        effect: "",
        fearCards: "4/4/3"
      },
      {
        level: 3, difficulty: 6, name: "",
        effect: "",
        fearCards: "4/5/4"
      },
      {
        level: 4, difficulty: 7, name: "",
        effect: "",
        fearCards: "4/5/5"
      },
      {
        level: 5, difficulty: 9, name: "",
        effect: "",
        fearCards: "4/5/5"
      },
      {
        level: 6, difficulty: 11, name: "",
        effect: "",
        setupRule: "",
        fearCards: "4/5/4"
      },
    ]
  },
  {
    id: 'sweden',
    name: 'Kingdom of Sweden',
    // difficulty: '1-8', // This was not in the original, and not in the instruction to add.
    // flagImage: 'https://cf.geekdo-images.com/original/img/7g6Y-t4g0QJqY9Q5zJzJzJzJzJz=/fit-in/1200x630/pic3040003.png', // This was not in the original, and not in the instruction to add.
    expansionId: ExpansionId.BASE,
    escalation: {
      name: "",
      description: ""
    },
    phaseHints: {
      "invader-explore": [
        { id: "escalation", level: 0, hint: "" }
      ],
      "invader-ravage": [
        { id: "heavy_mining", level: 1, hint: "" },
        { id: "fine_steel", level: 3, hint: "" },
        { id: "mining_rush", level: 5, hint: "" }
      ]
    },
    levels: [
      { level: 0, difficulty: 1 },
      {
        level: 1, difficulty: 2, name: "",
        effect: "",
        fearCards: "3/3/3"
      },
      {
        level: 2, difficulty: 3, name: "", isSetup: true,
        effect: "",
        fearCards: "3/4/3"
      },
      {
        level: 3, difficulty: 5, name: "",
        effect: "",
        fearCards: "3/4/3"
      },
      {
        level: 4, difficulty: 6, name: "", isSetup: true,
        effect: "",
        fearCards: "3/4/4"
      },
      {
        level: 5, difficulty: 7, name: "",
        effect: "",
        fearCards: "4/4/4"
      },
      {
        level: 6, difficulty: 8, name: "", isSetup: true,
        effect: "",
        fearCards: "4/4/5"
      },
    ]
  },
  {
    id: 'france',
    name: 'Kingdom of France',
    expansionId: ExpansionId.BRANCH_AND_CLAW,
    escalation: {
      name: "",
      description: ""
    },
    lossCondition: {
      name: "",
      description: ""
    },
    phaseHints: {
      "invader-explore": [
        { id: "escalation", level: 0, hint: "" },
        { id: "frontier_explorers", level: 1, hint: "" },
        { id: "persistent_explorers", level: 6, hint: "" }
      ],
      "invader-build": [
        { id: "slave_labor", level: 2, hint: "" },
        { id: "triangle_trade", level: 4, hint: "" }
      ],
      "fast-power": [{ id: "slow_healing", level: 5, hint: "" }],
      "slow-power": [{ id: "slow_healing", level: 5, hint: "" }]
    },
    levels: [
      { level: 0, difficulty: 2 },
      {
        level: 1, difficulty: 3, name: "",
        effect: "",
        fearCards: "3/3/3"
      },
      {
        level: 2, difficulty: 5, name: "",
        effect: "", setupRule: "", // Explicit setupRule field for mixed levels
        fearCards: "3/4/3"
      },
      {
        level: 3, difficulty: 7, name: "", isSetup: true,
        effect: "",
        fearCards: "4/4/3"
      },
      {
        level: 4, difficulty: 8, name: "",
        effect: "",
        fearCards: "4/4/4"
      },
      {
        level: 5, difficulty: 9, name: "",
        effect: "",
        fearCards: "4/5/4"
      },
      {
        level: 6, difficulty: 10, name: "",
        effect: "",
        fearCards: "4/5/5"
      },
    ]
  },
  {
    id: 'habsburg',
    name: 'Habsburg Monarchy (Livestock Colony)',
    expansionId: ExpansionId.JAGGED_EARTH,
    escalation: {
      name: "Seek Prime Territory",
      description: "After the Explore Step: On each board with 4 or fewer Blight, add 1 Town to a land without Town/Blight. On each board with 2 or fewer Blight, do so again."
    },
    lossCondition: {
      name: "Irreparable Damage",
      description: "Track how many Blight come off the Blight Card during Ravages that do 8+ Damage to the land. If that number ever exceeds players, the Invaders win."
    },
    phaseHints: {
      "invader-explore": [
        { id: "escalation", level: 0, hint: "Escalation: Board <4 Blight? Add Town (no Town/Blight). <2 Blight? Do again." }
      ],
      "invader-build": [
        { id: "migratory_herders", level: 1, hint: "After Build: Gather 1 Town from non-matching land to matching land." },
        { id: "rural_provinces", level: 2, hint: "Build Inland City -> Build 2 Towns instead." }
      ],
      "invader-ravage": [
        { id: "irreparable_damage", level: 0, hint: "Loss: Ravage 8+ Damage? Track Blight removed. > Players = Loss." },
        { id: "far_flung_herds", level: 6, hint: "Ravage +2 Damage if adjacent land has Town." }
      ]
    },
    levels: [
      { level: 0, difficulty: 2 },
      {
        level: 1, difficulty: 3, name: "Migratory Herders",
        effect: "After the normal Build Step: In each land matching a Build Card, Gather 1 Town from a land not matching a Build Card. (In board/land order.)",
        fearCards: "3/4/3"
      },
      {
        level: 2, difficulty: 5, name: "More Rural Than Urban",
        effect: "During Play, when Invaders would Build 1 City in an Inland land, they instead Build 2 Town.",
        setupRule: "During Setup, on each board, add 1 Town to land #2 and 1 Town to the highest-numbered land without Setup symbols.",
        fearCards: "4/5/2"
      },
      {
        level: 3, difficulty: 6, name: "Fast Spread",
        effect: "When making the Invader Deck, Remove 1 additional Stage I Card. (New deck order: 11-2222-33333)",
        invaderDeck: '11222233333',
        fearCards: "4/5/3"
      },
      {
        level: 4, difficulty: 8, name: "Herds Thrive in Verdant Lands",
        effect: "Town in lands without Blight are Durable: they have +2 Health, and 'Destroy Town' effects instead deal 2 Damage (to those Town only) per Town they could Destroy. ('Destroy all Town' works normally.)",
        invaderDeck: '11222233333',
        fearCards: "4/5/3"
      },
      {
        level: 5, difficulty: 9, name: "Wave of Immigration",
        effect: "When Revealed (Reminder Card), on each board, add 1 City to a Coastal land without City and 1 Town to the 3 Inland lands with the fewest Blight.",
        setupRule: "Before the initial Explore, put the Habsburg Reminder Card under the top 5 Invader Cards.",
        invaderDeck: '11222233333',
        fearCards: "4/6/3"
      },
      {
        level: 6, difficulty: 10, name: "Far-Flung Herds",
        effect: "Ravages do +2 Damage (total) if any adjacent lands have Town. (This does not cause lands without Invaders to Ravage.)",
        invaderDeck: '11222233333',
        fearCards: "5/6/3"
      },
    ]
  },
  {
    id: 'russia',
    name: 'Tsardom of Russia',
    expansionId: ExpansionId.JAGGED_EARTH,
    escalation: {
      name: "Stalk the Predators",
      description: "On each board: Add 2 Explorer (total) among lands with Beasts. If you can't, instead add 2 Explorer among lands with Beasts on a different board."
    },
    lossCondition: {
      name: "Hunters Swarm the Island",
      description: "Put Beasts Destroyed by Adversary rules on this panel. If there are ever more Beasts on this panel than on the island, the Invaders win."
    },
    phaseHints: {
      "invader-explore": [
        { id: "escalation", level: 0, hint: "Escalation: Add 2 Explorers among lands with Beasts." }
      ],
      "invader-ravage": [
        { id: "hunters_shell", level: 1, hint: "Ravage adds Blight? Destroy 1 Beasts in that land." },
        { id: "competition", level: 3, hint: "Lands with 3+ Explorers also Ravage." },
        { id: "pressure_profit", level: 6, hint: "After Ravage (Turn 2+): If no Blight added, add 1 Explorer + 1 Town to land with most Explorers." }
      ],
      "fast-power": [
        { id: "impending_disaster", level: 2, hint: "First time an Action destroys Explorers: Push 1 instead (generate 1 Fear)." }
      ],
      "slow-power": [
        { id: "impending_disaster", level: 2, hint: "First time an Action destroys Explorers: Push 1 instead (generate 1 Fear)." }
      ]
    },
    levels: [
      { level: 0, difficulty: 1 },
      {
        level: 1, difficulty: 3, name: "Hunters Bring Home Shell and Hide",
        effect: "During Play, Explorer do +1 Damage. When Ravage adds Blight to a land (including cascades), Destroy 1 Beasts in that land.",
        setupRule: "During Setup, on each board, add 1 Beasts and 1 Explorer to the highest-numbered land without Town/City.",
        fearCards: "3/3/4"
      },
      {
        level: 2, difficulty: 4, name: "A Sense for Impending Disaster",
        effect: "The first time each Action would Destroy Explorer: If possible, 1 of those Explorer is instead Pushed; 1 Fear when you do so.",
        fearCards: "4/3/4"
      },
      {
        level: 3, difficulty: 6, name: "Competition Among Hunters",
        effect: "Ravage Cards also match lands with 3 or more Explorer. (If the land already matched the Ravage Card, it still Ravages just once.)",
        fearCards: "4/4/3"
      },
      {
        level: 4, difficulty: 7, name: "Accelerated Exploitation",
        effect: "When making the Invader Deck, put 1 Stage III Card after each Stage II Card. (New Deck Order: 111-2-3-2-3-2-3-2-33)",
        invaderDeck: '111232323233',
        fearCards: "4/4/4"
      },
      {
        level: 5, difficulty: 9, name: "Entrench in the Face of Fear",
        effect: "When one (an unused Invader card) is revealed, immediately place it in the Build space (face-up).",
        setupRule: "Put an unused Stage II Invader Card under the top 3 Fear Cards, and an unused Stage III Card under the top 7 Fear Cards.",
        invaderDeck: '111232323233',
        fearCards: "4/5/4"
      },
      {
        level: 6, difficulty: 11, name: "Pressure for Fast Profit",
        effect: "After the Ravage Step of turn 2+, on each board where it added no Blight: In the land with the most Explorer (min. 1), add 1 Explorer and 1 Town.",
        invaderDeck: '111232323233',
        fearCards: "5/5/4"
      },
    ]
  },

  {
    id: 'scotland',
    name: 'Kingdom of Scotland',
    expansionId: ExpansionId.FEATHER_AND_FLAME,
    escalation: {
      name: "Ports Sprawl Outward",
      description: "On the single board with the most Coastal Town/City, add 1 Town to the N lands with the fewest Town (N = # of players.)"
    },
    lossCondition: {
      name: "Trade Hub",
      description: "If the number of Coastal lands with City is ever greater than (2 x # of boards), the Invaders win."
    },
    phaseHints: {
      "invader-explore": [
        { id: "escalation", level: 0, hint: "Escalation: Board with most Coastal Town/City? Add 1 Town to N lands with fewest Town." },
        { id: "trading_port", level: 1, hint: "Costal Explore Card? Add 1 Town instead of 1 Explorer (max 2/board)." }
      ],
      "invader-build": [
        { id: "chart_coastline", level: 3, hint: "Coastal Build affects lands without Invaders if adjacent to City." }
      ],
      "invader-ravage": [
        { id: "runoff", level: 5, hint: "Ravage adds Blight to Coast? Add 1 Blight to Ocean (no cascade)." },
        { id: "exports", level: 6, hint: "After Ravage: Add 1 Town to Inland lands matching Ravage card within 1 Range of Town/City." }
      ]
    },
    levels: [
      { level: 0, difficulty: 1 },
      {
        level: 1, difficulty: 3, name: "Trading Port",
        effect: "After Setup, in Coastal lands, Explore Cards add 1 Town instead of 1 Explorer. 'Coastal Lands' Invader cards do this for maximum 2 lands per board.",
        fearCards: "3/4/3"
      },
      {
        level: 2, difficulty: 4, name: "Seize Opportunity",
        effect: "During Setup, add 1 City to land #2. Place 'Coastal Lands' as the 3rd Stage II card, and move the two Stage II Cards above it up by one.",
        invaderDeck: '112212233333',
        fearCards: "4/4/3"
      },
      {
        level: 3, difficulty: 6, name: "Chart the Coastline",
        effect: "In Coastal lands, Build Cards affect lands without Invaders, so long as there is an adjacent City.",
        fearCards: "4/5/4"
      },
      {
        level: 4, difficulty: 7, name: "Ambition of a Minor Nation",
        effect: "During Setup, replace the bottom Stage I Card with the bottom Stage III Card.",
        invaderDeck: '11223223333',
        fearCards: "5/5/4"
      },
      {
        level: 5, difficulty: 8, name: "Runoff and Bilgewater",
        effect: "After a Ravage Action adds Blight to a Coastal Land, add 1 Blight to that board's Ocean (without cascading). Treat the Ocean as a Coastal Wetland for this rule and for Blight removal/movement.",
        invaderDeck: '11223223333',
        fearCards: "5/6/4"
      },
      {
        level: 6, difficulty: 10, name: "Exports Fuel Inward Growth",
        effect: "After the Ravage step, add 1 Town to each Inland land that matches a Ravage card and is within 1 Range of Town/City.",
        invaderDeck: '11223223333',
        fearCards: "6/6/4"
      },
    ]
  },
  {
    id: 'habsburg-mining',
    name: 'Habsburg Mining Expedition',
    expansionId: ExpansionId.NATURE_INCARNATE,
    escalation: {
      name: "Mining Tunnels",
      description: "After Advancing Invader Cards: On each board, Explore in 2 lands whose terrains don't match a Ravage or Build Card (no source required)."
    },
    lossCondition: {
      name: "Land Stripped Bare",
      description: "At the end of the Fast Phase, the Invaders win if any land has at least 8 total Invaders/Blight (combined)."
    },
    phaseHints: {
      "fast-power": [{ id: "land_stripped", level: 0, hint: "Loss Check: 8+ Invaders/Blight in one land? Invaders Win." }],
      "invader-explore": [
        { id: "empire_ascendant", level: 6, hint: "Board with <=3 Blight: Add +1 Explorer in each explored land (max 2/board)." }
      ],
      "invader-advance": [
        { id: "escalation", level: 0, hint: "Escalation: Explore in 2 lands not matching Build/Ravage cards (no source)." }
      ],
      "invader-build": [
        { id: "ceaseless_mining", level: 1, hint: "Mining Lands (3+ Invaders): Build Cards cause RAVAGE instead of Build." },
        { id: "mining_boom_1", level: 3, hint: "After Build: Choose land with Explorer -> Upgrade 1 Explorer." },
        { id: "mining_boom_2", level: 5, hint: "After Build: Choose land with Explorer -> Build, then Upgrade 1 Explorer." }
      ],
      "invader-ravage": [
        { id: "avarice", level: 1, hint: "Blight Cascade? Upgrade 1 Explorer/Town instead (before Dahan)." },
        { id: "ceaseless_mining", level: 1, hint: "Mining Lands (3+ Invaders): Disease affects Ravage like Build." }
      ]
    },
    levels: [
      { level: 0, difficulty: 1 },
      {
        level: 1, difficulty: 3, name: "Avarice Rewarded / Ceaseless Mining",
        effect: "Lands with 3+ Invaders are Mining lands. In Mining Lands: Build Cards cause Ravage Actions. Disease affects Ravage like Build. Blight Cascade? Upgrade 1 Invader instead.",
        fearCards: "3/3/3"
      },
      {
        level: 2, difficulty: 4, name: "Miners Come From Far and Wide",
        effect: "Setup: Add 1 Explorer in each land with no Dahan. Add 1 Disease and 1 City in the highest-numbered land with a Town Setup symbol.",
        setupRule: "Add 1 Explorer in each land with no Dahan. Add 1 Disease and 1 City in the highest-numbered land with a Town Setup symbol.",
        fearCards: "3/3/4"
      },
      {
        level: 3, difficulty: 5, name: "Mining Boom (I)",
        effect: "After the Build Step, on each board: Choose a land with Explorer. Upgrade 1 Explorer there.",
        fearCards: "3/4/4"
      },
      {
        level: 4, difficulty: 7, name: "Untapped Salt Deposits",
        effect: "Setup: Remove 'Coastal Lands' Stage II card. Place 'Salt Deposits' as 2nd Stage II card. (Order: 111-2S22-33333).",
        invaderDeck: '111222233333',
        setupRule: "Remove 'Coastal Lands'. Place 'Salt Deposits' as 2nd Stage II card.",
        fearCards: "4/4/4"
      },
      {
        level: 5, difficulty: 9, name: "Mining Boom (II)",
        effect: "Instead of Mining Boom (I), after the Build Step, on each board: Choose a land with Explorer. Build there, then Upgrade 1 Explorer. (Build normally in a Mining land.)",
        fearCards: "4/5/4"
      },
      {
        level: 6, difficulty: 10, name: "The Empire Ascendant",
        effect: "During Explore: On boards with 3 or fewer Blight: Add +1 Explorer in each land successfully explored. (Max. 2 lands per board per Explore Card.)",
        setupRule: "During Setup, apply the Explore rule immediately if board has <=3 Blight?",
        fearCards: "4/5/4"
      },
    ]
  }
];

export const SCENARIOS: Scenario[] = [
  { id: 'blitz', difficulty: 0, expansionId: ExpansionId.BASE },
  { id: 'guard-heart', difficulty: 0, expansionId: ExpansionId.BASE },
  { id: 'rituals-terror', difficulty: 3, expansionId: ExpansionId.BASE },
  { id: 'dahan-insurrection', difficulty: 4, expansionId: ExpansionId.BASE },
  { id: 'second-wave', difficulty: 1, expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'powers-forgotten', difficulty: 1, expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'ward-shores', difficulty: 2, expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'rituals-flame', difficulty: 3, expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'elemental-invocation', difficulty: 1, expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'despicable-theft', difficulty: 2, expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'great-river', difficulty: 3, expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'diversity-spirits', difficulty: 0, expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'varied-terrains', difficulty: 2, expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'destiny-unfolds', difficulty: -1, expansionId: ExpansionId.NATURE_INCARNATE },
  { id: 'surges-colonization', difficulty: 2, expansionId: ExpansionId.NATURE_INCARNATE },
];

export const GAME_PHASES: Phase[] = [
  {
    id: 'spirit-growth',
    category: PhaseCategory.SPIRIT,
    substeps: ['spirit-growth-step1', 'spirit-growth-step2', 'spirit-growth-step3'],
    color: 'text-emerald-600',
    iconName: 'Sprout'
  },
  {
    id: 'fast-power',
    category: PhaseCategory.FAST,
    substeps: ['fast-power-step1'],
    color: 'text-amber-600',
    iconName: 'Zap'
  },
  {
    id: 'invader-blight',
    category: PhaseCategory.INVADER,
    color: 'text-stone-500',
    iconName: 'Skull'
  },
  {
    id: 'invader-event',
    category: PhaseCategory.INVADER,
    requiresEvents: true,
    color: 'text-purple-600',
    iconName: 'Ghost'
  },
  {
    id: 'invader-fear',
    category: PhaseCategory.INVADER,
    color: 'text-indigo-600',
    iconName: 'ShieldAlert'
  },
  {
    id: 'invader-ravage',
    category: PhaseCategory.INVADER,
    color: 'text-red-600',
    iconName: 'Flame'
  },
  {
    id: 'invader-build',
    category: PhaseCategory.INVADER,
    color: 'text-orange-600',
    iconName: 'Construction'
  },
  {
    id: 'invader-explore',
    category: PhaseCategory.INVADER,
    color: 'text-blue-600',
    iconName: 'Flag'
  },
  {
    id: 'invader-advance',
    category: PhaseCategory.INVADER,
    color: 'text-stone-500',
    iconName: 'ArrowRightCircle'
  },
  {
    id: 'slow-power',
    category: PhaseCategory.SLOW,
    color: 'text-blue-800',
    iconName: 'Hourglass'
  },
  {
    id: 'time-passes',
    category: PhaseCategory.TIME,
    color: 'text-teal-600',
    iconName: 'Sun'
  }
];

export const PHASE_BG_COLORS: Record<PhaseCategory, string> = {
  [PhaseCategory.SPIRIT]: 'bg-emerald-50 border-emerald-200',
  [PhaseCategory.FAST]: 'bg-amber-50 border-amber-200',
  [PhaseCategory.INVADER]: 'bg-stone-100 border-stone-200',
  [PhaseCategory.SLOW]: 'bg-blue-50 border-blue-200',
  [PhaseCategory.TIME]: 'bg-teal-50 border-teal-200',
};

// Helper to render icons dynamically
export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'Sprout': return <Sprout {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'Skull': return <Skull {...props} />;
    case 'Ghost': return <Ghost {...props} />;
    case 'ShieldAlert': return <ShieldAlert {...props} />;
    case 'Flame': return <Flame {...props} />;
    case 'Construction': return <Tent {...props} />; // Using Tent/Village icon
    case 'Map': return <Map {...props} />;
    case 'Flag': return <Ship {...props} />; // Using Ship for Explore/Arrival
    case 'ArrowRightCircle': return <ArrowRightCircle {...props} />;
    case 'Hourglass': return <Hourglass {...props} />;
    case 'Sun': return <Sun {...props} />;
    default: return <Leaf {...props} />;
  }
};