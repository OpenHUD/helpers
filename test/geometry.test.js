import geometry from '../src/geometry.js';
import {expect} from 'chai';

describe('geometry', () => {
    it('calculates width', () => {
        const box = [{'x':0, 'y':0}, {'x':1, 'y':1}];
        expect(geometry.width(box)).to.equals(1);
    });

    it('calculates height', () => {
        const box = [{'x':0, 'y':0}, {'x':1, 'y':1}];
        expect(geometry.height(box)).to.equals(1);
    });

    it('normalizes a box', () => {
        const box = [{'x':25, 'y':50}, {'x':75, 'y':100}];
        expect(geometry.normalize_vertices(box, 100, 200)).to.deep.equals([{'x':0.25, 'y':0.25}, {'x':0.75, 'y':0.5}]);
    });

    it('gets the center of a box', () => {
        const box = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        expect(geometry.get_center(box)).to.deep.equals({'x':50, 'y':50});
    });

    it ('calculates the union of disjoint boxes', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':200, 'y':200}, {'x':300, 'y':300}];
        expect(geometry.union(box1, box2)).to.deep.equals([{'x':0, 'y':0}, {'x':300, 'y':300}]);
    });

    it ('calculates the union of intersecting boxes', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':50, 'y':50}, {'x':75, 'y':300}];
        expect(geometry.union(box1, box2)).to.deep.equals([{'x':0, 'y':0}, {'x':100, 'y':300}]);
    });

    it ('can tell if a box is in another box', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':50, 'y':50}, {'x':75, 'y':75}];
        expect(geometry.is_in(box1, box2)).to.be.true;
    });

    it ('can tell if a box is not in another box', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':50, 'y':50}, {'x':75, 'y':300}];
        expect(geometry.is_in(box1, box2)).to.be.false;
    });

    it ('can tell if a box is under a point', () => {
        const point = {'x':100, 'y':100};
        const box = [{'x':50, 'y':150}, {'x':300, 'y':250}];
        expect(geometry.is_under(point, box)).to.be.true;
    });

    it ('can tell if a box is not under a point', () => {
        const point = {'x':100, 'y':100};
        const box = [{'x':50, 'y':50}, {'x':300, 'y':300}];
        expect(geometry.is_under(point, box)).to.be.false;
    });

    it ('calculates iou of 2 boxes', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':50, 'y':50}, {'x':75, 'y': 200}];
        expect(geometry.iou(box1, box2)).to.equals(0.1);
    });

    it ('calculates min distance between two boxes', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':200, 'y':200}, {'x':300, 'y': 300}];
        expect(geometry.min_distance(box1, box2)).to.equals(141.4213562373095);
    });

    it ('calculates center distance between two boxes', () => {
        const box1 = [{'x':0, 'y':0}, {'x':100, 'y':100}];
        const box2 = [{'x':200, 'y':200}, {'x':300, 'y': 300}];
        expect(geometry.center_distance(box1, box2)).to.equals(282.842712474619);
    });

    it ('compares two positions as if they were sitting at a poker table counter clockwise', () => {
        const hero = [{'x':561, 'y':537}, {'x':715, 'y':705}];
        const box1 = [{'x':226, 'y':173}, {'x':368, 'y':320}];
        const box2 = [{'x':206, 'y':435}, {'x':346, 'y': 575}];
        expect(geometry.is_closer_to_hero(hero, box1, box2)).to.equals(1);
    });
});