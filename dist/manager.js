'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ManagerFactory;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
    function Manager(canvas) {
        _classCallCheck(this, Manager);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paused = false;
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