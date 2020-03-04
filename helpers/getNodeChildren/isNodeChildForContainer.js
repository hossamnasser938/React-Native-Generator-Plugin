/**
 * checks if a given node exists withing the space of a given container
 * @param {*} node an instance of SceneNode
 * @param {*} container an instance of SceneNode
 * @returns true if node exists and false if not
 */
function isNodeChildForContainer(node, container) {
  const nodeX = node.globalBounds.x;
  const nodeY = node.globalBounds.y;

  const containerX = container.globalBounds.x;
  const containerY = container.globalBounds.y;
  const containerWidth = container.globalBounds.width;
  const containerHeight = container.globalBounds.height;

  if (
    node.guid !== container.guid &&
    nodeX > containerX &&
    nodeX < containerX + containerWidth &&
    nodeY > containerY &&
    nodeY < containerY + containerHeight
  ) {
    return true;
  }

  return false;
}

module.exports = {
  isNodeChildForContainer
};
