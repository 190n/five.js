'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _baseEntity = require('./base-entity');

var _baseEntity2 = _interopRequireDefault(_baseEntity);

var _compoundEntity = require('./compound-entity');

var _compoundEntity2 = _interopRequireDefault(_compoundEntity);

var _imageEntity = require('./image-entity');

var _imageEntity2 = _interopRequireDefault(_imageEntity);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _movement = require('./movement');

var _movement2 = _interopRequireDefault(_movement);

var _textEntity = require('./text-entity');

var _textEntity2 = _interopRequireDefault(_textEntity);

var _vector2d = require('./vector2d.js');

var _vector2d2 = _interopRequireDefault(_vector2d);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var five = {
    VERSION: '0.3.11',

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
    util: _util2.default
};

exports.default = five;