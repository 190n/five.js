import Vector2D from './vector2d';

function process(ev, target, type) {
    return {
        type,
        pos: Vector2D(ev.clientX - target.offsetLeft, ev.clientY - target.offsetTop),
        button: ev.button === 0 ? 1 : (ev.button === 1 ? 3 : 2)
    };
}

export default function init(elem, capture, callback) {
    elem.addEventListener('mousedown', ev => {
        if (capture) ev.preventDefault();
        callback(process(ev, elem, 'down'), ev);
    }, false);

    elem.addEventListener('mouseup', ev => {
        if (capture) ev.preventDefault();
        callback(process(ev, elem, 'up'), ev);
    }, false);

    elem.addEventListener('mousemove', ev => {
        if (capture) ev.preventDefault();
        callback(process(ev, elem, 'move'), ev);
    }, false);

    if (capture) elem.addEventListener('contextmenu', ev => {
        ev.preventDefault();
    }, false);
};
