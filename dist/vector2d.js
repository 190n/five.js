"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Vecor2DFactory;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2D = function () {
    function Vector2D(x, y) {
        _classCallCheck(this, Vector2D);

        this.x = x;
        this.y = y;
    }

    _createClass(Vector2D, [{
        key: "add",
        value: function add(vec) {
            return new Vector2D(this.x + vec.x, this.y + vec.y);
        }
    }, {
        key: "multiply",
        value: function multiply(factor) {
            return new Vector2D(this.x * factor, this.y * factor);
        }
    }]);

    return Vector2D;
}();

Vector2D.fromPolar = function (deg, len) {
    var rad = deg * (180 / Math.PI),
        xf = Math.round(Math.cos(rad) * 1000) / 1000,
        yf = Math.round(Math.sin(rad) * 1000) / 1000;
    return new Vector2D(xf, yf).multiply(len);
};

function Vecor2DFactory() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Vector2D, [null].concat(args)))();
};