const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates graphicNode(either a Rectangle or Ellipse) code
 * @param {*} graphicNode an instance of GraphicNode
 * @returns code
 */
function generateGraphicNodeCode(graphicNode, additionalStyles) {
  const styles = { ...additionalStyles };

  const { fillEnabled, fill, strokeEnabled, stroke, strokeWidth } = graphicNode;

  if (strokeEnabled) {
    styles.borderWidth = pixelUnitPreprocessor(strokeWidth);
    const strokeAsHexColor = stroke.toHex(true);
    styles.borderColor = strokeAsHexColor;
  }

  let element = "View";

  if (fillEnabled) {
    switch (fill.constructor.name) {
      case "Color":
        styles.backgroundColor = fill.toHex(true);
        break;

      case "ImageFill":
        element = "Image";
        break;

      default:
        styles.backgroundColor = "#ffffff";
    }
  }

  const children = getParentChildren(graphicNode);

  if (children.length) {
    return element === "View"
      ? generateContainerCode(children, graphicNode, styles)
      : `<ImageBackground style={${JSON.stringify(
          styles
        )}} source={{/* add your source here */}}>\n${generateContainerCode(
          children,
          graphicNode,
          { flex: 1 }
        )}</ImageBackground>`;
  }

  return `<${element} style={${JSON.stringify(
    element === "View" ? { alignItems: "flex-start", ...styles } : styles
  )}}${
    element === "Image" ? " source={{/* add your source here */}}" : ""
  } />\n`;
}

module.exports = {
  generateGraphicNodeCode
};
