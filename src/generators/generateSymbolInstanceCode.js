const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");

function generateSymbolInstanceCode(symbolInstance, additionalStyles) {
  const symbolInstanceChildren = getParentChildren(symbolInstance);

  return generateContainerCode(
    symbolInstanceChildren,
    symbolInstance,
    additionalStyles
  );
}

module.exports = {
  generateSymbolInstanceCode
};
