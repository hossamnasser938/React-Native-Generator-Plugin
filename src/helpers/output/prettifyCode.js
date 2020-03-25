const beautify = require("js-beautify");

function prettifyCode(code) {
  // prettify code using js-beatify
  const beautifiedComponent = beautify(code, {
    indent_size: 2,
    operator_position: "preserve-newline"
  });

  // remove white space added after opening tag
  return beautifiedComponent.replace(new RegExp(/<\s/, "g"), "<");
}

module.exports = {
  prettifyCode
};
