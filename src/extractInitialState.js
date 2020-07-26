import cloneDeep from 'lodash/cloneDeep';

const extractInitialStateHeadsUp = state => {
    const initialState = cloneDeep(state);

    initialState.seats.forEach(seat => {
        if (seat.hasButton) {
            if (!seat.hasAction) {
                seat.hasAction = true;
                seat.pot = state.game.sb;
                seat.stack = seat.pot + seat.stack - state.game.sb;
            }
        } else {
            if (seat.hasAction) {
                delete seat.hasAction;
            }
        }
    });

    return initialState;
};

const extractInitialStateMultiWay = state => {
//    const { game, pots, seats } = state;
    return state;
};

// Returns the game state before any strategic action.
//
// Assumptions:
// 1. The hero did not act yet
const extractInitialState = ({ state }) => {
    if (state.seats.length === 2) {
        return extractInitialStateHeadsUp(state);
    } else {
        return extractInitialStateMultiWay(state);
    }
};


export default extractInitialState;