import HandHistory from '../src/HandHistory.js';
import { expect } from 'chai';


describe('HandHistory', () => {
    it ('extracts the initial state and actions', () => {
        const handHistory = new HandHistory();

        handHistory.updateState({
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

        expect(handHistory.currentHand).to.deep.equal({
            id: 1,
            initialState: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0.4, stack: 99.6 },
                    { pot: 1, stack: 99 },
                    { pot: 0, stack: 100, hasButton: true, isHero: true, hasAction: true }
                ]
            },
            actions: ''
        });
    });

    it ('updates current hand actions given states in same hand', () => {
        const handHistory = new HandHistory();
        
        handHistory.updateState({
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
        
        expect(handHistory.currentHand.actions).to.equal('0');

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

        expect(handHistory.currentHand.actions).to.equal('0.0');    
    });

    it ('updates current hand given state in new hand', () => {
        const handHistory = new HandHistory();
        
        handHistory.updateState({
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
        const hand1 = handHistory.currentHand;
        
        handHistory.updateState({
            state: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0, stack: 100, hasButton: true },
                    { pot: 0.4, stack: 99.6 },
                    { pot: 1, stack: 99, isHero: true, hasAction: true },
                    { pot: 0, stack: 100 },
                ]
            }
        });
        const hand2 = handHistory.currentHand;

        expect(hand1.id).to.not.equal(hand2.id);
    });
    it ('stays the same if updated twice with meaningless differences in the state', () => {
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
                    { pot: 0.4, stack: 99.6, name: 'foo' },
                    { pot: 1, stack: 99 },
                    { pot: 1, stack: 99, isHero: true, isFolded: false },
                    { pot: 0, stack: 100, hasButton: true, hasAction: true },
                ]
            }
        });
        expect(handHistory.actions).to.equal('1');

        handHistory.updateState({
            state: {
                game: {
                    sb: 0.4
                },
                pots: [],
                seats: [
                    { pot: 0.4, stack: 99.6, name: 'bar' },
                    { pot: 1, stack: 99 },
                    { pot: 1, stack: 99, isHero: true, isFolded: false },
                    { pot: 0, stack: 100, hasButton: true, hasAction: true },
                ]
            }
        });
        expect(handHistory.actions).to.equal('1');
    });
});