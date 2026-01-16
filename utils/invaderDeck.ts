export const parseInvaderDeck = (deckString: string): number[] => {
    // Remove dashes and split into characters
    const cleanString = deckString.replace(/-/g, '');
    const cards = cleanString.split('').map(char => parseInt(char, 10));
    return cards.filter(n => !isNaN(n));
};

export const getInvaderDeck = (adversaryId: string | undefined, level: number, defaultDeck: string = "111-2222-33333"): number[] => {
    if (!adversaryId) {
        return parseInvaderDeck(defaultDeck);
    }
    // Logic to be handled by caller accessing constants, 
    // or we could import constants here if circular dep is avoided.
    // For simplicity, let's just make this a pure parser for now 
    // and handle the lookup in App.tsx or a service.
    return parseInvaderDeck(defaultDeck);
};
