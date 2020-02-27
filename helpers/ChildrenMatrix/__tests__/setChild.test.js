const { ChildrenMatrix } = require("../index");

test("test ChildrenMatrix.setChild function", () => {
  const m = new ChildrenMatrix(2);

  expect(m.matrix[0][0]).toBeFalsy();

  m.setChild({ i: 0, j: 0 }, {});

  expect(m.matrix[0][0]).not.toBeFalsy();
});
