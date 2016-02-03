'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vector2d = require('./vector2d');

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