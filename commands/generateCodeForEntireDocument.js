const { generateNodeCode } = require("../generators/generateNodeCode");

async function generateCodeForEntireDocument(selection, documentRoot) {
  documentRoot.children.forEach(documentItem => {
    if (documentItem.constructor.name === "Artboard") {
      let code = `{/* <Screen ${documentItem.name}> */}\n`;
      code += generateNodeCode(documentItem);
      code += `{/* </Screen ${documentItem.name}> */}\n\n`;

      console.log(code);
    }
  });
}

module.exports = {
  generateCodeForEntireDocument
};
