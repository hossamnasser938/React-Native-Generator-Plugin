const { generateArtboardCode } = require("../generators/generateArtboardCode");

const {
  setTraversingFlag,
  clearTraversingFlag,
  clearChildrenDirectParents
} = require("../helpers/childrenDirectParents/index");

async function generateCodeForEntireDocument(selection, documentRoot) {
  // traverse
  setTraversingFlag();
  documentRoot.children.forEach(documentItem => {
    if (documentItem.constructor.name === "Artboard") {
      generateArtboardCode(documentItem);
    }
  });
  clearTraversingFlag();

  // generate code
  documentRoot.children.forEach(documentItem => {
    if (documentItem.constructor.name === "Artboard") {
      console.log(generateArtboardCode(documentItem));
    }
  });

  clearChildrenDirectParents();
}

module.exports = {
  generateCodeForEntireDocument
};
