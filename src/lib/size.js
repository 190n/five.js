five.size = function(w, h) {
    // factory
    return new five._Size(w, h);
};

five._Size = function(w, h) {
    this.w = w;
    this.h = h;
};

// getter to make into a delta
Object.defineProperty(five._Size.prototype, 'delta', {
    get: function() {
        return five.delta(this.w, this.h);
    }
});

// getter for diagonal length
Object.defineProperty(five._Size.prototype, 'diagonal', {
    get: function() {
        return this.delta.length;
    }
});