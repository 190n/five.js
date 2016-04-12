import BaseEntity from './base-entity';
import CompoundEntity from './compound-entity';
import ImageEntity from './image-entity';
import Manager from './manager';
import Movement from './movement';
import TextEntity from './text-entity';
import Vector2D from './vector2d.js';
import Sprite from './sprite';
import Mixer from './mixer';
import Sound from './sound';
import Input from './input';
import keys from './keys';
import util from './util';

const five = {
    VERSION: '0.6.3',

    BaseEntity,
    CompoundEntity,
    ImageEntity,
    Manager,
    Movement,
    TextEntity,
    Vector2D,
    Sprite,
    Mixer,
    Sound,
    Input,
    keys,
    util
};

export default five;
