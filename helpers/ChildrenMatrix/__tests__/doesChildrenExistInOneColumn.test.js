const { ChildrenMatrix } = require("../index");

const child1 = { guid: "child1" };
const child2 = { guid: "child2" };
const child3 = { guid: "child3" };
const child4 = { guid: "child4" };

describe("test ChildrenMatrix.doesChildrenExistInOneColumn function", () => {
  test("should return true", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4]);

    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 1, j: 0 }, child2);
    m.setChild({ i: 2, j: 0 }, child3);
    m.setChild({ i: 3, j: 0 }, child4);

    expect(m.doesChildrenExistInOneColumn()).toBeTruthy();
  });

  test("should return false", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4]);

    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 0, j: 1 }, child2);
    m.setChild({ i: 1, j: 0 }, child3);
    m.setChild({ i: 1, j: 1 }, child4);

    expect(m.doesChildrenExistInOneColumn()).toBeFalsy();
  });
});
