const Movement = {
    dx: 0,
    dy: 0,
    x: 0,
    y: 0,

    move(dt) {
        this.x += this.dx * dt;
        this.y += this.dy * dt;
    }
}

export default Movement;
