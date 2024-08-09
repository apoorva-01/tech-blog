"use strict";
(() => {
var exports = {};
exports.id = 492;
exports.ids = [492];
exports.modules = {

/***/ 6993:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _slug_),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "node-fetch"
var external_node_fetch_ = __webpack_require__(6786);
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./src/components/header.tsx
var header = __webpack_require__(1902);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/components/heading.tsx


const collectText = (el, acc = []) => {
  if (el) {
    if (typeof el === 'string') acc.push(el);
    if (Array.isArray(el)) el.map(item => collectText(item, acc));
    if (typeof el === 'object') collectText(el.props && el.props.children, acc);
  }

  return acc.join('').trim();
};

const Heading = ({
  children: component,
  id
}) => {
  const children = component.props.children || '';
  let text = children;

  if (null == id) {
    id = collectText(text).toLowerCase().replace(/\s/g, '-').replace(/[?!:]/g, '');
  }

  return /*#__PURE__*/jsx_runtime_.jsx("a", {
    href: `#${id}`,
    id: id,
    style: {
      color: 'inherit'
    },
    children: component
  });
};

/* harmony default export */ const heading = (Heading);
// EXTERNAL MODULE: ./src/components/dynamic.tsx
var dynamic = __webpack_require__(7167);
;// CONCATENATED MODULE: external "@zeit/react-jsx-parser"
const react_jsx_parser_namespaceObject = require("@zeit/react-jsx-parser");
var react_jsx_parser_default = /*#__PURE__*/__webpack_require__.n(react_jsx_parser_namespaceObject);
// EXTERNAL MODULE: ./src/styles/blog.module.css
var blog_module = __webpack_require__(1549);
var blog_module_default = /*#__PURE__*/__webpack_require__.n(blog_module);
// EXTERNAL MODULE: ./src/lib/notion/renderers.ts
var renderers = __webpack_require__(9067);
// EXTERNAL MODULE: ./src/lib/notion/getPageData.ts
var getPageData = __webpack_require__(4186);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./src/lib/notion/getBlogIndex.ts + 3 modules
var getBlogIndex = __webpack_require__(1280);
// EXTERNAL MODULE: ./src/lib/notion/getNotionUsers.ts
var getNotionUsers = __webpack_require__(3872);
// EXTERNAL MODULE: ./src/lib/blog-helpers.ts
var blog_helpers = __webpack_require__(9227);
;// CONCATENATED MODULE: ./src/pages/blog/[slug].tsx













 // Get the data for each blog post




async function getStaticProps({
  params: {
    slug
  },
  preview
}) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await (0,getBlogIndex/* default */.Z)();
  const post = postsTable[slug]; // if we can't find the post or if it is unpublished and
  // viewed without preview mode then we just redirect to /blog

  if (!post || post.Published !== 'Yes' && !preview) {
    console.log(`Failed to find post for slug: ${slug}`);
    return {
      props: {
        redirect: '/blog',
        preview: false
      },
      unstable_revalidate: 5
    };
  }

  const postData = await (0,getPageData/* default */.Z)(post.id);
  post.content = postData.blocks;

  for (let i = 0; i < postData.blocks.length; i++) {
    const {
      value
    } = postData.blocks[i];
    const {
      type,
      properties
    } = value;

    if (type == 'tweet') {
      const src = properties.source[0][0]; // parse id from https://twitter.com/_ijjk/status/TWEET_ID format

      const tweetId = src.split('/')[5].split('?')[0];
      if (!tweetId) continue;

      try {
        const res = await external_node_fetch_default()(`https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`);
        const json = await res.json();
        properties.html = json.html.split('<script')[0];
        post.hasTweet = true;
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`);
      }
    }
  }

  const {
    users
  } = await (0,getNotionUsers/* default */.Z)(post.Authors || []);
  post.Authors = Object.keys(users).map(id => users[id].full_name);
  return {
    props: {
      post,
      preview: preview || false
    },
    revalidate: 10
  };
} // Return our list of blog posts to prerender

async function getStaticPaths() {
  const postsTable = await (0,getBlogIndex/* default */.Z)(); // we fallback for any unpublished posts to save build time
  // for actually published ones

  return {
    paths: Object.keys(postsTable).filter(post => postsTable[post].Published === 'Yes').map(slug => (0,blog_helpers/* getBlogLink */.Np)(slug)),
    fallback: true
  };
}
const listTypes = new Set(['bulleted_list', 'numbered_list']);

const RenderPost = ({
  post,
  redirect,
  preview
}) => {
  const router = (0,router_.useRouter)();
  let listTagName = null;
  let listLastId = null;
  let listMap = {};
  (0,external_react_.useEffect)(() => {
    const twitterSrc = 'https://platform.twitter.com/widgets.js'; // make sure to initialize any new widgets loading on
    // client navigation

    if (post && post.hasTweet) {
      var _window, _window$twttr;

      if ((_window = window) !== null && _window !== void 0 && (_window$twttr = _window.twttr) !== null && _window$twttr !== void 0 && _window$twttr.widgets) {
        ;
        window.twttr.widgets.load();
      } else if (!document.querySelector(`script[src="${twitterSrc}"]`)) {
        const script = document.createElement('script');
        script.async = true;
        script.src = twitterSrc;
        document.querySelector('body').appendChild(script);
      }
    }
  }, []);
  (0,external_react_.useEffect)(() => {
    if (redirect && !post) {
      router.replace(redirect);
    }
  }, [redirect, post]); // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running

  if (router.isFallback) {
    return /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: "Loading..."
    });
  } // if you don't have a post at this point, and are not
  // loading one from fallback then  redirect back to the index


  if (!post) {
    return /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (blog_module_default()).post,
      children: /*#__PURE__*/jsx_runtime_.jsx("p", {
        children: "Woops! didn't find that post, redirecting you back to the blog index"
      })
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(header/* default */.Z, {
      titlePre: post.Page
    }), preview && /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (blog_module_default()).previewAlertContainer,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: (blog_module_default()).previewAlert,
        children: [/*#__PURE__*/jsx_runtime_.jsx("b", {
          children: "Note:"
        }), ` `, "Viewing in preview mode", ' ', /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
          href: `/api/clear-preview?slug=${post.Slug}`,
          children: /*#__PURE__*/jsx_runtime_.jsx("button", {
            className: (blog_module_default()).escapePreview,
            children: "Exit Preview"
          })
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: (blog_module_default()).post,
      children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
        children: post.Page || ''
      }), post.Tags.length > 0 && /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (blog_module_default()).tags,
        children: post.Tags.split(',').map(tag => /*#__PURE__*/jsx_runtime_.jsx("div", {
          children: /*#__PURE__*/jsx_runtime_.jsx("p", {
            className: (blog_module_default()).tagchip,
            children: tag
          })
        }, tag))
      }), post.Date && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "posted",
        children: ["Posted: ", (0,blog_helpers/* getDateStr */.mu)(post.Date)]
      }), /*#__PURE__*/jsx_runtime_.jsx("hr", {}), (!post.content || post.content.length === 0) && /*#__PURE__*/jsx_runtime_.jsx("p", {
        children: "This post has no content"
      }), (post.content || []).map((block, blockIdx) => {
        const {
          value
        } = block;
        const {
          type,
          properties,
          id,
          parent_id
        } = value;
        const isLast = blockIdx === post.content.length - 1;
        const isList = listTypes.has(type);
        let toRender = [];

        if (isList) {
          listTagName = dynamic/* default */.Z[type === 'bulleted_list' ? 'ul' : 'ol'];
          listLastId = `list${id}`;
          listMap[id] = {
            key: id,
            nested: [],
            children: (0,renderers/* textBlock */.$)(properties.title, true, id)
          };

          if (listMap[parent_id]) {
            listMap[id].isNested = true;
            listMap[parent_id].nested.push(id);
          }
        }

        if (listTagName && (isLast || !isList)) {
          toRender.push( /*#__PURE__*/external_react_default().createElement(listTagName, {
            key: listLastId
          }, Object.keys(listMap).map(itemId => {
            if (listMap[itemId].isNested) return null;

            const createEl = item => /*#__PURE__*/external_react_default().createElement(dynamic/* default.li */.Z.li || 'ul', {
              key: item.key
            }, item.children, item.nested.length > 0 ? /*#__PURE__*/external_react_default().createElement(dynamic/* default.ul */.Z.ul || 'ul', {
              key: item + 'sub-list'
            }, item.nested.map(nestedId => createEl(listMap[nestedId]))) : null);

            return createEl(listMap[itemId]);
          })));
          listMap = {};
          listLastId = null;
          listTagName = null;
        }

        const renderHeading = Type => {
          toRender.push( /*#__PURE__*/jsx_runtime_.jsx(heading, {
            children: /*#__PURE__*/jsx_runtime_.jsx(Type, {
              children: (0,renderers/* textBlock */.$)(properties.title, true, id)
            }, id)
          }, id));
        };

        const renderBookmark = ({
          link,
          title,
          description,
          format
        }) => {
          const {
            bookmark_icon: icon,
            bookmark_cover: cover
          } = format;
          toRender.push( /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: (blog_module_default()).bookmark,
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                style: {
                  display: 'flex'
                },
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: (blog_module_default()).bookmarkContentsWrapper,
                  href: link,
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    role: "button",
                    className: (blog_module_default()).bookmarkContents,
                    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: (blog_module_default()).bookmarkInfo,
                      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: (blog_module_default()).bookmarkTitle,
                        children: title
                      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: (blog_module_default()).bookmarkDescription,
                        children: description
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: (blog_module_default()).bookmarkLinkWrapper,
                        children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
                          src: icon,
                          className: (blog_module_default()).bookmarkLinkIcon
                        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                          className: (blog_module_default()).bookmarkLink,
                          children: link
                        })]
                      })]
                    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                      className: (blog_module_default()).bookmarkCoverWrapper1,
                      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: (blog_module_default()).bookmarkCoverWrapper2,
                        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                          className: (blog_module_default()).bookmarkCoverWrapper3,
                          children: /*#__PURE__*/jsx_runtime_.jsx("img", {
                            src: cover,
                            className: (blog_module_default()).bookmarkCover
                          })
                        })
                      })
                    })]
                  })
                })
              })
            })
          }));
        };

        switch (type) {
          case 'page':
          case 'divider':
            break;

          case 'text':
            if (properties) {
              toRender.push((0,renderers/* textBlock */.$)(properties.title, false, id));
            }

            break;

          case 'image':
          case 'video':
          case 'embed':
            {
              const {
                format = {}
              } = value;
              const {
                block_width,
                block_height,
                display_source,
                block_aspect_ratio
              } = format;
              const baseBlockWidth = 768;
              const roundFactor = Math.pow(10, 2); // calculate percentages

              const width = block_width ? `${Math.round(block_width / baseBlockWidth * 100 * roundFactor) / roundFactor}%` : block_height || '100%';
              const isImage = type === 'image';
              const Comp = isImage ? 'img' : 'video';
              const useWrapper = block_aspect_ratio && !block_height;
              const childStyle = useWrapper ? {
                width: '100%',
                height: '100%',
                border: 'none',
                position: 'absolute',
                top: 0
              } : {
                width,
                border: 'none',
                height: block_height,
                display: 'block',
                maxWidth: '100%'
              };
              let child = null;

              if (!isImage && !value.file_ids) {
                // external resource use iframe
                child = /*#__PURE__*/jsx_runtime_.jsx("iframe", {
                  style: childStyle,
                  src: display_source,
                  className: !useWrapper ? 'asset-wrapper' : undefined
                }, !useWrapper ? id : undefined);
              } else {
                // notion resource
                child = /*#__PURE__*/jsx_runtime_.jsx(Comp, {
                  src: `/api/asset?assetUrl=${encodeURIComponent(display_source)}&blockId=${id}`,
                  controls: !isImage,
                  alt: `An ${isImage ? 'image' : 'video'} from Notion`,
                  loop: !isImage,
                  muted: !isImage,
                  autoPlay: !isImage,
                  style: childStyle
                }, !useWrapper ? id : undefined);
              }

              toRender.push(useWrapper ? /*#__PURE__*/jsx_runtime_.jsx("div", {
                style: {
                  paddingTop: `${Math.round(block_aspect_ratio * 100)}%`,
                  position: 'relative'
                },
                className: "asset-wrapper",
                children: child
              }, id) : child);
              break;
            }

          case 'header':
            renderHeading('h1');
            break;

          case 'sub_header':
            renderHeading('h2');
            break;

          case 'sub_sub_header':
            renderHeading('h3');
            break;

          case 'bookmark':
            const {
              link,
              title,
              description
            } = properties;
            const {
              format = {}
            } = value;
            renderBookmark({
              link,
              title,
              description,
              format
            });
            break;

          case 'code':
            {
              if (properties.title) {
                const content = properties.title[0][0];
                const language = properties.language[0][0];

                if (language === 'LiveScript') {
                  // this requires the DOM for now
                  toRender.push( /*#__PURE__*/jsx_runtime_.jsx((react_jsx_parser_default()), {
                    jsx: content,
                    components: dynamic/* default */.Z,
                    componentsOnly: false,
                    renderInpost: false,
                    allowUnknownElements: true,
                    blacklistedTags: ['script', 'style']
                  }, id));
                } else {
                  toRender.push( /*#__PURE__*/jsx_runtime_.jsx(dynamic/* default.Code */.Z.Code, {
                    language: language || '',
                    children: content
                  }, id));
                }
              }

              break;
            }

          case 'quote':
            {
              if (properties.title) {
                toRender.push( /*#__PURE__*/external_react_default().createElement(dynamic/* default.blockquote */.Z.blockquote, {
                  key: id
                }, properties.title));
              }

              break;
            }

          case 'callout':
            {
              var _value$format, _value$format2;

              toRender.push( /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "callout",
                children: [((_value$format = value.format) === null || _value$format === void 0 ? void 0 : _value$format.page_icon) && /*#__PURE__*/jsx_runtime_.jsx("div", {
                  children: (_value$format2 = value.format) === null || _value$format2 === void 0 ? void 0 : _value$format2.page_icon
                }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                  className: "text",
                  children: (0,renderers/* textBlock */.$)(properties.title, true, id)
                })]
              }, id));
              break;
            }

          case 'tweet':
            {
              if (properties.html) {
                toRender.push( /*#__PURE__*/jsx_runtime_.jsx("div", {
                  dangerouslySetInnerHTML: {
                    __html: properties.html
                  }
                }, id));
              }

              break;
            }

          case 'equation':
            {
              if (properties && properties.title) {
                const content = properties.title[0][0];
                toRender.push( /*#__PURE__*/jsx_runtime_.jsx(dynamic/* default.Equation */.Z.Equation, {
                  displayMode: true,
                  children: content
                }, id));
              }

              break;
            }

          default:
            if (false) {}

            break;
        }

        return toRender;
      })]
    })]
  });
};

/* harmony default export */ const _slug_ = (RenderPost);

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

/***/ 9325:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 2307:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 7162:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 8773:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 2248:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 9372:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 665:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 2747:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 701:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6731:
/***/ ((module) => {

module.exports = require("next/router");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,152,98,280,969,864,220,549], () => (__webpack_exec__(6993)));
module.exports = __webpack_exports__;

})();