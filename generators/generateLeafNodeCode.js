const { generateRectangleCode } = require("./generateRectangleCode");
const { generateEllipseCode } = require("./generateEllipseCode");
const { generateLineCode } = require("./generateLineCode");
const { generateTextCode } = require("./generateTextCode/index");
const { generatePathCode } = require("./generatePathCode");
const { generatePolygonCode } = require("./generatePathCode");
const { generateBooleanGroupCode } = require("./generatePathCode");

function generateLeafNodeCode(leafNode) {
  switch (leafNode.constructor.name) {
    case "Rectangle":
      return generateRectangleCode(leafNode);

    case "Ellipse":
      return generateEllipseCode(leafNode);

    case "Polygon":
      return generatePolygonCode(leafNode);

    case "Line":
      return generateLineCode(leafNode);

    case "Path":
      return generatePathCode(leafNode);

    case "BooleanGroup":
      return generateBooleanGroupCode(leafNode);

    case "Text":
      return generateTextCode(leafNode);

    default:
      return "<SomethingStrange />\n";
  }
}

module.exports = {
  generateLeafNodeCode
};
