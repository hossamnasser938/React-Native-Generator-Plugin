const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

const child1 = { globalBounds: { x: 200, y: 200, width: 50, height: 50 } };
const child2 = { globalBounds: { x: 500, y: 50, width: 50, height: 50 } };
const child3 = { globalBounds: { x: 100, y: 100, width: 50, height: 50 } };
const child4 = { globalBounds: { x: 200, y: 300, width: 50, height: 50 } };
const child5 = { globalBounds: { x: 180, y: 400, width: 50, height: 50 } };
const child6 = { globalBounds: { x: 230, y: 500, width: 50, height: 50 } };

const m = new ChildrenMatrix([child1, child2, child3, child4, child5, child6]);

describe("test ChildrenMatrix.doNodesExistWithinSameColumn function", () => {
  test("should exist within the same column", () => {
    expect(m.doNodesExistWithinSameColumn(child1, child4)).toBeTruthy();
    expect(m.doNodesExistWithinSameColumn(child1, child5)).toBeTruthy();
    expect(m.doNodesExistWithinSameColumn(child1, child6)).toBeTruthy();
  });

  test("should not exist within the same column", () => {
    expect(m.doNodesExistWithinSameColumn(child1, child2)).toBeFalsy();
    expect(m.doNodesExistWithinSameColumn(child1, child3)).toBeFalsy();
  });
});
