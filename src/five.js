// base definition
/**
* Main library namespace.
* @namespace
* @global
* @exports five
* @prop {string} version - Library version.
* @prop {number} canvasSupport - Canvas support. 0: no support. 0.5: basic support but no text. 1: full support.
*/
var five = {
    version: '0.1.1',
    // canvasSupport:
    // 0 = no support
    // 0.5 = basic support but no text
    // 1 = full support
    canvasSupport: isNode ? 1 : !!this.CanvasRenderingContext2D / 2 + !!this.TextMetrics / 2
};

if(five.canvasSupport == 0.5) console.warn('No canvas text support.');
if(!five.canvasSupport) throw new Error('No canvas support.');