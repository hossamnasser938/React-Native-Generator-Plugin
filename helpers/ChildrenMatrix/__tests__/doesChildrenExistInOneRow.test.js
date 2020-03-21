const { ChildrenMatrix } = require("../index");

const child1 = { guid: "child1", globalBounds: {} };
const child2 = { guid: "child2", globalBounds: {} };
const child3 = { guid: "child3", globalBounds: {} };
const child4 = { guid: "child4", globalBounds: {} };

describe("test ChildrenMatrix.doesChildrenExistInOneRow function", () => {
  test("should return true", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4]);

    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 0, j: 1 }, child2);
    m.setChild({ i: 0, j: 2 }, child3);
    m.setChild({ i: 0, j: 3 }, child4);

    expect(m.doesChildrenExistInOneRow()).toBeTruthy();
  });

  test("should return false", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4]);

    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 0, j: 1 }, child2);
    m.setChild({ i: 1, j: 0 }, child3);
    m.setChild({ i: 1, j: 1 }, child4);

    expect(m.doesChildrenExistInOneRow()).toBeFalsy();
  });
});
