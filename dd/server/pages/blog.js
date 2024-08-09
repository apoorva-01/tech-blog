(() => {
var exports = {};
exports.id = 195;
exports.ids = [195];
exports.modules = {

/***/ 3872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 8048:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1902);
/* harmony import */ var _styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1549);
/* harmony import */ var _styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_shared_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3524);
/* harmony import */ var _styles_shared_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_shared_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_blog_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9227);
/* harmony import */ var _lib_notion_getNotionUsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3872);
/* harmony import */ var _lib_notion_getBlogIndex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1280);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);










async function getStaticProps({
  preview
}) {
  const postsTable = await (0,_lib_notion_getBlogIndex__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)();
  const authorsToGet = new Set();
  const posts = Object.keys(postsTable).map(slug => {
    const post = postsTable[slug]; // remove draft posts in production

    if (!preview && !(0,_lib_blog_helpers__WEBPACK_IMPORTED_MODULE_5__/* .postIsPublished */ .tl)(post)) {
      return null;
    }

    post.Authors = post.Authors || [];

    for (const author of post.Authors) {
      authorsToGet.add(author);
    }

    return post;
  }).filter(Boolean);
  const {
    users
  } = await (0,_lib_notion_getNotionUsers__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)([...authorsToGet]);
  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name);
  });
  return {
    props: {
      preview: preview || false,
      posts
    },
    revalidate: 10
  };
}

const Index = ({
  posts = [],
  preview
}) => {
  console.log("posts", posts);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_components_header__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
      titlePre: "Blog"
    }), preview && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().previewAlertContainer),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().previewAlert),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("b", {
          children: "Note:"
        }), ` `, "Viewing in preview mode", ' ', /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__.default, {
          href: `/api/clear-preview`,
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("button", {
            className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().escapePreview),
            children: "Exit Preview"
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: `${(_styles_shared_module_css__WEBPACK_IMPORTED_MODULE_7___default().layout)} ${(_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().blogIndex)}`,
      children: [posts.length === 0 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
        className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().noPosts),
        children: "There are no posts yet"
      }), posts.map(post => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().postPreview),
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("h3", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
              className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().titleContainer),
              children: [!post.Published && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("span", {
                className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().draftBadge),
                children: "Draft"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                children: "\xBB"
              }), post.Tags.length > 0 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().tags),
                children: post.Tags.split(',').map(tag => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("p", {
                    className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().tagchip),
                    children: tag
                  })
                }, tag))
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__.default, {
                href: "/blog/[slug]",
                as: (0,_lib_blog_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getBlogLink */ .Np)(post.Slug),
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("a", {
                  children: post.Page
                })
              }), post.Date && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
                className: (_styles_blog_module_css__WEBPACK_IMPORTED_MODULE_6___default().dateContainer),
                children: (0,_lib_blog_helpers__WEBPACK_IMPORTED_MODULE_5__/* .getDateStr */ .mu)(post.Date)
              })]
            })
          })
        }, post.Slug);
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);

/***/ }),

/***/ 3524:
/***/ ((module) => {

// Exports
module.exports = {
	"layout": "shared_layout__2zJXU"
};


/***/ }),

/***/ 9954:
/***/ ((module) => {

"use strict";
module.exports = require("async-sema");

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 7797:
/***/ ((module) => {

"use strict";
module.exports = require("github-slugger");

/***/ }),

/***/ 9325:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 7162:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 8773:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 2248:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 9372:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 665:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 2747:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 701:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6731:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6786:
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 9297:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,98,280,969,864,549], () => (__webpack_exec__(8048)));
module.exports = __webpack_exports__;

})();