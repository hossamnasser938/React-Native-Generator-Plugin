const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");

function generateRepeatGridCode(repeatGrid, additionalStyles) {
  const repeatGridChildren = getParentChildren(repeatGrid);

  return generateContainerCode(
    repeatGridChildren,
    repeatGrid,
    additionalStyles
  );
}

module.exports = {
  generateRepeatGridCode
};
