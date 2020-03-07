const { ChildrenMatrix } = require("../helpers/ChildrenMatrix/index");
const { generateChildrenMatrixCode } = require("./generateChildrenMatrixCode");

/**
 * generates code for container element
 * @param {*} parent
 * @param {*} children an array of children nodes
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateContainerCode(parent, children, additionalStyle) {
  const childrenMatrix = new ChildrenMatrix(children);
  childrenMatrix.layChildrenInsideMatrix();

  return generateChildrenMatrixCode(parent, childrenMatrix, additionalStyle);
}

module.exports = {
  generateContainerCode
};
