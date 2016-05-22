import Input from './input';

class Manager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paused = false;
        this.input = Input(canvas);
        this.entities = [];
    }

    start() {
        this.lastUpdate = Date.now();
        this.__loopId = requestAnimationFrame(this.loop.bind(this));
    }

    addEntities(...es) {
        this.entities = this.entities.concat(es);
        for (let e of es) {
            e.manager = this;
            if (typeof e.init == 'function') e.init();
        }
    }

    removeEntities(...es) {
        this.entities = this.entities.filter(function(e) {
            if (es.includes(e)) {
                e.onDeath();
                return false;
            }
            return true;
        });
    }

    getEntitiesByType(type) {
        return this.entities.filter(e => e.type == type);
    }

    loop() {
        this.__loopId = requestAnimationFrame(this.loop.bind(this));
        this.update();
        this.draw();
    }

    update() {
        let dt = Date.now() - this.lastUpdate;
        if (this.paused) return;
        for (let i = 0; i < this.entities.length; i++) {
            let e = this.entities[i];
            if (!e.frozen) {
                try {
                    e.update(dt / 1000);
                } catch(e) {
                    console.error(e);
                }
            }
        }
        this.lastUpdate = Date.now();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.entities.length; i++) {
            let e = this.entities[i];
            if (!e.invisible) {
                try {
                    this.ctx.save();
                    this.ctx.beginPath();
                    e.draw(this.ctx);
                    this.ctx.closePath();
                    this.ctx.restore();
                } catch(e) {
                    console.error(e);
                }
            }
        }
    }

    destroy() {
        cancelAnimationFrame(this.__loopId);
    }
}

export default function ManagerFactory(...args) {
    return new Manager(...args);
};
