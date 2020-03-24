const beautify = require("js-beautify");
const elements = ["View", "Text", "Image"];

function createComponentSkeleton(uiCode) {
  const existingElements = [];

  elements.forEach(element => {
    if (uiCode.includes("<" + element)) {
      existingElements.push(element);
    }
  });

  let component = `import React from 'react';
import {${existingElements.join(", ")}} from 'react-native';

export default () => {
  return (
    ${uiCode}
  );
};
`;

  const beautifiedComponent = beautify(component, {
    indent_size: 2,
    operator_position: "preserve-newline"
  });

  return beautifiedComponent;
}

module.exports = {
  createComponentSkeleton
};
