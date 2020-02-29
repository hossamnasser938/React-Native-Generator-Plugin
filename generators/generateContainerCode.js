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

  let code = "";

  if (childrenExistInOneColumn) {
    code += `<View${
      additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
    }>\n`;

    flattenChildrenMatrix(childrenMatrix.matrix).forEach(child => {
      code += generateNodeCode(child);
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
      code += generateNodeCode(child);
    });

    code += `</View>\n`;

    return code;
  }

  // children are dispersed
  code += `<View${
    additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
  }>\n`;

  childrenMatrix.matrix.map(tuple => {
    const childrenCount = getTupleChildrenCount(tuple);

    if (childrenCount) {
      code += `<View ${
        childrenCount > 1 ? "style={{flexDirection: 'row'}}" : ""
      }>
      ${tuple.map(child => child && generateNodeCode(child))}
    </View>\n`;
    }
  });

  code += `</View>\n`;

  return code;
}

module.exports = {
  generateContainerCode
};
