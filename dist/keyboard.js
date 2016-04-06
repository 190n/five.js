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