(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FourCorners", [], factory);
	else if(typeof exports === 'object')
		exports["FourCorners"] = factory();
	else
		root["FourCorners"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/styles.scss */ "./src/styles.scss");
/* harmony import */ var _src_styles_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_styles_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/index.js */ "./src/index.js");


/* harmony default export */ __webpack_exports__["default"] = (_src_index_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import {TweenMax} from 'gsap/all';
var FourCorners =
/*#__PURE__*/
function () {
  function FourCorners(embed, opts) {
    _classCallCheck(this, FourCorners);

    this.elems = {};
    this.opts = opts;
    this.corners = ['backstory', 'copyright', 'media', 'links'];
    this.elems.embed = embed;
    this.data = parseData(this);
    this.elems.photo = addPhoto(this);
    this.elems.panels = addPanels(this);
    this.elems.corners = addCorners(this);
  } // const init = () => {


  _createClass(FourCorners, [{
    key: "init",
    value: function init(userOpts) {
      window.FOURCORNERS = [];
      var defaultOpts = {
        selector: '.fc-embed',
        cornerStroke: '6px',
        cornerSize: '25px',
        cornerColor: 'white',
        cornerActiveColor: 'blue',
        cornerHoverColor: 'red',
        posDur: 0.2,
        transDur: 0.1
      };
      var opts = Object.assign(defaultOpts, userOpts);
      var embeds = Array.from(document.querySelectorAll(opts.selector));
      embeds.forEach(function (embed, i) {
        var inst = new FourCorners(embed, opts);
        FOURCORNERS.push(inst);
      });
      return FOURCORNERS;
    }
  }, {
    key: "openCorner",
    value: function openCorner(slug) {
      var inst = this;
      var corners = this.corners;
      var embed = this.elems.embed;
      var corner = this.elems.corners[slug];
      var panel = this.elems.panels[slug];

      if (corner && panel) {
        embed.dataset.active = slug;
        corner.classList.add('fc-active');
        panel.classList.add('fc-active');
      }

      corners.forEach(function (_slug, i) {
        if (_slug != slug) {
          inst.closeCorner(_slug);
        }
      });
    }
  }, {
    key: "closeCorner",
    value: function closeCorner(slug) {
      var inst = this;
      var embed = this.elems.embed;
      var corner = this.elems.corners[slug];
      var panel = this.elems.panels[slug];

      if (slug == embed.dataset.active) {
        embed.dataset.active = '';
      }

      corner.classList.remove('fc-active');
      panel.classList.remove('fc-active');
    }
  }]);

  return FourCorners;
}();

var initEmbed = function initEmbed(inst) {
  var embed = document.querySelector(inst.opts.selector);

  if (!embed) {
    return;
  }

  return embed;
};

var addPhoto = function addPhoto(inst) {
  if (!inst.data) {
    return;
  }

  var imgSrc = inst.data.img;
  var img = document.createElement('img');
  img.classList.add('fc-photo');
  img.src = imgSrc;
  inst.elems.embed.appendChild(img);
  return img;
};

var addPanels = function addPanels(inst) {
  var panels = {};
  var embed = inst.elems.embed;
  inst.corners.forEach(function (slug, i) {
    var panelSelector = '.fc-panel[data-slug="' + slug + '"]';
    var panel = '';

    if (!embed.querySelector(panelSelector)) {
      panel = document.createElement('div');
      panel.classList.add('fc-panel');
      panel.dataset.slug = slug;
      var panelInner = document.createElement('div');
      panelInner.classList.add('fc-inner');

      if (inst.data) {
        var data = inst.data[slug];
        Object.entries(data).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              prop = _ref2[0],
              val = _ref2[1];

          var row = document.createElement('div');
          row.className = 'fc-row';
          var label = document.createElement('div');
          label.className = 'fc-label';
          label.innerHTML = prop;
          row.appendChild(label);

          if (slug == 'media') {
            row.append(addMedia(val));
          } else if (slug == 'links') {
            row.append(addLinks(val));
          } else {
            val = wrapUrls(val);
            row.innerHTML += val;
          }

          panelInner.appendChild(row);
        });
      }

      panel.appendChild(panelInner);
      embed.appendChild(panel);
    } else {
      panel = embed.querySelector(panelSelector);
    }

    panels[slug] = panel;
  });
  return panels;
};

var addMedia = function addMedia(arr) {
  var grid = document.createElement('div');
  grid.className = 'fc-grid';
  arr.forEach(function (obj, index) {
    if (obj.type == 'image') {
      var image = document.createElement('div');
      image.className = 'fc-image';
      var img = document.createElement('img');
      img.src = obj.url;
      image.appendChild(img);
      grid.appendChild(image);
    }
  });
  return grid;
};

var addLinks = function addLinks(arr) {};

var addCorners = function addCorners(inst) {
  var corners = {};
  var embed = inst.elems.embed;
  var cornerStroke = inst.opts.cornerStroke;
  var cornerSize = inst.opts.cornerSize;
  var cornerMargin = inst.opts.cornerMargin;
  inst.corners.forEach(function (slug, i) {
    var corner = document.createElement('div');
    corner.classList.add('fc-corner');
    corner.dataset.slug = slug;
    embed.addEventListener('mouseenter', function (e) {
      hoverEmbed(e, inst);
    });
    embed.addEventListener('mouseleave', function (e) {
      unhoverEmbed(e, inst);
    });
    corner.addEventListener('mouseenter', function (e) {
      hoverCorner(e, inst);
    });
    corner.addEventListener('mouseleave', function (e) {
      unhoverCorner(e, inst);
    });
    corner.addEventListener('click', function (e) {
      clickCorner(e, inst);
    });
    corners[slug] = corner;
    embed.appendChild(corner);
  });
  return corners;
};

var parseData = function parseData(inst) {
  var stringData = inst.elems.embed.dataset.fc;

  if (!stringData) {
    return;
  }

  stringData = stringData.replace(/(\')/g, '"');
  delete inst.elems.embed.dataset.fc;
  return JSON.parse(stringData);
};

var hoverEmbed = function hoverEmbed(e, inst) {
  var embed = inst.elems.embed;
  var corners = inst.elems.corners;
  var css = inst.css;
  var posDur = inst.opts.posDur;
};

var unhoverEmbed = function unhoverEmbed(e, inst) {
  var embed = inst.elems.embed;
  var corners = inst.elems.corners;
  var css = inst.css;
  var posDur = inst.opts.posDur;
};

var hoverCorner = function hoverCorner(e, inst) {
  var corner = e.target;
  corner.classList.add('fc-hover');
};

var unhoverCorner = function unhoverCorner(e, inst) {
  var corner = e.target;
  corner.classList.remove('fc-hover');
};

var clickCorner = function clickCorner(e, inst) {
  var corner = e.target;
  var slug = corner.dataset.slug;
  var active = inst.elems.embed.dataset.active;

  if (!slug) {
    return;
  }

  if (slug == active) {
    inst.closeCorner(slug);
  } else {
    inst.openCorner(slug);
  }
};

var addStyles = function addStyles(elem, styles) {
  Object.entries(styles).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        prop = _ref4[0],
        val = _ref4[1];

    elem.style[prop] = val;
  });
  return elem;
}; //Adds namespace to all classes


var fc = function fc(input) {
  var ns = 'fc';
  var output = [];

  if (!Array.isArray(input)) {
    input = [input];
  }

  input.forEach(function (str, i) {
    output[i] = ns + '_' + str;
  });
  return output;
};

var wrapUrls = function wrapUrls(str) {
  var urlPattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
  return str.replace(urlPattern, function (url) {
    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
    var href = protocol_pattern.test(url) ? url : 'http://' + url;
    return '<a href="' + href + '" target="_blank">' + url + '</a>';
  });
};

/* harmony default export */ __webpack_exports__["default"] = (FourCorners);

/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/coreytegeler/Sites/four-corners.js/index.js */"./index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=four-corners.js.map