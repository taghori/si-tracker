import React from 'react';
import { X, Trophy, Skull, Clock, Map, User, Layers, ShieldCheck, ScrollText } from 'lucide-react';
import { GameResult } from '../types';
import { useI18n } from '../services/i18n';

interface GameDetailDialogProps {
    game: GameResult;
    onClose: () => void;
}

const GameDetailDialog: React.FC<GameDetailDialogProps> = ({ game, onClose }) => {
    const { t, language } = useI18n();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-parchment-100 border border-stone-300 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">

                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40 mix-blend-multiply pointer-events-none" />

                {/* Header */}
                <div className={`relative p-6 flex items-center justify-between border-b border-stone-200 z-10 ${game.outcome === 'victory' ? 'bg-amber-50/80' : 'bg-stone-100/80'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-sm ${game.outcome === 'victory' ? 'bg-white border-amber-200 text-amber-500' : 'bg-white border-stone-200 text-stone-400'}`}>
                            {game.outcome === 'victory' ? <Trophy className="w-6 h-6" /> : <Skull className="w-6 h-6" />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-stone-800">
                                {game.outcome === 'victory' ? t('details.victory_title') : t('details.defeat_title')}
                            </h2>
                            <p className="text-xs text-stone-500 font-medium uppercase tracking-widest">{formatDate(game.date)}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-200/50 rounded-full transition-colors text-stone-400 hover:text-stone-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="relative overflow-y-auto flex-1 p-8 space-y-8 z-10 custom-scrollbar">

                    {/* Main Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
                            <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">{t('common.points')}</span>
                            <span className="text-3xl font-serif font-bold text-teal-600">{game.score}</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
                            <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">{t('common.difficulty')}</span>
                            <span className="text-3xl font-serif font-bold text-amber-600">{game.difficulty}</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
                            <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">{t('common.players')}</span>
                            <span className="text-3xl font-serif font-bold text-stone-700">{game.playerCount}</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-center">
                            <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">{t('common.duration')}</span>
                            <span className="text-xl font-serif font-bold text-stone-700 mt-2 block">{game.duration}</span>
                        </div>
                    </div>

                    {/* Secondary Stats Row */}
                    {(game.rounds !== undefined || (game.outcome === 'victory' && game.terrorLevel)) && (
                        <div className="grid grid-cols-2 gap-4">
                            {game.rounds !== undefined && (
                                <div className="bg-white/50 p-4 rounded-xl border border-stone-200 text-center flex flex-col items-center justify-center">
                                    <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">{t('common.round')}</span>
                                    <span className="text-xl font-bold text-stone-700">{game.rounds}</span>
                                </div>
                            )}
                            {game.outcome === 'victory' && game.terrorLevel && (
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center flex flex-col items-center justify-center shadow-sm">
                                    <span className="block text-[10px] text-amber-600 font-bold uppercase tracking-widest mb-1">{t('scoring.terror_level')}</span>
                                    <span className="text-xl font-serif font-bold text-amber-600">{game.terrorLevel}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Adversary & Scenario */}
                    {(game.adversary || game.scenario) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {game.adversary && (
                                <div className="flex items-start gap-4 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl">
                                    <div className="p-2 bg-white rounded-lg border border-amber-200 shadow-sm shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] text-amber-600/70 font-bold uppercase tracking-widest">{t('settings.adversary')}</span>
                                        <span className="font-serif font-bold text-stone-800">
                                            {game.adversary.id ? t(`adversaries.${game.adversary.id}`) : game.adversary.name}
                                        </span>
                                        <span className="block text-xs font-bold text-amber-700">{t('settings.level')} {game.adversary.level}</span>
                                    </div>
                                </div>
                            )}
                            {game.scenario || game.scenarioId ? (
                                <div className="flex items-start gap-4 p-5 bg-teal-50/50 border border-teal-100 rounded-2xl">
                                    <div className="p-2 bg-white rounded-lg border border-teal-200 shadow-sm shrink-0">
                                        <ScrollText className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] text-teal-600/70 font-bold uppercase tracking-widest">{t('settings.scenario')}</span>
                                        <span className="font-serif font-bold text-stone-800">
                                            {game.scenarioId ? t(`scenarios.${game.scenarioId}`) : game.scenario}
                                        </span>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {/* Spirits */}
                    <section>
                        <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-3">
                            <User className="w-4 h-4" />
                            {t('details.spirits_title')}
                            <span className="flex-1 h-px bg-stone-300"></span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {game.spirits.map(spirit => (
                                <div key={spirit.id} className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                                        {(t(`spirits.${spirit.id}`) || spirit.id || '').toString().charAt(0)}
                                    </div>
                                    <span className="font-medium text-stone-700">{t(`spirits.${spirit.id}`)}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Expansions */}
                    {game.expansions && game.expansions.length > 0 && (
                        <section>
                            <h3 className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-3">
                                <Layers className="w-4 h-4" />
                                {t('details.expansions_title')}
                                <span className="flex-1 h-px bg-stone-200"></span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {game.expansions.map(exp => (
                                    <span key={exp} className="px-3 py-1 bg-stone-200/50 border border-stone-300 rounded-full text-xs font-bold text-stone-600 uppercase tracking-tighter">
                                        {t(`expansions.${exp}`)}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Footer */}
                <div className="relative p-6 border-t border-stone-300 bg-parchment-200/50 z-10 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 rounded-full bg-stone-800 text-white font-bold shadow-lg hover:bg-stone-700 transition-all active:scale-95"
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameDetailDialog;
