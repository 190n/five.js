five.Delta = function(dx, dy) {
    this.dx = dx;
    this.dy = dy;
};

// getter for length
Object.defineProperty(five.Delta.prototype, 'length', {
    get: function() {
        // Pythagorean theorem
        return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    }
});

// conversion to vector
Object.defineProperty(five.Delta.prototype, 'vector', {
    get: function() {
        return new five.Vector(Math.atan2(this.dy, this.dx) * (180 / Math.PI) + 90, this.length);
    }
});

five.Delta.prototype.add = function(otherDelta) {
    return new five.Delta(this.dx + otherDelta.dx, this.dy + otherDelta.dy);
};