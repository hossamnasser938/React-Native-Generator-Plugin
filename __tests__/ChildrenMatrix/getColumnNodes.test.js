const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

const child1 = { guid: "child1", globalBounds: {} };
const child2 = { guid: "child2", globalBounds: {} };
const child3 = { guid: "child3", globalBounds: {} };
const child4 = { guid: "child4", globalBounds: {} };
const child5 = { guid: "child5", globalBounds: {} };
const child6 = { guid: "child6", globalBounds: {} };

test("test ChildrenMatrix.getColumnNodes function", () => {
  const m = new ChildrenMatrix([
    child1,
    child2,
    child3,
    child4,
    child5,
    child6
  ]);

  m.setChild({ i: 0, j: 0 }, child1);
  m.setChild({ i: 1, j: 0 }, child2);
  m.setChild({ i: 1, j: 1 }, child3);
  m.setChild({ i: 2, j: 0 }, child4);
  m.setChild({ i: 2, j: 1 }, child5);
  m.setChild({ i: 2, j: 2 }, child6);

  expect(m.getColumnNodes(0)).toEqual([child1, child2, child4]);
  expect(m.getColumnNodes(1)).toEqual([child3, child5]);
  expect(m.getColumnNodes(2)).toEqual([child6]);
  expect(m.getColumnNodes(3)).toEqual([]);
  expect(m.getColumnNodes(4)).toEqual([]);
  expect(m.getColumnNodes(5)).toEqual([]);
});
