const { getNodeChildren } = require("../helpers/getNodeChildren");
const { ChildrenMatrix } = require("../helpers/ChildrenMatrix/index");

/**
 * generates code for container element
 * @param {*} container an instance of SceneNode
 * @returns string ui code
 */
function generateContainerCode(container) {
  const children = getNodeChildren(container);

  const childrenMatrix = new ChildrenMatrix(children);
  childrenMatrix.layChildrenInsideMatrix();

  const printItem = item => `<Item_${item.name} />`;

  // check whether children exist in one column
  const childrenExistInOneColumn = childrenMatrix.matrix.reduce(
    (acc, tuple) => !!tuple[0] && acc,
    true
  );

  if (childrenExistInOneColumn) {
    return `<View>
    ${Array(this.n)
      .fill(1)
      .map(_ => "<Item />")}
</View>`;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = childrenMatrix.matrix[0].reduce(
    (acc, v) => !!v && acc,
    true
  );

  if (childrenExistInOneRow) {
    return `<View style={{flexDirection: 'row'}}>
    ${Array(this.n)
      .fill(1)
      .map(_ => "<Item />")}
</View>`;
  }

  // children are dispersed
  const getTupleChildrenCount = function(tuple) {
    return tuple.reduce((acc, v) => (!!v ? acc + 1 : acc), 0);
  };

  return `<View>
  ${childrenMatrix.matrix.map(tuple => {
    const childrenCount = getTupleChildrenCount(tuple);

    return (
      childrenCount &&
      `<View ${childrenCount > 1 ? "style={{flexDirection: 'row'}}" : ""}>
    ${tuple.map(child => child && printItem(child))}
  </View>\n`
    );
  })}
</View>`;
}

module.exports = {
  generateContainerCode
};
