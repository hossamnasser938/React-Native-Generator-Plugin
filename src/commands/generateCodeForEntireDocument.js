const { error } = require("@adobe/xd-plugin-toolkit/lib/dialogs");
const { generateArtboardCode } = require("../generators/generateArtboardCode");
const {
  clearChildNearestParent
} = require("../helpers/childNearestParent/index");
const { save } = require("../helpers/output/save");

async function generateCodeForEntireDocument(selection, documentRoot) {
  const components = [];

  try {
    documentRoot.children.forEach(documentItem => {
      if (documentItem.constructor.name === "Artboard") {
        components.push({
          name: documentItem.name,
          code: generateArtboardCode(documentItem)
        });
      }
    });

    await save(components);
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
