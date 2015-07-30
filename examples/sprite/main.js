var game,
    sprite,
    cog1,
    cog2,
    cat,
    rotationSpeed = 0.18,
    speed = 0.2;

window.addEventListener('load', function() {
    game = five.game({
        size: five.size(768, 480),
        target: document.getElementById('canvas'),
        debug: true,
        showFps: true,
        states: {
            playing: gameLoopPlaying
        },
        state: 'playing'
    });
    sprite = game.sprite({
        image: 'sprite.png',
        tileSize: five.size(64, 64),
        location: five.point(768, 208)
    });
    sprite.addAnimation('forward', [
        0,
        1,
        2,
        3,
        4,
        5
    ]);
    sprite.play('forward', 480, 0);
    cog1 = game.sprite({
        image: 'cog.png',
        tileSize: five.size(96, 96),
        location: five.point(64, 64)
    });
    cog1.addAnimation('forward', [
        0,
        1,
        2,
        3
    ]);
    cog1.play('forward', 500, 0);
    cog2 = game.sprite({
        image: 'cog.png',
        tileSize: five.size(96, 96),
        location: five.point(152, 64)
    });
    cog2.addAnimation('backward', [
        2,
        1,
        0,
        3
    ]);
    cog2.play('backward', 500, 0);
    cat = game.image({
        image: 'cat.jpg',
        rotation: 0,
        location: five.point(512, 48)
    });
    game.start();
}, false);

function gameLoopPlaying(dt) {
    sprite.x -= speed * dt;
    if(sprite.x <= -64) {
        game.log('warp');
        sprite.x = 768;
    }
    if(sprite.x <= 128) sprite.alpha = (sprite.x + 64) / 192;
    else if(sprite.x >= 640) sprite.alpha = (192 - (sprite.x - 576)) / 192;
    else sprite.alpha = 1;
    cat.rotation += rotationSpeed * dt;
    cat.rotation %= 360;
    sprite.update(dt);
    sprite.draw();
    cog1.update(dt);
    cog1.draw();
    cog2.update(dt);
    cog2.draw();
    cat.draw();
}