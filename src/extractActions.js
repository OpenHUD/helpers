import Actions from './Actions.js';

const getAction = (playerStateBefore, playerStateAfter, pot, lastBet) => {
    if (playerStateAfter.isFolded) {
        return '0'; // fold
    } else {
        if (playerStateAfter.pot <= lastBet) {
            return '1'; // check or call
        } else if (playerStateAfter.stack === 0) {
            return '3'; // raise all-in
        } else if (playerStateAfter.pot - lastBet === pot + lastBet - playerStateBefore.pot) {
            return '2'; // raise pot
        } else {
            // TODO: '5' - raise-min
            const raisePercentage = Math.round(100 * (playerStateAfter.pot - lastBet) / (pot + lastBet));
            return `4${raisePercentage.toString().padStart(4, '0')}`;
        }
    }
};

const canAct = seat => !seat.isFolded && seat.stack > 0;

// Returns a list of actions that turns state1 to state2.
// Implementation assumes the two states are different, and reachable with at most one action per player.
//
// State is an object {pot: Int, seats: Array[PlayerState]}
// SeatState is an object {stack: Int, pot: Int, isFolded: Boolean, hasAction: Boolean}
// Exactly one SeatState.hasAction = true
const extractActions = ({state1, state2}) => {
    const actions = [];

    const pots = state1.seats.map(seat => seat.pot);
    let totalPot = pots.reduce((total, pot) => total + pot, state1.pot);
    let maxBet = Math.max(...pots);
    

    let nextToAct = state1.seats.findIndex(seat => seat.hasAction);
    do {
        const seatBefore = state1.seats[nextToAct];
        const seatAfter = state2.seats[nextToAct];

        if (canAct(seatBefore)) {
            actions.push(getAction(seatBefore, seatAfter, totalPot, maxBet));

            totalPot += (seatAfter.pot - seatBefore.pot);
            maxBet = Math.max(maxBet, seatAfter.pot);
        }

        nextToAct = (nextToAct + 1) % state1.seats.length;
    } while (!state2.seats[nextToAct].hasAction);

    return actions.join('.');
};


export default extractActions;