const { generateArtboardCode } = require("../generators/generateArtboardCode");
const {
  clearChildNearestParent
} = require("../helpers/childNearestParent/index");

async function generateCodeForEntireDocument(selection, documentRoot) {
  documentRoot.children.forEach(documentItem => {
    if (documentItem.constructor.name === "Artboard") {
      console.log(generateArtboardCode(documentItem));
    }
  });

  clearChildNearestParent();
}

module.exports = {
  generateCodeForEntireDocument
};
