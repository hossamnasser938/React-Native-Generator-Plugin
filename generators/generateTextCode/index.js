const { generateTextStyles } = require("./generateTextStyles");
const { generateTextRangeStyles } = require("./generateTextRangeStyles");

/**
 * generates code for text element
 * @param {*} text an instance of Text
 * @returns string ui code
 */
function generateTextCode(textElement) {
  // TODO: extract common styles from ranges

  const { text, styleRanges } = textElement;

  if (styleRanges.length === 1 && styleRanges[0].length === 0) {
    // one style text
    const style = generateTextStyles(textElement);

    return `<Text style={${JSON.stringify(style)}}>${text}</Text>\n`;
  }

  // multistyle text

  let code = `<Text>\n`;
  let startCharIndex = 0;

  styleRanges.forEach(styleRange => {
    const { length } = styleRange;

    const currentStyle = generateTextRangeStyles(styleRange);
    const currentText = text.substring(startCharIndex, startCharIndex + length);

    code += `<Text style={${JSON.stringify(
      currentStyle
    )}}>${currentText}</Text>`;

    startCharIndex += length;
  });

  code += `</Text>\n`;

  return code;
}

module.exports = {
  generateTextCode
};
