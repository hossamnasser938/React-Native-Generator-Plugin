const { generateArtboardCode } = require("./generateArtboardCode");
const { generateRectangleCode } = require("./generateRectangleCode");
const { generateEllipseCode } = require("./generateEllipseCode");
const { generatePolygonCode } = require("./generatePolygonCode");
const { generateLineCode } = require("./generateLineCode");
const { generatePathCode } = require("./generatePathCode");
const { generateBooleanGroupCode } = require("./generateBooleanGroupCode");
const { generateTextCode } = require("./generateTextCode/index");
const { generateGroupCode } = require("./generateGroupCode");
const { generateSymbolInstanceCode } = require("./generateSymbolInstanceCode");
const { generateRepeatGridCode } = require("./generateRepeatGridCode");
const { generateLinkedGraphicCode } = require("./generateLinkedGraphicCode");
const { generateChildrenMatrixCode } = require("./generateChildrenMatrixCode");

function generateNodeCode(node, additionalStyles) {
  switch (node.constructor.name) {
    case "Artboard":
      return generateArtboardCode(node);

    case "Rectangle":
      return generateRectangleCode(node, additionalStyles);

    case "Ellipse":
      return generateEllipseCode(node, additionalStyles);

    case "Polygon":
      return generatePolygonCode(node, additionalStyles);

    case "Line":
      return generateLineCode(node, additionalStyles);

    case "Path":
      return generatePathCode(node, additionalStyles);

    case "BooleanGroup":
      return generateBooleanGroupCode(node, additionalStyles);

    case "Text":
      return generateTextCode(node, additionalStyles);

    case "Group":
      return generateGroupCode(node, additionalStyles);

    case "SymbolInstance":
      return generateSymbolInstanceCode(node, additionalStyles);

    case "RepeatGrid":
      return generateRepeatGridCode(node, additionalStyles);

    case "LinkedGraphic":
      return generateLinkedGraphicCode(node, additionalStyles);

    case "ChildrenMatrix":
      return generateChildrenMatrixCode(node, null, additionalStyles);

    default:
      return "<StrangeNode />\n";
  }
}

module.exports = {
  generateNodeCode
};
