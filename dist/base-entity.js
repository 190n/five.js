'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var BaseEntity = {
    type: 'generic',

    frozen: false,
    invisible: false,

    update: function update(dt) {
        throw new Error('Please define update(dt) on entity objects!');
    },
    draw: function draw(ctx) {
        throw new Error('Please define draw(ctx) on entity objects!');
    },
    onDeath: function onDeath() {}
};

exports.default = BaseEntity;