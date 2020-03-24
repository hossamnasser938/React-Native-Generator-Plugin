const { ChildrenMatrix } = require("../../src/helpers/ChildrenMatrix/index");

test("test ChidrenMatrix.calculateGlobalBounds function", () => {
  const child1 = { globalBounds: { x: 100, y: 70, width: 50, height: 50 } };
  const child2 = { globalBounds: { x: 200, y: 70, width: 20, height: 300 } };
  const child3 = { globalBounds: { x: 400, y: 70, width: 70, height: 50 } };
  const child4 = {
    globalBounds: { x: 100, y: 200, width: 50, height: 150 }
  };
  const child5 = {
    globalBounds: { x: 400, y: 200, width: 70, height: 150 }
  };

  const cm = new ChildrenMatrix([child1, child2, child3, child4, child5]);
  cm.calculateGlobalBounds();

  expect(cm.globalBounds).toEqual({
    x: 100,
    y: 70,
    width: 370,
    height: 300
  });
});
