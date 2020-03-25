const beautify = require("js-beautify");

function prettifyCode(code) {
  const beautifiedComponent = beautify(code, {
    indent_size: 2,
    operator_position: "preserve-newline"
  });

  return beautifiedComponent;
}

module.exports = {
  prettifyCode
};
