
const extractInitialStateHeadsUp = state => {
    const { game, pots, seats } = state;

    // HACK: assume standard "btn is sb and acts first" scenario
    const btnSeat = seats.find(seat => seat.hasButton);
    if (btnSeat.hasAction) {
        return state;
    } else {
        return {
            game,
            pots,
            seats: seats.map(seat => {
                if (seat.hasButton) {
                    return { pot: game.sb, stack: seat.pot + seat.stack - game.sb, hasButton: true, hasAction: true, isHero: !!seat.isHero }; 
                } else {
                    return { pot: seat.pot, stack: seat.stack, isHero: !!seat.isHero };
                }
            })
        };
    }
};

// TODO: implement
const extractInitialStateMultiWay = state => state;

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