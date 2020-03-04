const { getNodeArtboard } = require("./getNodeArtboard");
const { isNodeChildForContainer } = require("./isNodeChildForContainer");

const {
  isTraversing,
  getChildDirectParent
} = require("../childrenDirectParents/index");

/**
 * returns the nodes that are located in the space of the given node
 * @param {*} node an instance of SceneNode
 * @returns an array of SceneNode
 */
function getNodeChildren(node) {
  let children = [];

  const containingArtboard = getNodeArtboard(node);

  containingArtboard.children.forEach(child => {
    if (isTraversing()) {
      if (isNodeChildForContainer(child, node)) {
        children.push(child);
      }
    } else {
      const directParentGuid = getChildDirectParent(child.guid);

      if (directParentGuid === node.guid) {
        children.push(child);
      }
    }
  });

  return children;
}

module.exports = {
  getNodeChildren
};
