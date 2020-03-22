const { generateGraphicNodeCode } = require("./generateGraphicNodeCode");
const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates code for rectangle element
 * @param {*} rectangle an instance of Rectangle
 * @returns string ui code
 */
function generateRectangleCode(rectangle, additionalStyles) {
  const styles = {
    alignItems: "flex-start",
    ...additionalStyles
  };

  const { width, height, hasRoundedCorners, effectiveCornerRadii } = rectangle;

  styles.width = pixelUnitPreprocessor(width);
  styles.height = pixelUnitPreprocessor(height);

  if (hasRoundedCorners) {
    const { topLeft, topRight, bottomRight, bottomLeft } = effectiveCornerRadii;

    if (
      [topLeft, topRight, bottomRight, bottomLeft].every(
        (value, index, array) => value === array[0]
      )
    ) {
      // all values are equal
      styles.borderRadius = pixelUnitPreprocessor(topLeft);
    } else {
      styles.borderTopStartRadius = pixelUnitPreprocessor(topLeft);
      styles.borderTopEndRadius = pixelUnitPreprocessor(topRight);
      styles.borderBottomEndRadius = pixelUnitPreprocessor(bottomRight);
      styles.borderBottomStartRadius = pixelUnitPreprocessor(bottomLeft);
    }
  }

  return generateGraphicNodeCode(rectangle, styles);
}

module.exports = {
  generateRectangleCode
};
