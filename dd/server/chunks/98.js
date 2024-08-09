exports.id = 98;
exports.ids = [98];
exports.modules = {

/***/ 4098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ rpc),
/* harmony export */   "by": () => (/* binding */ getError),
/* harmony export */   "VO": () => (/* binding */ values)
/* harmony export */ });
/* unused harmony exports getJSONHeaders, getBodyOrNull */
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2110);
/* harmony import */ var _server_constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_server_constants__WEBPACK_IMPORTED_MODULE_1__);


async function rpc(fnName, body) {
  if (!_server_constants__WEBPACK_IMPORTED_MODULE_1__.NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not set in env');
  }

  const res = await node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(`${_server_constants__WEBPACK_IMPORTED_MODULE_1__.API_ENDPOINT}/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: `token_v2=${_server_constants__WEBPACK_IMPORTED_MODULE_1__.NOTION_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(await getError(res));
  }
}
async function getError(res) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(res)}\n ${await getBodyOrNull(res)}`;
}
function getJSONHeaders(res) {
  return JSON.stringify(res.headers.raw());
}
function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}
function values(obj) {
  const vals = [];
  Object.keys(obj).forEach(key => {
    vals.push(obj[key]);
  });
  return vals;
}

/***/ }),

/***/ 2110:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// use commonjs so it can be required without transpiling
const path = __webpack_require__(5622);

const normalizeId = id => {
  if (!id) return id;
  if (id.length === 36) return id;

  if (id.length !== 32) {
    throw new Error(`Invalid blog-index-id: ${id} should be 32 characters long. Info here https://github.com/ijjk/notion-blog#getting-blog-index-and-token`);
  }

  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`;
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const BLOG_INDEX_ID = normalizeId(process.env.BLOG_INDEX_ID);
const API_ENDPOINT = 'https://www.notion.so/api/v3';
const BLOG_INDEX_CACHE = path.resolve('.blog_index_data');
module.exports = {
  NOTION_TOKEN,
  BLOG_INDEX_ID,
  API_ENDPOINT,
  BLOG_INDEX_CACHE,
  normalizeId
};

/***/ })

};
;