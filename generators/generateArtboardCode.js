const { generateContainerCode } = require("./generateContainerCode");
const {
  flattenNodeChildren,
  specifyChildrenNearestParents,
  getParentChildren
} = require("../helpers/childNearestParent/index");

function generateArtboardCode(artboard) {
  const artboardFlattenedChildren = [artboard];
  flattenNodeChildren(artboard, artboardFlattenedChildren);

  specifyChildrenNearestParents(artboardFlattenedChildren);

  const style = { flex: 1 };

  let code = `{/* <Screen ${artboard.name}> */}\n`;

  code += generateContainerCode(getParentChildren(artboard), artboard, style);

  code += `{/* </Screen ${artboard.name}> */}\n\n`;

  return code;
}

module.exports = {
  generateArtboardCode
};
