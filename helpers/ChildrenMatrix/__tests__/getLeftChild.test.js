const { ChildrenMatrix } = require("../index");

const child1 = {
  globalBounds: {
    x: 100,
    y: 100,
    width: 50,
    height: 50
  }
};

const child2 = {
  globalBounds: {
    x: 200,
    y: 100,
    width: 50,
    height: 50
  }
};

const child3 = {
  globalBounds: {
    x: 400,
    y: 100,
    width: 50,
    height: 50
  }
};

const child4 = {
  globalBounds: {
    x: 100,
    y: 300,
    width: 50,
    height: 50
  }
};

const child5 = {
  globalBounds: {
    x: 400,
    y: 300,
    width: 50,
    height: 50
  }
};

test("test ChildrenMatrix.getLeftChild function", () => {
  const cm1 = new ChildrenMatrix([child1, child2, child3, child4, child5]);
  cm1.setChild({ i: 0, j: 0 }, child1);
  cm1.setChild({ i: 0, j: 1 }, child2);
  cm1.setChild({ i: 0, j: 2 }, child3);
  cm1.setChild({ i: 1, j: 0 }, child4);
  cm1.setChild({ i: 1, j: 2 }, child5);

  expect(cm1.getLeftChild({ i: 0, j: 0 })).toBe(null);
  expect(cm1.getLeftChild({ i: 0, j: 1 })).toBe(child1);
  expect(cm1.getLeftChild({ i: 0, j: 2 })).toBe(child2);
  expect(cm1.getLeftChild({ i: 1, j: 0 })).toBe(null);
  expect(cm1.getLeftChild({ i: 1, j: 2 })).toBe(child4);
});
