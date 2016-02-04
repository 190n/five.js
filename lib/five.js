import BaseEntity from './base-entity';
import CompoundEntity from './compound-entity';
import ImageEntity from './image-entity';
import Manager from './manager';
import Movement from './movement';
import TextEntity from './text-entity';
import Vector2D from './vector2d.js';
import util from './util';

const five = {
    VERSION: '0.3.6',

    canvasSupport() {
        let result = 0;
        if (typeof CanvasRenderingContext2D == 'function') result = 0.5;
        else return 0;
        if (typeof CanvasRenderingContext2D.prototype.fillText == 'function') result = 1;
        return result;
    },

    BaseEntity,
    CompoundEntity,
    ImageEntity,
    Manager,
    Movement,
    TextEntity,
    Vector2D,
    util
};

export default five;
