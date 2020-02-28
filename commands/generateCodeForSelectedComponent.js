const { error } = require("../plugin-toolkit/dialogs.js");
const { generateNodeCode } = require("../generators/generateNodeCode");
const {
  generateContainerCode
} = require("../generators/generateContainerCode");

async function generateCodeForSelectedComponent(selection) {
  if (selection.items.length === 0) {
    error("No selected items");
  } else if (selection.items.length === 1) {
    console.log(generateNodeCode(selection.items[0]));
  } else {
    console.log(generateContainerCode(selection.items));
  }
}

module.exports = {
  generateCodeForSelectedComponent
};
