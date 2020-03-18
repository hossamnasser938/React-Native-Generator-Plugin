/**
 * constructor function that gets children array of a container node
 * and builds a matrix in which children are layed based on their coordinates
 * this matrix helps aligning children using the flexbox algorithm
 *
 * This technique is based on 3 simple assumptions:
 * - nodes with close x values are more likely to exist in the same column
 * - nodes with close y values are more likely to exist in the same row
 * - nodes close to the very top left are aligned first
 *
 * Terms
 * - slot => an object {i, j} such that i is the first index and j is the second index of an item within the matrix
 * - child => an instance of Scenenode
 * - matrix =>  a 2D array. For n items we create a 2D array of n rows each row with n items
 *
 * @param {*} children an array of nodes that exists within the bounds of a container node
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

  // initiate a 2D array with falsy values until being populated with children
  this.matrix = new Array(this.n)
    .fill(null)
    .map(_ => new Array(this.n).fill(null));
}

/**
 * sets a child node in a given empty slot
 * @param slot
 * @param child
 * @returns nothing
 */
ChildrenMatrix.prototype.setChild = function({ i, j }, child) {
  this.matrix[i][j] = child;
};

/**
 * gets a child node from a given empty slot
 * @param slot
 * @returns node
 */
ChildrenMatrix.prototype.getChild = function({ i, j }) {
  return this.matrix[i][j];
};

/**
 * gets the slots that contain children nodes within the same row of the given empty slot
 * @param slot
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getSlotRowNeighbors = function({ i, j }) {
  return this.matrix[i].filter((item, index) => index !== j && item);
};

/**
 * gets the slots that contain children nodes within the same column of the given empty slot
 * @param slot
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getSlotColumnNeighbors = function({ i, j }) {
  return this.matrix.reduce((acc, row, index) => {
    return index !== i && row[j] ? acc.concat(row[j]) : acc;
  }, []);
};

/**
 * gets all children in a 1-D array
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.flatten = function() {
  const flattenedArray = [];

  this.matrix.forEach(row => {
    row.forEach(node => {
      if (node) {
        flattenedArray.push(node);
      }
    });
  });

  return flattenedArray;
};

/**
 * checks if all children are aligned in one column
 * @returns a boolean value
 */
ChildrenMatrix.prototype.doesChildrenExistInOneColumn = function() {
  return this.matrix.reduce((acc, row) => !!row[0] && acc, true);
};

/**
 * checks if all children are aligned in one row
 * @returns a boolean value
 */
ChildrenMatrix.prototype.doesChildrenExistInOneRow = function() {
  return this.matrix[0].reduce((acc, node) => !!node && acc, true);
};

/**
 * gets the number of nodes in a give row
 * @param rowIndex
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getRowActualChildrenCount = function(rowIndex) {
  return this.matrix[rowIndex].reduce(
    (acc, node) => (!!node ? acc + 1 : acc),
    0
  );
};

/**
 * gets the nodes within a column
 * @param columnIndex
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getColumnNodes = function(columnIndex) {
  return this.matrix.reduce((acc, row) => {
    return row[columnIndex] ? acc.concat(row[columnIndex]) : acc;
  }, []);
};

/**
 * checks if 2 nodes exists in the same column(another meaning one of them exists withing the same vertical range of the other)
 */
ChildrenMatrix.prototype.doNodesExistWithinSameColumn = function(
  firstNode,
  secondNode
) {
  return (
    (firstNode.globalBounds.x >= secondNode.globalBounds.x &&
      firstNode.globalBounds.x <=
        secondNode.globalBounds.x + secondNode.globalBounds.width) ||
    (secondNode.globalBounds.x >= firstNode.globalBounds.x &&
      secondNode.globalBounds.x <=
        firstNode.globalBounds.x + firstNode.globalBounds.width)
  );
};

/**
 * checks if 2 nodes exists in the same row(another meaning one of them exists withing the same horizontal range of the other)
 */
ChildrenMatrix.prototype.doNodesExistWithinSameRow = function(
  firstNode,
  secondNode
) {
  return (
    (firstNode.globalBounds.y >= secondNode.globalBounds.y &&
      firstNode.globalBounds.y <=
        secondNode.globalBounds.y + secondNode.globalBounds.height) ||
    (secondNode.globalBounds.y >= firstNode.globalBounds.y &&
      secondNode.globalBounds.y <=
        firstNode.globalBounds.y + firstNode.globalBounds.height)
  );
};

/**
 * sorts the children array such that nodes at the very top left comes first
 * @returns nothing
 */
ChildrenMatrix.prototype.sortChildren = function() {
  this.children.sort((a, b) => {
    return this.doNodesExistWithinSameRow(a, b)
      ? a.globalBounds.x - b.globalBounds.x
      : a.globalBounds.y - b.globalBounds.y;
  });
};

/**
 * calculates the likelihood that a new child node should be layed in a given slot relative to a set of possible slots
 * @param slot
 * @param newChild
 * @returns the likelihood value
 */
ChildrenMatrix.prototype.calculateSlotChildMetric = function(slot, newChild) {
  let metric = 0;

  const rowNeighbors = this.getSlotRowNeighbors(slot);

  const columnNeighbors = this.getSlotColumnNeighbors(slot);

  rowNeighbors.forEach(rowNeighbor => {
    if (this.doNodesExistWithinSameRow(newChild, rowNeighbor)) {
      metric += 1;
    } else {
      metric -= 1;
    }
  });

  columnNeighbors.forEach(columnNeighbor => {
    if (this.doNodesExistWithinSameColumn(newChild, columnNeighbor)) {
      metric += 1;
    } else {
      metric -= 1;
    }
  });

  return metric;
};

/**
 * gets the empty slots that a new child node can be layed in
 * based on the number and positions of the children that are currently being in the matrix
 * @returns an array of ampty slots
 */
ChildrenMatrix.prototype.getPossibleSlots = function() {
  let containsAtLeastOneChild = false;
  const possibleSlots = [];

  this.matrix.forEach((row, rowIndex) => {
    row.forEach((slot, columnIndex) => {
      if (
        !slot &&
        (rowIndex === 0 || this.getRowActualChildrenCount(rowIndex - 1)) &&
        (columnIndex === 0 || this.getColumnNodes(columnIndex - 1).length)
      ) {
        possibleSlots.push({ i: rowIndex, j: columnIndex });
      }
    });
  });

  return possibleSlots;
};

/**
 * gets the most suitable empty slot in which a new child should be layed in
 * @param newChild
 * @returns an empty slot
 */
ChildrenMatrix.prototype.getMostSuitableSlot = function(newChild) {
  const possibleSlots = this.getPossibleSlots();

  const slotsMetrics = [];

  // evaluate slots
  possibleSlots.forEach(slot => {
    const metric = this.calculateSlotChildMetric(slot, newChild);

    slotsMetrics.push({ slot, metric });
  });

  const leastMetricSlot = slotsMetrics.reduce((acc, v) => {
    if (v.metric > acc.metric) {
      return v;
    }

    return acc;
  }, slotsMetrics[0]);

  return leastMetricSlot.slot;
};

/**
 * determines the nodes that should be duplicated in multiple slots when the row of node structure is not enough
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getNodesToBeDuplicated = function() {
  const toBeDuplicatedNodes = [];

  this.matrix.forEach((row, i) => {
    row.forEach((node, j) => {
      if (
        node && // not empty slot
        this.matrix[i + 1] && // not last row in the matrix
        this.getRowActualChildrenCount(i + 1) && // next row has nodes
        !this.getChild({ i: i + 1, j }) && // the bottom neighbor is an empty slot
        // check if any node in the next row lies within the height of this node
        this.getSlotRowNeighbors({ i: i + 1, j }).find(
          item =>
            item.globalBounds.y >= node.globalBounds.y &&
            item.globalBounds.y <=
              node.globalBounds.y + node.globalBounds.height
        )
      ) {
        toBeDuplicatedNodes.push({ node, slot: { i, j } });
      }
    });
  });

  return toBeDuplicatedNodes;
};

/**
 * gets the first slot of a duplicated node if exist
 * @returns a slot object or null
 */
ChildrenMatrix.prototype.checkDuplicatedNodesExist = function() {
  // iterate over columns
  for (let j = 0; j < this.n; j++) {
    const columnNodes = this.getColumnNodes(j);

    // get top duplicated node row index
    const nodeRowIndex = columnNodes.findIndex(
      (node, index) =>
        index < columnNodes.length - 1 && // it is not the last node in the array
        node.guid === columnNodes[index + 1].guid // it occupies the next node
    );

    if (nodeRowIndex !== -1) {
      return { i: nodeRowIndex, j };
    }
  }

  return null;
};

/**
 * given a slot of a duplicated node, it gets how many rows to be merged(or how many duplicated node exist)
 * @param {*} slot a slot that contains a duplicated node
 * @returns an integer representing how many duplicated nodes
 */
ChildrenMatrix.prototype.getToBeMergedRowsCount = function(targetSlot) {
  const columnNodes = this.getColumnNodes(targetSlot.j);

  return columnNodes
    .slice(targetSlot.i)
    .reduce((acc, node, index, slicedArray) => {
      if (
        index < slicedArray.length - 1 && // node not exist in the last column
        node.guid === slicedArray[index + 1].guid // the next node in the column is duplicated
      ) {
        return acc + 1;
      }

      return acc;
    }, 1);
};

/**
 * rearrange the matrix to remove duplicated nodes and create nested ChildrenMatrix to fit complex structure
 * this function updates all instance variables: children, n, matrix
 * @param {*} slot a slot that contains a duplicated node
 * @returns nothing
 */
ChildrenMatrix.prototype.rearrangeMatrix = function(targetSlot) {
  const toBeMergedRowsCount = this.getToBeMergedRowsCount(targetSlot);
  const toBeMergedRowsIndices = [targetSlot.i];

  for (let iterator = 1; iterator < toBeMergedRowsCount; iterator++) {
    toBeMergedRowsIndices.push(iterator + toBeMergedRowsIndices[0]);
  }

  let childrenCount = 1; // 1 for the duplicated nodes that will be eventually one node

  // iterate over rows not affected with the merge
  this.matrix.forEach((row, rowIndex) => {
    if (!toBeMergedRowsIndices.includes(rowIndex)) {
      childrenCount += this.getRowActualChildrenCount(rowIndex);
    }
  });

  // check if the duplicated node has items to be merged on its left & right
  let therIsLeftNodes = false;
  let thereIsRightNodes = false;

  this.matrix.forEach((row, i) => {
    row.forEach((node, j) => {
      if (node && toBeMergedRowsIndices.includes(i)) {
        if (j > targetSlot.j) {
          thereIsRightNodes = true;
        } else if (j < targetSlot.j) {
          therIsLeftNodes = true;
        }
      }
    });
  });

  if (therIsLeftNodes) {
    childrenCount += 1;
  }

  if (thereIsRightNodes) {
    childrenCount += 1;
  }

  const children = new Array(childrenCount);
  children.fill({});

  const newChildrenMatrix = new ChildrenMatrix(children);

  // set not affected nodes
  this.matrix.forEach((row, i) => {
    if (!toBeMergedRowsIndices.includes(i)) {
      row.forEach((node, j) => {
        if (node) {
          if (i > targetSlot.i + toBeMergedRowsCount - 1) {
            newChildrenMatrix.setChild(
              { i: i - toBeMergedRowsCount + 1, j },
              node
            );
          } else {
            newChildrenMatrix.setChild({ i, j }, node);
          }
        }
      });
    }
  });

  // set duplicated node
  newChildrenMatrix.setChild(
    { i: targetSlot.i, j: therIsLeftNodes ? 1 : 0 },
    this.getChild(targetSlot)
  );

  // set nodes on left and right of the duplicated node
  if (therIsLeftNodes) {
    const leftItems = [];

    this.matrix.forEach((row, i) => {
      if (toBeMergedRowsIndices.includes(i)) {
        row.forEach((node, j) => {
          if (node && j < targetSlot.j) {
            leftItems.push({ node, slot: { i, j } });
          }
        });
      }
    });

    const targetSlotLeftCMatrixChildren = leftItems.map(item => item.node);
    const targetSlotLeftCMatrix = new ChildrenMatrix(
      targetSlotLeftCMatrixChildren
    );

    leftItems.forEach(({ node, slot }) => {
      targetSlotLeftCMatrix.setChild(
        { i: slot.i - targetSlot.i, j: slot.j },
        node
      );
    });

    newChildrenMatrix.setChild(
      { i: targetSlot.i, j: 0 },
      targetSlotLeftCMatrix
    );
  }

  // set its right in the slot {i: targetSlot.i, j: 2}
  if (thereIsRightNodes) {
    const rightItems = [];

    this.matrix.forEach((row, i) => {
      if (toBeMergedRowsIndices.includes(i)) {
        row.forEach((node, j) => {
          if (node && j > targetSlot.j) {
            rightItems.push({ node, slot: { i, j } });
          }
        });
      }
    });

    const targetSlotRightCMatrixChildren = rightItems.map(item => item.node);
    const targetSlotRightCMatrix = new ChildrenMatrix(
      targetSlotRightCMatrixChildren
    );

    rightItems.forEach(({ node, slot }) => {
      targetSlotRightCMatrix.setChild(
        { i: slot.i - targetSlot.i, j: slot.j - targetSlot.j - 1 },
        node
      );
    });

    newChildrenMatrix.setChild(
      { i: targetSlot.i, j: therIsLeftNodes ? 2 : 1 },
      targetSlotRightCMatrix
    );
  }

  this.n = newChildrenMatrix.n;
  this.children = newChildrenMatrix.children;
  this.matrix = newChildrenMatrix.matrix;
};

/**
 * lays the children nodes in the matrix
 * @returns the matrix after laying the children in
 */
ChildrenMatrix.prototype.layChildrenInsideMatrix = function() {
  this.sortChildren();

  this.children.forEach(child => {
    const suitableSlot = this.getMostSuitableSlot(child);

    this.setChild(suitableSlot, child);
  });

  let toBeDuplicatedNodes = this.getNodesToBeDuplicated();

  while (toBeDuplicatedNodes.length) {
    toBeDuplicatedNodes.forEach(({ node, slot }) => {
      this.setChild({ i: slot.i + 1, j: slot.j }, node);
    });

    toBeDuplicatedNodes = this.getNodesToBeDuplicated();
  }

  let tSlot = this.checkDuplicatedNodesExist();
  while (tSlot) {
    this.rearrangeMatrix(tSlot);

    tSlot = this.checkDuplicatedNodesExist();
  }

  return this.matrix;
};

module.exports = {
  ChildrenMatrix
};
