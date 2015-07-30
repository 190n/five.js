five.point = function(x, y) {
    // factory
    return new five._Point(x, y);
};

five._Point = function(x, y) {
    this.x = x;
    this.y = y;
};

five._Point.prototype.distanceTo = function(p) {
    // length of the delta
    return this.delta(p).length;
};

five._Point.prototype.delta = function(p) {
    // delta between two points
    return five.delta(this.x - p.x, this.y - p.y);
};

five._Point.prototype.add = function(d) {
    // add it to this point as a delta or a vector
    if(d instanceof five._Vector) d = d.delta;
    return five.point(this.x + d.dx, this.y + d.dy);
};

five._Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
};