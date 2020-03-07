const { ChildrenMatrix } = require("../index");

const child1 = { guid: "child1" };
const child2 = { guid: "child2" };
const child3 = { guid: "child3" };
const child4 = { guid: "child4" };
const child5 = { guid: "child5" };

describe("test ChildrenMatrix.checkTheCase function", () => {
  test("should return duplicated node", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4, child5]);
    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 0, j: 2 }, child2);
    m.setChild({ i: 1, j: 0 }, child3);
    m.setChild({ i: 1, j: 2 }, child4);
    m.setChild({ i: 0, j: 1 }, child5);
    m.setChild({ i: 1, j: 1 }, child5);

    expect(m.checkTheCase()).toEqual({ i: 0, j: 1 });
  });

  test("should return nothing", () => {
    const m = new ChildrenMatrix([child1, child2, child3, child4, child5]);
    m.setChild({ i: 0, j: 0 }, child1);
    m.setChild({ i: 0, j: 2 }, child2);
    m.setChild({ i: 1, j: 0 }, child3);
    m.setChild({ i: 1, j: 2 }, child4);
    m.setChild({ i: 0, j: 1 }, child5);

    expect(m.checkTheCase()).toBeFalsy();
  });
});
