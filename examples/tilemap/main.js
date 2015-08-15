var game,
    font,
    map,
    loc,
    speed = 0.6,
    hasSeenHelp = false;

window.addEventListener('load', function() {
    game = new five.Game({
        size: new five.Size(768, 480),
        target: document.getElementById('canvas'),
        debug: true,
        showFps: true,
        states: {
            playing: gameLoopPlaying
        },
        state: 'playing',
        fpsColor: new five.Color(0, 0, 80)
    });
    loc = new five.Point(0, 0);
    font = game.font('sans-serif');
    map = game.tilemap({
        url: 'map.json',
        scaleFactor: 4
    });
    five.keyboard.on('up:space', function() {
        map.render();
        hasSeenHelp = true;
    });
    game.start();
}, false);

function gameLoopPlaying(dt) {
    map.draw(loc);
    if(five.keyboard.isDown('up')) {
        hasSeenHelp = true;
        game.log('up');
        loc.y += dt * speed;
    }
    if(five.keyboard.isDown('down')) {
        hasSeenHelp = true;
        game.log('down');
        loc.y -= dt * speed;
    }
    if(five.keyboard.isDown('left')) {
        hasSeenHelp = true;
        game.log('left');
        loc.x += dt * speed;
    }
    if(five.keyboard.isDown('right')) {
        hasSeenHelp = true;
        game.log('right');
        loc.x -= dt * speed;
    }
    if(!hasSeenHelp) {
        font.draw({
            location: new five.Point(384, 80),
            color: new five.Color(0, 0, 0),
            weight: 'bold',
            size: 24,
            alignment: 'center',
            baseline: 'middle',
            text: 'Use arrow keys to look around.'
        });
        font.draw({
            location: new five.Point(384, 128),
            color: new five.Color(0, 0, 0),
            weight: 'bold',
            size: 24,
            alignment: 'center',
            baseline: 'middle',
            text: 'Use spacebar to re-render the map.'
        });
    }
}