five.Game = function(opts) {
    this.initTime = Date.now();
    // for the preloader
    this.itemsLoaded = 0;
    this.itemsToLoad = 0;
    // for loading animation
    // loaderInner: radius of "hole"
    this.loaderInner = 0;
    // loaderOuter: radius of entire circle
    this.loaderOuter = 0;
    this.loaded = false;
    // in some instances, we will try to log before the logger exists.
    this.backlog = [];
    // array of entities
    this.entities = [];
    // whether or not we should update entities
    this.updateEntities = true;
    // make a logger
    this.logger = new five.Logger(this, {
        debug: opts.debug || false,
        timestamp: opts.debug || false,
        color: opts.fpsColor
    });
    this.debug = opts.debug || false;
    this.debugKeysDown = false;
    // 640x480 is default but people shouldn't rely on the default.
    if(!opts.size) console.warn('No size specified. Defaulting to 640x480.');
    this.width = opts.size.w || 640;
    this.height = opts.size.h || 480;
    // 'auto' = requestAnimationFrame for animation
    this.fps = opts.fps || 'auto';
    // precalculate this
    if(this.fps != 'auto') this.delay = 1000 / this.fps;
    // background defaults to white
    this.background = typeof opts.background == 'undefined' ? '#ffffff': opts.background.toString();
    // light blue
    this.loaderColor = opts.loaderColor || new five.Color(0, 128, 255);
    this.canvas = opts.target;
    // we absolutely NEED this
    if(!this.canvas) throw new Error('five.game requires a canvas to initialize.');
    // set the width/height
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // context object
    this.ctx = this.canvas.getContext('2d');
    // state machine
    this.stateMachine = new five.StateMachine(opts.states, opts.state);
    // fps logger
    this.showFps = opts.showFps || false;
    this.fpsColor = opts.fpsColor || new five.Color(80, 80, 80);
    this.fpsFont = this.font('monospace');
    this.realFps = 0;
    this.fpsGraph = [];
    // create mouse tracker
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

five.Game.prototype.start = function() {
    this.log('start game');
    this.startTime = Date.now();
    this.lastUpdate = Date.now();
    this.lastFpsUpdate = Date.now();
    // start the animation loop
    this._gameLoop();
};

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

five.Game.prototype.warn = function(msg) {
    // see line 160
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

five.Game.prototype.flushLog = function() {
    this.logger.flush();
    this.log('flush log');
};

five.Game.prototype.font = function(name) {
    this.log('font request: ' + name);
    return new five.Font(this, name);
};

five.Game.prototype.sprite = function(opts) {
    this.log('sprite request: ' + opts.image);
    return new five.Sprite(this, opts);
};

five.Game.prototype.tilemap = function(opts) {
    this.log('tilemap request: ' + opts.url);
    return new five.Tilemap(this, opts);
};

five.Game.prototype.image = function(opts) {
    this.log('image request: ' + opts.image);
    return new five.Image(this, opts);
};

five.Game.prototype.itemLoaded = function(item) {
    // item load handler
    this.log('loaded asset: ' + item);
    this.itemsLoaded++;
    if(this.itemsLoaded >= this.itemsToLoad && !this.loaded) {
        this.emit('load');
        this.loaded = true;
    }
};

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

five.Game.prototype.addEntity = function(e) {
    this.entities.push(e);
};

five.Game.prototype.removeEntity = function(e) {
    this.entities = this.entities.filter(function(i) {
        return e != i;
    });
};