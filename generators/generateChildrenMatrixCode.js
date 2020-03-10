/**
 * generates code for a set of nodes aligned in a ChildrenMatrix
 * @param {*} childrenMatrix
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateChildrenMatrixCode(childrenMatrix, additionalStyle) {
  const { generateNodeCode } = require("./generateNodeCode"); // Late require for fixing circular dependency

  // check if it is only one node
  if (childrenMatrix.n === 1 && !additionalStyle) {
    return generateNodeCode(childrenMatrix.getChild({ i: 0, j: 0 }));
  }

  // check whether children exist in one column
  const childrenExistInOneColumn = childrenMatrix.doesChildrenExistInOneColumn();

  let code = "";

  if (childrenExistInOneColumn) {
    code += `<View${
      additionalStyle ? ` style={${JSON.stringify(additionalStyle)}}` : ""
    }>\n`;

    childrenMatrix.flatten().forEach(child => {
      code += generateNodeCode(child);
    });

    code += `</View>\n`;

    return code;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = childrenMatrix.doesChildrenExistInOneRow();

  if (childrenExistInOneRow) {
    const style = { flexDirection: "row", ...additionalStyle };

    code += `<View style={${JSON.stringify(style)}}>\n`;

    childrenMatrix.flatten().forEach(child => {
      code += generateNodeCode(child);
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
      if (childrenCount > 1) {
        code += `<View ${"style={{flexDirection: 'row'}}"}>`;

        row.map(child => {
          if (child) {
            code += generateNodeCode(child);
          }
        });

        code += `</View>\n`;
      } else {
        code += generateNodeCode(row.find(child => !!child));
      }
    }
  });

  code += `</View>\n`;

  return code;
}

module.exports = {
  generateChildrenMatrixCode
};
