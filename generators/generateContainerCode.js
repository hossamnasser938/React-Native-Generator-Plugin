const { ChildrenMatrix } = require("../helpers/ChildrenMatrix/index");
const { generateNodeCode } = require("./generateNodeCode");
const {
  flattenChildrenMatrix,
  doesChildrenExistInOneColumn,
  doesChildrenExistInOneRow,
  getTupleChildrenCount
} = require("../helpers/ChildrenMatrix/helpers");

/**
 * generates code for container element
 * @param {*} children an array of children nodes
 * @returns string ui code
 */
function generateContainerCode(children) {
  const childrenMatrix = new ChildrenMatrix(children);
  childrenMatrix.layChildrenInsideMatrix();

  // check whether children exist in one column
  const childrenExistInOneColumn = doesChildrenExistInOneColumn(
    childrenMatrix.matrix
  );

  if (childrenExistInOneColumn) {
    return `<View>
    ${flattenChildrenMatrix(childrenMatrix.matrix).map(child =>
      generateNodeCode(child)
    )}
</View>`;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = doesChildrenExistInOneRow(
    childrenMatrix.matrix
  );

  if (childrenExistInOneRow) {
    return `<View style={{flexDirection: 'row'}}>
    ${flattenChildrenMatrix(childrenMatrix.matrix).map(child =>
      generateNodeCode(child)
    )}
</View>`;
  }

  // children are dispersed
  return `<View>
  ${childrenMatrix.matrix.map(tuple => {
    const childrenCount = getTupleChildrenCount(tuple);

    return (
      childrenCount &&
      `<View ${childrenCount > 1 ? "style={{flexDirection: 'row'}}" : ""}>
    ${tuple.map(child => child && generateNodeCode(child))}
  </View>\n`
    );
  })}
</View>`;
}

module.exports = {
  generateContainerCode
};
