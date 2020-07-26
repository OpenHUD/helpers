import extractInitialState from '../src/extractInitialState.js';
import {expect} from 'chai';

describe('extractInitialState', () => {
    describe('Heads up', () => {
        it ('button hasn\'t acted yet', () => {
            expect(extractInitialState({
                state: {
                    game: {
                        sb: 0.4
                    },
                    pots: [],
                    seats: [
                        { stack: 99.6, pot: 0.4, hasAction: true, hasButton: true, isHero: true },
                        { stack: 99, pot: 1 }
                    ]
                }
            })).to.deep.equal({
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { stack: 99.6, pot: 0.4, hasAction: true, hasButton: true, isHero: true },
                    { stack: 99, pot: 1 }
                ]
            });
        });

        it ('button acted', () => {
            expect(extractInitialState({
                state: {
                    game: {
                        sb: 0.4
                    },
                    pots: [],
                    seats: [
                        { stack: 99.6, pot: 0.4, hasButton: true },
                        { stack: 99, pot: 1, hasAction: true, isHero: true }
                    ]
                }
            })).to.deep.equal({
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { stack: 99.6, pot: 0.4, hasAction: true, hasButton: true },
                    { stack: 99, pot: 1, isHero: true }
                ]
            });
        });        
    });

    describe('Multi-way', () => {
        it ('nothing happened yet', () => {
            expect(extractInitialState({
                state: {
                    game: {
                        sb: 0.4
                    },
                    pots: [],
                    seats: [
                        { stack: 99.6, pot: 0.4 },
                        { stack: 99, pot: 1 },
                        { stack: 100, pot: 0, hasAction: true, hasButton: true, isHero: true }
                    ]
                }
            })).to.deep.equal({
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { stack: 99.6, pot: 0.4 },
                    { stack: 99, pot: 1 },
                    { stack: 100, pot: 0, hasAction: true, hasButton: true, isHero: true }
                ]
            });
        });

        it ('button called', () => {
            expect(extractInitialState({
                state: {
                    game: {
                        sb: 0.4
                    },
                    pots: [],
                    seats: [
                        { stack: 99.6, pot: 0.4, hasAction: true },
                        { stack: 99, pot: 1 },
                        { stack: 99, pot: 1, hasButton: true, isHero: true }
                    ]
                }
            })).to.deep.equal({
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { stack: 99.6, pot: 0.4 },
                    { stack: 99, pot: 1 },
                    { stack: 100, pot: 0, hasAction: true, hasButton: true, isHero: true }
                ]
            });
        });

        it ('button folded', () => {
            expect(extractInitialState({
                state: {
                    game: {
                        sb: 0.4
                    },
                    pots: [],
                    seats: [
                        { stack: 99.6, pot: 0.4, hasAction: true },
                        { stack: 99, pot: 1 },
                        { stack: 100, pot: 0, hasButton: true, isHero: true, isFolded: true }
                    ]
                }
            })).to.deep.equal({
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { stack: 99.6, pot: 0.4 },
                    { stack: 99, pot: 1 },
                    { stack: 100, pot: 0, hasAction: true, hasButton: true, isHero: true }
                ]
            });
        });        
    });    
});