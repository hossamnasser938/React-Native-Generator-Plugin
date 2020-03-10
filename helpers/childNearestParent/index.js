/*
During specifying children nearest parents, looping is done reversely
to let children attached to nearest parents based on coordinates and also based on document structure
For example having a Text within Rectangle withing a Group
while Group and Rectangle having the same coordinates
Text's parent should be Rectangle and Rectangle's parent should be Group
*/

let childrenNearestParents = [];

function setChildNearestParent(child, parent) {
  childrenNearestParents.push({ child, parent });
}

function getParentChildren(parent) {
  return childrenNearestParents
    .filter(item => item.parent && item.parent.guid === parent.guid)
    .map(item => item.child);
}

function getChildParent(child) {
  const targetItem = childrenNearestParents.find(
    item => item.child.guid === child.guid
  );

  return targetItem && targetItem.parent;
}

function filterChildrenWithNoParents(children) {
  return children.filter(child => !getChildParent(child));
}

function clearChildNearestParent() {
  childrenNearestParents = [];
}

function flattenNodeChildren(node, children) {
  node.children.forEach(nodeChild => {
    children.push(nodeChild);

    if (nodeChild.children.length) {
      flattenNodeChildren(nodeChild, children);
    }
  });
}

function specifyChildrenNearestParents(children) {
  // loop over children in a reverse order
  for (let i = children.length - 1; i >= 0; i--) {
    const cChild = children[i];
    const nearestParent = specifyChildNearestParent(cChild, children);
    setChildNearestParent(cChild, nearestParent);
  }
}

function specifyChildNearestParent(child, nodes) {
  let nearestParent;

  // loop over nodes in a reverse order
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    if (canBeParentForChild(child, node)) {
      if (nearestParent) {
        nearestParent = whichIsNearestParent(nearestParent, node);
      } else {
        nearestParent = node;
      }
    }
  }

  return nearestParent;
}

function canBeParentForChild(child, node) {
  if (
    // they are not the same node
    child.guid !== node.guid &&
    // if @param node is a child of @param child then @param node cannot be a parent for @param child
    !childrenNearestParents.find(
      item =>
        item.child.guid === node.guid &&
        item.parent &&
        item.parent.guid === child.guid
    ) &&
    // the child exists within the bounds of the node
    node.globalBounds.x <= child.globalBounds.x &&
    node.globalBounds.y <= child.globalBounds.y &&
    node.globalBounds.x + node.globalBounds.width >=
      child.globalBounds.x + child.globalBounds.width &&
    node.globalBounds.y + node.globalBounds.height >=
      child.globalBounds.y + child.globalBounds.height
  ) {
    return true;
  }

  return false;
}

function whichIsNearestParent(parent1, parent2) {
  const parent1Diameter = calculateNodeDiameter(parent1);
  const parent2Diameter = calculateNodeDiameter(parent2);

  // updating this order of comparison may break reverse looping
  if (parent1Diameter < parent2Diameter) {
    return parent2;
  }

  return parent1;
}

function calculateNodeDiameter(node) {
  return Math.sqrt(
    Math.pow(node.globalBounds.x, 2) + Math.pow(node.globalBounds.y, 2)
  );
}

/**
 * gets the artboard that contains the given node
 * @param {*} node an instance of SceneNode
 * @returns an instance of Artboard or null
 */
function getNodeArtboard(node) {
  if (node.constructor.name === "Artboard") {
    return node;
  }

  let parent = node.parent;

  while (parent && parent.constructor.name !== "Artboard") {
    parent = parent.parent;
  }

  return parent;
}

module.exports = {
  getParentChildren,
  filterChildrenWithNoParents,
  clearChildNearestParent,
  flattenNodeChildren,
  specifyChildrenNearestParents,
  getNodeArtboard
};
