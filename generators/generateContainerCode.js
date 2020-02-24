const { getNodeChildren } = require("../helpers/getNodeChildren");
const { generateLeafNodeCode } = require("./generateLeafNodeCode");

/**
 * generates code for container element
 * @param {*} container an instance of SceneNode
 * @returns string ui code
 */
function generateContainerCode(container) {
  const children = getNodeChildren(container);
  let childrenCode = "";

  let style = {};

  const n = children.length;

  if (n === 1) {
    childrenCode = generateLeafNodeCode(children[0]);
  } else {
    let childrenMatrix = new Array(n).fill(0).map(_ => new Array(n).fill(0));

    childrenMatrix[0][0] = children[0];

    if (
      Math.abs(children[1].globalBounds.x - children[0].globalBounds.x) <
      Math.abs(children[1].globalBounds.y - children[0].globalBounds.y)
    ) {
      // close X values -> more likely exist in one column
      childrenMatrix[1][0] = children[1];

      // assure that each one exists in its correct place relative to the other
      if (
        childrenMatrix[0][0].globalBounds.y >
        childrenMatrix[1][0].globalBounds.y
      ) {
        const temp = childrenMatrix[0][0];
        childrenMatrix[0][0] = childrenMatrix[1][0];
        childrenMatrix[1][0] = temp;
      }

      childrenCode += generateLeafNodeCode(childrenMatrix[0][0]);
      childrenCode += generateLeafNodeCode(childrenMatrix[1][0]);
    } else {
      // close Y values -> more likely exist in one row
      childrenMatrix[0][1] = children[1];

      // assure that each one exists in its correct place relative to the other
      if (
        childrenMatrix[0][0].globalBounds.x >
        childrenMatrix[0][1].globalBounds.x
      ) {
        const temp = childrenMatrix[0][0];
        childrenMatrix[0][0] = childrenMatrix[0][1];
        childrenMatrix[0][1] = temp;
      }

      childrenCode += generateLeafNodeCode(childrenMatrix[0][0]);
      childrenCode += generateLeafNodeCode(childrenMatrix[0][1]);

      style.flexDirection = "row";
    }
  }

  let code = `<View style={${JSON.stringify(style)}}>
  ${childrenCode}
</View>\n`;

  return code;
}

module.exports = {
  generateContainerCode
};
