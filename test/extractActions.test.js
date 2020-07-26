import extractActions from '../src/extractActions.js';
import {expect} from 'chai';

describe('extractActions', () => {
    describe('actions', () => {
        it ('bet', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 195, pot: 5 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]

                }
            })).to.equal('40060');
        });

        it ('pot', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 194, pot: 6 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]

                }
            })).to.equal('2');
        });

        it ('call', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 198, pot: 2 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]
                }
            })).to.equal('1');
        });

        it ('all-in', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 0, pot: 200 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]
                }
            })).to.equal('3');
        });

        it ('bet+call', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 200, pot: 0, hasAction: true },
                        { stack: 199, pot: 1 },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 195, pot: 5 },
                        { stack: 195, pot: 5 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]
                }
            })).to.equal('40060.1');
        });

        it ('fold', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 200, pot: 0, hasAction: true },
                        { stack: 199, pot: 1 },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 200, pot: 0, isFolded: true },
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 198, pot: 2 }
                    ]
                }
            })).to.equal('0');
        });

        it ('check', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 199, pot: 1 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1 },
                        { stack: 199, pot: 1, hasAction: true }
                    ]
                }
            })).to.equal('1');
        });
    });

    describe('behavior', () => {
        it ('wraparound', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 199, pot: 1, hasAction: true },
                        { stack: 198, pot: 2 }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 194, pot: 6, hasAction: true },
                        { stack: 180, pot: 20 }
                    ]
                }
            })).to.equal('2.40100');
        });

        it ('skips already-folded players', () => {
            const branch = extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 200, pot: 0, isFolded: true },
                        { stack: 198, pot: 2 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 200, pot: 0, isFolded: true },
                        { stack: 198, pot: 2, hasAction: true },
                        { stack: 194, pot: 6  }
                    ]
                }
            });
            const actions = branch.split('.');
            expect(actions).to.have.length(1);
        });

        it ('skips already-all-in players', () => {
            expect(extractActions({
                state1: {
                    pot: 0,
                    seats: [
                        { stack: 0, pot: 2 },
                        { stack: 198, pot: 2 },
                        { stack: 198, pot: 2, hasAction: true }
                    ]
                },
                state2: {
                    pot: 0,
                    seats: [
                        { stack: 0, pot: 2 },
                        { stack: 198, pot: 2, hasAction: true },
                        { stack: 192, pot: 8  }
                    ]
                }
            })).to.equal('2');
         });        
    });
});