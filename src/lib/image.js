five.Image = function(game, opts) {
    this.game = game;
    this.sheet = new five.SpriteSheet(game, {
        image: opts.image
    });
    this.sheet.on('load', (function() {
        this.sheet.tileWidth = this.sheet.img.width;
        this.sheet.tileHeight = this.sheet.img.height;
        this.size = opts.size;
    }).bind(this));
    this.location = opts.location;
    this.rotation = opts.rotation;
    this.alpha = typeof opts.alpha == 'undefined' ? 1 : opts.alpha;
};

five.Image.prototype.draw = function(opts) {
    // draw it at index 0 (the whole image)
    this.sheet.draw({
        index: 0,
        location: this.location || opts.location,
        size: this.size,
        rotation: this.rotation || opts.location,
        alpha: this.alpha
    });
};