const { convertFill } = require("../helpers/convertFill");

/**
 * generates code for path element
 * @param {*} path an instance of Path
 * @returns string ui code
 */
function generatePathCode(path) {
  // TODO: import react-native-svg

  const { fillEnabled, fill, strokeEnabled, stroke, pathData } = path;

  let _fill = fillEnabled ? convertFill(fill) : "none";
  const _stroke = strokeEnabled ? stroke.toHex(true) : "none";

  return `<Svg>
  <Path 
    d='${pathData}'
    fill='${_fill}'
    stroke='${_stroke}'
  />
</Svg>\n`;
}

module.exports = {
  generatePathCode
};
