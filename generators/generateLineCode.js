const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");
const { representColor } = require("../helpers/representColor");

/**
 * generates code for line element
 * @param {*} line an instance of Line
 * @returns string ui code
 */
function generateLineCode(line, additionalStyles) {
  // TODO: handle diagonal lines

  const style = { ...additionalStyles };

  const { start, end, strokeEnabled, stroke, strokeWidth, globalBounds } = line;

  if (strokeEnabled) {
    style.backgroundColor = representColor(stroke);

    if (start.x !== end.x) {
      // horizontal
      style.width = pixelUnitPreprocessor(globalBounds.width);
      style.height = pixelUnitPreprocessor(strokeWidth);
    } else {
      // vertical
      style.height = pixelUnitPreprocessor(globalBounds.height);
      style.width = pixelUnitPreprocessor(strokeWidth);
    }
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateLineCode
};
