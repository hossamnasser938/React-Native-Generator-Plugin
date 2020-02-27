const { ChildrenMatrix } = require("../ChildrenMatrix");
describe("test ChildrenMatrix.calculateSlotChildMetric function", () => {
  test("when having row neighbours", () => {
    const m = new ChildrenMatrix(2);

    m.setChild(
      { i: 0, j: 0 },
      {
        globalBounds: { x: 100, y: 100, width: 50, height: 50 }
      }
    );

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 200, y: 100, width: 50, height: 50 } }
      )
    ).toBe(0);

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 200, y: 150, width: 50, height: 50 } }
      )
    ).toBe(50);

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 200, y: 50, width: 50, height: 50 } }
      )
    ).toBe(50);
  });

  test("when having column neighbours", () => {
    const m = new ChildrenMatrix(2);

    m.setChild(
      { i: 0, j: 0 },
      {
        globalBounds: { x: 100, y: 100, width: 50, height: 50 }
      }
    );

    expect(
      m.calculateSlotChildMetric(
        { i: 1, j: 0 },
        { globalBounds: { x: 100, y: 200, width: 50, height: 50 } }
      )
    ).toBe(0);

    expect(
      m.calculateSlotChildMetric(
        { i: 1, j: 0 },
        { globalBounds: { x: 150, y: 200, width: 50, height: 50 } }
      )
    ).toBe(50);

    expect(
      m.calculateSlotChildMetric(
        { i: 1, j: 0 },
        { globalBounds: { x: 50, y: 200, width: 50, height: 50 } }
      )
    ).toBe(50);
  });

  test("when having both row and column neighbours", () => {
    const m = new ChildrenMatrix(2);

    m.setChild(
      { i: 0, j: 0 },
      {
        globalBounds: { x: 100, y: 100, width: 50, height: 50 }
      }
    );

    m.setChild(
      { i: 1, j: 1 },
      {
        globalBounds: { x: 200, y: 200, width: 50, height: 50 }
      }
    );

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 200, y: 100, width: 50, height: 50 } }
      )
    ).toBe(0);

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 250, y: 150, width: 50, height: 50 } }
      )
    ).toBe(100);

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 150, y: 50, width: 50, height: 50 } }
      )
    ).toBe(100);
  });
});
