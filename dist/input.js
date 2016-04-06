'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = InputFactory;

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _mouse = require('./mouse');

var _mouse2 = _interopRequireDefault(_mouse);

var _vector2d = require('./vector2d');

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