const { generateGraphicNodeStyles } = require("./generateGraphicNodeStyles");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

function generateRectangleCode(rectangle) {
  const style = generateGraphicNodeStyles(rectangle);

  const { width, height, hasRoundedCorners, effectiveCornerRadii } = rectangle;

  style.width = pixelUnitPreprocessor(width);
  style.height = pixelUnitPreprocessor(height);

  if (hasRoundedCorners) {
    const { topLeft, topRight, bottomRight, bottomLeft } = effectiveCornerRadii;

    if (
      [topLeft, topRight, bottomRight, bottomLeft].every(
        (value, index, array) => value === array[0]
      )
    ) {
      // all values are equal
      style.borderRadius = pixelUnitPreprocessor(topLeft);
    } else {
      style.borderTopStartRadius = pixelUnitPreprocessor(topLeft);
      style.borderTopEndRadius = pixelUnitPreprocessor(topRight);
      style.borderBottomEndRadius = pixelUnitPreprocessor(bottomRight);
      style.borderBottomStartRadius = pixelUnitPreprocessor(bottomLeft);
    }
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateRectangleCode
};
