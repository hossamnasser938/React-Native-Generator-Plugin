const { ChildrenMatrix } = require("../helpers/ChildrenMatrix/index");
const { generateChildrenMatrixCode } = require("./generateChildrenMatrixCode");

/**
 * generates code for container element
 * @param {*} children an array of children nodes
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateContainerCode(children, parent, additionalStyle) {
  const childrenMatrix = new ChildrenMatrix(children);
  childrenMatrix.layChildrenInsideMatrix();

  return generateChildrenMatrixCode(childrenMatrix, parent, additionalStyle);
}

module.exports = {
  generateContainerCode
};
