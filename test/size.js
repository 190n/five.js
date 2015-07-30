var assert = require('assert'),
    five = require('../dist/five.min.js').five;

suite('five.size', function() {
    test('diagonal algorithm', function() {
        assert(five.size(4, 3).diagonal == 5);
    });
});