five.delta = function(dx, dy) {
    // factory
    return new five._Delta(dx, dy);
};

five._Delta = function(dx, dy) {
    this.dx = dx;
    this.dy = dy;
};

// getter for length
Object.defineProperty(five._Delta.prototype, 'length', {
    get: function() {
        // Pythagorean theorem
        return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    }
});

// conversion to vector
Object.defineProperty(five._Delta.prototype, 'vector', {
    get: function() {
        return five.vector(Math.atan2(this.dy, this.dx) * (180 / Math.PI) + 90, this.length);
    }
});

five._Delta.prototype.add = function(otherDelta) {
    return five.delta(this.dx + otherDelta.dx, this.dy + otherDelta.dy);
};