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