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
  { id: ExpansionId.BASE, name: 'Basisspiel' },
  { id: ExpansionId.BRANCH_AND_CLAW, name: 'Ast und Tatze' },
  { id: ExpansionId.JAGGED_EARTH, name: 'Zerklüftete Erde' },
  { id: ExpansionId.HORIZONS, name: 'Horizonte' },
  { id: ExpansionId.NATURE_INCARNATE, name: 'Nature Incarnate' },
  { id: ExpansionId.FEATHER_AND_FLAME, name: 'Feder und Flamme' },
];

export const SPIRITS: Spirit[] = [
  // Base
  { id: 'river', name: 'Sonnengenährter Fluss', expansionId: ExpansionId.BASE },
  { id: 'lightning', name: 'Pfeilschneller Blitzschlag', expansionId: ExpansionId.BASE },
  { id: 'shadows', name: 'Flackernde Schatten', expansionId: ExpansionId.BASE },
  { id: 'earth', name: 'Lebenskraft der Erde', expansionId: ExpansionId.BASE },
  { id: 'thunderspeaker', name: 'Donnerrufer', expansionId: ExpansionId.BASE },
  { id: 'green', name: 'Wucherndes Grün', expansionId: ExpansionId.BASE },
  { id: 'ocean', name: 'Hunger des Ozeans', expansionId: ExpansionId.BASE },
  { id: 'bringer', name: 'Bote der Alpträume', expansionId: ExpansionId.BASE },
  // B&C
  { id: 'keeper', name: 'Hüter der verbotenen Wildnis', expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'fangs', name: 'Scharfe Zähne hinter den Blättern', expansionId: ExpansionId.BRANCH_AND_CLAW },
  // Jagged Earth
  { id: 'volcano', name: 'Vulkan, der sich hoch auftürmt', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'mist', name: 'Nebel aus Nichts', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'vengeance', name: 'Rache als brennende Plage', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'stone', name: 'Unnachgiebig wie Stein', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'many-minds', name: 'Viele Geister bewegen sich als Einer', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'lure', name: 'Lockruf der tiefsten Wildnis', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'starlight', name: 'Sternenlicht sucht seine Gestalt', expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'fractured', name: 'Zersplitterte Tage spalten den Himmel', expansionId: ExpansionId.JAGGED_EARTH },
  // Feather and Flame
  { id: 'wildfire', name: 'Herz des Lauffeuers', expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'serpent', name: 'Schlummernde Schlange unter der Insel', expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'downpour', name: 'Regenguss durchnässt die Welt', expansionId: ExpansionId.FEATHER_AND_FLAME },
  { id: 'finder', name: 'Finder unsichtbarer Pfade', expansionId: ExpansionId.FEATHER_AND_FLAME },
  // Horizons (German translations approximated where official not strictly defined in context, but standardizing)
  { id: 'eyes', name: 'Wachsame Augen in den Bäumen', expansionId: ExpansionId.HORIZONS },
  { id: 'mud', name: 'Sumpf, der alles verschlingt', expansionId: ExpansionId.HORIZONS },
  { id: 'heat', name: 'Aufsteigende Hitze aus Stein und Sand', expansionId: ExpansionId.HORIZONS },
  { id: 'whirlwind', name: 'Spielender Sonnen-Wirbelwind', expansionId: ExpansionId.HORIZONS },
  { id: 'teeth', name: 'Zähne, die im Verborgenen lauern', expansionId: ExpansionId.HORIZONS },
];

export const ADVERSARIES: Adversary[] = [
  {
    id: 'prussia',
    name: 'Königreich Brandenburg-Preußen',
    expansionId: ExpansionId.BASE,
    levels: [
      { level: 0, difficulty: 1 },
      { level: 1, difficulty: 2 },
      { level: 2, difficulty: 4 },
      { level: 3, difficulty: 6 },
      { level: 4, difficulty: 7 },
      { level: 5, difficulty: 9 },
      { level: 6, difficulty: 10 },
    ]
  },
  {
    id: 'england',
    name: 'Königreich England',
    expansionId: ExpansionId.BASE,
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
    id: 'sweden',
    name: 'Königreich Schweden',
    expansionId: ExpansionId.BASE,
    levels: [
      { level: 0, difficulty: 1 },
      { level: 1, difficulty: 2 },
      { level: 2, difficulty: 3 },
      { level: 3, difficulty: 5 },
      { level: 4, difficulty: 6 },
      { level: 5, difficulty: 7 },
      { level: 6, difficulty: 8 },
    ]
  },
  {
    id: 'france',
    name: 'Königreich Frankreich (Plantage)',
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
    name: 'Habsburger Monarchie (Viehzucht)',
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
    name: 'Zarentum Russland',
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
    name: 'Königreich Schottland',
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
  }
];

export const SCENARIOS: Scenario[] = [
  { id: 'blitz', name: 'Blitz', difficulty: 0, expansionId: ExpansionId.BASE },
  { id: 'dahan-insurrection', name: 'Aufstand der Dahan', difficulty: 4, expansionId: ExpansionId.BASE },
  { id: 'guard-heart', name: 'Wacht über das Herz der Insel', difficulty: 0, expansionId: ExpansionId.BASE },
  { id: 'rituals-terror', name: 'Rituale des Terrors', difficulty: 3, expansionId: ExpansionId.BASE },
  { id: 'ward-shores', name: 'Schutz der Küsten', difficulty: 2, expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'powers-forgotten', name: 'Längst vergessene Mächte', difficulty: 1, expansionId: ExpansionId.BRANCH_AND_CLAW },
  { id: 'elemental-invocation', name: 'Beschwörung der Elemente', difficulty: 0, expansionId: ExpansionId.JAGGED_EARTH },
  { id: 'desperation', name: 'Verzweiflung', difficulty: 1, expansionId: ExpansionId.JAGGED_EARTH },
];

export const GAME_PHASES: Phase[] = [
  {
    id: 'spirit-growth',
    name: 'Geister-Phase',
    category: PhaseCategory.SPIRIT,
    description: 'Wachsen, Energie erhalten und Fähigkeitenkarten spielen.',
    substeps: ['Wachstumsoption wählen', 'Energie erhalten', 'Karten spielen (Energie bezahlen)'],
    color: 'text-emerald-600',
    iconName: 'Sprout'
  },
  {
    id: 'fast-power',
    name: 'Schnelle Kräfte',
    category: PhaseCategory.FAST,
    description: 'Schnelle Fähigkeiten (Vogel-Symbol) und angeborene Fähigkeiten abhandeln.',
    substeps: ['Geister und Invasoren agieren hier gleichzeitig'],
    color: 'text-amber-600',
    iconName: 'Zap'
  },
  {
    id: 'invader-blight',
    name: 'Verödete Insel',
    category: PhaseCategory.INVADER,
    description: 'Prüfe den Effekt der Karte "Verödete Insel", falls die Insel verödet ist.',
    color: 'text-stone-500',
    iconName: 'Skull'
  },
  {
    id: 'invader-event',
    name: 'Ereignis',
    category: PhaseCategory.INVADER,
    description: 'Ziehe und handle eine Ereigniskarte ab (Ast & Tatze / Zerklüftete Erde).',
    requiresEvents: true,
    color: 'text-purple-600',
    iconName: 'Ghost'
  },
  {
    id: 'invader-fear',
    name: 'Furcht',
    category: PhaseCategory.INVADER,
    description: 'Verdiente Furchtkarten umdrehen und abhandeln.',
    color: 'text-indigo-600',
    iconName: 'ShieldAlert'
  },
  {
    id: 'invader-ravage',
    name: 'Wüten',
    category: PhaseCategory.INVADER,
    description: 'Invasoren fügen dem Land und den Dahan Schaden zu.',
    color: 'text-red-600',
    iconName: 'Flame'
  },
  {
    id: 'invader-build',
    name: 'Bauen',
    category: PhaseCategory.INVADER,
    description: 'Invasoren bauen Dörfer oder Städte in Gebieten mit Invasoren.',
    color: 'text-orange-600',
    iconName: 'Construction'
  },
  {
    id: 'invader-explore',
    name: 'Entdecken',
    category: PhaseCategory.INVADER,
    description: 'Invasoren erkunden neue Gebiete (Karte aufdecken).',
    color: 'text-blue-600',
    iconName: 'Flag' // Using Flag for Explore/Expedition vibe
  },
  {
    id: 'invader-advance',
    name: 'Invasorenkarten',
    category: PhaseCategory.INVADER,
    description: 'Schiebe alle Invasorenkarten einen Platz nach links.',
    color: 'text-stone-500',
    iconName: 'ArrowRightCircle'
  },
  {
    id: 'slow-power',
    name: 'Langsame Kräfte',
    category: PhaseCategory.SLOW,
    description: 'Langsame Fähigkeiten (Schildkröten-Symbol) abhandeln.',
    color: 'text-blue-800',
    iconName: 'Hourglass'
  },
  {
    id: 'time-passes',
    name: 'Zeit verstreicht',
    category: PhaseCategory.TIME,
    description: 'Schaden heilen, Karten ablegen, Elemente zurücksetzen.',
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