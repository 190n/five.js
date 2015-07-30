var game,
    font,
    size = 48,
    min = 36,
    max = 60,
    speed = 36;

window.addEventListener('load', function() {
    game = five.game({
        size: five.size(768, 480),
        target: document.getElementById('canvas'),
        showFps: true,
        states: {
            playing: gameLoopPlaying
        },
        state: 'playing',
        debug: true
    });
    font = game.font('sans-serif');
    game.start();
}, false);

function gameLoopPlaying(dt) {
    font.draw({
        location: five.point(384, 240),
        weight: 'bold',
        baseline: 'middle',
        alignment: 'center',
        size: size,
        text: 'Hello World!'
    });
    size += speed * (dt / 1000);
    if(size >= max) {
        game.log('max size reached');
        size = max;
        speed = -speed;
    }
    if(size <= min) {
        game.log('min size reached');
        size = min;
        speed = -speed;
    }
}