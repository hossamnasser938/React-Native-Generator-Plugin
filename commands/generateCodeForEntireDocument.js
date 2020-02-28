const { generateArtboardCode } = require("../generators/generateArtboardCode");

async function generateCodeForEntireDocument(selection, documentRoot) {
  documentRoot.children.forEach(documentItem => {
    if (documentItem.constructor.name === "Artboard") {
      console.log(generateArtboardCode(documentItem));
    }
  });
}

module.exports = {
  generateCodeForEntireDocument
};
