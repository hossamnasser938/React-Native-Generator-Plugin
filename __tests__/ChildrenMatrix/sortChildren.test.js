const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

test("test ChildrenMatrix.sortChildren function", () => {
  const child1 = { globalBounds: { x: 100, y: 100, width: 50, height: 50 } };
  const child2 = { globalBounds: { x: 100, y: 200, width: 50, height: 50 } };
  const child3 = { globalBounds: { x: 200, y: 100, width: 50, height: 50 } };

  const children12Matrix = new ChildrenMatrix([child1, child2]);
  expect(children12Matrix.children).toEqual([child1, child2]);

  children12Matrix.sortChildren();
  expect(children12Matrix.children).toEqual([child1, child2]);

  const children21Matrix = new ChildrenMatrix([child2, child1]);
  expect(children21Matrix.children).toEqual([child2, child1]);

  children21Matrix.sortChildren();
  expect(children21Matrix.children).toEqual([child1, child2]);

  const children123Matrix = new ChildrenMatrix([child1, child2, child3]);
  expect(children123Matrix.children).toEqual([child1, child2, child3]);

  const children231Matrix = new ChildrenMatrix([child2, child3, child1]);
  expect(children231Matrix.children).toEqual([child2, child3, child1]);

  const children213Matrix = new ChildrenMatrix([child2, child1, child3]);
  expect(children213Matrix.children).toEqual([child2, child1, child3]);

  children123Matrix.sortChildren();
  expect(children123Matrix.children).toEqual([child1, child3, child2]);

  children231Matrix.sortChildren();
  expect(children231Matrix.children).toEqual([child1, child3, child2]);

  children213Matrix.sortChildren();
  expect(children213Matrix.children).toEqual([child1, child3, child2]);
});
