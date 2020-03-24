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
const { generateSceneNodeStyles } = require("./generateSceneNodeStyles");

function generateNodeCode(node, additionalStyles) {
  const styles = { ...additionalStyles, ...generateSceneNodeStyles(node) };

  switch (node.constructor.name) {
    case "Artboard":
      return generateArtboardCode(node);

    case "Rectangle":
      return generateRectangleCode(node, styles);

    case "Ellipse":
      return generateEllipseCode(node, styles);

    case "Polygon":
      return generatePolygonCode(node, styles);

    case "Line":
      return generateLineCode(node, styles);

    case "Path":
      return generatePathCode(node, styles);

    case "BooleanGroup":
      return generateBooleanGroupCode(node, styles);

    case "Text":
      return generateTextCode(node, styles);

    case "Group":
      return generateGroupCode(node, styles);

    case "SymbolInstance":
      return generateSymbolInstanceCode(node, styles);

    case "RepeatGrid":
      return generateRepeatGridCode(node, styles);

    case "LinkedGraphic":
      return generateLinkedGraphicCode(node, styles);

    case "ChildrenMatrix":
      return generateChildrenMatrixCode(node, null, styles);

    default:
      return "<StrangeNode />\n";
  }
}

module.exports = {
  generateNodeCode
};
