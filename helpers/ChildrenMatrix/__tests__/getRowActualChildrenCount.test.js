const { ChildrenMatrix } = require("../index");

const child1 = { guid: "child1" };
const child2 = { guid: "child2" };
const child3 = { guid: "child3" };
const child4 = { guid: "child4" };
const child5 = { guid: "child5" };
const child6 = { guid: "child6" };

test("test ChildrenMatrix.getRowActualChildrenCount function", () => {
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
  m.setChild({ i: 1, j: 2 }, child3);
  m.setChild({ i: 2, j: 0 }, child4);
  m.setChild({ i: 2, j: 1 }, child5);
  m.setChild({ i: 2, j: 2 }, child6);

  expect(m.getRowActualChildrenCount(0)).toBe(1);
  expect(m.getRowActualChildrenCount(1)).toBe(2);
  expect(m.getRowActualChildrenCount(2)).toBe(3);
  expect(m.getRowActualChildrenCount(3)).toBe(0);
  expect(m.getRowActualChildrenCount(4)).toBe(0);
  expect(m.getRowActualChildrenCount(5)).toBe(0);
});
