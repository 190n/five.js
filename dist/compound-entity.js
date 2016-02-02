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

                e.x -= this.x;
                e.y -= this.y;
                e.update(dt);
                e.x += this.x;
                e.y += this.y;
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