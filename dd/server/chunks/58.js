"use strict";
exports.id = 58;
exports.ids = [58];
exports.modules = {

/***/ 8058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(974);
/* harmony import */ var katex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(katex__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function render(expression, displayMode) {
  let result;

  try {
    result = (0,katex__WEBPACK_IMPORTED_MODULE_0__.renderToString)(expression, {
      displayMode: displayMode
    });
  } catch (e) {
    if (e instanceof katex__WEBPACK_IMPORTED_MODULE_0__.ParseError) {
      result = e.message;
    }

    if (false) {}
  }

  return result;
}

const Equation = ({
  children,
  displayMode = true
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
    dangerouslySetInnerHTML: {
      __html: render(children, displayMode)
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Equation);

/***/ })

};
;