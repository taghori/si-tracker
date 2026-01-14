import React, { useState } from 'react';
import { X, Trophy, Skull, Calculator, Clock, Save, Flame, TreeDeciduous, Play } from 'lucide-react';
import { GameResult, Spirit, GameSettings } from '../types';
import { ADVERSARIES, SCENARIOS } from '../constants';
import { useI18n } from '../services/i18n';

interface ScoringDialogProps {
  playerCount: number;
  spirits: Spirit[];
  elapsedTime: string;
  settings: GameSettings;
  onClose: () => void;
  onSaveGame: (result: GameResult) => void;
}

type GameOutcome = 'victory' | 'defeat';

const ScoringDialog: React.FC<ScoringDialogProps> = ({ playerCount, spirits, elapsedTime, settings, onClose, onSaveGame }) => {
  const { t } = useI18n();
  const [step, setStep] = useState<'input' | 'result'>('input');

  // Calculate initial difficulty from settings
  const initialDifficulty = React.useMemo(() => {
    let diff = 0;
    if (settings.adversary) {
      const adv = ADVERSARIES.find(a => a.id === settings.adversary?.id);
      const lvl = adv?.levels.find(l => l.level === settings.adversary?.level);
      diff += lvl?.difficulty || 0;
    }
    if (settings.scenario) {
      const sce = SCENARIOS.find(s => s.id === settings.scenario);
      diff += sce?.difficulty || 0;
    }
    return diff;
  }, [settings]);

  // Scoring State
  const [outcome, setOutcome] = useState<GameOutcome>('victory');
  const [difficulty, setDifficulty] = useState<number>(initialDifficulty);
  const [dahan, setDahan] = useState<number>(0);
  const [blight, setBlight] = useState<number>(0);
  const [invaderCards, setInvaderCards] = useState<number>(0);

  const calculateDetails = () => {
    let baseScore = 0;
    let invaderScore = 0;

    // 1. Victory/Defeat Base & Invader Cards
    if (outcome === 'victory') {
      baseScore = (5 * difficulty) + 10;
      // Rule: +2 per card remaining in deck
      invaderScore = invaderCards * 2;
    } else {
      baseScore = (2 * difficulty);
      // Rule: +1 per card face up or in discard (cards NOT in deck)
      invaderScore = invaderCards * 1;
    }

    // 2. Dahan: +1 per X surviving Dahan (X = PlayerCount)
    // Formula: floor(Dahan / PlayerCount)
    const dahanPoints = Math.floor(dahan / playerCount);

    // 3. Blight: -1 per X Blight on island (X = PlayerCount)
    // Formula: floor(Blight / PlayerCount)
    const blightPenalty = Math.floor(blight / playerCount);

    const totalScore = baseScore + invaderScore + dahanPoints - blightPenalty;

    return {
      baseScore,
      invaderScore,
      dahanPoints,
      blightPenalty,
      totalScore
    };
  };

  const details = calculateDetails();

  const handleSave = () => {
    const adv = ADVERSARIES.find(a => a.id === settings.adversary?.id);
    const sce = SCENARIOS.find(s => s.id === settings.scenario);

    const result: GameResult = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      outcome,
      score: details.totalScore,
      difficulty,
      playerCount,
      spirits,
      duration: elapsedTime,
      expansions: settings.expansions,
      adversary: adv ? { name: t(`adversaries.${adv.id}`), level: settings.adversary!.level, id: adv.id } : undefined,
      scenario: sce ? t(`scenarios.${sce.id}`) : undefined,
      scenarioId: sce?.id
    };
    onSaveGame(result);
  };

  if (step === 'result') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-md p-4 animate-fade-in">
        <div className="bg-parchment-100 border border-stone-300 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl overflow-hidden relative">

          {/* Confetti/Bg Effect */}
          <div className={`absolute inset-0 pointer-events-none opacity-20 ${outcome === 'victory' ? 'bg-amber-100' : 'bg-stone-200'}`} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />

          <div className="p-8 text-center flex flex-col items-center relative z-10">
            {outcome === 'victory' ? (
              <div className="w-24 h-24 rounded-full bg-amber-50 border-4 border-amber-200 flex items-center justify-center mb-6 shadow-xl text-amber-500">
                <Trophy className="w-12 h-12" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-stone-100 border-4 border-stone-200 flex items-center justify-center mb-6 shadow-xl text-stone-500">
                <Skull className="w-12 h-12" />
              </div>
            )}

            <h2 className={`text-3xl font-serif font-bold mb-2 ${outcome === 'victory' ? 'text-amber-700' : 'text-stone-700'}`}>
              {outcome === 'victory' ? t('scoring.victory_msg') : t('scoring.defeat_msg')}
            </h2>
            <div className="flex items-center gap-2 text-stone-500 mb-8 font-mono text-sm font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>{t('common.duration')}: {elapsedTime}</span>
            </div>

            <div className="w-full bg-white/70 rounded-xl p-6 mb-8 border border-stone-200 shadow-sm">
              <span className="block text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">{t('scoring.total_score')}</span>
              <span className={`text-7xl font-serif font-bold ${outcome === 'victory' ? 'text-amber-600' : 'text-stone-600'}`}>
                {details.totalScore}
              </span>
            </div>

            {/* Breakdown */}
            <div className="w-full text-sm space-y-3 text-stone-600 mb-8 border-t border-stone-200 pt-6">
              <div className="flex justify-between font-medium">
                <span>{t('scoring.breakdown_base', { outcome: t(`common.${outcome}`), diff: difficulty })}</span>
                <span className="font-bold">{details.baseScore}</span>
              </div>

              <div className="flex justify-between text-indigo-700/80">
                <span>{t('scoring.breakdown_invaders', { count: invaderCards, multiplier: outcome === 'victory' ? 2 : 1 })}</span>
                <span className="font-bold">+{details.invaderScore}</span>
              </div>

              <div className="flex justify-between text-emerald-700/80">
                <span>{t('scoring.breakdown_dahan', { count: dahan, players: playerCount })}</span>
                <span className="font-bold">+{details.dahanPoints}</span>
              </div>

              <div className="flex justify-between text-red-600/80">
                <span>{t('scoring.breakdown_blight', { count: blight, players: playerCount })}</span>
                <span className="font-bold">-{details.blightPenalty}</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg text-white
                ${outcome === 'victory' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-stone-700 hover:bg-stone-600'}
              `}
            >
              <Save className="w-5 h-5" />
              {t('scoring.save_and_exit')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Input Step
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-parchment-100 border border-stone-300 rounded-2xl w-full max-md flex flex-col shadow-2xl relative overflow-hidden">

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between p-6 border-b border-stone-300 bg-parchment-200/50">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-stone-600" />
            <h2 className="text-xl font-serif font-bold text-stone-800">{t('scoring.title')}</h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative z-10 p-6 space-y-6 overflow-y-auto max-h-[70vh] custom-scrollbar">

          {/* Outcome */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setOutcome('victory')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${outcome === 'victory'
                ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-md'
                : 'bg-white border-stone-200 text-stone-400 hover:border-amber-200 hover:text-amber-500'
                }`}
            >
              <Trophy className="w-8 h-8" />
              <span className="font-bold">{t('common.victory')}</span>
            </button>
            <button
              onClick={() => setOutcome('defeat')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${outcome === 'defeat'
                ? 'bg-stone-100 border-stone-400 text-stone-700 shadow-md'
                : 'bg-white border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-600'
                }`}
            >
              <Skull className="w-8 h-8" />
              <span className="font-bold">{t('common.defeat')}</span>
            </button>
          </div>

          {/* Difficulty */}
          <div className="bg-white/50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-stone-500 uppercase tracking-wider font-bold text-xs">{t('common.difficulty')}</label>
              <span className="text-amber-600 font-serif font-bold text-2xl">{difficulty}</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Dahan */}
          <div className="bg-white/50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <TreeDeciduous className="w-4 h-4 text-emerald-600" />
                <label className="text-stone-500 uppercase tracking-wider font-bold text-xs">{t('scoring.input_dahan')}</label>
              </div>
              <span className="text-emerald-600 font-serif font-bold text-2xl">{dahan}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDahan(Math.max(0, dahan - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 font-bold"
              >-</button>
              <input
                type="number"
                value={dahan}
                onChange={(e) => setDahan(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 h-10 bg-white border border-stone-300 rounded-lg text-center font-bold text-stone-800 outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => setDahan(dahan + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 font-bold"
              >+</button>
            </div>
            <p className="text-xs text-emerald-700/70 font-medium text-center bg-emerald-50 py-1 px-2 rounded">
              {t('scoring.points_per_dahan', { count: playerCount, points: Math.floor(dahan / playerCount) })}
            </p>
          </div>

          {/* Blight */}
          <div className="bg-white/50 p-4 rounded-xl border border-stone-200 space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500" />
                <label className="text-stone-500 uppercase tracking-wider font-bold text-xs">{t('scoring.input_blight')}</label>
              </div>
              <span className="text-red-500 font-serif font-bold text-2xl">{blight}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBlight(Math.max(0, blight - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 font-bold"
              >-</button>
              <input
                type="number"
                value={blight}
                onChange={(e) => setBlight(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 h-10 bg-white border border-stone-300 rounded-lg text-center font-bold text-stone-800 outline-none focus:border-red-500"
              />
              <button
                onClick={() => setBlight(blight + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 font-bold"
              >+</button>
            </div>
            <p className="text-xs text-red-600/70 font-medium text-center bg-red-50 py-1 px-2 rounded">
              {t('scoring.points_per_blight', { count: playerCount, points: Math.floor(blight / playerCount) })}
            </p>
          </div>

          {/* Invader Cards */}
          <div className="bg-white/50 p-4 rounded-xl border border-stone-200 space-y-3 animate-fade-in">
            <div className="flex justify-between items-end">
              <label className="text-stone-500 uppercase tracking-wider font-bold text-xs max-w-[70%]">
                {outcome === 'victory' ? t('scoring.input_invader_cards_victory') : t('scoring.input_invader_cards_defeat')}
              </label>
              <span className="text-indigo-500 font-serif font-bold text-2xl">{invaderCards}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setInvaderCards(Math.max(0, invaderCards - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 font-bold"
              >-</button>
              <input
                type="number"
                value={invaderCards}
                onChange={(e) => setInvaderCards(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 h-10 bg-white border border-stone-300 rounded-lg text-center font-bold text-stone-800 outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => setInvaderCards(invaderCards + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 font-bold"
              >+</button>
            </div>
            <p className="text-xs text-indigo-600/70 font-medium text-center bg-indigo-50 py-1 px-2 rounded">
              {t('scoring.points_per_card', { multiplier: outcome === 'victory' ? 2 : 1 })}
            </p>
          </div>

        </div>

        <div className="relative z-10 p-6 border-t border-stone-300 bg-parchment-200/50">
          <button
            onClick={() => setStep('result')}
            className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-900/20 transition-all"
          >
            <Calculator className="w-5 h-5" />
            {t('scoring.calculate')}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ScoringDialog;