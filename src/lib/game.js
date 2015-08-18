/**
* Game object.
* @class
* @extends five.Emitter
* @param {Object} opts - Options.
* @param {Boolean} [opts.debug=false] - Whether to enable debug mode.
* @param {five.Color} [opts.fpsColor=#505050] - Color for FPS view and onscreen logger.
* @param {five.Size} [opts.size=640x480] - Size of the canvas.
* @param {Number|String} [opts.fps=auto] - FPS.
* @param {five.Color} [opts.background=white] - Background color.
* @param {five.Color} [opts.loaderColor=#0080ff] - Color of loading animation.
* @param {Element} opts.target - Canvas element to render to.
* @param {Object.<String, Function>} opts.states - States for state machine.
* @param {String} opts.state - Current state.
* @param {Boolean} [opts.showFps=false] - Show FPS readout and graph.
*/
five.Game = function(opts) {
    /**
    * Time when the game was created.
    * @private
    * @var {Number}
    */
    this.initTime = Date.now();
    /**
    * Items (aka assets) loaded so far.
    * @private
    * @var {Number}
    */
    this.itemsLoaded = 0;
    /**
    * Number of items to load.
    * @private
    * @var {number}
    */
    this.itemsToLoad = 0;
    /**
    * Radius of hole in loader animation.
    * @private
    * @var {Number}
    */
    this.loaderInner = 0;
    /**
    * Radius of circle in loader animation.
    * @private
    * @var {Number}
    */
    this.loaderOuter = 0;
    /** @var {Boolean} - Whether the game is completely loaded yet. */
    this.loaded = false;
    /**
    * Array of messages logged before the logger existed.
    * @private
    * @var {Object[]}
    */
    this.backlog = [];
    /** @var {five.Entity[]} - Array of entities. */
    this.entities = [];
    /** @var {Boolean} - Whether to update entities. */
    this.updateEntities = true;
    /**
    * Logger object.
    * @private
    * @var {five.Logger}
    */
    this.logger = new five.Logger(this, {
        debug: opts.debug || false,
        timestamp: opts.debug || false,
        color: opts.fpsColor
    });
    /** @var {Boolean} - Whether debug mode is on. */
    this.debug = opts.debug || false;
    /**
    * Whether the key combination to toggle debug mode (alt-shift-l) is down.
    * @private
    * @var {Boolean}
    */
    this.debugKeysDown = false;
    /** @var {Number} - Game width. */
    this.width = opts.size.w || 640;
    /** @var {Number} - Game height. */
    this.height = opts.size.h || 480;
    /** @var {Number|String} - FPS. */
    this.fps = opts.fps || 'auto';
    // precalculate this
    if(this.fps != 'auto') {
        /**
        * Time (in milliseconds) between frames.
        * @private
        * @var {Number}
        */
        this.delay = 1000 / this.fps;
    }
    /** @var {String} - Background color. */
    this.background = typeof opts.background == 'undefined' ? '#ffffff': opts.background.toString();
    /** @var {five.Color} - Color of loading animation. */
    this.loaderColor = opts.loaderColor || new five.Color(0, 128, 255);
    /** @var {Element} - Canvas to render to. */
    this.canvas = opts.target;
    // we absolutely NEED this
    if(!this.canvas) throw new Error('five.game requires a canvas to initialize.');
    // set the width/height
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    /**
    * Canvas context object.
    * @private
    * @var {CanvasRenderingContext2D}
    */
    this.ctx = this.canvas.getContext('2d');
    /** @var {five.StateMachine} - State machine. */
    this.stateMachine = new five.StateMachine(opts.states, opts.state);
    /** @var {Boolean} - Whether to show FPS readout and graph. */
    this.showFps = !!opts.showFps;
    /** @var {five.Color} - Color of FPS readout. */
    this.fpsColor = opts.fpsColor || new five.Color(80, 80, 80);
    /** @var {five.Font} - Font for FPS readout. */
    this.fpsFont = this.font('monospace');
    /**
    * Real FPS over last 1/4 second.
    * @private
    * @var {Number}
    */
    this.realFps = 0;
    /**
    * Data shown in FPS graph.
    * @private
    * @var {Number[]}
    */
    this.fpsGraph = [];
    /** @var {five.Mouse} - Mouse tracker. */
    this.mouse = new five.Mouse(this);
    for(var i = 0; i < 80; i++) this.fpsGraph.push(0);
    // log initialization
    this.log('INIT');
    this.log('size: ' + this.width + 'x' + this.height);
    this.log('debug: ' + (opts.debug ? 'on' : 'off'));
    this.on('load', (function() {
        this.log('game loaded');
        this.log(Date.now() - this.startTime + 'ms after start() called');
        this.log(Date.now() - this.initTime + 'ms after game created');
    }).bind(this));
};

// games are emitters
five.Game.prototype = new five.Emitter();
five.Game.prototype.constructor = five.Game;

/**
* Called on each frame: updates entities, runs your code, draws log...
* @private
*/
five.Game.prototype._gameLoop = function() {
    var now = Date.now();
    // next frame
    if(this.fps == 'auto') requestAnimationFrame(this._gameLoop.bind(this));
    else setTimeout(this._gameLoop.bind(this), this.delay);
    // background color
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
    if(this.loaded) {
        // update and draw all entities
        if(this.updateEntities) this.entities.forEach(function(e) {
            e._gameLoopHandler(now - this.lastUpdate);
        }, this);
        // call the application's code
        this.stateMachine.run(now - this.lastUpdate);
        this.emit('gameLoop', {
            dt: now - this.lastUpdate
        });
        if(this.showFps) {
            // fps
            this.fpsFont.draw({
                location: new five.Point(this.width, this.height),
                color: this.fpsColor,
                baseline: 'bottom',
                alignment: 'right',
                weight: 'bold',
                size: 16,
                text: this.realFps + ' FPS'
            });
            // fps graph
            var sx = this.width - 160;
            this.ctx.save();
            this.ctx.fillStyle = new five.Color(
                this.fpsColor.r * 1.5 > 255 ? 255 : this.fpsColor.r * 1.5,
                this.fpsColor.g * 1.5 > 255 ? 255 : this.fpsColor.g * 1.5,
                this.fpsColor.b * 1.5 > 255 ? 255 : this.fpsColor.b * 1.5
            ).toString();
            this.ctx.beginPath();
            this.fpsGraph.forEach(function(n, i) {
                this.ctx.fillRect(sx + i, this.height - n / 80 * 48, 1, n / 80 * 48);
            }, this);
            this.ctx.closePath();
            this.ctx.restore();
        }
    }
    else {
        // loader
        this.ctx.beginPath();
        var amountLoaded = this.itemsToLoad === 0 ? 1 : this.itemsLoaded / this.itemsToLoad;
        this.log('loading: ' + Math.round(amountLoaded * 100) + '%');
        if(amountLoaded == 1) {
            // loaded!
            this.emit('load');
            this.loaded = true;
        }
        // loading animation
        this.ctx.strokeStyle = this.loaderColor.toString();
        var rad = (this.loaderInner + this.loaderOuter) / 2;
        var thickness = this.loaderOuter - this.loaderInner;
        this.ctx.lineWidth = thickness;
        this.ctx.arc(this.width / 2, this.height / 2, rad, 0, Math.PI * 2);
        this.ctx.stroke();
        var dt = now - this.lastUpdate;
        if(this.loaderOuter >= 32) {
            this.loaderOuter += dt * 0.06;
            this.loaderInner += dt * 0.12;
        }
        else {
            this.loaderInner = 0;
            this.loaderOuter += dt * 0.06;
        }
        if(this.loaderInner >= this.loaderOuter) {
            this.loaderInner = 0;
            this.loaderOuter = 0;
        }
    }
    if(now - this.lastFpsUpdate >= 250 && this.showFps) {
        this.realFps = Math.round(1000 / (now - this.lastUpdate));
        this.fpsGraph.push(this.realFps);
        if(this.fpsGraph.length > 80) this.fpsGraph = this.fpsGraph.slice(-80);
        this.lastFpsUpdate = now;
    }
    // draw log
    if(this.debug) this.logger.draw();
    this.lastUpdate = now;
    // alt-shift-l toggles debug mode
    if(five.keyboard.isDown('alt') && five.keyboard.isDown('shift') && five.keyboard.isDown('l')) {
        if(!this.debugKeysDown) {
            this.debug = !this.debug;
            this.debugKeysDown = true;
            this.log('toggle debug');
        }
    }
    else {
        this.debugKeysDown = false;
    }
};

/**
* Start the game loop.
*/
five.Game.prototype.start = function() {
    this.log('start game');
    this.startTime = Date.now();
    this.lastUpdate = Date.now();
    this.lastFpsUpdate = Date.now();
    // start the animation loop
    this._gameLoop();
};

/**
* Log a message.
* @param {String} msg - The message to log.
*/
five.Game.prototype.log = function(msg) {
    // it sounds weird, but the logger might not exist when we're logging some messages
    // this fixes that problem
    if(!this.logger) return this.backlog.push({
        message: msg,
        warning: false
    });
    // "flush" the backlog
    this.backlog.forEach(function(m) {
        if(m.warning) this.logger.warn(m.message);
        else this.logger.log(m.message);
    }, this);
    this.backlog = [];
    this.logger.log(msg);
};

/**
* Log a warning.
* @param {String} msg - The warning to log.
*/
five.Game.prototype.warn = function(msg) {
    // see src/lib/game.js line 268
    if(!this.logger) return this.backlog.push({
        message: msg,
        warning: true
    });
    this.backlog.forEach(function(m) {
        if(m.warning) this.logger.warn(m.message);
        else this.logger.log(m.message);
    }, this);
    this.backlog = [];
    this.logger.warn(msg);
};

/**
* Clear the log.
*/
five.Game.prototype.flushLog = function() {
    this.logger.flush();
    this.log('flush log');
};

/**
* Create a font for this game.
* @param {String} name - The name of the font.
* @returns {five.Font}
*/
five.Game.prototype.font = function(name) {
    this.log('font request: ' + name);
    return new five.Font(this, name);
};

/**
* Create a sprite for this game.
* @param {Object} opts - Options for the sprite.
* @returns {five.Sprite}
*/
five.Game.prototype.sprite = function(opts) {
    this.log('sprite request: ' + opts.image);
    return new five.Sprite(this, opts);
};

/**
* Create a tilemap for this game.
* @param {Object} opts - Options for the tilemap.
* @returns {five.Tilemap}
*/
five.Game.prototype.tilemap = function(opts) {
    this.log('tilemap request: ' + opts.url);
    return new five.Tilemap(this, opts);
};

/**
* Create an image for this game.
* @param {Object} opts - Options for the image.
* @returns {five.Image}
*/
five.Game.prototype.image = function(opts) {
    this.log('image request: ' + opts.image);
    return new five.Image(this, opts);
};

/**
* Called when an asset has loaded.
* @private
* @param {String} item - The name of the item that loaded.
*/
five.Game.prototype.itemLoaded = function(item) {
    // item load handler
    this.log('loaded asset: ' + item);
    this.itemsLoaded++;
    if(this.itemsLoaded >= this.itemsToLoad && !this.loaded) {
        this.emit('load');
        this.loaded = true;
    }
};

/**
* Change the state of the game's state machine.
* @param {String} newState - The new state.
*/
five.Game.prototype.changeState = function(newState) {
    // state changer
    this.log('change state: ' + newState);
    if(!this.stateMachine.states[newState]) return;
    this.emit('statechange', {
        old: this.stateMachine.state,
        new: newState
    });
    this.stateMachine.state = newState;
};

/**
* Add an entity to the game.
* @param {five.Entity} e - The entity to add.
*/
five.Game.prototype.addEntity = function(e) {
    this.entities.push(e);
};

/**
* Remove an entity from the game.
* @param {five.Entity} e - The entity to remove.
*/
five.Game.prototype.removeEntity = function(e) {
    this.entities = this.entities.filter(function(i) {
        return e != i;
    });
};