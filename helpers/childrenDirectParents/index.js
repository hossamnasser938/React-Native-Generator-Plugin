let childrenDirectParents = {};

function pushChildParentPair(childGuid, parentGuid) {
  if (!childrenDirectParents[childGuid]) {
    childrenDirectParents[childGuid] = parentGuid;
  }
}

function getChildDirectParent(childGuid) {
  return childrenDirectParents[childGuid];
}

function clearChildrenDirectParents() {
  childrenDirectParents = {};
}

let traversingFlag = false;

function setTraversingFlag() {
  traversingFlag = true;
}

function clearTraversingFlag() {
  // console.log(JSON.stringify(childrenDirectParents));
  traversingFlag = false;
}

function isTraversing() {
  return traversingFlag;
}

module.exports = {
  pushChildParentPair,
  getChildDirectParent,
  clearChildrenDirectParents,
  setTraversingFlag,
  clearTraversingFlag,
  isTraversing
};
