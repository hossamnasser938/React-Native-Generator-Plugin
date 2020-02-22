/**
 *
 * @param {*} arg is an instance of Color | LinearGradientFill | RadialGradientFill | ImageFill
 */
function convertFill(arg) {
  //TODO: handle  LinearGradientFill, RadialGradientFill, ImageFill

  const type = arg.constructor.name;

  switch (type) {
    case "Color":
      return arg.toHex(true);

    default:
      return "#ffffff";
  }
}

module.exports = {
  convertFill
};
