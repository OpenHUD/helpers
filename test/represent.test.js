import represent from '../src/represent.js';
import {expect} from 'chai';

describe('represent', () => {
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