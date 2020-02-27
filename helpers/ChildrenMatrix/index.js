/**
 * constructor function
 * @param {*} n matrix length
 * @returns an instance of ChildrenMatrix
 */
function ChildrenMatrix(children) {
  if (!Array.isArray(children) || children.length === 0) {
    throw new Error(
      "invalid children passed to ChildrenMatrix constructor function. Should be an array of at least one child"
    );
  }

  this.children = children;
  this.n = children.length;
  this.matrix = new Array(this.n)
    .fill(null)
    .map(_ => new Array(this.n).fill(null));
}

ChildrenMatrix.prototype.setChild = function({ i, j }, child) {
  this.matrix[i][j] = child;
};

ChildrenMatrix.prototype.getSlotRowNeighbors = function({ i, j }) {
  return this.matrix[i].filter(item => item);
};

ChildrenMatrix.prototype.getSlotColumnNeighbors = function({ i, j }) {
  return this.matrix.reduce((acc, v) => {
    return v[j] ? acc.concat(v[j]) : acc;
  }, []);
};

ChildrenMatrix.prototype.sortChildren = function(children) {
  const childrenDiameter = children.map(child => {
    const diameter = Math.sqrt(
      Math.pow(child.globalBounds.x, 2) + Math.pow(child.globalBounds.y, 2)
    );

    return { child, diameter };
  });

  // sort the childrenDiameter array based on diameter
  childrenDiameter.sort((a, b) => a.diameter - b.diameter);

  return childrenDiameter.map(item => item.child);
};

ChildrenMatrix.prototype.calculateSlotChildMetric = function(slot, newChild) {
  let metric = 0;

  const rowNeighbors = this.getSlotRowNeighbors(slot);

  const columnNeighbors = this.getSlotColumnNeighbors(slot);

  rowNeighbors.forEach(rowNeighbor => {
    metric += Math.abs(newChild.globalBounds.y - rowNeighbor.globalBounds.y);
  });

  columnNeighbors.forEach(columnNeighbor => {
    metric += Math.abs(newChild.globalBounds.x - columnNeighbor.globalBounds.x);
  });

  return metric;
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
    const metric = this.calculateSlotChildMetric(slot, newChild);

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

ChildrenMatrix.prototype.generateCode = function() {
  /* initial assumptions: 
  - children are leaves
  - in case of dispersed children, primary axis is fixed to column
  */

  // check whether children exist in one column
  const childrenExistInOneColumn = this.matrix.reduce(
    (acc, tuple) => !!tuple[0] && acc,
    true
  );

  if (childrenExistInOneColumn) {
    return `<View>
    ${Array(this.n)
      .fill(1)
      .map(_ => "<Item />")}
</View>`;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = this.matrix[0].reduce(
    (acc, v) => !!v && acc,
    true
  );

  if (childrenExistInOneRow) {
    return `<View style={{flexDirection: 'row'}}>
    ${Array(this.n)
      .fill(1)
      .map(_ => "<Item />")}
</View>`;
  }

  // children are dispersed
  const getTupleChildrenCount = function(tuple) {
    return tuple.reduce((acc, v) => (!!v ? acc + 1 : acc), 0);
  };

  return `<View>
  ${this.matrix.map(tuple => {
    const childrenCount = getTupleChildrenCount(tuple);

    return (
      childrenCount &&
      `<View ${childrenCount > 1 ? "style={{flexDirection: 'row'}}" : ""}>
    ${tuple.map(child => child && "<Item />")}
  </View>\n`
    );
  })}
</View>`;
};

module.exports = {
  ChildrenMatrix
};
