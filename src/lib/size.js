five.Size = function(w, h) {
    this.w = w;
    this.h = h;
};

// getter to make into a delta
Object.defineProperty(five.Size.prototype, 'delta', {
    get: function() {
        return new five.Delta(this.w, this.h);
    }
});

// getter for diagonal length
Object.defineProperty(five.Size.prototype, 'diagonal', {
    get: function() {
        return this.delta.length;
    }
});