const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

const child1 = { guid: "child1", globalBounds: {} };
const child2 = { guid: "child2", globalBounds: {} };
const child3 = { guid: "child3", globalBounds: {} };

test("test ChildrenMatrix.getChild function", () => {
  const m = new ChildrenMatrix([child1, child2, child3]);

  m.setChild({ i: 0, j: 0 }, child1);
  m.setChild({ i: 1, j: 0 }, child2);
  m.setChild({ i: 1, j: 1 }, child3);

  expect(m.getChild({ i: 0, j: 0 })).toEqual(child1);
  expect(m.getChild({ i: 0, j: 1 })).toBeFalsy();
  expect(m.getChild({ i: 0, j: 2 })).toBeFalsy();
  expect(m.getChild({ i: 1, j: 0 })).toEqual(child2);
  expect(m.getChild({ i: 1, j: 1 })).toEqual(child3);
  expect(m.getChild({ i: 1, j: 2 })).toBeFalsy();
  expect(m.getChild({ i: 2, j: 0 })).toBeFalsy();
  expect(m.getChild({ i: 2, j: 1 })).toBeFalsy();
  expect(m.getChild({ i: 2, j: 2 })).toBeFalsy();
});
