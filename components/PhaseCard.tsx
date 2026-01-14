import React from 'react';
import { Phase } from '../types';
import { getIcon, PHASE_BG_COLORS } from '../constants';
import { useI18n } from '../services/i18n';

interface PhaseCardProps {
  phase: Phase;
  round: number;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, round }) => {
  const { t } = useI18n();
  // Use the color definitions from constants
  const bgClass = PHASE_BG_COLORS[phase.category] || 'bg-stone-50';

  // Get translated content
  const phaseName = t(`phases.${phase.id}.name`) || phase.name;
  const phaseDesc = t(`phases.${phase.id}.desc`) || phase.description;
  const phaseSubsteps = t(`phases.${phase.id}.substeps`) as string[] || phase.substeps;
  const categoryName = t(`phases.${phase.id}.name`); // Usually the same, but could be specific

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

      </div>
    </div>
  );
};

export default PhaseCard;