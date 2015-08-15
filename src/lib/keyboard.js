// the keyboard object is an emitter
five.keyboard = new five.Emitter();
// huge map for keycode --> user-friendly name
five.keyboard.map = {
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    96: '0-numpad',
    97: '1-numpad',
    98: '2-numpad',
    99: '3-numpad',
    100: '4-numpad',
    101: '5-numpad',
    102: '6-numpad',
    103: '7-numpad',
    104: '8-numpad',
    105: '9-numpad',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    27: 'escape',
    32: 'space',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12'
};

// array of keys that are down
five.keyboard.active = [];

// window will be undefined in node.js/io.js
// so we won't try to add event listeners
// unless we're in a browser
if(!isNode) window.addEventListener('load', function() {
    document.body.onkeydown = function(e) {
        var name = five.keyboard.map[e.keyCode];
        // unknown key? return!
        if(!name) return;
        // the key's now down
        five.keyboard.active.push(name);
        // emit the events
        // generic
        five.keyboard.emit('down', {
            key: name
        });
        // specific
        five.keyboard.emit('down:' + name);
    };

    document.body.onkeyup = function(e) {
        var name = five.keyboard.map[e.keyCode];
        if(!name) return;
        // the key is now down
        five.keyboard.active = five.keyboard.active.filter(function(k) {
            return k != name;
        });
        five.keyboard.emit('up', {
            key: name
        });
        five.keyboard.emit('up:' + name);
    };

    document.body.onkeypress = function(e) {
        var name = five.keyboard.map[e.keyCode];
        if(!name) return;
        five.keyboard.emit('press', {
            key: name
        });
        five.keyboard.emit('press:' + name);
    };
}, false);

five.keyboard.isDown = function(name) {
    // in the active array? down!
    return this.active.indexOf(name) > -1;
};