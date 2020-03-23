function generateSceneNodeStyles(node) {
  const styles = {};

  if (node.opacity && node.opacity < 1) {
    styles.opacity = node.opacity;
  }

  return styles;
}

module.exports = {
  generateSceneNodeStyles
};
