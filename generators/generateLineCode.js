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

  const {
    start,
    end,
    strokeEnabled,
    stroke,
    strokeWidth,
    boundsInParent
  } = line;

  if (strokeEnabled) {
    style.backgroundColor = stroke.toHex(true);

    if (start.x !== end.x) {
      // horizontal
      style.width = pixelUnitPreprocessor(boundsInParent.width);
      style.height = pixelUnitPreprocessor(strokeWidth);
    } else {
      // vertical
      style.height = pixelUnitPreprocessor(boundsInParent.height);
      style.width = pixelUnitPreprocessor(strokeWidth);
    }
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateLineCode
};
