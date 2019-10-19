import extractActions from '../src/extractActions.js';
import {expect} from 'chai';
import Actions from '../src/Actions.js';

describe('extractActions', () => {
    describe('actions', () => {
        it ('bet', () => {
            expect(extractActions({
                state1: [
                    { stack: 199, pot: 1, hasAction: true },
                    { stack: 198, pot: 2 }
                ],
                state2: [
                    { stack: 194, pot: 6 },
                    { stack: 198, pot: 2, hasAction: true }
                ]
            })).to.deep.equal([
                { action: Actions.Bet, amount: 5 }
            ]);
        });

        it ('call', () => {
            expect(extractActions({
                state1: [
                    { stack: 199, pot: 1, hasAction: true },
                    { stack: 198, pot: 2 }
                ],
                state2: [
                    { stack: 198, pot: 2 },
                    { stack: 198, pot: 2, hasAction: true }
                ]
            })).to.deep.equal([
                { action: Actions.Call, amount: 1 }
            ]);
        });

        it ('bet+call', () => {
            expect(extractActions({
                state1: [
                    { stack: 200, pot: 0, hasAction: true },
                    { stack: 199, pot: 1 },
                    { stack: 198, pot: 2 }
                ],
                state2: [
                    { stack: 195, pot: 5 },
                    { stack: 195, pot: 5 },
                    { stack: 198, pot: 2, hasAction: true }
                ]
            })).to.deep.equal([
                { action: Actions.Bet, amount: 5 },
                { action: Actions.Call, amount: 4 }
            ]);
        });

        it ('fold', () => {
            expect(extractActions({
                state1: [
                    { stack: 200, pot: 0, hasAction: true },
                    { stack: 199, pot: 1 },
                    { stack: 198, pot: 2 }
                ],
                state2: [
                    { stack: 200, pot: 0, isFolded: true },
                    { stack: 199, pot: 1, hasAction: true },
                    { stack: 198, pot: 2 }
                ]
            })).to.deep.equal([
                { action: Actions.Fold }
            ]);
        });

        it ('check', () => {
            expect(extractActions({
                state1: [
                    { stack: 199, pot: 1, hasAction: true },
                    { stack: 199, pot: 1 }
                ],
                state2: [
                    { stack: 199, pot: 1 },
                    { stack: 199, pot: 1, hasAction: true }
                ]
            })).to.deep.equal([
                { action: Actions.Check }
            ]);
        });
    });

    describe('behavior', () => {
        it ('wraparound', () => {
            expect(extractActions({
                state1: [
                    { stack: 199, pot: 1, hasAction: true },
                    { stack: 198, pot: 2 }
                ],
                state2: [
                    { stack: 194, pot: 6, hasAction: true },
                    { stack: 180, pot: 20 }
                ]
            })).to.deep.equal([
                { action: Actions.Bet, amount: 5 },
                { action: Actions.Bet, amount: 18 }
            ]);
        });

        it ('skips already-folded players', () => {
            expect(extractActions({
                state1: [
                    { stack: 200, pot: 0, isFolded: true },
                    { stack: 198, pot: 2 },
                    { stack: 198, pot: 2, hasAction: true }
                ],
                state2: [
                    { stack: 200, pot: 0, isFolded: true },
                    { stack: 198, pot: 2, hasAction: true },
                    { stack: 194, pot: 6  }
                ]
            })).to.have.length(1);
        });

        it ('skips already-all-in players', () => {
            expect(extractActions({
                state1: [
                    { stack: 0, pot: 2 },
                    { stack: 198, pot: 2 },
                    { stack: 198, pot: 2, hasAction: true }
                ],
                state2: [
                    { stack: 0, pot: 2 },
                    { stack: 198, pot: 2, hasAction: true },
                    { stack: 192, pot: 8  }
                ]
            })).to.deep.equal([
                { action: Actions.Bet, amount: 6 }
            ]);
         });        
    });
});