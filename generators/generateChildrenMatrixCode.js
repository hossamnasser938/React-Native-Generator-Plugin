const {
  flattenChildrenMatrix,
  doesChildrenExistInOneColumn,
  doesChildrenExistInOneRow,
  getTupleChildrenCount,
  getColumnNodes
} = require("../helpers/ChildrenMatrix/helpers");

const { ChildrenMatrix } = require("../helpers/ChildrenMatrix/index");

/**
 * generates code for a set of nodes aligned in a ChildrenMatrix
 * @param {*} parent
 * @param {*} childrenMatrix
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateChildrenMatrixCode(parent, childrenMatrix, additionalStyle) {
  const { generateNodeCode } = require("./generateNodeCode"); // Late require for fixing circular dependency

  // check if it is only one node
  if (childrenMatrix.n === 1) {
    return generateNodeCode(childrenMatrix.matrix[0][0], parent);
  }

  // check whether children exist in one column
  const childrenExistInOneColumn = doesChildrenExistInOneColumn(
    childrenMatrix.matrix
  );

  let code = "";

  if (childrenExistInOneColumn) {
    code += `<View${
      additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
    }>\n`;

    flattenChildrenMatrix(childrenMatrix.matrix).forEach(child => {
      code += generateNodeCode(child, parent);
    });

    code += `</View>\n`;

    return code;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = doesChildrenExistInOneRow(
    childrenMatrix.matrix
  );

  if (childrenExistInOneRow) {
    const style = { flexDirection: "row", ...additionalStyle };

    code += `<View style={${JSON.stringify(style)}}>\n`;

    flattenChildrenMatrix(childrenMatrix.matrix).forEach(child => {
      code += generateNodeCode(child, parent);
    });

    code += `</View>\n`;

    return code;
  }

  // children are dispersed

  let tSlot = checkTheCase(childrenMatrix);
  while (tSlot) {
    const toBeMergedRowsCount = getToBeMergedRowsCount(childrenMatrix, tSlot);

    const rearrangedMatrix = rearrangeMatrix(
      childrenMatrix,
      tSlot,
      toBeMergedRowsCount
    );

    childrenMatrix = rearrangedMatrix;
    tSlot = checkTheCase(childrenMatrix);
  }

  code += `<View${
    additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
  }>\n`;

  childrenMatrix.matrix.map(tuple => {
    const childrenCount = getTupleChildrenCount(tuple);

    if (childrenCount) {
      code +=
        childrenCount > 1
          ? `<View ${"style={{flexDirection: 'row'}}"}>
      ${tuple.map(child => child && generateNodeCode(child, parent))}
    </View>\n`
          : generateNodeCode(
              tuple.find(child => !!child),
              parent
            );
    }
  });

  code += `</View>\n`;

  return code;
}

function checkTheCase(cMatrix) {
  for (let j = 0; j < cMatrix.n; j++) {
    const columnNodes = getColumnNodes(cMatrix.matrix, j);

    const nodeIndex = columnNodes.findIndex(
      (node, index) =>
        index < columnNodes.length - 1 && // it is not the last node in the array
        node.guid === columnNodes[index + 1].guid // it occupies the next node
    );

    if (nodeIndex !== -1) {
      return { i: nodeIndex, j };
    }
  }

  return null;
}

function getToBeMergedRowsCount(cMatrix, targetSlot) {
  const columnNodes = getColumnNodes(cMatrix.matrix, targetSlot.j);

  return columnNodes
    .slice(targetSlot.i)
    .reduce((acc, node, index, slicedArray) => {
      if (
        index < slicedArray.length - 1 &&
        node.guid === slicedArray[index + 1].guid
      ) {
        return acc + 1;
      }

      return acc;
    }, 1);
}

function rearrangeMatrix(cMatrix, targetSlot, toBeMergedRowsCount) {
  const toBeMergedRows = [targetSlot.i];

  for (let iterator = 1; iterator < toBeMergedRowsCount; iterator++) {
    toBeMergedRows.push(iterator + toBeMergedRows[0]);
  }

  let childrenCount = 1; // for the items to be merged

  // rows not affected with the merge
  cMatrix.matrix.forEach((row, rowIndex) => {
    if (!toBeMergedRows.includes(rowIndex)) {
      childrenCount += getTupleChildrenCount(row);
    }
  });

  // items to be merged left & right adjacents
  let therIsLeft = false;
  let thereIsRight = false;

  cMatrix.matrix.forEach((tuple, i) => {
    tuple.forEach((node, j) => {
      if (node && toBeMergedRows.includes(i)) {
        if (j > targetSlot.j) {
          thereIsRight = true;
        } else if (j < targetSlot.j) {
          therIsLeft = true;
        }
      }
    });
  });

  if (therIsLeft) {
    childrenCount += 1;
  }

  if (thereIsRight) {
    childrenCount += 1;
  }

  const children = new Array(childrenCount);

  children.fill({});

  const newChildrenMatrix = new ChildrenMatrix(children);

  // set not affected nodes
  cMatrix.matrix.forEach((tuple, i) => {
    if (!toBeMergedRows.includes(i)) {
      tuple.forEach((node, j) => {
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

  // set targetSlot and its subsequents in the slot {i: targetSlot.i, j: 1}
  newChildrenMatrix.setChild(
    { i: targetSlot.i, j: therIsLeft ? 1 : 0 },
    cMatrix.matrix[targetSlot.i][targetSlot.j]
  );

  // set its left in the slot {i: targetSlot.i, j: 0}
  if (therIsLeft) {
    const leftNodes = [];

    cMatrix.matrix.forEach((tuple, i) => {
      if (toBeMergedRows.includes(i)) {
        tuple.forEach((node, j) => {
          if (node && j < targetSlot.j) {
            leftNodes.push({ node, slot: { i, j } });
          }
        });
      }
    });

    const targetSlotLeftCMatrixChildren = new Array(leftNodes.length);
    targetSlotLeftCMatrixChildren.fill({});

    const targetSlotLeftCMatrix = new ChildrenMatrix(
      targetSlotLeftCMatrixChildren
    );

    leftNodes.forEach(({ node, slot }) => {
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
  if (thereIsRight) {
    const rightNodes = [];

    cMatrix.matrix.forEach((tuple, i) => {
      if (toBeMergedRows.includes(i)) {
        tuple.forEach((node, j) => {
          if (node && j > targetSlot.j) {
            rightNodes.push({ node, slot: { i, j } });
          }
        });
      }
    });

    const targetSlotRightCMatrixChildren = new Array(rightNodes.length);
    targetSlotRightCMatrixChildren.fill({});

    const targetSlotRightCMatrix = new ChildrenMatrix(
      targetSlotRightCMatrixChildren
    );

    rightNodes.forEach(({ node, slot }) => {
      targetSlotRightCMatrix.setChild(
        { i: slot.i - targetSlot.i, j: slot.j - targetSlot.j - 1 },
        node
      );
    });

    newChildrenMatrix.setChild(
      { i: targetSlot.i, j: therIsLeft ? 2 : 1 },
      targetSlotRightCMatrix
    );
  }

  return newChildrenMatrix;
}

module.exports = {
  generateChildrenMatrixCode
};
