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

        it ('one raise', () => {
            expect(extractInitialState({
                state: {
                    game: {
                        sb: 0.5
                    },
                    pots: [],
                    seats: [
                        {pot: 0.5, stack: 99.5},
                        {pot: 1, stack: 99},
                        {pot: 3.5, stack: 96.5},
                        {pot: 0, stack: 100, isHero: true, hasButton: true, hasAction: true},
                    ]
                }
            })).to.deep.equal({
                game: {
                    sb: 0.5
                },
                pots: [],
                seats: [
                    {pot: 0.5, stack: 99.5},
                    {pot: 1, stack: 99},
                    {pot: 0, stack: 100, hasAction: true},
                    {pot: 0, stack: 100, isHero: true, hasButton: true},
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