const { ChildrenMatrix } = require("../ChildrenMatrix");

test("test ChildrenMatrix.sortChildren function", () => {
  const child1 = { globalBounds: { x: 100, y: 100, width: 50, height: 50 } };
  const child2 = { globalBounds: { x: 100, y: 200, width: 50, height: 50 } };
  const child3 = { globalBounds: { x: 200, y: 100, width: 50, height: 50 } };

  const m = new ChildrenMatrix(2);

  expect(m.sortChildren([child1, child2])).toEqual([child1, child2]);
  expect(m.sortChildren([child2, child1])).toEqual([child1, child2]);

  const mm = new ChildrenMatrix(3);

  expect(mm.sortChildren([child1, child2, child3])).toEqual([
    child1,
    child2,
    child3
  ]);
  expect(mm.sortChildren([child2, child3, child1])).toEqual([
    child1,
    child2,
    child3
  ]);
  expect(mm.sortChildren([child2, child1, child3])).toEqual([
    child1,
    child2,
    child3
  ]);
});
