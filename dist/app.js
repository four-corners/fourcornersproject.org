/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.jsx","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/coffee/public.coffee":
/*!**********************************!*\
  !*** ./src/coffee/public.coffee ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// console.log sticky\n\n// jQuery(document).ready ($) ->\n\n\n\n//# sourceURL=webpack:///./src/coffee/public.coffee?");

/***/ }),

/***/ "./src/creator.jsx":
/*!*************************!*\
  !*** ./src/creator.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jsonschema-form */ \"./node_modules/react-jsonschema-form/lib/index.js\");\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n/* harmony import */ var _header_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header.jsx */ \"./src/header.jsx\");\n/* harmony import */ var _left_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./left.jsx */ \"./src/left.jsx\");\n/* harmony import */ var _right_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./right.jsx */ \"./src/right.jsx\");\n\n\n\n\n\n\n\n\n\nclass Creator extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tcreator: {},\n\t\t\tlang: 'en',\n\t\t\tformData: {},\n\t\t\tmediaData: { context: [], backstory: [] },\n\t\t\tactiveCorner: null\n\t\t};\n\t\tthis.onLanguageChanged = this.onLanguageChanged.bind(this);\n\t\tthis.outputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t}\n\n\tcomponentDidMount() {\n\t\tlet that = this;\n\t\tlet url = window.location.href.split('/');\n\t\tlet lang = _i18n_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"].language;\n\t\tlet req = SiteSettings.url.api + 'creators?lang=' + lang;\n\t\tfetch(req).then(function (res) {\n\t\t\tif (!res.ok) {\n\t\t\t\tthrow Error(res.statusText);\n\t\t\t}\n\t\t\treturn res.json();\n\t\t}).then(function (res) {\n\t\t\tthat.setState({ creator: res[0] });\n\t\t});\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"].on('languageChanged', this.onLanguageChanged);\n\t}\n\n\tcomponentWillUnmount() {\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"].off('languageChanged', this.onLanguageChanged);\n\t}\n\n\tcomponentDidUpdate() {}\n\n\tonLanguageChanged(lang) {\n\t\tthis.setState({\n\t\t\tlang: lang\n\t\t});\n\t}\n\n\tgetEmbedId(url, type) {\n\t\tconst that = this;\n\n\t\tif (!url || !isUrl(url)) {\n\t\t\treturn;\n\t\t}\n\n\t\t// let endpoint = '';\n\t\t// switch(type) {\n\t\t// \tcase 'youtube':\n\t\t// \t\tendpoint = 'https://www.youtube.com/oembed';\n\t\t// \t\tbreak;\n\t\t// \tcase 'vimeo':\n\t\t// \t\tendpoint = 'https://vimeo.com/api/oembed.json';\n\t\t// \t\tbreak;\n\t\t// \tcase 'soundcloud':\n\t\t// \t\tendpoint = 'https://soundcloud.com/oembed';\n\t\t// \t\tbreak;\n\t\t// \tdefault:\n\t\t// \t\treturn false;\n\t\t// \t\tbreak;\n\t\t// }\n\t\t// const callback = 'embedVideo';\n\t\t//  let req = endpoint+'?url='+encodeURIComponent(url);\n\t\t// fetch(req)\n\t\t// \t.then(res => {\n\t\t// \t\tif (!res.ok) {throw Error(res.statusText)}\n\t\t// \t\treturn res.json();\n\t\t// \t})\n\t\t// \t.then(res => {\n\t\t// \t\tconsole.log(that.state.formData);\n\t\t// \t\tconsole.log(res.video_id);\n\n\t\t// \t\t// that.setState({ creator: res[0] });\n\t\t// \t});\n\t}\n\n\tsetFormData(newData) {\n\t\tthis.setState({\n\t\t\tformData: newData\n\t\t});\n\t}\n\n\tsetMediaData(mediaData) {\n\t\tthis.setState({\n\t\t\tmediaData: mediaData\n\t\t});\n\t}\n\n\tsetActiveCorner(slug) {\n\t\tthis.setState({\n\t\t\tactiveCorner: slug\n\t\t});\n\t}\n\n\trenderLeft() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_left_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n\t\t\tlang: this.state.lang,\n\t\t\tcreator: this.state.creator,\n\t\t\tformData: this.state.formData,\n\t\t\tsendActiveCorner: this.setActiveCorner.bind(this),\n\t\t\tsendFormData: this.setFormData.bind(this),\n\t\t\tsendMediaData: this.setMediaData.bind(this) });\n\t}\n\n\trenderRight() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_right_jsx__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n\t\t\tlang: this.state.lang,\n\t\t\tcreator: this.state.creator,\n\t\t\tformData: this.state.formData,\n\t\t\tmediaData: this.state.mediaData,\n\t\t\tactiveCorner: this.state.activeCorner });\n\t}\n\n\trender() {\n\t\tlet lang = this.state.lang;\n\t\treturn (\n\t\t\t// <div id='creator' className='container'>\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ id: 'creator' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'row', 'data-sticky-container': true },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'col-12 col-sm-6 left' },\n\t\t\t\t\t\tthis.state.creator && this.state.creator.ID ? this.renderLeft() : null\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'col-12 col-sm-6 right' },\n\t\t\t\t\t\tthis.state.creator && this.state.creator.ID ? this.renderRight() : null\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Creator);\n\n//# sourceURL=webpack:///./src/creator.jsx?");

/***/ }),

/***/ "./src/embed.jsx":
/*!***********************!*\
  !*** ./src/embed.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n/* harmony import */ var _entry_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entry.jsx */ \"./src/entry.jsx\");\n\n\n\n\n\nclass Embed extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {};\n\t\tthis.imgInputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.corners = ['context', 'links', 'copyright', 'backstory'];\n\t}\n\n\tcomponentDidMount() {\n\t\tconst fourCornersInst = FourCorners.default.prototype.init()[0];\n\t\tconst activeCorner = this.props.activeCorner;\n\t\tthis.FourCorners = fourCornersInst;\n\t\tif (activeCorner) {\n\t\t\tthis.FourCorners.openCorner(activeCorner);\n\t\t}\n\t}\n\n\tcomponentDidUpdate(prevProps) {\n\t\tconst activeCorner = this.props.activeCorner;\n\t\tif (activeCorner) {\n\t\t\tthis.FourCorners.openCorner(activeCorner);\n\t\t}\n\t}\n\n\tonChangeOpts(e) {\n\t\tlet stateChange = {\n\t\t\tformData: this.props.formData\n\t\t};\n\t\tstateChange[e.target.id] = e.target.checked;\n\t\tthis.setState(stateChange);\n\t}\n\n\tonFocus(e) {\n\t\te.target.setSelectionRange(0, e.target.value.length);\n\t\t// this.FourCorners.closeCorner();\n\t}\n\n\tonBlur(e) {}\n\n\tonError(e) {\n\t\tconsole.log('Error', e);\n\t}\n\n\tonScroll(e) {}\n\n\trenderPanels() {\n\t\tconst formData = Object.entries(this.props.formData);\n\t\tconst embedData = {};\n\t\t{\n\t\t\tformData.map(obj => this.corners.includes(obj[0]) ? embedData[obj[0]] = obj[1] : '');\n\t\t}\n\t\t// const imgLoaded = this.state.imgLoaded?' has-image':'';\n\t\t// const imgFocus = this.state.imgFocus?' focus':'';\n\t\tconst panels = [];\n\t\tconst fields = this.props.creator.acf;\n\t\t{\n\t\t\tObject.entries(embedData).forEach((obj, i) => {\n\t\t\t\tconst cornerSlug = obj[0];\n\t\t\t\tconst cornerTitleKey = [cornerSlug, 'title'].join('_');\n\t\t\t\tconst cornerTitle = fields[cornerTitleKey];\n\t\t\t\tconst data = obj[1];\n\t\t\t\tconst entries = [];\n\t\t\t\tObject.entries(data).forEach((obj, i) => {\n\t\t\t\t\tconst fieldSlug = obj[0];\n\t\t\t\t\tconst fieldData = obj[1];\n\t\t\t\t\tlet fieldLabel = '';\n\t\t\t\t\tif (!['media', 'links'].includes(fieldSlug)) {\n\t\t\t\t\t\tconst fieldLabelKey = [cornerSlug, fieldSlug, 'label'].join('_');\n\t\t\t\t\t\tfieldLabel = fields[fieldLabelKey];\n\t\t\t\t\t}\n\t\t\t\t\tconst mediaData = this.props.mediaData[cornerSlug];\n\t\t\t\t\tentries.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_entry_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n\t\t\t\t\t\tcornerSlug: cornerSlug,\n\t\t\t\t\t\tfieldLabel: fieldLabel,\n\t\t\t\t\t\tfieldSlug: fieldSlug,\n\t\t\t\t\t\tfieldData: fieldData,\n\t\t\t\t\t\tmediaData: mediaData,\n\t\t\t\t\t\tkey: i }));\n\t\t\t\t});\n\t\t\t\tpanels.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ 'data-slug': cornerSlug, className: 'fc-panel', key: i },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'fc-panel-title' },\n\t\t\t\t\t\tcornerTitle\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'fc-inner' },\n\t\t\t\t\t\tentries\n\t\t\t\t\t)\n\t\t\t\t));\n\t\t\t});\n\t\t}\n\t\treturn panels;\n\t}\n\n\trender() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: this.props.imgLoaded ? 'fc-embed card' : 'fc-embed' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: this.props.imgLoaded ? 'fc-photo fc-loaded' : 'fc-photo' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('img', { src: this.props.imgSrc, className: 'fc-img' })\n\t\t\t),\n\t\t\tthis.renderPanels()\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Embed);\n\n//# sourceURL=webpack:///./src/embed.jsx?");

/***/ }),

/***/ "./src/entry.jsx":
/*!***********************!*\
  !*** ./src/entry.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"./node_modules/react-dom/server.browser.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass Entry extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tembedData: {\n\t\t\t\tcopyright: {},\n\t\t\t\tbackstory: {},\n\t\t\t\tcontext: {},\n\t\t\t\tlinks: {}\n\t\t\t}\n\t\t};\n\t}\n\n\tcomponentDidMount() {}\n\n\tcomponentWillUnmount() {}\n\n\tcomponentDidUpdate(prevProps, prevState, snapshot) {\n\t\t// console.log(prevProps, this.props);\n\t}\n\n\trenderMedia() {\n\t\tconst subRows = [];\n\t\tconst cornerSlug = this.props.cornerSlug;\n\t\tconst fieldSlug = this.props.fieldSlug;\n\t\tconst cornerData = Object.assign({}, this.state.embedData[cornerSlug]);\n\t\tconst mediaData = Object.assign({}, this.props.mediaData);\n\t\tif (!this.props.fieldData) {\n\t\t\treturn;\n\t\t}\n\t\tthis.props.fieldData.forEach((obj, i) => {\n\t\t\tlet subRowInner = '';\n\t\t\tif (obj.type == 'image') {\n\t\t\t\tsubRowInner = obj.url ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('img', { src: obj.url, alt: '' }) : false;\n\t\t\t} else if (mediaData && mediaData[i]) {\n\t\t\t\tconst media = mediaData[i];\n\t\t\t\tconsole.log(media.width, media.height);\n\t\t\t\t// if(Number.isInteger(media.width*media.height)) {\n\t\t\t\t// console.log(media.width/media.height);\n\t\t\t\t// }\n\t\t\t\tsubRowInner = media ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'fc-media', dangerouslySetInnerHTML: { __html: media.html } }) : false;\n\t\t\t}\n\t\t\tconst mediaCredit = obj.credit ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fc-sub-credit' },\n\t\t\t\tobj.credit\n\t\t\t) : '';\n\t\t\tconst subRow = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fc-sub-row', key: i },\n\t\t\t\tsubRowInner,\n\t\t\t\tmediaCredit\n\t\t\t);\n\n\t\t\tsubRows.push(subRow);\n\t\t});\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'fc-sub-rows' },\n\t\t\tsubRows\n\t\t);\n\t}\n\n\trenderLinks() {\n\t\tconst subRows = [];\n\t\tthis.props.fieldData.forEach((obj, i) => {\n\t\t\tif (!obj.url) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tlet link = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('img', { src: obj.url, alt: '' });\n\t\t\tconst subRow = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fc-sub-row', key: i },\n\t\t\t\tobj.title ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'fc-sub-title' },\n\t\t\t\t\tobj.title\n\t\t\t\t) : '',\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'fc-sub-url' },\n\t\t\t\t\tobj.url\n\t\t\t\t)\n\t\t\t);\n\t\t\tsubRows.push(subRow);\n\t\t});\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'fc-sub-rows' },\n\t\t\tsubRows\n\t\t);\n\t}\n\n\trenderEntry() {\n\t\tswitch (this.props.fieldSlug) {\n\t\t\tcase 'media':\n\t\t\t\treturn this.renderMedia();\n\t\t\t\tbreak;\n\t\t\tcase 'links':\n\t\t\t\treturn this.renderLinks();\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\treturn this.props.fieldData;\n\t\t\t\tbreak;\n\t\t}\n\t}\n\n\trender() {\n\t\tconst cornerSlug = this.props.cornerSlug;\n\t\tconst fieldSlug = this.props.fieldSlug;\n\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: this.props.fieldData ? 'fc-row' : 'fc-row fc-empty' },\n\t\t\tthis.props.fieldLabel ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fc-label' },\n\t\t\t\tthis.props.fieldLabel\n\t\t\t) : '',\n\t\t\tthis.props.fieldData ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'fc-value' },\n\t\t\t\tthis.renderEntry()\n\t\t\t) : ''\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Entry);\n\n//# sourceURL=webpack:///./src/entry.jsx?");

/***/ }),

/***/ "./src/footer.jsx":
/*!************************!*\
  !*** ./src/footer.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst Footer = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\"footer\",\n\t{ id: \"colophon\", className: \"container\" },\n\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\"div\",\n\t\t{ className: \"card-footer text-center bg-transparent border-primary\" },\n\t\t\"Four Corners \",\n\t\tnew Date().getFullYear()\n\t)\n);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Footer);\n\n//# sourceURL=webpack:///./src/footer.jsx?");

/***/ }),

/***/ "./src/header.jsx":
/*!************************!*\
  !*** ./src/header.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n\n\n\n\n\nclass Header extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tlang: 'en',\n\t\t\tlangs: {}\n\t\t};\n\t\tthis.onLanguageChanged = this.onLanguageChanged.bind(this);\n\t}\n\n\tcomponentDidMount() {\n\t\tlet that = this;\n\t\tlet lang = _i18n_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"].language;\n\t\tlet req = SiteSettings.url.api + 'get_langs';\n\t\tfetch(req).then(function (res) {\n\t\t\tif (!res.ok) {\n\t\t\t\tthrow Error(res.statusText);\n\t\t\t}\n\t\t\t// return console.log(res);\n\t\t\treturn res.json();\n\t\t}).then(function (res) {\n\t\t\tthat.setState({ langs: JSON.parse(res) });\n\t\t});\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"].on('languageChanged', this.onLanguageChanged);\n\t}\n\n\tcomponentWillUnmount() {\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"].off('languageChanged', this.onLanguageChanged);\n\t}\n\n\tonLanguageChanged(lang) {\n\t\tthis.setState({\n\t\t\tlang: lang\n\t\t});\n\t}\n\n\trenderLangList() {\n\t\tconst langs = this.state.langs;\n\t\tconst self = this;\n\t\treturn (\n\t\t\t// <ul>\n\t\t\t// {Object.keys(this.state.langs).map(function( slug, index ){\n\t\t\t// const lang = langs[slug];\n\t\t\t// return(\n\t\t\t// <li key={slug}>\n\t\t\t// <a href={lang.url}>{lang.name}</a>\n\t\t\t// {/*<NavLink\n\t\t\t// to={ '/'+slug }\n\t\t\t// activeClassName='active'\n\t\t\t// onClick={self.onLanguageChanged().bind(this)}>\n\t\t\t// {lang.name}\n\t\t\t// </NavLink>*/}\n\t\t\t// </li>\n\t\t\t// );\n\t\t\t// })}\n\t\t\t// </ul>\n\n\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'select',\n\t\t\t\t{ onChange: this.changeLang.bind(this), className: 'form-control' },\n\t\t\t\tObject.keys(this.state.langs).map(function (slug, index) {\n\t\t\t\t\tconst lang = langs[slug];\n\t\t\t\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ key: slug, value: slug },\n\t\t\t\t\t\tlang.name\n\t\t\t\t\t);\n\t\t\t\t})\n\t\t\t)\n\t\t);\n\t}\n\n\tchangeLang(e) {\n\t\tconsole.log(e);\n\t}\n\n\trender() {\n\t\tlet lang = this.state.lang;\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'header',\n\t\t\t{ className: 'header' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'row' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'col-12 col-sm-6 left' },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'half-max-width' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'h1',\n\t\t\t\t\t\t\t{ className: 'site-title' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],\n\t\t\t\t\t\t\t\t{ to: SiteSettings.path },\n\t\t\t\t\t\t\t\t'Four Corners'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'col-12 col-sm-6 right' },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'half-max-width' })\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/header.jsx?");

/***/ }),

/***/ "./src/i18n.jsx":
/*!**********************!*\
  !*** ./src/i18n.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! i18next */ \"./node_modules/i18next/dist/es/index.js\");\n/* harmony import */ var i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! i18next-xhr-backend */ \"./node_modules/i18next-xhr-backend/index.js\");\n/* harmony import */ var i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var i18next_browser_languagedetector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next-browser-languagedetector */ \"./node_modules/i18next-browser-languagedetector/index.js\");\n/* harmony import */ var i18next_browser_languagedetector__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(i18next_browser_languagedetector__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n\n\n\n\n\ni18next__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(i18next_xhr_backend__WEBPACK_IMPORTED_MODULE_1___default.a).use(i18next_browser_languagedetector__WEBPACK_IMPORTED_MODULE_2___default.a).use(react_i18next__WEBPACK_IMPORTED_MODULE_3__[\"reactI18nextModule\"]).init({\n\tfallbackLng: 'en',\n\tdebug: true,\n\treact: {\n\t\twait: true,\n\t\tbindI18n: 'languageChanged loaded',\n\t\tbindStore: 'added removed',\n\t\tnsMode: 'default'\n\t},\n\tdetection: {\n\t\torder: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'subdomain'],\n\t\tlookupQuerystring: 'lang',\n\t\tlookupCookie: 'i18n',\n\t\tlookupLocalStorage: 'i18nextLng'\n\n\t},\n\tbackend: {\n\t\tloadPath: SiteSettings.url.api + '{{ns}}/{{lng}}'\n\t}\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (i18next__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/i18n.jsx?");

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ \"./src/header.jsx\");\n/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer */ \"./src/footer.jsx\");\n/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./creator */ \"./src/creator.jsx\");\n/* harmony import */ var _not_found__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./not-found */ \"./src/not-found.jsx\");\n/* harmony import */ var _coffee_public_coffee__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./coffee/public.coffee */ \"./src/coffee/public.coffee\");\n/* harmony import */ var _coffee_public_coffee__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_coffee_public_coffee__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _sass_public_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sass/public.scss */ \"./src/sass/public.scss\");\n/* harmony import */ var _sass_public_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_sass_public_scss__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst routes = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\treact_i18next__WEBPACK_IMPORTED_MODULE_2__[\"NamespacesConsumer\"],\n\tnull,\n\tt => {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"BrowserRouter\"],\n\t\t\tnull,\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,\n\t\t\t\tnull,\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Switch\"],\n\t\t\t\t\tnull,\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], { exact: true, path: SiteSettings.path, component: _creator__WEBPACK_IMPORTED_MODULE_6__[\"default\"] }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], { exact: true, path: SiteSettings.path + 'creator', component: _creator__WEBPACK_IMPORTED_MODULE_6__[\"default\"] }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], { path: '*', component: _not_found__WEBPACK_IMPORTED_MODULE_7__[\"default\"] })\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n);\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(routes, document.getElementById('page'));\n\n//# sourceURL=webpack:///./src/index.jsx?");

/***/ }),

/***/ "./src/left.jsx":
/*!**********************!*\
  !*** ./src/left.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jsonschema-form */ \"./node_modules/react-jsonschema-form/lib/index.js\");\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var validator_lib_isUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! validator/lib/isUrl */ \"./node_modules/validator/lib/isUrl.js\");\n/* harmony import */ var validator_lib_isUrl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isUrl__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n/* harmony import */ var _schema_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schema.jsx */ \"./src/schema.jsx\");\n/* harmony import */ var _ui_schema_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui-schema.jsx */ \"./src/ui-schema.jsx\");\n/* harmony import */ var _widgets_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widgets.jsx */ \"./src/widgets.jsx\");\n\n\n\n\n\n\n\n\n\n\nclass Left extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tmediaData: this.props.mediaData\n\t\t};\n\t\tthis.onChange = this.onChange.bind(this);\n\t}\n\n\tcomponentDidMount() {}\n\n\tcomponentWillUnmount() {}\n\n\tcomponentDidUpdate(prevProps, prevState, snapshot) {}\n\n\tonFocus(id) {\n\t\tconst slug = id.split('_')[1];\n\t\tthis.setState({ activeCorner: slug });\n\t\tthis.props.sendActiveCorner(slug);\n\t}\n\n\tonBlur(id) {}\n\n\tgetMediaData(url, type, corner, index) {\n\t\tif (!validator_lib_isUrl__WEBPACK_IMPORTED_MODULE_3___default()(url)) {\n\t\t\treturn;\n\t\t}\n\t\tconst that = this;\n\t\tconst uri = encodeURIComponent(url);\n\t\tconst mediaData = Object.assign({}, this.state.mediaData);\n\t\tlet req = '';\n\t\tswitch (type) {\n\t\t\tcase 'youtube':\n\t\t\t\treq = 'https://www.youtube.com/oembed?url=' + uri;\n\t\t\t\tbreak;\n\t\t\tcase 'vimeo':\n\t\t\t\treq = 'https://vimeo.com/api/oembed.json?url=' + uri;\n\t\t\t\tbreak;\n\t\t\tcase 'soundcloud':\n\t\t\t\treq = 'https://soundcloud.com/oembed?format=json&url=' + uri;\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\treturn false;\n\t\t\t\tbreak;\n\t\t}\n\t\tfetch(req).then(res => {\n\t\t\tconsole.log(res);\n\t\t\tif (!res.ok) {\n\t\t\t\tthrow Error(res.statusText);\n\t\t\t}\n\t\t\treturn res.json();\n\t\t}).then(res => {\n\t\t\tconsole.log(res);\n\t\t\tmediaData[corner][index] = {\n\t\t\t\thtml: res.html,\n\t\t\t\twidth: res.width,\n\t\t\t\theight: res.height\n\t\t\t};\n\t\t\tthis.setState({ mediaData: mediaData });\n\t\t\tthis.props.sendMediaData(mediaData);\n\t\t}).catch(function (err) {\n\t\t\tconsole.log(err);\n\t\t});\n\t}\n\n\tonChange(e) {\n\t\tconst formData = e.formData;\n\t\tconst formDataKeys = Object.keys(formData);\n\t\tconst mediaData = Object.assign({}, this.props.mediaData);\n\t\tfor (let key of formDataKeys) {\n\t\t\tif (formData[key] && formData[key].media) {\n\t\t\t\tfor (let index of formData[key].media.keys()) {\n\t\t\t\t\tconst media = formData[key].media[index];\n\t\t\t\t\tconst url = media.url;\n\t\t\t\t\tconst type = media.type;\n\t\t\t\t\tif (!mediaData[key]) {\n\t\t\t\t\t\tmediaData[key] = [];\n\t\t\t\t\t}\n\t\t\t\t\tif (!mediaData[key][index]) {\n\t\t\t\t\t\tmediaData[key][index] = '';\n\t\t\t\t\t\t// this.props.sendMediaData(mediaData);\n\t\t\t\t\t\tthis.setState({ mediaData: mediaData });\n\t\t\t\t\t}\n\t\t\t\t\tif (url && type) {\n\t\t\t\t\t\tthis.getMediaData(url, type, key, index);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tconst newData = Object.assign(this.props.formData, formData);\n\t\tthis.props.sendFormData(e.formData);\n\t}\n\n\tonError(e) {\n\t\t// console.log('Error', e);\n\t}\n\n\ttranslateSchema(schema) {\n\t\tlet lang = this.state.lang;\n\t\tconst schemaObjs = Object.assign({}, schema);\n\t\tconst groupKeys = Object.keys(schema.properties);\n\t\tconst creator = this.props.creator;\n\t\tconst fields = creator.acf;\n\t\tfor (let groupKey of groupKeys) {\n\t\t\tlet schemaObj = schema.properties[groupKey];\n\t\t\tconst titleKey = [groupKey, 'title'].join('_');\n\t\t\tschemaObj.title = fields[titleKey];\n\t\t\tconst descKey = [groupKey, 'desc'].join('_');\n\t\t\tschemaObj.description = fields[descKey];\n\t\t\tconst props = schemaObj.properties;\n\t\t\tif (props) {\n\t\t\t\tconst propKeys = Object.keys(props);\n\t\t\t\tfor (let propKey of propKeys) {\n\t\t\t\t\t//Text fields\n\t\t\t\t\tconst fieldTitleKey = [groupKey, propKey, 'label'].join('_');\n\t\t\t\t\tif (fields.hasOwnProperty(fieldTitleKey)) {\n\t\t\t\t\t\tconst fieldTitle = fields[fieldTitleKey];\n\t\t\t\t\t\tschemaObj.properties[propKey].title = fieldTitle;\n\t\t\t\t\t}\n\t\t\t\t\tconst fieldDescKey = [groupKey, propKey, 'desc'].join('_');\n\t\t\t\t\tif (fields.hasOwnProperty(fieldDescKey)) {\n\t\t\t\t\t\tconst fieldDescLabel = fields[fieldDescKey];\n\t\t\t\t\t\tschemaObj.properties[propKey].description = fieldDescLabel;\n\t\t\t\t\t}\n\t\t\t\t\t//Select fields\n\t\t\t\t\tif (props[propKey].hasOwnProperty('enum')) {\n\t\t\t\t\t\tconst fieldOptionsKey = [groupKey, propKey, 'options'].join('_');\n\t\t\t\t\t\tconst fieldOptions = fields[fieldOptionsKey];\n\t\t\t\t\t\tschemaObj.properties[propKey].enum = [];\n\t\t\t\t\t\tif (fieldOptions) {\n\t\t\t\t\t\t\tfor (let fieldOption of fieldOptions) {\n\t\t\t\t\t\t\t\tconst fieldValue = fieldOption.label + (fieldOption.desc ? ': ' + fieldOption.desc : '');\n\t\t\t\t\t\t\t\tschemaObj.properties[propKey].enum.push(fieldValue);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tschemaObj.properties[propKey].enum.push('Custom');\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t//Repeater fields\n\t\t\t\t\tif (props[propKey].type == 'array') {\n\t\t\t\t\t\tconst nestedProps = props[propKey].items.properties;\n\t\t\t\t\t\tconst nestedPropKeys = Object.keys(nestedProps);\n\t\t\t\t\t\tfor (let nestedProp of nestedPropKeys) {\n\t\t\t\t\t\t\tconst nestedPropKey = [groupKey, nestedProp, 'label'].join('_');\n\t\t\t\t\t\t\tif (fields.hasOwnProperty(nestedPropKey)) {\n\t\t\t\t\t\t\t\tconst nestedPropLabel = fields[nestedPropKey];\n\t\t\t\t\t\t\t\tschemaObj.properties[propKey].items.properties[nestedProp].title = nestedPropLabel;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tschemaObjs.properties[groupKey] = schemaObj;\n\t\t}\n\t\treturn schemaObjs;\n\t}\n\n\trenderForm() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'col-inner' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ id: 'forms', className: 'half-max-width' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\treact_jsonschema_form__WEBPACK_IMPORTED_MODULE_2___default.a,\n\t\t\t\t\t{\n\t\t\t\t\t\tschema: this.translateSchema(_schema_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n\t\t\t\t\t\tuiSchema: _ui_schema_jsx__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n\t\t\t\t\t\t// widgets={Widgets}\n\t\t\t\t\t\t// ArrayFieldTemplate={Widgets.ArrayFieldTemplate}\n\t\t\t\t\t\t, formData: this.props.formData,\n\t\t\t\t\t\tliveValidate: true,\n\t\t\t\t\t\tonFocus: this.onFocus.bind(this),\n\t\t\t\t\t\tonBlur: this.onBlur.bind(this),\n\t\t\t\t\t\tonChange: this.onChange,\n\t\t\t\t\t\tonError: this.onError },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', { type: 'submit', hidden: true }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'button',\n\t\t\t\t\t\t{ type: 'button', className: 'btn' },\n\t\t\t\t\t\t'Add content in another language'\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n\trender() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,\n\t\t\tnull,\n\t\t\tthis.renderForm()\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Left);\n\n//# sourceURL=webpack:///./src/left.jsx?");

/***/ }),

/***/ "./src/not-found.jsx":
/*!***************************!*\
  !*** ./src/not-found.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst NotFound = () => {\n\treturn React.createElement(\n\t\t\"div\",\n\t\tnull,\n\t\tReact.createElement(\n\t\t\t\"div\",\n\t\t\t{ className: \"container\" },\n\t\t\tReact.createElement(\n\t\t\t\t\"h1\",\n\t\t\t\tnull,\n\t\t\t\t\"Not Found\"\n\t\t\t)\n\t\t)\n\t);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (NotFound);\n\n//# sourceURL=webpack:///./src/not-found.jsx?");

/***/ }),

/***/ "./src/right.jsx":
/*!***********************!*\
  !*** ./src/right.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-jsonschema-form */ \"./node_modules/react-jsonschema-form/lib/index.js\");\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsonschema_form__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dropzone */ \"./node_modules/react-dropzone/dist/es/index.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"./node_modules/react-dom/server.browser.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n/* harmony import */ var _embed_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./embed.jsx */ \"./src/embed.jsx\");\n\n\n\n\n\n\n\n\nlet placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';\n// placeholderSrc = 'https://i.guim.co.uk/img/media/fe09d503213527013ae12c489ad7b473f35e7a8c/0_0_6720_4480/master/6720.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=c23858bc511a0bc8ec8c6ab52687b6b2';\n\nclass Right extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\timgLoaded: false,\n\t\t\timgFocus: false,\n\t\t\timgSrc: placeholderSrc,\n\t\t\tincludeCss: false,\n\t\t\tincludeJs: false,\n\t\t\tstickyStyle: {}\n\t\t\t// activeCorner: this.props.activeCorner\n\t\t};\n\t\tthis.imgInputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.outputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.includeJSRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.includeCSSRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.stickyRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t}\n\n\tcomponentDidMount() {\n\t\twindow.addEventListener('scroll', this.onScroll.bind(this));\n\t\twindow.addEventListener('resize', this.onScroll.bind(this));\n\t}\n\n\tcomponentWillUnmount() {\n\t\twindow.removeEventListener('scroll', this.onScroll.bind(this));\n\t\twindow.removeEventListener('resize', this.onScroll.bind(this));\n\t}\n\n\tshouldComponentUpdate(nextProps, nextState) {\n\t\t// console.log(nextProps);\n\t\treturn true;\n\t}\n\n\tcomponentDidUpdate(prevProps) {}\n\n\tonDropLoad(e) {\n\t\t// console.log('Image Loaded');\n\t\t// this.setState({ imgLoaded: 'loaded' });\n\t}\n\n\tonDropError(e) {\n\t\t// console.log('Image Failed'); \n\t\t// this.setState({ imgLoaded: 'failed' });\n\t}\n\n\tonChangeDrop(e) {\n\t\tlet imgSrc = e.target.value;\n\t\tlet pseudoImg = new Image();\n\t\tpseudoImg.onload = e => {\n\t\t\t// window.FOURCORNERS[0].closeCorner(this.state.activeCorner);\n\t\t\tthis.setState({\n\t\t\t\timgSrc: imgSrc,\n\t\t\t\timgLoaded: true\n\t\t\t});\n\t\t};\n\t\tpseudoImg.onerror = e => {\n\t\t\tthis.setState({\n\t\t\t\timgSrc: placeholderSrc,\n\t\t\t\timgLoaded: false\n\t\t\t});\n\t\t};\n\t\tpseudoImg.src = imgSrc;\n\t}\n\n\tonDrop(file) {\n\t\tlet imgSrc = URL.createObjectURL(file[0]);\n\t\tthis.setState({\n\t\t\timgSrc: imgSrc,\n\t\t\timgLoaded: true,\n\t\t\timgFocus: false\n\t\t});\n\t}\n\n\tonFocusDrop(e) {\n\t\tthis.setState({\n\t\t\timgFocus: true\n\t\t});\n\t}\n\n\tonBlurDrop(e) {\n\t\tthis.setState({\n\t\t\timgFocus: false\n\t\t});\n\t}\n\n\tonChangeOpts(e) {\n\t\tlet stateChange = {\n\t\t\tformData: this.props.formData\n\t\t};\n\t\tstateChange[e.target.id] = e.target.checked;\n\t\tthis.setState(stateChange);\n\t}\n\n\tonFocus(e) {\n\t\te.target.setSelectionRange(0, e.target.value.length);\n\t}\n\n\tonBlur(e) {}\n\n\tonError(e) {\n\t\tconsole.log('Error', e);\n\t}\n\n\tonScroll(e) {\n\t\tconst sticky = this.stickyRef.current;\n\t\tconst parent = sticky.parentElement;\n\t\tconst rect = parent.getBoundingClientRect();\n\t\tconst width = rect.width;\n\t\tconst height = window.innerHeight;\n\t\tconst top = rect.top;\n\t\tlet stickyStyle = {};\n\t\tif (top <= 60) {\n\t\t\tstickyStyle = {\n\t\t\t\twidth: width + 'px',\n\t\t\t\theight: '100%',\n\t\t\t\tposition: 'fixed',\n\t\t\t\ttop: 0,\n\t\t\t\tright: 0,\n\t\t\t\tpaddingTop: '60px'\n\t\t\t};\n\t\t}\n\t\tthis.setState({\n\t\t\tstickyStyle: stickyStyle\n\t\t});\n\t}\n\n\tembedCode(formData) {\n\t\tlet auxData = {\n\t\t\tlang: _i18n_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"].language,\n\t\t\timg: this.state.imgLoaded ? this.state.imgSrc : undefined\n\t\t};\n\t\tconst jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';\n\t\tconst cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';\n\t\tObject.assign(formData, auxData);\n\t\tconst stringData = JSON.stringify(formData);\n\t\tlet stringHtml = '';\n\t\tstringHtml += this.state.includeJs ? '<script src=' + jsCDN + ' type=\"text/javascript\"></script>' : '';\n\t\tstringHtml += this.state.includeCss ? '<link href=\"' + cssCDN + '\" rel=\"stylesheet\" type=\"text/css\">' : '';\n\t\tstringHtml += Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__[\"renderToStaticMarkup\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'fc-embed', 'data-fc': stringData }));\n\t\tconst decodedHtml = stringHtml.replace(/(&quot\\;)/g, \"\\'\").replace(/(&amp\\;)/g, \"&\");\n\t\treturn decodedHtml;\n\t}\n\n\trender() {\n\t\tconst fields = this.props.creator.acf;\n\t\tconst entries = ['story', 'author', 'publication', 'url', 'date'];\n\t\tconst inputClass = this.state.imgLoaded ? 'has-image' : '';\n\t\tconst formGroupClass = 'form-group' + (this.state.imgLoaded ? '' : ' card') + (this.state.imgFocus ? ' focus' : '');\n\t\tconst dropClass = 'drop' + (this.state.imgLoaded ? ' under card' : ' over');\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'col-inner' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'sticky', style: this.state.stickyStyle, ref: this.stickyRef },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'half-max-width' },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'legend',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\tfields['photo_title']\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'field-description' },\n\t\t\t\t\t\tfields['photo_desc']\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ id: 'embedder' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ id: 'embed-input', className: inputClass },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: formGroupClass },\n\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_embed_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n\t\t\t\t\t\t\t\t\tcreator: this.props.creator,\n\t\t\t\t\t\t\t\t\timgSrc: this.state.imgSrc,\n\t\t\t\t\t\t\t\t\timgLoaded: this.state.imgLoaded,\n\t\t\t\t\t\t\t\t\tformData: this.props.formData,\n\t\t\t\t\t\t\t\t\tmediaData: this.props.mediaData,\n\t\t\t\t\t\t\t\t\tactiveCorner: this.props.activeCorner\n\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: dropClass },\n\t\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropzone__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n\t\t\t\t\t\t\t\t\t\tclassName: 'drop-zone',\n\t\t\t\t\t\t\t\t\t\tref: this.imgInputRef,\n\t\t\t\t\t\t\t\t\t\tstyle: {},\n\t\t\t\t\t\t\t\t\t\taccept: 'image/jpeg, image/png, image/gif',\n\t\t\t\t\t\t\t\t\t\tmultiple: false,\n\t\t\t\t\t\t\t\t\t\tonDrop: this.onDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonClick: this.onFocusDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonMouseEnter: this.onFocusDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonMouseLeave: this.onBlurDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonDragEnter: this.onFocusDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonDragLeave: this.onBlurDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonFileDialogCancel: this.onBlurDrop.bind(this),\n\t\t\t\t\t\t\t\t\t\tonBlur: this.onBlurDrop.bind(this)\n\t\t\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\t\t\tthis.state.imgLoaded ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t\t{ className: 'label-text' },\n\t\t\t\t\t\t\t\t\t\tfields['drag_drop']\n\t\t\t\t\t\t\t\t\t) : ''\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t!this.state.imgLoaded ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'label-text' },\n\t\t\t\t\t\t\t\t\tfields['drag_drop']\n\t\t\t\t\t\t\t\t) : ''\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t{ className: 'form-group image-src' },\n\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'form-control',\n\t\t\t\t\t\t\t\t\tid: 'image-src-url',\n\t\t\t\t\t\t\t\t\tname: 'src',\n\t\t\t\t\t\t\t\t\tplaceholder: fields['copy_paste'],\n\t\t\t\t\t\t\t\t\tonChange: this.onChangeDrop.bind(this),\n\t\t\t\t\t\t\t\t\tonFocus: this.onFocus.bind(this),\n\t\t\t\t\t\t\t\t\tonBlur: this.onBlur.bind(this)\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ id: 'embed-output' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'legend',\n\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\tthis.props.creator.acf['embed_title']\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'p',\n\t\t\t\t\t\t\t\t{ className: 'field-description' },\n\t\t\t\t\t\t\t\tfields['embed_desc']\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('textarea', { className: 'output form-control',\n\t\t\t\t\t\t\t\tid: 'json',\n\t\t\t\t\t\t\t\treadOnly: true,\n\t\t\t\t\t\t\t\tref: this.outputRef,\n\t\t\t\t\t\t\t\trows: 5,\n\t\t\t\t\t\t\t\tvalue: this.embedCode(this.props.formData),\n\t\t\t\t\t\t\t\tonFocus: this.onFocus.bind(this),\n\t\t\t\t\t\t\t\tonBlur: this.onBlur.bind(this)\n\t\t\t\t\t\t\t}),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'form',\n\t\t\t\t\t\t\t\t{ name: 'embed-opts', onChange: this.onChangeOpts.bind(this) },\n\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t\t\t'Embed Options'\n\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t\t\t{ className: 'embed-opts checkboxes' },\n\t\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\t\t\t\t{ className: 'control-label', htmlFor: 'includeJs' },\n\t\t\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'embed-opt',\n\t\t\t\t\t\t\t\t\t\t\tid: 'includeJs',\n\t\t\t\t\t\t\t\t\t\t\tname: 'includeJs',\n\t\t\t\t\t\t\t\t\t\t\ttype: 'checkbox',\n\t\t\t\t\t\t\t\t\t\t\tdefaultChecked: this.state.includeJs }),\n\t\t\t\t\t\t\t\t\t\t'\\xA0Include JavaScript file'\n\t\t\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\t\t\t\t{ className: 'control-label', htmlFor: 'includeCss' },\n\t\t\t\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'embed-opt',\n\t\t\t\t\t\t\t\t\t\t\tid: 'includeCss',\n\t\t\t\t\t\t\t\t\t\t\tname: 'includeCss',\n\t\t\t\t\t\t\t\t\t\t\ttype: 'checkbox',\n\t\t\t\t\t\t\t\t\t\t\tdefaultChecked: this.state.includeCss }),\n\t\t\t\t\t\t\t\t\t\t'\\xA0Include CSS file'\n\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Right);\n\n//# sourceURL=webpack:///./src/right.jsx?");

/***/ }),

/***/ "./src/sass/public.scss":
/*!******************************!*\
  !*** ./src/sass/public.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/public.scss?");

/***/ }),

/***/ "./src/schema.jsx":
/*!************************!*\
  !*** ./src/schema.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// https://mozilla-services.github.io/react-jsonschema-form/\n// https://github.com/mozilla-services/react-jsonschema-form/\n\nconst Schema = {\n\ttitle: '',\n\ttype: 'object',\n\tproperties: {\n\t\t// copyright: {\n\t\t// \ttitle: '',\n\t\t// \ttype: 'object',\n\t\t// \trequired: [],\n\t\t// \tproperties: {\n\t\t// \t\tcredit: {\n\t\t// \t\t\ttype: 'string',\n\t\t// \t\t},\n\t\t// \t\tcaption: {\n\t\t// \t\t\ttype: 'string',\n\t\t// \t\t},\n\t\t// \t\tcopyright: {\n\t\t// \t\t\ttype: 'string',\n\t\t// \t\t\tenum: [],\n\t\t// \t\t},\n\t\t// \t\tethics: {\n\t\t// \t\t\ttype: 'string',\n\t\t// \t\t\tenum: [],\n\t\t// \t\t}\n\t\t// \t}\n\t\t// },\n\t\tcontext: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tstory: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\tmedia: {\n\t\t\t\t\ttitle: '',\n\t\t\t\t\ttype: 'array',\n\t\t\t\t\titems: {\n\t\t\t\t\t\ttype: 'object',\n\t\t\t\t\t\tproperties: {\n\t\t\t\t\t\t\ttype: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tenum: ['image', 'youtube', 'vimeo', 'soundcloud'],\n\t\t\t\t\t\t\t\tenumNames: ['Image', 'YouTube', 'Vimeo', 'SoundCloud']\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\turl: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tformat: 'uri'\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tcredit: {\n\t\t\t\t\t\t\t\ttype: 'string'\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tbackstory: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tstory: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\tmedia: {\n\t\t\t\t\ttitle: '',\n\t\t\t\t\ttype: 'array',\n\t\t\t\t\titems: {\n\t\t\t\t\t\ttype: 'object',\n\t\t\t\t\t\tproperties: {\n\t\t\t\t\t\t\ttype: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tenum: ['image', 'youtube', 'vimeo', 'soundcloud'],\n\t\t\t\t\t\t\t\tenumNames: ['Image', 'YouTube', 'Vimeo', 'SoundCloud']\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\turl: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tformat: 'uri'\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tcredit: {\n\t\t\t\t\t\t\t\ttype: 'string'\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tlinks: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tlinks: {\n\t\t\t\t\ttype: 'array',\n\t\t\t\t\tminItems: 0,\n\t\t\t\t\titems: {\n\t\t\t\t\t\ttype: 'object',\n\t\t\t\t\t\tproperties: {\n\t\t\t\t\t\t\ttitle: {\n\t\t\t\t\t\t\t\ttype: 'string'\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\turl: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tformat: 'uri'\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Schema);\n\n//# sourceURL=webpack:///./src/schema.jsx?");

/***/ }),

/***/ "./src/ui-schema.jsx":
/*!***************************!*\
  !*** ./src/ui-schema.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// https://mozilla-services.github.io/react-jsonschema-form/\n// https://github.com/mozilla-services/react-jsonschema-form/\n\n\n// const MyCustomWidget = (props) => {\n//   return (\n//     <input type=\"text\"\n//       className=\"custom\"\n//       value={props.value}\n//       required={props.required}\n//       onChange={(event) => props.onChange(event.target.value)} />\n//   );\n// };\n\n// const widgets = {\n//   myCustomWidget: MyCustomWidget\n// };\n\nconst uiSchema = {\n\tcopyright: {\n\t\tcaption: {\n\t\t\t'ui:widget': 'textarea',\n\t\t\t'ui:options': {\n\t\t\t\trows: 5\n\t\t\t}\n\t\t}\n\t},\n\tbackstory: {\n\t\tstory: {\n\t\t\t'ui:widget': 'textarea',\n\t\t\t'ui:options': {\n\t\t\t\trows: 5\n\t\t\t}\n\t\t}\n\t},\n\tcontext: {\n\t\tcustom: {\n\t\t\t'ui:widget': 'myCustomWidget'\n\t\t},\n\t\tstory: {\n\t\t\t'ui:widget': 'textarea',\n\t\t\t'ui:options': {\n\t\t\t\trows: 5\n\t\t\t}\n\t\t}\n\t}\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (uiSchema);\n\n//# sourceURL=webpack:///./src/ui-schema.jsx?");

/***/ }),

/***/ "./src/widgets.jsx":
/*!*************************!*\
  !*** ./src/widgets.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst UrlInput = props => {\n\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {\n\t\ttype: 'url',\n\t\tclassName: '',\n\t\tvalue: props.value,\n\t\trequired: props.required,\n\t\tonChange: event => props.onChangeUrl(event.target.value) });\n};\n\nfunction ArrayFieldTemplate(props) {\n\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t'div',\n\t\t{ className: props.className },\n\t\tprops.items && props.items.map(element => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ key: element.index },\n\t\t\tconsole.log(element.children),\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\tnull,\n\t\t\t\telement.children\n\t\t\t),\n\t\t\telement.hasMoveDown && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'button',\n\t\t\t\t{\n\t\t\t\t\tclassName: 'btn',\n\t\t\t\t\tonClick: element.onReorderClick(element.index, element.index + 1) },\n\t\t\t\t'Move Down'\n\t\t\t),\n\t\t\telement.hasMoveUp && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'button',\n\t\t\t\t{\n\t\t\t\t\tclassName: 'btn',\n\t\t\t\t\tonClick: element.onReorderClick(element.index, element.index - 1) },\n\t\t\t\t'Move Up'\n\t\t\t),\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'button',\n\t\t\t\t{ className: 'btn', onClick: element.onDropIndexClick(element.index) },\n\t\t\t\t'Delete'\n\t\t\t)\n\t\t)),\n\t\tprops.canAdd && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'row' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'p',\n\t\t\t\t{ className: 'col-xs-3 col-xs-offset-9 array-item-add text-right' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'button',\n\t\t\t\t\t{ className: 'btn', onClick: props.onAddClick, type: 'button' },\n\t\t\t\t\t'Add New'\n\t\t\t\t)\n\t\t\t)\n\t\t)\n\t);\n}\n\nconst Widgets = {\n\turlInput: UrlInput,\n\tArrayFieldTemplate: ArrayFieldTemplate\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Widgets);\n\n//# sourceURL=webpack:///./src/widgets.jsx?");

/***/ })

/******/ });