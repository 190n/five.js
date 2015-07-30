five.emitter = function() {
    // factory
    return new five._Emitter();
};

five._Emitter = function() {
    // no listeners yet
    this._listeners = {};
};

five._Emitter.prototype.on = function(evt, listener) {
    // when extended, the constructor is bypassed
    // so we might not have a listeners object yet
    if(!this._listeners) this._listeners = {};
    // add an array of listeners for the event if we don't have one already
    if(!this._listeners[evt]) this._listeners[evt] = [];
    // add the listener
    this._listeners[evt].push(listener);
};

five._Emitter.prototype.emit = function(name, evt) {
    // for every listener for the specified event
    if(this._listeners[name]) this._listeners[name].forEach(function(l) {
        // call it with the event object
        if(typeof l == 'function') l(evt);
    }, this);
};

five._Emitter.prototype.off = function(evt, listener) {
    if(!this._listeners[evt]) this._listeners[evt] = [];
    // filter through and remove all of the specified listener
    this._listeners[evt] = this._listeners[evt].filter(function(l) {
        return l != listener;
    });
};

five._Emitter.prototype.once = function(evt, listener) {
    // create a listener that calls the specified function
    // then deletes itself
    var l = (function(e) {
        listener(e);
        this.off(evt, l);
    }).bind(this);
    this.on(evt, l);
};