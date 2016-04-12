'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;

var _vector2d = require('./vector2d');

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