/**
* An entity in a game.
* @class
* @emits Entity#spawn
* @extends five.Emitter
* @param {five.Game} game - The game the entity is a part of.
* @param {Object} opts - The options object.
* @param {five.Point} [opts.location=(0, 0)] - The location of the entity.
* @param {five.Size} [opts.size=opts.tileSize] - The size of the entity.
* @param {Number} [opts.alpha=1] - The opacity of the entity.
* @param {Number} [opts.rotation=0] - The rotation of the entity in degrees.
* @param {String} opts.image - The URL to the sprite sheet for the entity.
* @param {five.Rect} [opts.boundingBox=A bounding box generated from the location and the size.] - The entity's bounding box.
* @param {five.Delta} [opts.delta=dx=0, dy=0] - The movement delta for the entity.
* @param {five.Vector} [opts.vector] - The movement vector for the entity.
* @param {Object.<String, Number[]>} opts.animations - The entity's sprite sheet animations.
*/
five.Entity = function(game, opts) {
    /** @var {five.Game} - The parent game object. */
    this.game = game;
    /** @var {Number} - X position. */
    this.x = typeof opts.location == 'undefined' ? 0 : opts.location.x;
    /** @var {Number} - Y position. */
    this.y = typeof opts.location == 'undefined' ? 0 : opts.location.y;
    // size defaults to tileSize for the sprite
    /** @var {five.Size} - Size of the entity. */
    this.size = opts.size || opts.tileSize;
    /** @var {Number} - Opacity. */
    this.alpha = typeof opts.alpha == 'undefined' ? 1 : opts.alpha;
    /** @var {Number} - Rotation in degrees. */
    this.rotation = opts.rotation || 0;
    /** @var {String} - URL of sprite sheet. */
    this.image = opts.image;
    /** @var {five.Rect} - Bounding box. */
    this.boundingBox = typeof opts.boundingBox == 'undefined' ?
        new five.Rect(new five.Point(this.x, this.y), this.size) :
        new five.Rect(
            // tweak the bounding box to the user's specification
            new five.Point(this.x + opts.boundingBox.x, this.y + opts.boundingBox.y),
            new five.Size(this.size.w + opts.boundingBox.w, this.size.h + opts.boundingBox.h)
        );
    if(opts.delta) {
        /** @var {five.Delta} - Movement delta. */
        this.delta = opts.delta;
    }
    else if(opts.vector) {
        /** @var {five.Vector} - Movement vector. */
        this.vector = opts.vector;
    }
    else this.delta = new five.Delta(0, 0);
    /**
    * Sprite object.
    * @private
    * @var {five.Sprite}
    */
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
    /** @var {Boolean} - Whether the entity is dead. */
    this.dead = false;
    /** @var {Boolean} - Whether the entity is alive. */
    this.alive = true;
    /** @var {?five.Entity} - What killed the entity. */
    this.killer = undefined;
    this.game.addEntity(this);
};

// entities are emitters
five.Entity.prototype = new five.Emitter();
five.Entity.prototype.constructor = five.Entity;

/**
* Handles movement and other built-in behaviors.
* @private
* @param {Number} dt - The time in milliseconds since the last frame.
*/
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

/**
* Draws the entity.
* @private
*/
five.Entity.prototype.draw = function() {
    // draw sprite
    this.sprite.draw();
};

/**
* Plays an animation of the entity.
* @see Sprite#play
* @param {String} name - Name of animation to play.
* @param {Number} dur - Length in milliseconds of each iteration.
* @param {Number} iters - Number of iterations to play for (0 = infinite)
*/
five.Entity.prototype.play = function(name, dur, iters) {
    this.sprite.play(name, dur, iters);
};

/**
* Called on every frame.
* @private
* @param {Number} dt - Time in milliseconds since last frame.
*/
five.Entity.prototype._gameLoopHandler = function(dt) {
    this.update(dt);
    this._update(dt);
    this.draw();
};

/**
* Add any custom code for your entities to their update methods.
* @abstract
* @param {Number} dt - Time in milliseconds since last frame.
*/
five.Entity.prototype.update = function(dt) {

};

/**
* Kills an entity.
* @emits Entity#kill
*/
five.Entity.prototype.kill = function() {
    this.dead = true;
    this.alive = false;
    this.emit('die', this.killer);
    if(typeof this.die == 'function') this.die();
    this.game.removeEntity(this);
};