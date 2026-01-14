
export enum PhaseCategory {
  SPIRIT = 'Geister-Phase',
  FAST = 'Schnelle Kräfte',
  INVADER = 'Invasoren-Phase',
  SLOW = 'Langsame Kräfte',
  TIME = 'Zeit verstreicht'
}

export interface Phase {
  id: string;
  name: string;
  category: PhaseCategory;
  description: string;
  substeps?: string[];
  color: string;
  iconName: string;
  requiresEvents?: boolean; // If true, only show if events are enabled
}

export interface GameState {
  round: number;
  currentPhaseIndex: number;
  history: string[];
}


export enum ExpansionId {
  BASE = 'base',
  BRANCH_AND_CLAW = 'branch_and_claw',
  JAGGED_EARTH = 'jagged_earth',
  NATURE_INCARNATE = 'nature_incarnate',
  HORIZONS = 'horizons',
  FEATHER_AND_FLAME = 'feather_and_flame'
}

export interface Spirit {
  id: string;
  name: string;
  expansionId: ExpansionId;
}

export interface Adversary {
  id: string;
  name: string;
  levels: { level: number; difficulty: number }[];
  expansionId: ExpansionId;
}

export interface Scenario {
  id: string;
  name: string;
  difficulty: number;
  expansionId: ExpansionId;
}

export interface GameSettings {
  playerCount: number;
  expansions: ExpansionId[];
  selectedSpirits: Spirit[];
  adversary?: {
    id: string;
    level: number;
  };
  scenario?: string;
}

export interface GameResult {
  id: string;
  date: string;
  outcome: 'victory' | 'defeat';
  score: number;
  difficulty: number;
  playerCount: number;
  spirits: Spirit[];
  duration: string;
  adversary?: {
    name: string;
    level: number;
  };
  scenario?: string;
  expansions: ExpansionId[];
}
