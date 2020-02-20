const {
  convertColorObjToHexColor
} = require("../helpers/convertColorObjToHexColor");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates code for line element
 * @param {*} line an instance of Line
 * @returns string ui code
 */
function generateLineCode(line) {
  const style = {};

  const { start, end, strokeEnabled, stroke, strokeWidth } = line;

  if (strokeEnabled) {
    // Handled only Color. TODO: handle LinearGradientFill, RadialGradientFill, ImageFill
    style.backgroundColor = convertColorObjToHexColor(stroke);

    if (start.x !== end.x) {
      // horizontal
      style.width = pixelUnitPreprocessor(end.x - start.x);
      style.height = pixelUnitPreprocessor(strokeWidth);
    } else {
      // vertical
      style.height = pixelUnitPreprocessor(end.y - start.y);
      style.width = pixelUnitPreprocessor(strokeWidth);
    }
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateLineCode
};
