const {
  convertColorObjToHexColor
} = require("../helpers/convertColorObjToHexColor");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

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
