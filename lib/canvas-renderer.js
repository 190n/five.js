const CanvasRenderer = {
    init(canvas) {
        this.canvas = canvas;
        this.thing = canvas.getContext('2d');
    },

    beforeDraw() {
        this.thing.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    afterDraw() {

    },

    beforeEntityDraw() {
        this.thing.save();
        this.thing.beginPath();
    },

    afterEntityDraw() {
        this.thing.closePath();
        this.thing.restore();
    }
};

export default function CanvasRendererFactory() {

};
