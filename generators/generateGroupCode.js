const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");

function generateGroupCode(group) {
  const groupChildren = getParentChildren(group);

  return generateContainerCode(groupChildren);
}

module.exports = {
  generateGroupCode
};
