"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var DEG2RAD = 180 / Math.PI;

var util = {
    boundingBoxCollide: function boundingBoxCollide(_ref, _ref2) {
        var _ref$pos = _ref.pos;
        var x1 = _ref$pos.x;
        var y1 = _ref$pos.y;
        var w1 = _ref.width;
        var h1 = _ref.height;
        var _ref2$pos = _ref2.pos;
        var x2 = _ref2$pos.x;
        var y2 = _ref2$pos.y;
        var w2 = _ref2.width;
        var h2 = _ref2.height;

        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    },
    rotateTransform: function rotateTransform(ctx, _ref3, rot) {
        var x = _ref3.x;
        var y = _ref3.y;

        ctx.translate(x, y);
        ctx.rotate(rot / DEG2RAD);
        ctx.translate(-x, -y);
    }
};

exports.default = util;