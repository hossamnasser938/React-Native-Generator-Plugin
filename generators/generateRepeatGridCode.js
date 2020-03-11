const { generateContainerCode } = require("./generateContainerCode");
const { getParentChildren } = require("../helpers/childNearestParent/index");

function generateRepeatGridCode(repeatGrid) {
  const repeatGridChildren = getParentChildren(repeatGrid);

  return generateContainerCode(repeatGridChildren);
}

module.exports = {
  generateRepeatGridCode
};
