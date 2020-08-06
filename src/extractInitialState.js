import cloneDeep from 'lodash/cloneDeep';

const extractInitialStateHeadsUp = state => {
    const initialState = cloneDeep(state);

    initialState.seats.forEach(seat => {
        delete seat.isFolded;
        delete seat.hasAction;

        if (seat.hasButton) {
            seat.hasAction = true;
            seat.stack += seat.pot - state.game.sb;
            seat.pot = state.game.sb;
        } else {
            seat.stack += seat.pot - 1;
            seat.pot = 1;
        }
    });

    return initialState;
};

const extractInitialStateMultiWay = state => {
    const initialState = cloneDeep(state);

    const btnIndex = state.seats.findIndex(seat => seat.hasButton);
    const sbIndex = (btnIndex + 1) % state.seats.length;
    const bbIndex = (sbIndex + 1) % state.seats.length;
    const firstToActIndex = (bbIndex + 1) % state.seats.length;

    initialState.seats.forEach((seat, index) => {
        delete seat.isFolded;
        delete seat.hasAction;

        if (index === sbIndex) {
            seat.stack += seat.pot - state.game.sb;
            seat.pot = state.game.sb;
        } else if (index === bbIndex) {
            seat.stack += seat.pot - 1;
            seat.pot = 1;
        } else {
            if (index === firstToActIndex) {
                seat.hasAction = true;
            }
            seat.stack += seat.pot;
            seat.pot = 0;
        }
    });    

    return initialState;
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