const { Artboard } = require("scenegraph");
const { generateNodeCode } = require("../generators/generateNodeCode");

let code = "";

async function generateCodeForEntireDocument(selection, documentRoot) {
  documentRoot.children.forEach(documentItem => {
    if (documentItem instanceof Artboard) {
      code += `{/* <Screen ${documentItem.name}> */}\n`;
      loopOverTree(documentItem);
      code += `{/* </Screen ${documentItem.name}> */}\n\n`;
    } else {
      console.log("not artboard, maybe hint", documentItem);
    }
  });

  console.log(code);
}

function loopOverTree(tree) {
  if (tree.children && tree.children.length) {
    code += `<View>\n`;

    tree.children.forEach(innerTree => {
      loopOverTree(innerTree);
    });

    code += `</View>\n`;
  } else {
    code += generateNodeCode(tree);
  }
}

module.exports = {
  generateCodeForEntireDocument
};
