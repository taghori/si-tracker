import React, { useRef, useState } from 'react';
import { useI18n } from './services/i18n';
import { useGame } from './hooks/useGame';
import PhaseCard from './components/PhaseCard';
import PhaseTimeline from './components/PhaseTimeline';

import SettingsDialog from './components/SettingsDialog';
import ScoringDialog from './components/ScoringDialog';
import GameDetailDialog from './components/GameDetailDialog';
import SetupDialog from './components/SetupDialog';
import AdversaryRules from './components/AdversaryRules';

import { ChevronRight, ChevronLeft, RotateCcw, Settings, Play, Pause, Clock, Trophy, Skull, Trash2, Map, Flower2, Download, Upload, BookOpen } from 'lucide-react';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};

const App: React.FC = () => {
  const { t, language, setLanguage } = useI18n();
  const { state, actions } = useGame();

  // -- Local UI State (Swipe) --
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number, y: number } | null>(null);
  const minSwipeDistance = 60;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -- Destructure State for easier access --
  const {
    hasStarted, isPaused, elapsedSeconds, round, phaseIndex, activePhases,
    invaderDeck, invaderStage, settings, history, selectedGame,
    dialogs
  } = state;

  const {
    showSettings, showScoring, showSetup, showRules, scoringInitialOutcome
  } = dialogs;


  // -- Formatting Helpers --
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  };

  // -- Swipe Handlers --
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    if (Math.abs(distanceX) > Math.abs(distanceY) && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        actions.handleNext();
      } else {
        actions.handlePrev();
      }
    }
  };


  // -- History Import/Export --
  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `spirit-island-history-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const importHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);

        if (Array.isArray(importedData)) {
          if (window.confirm(t('history.import_found', { count: importedData.length }))) {
            const count = actions.mergeHistory(importedData);
            alert(t('history.import_success', { count }));
          }
        } else {
          alert(t('history.import_error_format'));
        }
      } catch (error) {
        console.error("Import failed", error);
        alert("Fehler beim Importieren der Datei. Stelle sicher, dass es eine gültige JSON-Datei ist.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };


  const currentPhase = activePhases[phaseIndex] || activePhases[0];

  return (
    <div className="min-h-screen bg-parchment-100 text-stone-800 font-sans selection:bg-teal-200 flex flex-col relative">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] z-0 mix-blend-multiply"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-amber-50/50 via-transparent to-teal-50/30"></div>

      {/* Top Bar */}
      <header className="flex-shrink-0 z-30 w-full border-b border-stone-300 bg-parchment-50/95 backdrop-blur-md sticky top-0 shadow-sm">
        {/* Main Row */}
        <div className="px-4 md:px-6 py-2 flex justify-between items-center h-[52px] md:h-[60px]">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 shadow-lg flex items-center justify-center text-white border-2 border-white/50">
              <Flower2 className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-wider text-stone-700">
              {t('header.title_main')} <span className="text-teal-600 font-normal hidden xs:inline">{t('header.title_sub')}</span>
            </h1>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-[10px] font-bold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-white shadow-sm text-teal-600' : 'text-stone-400 hover:text-stone-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`px-2 py-1 rounded transition-colors ${language === 'de' ? 'bg-white shadow-sm text-teal-600' : 'text-stone-400 hover:text-stone-600'}`}
            >
              DE
            </button>
          </div>

          {/* Center: Timer (only Desktop) */}
          {hasStarted && (
            <div className="hidden md:flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full border border-stone-200 shadow-sm backdrop-blur-sm">
              <Clock className={`w-3.5 h-3.5 ${isPaused || showScoring ? 'text-stone-400' : 'text-teal-600 animate-pulse'}`} />
              <span className="font-mono text-base font-bold tracking-widest text-stone-700 tabular-nums">
                {formatTime(elapsedSeconds)}
              </span>
              <button
                onClick={actions.togglePause}
                className="ml-0.5 p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
                title={isPaused ? t('header.timer_resume') : t('header.timer_pause')}
                disabled={showScoring}
              >
                {isPaused || showScoring ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
              </button>
            </div>
          )}

          {/* Right: Round & Settings (Round hidden on mobile main row) */}
          <div className="flex items-center gap-2 md:gap-6">
            {hasStarted && (
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">{t('common.round_short')}</span>
                <span className="font-serif text-lg text-teal-700 leading-none font-bold">{round}</span>
              </div>
            )}

            {hasStarted && settings.adversary && (
              <button
                onClick={() => actions.setShowRules(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors border border-amber-200"
                title={t('header.rules')}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold hidden lg:inline uppercase tracking-wide">{t('header.rules')}</span>
              </button>
            )}

            <div className="flex items-center">
              {hasStarted && (
                <button
                  onClick={() => {
                    actions.setScoringInitialOutcome('victory');
                    actions.setShowScoring(true);
                  }}
                  className="ml-2 pr-4 pl-3 py-1.5 md:py-2 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 transition-all active:scale-95 flex items-center gap-2 shadow-sm"
                  title={t('header.end_game')}
                >
                  <Trophy className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none hidden xs:inline">
                    {t('header.end_game_short')}
                  </span>
                </button>
              )}
              {hasStarted && (
                <button
                  onClick={() => actions.setShowSettings(true)}
                  className="p-1.5 md:p-2 text-stone-600 hover:text-amber-600 hover:bg-amber-50 transition-colors rounded-lg"
                  title={t('header.settings')}
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
              {hasStarted && (
                <button
                  onClick={actions.handleReset}
                  className="p-1.5 md:p-2 text-stone-600 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                  title={t('header.reset')}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Info Row (Only show if game started) */}
        {hasStarted && (
          <div className="md:hidden flex justify-between items-center px-4 py-1.5 border-t border-stone-200 bg-white/40">
            {/* Round Counter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">{t('common.round')}</span>
              <span className="font-serif text-lg text-teal-700 font-bold leading-none">{round}</span>
            </div>

            {/* Time Counter */}
            <div className="flex items-center gap-2 bg-white/60 px-2.5 py-0.5 rounded-full border border-stone-200 shadow-sm">
              <Clock className={`w-3 h-3 ${isPaused || showScoring ? 'text-stone-400' : 'text-teal-600 animate-pulse'}`} />
              <span className="font-mono text-sm font-bold tracking-wider text-stone-700 tabular-nums">
                {formatTime(elapsedSeconds)}
              </span>
              <button
                onClick={actions.togglePause}
                className="p-1 rounded-full text-stone-500"
                disabled={showScoring}
              >
                {isPaused || showScoring ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5 fill-current" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      {hasStarted ? (
        <div
          className="flex-1 flex flex-col min-h-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Timeline - Fixed height flex item */}
          <div className={`flex-shrink-0 sticky top-[92px] md:top-[61px] z-20 transition-opacity duration-300 ${isPaused || showScoring ? 'opacity-30 pointer-events-none filter blur-sm' : 'opacity-100'}`}>
            <PhaseTimeline
              phases={activePhases}
              currentIndex={phaseIndex}
              onSelect={(idx) => !isPaused && actions.setPhaseIndex(idx)}
            />
          </div>

          {/* Card Area */}
          <main className={`flex-1 relative z-10 flex flex-col items-center justify-start p-2 md:p-8 pb-32 transition-all duration-300 ${isPaused || showScoring ? 'opacity-30 pointer-events-none filter blur-md scale-95' : 'opacity-100 scale-100'}`}>
            <div className="w-full max-w-2xl py-2 md:py-4 flex-shrink-0 mx-auto">
              <PhaseCard
                phase={currentPhase}
                round={round}
                settings={settings}
                invaderStage={invaderStage}
                invaderDeck={invaderDeck}
              />
            </div>
          </main>

          {/* Bottom Controls - Fixed at screen bottom */}
          <div className={`fixed bottom-0 left-0 right-0 z-30 w-full p-4 md:p-6 pb-[max(1rem,env(safe-area-inset-bottom))] flex justify-center items-center gap-3 md:gap-8 bg-parchment-50/95 backdrop-blur-md border-t border-stone-200 transition-opacity duration-300 ${isPaused || showScoring ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <button
              onClick={actions.handlePrev}
              disabled={round === 1 && phaseIndex === 0}
              className="group flex items-center gap-2 px-4 md:px-6 py-3 rounded-full bg-white border border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 md:group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wide text-sm md:text-base">{t('common.back')}</span>
            </button>

            <button
              onClick={actions.handleNext}
              className="group flex-1 max-w-[280px] flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 md:hover:scale-105 transition-all active:scale-95 border-b-2 border-teal-700"
            >
              <span className="font-bold tracking-wider md:tracking-widest text-base md:text-lg whitespace-nowrap">
                {phaseIndex === activePhases.length - 1 ? t('common.next_round') : t('common.next_phase')}
              </span>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 md:group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Victory Button in Bottom Bar (Mobile focused) */}
            <button
              onClick={() => {
                actions.setScoringInitialOutcome('victory');
                actions.setShowScoring(true);
              }}
              className="flex items-center justify-center p-3 md:p-4 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-900/20 hover:bg-amber-400 transition-all active:scale-90 border-b-2 border-amber-700 sm:hover:scale-110"
              title={t('header.end_game')}
            >
              <Trophy className="w-6 h-6 md:w-7 md:h-7 fill-white/20" />
            </button>
          </div>

          {/* Pause Overlay */}
          {isPaused && !showScoring && (
            <div className="fixed inset-0 z-40 flex flex-col items-center justify-center pointer-events-auto backdrop-blur-sm bg-white/30">
              <div className="text-4xl md:text-6xl font-serif text-stone-800 mb-6 drop-shadow-sm font-bold">
                {t('header.paused_overlay')}
              </div>
              <button
                onClick={actions.togglePause}
                className="px-8 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                {t('header.resume_button')}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* START SCREEN */
        <div className="flex-1 flex flex-col items-center justify-start p-8 text-center relative z-10 overflow-y-auto w-full max-w-4xl mx-auto">

          {/* Hero Section */}
          <div className="w-full space-y-8 mt-10 md:mt-20 mb-16">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl text-white mb-6">
                <Map className="w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-stone-800 leading-tight font-black">
                {t('header.title_main')} <br />
                <span className="text-teal-600 text-3xl md:text-5xl font-normal italic">{t('header.title_sub')}</span>
              </h2>
              <p className="text-stone-600 text-lg max-w-lg mx-auto leading-relaxed">
                {t('phases.spirit-growth.desc')}
              </p>
              <button
                onClick={() => actions.setShowSettings(true)}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-serif font-bold text-xl shadow-xl shadow-amber-900/20 hover:scale-105 hover:shadow-amber-900/30 transition-all flex items-center gap-3 mx-auto"
              >
                <Play className="w-6 h-6 fill-current" />
                {t('common.start_game')}
              </button>
            </div>
          </div>

          {/* History Section */}
          <div className="w-full pt-10 border-t border-stone-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <h3 className="text-2xl font-serif text-stone-700 flex items-center gap-3">
                <Clock className="w-6 h-6 text-stone-400" />
                {t('history.title')}
              </h3>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={exportHistory}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-teal-600 hover:border-teal-200 transition-all text-sm font-medium shadow-sm"
                    title={t('history.export')}
                  >
                    <Download className="w-4 h-4" />
                    {t('history.export')}
                  </button>
                )}
                <button
                  onClick={handleImportClick}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-amber-600 hover:border-amber-200 transition-all text-sm font-medium shadow-sm"
                  title={t('history.import')}
                >
                  <Upload className="w-4 h-4" />
                  {t('history.import')}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={importHistory}
                  accept=".json"
                  className="hidden"
                />
              </div>
            </div>

            {history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {history.map(game => (
                  <button
                    key={game.id}
                    onClick={() => actions.setSelectedGame(game)}
                    className="bg-white w-full border border-stone-200 rounded-xl p-5 flex items-center justify-between text-left hover:shadow-md hover:border-teal-200 transition-all group relative overflow-hidden cursor-pointer outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${game.outcome === 'victory' ? 'bg-amber-400' : 'bg-stone-300'}`}></div>
                    <div className="flex items-center gap-4 pl-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${game.outcome === 'victory'
                        ? 'bg-amber-50 border-amber-200 text-amber-500'
                        : 'bg-stone-100 border-stone-200 text-stone-400'
                        }`}>
                        {game.outcome === 'victory' ? <Trophy className="w-6 h-6" /> : <Skull className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`font-serif font-bold text-lg ${game.outcome === 'victory' ? 'text-amber-600' : 'text-stone-500'}`}>
                            {game.score} {t('common.points')}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-wider">
                            {t('settings.level')} {game.difficulty}
                          </span>
                        </div>
                        <div className="text-xs text-stone-400 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                          <span>{formatDate(game.date)}</span>
                          <span>•</span>
                          <span>{game.playerCount} {t('common.players')}</span>
                          <span>•</span>
                          <span>{game.duration}</span>
                          {game.rounds !== undefined && (
                            <>
                              <span>•</span>
                              <span className="font-bold text-stone-600">{t('common.round')} {game.rounds}</span>
                            </>
                          )}
                          {game.outcome === 'victory' && game.terrorLevel && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 font-bold italic">TL {game.terrorLevel}</span>
                            </>
                          )}
                          {(game.adversary || game.scenario) && <span>•</span>}
                          {game.adversary && (
                            <span className="text-amber-700 bg-amber-50 px-1 rounded">
                              {game.adversary.id ? t(`adversaries.${game.adversary.id}`) : game.adversary.name} (Lvl {game.adversary.level})
                            </span>
                          )}
                          {(game.scenarioId || game.scenario) && (
                            <span className="text-teal-700 bg-teal-50 px-1 rounded">
                              {game.scenarioId ? t(`scenarios.${game.scenarioId}`) : game.scenario}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {game.spirits.length > 0 && (
                        <div className="hidden sm:flex -space-x-2 mr-2">
                          {game.spirits.slice(0, 3).map((s, i) => {
                            const localizedName = t(`spirits.${s.id}`) || s.id;
                            return (
                              <div key={i} className="w-8 h-8 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-stone-600 overflow-hidden shadow-sm" title={localizedName}>
                                {localizedName.charAt(0)}
                              </div>
                            );
                          })}
                          {game.spirits.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-[10px] text-stone-500 shadow-sm">
                              +{game.spirits.length - 3}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Delete button (stop propagation to avoid opening game detail) */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(t('common.confirm_delete'))) {
                            actions.deleteHistoryItem(game.id);
                          }
                        }}
                        className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-10 cursor-pointer"
                        title={t('common.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 border-2 border-dashed border-stone-200 rounded-2xl">
                <p className="text-stone-400 italic">{t('history.empty')}</p>
                <button
                  onClick={handleImportClick}
                  className="mt-4 text-teal-600 font-bold hover:text-teal-500 transition-colors"
                >
                  {t('history.import_now')}
                </button>
              </div>
            )}
          </div>
        </div>
      )
      }

      {/* Settings Dialog */}
      {
        showSettings && (
          <SettingsDialog
            settings={settings}
            onSave={actions.handleSaveSettings}
            onClose={() => actions.setShowSettings(false)}
            isInitialSetup={!hasStarted}
          />
        )
      }

      {/* Setup Dialog */}
      {showSetup && (
        <SetupDialog
          settings={settings}
          onConfirm={actions.startGame}
          onCancel={() => actions.setShowSetup(false)}
        />
      )}

      {/* Adversary Rules Modal */}
      {showRules && (
        <AdversaryRules
          settings={settings}
          onClose={() => actions.setShowRules(false)}
        />
      )}

      {/* Scoring Dialog */}
      {showScoring && (
        <ScoringDialog
          initialOutcome={scoringInitialOutcome}
          settings={settings}
          elapsedTime={formatTime(elapsedSeconds)}
          currentRound={round}
          invaderDeckState={{
            remaining: Math.max(0, invaderDeck.length - (round + 1)),
            discarded: Math.min(invaderDeck.length, round + 1)
          }}
          onSaveGame={actions.handleGameComplete}
          onClose={() => actions.setShowScoring(false)}
        />
      )}

      {/* Game Detail Dialog */}
      {selectedGame && (
        <GameDetailDialog
          game={selectedGame}
          onClose={() => actions.setSelectedGame(null)}
          onDelete={(id) => {
            if (window.confirm(t('common.confirm_delete'))) {
              actions.deleteHistoryItem(id);
              actions.setSelectedGame(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default App;