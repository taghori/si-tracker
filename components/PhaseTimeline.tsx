import React, { useRef, useEffect } from 'react';
import { Phase } from '../types';
import { getIcon } from '../constants';
import { useI18n } from '../services/i18n';

interface PhaseTimelineProps {
  phases: Phase[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const PhaseTimeline: React.FC<PhaseTimelineProps> = ({ phases, currentIndex, onSelect }) => {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="w-full bg-white/60 border-y border-stone-200 backdrop-blur-md py-2 md:py-4 shadow-sm overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto px-4 md:px-12 no-scrollbar snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {phases.map((phase, idx) => {
          const isActive = idx === currentIndex;
          const isPast = idx < currentIndex;
          const phaseName = t(`phases.${phase.id}.name`) || phase.name;

          return (
            <button
              key={`${phase.id}-${idx}`}
              onClick={() => onSelect(idx)}
              className={`
                relative flex-shrink-0 flex flex-col items-center justify-center min-w-[70px] md:min-w-[100px] py-1 md:py-2 px-1 rounded-xl transition-all duration-300 snap-center group
                ${isActive ? 'opacity-100 scale-105 bg-white shadow-md border border-stone-100' : 'opacity-50 hover:opacity-80 hover:bg-stone-100/50'}
                ${isPast ? 'grayscale opacity-30' : ''}
              `}
            >
              <div className={`
                p-1.5 md:p-2 rounded-full mb-1 md:mb-2 transition-all duration-300
                ${isActive ? `bg-stone-50` : ''}
              `}>
                <div className={isActive ? phase.color : 'text-stone-400'}>
                  {getIcon(phase.iconName)}
                </div>
              </div>
              <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide truncate max-w-full ${isActive ? 'text-stone-800' : 'text-stone-400'}`}>
                {phaseName}
              </span>

              {isActive && (
                <div className="absolute -bottom-1 w-12 h-1 bg-teal-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PhaseTimeline;