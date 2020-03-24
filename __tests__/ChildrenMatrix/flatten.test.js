const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

const child1 = { guid: "child1", globalBounds: {} };
const child2 = { guid: "child2", globalBounds: {} };
const child3 = { guid: "child3", globalBounds: {} };
const child4 = { guid: "child4", globalBounds: {} };

describe("test ChildrenMatrix.flatten method", () => {
  test("children exist in the same row", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4]);

    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 0, j: 1 }, child2);
    m.setChild({ i: 0, j: 2 }, child3);
    m.setChild({ i: 0, j: 3 }, child4);

    expect(m.flatten()).toEqual([
      { node: child1, slot: { i: 0, j: 0 } },
      { node: child2, slot: { i: 0, j: 1 } },
      { node: child3, slot: { i: 0, j: 2 } },
      { node: child4, slot: { i: 0, j: 3 } }
    ]);
  });

  test("children exist in the same column", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4]);

    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 1, j: 0 }, child2);
    m.setChild({ i: 2, j: 0 }, child3);
    m.setChild({ i: 3, j: 0 }, child4);

    expect(m.flatten()).toEqual([
      { node: child1, slot: { i: 0, j: 0 } },
      { node: child2, slot: { i: 1, j: 0 } },
      { node: child3, slot: { i: 2, j: 0 } },
      { node: child4, slot: { i: 3, j: 0 } }
    ]);
  });
});
