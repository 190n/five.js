import five from 'five.js';

window.addEventListener('load', function() {
    let input = five.Input(document.getElementById('target')),
        lmb = document.getElementById('lmb'),
        rmb = document.getElementById('rmb'),
        mousex = document.getElementById('mousex'),
        mousey = document.getElementById('mousey');
    input.createAction('lmb', [five.keys.button1]);
    input.createAction('rmb', [five.keys.button2]);
    requestAnimationFrame(function update() {
        let cursor = document.getElementById('cursor');
        cursor.style.left = input.mousePos.x + 'px';
        mousex.innerHTML = input.mousePos.x;
        cursor.style.top = input.mousePos.y + 'px';
        mousey.innerHTML = input.mousePos.y;
        lmb.innerHTML = input.isActionPressed('lmb') ? 'down' : 'up';
        cursor.style.background = input.isActionPressed('lmb') ? '#00c000' : '#0080ff';
        rmb.innerHTML = input.isActionPressed('rmb') ? 'down' : 'up';
        requestAnimationFrame(update);
    });
});
