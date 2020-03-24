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

  let code = generateContainerCode(
    getParentChildren(artboard),
    artboard,
    style
  );

  return code;
}

module.exports = {
  generateArtboardCode
};
