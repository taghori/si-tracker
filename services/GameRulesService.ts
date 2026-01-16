import {
    GameSettings,
    Phase,
    ExpansionId,
    PhaseCategory,
    Adversary
} from '../types';
import { GAME_PHASES, ADVERSARIES } from '../constants';

export class GameRulesService {

    /**
     * Parses a deck string (e.g. "111-2222-33333") into an array of numbers.
     */
    private static parseInvaderDeck(deckString: string): number[] {
        // Remove dashes and split into characters
        const cleanString = deckString.replace(/-/g, '');
        const cards = cleanString.split('').map(char => parseInt(char, 10));
        return cards.filter(n => !isNaN(n));
    }

    /**
     * Returns the parsed invader deck array for the given adversary and level.
     * If no adversary is selected, returns the standard deck.
     */
    static getInvaderDeck(adversaryId: string | undefined, level: number): number[] {
        let deckString = "111-2222-33333"; // Standard default

        if (adversaryId) {
            const adv = ADVERSARIES.find(a => a.id === adversaryId);
            if (adv) {
                // Find the highest active level that defines a specific deck
                for (let l = level; l >= 0; l--) {
                    const lvlData = adv.levels.find(lvl => lvl.level === l);
                    if (lvlData?.invaderDeck) {
                        deckString = lvlData.invaderDeck;
                        break;
                    }
                }
            }
        }

        const deck = this.parseInvaderDeck(deckString);

        // Sweden Level 4+ Rule: "Remove the top card of the Invader Deck"
        // (Note: This is technically a setup change, but represented here as a deck modification)
        if (adversaryId === 'sweden' && level >= 4) {
            deck.shift();
        }

        return deck;
    }

    /**
     * Returns the list of phases active for a specific round based on settings.
     * Handles expansion-specific phases (Events) and Adversary injections (England High Immigration).
     */
    static getPhasesForRound(
        round: number,
        settings: GameSettings,
        invaderDeck: number[],
        translate: (key: string) => string
    ): Phase[] {

        // 1. Filter standard phases
        let phases = GAME_PHASES.filter(phase => {
            if (phase.requiresEvents) {
                // Skip Event phase on Round 1
                if (round === 1) return false;

                // Only show if B&C or JE are active
                return settings.expansions.includes(ExpansionId.BRANCH_AND_CLAW) ||
                    settings.expansions.includes(ExpansionId.JAGGED_EARTH);
            }
            return true;
        });

        // 2. Handle England Level 3+ "High Immigration" Injection
        if (settings.adversary?.id === 'england' && settings.adversary.level >= 3) {
            // Pass the level to the check function
            if (this.shouldShowHighImmigration(round, invaderDeck, settings.adversary.level)) {

                // Find Ravage index to insert before it
                const ravageIndex = phases.findIndex(p => p.id === 'invader-ravage');

                if (ravageIndex !== -1) {
                    const highImmigrationPhase: Phase = {
                        id: 'england-high-immigration',
                        name: translate('phases.england-high-immigration.name'),
                        category: PhaseCategory.INVADER,
                        description: translate('phases.england-high-immigration.desc'),
                        iconName: 'Construction', // Reusing Construction icon
                        color: 'text-amber-600',
                        substeps: ["Build in High Immigration land"]
                    };

                    // Insert before Ravage
                    const newPhases = [...phases];
                    newPhases.splice(ravageIndex, 0, highImmigrationPhase);
                    phases = newPhases;
                }
            }
        }

        return phases;
    }

    /**
     * Determines if the High Immigration phase should be active for England.
     * England Level 3: Remove the tile when a Stage II card slides onto it.
     * England Level 4+: The tile remains for the rest of the game.
     */
    public static shouldShowHighImmigration(round: number, invaderDeck: number[], level: number): boolean {
        // Level 4+: Stays forever
        if (level >= 4) return true;

        // Level 3: Remove when Stage II card slides onto it.
        // Logic: The tile is to the left of Ravage.
        // Flow: Explore -> Build -> Ravage -> High Imm -> Discard.
        // A card typically hits High Imm 3 turns after it is Explored (Explore=0, Build=1, Ravage=2, HighImm=3).
        // So the FIRST Stage II card (Index i) will stop the rule at Round = i + 3.
        const firstStage2Index = invaderDeck.findIndex(c => c === 2);

        if (firstStage2Index !== -1) {
            const removalRound = firstStage2Index + 3;
            if (round >= removalRound) {
                return false;
            }
        }

        return true;
    }
}
