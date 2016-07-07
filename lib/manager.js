import Input from './input';

class Manager {
    constructor(renderer) {
        this.renderer = renderer;
        this.paused = false;
        this.input = Input(canvas);
        this.entities = [];
    }

    start() {
        this.lastUpdate = Date.now();
        this.__loopId = requestAnimationFrame(this.loop.bind(this));
    }

    addEntities(...e) {
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
        this.renderer.beforeDraw();
        for (let i = 0; i < this.entities.length; i++) {
            let e = this.entities[i];
            if (!e.invisible) {
                try {
                    this.renderer.beforeEntityDraw();
                    e.draw(this.renderer.thing);
                    this.renderer.afterEntityDraw();
                } catch(e) {
                    console.error(e);
                }
            }
        }
        this.renderer.afterDraw();
    }

    destroy() {
        cancelAnimationFrame(this.__loopId);
    }
}

export default function ManagerFactory(...args) {
    return new Manager(...args);
};
