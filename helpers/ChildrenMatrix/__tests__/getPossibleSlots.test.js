const { ChildrenMatrix } = require("../ChildrenMatrix");

describe("test ChildrenMatrix.getPossibleSlots function", () => {
  test("test 1x1 matrix", () => {
    const m = new ChildrenMatrix(1);
    expect(m.getPossibleSlots()).toEqual([{ i: 0, j: 0 }]);

    m.setChild(0, 0, {});
    expect(m.getPossibleSlots()).toEqual([]);
  });

  test("test 2x2 matrix", () => {
    const m = new ChildrenMatrix(2);
    expect(m.getPossibleSlots()).toEqual([{ i: 0, j: 0 }]);

    m.setChild(0, 0, {});
    expect(m.getPossibleSlots()).toMatchArryIgnoringOrder([
      { i: 0, j: 1 },
      { i: 1, j: 0 }
    ]);

    m.setChild(0, 1, {});
    expect(m.getPossibleSlots()).toMatchArryIgnoringOrder([
      { i: 1, j: 0 },
      { i: 1, j: 1 }
    ]);
  });

  test("test 3x3 matrix", () => {
    const m = new ChildrenMatrix(3);
    expect(m.getPossibleSlots()).toEqual([{ i: 0, j: 0 }]);

    m.setChild(0, 0, {});
    expect(m.getPossibleSlots()).toMatchArryIgnoringOrder([
      { i: 0, j: 1 },
      { i: 1, j: 0 }
    ]);

    m.setChild(0, 1, {});
    expect(m.getPossibleSlots()).toMatchArryIgnoringOrder([
      { i: 0, j: 2 },
      { i: 1, j: 0 },
      { i: 1, j: 1 }
    ]);

    m.setChild(1, 0, {});
    expect(m.getPossibleSlots()).toMatchArryIgnoringOrder([
      { i: 0, j: 2 },
      { i: 1, j: 1 },
      { i: 2, j: 0 }
    ]);
  });
});
