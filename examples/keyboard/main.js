var game,
    sprite,
    font,
    hasSeenHelp = false,
    speed = 0.2;

window.addEventListener('load', function() {
    game = new five.Game({
        size: new five.Size(768, 480),
        target: document.getElementById('canvas'),
        debug: true,
        showFps: true,
        states: {
            playing: gameLoopPlaying
        },
        state: 'playing'
    });
    font = game.font('sans-serif');
    sprite = game.sprite({
        image: 'sprite.png',
        tileSize: new five.Size(80, 80),
        location: new five.Point(344, 200)
    });
    sprite.addAnimation('idle', [
        0
    ]);
    sprite.play('idle', 1000, 0);
    five.keyboard.on('down:shift', function() {
        game.log('faster');
        speed = 0.6;
    });
    five.keyboard.on('up:shift', function() {
        game.log('slower');
        speed = 0.2;
    });
    game.start();
}, false);

function gameLoopPlaying(dt) {
    if(!hasSeenHelp) {
        font.draw({
            location: new five.Point(384, 80),
            size: 24,
            weight: 'bold',
            text: 'Use arrow keys to move the circle.',
            color: new five.Color(0, 0, 0),
            alignment: 'center',
            baseline: 'middle'
        });
        font.draw({
            location: new five.Point(384, 128),
            size: 24,
            weight: 'bold',
            text: 'Hold <shift> to go faster.',
            color: new five.Color(0, 0, 0),
            alignment: 'center',
            baseline: 'middle'
        });
    }
    if(five.keyboard.isDown('up')) {
        hasSeenHelp = true;
        sprite.y -= speed * dt;
        game.log('up');
    }
    if(five.keyboard.isDown('down')) {
        hasSeenHelp = true;
        sprite.y += speed * dt;
        game.log('down');
    }
    if(five.keyboard.isDown('left')) {
        hasSeenHelp = true;
        sprite.x -= speed * dt;
        game.log('left');
    }
    if(five.keyboard.isDown('right')) {
        hasSeenHelp = true;
        sprite.x += speed * dt;
        game.log('right');
    }
    sprite.update(dt);
    sprite.draw();
}