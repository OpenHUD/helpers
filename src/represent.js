const numericRanks = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
};

const represent2 = hand => {
    const card1rank = hand[0][0];
    const card2rank = hand[1][0];

    if (card1rank === card2rank) { // pocket pair?
        return `${card1rank}${card1rank}`;
    } else {
        const card1suit = hand[0][1];
        const card2suit = hand[1][1];

        const repSuit = (card1suit === card2suit) ? 's' : 'o';
        const ranks = [card1rank, card2rank];
        ranks.sort((a, b) => (numericRanks[b] - numericRanks[a]));
        
        return `${ranks.join('')}${repSuit}`;
    }
};

const represent = ({hand}) => {
    switch (hand.length) {
        case 2:
            return represent2(hand);
        default:
            throw Error(`${hand.length} card hand representations are not supported`);
    }
};


export default represent;