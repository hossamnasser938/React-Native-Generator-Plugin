const { generateGraphicNodeStyles } = require("./generateGraphicNodeStyles");
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
  const style = {
    alignItems: "flex-start",
    ...generateGraphicNodeStyles(rectangle),
    ...additionalStyles
  };

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

  const children = getParentChildren(rectangle);

  if (children.length) {
    return generateContainerCode(children, rectangle, style);
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateRectangleCode
};
