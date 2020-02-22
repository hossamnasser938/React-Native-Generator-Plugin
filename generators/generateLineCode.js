const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates code for line element
 * @param {*} line an instance of Line
 * @returns string ui code
 */
function generateLineCode(line) {
  // TODO: handle diagonal lines

  const style = {};

  const { start, end, strokeEnabled, stroke, strokeWidth } = line;

  if (strokeEnabled) {
    style.backgroundColor = stroke.toHex(true);

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
