import Vector2D from './vector2d';

function process(ev, target, type) {
    return {
        type,
        pos: Vector2D(ev.clientX - target.offsetLeft, ev.clientY - target.offsetTop),
        button: ev.button === 0 ? 1 : (ev.button === 1 ? 3 : 2)
    };
}

export default function init(elem, callback) {
    elem.addEventListener('mousedown', function(ev) {
        callback(process(ev, elem, 'down'), ev);
    });

    elem.addEventListener('mouseup', function(ev) {
        callback(process(ev, elem, 'up'), ev);
    });

    elem.addEventListener('mousemove', function(ev) {
        callback(process(ev, elem, 'move'), ev);
    });
};
