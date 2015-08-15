five.Point = function(x, y) {
    this.x = x;
    this.y = y;
};

five.Point.prototype.distanceTo = function(p) {
    // length of the delta
    return this.delta(p).length;
};

five.Point.prototype.delta = function(p) {
    // delta between two points
    return new five.Delta(this.x - p.x, this.y - p.y);
};

five.Point.prototype.add = function(d) {
    // add it to this point as a delta or a vector
    if(d instanceof five.Vector) d = d.delta;
    return new five.Point(this.x + d.dx, this.y + d.dy);
};

five.Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
};