five.Circ = function(loc, rad) {
    // position
    this.x = loc.x;
    this.y = loc.y;
    // radius
    this.radius = rad;
};

// getter for boundingBox
Object.defineProperty(five.Circ.prototype, 'boundingBox', {
    get: function() {
        return new five.Rect(
            new five.Point(this.x - this.radius, this.y - this.radius),
            new five.Size(this.radius * 2, this.radius * 2)
        );
    }
});