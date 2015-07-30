// in case the library before this didn't end with a semicolon
;
'use strict';

(function(five) {
    // node.js/io.js module export
    if(this.module && this.module.exports) module.exports = five;
    // global variable
    else this.five = five;
}).call(this, (function(isNode) {