import trackKeyboard from './keyboard';
import trackMouse from './mouse';
import Vector2D from './vector2d';

class Input {
    constructor(elem) {
        this.actions = {};
        this._listeners = {};
        this._keyPressed = trackKeyboard(elem, this._kbdCallback);
        this._mouseButtonsPressed = [];
        this.mousePos = Vector2D(0, 0);
        trackMouse(elem, this._mouseCallback);
    }

    createAction(name, buttons) {
        this.actions[name] = buttons;
    }

    remapAction(name, buttons) {
        this.createAction(name, buttons);
    }

    isActionPressed(action) {
        return this.actions[action].some(b => {
            if (b > 0) return this._keyPressed(b);
            if (b < 0) return this._mouseButtonsPressed.includes(-b);
        });
    }

    on(ev, cb) {
        if (!(ev in this._listeners)) this._listeners[ev] = [];
        this._listeners[ev].push(cb);
    }

    off(ev, cb) {
        if (!(ev in this._listeners)) return;
        this._listeners[ev] = this._listeners[ev].filter(h => h != cb);
    }

    once(ev, cb) {
        let handler = function(...data) {
            cb.call(null, ...data);
            this.off(ev, handler);
        }.bind(this);
        this.on(ev, handler);
    }

    emit(ev, ...data) {
        if (!(ev in this._listeners)) return;
        for (let cb of this._listeners[ev]) {
            cb.call(null, ...data);
        }
    }

    _kbdCallback(ev) {
        if (ev.type == 'down') {
            for (let name in this.actions) {
                if (this.actions[name].includes(ev.key)) {
                    this.emit('down:' + name);
                    this.emit('down', {
                        action: name,
                        button: ev.key
                    });
                }
            }
        } else if (ev.type == 'up') {
            for (let name in this.actions) {
                if (this.actions[name].includes(ev.key)) {
                    this.emit('up:' + name);
                    this.emit('up', {
                        action: name,
                        button: ev.key
                    });
                }
            }
        }
    }

    _mouseCallback(ev) {
        this.mousePos = ev.pos;
        if (ev.type == 'down') {
            this._mouseButtonsPressed.push(ev.button);
            for (let name in this.actions) {
                if (this.actions[name].includes(-ev.button)) {
                    this.emit('down:' + name);
                    this.emit('down', {
                        action: name,
                        button: -ev.button
                    });
                }
            }
        } else if (ev.type == 'up') {
            this._mouseButtonsPressed = this._mouseButtonsPressed.filter(b => b != ev.button);
            for (let name in this.actions) {
                if (this.actions[name].includes(-ev.button)) {
                    this.emit('down:' + name);
                    this.emit('down', {
                        action: name,
                        button: -ev.button
                    });
                }
            }
        }
    }
}
