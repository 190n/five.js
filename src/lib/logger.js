five.logger = function(game, debug) {
    // factory
    return new five._Logger(game, debug);
};

five._Logger = function(game, opts) {
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
    this.color = opts.color || five.color(80, 80, 80);
    // messages in log
    this.msgs = [];
};

five._Logger.prototype.log = function(msg) {
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

five._Logger.prototype.warn = function(msg) {
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

five._Logger.prototype.draw = function() {
    // y position for top of log
    var sy = this.game.height - this.msgs.length * 14;
    this.msgs.forEach(function(m, i) {
        // y position for this message
        var y = i * 14 + sy;
        this.font.draw({
            location: five.point(0, y),
            color: this.color,
            baseline: 'top',
            alignment: 'left',
            weight: m.bold ? 'bold' : 'normal',
            size: 12,
            text: m.message
        });
    }, this);
};

five._Logger.prototype.flush = function() {
    // flush the log
    this.msgs = [];
};