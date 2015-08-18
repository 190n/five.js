/**
* Object to represent a circle.
* @class
* @param {five.Point} loc - Center of the circle.
* @param {Number} rad - Radius of the circle.
*/
five.Circ = function(loc, rad) {
    // position
    /** @var {Number} - X position. */
    this.x = loc.x;
    /** @var {Number} - Y position. */
    this.y = loc.y;
    // radius
    /** @var {Number} - Radius. */
    this.radius = rad;
};

/**
* Returns the bounding box of a circle.
* @returns {five.Rect}
*/
five.Circ.prototype.boundingBox = function() {
    return new five.Rect(
        new five.Point(this.x - this.radius, this.y - this.radius),
        new five.Size(this.radius * 2, this.radius * 2)
    );
};