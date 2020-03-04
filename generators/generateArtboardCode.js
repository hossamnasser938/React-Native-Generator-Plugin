const { generateContainerCode } = require("./generateContainerCode");
const { getNodeChildren } = require("../helpers/getNodeChildren/index");

function generateArtboardCode(artboard) {
  const children = getNodeChildren(artboard);

  let code = `{/* <Screen ${artboard.name}> */}\n`;

  code += generateContainerCode(artboard, children);

  code += `{/* </Screen ${artboard.name}> */}\n\n`;

  return code;
}

module.exports = {
  generateArtboardCode
};
