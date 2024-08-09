"use strict";
(() => {
var exports = {};
exports.id = 749;
exports.ids = [749];
exports.modules = {

/***/ 9620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_notion_getPageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4186);
/* harmony import */ var _lib_notion_getBlogIndex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1280);
/* harmony import */ var _lib_blog_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9227);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  if (typeof req.query.token !== 'string') {
    return res.status(401).json({
      message: 'invalid token'
    });
  }

  if (req.query.token !== process.env.NOTION_TOKEN) {
    return res.status(404).json({
      message: 'not authorized'
    });
  }

  if (typeof req.query.slug !== 'string') {
    return res.status(401).json({
      message: 'invalid slug'
    });
  }

  const postsTable = await (0,_lib_notion_getBlogIndex__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)();
  const post = postsTable[req.query.slug];

  if (!post) {
    console.log(`Failed to find post for slug: ${req.query.slug}`);
    return res.status(404).json({
      message: `no post found for ${req.query.slug}`
    });
  }

  const postData = await (0,_lib_notion_getPageData__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z)(post.id);

  if (!postData) {
    return res.status(401).json({
      message: 'Invalid slug'
    });
  }

  res.setPreviewData({});
  res.writeHead(307, {
    Location: (0,_lib_blog_helpers__WEBPACK_IMPORTED_MODULE_2__/* .getBlogLink */ .Np)(post.Slug)
  });
  res.end();
});

/***/ }),

/***/ 9954:
/***/ ((module) => {

module.exports = require("async-sema");

/***/ }),

/***/ 5747:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 7797:
/***/ ((module) => {

module.exports = require("github-slugger");

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ 5622:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 1669:
/***/ ((module) => {

module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [98,280], () => (__webpack_exec__(9620)));
module.exports = __webpack_exports__;

})();