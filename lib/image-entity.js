const ImageEntity = {
    image: null,
    imageWidth: 0,
    imageHeight: 0,

    drawImage(ctx) {
        let width = this.imageWidth == 0 ? this.image.width : this.imageWidth,
            height = this.imageHeight == 0 ? this.image.height : this.imageHeight;
        ctx.drawImage(this.image, this.x - width / 2, this.y - height / 2, width, height);
    }
};

export default ImageEntity;
