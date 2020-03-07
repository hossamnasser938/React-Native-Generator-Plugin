function flattenChildrenMatrix(matrix) {
  const flattenedArray = [];

  matrix.forEach(row => {
    row.forEach(node => {
      if (node) {
        flattenedArray.push(node);
      }
    });
  });

  return flattenedArray;
}

function doesChildrenExistInOneColumn(matrix) {
  return matrix.reduce((acc, row) => !!row[0] && acc, true);
}

function doesChildrenExistInOneRow(matrix) {
  return matrix[0].reduce((acc, node) => !!node && acc, true);
}

function getTupleChildrenCount(row) {
  return row.reduce((acc, node) => (!!node ? acc + 1 : acc), 0);
}

function getColumnNodes(matrix, columnIndex) {
  return matrix.reduce((acc, row) => {
    return row[columnIndex] ? acc.concat(row[columnIndex]) : acc;
  }, []);
}

module.exports = {
  flattenChildrenMatrix,
  doesChildrenExistInOneColumn,
  doesChildrenExistInOneRow,
  getTupleChildrenCount,
  getColumnNodes
};
