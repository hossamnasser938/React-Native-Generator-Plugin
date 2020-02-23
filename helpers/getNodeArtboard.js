/**
 * gets the artboard that contains the given node
 * @param {*} node an instance of SceneNode
 * @returns an instance of Artboard or null
 */
function getNodeArtboard(node) {
  let parent = node.parent;

  while (parent && parent.constructor.name !== "Artboard") {
    parent = parent.parent;
  }

  return parent;
}

module.exports = {
  getNodeArtboard
};
