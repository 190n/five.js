five.Entity = function(game, opts) {
    this.game = game;
    this.x = typeof opts.location == 'undefined' ? 0 : opts.location.x;
    this.y = typeof opts.location == 'undefined' ? 0 : opts.location.y;
    // size defaults to tileSize for the sprite
    this.size = opts.size || opts.tileSize;
    this.alpha = typeof opts.alpha == 'undefined' ? 1 : opts.alpha;
    this.rotation = opts.rotation || 0;
    this.image = opts.image;
    this.boundingBox = typeof opts.boundingBox == 'undefined' ?
        new five.Rect(new five.Point(this.x, this.y), this.size) :
        new five.Rect(
            // tweak the bounding box to the user's specification
            new five.Point(this.x + opts.boundingBox.x, this.y + opts.boundingBox.y),
            new five.Size(this.size.w + opts.boundingBox.w, this.size.h + opts.boundingBox.h)
        );
    if(opts.delta) {
        this.delta = opts.delta;
    }
    else if(opts.vector) {
        this.vector = opts.vector;
    }
    else this.delta = new five.Delta(0, 0);
    this.sprite = game.sprite({
        image: this.image,
        tileSize: opts.tileSize,
        size: this.size,
        location: new five.Point(this.x, this.y),
        alpha: this.alpha,
        rotation: this.rotation
    });
    this.sprite.on('load', function() {
        this.emit('spawn');
    }.bind(this));
    for(var name in opts.animations) {
        this.sprite.addAnimation(name, opts.animations[name]);
    }
    this.dead = false;
    this.alive = true;
    this.killer = undefined;
    this.game.addEntity(this);
};

// entities are emitters
five.Entity.prototype = new five.Emitter();
five.Entity.prototype.constructor = five.Entity;

five.Entity.prototype._update = function(dt) {
    // update sprite
    this.sprite.update(dt);
    // convert vector to delta if we're using vectors
    var delta = this.vector ? this.vector.delta : this.delta;
    // move
    this.x += delta.dx * (dt / 1000);
    this.y += delta.dy * (dt / 1000);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.opacity = this.opacity;
    this.sprite.rotation = this.rotation;
};

five.Entity.prototype.draw = function() {
    // draw sprite
    this.sprite.draw();
};

five.Entity.prototype.play = function(name, dur, iters) {
    this.sprite.play(name, dur, iters);
};

five.Entity.prototype._gameLoopHandler = function(dt) {
    if(typeof this.update == 'function') this.update(dt);
    this._update(dt);
    this.draw();
};

five.Entity.prototype.kill = function() {
    this.dead = true;
    this.alive = false;
    this.emit('die', this.killer);
    if(typeof this.die == 'function') this.die();
    this.game.removeEntity(this);
};