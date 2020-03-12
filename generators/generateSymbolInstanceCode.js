const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");

function generateSymbolInstanceCode(symbolInstance) {
  const symbolInstanceChildren = getParentChildren(symbolInstance);

  return generateContainerCode(symbolInstanceChildren);
}

module.exports = {
  generateSymbolInstanceCode
};
