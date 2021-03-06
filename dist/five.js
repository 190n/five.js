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

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _mixer = require('./mixer');

var _mixer2 = _interopRequireDefault(_mixer);

var _sound = require('./sound');

var _sound2 = _interopRequireDefault(_sound);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _canvasRenderer = require('./canvas-renderer');

var _canvasRenderer2 = _interopRequireDefault(_canvasRenderer);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var five = {
    VERSION: '0.7.2',

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
    Renderer: _renderer2.default,
    CanvasRenderer: _canvasRenderer2.default,
    keys: _keys2.default,
    util: _util2.default
};

exports.default = five;