"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ImageEntity = {
    image: null,
    imageWidth: 0,
    imageHeight: 0,

    drawImage: function drawImage(ctx) {
        var width = this.imageWidth == 0 ? this.image.width : this.imageWidth,
            height = this.imageHeight == 0 ? this.image.height : this.imageHeight;
        ctx.drawImage(this.image, this.x - width / 2, this.y - height / 2, width, height);
    }
};

exports.default = ImageEntity;