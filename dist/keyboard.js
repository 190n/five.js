'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;
function init(elem, capture, callback) {
    var pressed = [];

    elem.addEventListener('keydown', function (ev) {
        if (capture) ev.preventDefault();
        pressed.push(ev.keyCode);
        callback({
            type: 'down',
            key: ev.keyCode
        });
    }, false);

    elem.addEventListener('keyup', function (ev) {
        if (capture) ev.preventDefault();
        pressed = pressed.filter(function (k) {
            return k != ev.keyCode;
        });
        callback({
            type: 'up',
            key: ev.keyCode
        });
    }, false);

    return function (key) {
        return pressed.includes(key);
    };
};