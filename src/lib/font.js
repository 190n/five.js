/**
* A font to draw text with.
* @class
* @param {five.Game} game - The game to draw text on.
* @param {String} name - The name of the font.
*/
five.Font = function(game, name) {
    /** @var {five.Game} - The game to draw text on. */
    this.game = game;
    /** @var {String} - The name of the font. */
    this.name = name;
};

/**
* Draw text.
* @param {Object} opts - Options.
* @param {String} [opts.style=normal] - Font style.
* @param {String} [opts.weight=normal] - Font weight.
* @param {Number} [opts.size=16] - Font size in pixels.
* @param {String} [opts.baseline=alphabetic] - {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline Text baseline.}
* @param {String} [opts.alignment=start] - {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign Text alignment.}
* @param {five.Color} [opts.color=black] - Text color.
* @param {five.Point} location - Text location.
*/
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