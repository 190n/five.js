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

	var _five = __webpack_require__(1);

	var _five2 = _interopRequireDefault(_five);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.addEventListener('load', function () {
	    var input = _five2.default.Input(document.getElementById('target')),
	        lmb = document.getElementById('lmb'),
	        rmb = document.getElementById('rmb'),
	        mousex = document.getElementById('mousex'),
	        mousey = document.getElementById('mousey');
	    input.createAction('lmb', [_five2.default.keys.button1]);
	    input.createAction('rmb', [_five2.default.keys.button2]);
	    requestAnimationFrame(function update() {
	        var cursor = document.getElementById('cursor');
	        cursor.style.left = input.mousePos.x + 'px';
	        mousex.innerHTML = input.mousePos.x;
	        cursor.style.top = input.mousePos.y + 'px';
	        mousey.innerHTML = input.mousePos.y;
	        lmb.innerHTML = input.isActionPressed('lmb') ? 'down' : 'up';
	        cursor.style.background = input.isActionPressed('lmb') ? '#00c000' : '#0080ff';
	        rmb.innerHTML = input.isActionPressed('rmb') ? 'down' : 'up';
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

	var _baseEntity = __webpack_require__(2);

	var _baseEntity2 = _interopRequireDefault(_baseEntity);

	var _compoundEntity = __webpack_require__(3);

	var _compoundEntity2 = _interopRequireDefault(_compoundEntity);

	var _imageEntity = __webpack_require__(4);

	var _imageEntity2 = _interopRequireDefault(_imageEntity);

	var _manager = __webpack_require__(5);

	var _manager2 = _interopRequireDefault(_manager);

	var _movement = __webpack_require__(10);

	var _movement2 = _interopRequireDefault(_movement);

	var _textEntity = __webpack_require__(11);

	var _textEntity2 = _interopRequireDefault(_textEntity);

	var _vector2d = __webpack_require__(9);

	var _vector2d2 = _interopRequireDefault(_vector2d);

	var _sprite = __webpack_require__(12);

	var _sprite2 = _interopRequireDefault(_sprite);

	var _mixer = __webpack_require__(13);

	var _mixer2 = _interopRequireDefault(_mixer);

	var _sound = __webpack_require__(14);

	var _sound2 = _interopRequireDefault(_sound);

	var _input = __webpack_require__(6);

	var _input2 = _interopRequireDefault(_input);

	var _keys = __webpack_require__(15);

	var _keys2 = _interopRequireDefault(_keys);

	var _util = __webpack_require__(16);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var five = {
	    VERSION: '0.6.3',

	    canvasSupport: function canvasSupport() {
	        var result = 0;
	        if (typeof CanvasRenderingContext2D == 'function') result = 0.5;else return 0;
	        if (typeof CanvasRenderingContext2D.prototype.fillText == 'function') result = 1;
	        return result;
	    },


	    BaseEntity: _baseEntity2.default,
	    CompoundEntity: _compoundEntity2.default,
	    ImageEntity: _imageEntity2.default,
	    Manager: _manager2.default,
	    Movement: _movement2.default,
	    TextEntity: _textEntity2.default,
	    Vector2D: _vector2d2.default,
	    Sprite: _sprite2.default,
	    Mixer: _mixer2.default,
	    Sound: _sound2.default,
	    Input: _input2.default,
	    keys: _keys2.default,
	    util: _util2.default
	};

	exports.default = five;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var BaseEntity = {
	    type: 'generic',

	    frozen: false,
	    invisible: false,

	    update: function update(dt) {
	        throw new Error('Please define update(dt) on entity objects!');
	    },
	    draw: function draw(ctx) {
	        throw new Error('Please define draw(ctx) on entity objects!');
	    },
	    onDeath: function onDeath() {}
	};

	exports.default = BaseEntity;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var CompoundEntity = {
	    type: 'compound',
	    entities: [],

	    addEntities: function addEntities() {
	        for (var _len = arguments.length, es = Array(_len), _key = 0; _key < _len; _key++) {
	            es[_key] = arguments[_key];
	        }

	        this.entities = this.entities.concat(es);
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = es[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var e = _step.value;

	                e.compound = this;
	                e.manager = this.manager;
	                if (typeof e.init == 'function') e.init();
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
	    },
	    removeEntities: function removeEntities() {
	        for (var _len2 = arguments.length, es = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            es[_key2] = arguments[_key2];
	        }

	        this.entities = this.entities.filter(function (e) {
	            if (es.includes(e)) {
	                e.onDeath();
	                return false;
	            }
	            return true;
	        });
	    },
	    getEntitiesByType: function getEntitiesByType(type) {
	        return this.entities.filter(function (e) {
	            return e.type == type;
	        });
	    },
	    updateAll: function updateAll(dt) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = this.entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var e = _step2.value;

	                e.pos.x -= this.pos.x;
	                e.pos.y -= this.pos.y;
	                e.update(dt);
	                e.pos.x += this.pos.x;
	                e.pos.y += this.pos.y;
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    },
	    drawAll: function drawAll(ctx) {
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	            for (var _iterator3 = this.entities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                var e = _step3.value;

	                e.draw(ctx);
	            }
	        } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                    _iterator3.return();
	                }
	            } finally {
	                if (_didIteratorError3) {
	                    throw _iteratorError3;
	                }
	            }
	        }
	    }
	};

	exports.default = CompoundEntity;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ImageEntity = {
	    image: null,
	    sourceRect: null,
	    drawWidth: null,
	    drawHeight: null,
	    imageSmoothing: true,

	    drawImage: function drawImage(ctx) {
	        var dw = this.drawWidth === null ? this.drawWidth = this.image.width : this.drawWidth,
	            dh = this.drawHeight === null ? this.drawHeight = this.image.height : this.drawHeight,
	            dx = this.pos.x,
	            dy = this.pos.y,
	            sw = this.sourceRect ? this.sourceRect.width : dw,
	            sh = this.sourceRect ? this.sourceRect.height : dh,
	            sx = this.sourceRect ? this.sourceRect.pos.x : 0,
	            sy = this.sourceRect ? this.sourceRect.pos.y : 0;
	        ctx.imageSmoothingEnabled = this.imageSmoothing;
	        ctx.webkitImageSmoothingEnabled = this.imageSmoothing;
	        ctx.mozImageSmoothingEnabled = this.imageSmoothing;
	        ctx.msImageSmoothingEnabled = this.imageSmoothing;
	        ctx.drawImage(this.image, sx, sy, sw, sh, dx - dw / 2, dy - dh / 2, dw, dh);
	    }
	};

	exports.default = ImageEntity;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = ManagerFactory;

	var _input = __webpack_require__(6);

	var _input2 = _interopRequireDefault(_input);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Manager = function () {
	    function Manager(canvas) {
	        _classCallCheck(this, Manager);

	        this.canvas = canvas;
	        this.ctx = canvas.getContext('2d');
	        this.paused = false;
	        this.input = (0, _input2.default)(canvas);
	        this.entities = [];
	    }

	    _createClass(Manager, [{
	        key: 'start',
	        value: function start() {
	            this.lastUpdate = Date.now();
	            this.__updateId = requestAnimationFrame(this.update.bind(this));
	            this.__drawId = requestAnimationFrame(this.draw.bind(this));
	        }
	    }, {
	        key: 'addEntities',
	        value: function addEntities() {
	            for (var _len = arguments.length, es = Array(_len), _key = 0; _key < _len; _key++) {
	                es[_key] = arguments[_key];
	            }

	            this.entities = this.entities.concat(es);
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = es[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var e = _step.value;

	                    e.manager = this;
	                    if (typeof e.init == 'function') e.init();
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
	        key: 'removeEntities',
	        value: function removeEntities() {
	            for (var _len2 = arguments.length, es = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                es[_key2] = arguments[_key2];
	            }

	            this.entities = this.entities.filter(function (e) {
	                if (es.includes(e)) {
	                    e.onDeath();
	                    return false;
	                }
	                return true;
	            });
	        }
	    }, {
	        key: 'getEntitiesByType',
	        value: function getEntitiesByType(type) {
	            return this.entities.filter(function (e) {
	                return e.type == type;
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            this.__updateId = requestAnimationFrame(this.update.bind(this));
	            var dt = Date.now() - this.lastUpdate;
	            if (this.paused) return;
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var e = _step2.value;

	                    if (!e.frozen) {
	                        try {
	                            e.update(dt / 1000);
	                        } catch (e) {
	                            console.error(e);
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            this.lastUpdate = Date.now();
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            this.__drawId = requestAnimationFrame(this.draw.bind(this));
	            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.entities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var e = _step3.value;

	                    if (!e.invisible) {
	                        try {
	                            this.ctx.save();
	                            this.ctx.beginPath();
	                            e.draw(this.ctx);
	                            this.ctx.closePath();
	                            this.ctx.restore();
	                        } catch (e) {
	                            console.error(e);
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            cancelAnimationFrame(this.__updateId);
	            cancelAnimationFrame(this.__drawId);
	        }
	    }]);

	    return Manager;
	}();

	function ManagerFactory() {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	    }

	    return new (Function.prototype.bind.apply(Manager, [null].concat(args)))();
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = InputFactory;

	var _keyboard = __webpack_require__(7);

	var _keyboard2 = _interopRequireDefault(_keyboard);

	var _mouse = __webpack_require__(8);

	var _mouse2 = _interopRequireDefault(_mouse);

	var _vector2d = __webpack_require__(9);

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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = init;

	var _vector2d = __webpack_require__(9);

	var _vector2d2 = _interopRequireDefault(_vector2d);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function process(ev, target, type) {
	    return {
	        type: type,
	        pos: (0, _vector2d2.default)(ev.clientX - target.offsetLeft, ev.clientY - target.offsetTop),
	        button: ev.button === 0 ? 1 : ev.button === 1 ? 3 : 2
	    };
	}

	function init(elem, callback) {
	    elem.addEventListener('mousedown', function (ev) {
	        callback(process(ev, elem, 'down'), ev);
	    });

	    elem.addEventListener('mouseup', function (ev) {
	        callback(process(ev, elem, 'up'), ev);
	    });

	    elem.addEventListener('mousemove', function (ev) {
	        callback(process(ev, elem, 'move'), ev);
	    });
	};

/***/ },
/* 9 */
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vector2d = __webpack_require__(9);

	var _vector2d2 = _interopRequireDefault(_vector2d);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Movement = {
	    speed: (0, _vector2d2.default)(0, 0),
	    pos: (0, _vector2d2.default)(0, 0),

	    move: function move(dt) {
	        this.pos = this.pos.add(this.speed.multiply(dt));
	    }
	};

	exports.default = Movement;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TextEntity = {
	    textEntityOptions: {
	        text: 'TextEntity',
	        align: 'center',
	        baseline: 'middle',
	        font: '18px monospace',
	        color: 'black'
	    },

	    drawText: function drawText(ctx) {
	        ctx.save();
	        ctx.textAlign = this.textEntityOptions.align;
	        ctx.textBaseline = this.textEntityOptions.baseline;
	        ctx.font = this.textEntityOptions.font;
	        ctx.fillStyle = this.textEntityOptions.color;
	        ctx.fillText(this.textEntityOptions.text, this.pos.x, this.pos.y);
	        ctx.restore();
	    }
	};

	exports.default = TextEntity;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vector2d = __webpack_require__(9);

	var _vector2d2 = _interopRequireDefault(_vector2d);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Sprite = {
	    spriteOptions: {
	        tileWidth: null,
	        tileHeight: null,
	        scale: null
	    },
	    _index: 0,
	    _cols: null,
	    _rows: null,
	    _anims: {},

	    drawSprite: function drawSprite(ctx) {
	        if (!this.drawWidth) this.drawWidth = this.spriteOptions.tileWidth * this.spriteOptions.scale;
	        if (!this.drawHeight) this.drawHeight = this.spriteOptions.tileHeight * this.spriteOptions.scale;
	        if (!this._cols) this._cols = this.image.width / this.spriteOptions.tileWidth;
	        if (!this._rows) this._rows = this.image.height / this.spriteOptions.tileHeight;
	        var col = this._index % this._cols,
	            row = Math.floor(this._index / this._cols);
	        this.sourceRect = {
	            width: this.spriteOptions.tileWidth,
	            height: this.spriteOptions.tileHeight,
	            pos: (0, _vector2d2.default)(col * this.spriteOptions.tileWidth, row * this.spriteOptions.tileHeight)
	        };
	        this.drawImage(ctx);
	    },
	    addAnimation: function addAnimation(name, anim) {
	        this._anims[name] = anim;
	    },
	    playAnimation: function playAnimation(name, dur, iters) {
	        this._activeAnim = this._anims[name];
	        this._timePerFrame = dur / this._anims[name].length;
	        this._playsLeft = iters;
	        this._animIndex = 0;
	        this._index = this._anims[name][0];
	        this._lastFrame = Date.now();
	    },
	    animate: function animate(dt) {
	        if (!this._activeAnim) return;
	        if (Date.now() - this._lastFrame >= this._timePerFrame) {
	            this._lastFrame = Date.now();
	            this._animIndex++;
	            if (this._animIndex >= this._activeAnim.length) {
	                this._playsLeft--;
	                if (this._playsLeft == 0) {
	                    this._animIndex--;
	                    this._index = this._activeAnim[this._animIndex];
	                    this._activeAnim = null;
	                } else {
	                    this._animIndex %= this._activeAnim.length;
	                }
	            }
	            this._index = this._activeAnim[this._animIndex];
	        }
	    }
	};

	exports.default = Sprite;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mixer = function () {
	    function Mixer() {
	        _classCallCheck(this, Mixer);

	        this.masterVolume = 1;
	        this.categories = {};
	        this._soundCategoryMap = {};
	        var AudioContext = window.AudioContext || window.webkitAudioContext;
	        this.audioContext = new AudioContext();
	    }

	    _createClass(Mixer, [{
	        key: "setMasterVolume",
	        value: function setMasterVolume(vol) {
	            this.masterVolume = vol;
	        }
	    }, {
	        key: "addCategory",
	        value: function addCategory(name) {
	            this.categories[name] = {
	                volume: 1,
	                sounds: {}
	            };
	        }
	    }, {
	        key: "addSound",
	        value: function addSound(category, name, sound) {
	            this.categories[category].sounds[name] = sound;
	            this._soundCategoryMap[name] = category;
	            sound.audioContext = this.audioContext;
	            sound.load();
	        }
	    }, {
	        key: "setCategoryVolume",
	        value: function setCategoryVolume(category, vol) {
	            this.categories[category].volume = vol;
	        }
	    }, {
	        key: "playSound",
	        value: function playSound(name) {
	            var vol = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	            var sound = this.categories[this._soundCategoryMap[name]].sounds[name],
	                volume = this.masterVolume * this.categories[this._soundCategoryMap[name]].volume * vol;
	            sound.play(volume);
	        }
	    }]);

	    return Mixer;
	}();

	function MixerFactory() {
	    return new Mixer();
	}

	exports.default = MixerFactory;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sound = function () {
	    function Sound(url) {
	        _classCallCheck(this, Sound);

	        this.url = url;
	        this.hasAsset = true;
	        this.assetsTotal = 1;
	        this.assetsLoaded = 0;
	    }

	    _createClass(Sound, [{
	        key: 'load',
	        value: function load() {
	            var _this = this;

	            var xhr = new XMLHttpRequest();
	            xhr.open('GET', this.url, true);
	            xhr.responseType = 'arraybuffer';
	            xhr.onload = function () {
	                _this.audioContext.decodeAudioData(xhr.response, function (buffer) {
	                    _this._buffer = buffer;
	                    _this.assetsLoaded = 1;
	                });
	            };
	            xhr.send();
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            var vol = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

	            var source = this.audioContext.createBufferSource(),
	                gain = this.audioContext.createGain();
	            gain.gain.value = vol;
	            source.buffer = this._buffer;
	            source.connect(gain);
	            gain.connect(this.audioContext.destination);
	            source.start(0);
	        }
	    }]);

	    return Sound;
	}();

	function SoundFactory(url) {
	    return new Sound(url);
	}

	exports.default = SoundFactory;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var keys = {
	    button1: -1,
	    button2: -2,
	    button3: -3
	};

	keys.mouseLeft = keys.button1;
	keys.mouseRight = keys.button2;
	keys.mouseMiddle = keys.mouseWheel = keys.button3;

	exports.default = keys;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var DEG2RAD = 180 / Math.PI;

	var util = {
	    boundingBoxCollide: function boundingBoxCollide(_ref, _ref2) {
	        var _ref$pos = _ref.pos;
	        var x1 = _ref$pos.x;
	        var y1 = _ref$pos.y;
	        var w1 = _ref.width;
	        var h1 = _ref.height;
	        var _ref2$pos = _ref2.pos;
	        var x2 = _ref2$pos.x;
	        var y2 = _ref2$pos.y;
	        var w2 = _ref2.width;
	        var h2 = _ref2.height;

	        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
	    },
	    rotateTransform: function rotateTransform(ctx, _ref3, rot) {
	        var x = _ref3.x;
	        var y = _ref3.y;

	        ctx.translate(x, y);
	        ctx.rotate(rot / DEG2RAD);
	        ctx.translate(-x, -y);
	    }
	};

	exports.default = util;

/***/ }
/******/ ]);