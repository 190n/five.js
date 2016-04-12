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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _input = __webpack_require__(1);

	var _input2 = _interopRequireDefault(_input);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('load', function () {
	    var input = (0, _input2.default)(document.getElementById('target'));
	    requestAnimationFrame(function update() {
	        var cursor = document.getElementById('cursor');
	        cursor.style.left = input.mousePos.x + 'px';
	        cursor.style.top = input.mousePos.y + 'px';
	        console.log(input.mousePos);
	        requestAnimationFrame(update);
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = InputFactory;

	var _keyboard = __webpack_require__(2);

	var _keyboard2 = _interopRequireDefault(_keyboard);

	var _mouse = __webpack_require__(3);

	var _mouse2 = _interopRequireDefault(_mouse);

	var _vector2d = __webpack_require__(4);

	var _vector2d2 = _interopRequireDefault(_vector2d);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Input = function () {
	    function Input(elem) {
	        _classCallCheck(this, Input);

	        this.actions = {};
	        this._listeners = {};
	        this._keyPressed = (0, _keyboard2.default)(elem, this._kbdCallback.bind(this));
	        this._mouseButtonsPressed = [];
	        this.mousePos = (0, _vector2d2.default)(0, 0);
	        (0, _mouse2.default)(elem, this._mouseCallback.bind(this));
	    }

	    _createClass(Input, [{
	        key: 'createAction',
	        value: function createAction(name, buttons) {
	            this.actions[name] = buttons;
	        }
	    }, {
	        key: 'remapAction',
	        value: function remapAction(name, buttons) {
	            this.createAction(name, buttons);
	        }
	    }, {
	        key: 'isActionPressed',
	        value: function isActionPressed(action) {
	            var _this = this;

	            return this.actions[action].some(function (b) {
	                if (b > 0) return _this._keyPressed(b);
	                if (b < 0) return _this._mouseButtonsPressed.includes(-b);
	            });
	        }
	    }, {
	        key: 'on',
	        value: function on(ev, cb) {
	            if (!(ev in this._listeners)) this._listeners[ev] = [];
	            this._listeners[ev].push(cb);
	        }
	    }, {
	        key: 'off',
	        value: function off(ev, cb) {
	            if (!(ev in this._listeners)) return;
	            this._listeners[ev] = this._listeners[ev].filter(function (h) {
	                return h != cb;
	            });
	        }
	    }, {
	        key: 'once',
	        value: function once(ev, cb) {
	            var handler = function () {
	                for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
	                    data[_key] = arguments[_key];
	                }

	                cb.call.apply(cb, [null].concat(data));
	                this.off(ev, handler);
	            }.bind(this);
	            this.on(ev, handler);
	        }
	    }, {
	        key: 'emit',
	        value: function emit(ev) {
	            if (!(ev in this._listeners)) return;

	            for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                data[_key2 - 1] = arguments[_key2];
	            }

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this._listeners[ev][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var cb = _step.value;

	                    cb.call.apply(cb, [null].concat(data));
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_kbdCallback',
	        value: function _kbdCallback(ev) {
	            if (ev.type == 'down') {
	                for (var name in this.actions) {
	                    if (this.actions[name].includes(ev.key)) {
	                        this.emit('down:' + name);
	                        this.emit('down', {
	                            action: name,
	                            button: ev.key
	                        });
	                    }
	                }
	            } else if (ev.type == 'up') {
	                for (var _name in this.actions) {
	                    if (this.actions[_name].includes(ev.key)) {
	                        this.emit('up:' + _name);
	                        this.emit('up', {
	                            action: _name,
	                            button: ev.key
	                        });
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_mouseCallback',
	        value: function _mouseCallback(ev) {
	            this.mousePos = ev.pos;
	            if (ev.type == 'down') {
	                this._mouseButtonsPressed.push(ev.button);
	                for (var name in this.actions) {
	                    if (this.actions[name].includes(-ev.button)) {
	                        this.emit('down:' + name);
	                        this.emit('down', {
	                            action: name,
	                            button: -ev.button
	                        });
	                    }
	                }
	            } else if (ev.type == 'up') {
	                this._mouseButtonsPressed = this._mouseButtonsPressed.filter(function (b) {
	                    return b != ev.button;
	                });
	                for (var _name2 in this.actions) {
	                    if (this.actions[_name2].includes(-ev.button)) {
	                        this.emit('down:' + _name2);
	                        this.emit('down', {
	                            action: _name2,
	                            button: -ev.button
	                        });
	                    }
	                }
	            }
	        }
	    }]);

	    return Input;
	}();

	function InputFactory(elem) {
	    return new Input(elem);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = init;
	function init(elem, callback) {
	    var pressed = [];

	    elem.addEventListener('keydown', function (e) {
	        pressed.push(e.keyCode);
	        callback({
	            type: 'down',
	            key: e.keyCode
	        });
	    }, false);

	    elem.addEventListener('keyup', function (e) {
	        pressed = pressed.filter(function (k) {
	            return k != e.keyCode;
	        });
	        callback({
	            type: 'up',
	            key: e.keyCode
	        });
	    }, false);

	    return function (key) {
	        return pressed.includes(key);
	    };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = init;

	var _vector2d = __webpack_require__(4);

	var _vector2d2 = _interopRequireDefault(_vector2d);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function process(ev, type) {
	    return {
	        type: type,
	        pos: (0, _vector2d2.default)(ev.clientX - ev.target.offsetLeft, ev.clientY - ev.target.offsetTop),
	        button: ev.button === 0 ? 1 : ev.button === 1 ? 3 : 2
	    };
	}

	function init(elem, callback) {
	    elem.addEventListener('mousedown', function (ev) {
	        callback(process(ev, 'down'), ev);
	    });

	    elem.addEventListener('mouseup', function (ev) {
	        callback(process(ev, 'up'), ev);
	    });

	    elem.addEventListener('mousemove', function (ev) {
	        callback(process(ev, 'move'), ev);
	    });
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector2D = function () {
	    function Vector2D(x, y) {
	        _classCallCheck(this, Vector2D);

	        this.x = x;
	        this.y = y;
	    }

	    _createClass(Vector2D, [{
	        key: "add",
	        value: function add(vec) {
	            return new Vector2D(this.x + vec.x, this.y + vec.y);
	        }
	    }, {
	        key: "multiply",
	        value: function multiply(factor) {
	            return new Vector2D(this.x * factor, this.y * factor);
	        }
	    }, {
	        key: "length",
	        value: function length() {
	            return Math.sqrt(this.x * this.x + this.y * this.y);
	        }
	    }, {
	        key: "angle",
	        value: function angle() {
	            return Math.atan2(this.y, this.x) * (180 / Math.PI);
	        }
	    }, {
	        key: "toPolar",
	        value: function toPolar() {
	            return [this.angle(), this.length()];
	        }
	    }]);

	    return Vector2D;
	}();

	function fromPolar(deg, len) {
	    var rad = deg / (180 / Math.PI),
	        xf = Math.round(Math.cos(rad) * 1000) / 1000,
	        yf = Math.round(Math.sin(rad) * 1000) / 1000;
	    return new Vector2D(xf, yf).multiply(len);
	}

	function Vector2DFactory() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    return new (Function.prototype.bind.apply(Vector2D, [null].concat(args)))();
	}

	Vector2DFactory.fromPolar = fromPolar;
	exports.default = Vector2DFactory;

/***/ }
/******/ ]);