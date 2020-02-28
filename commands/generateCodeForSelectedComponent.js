const { error } = require("../plugin-toolkit/dialogs.js");

async function generateCodeForSelectedComponent(selection) {
  if (selection.items.length === 0) {
    error("No selected items");
  }
}

module.exports = {
  generateCodeForSelectedComponent
};
