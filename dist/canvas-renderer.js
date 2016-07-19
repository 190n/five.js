'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = CanvasRendererFactory;

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasRenderer = function (_Renderer) {
    _inherits(CanvasRenderer, _Renderer);

    function CanvasRenderer(canvas) {
        _classCallCheck(this, CanvasRenderer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasRenderer).call(this));

        _this.elem = canvas;
        _this.thing = canvas.getContext('2d');
        return _this;
    }

    _createClass(CanvasRenderer, [{
        key: 'beforeDraw',
        value: function beforeDraw() {
            this.thing.clearRect(0, 0, this.elem.width, this.elem.height);
        }
    }, {
        key: 'afterDraw',
        value: function afterDraw() {}
    }, {
        key: 'beforeEntityDraw',
        value: function beforeEntityDraw() {
            this.thing.save();
            this.thing.beginPath();
        }
    }, {
        key: 'afterEntityDraw',
        value: function afterEntityDraw() {
            this.thing.closePath();
            this.thing.restore();
        }
    }]);

    return CanvasRenderer;
}(_renderer2.default);

function CanvasRendererFactory() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(CanvasRenderer, [null].concat(args)))();
};