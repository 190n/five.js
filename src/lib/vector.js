five.Vector = function(dir, len) {
    this.dir = dir;
    this.len = len;
};

// convert degrees to radians
five.Vector.deg2rad = function(deg) {
    return deg / (180 / Math.PI);
};

// getter for delta
Object.defineProperty(five.Vector.prototype, 'delta', {
    get: function() {
        // calculate dx and dy
        return new five.Delta(
            Math.round(Math.cos(five.Vector.deg2rad(this.dir - 90)) * this.len * 100) / 100,
            Math.round(Math.sin(five.Vector.deg2rad(this.dir - 90)) * this.len * 100) / 100
        );
    }
});

five.Vector.prototype.add = function(otherVec) {
    var d1 = this.delta,
        d2 = otherVec.delta;
    return new five.Delta(d1.dx + d2.dx, d1.dy + d2.dy).vector;
};