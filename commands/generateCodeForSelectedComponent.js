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
  try {
    if (selection.items.length === 0) {
      error("No selected items");
      return;
    } else {
      const selectedItemsArtboards = [];

      for (const selectedItem of selection.items) {
        const selectedItemArtboard = getNodeArtboard(selectedItem);

        if (!selectedItemArtboard) {
          error("Please, select component within an artboard");
          return;
        }

        // if this artboard does not exits then add it
        if (
          !selectedItemsArtboards.find(
            artboard => artboard.guid === selectedItemArtboard.guid
          )
        ) {
          selectedItemsArtboards.push(selectedItemArtboard);
        }

        if (selectedItemsArtboards.length > 1) {
          error("Please, select component within one artboard");
          return;
        }
      }

      // if current artboard is not one of the selected items then we need to attach each child to its nearset parent
      // if it is, then this step will be done inside generateArtbpardCode

      const currentArtboard = selectedItemsArtboards[0];

      if (!selection.items.find(item => item.guid === currentArtboard.guid)) {
        const children = [];
        flattenNodeChildren(currentArtboard, children);
        specifyChildrenNearestParents(children);
      }

      if (selection.items.length === 1) {
        console.log(generateNodeCode(selection.items[0]));
      } else {
        console.log(
          generateContainerCode(filterChildrenWithNoParents(selection.items))
        );
      }
    }

    clearChildNearestParent();
  } catch (err) {
    console.log("err", err);
    error("Unexpected error occurred");
    clearChildNearestParent();
  }
}

module.exports = {
  generateCodeForSelectedComponent
};
