function Ship(game) {
    five.Entity.call(this, game, {
        image: 'ship.png',
        tileSize: new five.Size(32, 36),
        location: new five.Point(304, 304),
        animations: {
            idle: [
                0
            ],
            thrust: [
                1
            ]
        },
        delta: new five.Delta(0, 0),
        rotation: 0
    });
    this.play('idle', 1000, 0);
}

Ship.prototype = Object.create(five.Entity.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.update = function(dt) {
    if(this.x > this.game.width) this.x = -32;
    if(this.x < -32) this.x = this.game.width;
    if(this.y > this.game.height) this.y = -32;
    if(this.y < -32) this.y = this.game.height;
    if(this.invincible) this.opacity = 0.5;
    else this.opacity = 1;
    if(five.keyboard.isDown('left')) {
        this.rotation -= 180 * (dt / 1000);
    }
    if(five.keyboard.isDown('right')) {
        this.rotation += 180 * (dt / 1000);
    }
    if(five.keyboard.isDown('up')) {
        this.delta = this.delta.add(new five.Delta(Math.cos(five.Vector.deg2rad(this.rotation - 90)) * 5, Math.sin(five.Vector.deg2rad(this.rotation - 90)) * dt / 2));
        if(this.delta.length >= 1000) {
            this.delta = new five.Vector(this.delta.vector.dir, 1000).delta;
        }
        this.play('thrust', 1000, 0);
    }
    else {
        this.play('idle', 1000, 0);
    }
    if(!this.invincible) {
        rocks.forEach(function(r) {
            if(five.collider.circVsCirc(r.circ, new five.Circ(new five.Point(this.x + 16, this.y + 16), 16))) {
                r.killer = this;
                r.kill();
                this.kill();
            }
        }, this);
    }
};