/**
 * generates code for a set of nodes aligned in a ChildrenMatrix
 * @param {*} childrenMatrix
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateChildrenMatrixCode(childrenMatrix, parent, additionalStyle) {
  const { generateNodeCode } = require("./generateNodeCode"); // Late require for fixing circular dependency

  // check if it is only one node
  if (childrenMatrix.n === 1 && !additionalStyle) {
    return generateNodeCode(childrenMatrix.getChild({ i: 0, j: 0 }));
  }

  // check whether children exist in one column
  const childrenExistInOneColumn = childrenMatrix.doesChildrenExistInOneColumn();

  let code = "";

  if (childrenExistInOneColumn) {
    code += `<View style={${JSON.stringify({
      alignItems: "flex-start",
      ...generatePaddingStyles(childrenMatrix, parent),
      ...additionalStyle
    })}}>\n`;

    childrenMatrix.flatten().forEach(({ node, slot }) => {
      code += generateNodeCode(
        node,
        generateMarginStyles(slot, childrenMatrix)
      );
    });

    code += `</View>\n`;

    return code;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = childrenMatrix.doesChildrenExistInOneRow();

  if (childrenExistInOneRow) {
    const style = {
      flexDirection: "row",
      alignItems: "flex-start",
      ...generatePaddingStyles(childrenMatrix, parent),
      ...additionalStyle
    };

    code += `<View style={${JSON.stringify(style)}}>\n`;

    childrenMatrix.flatten().forEach(({ node, slot }) => {
      code += generateNodeCode(
        node,
        generateMarginStyles(slot, childrenMatrix)
      );
    });

    code += `</View>\n`;

    return code;
  }

  // children are dispersed
  code += `<View style={${JSON.stringify({
    alignItems: "flex-start",
    ...generatePaddingStyles(childrenMatrix, parent),
    ...additionalStyle
  })}}>\n`;

  childrenMatrix.matrix.map((row, rowIndex) => {
    const childrenCount = childrenMatrix.getRowActualChildrenCount(rowIndex);

    if (childrenCount) {
      if (childrenCount > 1) {
        code += `<View ${"style={{flexDirection: 'row', alignItems: 'flex-start'}}"}>`;

        row.map((child, columnIndex) => {
          if (child) {
            const styles = generateMarginStyles(
              { i: rowIndex, j: columnIndex },
              childrenMatrix
            );

            code += generateNodeCode(child, styles);
          }
        });

        code += `</View>\n`;
      } else {
        const child = row.find(child => !!child);
        const columnIndex = row.findIndex(child => !!child);

        const styles = generateMarginStyles(
          { i: rowIndex, j: columnIndex },
          childrenMatrix
        );

        code += generateNodeCode(child, styles);
      }
    }
  });

  code += `</View>\n`;

  return code;
}

function generateMarginStyles(slot, childrenMatrix) {
  const node = childrenMatrix.getChild(slot);

  const left = childrenMatrix.getLeftChild(slot);
  const top = childrenMatrix.getTopChild(slot);

  let marginStart;
  if (left) {
    marginStart =
      node.globalBounds.x - (left.globalBounds.x + left.globalBounds.width);
  } else {
    marginStart = node.globalBounds.x - childrenMatrix.globalBounds.x;
  }

  let marginTop;
  if (top) {
    marginTop =
      node.globalBounds.y - (top.globalBounds.y + top.globalBounds.height);
  } else {
    marginTop = node.globalBounds.y - childrenMatrix.globalBounds.y;
  }

  const styles = {};

  if (marginStart) {
    styles.marginStart = marginStart;
  }

  if (marginTop) {
    styles.marginTop = marginTop;
  }

  return styles;
}

function generatePaddingStyles(childrenMatrix, parent) {
  if (!parent) {
    return {};
  }

  const styles = {};

  const paddingStart = childrenMatrix.globalBounds.x - parent.globalBounds.x;
  const paddingTop = childrenMatrix.globalBounds.y - parent.globalBounds.y;

  if (paddingStart) {
    styles.paddingStart = paddingStart;
  }

  if (paddingTop) {
    styles.paddingTop = paddingTop;
  }

  return styles;
}

module.exports = {
  generateChildrenMatrixCode
};
