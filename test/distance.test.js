import distance from '../src/distance.js';
import {expect} from 'chai';

describe('distance', () => {
    it ('supports pocket pairs', () => {
        expect(distance({rank1: 'A', rank2: 'A'})).to.equal(0);
    });

    it ('supports non-ace cards', () => {
        expect(distance({rank1: '7', rank2: '8'})).to.equal(1);
    });

    it ('supports ace as high card', () => {
        expect(distance({rank1: 'A', rank2: '8'})).to.equal(6);
    });

    it ('supports ace as low card', () => {
        expect(distance({rank1: 'A', rank2: '7'})).to.equal(6);
    });
});