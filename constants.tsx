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
    expansionId: ExpansionId.BRANCH_AND_CLAW,
    levels: [
      { level: 0, difficulty: 2 },
      { level: 1, difficulty: 3 },
      { level: 2, difficulty: 5 },
      { level: 3, difficulty: 7 },
      { level: 4, difficulty: 8 },
      { level: 5, difficulty: 9 },
      { level: 6, difficulty: 10 },
    ]
  },
  {
    id: 'habsburg',
    expansionId: ExpansionId.JAGGED_EARTH,
    levels: [
      { level: 0, difficulty: 2 },
      { level: 1, difficulty: 3 },
      { level: 2, difficulty: 5 },
      { level: 3, difficulty: 6 },
      { level: 4, difficulty: 8 },
      { level: 5, difficulty: 9 },
      { level: 6, difficulty: 10 },
    ]
  },
  {
    id: 'russia',
    expansionId: ExpansionId.JAGGED_EARTH,
    levels: [
      { level: 0, difficulty: 1 },
      { level: 1, difficulty: 3 },
      { level: 2, difficulty: 4 },
      { level: 3, difficulty: 6 },
      { level: 4, difficulty: 7 },
      { level: 5, difficulty: 9 },
      { level: 6, difficulty: 11 },
    ]
  },
  {
    id: 'scotland',
    expansionId: ExpansionId.FEATHER_AND_FLAME,
    levels: [
      { level: 0, difficulty: 1 },
      { level: 1, difficulty: 3 },
      { level: 2, difficulty: 4 },
      { level: 3, difficulty: 6 },
      { level: 4, difficulty: 7 },
      { level: 5, difficulty: 8 },
      { level: 6, difficulty: 10 },
    ]
  },
  {
    id: 'habsburg-mining',
    expansionId: ExpansionId.NATURE_INCARNATE,
    levels: [
      { level: 0, difficulty: 1 },
      { level: 1, difficulty: 3 },
      { level: 2, difficulty: 4 },
      { level: 3, difficulty: 5 },
      { level: 4, difficulty: 7 },
      { level: 5, difficulty: 9 },
      { level: 6, difficulty: 10 },
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