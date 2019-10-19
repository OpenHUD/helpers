import Actions from './Actions.js';

const getAction = (playerStateBefore, playerStateAfter, effectivePot) => {
    if (playerStateAfter.isFolded) {
        return { action: Actions.Fold };
    } else {
        const potDiff = playerStateAfter.pot - playerStateBefore.pot;
        if (potDiff > 0) {
            return { action: (playerStateAfter.pot > effectivePot) ? Actions.Bet : Actions.Call, amount: potDiff };
        } else {
            return { action: Actions.Check };
        }
    }
};

const canAct = playerState => !playerState.isFolded && playerState.stack > 0;

// Returns a list of actions that turns state1 to state2.
// Implementation assumes the two states are different, and reachable with at most one action per player.
//
// State is an array of PlayerState objects {stack, pot, isFolded, hasAction} with a single hasAction = true.
const extractActions = ({state1, state2}) => {
    const actions = [];

    const pots = state1.map(playerState => playerState.pot);
    let effectivePot = Math.max(...pots);

    let nextToAct = state1.findIndex(playerState => playerState.hasAction);
    do {
        const playerStateBefore = state1[nextToAct];
        const playerStateAfter = state2[nextToAct];

        if (canAct(playerStateBefore)) {
            actions.push(getAction(playerStateBefore, playerStateAfter, effectivePot));
            effectivePot = Math.max(effectivePot, playerStateAfter.pot);
        }

        nextToAct = (nextToAct + 1) % state1.length;
    } while (!state2[nextToAct].hasAction);

    return actions;
};


export default extractActions;