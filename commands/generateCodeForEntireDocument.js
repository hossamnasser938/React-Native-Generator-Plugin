const { error } = require("../plugin-toolkit/dialogs.js");
const { generateArtboardCode } = require("../generators/generateArtboardCode");
const {
  clearChildNearestParent
} = require("../helpers/childNearestParent/index");

async function generateCodeForEntireDocument(selection, documentRoot) {
  try {
    documentRoot.children.forEach(documentItem => {
      if (documentItem.constructor.name === "Artboard") {
        console.log(generateArtboardCode(documentItem));
      }
    });

    clearChildNearestParent();
  } catch (err) {
    console.log("err", err);
    error("Unexpected error occurred");
    clearChildNearestParent();
  }
}

module.exports = {
  generateCodeForEntireDocument
};
