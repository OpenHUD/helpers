import Positions from './Positions.js';

const positions2 = new Map([
    [0, Positions.Early],
    [1, Positions.Late]
]);

const positions3 = new Map([
    [0, Positions.Early],
    [1, Positions.Middle],
    [2, Positions.Late]
]);

const positions4 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Middle],
    [3, Positions.Late]
]);

const positions5 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Middle],
    [3, Positions.Late],
    [4, Positions.Late]
]);

const positions6 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Early],
    [3, Positions.Middle],
    [4, Positions.Late],
    [5, Positions.Late]
]);

const positions7 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Early],
    [3, Positions.Middle],
    [4, Positions.Middle],
    [5, Positions.Late],
    [6, Positions.Late]
]);

const positions8 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Early],
    [3, Positions.Middle],
    [4, Positions.Middle],
    [5, Positions.Middle],
    [6, Positions.Late],
    [7, Positions.Late]
]);

const positions9 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Early],
    [3, Positions.Middle],
    [4, Positions.Middle],
    [5, Positions.Middle],
    [6, Positions.Late],
    [7, Positions.Late],
    [8, Positions.Late]
]);

const positions10 = new Map([
    [0, Positions.Early],
    [1, Positions.Early],
    [2, Positions.Early],
    [3, Positions.Middle],
    [4, Positions.Middle],
    [5, Positions.Middle],
    [6, Positions.Middle],
    [7, Positions.Late],
    [8, Positions.Late],
    [9, Positions.Late]
]);

const positions = new Map([
    [2, positions2],
    [3, positions3],
    [4, positions4],
    [5, positions5],
    [6, positions6],
    [7, positions7],
    [8, positions8],
    [9, positions9],
    [10, positions10]
]);

const position = ({players, index}) => {
    return positions.get(players).get(index);
  }

export default position;