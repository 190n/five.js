import trackKeyboard from './keyboard';
import trackMouse from './mouse';

class Input {
    constructor(elem) {
        this.actions = {};
        this._listeners = {};
        trackKeyboard(elem, this._kbdCallback);
        trackMouse(elem, this._mouseCallback);
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

    _emit(ev, ...data) {
        for (let cb of this._listeners[ev]) {
            cb.call(null, ...data);
        }
    }

    _kbdCallback() {

    }

    _mouseCallback() {

    }
}
