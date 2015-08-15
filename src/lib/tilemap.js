five.Tilemap = function(game, opts) {
    // another item to load
    game.itemsToLoad++;
    // no layers yet
    this.layers = [];
    // prerender by default
    this.prerender = typeof opts == 'undefined' ? true : typeof opts.prerender ==
        'undefined' ? true : opts.prerender;
    this.game = game;
    // don't scale at all by default
    this.scaleFactor = typeof opts == 'undefined' ? 1 : opts.scaleFactor || 1;
    // create a fake sprite sheet so no errors are thrown on the first few draws
    this.sheet = {
        draw: function() {}
    };
    this.loaded = false;
    this.url = opts.url;
    // create an xhr object to load the json data
    var xhr = new XMLHttpRequest();
    xhr.open('GET', opts.url, true);
    xhr.onload = (function() {
        // parse data
        var data = JSON.parse(xhr.responseText);
        // set dimensions
        this.width = data.width;
        this.height = data.height;
        // create a fake game object for prerendering
        this.fakeGame = {
            itemsToLoad: 0,
            itemLoaded: function() {},
            ctx: document.createElement('canvas').getContext('2d')
        };
        // multiple tilesets are not supported yet
        data.tilesets.forEach(function(t) {
            this.sheet = new five.SpriteSheet(this.fakeGame, {
                image: t.image,
                tileSize: new five.Size(t.tilewidth, t.tileheight)
            });
        }, this);
        // add all layers
        data.layers.forEach(function(l) {
            this.layers.push(l.data);
        }, this);
        // more fake game setup
        this.fakeGame.ctx.canvas.width = this.width * this.sheet.tileWidth * this.scaleFactor;
        this.fakeGame.ctx.canvas.height = this.height * this.sheet.tileHeight * this.scaleFactor;
        this.fakeGame.ctx.imageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.fakeGame.ctx.mozImageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.fakeGame.ctx.webkitImageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.fakeGame.ctx.msImageSmoothingEnabled = typeof opts.pixelate == 'undefined' ? false : !opts.pixelate;
        this.loaded = true;
        // load handler
        this.sheet.on('load', (function() {
            // render
            if(this.prerender) this.render();
            // loaded
            this.loaded = true;
            this.game.itemLoaded(this.url);
        }).bind(this));
    }).bind(this);
    // send ajax request
    xhr.send();
};

five.Tilemap.prototype.render = function(loc) {
    // default location is (0, 0)
    loc = loc || new five.Point(0, 0);
    // only log renders if prerendering is enabled
    if(this.prerender) this.game.log('render map: ' + this.url);
    // go through all layers
    this.layers.forEach(function(l) {
        // go through the current layer
        l.forEach(function(t, i) {
            // 0 = blank
            if(!t) return;
            // calculate x and y positions
            var x = i % this.width * this.sheet.tileWidth * this.scaleFactor,
                y = Math.floor(i / this.width) * this.sheet.tileHeight * this.scaleFactor;
            // don't draw the tile if prerendering is disabled and the tile is off the screen
            if(!this.prerender && (
                x + loc.x <= -this.sheet.tileWidth ||
                x + loc.x >= this.game.width ||
                y + loc.y <= -this.sheet.tileHeight ||
                y + loc.y >= this.game.height
            )) return;
            // draw the tile
            this.sheet.draw({
                // 0 is blank, so other indexes are 1-based
                index: t - 1,
                location: new five.Point(Math.round(x), Math.round(y)),
                size: new five.Size(this.sheet.tileWidth * this.scaleFactor, this.sheet.tileHeight * this.scaleFactor)
            });
        }, this);
    }, this);
};

five.Tilemap.prototype.draw = function(loc) {
    // render if not prerendering
    if(!this.prerender) this.render(loc);
    // don't draw if not loaded
    if(!this.loaded) return;
    // default location: (0, 0)
    loc = loc || new five.Point(0, 0);
    // draw the rendered image
    this.game.ctx.drawImage(this.fakeGame.ctx.canvas, loc.x, loc.y);
};