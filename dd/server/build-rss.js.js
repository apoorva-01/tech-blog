"use strict";
(() => {
var exports = {};
exports.id = 869;
exports.ids = [869];
exports.modules = {

/***/ 6112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(5622);
// EXTERNAL MODULE: ./src/lib/fs-helpers.ts
var fs_helpers = __webpack_require__(8087);
;// CONCATENATED MODULE: external "react-dom/server"
const server_namespaceObject = require("react-dom/server");
// EXTERNAL MODULE: ./src/lib/notion/renderers.ts
var renderers = __webpack_require__(9067);
// EXTERNAL MODULE: ./src/lib/notion/getBlogIndex.ts + 3 modules
var getBlogIndex = __webpack_require__(1280);
// EXTERNAL MODULE: ./src/lib/notion/getNotionUsers.ts
var getNotionUsers = __webpack_require__(3872);
// EXTERNAL MODULE: ./src/lib/blog-helpers.ts
var blog_helpers = __webpack_require__(9227);
;// CONCATENATED MODULE: external "@next/env"
const env_namespaceObject = require("@next/env");
// EXTERNAL MODULE: ./src/lib/notion/server-constants.js
var server_constants = __webpack_require__(2110);
var server_constants_default = /*#__PURE__*/__webpack_require__.n(server_constants);
;// CONCATENATED MODULE: ./src/lib/build-rss.ts








 // must use weird syntax to bypass auto replacing of NODE_ENV

process.env['NODE' + '_ENV'] = 'production';
process.env.USE_CACHE = 'true'; // constants

const NOW = new Date().toJSON();

function mapToAuthor(author) {
  return `<author><name>${author.full_name}</name></author>`;
}

function decode(string) {
  return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function mapToEntry(post) {
  return `
    <entry>
      <id>${post.link}</id>
      <title>${decode(post.title)}</title>
      <link href="${post.link}"/>
      <updated>${new Date(post.date).toJSON()}</updated>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${(0,server_namespaceObject.renderToStaticMarkup)(post.preview ? (post.preview || []).map((block, idx) => (0,renderers/* textBlock */.$)(block, false, post.title + idx)) : post.content)}
          <p class="more">
            <a href="${post.link}">Read more</a>
          </p>
        </div>
      </content>
      ${(post.authors || []).map(mapToAuthor).join('\n      ')}
    </entry>`;
}

function concat(total, item) {
  return total + item;
}

function createRSS(blogPosts = []) {
  const postsString = blogPosts.map(mapToEntry).reduce(concat, '');
  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>My Blog</title>
    <subtitle>Blog</subtitle>
    <link href="/atom" rel="self" type="application/rss+xml"/>
    <link href="/" />
    <updated>${NOW}</updated>
    <id>My Notion Blog</id>${postsString}
  </feed>`;
}

async function main() {
  await (0,env_namespaceObject.loadEnvConfig)(process.cwd());
  (server_constants_default()).NOTION_TOKEN = process.env.NOTION_TOKEN;
  (server_constants_default()).BLOG_INDEX_ID = server_constants_default().normalizeId(process.env.BLOG_INDEX_ID);
  const postsTable = await (0,getBlogIndex/* default */.Z)(true);
  const neededAuthors = new Set();
  const blogPosts = Object.keys(postsTable).map(slug => {
    const post = postsTable[slug];
    if (!(0,blog_helpers/* postIsPublished */.tl)(post)) return;
    post.authors = post.Authors || [];

    for (const author of post.authors) {
      neededAuthors.add(author);
    }

    return post;
  }).filter(Boolean);
  const {
    users
  } = await (0,getNotionUsers/* default */.Z)([...neededAuthors]);
  blogPosts.forEach(post => {
    post.authors = post.authors.map(id => users[id]);
    post.link = (0,blog_helpers/* getBlogLink */.Np)(post.Slug);
    post.title = post.Page;
    post.date = post.Date;
  });
  const outputPath = './public/atom';
  await (0,fs_helpers/* writeFile */.N)((0,external_path_.resolve)(outputPath), createRSS(blogPosts));
  console.log(`Atom feed file generated at \`${outputPath}\``);
}

main().catch(error => console.error(error));

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

/***/ 974:
/***/ ((module) => {

module.exports = require("katex");

/***/ }),

/***/ 2307:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ 5622:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 1531:
/***/ ((module) => {

module.exports = require("prismjs");

/***/ }),

/***/ 6349:
/***/ ((module) => {

module.exports = require("prismjs/components/prism-jsx");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3289:
/***/ ((module) => {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ 1669:
/***/ ((module) => {

module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [152,98,280,969,220], () => (__webpack_exec__(6112)));
module.exports = __webpack_exports__;

})();