// five.js library v0.1.1
// licensed under LGPL 3.0 license
// built 2015-08-17

// in case the library before this didn't end with a semicolon
;
'use strict';

(function(five) {
    // node.js/io.js module export
    if(this.module && this.module.exports) module.exports = five;
    // global variable
    else this.five = five;
}).call(this, (function(isNode) {

// base definition
/**
* Main library namespace.
* @namespace
* @global
* @exports five
* @prop {string} version - Library version.
* @prop {number} canvasSupport - Canvas support. 0: no support. 0.5: basic support but no text. 1: full support.
*/
var five = {
    version: '0.1.1',
    // canvasSupport:
    // 0 = no support
    // 0.5 = basic support but no text
    // 1 = full support
    canvasSupport: isNode ? 1 : !!this.CanvasRenderingContext2D / 2 + !!this.TextMetrics / 2
};

if(five.canvasSupport == 0.5) console.warn('No canvas text support.');
if(!five.canvasSupport) throw new Error('No canvas support.');

/**
* Object to represent a circle.
* @class
* @param {five.Point} loc - Center of the circle.
* @param {number} rad - Radius of the circle.
*/
five.Circ = function(loc, rad) {
    // position
    /** @var {number} */
    this.x = loc.x;
    /** @var {number} */
    this.y = loc.y;
    // radius
    /** @var {number} */
    this.radius = rad;
};

/**
* Returns the bounding box of a circle.
* @namepath Circ#boundingBox
* @returns five.Rect
*/
five.Circ.prototype.boundingBox = function() {
    return new five.Rect(
        new five.Point(this.x - this.radius, this.y - this.radius),
        new five.Size(this.radius * 2, this.radius * 2)
    );
};

five.collider = {
    rectVsRect: function(r1, r2) {
        // bounding-box collision detection
        return r1.x <= r2.x + r2.w &&
            r1.x + r1.w >= r2.x &&
            r1.y <= r2.y + r2.h &&
            r1.y + r1.h >= r2.y;
    },

    circVsCirc: function(c1, c2) {
        // is the distance between their center points
        // less than or equal to the sum of their radii?
        return new five.Point(c1.x, c1.y).distanceTo(new five.Point(c2.x, c2.y)) <= c1.radius + c2.radius;
    },

    rectVsPoint: function(r, p) {
        // is the point in the rectangle?
        return (p.x > r.x || p.x < r.x + r.w) && (p.y > r.y || p.y < r.y + r.h);
    },

    circVsPoint: function(c, p) {
        return new five.Point(c.x, c.y).distanceTo(p) <= c.radius;
    }
};

five.Color = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    // alpha channel defaults to opaque
    this.a = typeof a == 'undefined' ? 1 : a;
};

// function to get CSS string representation
five.Color.prototype.toString = function() {
    // rgba() format is the easiest to construct here
    return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
};

five.Delta = function(dx, dy) {
    this.dx = dx;
    this.dy = dy;
};

// getter for length
Object.defineProperty(five.Delta.prototype, 'length', {
    get: function() {
        // Pythagorean theorem
        return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    }
});

// conversion to vector
Object.defineProperty(five.Delta.prototype, 'vector', {
    get: function() {
        return new five.Vector(Math.atan2(this.dy, this.dx) * (180 / Math.PI) + 90, this.length);
    }
});

five.Delta.prototype.add = function(otherDelta) {
    return new five.Delta(this.dx + otherDelta.dx, this.dy + otherDelta.dy);
};

five.Emitter = function() {
    // no listeners yet
    this._listeners = {};
};

five.Emitter.prototype.on = function(evt, listener) {
    // when extended, the constructor is bypassed
    // so we might not have a listeners object yet
    if(!this._listeners) this._listeners = {};
    // add an array of listeners for the event if we don't have one already
    if(!this._listeners[evt]) this._listeners[evt] = [];
    // add the listener
    this._listeners[evt].push(listener);
};

five.Emitter.prototype.emit = function(name, evt) {
    // for every listener for the specified event
    if(this._listeners[name]) this._listeners[name].forEach(function(l) {
        // call it with the event object
        if(typeof l == 'function') l(evt);
    }, this);
};

five.Emitter.prototype.off = function(evt, listener) {
    if(!this._listeners[evt]) this._listeners[evt] = [];
    // filter through and remove all of the specified listener
    this._listeners[evt] = this._listeners[evt].filter(function(l) {
        return l != listener;
    });
};

five.Emitter.prototype.once = function(evt, listener) {
    // create a listener that calls the specified function
    // then deletes itself
    var l = (function(e) {
        listener(e);
        this.off(evt, l);
    }).bind(this);
    this.on(evt, l);
};

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

five.Font = function(game, name) {
    this.game = game;
    this.name = name;
};

five.Font.prototype.draw = function(opts) {
    var ctx = this.game.ctx;
    ctx.save();
    // construct font string
    ctx.font = (opts.style || '') + ' ' + (opts.weight || '') + ' ' + (opts.size || 16) + 'px ' + this.name;
    ctx.textBaseline = opts.baseline;
    ctx.textAlign = opts.alignment;
    ctx.fillStyle = typeof opts.color == 'undefined' ? '#000000' : opts.color.toString();
    // draw the text
    ctx.fillText(opts.text, opts.location.x, opts.location.y);
    ctx.restore();
};

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

// the keyboard object is an emitter
five.keyboard = new five.Emitter();
// huge map for keycode --> user-friendly name
five.keyboard.map = {
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    96: '0-numpad',
    97: '1-numpad',
    98: '2-numpad',
    99: '3-numpad',
    100: '4-numpad',
    101: '5-numpad',
    102: '6-numpad',
    103: '7-numpad',
    104: '8-numpad',
    105: '9-numpad',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    27: 'escape',
    32: 'space',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12'
};

// array of keys that are down
five.keyboard.active = [];

// window will be undefined in node.js/io.js
// so we won't try to add event listeners
// unless we're in a browser
if(!isNode) window.addEventListener('load', function() {
    document.body.onkeydown = function(e) {
        var name = five.keyboard.map[e.keyCode];
        // unknown key? return!
        if(!name) return;
        // the key's now down
        five.keyboard.active.push(name);
        // emit the events
        // generic
        five.keyboard.emit('down', {
            key: name
        });
        // specific
        five.keyboard.emit('down:' + name);
    };

    document.body.onkeyup = function(e) {
        var name = five.keyboard.map[e.keyCode];
        if(!name) return;
        // the key is now down
        five.keyboard.active = five.keyboard.active.filter(function(k) {
            return k != name;
        });
        five.keyboard.emit('up', {
            key: name
        });
        five.keyboard.emit('up:' + name);
    };

    document.body.onkeypress = function(e) {
        var name = five.keyboard.map[e.keyCode];
        if(!name) return;
        five.keyboard.emit('press', {
            key: name
        });
        five.keyboard.emit('press:' + name);
    };
}, false);

five.keyboard.isDown = function(name) {
    // in the active array? down!
    return this.active.indexOf(name) > -1;
};

five.Logger = function(game, opts) {
    // we need the game to draw the log
    this.game = game;
    // debug=true: log to console and canvas
    // debug=false (default): log only to console
    this.debug = opts.debug || false;
    // show timestamps before log messages?
    this.timestamp = opts.timestamp || false;
    // monospace font; this is a log!
    this.font = game.font('monospace');
    // what color?
    this.color = opts.color || new five.Color(80, 80, 80);
    // messages in log
    this.msgs = [];
};

five.Logger.prototype.log = function(msg) {
    // add timestamp if necessary
    if(this.timestamp) msg = '[' + Date.now() + '] ' + msg;
    // some browsers don't have console
    try {
        console.log(msg);
    }
    catch(e) {

    }
    if(this.debug) {
        this.msgs.push({
            message: msg,
            bold: false // ordinary messages are not bold
        });
        // max 20 messages
        if(this.msgs.length > 20) this.msgs = this.msgs.slice(-20);
    }
};

five.Logger.prototype.warn = function(msg) {
    // the console will put 'warning: ' for us
    if(this.debug) msg = 'warning: ' + msg;
    if(this.timestamp) msg = '[' + Date.now() + '] ' + msg;
    try {
        console.warn(msg);
    }
    catch(e) {

    }
    if(this.debug) {
        this.msgs.push({
            message: msg,
            bold: true // warnings are bold
        });
        if(this.msgs.length > 20) this.msgs = this.msgs.slice(-20);
    }
};

five.Logger.prototype.draw = function() {
    // y position for top of log
    var sy = this.game.height - this.msgs.length * 14;
    this.msgs.forEach(function(m, i) {
        // y position for this message
        var y = i * 14 + sy;
        this.font.draw({
            location: new five.Point(0, y),
            color: this.color,
            baseline: 'top',
            alignment: 'left',
            weight: m.bold ? 'bold' : 'normal',
            size: 12,
            text: m.message
        });
    }, this);
};

five.Logger.prototype.flush = function() {
    // flush the log
    this.msgs = [];
};

five.Mouse = function(game) {
    this.canvas = game.canvas;
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.left = false;
    this.middle = false;
    this.right = false;
    document.addEventListener('mousemove', function(e) {
        // calculate x and y relative to canvas
        this.x = e.clientX - e.target.offsetLeft;
        this.y = e.clientY - e.target.offsetTop;
    }.bind(this));
    this.canvas.addEventListener('mousedown', function(e) {
        // figure out which button was pressed
        var button = e.button ? (e.button == 1 ? 'middle' : 'right') : 'left';
        // dispatch events
        this.emit('down', {
            button: button
        });
        this.emit('down:' + button);
        // set property
        this[button] = true;
    }.bind(this));
    this.canvas.addEventListener('mouseup', function(e) {
        // figure out which button was pressed
        var button = e.button ? (e.button == 1 ? 'middle' : 'right') : 'left';
        // dispatch events
        this.emit('up', {
            button: button
        });
        this.emit('up:' + button);
        this.emit('click', {
            button: button
        });
        this.emit('click:' + button);
        // set property
        this[button] = false;
    }.bind(this));
};

five.Mouse.prototype = new five.Emitter();
five.Mouse.prototype.constructor = five.Mouse;

five.Point = function(x, y) {
    this.x = x;
    this.y = y;
};

five.Point.prototype.distanceTo = function(p) {
    // length of the delta
    return this.delta(p).length;
};

five.Point.prototype.delta = function(p) {
    // delta between two points
    return new five.Delta(this.x - p.x, this.y - p.y);
};

five.Point.prototype.add = function(d) {
    // add it to this point as a delta or a vector
    if(d instanceof five.Vector) d = d.delta;
    return new five.Point(this.x + d.dx, this.y + d.dy);
};

five.Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
};

// isNode==true if running under node.js/io.js
// we won't need to polyfill anything for these environments
if(!isNode) {
    // array.forEach polyfill
    Array.prototype.forEach = Array.prototype.forEach || function(cb, scope) {
        for(var i in this) {
            cb.call(scope || window, this[i], i, this);
        }
    };

    // array.filter polyfill
    Array.prototype.filter = Array.prototype.filter || function(cb, scope) {
        var a;
        for(var i in this) {
            if(cb.call(scope || window, this[i], i, this)) a.push(this[i]);
        }
        return a;
    };

    // function.bind polyfill
    Function.prototype.bind = Function.prototype.bind || function(scope) {
        var f = this;
        return function() {
            f.apply(scope, arguments);
        };
    };

    // requestAnimationFrame polyfill by Erik Möller, Paul Irish, and Tino Zijdel
    // https://gist.github.com/paulirish/1579671
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if(!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if(!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }());


    // Object.create polyfill
    Object.create = Object.create || function(p) {
        function F() {}
        F.prototype = p;
        return new F();
    };
}

five.Rect = function(loc, size) {
    this.x = loc.x;
    this.y = loc.y;
    this.w = size.w;
    this.h = size.h;
};

// center point getter
Object.defineProperty(five.Rect.prototype, 'center', {
    get: function() {
        return new five.Point(this.x + this.w / 2, this.y + this.h / 2);
    }
});

// diagonal size getter
Object.defineProperty(five.Rect.prototype, 'diagonal', {
    get: function() {
        return new five.Size(this.w, this.h).diagonal;
    }
});

// four corners getter
Object.defineProperty(five.Rect.prototype, 'corners', {
    get: function() {
        return [
            new five.Point(this.x, this.y),
            new five.Point(this.x + this.w, this.y),
            new five.Point(this.x + this.w, this.y + this.h),
            new five.Point(this.x, this.y + this.h)
        ];
    }
});

five.Size = function(w, h) {
    this.w = w;
    this.h = h;
};

// getter to make into a delta
Object.defineProperty(five.Size.prototype, 'delta', {
    get: function() {
        return new five.Delta(this.w, this.h);
    }
});

// getter for diagonal length
Object.defineProperty(five.Size.prototype, 'diagonal', {
    get: function() {
        return this.delta.length;
    }
});

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

five.StateMachine = function(states, state) {
    // states = name of state --> game loop function
    this.states = states;
    this.state = state;
};

five.StateMachine.prototype.run = function() {
    // call the current game loop function
    // with the arguments to this function
    this.states[this.state].apply(null, arguments);
};

five.Tilemap = function(game, opts) {
    // another item to load
    game.itemsToLoad++;
    // no layers yet
    this.layers = [];
    // prerender by default
    this.prerender = typeof opts == 'undefined' ? true : typeof opts.prerender ==
        'undefined' ? true : opts.prerender;
    this.game = game;
    // don't scale at all by default
    this.scaleFactor = typeof opts == 'undefined' ? 1 : opts.scaleFactor || 1;
    // create a fake sprite sheet so no errors are thrown on the first few draws
    this.sheet = {
        draw: function() {}
    };
    this.loaded = false;
    this.url = opts.url;
    // create an xhr object to load the json data
    var xhr = new XMLHttpRequest();
    xhr.open('GET', opts.url, true);
    xhr.onload = (function() {
        // parse data
        var data = JSON.parse(xhr.responseText);
        // set dimensions
        this.width = data.width;
        this.height = data.height;
        // create a fake game object for prerendering
        this.fakeGame = {
            itemsToLoad: 0,
            itemLoaded: function() {},
            ctx: document.createElement('canvas').getContext('2d')
        };
        // multiple tilesets are not supported yet
        data.tilesets.forEach(function(t) {
            this.sheet = new five.SpriteSheet(this.fakeGame, {
                image: t.image,
                tileSize: new five.Size(t.tilewidth, t.tileheight)
            });
        }, this);
        // add all layers
        data.layers.forEach(function(l) {
            this.layers.push(l.data);
        }, this);
        // more fake game setup
        this.fakeGame.ctx.canvas.width = this.width * this.sheet.tileWidth * this.scaleFactor;
        this.fakeGame.ctx.canvas.height = this.height * this.sheet.tileHeight * this.scaleFactor;
        this.fakeGame.ctx.imageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.fakeGame.ctx.mozImageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.fakeGame.ctx.webkitImageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.fakeGame.ctx.msImageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.loaded = true;
        // load handler
        this.sheet.on('load', (function() {
            // render
            if(this.prerender) this.render();
            // loaded
            this.loaded = true;
            this.game.itemLoaded(this.url);
        }).bind(this));
    }).bind(this);
    // send ajax request
    xhr.send();
};

five.Tilemap.prototype.render = function(loc) {
    // default location is (0, 0)
    loc = loc || new five.Point(0, 0);
    // only log renders if prerendering is enabled
    if(this.prerender) this.game.log('render map: ' + this.url);
    // go through all layers
    this.layers.forEach(function(l) {
        // go through the current layer
        l.forEach(function(t, i) {
            // 0 = blank
            if(!t) return;
            // calculate x and y positions
            var x = i % this.width * this.sheet.tileWidth * this.scaleFactor,
                y = Math.floor(i / this.width) * this.sheet.tileHeight * this.scaleFactor;
            // don't draw the tile if prerendering is disabled and the tile is off the screen
            if(!this.prerender && (
                x + loc.x <= -this.sheet.tileWidth ||
                x + loc.x >= this.game.width ||
                y + loc.y <= -this.sheet.tileHeight ||
                y + loc.y >= this.game.height
            )) return;
            // draw the tile
            this.sheet.draw({
                // 0 is blank, so other indexes are 1-based
                index: t - 1,
                location: new five.Point(Math.round(x), Math.round(y)),
                size: new five.Size(this.sheet.tileWidth * this.scaleFactor, this.sheet.tileHeight * this.scaleFactor)
            });
        }, this);
    }, this);
};

five.Tilemap.prototype.draw = function(loc) {
    // render if not prerendering
    if(!this.prerender) this.render(loc);
    // don't draw if not loaded
    if(!this.loaded) return;
    // default location: (0, 0)
    loc = loc || new five.Point(0, 0);
    // draw the rendered image
    this.game.ctx.drawImage(this.fakeGame.ctx.canvas, loc.x, loc.y);
};

five.Vector = function(dir, len) {
    this.dir = dir;
    this.len = len;
};

// convert degrees to radians
five.Vector.deg2rad = function(deg) {
    return deg / (180 / Math.PI);
};

// getter for delta
Object.defineProperty(five.Vector.prototype, 'delta', {
    get: function() {
        // calculate dx and dy
        return new five.Delta(
            Math.round(Math.cos(five.Vector.deg2rad(this.dir - 90)) * this.len * 100) / 100,
            Math.round(Math.sin(five.Vector.deg2rad(this.dir - 90)) * this.len * 100) / 100
        );
    }
});

five.Vector.prototype.add = function(otherVec) {
    var d1 = this.delta,
        d2 = otherVec.delta;
    return new five.Delta(d1.dx + d2.dx, d1.dy + d2.dy).vector;
};

    // return the library
    return five;
}).call(this, typeof this.window == 'undefined')); // isNode parameter