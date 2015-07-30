five.color = function(r, g, b, a) {
    // factory
    return new five._Color(r, g, b, a);
};

five._Color = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    // alpha channel defaults to opaque
    this.a = typeof a == 'undefined' ? 1 : a;
};

// getter for HTML color string
Object.defineProperty(five._Color.prototype, 'str', {
    get: function() {
        // rgba() format is the easiest to construct here
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    }
});