const { toFixed } = require("../preprocessors/toFixed");

function generateSceneNodeStyles(node) {
  const styles = {};

  if (node.opacity && node.opacity < 1) {
    styles.opacity = toFixed(node.opacity);
  }

  return styles;
}

module.exports = {
  generateSceneNodeStyles
};
