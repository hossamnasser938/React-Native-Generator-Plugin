const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");
const { convertFill } = require("../helpers/convertFill");

/**
 * generates common style attributes between all graphic nodes
 * such as (Artboard, Rectangle, Ellipse, Polygon, LinePath, BooleanGroup, Text).
 * @param {*} graphicNode an instance of GraphicNode
 * @returns a style object
 */
function generateGraphicNodeStyles(graphicNode) {
  const style = {};

  const { fillEnabled, fill, strokeEnabled, stroke, strokeWidth } = graphicNode;

  if (fillEnabled) {
    style.backgroundColor = convertFill(fill);
  }

  if (strokeEnabled) {
    style.borderWidth = pixelUnitPreprocessor(strokeWidth);
    const strokeAsHexColor = stroke.toHex(true);
    style.borderColor = strokeAsHexColor;
  }

  return style;
}

module.exports = {
  generateGraphicNodeStyles
};
