import React from 'react';
import { Phase, GameSettings } from '../types';
import { getIcon, PHASE_BG_COLORS, ADVERSARIES } from '../constants';
import { useI18n } from '../services/i18n';
import { AlertTriangle } from 'lucide-react';

interface PhaseCardProps {
  phase: Phase;
  round: number;
  settings?: GameSettings; // Pass settings to check for ADVERSARY
  invaderStage?: number;
  invaderDeck?: number[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, round, settings, invaderStage = 1, invaderDeck }) => {
  const { t } = useI18n();
  // Use the color definitions from constants
  const bgClass = PHASE_BG_COLORS[phase.category] || 'bg-stone-50';

  // Get translated content
  const phaseName = t(`phases.${phase.id}.name`) || phase.name;
  const phaseDesc = t(`phases.${phase.id}.desc`) || phase.description;
  const phaseSubsteps = t(`phases.${phase.id}.substeps`) as string[] || phase.substeps;

  // -- Adversary Hint Logic --
  const hints: string[] = [];
  if (settings?.adversary?.id) {
    const adv = ADVERSARIES.find(a => a.id === settings.adversary!.id);
    if (adv?.phaseHints?.[phase.id]) {
      const hintList = adv.phaseHints[phase.id];
      // Iterate through all potential hints for this phase
      hintList.forEach(item => {
        // escalation check: if hint contains "Escalation", only show if stage is 2
        // We use a simple string includes check on the default hint OR ID for now.
        const isEscalation = (item.id === 'escalation') || item.hint.includes("Escalation") || item.hint.includes("Eskalation");
        if (isEscalation && invaderStage !== 2) {
          return; // Skip if not stage 2
        }

        if (settings.adversary!.level >= item.level) {
          let text = item.hint;
          // Try translation if ID is present
          if (item.id) {
            const key = `adversary_data.${settings.adversary!.id}.phaseHints.${item.id}`;
            const translated = t(key);
            // Check if translation exists (different from key) AND is not just the key returned by fallback
            if (translated && translated !== key) {
              text = translated;
            }
          }
          hints.push(text);
        }
      });
    }
  }

  return (
    <div className={`relative w-full max-w-2xl mx-auto p-1 rounded-2xl bg-white shadow-lg border border-stone-200/60 transition-all`}>
      <div className={`relative h-full w-full rounded-xl p-4 md:p-8 flex flex-col items-center text-center transition-all duration-500 overflow-hidden ${bgClass}`}>

        {/* Background Ambient Effect (Subtle Texture) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20 md:opacity-30 mix-blend-multiply pointer-events-none" />

        {/* Header Icon */}
        <div className={`p-2 md:p-4 rounded-full bg-white border border-stone-100 shadow-sm mb-3 md:mb-6 ${phase.color}`}>
          {getIcon(phase.iconName, "w-8 h-8 md:w-10 md:h-10")}
        </div>

        {/* Titles */}
        <h2 className="text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] text-stone-500 uppercase mb-1 md:mb-3">
          {t('common.round')} {round} — {phaseName}
        </h2>
        <h1 className="text-2xl md:text-5xl font-serif font-bold text-stone-800 mb-3 md:mb-6 drop-shadow-sm leading-tight">
          {phaseName}
        </h1>

        {/* Description */}
        <p className="text-base md:text-xl text-stone-600 mb-4 md:mb-8 font-serif leading-relaxed px-2">
          {phaseDesc}
        </p>

        {/* Adversary Hint Alert */}
        {hints.length > 0 && (
          <div className="w-full bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200 shadow-sm animate-pulse-slow">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                {t('adversary_rules.title')}
              </span>
            </div>
            {hints.map((hint, i) => (
              <p key={i} className="text-sm md:text-base font-medium text-amber-900 leading-relaxed italic border-b border-amber-200/50 last:border-0 pb-1 last:pb-0 mb-1 last:mb-0">
                "{hint}"
              </p>
            ))}
          </div>
        )}

        {/* Substeps */}
        {Array.isArray(phaseSubsteps) && phaseSubsteps.length > 0 && (
          <div className="w-full bg-white/60 rounded-xl p-5 mb-8 border border-stone-200/50 shadow-sm">
            <ul className="text-left space-y-3">
              {phaseSubsteps.map((step: string, idx: number) => (
                <li key={idx} className="flex items-start text-stone-700">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${phase.color.replace('text-', 'bg-')}`} />
                  <span className="font-medium">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Invader Track Reminder */}
        {invaderDeck && (
          <div className="w-full mt-auto pt-6 border-t border-stone-200/50">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
              {t('common.invader_track_title') || "INVADER TRACK"}
            </h3>
            <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
              {/* High Immigration (England Only) */}
              {settings?.adversary?.id === 'england' && (
                <div className={`flex flex-col items-center p-2 rounded-lg border ${round - 3 >= 0 ? 'bg-amber-50 border-amber-200' : 'bg-stone-50 border-stone-100 opacity-50'}`}>
                  <span className="text-[9px] font-bold text-stone-500 uppercase mb-0.5">High Imm.</span>
                  <span className="font-serif font-bold text-lg text-stone-800 leading-none">
                    {round - 3 >= 0 ? (invaderDeck[round - 3] === 1 ? 'I' : invaderDeck[round - 3] === 2 ? 'II' : 'III') : '-'}
                  </span>
                </div>
              )}

              {/* Ravage */}
              <div className={`flex flex-col items-center p-2 rounded-lg border min-w-[60px] ${round - 2 >= 0 ? 'bg-red-50 border-red-200' : 'bg-stone-50 border-stone-100 opacity-50'}`}>
                <span className="text-[9px] font-bold text-stone-500 uppercase mb-0.5">{getIcon('Flame', "w-3 h-3 inline mr-1")}{t('phases.invader-ravage.name').split(' ')[0]}</span>
                <span className="font-serif font-bold text-lg text-stone-800 leading-none">
                  {round - 2 >= 0 ? (invaderDeck[round - 2] === 1 ? 'I' : invaderDeck[round - 2] === 2 ? 'II' : 'III') : '-'}
                </span>
              </div>

              {/* Build */}
              <div className={`flex flex-col items-center p-2 rounded-lg border min-w-[60px] ${round - 1 >= 0 ? 'bg-orange-50 border-orange-200' : 'bg-stone-50 border-stone-100 opacity-50'}`}>
                <span className="text-[9px] font-bold text-stone-500 uppercase mb-0.5">{getIcon('Construction', "w-3 h-3 inline mr-1")}{t('phases.invader-build.name').split(' ')[0]}</span>
                <span className="font-serif font-bold text-lg text-stone-800 leading-none">
                  {round - 1 >= 0 ? (invaderDeck[round - 1] === 1 ? 'I' : invaderDeck[round - 1] === 2 ? 'II' : 'III') : '-'}
                </span>
              </div>

              {/* Explore */}
              <div className={`flex flex-col items-center p-2 rounded-lg border min-w-[60px] bg-blue-50 border-blue-200`}>
                <span className="text-[9px] font-bold text-stone-500 uppercase mb-0.5">{getIcon('Flag', "w-3 h-3 inline mr-1")}{t('phases.invader-explore.name').split(' ')[0]}</span>
                <span className={`font-serif font-bold text-lg leading-none ${invaderDeck[round] === undefined ? 'text-red-500' : 'text-stone-800'}`}>
                  {invaderDeck[round] ? (invaderDeck[round] === 1 ? 'I' : invaderDeck[round] === 2 ? 'II' : 'III') : (invaderDeck[round] === undefined ? '∅' : '-')}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PhaseCard;