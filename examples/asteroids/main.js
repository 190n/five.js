var game,
    ship,
    lastShot,
    bullets = [],
    rocks = [],
    saucerBullets = [],
    numRocks,
    rockSpeed,
    bigSaucerSpeed,
    saucerFireRate,
    bigSaucerInterval,
    smallSaucerInterval,
    level = 0,
    levelChangeStart,
    respawnShipStart,
    gameOverStart,
    invincibilityStart,
    score = 0,
    nextBonusShipScore = 10000,
    ships = 3,
    smallShipImage,
    started = false,
    font;

var BULLET_INTERVAL = 200;

window.addEventListener('load', function() {
    game = five.game({
        size: five.size(640, 640),
        target: document.getElementById('canvas'),
        states: {
            playing: gameLoopPlaying,
            levelChange: gameLoopLevelChange,
            respawnShip: gameLoopRespawnShip,
            gameOver: gameLoopGameOver,
            startScreen: gameLoopStartScreen
        },
        state: 'startScreen',
        background: five.color(0, 0, 0),
        fpsColor: five.color(255, 255, 255)
    });
    lastShot = Date.now();
    smallShipImage = game.image({
        image: 'ship-small.png'
    });
    font = game.font('hyperspacebold');
    five.keyboard.on('down:z', function() {
        if(!ship) return;
        ship.x = Math.round(Math.random() * 640);
        ship.y = Math.round(Math.random() * 640);
    });
    game.start();
}, false);





function gameLoopStartScreen() {
    if(!started) {
        five.keyboard.once('down', function() {
            game.changeState('levelChange');
        });
    }
    game.updateEntities = false;
    font.draw({
        location: five.point(320, 320),
        weight: 'bold',
        size: 80,
        color: five.color(255, 255, 255),
        baseline: 'middle',
        alignment: 'center',
        text: 'ASTEROIDS'
    });
    font.draw({
        location: five.point(320, 384),
        weight: 'bold',
        size: 30,
        color: five.color(255, 255, 255),
        baseline: 'middle',
        alignment: 'center',
        text: 'PRESS ANY KEY TO PLAY'
    });
    font.draw({
        location: five.point(320, 448),
        weight: 'bold',
        size: 16,
        color: five.color(255, 255, 255),
        baseline: 'middle',
        alignment: 'center',
        text: 'ARROW KEYS TO MOVE, SPACE TO SHOOT, Z FOR HYPERSPACE'
    });
}





function gameLoopLevelChange() {
    game.updateEntities = false;
    if(!levelChangeStart) {
        levelChangeStart = Date.now();
        level++;
        numRocks = level + 3;
        rockSpeed = level * 10 + 90;
        bigSaucerSpeed = level * 15 + 85;
        saucerFireRate = Math.round(Math.pow(0.99, level) * 500);
        bigSaucerInterval = Math.round(Math.pow(0.9, level) * 45000);
        smallSaucerInterval = Math.round(Math.pow(0.9, level) * 75000);
    }
    font.draw({
        location: five.point(320, 320),
        size: 40,
        weight: 'bold',
        color: five.color(255, 255, 255),
        baseline: 'middle',
        alignment: 'center',
        text: 'LEVEL ' + level
    });
    drawStatus();
    if(Date.now() - levelChangeStart >= 1000) {
        for(var i = 0; i < numRocks; i++) {
            var location;
            if(Math.random() < 0.5) location = five.point(0, Math.round(Math.random() * game.height));
            else location = five.point(Math.round(Math.random() * game.width), 0);
            var vector = five.vector(Math.round(Math.random() * 360), rockSpeed);
            rocks.push(new Rock(game, Rock.BIG, location, vector));
        }
        bullets.forEach(function(b) {
            b.kill();
        });
        if(ship) ship.kill();
        ship = new Ship(game);
        ship.invincible = true;
        invincibilityStart = Date.now();
        levelChangeStart = null;
        game.updateEntities = true;
        game.changeState('playing');
    }
}





function gameLoopPlaying() {
    if(Date.now() - lastShot >= BULLET_INTERVAL && ship.alive && five.keyboard.isDown('space')) {
        var bullet = new Bullet(game, ship);
        bullets.push(bullet);
        lastShot = Date.now();
    }
    bullets = bullets.filter(function(b) {
        return b.alive;
    });
    rocks = rocks.filter(function(r) {
        return r.alive;
    });
    saucerBullets = saucerBullets.filter(function(sb) {
        return sb.alive;
    });
    if(ship.dead) {
        ship = null;
        ships--;
        if(ships <= 0) return game.changeState('gameOver');
        game.changeState('respawnShip');
    }
    if(Date.now() - invincibilityStart >= 1000) {
        ship.invincible = false;
        invincibilityStart = null;
    }
    if(score >= nextBonusShipScore) {
        ships++;
        nextBonusShipScore += 10000;
    }
    drawStatus();
    if(rocks.length === 0) game.changeState('levelChange');
}





function gameLoopRespawnShip() {
    if(!respawnShipStart) respawnShipStart = Date.now();
    drawStatus();
    if(Date.now() - respawnShipStart >= 1000) {
        respawnShipStart = null;
        ship = new Ship(game);
        ship.invincible = true;
        invincibilityStart = Date.now();
        game.changeState('playing');
    }
}





function drawStatus() {
    for(var i = 0, x = 20; i < ships; i++, x += 20) smallShipImage.draw({
        location: five.point(x, 64)
    });
    font.draw({
        location: five.point(20, 20),
        size: 24,
        text: score,
        weight: 'bold',
        color: five.color(255, 255, 255),
        baseline: 'top',
        alignment: 'left'
    });
}





function gameLoopGameOver() {
    if(!gameOverStart) gameOverStart = Date.now();
    font.draw({
        location: five.point(320, 240),
        size: 80,
        weight: 'bold',
        color: five.color(255, 255, 255),
        baseline: 'middle',
        alignment: 'center',
        text: 'GAME OVER'
    });
    if(Date.now() - gameOverStart >= 1000) {
        font.draw({
            location: five.point(320, 360),
            size: 30,
            weight: 'bold',
            color: five.color(255, 255, 255),
            baseline: 'middle',
            alignment: 'center',
            text: 'SCORE: ' + score
        });
    }
}