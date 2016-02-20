"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    }, {
        key: "length",
        value: function length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: "angle",
        value: function angle() {
            return Math.atan2(this.y, this.x) * (180 / Math.PI);
        }
    }, {
        key: "toPolar",
        value: function toPolar() {
            return [this.angle(), this.length()];
        }
    }]);

    return Vector2D;
}();

function fromPolar(deg, len) {
    var rad = deg / (180 / Math.PI),
        xf = Math.round(Math.cos(rad) * 1000) / 1000,
        yf = Math.round(Math.sin(rad) * 1000) / 1000;
    return new Vector2D(xf, yf).multiply(len);
}

function Vector2DFactory() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Vector2D, [null].concat(args)))();
}

Vector2DFactory.fromPolar = fromPolar;
exports.default = Vector2DFactory;