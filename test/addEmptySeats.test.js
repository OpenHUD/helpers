import addEmptySeats from '../src/addEmptySeats.js';
import {expect} from 'chai';

describe('addEmptySeats', () => {
    it ('does nothing on a full table', () => {
        const seats = [...Array(6).keys()].map(x => {return {'id': x+1}});
        expect(addEmptySeats({seats})).to.deep.equal(seats);
    });
}); 

