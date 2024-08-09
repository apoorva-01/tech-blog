"use strict";
exports.id = 280;
exports.ids = [280];
exports.modules = {

/***/ 9227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Np": () => (/* binding */ getBlogLink),
/* harmony export */   "mu": () => (/* binding */ getDateStr),
/* harmony export */   "tl": () => (/* binding */ postIsPublished),
/* harmony export */   "E1": () => (/* binding */ normalizeSlug)
/* harmony export */ });
const getBlogLink = slug => {
  return `/blog/${slug}`;
};
const getDateStr = date => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });
};
const postIsPublished = post => {
  return post.Published === 'Yes';
};
const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug;
  let startingSlash = slug.startsWith('/');
  let endingSlash = slug.endsWith('/');

  if (startingSlash) {
    slug = slug.substr(1);
  }

  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1);
  }

  return startingSlash || endingSlash ? normalizeSlug(slug) : slug;
};

/***/ }),

/***/ 8087:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ readFile),
/* harmony export */   "N": () => (/* binding */ writeFile)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5747);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1669);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);


const readFile = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)((fs__WEBPACK_IMPORTED_MODULE_0___default().readFile));
const writeFile = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)((fs__WEBPACK_IMPORTED_MODULE_0___default().writeFile));

/***/ }),

/***/ 1280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ getBlogIndex)
});

// EXTERNAL MODULE: external "async-sema"
var external_async_sema_ = __webpack_require__(9954);
// EXTERNAL MODULE: ./src/lib/notion/rpc.ts
var rpc = __webpack_require__(4098);
// EXTERNAL MODULE: external "github-slugger"
var external_github_slugger_ = __webpack_require__(7797);
var external_github_slugger_default = /*#__PURE__*/__webpack_require__.n(external_github_slugger_);
;// CONCATENATED MODULE: ./src/lib/notion/queryCollection.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function queryCollection({
  collectionId,
  collectionViewId,
  loader = {},
  query = {}
}) {
  const queryCollectionBody = {
    loader: {
      type: 'reducer',
      reducers: {
        collection_group_results: {
          type: 'results',
          limit: 999,
          loadContentCover: true
        },
        'table:uncategorized:title:count': {
          type: 'aggregation',
          aggregation: {
            property: 'title',
            aggregator: 'count'
          }
        }
      },
      searchQuery: '',
      userTimeZone: 'America/Phoenix'
    }
  };
  return (0,rpc/* default */.ZP)('queryCollection', _objectSpread({
    collectionId,
    collectionViewId
  }, queryCollectionBody));
}
// EXTERNAL MODULE: ./src/lib/blog-helpers.ts
var blog_helpers = __webpack_require__(9227);
;// CONCATENATED MODULE: ./src/lib/notion/getTableData.ts




async function loadTable(collectionBlock, isPosts = false) {
  const slugger = new (external_github_slugger_default())();
  const {
    value
  } = collectionBlock;
  let table = {};
  const col = await queryCollection({
    collectionId: value.collection_id,
    collectionViewId: value.view_ids[0]
  });
  const entries = (0,rpc/* values */.VO)(col.recordMap.block).filter(block => {
    return block.value && block.value.parent_id === value.collection_id;
  });
  const colId = Object.keys(col.recordMap.collection)[0];
  const schema = col.recordMap.collection[colId].value.schema;
  const schemaKeys = Object.keys(schema);

  for (const entry of entries) {
    const props = entry.value && entry.value.properties;
    const row = {};
    if (!props) continue;

    if (entry.value.content) {
      row.id = entry.value.id;
    }

    schemaKeys.forEach(key => {
      // might be undefined
      let val = props[key] && props[key][0][0]; // authors and blocks are centralized

      if (val && props[key][0][1]) {
        const type = props[key][0][1][0];

        switch (type[0]) {
          case 'a':
            // link
            val = type[1];
            break;

          case 'u':
            // user
            val = props[key].filter(arr => arr.length > 1).map(arr => arr[1][0][1]);
            break;

          case 'p':
            // page (block)
            const page = col.recordMap.block[type[1]];
            row.id = page.value.id;
            val = page.value.properties.title[0][0];
            break;

          case 'd':
            // date
            // start_date: 2019-06-18
            // start_time: 07:00
            // time_zone: Europe/Berlin, America/Los_Angeles
            if (!type[1].start_date) {
              break;
            } // initial with provided date


            const providedDate = new Date(type[1].start_date + ' ' + (type[1].start_time || '')).getTime(); // calculate offset from provided time zone

            const timezoneOffset = new Date(new Date().toLocaleString('en-US', {
              timeZone: type[1].time_zone
            })).getTime() - new Date().getTime(); // initialize subtracting time zone offset

            val = new Date(providedDate - timezoneOffset).getTime();
            break;

          default:
            console.error('unknown type', type[0], type);
            break;
        }
      }

      if (typeof val === 'string') {
        val = val.trim();
      }

      row[schema[key].name] = val || null;
    }); // auto-generate slug from title

    row.Slug = (0,blog_helpers/* normalizeSlug */.E1)(row.Slug || slugger.slug(row.Page || ''));
    const key = row.Slug;
    if (isPosts && !key) continue;

    if (key) {
      table[key] = row;
    } else {
      if (!Array.isArray(table)) table = [];
      table.push(row);
    }
  }

  return table;
}
// EXTERNAL MODULE: ./src/lib/notion/getPageData.ts
var getPageData = __webpack_require__(4186);
;// CONCATENATED MODULE: ./src/lib/notion/getPostPreview.ts


const nonPreviewTypes = new Set(['editor', 'page', 'collection_view']);
async function getPostPreview(pageId) {
  let blocks;
  let dividerIndex = 0;
  const data = await (0,getPageData/* loadPageChunk */.z)({
    pageId,
    limit: 10
  });
  blocks = (0,rpc/* values */.VO)(data.recordMap.block);

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].value.type === 'divider') {
      dividerIndex = i;
      break;
    }
  }

  blocks = blocks.splice(0, dividerIndex).filter(({
    value: {
      type,
      properties
    }
  }) => !nonPreviewTypes.has(type) && properties).map(block => block.value.properties.title);
  return blocks;
}
// EXTERNAL MODULE: ./src/lib/fs-helpers.ts
var fs_helpers = __webpack_require__(8087);
// EXTERNAL MODULE: ./src/lib/notion/server-constants.js
var server_constants = __webpack_require__(2110);
;// CONCATENATED MODULE: ./src/lib/notion/getBlogIndex.ts






async function getBlogIndex(previews = true) {
  let postsTable = null;
  const useCache = process.env.USE_CACHE === 'true';
  const cacheFile = `${server_constants.BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`;

  if (useCache) {
    try {
      postsTable = JSON.parse(await (0,fs_helpers/* readFile */.p)(cacheFile, 'utf8'));
    } catch (_) {
      /* not fatal */
    }
  }

  if (!postsTable) {
    try {
      const data = await (0,rpc/* default */.ZP)('loadPageChunk', {
        pageId: server_constants.BLOG_INDEX_ID,
        limit: 100,
        // TODO: figure out Notion's way of handling pagination
        cursor: {
          stack: []
        },
        chunkNumber: 0,
        verticalColumns: false
      }); // Parse table with posts

      const tableBlock = (0,rpc/* values */.VO)(data.recordMap.block).find(block => block.value.type === 'collection_view');
      postsTable = await loadTable(tableBlock, true);
    } catch (err) {
      console.warn(`Failed to load Notion posts, have you run the create-table script?`);
      return {};
    } // only get 10 most recent post's previews


    const postsKeys = Object.keys(postsTable).splice(0, 10);
    const sema = new external_async_sema_.Sema(3, {
      capacity: postsKeys.length
    });

    if (previews) {
      await Promise.all(postsKeys.sort((a, b) => {
        const postA = postsTable[a];
        const postB = postsTable[b];
        const timeA = postA.Date;
        const timeB = postB.Date;
        return Math.sign(timeB - timeA);
      }).map(async postKey => {
        await sema.acquire();
        const post = postsTable[postKey];
        post.preview = post.id ? await getPostPreview(postsTable[postKey].id) : [];
        sema.release();
      }));
    }

    if (useCache) {
      (0,fs_helpers/* writeFile */.N)(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {});
    }
  }

  return postsTable;
}

/***/ }),

/***/ 4186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ getPageData),
/* harmony export */   "z": () => (/* binding */ loadPageChunk)
/* harmony export */ });
/* harmony import */ var _rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4098);

async function getPageData(pageId) {
  // a reasonable size limit for the largest blog post (1MB),
  // as one chunk is about 10KB
  const maximumChunckNumer = 100;

  try {
    var chunkNumber = 0;
    var data = await loadPageChunk({
      pageId,
      chunkNumber
    });
    var blocks = data.recordMap.block;

    while (data.cursor.stack.length !== 0 && chunkNumber < maximumChunckNumer) {
      chunkNumber = chunkNumber + 1;
      data = await loadPageChunk({
        pageId,
        chunkNumber,
        cursor: data.cursor
      });
      blocks = Object.assign(blocks, data.recordMap.block);
    }

    const blockArray = (0,_rpc__WEBPACK_IMPORTED_MODULE_0__/* .values */ .VO)(blocks);

    if (blockArray[0] && blockArray[0].value.content) {
      // remove table blocks
      blockArray.splice(0, 3);
    }

    return {
      blocks: blockArray
    };
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err);
    return {
      blocks: []
    };
  }
}
function loadPageChunk({
  pageId,
  limit = 30,
  cursor = {
    stack: []
  },
  chunkNumber = 0,
  verticalColumns = false
}) {
  return (0,_rpc__WEBPACK_IMPORTED_MODULE_0__/* .default */ .ZP)('loadPageChunk', {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns
  });
}

/***/ })

};
;