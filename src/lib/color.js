five.Color = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    // alpha channel defaults to opaque
    this.a = typeof a == 'undefined' ? 1 : a;
};

// function to get CSS string representation
five.Color.prototype.toString = function() {
    // rgba() format is the easiest to construct here
    return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
};