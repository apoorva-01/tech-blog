"use strict";
exports.id = 220;
exports.ids = [220];
exports.modules = {

/***/ 7167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5152);
/* harmony import */ var _ext_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8969);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // default tags
  ol: 'ol',
  ul: 'ul',
  li: 'li',
  p: 'p',
  blockquote: 'blockquote',
  a: _ext_link__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z,
  Code: (0,next_dynamic__WEBPACK_IMPORTED_MODULE_0__.default)(() => __webpack_require__.e(/* import() */ 652).then(__webpack_require__.bind(__webpack_require__, 1652)), {
    loadableGenerated: {
      webpack: () => [/*require.resolve*/(1652)],
      modules: ["../components/dynamic.tsx -> " + './code']
    }
  }),
  Counter: (0,next_dynamic__WEBPACK_IMPORTED_MODULE_0__.default)(() => __webpack_require__.e(/* import() */ 417).then(__webpack_require__.bind(__webpack_require__, 8417)), {
    loadableGenerated: {
      webpack: () => [/*require.resolve*/(8417)],
      modules: ["../components/dynamic.tsx -> " + './counter']
    }
  }),
  Equation: (0,next_dynamic__WEBPACK_IMPORTED_MODULE_0__.default)(() => __webpack_require__.e(/* import() */ 58).then(__webpack_require__.bind(__webpack_require__, 8058)), {
    loadableGenerated: {
      webpack: () => [/*require.resolve*/(8058)],
      modules: ["../components/dynamic.tsx -> " + './equation']
    }
  })
});

/***/ }),

/***/ 3872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ getNotionUsers)
/* harmony export */ });
/* harmony import */ var _rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4098);

async function getNotionUsers(ids) {
  const {
    results = []
  } = await (0,_rpc__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)('getRecordValues', {
    requests: ids.map(id => ({
      id,
      table: 'notion_user'
    }))
  });
  const users = {};

  for (const result of results) {
    const {
      value
    } = result || {
      value: {}
    };
    const {
      given_name,
      family_name
    } = value;
    let full_name = given_name || '';

    if (family_name) {
      full_name = `${full_name} ${family_name}`;
    }

    users[value.id] = {
      full_name
    };
  }

  return {
    users
  };
}

/***/ }),

/***/ 9067:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ textBlock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7167);



function applyTags(tags = [], children, noPTag = false, key) {
  let child = children;

  for (const tag of tags) {
    const props = {
      key
    };
    let tagName = tag[0];
    if (noPTag && tagName === 'p') tagName = (react__WEBPACK_IMPORTED_MODULE_0___default().Fragment);
    if (tagName === 'c') tagName = 'code';

    if (tagName === '_') {
      tagName = 'span';
      props.className = 'underline';
    }

    if (tagName === 'a') {
      props.href = tag[1];
    }

    if (tagName === 'e') {
      tagName = _components_dynamic__WEBPACK_IMPORTED_MODULE_1__/* .default.Equation */ .Z.Equation;
      props.displayMode = false;
      child = tag[1];
    }

    child = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_dynamic__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z[tagName] || tagName, props, child);
  }

  return child;
}

function textBlock(text = [], noPTag = false, mainKey) {
  const children = [];
  let key = 0;

  for (const textItem of text) {
    key++;

    if (textItem.length === 1) {
      children.push(textItem);
      continue;
    }

    children.push(applyTags(textItem[1], textItem[0], noPTag, key));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(noPTag ? (react__WEBPACK_IMPORTED_MODULE_0___default().Fragment) : _components_dynamic__WEBPACK_IMPORTED_MODULE_1__/* .default.p */ .Z.p, {
    key: mainKey
  }, ...children, noPTag);
}

/***/ })

};
;