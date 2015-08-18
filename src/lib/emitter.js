/**
* Event emitter object.
* @class
*/
five.Emitter = function() {
    /**
    * Listener functions.
    * @private
    * @var {Object.<String, Function[]>}
    */
    this._listeners = {};
};

/**
* Add an event listener.
* @param {String} evt - The name of the event to listen for.
* @param {Function} listener - The listener function.
*/
five.Emitter.prototype.on = function(evt, listener) {
    // when extended, the constructor is bypassed
    // so we might not have a listeners object yet
    if(!this._listeners) this._listeners = {};
    // add an array of listeners for the event if we don't have one already
    if(!this._listeners[evt]) this._listeners[evt] = [];
    // add the listener
    this._listeners[evt].push(listener);
};

/**
* Emit an event.
* @param {String} name - The name of the event to emit.
* @param {?Object} evt - The event object to pass to listeners.
*/
five.Emitter.prototype.emit = function(name, evt) {
    // for every listener for the specified event
    if(this._listeners[name]) this._listeners[name].forEach(function(l) {
        // call it with the event object
        if(typeof l == 'function') l(evt);
    }, this);
};

/**
* Remove an event listener.
* @param {String} evt - The event name.
* @param {Function} listener - The listener to remove.
*/
five.Emitter.prototype.off = function(evt, listener) {
    if(!this._listeners[evt]) this._listeners[evt] = [];
    // filter through and remove all of the specified listener
    this._listeners[evt] = this._listeners[evt].filter(function(l) {
        return l != listener;
    });
};

/**
* Add an event listener, but only call it once.
* @param {String} evt - The name of the event to listen for.
* @param {Function} listener - The listener function.
*/
five.Emitter.prototype.once = function(evt, listener) {
    // create a listener that calls the specified function
    // then deletes itself
    var l = (function(e) {
        listener(e);
        this.off(evt, l);
    }).bind(this);
    this.on(evt, l);
};