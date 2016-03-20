"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ImageEntity = {
    image: null,
    sourceRect: null,
    drawWidth: 0,
    drawHeight: 0,

    drawImage: function drawImage(ctx) {
        var dw = this.imageWidth == 0 ? this.imageWidth = this.image.width : this.imageWidth,
            dh = this.imageHeight == 0 ? this.imageHeight = this.image.height : this.imageHeight,
            dx = this.pos.x,
            dy = this.pos.y,
            sw = this.sourceRect ? this.sourceRect.width : dw,
            sh = this.sourceRect ? this.sourceRect.height : dh,
            sx = this.sourceRect ? this.sourceRect.pos.x : 0,
            sy = this.sourceRect ? this.sourceRect.pos.y : 0;
        ctx.drawImage(this.image, sx, sy, sw, sh, dx - dw / 2, dy - dh / 2, dw, dh);
    }
};

exports.default = ImageEntity;