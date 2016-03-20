import Vector2D from './vector2d';

const Sprite = {
    spriteOptions: {
        tileWidth: null,
        tileHeight: null,
        scale: null
    },
    _index: 0,
    _cols: null,
    _rows: null,
    _anims: {},

    drawSprite() {
        if (!this.drawWidth) this.drawWidth = this.spriteOptions.tileWidth * this.spriteOptions.scale;
        if (!this.drawHeight) this.drawHeight = this.spriteOptions.tileHeight * this.spriteOptions.scale;
        if (!this._cols) this._cols = this.image.width / this.spriteOptions.tileWidth;
        if (!this._rows) this._rows = this.image.height / this.spriteOptions.tileHeight;
        let col = this._index % this._cols,
            row = Math.floor(this._index / this._cols);
        this.sourceRect = {
            width: this.spriteOptions.tileWidth,
            height: this.spriteOptions.tileHeight,
            pos: Vector2D(col * this.spriteOptions.tileWidth, row * this.spriteOptions.tileHeight)
        };
        this.drawImage();
    },

    addAnimation(name, anim) {
        this._anims[name] = anim;
    },

    playAnim(name, dur, iters) {
        this._activeAnim = this._anims[name];
        this._timePerFrame = dur / this._anims[name].length;
        this._playsLeft = iters;
        this._animIndex = 0;
        this._index = this._anims[name][0];
        this._lastFrame = Date.now();
    },

    animate(dt) {
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

export default Sprite;
