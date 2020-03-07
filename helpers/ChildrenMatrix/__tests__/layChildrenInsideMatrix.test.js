const { ChildrenMatrix } = require("../index");

const child1 = {
  guid: "child1",
  boundsInParent: { x: 100, y: 100, width: 50, height: 50 }
};
const child2 = {
  guid: "child2",
  boundsInParent: { x: 200, y: 100, width: 50, height: 50 }
};
const child3 = {
  guid: "child3",
  boundsInParent: { x: 300, y: 100, width: 50, height: 50 }
};
const child4 = {
  guid: "child4",
  boundsInParent: { x: 100, y: 200, width: 50, height: 50 }
};
const child5 = {
  guid: "child5",
  boundsInParent: { x: 200, y: 200, width: 50, height: 50 }
};
const child6 = {
  guid: "child6",
  boundsInParent: { x: 100, y: 300, width: 50, height: 50 }
};

describe("test ChildrenMatrix.layChildrenInsideMatrix function", () => {
  test("test 2 children", () => {
    // the same row
    const children12Matrix = new ChildrenMatrix([child1, child2]);
    const children21Matrix = new ChildrenMatrix([child2, child1]);

    const expected1 = [
      [child1, child2],
      [expect.anyFalsyValue(), expect.anyFalsyValue()]
    ];

    expect(children12Matrix.layChildrenInsideMatrix()).toEqual(expected1);
    expect(children21Matrix.layChildrenInsideMatrix()).toEqual(expected1);

    // the same column
    const children14Matrix = new ChildrenMatrix([child1, child4]);
    const children41Matrix = new ChildrenMatrix([child4, child1]);

    const expected2 = [
      [child1, expect.anyFalsyValue()],
      [child4, expect.anyFalsyValue()]
    ];

    expect(children14Matrix.layChildrenInsideMatrix()).toEqual(expected2);
    expect(children41Matrix.layChildrenInsideMatrix()).toEqual(expected2);
  });

  test("test 3 children", () => {
    // the same row
    const children123Matrix = new ChildrenMatrix([child1, child2, child3]);
    const children213Matrix = new ChildrenMatrix([child2, child1, child3]);
    const children312Matrix = new ChildrenMatrix([child3, child1, child2]);

    const expected1 = [
      [child1, child2, child3],
      [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()],
      [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()]
    ];

    expect(children123Matrix.layChildrenInsideMatrix()).toEqual(expected1);
    expect(children213Matrix.layChildrenInsideMatrix()).toEqual(expected1);
    expect(children312Matrix.layChildrenInsideMatrix()).toEqual(expected1);

    // the same column
    const children146Matrix = new ChildrenMatrix([child1, child4, child6]);
    const children416Matrix = new ChildrenMatrix([child4, child1, child6]);
    const children614Matrix = new ChildrenMatrix([child6, child1, child4]);

    const expected2 = [
      [child1, expect.anyFalsyValue(), expect.anyFalsyValue()],
      [child4, expect.anyFalsyValue(), expect.anyFalsyValue()],
      [child6, expect.anyFalsyValue(), expect.anyFalsyValue()]
    ];

    expect(children146Matrix.layChildrenInsideMatrix()).toEqual(expected2);
    expect(children416Matrix.layChildrenInsideMatrix()).toEqual(expected2);
    expect(children614Matrix.layChildrenInsideMatrix()).toEqual(expected2);

    // dispersed
    const children124Matrix = new ChildrenMatrix([child1, child2, child4]);
    const children214Matrix = new ChildrenMatrix([child2, child1, child4]);
    const children412Matrix = new ChildrenMatrix([child4, child1, child2]);

    const expected3 = [
      [child1, child2, expect.anyFalsyValue()],
      [child4, expect.anyFalsyValue(), expect.anyFalsyValue()],
      [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()]
    ];

    expect(children124Matrix.layChildrenInsideMatrix()).toEqual(expected3);
    expect(children214Matrix.layChildrenInsideMatrix()).toEqual(expected3);
    expect(children412Matrix.layChildrenInsideMatrix()).toEqual(expected3);
  });

  test("test 4 children", () => {
    const children1245Matrix = new ChildrenMatrix([
      child1,
      child2,
      child4,
      child5
    ]);
    const children2451Matrix = new ChildrenMatrix([
      child2,
      child4,
      child5,
      child1
    ]);
    const children4215Matrix = new ChildrenMatrix([
      child4,
      child2,
      child1,
      child5
    ]);
    const children5214Matrix = new ChildrenMatrix([
      child5,
      child2,
      child1,
      child4
    ]);

    const expected = [
      [child1, child2, expect.anyFalsyValue(), expect.anyFalsyValue()],
      [child4, child5, expect.anyFalsyValue(), expect.anyFalsyValue()],
      [
        expect.anyFalsyValue(),
        expect.anyFalsyValue(),
        expect.anyFalsyValue(),
        expect.anyFalsyValue()
      ],
      [
        expect.anyFalsyValue(),
        expect.anyFalsyValue(),
        expect.anyFalsyValue(),
        expect.anyFalsyValue()
      ]
    ];

    expect(children1245Matrix.layChildrenInsideMatrix()).toEqual(expected);
    expect(children2451Matrix.layChildrenInsideMatrix()).toEqual(expected);
    expect(children4215Matrix.layChildrenInsideMatrix()).toEqual(expected);
    expect(children5214Matrix.layChildrenInsideMatrix()).toEqual(expected);
  });

  test("should duplicate children", () => {
    const childToBeDuplicated = {
      guid: "childToBeDuplicated",
      boundsInParent: { x: 150, y: 100, width: 100, height: 200 }
    };

    const m = new ChildrenMatrix([
      child1,
      child2,
      childToBeDuplicated,
      child4,
      child5
    ]);

    const expected = [
      [
        expect.any(ChildrenMatrix),
        childToBeDuplicated,
        expect.any(ChildrenMatrix)
      ],
      [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()],
      [expect.anyFalsyValue(), expect.anyFalsyValue(), expect.anyFalsyValue()]
    ];

    expect(m.layChildrenInsideMatrix()).toEqual(expected);
  });
});
