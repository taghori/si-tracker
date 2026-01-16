import React from 'react';
import { GameSettings } from '../types';
import { useI18n } from '../services/i18n';
import { ADVERSARIES } from '../constants';
import { Shield, Play, AlertCircle, FileText, Component } from 'lucide-react';

interface SetupDialogProps {
    settings: GameSettings;
    onConfirm: () => void;
    onCancel: () => void;
}

const SetupDialog: React.FC<SetupDialogProps> = ({ settings, onConfirm, onCancel }) => {
    const { t } = useI18n();

    const adversary = settings.adversary
        ? ADVERSARIES.find(a => a.id === settings.adversary?.id)
        : null;

    const currentLevel = settings.adversary?.level || 0;

    // Find level details (cumulative or specific)
    const activeLevelDetails = adversary?.levels[currentLevel];

    // Helper to find specific setup rules from level 1 up to current
    // Many adversaries have setup changes at multiple levels (e.g. Prussia Lvl 1 and 2)
    const getSetupRules = () => {
        if (!adversary) return [];

        const rules: { level: number; rule: string }[] = [];

        for (let i = 1; i <= currentLevel; i++) {
            const lvl = adversary.levels[i];

            // Try to find translation for the rule
            const keyBase = `adversary_data.${adversary.id}.levels.${i}`;
            // In our JSON structure, we put setup text in "effect" mostly.
            // Check if we have a specific translation
            const translatedEffect = t(`${keyBase}.effect`);

            let ruleText: string | null = null;

            const setupRuleKey = `${keyBase}.setup_rule`;
            const translatedSetupRule = t(setupRuleKey);
            const hasTranslatedSetupRule = translatedSetupRule && translatedSetupRule !== setupRuleKey;

            if (lvl.setupRule !== undefined || hasTranslatedSetupRule) {
                const ruleText = hasTranslatedSetupRule ? translatedSetupRule : lvl.setupRule;
                if (ruleText) {
                    rules.push({ level: i, rule: ruleText });
                }
            }

            // Legacy/Combined logic fallback (if no explicit setupRule found above, check existing flags)
            // But be careful not to duplicate if we just added it.
            // If we handled it via setupRule logic, continue.
            if (lvl.setupRule !== undefined || hasTranslatedSetupRule) {
                // Already handled
            } else if (lvl.isSetup) {
                rules.push({ level: i, rule: translatedEffect && translatedEffect !== `${keyBase}.effect` ? translatedEffect : (lvl.effect || "") });
            } else if (lvl.effect && (lvl.effect.includes("Setup") || lvl.effect.includes("During Setup"))) {
                // Fallback for non-migrated adversaries or just in case
                rules.push({ level: i, rule: translatedEffect && translatedEffect !== `${keyBase}.effect` ? translatedEffect : lvl.effect });
            }
        }



        return rules;
    };

    const setupInstructionList = getSetupRules();

    if (!adversary) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-parchment-100 border border-stone-300 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />

                {/* Header */}
                <div className="relative flex items-center justify-between p-6 bg-parchment-200/80 border-b border-stone-300 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 shadow-sm">
                            <Shield className="w-6 h-6 text-amber-700" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-stone-800">
                                {t('adversary_rules.setup_title')}
                            </h2>
                            <p className="text-sm text-stone-500 font-bold">
                                {t(`adversaries.${adversary.id}`)} - {t('settings.level')} {currentLevel}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative overflow-y-auto flex-1 p-6 space-y-6 z-10 custom-scrollbar text-stone-700">

                    {/* 1. Fear Cards */}
                    {activeLevelDetails?.fearCards && (
                        <div className="bg-stone-50/50 p-4 rounded-xl border border-stone-200">
                            <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-2 uppercase text-xs tracking-wider">
                                <AlertCircle className="w-4 h-4 text-indigo-600" />
                                {t('adversary_rules.fear_setup')}
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-serif font-bold text-indigo-700">
                                    {activeLevelDetails.fearCards}
                                </span>
                                <span className="text-sm text-stone-500 italic">
                                    ({t('adversary_rules.fear_desc')})
                                </span>
                            </div>
                        </div>
                    )}

                    {/* 2. Invader Deck */}
                    {activeLevelDetails?.invaderDeck && (
                        <div className="bg-stone-50/50 p-4 rounded-xl border border-stone-200">
                            <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-2 uppercase text-xs tracking-wider">
                                <FileText className="w-4 h-4 text-stone-600" />
                                {t('adversary_rules.deck_setup')}
                            </h3>
                            <div className="font-mono text-lg tracking-widest text-stone-800 bg-white inline-block px-3 py-1 rounded border border-stone-200 shadow-sm">
                                {activeLevelDetails.invaderDeck}
                            </div>
                            <p className="text-xs text-stone-500 mt-2">
                                {t('adversary_rules.deck_desc')}
                            </p>
                        </div>
                    )}

                    {/* 3. Specific Instructions */}
                    {setupInstructionList.length > 0 && (
                        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
                            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-3 uppercase text-xs tracking-wider">
                                <Component className="w-4 h-4" />
                                {t('adversary_rules.additional_rules')}
                            </h3>
                            <ul className="space-y-3">
                                {setupInstructionList.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-xs">
                                            {item.level}
                                        </span>
                                        <span className="pt-0.5 leading-relaxed">
                                            {item.rule}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {(!activeLevelDetails?.fearCards && !activeLevelDetails?.invaderDeck && setupInstructionList.length === 0) && (
                        <div className="text-center py-8 text-stone-500 italic">
                            {t('adversary_rules.no_setup_changes')}
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="relative p-6 border-t border-stone-300 bg-parchment-200/50 flex justify-end gap-3 z-10">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors font-bold"
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 rounded-full bg-stone-800 text-white hover:bg-stone-700 font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        {t('common.start_game')}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SetupDialog;
