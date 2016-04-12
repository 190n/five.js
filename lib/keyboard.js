export default function init(elem, capture, callback) {
    let pressed = [];

    elem.addEventListener('keydown', ev => {
        if (capture) ev.preventDefault();
        pressed.push(ev.keyCode);
        callback({
            type: 'down',
            key: ev.keyCode
        });
    }, false);

    elem.addEventListener('keyup', ev => {
        if (capture) ev.preventDefault();
        pressed = pressed.filter(k => k != ev.keyCode);
        callback({
            type: 'up',
            key: ev.keyCode
        });
    }, false);

    return function(key) {
        return pressed.includes(key);
    };
};
