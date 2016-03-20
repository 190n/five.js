'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vector2d = require('./vector2d');

var _vector2d2 = _interopRequireDefault(_vector2d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sprite = {
    spriteOptions: {
        tileWidth: null,
        tileHeight: null,
        scale: null
    },
    _index: 0,
    _cols: null,
    _rows: null,
    _anims: {},

    drawSprite: function drawSprite(ctx) {
        if (!this.drawWidth) this.drawWidth = this.spriteOptions.tileWidth * this.spriteOptions.scale;
        if (!this.drawHeight) this.drawHeight = this.spriteOptions.tileHeight * this.spriteOptions.scale;
        if (!this._cols) this._cols = this.image.width / this.spriteOptions.tileWidth;
        if (!this._rows) this._rows = this.image.height / this.spriteOptions.tileHeight;
        var col = this._index % this._cols,
            row = Math.floor(this._index / this._cols);
        this.sourceRect = {
            width: this.spriteOptions.tileWidth,
            height: this.spriteOptions.tileHeight,
            pos: (0, _vector2d2.default)(col * this.spriteOptions.tileWidth, row * this.spriteOptions.tileHeight)
        };
        this.drawImage(ctx);
    },
    addAnimation: function addAnimation(name, anim) {
        this._anims[name] = anim;
    },
    playAnimation: function playAnimation(name, dur, iters) {
        this._activeAnim = this._anims[name];
        this._timePerFrame = dur / this._anims[name].length;
        this._playsLeft = iters;
        this._animIndex = 0;
        this._index = this._anims[name][0];
        this._lastFrame = Date.now();
    },
    animate: function animate(dt) {
        if (!this._activeAnim) return;
        if (Date.now() - this._lastFrame >= this._timePerFrame) {
            this._lastFrame = Date.now();
            this._animIndex++;
            if (this._animIndex >= this._activeAnim.length) {
                this._playsLeft--;
                if (this._playsLeft == 0) {
                    this._animIndex--;
                    this._index = this._activeAnim[this._animIndex];
                    this._activeAnim = null;
                } else {
                    this._animIndex %= this._activeAnim.length;
                }
            }
            this._index = this._activeAnim[this._animIndex];
        }
    }
};

exports.default = Sprite;