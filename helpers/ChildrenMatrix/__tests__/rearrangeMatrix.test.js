const { ChildrenMatrix } = require("../index");

const child1 = { guid: "child1", globalBounds: {} };
const child2 = { guid: "child2", globalBounds: {} };
const child3 = { guid: "child3", globalBounds: {} };
const child4 = { guid: "child4", globalBounds: {} };
const child5 = { guid: "child5", globalBounds: {} };

test("test ChildrenMatrix.rearrangeMatrix function", () => {
  const m = new ChildrenMatrix([child1, child2, child3, child4, child5]);

  m.setChild({ i: 0, j: 0 }, child1);
  m.setChild({ i: 0, j: 2 }, child2);
  m.setChild({ i: 1, j: 0 }, child3);
  m.setChild({ i: 1, j: 2 }, child4);
  m.setChild({ i: 0, j: 1 }, child5);
  m.setChild({ i: 1, j: 1 }, child5);

  m.rearrangeMatrix({ i: 0, j: 1 });

  expect(m.matrix).toEqual([
    [expect.any(ChildrenMatrix), child5, expect.any(ChildrenMatrix)],
    [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()],
    [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()]
  ]);

  expect(m.getChild({ i: 0, j: 0 }).matrix).toEqual([
    [child1, expect.anyFalsyValue()],
    [child3, expect.anyFalsyValue()]
  ]);

  expect(m.getChild({ i: 0, j: 2 }).matrix).toEqual([
    [child2, expect.anyFalsyValue()],
    [child4, expect.anyFalsyValue()]
  ]);
});
