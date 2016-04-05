export default function init(elem, callback) {
    let pressed = [];

    elem.addEventListener('keydown', e => {
        pressed.push(e.keyCode);
        let seen = [];
        pressed = pressed.filter(k => {
            if (seen.includes(k)) return false;
            else {
                seen.push(k);
                return true;
            }
        });
        callback(pressed);
    }, false);

    elem.addEventListener('keyup', e => {
        pressed = pressed.filter(k => k != e.keyCode);
        callback(pressed);
    }, false);

    return function(key) {
        return pressed.includes(key);
    };
};
