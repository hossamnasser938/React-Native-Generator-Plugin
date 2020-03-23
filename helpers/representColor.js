/**
 * represents color object in a way acceptable by RN
 * @param {*} color an instance of Color
 * returns string representation of color
 */
function representColor(color) {
  const { r, g, b, a } = color.toRgba();

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

module.exports = {
  representColor
};
