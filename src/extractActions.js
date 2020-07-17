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

// Returns a list of actions (MonkerSolver style) that transitions state1 to state2, e.g. '2.2.1.0'.
//
// Assumptions:
// 1. The two states are different
// 2. Reaching the second state does not require more than one action per seat
// 3. Each state has exactly one seat with hasAction === true
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