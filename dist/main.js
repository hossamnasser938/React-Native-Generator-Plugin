module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/commands/generateCodeForEntireDocument.js":
/*!*******************************************************!*\
  !*** ./src/commands/generateCodeForEntireDocument.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { error } = __webpack_require__(/*! ../plugin-toolkit/dialogs.js */ "./src/plugin-toolkit/dialogs.js");
const { generateArtboardCode } = __webpack_require__(/*! ../generators/generateArtboardCode */ "./src/generators/generateArtboardCode.js");
const {
  clearChildNearestParent
} = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");
const { save } = __webpack_require__(/*! ../helpers/output/save */ "./src/helpers/output/save.js");

async function generateCodeForEntireDocument(selection, documentRoot) {
  const components = [];

  try {
    documentRoot.children.forEach(documentItem => {
      if (documentItem.constructor.name === "Artboard") {
        components.push({
          name: documentItem.name,
          code: generateArtboardCode(documentItem)
        });
      }
    });

    await save(components);
    clearChildNearestParent();
  } catch (err) {
    console.log("err", err);
    error("Unexpected error occurred");
    clearChildNearestParent();
  }
}

module.exports = {
  generateCodeForEntireDocument
};


/***/ }),

/***/ "./src/commands/generateCodeForSelectedComponent.js":
/*!**********************************************************!*\
  !*** ./src/commands/generateCodeForSelectedComponent.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { error } = __webpack_require__(/*! ../plugin-toolkit/dialogs.js */ "./src/plugin-toolkit/dialogs.js");
const { generateNodeCode } = __webpack_require__(/*! ../generators/generateNodeCode */ "./src/generators/generateNodeCode.js");
const {
  generateContainerCode
} = __webpack_require__(/*! ../generators/generateContainerCode */ "./src/generators/generateContainerCode.js");
const {
  flattenNodeChildren,
  specifyChildrenNearestParents,
  getNodeArtboard,
  filterChildrenWithNoParents,
  clearChildNearestParent
} = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");
const { save } = __webpack_require__(/*! ../helpers/output/save */ "./src/helpers/output/save.js");

async function generateCodeForSelectedComponent(selection) {
  try {
    if (selection.items.length === 0) {
      error("No selected items");
      return;
    } else {
      const selectedItemsArtboards = [];

      for (const selectedItem of selection.items) {
        const selectedItemArtboard = getNodeArtboard(selectedItem);

        if (!selectedItemArtboard) {
          error("Please, select component within an artboard");
          return;
        }

        // if this artboard does not exits then add it
        if (
          !selectedItemsArtboards.find(
            artboard => artboard.guid === selectedItemArtboard.guid
          )
        ) {
          selectedItemsArtboards.push(selectedItemArtboard);
        }

        if (selectedItemsArtboards.length > 1) {
          error("Please, select component within one artboard");
          return;
        }
      }

      // if current artboard is not one of the selected items then we need to attach each child to its nearset parent
      // if it is, then this step will be done inside generateArtbpardCode

      const currentArtboard = selectedItemsArtboards[0];

      if (!selection.items.find(item => item.guid === currentArtboard.guid)) {
        const children = [];
        flattenNodeChildren(currentArtboard, children);
        specifyChildrenNearestParents(children);
      }

      if (selection.items.length === 1) {
        await save([
          {
            name: selection.items[0].name,
            code: generateNodeCode(selection.items[0])
          }
        ]);
      } else {
        await save([
          {
            name: "SelectedComponent",
            code: generateContainerCode(
              filterChildrenWithNoParents(selection.items)
            )
          }
        ]);
      }
    }

    clearChildNearestParent();
  } catch (err) {
    console.log("err", err);
    error("Unexpected error occurred");
    clearChildNearestParent();
  }
}

module.exports = {
  generateCodeForSelectedComponent
};


/***/ }),

/***/ "./src/generators/generateArtboardCode.js":
/*!************************************************!*\
  !*** ./src/generators/generateArtboardCode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const {
  flattenNodeChildren,
  specifyChildrenNearestParents,
  getParentChildren
} = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");

function generateArtboardCode(artboard) {
  const artboardFlattenedChildren = [artboard];
  flattenNodeChildren(artboard, artboardFlattenedChildren);

  specifyChildrenNearestParents(artboardFlattenedChildren);

  const style = { flex: 1 };

  let code = generateContainerCode(
    getParentChildren(artboard),
    artboard,
    style
  );

  return code;
}

module.exports = {
  generateArtboardCode
};


/***/ }),

/***/ "./src/generators/generateBooleanGroupCode.js":
/*!****************************************************!*\
  !*** ./src/generators/generateBooleanGroupCode.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generatePlaceholderCode } = __webpack_require__(/*! ./generatePlaceholderCode */ "./src/generators/generatePlaceholderCode.js");

function generateBooleanGroupCode(booleanGroup) {
  return `{/* <BooleanGroup /> {BooleanGroup is not supported. It can be exported as Svg} */}\n${generatePlaceholderCode(
    booleanGroup
  )}`;
}

module.exports = {
  generateBooleanGroupCode
};


/***/ }),

/***/ "./src/generators/generateChildrenMatrixCode.js":
/*!******************************************************!*\
  !*** ./src/generators/generateChildrenMatrixCode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * generates code for a set of nodes aligned in a ChildrenMatrix
 * @param {*} childrenMatrix
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateChildrenMatrixCode(childrenMatrix, parent, additionalStyle) {
  const { generateNodeCode } = __webpack_require__(/*! ./generateNodeCode */ "./src/generators/generateNodeCode.js"); // Late require for fixing circular dependency

  // check if it is only one node
  if (childrenMatrix.n === 1 && !additionalStyle) {
    return generateNodeCode(childrenMatrix.getChild({ i: 0, j: 0 }));
  }

  // check whether children exist in one column
  const childrenExistInOneColumn = childrenMatrix.doesChildrenExistInOneColumn();

  let code = "";

  if (childrenExistInOneColumn) {
    code += `<View style={${JSON.stringify({
      alignItems: "flex-start",
      ...generatePaddingStyles(childrenMatrix, parent),
      ...additionalStyle
    })}}>\n`;

    childrenMatrix.flatten().forEach(({ node, slot }) => {
      code += generateNodeCode(
        node,
        generateMarginStyles(slot, childrenMatrix)
      );
    });

    code += `</View>\n`;

    return code;
  }

  // check whether children exist in one row
  const childrenExistInOneRow = childrenMatrix.doesChildrenExistInOneRow();

  if (childrenExistInOneRow) {
    const style = {
      flexDirection: "row",
      alignItems: "flex-start",
      ...generatePaddingStyles(childrenMatrix, parent),
      ...additionalStyle
    };

    code += `<View style={${JSON.stringify(style)}}>\n`;

    childrenMatrix.flatten().forEach(({ node, slot }) => {
      code += generateNodeCode(
        node,
        generateMarginStyles(slot, childrenMatrix)
      );
    });

    code += `</View>\n`;

    return code;
  }

  // children are dispersed
  code += `<View style={${JSON.stringify({
    alignItems: "flex-start",
    ...generatePaddingStyles(childrenMatrix, parent),
    ...additionalStyle
  })}}>\n`;

  childrenMatrix.matrix.map((row, rowIndex) => {
    const childrenCount = childrenMatrix.getRowActualChildrenCount(rowIndex);

    if (childrenCount) {
      if (childrenCount > 1) {
        code += `<View ${"style={{flexDirection: 'row', alignItems: 'flex-start'}}"}>`;

        row.map((child, columnIndex) => {
          if (child) {
            const styles = generateMarginStyles(
              { i: rowIndex, j: columnIndex },
              childrenMatrix
            );

            code += generateNodeCode(child, styles);
          }
        });

        code += `</View>\n`;
      } else {
        const child = row.find(child => !!child);
        const columnIndex = row.findIndex(child => !!child);

        const styles = generateMarginStyles(
          { i: rowIndex, j: columnIndex },
          childrenMatrix
        );

        code += generateNodeCode(child, styles);
      }
    }
  });

  code += `</View>\n`;

  return code;
}

function generateMarginStyles(slot, childrenMatrix) {
  const node = childrenMatrix.getChild(slot);

  const left = childrenMatrix.getLeftChild(slot);
  const top = childrenMatrix.getTopChild(slot);

  let marginStart;
  if (left) {
    marginStart =
      node.globalBounds.x - (left.globalBounds.x + left.globalBounds.width);
  } else {
    marginStart = node.globalBounds.x - childrenMatrix.globalBounds.x;
  }

  let marginTop;
  if (top) {
    marginTop =
      node.globalBounds.y - (top.globalBounds.y + top.globalBounds.height);
  } else {
    marginTop = node.globalBounds.y - childrenMatrix.globalBounds.y;
  }

  const styles = {};

  if (marginStart) {
    styles.marginStart = marginStart;
  }

  if (marginTop) {
    styles.marginTop = marginTop;
  }

  return styles;
}

function generatePaddingStyles(childrenMatrix, parent) {
  if (!parent) {
    return {};
  }

  const styles = {};

  const paddingStart = childrenMatrix.globalBounds.x - parent.globalBounds.x;
  const paddingTop = childrenMatrix.globalBounds.y - parent.globalBounds.y;

  if (paddingStart) {
    styles.paddingStart = paddingStart;
  }

  if (paddingTop) {
    styles.paddingTop = paddingTop;
  }

  return styles;
}

module.exports = {
  generateChildrenMatrixCode
};


/***/ }),

/***/ "./src/generators/generateContainerCode.js":
/*!*************************************************!*\
  !*** ./src/generators/generateContainerCode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { ChildrenMatrix } = __webpack_require__(/*! ../helpers/ChildrenMatrix/index */ "./src/helpers/ChildrenMatrix/index.js");
const { generateChildrenMatrixCode } = __webpack_require__(/*! ./generateChildrenMatrixCode */ "./src/generators/generateChildrenMatrixCode.js");

/**
 * generates code for container element
 * @param {*} children an array of children nodes
 * @param {*} additionalStyle a style object coming from Rectangle or Ellipse
 * @returns string ui code
 */
function generateContainerCode(children, parent, additionalStyle) {
  const childrenMatrix = new ChildrenMatrix(children);
  childrenMatrix.layChildrenInsideMatrix();

  return generateChildrenMatrixCode(childrenMatrix, parent, additionalStyle);
}

module.exports = {
  generateContainerCode
};


/***/ }),

/***/ "./src/generators/generateEllipseCode.js":
/*!***********************************************!*\
  !*** ./src/generators/generateEllipseCode.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateGraphicNodeCode } = __webpack_require__(/*! ./generateGraphicNodeCode */ "./src/generators/generateGraphicNodeCode.js");
const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const { getParentChildren } = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");
const {
  pixelUnitPreprocessor
} = __webpack_require__(/*! ../preprocessors/pixelUnitPreprocessor */ "./src/preprocessors/pixelUnitPreprocessor.js");
const { toFixed } = __webpack_require__(/*! ../preprocessors/toFixed */ "./src/preprocessors/toFixed.js");

/**
 * generates code for ellipse element
 * @param {*} ellipse an instance of Ellipse
 * @returns string ui code
 */
function generateEllipseCode(ellipse, additionalStyles) {
  const styles = {
    ...additionalStyles
  };

  const { radiusX, radiusY, isCircle } = ellipse;

  if (isCircle) {
    styles.width = pixelUnitPreprocessor(radiusX * 2);
    styles.height = pixelUnitPreprocessor(radiusX * 2);
    styles.borderRadius = radiusX;
  } else {
    if (radiusX > radiusY) {
      styles.width = pixelUnitPreprocessor(radiusY * 2);
      styles.height = pixelUnitPreprocessor(radiusY * 2);
      styles.borderRadius = radiusY;
      styles.transform = [{ scaleX: toFixed(radiusX / radiusY) }];
    } else {
      styles.width = pixelUnitPreprocessor(radiusX * 2);
      styles.height = pixelUnitPreprocessor(radiusX * 2);
      styles.borderRadius = radiusX;
      styles.transform = [{ scaleY: toFixed(radiusY / radiusX) }];
    }
  }

  return generateGraphicNodeCode(ellipse, styles);
}

module.exports = {
  generateEllipseCode
};


/***/ }),

/***/ "./src/generators/generateGraphicNodeCode.js":
/*!***************************************************!*\
  !*** ./src/generators/generateGraphicNodeCode.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const { getParentChildren } = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");
const {
  pixelUnitPreprocessor
} = __webpack_require__(/*! ../preprocessors/pixelUnitPreprocessor */ "./src/preprocessors/pixelUnitPreprocessor.js");
const { representColor } = __webpack_require__(/*! ../helpers/representColor */ "./src/helpers/representColor.js");

/**
 * generates graphicNode(either a Rectangle or Ellipse) code
 * @param {*} graphicNode an instance of GraphicNode
 * @returns code
 */
function generateGraphicNodeCode(graphicNode, additionalStyles) {
  const styles = { ...additionalStyles };

  const { fillEnabled, fill, strokeEnabled, stroke, strokeWidth } = graphicNode;

  if (strokeEnabled) {
    styles.borderWidth = pixelUnitPreprocessor(strokeWidth);
    const strokeAsHexColor = representColor(stroke);
    styles.borderColor = strokeAsHexColor;
  }

  let element = "View";

  if (fillEnabled) {
    switch (fill.constructor.name) {
      case "Color":
        styles.backgroundColor = representColor(fill);
        break;

      case "ImageFill":
        element = "Image";
        break;

      default:
        styles.backgroundColor = "#ffffff";
    }
  }

  const children = getParentChildren(graphicNode);

  if (children.length) {
    return element === "View"
      ? generateContainerCode(children, graphicNode, styles)
      : `<ImageBackground style={${JSON.stringify(
          styles
        )}} source={{/* add your source here */}}>\n${generateContainerCode(
          children,
          graphicNode,
          { flex: 1 }
        )}</ImageBackground>`;
  }

  return `<${element} style={${JSON.stringify(
    element === "View" ? { alignItems: "flex-start", ...styles } : styles
  )}}${
    element === "Image" ? " source={{/* add your source here */}}" : ""
  } />\n`;
}

module.exports = {
  generateGraphicNodeCode
};


/***/ }),

/***/ "./src/generators/generateGroupCode.js":
/*!*********************************************!*\
  !*** ./src/generators/generateGroupCode.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const { getParentChildren } = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");

function generateGroupCode(group, additionalStyles) {
  const groupChildren = getParentChildren(group);

  return generateContainerCode(groupChildren, group, additionalStyles);
}

module.exports = {
  generateGroupCode
};


/***/ }),

/***/ "./src/generators/generateLineCode.js":
/*!********************************************!*\
  !*** ./src/generators/generateLineCode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  pixelUnitPreprocessor
} = __webpack_require__(/*! ../preprocessors/pixelUnitPreprocessor */ "./src/preprocessors/pixelUnitPreprocessor.js");
const { representColor } = __webpack_require__(/*! ../helpers/representColor */ "./src/helpers/representColor.js");

/**
 * generates code for line element
 * @param {*} line an instance of Line
 * @returns string ui code
 */
function generateLineCode(line, additionalStyles) {
  // TODO: handle diagonal lines

  const style = { ...additionalStyles };

  const { start, end, strokeEnabled, stroke, strokeWidth, globalBounds } = line;

  if (strokeEnabled) {
    style.backgroundColor = representColor(stroke);

    if (start.x !== end.x) {
      // horizontal
      style.width = pixelUnitPreprocessor(globalBounds.width);
      style.height = pixelUnitPreprocessor(strokeWidth);
    } else {
      // vertical
      style.height = pixelUnitPreprocessor(globalBounds.height);
      style.width = pixelUnitPreprocessor(strokeWidth);
    }
  }

  return `<View style={${JSON.stringify(style)}}/>\n`;
}

module.exports = {
  generateLineCode
};


/***/ }),

/***/ "./src/generators/generateLinkedGraphicCode.js":
/*!*****************************************************!*\
  !*** ./src/generators/generateLinkedGraphicCode.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function generateLinkedGraphicCode(linkedGraphic) {
  return `{/* <LinkedGraphic /> {this is a node from an external resource like a Creative Cloud Library} */}\n`;
}

module.exports = {
  generateLinkedGraphicCode
};


/***/ }),

/***/ "./src/generators/generateNodeCode.js":
/*!********************************************!*\
  !*** ./src/generators/generateNodeCode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateArtboardCode } = __webpack_require__(/*! ./generateArtboardCode */ "./src/generators/generateArtboardCode.js");
const { generateRectangleCode } = __webpack_require__(/*! ./generateRectangleCode */ "./src/generators/generateRectangleCode.js");
const { generateEllipseCode } = __webpack_require__(/*! ./generateEllipseCode */ "./src/generators/generateEllipseCode.js");
const { generatePolygonCode } = __webpack_require__(/*! ./generatePolygonCode */ "./src/generators/generatePolygonCode.js");
const { generateLineCode } = __webpack_require__(/*! ./generateLineCode */ "./src/generators/generateLineCode.js");
const { generatePathCode } = __webpack_require__(/*! ./generatePathCode */ "./src/generators/generatePathCode.js");
const { generateBooleanGroupCode } = __webpack_require__(/*! ./generateBooleanGroupCode */ "./src/generators/generateBooleanGroupCode.js");
const { generateTextCode } = __webpack_require__(/*! ./generateTextCode/index */ "./src/generators/generateTextCode/index.js");
const { generateGroupCode } = __webpack_require__(/*! ./generateGroupCode */ "./src/generators/generateGroupCode.js");
const { generateSymbolInstanceCode } = __webpack_require__(/*! ./generateSymbolInstanceCode */ "./src/generators/generateSymbolInstanceCode.js");
const { generateRepeatGridCode } = __webpack_require__(/*! ./generateRepeatGridCode */ "./src/generators/generateRepeatGridCode.js");
const { generateLinkedGraphicCode } = __webpack_require__(/*! ./generateLinkedGraphicCode */ "./src/generators/generateLinkedGraphicCode.js");
const { generateChildrenMatrixCode } = __webpack_require__(/*! ./generateChildrenMatrixCode */ "./src/generators/generateChildrenMatrixCode.js");
const { generateSceneNodeStyles } = __webpack_require__(/*! ./generateSceneNodeStyles */ "./src/generators/generateSceneNodeStyles.js");

function generateNodeCode(node, additionalStyles) {
  const styles = { ...additionalStyles, ...generateSceneNodeStyles(node) };

  switch (node.constructor.name) {
    case "Artboard":
      return generateArtboardCode(node);

    case "Rectangle":
      return generateRectangleCode(node, styles);

    case "Ellipse":
      return generateEllipseCode(node, styles);

    case "Polygon":
      return generatePolygonCode(node, styles);

    case "Line":
      return generateLineCode(node, styles);

    case "Path":
      return generatePathCode(node, styles);

    case "BooleanGroup":
      return generateBooleanGroupCode(node, styles);

    case "Text":
      return generateTextCode(node, styles);

    case "Group":
      return generateGroupCode(node, styles);

    case "SymbolInstance":
      return generateSymbolInstanceCode(node, styles);

    case "RepeatGrid":
      return generateRepeatGridCode(node, styles);

    case "LinkedGraphic":
      return generateLinkedGraphicCode(node, styles);

    case "ChildrenMatrix":
      return generateChildrenMatrixCode(node, null, styles);

    default:
      return "<StrangeNode />\n";
  }
}

module.exports = {
  generateNodeCode
};


/***/ }),

/***/ "./src/generators/generatePathCode.js":
/*!********************************************!*\
  !*** ./src/generators/generatePathCode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generatePlaceholderCode } = __webpack_require__(/*! ./generatePlaceholderCode */ "./src/generators/generatePlaceholderCode.js");

/**
 * generates code for path element
 * @param {*} path an instance of Path
 * @returns string ui code
 */
function generatePathCode(path) {
  return `{/* <Path /> {Path is not supported. It can be exported as Svg} */}\n${generatePlaceholderCode(
    path
  )}`;
}

module.exports = {
  generatePathCode
};


/***/ }),

/***/ "./src/generators/generatePlaceholderCode.js":
/*!***************************************************!*\
  !*** ./src/generators/generatePlaceholderCode.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* generates a placeholder code for unsupported node types */

function generatePlaceholderCode(node) {
  const styles = {
    width: node.globalBounds.width,
    height: node.globalBounds.height,
    backgroundColor: "#000000"
  };

  return `<View style={${JSON.stringify(styles)}} />\n`;
}

module.exports = { generatePlaceholderCode };


/***/ }),

/***/ "./src/generators/generatePolygonCode.js":
/*!***********************************************!*\
  !*** ./src/generators/generatePolygonCode.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generatePlaceholderCode } = __webpack_require__(/*! ./generatePlaceholderCode */ "./src/generators/generatePlaceholderCode.js");

function generatePolygonCode(polygon) {
  return `{/* <Polygon /> {Polygon is not supported. It can be exported as Svg} */}\n${generatePlaceholderCode(
    polygon
  )}`;
}

module.exports = {
  generatePolygonCode
};


/***/ }),

/***/ "./src/generators/generateRectangleCode.js":
/*!*************************************************!*\
  !*** ./src/generators/generateRectangleCode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateGraphicNodeCode } = __webpack_require__(/*! ./generateGraphicNodeCode */ "./src/generators/generateGraphicNodeCode.js");
const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const { getParentChildren } = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");
const {
  pixelUnitPreprocessor
} = __webpack_require__(/*! ../preprocessors/pixelUnitPreprocessor */ "./src/preprocessors/pixelUnitPreprocessor.js");

/**
 * generates code for rectangle element
 * @param {*} rectangle an instance of Rectangle
 * @returns string ui code
 */
function generateRectangleCode(rectangle, additionalStyles) {
  const styles = {
    ...additionalStyles
  };

  const { width, height, hasRoundedCorners, effectiveCornerRadii } = rectangle;

  styles.width = pixelUnitPreprocessor(width);
  styles.height = pixelUnitPreprocessor(height);

  if (hasRoundedCorners) {
    const { topLeft, topRight, bottomRight, bottomLeft } = effectiveCornerRadii;

    if (
      [topLeft, topRight, bottomRight, bottomLeft].every(
        (value, index, array) => value === array[0]
      )
    ) {
      // all values are equal
      styles.borderRadius = pixelUnitPreprocessor(topLeft);
    } else {
      styles.borderTopStartRadius = pixelUnitPreprocessor(topLeft);
      styles.borderTopEndRadius = pixelUnitPreprocessor(topRight);
      styles.borderBottomEndRadius = pixelUnitPreprocessor(bottomRight);
      styles.borderBottomStartRadius = pixelUnitPreprocessor(bottomLeft);
    }
  }

  return generateGraphicNodeCode(rectangle, styles);
}

module.exports = {
  generateRectangleCode
};


/***/ }),

/***/ "./src/generators/generateRepeatGridCode.js":
/*!**************************************************!*\
  !*** ./src/generators/generateRepeatGridCode.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const { getParentChildren } = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");

function generateRepeatGridCode(repeatGrid, additionalStyles) {
  const repeatGridChildren = getParentChildren(repeatGrid);

  return generateContainerCode(
    repeatGridChildren,
    repeatGrid,
    additionalStyles
  );
}

module.exports = {
  generateRepeatGridCode
};


/***/ }),

/***/ "./src/generators/generateSceneNodeStyles.js":
/*!***************************************************!*\
  !*** ./src/generators/generateSceneNodeStyles.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { toFixed } = __webpack_require__(/*! ../preprocessors/toFixed */ "./src/preprocessors/toFixed.js");

function generateSceneNodeStyles(node) {
  const styles = {};

  if (node.opacity && node.opacity < 1) {
    styles.opacity = toFixed(node.opacity);
  }

  return styles;
}

module.exports = {
  generateSceneNodeStyles
};


/***/ }),

/***/ "./src/generators/generateSymbolInstanceCode.js":
/*!******************************************************!*\
  !*** ./src/generators/generateSymbolInstanceCode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateContainerCode } = __webpack_require__(/*! ./generateContainerCode */ "./src/generators/generateContainerCode.js");
const { getParentChildren } = __webpack_require__(/*! ../helpers/childNearestParent/index */ "./src/helpers/childNearestParent/index.js");

function generateSymbolInstanceCode(symbolInstance, additionalStyles) {
  const symbolInstanceChildren = getParentChildren(symbolInstance);

  return generateContainerCode(
    symbolInstanceChildren,
    symbolInstance,
    additionalStyles
  );
}

module.exports = {
  generateSymbolInstanceCode
};


/***/ }),

/***/ "./src/generators/generateTextCode/converters.js":
/*!*******************************************************!*\
  !*** ./src/generators/generateTextCode/converters.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { Text } = __webpack_require__(/*! scenegraph */ "scenegraph");
const {
  pixelUnitPreprocessor
} = __webpack_require__(/*! ../../preprocessors/pixelUnitPreprocessor */ "./src/preprocessors/pixelUnitPreprocessor.js");

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


/***/ }),

/***/ "./src/generators/generateTextCode/generateTextRangeStyles.js":
/*!********************************************************************!*\
  !*** ./src/generators/generateTextCode/generateTextRangeStyles.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
} = __webpack_require__(/*! ./converters */ "./src/generators/generateTextCode/converters.js");
const { representColor } = __webpack_require__(/*! ../../helpers/representColor */ "./src/helpers/representColor.js");

/**
 * generates style for text range item
 * @param {*} textRange an instance of TextRange
 * @returns style object
 */
function generateTextRangeStyles(textRange) {
  // TODO: handle color with stroke

  const {
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
  } = textRange;

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

  if (fill) {
    style.color = representColor(fill);
  }

  return style;
}

module.exports = {
  generateTextRangeStyles
};


/***/ }),

/***/ "./src/generators/generateTextCode/generateTextStyles.js":
/*!***************************************************************!*\
  !*** ./src/generators/generateTextCode/generateTextStyles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
} = __webpack_require__(/*! ./converters */ "./src/generators/generateTextCode/converters.js");
const { representColor } = __webpack_require__(/*! ../../helpers/representColor */ "./src/helpers/representColor.js");

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
    style.color = fillEnabled ? representColor(fill) : representColor(stroke);
  }

  return style;
}

module.exports = {
  generateTextStyles
};


/***/ }),

/***/ "./src/generators/generateTextCode/index.js":
/*!**************************************************!*\
  !*** ./src/generators/generateTextCode/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { generateTextStyles } = __webpack_require__(/*! ./generateTextStyles */ "./src/generators/generateTextCode/generateTextStyles.js");
const { generateTextRangeStyles } = __webpack_require__(/*! ./generateTextRangeStyles */ "./src/generators/generateTextCode/generateTextRangeStyles.js");

/**
 * generates code for text element
 * @param {*} text an instance of Text
 * @returns string ui code
 */
function generateTextCode(textElement, additionalStyles) {
  // TODO: extract common styles from ranges

  const { text, styleRanges } = textElement;

  if (styleRanges.length === 1) {
    // one style text
    const style = { ...generateTextStyles(textElement), ...additionalStyles };

    return `<Text style={${JSON.stringify(style)}}>${text}</Text>\n`;
  }

  // multistyle text

  let code = `<Text style={${JSON.stringify(additionalStyles)}}>\n`;
  let startCharIndex = 0;

  styleRanges.forEach(styleRange => {
    const { length } = styleRange;

    const currentStyle = generateTextRangeStyles(styleRange);
    const currentText = text.substring(startCharIndex, startCharIndex + length);

    code += `<Text style={${JSON.stringify(
      currentStyle
    )}}>${currentText}</Text>`;

    startCharIndex += length;
  });

  code += `</Text>\n`;

  return code;
}

module.exports = {
  generateTextCode
};


/***/ }),

/***/ "./src/helpers/ChildrenMatrix/index.js":
/*!*********************************************!*\
  !*** ./src/helpers/ChildrenMatrix/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * constructor function that gets children array of a container node
 * and builds a matrix in which children are layed based on their coordinates
 * this matrix helps aligning children using the flexbox algorithm
 *
 * This technique is based on 3 simple assumptions:
 * - nodes with close x values are more likely to exist in the same column
 * - nodes with close y values are more likely to exist in the same row
 * - nodes close to the very top left are aligned first
 *
 * Terms
 * - slot => an object {i, j} such that i is the first index and j is the second index of an item within the matrix
 * - child => an instance of Scenenode
 * - matrix =>  a 2D array. For n items we create a 2D array of n rows each row with n items
 *
 * @param {*} children an array of nodes that exists within the bounds of a container node
 * @returns an instance of ChildrenMatrix
 */
function ChildrenMatrix(children) {
  if (!Array.isArray(children) || children.length === 0) {
    throw new Error(
      "invalid children passed to ChildrenMatrix constructor function. Should be an array of at least one child"
    );
  }

  this.children = children;
  this.n = children.length;

  // initiate a 2D array with falsy values until being populated with children
  this.matrix = new Array(this.n)
    .fill(null)
    .map(_ => new Array(this.n).fill(null));

  this.calculateGlobalBounds();
}

ChildrenMatrix.prototype.calculateGlobalBounds = function() {
  const firstChildBounds = this.children[0].globalBounds;

  const minX = this.children.reduce((acc, child) => {
    if (child.globalBounds.x < acc) {
      return child.globalBounds.x;
    }

    return acc;
  }, firstChildBounds.x);

  const minY = this.children.reduce((acc, child) => {
    if (child.globalBounds.y < acc) {
      return child.globalBounds.y;
    }

    return acc;
  }, firstChildBounds.y);

  const maxXPlusWidth = this.children.reduce((acc, child) => {
    if (child.globalBounds.x + child.globalBounds.width > acc) {
      return child.globalBounds.x + child.globalBounds.width;
    }

    return acc;
  }, firstChildBounds.x + firstChildBounds.width);

  const maxYPlusHeight = this.children.reduce((acc, child) => {
    if (child.globalBounds.y + child.globalBounds.height > acc) {
      return child.globalBounds.y + child.globalBounds.height;
    }

    return acc;
  }, firstChildBounds.y + firstChildBounds.height);

  const globalBounds = {
    x: minX,
    y: minY,
    width: maxXPlusWidth - minX,
    height: maxYPlusHeight - minY
  };

  this.globalBounds = globalBounds;
};

/**
 * sets a child node in a given empty slot
 * @param slot
 * @param child
 * @returns nothing
 */
ChildrenMatrix.prototype.setChild = function({ i, j }, child) {
  this.matrix[i][j] = child;
};

/**
 * gets a child node from a given empty slot
 * @param slot
 * @returns node
 */
ChildrenMatrix.prototype.getChild = function({ i, j }) {
  return this.matrix[i][j];
};

/**
 * gets the nearest left child
 * @param slot
 * @returns node
 */
ChildrenMatrix.prototype.getLeftChild = function({ i, j }) {
  let iteratingJ = j;

  while (iteratingJ > 0) {
    const left = this.getChild({ i, j: iteratingJ - 1 });
    if (left) {
      return left;
    }
    iteratingJ--;
  }

  return null;
};

/**
 * gets the nearest top child(the child with max y + height withing the nearest row that have children)
 * @param slot
 * @returns node
 */
ChildrenMatrix.prototype.getTopChild = function({ i, j }) {
  let topChild = null;

  if (i > 0) {
    this.matrix[i - 1].forEach(node => {
      if (node) {
        if (!topChild) {
          topChild = node;
        } else {
          if (
            topChild.globalBounds.y + topChild.globalBounds.height <
            node.globalBounds.y + node.globalBounds.height
          ) {
            topChild = node;
          }
        }
      }
    });
  }

  return topChild;
};

/**
 * gets the slots that contain children nodes within the same row of the given empty slot
 * @param slot
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getSlotRowNeighbors = function({ i, j }) {
  return this.matrix[i].filter((item, index) => index !== j && item);
};

/**
 * gets the slots that contain children nodes within the same column of the given empty slot
 * @param slot
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getSlotColumnNeighbors = function({ i, j }) {
  return this.matrix.reduce((acc, row, index) => {
    return index !== i && row[j] ? acc.concat(row[j]) : acc;
  }, []);
};

/**
 * gets all children in a 1-D array
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.flatten = function() {
  const flattenedArray = [];

  this.matrix.forEach((row, rowIndex) => {
    row.forEach((node, columnIndex) => {
      if (node) {
        flattenedArray.push({ node, slot: { i: rowIndex, j: columnIndex } });
      }
    });
  });

  return flattenedArray;
};

/**
 * checks if all children are aligned in one column
 * @returns a boolean value
 */
ChildrenMatrix.prototype.doesChildrenExistInOneColumn = function() {
  return this.matrix.reduce((acc, row) => !!row[0] && acc, true);
};

/**
 * checks if all children are aligned in one row
 * @returns a boolean value
 */
ChildrenMatrix.prototype.doesChildrenExistInOneRow = function() {
  return this.matrix[0].reduce((acc, node) => !!node && acc, true);
};

/**
 * gets the number of nodes in a give row
 * @param rowIndex
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getRowActualChildrenCount = function(rowIndex) {
  return this.matrix[rowIndex].reduce(
    (acc, node) => (!!node ? acc + 1 : acc),
    0
  );
};

/**
 * gets the nodes within a column
 * @param columnIndex
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getColumnNodes = function(columnIndex) {
  return this.matrix.reduce((acc, row) => {
    return row[columnIndex] ? acc.concat(row[columnIndex]) : acc;
  }, []);
};

/**
 * checks if 2 nodes exists in the same column(another meaning one of them exists withing the same vertical range of the other)
 */
ChildrenMatrix.prototype.doNodesExistWithinSameColumn = function(
  firstNode,
  secondNode
) {
  return (
    (firstNode.globalBounds.x >= secondNode.globalBounds.x &&
      firstNode.globalBounds.x <=
        secondNode.globalBounds.x + secondNode.globalBounds.width) ||
    (secondNode.globalBounds.x >= firstNode.globalBounds.x &&
      secondNode.globalBounds.x <=
        firstNode.globalBounds.x + firstNode.globalBounds.width)
  );
};

/**
 * checks if 2 nodes exists in the same row(another meaning one of them exists withing the same horizontal range of the other)
 */
ChildrenMatrix.prototype.doNodesExistWithinSameRow = function(
  firstNode,
  secondNode
) {
  return (
    (firstNode.globalBounds.y >= secondNode.globalBounds.y &&
      firstNode.globalBounds.y <=
        secondNode.globalBounds.y + secondNode.globalBounds.height) ||
    (secondNode.globalBounds.y >= firstNode.globalBounds.y &&
      secondNode.globalBounds.y <=
        firstNode.globalBounds.y + firstNode.globalBounds.height)
  );
};

/**
 * sorts the children array such that nodes at the very top left comes first
 * @returns nothing
 */
ChildrenMatrix.prototype.sortChildren = function() {
  this.children.sort((a, b) => {
    return this.doNodesExistWithinSameRow(a, b)
      ? a.globalBounds.x - b.globalBounds.x
      : a.globalBounds.y - b.globalBounds.y;
  });
};

/**
 * calculates the likelihood that a new child node should be layed in a given slot relative to a set of possible slots
 * @param slot
 * @param newChild
 * @returns the likelihood value
 */
ChildrenMatrix.prototype.calculateSlotChildMetric = function(slot, newChild) {
  let metric = 0;

  const rowNeighbors = this.getSlotRowNeighbors(slot);

  const columnNeighbors = this.getSlotColumnNeighbors(slot);

  rowNeighbors.forEach(rowNeighbor => {
    if (this.doNodesExistWithinSameRow(newChild, rowNeighbor)) {
      metric += 1;
    } else {
      metric -= 1;
    }
  });

  columnNeighbors.forEach(columnNeighbor => {
    if (this.doNodesExistWithinSameColumn(newChild, columnNeighbor)) {
      metric += 1;
    } else {
      metric -= 1;
    }
  });

  return metric;
};

/**
 * gets the empty slots that a new child node can be layed in
 * based on the number and positions of the children that are currently being in the matrix
 * @returns an array of ampty slots
 */
ChildrenMatrix.prototype.getPossibleSlots = function() {
  let containsAtLeastOneChild = false;
  const possibleSlots = [];

  this.matrix.forEach((row, rowIndex) => {
    row.forEach((slot, columnIndex) => {
      if (
        !slot &&
        (rowIndex === 0 || this.getRowActualChildrenCount(rowIndex - 1)) &&
        (columnIndex === 0 || this.getColumnNodes(columnIndex - 1).length)
      ) {
        possibleSlots.push({ i: rowIndex, j: columnIndex });
      }
    });
  });

  return possibleSlots;
};

/**
 * gets the most suitable empty slot in which a new child should be layed in
 * @param newChild
 * @returns an empty slot
 */
ChildrenMatrix.prototype.getMostSuitableSlot = function(newChild) {
  const possibleSlots = this.getPossibleSlots();

  const slotsMetrics = [];

  // evaluate slots
  possibleSlots.forEach(slot => {
    const metric = this.calculateSlotChildMetric(slot, newChild);

    slotsMetrics.push({ slot, metric });
  });

  const leastMetricSlot = slotsMetrics.reduce((acc, v) => {
    if (v.metric > acc.metric) {
      return v;
    }

    return acc;
  }, slotsMetrics[0]);

  return leastMetricSlot.slot;
};

/**
 * determines the nodes that should be duplicated in multiple slots when the row of node structure is not enough
 * @returns an array of nodes
 */
ChildrenMatrix.prototype.getNodesToBeDuplicated = function() {
  const toBeDuplicatedNodes = [];

  this.matrix.forEach((row, i) => {
    row.forEach((node, j) => {
      if (
        node && // not empty slot
        this.matrix[i + 1] && // not last row in the matrix
        this.getRowActualChildrenCount(i + 1) && // next row has nodes
        !this.getChild({ i: i + 1, j }) && // the bottom neighbor is an empty slot
        // check if any node in the next row lies within the height of this node
        this.getSlotRowNeighbors({ i: i + 1, j }).find(
          item =>
            item.globalBounds.y >= node.globalBounds.y &&
            item.globalBounds.y <=
              node.globalBounds.y + node.globalBounds.height
        )
      ) {
        toBeDuplicatedNodes.push({ node, slot: { i, j } });
      }
    });
  });

  return toBeDuplicatedNodes;
};

/**
 * gets the first slot of a duplicated node if exist
 * @returns a slot object or null
 */
ChildrenMatrix.prototype.checkDuplicatedNodesExist = function() {
  // iterate over columns
  for (let j = 0; j < this.n; j++) {
    const columnNodes = this.getColumnNodes(j);

    // get top duplicated node row index
    const nodeRowIndex = columnNodes.findIndex(
      (node, index) =>
        index < columnNodes.length - 1 && // it is not the last node in the array
        node.guid === columnNodes[index + 1].guid // it occupies the next node
    );

    if (nodeRowIndex !== -1) {
      return { i: nodeRowIndex, j };
    }
  }

  return null;
};

/**
 * given a slot of a duplicated node, it gets how many rows to be merged(or how many duplicated node exist)
 * @param {*} slot a slot that contains a duplicated node
 * @returns an integer representing how many duplicated nodes
 */
ChildrenMatrix.prototype.getToBeMergedRowsCount = function(targetSlot) {
  const columnNodes = this.getColumnNodes(targetSlot.j);

  return columnNodes
    .slice(targetSlot.i)
    .reduce((acc, node, index, slicedArray) => {
      if (
        index < slicedArray.length - 1 && // node not exist in the last column
        node.guid === slicedArray[index + 1].guid // the next node in the column is duplicated
      ) {
        return acc + 1;
      }

      return acc;
    }, 1);
};

/**
 * rearrange the matrix to remove duplicated nodes and create nested ChildrenMatrix to fit complex structure
 * this function updates all instance variables: children, n, matrix
 * @param {*} slot a slot that contains a duplicated node
 * @returns nothing
 */
ChildrenMatrix.prototype.rearrangeMatrix = function(targetSlot) {
  const toBeMergedRowsCount = this.getToBeMergedRowsCount(targetSlot);
  const toBeMergedRowsIndices = [targetSlot.i];

  for (let iterator = 1; iterator < toBeMergedRowsCount; iterator++) {
    toBeMergedRowsIndices.push(iterator + toBeMergedRowsIndices[0]);
  }

  let childrenCount = 1; // 1 for the duplicated nodes that will be eventually one node

  // iterate over rows not affected with the merge
  this.matrix.forEach((row, rowIndex) => {
    if (!toBeMergedRowsIndices.includes(rowIndex)) {
      childrenCount += this.getRowActualChildrenCount(rowIndex);
    }
  });

  // check if the duplicated node has items to be merged on its left & right
  let therIsLeftNodes = false;
  let thereIsRightNodes = false;

  this.matrix.forEach((row, i) => {
    row.forEach((node, j) => {
      if (node && toBeMergedRowsIndices.includes(i)) {
        if (j > targetSlot.j) {
          thereIsRightNodes = true;
        } else if (j < targetSlot.j) {
          therIsLeftNodes = true;
        }
      }
    });
  });

  if (therIsLeftNodes) {
    childrenCount += 1;
  }

  if (thereIsRightNodes) {
    childrenCount += 1;
  }

  const children = new Array(childrenCount);
  children.fill({ globalBounds: {} });

  const newChildrenMatrix = new ChildrenMatrix(children);

  // set not affected nodes
  this.matrix.forEach((row, i) => {
    if (!toBeMergedRowsIndices.includes(i)) {
      row.forEach((node, j) => {
        if (node) {
          if (i > targetSlot.i + toBeMergedRowsCount - 1) {
            newChildrenMatrix.setChild(
              { i: i - toBeMergedRowsCount + 1, j },
              node
            );
          } else {
            newChildrenMatrix.setChild({ i, j }, node);
          }
        }
      });
    }
  });

  // set duplicated node
  newChildrenMatrix.setChild(
    { i: targetSlot.i, j: therIsLeftNodes ? 1 : 0 },
    this.getChild(targetSlot)
  );

  // set nodes on left and right of the duplicated node
  if (therIsLeftNodes) {
    const leftItems = [];

    this.matrix.forEach((row, i) => {
      if (toBeMergedRowsIndices.includes(i)) {
        row.forEach((node, j) => {
          if (node && j < targetSlot.j) {
            leftItems.push({ node, slot: { i, j } });
          }
        });
      }
    });

    const targetSlotLeftCMatrixChildren = leftItems.map(item => item.node);
    const targetSlotLeftCMatrix = new ChildrenMatrix(
      targetSlotLeftCMatrixChildren
    );

    leftItems.forEach(({ node, slot }) => {
      targetSlotLeftCMatrix.setChild(
        { i: slot.i - targetSlot.i, j: slot.j },
        node
      );
    });

    newChildrenMatrix.setChild(
      { i: targetSlot.i, j: 0 },
      targetSlotLeftCMatrix
    );
  }

  // set its right in the slot {i: targetSlot.i, j: 2}
  if (thereIsRightNodes) {
    const rightItems = [];

    this.matrix.forEach((row, i) => {
      if (toBeMergedRowsIndices.includes(i)) {
        row.forEach((node, j) => {
          if (node && j > targetSlot.j) {
            rightItems.push({ node, slot: { i, j } });
          }
        });
      }
    });

    const targetSlotRightCMatrixChildren = rightItems.map(item => item.node);
    const targetSlotRightCMatrix = new ChildrenMatrix(
      targetSlotRightCMatrixChildren
    );

    rightItems.forEach(({ node, slot }) => {
      targetSlotRightCMatrix.setChild(
        { i: slot.i - targetSlot.i, j: slot.j - targetSlot.j - 1 },
        node
      );
    });

    newChildrenMatrix.setChild(
      { i: targetSlot.i, j: therIsLeftNodes ? 2 : 1 },
      targetSlotRightCMatrix
    );
  }

  this.n = newChildrenMatrix.n;
  this.children = newChildrenMatrix.children;
  this.matrix = newChildrenMatrix.matrix;
};

/**
 * lays the children nodes in the matrix
 * @returns the matrix after laying the children in
 */
ChildrenMatrix.prototype.layChildrenInsideMatrix = function() {
  this.sortChildren();

  this.children.forEach(child => {
    const suitableSlot = this.getMostSuitableSlot(child);

    this.setChild(suitableSlot, child);
  });

  let toBeDuplicatedNodes = this.getNodesToBeDuplicated();

  while (toBeDuplicatedNodes.length) {
    toBeDuplicatedNodes.forEach(({ node, slot }) => {
      this.setChild({ i: slot.i + 1, j: slot.j }, node);
    });

    toBeDuplicatedNodes = this.getNodesToBeDuplicated();
  }

  let tSlot = this.checkDuplicatedNodesExist();
  while (tSlot) {
    this.rearrangeMatrix(tSlot);

    tSlot = this.checkDuplicatedNodesExist();
  }

  return this.matrix;
};

module.exports = {
  ChildrenMatrix
};


/***/ }),

/***/ "./src/helpers/childNearestParent/index.js":
/*!*************************************************!*\
  !*** ./src/helpers/childNearestParent/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
During specifying children nearest parents, looping is done reversely
to let children attached to nearest parents based on coordinates and also based on document structure
For example having a Text within Rectangle withing a Group
while Group and Rectangle having the same coordinates
Text's parent should be Rectangle and Rectangle's parent should be Group
*/

let childrenNearestParents = [];

function setChildNearestParent(child, parent) {
  childrenNearestParents.push({ child, parent });
}

function getParentChildren(parent) {
  return childrenNearestParents
    .filter(item => item.parent && item.parent.guid === parent.guid)
    .map(item => item.child);
}

function getChildParent(child) {
  const targetItem = childrenNearestParents.find(
    item => item.child.guid === child.guid
  );

  return targetItem && targetItem.parent;
}

function filterChildrenWithNoParents(children) {
  return children.filter(child => !getChildParent(child));
}

function clearChildNearestParent() {
  childrenNearestParents = [];
}

function flattenNodeChildren(node, children) {
  node.children.forEach(nodeChild => {
    children.push(nodeChild);

    if (nodeChild.children.length) {
      flattenNodeChildren(nodeChild, children);
    }
  });
}

function specifyChildrenNearestParents(children) {
  // loop over children in a reverse order
  for (let i = children.length - 1; i >= 0; i--) {
    const cChild = children[i];
    const nearestParent = specifyChildNearestParent(cChild, children);
    setChildNearestParent(cChild, nearestParent);
  }
}

function specifyChildNearestParent(child, nodes) {
  let nearestParent;

  // loop over nodes in a reverse order
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];

    if (canBeParentForChild(child, node)) {
      if (nearestParent) {
        nearestParent = whichIsNearestParent(nearestParent, node);
      } else {
        nearestParent = node;
      }
    }
  }

  return nearestParent;
}

function canBeParentForChild(child, node) {
  if (
    // they are not the same node
    child.guid !== node.guid &&
    // if @param node is a child of @param child then @param node cannot be a parent for @param child
    !childrenNearestParents.find(
      item =>
        item.child.guid === node.guid &&
        item.parent &&
        item.parent.guid === child.guid
    ) &&
    // the child exists within the bounds of the node
    node.globalBounds.x <= child.globalBounds.x &&
    node.globalBounds.y <= child.globalBounds.y &&
    node.globalBounds.x + node.globalBounds.width >=
      child.globalBounds.x + child.globalBounds.width &&
    node.globalBounds.y + node.globalBounds.height >=
      child.globalBounds.y + child.globalBounds.height
  ) {
    return true;
  }

  return false;
}

function whichIsNearestParent(parent1, parent2) {
  // updating this order of comparison may break reverse looping
  if (parent1.globalBounds.y < parent2.globalBounds.y) {
    return parent2;
  } else if (parent1.globalBounds.y === parent2.globalBounds.y) {
    if (parent1.globalBounds.x < parent2.globalBounds.x) {
      return parent2;
    } else {
      return parent1;
    }
  } else {
    return parent1;
  }
}

/**
 * gets the artboard that contains the given node
 * @param {*} node an instance of SceneNode
 * @returns an instance of Artboard or null
 */
function getNodeArtboard(node) {
  if (node.constructor.name === "Artboard") {
    return node;
  }

  let parent = node.parent;

  while (parent && parent.constructor.name !== "Artboard") {
    parent = parent.parent;
  }

  return parent;
}

module.exports = {
  getParentChildren,
  filterChildrenWithNoParents,
  clearChildNearestParent,
  flattenNodeChildren,
  specifyChildrenNearestParents,
  getNodeArtboard
};


/***/ }),

/***/ "./src/helpers/output/createComponentSkeleton.js":
/*!*******************************************************!*\
  !*** ./src/helpers/output/createComponentSkeleton.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

  return component;
}

module.exports = {
  createComponentSkeleton
};


/***/ }),

/***/ "./src/helpers/output/save.js":
/*!************************************!*\
  !*** ./src/helpers/output/save.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(/*! uxp */ "uxp").storage.localFileSystem;
const { error, alert } = __webpack_require__(/*! ../../plugin-toolkit/dialogs.js */ "./src/plugin-toolkit/dialogs.js");
const { createComponentSkeleton } = __webpack_require__(/*! ./createComponentSkeleton */ "./src/helpers/output/createComponentSkeleton.js");

/**
 * save ui components into files
 * @param {*} components an array of objects {name, code}
 */
async function save(components) {
  try {
    const folder = await fs.getFolder();
    components.forEach(async ({ name, code }, index) => {
      const file = await folder.createFile(`component${index}.js`);
      await file.write(createComponentSkeleton(code));
    });

    alert("Files Saved");
  } catch (e) {
    error("Unexpected error occurred");
  }
}

module.exports = {
  save
};


/***/ }),

/***/ "./src/helpers/representColor.js":
/*!***************************************!*\
  !*** ./src/helpers/representColor.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * represents color object in a way acceptable by RN
 * @param {*} color an instance of Color
 * returns string representation of color
 */
function representColor(color) {
  const { r, g, b, a } = color.toRgba();

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

module.exports = {
  representColor
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  generateCodeForEntireDocument
} = __webpack_require__(/*! ./commands/generateCodeForEntireDocument */ "./src/commands/generateCodeForEntireDocument.js");
const {
  generateCodeForSelectedComponent
} = __webpack_require__(/*! ./commands/generateCodeForSelectedComponent */ "./src/commands/generateCodeForSelectedComponent.js");

module.exports = {
  commands: {
    generateCodeForEntireDocument,
    generateCodeForSelectedComponent
  }
};


/***/ }),

/***/ "./src/plugin-toolkit/dialogs.js":
/*!***************************************!*\
  !*** ./src/plugin-toolkit/dialogs.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2018 Adobe Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {getManifest, getNearestIcon} = __webpack_require__(/*! ./manifest.js */ "./src/plugin-toolkit/manifest.js");

let manifest;

/**
 * Converts a string (or an array of strings or other objects) to a nicer HTML
 * representation. Essentially this is a _very_ basic markdown parser.
 *
 * The following tokens are understood, when encountered at the beginning of
 * a string:
 *
 * Token        | Result
 * -------------|-----------------------
 * `##`         | `<h2>`
 * `###`        | `<h3>`
 * `* `         | Bulleted list
 * `----`       | `<hr class="small">`
 * `---`        | `<hr />`
 * `[...](href)`| `<p><a href="href">...</a></p>`
 *
 * @param {string | string[] | * | Array<*>} str
 * @returns {string} the HTML representation
 */
function strToHtml(str) {
    // allow some common overloads, including arrays and non-strings
    if (Array.isArray(str)) {
        return str.map(str => strToHtml(str)).join('');
    }
    if (typeof str !== 'string') {
        return strToHtml(`${str}`);
    }

    let html = str;

    // handle some markdown stuff
    if (html.substr(0, 2) === '##') {
        html = `<h3>${html.substr(2).trim().toUpperCase()}</h3>`;
    } else if (html.substr(0, 1) === '#') {
        html = `<h2>${html.substr(1).trim()}</h2>`;
    } else if (html.substr(0, 2) === '* ') {
        html = `<p class="list"><span class="bullet margin">•</span><span class="margin">${html.substr(2).trim()}</span></p>`;
    } else if (html.substr(0, 4) === '----') {
        html = `<hr class="small"/>${html.substr(5).trim()}`;
    } else if (html.substr(0, 3) === '---') {
        html = `<hr/>${html.substr(4).trim()}`;
    } else {
        html = `<p>${html.trim()}</p>`;
    }

    // handle links -- the catch here is that the link will transform the entire paragraph!
    const regex = /\[([^\]]*)\]\(([^\)]*)\)/;
    const matches = str.match(regex);
    if (matches) {
        const title = matches[1];
        const url = matches[2];
        html = `<p><a href="${url}">${html.replace(regex, title).replace(/\<\|?p\>/g, '')}</a></p>`;
    }

    return html;
}

/*
 * Generates a "notice" dialog with the title, default icon, and a series of messages.
 *
 * @param {*} param
 * @property {string} param.title The dialog title
 * @property {string} [param.icon] The dialog icon to use. If not provided, no icon will be rendered
 * @property {string[]} param.msgs The messages to render. If a message starts with `http`, it will be rendered as a link.
 * @property {string} [param.prompt] If specified, will render as a prompt with a single input field and the prompt as a placeholder
 * @property {boolean} [param.multiline=false] If `true`, the prompt will render as a multi-line text field.
 * @property {boolean} [param.isError=false] If specified, will render the header in a red color
 * @property {Function} [param.render] If set, the results of this function (a DOM tree) will be appended into the content area of the dialog.
 * @property {Function<String>} [param.template] If set, the results of this function (a string) will be appended into the content area of the dialog.
 * @property {Object[]} [buttons] Indicates the buttons to render. If none are specified, a `Close` button is rendered.
 * @returns {Promise} Resolves to an object of the form {which, value}. `value` only makes sense if `prompt` is set. `which` indicates which button was pressed.
 */
async function createDialog({
    title,
    icon = 'plugin-icon',
    msgs,
    prompt,
    multiline = false,
    render,
    template,
    isError=false,
    buttons=[
        {label: 'Close', variant: 'cta', type:'submit'}
    ]} = {},
    width=360,
    height='auto',
    iconSize=18
) {

    let messages = Array.isArray(msgs) ? msgs : [ msgs ];

    try {
        if (!manifest) {
            manifest = await getManifest();
        }
    } catch (err) {
        // do nothing
    }

    let usingPluginIcon = false;
    if (icon === 'plugin-icon') {
        if (manifest.icons) {
            usingPluginIcon = true;
            iconSize = 24;
            icon = getNearestIcon(manifest, iconSize);
        }
    }

    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
<style>
    form {
        width: ${width}px;
    }
    .h1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .h1 img {
        width: ${iconSize}px;
        height: ${iconSize}px;
        flex: 0 0 ${iconSize}px;
        padding: 0;
        margin: 0;
    }
    img.plugin-icon {
        border-radius: 4px;
        overflow: hidden;
    }
    .list {
        display: flex;
        flex-direction: row;
    }
    .list .margin {
        margin-bottom: 0;
        margin-left: 0;
    }
    .list span {
        flex: 0 0 auto;
        border: 1px solid transparent;
    }
    .list .bullet {
        text-align: center;
    }
    .list + .list {
        margin-top: 0;
    }
    textarea {
        height: 200px;
    }
    .container {
        zoverflow-x: hidden;
        overflow-y: auto;
        height: ${height === 'auto' ? height : `${height}px`};
    }
</style>
<form method="dialog">
    <h1 class="h1">
        <span ${isError ? `class="color-red"` : ""}>${title}</span>
        ${icon ? `<img ${usingPluginIcon ? `class="plugin-icon" title="${manifest.name}"` : ''} src="${icon}" />` : ''}
    </h1>
    <hr />
    <div class="container">
        ${
            !render && (
                template ? template() : (
                    messages.map(msg => strToHtml(msg)).join('') +
                    (prompt ? `<label>${
                        multiline ?
                        `<textarea id="prompt" placeholder="${prompt}"></textarea>` :
                        `<input type="text" id="prompt" placeholder="${prompt}" />`
                    }</label>` : '')
                )
            )
        }
    </div>
    <footer>
        ${buttons.map(({label, type, variant} = {}, idx) => `<button id="btn${idx}" type="${type}" uxp-variant="${variant}">${label}</button>`).join('')}
    </footer>
</form>
    `;

    // if render fn is passed, we'll call it and attach the DOM tree
    if (render) {
        dialog.querySelector(".container").appendChild(render());
    }

    // The "ok" and "cancel" button indices. OK buttons are "submit" or "cta" buttons. Cancel buttons are "reset" buttons.
    let okButtonIdx = -1;
    let cancelButtonIdx = -1;
    let clickedButtonIdx = -1;

    // Ensure that the form can submit when the user presses ENTER (we trigger the OK button here)
    const form = dialog.querySelector('form');
    form.onsubmit = () => dialog.close('ok');

    // Attach button event handlers and set ok and cancel indices
    buttons.forEach(({type, variant} = {}, idx) => {
        const button = dialog.querySelector(`#btn${idx}`);
        if (type === 'submit' || variant === 'cta') {
            okButtonIdx = idx;
        }
        if (type === 'reset') {
            cancelButtonIdx = idx;
        }
        button.onclick = e => {
            e.preventDefault();
            clickedButtonIdx = idx;
            dialog.close( idx === cancelButtonIdx ? 'reasonCanceled' : 'ok');
        }
    });

    try {
        document.appendChild(dialog);
        const response = await dialog.showModal();
        if (response === 'reasonCanceled') {
            // user hit ESC
            return {which: cancelButtonIdx, value: ''};
        } else {
            if (clickedButtonIdx === -1) {
                // user pressed ENTER, so no button was clicked!
                clickedButtonIdx = okButtonIdx; // may still be -1, but we tried
            }
            return {which: clickedButtonIdx, value: prompt ? dialog.querySelector('#prompt').value : ''};
        }
    } catch(err) {
        // system refused the dialog
        return {which: cancelButtonIdx, value: ''};
    } finally {
        dialog.remove();
    }
}

/**
 * Generates an alert message
 *
 * @param {string} title
 * @param {string[]} msgs
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function alert(title, ...msgs) {
    return createDialog({title, msgs});
}

/**
 * Generates a warning message
 *
 * @param {string} title
 * @param {string[]} msgs
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function error(title, ...msgs) {
    return createDialog({title, isError: true, msgs});
}

/**
 * Displays a confirmation dialog.
 *
 * @param {string} title
 * @param {string} msg
 * @param {string[]} [buttons = ['Cancel', 'OK']] the buttons to display (in macOS order); TWO MAX.
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function confirm(title, msg, buttons = [ 'Cancel', 'OK' ]) {
    return createDialog({title, msgs: [msg], buttons: [
        {label: buttons[0], type:'reset', variant: 'primary'},
        {label: buttons[1], type:'submit', variant: 'cta'}
    ]});
}

/**
 * Displays a warning dialog.
 *
 * @param {string} title
 * @param {string} msg
 * @param {string[]} [buttons = ['Cancel', 'OK']] the buttons to display (in macOS order); TWO MAX.
 * @returns {Promise<{which: number}>} `which` indicates which button was clicked.
 */
async function warning(title, msg, buttons = [ 'Cancel', 'OK' ]) {
    return createDialog({title, msgs: [msg], buttons: [
        {label: buttons[0], type:'submit', variant: 'primary'},
        {label: buttons[1], type:'button', variant: 'warning'}
    ]});
}

/**
 * Displays a prompt dialog.
 *
 * @param {string} title
 * @param {string} msg
 * @param {string} prompt
 * @param {string[]} [buttons = ['Cancel', 'OK']] the buttons to display (in macOS order); TWO MAX.
 * @param {boolean} [multiline = false] If `true`, a multiline textarea will be used instead of a single line editor.
 * @returns {Promise<{which: number, value: string}>} `which` indicates which button was clicked, and `value` indicates the entered value in the text field.
 */
async function prompt(title, msg, prompt, buttons = [ 'Cancel', 'OK' ], multiline = false) {
    return createDialog({title, msgs: [msg], prompt, multiline, buttons: [
        {label: buttons[0], type:'reset', variant: 'primary'},
        {label: buttons[1], type:'submit', variant: 'cta'}
    ]});
}

module.exports = {
    createDialog,
    alert,
    error,
    confirm,
    warning,
    prompt
};


/***/ }),

/***/ "./src/plugin-toolkit/manifest.js":
/*!****************************************!*\
  !*** ./src/plugin-toolkit/manifest.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2018 Adobe Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let manifest;

/**
 * Reads the plugin's manifest and returns the parsed contents.
 *
 * Throws if the manifest is invalid or doesn't exist.
 *
 * Note: Reads manifest only once. Future calls will not reload
 * the manifest file.
 */
async function getManifest() {
    if (!manifest) {
        const fs = __webpack_require__(/*! uxp */ "uxp").storage.localFileSystem;
        const dataFolder = await fs.getPluginFolder();
        const manifestFile = await dataFolder.getEntry("manifest.json");
        if (manifestFile) {
            const json = await manifestFile.read();
            manifest = JSON.parse(json);
        }
    }
    return manifest;
}

/**
 * Return the icon path that can fit the requested size without upscaling.
 *
 * @param {*} manifest
 * @param {number} size
 * @returns {string} path to the icon
 */
function getNearestIcon(manifest, size) {
    if (!manifest) {
        return;
    }

    if (manifest.icons) {
        // icons is an array of objects of the form
        // { width, height, path }

        // icons are assumed to be square, so we'll sort descending on the width
        const sortedIcons = manifest.icons.sort((a, b) => {
            const iconAWidth = a.width;
            const iconBWidth = b.width;
            return iconAWidth < iconBWidth ? 1 : iconAWidth > iconBWidth ? -1 : 0;
        });

        // next, search until we find an icon _too_ small for the desired size
        const icon = sortedIcons.reduce((last, cur) => {
            if (!last) {
                last = cur;
            } else {
                if (cur.width >= size) {
                    last = cur;
                }
            }
            return last;
        });

        return icon.path;
    }
}

module.exports = {
    getManifest,
    getNearestIcon
}

/***/ }),

/***/ "./src/preprocessors/pixelUnitPreprocessor.js":
/*!****************************************************!*\
  !*** ./src/preprocessors/pixelUnitPreprocessor.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * preprocesses pixel units to be compatibe with css prepreocessors like react-native-extended-stylesheet
 * @param {*} unit a number representing pixels
 * @returns another form of unit such as '10rem', '10h', etc
 */
function pixelUnitPreprocessor(unit) {
  // for now no options. In the future may be something like this `${unit}rem`
  return unit;
}

module.exports = {
  pixelUnitPreprocessor
};


/***/ }),

/***/ "./src/preprocessors/toFixed.js":
/*!**************************************!*\
  !*** ./src/preprocessors/toFixed.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function toFixed(n) {
  return +n.toFixed(2);
}

module.exports = {
  toFixed
};


/***/ }),

/***/ "scenegraph":
/*!*****************************!*\
  !*** external "scenegraph" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("scenegraph");

/***/ }),

/***/ "uxp":
/*!**********************!*\
  !*** external "uxp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uxp");

/***/ })

/******/ });