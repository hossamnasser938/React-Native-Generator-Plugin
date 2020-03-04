const { ChildrenMatrix } = require("../index");

describe("test ChildrenMatrix.getMostSuitableSlot function", () => {
  test("test 2x2 matrix", () => {
    const m = new ChildrenMatrix([{}, {}]);

    const existingChild = {
      boundsInParent: { x: 100, y: 100, width: 100, height: 100 }
    };

    m.setChild({ i: 0, j: 0 }, existingChild);

    const newChild1 = {
      boundsInParent: { x: 100, y: 200, width: 100, height: 100 }
    };

    expect(m.getMostSuitableSlot(newChild1)).toEqual({ i: 1, j: 0 });

    const newChild2 = {
      boundsInParent: { x: 200, y: 100, width: 100, height: 100 }
    };

    expect(m.getMostSuitableSlot(newChild2)).toEqual({ i: 0, j: 1 });
  });

  test("test 3x3 matrix", () => {
    const m = new ChildrenMatrix([{}, {}, {}]);

    const existingChild1 = {
      boundsInParent: { x: 100, y: 100, width: 100, height: 100 }
    };

    m.setChild({ i: 0, j: 0 }, existingChild1);

    const newChild1 = {
      boundsInParent: { x: 100, y: 200, width: 100, height: 100 }
    };

    expect(m.getMostSuitableSlot(newChild1)).toEqual({ i: 1, j: 0 });

    const newChild2 = {
      boundsInParent: { x: 200, y: 100, width: 100, height: 100 }
    };

    expect(m.getMostSuitableSlot(newChild2)).toEqual({ i: 0, j: 1 });

    const existingChild2 = {
      boundsInParent: { x: 100, y: 300, width: 100, height: 100 }
    };

    m.setChild({ i: 1, j: 0 }, existingChild2);

    const newChild3 = {
      boundsInParent: { x: 300, y: 100, width: 100, height: 100 }
    };

    expect(m.getMostSuitableSlot(newChild3)).toEqual({ i: 0, j: 1 });

    const existingChild3 = {
      boundsInParent: { x: 200, y: 300, width: 100, height: 100 }
    };

    m.setChild({ i: 1, j: 1 }, existingChild3);

    const newChild4 = {
      boundsInParent: { x: 200, y: 400, width: 100, height: 100 }
    };

    expect(m.getMostSuitableSlot(newChild4)).toEqual({ i: 2, j: 1 });
  });
});
