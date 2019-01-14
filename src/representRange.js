const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const representSimpleRange = (high, low, highest) => {
    if (high === low) {
        return high;
    } else if (high === highest) {
        return `${low}+`;
    } else {
        return `${high}-${low}`;
    }
};

const representRange = ({range}) => {
    const rangeRepresentations = [];

    let high = null;
    let low = null;

    // Pairs
    ranks.forEach(rank => {
        const hand = `${rank}${rank}`;
        if (range.has(hand)) {
            high = high || hand;
            low = hand;
        } else if (high) {
            rangeRepresentations.push(representSimpleRange(high, low, 'AA'));
            high = null;
            low = null;
        }
    });
    if (high) {
        rangeRepresentations.push(representSimpleRange(high, low, 'AA'));
        high = null;
        low = null;
    }

    // Suited
    for (let i = 0; i < ranks.length-1; ++i) {
        for (let j = i+1; j < ranks.length; ++j) {
            const hand = `${ranks[i]}${ranks[j]}s`;

            if (range.has(hand)) {
                high = high || hand;
                low = hand;
            } else if (high) {
                rangeRepresentations.push(representSimpleRange(high, low, 'AKs'));
                high = null;
                low = null;
            }
        }
    }
    if (high) {
        rangeRepresentations.push(representSimpleRange(high, low, 'AKs'));
        high = null;
        low = null;
    }


    // Off-suit
    for (let i = 0; i < ranks.length-1; ++i) {
        for (let j = i+1; j < ranks.length; ++j) {
            const hand = `${ranks[i]}${ranks[j]}o`;

            if (range.has(hand)) {
                high = high || hand;
                low = hand;
            } else if (high) {
                rangeRepresentations.push(representSimpleRange(high, low, 'AKo'));
                high = null;
                low = null;
            }
        }
    }
    if (high) {
        rangeRepresentations.push(representSimpleRange(high, low, 'AKo'));
        high = null;
        low = null;
    }

    return rangeRepresentations.join(',');
};


export default representRange;