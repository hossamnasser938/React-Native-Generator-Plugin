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

  children.forEach(child => {
    childrenCode += generateLeafNodeCode(child);
  });

  let style = {};

  if (
    children[1].globalBounds.y <
    children[0].globalBounds.y + children[0].globalBounds.height
  ) {
    style.flexDirection = "row";
  }

  let code = `<View style={${JSON.stringify(style)}}>
  ${childrenCode}
</View>\n`;

  return code;
}

module.exports = {
  generateContainerCode
};
