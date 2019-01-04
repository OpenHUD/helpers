import Positions from '../src/Positions.js';
import position from '../src/position.js';
import {expect} from 'chai';

const verifyPositions = (early, middle, late) => {
    const players = early + middle + late;
    for (let index = 0; index < early; ++index) {
        expect(position({players, index})).to.equal(Positions.Early);
    }
    for (let index = early; index < early+middle; ++index) {
        expect(position({players, index})).to.equal(Positions.Middle);
    }
    for (let index = early+middle; index < players; ++index) {
        expect(position({players, index})).to.equal(Positions.Late);
    }
};

describe('position', () => {
    it ('supports heads-up', () => {
        verifyPositions(1, 0, 1);
    });

    it ('supports 3-handed', () => {
        verifyPositions(1, 1, 1);
    });

    it ('supports 4-handed', () => {
        verifyPositions(2, 1, 1);
    });

    it ('supports 5-handed', () => {
        verifyPositions(2, 1, 2);
    });

    it ('supports 6-handed', () => {
        verifyPositions(3, 1, 2);
    });

    it ('supports 7-handed', () => {
        verifyPositions(3, 2, 2);
    });

    it ('supports 8-handed', () => {
        verifyPositions(3, 3, 2);
    });

    it ('supports 9-handed', () => {
        verifyPositions(3, 3, 3);
    });

    it ('supports 10-handed', () => {
        verifyPositions(3, 4, 3);
    });
});