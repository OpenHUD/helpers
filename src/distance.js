const rankIndices = new Map([
    ['A', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['T', 10],
    ['J', 11],
    ['Q', 12],
    ['K', 13]
]);

const distance = ({rank1, rank2}) => {
    const diff = Math.abs(rankIndices.get(rank1) - rankIndices.get(rank2));
    if (rank1 === 'A' || rank2 === 'A') {
      return Math.min(diff, 13-diff);
    } else {
      return diff;
    }
  }

export default distance;