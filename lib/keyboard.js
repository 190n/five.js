let pressed = [];

window.addEventListener('keydown', e => {
    pressed.push(e.keyCode);
}, false);

window.addEventListener('keyup', e => {
    pressed = pressed.filter(k => k != e.keyCode);
}, false);

export default {
    pressed,
    isDown(key) {
        return pressed.includes(key);
    }
};
