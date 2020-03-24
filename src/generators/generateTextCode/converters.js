const { Text } = require("scenegraph");
const {
  pixelUnitPreprocessor
} = require("../../preprocessors/pixelUnitPreprocessor");

function convertFontFamilyAttribute(fontFamily) {
  return { fontFamily };
}

function convertFontStyleAttribute(fontStyle) {
  const style = {};

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

  return style;
}

function convertFontSizeAttribute(fontSize) {
  return { fontSize: pixelUnitPreprocessor(fontSize) };
}

function convertCharSpacingAttribute(charSpacing) {
  if (charSpacing) {
    return { letterSpacing: pixelUnitPreprocessor(charSpacing / 50) };
  }

  return {};
}

function convertUnderlineAttribute(underline) {
  if (underline) {
    return { textDecorationLine: "underline" };
  }

  return {};
}

function convertStrikethroughAttribute(strikethrough) {
  if (strikethrough) {
    return { textDecorationLine: "line-through" };
  }

  return {};
}

function convertTextTransformAttribute(textTransform) {
  if (textTransform !== "none") {
    const textTransformConverter = {
      uppercase: "uppercase",
      lowercase: "lowercase",
      titlecase: "capitalize"
    };

    return { textTransform: textTransformConverter[textTransform] };
  }

  return {};
}

function convertTextScriptAttribute(textScript) {
  // TODO

  return {};
}

function convertTextAlignAttribute(textAlign) {
  if (textAlign !== Text.ALIGN_LEFT) {
    const textAlignConverter = {
      [Text.ALIGN_CENTER]: "center",
      [Text.ALIGN_RIGHT]: "right"
    };

    return { textAlign: textAlignConverter[textAlign] };
  }
}

module.exports = {
  convertFontStyleAttribute,
  convertFontFamilyAttribute,
  convertFontSizeAttribute,
  convertCharSpacingAttribute,
  convertUnderlineAttribute,
  convertStrikethroughAttribute,
  convertTextTransformAttribute,
  convertTextScriptAttribute,
  convertTextAlignAttribute
};
