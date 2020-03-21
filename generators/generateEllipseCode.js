const { generateGraphicNodeStyles } = require("./generateGraphicNodeStyles");
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
  const style = {
    alignItems: "flex-start",
    ...additionalStyles,
    ...generateGraphicNodeStyles(ellipse)
  };

  const { radiusX, radiusY, isCircle } = ellipse;

  if (isCircle) {
    style.width = pixelUnitPreprocessor(radiusX * 2);
    style.height = pixelUnitPreprocessor(radiusX * 2);
    style.borderRadius = radiusX;
  } else {
    if (radiusX > radiusY) {
      style.width = pixelUnitPreprocessor(radiusY * 2);
      style.height = pixelUnitPreprocessor(radiusY * 2);
      style.borderRadius = radiusY;
      style.transform = [{ scaleX: radiusX / radiusY }];
    } else {
      style.width = pixelUnitPreprocessor(radiusX * 2);
      style.height = pixelUnitPreprocessor(radiusX * 2);
      style.borderRadius = radiusX;
      style.transform = [{ scaleY: radiusY / radiusX }];
    }
  }

  const children = getParentChildren(ellipse);

  if (children.length) {
    return generateContainerCode(children, ellipse, style);
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateEllipseCode
};
