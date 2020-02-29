const { ChildrenMatrix } = require("../helpers/ChildrenMatrix/index");
const {
  flattenChildrenMatrix,
  doesChildrenExistInOneColumn,
  doesChildrenExistInOneRow,
  getTupleChildrenCount
} = require("../helpers/ChildrenMatrix/helpers");

/**
 * generates code for container element
 * @param {*} children an array of children nodes
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateContainerCode(children, additionalStyle) {
  const { generateNodeCode } = require("./generateNodeCode"); // Late require for fixing circular dependency

  const childrenMatrix = new ChildrenMatrix(children);
  childrenMatrix.layChildrenInsideMatrix();

  // check whether children exist in one column
  const childrenExistInOneColumn = doesChildrenExistInOneColumn(
    childrenMatrix.matrix
  );

  if (childrenExistInOneColumn) {
    return `<View${
      additionalStyle ? `style={${JSON.stringify(additionalStyle)}}` : ""
    }>
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
    const style = { flexDirection: "row", ...additionalStyle };

    return `<View style={${JSON.stringify(style)}}>
    ${flattenChildrenMatrix(childrenMatrix.matrix).map(child =>
      generateNodeCode(child)
    )}
</View>`;
  }

  // children are dispersed
  return `<View${
    additionalStyle ? `style={${JSON.stringify(additionalStyle)}}` : ""
  }>
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
