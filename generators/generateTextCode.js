const { Text } = require("scenegraph");
const {
  convertColorObjToHexColor
} = require("../helpers/convertColorObjToHexColor");
const {
  pixelUnitPreprocessor
} = require("../preprocessors/pixelUnitPreprocessor");

/**
 * generates code for text element
 * @param {*} text an instance of Text
 * @returns string ui code
 */
function generateTextCode(textElement) {
  // TODO: handle color with stroke
  // TODO: handle style ranges
  // TODO: test textScript

  const style = {};

  const {
    strokeEnabled,
    stroke,
    fillEnabled,
    fill,
    text,
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

  if (fillEnabled || strokeEnabled) {
    // Handled only Color. TODO: handle LinearGradientFill, RadialGradientFill, ImageFill
    style.color = convertColorObjToHexColor(fillEnabled ? fill : stroke);
  }

  style.fontFamily = fontFamily;

  switch (fontStyle) {
    case "Regular":
      break;

    case "Italic":
      style.fontStyle = "italic";
      break;

    case "UltraLight":
      style.fontWeight = "100";
      break;

    case "UltraLight Italic":
      style.fontWeight = "100";
      style.fontStyle = "italic";
      break;

    case "Thin":
      style.fontWeight = "200";
      break;

    case "Thin Italic":
      style.fontWeight = "200";
      style.fontStyle = "italic";
      break;

    case "Light":
      style.fontWeight = "300";
      break;

    case "Light Italic":
      style.fontWeight = "300";
      style.fontStyle = "italic";
      break;

    case "Medium":
      style.fontWeight = "400";
      break;

    case "Medium Italic":
      style.fontWeight = "400";
      style.fontStyle = "italic";
      break;

    case "Bold":
      style.fontWeight = "bold";
      break;

    case "Bold Italic":
      style.fontWeight = "bold";
      style.fontStyle = "italic";
      break;

    case "Condensed Bold":
      style.fontWeight = "800";
      break;

    case "Condensed Black":
      style.fontWeight = "900";
      break;
  }

  style.fontSize = pixelUnitPreprocessor(fontSize);

  if (charSpacing) {
    style.letterSpacing = pixelUnitPreprocessor(charSpacing / 50);
  }

  if (underline) {
    style.textDecorationLine = "underline";
  }

  if (strikethrough) {
    style.textDecorationLine = "line-through";
  }

  if (textTransform !== "none") {
    const textTransformConverter = {
      uppercase: "uppercase",
      lowercase: "lowercase",
      titlecase: "capitalize"
    };

    style.textTransform = textTransformConverter[textTransform];
  }

  switch (textScript) {
    case "none":
      break;

    case "superscript":
      style.lineHeight = pixelUnitPreprocessor(18);
      style.fontSize = pixelUnitPreprocessor(15);
      break;

    case "subscript":
      style.lineHeight = pixelUnitPreprocessor(37);
      style.fontSize = pixelUnitPreprocessor(15);
      break;
  }

  if (textAlign !== Text.ALIGN_LEFT) {
    const textAlignConverter = {
      [Text.ALIGN_CENTER]: "center",
      [Text.ALIGN_RIGHT]: "right"
    };

    style.textAlign = textAlignConverter[textAlign];
  }

  return `<Text style={${JSON.stringify(style)}}>${text}</Text>\n`;
}

module.exports = {
  generateTextCode
};
