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
  const childrenExistInOneColumn = childrenMatrix.doesChildrenExistInOneColumn();

  let code = "";

  if (childrenExistInOneColumn) {
    code += `<View${
      additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
    }>\n`;

    childrenMatrix.flattenChildrenMatrix().forEach(child => {
      code += generateNodeCode(child, parent);
    });

    code += `</View>\n`;

    return code;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = childrenMatrix.doesChildrenExistInOneRow();

  if (childrenExistInOneRow) {
    const style = { flexDirection: "row", ...additionalStyle };

    code += `<View style={${JSON.stringify(style)}}>\n`;

    childrenMatrix.flattenChildrenMatrix().forEach(child => {
      code += generateNodeCode(child, parent);
    });

    code += `</View>\n`;

    return code;
  }

  // children are dispersed
  code += `<View${
    additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
  }>\n`;

  childrenMatrix.matrix.map((row, rowIndex) => {
    const childrenCount = childrenMatrix.getRowActualChildrenCount(rowIndex);

    if (childrenCount) {
      code +=
        childrenCount > 1
          ? `<View ${"style={{flexDirection: 'row'}}"}>
      ${row.map(child => child && generateNodeCode(child, parent))}
    </View>\n`
          : generateNodeCode(
              row.find(child => !!child),
              parent
            );
    }
  });

  code += `</View>\n`;

  return code;
}

module.exports = {
  generateChildrenMatrixCode
};
