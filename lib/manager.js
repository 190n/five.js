class Manager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paused = false;
        this.entities = [];
    }

    start() {
        this.lastUpdate = Date.now();
        requestAnimationFrame(this.update.bind(this));
        requestAnimationFrame(this.draw.bind(this));
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
        requestAnimationFrame(this.update.bind(this));
        let dt = Date.now() - this.lastUpdate;
        if (this.paused) return;
        for (let e of this.entities) {
            if (!e.frozen) {
                try {
                    e.update(dt);
                } catch(e) {
                    console.error(e);
                }
            }
        }
        this.lastUpdate = Date.now();
    }

    draw() {
        requestAnimationFrame(this.draw.bind(this));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let e of this.entities) {
            if (!e.invisible) {
                try {
                    e.draw(this.ctx);
                } catch(e) {
                    console.error(e);
                }
            }
        }
    }
}

export default function ManagerFactory(...args) {
    return new Manager(...args);
};
