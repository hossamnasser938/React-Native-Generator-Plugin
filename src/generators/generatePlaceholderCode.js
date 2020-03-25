const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates a placeholder code for unsupported node types
 * @param {*} node
 */
function generatePlaceholderCode(node) {
  const styles = {
    width: pixelUnitPreprocessor(node.globalBounds.width),
    height: pixelUnitPreprocessor(node.globalBounds.height),
    backgroundColor: "#000000"
  };

  return `<View style={${JSON.stringify(styles)}} />\n`;
}

module.exports = { generatePlaceholderCode };
