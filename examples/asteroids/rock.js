function Rock(game, size, location, vector) {
    var image = 'rock-' + (size == Rock.SMALL ? 'small' : (size == Rock.MEDIUM ? 'medium' : 'big')) + '.png';
    five.Entity.call(this, game, {
        image: image,
        tileSize: new five.Size(size, size),
        location: location,
        vector: vector,
        animations: {
            idle: [
                0
            ]
        },
        rotation: Math.round(Math.random() * 360)
    });
    this.rockSize = size;
    this.circ = new five.Circ(new five.Point(this.x + this.rockSize / 2, this.y + this.rockSize / 2), this.rockSize / 2);
    this.play('idle', 1000, 0);
}

Rock.prototype = Object.create(five.Entity.prototype);
Rock.prototype.constructor = Rock;

Rock.SMALL = 24;
Rock.MEDIUM = 48;
Rock.BIG = 96;
Rock.DIRECTION_DEVIATION = 30;
Rock.LOCATION_DEVIATION = 10;

Rock.SCORING = {};
Rock.SCORING[Rock.SMALL] = 100;
Rock.SCORING[Rock.MEDIUM] = 50;
Rock.SCORING[Rock.BIG] = 20;

Rock.prototype.update = function(dt) {
    if(this.x > this.game.width) this.x = -this.rockSize;
    if(this.x < -this.rockSize) this.x = this.game.width;
    if(this.y > this.game.height) this.y = -this.size.h;
    if(this.y < -this.size.h) this.y = this.game.height;
    this.circ = new five.Circ(new five.Point(this.x + this.rockSize / 2, this.y + this.rockSize / 2), this.rockSize / 2);
    bullets.forEach(function(b) {
        if(five.collider.circVsPoint(this.circ, new five.Point(b.x + 1, b.y + 1))) {
            this.killer = b;
            this.kill();
            b.kill();
        }
    }, this);
    this.rotation += dt * 0.09;
};

Rock.prototype.die = function() {
    if(this.killer instanceof Bullet && this.game.stateMachine.state == 'playing') score += Rock.SCORING[this.rockSize];
    if(!this.killer.vector) this.killer.vector = this.killer.delta.vector;
    var newRockVector = new five.Vector(this.killer.vector.dir, this.killer.vector.len * Bullet.ROCK_EFFECT).add(this.vector),
        r1,
        r2;
    switch(this.rockSize) {
        case Rock.BIG:
            r1 = new Rock(this.game, Rock.MEDIUM, new five.Point(this.x + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION), this.y + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION)),
                new five.Vector(newRockVector.dir + ((Math.random() * 2 - 1) * Rock.DIRECTION_DEVIATION), newRockVector.len));
            r2 = new Rock(this.game, Rock.MEDIUM, new five.Point(this.x + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION), this.y + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION)),
                new five.Vector(newRockVector.dir + ((Math.random() * 2 - 1) * Rock.DIRECTION_DEVIATION), newRockVector.len));
            break;
        case Rock.MEDIUM:
            r1 = new Rock(this.game, Rock.SMALL, new five.Point(this.x + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION), this.y + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION)),
                new five.Vector(newRockVector.dir + ((Math.random() * 2 - 1) * Rock.DIRECTION_DEVIATION), newRockVector.len));
            r2 = new Rock(this.game, Rock.SMALL, new five.Point(this.x + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION), this.y + ((Math.random() * 2 - 1) * Rock.LOCATION_DEVIATION)),
                new five.Vector(newRockVector.dir + ((Math.random() * 2 - 1) * Rock.DIRECTION_DEVIATION), newRockVector.len));
            break;
    }
    if(this.rockSize != Rock.SMALL) {
        rocks.push(r1);
        rocks.push(r2);
    }
};