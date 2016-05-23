'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = ManagerFactory;

var _input = require('./input');

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
            this.__loopId = requestAnimationFrame(this.loop.bind(this));
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
        key: 'loop',
        value: function loop() {
            this.__loopId = requestAnimationFrame(this.loop.bind(this));
            this.update();
            this.draw();
        }
    }, {
        key: 'update',
        value: function update() {
            var dt = Date.now() - this.lastUpdate;
            if (this.paused) return;
            for (var i = 0; i < this.entities.length; i++) {
                var e = this.entities[i];
                if (!e.frozen) {
                    try {
                        e.update(dt / 1000);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            this.lastUpdate = Date.now();
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < this.entities.length; i++) {
                var e = this.entities[i];
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
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            cancelAnimationFrame(this.__loopId);
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