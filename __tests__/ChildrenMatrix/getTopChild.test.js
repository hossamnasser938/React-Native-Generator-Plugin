const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

const child1 = {
  globalBounds: {
    x: 100,
    y: 100,
    width: 50,
    height: 120
  }
};

const child2 = {
  globalBounds: {
    x: 200,
    y: 100,
    width: 50,
    height: 150
  }
};

const child3 = {
  globalBounds: {
    x: 100,
    y: 300,
    width: 50,
    height: 50
  }
};

const child4 = {
  globalBounds: {
    x: 200,
    y: 300,
    width: 50,
    height: 50
  }
};

const child5 = {
  globalBounds: {
    x: 300,
    y: 300,
    width: 50,
    height: 50
  }
};

test("test ChildrenMatrix.getTopChild function", () => {
  const cm1 = new ChildrenMatrix([child1, child2, child3]);
  cm1.setChild({ i: 0, j: 0 }, child1);
  cm1.setChild({ i: 0, j: 1 }, child2);
  cm1.setChild({ i: 1, j: 0 }, child3);

  const cm2 = new ChildrenMatrix([child1, child2, child4]);
  cm2.setChild({ i: 0, j: 0 }, child1);
  cm2.setChild({ i: 0, j: 1 }, child2);
  cm2.setChild({ i: 1, j: 1 }, child4);

  const cm3 = new ChildrenMatrix([child1, child2, child5]);
  cm3.setChild({ i: 0, j: 0 }, child1);
  cm3.setChild({ i: 0, j: 1 }, child2);
  cm3.setChild({ i: 1, j: 2 }, child5);

  expect(cm1.getTopChild({ i: 0, j: 0 })).toBe(null);
  expect(cm1.getTopChild({ i: 0, j: 1 })).toBe(null);
  expect(cm1.getTopChild({ i: 1, j: 0 })).toBe(child2);

  expect(cm2.getTopChild({ i: 0, j: 0 })).toBe(null);
  expect(cm2.getTopChild({ i: 0, j: 1 })).toBe(null);
  expect(cm2.getTopChild({ i: 1, j: 1 })).toBe(child2);

  expect(cm3.getTopChild({ i: 0, j: 0 })).toBe(null);
  expect(cm3.getTopChild({ i: 0, j: 1 })).toBe(null);
  expect(cm3.getTopChild({ i: 1, j: 2 })).toBe(child2);
});
