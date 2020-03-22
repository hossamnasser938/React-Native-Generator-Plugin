const {
  convertFontFamilyAttribute,
  convertFontStyleAttribute,
  convertFontSizeAttribute,
  convertCharSpacingAttribute,
  convertUnderlineAttribute,
  convertStrikethroughAttribute,
  convertTextTransformAttribute,
  convertTextScriptAttribute,
  convertTextAlignAttribute
} = require("./converters");

/**
 * generates style for text range item
 * @param {*} textRange an instance of TextRange
 * @returns style object
 */
function generateTextRangeStyles(textRange) {
  // TODO: handle color with stroke

  const {
    fill,
    fontFamily,
    fontStyle,
    fontSize,
    charSpacing,
    underline,
    strikethrough,
    textTransform,
    textScript,
    textAlign
  } = textRange;

  const style = {
    ...convertFontFamilyAttribute(fontFamily),
    ...convertFontStyleAttribute(fontStyle),
    ...convertFontSizeAttribute(fontSize),
    ...convertCharSpacingAttribute(charSpacing),
    ...convertUnderlineAttribute(underline),
    ...convertStrikethroughAttribute(strikethrough),
    ...convertTextTransformAttribute(textTransform),
    ...convertTextScriptAttribute(textScript),
    ...convertTextAlignAttribute(textAlign)
  };

  if (fill) {
    style.color = fill.toHex(true);
  }

  return style;
}

module.exports = {
  generateTextRangeStyles
};
