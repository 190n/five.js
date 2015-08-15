var assert = require('assert'),
    five = require('../dist/five.min.js').five;

suite('five.size', function() {
    test('diagonal algorithm', function() {
        assert(new five.Size(4, 3).diagonal == 5);
    });
});