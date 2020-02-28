const {
  generateCodeForEntireDocument
} = require("./commands/generateCodeForEntireDocument");
const {
  generateCodeForSelectedComponent
} = require("./commands/generateCodeForSelectedComponent");

module.exports = {
  commands: {
    generateCodeForEntireDocument,
    generateCodeForSelectedComponent
  }
};
