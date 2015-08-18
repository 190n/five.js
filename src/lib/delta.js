/**
* Object to represent a dx/dy pair.
* @class
* @param {Number} dx - Delta X.
* @param {Number} dy - Delta Y.
*/
five.Delta = function(dx, dy) {
    /** @var {Number} - Delta X. */
    this.dx = dx;
    /** @var {Number} - Delta Y. */
    this.dy = dy;
};

/**
* Get the length of a delta.
* @returns {Number}
*/
five.Delta.prototype.length = function() {
    // Pythagorean theorem
    return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
};

/**
* Convert a delta to a vector.
* @returns {five.Vector}
*/
five.Delta.prototype.toVector = function() {
    return new five.Vector(Math.atan2(this.dy, this.dx) * (180 / Math.PI) + 90, this.length);
};

/**
* Add to another delta.
* @param {five.Delta} otherDelta - The other delta to add.
* @returns {five.Delta}
*/
five.Delta.prototype.add = function(otherDelta) {
    return new five.Delta(this.dx + otherDelta.dx, this.dy + otherDelta.dy);
};