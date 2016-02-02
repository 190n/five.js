"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var util = {
    boundingBoxCollide: function boundingBoxCollide(_ref, _ref2) {
        var x1 = _ref.x;
        var y1 = _ref.y;
        var w1 = _ref.width;
        var h1 = _ref.height;
        var x2 = _ref2.x;
        var y2 = _ref2.y;
        var w2 = _ref2.width;
        var h2 = _ref2.height;

        return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
    }
};

exports.default = util;