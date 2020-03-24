const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

describe("test ChildrenMatrix.getSlotRowNeighbors function", () => {
  test("should return an empty array for 2x2 matrix", () => {
    const m = new ChildrenMatrix([{ globalBounds: {} }, { globalBounds: {} }]);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });

    expect(m.getSlotRowNeighbors({ i: 1, j: 0 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 1, j: 1 })).toEqual([]);

    m.setChild({ i: 0, j: 1 }, { id: "id2" });
    expect(m.getSlotRowNeighbors({ i: 1, j: 0 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 1, j: 1 })).toEqual([]);
  });

  test("should return an empty array for 3x3 matrix", () => {
    const m = new ChildrenMatrix([
      { globalBounds: {} },
      { globalBounds: {} },
      { globalBounds: {} }
    ]);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });

    expect(m.getSlotRowNeighbors({ i: 1, j: 0 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 1, j: 1 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 1, j: 2 })).toEqual([]);

    expect(m.getSlotRowNeighbors({ i: 2, j: 0 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 2, j: 1 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 2, j: 2 })).toEqual([]);

    m.setChild({ i: 1, j: 1 }, { id: "id2" });

    expect(m.getSlotRowNeighbors({ i: 2, j: 0 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 2, j: 1 })).toEqual([]);
    expect(m.getSlotRowNeighbors({ i: 2, j: 2 })).toEqual([]);
  });

  test("should return an array of children for 2x2 matrix", () => {
    const m = new ChildrenMatrix([{ globalBounds: {} }, { globalBounds: {} }]);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });
    m.setChild({ i: 1, j: 1 }, { id: "id2" });

    expect(m.getSlotRowNeighbors({ i: 0, j: 1 })).toEqual([{ id: "id1" }]);
    expect(m.getSlotRowNeighbors({ i: 1, j: 0 })).toEqual([{ id: "id2" }]);
  });

  test("should return an array of children for 3x3 matrix", () => {
    const m = new ChildrenMatrix([
      { globalBounds: {} },
      { globalBounds: {} },
      { globalBounds: {} }
    ]);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });

    expect(m.getSlotRowNeighbors({ i: 0, j: 1 })).toEqual([{ id: "id1" }]);
    expect(m.getSlotRowNeighbors({ i: 0, j: 2 })).toEqual([{ id: "id1" }]);

    m.setChild({ i: 0, j: 1 }, { id: "id2" });

    expect(m.getSlotRowNeighbors({ i: 0, j: 2 })).toMatchArryIgnoringOrder([
      { id: "id1" },
      { id: "id2" }
    ]);
  });
});
