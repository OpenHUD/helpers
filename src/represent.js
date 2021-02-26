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

const numericSuits = {
    'd': 3,
    'h': 2,
    's': 1,
    'c': 0
};

const sortRanksInPlace = ranks => {
    ranks.sort((a, b) => (numericRanks[b] - numericRanks[a]));
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
        sortRanksInPlace(ranks);
        
        return `${ranks.join('')}${repSuit}`;
    }
};

const compareRanks = (ranks1, ranks2) => {
    const length = Math.min(ranks1.length, ranks2.length);
    for (let i = 0; i < length; ++i) {
        const diff = numericRanks[ranks2[i]] - numericRanks[ranks1[i]];
        if (diff !== 0) {
            return diff;
        }
    }

    return ranks2.length - ranks1.length;
};

const stringifyRanks = ranks => {
    if (ranks.length < 2) {
        return ranks.join('');
    } else {
        return `(${ranks.join('')})`;
    }
};

const representMany = hand => {
    const suitedRanks = [ [], [], [], [] ];

    hand.forEach(card => {
        suitedRanks[numericSuits[card[1]]].push(card[0]);
    });

    // Sort within suit
    suitedRanks.forEach(ranks => {
        sortRanksInPlace(ranks);
    });

    // Sort between suits
    suitedRanks.sort(compareRanks);

    return suitedRanks.map(stringifyRanks).join('');
};

const represent = ({hand}) => {
    switch (hand.length) {
        case 2:
            return represent2(hand);
        case 3:
        case 4:
            return representMany(hand);
        default:
            throw Error(`${hand.length} card hand representations are not supported`);
    }
};


export default represent;
