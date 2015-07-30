function SaucerBig(game) {
    var loc;
    if(Math.random() < 0.5) loc = five.point(Math.round(Math.random() * 640), 0);
    else loc = five.point(0, Math.round(Math.random() * 640));
    five._Entity.call(this, game, {
        image: 'saucer-big.png',
        tileSize: five.size(48, 32),
        location: loc,
        animations: {
            idle: [
                0
            ]
        },
        delta: five.delta(bigSaucerSpeed, 0)
    });
    this.lastDyChange = Date.now();
    this.lastShot = Date.now();
}

SaucerBig.prototype = Object.create(five._Entity.prototype);
SaucerBig.prototype.constructor = SaucerBig;

SaucerBig.prototype.update = function() {
    if(Date.now() - this.lastDyChange >= 500) {
        this.lastDyChange = Date.now();
        this.delta.dy = Math.round(Math.random() * bigSaucerSpeed - (bigSaucerSpeed / 2));
    }
    if(Date.now() - this.lastShot >= saucerFireRate) {
        this.lastShot = Date.now();
        saucerBullets.push(new Bullet(this.game, this));
    }
    if(this.x >= this.game.width) this.x = -48;
    if(this.x <= -48) this.x = this.game.width;
    if(this.y >= this.game.height) this.y = -32;
    if(this.y <= -32) this.y = this.game.height;
};