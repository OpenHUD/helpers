import HandHistory from '../src/HandHistory.js';
import { expect } from 'chai';


describe('HandHistory', () => {
    it ('extracts the initial state and actions', () => {
        const handHistory = new HandHistory({
            state: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0.4, stack: 99.6 },
                    { pot: 1, stack: 99 },
                    { pot: 0, stack: 100, hasButton: true, isHero: true, hasAction: true }
                ]
            }
        });

        expect(handHistory.initialState).to.deep.equal({
            game: {
                sb: 0.4
            },
            pots: [],
            seats: [
                { pot: 0.4, stack: 99.6 },
                { pot: 1, stack: 99 },
                { pot: 0, stack: 100, hasButton: true, isHero: true, hasAction: true }
            ]
        });

        expect(handHistory.actions).to.equal('');
    });

    it ('updates actions given new state', () => {
        const handHistory = new HandHistory({
            state: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0.4, stack: 99.6 },
                    { pot: 1, stack: 99 },
                    { pot: 0, stack: 100, isHero: true, hasAction: true },
                    { pot: 0, stack: 100, hasButton: true },
                ]
            }
        });

        handHistory.updateState({
            state: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0.4, stack: 99.6 },
                    { pot: 1, stack: 99 },
                    { pot: 0, stack: 100, isHero: true, isFolded: true },
                    { pot: 0, stack: 100, hasButton: true, hasAction: true },
                ]
            }
        });
        expect(handHistory.actions).to.equal('0');

        handHistory.updateState({
            state: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0.4, stack: 99.6, hasAction: true },
                    { pot: 1, stack: 99 },
                    { pot: 0, stack: 100, isHero: true, isFolded: true },
                    { pot: 0, stack: 100, hasButton: true, isFolded: true },
                ]
            }
        });
        expect(handHistory.actions).to.equal('0.0');    
    });
});