const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");

function generateGroupCode(group, additionalStyles) {
  const groupChildren = getParentChildren(group);

  return generateContainerCode(groupChildren, group, additionalStyles);
}

module.exports = {
  generateGroupCode
};
