import { useState, useEffect, useMemo, useCallback } from 'react';
import { GameSettings, GameResult, ExpansionId } from '../types';
import { GameRulesService } from '../services/GameRulesService';
import { useI18n } from '../services/i18n';

export const useGame = () => {
    const { t } = useI18n();

    // -- State --
    const [hasStarted, setHasStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const [round, setRound] = useState(1);
    const [phaseIndex, setPhaseIndex] = useState(0);

    // Dialog Visibility State
    const [showSettings, setShowSettings] = useState(false);
    const [showScoring, setShowScoring] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [scoringInitialOutcome, setScoringInitialOutcome] = useState<'victory' | 'defeat'>('victory');

    // Data State
    const [settings, setSettings] = useState<GameSettings>({
        playerCount: 1,
        expansions: [ExpansionId.BASE],
        selectedSpirits: []
    });

    const [history, setHistory] = useState<GameResult[]>([]);
    const [selectedGame, setSelectedGame] = useState<GameResult | null>(null);

    // -- Computed --
    const invaderDeck = useMemo(() => {
        return GameRulesService.getInvaderDeck(settings.adversary?.id, settings.adversary?.level || 0);
    }, [settings.adversary]);

    const invaderStage = useMemo(() => {
        return invaderDeck[round];
    }, [invaderDeck, round]);

    const activePhases = useMemo(() => {
        return GameRulesService.getPhasesForRound(round, settings, invaderDeck, t);
    }, [round, settings, invaderDeck, t]);


    // -- Effects --

    // Load History
    useEffect(() => {
        const saved = localStorage.getItem('spirit-island-history');
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    // Timer
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (hasStarted && !isPaused && !showScoring) {
            interval = setInterval(() => {
                setElapsedSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [hasStarted, isPaused, showScoring]);

    // Defeat Check (Empty Invader Deck)
    useEffect(() => {
        const currentPhase = activePhases[phaseIndex];
        if (hasStarted && !showScoring && currentPhase?.id === 'invader-explore' && invaderStage === undefined) {
            setScoringInitialOutcome('defeat');
            setShowScoring(true);
        }
    }, [round, phaseIndex, invaderStage, hasStarted, showScoring, activePhases]);


    // -- Actions --

    const handleNext = useCallback(() => {
        if (phaseIndex >= activePhases.length - 1) {
            setPhaseIndex(0);
            setRound(r => r + 1);
        } else {
            setPhaseIndex(prev => prev + 1);
        }
    }, [phaseIndex, activePhases.length]);

    const handlePrev = useCallback(() => {
        if (phaseIndex <= 0) {
            if (round > 1) {
                setRound(r => r - 1);
                // We need to calculate phases for the PREVIOUS round to set index correctly
                // But since activePhases updates via effect/memo when round changes, 
                // passing a callback to setPhaseIndex with the computed length is cleaner if we could.
                // Simplified: set to 0 initially, effect will correct? No, that causes jump.
                // We will trust the layout to re-render. 
                // *Correction*: We need the phase count of the NEW (prev) round.
                // Using a small timeout or additional effect is one way, but fetching service directly is better.
                const prevPhases = GameRulesService.getPhasesForRound(round - 1, settings, invaderDeck, t);
                setPhaseIndex(prevPhases.length - 1);
            }
        } else {
            setPhaseIndex(prev => prev - 1);
        }
    }, [phaseIndex, round, settings, invaderDeck, t]);

    const fullReset = useCallback(() => {
        setHasStarted(false);
        setElapsedSeconds(0);
        setRound(1);
        setPhaseIndex(0);
        setIsPaused(false);
        setShowSettings(false);
        setShowScoring(false);
    }, []);

    const handleReset = useCallback(() => {
        if (window.confirm(t('common.confirm_reset'))) {
            fullReset();
        }
    }, [fullReset, t]);

    const startGame = useCallback(() => {
        setHasStarted(true);
        setPhaseIndex(0);
        setRound(1);
        setShowSetup(false);
    }, []);

    const handleSaveSettings = useCallback((newSettings: GameSettings) => {
        setSettings(newSettings);
        setShowSettings(false);

        if (!hasStarted) {
            if (newSettings.adversary && newSettings.adversary.id) {
                setShowSetup(true);
            } else {
                startGame();
            }
        }
    }, [hasStarted, startGame]);

    const handleGameComplete = useCallback((result: GameResult) => {
        const newHistory = [result, ...history];
        setHistory(newHistory);
        localStorage.setItem('spirit-island-history', JSON.stringify(newHistory));
        fullReset();
    }, [history, fullReset]);

    const deleteHistoryItem = useCallback((id: string) => {
        const newHistory = history.filter(h => h.id !== id);
        setHistory(newHistory);
        localStorage.setItem('spirit-island-history', JSON.stringify(newHistory));
    }, [history]);

    const togglePause = useCallback(() => {
        setIsPaused(prev => !prev);
    }, []);

    const mergeHistory = useCallback((importedGames: GameResult[]) => {
        const existingIds = new Set(history.map(h => h.id));
        const newItems = importedGames.filter(item => item && item.id && !existingIds.has(item.id));
        const mergedHistory = [...newItems, ...history];
        setHistory(mergedHistory);
        localStorage.setItem('spirit-island-history', JSON.stringify(mergedHistory));
        return newItems.length;
    }, [history]);


    return {
        state: {
            hasStarted,
            isPaused,
            elapsedSeconds,
            round,
            phaseIndex,
            activePhases,
            invaderDeck,
            invaderStage,
            settings,
            history,
            selectedGame,
            dialogs: {
                showSettings,
                showScoring,
                showSetup,
                showRules,
                scoringInitialOutcome
            }
        },
        actions: {
            setHasStarted,
            setIsPaused, // Exposed for special cases if needed
            setRound,
            setPhaseIndex,
            setSelectedGame,

            // Dialog Setters
            setShowSettings,
            setShowScoring,
            setShowSetup,
            setShowRules,
            setScoringInitialOutcome,

            // High Level Actions
            handleNext,
            handlePrev,
            handleReset,
            handleSaveSettings,
            startGame,
            handleGameComplete,
            deleteHistoryItem,
            togglePause,
            mergeHistory
        }
    };
};
