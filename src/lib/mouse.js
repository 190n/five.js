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