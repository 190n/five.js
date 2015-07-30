// isNode==true if running under node.js/io.js
// we won't need to polyfill anything for these environments
if(!isNode) {
    // array.forEach polyfill
    Array.prototype.forEach = Array.prototype.forEach || function(cb, scope) {
        for(var i in this) {
            cb.call(scope || window, this[i], i, this);
        }
    };

    // array.filter polyfill
    Array.prototype.filter = Array.prototype.filter || function(cb, scope) {
        var a;
        for(var i in this) {
            if(cb.call(scope || window, this[i], i, this)) a.push(this[i]);
        }
        return a;
    };

    // function.bind polyfill
    Function.prototype.bind = Function.prototype.bind || function(scope) {
        var f = this;
        return function() {
            f.apply(scope, arguments);
        };
    };

    // requestAnimationFrame polyfill by Erik Möller, Paul Irish, and Tino Zijdel
    // https://gist.github.com/paulirish/1579671
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if(!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if(!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }());


    // Object.create polyfill
    Object.create = Object.create || function(p) {
        function F() {}
        F.prototype = p;
        return new F();
    };
}