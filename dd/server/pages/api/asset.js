"use strict";
(() => {
var exports = {};
exports.id = 589;
exports.ids = [589];
exports.modules = {

/***/ 5024:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ notionApi)
});

// EXTERNAL MODULE: external "node-fetch"
var external_node_fetch_ = __webpack_require__(6786);
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_);
// EXTERNAL MODULE: ./src/lib/notion/rpc.ts
var rpc = __webpack_require__(4098);
// EXTERNAL MODULE: ./src/lib/notion/server-constants.js
var server_constants = __webpack_require__(2110);
;// CONCATENATED MODULE: ./src/lib/notion/getNotionAssetUrls.ts



async function getNotionAsset(res, assetUrl, blockId) {
  const requestURL = `${server_constants.API_ENDPOINT}/getSignedFileUrls`;
  const assetRes = await external_node_fetch_default()(requestURL, {
    method: 'POST',
    headers: {
      cookie: `token_v2=${server_constants.NOTION_TOKEN}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      urls: [{
        url: assetUrl,
        permissionRecord: {
          table: 'block',
          id: blockId
        }
      }]
    })
  });

  if (assetRes.ok) {
    return assetRes.json();
  } else {
    console.log('bad request', assetRes.status);
    res.json({
      status: 'error',
      message: 'failed to load Notion asset'
    });
    throw new Error(await (0,rpc/* getError */.by)(assetRes));
  }
}
;// CONCATENATED MODULE: ./src/lib/notion/utils.ts
function setHeaders(req, res) {
  // set SPR/CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'pragma');

  if (req.method === 'OPTIONS') {
    res.status(200);
    res.end();
    return true;
  }

  return false;
}
async function handleData(res, data) {
  data = data || {
    status: 'error',
    message: 'unhandled request'
  };
  res.status(data.status !== 'error' ? 200 : 500);
  res.json(data);
}
function handleError(res, error) {
  console.error(error);
  res.status(500).json({
    status: 'error',
    message: 'an error occurred processing request'
  });
}
;// CONCATENATED MODULE: ./src/pages/api/asset.ts
const _excluded = ["signedUrls"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



async function notionApi(req, res) {
  if (setHeaders(req, res)) return;

  try {
    const {
      assetUrl,
      blockId
    } = req.query;

    if (!assetUrl || !blockId) {
      handleData(res, {
        status: 'error',
        message: 'asset url or blockId missing'
      });
    } else {
      // we need to re-encode it since it's decoded when added to req.query
      const _await$getNotionAsset = await getNotionAsset(res, assetUrl, blockId),
            {
        signedUrls = []
      } = _await$getNotionAsset,
            urlsResponse = _objectWithoutProperties(_await$getNotionAsset, _excluded);

      if (signedUrls.length === 0) {
        console.error('Failed to get signedUrls', urlsResponse);
        return handleData(res, {
          status: 'error',
          message: 'Failed to get asset URL'
        });
      }

      res.status(307);
      res.setHeader('Location', signedUrls.pop());
      res.end();
    }
  } catch (error) {
    handleError(res, error);
  }
}

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ 5622:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [98], () => (__webpack_exec__(5024)));
module.exports = __webpack_exports__;

})();