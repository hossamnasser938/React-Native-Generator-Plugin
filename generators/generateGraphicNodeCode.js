const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");
const { convertFill } = require("../helpers/convertFill");

/**
 * generates graphicNode(either a Rectangle or Ellipse) code
 * @param {*} graphicNode an instance of GraphicNode
 * @returns code
 */
function generateGraphicNodeCode(graphicNode, additionalStyles) {
  const styles = { ...additionalStyles };

  const { fillEnabled, fill, strokeEnabled, stroke, strokeWidth } = graphicNode;

  if (fillEnabled) {
    styles.backgroundColor = convertFill(fill);
  }

  if (strokeEnabled) {
    styles.borderWidth = pixelUnitPreprocessor(strokeWidth);
    const strokeAsHexColor = stroke.toHex(true);
    styles.borderColor = strokeAsHexColor;
  }

  const children = getParentChildren(graphicNode);

  if (children.length) {
    return generateContainerCode(children, graphicNode, styles);
  }

  return `<View style={${JSON.stringify(styles)}}/>\n`;
}

module.exports = {
  generateGraphicNodeCode
};
