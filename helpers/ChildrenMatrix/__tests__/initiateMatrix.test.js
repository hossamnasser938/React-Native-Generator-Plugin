const { ChildrenMatrix } = require("../index");

describe("test initiating new childdren matrix object", () => {
  test("should initiate children matrix correctly", () => {
    const fiveDMatrix = new ChildrenMatrix([{}, {}]);
    expect(fiveDMatrix.n).toEqual(2);
    expect(fiveDMatrix.matrix).isFalsyMatrix(2);
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
