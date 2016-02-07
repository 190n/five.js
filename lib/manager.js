class Manager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paused = false;
        this.entities = [];
    }

    start() {
        this.lastUpdate = Date.now();
        this.__updateId = requestAnimationFrame(this.update.bind(this));
        this.__drawId = requestAnimationFrame(this.draw.bind(this));
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

    update() {
        this.__updateId = requestAnimationFrame(this.update.bind(this));
        let dt = Date.now() - this.lastUpdate;
        if (this.paused) return;
        for (let e of this.entities) {
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
        this.__drawId = requestAnimationFrame(this.draw.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let e of this.entities) {
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
        cancelAnimationFrame(this.__updateId);
        cancelAnimationFrame(this.__drawId);
    }
}

export default function ManagerFactory(...args) {
    return new Manager(...args);
};
