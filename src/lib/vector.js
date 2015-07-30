five.vector = function(dir, len) {
    // factory
    return new five._Vector(dir, len);
};

five._Vector = function(dir, len) {
    this.dir = dir;
    this.len = len;
};

// convert degrees to radians
five.vector.deg2rad = function(deg) {
    return deg / (180 / Math.PI);
};

// getter for delta
Object.defineProperty(five._Vector.prototype, 'delta', {
    get: function() {
        // calculate dx and dy
        return five.delta(
            Math.round(Math.cos(five.vector.deg2rad(this.dir - 90)) * this.len * 100) / 100,
            Math.round(Math.sin(five.vector.deg2rad(this.dir - 90)) * this.len * 100) / 100
        );
    }
});

five._Vector.prototype.add = function(otherVec) {
    var d1 = this.delta,
        d2 = otherVec.delta;
    return five.delta(d1.dx + d2.dx, d1.dy + d2.dy).vector;
};