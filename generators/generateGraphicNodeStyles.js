const {
  convertColorObjToHexColor
} = require("../helpers/convertColorObjToHexColor");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

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
    // Handled only Color. TODO: handle LinearGradientFill, RadialGradientFill, ImageFill
    const fillAsHexColor = convertColorObjToHexColor(fill);
    style.backgroundColor = fillAsHexColor;
  }

  if (strokeEnabled) {
    // Handled only Color. TODO: handle LinearGradientFill, RadialGradientFill, ImageFill
    style.borderWidth = pixelUnitPreprocessor(strokeWidth);
    const strokeAsHexColor = convertColorObjToHexColor(stroke);
    style.borderColor = strokeAsHexColor;
  }

  return style;
}

module.exports = {
  generateGraphicNodeStyles
};
