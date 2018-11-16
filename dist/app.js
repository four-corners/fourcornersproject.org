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

/***/ "./src/creator.jsx":
/*!*************************!*\
  !*** ./src/creator.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-jsonschema-form */ \"./node_modules/react-jsonschema-form/lib/index.js\");\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsonschema_form__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _header_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header.jsx */ \"./src/header.jsx\");\n/* harmony import */ var _embed_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./embed.jsx */ \"./src/embed.jsx\");\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n/* harmony import */ var _schema_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./schema.jsx */ \"./src/schema.jsx\");\n/* harmony import */ var _ui_schema_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui-schema.jsx */ \"./src/ui-schema.jsx\");\n\n\n\n\n\n\n\n\n\n// import Forms from './forms.jsx';\n\nclass Creator extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tcreator: {},\n\t\t\tlang: 'en',\n\t\t\tformData: {}\n\t\t};\n\t\tthis.onLanguageChanged = this.onLanguageChanged.bind(this);\n\t\tthis.onChange = this.onChange.bind(this);\n\t\tthis.outputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t}\n\n\tcomponentDidMount() {\n\t\tlet that = this;\n\t\tlet url = window.location.href.split('/');\n\t\tlet lang = _i18n_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"].language;\n\t\tlet req = SiteSettings.url.api + 'creators?lang=' + lang;\n\t\tfetch(req).then(function (res) {\n\t\t\tif (!res.ok) {\n\t\t\t\tthrow Error(res.statusText);\n\t\t\t}\n\t\t\treturn res.json();\n\t\t}).then(function (res) {\n\t\t\tthat.setState({ creator: res[0] });\n\t\t});\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"].on('languageChanged', this.onLanguageChanged);\n\t}\n\n\tcomponentWillUnmount() {\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"].off('languageChanged', this.onLanguageChanged);\n\t}\n\n\tcomponentDidUpdate() {}\n\n\tonLanguageChanged(lang) {\n\t\tthis.setState({\n\t\t\tlang: lang\n\t\t});\n\t}\n\n\ttranslateSchema(schema) {\n\t\tconst schemaObjs = Object.assign({}, schema);\n\t\tconst groupKeys = Object.keys(schema.properties);\n\t\tfor (let groupKey of groupKeys) {\n\t\t\tlet schemaObj = schema.properties[groupKey];\n\t\t\tconst creator = this.state.creator;\n\t\t\tconst fields = creator.acf;\n\t\t\tconst titleKey = [groupKey, 'title'].join('_');\n\t\t\tconst title = fields[titleKey];\n\t\t\tconst props = schemaObj.properties;\n\t\t\tschemaObj.title = title;\n\t\t\tif (props) {\n\t\t\t\tconst propKeys = Object.keys(props);\n\t\t\t\tfor (let propKey of propKeys) {\n\t\t\t\t\tconst fieldTitleKey = [groupKey, propKey, 'label'].join('_');\n\t\t\t\t\tif (fields.hasOwnProperty(fieldTitleKey)) {\n\t\t\t\t\t\tconst fieldTitle = fields[fieldTitleKey];\n\t\t\t\t\t\tschemaObj.properties[propKey].title = fieldTitle;\n\t\t\t\t\t}\n\t\t\t\t\tconst fieldDescKey = [groupKey, propKey, 'desc'].join('_');\n\t\t\t\t\tif (fields.hasOwnProperty(fieldDescKey)) {\n\t\t\t\t\t\tconst fieldDescLabel = fields[fieldDescKey];\n\t\t\t\t\t\tschemaObj.properties[propKey].description = fieldDescLabel;\n\t\t\t\t\t}\n\t\t\t\t\t//Collect options for selector\n\t\t\t\t\tif (props[propKey].hasOwnProperty('enum')) {\n\t\t\t\t\t\tconst fieldOptionsKey = [groupKey, propKey, 'options'].join('_');\n\t\t\t\t\t\tconst fieldOptions = fields[fieldOptionsKey];\n\t\t\t\t\t\tif (fieldOptions) {\n\t\t\t\t\t\t\tfor (let fieldOption of fieldOptions) {\n\t\t\t\t\t\t\t\tconst fieldValue = fieldOption.label + (fieldOption.desc ? ': ' + fieldOption.desc : '');\n\t\t\t\t\t\t\t\tschemaObj.properties[propKey].enum.push(fieldValue);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tif (props[propKey].type == 'array') {\n\t\t\t\t\t\tconst nestedProps = props[propKey].items.properties;\n\t\t\t\t\t\tconst nestedPropKeys = Object.keys(nestedProps);\n\t\t\t\t\t\tfor (let nestedProp of nestedPropKeys) {\n\t\t\t\t\t\t\tconst nestedPropKey = [groupKey, nestedProp, 'label'].join('_');\n\t\t\t\t\t\t\tif (fields.hasOwnProperty(nestedPropKey)) {\n\t\t\t\t\t\t\t\tconst nestedPropLabel = fields[nestedPropKey];\n\t\t\t\t\t\t\t\tschemaObj.properties[propKey].items.properties[nestedProp].title = nestedPropLabel;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tschemaObjs.properties[groupKey] = schemaObj;\n\t\t}\n\t\treturn schemaObjs;\n\t}\n\n\trenderCreator() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ id: 'forms' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\treact_jsonschema_form__WEBPACK_IMPORTED_MODULE_2___default.a,\n\t\t\t\t{\n\t\t\t\t\tschema: this.translateSchema(_schema_jsx__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n\t\t\t\t\tuiSchema: _ui_schema_jsx__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n\t\t\t\t\tformData: this.state.formData,\n\t\t\t\t\tonChange: this.onChange,\n\t\t\t\t\tonSubmit: this.onSubmit,\n\t\t\t\t\tonError: this.onError },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('button', { type: 'submit', hidden: true }),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'button',\n\t\t\t\t\t{ type: 'button', className: 'btn' },\n\t\t\t\t\t'Add content in another language'\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n\trenderEmbed() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_embed_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { formData: this.state.formData, lang: this.state.lang });\n\t}\n\n\trenderEmpty() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'loader' });\n\t}\n\n\tonChange(e) {\n\t\tconst formData = Object.assign(this.state.formData, e.formData);\n\t\tthis.setState({ formData: formData });\n\t}\n\n\tonSubmit(e) {\n\t\t// console.log('Submit', e);\n\t}\n\n\tonError(e) {\n\t\t// console.log('Error', e);\n\t}\n\n\trender() {\n\t\tlet lang = this.state.lang;\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ id: 'creator', className: 'container' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'row' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'col-6' },\n\t\t\t\t\tthis.state.creator.ID ? this.renderCreator() : this.renderEmpty()\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'col-6' },\n\t\t\t\t\tthis.state.creator.ID ? this.renderEmbed() : this.renderEmpty()\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Creator);\n\n//# sourceURL=webpack:///./src/creator.jsx?");

/***/ }),

/***/ "./src/embed.jsx":
/*!***********************!*\
  !*** ./src/embed.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-jsonschema-form */ \"./node_modules/react-jsonschema-form/lib/index.js\");\n/* harmony import */ var react_jsonschema_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsonschema_form__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"./node_modules/react-dom/server.browser.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n/* harmony import */ var _entry_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entry.jsx */ \"./src/entry.jsx\");\n\n\n\n\n\n\n\nlet placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';\n\nclass Embed extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\timageLoaded: false,\n\t\t\timgSrc: placeholderSrc,\n\t\t\tposition: 'static',\n\t\t\tincludeCSS: false,\n\t\t\tincludeJS: false\n\t\t};\n\t\tthis.inputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.outputRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.includeJSRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.includeCSSRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.colInnerRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\t\tthis.embedderRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();\n\n\t\t// this.handleClick = this.handleClick.bind(this);\n\t}\n\n\tcomponentDidMount() {\n\t\tthis.onScroll = this.onScroll.bind(this);\n\t\twindow.addEventListener('scroll', this.onScroll);\n\t}\n\n\tcomponentDidUpdate(prevProps) {\n\t\t// if (this.props.imgSrc !== prevProps.imgSrc) {\n\t\t// }\n\t}\n\n\tonImageLoad(e) {\n\t\t// console.log('Image Loaded');\n\t\t// this.setState({ imageLoaded: 'loaded' });\n\t}\n\n\tonImageError(e) {\n\t\t// console.log('Image Failed'); \n\t\t// this.setState({ imageLoaded: 'failed' });\n\t}\n\n\tonChangeImage(e) {\n\t\tlet imgSrc = e.target.value;\n\t\tlet pseudoImg = new Image();\n\t\tpseudoImg.onload = () => {\n\t\t\tthis.setState({\n\t\t\t\timgSrc: imgSrc,\n\t\t\t\timageLoaded: true\n\t\t\t});\n\t\t};\n\t\tpseudoImg.onerror = () => {\n\t\t\tthis.setState({\n\t\t\t\timgSrc: placeholderSrc,\n\t\t\t\timageLoaded: false\n\t\t\t});\n\t\t};\n\t\tpseudoImg.src = imgSrc;\n\t}\n\n\tonChangeOpts(e) {\n\t\tconsole.log(e.target.id);\n\t\tlet stateChange = {\n\t\t\tformData: this.props.formData\n\t\t};\n\t\tstateChange[e.target.id] = e.target.checked;\n\t\tthis.setState(stateChange);\n\t}\n\n\tonFocus(e) {\n\t\te.target.setSelectionRange(0, e.target.value.length);\n\t}\n\n\tonBlur(e) {}\n\n\tonSubmit(e) {\n\t\tconsole.log('Submit', e);\n\t}\n\n\tonError(e) {\n\t\tconsole.log('Error', e);\n\t}\n\n\tonScroll(e) {}\n\n\tcreateEmbedCode(formData) {\n\t\tlet auxData = {\n\t\t\tlang: _i18n_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"].language,\n\t\t\timg: this.state.imageLoaded ? this.state.imgSrc : undefined\n\t\t};\n\t\tconst jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';\n\t\tconst cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';\n\t\tObject.assign(formData, auxData);\n\t\tconst stringData = JSON.stringify(formData);\n\t\tlet stringHtml = '';\n\t\tstringHtml += this.state.includeJS ? '<script src=' + jsCDN + ' type=\"text/javascript\"></script>' : '';\n\t\tstringHtml += this.state.includeCSS ? '<link href=\"' + cssCDN + '\" rel=\"stylesheet\" type=\"text/css\">' : '';\n\t\tstringHtml += Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__[\"renderToStaticMarkup\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { className: 'fc_embed', 'data-fc': stringData }));\n\t\tconst decodedHtml = stringHtml.replace(/(&quot\\;)/g, \"\\'\").replace(/(&amp\\;)/g, \"&\");\n\t\treturn decodedHtml;\n\t}\n\n\trender() {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'col-inner', ref: this.colInnerRef },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ id: 'embedder', className: this.state.position, ref: this.embedderRef },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ id: 'embed', className: 'card' },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('img', {\n\t\t\t\t\t\tsrc: this.state.imgSrc,\n\t\t\t\t\t\tonLoad: this.onImageLoad.bind(this),\n\t\t\t\t\t\tonError: this.onImageError.bind(this)\n\t\t\t\t\t}),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { 'data-id': 'backstory', className: 'corner tl' }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { 'data-id': 'copyright', className: 'corner tr' }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { 'data-id': 'media', className: 'corner br' }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', { 'data-id': 'links', className: 'corner bl' }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ id: 'backstory', className: 'cornerContent' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'h1',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Backstory'\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_entry_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], { formData: this.props.formData.backstory, slug: 'story' }),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.backstory.author ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Author'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.backstory.author\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.backstory.publication ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Publication'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.backstory.publication\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.backstory.url ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'URL'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.backstory.url\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.backstory.date ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Date'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.backstory.date\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ id: 'copyright', className: 'cornerContent' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'h1',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Copyright & Licensing'\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.copyright.copyright ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Copyright'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.copyright.copyright\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.copyright.credit ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Credit'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.copyright.credit\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.copyright.year ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Year'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.copyright.year\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.copyright.ethics ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Ethics'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.copyright.ethics\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'div',\n\t\t\t\t\t\t\t{ className: this.props.formData.copyright.caption ? '' : 'empty' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'label' },\n\t\t\t\t\t\t\t\t'Caption'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\t'span',\n\t\t\t\t\t\t\t\t{ className: 'value' },\n\t\t\t\t\t\t\t\tthis.props.formData.copyright.caption\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ id: 'media', className: 'cornerContent' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'h1',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Related Media'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ id: 'links', className: 'cornerContent' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'h1',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Related Links'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'form',\n\t\t\t\t\t{ name: 'embed' },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'form-control card',\n\t\t\t\t\t\tname: 'imageSrc',\n\t\t\t\t\t\tref: this.inputRef,\n\t\t\t\t\t\tplaceholder: 'https://example.com/images/photo.jpg',\n\t\t\t\t\t\tonChange: this.onChangeImage.bind(this),\n\t\t\t\t\t\tonFocus: this.onFocus.bind(this),\n\t\t\t\t\t\tonBlur: this.onBlur.bind(this)\n\t\t\t\t\t}),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('textarea', { className: 'output form-control',\n\t\t\t\t\t\tid: 'json',\n\t\t\t\t\t\treadOnly: true,\n\t\t\t\t\t\tref: this.outputRef,\n\t\t\t\t\t\trows: 5\n\t\t\t\t\t\t// value={this.createEmbedCode(this.props.formData)}\n\t\t\t\t\t\t, value: this.createEmbedCode(this.props.formData),\n\t\t\t\t\t\tonFocus: this.onFocus.bind(this),\n\t\t\t\t\t\tonBlur: this.onBlur.bind(this)\n\t\t\t\t\t}),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'embed-opts checkboxes' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\t{ className: 'control-label', htmlFor: 'includeJS' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'embed-opt',\n\t\t\t\t\t\t\t\tid: 'includeJS',\n\t\t\t\t\t\t\t\tname: 'includeJS',\n\t\t\t\t\t\t\t\ttype: 'checkbox',\n\t\t\t\t\t\t\t\tdefaultChecked: this.state.includeJS,\n\t\t\t\t\t\t\t\tonChange: this.onChangeOpts.bind(this) }),\n\t\t\t\t\t\t\t'\\xA0Include JavaScript file'\n\t\t\t\t\t\t),\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'label',\n\t\t\t\t\t\t\t{ className: 'control-label', htmlFor: 'includeCSS' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'embed-opt',\n\t\t\t\t\t\t\t\tid: 'includeCSS',\n\t\t\t\t\t\t\t\tname: 'includeCSS',\n\t\t\t\t\t\t\t\ttype: 'checkbox',\n\t\t\t\t\t\t\t\tdefaultChecked: this.state.includeCSS,\n\t\t\t\t\t\t\t\tonChange: this.onChangeOpts.bind(this) }),\n\t\t\t\t\t\t\t'\\xA0Include CSS file'\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', { className: 'form-control card',\n\t\t\t\t\t\treadOnly: true,\n\t\t\t\t\t\tvalue: 'https://i.guim.co.uk/img/media/fe09d503213527013ae12c489ad7b473f35e7a8c/0_0_6720_4480/master/6720.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=c23858bc511a0bc8ec8c6ab52687b6b2'\n\t\t\t\t\t\t// value='https://d2w9rnfcy7mm78.cloudfront.net/1380519/original_68cb6b97fa36bad871fb18352de81972.jpeg'\n\t\t\t\t\t\t, onFocus: this.onFocus.bind(this),\n\t\t\t\t\t\tonBlur: this.onBlur.bind(this)\n\t\t\t\t\t})\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Embed);\n\n//# sourceURL=webpack:///./src/embed.jsx?");

/***/ }),

/***/ "./src/entry.jsx":
/*!***********************!*\
  !*** ./src/entry.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"./node_modules/react-dom/server.browser.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _schema_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema.jsx */ \"./src/schema.jsx\");\n\n\n\n\n\nclass Entry extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {};\n\t}\n\n\trender() {\n\t\tconst value = this.props.formData[this.props.slug];\n\t\tconsole.log(this.props.formData);\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: value ? '' : 'empty' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'span',\n\t\t\t\t{ className: 'label' },\n\t\t\t\tthis.props.slug\n\t\t\t),\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'span',\n\t\t\t\t{ className: 'value' },\n\t\t\t\tvalue\n\t\t\t)\n\t\t);\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Entry);\n\n//# sourceURL=webpack:///./src/entry.jsx?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _i18n_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n.jsx */ \"./src/i18n.jsx\");\n\n\n\n\n\nclass Header extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t\tthis.state = {\n\t\t\tlang: 'en',\n\t\t\tlangs: {}\n\t\t};\n\t\tthis.onLanguageChanged = this.onLanguageChanged.bind(this);\n\t}\n\n\tcomponentDidMount() {\n\t\tlet that = this;\n\t\tlet lang = _i18n_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"].language;\n\t\tlet req = SiteSettings.url.api + 'get_langs';\n\t\tfetch(req).then(function (res) {\n\t\t\tif (!res.ok) {\n\t\t\t\tthrow Error(res.statusText);\n\t\t\t}\n\t\t\t// return console.log(res);\n\t\t\treturn res.json();\n\t\t}).then(function (res) {\n\t\t\tthat.setState({ langs: JSON.parse(res) });\n\t\t});\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"].on('languageChanged', this.onLanguageChanged);\n\t}\n\n\tcomponentWillUnmount() {\n\t\t_i18n_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"].off('languageChanged', this.onLanguageChanged);\n\t}\n\n\tonLanguageChanged(lang) {\n\t\tthis.setState({\n\t\t\tlang: lang\n\t\t});\n\t}\n\n\trenderLangList() {\n\t\tconst langs = this.state.langs;\n\t\tconst self = this;\n\t\treturn (\n\t\t\t// <ul>\n\t\t\t// {Object.keys(this.state.langs).map(function( slug, index ){\n\t\t\t// const lang = langs[slug];\n\t\t\t// return(\n\t\t\t// <li key={slug}>\n\t\t\t// <a href={lang.url}>{lang.name}</a>\n\t\t\t// {/*<NavLink\n\t\t\t// to={ '/'+slug }\n\t\t\t// activeClassName='active'\n\t\t\t// onClick={self.onLanguageChanged().bind(this)}>\n\t\t\t// {lang.name}\n\t\t\t// </NavLink>*/}\n\t\t\t// </li>\n\t\t\t// );\n\t\t\t// })}\n\t\t\t// </ul>\n\n\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'select',\n\t\t\t\t{ onChange: this.changeLang.bind(this), className: 'form-control' },\n\t\t\t\tObject.keys(this.state.langs).map(function (slug, index) {\n\t\t\t\t\tconst lang = langs[slug];\n\t\t\t\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ key: slug, value: slug },\n\t\t\t\t\t\tlang.name\n\t\t\t\t\t);\n\t\t\t\t})\n\t\t\t)\n\t\t);\n\t}\n\n\tchangeLang() {}\n\n\trender() {\n\t\tlet lang = this.state.lang;\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t'header',\n\t\t\t{ className: 'header' },\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'container' },\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'row' },\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'col-6' },\n\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t'h1',\n\t\t\t\t\t\t\t{ className: 'site-title' },\n\t\t\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"],\n\t\t\t\t\t\t\t\t{ to: SiteSettings.path },\n\t\t\t\t\t\t\t\t'Four Corners'\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t)\n\t\t\t\t\t),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\t{ className: 'col-6' },\n\t\t\t\t\t\tthis.state.langs ? this.renderLangList() : this.renderEmpty()\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/header.jsx?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ \"./src/header.jsx\");\n/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer */ \"./src/footer.jsx\");\n/* harmony import */ var _creator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./creator */ \"./src/creator.jsx\");\n/* harmony import */ var _not_found__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./not-found */ \"./src/not-found.jsx\");\n\n\n\n\n\n\n\n\n\n\n__webpack_require__(/*! ./sass/public.scss */ \"./src/sass/public.scss\");\n\nconst routes = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\treact_i18next__WEBPACK_IMPORTED_MODULE_2__[\"NamespacesConsumer\"],\n\tnull,\n\tt => {\n\t\treturn react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"BrowserRouter\"],\n\t\t\tnull,\n\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,\n\t\t\t\tnull,\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_header__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\n\t\t\t\t\treact_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Switch\"],\n\t\t\t\t\tnull,\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], { exact: true, path: SiteSettings.path, component: _creator__WEBPACK_IMPORTED_MODULE_6__[\"default\"] }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], { exact: true, path: SiteSettings.path + 'creator', component: _creator__WEBPACK_IMPORTED_MODULE_6__[\"default\"] }),\n\t\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], { path: '*', component: _not_found__WEBPACK_IMPORTED_MODULE_7__[\"default\"] })\n\t\t\t\t),\n\t\t\t\treact__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_footer__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null)\n\t\t\t)\n\t\t);\n\t}\n);\nObject(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"render\"])(routes, document.getElementById('page'));\n\n//# sourceURL=webpack:///./src/index.jsx?");

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
eval("__webpack_require__.r(__webpack_exports__);\n// https://mozilla-services.github.io/react-jsonschema-form/\n// https://github.com/mozilla-services/react-jsonschema-form/\n\nconst Schema = {\n\ttitle: '',\n\ttype: 'object',\n\tproperties: {\n\t\t// language: {\n\t\t// \ttype: 'string',\n\t\t// \tenum: [],\n\t\t// \tenumNames: [],\n\t\t// },\n\t\tbackstory: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tstory: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\tauthor: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\tpublication: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\turl: {\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tformat: 'uri'\n\t\t\t\t},\n\t\t\t\tdate: {\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tformat: 'date'\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tcopyright: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tcopyright: {\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tenum: []\n\t\t\t\t},\n\t\t\t\tcredit: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\tyear: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t},\n\t\t\t\tethics: {\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tenum: []\n\t\t\t\t},\n\t\t\t\tcaption: {\n\t\t\t\t\ttype: 'string'\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tmedia: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tmedia: {\n\t\t\t\t\ttype: 'array',\n\t\t\t\t\titems: {\n\t\t\t\t\t\ttype: 'object',\n\t\t\t\t\t\tproperties: {\n\t\t\t\t\t\t\ttype: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tenum: ['image', 'youtube', 'vimeo'],\n\t\t\t\t\t\t\t\tenumNames: ['Image', 'YouTube', 'Vimeo']\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\turl: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tformat: 'uri'\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tcredit: {\n\t\t\t\t\t\t\t\ttype: 'string'\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\tlinks: {\n\t\t\ttitle: '',\n\t\t\ttype: 'object',\n\t\t\trequired: [],\n\t\t\tproperties: {\n\t\t\t\tlinks: {\n\t\t\t\t\ttype: 'array',\n\t\t\t\t\tminItems: 0,\n\t\t\t\t\titems: {\n\t\t\t\t\t\ttype: 'object',\n\t\t\t\t\t\tproperties: {\n\t\t\t\t\t\t\ttitle: {\n\t\t\t\t\t\t\t\ttype: 'string'\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\turl: {\n\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\tformat: 'uri'\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Schema);\n\n//# sourceURL=webpack:///./src/schema.jsx?");

/***/ }),

/***/ "./src/ui-schema.jsx":
/*!***************************!*\
  !*** ./src/ui-schema.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// https://mozilla-services.github.io/react-jsonschema-form/\n// https://github.com/mozilla-services/react-jsonschema-form/\n\nconst uiSchema = {\n\tbackstory: {\n\t\tstory: {\n\t\t\t'ui:widget': 'textarea',\n\t\t\t'ui:options': {\n\t\t\t\trows: 5\n\t\t\t}\n\t\t}\n\t},\n\tcopyright: {\n\t\tcaption: {\n\t\t\t'ui:widget': 'textarea',\n\t\t\t'ui:options': {\n\t\t\t\trows: 5\n\t\t\t}\n\t\t}\n\t}\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (uiSchema);\n\n//# sourceURL=webpack:///./src/ui-schema.jsx?");

/***/ })

/******/ });