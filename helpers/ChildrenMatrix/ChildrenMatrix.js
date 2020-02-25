/**
 * constructor function
 * @param {*} n matrix length
 * @returns an instance of ChildrenMatrix
 */
function ChildrenMatrix(n) {
  if (typeof n !== "number" || n < 1) {
    throw new Error("invalid n passed to ChildrenMatrix constructor function");
  }

  this.n = n;
  this.matrix = new Array(n).fill(null).map(_ => new Array(n).fill(null));
}

ChildrenMatrix.prototype.setChild = function(i, j, child) {
  this.matrix[i][j] = child;
};

/**
 * getPossibleSlots
 * @returns an array of objects [{i, j}] such that i is the first index and j is the second index of a possible slot
 */
ChildrenMatrix.prototype.getPossibleSlots = function() {
  let containsAtLeastOneChild = false;
  const possibleSlots = [];

  this.matrix.forEach((tuple, rowIndex) => {
    tuple.forEach((slot, columnIndex) => {
      if (slot) {
        containsAtLeastOneChild = true;
        // slot contains a node so check its neighbours
        if (
          rowIndex + 1 > 0 &&
          rowIndex + 1 < this.n &&
          !this.matrix[rowIndex + 1][columnIndex]
        ) {
          possibleSlots.push({ i: rowIndex + 1, j: columnIndex });
        }

        if (
          columnIndex + 1 > 0 &&
          columnIndex + 1 < this.n &&
          !this.matrix[rowIndex][columnIndex + 1]
        ) {
          possibleSlots.push({ i: rowIndex, j: columnIndex + 1 });
        }
      }
    });
  });

  if (!containsAtLeastOneChild) {
    return [{ i: 0, j: 0 }];
  }

  // remove duplicates before return
  return possibleSlots.reduce((acc, v) => {
    const itemAddedBefore = acc.find(item => item.i === v.i && item.j === v.j);

    if (!itemAddedBefore) {
      return acc.concat(v);
    }

    return acc;
  }, []);
};

ChildrenMatrix.prototype.getMostSuitableSlot = function(newChild) {
  const possibleSlots = this.getPossibleSlots();

  const slotsMetrics = [];

  // evaluate slots
  possibleSlots.forEach(slot => {
    let metric = 0;

    const rowNeighbors = this.matrix[slot.i].filter(item => item);

    const columnNeighbors = this.matrix.reduce((acc, v) => {
      return v[slot.j] ? acc.concat(v[slot.j]) : acc;
    }, []);

    rowNeighbors.forEach(rowNeighbor => {
      metric += Math.abs(newChild.globalBounds.y - rowNeighbor.globalBounds.y);
    });

    columnNeighbors.forEach(columnNeighbor => {
      metric += Math.abs(
        newChild.globalBounds.x - columnNeighbor.globalBounds.x
      );
    });

    slotsMetrics.push({ slot, metric });
  });

  const leastMetricSlot = slotsMetrics.reduce((acc, v) => {
    if (v.metric < acc.metric) {
      return v;
    }

    return acc;
  }, slotsMetrics[0]);

  return leastMetricSlot.slot;
};

module.exports = {
  ChildrenMatrix
};
