const { error } = require("../plugin-toolkit/dialogs.js");
const { generateNodeCode } = require("../generators/generateNodeCode");
const {
  generateContainerCode
} = require("../generators/generateContainerCode");
const {
  setTraversingFlag,
  clearTraversingFlag,
  clearChildrenDirectParents
} = require("../helpers/childrenDirectParents/index");

async function generateCodeForSelectedComponent(selection) {
  // traverse
  setTraversingFlag();
  if (selection.items.length === 0) {
    error("No selected items");
    return;
  } else if (selection.items.length === 1) {
    generateNodeCode(selection.items[0]);
  } else {
    generateContainerCode(null, selection.items);
  }
  clearTraversingFlag();

  // generate code
  if (selection.items.length === 1) {
    console.log(generateNodeCode(selection.items[0]));
  } else {
    console.log(generateContainerCode(null, selection.items));
  }

  clearChildrenDirectParents();
}

module.exports = {
  generateCodeForSelectedComponent
};
