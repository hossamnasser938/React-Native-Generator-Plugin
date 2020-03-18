const { ChildrenMatrix } = require("../index");

test("test getNodesToBeDuplicated function", () => {
  const child1 = { globalBounds: { x: 0, y: 0, width: 50, height: 50 } };
  const child2 = { globalBounds: { x: 100, y: 0, width: 50, height: 200 } };
  const child3 = { globalBounds: { x: 200, y: 0, width: 50, height: 50 } };
  const child4 = { globalBounds: { x: 0, y: 100, width: 50, height: 50 } };
  const child5 = { globalBounds: { x: 200, y: 100, width: 50, height: 50 } };
  const child6 = { globalBounds: { x: 0, y: 150, width: 50, height: 50 } };
  const child7 = { globalBounds: { x: 200, y: 150, width: 50, height: 50 } };
  const child8 = { globalBounds: { x: 0, y: 200, width: 50, height: 50 } };
  const child9 = { globalBounds: { x: 200, y: 200, width: 50, height: 50 } };
  const child10 = { globalBounds: { x: 0, y: 250, width: 50, height: 50 } };
  const child11 = { globalBounds: { x: 200, y: 250, width: 50, height: 50 } };

  const m = new ChildrenMatrix([
    child1,
    child2,
    child3,
    child4,
    child5,
    child6,
    child7,
    child8,
    child9,
    child10,
    child11
  ]);

  m.setChild({ i: 0, j: 0 }, child1);
  m.setChild({ i: 0, j: 1 }, child2);
  m.setChild({ i: 0, j: 2 }, child3);
  m.setChild({ i: 1, j: 0 }, child4);
  m.setChild({ i: 1, j: 2 }, child5);
  m.setChild({ i: 2, j: 0 }, child6);
  m.setChild({ i: 2, j: 2 }, child7);
  m.setChild({ i: 3, j: 0 }, child8);
  m.setChild({ i: 3, j: 2 }, child9);

  expect(m.getNodesToBeDuplicated()).toEqual([
    { node: child2, slot: { i: 0, j: 1 } }
  ]);

  m.setChild({ i: 1, j: 1 }, child2);

  expect(m.getNodesToBeDuplicated()).toEqual([
    { node: child2, slot: { i: 1, j: 1 } }
  ]);

  m.setChild({ i: 2, j: 1 }, child2);

  expect(m.getNodesToBeDuplicated()).toEqual([
    { node: child2, slot: { i: 2, j: 1 } }
  ]);

  m.setChild({ i: 3, j: 1 }, child2);

  expect(m.getNodesToBeDuplicated()).toEqual([]);
});
