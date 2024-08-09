"use strict";
(() => {
var exports = {};
exports.id = 901;
exports.ids = [901];
exports.modules = {

/***/ 8664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res) => {
  if (req.query.slug) {
    res.clearPreviewData();
    res.writeHead(307, {
      Location: `/blog/${req.query.slug}`
    });
    res.end();
  } else {
    res.clearPreviewData();
    res.writeHead(307, {
      Location: `/blog`
    });
    res.end();
  }
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8664));
module.exports = __webpack_exports__;

})();