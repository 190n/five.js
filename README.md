five.js
=======

> Lightweight game engine for HTML5 Canvas

## Installation

With bower:
```sh
bower install --save five.js
```

With npm:
```sh
npm i -S five.js
cp node_modules/five.js/dist/five.min.js . # move to current directory
```

Directly:
```
curl -L https://rawgit.com/190n/five.js/master/dist/five.min.js -o five.min.js
```

## Basic usage

Load it in your HTML:
```html
<script src="path/to/five.min.js"></script>
```

and add a `canvas` element:
```html
<canvas id="canvas"></canvas>
```

The "Hello, World" example:
```js
var game, font;

window.addEventListener('load', function() {
    // create a 768x480 game rendering to our canvas
    game = five.game({
        size: five.size(768, 480),
        target: document.getElementById('canvas'),
        showFps: true,
        debug: true,
        // state machine
        states: {
            playing: gameLoopPlaying
        },
        state: 'playing'
    });

    // create font
    font = game.font('sans-serif');

    // start
    game.start();
}, false);

// game loop for 'playing' state
function gameLoopPlaying(dt) {
    // draw some text
    font.draw({
        // in the middle
        location: five.point(384, 240),
        alignment: 'center',
        baseline: 'middle',
        // bold
        weight: 'bold',
        // big
        size: 40,
        // hello world!
        text: 'Hello, World!'
    });
}
```

## License

five.js is available under the LGPL 3.0 license.