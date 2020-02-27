const { ChildrenMatrix } = require("../index");

describe("test ChildrenMatrix.getSlotColumnNeighbors function", () => {
  test("should return an empty array for 2x2 matrix", () => {
    const m = new ChildrenMatrix(2);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });

    expect(m.getSlotColumnNeighbors({ i: 0, j: 1 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 1, j: 1 })).toEqual([]);

    m.setChild({ i: 1, j: 0 }, { id: "id2" });
    expect(m.getSlotColumnNeighbors({ i: 0, j: 1 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 1, j: 1 })).toEqual([]);
  });

  test("should return an empty array for 3x3 matrix", () => {
    const m = new ChildrenMatrix(3);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });

    expect(m.getSlotColumnNeighbors({ i: 0, j: 1 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 1, j: 1 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 2, j: 1 })).toEqual([]);

    expect(m.getSlotColumnNeighbors({ i: 0, j: 2 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 1, j: 2 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 2, j: 2 })).toEqual([]);

    m.setChild({ i: 1, j: 1 }, { id: "id2" });

    expect(m.getSlotColumnNeighbors({ i: 0, j: 2 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 1, j: 2 })).toEqual([]);
    expect(m.getSlotColumnNeighbors({ i: 2, j: 2 })).toEqual([]);
  });

  test("should return an array of children for 2x2 matrix", () => {
    const m = new ChildrenMatrix(2);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });
    m.setChild({ i: 1, j: 1 }, { id: "id2" });

    expect(m.getSlotColumnNeighbors({ i: 0, j: 1 })).toEqual([{ id: "id2" }]);
    expect(m.getSlotColumnNeighbors({ i: 1, j: 0 })).toEqual([{ id: "id1" }]);
  });

  test("should return an array of children for 3x3 matrix", () => {
    const m = new ChildrenMatrix(3);

    m.setChild({ i: 0, j: 0 }, { id: "id1" });

    expect(m.getSlotColumnNeighbors({ i: 1, j: 0 })).toEqual([{ id: "id1" }]);
    expect(m.getSlotColumnNeighbors({ i: 2, j: 0 })).toEqual([{ id: "id1" }]);

    m.setChild({ i: 1, j: 0 }, { id: "id2" });

    expect(m.getSlotColumnNeighbors({ i: 2, j: 0 })).toMatchArryIgnoringOrder([
      { id: "id1" },
      { id: "id2" }
    ]);
  });
});
