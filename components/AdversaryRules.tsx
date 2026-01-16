import React from 'react';
import { GameSettings } from '../types';
import { useI18n } from '../services/i18n';
import { ADVERSARIES } from '../constants';
import { Shield, X, AlertOctagon, ArrowUpCircle } from 'lucide-react';

interface AdversaryRulesProps {
    settings: GameSettings;
    onClose: () => void;
}

const AdversaryRules: React.FC<AdversaryRulesProps> = ({ settings, onClose }) => {
    const { t } = useI18n();

    const adversary = settings.adversary
        ? ADVERSARIES.find(a => a.id === settings.adversary?.id)
        : null;

    if (!adversary) return null;

    const currentLevel = settings.adversary?.level || 0;

    // Get active levels (1 to current), excluding setup-only levels for the active rules view
    const activeLevels = adversary.levels.filter(l => l.level > 0 && l.level <= currentLevel && !l.isSetup);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-parchment-100 border border-stone-300 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />

                {/* Header */}
                <div className="relative flex items-center justify-between p-5 bg-parchment-200/80 border-b border-stone-300 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-amber-100 rounded-lg border border-amber-200 shadow-sm">
                            <Shield className="w-5 h-5 text-amber-800" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-bold text-stone-800 leading-tight">
                                {t(`adversaries.${adversary.id}`)}
                            </h2>
                            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider">
                                {t('settings.level')} {currentLevel} • {t('header.rules')}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="relative overflow-y-auto flex-1 p-5 space-y-6 z-10 custom-scrollbar text-stone-700">

                    {/* Escalation */}
                    {adversary.escalation && (() => {
                        const escNameKey = `adversary_data.${adversary.id}.escalation.name`;
                        const escDescKey = `adversary_data.${adversary.id}.escalation.description`;
                        const escNameRaw = t(escNameKey);
                        const escDescRaw = t(escDescKey);

                        const escName = (escNameRaw && escNameRaw !== escNameKey) ? escNameRaw : adversary.escalation?.name;
                        const escDesc = (escDescRaw && escDescRaw !== escDescKey) ? escDescRaw : adversary.escalation?.description;

                        if (!escName && !escDesc) return null;

                        return (
                            <div className="bg-white/60 p-4 rounded-xl border border-stone-200 shadow-sm">
                                <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-2 uppercase text-[10px] tracking-widest text-indigo-600">
                                    <ArrowUpCircle className="w-4 h-4" />
                                    {t('adversary_rules.escalation')}
                                </h3>
                                <div className="font-serif font-bold text-lg mb-1">
                                    {escName}
                                </div>
                                <p className="text-sm leading-relaxed text-stone-600">
                                    {escDesc}
                                </p>
                            </div>
                        );
                    })()}

                    {/* Loss Condition */}
                    {adversary.lossCondition && (() => {
                        const lossNameKey = `adversary_data.${adversary.id}.loss_condition.name`;
                        const lossDescKey = `adversary_data.${adversary.id}.loss_condition.description`;
                        const lossNameRaw = t(lossNameKey);
                        const lossDescRaw = t(lossDescKey);

                        const lossName = (lossNameRaw && lossNameRaw !== lossNameKey) ? lossNameRaw : adversary.lossCondition?.name;
                        const lossDesc = (lossDescRaw && lossDescRaw !== lossDescKey) ? lossDescRaw : adversary.lossCondition?.description;

                        if (!lossName && !lossDesc) return null;

                        return (
                            <div className="bg-red-50/60 p-4 rounded-xl border border-red-100 shadow-sm">
                                <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-2 uppercase text-[10px] tracking-widest text-red-600">
                                    <AlertOctagon className="w-4 h-4" />
                                    {t('adversary_rules.loss_condition')}
                                </h3>
                                <div className="font-serif font-bold text-lg mb-1 text-red-900">
                                    {lossName}
                                </div>
                                <p className="text-sm leading-relaxed text-red-800">
                                    {lossDesc}
                                </p>
                            </div>
                        );
                    })()}

                    {/* Active Levels */}
                    {activeLevels.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-bold text-stone-400 uppercase text-[10px] tracking-widest ml-1">
                                {t('adversary_rules.active_levels')}
                            </h3>
                            {activeLevels.map(lvl => {
                                const lvlNameKey = `adversary_data.${adversary.id}.levels.${lvl.level}.name`;
                                const lvlEffectKey = `adversary_data.${adversary.id}.levels.${lvl.level}.effect`;
                                const lvlNameRaw = t(lvlNameKey);
                                const lvlEffectRaw = t(lvlEffectKey);

                                const displayName = (lvlNameRaw && lvlNameRaw !== lvlNameKey) ? lvlNameRaw : lvl.name;
                                const displayEffect = (lvlEffectRaw && lvlEffectRaw !== lvlEffectKey) ? lvlEffectRaw : lvl.effect;

                                return (
                                    <div key={lvl.level} className="bg-white/40 p-3 rounded-lg border border-stone-200/50">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="bg-stone-200 text-stone-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                Lvl {lvl.level}
                                            </span>
                                            <span className="font-bold text-sm text-stone-800">
                                                {displayName}
                                            </span>
                                        </div>
                                        {displayEffect && (
                                            <p className="text-xs md:text-sm text-stone-600 leading-relaxed pl-1">
                                                {displayEffect}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeLevels.length === 0 && !adversary.escalation && !adversary.lossCondition && (
                        <div className="text-center py-8 text-stone-400 italic text-sm">
                            {t('adversary_rules.no_rules')}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdversaryRules;
