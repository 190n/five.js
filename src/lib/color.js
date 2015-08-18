/**
* Object to represent a color.
* @class
* @param {Number} r - Red channel. (0-255)
* @param {Number} g - Green channel. (0-255)
* @param {Number} b - Blue channel. (0-255)
* @param {Number} [a=0] - Alpha channel. (0-1)
*/
five.Color = function(r, g, b, a) {
    /** @var {Number} - Red channel. (0-255) */
    this.r = r;
    /** @var {Number} - Green channel. (0-255) */
    this.g = g;
    /** @var {Number} - Blue channel. (0-255) */
    this.b = b;
    // alpha channel defaults to opaque
    /** @var {Number} - Alpha channel. (0-1) */
    this.a = typeof a == 'undefined' ? 1 : a;
};

/**
* Returns rgba-formatted color string
* @returns {String}
*/
five.Color.prototype.toString = function() {
    // rgba() format is the easiest to construct here
    return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
};