function flattenChildrenMatrix(matrix) {
  const flattenedArray = [];

  matrix.forEach(tuple => {
    tuple.forEach(child => {
      if (child) {
        flattenedArray.push(child);
      }
    });
  });

  return flattenedArray;
}

function doesChildrenExistInOneColumn(matrix) {
  return matrix.reduce((acc, tuple) => !!tuple[0] && acc, true);
}

function doesChildrenExistInOneRow(matrix) {
  return matrix[0].reduce((acc, v) => !!v && acc, true);
}

function getTupleChildrenCount(tuple) {
  return tuple.reduce((acc, v) => (!!v ? acc + 1 : acc), 0);
}

function getColumnNodes(matrix, columnIndex) {
  return matrix.reduce((acc, tuple) => {
    return tuple[columnIndex] ? acc.concat(tuple[columnIndex]) : acc;
  }, []);
}

module.exports = {
  flattenChildrenMatrix,
  doesChildrenExistInOneColumn,
  doesChildrenExistInOneRow,
  getTupleChildrenCount,
  getColumnNodes
};
