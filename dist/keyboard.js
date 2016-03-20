'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pressed = [];

window.addEventListener('keydown', function (e) {
    pressed.push(e.keyCode);
}, false);

window.addEventListener('keyup', function (e) {
    pressed = pressed.filter(function (k) {
        return k != e.keyCode;
    });
}, false);

exports.default = {
    pressed: pressed,
    isDown: function isDown(key) {
        return pressed.includes(key);
    }
};