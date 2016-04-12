import Input from 'five.js/dist/input';

window.addEventListener('load', function() {
    let input = Input(document.getElementById('target'));
    requestAnimationFrame(function update() {
        let cursor = document.getElementById('cursor');
        cursor.style.left = input.mousePos.x + 'px';
        cursor.style.top = input.mousePos.y + 'px';
        console.log(input.mousePos)
        requestAnimationFrame(update);
    });
});
