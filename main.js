const { Artboard } = require("scenegraph");
const { generateRectangleCode } = require("./generators/generateRectangleCode");
const { generateEllipseCode } = require("./generators/generateEllipseCode");
const { generateLineCode } = require("./generators/generateLineCode");
const { generateTextCode } = require("./generators/generateTextCode");

let code = "";

async function generate(selection, documentRoot) {
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
    generateLeafNodeCode(tree);
  }
}

function generateLeafNodeCode(leafNode) {
  switch (leafNode.constructor.name) {
    case "Rectangle":
      code += generateRectangleCode(leafNode);
      break;

    case "Ellipse":
      code += generateEllipseCode(leafNode);
      break;

    case "Polygon":
      code += generatePolygonCode(leafNode);
      break;

    case "Line":
      code += generateLineCode(leafNode);
      break;

    case "Path":
      code += generatePathCode(leafNode);
      break;

    case "BooleanGroup":
      code += generateBooleanGroupCode(leafNode);
      break;

    case "Text":
      code += generateTextCode(leafNode);
      break;

    default:
  }
}

function generatePolygonCode(polygon) {
  return `<Polygon />\n`;
}

function generatePathCode(path) {
  return `<Path />\n`;
}

function generateBooleanGroupCode(booleanGroup) {
  return `<Boolean />\n`;
}

module.exports = {
  commands: {
    generate
  }
};
