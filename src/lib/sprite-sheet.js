five.SpriteSheet = function(game, opts) {
    this.game = game;
    this.loaded = false;
    // this is another item to load
    this.game.itemsToLoad++;
    this.img = new Image();
    this.img.addEventListener('load', function() {
        this.game.itemLoaded(this);
        this.loaded = true;
        this.emit('load');
    }.bind(this), false);
    this.img.src = opts.image;
    if(opts.tileSize) {
        this.tileWidth = opts.tileSize.w;
        this.tileHeight = opts.tileSize.h;
    }
};

// sprite sheets are emitters
five.SpriteSheet.prototype = new five.Emitter();
five.SpriteSheet.prototype.constructor = five.SpriteSheet;

five.SpriteSheet.prototype.draw = function(opts) {
    if(!this.loaded) return;
    // calculate the source x, y, width, and height,
    // and destination x, y, width, and height
    var sx = opts.index * this.tileWidth;
    var sy = 0;
    var sWidth = this.tileWidth;
    var sHeight = this.tileHeight;
    var dx = opts.location.x;
    var dy = opts.location.y;
    var size = opts.size || new five.Size(this.tileWidth, this.tileHeight);
    this.game.ctx.save();
    // rotation around the center point
    this.game.ctx.translate(dx + size.w / 2, dy + size.h / 2);
    this.game.ctx.rotate(five.Vector.deg2rad(opts.rotation || 0));
    this.game.ctx.translate(-(dx + size.w / 2), -(dy + size.h / 2));
    // set the opacity
    this.game.ctx.globalAlpha = typeof opts.opacity == 'undefined' ? 1 : opts.opacity;
    // actually draw
    this.game.ctx.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, size.w, size.h);
    this.game.ctx.restore();
};

five.SpriteSheet.prototype.toString = function() {
    return this.img.src;
};