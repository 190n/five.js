"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Movement = {
    dx: 0,
    dy: 0,
    x: 0,
    y: 0,

    move: function move(dt) {
        this.x += this.dx * dt;
        this.y += this.dy * dt;
    }
};

exports.default = Movement;