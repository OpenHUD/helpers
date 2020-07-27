import isEqual from 'lodash/isEqual';

// From from https://www.monkerguy.com/help.htm:
//
// Monker refers to blinds as chips. In all our sims the SB = 1 Chip.
// Raise sizes are always additional to the previous bet.
// Example: Open 3sb, means open 3sb + 2sb(big blind) = 5sb, so open 2.5bb.
// Example: 3bet 12sb, If the open was to 5sb then the reraise is to 17sb (12+5)
// Here is the formula Monker uses for raise `sizes.
// (Raise % x (all previous bets + previous bet) + previous bet
// Example:
// Blinds 1/2.
// Open raise 50%
// 0.50(1+2+2) + 2 = 4.5
// Raise to 4.5
// 3bet 75%
// 0.75(1+2+4.5+4.5) + 4.5 = 13.5
// 3bet to 13.5
const Monker = {
    Fold: '0',
    CheckCall: '1',
    RaisePot: '2',
    RaiseAllIn: '3',
    Raise: p => `4${p.toString().padStart(4, '0')}`,
    RaiseMin: '5'
};

const getAction = (seatBefore, seatAfter, pot, lastBet) => {
    if (seatAfter.isFolded) {
        return Monker.Fold;
    } else if (seatAfter.pot <= lastBet) {
        return Monker.CheckCall;
    } else if (seatAfter.stack === 0) {
        return Monker.RaiseAllIn;
    } else if (seatAfter.pot - lastBet === pot + lastBet - seatBefore.pot) {
        return Monker.RaisePot;
    } else {
        // TODO: Monker.RaiseMin

        return Monker.Raise(Math.round(100 * (seatAfter.pot - lastBet) / (pot + lastBet)));
    }
};

const canAct = seat => !seat.isFolded && seat.stack > 0;
const nextPlayer = (seats, index) => (index + 1) % seats.length;
const prevPlayer = (seats, index) => (index + seats.length - 1) % seats.length;

// Returns a list of actions (MonkerSolver style) that transitions state1 to state2, e.g. '2.2.1.0'.
//
// Assumptions:
// 1. Reaching the second state does not require more than one action per seat
// 2. Each state has exactly one seat with hasAction === true
const extractActions = ({state1, state2}) => {
    if (isEqual(state1, state2)) {
        return '';
    }

    const actions = [];

    const pots = state1.seats.map(seat => seat.pot);
    let totalPot = pots.reduce((total, pot) => total + pot, state1.pot);
    let maxBet = Math.max(...pots);

    let nextToAct = state1.seats.findIndex(seat => seat.hasAction);
    if (state2.seats[nextToAct].hasAction) { // check if the two states are indeed different by looking at the pot in front of prev player
        const lastActed = prevPlayer(state1.seats, nextToAct);
        if (state1.seats[lastActed].pot === state2.seats[lastActed].pot) {
            return '';
        }
    }
    do {
        const seatBefore = state1.seats[nextToAct];
        const seatAfter = state2.seats[nextToAct];

        if (canAct(seatBefore)) {
            actions.push(getAction(seatBefore, seatAfter, totalPot, maxBet));

            totalPot += (seatAfter.pot - seatBefore.pot);
            maxBet = Math.max(maxBet, seatAfter.pot);
        }

        nextToAct = nextPlayer(state1.seats, nextToAct);
    } while (!state2.seats[nextToAct].hasAction);

    return actions.join('.');
};


export default extractActions;