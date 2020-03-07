/**
 * checks if a given node exists withing the space of a given container
 * @param {*} node an instance of SceneNode
 * @param {*} container an instance of SceneNode
 * @returns true if node exists and false if not
 */
function isNodeChildForContainer(node, container) {
  const nodeX = node.boundsInParent.x;
  const nodeY = node.boundsInParent.y;

  let containerX = 0;
  let containerY = 0;
  if (container.constructor.name !== "Artboard") {
    containerX = container.boundsInParent.x;
    containerY = container.boundsInParent.y;
  }

  const containerWidth = container.boundsInParent.width;
  const containerHeight = container.boundsInParent.height;

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