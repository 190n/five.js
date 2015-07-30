function Bullet(game, ship) {
    var loc = five.point(ship.x + 15, ship.y + 15).add(five.vector(ship.rotation, 16)),
        rot;
    if(ship instanceof Ship) rot = ship.rotation;
    else if(ship instanceof SaucerBig) rot = Math.round(Math.random() * 360);
    five._Entity.call(this, game, {
        image: 'bullet.png',
        tileSize: five.size(2, 2),
        location: loc,
        animations: {
            idle: [
                0
            ]
        },
        vector: five.vector(rot, ship.delta.length + Bullet.SPEED)
    });
    this.distanceTraveled = 0;
    this.play('idle', 1000, 0);
}

Bullet.prototype = Object.create(five._Entity.prototype);
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