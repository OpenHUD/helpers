import represent from '../src/represent.js';
import {expect} from 'chai';

describe('represent', () => {
    describe('2 cards', () => {
        it ('supports pocket pairs', () => {
            const hand = ['As', 'Ad'];
            expect(represent({hand})).to.equal('AA');
        });

        it ('supports suited hands', () => {
            const hand = ['As', 'Ks'];
            expect(represent({hand})).to.equal('AKs');
        });

        it ('supports offsuit hands', () => {
            const hand = ['As', 'Kd'];
            expect(represent({hand})).to.equal('AKo');
        });

        it ('correctly orders ranks', () => {
            const hand = ['Ks', 'As'];
            expect(represent({hand})).to.equal('AKs');
        });
    });

    describe('4 cards', () => {
        it ('supports rainbow hands', () => {
            const hand = ['As', 'Ad', 'Ac', 'Ah'];
            expect(represent({hand})).to.equal('AAAA');
        });

        it ('supportd double suited hands', () => {
            const hand = ['Ks', 'As', 'Kd', 'Ad'];
            expect(represent({hand})).to.equal('(AK)(AK)');
        });

        it ('supports triple suited hands', () => {
            const hand = ['Kc', 'Ac', 'Ad', 'As'];
            expect(represent({hand})).to.equal('(AK)AA');
        });

        it ('supports monotone hands', () => {
            const hand = ['8s', 'Ks', 'As', '4s'];
            expect(represent({hand})).to.equal('(AK84)');
        });

        it ('correctly orders suits in rainbow hands', () => {
            const hand = ['2s', 'Ad', 'Tc', 'Kh'];
            expect(represent({hand})).to.equal('AKT2');
        });

        it ('correctly orders suits in single suited hands', () => {
            const hand = ['Kd', 'Tc', 'Kc', 'Ah'];
            expect(represent({hand})).to.equal('A(KT)K');
        });

        it ('correctly orders suits in double suited hands', () => {
            const hand = ['Kc', 'Tc', '2d', 'Ad'];
            expect(represent({hand})).to.equal('(A2)(KT)');
        });

        it ('correctly orders suits in extra suited hands', () => {
            const hand = ['8s', 'Ks', 'Ac', 'As'];
            expect(represent({hand})).to.equal('(AK8)A');
        });
    });    
});