var game,
    sprite;

window.addEventListener('load', function() {
    game = new five.Game({
        size: new five.Size(768, 480),
        target: document.getElementById('canvas'),
        showFps: true,
        states: {
            playing: gameLoopPlaying
        },
        state: 'playing',
        debug: true
    });
    sprite = game.sprite({
        image: 'sprite.png',
        tileSize: new five.Size(80, 80),
        location: new five.Point(0, 0),

    });
    sprite.addAnimation('normal', [
        0
    ]);
    sprite.addAnimation('mouseDown', [
        1
    ]);
    sprite.play('normal', 1000, 0);
    game.mouse.on('down:left', function() {
        game.log('left button down');
        sprite.play('mouseDown', 1000, 0);
    });
    game.mouse.on('up:left', function() {
        game.log('left button up');
        sprite.play('normal', 1000, 0);
    });
    game.start();
}, false);

function gameLoopPlaying(dt) {
    sprite.x = game.mouse.x - 40;
    sprite.y = game.mouse.y - 40;
    sprite.update(dt);
    sprite.draw();
}