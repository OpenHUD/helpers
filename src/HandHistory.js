import extractInitialState from './extractInitialState.js';
import extractActions from './extractActions.js';

class HandHistory {
    constructor({ state }) {
        this._initialState = extractInitialState({ state });
        this._actions = extractActions({
            state1: this._initialState,
            state2: state
        });
        this._lastState = state;
    }

    updateState({ state }) {
        const newActions = extractActions({
            state1: this._lastState,
            state2: state
        });

        if (newActions.length > 0) {
            this._actions = (this._actions.length === 0) ? newActions : `${this._actions}.${newActions}`;
        }
        this._lastState = state;
    }

    get initialState() {
        return this._initialState;
    }

    get actions() {
        return this._actions;
    }
}

export default HandHistory;