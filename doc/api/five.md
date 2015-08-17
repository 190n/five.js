five
====

`five` is the main library namespace. It contains all the classes, objects,
variables, and functions of the library.

Getting it
----------

If you're using five.js as a Node module, you can get it by typing:
```js
var five = require('./path/to/five.min.js').five;
```

Otherwise, you can just use the global variable `five`.

Properties
----------

### five.version

`five.version` gives you the version of the library being used.

### five.canvasSupport

`five.canvasSupport` represents the level of support for HTML5 Canvas that the
current browser has. Its possible values are:
* 0 - no canvas support
* 0.5 - basic support, but no text (text was a later addition to the API)
* 1 - full support

The library will throw an error if `five.canvasSupport` is 0, and issue a
warning if it is 0.5.

Classes and objects
-------------------

* [five.Circ](five.Circ.md)
* [five.collider](five.collider.md)
* [five.Color](five.Color.md)
* [five.Delta](five.Delta.md)
* [five.Emitter](five.Emitter.md)
* [five.Entity](five.Entity.md)
* [five.Font](five.Font.md)
* [five.Game](five.Game.md)
* [five.Image](five.Image.md)
* [five.keyboard](five.keyboard.md)
* [five.Logger](five.Logger.md)
* [five.Mouse](five.Mouse.md)
* [five.Point](five.Point.md)
* [five.Rect](five.Rect.md)
* [five.Size](five.Size.md)
* [five.SpriteSheet](five.SpriteSheet.md)
* [five.Sprite](five.Sprite.md)
* [five.StateMachine](five.StateMachine.md)
* [five.Tilemap](five.Tilemap.md)
* [five.Vector](five.Vector.md)