const { toFixed } = require("./toFixed");

/**
 * preprocesses pixel units to be compatibe with css prepreocessors like react-native-extended-stylesheet
 * @param {*} unit a number representing pixels
 * @returns another form of unit such as '10rem', '10h', etc
 */
function pixelUnitPreprocessor(unit) {
  // for now no options. In the future may be something like this `${unit}rem`
  return toFixed(unit);
}

module.exports = {
  pixelUnitPreprocessor
};
