import Vector2D from './vector2d';

const Movement = {
    speed: Vector2D(0, 0),
    pos: Vector2D(0, 0),

    move(dt) {
        this.pos = this.pos.add(this.speed.multiply(dt));
    }
}

export default Movement;
