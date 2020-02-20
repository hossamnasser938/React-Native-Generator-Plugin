/**
 * converts a Color instance to string hexdecimal color
 * @param {*} colorObj an instance of Color
 * @returns string hexdecimal color like #ffffff
 */
function convertColorObjToHexColor(colorObj) {
  const hexValue = colorObj.value.toString(16).substring(2);

  return `#${hexValue}`;
}

module.exports = {
  convertColorObjToHexColor
};
