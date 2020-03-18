const { ChildrenMatrix } = require("../index");
describe("test ChildrenMatrix.calculateSlotChildMetric function", () => {
  test("when having row neighbours", () => {
    const m = new ChildrenMatrix([{}, {}]);

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
    ).toBe(1);

    expect(
      m.calculateSlotChildMetric(
        { i: 1, j: 0 },
        { globalBounds: { x: 200, y: 100, width: 50, height: 50 } }
      )
    ).toBe(-1);
  });

  test("when having column neighbours", () => {
    const m = new ChildrenMatrix([{}, {}]);

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
    ).toBe(1);

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 1 },
        { globalBounds: { x: 100, y: 200, width: 50, height: 50 } }
      )
    ).toBe(-1);
  });

  test("when having both row and column neighbours", () => {
    const m = new ChildrenMatrix([{}, {}, {}, {}]);

    m.setChild(
      { i: 0, j: 0 },
      {
        globalBounds: { x: 100, y: 100, width: 50, height: 50 }
      }
    );

    m.setChild(
      { i: 0, j: 1 },
      {
        globalBounds: { x: 200, y: 100, width: 50, height: 50 }
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
        { i: 1, j: 0 },
        { globalBounds: { x: 100, y: 200, width: 50, height: 50 } }
      )
    ).toBe(2);

    expect(
      m.calculateSlotChildMetric(
        { i: 2, j: 0 },
        { globalBounds: { x: 100, y: 200, width: 50, height: 50 } }
      )
    ).toBe(1);

    expect(
      m.calculateSlotChildMetric(
        { i: 0, j: 2 },
        { globalBounds: { x: 100, y: 200, width: 50, height: 50 } }
      )
    ).toBe(-2);

    expect(
      m.calculateSlotChildMetric(
        { i: 2, j: 2 },
        { globalBounds: { x: 100, y: 200, width: 50, height: 50 } }
      )
    ).toBe(0);
  });
});
