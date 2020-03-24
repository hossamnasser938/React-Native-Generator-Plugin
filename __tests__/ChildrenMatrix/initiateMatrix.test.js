const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

describe("test initiating new childdren matrix object", () => {
  describe("should initiate children matrix correctly", () => {
    const child1 = { globalBounds: { x: 100, y: 70, width: 100, height: 50 } };
    const child2 = { globalBounds: { x: 200, y: 70, width: 50, height: 300 } };
    const child3 = { globalBounds: { x: 400, y: 70, width: 100, height: 50 } };
    const child4 = {
      globalBounds: { x: 100, y: 200, width: 100, height: 150 }
    };
    const child5 = {
      globalBounds: { x: 400, y: 200, width: 100, height: 150 }
    };

    const cm = new ChildrenMatrix([child1, child2, child3, child4, child5]);

    test("should set n(matrix length)", () => {
      expect(cm.n).toEqual(5);
    });

    test("should initiate falsy matrix", () => {
      expect(cm.matrix).isFalsyMatrix(5);
    });

    test("should calculate matrix global bounds", () => {
      expect(cm.globalBounds).toEqual({
        x: 100,
        y: 70,
        width: 400,
        height: 300
      });
    });
  });

  test("should throw an error", () => {
    expect(() => {
      new ChildrenMatrix();
    }).toThrow();

    expect(() => {
      new ChildrenMatrix(0);
    }).toThrow();

    expect(() => {
      new ChildrenMatrix(-3);
    }).toThrow();

    expect(() => {
      new ChildrenMatrix("g");
    }).toThrow();

    expect(() => {
      new ChildrenMatrix({});
    }).toThrow();

    expect(() => {
      new ChildrenMatrix([]);
    }).toThrow();
  });
});
