const { generatePlaceholderCode } = require("./generatePlaceholderCode");

function generatePolygonCode(polygon) {
  return `{/* <Polygon /> {Polygon is not supported. It can be exported as Svg} */}\n${generatePlaceholderCode(
    polygon
  )}`;
}

module.exports = {
  generatePolygonCode
};
