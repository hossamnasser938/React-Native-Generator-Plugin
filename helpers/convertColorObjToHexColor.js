function convertColorObjToHexColor(colorObj) {
  const hexValue = colorObj.value.toString(16).substring(2);

  return `#${hexValue}`;
}

module.exports = {
  convertColorObjToHexColor
};
