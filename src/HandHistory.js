import extractInitialState from './extractInitialState.js';
import extractActions from './extractActions.js';

const isSameHand = (state1, state2) => {
    if (state1.seats.length !== state2.seats.length) {
        return false;
    }

    for (let i = 0; i < state1.seats.length; ++i) {
        const seat1 = state1.seats[i];
        const seat2 = state2.seats[i];

        if ((seat1.name !== seat2.name) || (seat1.hasButton !== seat2.hasButton)) {
            return false;
        }
    }

    return true;
};

class HandHistory {
    constructor() {
        this._handId = 0;
        this._lastState = null;
        this._currentHand = null;
    }

    updateState({ state }) {
        if (!this._lastState || !isSameHand(this._lastState, state)) {
            ++this._handId;

            const initialState = extractInitialState({ state });
            this._currentHand = {
                id: this._handId,
                initialState,
                actions: extractActions({
                    state1: initialState,
                    state2: state
                })
            };
        } else {
            const newActions = extractActions({
                state1: this._lastState,
                state2: state
            });
    
            if (newActions.length > 0) {
                const currentHand = this._currentHand;
                currentHand.actions = (currentHand.actions.length === 0) ? newActions : `${currentHand.actions}.${newActions}`;
            }
        }

        this._lastState = state;
    }

    get currentHand() {
        return this._currentHand;
    }
}

export default HandHistory;