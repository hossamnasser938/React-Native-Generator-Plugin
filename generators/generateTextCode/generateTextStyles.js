const {
  convertColorObjToHexColor
} = require("../../helpers/convertColorObjToHexColor");
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
 * generates style for text element
 * @param {*} textElement an instance of Text
 * @returns style object
 */
function generateTextStyles(textElement) {
  // TODO: handle color with stroke

  const {
    strokeEnabled,
    stroke,
    fillEnabled,
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
  } = textElement;

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

  if (fillEnabled || strokeEnabled) {
    // Handled only Color. TODO: handle LinearGradientFill, RadialGradientFill, ImageFill
    style.color = convertColorObjToHexColor(fillEnabled ? fill : stroke);
  }

  return style;
}

module.exports = {
  generateTextStyles
};
