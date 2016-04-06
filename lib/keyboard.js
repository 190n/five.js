export default function init(elem, callback) {
    let pressed = [];

    elem.addEventListener('keydown', e => {
        pressed.push(e.keyCode);
        callback({
            type: 'down',
            key: e.keyCode
        });
    }, false);

    elem.addEventListener('keyup', e => {
        pressed = pressed.filter(k => k != e.keyCode);
        callback({
            type: 'up',
            key: e.keyCode
        });
    }, false);

    return function(key) {
        return pressed.includes(key);
    };
};
