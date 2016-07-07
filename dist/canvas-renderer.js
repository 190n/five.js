'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CanvasRendererFactory;
var CanvasRenderer = {
    init: function init(canvas) {
        this.canvas = canvas;
        this.thing = canvas.getContext('2d');
    },
    beforeDraw: function beforeDraw() {
        this.thing.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    afterDraw: function afterDraw() {},
    beforeEntityDraw: function beforeEntityDraw() {
        this.thing.save();
        this.thing.beginPath();
    },
    afterEntityDraw: function afterEntityDraw() {
        this.thing.closePath();
        this.thing.restore();
    }
};

function CanvasRendererFactory() {};