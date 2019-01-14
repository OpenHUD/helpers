import representRange from '../src/representRange.js';
import {expect} from 'chai';

describe('representRange', () => {
    it ('supports high end pocket pair', () => {
        const range = new Set(['AA']);
        expect(representRange({range})).to.equal('AA');
    });

    it ('supports high end range of pocket pairs', () => {
        const range = new Set(['AA', 'KK']);
        expect(representRange({range})).to.equal('KK+');
    });

    it ('supports range of pocket pairs', () => {
        const range = new Set(['55', '44']);
        expect(representRange({range})).to.equal('55-44');
    });

    it ('supports high end range of suited hands', () => {
        const range = new Set(['AKs', 'AQs']);
        expect(representRange({range})).to.equal('AQs+');
    });

    it ('supports high end suited hand', () => {
        const range = new Set(['AKs']);
        expect(representRange({range})).to.equal('AKs');
    });

    it ('supports range of suited hands', () => {
        const range = new Set(['A5s', 'A4s']);
        expect(representRange({range})).to.equal('A5s-A4s');
    });

    it ('supports suited ranges edge case', () => {
        const range = new Set(['AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KQs']);
        expect(representRange({range})).to.equal('A2s+,KQs');
    });

    it ('supports high end off suit hand', () => {
        const range = new Set(['AKo']);
        expect(representRange({range})).to.equal('AKo');
    });

    it ('supports high end range of off suit hands', () => {
        const range = new Set(['AKo', 'AQo']);
        expect(representRange({range})).to.equal('AQo+');
    });

    it ('supports range of off suit hands', () => {
        const range = new Set(['A5o', 'A4o']);
        expect(representRange({range})).to.equal('A5o-A4o');
    });

    it ('supports off suit ranges edge case', () => {
        const range = new Set(['AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o', 'KQo']);
        expect(representRange({range})).to.equal('A2o+,KQo');
    });

    it ('supports combination of different hands', () => {
        const range = new Set(['AA', 'KK', '55', '44', '22', 'AKs', 'AQs', 'A5s', 'A4s', 'A2s', 'AKo', 'AQo', 'A5o', 'A4o', 'A2o']);
        expect(representRange({range})).to.equal('KK+,55-44,22,AQs+,A5s-A4s,A2s,AQo+,A5o-A4o,A2o');
    });
});