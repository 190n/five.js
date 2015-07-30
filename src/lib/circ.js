five.circ = function(loc, rad) {
    // factory
    return new five._Circ(loc, rad);
};

five._Circ = function(loc, rad) {
    // position
    this.x = loc.x;
    this.y = loc.y;
    // radius
    this.radius = rad;
};

// getter for boundingBox
Object.defineProperty(five._Circ.prototype, 'boundingBox', {
    get: function() {
        return five.rect(
            five.point(this.x - this.radius, this.y - this.radius),
            five.size(this.radius * 2, this.radius * 2)
        );
    }
});