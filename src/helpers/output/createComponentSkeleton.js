const { prettifyCode } = require("./prettifyCode");
const elements = ["View", "Text", "Image"];

function createComponentSkeleton(uiCode) {
  const existingElements = [];

  elements.forEach(element => {
    if (uiCode.includes("<" + element)) {
      existingElements.push(element);
    }
  });

  const component = `import React from 'react';
import {${existingElements.join(", ")}} from 'react-native';

export default () => {
  return (
    ${uiCode}
  );
};
`;

  return prettifyCode(component);
}

module.exports = {
  createComponentSkeleton
};
