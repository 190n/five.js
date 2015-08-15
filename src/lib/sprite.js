five.Sprite = function(game, opts) {
    this.game = game;
    this.sheet = new five.SpriteSheet(game, {
        image: opts.image,
        tileSize: opts.tileSize,
        game: game
    });
    this.sheet.on('load', (function() {
        this.emit('load');
    }).bind(this));
    this.x = opts.location.x;
    this.y = opts.location.y;
    this.index = opts.index || 0;
    this.animations = {};
    this.animation = null;
    // time since animation looped
    this.timer = 0;
    // iteration counter for looping animations
    this.counter = 0;
    this.size = opts.size;
    // opacity defaults to fully opaque
    this.opacity = typeof opts.opacity == 'undefined' ? 1 : opts.opacity;
    this.rotation = opts.rotation || 0;
    this.index = 0;
};

// sprites are emitters
five.Sprite.prototype = new five.Emitter();
five.Sprite.prototype.constructor = five.Sprite;

five.Sprite.prototype.addAnimation = function(name, a) {
    this.animations[name] = a;
};

five.Sprite.prototype.play = function(name, dur, iters) {
    // set the current animation
    this.animation = {
        name: name,
        duration: dur,
        iterations: iters
    };
    // reset the iteration counter
    this.counter = 0;
};

five.Sprite.prototype.update = function(dt) {
    // no animation? return!
    if(this.animation === null) return;
    var anim = this.animations[this.animation.name];
    var l = this.animation.duration;
    // find the index
    var i = anim[Math.floor(this.timer / l * anim.length)];
    if(i === undefined) {
        if(this.counter < this.animation.iterations || this.animation.iterations === 0) {
            // loop the animation
            this.counter++;
            i = anim[0];
            this.timer = 0;
            this.emit('loop');
        }
        else {
            // end the animation
            i = anim[anim.length - 1];
            this.emit('end');
        }
    }
    this.timer += dt;
    this.index = i;
};

five.Sprite.prototype.draw = function() {
    // draw the sprite sheet
    this.sheet.draw({
        location: new five.Point(this.x, this.y),
        index: this.index,
        size: this.size,
        opacity: this.opacity,
        rotation: this.rotation
    });
};