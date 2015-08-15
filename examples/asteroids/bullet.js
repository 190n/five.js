function Bullet(game, ship) {
    var loc = new five.Point(ship.x + 15, ship.y + 15).add(new five.Vector(ship.rotation, 16)),
        rot = ship.rotation;
    five.Entity.call(this, game, {
        image: 'bullet.png',
        tileSize: new five.Size(2, 2),
        location: loc,
        animations: {
            idle: [
                0
            ]
        },
        vector: new five.Vector(rot, ship.delta.length + Bullet.SPEED)
    });
    this.distanceTraveled = 0;
    this.play('idle', 1000, 0);
}

Bullet.prototype = Object.create(five.Entity.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.SPEED = 300;
Bullet.RANGE = 400;
Bullet.ROCK_EFFECT = 0.1;

Bullet.prototype.update = function(dt) {
    this.distanceTraveled += this.vector.len * (dt / 1000);
    if(this.distanceTraveled >= Bullet.RANGE) return this.kill();
    if(this.x < -2) this.x = this.game.width;
    if(this.x > this.game.width) this.x = -2;
    if(this.y < -2) this.y = this.game.height;
    if(this.y > this.game.height) this.y = -2;
};