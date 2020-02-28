const { generateContainerCode } = require("./generateContainerCode");

function generateArtboardCode(artboard) {
  const childrenArray = artboard.children.map(item => item);

  let code = `{/* <Screen ${artboard.name}> */}\n`;

  code += generateContainerCode(childrenArray);

  code += `{/* </Screen ${artboard.name}> */}\n\n`;

  return code;
}

module.exports = {
  generateArtboardCode
};
