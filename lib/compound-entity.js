const CompoundEntity = {
    type: 'compound',
    entities: [],

    addEntities(...es) {
        this.entities = this.entities.concat(es);
        for (let e of es) {
            e.compound = this;
            e.manager = this.manager;
            if (typeof e.init == 'function') e.init();
        }
    },

    removeEntities(...es) {
        this.entities = this.entities.filter(function(e) {
            if (es.includes(e)) {
                e.onDeath();
                return false;
            }
            return true;
        });
    },

    getEntitiesByType(type) {
        return this.entities.filter(e => e.type == type);
    },

    updateAll(dt) {
        for (let e of this.entities) {
            e.x -= this.x;
            e.y -= this.y;
            e.update(dt);
            e.x += this.x;
            e.y += this.y;
        }
    },

    drawAll(ctx) {
        for (let e of this.entities) {
            e.draw(ctx);
        }
    }
};

export default CompoundEntity;
