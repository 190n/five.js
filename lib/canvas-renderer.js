import Renderer from './renderer';

class CanvasRenderer extends Renderer {
    constructor(canvas) {
        super();
        this.elem = canvas;
        this.thing = canvas.getContext('2d');
    }

    beforeDraw() {
        this.thing.clearRect(0, 0, this.elem.width, this.elem.height);
    }

    afterDraw() {

    }

    beforeEntityDraw() {
        this.thing.save();
        this.thing.beginPath();
    }

    afterEntityDraw() {
        this.thing.closePath();
        this.thing.restore();
    }
}

export default function CanvasRendererFactory(...args) {
    return new CanvasRenderer(...args);
};
