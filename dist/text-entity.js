'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TextEntity = {
    textEntityOptions: {
        text: 'TextEntity',
        align: 'center',
        baseline: 'middle',
        font: '18px monospace',
        color: 'black'
    },

    drawText: function drawText(ctx) {
        ctx.save();
        ctx.textAlign = this.textEntityOptions.align;
        ctx.textBaseline = this.textEntityOptions.baseline;
        ctx.font = this.textEntityOptions.font;
        ctx.fillStyle = this.textEntityOptions.color;
        ctx.fillText(this.textEntityOptions.text, this.x, this.y);
        ctx.restore();
    }
};

exports.default = TextEntity;