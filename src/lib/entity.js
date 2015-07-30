five.entity = function(game, opts) {
    // factory
    return new five._Entity(game, opts);
};

five._Entity = function(game, opts) {
    this.game = game;
    this.x = typeof opts.location == 'undefined' ? 0 : opts.location.x;
    this.y = typeof opts.location == 'undefined' ? 0 : opts.location.y;
    // size defaults to tileSize for the sprite
    this.size = opts.size || opts.tileSize;
    this.alpha = typeof opts.alpha == 'undefined' ? 1 : opts.alpha;
    this.rotation = opts.rotation || 0;
    this.image = opts.image;
    this.boundingBox = typeof opts.boundingBox == 'undefined' ?
        five.rect(five.point(this.x, this.y), this.size) :
        five.rect(
            // tweak the bounding box to the user's specification
            five.point(this.x + opts.boundingBox.x, this.y + opts.boundingBox.y),
            five.size(this.size.w + opts.boundingBox.w, this.size.h + opts.boundingBox.h)
        );
    if(opts.delta) {
        this.delta = opts.delta;
    }
    else if(opts.vector) {
        this.vector = opts.vector;
    }
    else this.delta = five.delta(0, 0);
    this.sprite = game.sprite({
        image: this.image,
        tileSize: opts.tileSize,
        size: this.size,
        location: five.point(this.x, this.y),
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
five._Entity.prototype = five.emitter();
five._Entity.prototype.constructor = five._Entity;

five._Entity.prototype._update = function(dt) {
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

five._Entity.prototype.draw = function() {
    // draw sprite
    this.sprite.draw();
};

five._Entity.prototype.play = function(name, dur, iters) {
    this.sprite.play(name, dur, iters);
};

five._Entity.prototype._gameLoopHandler = function(dt) {
    if(typeof this.update == 'function') this.update(dt);
    this._update(dt);
    this.draw();
};

five._Entity.prototype.kill = function() {
    this.dead = true;
    this.alive = false;
    this.emit('die', this.killer);
    if(typeof this.die == 'function') this.die();
    this.game.removeEntity(this);
};