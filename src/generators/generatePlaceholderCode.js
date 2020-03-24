/* generates a placeholder code for unsupported node types */

function generatePlaceholderCode(node) {
  const styles = {
    width: node.globalBounds.width,
    height: node.globalBounds.height,
    backgroundColor: "#000000"
  };

  return `<View style={${JSON.stringify(styles)}} />\n`;
}

module.exports = { generatePlaceholderCode };
