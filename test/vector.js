var assert = require('assert'),
    five = require('../dist/five.min.js').five;

suite('five.vector', function() {
    test('conversion to delta', function() {
        var vec = new five.Vector(135, Math.sqrt(2));
        var delta = vec.delta;
        assert(delta.length == Math.sqrt(2));
        assert(delta.dx == delta.dy);
    });
});