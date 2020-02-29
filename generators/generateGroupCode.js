const { generateContainerCode } = require("./generateContainerCode");
const { getNodeChildren } = require("../helpers/getNodeChildren/index");

function generateGroupCode(group) {
  const groupChildren = group.children.map(item => item);

  const nodesInBounds = getNodeChildren(group);

  return generateContainerCode([...groupChildren, ...nodesInBounds]);
}

module.exports = {
  generateGroupCode
};
