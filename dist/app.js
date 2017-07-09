/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// require('../resource/dom.css')
	__webpack_require__(2)
	var fiveChess = __webpack_require__(7);
	//Dom版本和canvas版本主要区别在UI上，只需要对canvas版本的UI方法进行重写
	fiveChess.bindEvent = function() {
		var that = this;
		var chess = this.chess;
		//在棋盘父元素将冒泡的点击事件捕获
		chess.onclick = function(e) {
				var target = e.target;
				var target_class_name = target.className;
				if (target_class_name == 'grid' || target_class_name == 'line-grid') {
					var x = e.offsetX;
					var y = e.offsetY;
					var i = 0,
						j = 0;
					var li_arr = chess.getElementsByTagName('li');
					for (var k = 0; k < li_arr.length; k++) {
						if (li_arr[k] == target) {
							//判断li点击的位置，如果在中线右边就将坐标加1
							i = x > (that.chess_grid_length / 2) ? k % (that.chess_num - 1) + 1 : k % (that.chess_num - 1);
							j = y > (that.chess_grid_length / 2) ? Math.floor(k / (that.chess_num - 1)) + 1 : Math.floor(k / (that.chess_num - 1));
							break;
						}
					}
					that.stepFall(i, j);
				}
			}
			//绑定悔棋和撤销悔棋
		that.bindBtnEvent();
	}
	fiveChess.drawChessBoard = function() {
		var chess_board = this.chess;
		//使用fragment一次性加载方便，如果性能最佳应使用innerHTML
		var fragment = document.createDocumentFragment();
		for (var i = 0, len = this.chess_num - 1; i < len; i++) {
			var ul = document.createElement('ul');
			ul.className = 'line';
			for (var j = 0, len = this.chess_num - 1; j < len; j++) {
				(function(j) {
					var li = document.createElement('li');
					if (i == 0) {
						//第一行的li需要多一个上边界，nth-child在IE8以下不兼容
						//不能使用ul的border，会导致事件冒泡判断坐标的条件分支过多
						li.className = 'line-grid';
					} else {
						li.className = 'grid';
					}
					ul.appendChild(li);
				})(j)
			}
			fragment.appendChild(ul);
		}
		chess_board.appendChild(fragment);
		this.bindEvent();
	}
	fiveChess.oneStep = function(i, j) {
		var chess_board = this.chess;
		var div = document.createElement('div');
		div.style.left = (i - 0.5) * this.chess_grid_length + 'px';
		div.style.top = (j - 0.5) * this.chess_grid_length + 'px';
		div.className = 'chess';
		if (this.chess_turn) {
			div.className += ' chess-black';
		} else {
			div.className += ' chess-white';
		}
		chess_board.appendChild(div);
	}
	fiveChess.backStep = function(i, j) {
		var left = (i - 0.5) * this.chess_grid_length + 'px';
		var top = (j - 0.5) * this.chess_grid_length + 'px';
		var chess_board = this.chess;
		var chess = chess_board.getElementsByClassName('chess');
		var test = this.chess_turn ? /chess-black/ : /chess-white/;
		for (var i = 0, len = chess.length; i < len; i++) {
			var item = chess[i];
			if (item.style.left.trim() == left.trim() && item.style.top.trim() == top.trim()) {
				//将dom节点直接去除
				item.parentElement.removeChild(item);
				// item.className = item.className.replace(test, '').trim();
				break;
			}
		}
	}

	fiveChess.init();
	module.exports = fiveChess;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// Prepare cssTransformation
	var transform;

	var options = {}
	options.transform = transform
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, options);
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/_css-loader@0.28.4@css-loader/index.js!../node_modules/_less-loader@2.2.2@less-loader/index.js!./dom.less", function() {
				var newContent = require("!!../node_modules/_css-loader@0.28.4@css-loader/index.js!../node_modules/_less-loader@2.2.2@less-loader/index.js!./dom.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)(undefined);
	// imports


	// module
	exports.push([module.id, "/* dom版本五子棋样式文件 */\n/* reset */\nhtml,\nbody,\ndiv,\np,\nul,\nli,\ndl,\ndt,\ndd,\nol,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nform,\ninput,\ntextarea,\nselect {\n  margin: 0;\n  padding: 0;\n  font-size: .36rem;\n}\np,\nul,\nli,\nol,\ndl,\ndt,\ndd {\n  list-style: none;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: normal;\n}\nimg {\n  border: none;\n  vertical-align: top;\n}\na {\n  color: #000;\n  text-decoration: none;\n}\ninput {\n  vertical-align: middle;\n  outline: none;\n}\ntable {\n  border-spacing: 0;\n  border-collapse: collapse;\n}\ntextarea {\n  resize: none;\n}\n* {\n  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);\n}\n/* 页面公共样式 */\nhtml {\n  height: 100%;\n  background-color: #fff;\n  font-family: Arial;\n}\nbody {\n  min-height: 100%;\n}\n/* 自定義樣式 */\n.fl {\n  float: left;\n}\n.fr {\n  float: right;\n}\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n.block {\n  display: block;\n}\n.inline {\n  display: inline;\n}\n.inline-block {\n  display: inline-block;\n}\n.hide {\n  display: none;\n}\n.pr {\n  position: relative;\n}\n.pa {\n  position: absolute;\n}\n.fx {\n  position: fixed;\n}\n.tc {\n  text-align: center;\n}\n.fb {\n  font-weight: 700;\n}\n.ellipsis {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.auto {\n  margin: 0 auto;\n}\n.img-cover {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.main {\n  margin: 100px auto 0;\n  width: 450px;\n}\n.container {\n  padding: 15px;\n  text-align: center;\n  box-shadow: -2px -2px 2px #efefef, 5px 5px 5px #b9b9b9;\n}\n.chess-board {\n  position: relative;\n  width: 422px;\n  cursor: pointer;\n}\n.grid {\n  border-right: 2px solid #bfbfbf;\n  border-bottom: 2px solid #bfbfbf;\n  height: 28px;\n  width: 28px;\n  float: left;\n}\n.grid:first-child {\n  border-left: 2px solid #bfbfbf;\n}\n.line-grid {\n  border-right: 2px solid #bfbfbf;\n  border-bottom: 2px solid #bfbfbf;\n  height: 28px;\n  width: 28px;\n  float: left;\n  border-top: 2px solid #bfbfbf;\n}\n.line-grid:first-child {\n  border-left: 2px solid #bfbfbf;\n}\n.line {\n  width: 100%;\n  height: 30px;\n}\n.chess {\n  width: 28px;\n  height: 28px;\n  position: absolute;\n}\n.chess-black:after {\n  width: 28px;\n  height: 28px;\n  content: \"\";\n  display: block;\n  border-radius: 28px;\n  background-color: #000;\n  background-image: -webkit-radial-gradient(circle, #635766, #000000);\n  background-image: radial-gradient(circle, #635766, #000000);\n}\n.chess-white:after {\n  width: 28px;\n  height: 28px;\n  content: \"\";\n  display: block;\n  border-radius: 28px;\n  background-color: #fff;\n  background-image: -webkit-radial-gradient(circle, #f9f9f9, #d1d1d1);\n  background-image: radial-gradient(circle, #f9f9f9, #d1d1d1);\n}\n.regret {\n  margin-top: 40px;\n  margin-left: 40px;\n  float: left;\n  cursor: pointer;\n  width: 120px;\n  padding: 10px 10px;\n  border: 2px solid #ff8100;\n  outline: none;\n  border-radius: 10px;\n  background: #ff8d00;\n  color: #fff;\n  font-size: 20px;\n  -webkit-transition: all 0.05s ease-out;\n  -moz-transition: all 0.05s ease-out;\n  transition: all 0.05s ease-out;\n}\n.regret:hover {\n  -webkit-transform: scale(1.05);\n  -moz-transform: scale(1.05);\n  transform: scale(1.05);\n}\n.cancel {\n  margin-top: 40px;\n  margin-left: 40px;\n  float: left;\n  cursor: pointer;\n  width: 120px;\n  padding: 10px 10px;\n  border: 2px solid #ff8100;\n  outline: none;\n  border-radius: 10px;\n  background: #ff8d00;\n  color: #fff;\n  font-size: 20px;\n  -webkit-transition: all 0.05s ease-out;\n  -moz-transition: all 0.05s ease-out;\n  transition: all 0.05s ease-out;\n  margin-right: 40px;\n  float: right;\n}\n.cancel:hover {\n  -webkit-transform: scale(1.05);\n  -moz-transform: scale(1.05);\n  transform: scale(1.05);\n}\n", ""]);

	// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}

		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});

			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}

		return [content].join('\n');
	}

	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

		return '/*# ' + data + ' */';
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/

	var stylesInDom = {};

	var	memoize = function (fn) {
		var memo;

		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	};

	var isOldIE = memoize(function () {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	});

	var getElement = (function (fn) {
		var memo = {};

		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}

			return memo[selector]
		};
	})(function (target) {
		return document.querySelector(target)
	});

	var singleton = null;
	var	singletonCounter = 0;
	var	stylesInsertedAtTop = [];

	var	fixUrls = __webpack_require__(6);

	module.exports = function(list, options) {
		if (false) {
			if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};

		options.attrs = typeof options.attrs === "object" ? options.attrs : {};

		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (!options.singleton) options.singleton = isOldIE();

		// By default, add <style> tags to the <head> element
		if (!options.insertInto) options.insertInto = "head";

		// By default, add <style> tags to the bottom of the target
		if (!options.insertAt) options.insertAt = "bottom";

		var styles = listToStyles(list, options);

		addStylesToDom(styles, options);

		return function update (newList) {
			var mayRemove = [];

			for (var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];

				domStyle.refs--;
				mayRemove.push(domStyle);
			}

			if(newList) {
				var newStyles = listToStyles(newList, options);
				addStylesToDom(newStyles, options);
			}

			for (var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];

				if(domStyle.refs === 0) {
					for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

					delete stylesInDom[domStyle.id];
				}
			}
		};
	};

	function addStylesToDom (styles, options) {
		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			if(domStyle) {
				domStyle.refs++;

				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}

				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];

				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}

				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles (list, options) {
		var styles = [];
		var newStyles = {};

		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = options.base ? item[0] + options.base : item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};

			if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
			else newStyles[id].parts.push(part);
		}

		return styles;
	}

	function insertStyleElement (options, style) {
		var target = getElement(options.insertInto)

		if (!target) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}

		var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

		if (options.insertAt === "top") {
			if (!lastStyleElementInsertedAtTop) {
				target.insertBefore(style, target.firstChild);
			} else if (lastStyleElementInsertedAtTop.nextSibling) {
				target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				target.appendChild(style);
			}
			stylesInsertedAtTop.push(style);
		} else if (options.insertAt === "bottom") {
			target.appendChild(style);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement (style) {
		if (style.parentNode === null) return false;
		style.parentNode.removeChild(style);

		var idx = stylesInsertedAtTop.indexOf(style);
		if(idx >= 0) {
			stylesInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement (options) {
		var style = document.createElement("style");

		options.attrs.type = "text/css";

		addAttrs(style, options.attrs);
		insertStyleElement(options, style);

		return style;
	}

	function createLinkElement (options) {
		var link = document.createElement("link");

		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";

		addAttrs(link, options.attrs);
		insertStyleElement(options, link);

		return link;
	}

	function addAttrs (el, attrs) {
		Object.keys(attrs).forEach(function (key) {
			el.setAttribute(key, attrs[key]);
		});
	}

	function addStyle (obj, options) {
		var style, update, remove, result;

		// If a transform function was defined, run it on the css
		if (options.transform && obj.css) {
		    result = options.transform(obj.css);

		    if (result) {
		    	// If transform returns a value, use that instead of the original css.
		    	// This allows running runtime transformations on the css.
		    	obj.css = result;
		    } else {
		    	// If the transform function returns a falsy value, don't add this css.
		    	// This allows conditional loading of css
		    	return function() {
		    		// noop
		    	};
		    }
		}

		if (options.singleton) {
			var styleIndex = singletonCounter++;

			style = singleton || (singleton = createStyleElement(options));

			update = applyToSingletonTag.bind(null, style, styleIndex, false);
			remove = applyToSingletonTag.bind(null, style, styleIndex, true);

		} else if (
			obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function"
		) {
			style = createLinkElement(options);
			update = updateLink.bind(null, style, options);
			remove = function () {
				removeStyleElement(style);

				if(style.href) URL.revokeObjectURL(style.href);
			};
		} else {
			style = createStyleElement(options);
			update = applyToTag.bind(null, style);
			remove = function () {
				removeStyleElement(style);
			};
		}

		update(obj);

		return function updateStyle (newObj) {
			if (newObj) {
				if (
					newObj.css === obj.css &&
					newObj.media === obj.media &&
					newObj.sourceMap === obj.sourceMap
				) {
					return;
				}

				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;

			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag (style, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (style.styleSheet) {
			style.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = style.childNodes;

			if (childNodes[index]) style.removeChild(childNodes[index]);

			if (childNodes.length) {
				style.insertBefore(cssNode, childNodes[index]);
			} else {
				style.appendChild(cssNode);
			}
		}
	}

	function applyToTag (style, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			style.setAttribute("media", media)
		}

		if(style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			while(style.firstChild) {
				style.removeChild(style.firstChild);
			}

			style.appendChild(document.createTextNode(css));
		}
	}

	function updateLink (link, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		/*
			If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
			and there is no publicPath defined then lets turn convertToAbsoluteUrls
			on by default.  Otherwise default to the convertToAbsoluteUrls option
			directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

		if (options.convertToAbsoluteUrls || autoFixUrls) {
			css = fixUrls(css);
		}

		if (sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = link.href;

		link.href = URL.createObjectURL(blob);

		if(oldSrc) URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */

	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;

	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }

		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }

	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.

		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens

		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });

			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}

			// convert the url to a full url
			var newUrl;

			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}

			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});

		// send back the fixed css
		return fixedCss;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var config = __webpack_require__(8);
	function FiveChess(chess_num, chess_grid_length){
	    //棋盘每个格子的长度
	    this.chess_grid_length = chess_grid_length;
	    //棋盘为 chess_num * chess_num
	    this.chess_num = chess_num;
	    // 如果不使用多一层背景画布，在擦除原来的棋子之后会留下透明背景
	    this.chess_bg = document.getElementById('chess_bg') || '';
	    // 棋盘dom节点引用
	    this.chess = document.getElementById('chess-board');
	    //是否已经结束
	    this.is_over = false;
	    //赢法计数
	    this.win_count = 0;
	    //赢法数组
	    this.wins = [];
	    //黑棋赢法统计数组
	    this.black_win = [];
	    //白棋赢法统计数组
	    this.white_win = [];
	    //轮到谁下，黑棋为true
	    this.chess_turn = true;
	    //下棋的总步数
	    this.total_step = 0;
	    //保存每次下棋位置的栈
	    this.stack_arr = [];
	    //栈上的指针
	    this.stack_index = -1;
	    //棋盘上所有位置的数组，数组中值为1是黑棋，值为2是白棋，0是没有棋子
	    this.chessBoard = [];
	    //是否可以撤销悔棋
	    this.is_able_cancel = false;
	}
	FiveChess.prototype = {
	    init: function(){
	        if(this.chess == '') {
	            alert('棋盘不存在');
	            return false;
	        }
	        //计算所有赢法数组
	        this.computeCount();
	        //初始化棋盘上所有位置的数组
	        this.initChessArray();
	        //画出棋盘
	        this.drawChessBoard();
	        //绑定棋盘上的点击事件
	        this.bindEvent();
	    },
	    initChessArray: function(){
	        this.chessBoard = [];
	        for(var i = 0, len = this.chess_num; i < len; i++){
	            this.chessBoard[i] = [];
	            for(var j = 0, len = this.chess_num; j < len; j++){
	                //0是没有棋子
	                this.chessBoard[i][j] = 0;
	            }
	        }
	    },
	    //画出棋盘
	    drawChessBoard: function(){
	        var chess = this.chess_bg;
	        var context = chess.getContext('2d');
	        for(var i = 0; i < this.chess_num; i++){
	            //留下0.5 * this.chess_grid_length的间隔，可以放下第一个和最后一个棋子
	            context.moveTo((0.5 + i) * this.chess_grid_length, this.chess_num);
	            context.lineTo((0.5 + i) * this.chess_grid_length, (this.chess_grid_length - 1) * this.chess_num);
	            context.stroke();
	            context.moveTo(0.5 * this.chess_grid_length, (0.5 + i) * this.chess_grid_length);
	            context.lineTo((this.chess_grid_length - 1) * this.chess_num, (0.5 + i) * this.chess_grid_length);
	            context.stroke();
	            context.strokeStyle = '#bfbfbf';
	        }
	    },
	    //计算所有赢法数组
	    //当我们判断五子棋是否赢的时候，其实是看是否有五个坐标(i, j)连成一条线
	    //那么赢法数组就是对于可能赢的五个坐标分成一组
	    //如[0][0]{1}，[0][1]{1}，[0][2]{1}，[0][3]{1}，[0][4]{1}，前两维数组代表坐标，将赢法和这组坐标关联
	    //最后一维表示第几种赢法，由于赢法不重复，这里考虑用对象节省空间
	    //在[i, j]下了一步棋，所有关于[i, j]的赢法都要更新计数
	    //一旦黑棋在[i, j]下了一步棋，所有关于[i, j]的赢法都被黑棋占领
	    computeCount: function(){
	        //初始化一个js三维数组
	        for(var i = 0; i < this.chess_num + 1; i++){
	            this.wins[i] = [];
	            for(var j = 0; j < this.chess_num + 1; j++){
	                this.wins[i][j] = {};
	            }
	        }
	        //竖线
	        for(var i = 0; i < this.chess_num; i++){
	            //i代表某一行
	            for(var j = 0; j < this.chess_num - 4; j++){
	                for(var k = 0; k < 5; k++){
	                    this.wins[i][j+k][this.win_count] = true;
	                }
	                this.win_count++;
	            }
	        }
	        //横线
	        for(var i = 0; i < this.chess_num; i++){
	            for(var j = 0; j < this.chess_num - 4; j++){
	                for(var k = 0; k < 5; k++){
	                    this.wins[j+k][i][this.win_count] = true;
	                }
	                this.win_count++;
	            }
	        }
	        //斜线
	        for(var i = 0; i < this.chess_num - 4; i++){
	            //i代表某一列
	            for(var j = 0; j < this.chess_num - 4; j++){
	                for(var k = 0; k < 5; k++){
	                    this.wins[j+k][i+k][this.win_count] = true;
	                }
	                this.win_count++;
	            }
	        }
	        //反斜线
	        for(var i = 0; i < this.chess_num - 4; i++){
	            //i代表某一列
	            for(var j = this.chess_num - 1; j > 3; j--){
	                for(var k = 0; k < 5; k++){
	                    this.wins[i+k][j-k][this.win_count] = true;
	                }
	                this.win_count++;
	            }
	        }
	        this.initWinArray();
	    },
	    initWinArray: function(){
	        //win_count用来记录赢法
	        for(var i = 0; i < this.win_count; i++){
	            this.black_win[i] = 0;
	            this.white_win[i] = 0;
	        }
	    },
	    bindEvent: function(){
	        var that = this;
	        var chess = this.chess;
	        //绑定棋盘上的点击事件
	        chess.onclick = function(e){
	            //如果已经结束则跳出
	            if(that.is_over){
	                return false;
	            }
	            //下了一步新棋不能撤销悔棋
	            that.is_able_cancel = false;
	            var x = e.offsetX;
	            var y = e.offsetY;
	            var i = Math.floor(x / that.chess_grid_length);
	            var j = Math.floor(y / that.chess_grid_length);
	            //将下棋的操作分离出来，因为撤销悔棋相当于下一次棋
	            that.stepFall(i, j);
	        }
	        //绑定悔棋和撤销悔棋
	        that.bindBtnEvent();
	    },
	    stepFall: function(i, j){
	        if(this.chessBoard[i][j] == 0) {
	            //更新位置栈
	            this.updateStack(i, j);
	            //落子的UI实现
	            this.oneStep(i, j);
	            if(this.chess_turn){
	                //黑棋
	                this.chessBoard[i][j] = 1;
	            } else {
	                //白棋
	                this.chessBoard[i][j] = 2;
	            }
	            //对目前的形势进行胜负计算
	            this.computeWinner(i, j);
	            //总步数++
	            this.total_step++;
	            //反转下棋顺序
	            this.chess_turn = !this.chess_turn;
	        }
	    },
	    //更新位置栈
	    updateStack: function(i, j){
	        var position = [i, j];
	        var len = this.stack_arr.length;
	        this.stack_index++;
	        if(this.total_step < len){
	            //当我们进行了若干悔棋和撤销悔棋的操作(悔棋多于撤销悔棋)
	            //我们总步数和步数栈不一致的时候
	            //stack_index指向的是当前的步数
	            this.stack_arr[this.stack_index] = position;
	        } else {
	            //当我们总步数和步数栈一致的时候，只需要直接把新的位置push进步数栈
	            this.stack_arr.push(position);
	        }
	    },
	    //对目前的形势进行胜负计算的更新
	    computeWinner: function(i, j){
	        for(var k = 0; k < this.win_count; k++){
	            if(this.wins[i][j][k]){
	                if(this.chess_turn){
	                    this.black_win[k]++;
	                    //黑棋占据了i,j 白棋的在这个分组的值直接设为100(不可能获胜的值)
	                    this.white_win[k] = 100;
	                } else {
	                    this.white_win[k]++;
	                    this.black_win[k] = 100;
	                }
	                if(this.black_win[k] == 5){
	                    this.is_over = true;
	                    //禁用所有按钮
	                    this.unbindEvent();
	                    alert('黑棋赢了');
	                    //避免六子弹出两次提示
	                    break;
	                }
	                if(this.white_win[k] == 5){
	                    this.is_over = true;
	                    //禁用所有按钮
	                    this.unbindEvent();
	                    alert('白棋赢了');
	                    //避免六子弹出两次提示
	                    break;
	                }
	            }
	        }
	    },
	    //回退刚才的胜负计算
	    backWinner: function(i, j){
	        for(var k = 0; k < this.win_count; k++){
	            if(this.wins[i][j][k]){
	                if(this.chess_turn){
	                    this.black_win[k]--;
	                    this.white_win[k] = 0;
	                } else {
	                    this.white_win[k]--;
	                    this.black_win[k] = 0;
	                }
	            }
	        }
	    },
	    //绑定悔棋和撤销悔棋的点击事件
	    bindBtnEvent: function(){
	        var that = this;
	        var regret = document.getElementById('regret');
	        var cancel = document.getElementById('cancel');
	        regret.onclick = function(){
	            //悔棋的操作
	            that.regretOperate();
	        }
	        cancel.onclick = function(){
	            //撤销悔棋的操作
	            that.cancelOperate();
	        }
	    },
	    //撤销悔棋的操作
	    cancelOperate: function(){
	        var that = this;
	        //撤销悔棋设定为必须在上一步是悔棋的情况下
	        if(that.stack_index == that.stack_arr.length - 1 || !that.is_able_cancel){
	            alert('无法撤销悔棋');
	            return false;
	        }
	        var position = that.stack_arr[that.stack_index + 1];
	        var i = position[0];
	        var j = position[1];
	        that.stepFall(i, j);
	    },
	    //悔棋的操作
	    //因为不涉及人机对战，那么这里悔棋设定为撤回刚下的棋子
	    //这时要对上一步的下的棋进行逆操作
	    regretOperate: function(){
	        if(this.total_step < 1){
	            alert('无法悔棋');
	            return false;
	        }
	        //悔棋过可以再撤销
	        this.is_able_cancel = true;
	        //对上一步的下的棋进行逆操作
	        var position = this.stack_arr[this.stack_index];
	        var i = position[0];
	        var j = position[1];
	        this.chess_turn = !this.chess_turn;
	        this.backWinner(i, j);
	        this.backStep(i, j);
	        this.chessBoard[i][j] = 0;
	        this.stack_index--;
	        this.total_step--;
	    },
	    //撤销落子的UI实现
	    backStep: function(i, j){
	        var chess = this.chess;
	        var context = chess.getContext('2d');
	        context.beginPath();
	        context.clearRect(i * this.chess_grid_length, j * this.chess_grid_length, this.chess_grid_length, this.chess_grid_length);
	        context.closePath();
	        /*
	            不采用背景画布采用擦除实现会留下一个透明背景
	            context.beginPath();
	            context.moveTo(i * this.chess_grid_length, (j + 0.5) * this.chess_grid_length);
	            context.lineTo((i + 1) * this.chess_grid_length, (j + 0.5) * this.chess_grid_length);
	            context.moveTo((i + 0.5) * this.chess_grid_length, j * this.chess_grid_length);
	            context.lineTo((i + 0.5) * this.chess_grid_length, (j + 1) * this.chess_grid_length);
	            context.strokeStyle = '#bfbfbf';
	            context.stroke();
	            context.closePath();
	        */
	    },
	    //落子的UI实现
	    oneStep: function(i, j){
	        var chess = this.chess;
	        var context = chess.getContext('2d');
	        context.beginPath();
	        context.arc((i + 0.5) * this.chess_grid_length,  (j + 0.5) * this.chess_grid_length, 13, 0, 2 * Math.PI);
	        context.closePath();
	        var gradient = context.createRadialGradient((i + 0.5) * this.chess_grid_length + 2,  (j + 0.5) * this.chess_grid_length -2 , 13, this.chess_num + i * this.chess_grid_length + 2, this.chess_num + j * this.chess_grid_length -2, 0);
	        if(this.chess_turn){
	            gradient.addColorStop(0, '#0a0a0a');
	            gradient.addColorStop(1, '#635766');
	        } else {
	            gradient.addColorStop(0, '#d1d1d1');
	            gradient.addColorStop(1, '#f9f9f9');
	        }
	        context.fillStyle = gradient;
	        context.fill();
	    },
	    unbindEvent: function(){
	        var that = this;
	        var regret = document.getElementById('regret');
	        var cancel = document.getElementById('cancel');
	        var chess = this.chess;
	        //绑定棋盘上的点击事件
	        chess.onclick = function(e){
	            alert('棋局已结束');
	        }
	        regret.onclick = function(){
	            alert('棋局已结束');
	        }
	        cancel.onclick = function(){
	            //撤销悔棋的操作
	            alert('棋局已结束');
	        }
	    }
	}
	var fiveChess = new FiveChess(config.chess_num, config.chess_grid_length);
	module.exports = fiveChess;






/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var config = {
	    //棋盘为 15 * 15
	    chess_num: 15,
	    //棋盘每个格子的长
	    chess_grid_length: 30
	}
	module.exports = config;


/***/ })
/******/ ]);