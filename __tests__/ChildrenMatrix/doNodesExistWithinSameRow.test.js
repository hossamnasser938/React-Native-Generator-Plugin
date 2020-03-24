const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

const child1 = { globalBounds: { x: 200, y: 200, width: 50, height: 50 } };
const child2 = { globalBounds: { x: 0, y: 500, width: 50, height: 50 } };
const child3 = { globalBounds: { x: 100, y: 50, width: 50, height: 50 } };
const child4 = { globalBounds: { x: 300, y: 200, width: 50, height: 50 } };
const child5 = { globalBounds: { x: 400, y: 180, width: 50, height: 50 } };
const child6 = { globalBounds: { x: 500, y: 220, width: 50, height: 50 } };

const m = new ChildrenMatrix([child1, child2, child3, child4, child5, child6]);

describe("test ChildrenMatrix.doNodesExistWithinSameRow function", () => {
  test("should exist within the same row", () => {
    expect(m.doNodesExistWithinSameRow(child1, child4)).toBeTruthy();
    expect(m.doNodesExistWithinSameRow(child1, child5)).toBeTruthy();
    expect(m.doNodesExistWithinSameRow(child1, child6)).toBeTruthy();
  });

  test("should not exist within the same row", () => {
    expect(m.doNodesExistWithinSameRow(child1, child3)).toBeFalsy();
    expect(m.doNodesExistWithinSameRow(child1, child2)).toBeFalsy();
  });
});
