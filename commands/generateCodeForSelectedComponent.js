const { error } = require("../plugin-toolkit/dialogs.js");
const { generateNodeCode } = require("../generators/generateNodeCode");
const {
  generateContainerCode
} = require("../generators/generateContainerCode");
const {
  flattenNodeChildren,
  specifyChildrenNearestParents,
  getNodeArtboard,
  filterChildrenWithNoParents,
  clearChildNearestParent
} = require("../helpers/childNearestParent/index");

async function generateCodeForSelectedComponent(selection) {
  if (selection.items.length === 0) {
    error("No selected items");
    return;
  } else {
    const currentArtboard = getNodeArtboard(selection.items[0]);
    if (!currentArtboard) {
      error("Please, select component from artboard");
      return;
    }

    const children = [];
    flattenNodeChildren(currentArtboard, children);
    specifyChildrenNearestParents(children);

    if (selection.items.length === 1) {
      console.log(generateNodeCode(selection.items[0]));
    } else {
      console.log(
        generateContainerCode(filterChildrenWithNoParents(selection.items))
      );
    }
  }

  clearChildNearestParent();
}

module.exports = {
  generateCodeForSelectedComponent
};
