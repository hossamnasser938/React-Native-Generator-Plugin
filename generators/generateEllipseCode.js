const { generateGraphicNodeCode } = require("./generateGraphicNodeCode");
const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates code for ellipse element
 * @param {*} ellipse an instance of Ellipse
 * @returns string ui code
 */
function generateEllipseCode(ellipse, additionalStyles) {
  const styles = {
    ...additionalStyles
  };

  const { radiusX, radiusY, isCircle } = ellipse;

  if (isCircle) {
    styles.width = pixelUnitPreprocessor(radiusX * 2);
    styles.height = pixelUnitPreprocessor(radiusX * 2);
    styles.borderRadius = radiusX;
  } else {
    if (radiusX > radiusY) {
      styles.width = pixelUnitPreprocessor(radiusY * 2);
      styles.height = pixelUnitPreprocessor(radiusY * 2);
      styles.borderRadius = radiusY;
      styles.transform = [{ scaleX: radiusX / radiusY }];
    } else {
      styles.width = pixelUnitPreprocessor(radiusX * 2);
      styles.height = pixelUnitPreprocessor(radiusX * 2);
      styles.borderRadius = radiusX;
      styles.transform = [{ scaleY: radiusY / radiusX }];
    }
  }

  return generateGraphicNodeCode(ellipse, styles);
}

module.exports = {
  generateEllipseCode
};
